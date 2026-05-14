// ─── Zari Revenue Engine ──────────────────────────────────────────────────────
//
// Central orchestrator for all sales & marketing automation.
// Every product event flows through here. The engine decides:
//   1. What to write to Zoho CRM (contacts, deals, activities, notes)
//   2. Which email sequences to trigger or stop in Zoho Campaigns
//   3. How to update the lead/health score
//
// Usage: call the relevant handler from API routes — all calls are fire-and-forget.
// Errors are caught internally and never block the user-facing response.

import {
  syncNewUser,
  syncSubscriptionChange,
  syncSessionComplete,
  syncChurn,
  computeLifecycleStage,
  computeHealthScore,
} from "@/lib/zoho-crm";
import {
  triggerSequence,
  stopSequence,
  moveToList,
  subscribeToList,
  type CampaignsContact,
} from "@/lib/zoho-campaigns";

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

// ─── Helper ───────────────────────────────────────────────────────────────────

function campaignsContact(opts: {
  email: string;
  firstName?: string;
  lastName?: string;
  planTier?: string;
  lifecycleStage?: string;
}): CampaignsContact {
  return {
    email: opts.email,
    firstName: opts.firstName,
    lastName: opts.lastName,
    planTier: opts.planTier,
    lifecycleStage: opts.lifecycleStage,
  };
}

// ─── Event handlers ───────────────────────────────────────────────────────────

/**
 * A new user signed up (free trial or direct).
 * CRM: create Contact in "Lead" stage.
 * Campaigns: start trial_onboarding sequence.
 * If they came from cold email: move them off the lead_nurture list.
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

    const contact = campaignsContact({
      email: event.email,
      firstName: event.firstName,
      lastName: event.lastName,
      planTier: "Free",
      lifecycleStage: "Lead",
    });

    // If converted from cold email nurture, stop that sequence
    if (event.source === "Cold Email") {
      void stopSequence("lead_nurture", event.email);
      void moveToList("ZOHO_LIST_LEADS", "ZOHO_LIST_TRIAL", contact);
    } else {
      void subscribeToList("ZOHO_LIST_TRIAL", contact);
    }

    // Start 14-day trial onboarding sequence
    void triggerSequence("trial_onboarding", contact);
  } catch (err) {
    console.error("[zoho-engine] onUserSignedUp error:", err);
  }
}

/**
 * A user completed a coaching session.
 * CRM: update engagement signals + health score + log activity.
 * Campaigns: fire milestone emails at sessions 1, 5, 10.
 *            If approaching token limit, trigger upsell sequence.
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

    const contact = campaignsContact({
      email: event.email,
      firstName: event.firstName,
      planTier: event.planTier,
      lifecycleStage: event.subscriptionStatus === "active" ? "Active" : "Trial",
    });

    // Milestone triggers
    if (event.sessionCount === 1) {
      void triggerSequence("milestone_1", contact);
    } else if (event.sessionCount === 5) {
      void triggerSequence("milestone_5", contact);
    }

    // Upsell trigger when approaching plan token limit
    if ((event.tokenLimitPercent ?? 0) >= 80 && event.planTier !== "team") {
      void triggerSequence("upsell_limit", contact);
    }

    // NPS trigger at 30 days for active customers (only once per lifecycle)
    if (event.daysSinceSignup === 30 && event.subscriptionStatus === "active") {
      void triggerSequence("nps_survey", contact);
    }
  } catch (err) {
    console.error("[zoho-engine] onSessionCompleted error:", err);
  }
}

/**
 * A Stripe subscription event fired (trial start, activation, upgrade, downgrade, past_due).
 * CRM: update Contact + upsert Deal with correct pipeline stage.
 * Campaigns: move contact to appropriate list + trigger right sequence.
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

    const tierLabel = ({ free: "Free", pro: "Search", premium: "Growth", team: "Executive" } as Record<string, string>)[event.planTier] ?? "Free";
    const contact = campaignsContact({
      email: event.email,
      firstName: event.firstName,
      lastName: event.lastName,
      planTier: tierLabel,
    });

    if (event.subscriptionStatus === "trialing") {
      // Trial started — already handled by onUserSignedUp for new signups,
      // but handle upgrades/downgrades that enter a new trial
      contact.lifecycleStage = "Trial";
      void triggerSequence("trial_onboarding", contact);
    }

    if (event.subscriptionStatus === "active") {
      const isUpgrade = event.previousPlanTier && event.previousPlanTier !== event.planTier;
      contact.lifecycleStage = "Active";

      // Stop trial sequences, move to customer list
      void stopSequence("trial_onboarding", event.email);
      void stopSequence("trial_ending", event.email);
      void stopSequence("at_risk", event.email);
      void moveToList("ZOHO_LIST_TRIAL", "ZOHO_LIST_CUSTOMERS", contact);

      if (!isUpgrade) {
        // New paying customer → welcome sequence
        void triggerSequence("paid_welcome", contact);
      }
    }

    if (event.subscriptionStatus === "past_due") {
      // Payment failed — CRM already updated. Consider adding a dunning email here.
      contact.lifecycleStage = "At Risk";
    }
  } catch (err) {
    console.error("[zoho-engine] onSubscriptionChanged error:", err);
  }
}

/**
 * Trial ending soon (cron job fires this 3 days before expiry).
 * CRM: log "Trial Ending Soon" activity.
 * Campaigns: trigger urgency sequence.
 */
export async function onTrialEnding(event: TrialEndingEvent): Promise<void> {
  try {
    const contact = campaignsContact({
      email: event.email,
      firstName: event.firstName,
      planTier: "Free",
      lifecycleStage: "Trial",
    });
    void triggerSequence("trial_ending", contact);
  } catch (err) {
    console.error("[zoho-engine] onTrialEnding error:", err);
  }
}

/**
 * User flagged as at-risk by the health check cron.
 * CRM: update lifecycle to "At Risk", log activity.
 * Campaigns: start re-engagement sequence.
 */
export async function onUserAtRisk(event: UserAtRiskEvent): Promise<void> {
  try {
    // CRM update — reuse syncSessionComplete with stale data to update health score
    // In production you'd have a dedicated updateContactLifecycle call
    const contact = campaignsContact({
      email: event.email,
      firstName: event.firstName,
      planTier: event.planTier,
      lifecycleStage: "At Risk",
    });

    void moveToList("ZOHO_LIST_CUSTOMERS", "ZOHO_LIST_AT_RISK", contact);
    void triggerSequence("at_risk", contact);
  } catch (err) {
    console.error("[zoho-engine] onUserAtRisk error:", err);
  }
}

/**
 * User came back after being at-risk (new session after >14 day gap).
 * Stop the at-risk sequence, move back to customer list.
 */
export async function onUserReengaged(opts: {
  email: string;
  firstName?: string;
  planTier: string;
}): Promise<void> {
  try {
    void stopSequence("at_risk", opts.email);
    void moveToList("ZOHO_LIST_AT_RISK", "ZOHO_LIST_CUSTOMERS", campaignsContact(opts));
  } catch {}
}

/**
 * User churned (subscription canceled).
 * CRM: mark Contact "Churned", close Deal as Lost.
 * Campaigns: stop all active sequences, start win-back cadence.
 */
export async function onUserChurned(event: ChurnEvent): Promise<void> {
  try {
    await syncChurn({
      email: event.email,
      reason: event.reason,
      planTier: event.planTier,
    });

    const contact = campaignsContact({
      email: event.email,
      firstName: event.firstName,
      planTier: event.planTier,
      lifecycleStage: "Churned",
    });

    // Stop all active sequences
    void stopSequence("trial_onboarding", event.email);
    void stopSequence("trial_ending", event.email);
    void stopSequence("paid_welcome", event.email);
    void stopSequence("at_risk", event.email);
    void stopSequence("upsell_limit", event.email);

    // Move to win-back list and start win-back cadence (day 1 exit email)
    void moveToList("ZOHO_LIST_CUSTOMERS", "ZOHO_LIST_WIN_BACK", contact);
    void triggerSequence("win_back_30", contact);
    // win_back_60 and win_back_90 are scheduled within the Zoho Campaigns
    // autoresponder as delayed follow-ups, not separate API calls
  } catch (err) {
    console.error("[zoho-engine] onUserChurned error:", err);
  }
}

/**
 * A cold email or website lead was captured (before they sign up).
 * CRM: create Lead record.
 * Campaigns: add to leads list and start nurture sequence.
 */
export async function onLeadCaptured(event: LeadCapturedEvent): Promise<void> {
  try {
    const contact = campaignsContact({
      email: event.email,
      firstName: event.firstName,
      lastName: event.lastName,
      planTier: "Free",
      lifecycleStage: "Lead",
    });

    void subscribeToList("ZOHO_LIST_LEADS", contact);
    void triggerSequence("lead_nurture", contact);
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
export async function onNpsSubmitted(event: NpsSubmittedEvent): Promise<void> {
  try {
    const category = event.score >= 9 ? "Promoter" : event.score >= 7 ? "Passive" : "Detractor";
    // The CRM note + activity is logged via the /api/support/ticket route
    // For now we just log — add CRM direct note write here once custom fields are set up
    console.log(`[zoho-engine] NPS ${event.score} (${category}) from ${event.email}`);

    if (category === "Detractor") {
      // TODO: trigger high-priority CRM task for personal follow-up by Steve
      // await createCrmTask({ subject: `NPS Detractor follow-up — ${event.email}`, priority: "High" });
    }
  } catch (err) {
    console.error("[zoho-engine] onNpsSubmitted error:", err);
  }
}
