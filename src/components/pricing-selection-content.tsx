import Link from "next/link";
import { PricingPlanCard } from "@/components/pricing-plan-card";
import { Reveal } from "@/components/reveal";
import {
  FREE_PREVIEW_FEATURES,
  PRICING_PLANS,
  PRICING_TESTIMONIALS,
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
  showProof = true,
}: {
  authenticated: boolean;
  checkoutAvailability: Record<PricingPlanId, boolean>;
  eyebrow: string;
  subtitle: string;
  previewHref: string;
  previewLabel: string;
  showProof?: boolean;
}) {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden px-6 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-2 h-[28rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(67,97,238,0.08),transparent_62%)] blur-[36px]" />
          <div className="absolute -left-24 top-8 h-[22rem] w-[22rem] rounded-full bg-[rgba(67,97,238,0.06)] blur-[110px]" />
          <div className="absolute -right-20 top-10 h-[20rem] w-[20rem] rounded-full bg-[rgba(34,211,238,0.08)] blur-[105px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A849C] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              {eyebrow}
            </span>
          </Reveal>

          <Reveal>
            <h1 className="mx-auto mt-6 max-w-4xl text-[3rem] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0A0A0F] md:text-[4.15rem]">
              Choose the Zari plan for
              <span className="gradient-text-animated"> your next move.</span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-[#68738A]">
              {subtitle}
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-7 text-[14px] text-[#7A849C]">
              Free preview included:
              {" "}
              <span className="font-medium text-[#334155]">{FREE_PREVIEW_FEATURES.join(" · ")}</span>
              {" "}
              <Link href={previewHref} className="font-semibold text-[var(--brand)] hover:underline">
                {previewLabel}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 pt-2 md:px-8">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid gap-6 xl:grid-cols-3">
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
            <p className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-6 text-[#7A849C]">
              {PRICING_TRUST_ITEMS.join(" · ")}
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-[13px] text-[#7A849C]">
              <span className="font-medium text-[#334155]">Top-ups:</span>
              {TOP_UP_PACKS.map((pack) => (
                <span key={pack.tokens} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[#526079]">
                  {pack.tokens} · {pack.price}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {showProof ? (
        <section className="relative overflow-hidden bg-white px-6 pb-24 pt-8 md:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[20rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(67,97,238,0.06),transparent_66%)] blur-[40px]" />
          </div>

          <div className="relative mx-auto max-w-[1280px]">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-[2.4rem] font-extrabold tracking-[-0.04em] text-[#0A0A0F] md:text-[3.2rem]">
                  Loved by 1,200+ candidates
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#68738A]">
                  Real outcomes from candidates using Zari for job search, promotion prep, negotiation, and career-change coaching.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 columns-1 gap-5 md:columns-2 xl:columns-3">
              {PRICING_TESTIMONIALS.slice(0, 6).map((item, index) => (
                <Reveal
                  key={`${item.name}-${item.tag}`}
                  className="mb-5 break-inside-avoid"
                >
                  <article className="kleo-testimonial">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                          style={{ background: item.accent }}
                        >
                          {item.initials}
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-[#0A0A0F]">{item.name}</p>
                          <p className="text-[13px] leading-5 text-[#68738A]">{item.role}</p>
                        </div>
                      </div>

                      <span
                        className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold"
                        style={{ color: item.accent, background: `${item.accent}12` }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-5 text-[15px] leading-7 text-[#334155]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
