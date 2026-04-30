import Link from "next/link";
import { PricingPlanCard } from "@/components/pricing-plan-card";
import { Reveal } from "@/components/reveal";
import {
  FREE_PREVIEW_FEATURES,
  PRICING_PLANS,
  PRICING_TRUST_ITEMS,
  TOP_UP_PACKS,
  type PricingPlanId,
} from "@/lib/pricing-catalog";

export function PricingSelectionContent({
  authenticated,
  checkoutAvailability,
  eyebrow,
  subtitle,
  previewHref,
  previewLabel,
}: {
  authenticated: boolean;
  checkoutAvailability: Record<PricingPlanId, boolean>;
  eyebrow: string;
  subtitle: string;
  previewHref: string;
  previewLabel: string;
}) {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden px-6 pb-8 pt-16 md:px-8 md:pb-10 md:pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-28 top-0 h-[26rem] w-[26rem] rounded-full bg-[rgba(67,97,238,0.08)] blur-[120px]" />
          <div className="absolute -right-24 top-10 h-[24rem] w-[24rem] rounded-full bg-[rgba(34,211,238,0.10)] blur-[115px]" />
          <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(67,97,238,0.05),transparent_42%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A849C] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              {eyebrow}
            </span>
          </Reveal>

          <Reveal>
            <h1 className="mx-auto mt-6 max-w-4xl text-[3rem] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0A0A0F] md:text-[4.4rem]">
              Pick the Zari plan that matches
              <span className="gradient-text-animated"> the move you&apos;re making.</span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-[#68738A]">
              {subtitle}
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {FREE_PREVIEW_FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-[#334155] shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                  {feature}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-5 text-[14px] text-[#7A849C]">
              Free preview included on every account.
              {" "}
              <Link href={previewHref} className="font-semibold text-[var(--brand)] hover:underline">
                {previewLabel}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 pt-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 xl:grid-cols-3">
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
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#7A849C]">
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
            <div className="mx-auto mt-8 max-w-4xl rounded-[24px] border border-slate-200 bg-white px-6 py-5 text-center shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A849C]">Top-ups</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {TOP_UP_PACKS.map((pack) => (
                  <div
                    key={pack.tokens}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[14px] font-medium text-[#334155]"
                  >
                    {pack.tokens} · {pack.price}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] text-[#7A849C]">
                Keep your subscription. Add tokens only when you need them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
