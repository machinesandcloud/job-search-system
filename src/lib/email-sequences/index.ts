// Email Sequence Engine
//
// Enrollments are stored in EmailSequenceEnrollment.
// The daily cron (/api/cron/zoho-health) calls processSequenceQueue()
// to send all emails whose nextSendAt has passed.
// EmailSuppression blocks delivery for unsubscribes, bounces, and complaints.

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
  UNSUB_PLACEHOLDER,
  type EmailTemplate,
} from "./templates";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

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

type Meta = Record<string, string | number | boolean | undefined>;
type Step = { delayDays: number; template: (meta: Meta) => EmailTemplate };

function steps(arr: EmailTemplate[], deltas: number[]): Step[] {
  return arr.map((t, i) => ({ delayDays: deltas[i] ?? 0, template: () => t }));
}

// Delays are *between* emails (days after previous send, not from day 0)
const SEQUENCES: Record<ZariSequence, Step[]> = {
  lead_nurture:     steps(lead_nurture,     [0, 2, 3, 3, 4, 4, 5]),
  trial_onboarding: steps(trial_onboarding, [0, 2, 3, 4, 4]),
  trial_ending:     steps(trial_ending,     [0, 2]),
  paid_welcome: [
    { delayDays: 0, template: (m) => paid_welcome(m)[0] },
    { delayDays: 3, template: (m) => paid_welcome(m)[1] },
    { delayDays: 4, template: (m) => paid_welcome(m)[2] },
  ],
  milestone_1:  [{ delayDays: 0, template: (m) => milestone_1(m) }],
  milestone_5:  [{ delayDays: 0, template: (m) => milestone_5(m) }],
  upsell_limit: steps(upsell_limit, [0, 3]),
  at_risk:      steps(at_risk,      [0, 7, 7]),
  win_back_30:  [{ delayDays: 0, template: () => win_back_30 }],
  win_back_60:  [{ delayDays: 0, template: () => win_back_60 }],
  win_back_90:  [{ delayDays: 0, template: () => win_back_90 }],
  nps_survey:   [{ delayDays: 0, template: (m) => nps_survey(m) }],
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
  // Cancel all active enrollments for this email
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

  const firstDelay = SEQUENCES[sequence][0]?.delayDays ?? 0;
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
    // Auto-cancel suppressed enrollments
    if (suppressedSet.has(enrollment.email)) {
      await prisma.emailSequenceEnrollment.update({
        where: { id: enrollment.id },
        data: { canceledAt: now },
      });
      continue;
    }

    try {
      const sequence = enrollment.sequence as ZariSequence;
      const seqSteps = SEQUENCES[sequence];
      if (!seqSteps) continue;

      const step = seqSteps[enrollment.step];
      if (!step) continue;

      const meta = (enrollment.metadata as Meta) ?? {};
      const { subject, html: rawHtml } = step.template(meta);

      // Inject personalised unsubscribe URL
      const unsubUrl = `${APP_URL}/api/email/unsubscribe?email=${encodeURIComponent(enrollment.email)}`;
      const html = rawHtml.replaceAll(UNSUB_PLACEHOLDER, unsubUrl);

      await sendEmail({ to: enrollment.email, subject, html });
      sent++;

      const nextStepIdx = enrollment.step + 1;
      if (nextStepIdx >= seqSteps.length) {
        await prisma.emailSequenceEnrollment.update({
          where: { id: enrollment.id },
          data: { step: nextStepIdx, completedAt: now },
        });
      } else {
        const nextDelay = seqSteps[nextStepIdx].delayDays;
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
