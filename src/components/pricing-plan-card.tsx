import Link from "next/link";
import type { CSSProperties } from "react";
import { SubscriptionCheckoutButton } from "@/components/subscription-checkout-button";
import type { PricingPlan } from "@/lib/pricing-catalog";

function planTone(planId: PricingPlan["id"]) {
  if (planId === "growth") {
    return {
      badge: "bg-cyan-50 text-cyan-700",
      featuredBorder: "var(--brand)",
      panelSurface: "#F6FBFE",
      swooshPrimary: "rgba(6,182,212,0.28)",
      bullet: "text-cyan-600",
      buttonClass: "shadow-[var(--shadow-brand)]",
      buttonStyle: {
        background: "var(--brand)",
        color: "#FFFFFF",
        boxShadow: "var(--shadow-brand)",
      } satisfies CSSProperties,
    };
  }
  if (planId === "executive") {
    return {
      badge: "bg-amber-50 text-amber-700",
      featuredBorder: "var(--gold)",
      panelSurface: "#FFFBF5",
      swooshPrimary: "rgba(245,158,11,0.26)",
      bullet: "text-amber-500",
      buttonClass: "shadow-[var(--shadow)]",
      buttonStyle: {
        background: "#0A0A0F",
        color: "#FFFFFF",
        boxShadow: "var(--shadow)",
      } satisfies CSSProperties,
    };
  }
  return {
    badge: "bg-[var(--brand-light)] text-[var(--brand)]",
    featuredBorder: "var(--brand)",
    panelSurface: "#F7F9FF",
    swooshPrimary: "rgba(67,97,238,0.26)",
    bullet: "text-[var(--brand)]",
    buttonClass: "shadow-[var(--shadow)]",
    buttonStyle: {
      background: "#0A0A0F",
      color: "#FFFFFF",
      boxShadow: "var(--shadow)",
    } satisfies CSSProperties,
  };
}

function featureIntro(plan: PricingPlan) {
  if (plan.id === "growth") return "Everything in Search, plus:";
  if (plan.id === "executive") return "Everything in Growth, plus:";
  return "Everything in Search includes:";
}

export function PricingPlanCard({
  plan,
  authenticated,
  checkoutEnabled,
  signupHref = "/signup",
}: {
  plan: PricingPlan;
  authenticated: boolean;
  checkoutEnabled: boolean;
  signupHref?: string;
}) {
  const tone = planTone(plan.id);
  const signupTarget = `${signupHref}${signupHref.includes("?") ? "&" : "?"}plan=${plan.id}`;

  return (
    <div className="relative flex h-full flex-col">
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-md)] transition-transform duration-300 hover:-translate-y-1 ${
          plan.featured ? "md:-translate-y-3" : ""
        }`}
        style={plan.featured ? { borderColor: tone.featuredBorder, borderWidth: "2px" } : undefined}
      >
        {plan.featured ? (
          <div className="absolute right-0 top-0 flex items-center justify-center rounded-bl-[14px] rounded-tr-[24px] bg-[var(--brand)] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
            Best Value
          </div>
        ) : null}

        <div className={`flex h-full flex-col ${plan.featured ? "pt-3" : ""}`}>
          <div className="text-center">
            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${tone.badge}`}>
              {plan.tag}
            </span>
            <h3 className="mt-5 text-[2rem] font-extrabold tracking-[-0.04em] text-[var(--ink)]">{plan.name}</h3>
            <p className="mx-auto mt-3 max-w-[18rem] text-[14px] leading-6 text-[var(--ink-2)]">{plan.summary}</p>

            <div className="mt-6 flex items-end justify-center gap-2">
              <span className="text-[3.8rem] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink)]">
                {plan.price}
              </span>
              <span className="mb-1.5 text-[14px] font-medium text-[var(--muted)]">{plan.period}</span>
            </div>

            <p className="mt-3 text-[15px] font-medium text-[var(--ink-2)]">{plan.tokenLine}</p>
            <p className="mt-2 text-[14px] leading-6 text-[var(--muted)]">{plan.description}</p>
          </div>

          {authenticated ? (
            checkoutEnabled ? (
              <SubscriptionCheckoutButton
                planId={plan.id}
                label={plan.cta}
                className={`flex w-full items-center justify-center rounded-2xl py-3.5 text-[14px] font-semibold transition-all hover:-translate-y-0.5 ${tone.buttonClass}`}
                buttonStyle={tone.buttonStyle}
              />
            ) : (
              <div className="mt-8">
                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] py-3.5 text-[14px] font-semibold text-[var(--muted)] opacity-80"
                >
                  Checkout Coming Next
                </button>
              </div>
            )
          ) : (
            <Link
              href={signupTarget}
              className={`mt-8 flex w-full items-center justify-center rounded-2xl py-3.5 text-[14px] font-semibold transition-all hover:-translate-y-0.5 ${tone.buttonClass}`}
              style={tone.buttonStyle}
            >
              {plan.cta} →
            </Link>
          )}

          <div className="my-7 h-px bg-[var(--border)]" />

          <div
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] px-5 py-4"
            style={{ background: tone.panelSurface }}
          >
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Included</p>
            <div className="relative mt-2 inline-block max-w-[15rem] pb-4">
              <p className="relative text-[15px] font-semibold leading-6 tracking-[-0.02em] text-[var(--ink-2)]">
                {featureIntro(plan)}
              </p>
              <svg
                aria-hidden
                viewBox="0 0 220 24"
                className="pointer-events-none absolute -bottom-0.5 left-0 h-4 w-full"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M6 13C34 20 58 18 84 11C108 4 138 5 166 11C184 15 198 16 214 10"
                  stroke={tone.swooshPrimary}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tone.bullet}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                <span className="text-[14px] leading-6 text-[var(--ink-2)]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
