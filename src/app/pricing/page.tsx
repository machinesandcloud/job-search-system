import { Card, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";
import { getCurrentUserId } from "@/lib/mvp/auth";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    body: "Enough to experience the workflow and understand the coaching model.",
    features: ["1 resume review", "1 LinkedIn review", "1 interview practice session", "Saved dashboard recap"],
    tone: "light",
  },
  {
    name: "Pro",
    price: "$19",
    body: "For candidates actively iterating on materials and preparing for multiple rounds.",
    features: ["More review sessions", "Longer session history", "Richer recap and action plans", "Priority access to new coaching surfaces"],
    tone: "dark",
  },
  {
    name: "Premium",
    price: "Later",
    body: "Reserved for higher-touch coaching once the core workflow proves itself.",
    features: ["Human + AI hybrid support", "Structured accountability cadence", "Deeper narrative guidance", "Reserved for post-MVP validation"],
    tone: "blue",
  },
];

export default async function PricingPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Pricing"
      title="Simple entry pricing now, room for premium coaching later."
      description="Pricing should read like a product decision, not a placeholder. The free tier makes the workflow easy to test, the paid plan expands usage for active candidates, and premium support can arrive later once the product earns it."
      primaryCta={{ href: "/signup", label: "Start free" }}
      secondaryCta={{ href: "/platform", label: "See platform" }}
      spotlightTitle="Low-friction entry, clear upgrade path."
      spotlightBody="The pricing page should explain why someone starts, what unlocks with more usage, and how the product can eventually expand into premium coaching without confusing the offer right now."
      spotlightPoints={[
        "Free tier to remove decision friction and let users experience the workflow.",
        "Straightforward Pro plan for active job searches and repeated practice.",
        "Future premium layer only after the self-serve product is clearly valuable.",
      ]}
    >
      <Section className="grid gap-5 pt-8 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={
              tier.tone === "dark"
                ? "border-none bg-[var(--navy)] text-white"
                : tier.tone === "blue"
                  ? "border-none bg-[linear-gradient(135deg,#3559e6_0%,#8a81ff_100%)] text-white"
                  : ""
            }
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${tier.tone === "light" ? "text-[var(--blue)]" : "text-white/70"}`}>{tier.name}</p>
            <p className="mt-5 text-6xl leading-none tracking-[-0.06em]">{tier.price}</p>
            <p className={`mt-5 text-sm leading-7 ${tier.tone === "light" ? "text-[var(--muted)]" : "text-white/78"}`}>{tier.body}</p>
            <ul className={`mt-6 grid gap-3 text-sm leading-7 ${tier.tone === "light" ? "text-[var(--muted)]" : "text-white/78"}`}>
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Card>
        ))}
      </Section>

      <Section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">What pricing should communicate</p>
          <div className="mt-5 grid gap-3">
            {[
              "The product is easy to try without a long sales process.",
              "Upgrading buys repetition, continuity, and deeper use of the coaching system.",
              "Premium support is a future service layer, not fake urgency on the current page.",
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-[var(--surface-muted)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Value promise</p>
          <h2 className="mt-5 text-5xl leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">Candidates should understand that they are paying for sharper outcomes, not more prompts.</h2>
          <p className="mt-5 text-base leading-8 text-[var(--muted)]">
            The paid tiers should reinforce what makes the product better: more structured reviews, deeper practice, and stronger continuity
            across the job search.
          </p>
        </Card>
      </Section>
    </MarketingShell>
  );
}
