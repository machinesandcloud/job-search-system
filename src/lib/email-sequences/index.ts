// Email Sequence Engine
//
// Replaces Zoho Campaigns for sequence management.
// Enrollments are stored in EmailSequenceEnrollment (Prisma).
// The daily cron (/api/cron/zoho-health) calls processSequenceQueue()
// to send any emails whose nextSendAt has passed.

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";
import {
  lead_nurture,
  trial_onboarding,
  trial_ending,
  paid_welcome,
  milestone_1,
  milestone_5,
  upsell_limit,
  at_risk,
  win_back_30,
  win_back_60,
  win_back_90,
  nps_survey,
  type EmailTemplate,
} from "./templates";

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
  | "nps_survey";

// ─── Sequence definitions ─────────────────────────────────────────────────────
// Each step: { delayDays: days after previous email, template: fn(meta) => {subject,html} }

type Meta = Record<string, string | number | boolean | undefined>;
type Step = { delayDays: number; template: (meta: Meta) => EmailTemplate };

function steps(arr: EmailTemplate[], delays: number[]): Step[] {
  return arr.map((t, i) => ({ delayDays: delays[i] ?? 0, template: () => t }));
}

const SEQUENCES: Record<ZariSequence, Step[]> = {
  lead_nurture: steps(lead_nurture, [0, 2, 5, 8, 12, 16, 21].map((d, i, a) => i === 0 ? 0 : d - a[i - 1])),
  trial_onboarding: steps(trial_onboarding, [0, 2, 3, 4, 4]),
  trial_ending: steps(trial_ending, [0, 2]),
  paid_welcome: [
    { delayDays: 0, template: (m) => paid_welcome(m)[0] },
    { delayDays: 3, template: (m) => paid_welcome(m)[1] },
    { delayDays: 4, template: (m) => paid_welcome(m)[2] },
  ],
  milestone_1: [{ delayDays: 0, template: (m) => milestone_1(m) }],
  milestone_5: [{ delayDays: 0, template: (m) => milestone_5(m) }],
  upsell_limit: steps(upsell_limit, [0, 3]),
  at_risk: steps(at_risk, [0, 7, 7]),
  win_back_30: [{ delayDays: 0, template: () => win_back_30 }],
  win_back_60: [{ delayDays: 0, template: () => win_back_60 }],
  win_back_90: [{ delayDays: 0, template: () => win_back_90 }],
  nps_survey: [{ delayDays: 0, template: (m) => nps_survey(m) }],
};

// ─── Public API ───────────────────────────────────────────────────────────────

/** Enroll a contact in a sequence. No-ops if already enrolled and not canceled. */
export async function enroll(
  sequence: ZariSequence,
  email: string,
  meta?: Meta
): Promise<void> {
  const existing = await prisma.emailSequenceEnrollment.findUnique({
    where: { email_sequence: { email, sequence } },
  });

  if (existing && !existing.canceledAt) return; // already active

  const firstStep = SEQUENCES[sequence][0];
  const nextSendAt = new Date(Date.now() + firstStep.delayDays * 86_400_000);

  await prisma.emailSequenceEnrollment.upsert({
    where: { email_sequence: { email, sequence } },
    update: {
      step: 0,
      nextSendAt,
      completedAt: null,
      canceledAt: null,
      metadata: (meta as object) ?? {},
    },
    create: {
      email,
      sequence,
      step: 0,
      nextSendAt,
      metadata: (meta as object) ?? {},
    },
  });
}

/** Cancel all active enrollments for an email (across all sequences, or a specific one). */
export async function cancel(email: string, sequence?: ZariSequence): Promise<void> {
  await prisma.emailSequenceEnrollment.updateMany({
    where: {
      email,
      ...(sequence ? { sequence } : {}),
      canceledAt: null,
      completedAt: null,
    },
    data: { canceledAt: new Date() },
  });
}

/** Cancel a list of sequences for a contact. */
export async function cancelMany(email: string, sequences: ZariSequence[]): Promise<void> {
  await prisma.emailSequenceEnrollment.updateMany({
    where: {
      email,
      sequence: { in: sequences },
      canceledAt: null,
      completedAt: null,
    },
    data: { canceledAt: new Date() },
  });
}

// ─── Cron processor ──────────────────────────────────────────────────────────

/** Called by the daily cron. Sends all due sequence emails. Returns counts. */
export async function processSequenceQueue(): Promise<{ sent: number; errors: number }> {
  const now = new Date();
  let sent = 0;
  let errors = 0;

  const due = await prisma.emailSequenceEnrollment.findMany({
    where: {
      nextSendAt: { lte: now },
      completedAt: null,
      canceledAt: null,
    },
  });

  for (const enrollment of due) {
    try {
      const sequence = enrollment.sequence as ZariSequence;
      const steps = SEQUENCES[sequence];
      if (!steps) continue;

      const step = steps[enrollment.step];
      if (!step) continue;

      const meta = (enrollment.metadata as Meta) ?? {};
      const { subject, html } = step.template(meta);

      await sendEmail({ to: enrollment.email, subject, html });
      sent++;

      const nextStep = enrollment.step + 1;
      if (nextStep >= steps.length) {
        await prisma.emailSequenceEnrollment.update({
          where: { id: enrollment.id },
          data: { step: nextStep, completedAt: now },
        });
      } else {
        const nextDelay = steps[nextStep].delayDays;
        await prisma.emailSequenceEnrollment.update({
          where: { id: enrollment.id },
          data: {
            step: nextStep,
            nextSendAt: new Date(now.getTime() + nextDelay * 86_400_000),
          },
        });
      }
    } catch (err) {
      console.error(`[email-sequences] error processing enrollment ${enrollment.id}:`, err);
      errors++;
    }
  }

  return { sent, errors };
}
