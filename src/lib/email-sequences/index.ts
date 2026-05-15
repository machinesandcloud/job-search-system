// Email Sequence Engine
//
// Enrollments are stored in EmailSequenceEnrollment.
// The daily cron (/api/cron/zoho-health) calls processSequenceQueue()
// to send all emails whose nextSendAt has passed.
// EmailSuppression blocks delivery for unsubscribes, bounces, and complaints.

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";
import { render } from "@react-email/render";
import * as React from "react";

import { LeadNurture1, LeadNurture2, LeadNurture3, LeadNurture4, LeadNurture5, LeadNurture6, LeadNurture7 } from "./emails/lead-nurture";
import { TrialOnboarding1, TrialOnboarding2, TrialOnboarding3, TrialOnboarding4, TrialOnboarding5, TrialEnding1, TrialEnding2 } from "./emails/trial";
import { PaidWelcome1, PaidWelcome2, PaidWelcome3, Milestone1, Milestone5 } from "./emails/paid";
import { UpsellLimit1, UpsellLimit2, AtRisk1, AtRisk2, AtRisk3, NpsSurvey, DetractorFollowup1, DetractorFollowup2 } from "./emails/engagement";
import { WinBack30, WinBack60, WinBack90 } from "./emails/win-back";
import { Dunning1, Dunning2, Dunning3 } from "./emails/dunning";
import {
  NonStarter1, NonStarter2, NonStarter3,
  FeatureActivation1, FeatureActivation2, FeatureActivation3,
  ReferralAsk, TestimonialAsk, AnnualUpsell,
} from "./emails/activation";

export const UNSUB_PLACEHOLDER = "{{UNSUB_URL}}";
const NPS_PLACEHOLDER = "{{NPS_URL}}";
const APP_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "") ||
  "https://app.zaricoach.com";

export type ZariSequence =
  | "lead_nurture"
  | "trial_onboarding"
  | "trial_ending"
  | "paid_welcome"
  | "milestone_1"
  | "milestone_5"
  | "upsell_limit"
  | "at_risk"
  | "win_back_30"
  | "win_back_60"
  | "win_back_90"
  | "nps_survey"
  | "dunning"
  | "non_starter"
  | "feature_activation"
  | "referral"
  | "testimonial"
  | "annual_upsell"
  | "detractor_followup";

// ─── Template definitions ─────────────────────────────────────────────────────

type Meta = Record<string, string | number | boolean | undefined>;

interface EmailTemplate {
  subject: string;
  element: React.ReactElement;
}

function t(subject: string, element: React.ReactElement): EmailTemplate {
  return { subject, element };
}

function makeTemplates(meta: Meta, unsubUrl: string, npsUrl: string): Record<ZariSequence, EmailTemplate[]> {
  const firstName = typeof meta.firstName === "string" ? meta.firstName : undefined;
  const planTier = typeof meta.planTier === "string" ? meta.planTier : undefined;
  const planName = typeof meta.planName === "string" ? meta.planName : "Search";
  const referralUrl = typeof meta.referralUrl === "string" ? meta.referralUrl : `${APP_URL}/signup`;
  const testimonialUrl = typeof meta.testimonialUrl === "string" ? meta.testimonialUrl : `${APP_URL}/testimonial`;
  const annualUrl = `${APP_URL}/billing?plan=annual`;

  return {
    lead_nurture: [
      t("Most job searches fail in the first 3 weeks.", React.createElement(LeadNurture1, { unsubscribeUrl: unsubUrl })),
      t("Your resume summary is probably hurting you.", React.createElement(LeadNurture2, { unsubscribeUrl: unsubUrl })),
      t("Why recruiters can't find your LinkedIn profile.", React.createElement(LeadNurture3, { unsubscribeUrl: unsubUrl })),
      t("6 months of nothing. Then 3 offers in 5 weeks.", React.createElement(LeadNurture4, { unsubscribeUrl: unsubUrl })),
      t("The interview mistake 93% of candidates make.", React.createElement(LeadNurture5, { unsubscribeUrl: unsubUrl })),
      t("Your free Zari account is ready.", React.createElement(LeadNurture6, { unsubscribeUrl: unsubUrl })),
      t("My last email to you.", React.createElement(LeadNurture7, { unsubscribeUrl: unsubUrl })),
    ],
    trial_onboarding: [
      t("Welcome to Zari — here's how to use your free credits.", React.createElement(TrialOnboarding1, { firstName, unsubscribeUrl: unsubUrl })),
      t("Your free credits are waiting — here's the best first move.", React.createElement(TrialOnboarding2, { firstName, unsubscribeUrl: unsubUrl })),
      t("The one habit top Zari users share.", React.createElement(TrialOnboarding3, { unsubscribeUrl: unsubUrl })),
      t("How's the search going?", React.createElement(TrialOnboarding4, { firstName, unsubscribeUrl: unsubUrl })),
      t("Free gets you started. Here's what's on the other side.", React.createElement(TrialOnboarding5, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    trial_ending: [
      t("Your free credits are almost up — here's how to keep going.", React.createElement(TrialEnding1, { firstName, unsubscribeUrl: unsubUrl })),
      t("You've hit your free limit. Here's how to continue.", React.createElement(TrialEnding2, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    paid_welcome: [
      t("You're in. Welcome to Zari — here's everything you've unlocked.", React.createElement(PaidWelcome1, { firstName, planTier, unsubscribeUrl: unsubUrl })),
      t("The Zari feature most people find too late.", React.createElement(PaidWelcome2, { firstName, unsubscribeUrl: unsubUrl })),
      t("One week in — how's it going?", React.createElement(PaidWelcome3, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    milestone_1: [
      t("First session complete — here's what to do next.", React.createElement(Milestone1, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    milestone_5: [
      t("5 sessions. You're in the top 15%.", React.createElement(Milestone5, { firstName, planTier, unsubscribeUrl: unsubUrl })),
    ],
    upsell_limit: [
      t("You're approaching your session limit — here's how to keep going.", React.createElement(UpsellLimit1, { firstName, topFeature: typeof meta.topFeature === "string" ? meta.topFeature : undefined, unsubscribeUrl: unsubUrl })),
      t("Your session limit is up. Here's how to keep going.", React.createElement(UpsellLimit2, { firstName, topFeature: typeof meta.topFeature === "string" ? meta.topFeature : undefined, unsubscribeUrl: unsubUrl })),
    ],
    at_risk: [
      t("Haven't seen you in a while — quick check-in.", React.createElement(AtRisk1, { firstName, unsubscribeUrl: unsubUrl })),
      t("When the job search feels stuck — a different take.", React.createElement(AtRisk2, { firstName, unsubscribeUrl: unsubUrl })),
      t("One last check-in.", React.createElement(AtRisk3, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    win_back_30: [
      t("It's been a month. A lot has changed at Zari.", React.createElement(WinBack30, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    win_back_60: [
      t("Two months out — still searching?", React.createElement(WinBack60, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    win_back_90: [
      t("Three months. My last reach-out.", React.createElement(WinBack90, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    nps_survey: [
      t("Quick question: how likely are you to recommend Zari?", React.createElement(NpsSurvey, { firstName, npsUrl, unsubscribeUrl: unsubUrl })),
    ],
    dunning: [
      t("Action needed: your payment didn't go through.", React.createElement(Dunning1, { firstName, unsubscribeUrl: unsubUrl })),
      t("Your Zari access is at risk — please update your payment.", React.createElement(Dunning2, { firstName, unsubscribeUrl: unsubUrl })),
      t("Your Zari account has been paused.", React.createElement(Dunning3, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    non_starter: [
      t("You haven't started yet — here's the fastest way in.", React.createElement(NonStarter1, { firstName, unsubscribeUrl: unsubUrl })),
      t("What's stopping you from using Zari?", React.createElement(NonStarter2, { firstName, unsubscribeUrl: unsubUrl })),
      t("Your free credits are still unused. Last nudge.", React.createElement(NonStarter3, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    feature_activation: [
      t("The Zari feature that compounds over time.", React.createElement(FeatureActivation1, { firstName, unsubscribeUrl: unsubUrl })),
      t("Most candidates leave $10K–$30K on the table in negotiations.", React.createElement(FeatureActivation2, { firstName, unsubscribeUrl: unsubUrl })),
      t("The question most job seekers don't ask until it's too late.", React.createElement(FeatureActivation3, { firstName, unsubscribeUrl: unsubUrl })),
    ],
    referral: [
      t("Get one free month — just share Zari with one person.", React.createElement(ReferralAsk, { firstName, referralUrl, unsubscribeUrl: unsubUrl })),
    ],
    testimonial: [
      t("45 days in — would you share what Zari's been like for you?", React.createElement(TestimonialAsk, { firstName, testimonialUrl, unsubscribeUrl: unsubUrl })),
    ],
    annual_upsell: [
      t(`Switch to annual and save $${(39 - 32) * 12} — you've been on Zari 3 months.`, React.createElement(AnnualUpsell, {
        firstName,
        planName,
        monthlyPrice: 39,
        annualMonthlyPrice: 32,
        annualUrl,
        unsubscribeUrl: unsubUrl,
      })),
    ],
    detractor_followup: [
      t("Your feedback landed. I want to make it right.", React.createElement(DetractorFollowup1, { firstName, unsubscribeUrl: unsubUrl })),
      t("A direct offer — let me know if I can help.", React.createElement(DetractorFollowup2, { firstName, unsubscribeUrl: unsubUrl })),
    ],
  };
}

// ─── Sequence timing (delays between emails in days) ──────────────────────────

const SEQUENCE_DELAYS: Record<ZariSequence, number[]> = {
  lead_nurture:     [0, 2, 3, 3, 4, 4, 5],
  trial_onboarding: [0, 2, 3, 4, 4],
  trial_ending:     [0, 2],
  paid_welcome:     [0, 3, 4],
  milestone_1:      [0],
  milestone_5:      [0],
  upsell_limit:     [0, 3],
  at_risk:          [0, 7, 7],
  win_back_30:      [0],
  win_back_60:      [0],
  win_back_90:      [0],
  nps_survey:       [0],
  dunning:          [0, 3, 7],
  non_starter:      [2, 3, 5],   // 2 days after signup, then 3, then 5
  feature_activation: [0, 5, 5], // session 2 trigger, then 5-day gaps
  referral:           [0],
  testimonial:        [0],
  annual_upsell:      [0],
  detractor_followup: [0, 3],
};

// ─── Suppression ──────────────────────────────────────────────────────────────

export async function suppress(
  email: string,
  reason: "unsubscribe" | "bounce" | "complaint"
): Promise<void> {
  await prisma.emailSuppression.upsert({
    where: { email },
    update: { reason },
    create: { email, reason },
  });
  await prisma.emailSequenceEnrollment.updateMany({
    where: { email, canceledAt: null, completedAt: null },
    data: { canceledAt: new Date() },
  });
}

export async function unsuppress(email: string): Promise<void> {
  await prisma.emailSuppression.deleteMany({ where: { email } });
}

// ─── Enrollment ───────────────────────────────────────────────────────────────

/** Enroll a contact in a sequence. Pass `firstSendAt` to delay the first email. */
export async function enroll(
  sequence: ZariSequence,
  email: string,
  meta?: Meta,
  firstSendAt?: Date
): Promise<void> {
  const existing = await prisma.emailSequenceEnrollment.findUnique({
    where: { email_sequence: { email, sequence } },
  });
  if (existing && !existing.canceledAt && !existing.completedAt) return;

  const suppressed = await prisma.emailSuppression.findUnique({ where: { email } });
  if (suppressed) return;

  const firstDelay = SEQUENCE_DELAYS[sequence][0] ?? 0;
  const nextSendAt = firstSendAt ?? new Date(Date.now() + firstDelay * 86_400_000);

  await prisma.emailSequenceEnrollment.upsert({
    where: { email_sequence: { email, sequence } },
    update: { step: 0, nextSendAt, completedAt: null, canceledAt: null, metadata: (meta as object) ?? {} },
    create: { email, sequence, step: 0, nextSendAt, metadata: (meta as object) ?? {} },
  });
}

/** Cancel a specific sequence (or all sequences) for an email. */
export async function cancel(email: string, sequence?: ZariSequence): Promise<void> {
  await prisma.emailSequenceEnrollment.updateMany({
    where: { email, ...(sequence ? { sequence } : {}), canceledAt: null, completedAt: null },
    data: { canceledAt: new Date() },
  });
}

/** Cancel multiple named sequences for an email. */
export async function cancelMany(email: string, sequences: ZariSequence[]): Promise<void> {
  await prisma.emailSequenceEnrollment.updateMany({
    where: { email, sequence: { in: sequences }, canceledAt: null, completedAt: null },
    data: { canceledAt: new Date() },
  });
}

// ─── Cron processor ──────────────────────────────────────────────────────────

/**
 * Immediately send the first email of a sequence for a given email address,
 * without waiting for the cron. Used for time-sensitive emails like welcome.
 */
export async function sendNow(sequence: ZariSequence, email: string): Promise<void> {
  const suppressed = await prisma.emailSuppression.findUnique({ where: { email } });
  if (suppressed) return;

  const enrollment = await prisma.emailSequenceEnrollment.findUnique({
    where: { email_sequence: { email, sequence } },
  });
  if (!enrollment || enrollment.canceledAt || enrollment.completedAt || enrollment.step !== 0) return;

  const delays = SEQUENCE_DELAYS[sequence];
  if (!delays || delays.length === 0) return;

  const meta = (enrollment.metadata as Meta) ?? {};
  const unsubUrl = `${APP_URL}/api/email/unsubscribe?email=${encodeURIComponent(email)}`;
  const npsUrl = `${APP_URL}/api/nps?email=${encodeURIComponent(email)}`;

  const templates = makeTemplates(meta, unsubUrl, npsUrl);
  const tmpl = templates[sequence]?.[0];
  if (!tmpl) return;

  const [html, text] = await Promise.all([
    render(tmpl.element),
    render(tmpl.element, { plainText: true }),
  ]);
  await sendEmail({ to: email, subject: tmpl.subject, html, text, unsubscribeUrl: unsubUrl });

  const now = new Date();
  if (delays.length === 1) {
    await prisma.emailSequenceEnrollment.update({
      where: { id: enrollment.id },
      data: { step: 1, completedAt: now },
    });
  } else {
    await prisma.emailSequenceEnrollment.update({
      where: { id: enrollment.id },
      data: { step: 1, nextSendAt: new Date(now.getTime() + delays[1] * 86_400_000) },
    });
  }
}

/** Called by the daily cron. Sends all due sequence emails. Returns counts. */
export async function processSequenceQueue(): Promise<{ sent: number; errors: number }> {
  const now = new Date();
  let sent = 0;
  let errors = 0;

  const due = await prisma.emailSequenceEnrollment.findMany({
    where: { nextSendAt: { lte: now }, completedAt: null, canceledAt: null },
  });

  if (due.length === 0) return { sent, errors };

  // Batch-check suppression to avoid N+1
  const uniqueEmails = [...new Set(due.map((e: { email: string }) => e.email))];
  const suppressed = await prisma.emailSuppression.findMany({
    where: { email: { in: uniqueEmails } },
    select: { email: true },
  });
  const suppressedSet = new Set(suppressed.map((s: { email: string }) => s.email));

  for (const enrollment of due) {
    if (suppressedSet.has(enrollment.email)) {
      await prisma.emailSequenceEnrollment.update({
        where: { id: enrollment.id },
        data: { canceledAt: now },
      });
      continue;
    }

    try {
      const sequence = enrollment.sequence as ZariSequence;
      const delays = SEQUENCE_DELAYS[sequence];
      if (!delays) continue;

      const stepIdx = enrollment.step;
      if (stepIdx >= delays.length) continue;

      const meta = (enrollment.metadata as Meta) ?? {};
      const unsubUrl = `${APP_URL}/api/email/unsubscribe?email=${encodeURIComponent(enrollment.email)}`;
      const npsUrl = `${APP_URL}/api/nps?email=${encodeURIComponent(enrollment.email)}`;

      const templates = makeTemplates(meta, unsubUrl, npsUrl);
      const sequenceTemplates = templates[sequence];
      if (!sequenceTemplates) continue;

      const tmpl = sequenceTemplates[stepIdx];
      if (!tmpl) continue;

      const [html, text] = await Promise.all([
        render(tmpl.element),
        render(tmpl.element, { plainText: true }),
      ]);
      await sendEmail({ to: enrollment.email, subject: tmpl.subject, html, text, unsubscribeUrl: unsubUrl });
      sent++;

      const nextStepIdx = stepIdx + 1;
      if (nextStepIdx >= delays.length) {
        await prisma.emailSequenceEnrollment.update({
          where: { id: enrollment.id },
          data: { step: nextStepIdx, completedAt: now },
        });
      } else {
        const nextDelay = delays[nextStepIdx];
        await prisma.emailSequenceEnrollment.update({
          where: { id: enrollment.id },
          data: { step: nextStepIdx, nextSendAt: new Date(now.getTime() + nextDelay * 86_400_000) },
        });
      }
    } catch (err) {
      console.error(`[email-sequences] error for enrollment ${enrollment.id}:`, err);
      errors++;
    }
  }

  return { sent, errors };
}
