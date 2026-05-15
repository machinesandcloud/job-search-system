import { NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { enroll, processSequenceQueue } from "@/lib/email-sequences";
import type { ZariSequence } from "@/lib/email-sequences";

export const runtime = "nodejs";
export const maxDuration = 300; // backfill can take a while

export async function POST() {
  // Backfill is admin-only — it sends real emails to all users
  await requireCoachAdminActor("admin");

  const results = {
    total: 0,
    enrolled: 0,
    skipped: 0,
    suppressed: 0,
    emailsSent: 0,
    errors: 0,
  };

  // Load all suppressions upfront to avoid N+1
  const suppressionRows = await prisma.emailSuppression.findMany({ select: { email: true } });
  const suppressedSet = new Set(suppressionRows.map((r: { email: string }) => r.email));

  // Load all existing enrollments to avoid double-enrolling
  const existingRows = await prisma.emailSequenceEnrollment.findMany({
    where: { canceledAt: null, completedAt: null },
    select: { email: true, sequence: true },
  });
  const enrolledSet = new Set(existingRows.map((r: { email: string; sequence: string }) => `${r.email}::${r.sequence}`));

  // Load all users with their subscription status and session count
  const users = await prisma.user.findMany({
    where: {
      // Exclude placeholder / internal coach-admin accounts
      role: "member",
      email: { not: { contains: "@coach-admin" } },
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      planTier: true,
      createdAt: true,
      account: {
        select: {
          subscription: {
            select: { status: true, planName: true },
          },
        },
      },
      sessions: {
        where: { status: "complete" },
        select: { id: true },
      },
    },
  });

  results.total = users.length;

  for (const user of users) {
    try {
      if (suppressedSet.has(user.email)) {
        results.suppressed++;
        continue;
      }

      const subStatus = user.account?.subscription?.status ?? null;
      const sessionCount = user.sessions.length;
      const meta = {
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        planTier: user.planTier ?? "free",
      };

      // Determine which sequence this user should be in
      let targetSequence: ZariSequence | null = null;

      if (subStatus === "active") {
        targetSequence = "paid_welcome";
      } else if (subStatus === "trialing" || !subStatus || subStatus === "incomplete") {
        targetSequence = "trial_onboarding";
      } else if (subStatus === "past_due" || subStatus === "unpaid") {
        targetSequence = "dunning";
      } else if (subStatus === "canceled") {
        targetSequence = "win_back_30";
      }

      if (!targetSequence) {
        results.skipped++;
        continue;
      }

      // Skip if already in this sequence
      if (enrolledSet.has(`${user.email}::${targetSequence}`)) {
        results.skipped++;
        continue;
      }

      await enroll(targetSequence, user.email, meta);
      enrolledSet.add(`${user.email}::${targetSequence}`);

      // Also cancel non_starter for users who have completed sessions
      if (sessionCount > 0 && !enrolledSet.has(`${user.email}::non_starter`)) {
        // no-op — they were never enrolled so nothing to cancel
      }

      results.enrolled++;
    } catch (err) {
      console.error(`[backfill] error for ${user.email}:`, err);
      results.errors++;
    }
  }

  // Run the sequence queue to send all step-0 emails that are immediately due
  try {
    const queueResult = await processSequenceQueue();
    results.emailsSent = queueResult.sent;
    results.errors += queueResult.errors;
  } catch (err) {
    console.error("[backfill] processSequenceQueue error:", err);
  }

  return NextResponse.json({ ok: true, ...results });
}
