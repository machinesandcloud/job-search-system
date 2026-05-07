import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ZariPortal, type PortalViewer } from "@/components/zari-portal";
import {
  canAccessSubscriptionStatus,
  getCurrentSubscriptionAccess,
  getCurrentPeriodTokenUsage,
  getPlanIncludedMonthlyCredits,
  getPlanMonthlyAmountCents,
  getReadablePlanName,
  getPricingCatalogPlanId,
  syncCurrentUserToBillingIdentity,
} from "@/lib/billing";
import { FREE_PREVIEW_COOKIE_NAME, hasFreePreviewAccess } from "@/lib/free-preview";
import { getDashboardForUser } from "@/lib/mvp/store";

function buildPortalViewer(input: {
  dashboardName?: string | null;
  dashboardEmail?: string | null;
  identity?: Awaited<ReturnType<typeof syncCurrentUserToBillingIdentity>> | null;
  subscription?: {
    planName?: string | null;
    stripePriceId?: string | null;
    status?: string | null;
  } | null;
}): PortalViewer {
  const identity = input.identity;
  const role = (identity?.user?.role || "member") as PortalViewer["role"];
  const fullName = `${identity?.user?.firstName || ""} ${identity?.user?.lastName || ""}`.trim();
  const email = input.dashboardEmail?.trim() || identity?.user?.email || "";
  const name = input.dashboardName?.trim() || fullName || email.split("@")[0] || "Your account";
  const subscriptionSource = input.subscription || identity?.subscription || null;
  const planId = getPricingCatalogPlanId(subscriptionSource?.planName, subscriptionSource?.stripePriceId);
  const subscriptionStatus = subscriptionSource?.status || null;
  const isPaid = role === "admin" || role === "support" || canAccessSubscriptionStatus(subscriptionStatus);

  return {
    name,
    email,
    role,
    planId,
    planName:
      role === "admin" || role === "support"
        ? "Internal operator"
        : getReadablePlanName(subscriptionSource?.planName, subscriptionSource?.stripePriceId),
    isPaid,
    subscriptionStatus,
    includedMonthlyCredits:
      role === "admin" || role === "support"
        ? null
        : getPlanIncludedMonthlyCredits(subscriptionSource?.planName, subscriptionSource?.stripePriceId),
    usedMonthlyCredits: null,
    remainingMonthlyCredits: null,
    creditLimit: null,
    monthlyPriceCents:
      role === "admin" || role === "support"
        ? null
        : getPlanMonthlyAmountCents(subscriptionSource?.planName, subscriptionSource?.stripePriceId),
  };
}

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const cookieStore = await cookies();
  const freePreviewEnabled = hasFreePreviewAccess(
    cookieStore.get(FREE_PREVIEW_COOKIE_NAME)?.value,
    userId,
  );

  const dashboard = await getDashboardForUser(userId);
  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const tokenUsage = identity?.account?.id ? await getCurrentPeriodTokenUsage(identity.account.id).catch(() => null) : null;
  if (identity?.user?.role === "admin" || identity?.user?.role === "support") {
    const viewer = buildPortalViewer({
      dashboardName: dashboard?.user?.name,
      dashboardEmail: dashboard?.user?.email,
      identity,
    });
    return <ZariPortal viewer={viewer} />;
  }

  const access = await getCurrentSubscriptionAccess().catch(() => {
    if (identity?.subscription && canAccessSubscriptionStatus(identity.subscription.status)) {
      return {
        ok: true as const,
        user: identity.user,
        account: identity.account,
        subscription: identity.subscription,
      };
    }

    return {
      ok: false as const,
      status: 503,
      error: "We could not verify your subscription right now.",
      user: identity?.user || null,
      account: identity?.account || null,
      subscription: identity?.subscription || null,
    };
  });
  if ("ok" in access && access.ok) {
    const viewer = buildPortalViewer({
      dashboardName: dashboard?.user?.name,
      dashboardEmail: dashboard?.user?.email,
      identity,
      subscription: access.subscription || identity?.subscription || null,
    });
    viewer.usedMonthlyCredits = tokenUsage?.usedCredits ?? null;
    viewer.remainingMonthlyCredits = tokenUsage?.remainingCredits ?? null;
    viewer.creditLimit = tokenUsage?.limitCredits ?? null;
    return <ZariPortal viewer={viewer} />;
  }

  if (freePreviewEnabled) {
    const viewer = buildPortalViewer({
      dashboardName: dashboard?.user?.name,
      dashboardEmail: dashboard?.user?.email,
      identity,
    });
    viewer.usedMonthlyCredits = tokenUsage?.usedCredits ?? null;
    viewer.remainingMonthlyCredits = tokenUsage?.remainingCredits ?? null;
    viewer.creditLimit = tokenUsage?.limitCredits ?? null;
    return <ZariPortal viewer={viewer} />;
  }

  if ("status" in access && access.status === 401) redirect("/login");
  redirect("/onboarding/plan");

  const viewer = buildPortalViewer({
    dashboardName: dashboard?.user?.name,
    dashboardEmail: dashboard?.user?.email,
    identity,
  });
  return <ZariPortal viewer={viewer} />;
}
