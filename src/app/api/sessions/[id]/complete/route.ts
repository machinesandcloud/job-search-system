import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { completeSessionForUser } from "@/lib/mvp/store";
import { prisma } from "@/lib/db";
import { onSessionCompleted, onUserReengaged } from "@/lib/zoho-engine";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = await requirePaidRouteAccess("sessions_complete", {}, { enforceTokenLimit: false });
  if (!access.ok) return access.response;
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const session = await completeSessionForUser(userId, id);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Fire-and-forget: full revenue engine sync
  void (async () => {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return;

      const [sessionCount, tokenSum, subscription, tokenLimit] = await Promise.all([
        prisma.coachingSession.count({ where: { userId, status: "complete" } }),
        prisma.aiTokenUsage.aggregate({ where: { userId }, _sum: { totalTokens: true } }),
        prisma.subscription.findUnique({ where: { accountId: user.accountId ?? undefined } }),
        // Get plan token limit to compute utilization %
        prisma.aiTokenUsage.aggregate({ where: { userId, createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }, _sum: { totalTokens: true } }),
      ]);

      const daysSinceSignup = Math.floor((Date.now() - user.createdAt.getTime()) / 86_400_000);
      const totalTokens = tokenSum._sum.totalTokens ?? 0;
      const monthlyTokens = tokenLimit._sum.totalTokens ?? 0;

      // Detect re-engagement: previous session was > 14 days ago
      const previousSession = await prisma.coachingSession.findFirst({
        where: { userId, status: "complete", id: { not: id } },
        orderBy: { createdAt: "desc" },
      });
      const daysSinceLastSession = previousSession
        ? Math.floor((Date.now() - previousSession.createdAt.getTime()) / 86_400_000)
        : 0;

      if (daysSinceLastSession > 14 && sessionCount > 1) {
        void onUserReengaged({
          email: user.email,
          firstName: user.firstName ?? undefined,
          planTier: user.planTier ?? "free",
        });
      }

      // Rough token limit lookup per plan (matches billing.ts)
      const planLimits: Record<string, number> = {
        free: parseInt(process.env.PLAN_TOKEN_LIMIT_FREE ?? "50000"),
        pro: parseInt(process.env.PLAN_TOKEN_LIMIT_PRO ?? "200000"),
        premium: parseInt(process.env.PLAN_TOKEN_LIMIT_PREMIUM ?? "600000"),
        team: 99_999_999,
      };
      const limit = planLimits[user.planTier ?? "free"] ?? 50000;
      const tokenLimitPercent = Math.round((monthlyTokens / limit) * 100);

      await onSessionCompleted({
        userId,
        email: user.email,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        sessionId: id,
        sessionMode: session.mode ?? "unknown",
        sessionCount,
        totalTokenUsage: totalTokens,
        planTier: user.planTier ?? "free",
        subscriptionStatus: subscription?.status ?? "free",
        daysSinceSignup,
        tokenLimitPercent,
      });
    } catch {
      // non-blocking
    }
  })();

  return NextResponse.json({
    sessionId: session.id,
    status: session.status,
    summary: session.summary,
  });
}
