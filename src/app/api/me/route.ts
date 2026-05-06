import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { getDashboardForUser, updateProfile } from "@/lib/mvp/store";
import { syncPlatformProfile } from "@/lib/platform-users";
import {
  canAccessSubscriptionStatus,
  getCurrentPeriodTokenUsage,
  getCurrentSubscriptionAccess,
  getPlanIncludedMonthlyCredits,
  getPricingCatalogPlanId,
  getReadablePlanName,
  getPlanMonthlyAmountCents,
  syncCurrentUserToBillingIdentity,
} from "@/lib/billing";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const dashboard = await getDashboardForUser(userId);
  if (!dashboard) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const access = await getCurrentSubscriptionAccess().catch(() => null);
  const effectiveSubscription =
    access && "ok" in access && access.ok && access.subscription
      ? access.subscription
      : identity?.subscription || null;
  const role = identity?.user?.role || "member";
  const planId = getPricingCatalogPlanId(effectiveSubscription?.planName, effectiveSubscription?.stripePriceId);
  const subscriptionStatus = effectiveSubscription?.status || null;
  const isOperator = role === "admin" || role === "support";
  const isPaid = isOperator || canAccessSubscriptionStatus(subscriptionStatus);
  const tokenUsage = identity?.account?.id ? await getCurrentPeriodTokenUsage(identity.account.id).catch(() => null) : null;

  return NextResponse.json({
    user: dashboard.user,
    membership: {
      role,
      accountId: identity?.account?.id || null,
      planId,
      planName: isOperator
        ? "Internal operator"
        : getReadablePlanName(effectiveSubscription?.planName, effectiveSubscription?.stripePriceId),
      subscriptionStatus,
      isPaid,
      includedMonthlyCredits: isOperator ? null : getPlanIncludedMonthlyCredits(effectiveSubscription?.planName, effectiveSubscription?.stripePriceId),
      monthlyPriceCents: isOperator ? null : getPlanMonthlyAmountCents(effectiveSubscription?.planName, effectiveSubscription?.stripePriceId),
      usedMonthlyCredits: isOperator ? null : tokenUsage?.usedCredits ?? null,
      remainingMonthlyCredits: isOperator ? null : tokenUsage?.remainingCredits ?? null,
      creditLimit: isOperator ? null : tokenUsage?.limitCredits ?? null,
      tokensPerCredit: isOperator ? null : tokenUsage?.tokensPerCredit ?? null,
    },
    usage: dashboard.usage,
    onboardingStatus: dashboard.user.onboardingComplete ? "complete" : "pending",
  });
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const profile = await updateProfile(userId, {
    currentRole: String(body.currentRole || ""),
    targetRole: String(body.targetRole || ""),
    experienceLevel: String(body.experienceLevel || ""),
    geography: String(body.geography || ""),
    goals: Array.isArray(body.goals) ? body.goals.map(String) : [],
    painPoints: Array.isArray(body.painPoints) ? body.painPoints.map(String) : [],
  });

  if (profile) {
    await syncPlatformProfile(userId, profile).catch((error) => {
      console.error("[api/me] failed to sync profile to database", error);
    });
  }

  return NextResponse.json({ user: profile });
}
