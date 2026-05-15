import Link from "next/link";
import { redirect } from "next/navigation";
import { PlatformLogoutButton } from "@/components/platform-logout-button";
import { PricingSelectionContent } from "@/components/pricing-selection-content";
import { ZariLogo } from "@/components/zari-logo";
import { canAccessSubscriptionStatus, syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { PRICING_PLANS } from "@/lib/pricing-catalog";
import { getStripeSubscriptionPriceId } from "@/lib/stripe";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function OnboardingPlanPage({ searchParams }: { searchParams: Promise<{ upgrade?: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/signup");

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  if (identity?.user?.role === "admin" || identity?.user?.role === "support") {
    redirect("/dashboard");
  }
  const params = await searchParams;
  const isUpgrading = Boolean(params.upgrade);
  if (!isUpgrading && identity?.subscription && canAccessSubscriptionStatus(identity.subscription.status)) {
    redirect("/dashboard");
  }

  const checkoutAvailability = Object.fromEntries(
    PRICING_PLANS.map((plan) => [plan.id, Boolean(getStripeSubscriptionPriceId(plan.id))])
  ) as Record<(typeof PRICING_PLANS)[number]["id"], boolean>;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <ZariLogo size={36} />
            <div>
              <p className="text-[15px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Zari</p>
              <p className="text-[12px] text-[var(--muted)]">Plan selection</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <PlatformLogoutButton
              className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-semibold text-[var(--ink-2)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
            />
          </div>
        </div>
      </header>

      <main>
        <PricingSelectionContent
          authenticated
          checkoutAvailability={checkoutAvailability}
          eyebrow="One last step"
          titlePrimary="Choose the plan for your"
          titleAccent="next move."
          subtitle="Choose the plan that gives you the right level of coaching for what you are working on now."
          showProof={false}
        />
      </main>
    </div>
  );
}
