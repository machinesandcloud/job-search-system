import { MarketingSiteShell } from "@/components/marketing-site-shell";
import { PricingSelectionContent } from "@/components/pricing-selection-content";
import { PRICING_PLANS } from "@/lib/pricing-catalog";
import { getStripeSubscriptionPriceId } from "@/lib/stripe";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function PricingPage() {
  const userId = await getCurrentUserId();
  const authenticated = Boolean(userId);
  const checkoutAvailability = Object.fromEntries(
    PRICING_PLANS.map((plan) => [plan.id, Boolean(getStripeSubscriptionPriceId(plan.id))])
  ) as Record<(typeof PRICING_PLANS)[number]["id"], boolean>;

  return (
    <MarketingSiteShell authenticated={authenticated} minimal>
      <PricingSelectionContent
        authenticated={authenticated}
        checkoutAvailability={checkoutAvailability}
        subtitle="Land jobs faster, get promoted sooner, and negotiate with confidence with the level of support that fits where you are now."
        showProof
      />
    </MarketingSiteShell>
  );
}
