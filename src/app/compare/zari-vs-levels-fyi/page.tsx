import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Levels.fyi — Salary Data vs AI Career Coaching (2025)",
  description:
    "Levels.fyi is the most accurate tech salary database. Zari coaches you to negotiate the numbers it shows. They solve different problems — here's when to use each and how to combine them.",
  keywords: ["zari vs levels.fyi", "levels.fyi alternative", "tech salary negotiation", "levels.fyi review 2025", "software engineer salary data", "FAANG salary negotiation", "AI career coach vs salary database"],
  alternates: { canonical: "/compare/zari-vs-levels-fyi" },
  openGraph: {
    title: "Zari vs Levels.fyi — Salary Data vs AI Career Coaching (2025)",
    description: "Levels.fyi shows what you should be making. Zari helps you negotiate to get there. How to use both.",
    url: "/compare/zari-vs-levels-fyi",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_LEVELS_DOES_WELL = [
  {
    capability: "Total compensation benchmarking by company and level",
    detail: "Levels.fyi is the most accurate source of total compensation (base + bonus + equity) data for tech roles, particularly at FAANG and large tech companies. Crowd-sourced from verified offer letters, it shows real numbers at a granularity (L4, L5, L6 at Google; E4, E5 at Meta; SDE I/II/III at Amazon) that LinkedIn Salary, Glassdoor, and Payscale cannot match. For tech job seekers preparing to negotiate, Levels is the authoritative benchmark.",
  },
  {
    capability: "Equity component transparency",
    detail: "Levels.fyi breaks total compensation into base, annual bonus, and equity (RSUs/options) — with equity normalized to annual value. This matters enormously for tech negotiation because base and equity move independently, and the equity component at top companies often exceeds base. Knowing that L5 Google pays $280K base + $80K bonus + $200K equity/year (normalized) changes your negotiation strategy.",
  },
  {
    capability: "Level mapping across companies",
    detail: "One of Levels.fyi's most useful features is cross-company level equivalency. Knowing that you're equivalent to a Google L5, Meta E5, or Amazon SDE III lets you benchmark compensation at companies that don't use the same leveling framework. For candidates receiving offers from multiple companies at different nominal levels, this mapping is invaluable.",
  },
  {
    capability: "Offer comparison and college rankings",
    detail: "Levels.fyi's offer comparison tool lets you compare multiple offers on a normalized total compensation basis, accounting for equity vesting schedules, signing bonuses, and cost of living adjustments. Their college ranking by starting median compensation is a popular resource for students and new grads.",
  },
];

const HOW_ZARI_COMPLETES = [
  {
    gap: "What to do with the data",
    detail: "Levels.fyi tells you the number. It doesn't tell you how to get it. If your offer is $40K below the Levels.fyi median for your level and company, Zari coaches the exact conversation: how to anchor, what language to use, how to respond to 'this is our best offer,' and how to push on equity when base is constrained. Data without negotiation coaching is incomplete.",
  },
  {
    gap: "Resume optimization to get the right level",
    detail: "Leveling decisions significantly affect total compensation — the difference between L4 and L5 at Google is often $80-150K/year in total comp. Zari helps you frame your experience to land at the highest defensible level: what to emphasize in your resume, how to discuss scope in interviews, and how to make the business case for the higher level when an offer comes in lower than expected.",
  },
  {
    gap: "Interview preparation to get to the offer stage",
    detail: "Levels.fyi data is only relevant if you reach the offer. Zari helps you get there — mock behavioral interviews with STAR feedback, system design coaching for senior levels, and salary expectation scripting so you don't anchor too low during the phone screen (a mistake that can reduce your final offer before negotiation begins).",
  },
  {
    gap: "Negotiating beyond base — the full package",
    detail: "Most candidates know to negotiate base salary. Fewer know to negotiate the signing bonus (often more flexible than base), equity grant size (frequently negotiable up to 30%), equity cliff and vesting schedule (sometimes negotiable for senior hires), and relocation or remote work stipends. Zari covers the full package — using Levels.fyi benchmarks for each component.",
  },
];

const FAQS = [
  { question: "Is Levels.fyi data accurate?", answer: "Yes — Levels.fyi is widely considered the most accurate public source of tech compensation data. Submissions are voluntarily crowd-sourced and the community actively flags inconsistencies. The data is most accurate for US-based FAANG roles (Google, Meta, Amazon, Apple, Microsoft) and major tech companies. Data is thinner for startups, non-US roles, and smaller companies. For benchmarking tech compensation in the US, it's significantly more accurate than Glassdoor or LinkedIn Salary." },
  { question: "Should I tell a company I've looked at their Levels.fyi data?", answer: "Yes, it's completely acceptable — and shows you've done market research. Phrasing like 'Based on Levels.fyi data for this level at your company, I was expecting the range to be X to Y' is normal in tech negotiations. Companies are aware of Levels.fyi and know candidates use it. What you should avoid: treating Levels as a non-negotiable floor ('I won't accept anything below the median') — this can make you seem inflexible, especially if your level or location affects the benchmark." },
  { question: "How do you use Levels.fyi and Zari together?", answer: "Levels.fyi → Zari is the right sequence. Use Levels.fyi before you receive an offer to understand the expected range for your target level, company, and location. When you receive an offer, bring the numbers into Zari — input your offer details and the Levels benchmark. Zari coaches you through the negotiation conversation: what to say when you counter, how to respond to pushback, and which package components to prioritize if base is constrained. Together, they cover the information and the execution." },
];

export default async function ZariVsLevelsFyiPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Levels.fyi", url: `${BASE_URL}/compare/zari-vs-levels-fyi` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Tech Salary</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Levels.fyi</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Levels.fyi shows what you should be making. Zari coaches you through getting there. They&apos;re sequential — data first, then execution.
          </p>
        </div>
      </section>

      {/* Core distinction */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <StatCard value={500000} suffix="+" label="Verified compensation data points in Levels.fyi database" accent="#0D7182" />
            <StatCard value={40} suffix="K" prefix="$" label="Average additional comp negotiated with data-backed strategy" accent="#059669" />
            <StatCard value={80} suffix="%" label="Of engineers don't negotiate equity grants — the most flexible component" accent="#DC2626" />
            <StatCard value={30} suffix="%" label="Equity grant size sometimes negotiable for senior hires" accent="#7C3AED" />
          </div>
        </div>
      </section>

      {/* What Levels does well */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Levels.fyi does exceptionally well</h2>
          <div className="mt-6 space-y-4">
            {WHAT_LEVELS_DOES_WELL.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[12px] font-bold text-emerald-700">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.capability}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Zari completes the picture */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Where Zari fills the gaps Levels.fyi leaves</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">Levels.fyi gives you the target number. Here&apos;s what&apos;s still required to hit it.</p>
          <div className="mt-6 space-y-4">
            {HOW_ZARI_COMPLETES.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.03] p-5">
                <p className="font-bold text-[var(--ink)]">{item.gap}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use together */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The sequence: Levels.fyi → Zari</h2>
          <div className="mt-6 flex flex-col gap-0">
            {[
              { step: "1", label: "Before applying", action: "Use Levels.fyi to benchmark total comp for your target company + level. Understand base, bonus, and equity ranges." },
              { step: "2", label: "During phone screen", action: "Use Zari's salary expectation scripting to avoid anchoring too low when asked about compensation early." },
              { step: "3", label: "During interviews", action: "Use Zari's interview coaching to position yourself for the highest defensible level — leveling affects comp more than negotiation." },
              { step: "4", label: "At offer", action: "Return to Levels.fyi to verify the offer against the benchmark, then use Zari to coach the negotiation conversation." },
              { step: "5", label: "Counter and close", action: "Zari simulates the back-and-forth: pushing on equity when base is firm, negotiating signing bonus, and handling 'this is our best offer.'" },
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Have the Levels.fyi data? Let Zari coach the negotiation.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Bring your offer details and the Levels benchmark to Zari — it coaches you through the full negotiation, from the initial counter to closing on equity and signing bonus.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
