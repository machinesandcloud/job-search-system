import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { completeSessionForUser } from "@/lib/mvp/store";
import { prisma } from "@/lib/db";
import { syncSessionComplete } from "@/lib/zoho-crm";

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

  // Fire-and-forget: sync engagement data to Zoho CRM
  void (async () => {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return;
      const [sessionCount, tokenSum, subscription] = await Promise.all([
        prisma.coachingSession.count({ where: { userId, status: "complete" } }),
        prisma.aiTokenUsage.aggregate({ where: { userId }, _sum: { totalTokens: true } }),
        prisma.subscription.findUnique({ where: { accountId: user.accountId ?? undefined } }),
      ]);
      const daysSinceSignup = Math.floor(
        (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      await syncSessionComplete({
        userId,
        email: user.email,
        sessionId: id,
        sessionMode: session.mode ?? "unknown",
        sessionCount,
        totalTokenUsage: tokenSum._sum.totalTokens ?? 0,
        planTier: user.planTier ?? "free",
        subscriptionStatus: subscription?.status ?? "free",
        daysSinceSignup,
      });
    } catch {
      // non-blocking: swallow any Zoho sync errors
    }
  })();

  return NextResponse.json({
    sessionId: session.id,
    status: session.status,
    summary: session.summary,
  });
}
