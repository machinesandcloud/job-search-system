// ─── Zari Revenue Engine ──────────────────────────────────────────────────────
//
// Central orchestrator for all sales & marketing automation.
// Every product event flows through here. The engine decides:
//   1. What to write to Zoho CRM (contacts, deals, activities, notes)
//   2. Which email sequences to trigger or cancel (via Resend + DB scheduler)
//   3. How to update the lead/health score
//
// Usage: call the relevant handler from API routes — all calls are fire-and-forget.
// Errors are caught internally and never block the user-facing response.

import {
  syncNewUser,
  syncSubscriptionChange,
  syncSessionComplete,
  syncChurn,
  syncNpsScore,
  syncPaymentToBooks,
  flagHighValueSignup,
  computeLifecycleStage,
  computeHealthScore,
} from "@/lib/zoho-crm";
import { enroll, cancel, cancelMany } from "@/lib/email-sequences";

// ─── Event payloads ───────────────────────────────────────────────────────────

export interface UserSignedUpEvent {
  userId: string;
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  source?: string; // "Cold Email" | "Organic" | "Referral" | "Google" | etc.
  referralCode?: string;
}

export interface SessionCompletedEvent {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  sessionId: string;
  sessionMode: string;
  sessionCount: number;       // total completed sessions for this user
  totalTokenUsage: number;
  planTier: string;
  subscriptionStatus: string;
  daysSinceSignup: number;
  tokenLimitPercent?: number; // 0–100, how close to plan limit
}

export interface SubscriptionChangedEvent {
  userId: string;
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  planName: string;
  planTier: string;            // "free" | "pro" | "premium" | "team"
  previousPlanTier?: string;
  subscriptionStatus: string;  // "trialing" | "active" | "past_due" | "canceled"
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  trialEnd?: Date | null;
  currentPeriodEnd?: Date | null;
  amount?: number;
}

export interface TrialEndingEvent {
  userId: string;
  email: string;
  firstName: string;
  planTier: string;
  daysRemaining: number;  // typically 3 or 1
  sessionCount: number;
}

export interface UserAtRiskEvent {
  userId: string;
  email: string;
  firstName: string;
  planTier: string;
  subscriptionStatus: string;
  daysSinceLastSession: number;
  healthScore: number;
}

export interface ChurnEvent {
  email: string;
  firstName?: string;
  planTier: string;
  reason?: string;
  mrr?: number;
}

export interface LeadCapturedEvent {
  email: string;
  firstName?: string;
  lastName?: string;
  source: string;           // "Cold Email" | "Website Form" | "Referral" | "Social"
  companyName?: string;
  jobTitle?: string;
  campaignName?: string;
}

export interface NpsSubmittedEvent {
  userId: string;
  email: string;
  score: number;          // 0–10
  comment?: string;
  planTier: string;
}

export interface PaymentFailedEvent {
  email: string;
  firstName?: string;
  planTier: string;
  invoiceId?: string;
  amountCents: number;
}

export interface PaymentRecoveredEvent {
  email: string;
  firstName?: string;
  planTier: string;
  planName: string;
  amountCents: number;
  stripeInvoiceId?: string;
  stripeSubscriptionId?: string;
  periodEnd?: Date | null;
}

// ─── Event handlers ───────────────────────────────────────────────────────────

/**
 * A new user signed up (free trial or direct).
 * CRM: create Contact in "Lead" stage.
 * Email: stop lead_nurture if from cold email, start trial_onboarding.
 */
export async function onUserSignedUp(event: UserSignedUpEvent): Promise<void> {
  try {
    await syncNewUser({
      userId: event.userId,
      accountId: event.accountId,
      email: event.email,
      firstName: event.firstName,
      lastName: event.lastName,
      source: event.source,
    });

    const meta = { firstName: event.firstName, lastName: event.lastName };

    if (event.source === "Cold Email") {
      void cancel(event.email, "lead_nurture");
    }

    void enroll("trial_onboarding", event.email, meta);
    // Non-starter nudge fires if they don't complete a session within 48h
    // The cron will cancel this once a session is detected
    void enroll("non_starter", event.email, meta);
  } catch (err) {
    console.error("[zoho-engine] onUserSignedUp error:", err);
  }
}

/**
 * A user completed a coaching session.
 * CRM: update engagement signals + health score + log activity.
 * Email: milestone at session 1 and 5, upsell at 80% token limit, NPS at day 30.
 */
export async function onSessionCompleted(event: SessionCompletedEvent): Promise<void> {
  try {
    await syncSessionComplete({
      userId: event.userId,
      email: event.email,
      sessionId: event.sessionId,
      sessionMode: event.sessionMode,
      sessionCount: event.sessionCount,
      totalTokenUsage: event.totalTokenUsage,
      planTier: event.planTier,
      subscriptionStatus: event.subscriptionStatus,
      daysSinceSignup: event.daysSinceSignup,
    });

    const meta = { firstName: event.firstName, planTier: event.planTier, email: event.email };

    if (event.sessionCount === 1) {
      void enroll("milestone_1", event.email, meta);
      // They've started — cancel the non-starter nudge sequence
      void cancel(event.email, "non_starter");
    }
    if (event.sessionCount === 2) void enroll("feature_activation", event.email, meta);
    if (event.sessionCount === 5) void enroll("milestone_5", event.email, meta);

    if ((event.tokenLimitPercent ?? 0) >= 80 && event.planTier !== "team") {
      void enroll("upsell_limit", event.email, meta);
    }

    if (event.daysSinceSignup === 30 && event.subscriptionStatus === "active") {
      void enroll("nps_survey", event.email, meta);
    }

    // Referral ask at day 21 for active paid users (they know the product by now)
    if (event.daysSinceSignup === 21 && event.subscriptionStatus === "active") {
      const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";
      const referralUrl = `${APP_URL}/signup?ref=${encodeURIComponent(event.email)}`;
      void enroll("referral", event.email, { ...meta, referralUrl });
    }

    // Testimonial ask at day 45 for active paid users
    if (event.daysSinceSignup === 45 && event.subscriptionStatus === "active") {
      const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";
      const testimonialUrl = `${APP_URL}/testimonial?email=${encodeURIComponent(event.email)}`;
      void enroll("testimonial", event.email, { ...meta, testimonialUrl });
    }

    // Annual upsell at day 90 for monthly subscribers
    if (event.daysSinceSignup === 90 && event.subscriptionStatus === "active" && event.planTier !== "team") {
      void enroll("annual_upsell", event.email, { ...meta, planName: event.planTier });
    }
  } catch (err) {
    console.error("[zoho-engine] onSessionCompleted error:", err);
  }
}

/**
 * A Stripe subscription event fired (trial start, activation, upgrade, downgrade, past_due).
 * CRM: update Contact + upsert Deal with correct pipeline stage.
 * Email: stop trial sequences on upgrade, send paid_welcome for new paying customers.
 */
export async function onSubscriptionChanged(event: SubscriptionChangedEvent): Promise<void> {
  try {
    await syncSubscriptionChange({
      userId: event.userId,
      accountId: event.accountId,
      email: event.email,
      firstName: event.firstName,
      lastName: event.lastName,
      planName: event.planName,
      planTier: event.planTier,
      subscriptionStatus: event.subscriptionStatus,
      stripeCustomerId: event.stripeCustomerId,
      stripeSubscriptionId: event.stripeSubscriptionId,
      trialEnd: event.trialEnd,
      currentPeriodEnd: event.currentPeriodEnd,
      amount: event.amount,
    });

    const meta = { firstName: event.firstName, lastName: event.lastName, planTier: event.planTier };

    if (event.subscriptionStatus === "trialing") {
      void enroll("trial_onboarding", event.email, meta);
    }

    if (event.subscriptionStatus === "active") {
      const isUpgrade = event.previousPlanTier && event.previousPlanTier !== event.planTier;
      // Cancel all lifecycle sequences — covers win-back (re-subscriber), at-risk, trial, non-starter
      void cancelMany(event.email, ["trial_onboarding", "trial_ending", "at_risk", "win_back_30", "win_back_60", "win_back_90", "dunning", "non_starter"]);
      if (!isUpgrade) {
        void enroll("paid_welcome", event.email, meta);
      }

      // Record revenue in Zoho Books and flag high-value accounts for personal outreach
      if (event.amount && event.amount > 0) {
        void syncPaymentToBooks({
          email: event.email,
          firstName: event.firstName,
          lastName: event.lastName,
          planName: event.planName,
          amount: event.amount,
          stripeSubscriptionId: event.stripeSubscriptionId,
          periodEnd: event.currentPeriodEnd,
        });
      }

      void flagHighValueSignup({
        email: event.email,
        firstName: event.firstName,
        lastName: event.lastName,
        planTier: event.planTier,
      });
    }
  } catch (err) {
    console.error("[zoho-engine] onSubscriptionChanged error:", err);
  }
}

/**
 * Trial ending soon (cron job fires this 3 days before expiry).
 * Email: start trial_ending urgency sequence.
 */
export async function onTrialEnding(event: TrialEndingEvent): Promise<void> {
  try {
    void enroll("trial_ending", event.email, { firstName: event.firstName });
  } catch (err) {
    console.error("[zoho-engine] onTrialEnding error:", err);
  }
}

/**
 * User flagged as at-risk by the health check cron.
 * Email: start re-engagement sequence.
 */
export async function onUserAtRisk(event: UserAtRiskEvent): Promise<void> {
  try {
    void enroll("at_risk", event.email, { firstName: event.firstName, planTier: event.planTier });
  } catch (err) {
    console.error("[zoho-engine] onUserAtRisk error:", err);
  }
}

/**
 * User came back after being at-risk (new session after >14 day gap).
 * Stop the at-risk re-engagement sequence.
 */
export async function onUserReengaged(opts: {
  email: string;
  firstName?: string;
  planTier: string;
}): Promise<void> {
  try {
    void cancel(opts.email, "at_risk");
  } catch {}
}

/**
 * User churned (subscription canceled).
 * CRM: mark Contact "Churned", close Deal as Lost.
 * Email: stop all active sequences, enroll in win-back cadence (30/60/90 day).
 */
export async function onUserChurned(event: ChurnEvent): Promise<void> {
  try {
    await syncChurn({
      email: event.email,
      reason: event.reason,
      planTier: event.planTier,
    });

    void cancel(event.email);

    const meta = { firstName: event.firstName, planTier: event.planTier };
    // win_back_30 sends immediately; 60 and 90 are pre-scheduled from churn date
    void enroll("win_back_30", event.email, meta);
    void enroll("win_back_60", event.email, meta, new Date(Date.now() + 60 * 86_400_000));
    void enroll("win_back_90", event.email, meta, new Date(Date.now() + 90 * 86_400_000));
  } catch (err) {
    console.error("[zoho-engine] onUserChurned error:", err);
  }
}

/**
 * A cold email or website lead was captured (before they sign up).
 * CRM: create Lead record.
 * Email: start lead_nurture sequence.
 */
export async function onLeadCaptured(event: LeadCapturedEvent): Promise<void> {
  try {
    void enroll("lead_nurture", event.email, { firstName: event.firstName, lastName: event.lastName });
  } catch (err) {
    console.error("[zoho-engine] onLeadCaptured error:", err);
  }
}

/**
 * User submitted an NPS survey.
 * CRM: log score as an activity + note.
 * If detractor (0-6): flag for immediate follow-up.
 * If promoter (9-10): trigger referral ask.
 */
/**
 * Stripe invoice.payment_failed — card declined, bank rejection, etc.
 * CRM: note on contact. Email: dunning sequence.
 */
export async function onPaymentFailed(event: PaymentFailedEvent): Promise<void> {
  try {
    void enroll("dunning", event.email, { firstName: event.firstName, planTier: event.planTier });
  } catch (err) {
    console.error("[zoho-engine] onPaymentFailed error:", err);
  }
}

/**
 * Stripe invoice.payment_succeeded after a previous failure — payment recovered.
 * CRM: cancel dunning. Email: cancel dunning sequence. Books: record the payment.
 */
export async function onPaymentRecovered(event: PaymentRecoveredEvent): Promise<void> {
  try {
    void cancel(event.email, "dunning");
    if (event.amountCents > 0) {
      void syncPaymentToBooks({
        email: event.email,
        firstName: event.firstName ?? "",
        lastName: "",
        planName: event.planName,
        amount: event.amountCents,
        stripeInvoiceId: event.stripeInvoiceId,
        stripeSubscriptionId: event.stripeSubscriptionId,
        periodEnd: event.periodEnd,
      });
    }
  } catch (err) {
    console.error("[zoho-engine] onPaymentRecovered error:", err);
  }
}

export async function onNpsSubmitted(event: NpsSubmittedEvent): Promise<void> {
  try {
    await syncNpsScore({
      email: event.email,
      score: event.score,
      comment: event.comment,
      planTier: event.planTier,
    });
  } catch (err) {
    console.error("[zoho-engine] onNpsSubmitted error:", err);
  }
}
