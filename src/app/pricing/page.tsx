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
        eyebrow="Pricing"
        subtitle="Pick the level of coaching that fits what you are working on right now, then add more tokens only if you need more usage."
        previewHref={authenticated ? "/dashboard" : "/signup"}
        previewLabel={authenticated ? "Open it now" : "Start it now"}
        showProof
      />
    </MarketingSiteShell>
  );
}
