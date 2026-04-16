import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { Reveal } from "@/components/reveal";
import { StarField, CursorGlow } from "@/components/mvp-hero-extras";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    tagline: "Start coaching. No card required.",
    features: [
      "1 resume review session",
      "1 LinkedIn optimization session",
      "1 mock interview session",
      "Saved dashboard recap",
      "Session memory",
      "Action plan output",
    ],
    cta: "Get started free",
    href: "/signup",
    featured: false,
    dark: false,
    muted: false,
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
      "Full session history",
      "Priority access to new surfaces",
      "Richer recaps & action plans",
      "Voice-enabled coaching mode",
      "Multi-role target tracking",
    ],
    cta: "Start Pro free",
    href: "/signup",
    featured: true,
    dark: true,
    muted: false,
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
      "Real-time interview feedback",
      "Dedicated success manager",
    ],
    cta: "Join waitlist",
    href: "/signup",
    featured: false,
    dark: false,
    muted: true,
  },
];

const faqs = [
  { q: "Is the free tier actually useful?", a: "Yes. One session per coaching surface is enough to see whether Askia Coach works for you — and most users have their strongest job-search insight in that first session." },
  { q: "What happens when I run out of free sessions?", a: "You'll see a clear prompt to upgrade to Pro. Your dashboard, session memory, and previously uploaded documents all stay intact." },
  { q: "What does 'session memory' mean?", a: "Every session you run is summarized and stored in your coaching profile. The next session picks up where the last one ended — your coach knows your target role, your materials, and your blockers without you re-explaining anything." },
  { q: "Can I cancel Pro anytime?", a: "Yes. No lock-in, no cancellation fees. Your session history and documents remain accessible on the free tier after you cancel." },
  { q: "When is Premium available?", a: "Premium is post-MVP. It requires a human coaching layer we're building carefully. Join the waitlist and we'll reach out first when it's ready." },
];

const VALUE_PROPS = [
  { title: "Specificity over platitudes", body: "The feedback isn't 'make your bullets stronger.' It's 'replace bullet 3 with a version that leads with scope, includes a metric, and ends with the business outcome.'" },
  { title: "Memory that compounds", body: "Session 4 doesn't start from scratch. The coach knows what you worked on in sessions 1–3 and builds on it instead of re-diagnosing you every time." },
  { title: "Four surfaces, not one chat", body: "Resume review, LinkedIn, interviews, and career strategy each deserve their own surface. Cramming everything into one thread is a UX failure." },
  { title: "Outputs you can actually use", body: "Every session ends with something tangible: a rewritten bullet, a revised headline, a stronger STAR answer, or a prioritized action plan." },
];

export default async function PricingPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ══════ HERO ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] pb-28 pt-24 text-white md:pb-32 md:pt-28">
        <StarField count={80} />
        <CursorGlow color="rgba(13,113,130,0.10)" size={580} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-10%", left:"-8%", background:"var(--cyan)", opacity:.09, filter:"blur(140px)", borderRadius:"50%", animation:"float-a 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-8%", right:"-6%", background:"var(--purple)", opacity:.08, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 22s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
            Pricing
          </div>
          <h1 className="text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Simple pricing.<br />
            <span className="gradient-text-animated">Serious coaching.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/48">
            Start free and experience the coaching workflow before you decide to upgrade. No tricks, no dark patterns.
          </p>
        </div>
      </section>

      {/* ══════ PRICING CARDS ══════ */}
      <section className="bg-[var(--bg)] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {tiers.map((tier) => (
              <Reveal key={tier.name}>
                <div className="relative flex h-full flex-col">
                  {tier.featured && (
                    <div className="absolute -inset-[1.5px] rounded-[22px] spin-border" style={{ zIndex: 0 }} />
                  )}
                  <div
                    className={`relative flex flex-1 flex-col overflow-hidden rounded-2xl p-7 ${tier.dark ? "bg-[var(--dark)] text-white" : "border border-[var(--border)] bg-white shadow-[var(--shadow)]"} ${tier.muted ? "opacity-75" : ""}`}
                    style={{ zIndex: 1 }}
                  >
                    {tier.featured && (
                      <div className="absolute left-0 right-0 top-0 flex items-center justify-center py-1.5" style={{ background: "linear-gradient(90deg,var(--brand),var(--cyan))" }}>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Most popular</span>
                      </div>
                    )}
                    <div className={tier.featured ? "mt-6" : ""}>
                      <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${tier.dark ? "text-white/40" : "text-[var(--muted)]"}`}>{tier.name}</p>
                      <div className="mt-4 flex items-end gap-2">
                        <span className={`text-[3.5rem] font-extrabold leading-none tracking-[-0.05em] ${tier.dark ? "text-white" : tier.muted ? "text-[var(--muted)]" : "text-[var(--ink)]"}`}>{tier.price}</span>
                        <span className={`mb-1.5 text-[13px] ${tier.dark ? "text-white/35" : "text-[var(--muted)]"}`}>{tier.period}</span>
                      </div>
                      <p className={`mt-3 text-[14px] leading-6 ${tier.dark ? "text-white/50" : "text-[var(--muted)]"}`}>{tier.tagline}</p>
                      <div className={`my-6 h-px ${tier.dark ? "bg-white/[0.07]" : "bg-[var(--border)]"}`} />
                      <ul className="flex-1 space-y-3">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <svg className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tier.dark ? "text-[var(--cyan)]" : tier.muted ? "text-[var(--muted)]" : "text-[var(--brand)]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                            <span className={`text-[13.5px] leading-5 ${tier.dark ? "text-white/70" : "text-[var(--ink-2)]"}`}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={tier.href}
                        className={`mt-8 flex w-full items-center justify-center rounded-xl py-3.5 text-[14px] font-semibold transition-all hover:-translate-y-0.5 ${
                          tier.featured
                            ? "bg-[var(--brand)] text-white shadow-[var(--shadow-brand)] hover:bg-[var(--brand-hover)]"
                            : tier.muted
                              ? "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                              : "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                        }`}
                      >
                        {tier.cta} →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Trust notes */}
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12.5px] text-[var(--muted)]">
              {["No credit card to start", "Cancel Pro anytime", "Session data always yours", "HTTPS + encrypted storage"].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  {s}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ VALUE COMPARISON ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", right:0, top:0, width:"500px", height:"500px", background:"var(--cyan)", opacity:.06, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 20s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="mb-10 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] md:text-[3rem]">
              What you&apos;re actually paying for.
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {VALUE_PROPS.map((card, ci) => (
              <Reveal key={card.title} data-delay={String((ci % 2) + 1) as "1" | "2"}>
                <div className="glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <h3 className="mb-3 text-[17px] font-bold text-white">{card.title}</h3>
                  <p className="text-[14px] leading-7 text-white/45">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked</h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] open:bg-white open:shadow-[var(--shadow)] transition-all">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                  <span className="text-[15px] font-semibold text-[var(--ink)]">{faq.q}</span>
                  <svg className="h-5 w-5 flex-shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-5 text-[14.5px] leading-7 text-[var(--muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 40%,#063844 70%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", left:"-5%", top:"-10%", width:"500px", height:"500px", background:"var(--cyan)", opacity:.12, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 18s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm">
            <Image src="/askia-logo.png" alt="Askia" width={40} height={40} className="rounded-xl" />
          </div>
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.5rem]">Start free today.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">No card. No friction. Real coaching from session one.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Get started free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.10] hover:text-white">
              See the platform
            </Link>
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
