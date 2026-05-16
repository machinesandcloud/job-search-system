import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Salary Negotiation Tips: Get Paid What You're Worth (2025)",
  description:
    "Proven salary negotiation tips with exact scripts, counter-offer strategies, and objection handling. Most professionals leave 10–20% on the table — here's how to not be one of them.",
  keywords: ["salary negotiation tips", "how to negotiate salary", "salary negotiation scripts", "counter offer tips", "negotiate job offer", "salary negotiation strategies", "how to ask for more money"],
  alternates: { canonical: "/blog/salary-negotiation-tips" },
  openGraph: { title: "Salary Negotiation Tips 2025 — Get Paid What You're Worth", description: "Exact scripts, counter-offer strategies, and objection handling. Stop leaving money on the table.", url: "/blog/salary-negotiation-tips" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function SalaryNegotiationTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Salary Negotiation Tips: Get Paid What You're Worth (2025)" description="Exact scripts, counter-offer strategies, and objection handling for salary negotiation." url={`${BASE_URL}/blog/salary-negotiation-tips`} datePublished="2025-04-01" />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Salary Negotiation Tips", url: `${BASE_URL}/blog/salary-negotiation-tips` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[#10B981]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#10B981]">Negotiation</span>
            <span className="text-[12px] text-white/35">11 min read · April 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">Salary Negotiation Tips:<br /><span className="text-white/50">Get Paid What You&apos;re Worth</span></h1>
          <p className="text-[16px] leading-8 text-white/50">Most professionals leave 10–20% on the table. Here&apos;s how to not be one of them.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15.5px] leading-8 text-[var(--muted)]">
          <div className="rounded-2xl border border-[#10B981]/20 bg-[#10B981]/[0.04] p-5">
            <p className="text-[14px] text-[#0d6b47] font-medium">Research consistently shows that 70% of hiring managers expect candidates to negotiate — but only 37% of candidates actually do. The cost of not negotiating, compounded over a career, is often $500,000+.</p>
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">The core principle: never accept the first offer</h2>
          <p>The first offer is a starting position, not a final one. Hiring managers set it with negotiation in mind — if everyone accepted first offers, they&apos;d stop leaving room. Negotiating doesn&apos;t make you seem difficult; it signals that you know your value.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Before the negotiation: do your research</h2>
          <ul className="space-y-3">
            {["Levels.fyi — Best for tech roles (transparent salary data by company and level)", "Glassdoor and LinkedIn Salary — Broad coverage but less granular", "Payscale and Compensation.io — Good for non-tech roles", "Ask peers in your network — Direct conversations are often the most accurate data"].map(i => (
              <li key={i} className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#10B981] flex-shrink-0" /><span>{i}</span></li>
            ))}
          </ul>
          <p>Your target number should be 10–20% above the market midpoint for your role, level, and location. This gives you negotiating room while remaining credible.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">The counter-offer script (exact language)</h2>
          <p>When you receive an offer, you have 24–48 hours to respond. Use this framework:</p>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 font-mono text-[13.5px] leading-7 text-[var(--ink)]">
            <p>&quot;Thank you so much for the offer — I&apos;m genuinely excited about this opportunity and the team. After reviewing everything, I was hoping we could get to [target number]. Based on my research and the market for [your role] at this level, I believe that reflects the value I&apos;d bring. Is there flexibility there?&quot;</p>
          </div>
          <p>Key elements of this script: it expresses genuine enthusiasm (important — you don&apos;t want them to think you&apos;re going to decline), anchors to a specific number, references market data, and ends with an open question rather than an ultimatum.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Handling the most common objections</h2>
          <div className="space-y-4">
            {[
              { obj: "\"This is our best offer\"", response: "\"I understand — and I appreciate you checking. Is there any flexibility on the signing bonus or equity, even if base is fixed?\"" },
              { obj: "\"We don't have budget\"", response: "\"I hear you on the budget constraints. Would it be possible to revisit salary after 6 months based on performance?\"" },
              { obj: "\"You don't have the exact experience we need\"", response: "\"That's fair feedback. Given that gap, could you share what the range looks like for this level? I want to make sure we're aligned on the right anchor point.\"" },
            ].map(item => (
              <div key={item.obj} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)] mb-2">They say: <em className="text-[var(--muted)]">{item.obj}</em></p>
                <p className="font-mono text-[13px] text-[var(--ink-2)] bg-white rounded-xl p-3 border border-[var(--border)]">You say: {item.response}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">What to negotiate beyond base salary</h2>
          <ul className="space-y-2">
            {["Signing bonus (often easier to move than base — it's a one-time cost)", "Equity / RSU grants", "Remote work flexibility", "Professional development budget", "Start date (buy yourself time to wrap up current role gracefully)", "Performance review cycle (negotiate an early review in 6 months)"].map(i => (
              <li key={i} className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#10B981] flex-shrink-0" /><span>{i}</span></li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-[#10B981]/20 bg-[#10B981]/[0.04] p-6 text-center">
            <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Practice negotiating before the real conversation</p>
            <p className="mb-5 text-[13.5px] text-[var(--muted)]">Zari&apos;s salary negotiation coach runs live simulations with realistic pushback. Free first session.</p>
            <Link href="/salary-negotiation-coach" className="inline-flex h-11 items-center gap-2 rounded-xl px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#10B981" }}>
              Practice negotiating free <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
