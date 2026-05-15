import { HomeReviewWall } from "@/components/home-review-wall";
import { PricingPlanCard } from "@/components/pricing-plan-card";
import { Reveal } from "@/components/reveal";
import {
  PRICING_PLANS,
  PRICING_TRUST_ITEMS,
  type PricingPlanId,
} from "@/lib/pricing-catalog";

export function PricingSelectionContent({
  authenticated,
  checkoutAvailability,
  eyebrow,
  subtitle,
  titlePrimary = "One coach for every",
  titleAccent = "career move.",
  showProof = true,
}: {
  authenticated: boolean;
  checkoutAvailability: Record<PricingPlanId, boolean>;
  eyebrow?: string;
  subtitle: string;
  titlePrimary?: string;
  titleAccent?: string;
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
            {eyebrow ? (
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A849C] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                {eyebrow}
              </span>
            ) : null}
          </Reveal>

          <Reveal>
            <div style={{ maxWidth:920, margin:"0 auto", padding:"0 24px" }}>
              <h1
                style={{
                  fontSize:"clamp(2.6rem,4.8vw,3.5rem)",
                  fontWeight:800,
                  lineHeight:1.12,
                  letterSpacing:"-0.04em",
                  color:"#0A0A0F",
                  marginBottom:24,
                  textAlign:"center",
                }}
              >
                {titlePrimary}
                <br />
                <span
                  style={{
                    background:"linear-gradient(135deg,#4361EE 0%,#6B86FF 100%)",
                    WebkitBackgroundClip:"text",
                    WebkitTextFillColor:"transparent",
                    backgroundClip:"text",
                  }}
                >
                  {titleAccent}
                </span>
              </h1>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ maxWidth:760, margin:"0 auto", padding:"0 24px" }}>
              <p style={{ fontSize:16.5, lineHeight:1.7, color:"#5A6180", maxWidth:620, margin:"0 auto 20px" }}>
                {subtitle}
              </p>
            </div>
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

          {authenticated && (
            <Reveal>
              <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-8 py-6 text-center">
                <p className="text-[14px] font-semibold text-[#0A0A0F]">Not ready to commit?</p>
                <p className="text-[13px] leading-[1.6] text-[#5A6180]">
                  Try Zari for free — no credit card needed. You&apos;ll get limited access to core features so you can see what the coaching experience is like before choosing a plan.
                </p>
                <a
                  href="/api/onboarding/free-preview"
                  className="mt-1 inline-flex items-center gap-2 rounded-full border border-[#4361EE]/30 bg-white px-5 py-2.5 text-[13px] font-semibold text-[#4361EE] shadow-sm transition-all hover:border-[#4361EE]/60 hover:bg-[#4361EE]/5"
                >
                  Start exploring free →
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {showProof ? (
        <HomeReviewWall />
      ) : null}
    </main>
  );
}
