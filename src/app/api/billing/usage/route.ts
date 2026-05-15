import { NextRequest, NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";
import { getCurrentPeriodTokenUsage, syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { prisma, isDatabaseReady } from "@/lib/db";
import { FREE_TOKEN_LIMIT } from "@/lib/plan-entitlements";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const identity = await syncCurrentUserToBillingIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { account, subscription } = identity;

  // Free tier — return lifetime token usage
  if (!subscription || !["active", "trialing"].includes(subscription.status)) {
    if (!isDatabaseReady()) {
      return NextResponse.json({ plan: "free", used: 0, limit: FREE_TOKEN_LIMIT, percentUsed: 0 });
    }

    const agg = await prisma.aiTokenUsage.aggregate({
      where: { accountId: account.id },
      _sum: { totalTokens: true },
    });

    const used = agg._sum.totalTokens || 0;
    const limit = FREE_TOKEN_LIMIT;
    const percentUsed = Math.round((used / limit) * 100);
    const remaining = Math.max(0, limit - used);

    return NextResponse.json({
      plan: "free",
      used,
      limit,
      remaining,
      percentUsed,
      warning: percentUsed >= 75,
      nearLimit: percentUsed >= 90,
      exhausted: used >= limit,
    });
  }

  // Paid tier — return current billing period usage
  const usage = await getCurrentPeriodTokenUsage(account.id);
  if (!usage) {
    return NextResponse.json({ error: "Usage data unavailable." }, { status: 503 });
  }

  const percentUsed = usage.limit > 0 ? Math.round((usage.used / usage.limit) * 100) : 0;

  return NextResponse.json({
    plan: subscription.planName || "paid",
    used: usage.used,
    limit: usage.limit,
    remaining: usage.remaining,
    percentUsed,
    usedCredits: usage.usedCredits,
    limitCredits: usage.limitCredits,
    remainingCredits: usage.remainingCredits,
    bonusTokens: usage.bonusTokens,
    periodEnd: usage.subscription.currentPeriodEnd,
    warning: percentUsed >= 75,
    nearLimit: percentUsed >= 90,
    exhausted: usage.used >= usage.limit,
  });
}
