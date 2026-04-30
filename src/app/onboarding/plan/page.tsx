import Link from "next/link";
import { redirect } from "next/navigation";
import { CursorGlow, StarField } from "@/components/mvp-hero-extras";
import { PricingPlanCard } from "@/components/pricing-plan-card";
import { PricingSocialProof } from "@/components/pricing-social-proof";
import { Reveal } from "@/components/reveal";
import { ZariLogo } from "@/components/zari-logo";
import {
  FREE_PREVIEW_FEATURES,
  PRICING_PLANS,
  PRICING_TRUST_ITEMS,
  TOP_UP_PACKS,
} from "@/lib/pricing-catalog";
import { getStripeSubscriptionPriceId } from "@/lib/stripe";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function OnboardingPlanPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/signup");

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
            <Link
              href="/dashboard"
              className="hidden rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-semibold text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)] sm:inline-flex"
            >
              Continue with free preview
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="rounded-full border border-[var(--border)] px-4 py-2 text-[13px] font-semibold text-[var(--ink-2)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main>
        <section className="noise-overlay relative overflow-hidden pb-16 pt-16 md:pb-20 md:pt-20">
          <StarField count={55} />
          <CursorGlow color="rgba(67,97,238,0.10)" size={520} />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              style={{
                position: "absolute",
                width: "620px",
                height: "620px",
                top: "-20%",
                left: "-10%",
                background: "var(--brand)",
                opacity: 0.12,
                filter: "blur(150px)",
                borderRadius: "50%",
                animation: "float-a 18s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "560px",
                height: "560px",
                top: "-8%",
                right: "-8%",
                background: "var(--cyan)",
                opacity: 0.1,
                filter: "blur(145px)",
                borderRadius: "50%",
                animation: "float-b 22s ease-in-out infinite",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex rounded-full border border-[var(--border)] bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] shadow-[var(--shadow)]">
                  One last step
                </span>
                <h1 className="mt-6 text-[3rem] font-extrabold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] md:text-[4.5rem]">
                  Pick the Zari plan that matches the move you&apos;re making.
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-[var(--muted)]">
                  Start with the free preview if you want to test the quality first, or choose the paid tier that unlocks the workflows you actually need.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass-white mx-auto mt-10 max-w-5xl rounded-[28px] p-6 shadow-[var(--shadow-lg)] md:p-7">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
                      Free preview already included
                    </p>
                    <h2 className="mt-3 text-[2rem] font-extrabold tracking-[-0.04em] text-[var(--ink)]">
                      Try the product before you spend a dollar.
                    </h2>
                    <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">
                      Every account starts with real output: one resume review, one LinkedIn review, and one mock interview. No card required.
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-[var(--ink)] px-7 text-[14px] font-semibold text-white shadow-[var(--shadow)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dark)]"
                  >
                    Use free preview →
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
          </div>
        </section>

        <section className="pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-5 xl:grid-cols-3">
              {PRICING_PLANS.map((plan) => (
                <Reveal key={plan.id}>
                  <PricingPlanCard
                    plan={plan}
                    authenticated
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Need more later?</p>
                <h3 className="mt-3 text-[1.65rem] font-extrabold tracking-[-0.04em] text-[var(--ink)]">
                  Add tokens without changing plans.
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

        <PricingSocialProof
          heading="Candidates stay when the coaching actually changes the outcome."
          subheading="The point of the pricing page is not to sell 'AI.' It is to make it obvious which level of help you need next."
        />
      </main>
    </div>
  );
}
