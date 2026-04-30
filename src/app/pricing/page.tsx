import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { CursorGlow, StarField } from "@/components/mvp-hero-extras";
import { PricingPlanCard } from "@/components/pricing-plan-card";
import { PricingSocialProof } from "@/components/pricing-social-proof";
import { Reveal } from "@/components/reveal";
import {
  FREE_PREVIEW_FEATURES,
  PRICING_FAQS,
  PRICING_PLANS,
  PRICING_TRUST_ITEMS,
  TOP_UP_PACKS,
} from "@/lib/pricing-catalog";
import { getStripeSubscriptionPriceId } from "@/lib/stripe";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function PricingPage() {
  const userId = await getCurrentUserId();
  const authenticated = Boolean(userId);
  const checkoutAvailability = Object.fromEntries(
    PRICING_PLANS.map((plan) => [plan.id, Boolean(getStripeSubscriptionPriceId(plan.id))])
  ) as Record<(typeof PRICING_PLANS)[number]["id"], boolean>;

  return (
    <PageFrame authenticated={authenticated}>
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] pb-28 pt-24 text-white md:pb-32 md:pt-28">
        <StarField count={80} />
        <CursorGlow color="rgba(6,182,212,0.11)" size={560} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            style={{
              position: "absolute",
              width: "620px",
              height: "620px",
              top: "-12%",
              left: "-9%",
              background: "var(--cyan)",
              opacity: 0.12,
              filter: "blur(140px)",
              borderRadius: "50%",
              animation: "float-a 18s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "540px",
              height: "540px",
              top: "-8%",
              right: "-8%",
              background: "var(--purple)",
              opacity: 0.08,
              filter: "blur(130px)",
              borderRadius: "50%",
              animation: "float-b 21s ease-in-out infinite",
            }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 backdrop-blur-sm">
              Pricing
            </span>
          </Reveal>
          <Reveal>
            <h1 className="mt-6 text-[3.2rem] font-extrabold leading-[1.02] tracking-[-0.05em] md:text-[4.6rem]">
              Pay for the level of career coaching
              <span className="gradient-text-animated"> you actually need.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-white/55">
              Start with a free preview. When you&apos;re ready, pick the plan that matches your current move: job search only, everything except executive, or the full executive stack.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-[var(--bg)] pb-20 pt-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--dark)] to-transparent opacity-10" />
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="glass-white mx-auto -mt-24 max-w-5xl rounded-[28px] p-6 shadow-[var(--shadow-lg)] md:p-7">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
                    Free preview first
                  </p>
                  <h2 className="mt-3 text-[2rem] font-extrabold tracking-[-0.04em] text-[var(--ink)]">
                    You can test the product before subscribing.
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">
                    Every new account gets one resume review, one LinkedIn review, and one mock interview with no card required.
                  </p>
                </div>

                <Link
                  href={authenticated ? "/dashboard" : "/signup"}
                  className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-[var(--ink)] px-7 text-[14px] font-semibold text-white shadow-[var(--shadow)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dark)]"
                >
                  {authenticated ? "Open free preview" : "Start free preview"} →
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {FREE_PREVIEW_FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-2 text-[13px] font-medium text-[var(--ink-2)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 xl:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <Reveal key={plan.id}>
                <PricingPlanCard
                  plan={plan}
                  authenticated={authenticated}
                  checkoutEnabled={checkoutAvailability[plan.id]}
                />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[var(--muted)]">
              {PRICING_TRUST_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-10 max-w-4xl rounded-[24px] border border-[var(--border)] bg-white p-6 text-center shadow-[var(--shadow)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Token top-ups</p>
              <h3 className="mt-3 text-[1.65rem] font-extrabold tracking-[-0.04em] text-[var(--ink)]">
                Keep your plan. Add more usage when you need it.
              </h3>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {TOP_UP_PACKS.map((pack) => (
                  <div
                    key={pack.tokens}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-[14px] font-medium text-[var(--ink-2)]"
                  >
                    {pack.tokens} · {pack.price}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PricingSocialProof />

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                FAQ
              </span>
              <h2 className="mt-5 text-[2.4rem] font-extrabold tracking-[-0.04em] text-[var(--ink)] md:text-[3rem]">
                Clear pricing, no weird surprises.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {PRICING_FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-[22px] border border-[var(--border)] bg-[var(--bg)] open:bg-white open:shadow-[var(--shadow)]">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                  <span className="text-[15px] font-semibold text-[var(--ink)]">{faq.q}</span>
                  <svg className="h-5 w-5 flex-shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-[14.5px] leading-7 text-[var(--muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="noise-overlay relative overflow-hidden py-24 text-white"
        style={{ background: "linear-gradient(135deg,#062235 0%,var(--brand) 38%,#063844 70%,var(--dark) 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            style={{
              position: "absolute",
              left: "-5%",
              top: "-10%",
              width: "520px",
              height: "520px",
              background: "var(--cyan)",
              opacity: 0.12,
              filter: "blur(130px)",
              borderRadius: "50%",
              animation: "float-b 18s ease-in-out infinite",
            }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="text-[2.8rem] font-extrabold tracking-[-0.04em] md:text-[3.5rem]">
              Start with the preview. Upgrade when the product proves itself.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-white/60">
              That is the whole model: low-friction entry, clearer plan boundaries, and the option to buy more usage without forcing an upgrade.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={authenticated ? "/dashboard" : "/signup"}
                className="inline-flex h-14 items-center rounded-2xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5"
              >
                {authenticated ? "Open dashboard" : "Create account"} →
              </Link>
              <Link
                href="/platform"
                className="inline-flex h-14 items-center rounded-2xl border border-white/20 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.10] hover:text-white"
              >
                Explore the platform
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageFrame>
  );
}
