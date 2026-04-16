import Link from "next/link";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { redirect } from "next/navigation";
import { ZariLogo } from "@/components/zari-logo";
import { StarField } from "@/components/mvp-hero-extras";
import { Reveal } from "@/components/reveal";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    tagline: "Try every coaching surface before you commit.",
    features: [
      "1 resume review session",
      "1 LinkedIn optimization session",
      "1 mock interview session",
      "Session memory",
      "Dashboard recap",
      "Action plan output",
    ],
    cta: "Start for free",
    href: "/dashboard",
    featured: false,
    dark: false,
    muted: false,
    accent: "#A78BFA",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    tagline: "For candidates actively in the search.",
    features: [
      "Unlimited resume reviews",
      "Unlimited LinkedIn sessions",
      "Unlimited mock interviews",
      "Voice coaching mode",
      "Live avatar coach",
      "Full session history",
      "Multi-role target tracking",
      "Richer recaps & action plans",
    ],
    cta: "Start Pro — 7 days free",
    href: "/dashboard",
    featured: true,
    dark: true,
    muted: false,
    accent: "#7C3AED",
  },
  {
    name: "Premium",
    price: "Soon",
    period: "coming later",
    tagline: "Human + AI hybrid coaching.",
    features: [
      "Everything in Pro",
      "Weekly 1:1 human coach sessions",
      "Structured 6-week accountability plan",
      "Offer negotiation strategy",
      "Dedicated success manager",
    ],
    cta: "Join waitlist",
    href: "/dashboard",
    featured: false,
    dark: false,
    muted: true,
    accent: "#22D3EE",
  },
];

const REVIEWS = [
  {
    quote: "The Pro plan paid for itself after the first session. My resume score went from 52 to 89 and I got 4 callbacks the same week.",
    name: "Priya M.",
    role: "PM → Director",
    company: "Accepted at Notion",
    initials: "PM",
    color: "#7C3AED",
    bg: "linear-gradient(135deg, #2D0B6B, #0A0A1C)",
  },
  {
    quote: "I used the free tier to test it. Within 20 minutes I upgraded to Pro because the quality of feedback was unlike anything I'd used before.",
    name: "Kai T.",
    role: "Engineer → Staff",
    company: "Joined Stripe",
    initials: "KT",
    color: "#22D3EE",
    bg: "linear-gradient(135deg, #0C4A6E, #0A0A1C)",
  },
  {
    quote: "The voice mock interview feature alone is worth Pro. I practiced 8 times before my Google loop and my answers were completely transformed.",
    name: "Aaliyah R.",
    role: "DS → ML Engineer",
    company: "Offer from Google",
    initials: "AR",
    color: "#F59E0B",
    bg: "linear-gradient(135deg, #451A03, #0A0A1C)",
  },
  {
    quote: "Being a career returner, I was terrified. Zari walked me through every scenario, remembered my story, and helped me present my gap as an asset.",
    name: "Sofia K.",
    role: "Career Returner",
    company: "Accepted at Salesforce",
    initials: "SK",
    color: "#A78BFA",
    bg: "linear-gradient(135deg, #1E1B4B, #0A0A1C)",
  },
  {
    quote: "The LinkedIn overhaul was surreal. My recruiter DMs tripled in the first week. The headline Zari wrote for me was genuinely better than anything I'd tried.",
    name: "Marcus J.",
    role: "Backend → Principal",
    company: "Accepted at Databricks",
    initials: "MJ",
    color: "#7C3AED",
    bg: "linear-gradient(135deg, #2D0B6B, #0A0A1C)",
  },
  {
    quote: "I was skeptical about the free tier but Zari spotted 3 issues in my resume in the first minute that I'd never noticed. Upgraded immediately.",
    name: "David L.",
    role: "PM at series-A → FAANG",
    company: "Offer from Amazon",
    initials: "DL",
    color: "#22D3EE",
    bg: "linear-gradient(135deg, #0C4A6E, #0A0A1C)",
  },
];

const TRUST_ITEMS = [
  "No credit card to start",
  "Cancel Pro anytime",
  "Your data is always yours",
  "HTTPS + encrypted storage",
];

export default async function OnboardingPlanPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/signup");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--dark)] text-white">

      {/* Header */}
      <header className="border-b border-white/06 bg-[var(--dark)]/95 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <ZariLogo size={34} />
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Zari AI Coach
            </span>
          </Link>
          <Link href="/dashboard" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
            Skip for now →
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* ══════ PLAN HERO ══════ */}
        <section className="noise-overlay relative overflow-hidden pb-16 pt-16">
          <StarField count={70} />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div style={{ position:"absolute", width:"600px", height:"600px", top:"-15%", left:"50%", transform:"translateX(-50%)", background:"var(--brand)", opacity:.10, filter:"blur(160px)", borderRadius:"50%", animation:"float-a 20s ease-in-out infinite" }} />
          </div>
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
          <div className="hero-glow-line absolute left-0 right-0 top-0" />

          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" style={{ boxShadow:"0 0 6px var(--cyan)" }} />
              One last step
            </div>
            <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.04em] md:text-[3.8rem]">
              Choose your coaching plan.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-white/45">
              Start free and upgrade when you&apos;re ready. Most candidates see results on the free tier within their first session.
            </p>
          </div>
        </section>

        {/* ══════ PLANS ══════ */}
        <section className="bg-[var(--bg)] pb-20 pt-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-5 md:grid-cols-3 md:items-stretch">
              {PLANS.map((plan) => (
                <Reveal key={plan.name}>
                  <div className="relative flex h-full flex-col">
                    {plan.featured && (
                      <div className="absolute -inset-[1.5px] rounded-[22px]" style={{ background:`conic-gradient(from var(--border-angle), #7C3AED, #22D3EE, #A78BFA, #22D3EE, #7C3AED)`, animation:"spin-border 3s linear infinite", zIndex:0 }} />
                    )}
                    <div
                      className={`relative flex flex-1 flex-col overflow-hidden rounded-2xl p-7 ${plan.dark ? "bg-[var(--dark)] text-white" : "border border-[var(--border)] bg-white shadow-[var(--shadow)]"} ${plan.muted ? "opacity-70" : ""}`}
                      style={{ zIndex:1 }}
                    >
                      {plan.featured && (
                        <div className="absolute left-0 right-0 top-0 flex items-center justify-center py-1.5" style={{ background:`linear-gradient(90deg, var(--brand), var(--cyan))` }}>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Most popular</span>
                        </div>
                      )}
                      <div className={plan.featured ? "mt-6" : ""}>
                        <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${plan.dark ? "text-white/40" : "text-[var(--muted)]"}`}>{plan.name}</p>
                        <div className="mt-4 flex items-end gap-2">
                          <span className={`text-[3.2rem] font-extrabold leading-none tracking-[-0.05em] ${plan.dark ? "text-white" : plan.muted ? "text-[var(--muted)]" : "text-[var(--ink)]"}`}>{plan.price}</span>
                          <span className={`mb-1.5 text-[13px] ${plan.dark ? "text-white/35" : "text-[var(--muted)]"}`}>{plan.period}</span>
                        </div>
                        <p className={`mt-3 text-[14px] leading-6 ${plan.dark ? "text-white/50" : "text-[var(--muted)]"}`}>{plan.tagline}</p>
                        <div className={`my-5 h-px ${plan.dark ? "bg-white/[0.07]" : "bg-[var(--border)]"}`} />
                        <ul className="flex-1 space-y-2.5">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: plan.accent }}><polyline points="20,6 9,17 4,12" /></svg>
                              <span className={`text-[13.5px] leading-5 ${plan.dark ? "text-white/70" : "text-[var(--ink-2)]"}`}>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={plan.href}
                          className={`mt-7 flex w-full items-center justify-center rounded-xl py-3.5 text-[14px] font-semibold transition-all hover:-translate-y-0.5 ${
                            plan.featured
                              ? "bg-[var(--brand)] text-white shadow-[var(--shadow-brand)] hover:bg-[var(--brand-hover)]"
                              : plan.muted
                                ? "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                                : "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                          }`}
                        >
                          {plan.cta} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Trust notes */}
            <Reveal>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-[12.5px] text-[var(--muted)]">
                {TRUST_ITEMS.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    {s}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════ REVIEWS ══════ */}
        <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div style={{ position:"absolute", width:"500px", height:"500px", bottom:"-10%", right:"-5%", background:"var(--brand)", opacity:.08, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 22s ease-in-out infinite" }} />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-14 text-center">
                <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em] md:text-[2.8rem]">
                  What candidates are saying.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] text-white/40">
                  Real sessions. Real results. Real careers changed.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((r, ri) => (
                <Reveal key={r.name} data-delay={String((ri % 3) + 1) as "1"|"2"|"3"}>
                  <div
                    className="testimonial-card flex flex-col rounded-2xl p-6 text-white"
                    style={{ background: r.bg, "--accent-color": r.color } as React.CSSProperties}
                  >
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: r.color }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="mb-5 flex-1 text-[14px] leading-7 text-white/70">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ background:`${r.color}40` }}
                      >
                        {r.initials}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-white">{r.name}</p>
                        <p className="text-[11px] text-white/45">{r.role}</p>
                        <p className="text-[11px] font-semibold" style={{ color: r.color }}>{r.company}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ BOTTOM CTA ══════ */}
        <section className="bg-[var(--bg)] py-16 text-center">
          <Reveal>
            <p className="mb-3 text-[15px] text-[var(--muted)]">Not sure yet? Start with the free tier — no card needed.</p>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)]"
            >
              Go to dashboard →
            </Link>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
