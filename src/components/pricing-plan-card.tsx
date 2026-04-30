import Link from "next/link";
import { SubscriptionCheckoutButton } from "@/components/subscription-checkout-button";
import type { PricingPlan } from "@/lib/pricing-catalog";

function planTone(planId: PricingPlan["id"]) {
  if (planId === "growth") {
    return {
      badge: "bg-cyan-50 text-cyan-700",
      accent: "var(--cyan)",
      tokenPanel: "from-cyan-50 via-white to-blue-50",
      bullet: "text-cyan-600",
      button: "bg-[var(--brand)] text-white shadow-[var(--shadow-brand)] hover:bg-[var(--brand-hover)]",
      outline: "conic-gradient(from var(--border-angle), #4361EE, #06B6D4, #8B5CF6, #06B6D4, #4361EE)",
    };
  }
  if (planId === "executive") {
    return {
      badge: "bg-amber-50 text-amber-700",
      accent: "var(--gold)",
      tokenPanel: "from-amber-50 via-white to-orange-50",
      bullet: "text-amber-500",
      button: "bg-[var(--ink)] text-white shadow-[var(--shadow)] hover:bg-[var(--dark)]",
      outline: "linear-gradient(135deg, rgba(245,158,11,0.36), rgba(245,158,11,0.12))",
    };
  }
  return {
    badge: "bg-[var(--brand-light)] text-[var(--brand)]",
    accent: "var(--brand)",
    tokenPanel: "from-blue-50 via-white to-indigo-50",
    bullet: "text-[var(--brand)]",
    button: "bg-[var(--ink)] text-white shadow-[var(--shadow)] hover:bg-[var(--dark)]",
    outline: "linear-gradient(135deg, rgba(67,97,238,0.18), rgba(6,182,212,0.08))",
  };
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
      {plan.featured ? (
        <div
          className="absolute -inset-[1.5px] rounded-[28px]"
          style={{ background: tone.outline, animation: "spin-border 3s linear infinite" }}
        />
      ) : null}

      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-md)] transition-transform duration-300 hover:-translate-y-1 ${
          plan.featured ? "md:-translate-y-3" : ""
        }`}
      >
        {plan.featured ? (
          <div className="absolute left-0 right-0 top-0 flex items-center justify-center bg-[var(--brand)] py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
            Best Value
          </div>
        ) : null}

        <div className={plan.featured ? "mt-6" : ""}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${tone.badge}`}>
                {plan.tag}
              </span>
              <h3 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[var(--ink)]">{plan.name}</h3>
              <p className="mt-2 text-[14px] font-medium text-[var(--ink-2)]">{plan.summary}</p>
            </div>
            <div
              className="hidden h-12 w-12 rounded-2xl md:block"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${tone.accent}, rgba(255,255,255,0.96))`,
                boxShadow: `0 12px 30px color-mix(in srgb, ${tone.accent} 18%, transparent)`,
              }}
            />
          </div>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-[3.7rem] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink)]">
              {plan.price}
            </span>
            <span className="mb-1.5 text-[14px] font-medium text-[var(--muted)]">{plan.period}</span>
          </div>

          <p className="mt-3 text-[14px] leading-6 text-[var(--muted)]">{plan.description}</p>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Access</p>
            <p className="mt-2 text-[14px] leading-6 text-[var(--ink-2)]">{plan.accessLabel}</p>
          </div>

          <div className={`mt-4 rounded-2xl border border-[var(--border)] bg-gradient-to-r ${tone.tokenPanel} p-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Included</p>
            <p className="mt-2 text-[15px] font-semibold text-[var(--ink)]">{plan.tokenLine}</p>
            <p className="mt-1 text-[13px] text-[var(--muted)]">Top up more anytime if you burn through your monthly balance.</p>
          </div>

          {authenticated ? (
            checkoutEnabled ? (
              <SubscriptionCheckoutButton
                planId={plan.id}
                label={plan.cta}
                className={`flex w-full items-center justify-center rounded-2xl py-3.5 text-[14px] font-semibold transition-all hover:-translate-y-0.5 ${tone.button}`}
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
              className={`mt-8 flex w-full items-center justify-center rounded-2xl py-3.5 text-[14px] font-semibold transition-all hover:-translate-y-0.5 ${tone.button}`}
            >
              {plan.cta} →
            </Link>
          )}

          <div className="my-6 h-px bg-[var(--border)]" />

          <ul className="space-y-3">
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
