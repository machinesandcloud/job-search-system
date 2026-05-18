import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs PayScale — Salary Data vs AI Career Coaching (2025)",
  description:
    "PayScale provides personalized salary reports across thousands of job titles and industries. Zari coaches you to negotiate those numbers. Different tools, different problems — here's when to use each and how to combine them.",
  keywords: ["zari vs payscale", "payscale alternative", "payscale review 2025", "salary negotiation tool", "payscale vs glassdoor", "AI career coach vs salary tool", "how to negotiate using payscale"],
  alternates: { canonical: "/compare/zari-vs-payscale" },
  openGraph: {
    title: "Zari vs PayScale — Salary Data vs AI Career Coaching (2025)",
    description: "PayScale shows what the market pays for your skills. Zari coaches you to negotiate there. They're complementary — here's the sequence.",
    url: "/compare/zari-vs-payscale",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PAYSCALE_STRENGTHS = [
  {
    strength: "Personalized salary reports by skills and experience",
    detail: "Unlike aggregate databases that show median by job title, PayScale's salary reports account for your specific skills, years of experience, industry, company size, and location. This skill-adjusted compensation data is more useful for negotiation than a raw title-based median — because it explains why two 'Software Engineers' can have very different market rates based on their specific technology stack and industry vertical.",
  },
  {
    strength: "Broad industry and job title coverage",
    detail: "PayScale covers a much wider range of job titles and industries than Levels.fyi or other compensation databases. While Levels.fyi is best for tech FAANG roles, PayScale provides useful data for non-tech industries — healthcare, education, finance, manufacturing, government — and for titles that don't map neatly to tech leveling frameworks. For a marketing manager in healthcare or a supply chain analyst in manufacturing, PayScale often has the most granular data available.",
  },
  {
    strength: "Compensation report for employer comparison",
    detail: "PayScale's products for individuals include reports that show how specific employers pay relative to the market — revealing which companies pay above, at, or below the 50th percentile for specific roles. This employer-level data adds context that title-only medians miss: knowing that Company X pays 15% below market for your role is a negotiation asset.",
  },
  {
    strength: "Real-time market data updates",
    detail: "PayScale collects ongoing compensation data and updates their reports more frequently than annual survey cycles, making their data more responsive to market shifts — especially useful in periods of rapid compensation change (tech boom/bust cycles, post-layoff hiring corrections). For negotiating in a dynamic market, recency of data matters.",
  },
];

const ZARI_GAPS = [
  {
    gap: "Turning data into a negotiation conversation",
    detail: "PayScale tells you the number — it doesn't coach the conversation. When you receive an offer $20K below the PayScale median for your skills, Zari coaches the exact counter: how to present the data, what to say when they push back with 'that's our standard band,' how to keep the conversation collaborative rather than confrontational, and which package components to push on if base salary is constrained.",
  },
  {
    gap: "Resume optimization to justify the higher number",
    detail: "The PayScale median represents candidates across the full distribution for your skills and experience. To negotiate to the 75th percentile, you need to demonstrate you're a 75th-percentile candidate — which requires framing your resume and interview answers to show differentiated impact, not just credential matching. Zari helps position you above the median before the negotiation begins.",
  },
  {
    gap: "Non-salary compensation components",
    detail: "PayScale reports focus heavily on base salary and bonus, with less granularity on equity, signing bonuses, flexible work stipends, and benefits values. Zari covers the full package negotiation: using PayScale's base salary data as an anchor while also negotiating the equity component, signing bonus (often the most flexible lever), and remote work or PTO arrangements that PayScale doesn't capture in its reports.",
  },
  {
    gap: "Interview preparation to reach the offer stage",
    detail: "PayScale's compensation data only matters once you have an offer. Zari helps you get there with targeted interview preparation, behavioral coaching, and salary expectation scripts that avoid anchoring too low during phone screens — a mistake that can constrain your final offer before negotiation even begins.",
  },
];

const FAQS = [
  { question: "Is PayScale data accurate enough for salary negotiation?", answer: "PayScale data is useful as one input, but has known limitations. It's crowd-sourced and self-reported, which means data quality varies by job title and industry. For common, well-represented titles (software engineer, marketing manager, nurse, accountant), PayScale data is reasonably accurate. For rare titles, very senior roles, or roles at specific well-known companies, Levels.fyi (for tech) or industry-specific surveys often provide more reliable data. Use PayScale alongside 2-3 other sources — LinkedIn Salary, Glassdoor, and any industry-specific compensation surveys — rather than as a single source of truth." },
  { question: "How do you use PayScale data in a salary negotiation?", answer: "PayScale data is most useful as a market benchmark framing: 'Based on compensation data for [role] with [skills] in [location], the market range appears to be X to Y. I'd like to discuss targeting the upper portion of that range given [specific differentiators].' Cite it as 'market data' or 'compensation research' rather than as a PayScale screenshot — companies respond better to candidates who present benchmarking as thorough research, not as a competing bid. Zari helps you build the full script around the data point." },
  { question: "Should I pay for PayScale's premium reports?", answer: "PayScale's free salary report gives a reasonable estimate. The paid report adds skills-adjusted percentiles, employer-specific comparisons, and benefit valuation — which can be useful for senior roles or complex total compensation packages. Before paying, check if you can get equivalent data for free: LinkedIn Salary (included with LinkedIn free), Glassdoor, and Levels.fyi (for tech) often provide comparable insights. If you're negotiating a senior role where $5K of additional comp would pay for the report 10x over, the premium report is worth it." },
];

export default async function ZariVsPayscalePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs PayScale", url: `${BASE_URL}/compare/zari-vs-payscale` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Salary Research</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs PayScale</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            PayScale shows what the market pays for your specific skills and experience. Zari coaches you to negotiate there. Research first, then execution.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <StatCard value={54} suffix="M+" label="Salary data points in PayScale's compensation database" accent="#0D7182" />
            <StatCard value={8000} suffix="+" label="Job titles covered by PayScale — far broader than tech-only databases" accent="#7C3AED" />
            <StatCard value={41} suffix="%" label="Of workers who negotiate their salary receive a higher offer" accent="#059669" />
            <StatCard value={18} suffix="K" prefix="$" label="Average additional compensation gained with data-backed negotiation strategy" accent="#D97706" />
          </div>
        </div>
      </section>

      {/* What PayScale does well */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What PayScale does exceptionally well</h2>
          <div className="mt-6 space-y-4">
            {PAYSCALE_STRENGTHS.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[12px] font-bold text-emerald-700">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.strength}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Zari completes */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Where Zari fills the gaps PayScale leaves</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">PayScale gives you the target number. Here&apos;s what&apos;s still required to reach it.</p>
          <div className="mt-6 space-y-4">
            {ZARI_GAPS.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.03] p-5">
                <p className="font-bold text-[var(--ink)]">{item.gap}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sequence */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The sequence: PayScale → Zari</h2>
          <div className="mt-6 flex flex-col gap-0">
            {[
              { step: "1", label: "Before applying", action: "Use PayScale to understand your market rate — skill-adjusted, industry-adjusted, location-adjusted. Know your 50th and 75th percentile baseline before conversations begin." },
              { step: "2", label: "During phone screen", action: "Use Zari's salary expectation scripting to deflect early compensation questions without anchoring too low. 'I'd like to learn more about the full scope before discussing numbers' is a trainable skill." },
              { step: "3", label: "At offer", action: "Cross-reference the offer against your PayScale benchmark. Bring both to Zari: the offer details and the market data. Zari builds your counter strategy from both inputs." },
              { step: "4", label: "Counter and close", action: "Zari coaches the negotiation conversation — from initial counter language to handling pushback, and from base salary to the full package including equity, signing bonus, and flexible work arrangements." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 border-b border-[var(--border)] py-4 last:border-0">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{item.step}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-0.5">{item.label}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--ink)]">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Have your PayScale data? Let Zari coach the negotiation.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Bring your offer details and the PayScale benchmark to Zari — it coaches you through the full negotiation conversation, from the initial counter to handling pushback and closing on the full package.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
