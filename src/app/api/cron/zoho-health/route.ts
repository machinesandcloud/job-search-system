// Cron: runs daily (configure in Netlify or via cron service)
// Detects: at-risk users, trial-ending-soon, win-back timing
// Schedule: 0 9 * * * (9am UTC daily)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { onUserAtRisk, onTrialEnding } from "@/lib/zoho-engine";
import { computeHealthScore } from "@/lib/zoho-crm";
import { processSequenceQueue } from "@/lib/email-sequences";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  // Protect with a shared secret so only the cron caller can invoke
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const results = { atRisk: 0, trialEnding: 0, emailsSent: 0, errors: 0 };

  // ── 0. Process email sequence queue ────────────────────────────────────────
  try {
    const emailResults = await processSequenceQueue();
    results.emailsSent = emailResults.sent;
    results.errors += emailResults.errors;
  } catch (err) {
    console.error("[cron/zoho-health] sequence queue error:", err);
  }

  // ── 1. Detect at-risk active subscribers ───────────────────────────────────
  // Definition: paying user with no session in 14+ days AND health score < 50
  try {
    const activeUsers = await prisma.user.findMany({
      where: {
        account: {
          subscription: {
            status: { in: ["active", "trialing"] },
          },
        },
      },
      include: {
        account: { include: { subscription: true } },
        sessions: {
          where: { status: "complete" },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    for (const user of activeUsers) {
      try {
        const lastSession = user.sessions[0];
        const daysSinceLastSession = lastSession
          ? Math.floor((now.getTime() - lastSession.createdAt.getTime()) / 86_400_000)
          : 999;

        if (daysSinceLastSession < 14) continue;

        const sessionCount = await prisma.coachingSession.count({
          where: { userId: user.id, status: "complete" },
        });
        const tokenSum = await prisma.aiTokenUsage.aggregate({
          where: { userId: user.id },
          _sum: { totalTokens: true },
        });
        const daysSinceSignup = Math.floor(
          (now.getTime() - user.createdAt.getTime()) / 86_400_000
        );
        const subStatus = user.account?.subscription?.status ?? "free";

        const healthScore = computeHealthScore({
          sessionCount,
          tokenUsage: tokenSum._sum.totalTokens ?? 0,
          daysSinceSignup,
          subscriptionStatus: subStatus,
          planTier: user.planTier ?? "free",
          daysSinceLastSession,
        });

        if (healthScore < 50) {
          await onUserAtRisk({
            userId: user.id,
            email: user.email,
            firstName: user.firstName ?? "",
            planTier: user.planTier ?? "free",
            subscriptionStatus: subStatus,
            daysSinceLastSession,
            healthScore,
          });
          results.atRisk++;
        }
      } catch {
        results.errors++;
      }
    }
  } catch (err) {
    console.error("[cron/zoho-health] at-risk scan error:", err);
  }

  // ── 2. Detect trials ending in 3 days ──────────────────────────────────────
  try {
    const threeDaysFromNow = new Date(now.getTime() + 3 * 86_400_000);
    const fourDaysFromNow = new Date(now.getTime() + 4 * 86_400_000);

    const endingTrials = await prisma.subscription.findMany({
      where: {
        status: "trialing",
        trialEnd: {
          gte: threeDaysFromNow,
          lt: fourDaysFromNow,
        },
      },
      include: {
        account: {
          include: { users: { take: 1, orderBy: { createdAt: "asc" } } },
        },
      },
    });

    for (const sub of endingTrials) {
      try {
        const owner = sub.account?.users?.[0];
        if (!owner) continue;

        const sessionCount = await prisma.coachingSession.count({
          where: { userId: owner.id, status: "complete" },
        });

        await onTrialEnding({
          userId: owner.id,
          email: owner.email,
          firstName: owner.firstName ?? "",
          planTier: owner.planTier ?? "free",
          daysRemaining: 3,
          sessionCount,
        });
        results.trialEnding++;
      } catch {
        results.errors++;
      }
    }
  } catch (err) {
    console.error("[cron/zoho-health] trial-ending scan error:", err);
  }

  return NextResponse.json({
    ok: true,
    timestamp: now.toISOString(),
    ...results,
  });
}
