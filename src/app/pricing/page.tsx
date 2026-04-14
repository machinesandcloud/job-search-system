import { getCurrentUserId } from "@/lib/mvp/auth";
import { Card, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";

export default async function PricingPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Pricing"
      title="A clear free tier now, room for premium coaching later."
      description="The product spec explicitly calls for metering and plan controls from day one. Pricing should therefore read like a product decision, not an afterthought."
      primaryCta={{ href: "/signup", label: "Start free" }}
      secondaryCta={{ href: "/dashboard", label: "View dashboard" }}
    >
      <Section className="grid gap-6 pt-4 lg:grid-cols-3">
        <Card className="bg-[var(--surface-strong)]">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Free</p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">$0</p>
          <ul className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
            <li>1 resume review</li>
            <li>1 LinkedIn review</li>
            <li>1 mock interview</li>
            <li>Limited voice minutes</li>
          </ul>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Pro</p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">Later</p>
          <ul className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
            <li>More sessions and reviews</li>
            <li>Deeper rewriting workflows</li>
            <li>Longer session history</li>
            <li>Priority product access</li>
          </ul>
        </Card>
        <Card className="bg-[var(--ink)] text-[var(--bg-soft)]">
          <p className="text-sm uppercase tracking-[0.2em] text-[rgba(246,241,232,0.58)]">Premium coaching</p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Later</p>
          <ul className="mt-5 grid gap-3 text-sm text-[rgba(246,241,232,0.72)]">
            <li>Human + AI hybrid support</li>
            <li>Accountability and review cadence</li>
            <li>Higher-touch narrative guidance</li>
            <li>Reserved for post-MVP validation</li>
          </ul>
        </Card>
      </Section>
    </MarketingShell>
  );
}
