import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Negotiating Equity — RSUs, Options & Startup Equity Explained (2025)",
  description:
    "How to negotiate equity compensation — RSUs at public companies, options at startups, cliff vs. vesting schedules, dilution, and the specific asks that increase your equity package without losing the offer.",
  keywords: ["negotiating equity", "how to negotiate equity compensation", "RSU negotiation", "stock options negotiation", "negotiate startup equity", "equity compensation negotiation"],
  alternates: { canonical: "/blog/negotiating-equity" },
  openGraph: {
    title: "Negotiating Equity — RSUs, Options & Startup Equity Explained (2025)",
    description: "How to negotiate RSUs, stock options, and startup equity — with the specific asks and the math that makes equity negotiation meaningful.",
    url: "/blog/negotiating-equity",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const EQUITY_TYPES = [
  {
    type: "RSUs (Restricted Stock Units) — public companies",
    accent: "#7C3AED",
    what: "RSUs are a promise of shares that vest over time (typically 4 years with a 1-year cliff). At vest, you receive actual company shares. At public companies, these are immediately liquid after any required holding period.",
    howToNegotiate: "RSUs are typically quoted as a total grant value (e.g., '$400K in RSUs over 4 years = ~$100K/year'). You can negotiate: (1) the total grant size, (2) the vesting schedule, and (3) whether there's a sign-on RSU grant to offset unvested equity you're leaving behind.",
    keyMath: "If RSUs are granted at a share price of $50 and the stock drops to $40 by the time they vest, your $100K/year RSU grant is now worth $80K. RSU value fluctuates with stock price — which is why some candidates negotiate total comp (base + RSU value at grant) rather than just base.",
    askFor: "If leaving unvested equity at your current company, ask for a sign-on grant to offset it — state the unvested value specifically. Ask for the vesting schedule and whether any cliff exists beyond the standard 1 year.",
  },
  {
    type: "Stock options — late-stage private companies",
    accent: "#DC2626",
    what: "Options give you the right to buy shares at a set price (strike price). If the company's 409A valuation rises above your strike price, your options have paper value — but that value is only realized if the company goes public or is acquired at a price above your strike.",
    howToNegotiate: "Negotiate: (1) number of options, (2) strike price (ask about the 409A valuation history — a rising 409A means your options start underwater relative to current fair market value even before you exercise), (3) post-termination exercise window (standard is 90 days; extended windows of 5–10 years are significantly more valuable).",
    keyMath: "10,000 options at $2.00 strike price, current 409A at $5.00 = $30K paper value. But that's only realizable on exit. The key unknown is exit timeline, exit valuation, and how many rounds of dilution happen before you get there.",
    askFor: "Extended post-termination exercise window — this is negotiable at many companies and costs the company almost nothing. Also ask for the fully-diluted share count (to understand your percentage), the most recent 409A, and the company's preferred share liquidation preferences.",
  },
  {
    type: "Early-stage startup equity (percentage-based)",
    accent: "#D97706",
    what: "Early employees often negotiate equity as a percentage of the company rather than a share count. The percentage matters more than the raw numbers at early stage because share counts mean nothing without knowing total outstanding shares.",
    howToNegotiate: "Always negotiate the percentage of fully diluted shares, not the share count. A 0.5% grant at a company with 20M diluted shares is the same as 100,000 shares — but knowing both lets you calculate and verify. Also ask about the option pool size and when the last refresh happened.",
    keyMath: "0.5% at a $10M valuation = $50K paper value. 0.5% at a $100M exit (after 2 dilutive funding rounds that take you to 0.3%) = $300K. The math depends heavily on dilution, liquidation preferences, and exit valuation — all unknowable in advance but worth understanding.",
    askFor: "Your percentage of the fully diluted cap table, the total option pool size, historical 409A valuations, and whether pro-rata rights are available if you're at senior level.",
  },
];

const NEGOTIATION_SCRIPTS = [
  {
    situation: "Asking for a larger RSU grant",
    accent: "#7C3AED",
    script: `"I'm excited about the role and the base is in the right range. On the equity side, I've been looking at total comp — factoring in my unvested RSUs at my current company, the total package lands at [X]. Is there flexibility to bring the RSU grant to [$Y] to make the transition whole? I'd like to make this work."`,
    note: "The 'make the transition whole' framing is specific and defensible — you're quantifying what you're leaving, not just asking for more.",
  },
  {
    situation: "Asking about extended option exercise window",
    accent: "#DC2626",
    script: `"One thing I'd like to understand before we finalize is the post-termination exercise window on the options. The standard 90 days is quite short given the risk of holding illiquid private company options — is there flexibility to extend that to a longer window, like 5 years? I know some companies offer this as part of the offer for senior hires."`,
    note: "Frame it as a standard practice at other companies — it is, increasingly. Companies that offer this do it because it's important to candidates and costs almost nothing to the company.",
  },
  {
    situation: "Asking for total diluted cap table info",
    accent: "#D97706",
    script: `"I want to make sure I understand the equity fully before signing. Could you share the fully diluted share count, the most recent 409A valuation, and the current option pool size? I want to be able to calculate what this represents as a percentage, since the raw share count is hard to evaluate in isolation."`,
    note: "This is a completely reasonable ask — any reputable company will share this with serious senior candidates. A company that refuses to share basic cap table information before you accept is a yellow flag.",
  },
];

const WHAT_MOVES_THE_NEEDLE = [
  { lever: "Unvested equity offset (sign-on)", impact: "High", detail: "The clearest justification for a larger equity package — you're leaving money on the table at your current company. Quantify it exactly and ask for it specifically." },
  { lever: "Competing offer or market data", impact: "High", detail: "A competing offer is the most powerful lever. Market comp data from Levels.fyi, Blind, or Glassdoor is the next best option — use specific numbers, not ranges." },
  { lever: "Extended exercise window (options)", impact: "High for illiquid private equity", detail: "A 10-year exercise window on options is worth meaningfully more than a 90-day window — it removes the exercise-or-lose-it pressure when you leave." },
  { lever: "Accelerated vesting on change of control", impact: "Medium", detail: "Single-trigger (immediate full vest on acquisition) or double-trigger (vest on acquisition + termination) acceleration clauses are negotiable at many companies, especially for senior roles." },
  { lever: "Refresh grants cycle commitment", impact: "Medium", detail: "Ask about how equity refresh grants work — when, how much, based on what criteria. For a long-tenure role, refresh grants over time can be worth more than the initial grant." },
];

const FAQS = [
  { question: "How do I negotiate equity without losing the offer?", answer: "Equity negotiation is less volatile than base salary negotiation because it's a future value rather than a current cost. Frame your ask as wanting to make the total package work, not as threatening to walk. Specify what you're asking for and why (unvested equity offset, market comp data, competing offer) — vague asks are less credible than specific, justified ones. The offer is almost never retracted for asking about equity professionally. The bigger risk is leaving significant value on the table by not asking." },
  { question: "How do I value stock options at a private company?", answer: "The honest answer is: you can't know precisely. But you can estimate: (current 409A valuation - your strike price) × number of options = current paper value. Then apply a discount for illiquidity, dilution risk, and exit uncertainty. A rough rule of thumb: treat private company equity as 1/3 of its paper value for conservative planning, and don't accept a base salary significantly below market on the expectation that equity will compensate. Most startup equity expires worthless or is worth far less than projected at grant." },
  { question: "What is a 1-year cliff on equity vesting?", answer: "A 1-year cliff means no equity vests for the first 12 months — then 25% vests all at once, and the remaining 75% vests monthly or quarterly over the next 3 years. This protects the company from someone joining and leaving in 6 months with equity. If you're joining and leaving before the cliff, you get nothing. If you leave 13 months in, you get 25% plus a month or two. The cliff is standard, but the vesting schedule after the cliff (monthly vs. quarterly) is sometimes negotiable." },
];

export default async function NegotiatingEquityPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Negotiating Equity — RSUs, Options & Startup Equity Explained (2025)"
        description="How to negotiate RSUs, stock options, and startup equity — with specific asks and the math."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/negotiating-equity`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Negotiating Equity", url: `${BASE_URL}/blog/negotiating-equity` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Salary Negotiation</span>
            <span className="text-[11px] text-white/30">12 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Negotiating equity<br /><span className="gradient-text-animated">RSUs, options, and startup comp — the real math</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most people negotiate base salary and accept whatever equity they&apos;re offered. That&apos;s often the more expensive mistake. Here&apos;s how equity negotiation actually works — by type, with the specific asks that move the number.
          </p>
        </div>
      </section>

      {/* Equity types */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">3 equity types — how each works and how to negotiate each</h2>
          <div className="mt-8 space-y-6">
            {EQUITY_TYPES.map((eq) => (
              <div key={eq.type} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: eq.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{eq.type}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <p className="px-6 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{eq.what}</p>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="px-5 py-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">How to negotiate</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{eq.howToNegotiate}</p>
                    </div>
                    <div className="bg-[var(--bg)] px-5 py-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Key math</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{eq.keyMath}</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50/30 px-5 py-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Specifically ask for</p>
                    <p className="text-[13px] leading-5 text-[var(--muted)]">{eq.askFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What moves the needle */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 levers that actually move equity packages</h2>
          <div className="mt-7 space-y-3">
            {WHAT_MOVES_THE_NEEDLE.map((item) => (
              <div key={item.lever} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className={`mt-0.5 rounded-full px-2.5 py-1 h-fit text-[9px] font-bold uppercase tracking-wider flex-shrink-0 ${item.impact === "High" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{item.impact}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.lever}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripts */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Word-for-word scripts for equity conversations</h2>
          <div className="mt-7 space-y-4">
            {NEGOTIATION_SCRIPTS.map((s) => (
              <div key={s.situation} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] px-5 py-3" style={{ borderLeftColor: s.accent, borderLeftWidth: 4 }}>
                  <p className="font-bold text-[var(--ink)]">{s.situation}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="bg-white px-5 py-4">
                    <p className="font-mono text-[12.5px] leading-6 text-[var(--ink)]">{s.script}</p>
                  </div>
                  <div className="px-5 py-3">
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{s.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Equity negotiation FAQs</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Negotiating equity? Practice the conversation first.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches salary and equity negotiation — scripts, market data, objection handling, and the specific asks that move equity packages at tech companies and startups.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
