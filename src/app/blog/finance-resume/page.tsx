import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Finance Resume — Investment Banking, FP&A, and Corporate Finance (2025)",
  description:
    "Finance hiring decisions are made in the first 20 seconds. Recruiters scan for deal experience, modeling depth, dollar scope, and credential signals. Here's how to build a finance resume that passes that scan — with before/after examples by role.",
  keywords: ["finance resume", "investment banking resume", "financial analyst resume tips", "FP&A resume", "corporate finance resume", "banking resume 2025", "finance resume examples", "CFA resume"],
  alternates: { canonical: "/blog/finance-resume" },
  openGraph: {
    title: "Finance Resume — Investment Banking, FP&A & Corporate Finance (2025)",
    description: "Finance recruiters spend 20 seconds on a resume. Here's what they're scanning for — and how to make those signals visible.",
    url: "/blog/finance-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function FinanceResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Finance Resume — Investment Banking, FP&A, and Corporate Finance (2025)"
        description="Finance hiring decisions are made in the first 20 seconds. Here's what recruiters scan for and how to make those signals visible."
        url={`${BASE_URL}/blog/finance-resume`}
        datePublished="2025-05-17"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Finance Resume", url: `${BASE_URL}/blog/finance-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">Finance Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Investment banking, FP&amp;A, corporate finance, and private equity — what each track looks for, with before/after examples at every level.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>12 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          {/* What finance recruiters look for */}
          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What finance recruiters look for in 20 seconds</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Finance hiring is credential-driven at the top of the funnel. Before reading a single bullet, a finance recruiter is scanning for four signals:
            </p>
            <div className="mt-5 space-y-3">
              {[
                { signal: "School tier", detail: "Target schools matter more in banking than almost any other field. If your school is non-target, your deal experience, GPA, and credentials have to compensate. Name it prominently, don't bury it." },
                { signal: "GPA", detail: "Banking typically screens at 3.5+, PE and HF at 3.7+. If yours is above the bar, include it — unconditionally. If it's below 3.5 and you have it, consider leaving it off (check by role category)." },
                { signal: "Credential signals", detail: "CFA Level I, II, or III; CPA; CFA candidate designation; CAIA; Series 7/63/65. Each signals commitment to the field. Include them in a dedicated Certifications section." },
                { signal: "Relevant experience", detail: "Have you touched deals, models, portfolios, or financial analysis in a professional context? This is the primary screen for experienced hires. Internship credit carries significant weight for early-career candidates." },
              ].map(item => (
                <div key={item.signal} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Finance tracks */}
          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The four main finance tracks — and what each prioritizes</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Finance is not a monolithic field. A resume that works for a bulge-bracket banking role looks different from one targeting FP&amp;A at a tech company. The signals that matter vary by track.</p>

            <div className="mt-6 space-y-6">
              {[
                {
                  track: "Investment Banking (IB)",
                  color: "#1D4ED8",
                  signals: ["Deal exposure — closed transactions, M&A, capital markets, IPOs with dollar values", "Modeling experience — DCF, LBO, precedent transactions, accretion/dilution", "Bank or advisory firm names (prestige matters)", "Hours worked often implied through deal count and complexity"],
                  avoid: "Process descriptions. 'Assisted with financial models' is not useful. Specify the model type, the deal size, and your role in it.",
                },
                {
                  track: "FP&A / Corporate Finance",
                  color: "#059669",
                  signals: ["Budget/forecast ownership — P&L scope, headcount, revenue dollars you planned or analyzed", "Variance analysis with actual percentage improvements", "Finance system proficiency — Adaptive, Anaplan, Workday, SAP, Oracle", "Business partnership — 'partnered with [function] to drive [outcome]'"],
                  avoid: "Endless descriptions of recurring tasks. Every FP&A candidate builds budgets. What was yours responsible for, and what did you find or change?",
                },
                {
                  track: "Private Equity / Venture Capital",
                  color: "#7C3AED",
                  signals: ["Deal sourcing, diligence, and execution — with stage and sector specificity", "Portfolio company engagement — board observer, operational improvement, add-on coordination", "Investment thesis and sector thesis ownership", "Exit experience — strategic sale, secondary, IPO"],
                  avoid: "Generic 'investment analysis' descriptions. Name the companies you diligenced, the sectors you covered, and the decisions your analysis informed.",
                },
                {
                  track: "Asset Management / Hedge Fund",
                  color: "#DC2626",
                  signals: ["AUM or portfolio dollar value managed or analyzed", "Investment thesis development and portfolio construction", "Performance attribution — relative to benchmark, alpha generation", "Research coverage — number of companies, market cap range, sector depth"],
                  avoid: "Describing research without connecting it to an investment decision or portfolio outcome. What did you recommend? What happened?",
                },
              ].map(track => (
                <div key={track.track} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4" style={{ borderLeft: `4px solid ${track.color}` }}>
                    <h3 className="font-bold text-[var(--ink)]">{track.track}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="p-5">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">What recruiters want to see</p>
                      <ul className="space-y-1.5">
                        {track.signals.map(s => (
                          <li key={s} className="flex items-start gap-2 text-[13.5px] text-[var(--muted)]">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: track.color }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-5 bg-red-50/30">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-400">What gets you filtered out</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{track.avoid}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Before/after examples */}
          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before/after: weak vs. strong finance bullets</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The difference between a finance bullet that gets read and one that gets skipped is usually specificity — deal size, model type, dollar scope, and the outcome your work informed.
            </p>

            <div className="mt-6 space-y-5">
              {[
                {
                  role: "Investment Banking Analyst",
                  weak: "Worked on M&A transactions and assisted with financial modeling.",
                  strong: "Supported three sell-side M&A transactions totaling $1.4B in enterprise value — built LBO and DCF models, prepared management presentations, and coordinated data room for two completed deals.",
                  fix: "Named the transaction type, the aggregate deal size, and specific model types. Cut 'assisted with' — specify what you built.",
                },
                {
                  role: "FP&A Analyst",
                  weak: "Responsible for the annual budget process and monthly reporting.",
                  strong: "Owned quarterly re-forecast for $180M operating budget across 3 business units — identified $4.2M variance in Q3 due to ramp-miss in enterprise segment, presented findings to CFO with recommended pull-forward in marketing spend.",
                  fix: "Named the budget dollar size, the variance finding, and what happened with the analysis. 'Responsible for' → 'Owned.'",
                },
                {
                  role: "Associate, Private Equity",
                  weak: "Performed financial analysis and due diligence on potential investments.",
                  strong: "Led financial diligence on 6 software investments ($30M–$120M target EV) — built LBO models with 5-year operating projections, identified $7M cost synergy opportunity in healthcare SaaS acquisition that informed pricing in LOI negotiations.",
                  fix: "Count, sector, deal size range, model type, and what the analysis changed. 'Financial analysis' tells nothing.",
                },
                {
                  role: "Portfolio Analyst, Asset Management",
                  weak: "Covered consumer staples stocks and supported portfolio management team.",
                  strong: "Covered 14 consumer staples companies (avg $22B market cap) — produced 3 investment recommendations in 18 months, 2 of which were added to portfolio; contributed to 210bps of alpha in consumer allocation.",
                  fix: "Number of companies, market cap range, recommendation count, and performance attribution. 'Supported' is invisible.",
                },
              ].map(ex => (
                <div key={ex.role} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                    <span className="text-[12px] font-bold text-[var(--ink)]">{ex.role}</span>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="p-5">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-400">Before (gets filtered)</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)] bg-red-50/40 rounded-lg px-3 py-2.5 border border-red-100">{ex.weak}</p>
                    </div>
                    <div className="p-5">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-600">After (gets read)</p>
                      <p className="text-[13.5px] leading-6 text-[var(--ink)] bg-emerald-50/40 rounded-lg px-3 py-2.5 border border-emerald-100">{ex.strong}</p>
                    </div>
                  </div>
                  <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                    <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">What changed: </span>{ex.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ATS keywords by track */}
          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS keywords by finance track</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Finance job descriptions are highly standardized. These keywords appear consistently by track — include the ones that accurately describe your experience.</p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {[
                {
                  track: "Investment Banking",
                  keywords: ["M&A", "LBO", "DCF", "precedent transactions", "comparable companies", "pitch book", "management presentation", "data room", "due diligence", "capital markets", "syndication", "leveraged buyout", "accretion/dilution", "buy-side / sell-side"],
                },
                {
                  track: "FP&A / Corporate Finance",
                  keywords: ["variance analysis", "budget vs. actual", "rolling forecast", "operating plan", "P&L ownership", "headcount planning", "business partnering", "Adaptive Insights", "Anaplan", "Workday", "SAP", "Oracle Hyperion", "PowerBI", "strategic planning"],
                },
                {
                  track: "Private Equity",
                  keywords: ["deal sourcing", "investment diligence", "operating model", "portfolio monitoring", "value creation plan", "add-on acquisition", "management buyout", "recap", "IRR", "MOIC", "hold period", "sector thesis", "growth equity"],
                },
                {
                  track: "Asset Management",
                  keywords: ["fundamental analysis", "investment thesis", "portfolio construction", "risk management", "alpha generation", "benchmark outperformance", "sector rotation", "long/short", "AUM", "coverage universe", "earnings model", "catalysts"],
                },
              ].map(item => (
                <div key={item.track} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#4361EE]">{item.track}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map(kw => (
                      <span key={kw} className="rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-[11.5px] text-[var(--muted)]">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resume structure */}
          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Finance resume structure</h2>
            <div className="mt-5 space-y-3">
              {[
                { section: "Header", detail: "Name, LinkedIn, location (city/state), phone, email. No photo, no objective statement." },
                { section: "Education", detail: "For banking and PE: education goes first if you graduated within 3 years. School name, degree, GPA if ≥3.5, relevant coursework (corporate finance, financial modeling, accounting), and any finance-adjacent honors. CFA candidate status listed here if in progress." },
                { section: "Experience", detail: "Reverse chronological. Every bullet should contain: what you did, at what scope (deal size, AUM, budget), and what the output or result was. If you have internship experience in finance, it counts heavily." },
                { section: "Skills / Technical", detail: "Excel (financial modeling), Bloomberg Terminal, FactSet, Capital IQ, Pitchbook, Tableau, Python/R if applicable, any ERP systems. Don't list 'Microsoft Office' — list the finance-specific tools." },
                { section: "Certifications", detail: "CFA Level I/II/III, CPA, CAIA, CQF, Series 7/63/65. List exam date if candidate status. These are signal-dense and often ATS keywords." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)]">{item.section}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get specific feedback on your finance resume</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Paste your resume and the JD. Zari scores your ATS keyword coverage against the specific role and rewrites the bullets that need work.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my finance resume →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
