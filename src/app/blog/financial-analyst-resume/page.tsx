import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Financial Analyst Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "What finance hiring managers read for in an FA resume — modeling depth, business impact, data tools, and financial scope. With before/after bullet examples for junior analyst, senior analyst, and FP&A manager — plus ATS keywords by finance track.",
  keywords: ["financial analyst resume", "FP&A resume", "finance analyst resume", "investment analyst resume", "financial analyst resume examples 2025", "finance resume ATS tips"],
  alternates: { canonical: "/blog/financial-analyst-resume" },
  openGraph: {
    title: "Financial Analyst Resume — Examples, Skills & ATS Tips (2025)",
    description: "Write a financial analyst resume that passes ATS and gets callbacks — with before/after examples by career level and finance track.",
    url: "/blog/financial-analyst-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_READ_FOR = [
  {
    signal: "Modeling depth and technical fluency",
    detail: "Finance hiring managers filter on modeling skills immediately. DCF, LBO, merger models, three-statement models, scenario analysis — naming the specific models you've built (not just 'financial modeling experience') shows technical fluency. For FP&A, the relevant models are operational: driver-based budget models, rolling forecasts, headcount planning models. For investment banking and PE, it's transaction models. Be specific about what you built and the complexity.",
    redFlag: "'Strong financial modeling skills' with no model types named. Every finance resume makes this claim — naming the models is the minimum bar.",
    strongExample: "Built fully integrated 3-statement model with 5-year DCF valuation for $120M acquisition target; presented sensitivity analysis to CFO and board showing IRR range of 14–22% under base/bull/bear assumptions.",
  },
  {
    signal: "Business impact — decisions your analysis drove",
    detail: "The best financial analyst resumes don't just describe the analysis — they describe the decision or outcome it enabled. 'Prepared monthly variance report' is table stakes. 'Identified $2.3M in cost overruns through variance analysis, leading to vendor contract renegotiation' is a business contribution. Hiring managers at the manager and director level especially look for evidence that your work changed something, not just that you produced it on time.",
    redFlag: "'Prepared monthly financial reports and presented findings to leadership' — produced work with no stated impact, decision, or outcome.",
    strongExample: "Identified $2.1M in avoidable capex through zero-based budget review; recommendation adopted by CFO, freeing capital deployed into 2 new product lines generating $4.8M incremental revenue in Year 1.",
  },
  {
    signal: "Financial scope and portfolio size",
    detail: "Finance scope matters more than most analysts realize. The budget you modeled, the revenue you forecasted, the portfolio you analyzed — these numbers calibrate your experience. A senior FP&A analyst modeling $50M in departmental budget is different from one modeling a $2B P&L. Include the dollar scope for every major financial responsibility.",
    redFlag: "Bullets describing financial work with no dollar amounts. 'Managed the annual budget process' — what budget? $5M? $500M?",
    strongExample: "Owned FP&A for $340M North America P&L across 8 product lines; delivered monthly forecast with average 2.1% MAPE against actuals over 6 quarters.",
  },
  {
    signal: "Data and systems fluency",
    detail: "Finance is increasingly data-driven. SQL, Python (pandas, matplotlib), Tableau, Power BI, Hyperion, Anaplan, Adaptive Insights, Essbase — specific tool fluency is a strong differentiator in 2025. Excel is still the core tool but is table stakes. Analysts who can also pull from data warehouses, build automated reporting, or work in planning tools are meaningfully more valuable — and should say so explicitly.",
    redFlag: "Listing only 'Excel, PowerPoint, Word' as technical skills. Excel is the baseline, not the differentiator.",
    strongExample: "Built automated P&L reporting dashboard in Tableau connected to Snowflake data warehouse; reduced monthly reporting cycle from 5 days to same-day refresh, freeing 20+ hours of analyst time monthly.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Financial Analyst (0–3 Years)",
    before: "Assisted with financial modeling and prepared monthly reports for management",
    after: "Built 3-statement integrated model for 4 business units ($180M combined revenue); prepared monthly bridge analysis comparing actuals vs. prior month and prior year with 12-month rolling variance trending — presented to VP Finance in weekly business review with 100% on-time delivery over 18-month tenure",
    fix: "Scope ($180M), model specificity (3-statement, bridge analysis, rolling variance), cadence (weekly), and delivery record (100% on time) replace 'assisted with modeling.'",
  },
  {
    level: "Senior Financial Analyst",
    before: "Led budgeting and forecasting process for the company",
    after: "Owned annual budget and quarterly reforecast process for $620M corporate P&L; built driver-based bottom-up model integrating inputs from 14 business unit finance leads; achieved 97% forecast accuracy (MAPE 3%) vs. company target of 95% for FY2024 — best performance in 3-year history",
    fix: "P&L scope ($620M), process detail (driver-based, bottom-up, 14 inputs), accuracy metric (MAPE 3% vs 95% target), and a historical comparison ('best in 3-year history').",
  },
  {
    level: "FP&A Manager",
    before: "Managed the FP&A team and supported strategic planning initiatives",
    after: "Led 4-person FP&A team supporting $1.4B revenue business; redesigned 5-year strategic planning process reducing cycle time from 14 weeks to 9 weeks and improving scenario coverage from 2 to 7 scenarios; built Anaplan-based planning model replacing 40+ manual Excel files, eliminating version control issues and reducing consolidation time by 85%",
    fix: "Team size, revenue scope, two distinct transformation metrics (planning cycle time, scenario coverage), and a system implementation with specific efficiency gain.",
  },
];

const BY_TRACK = [
  {
    track: "FP&A",
    atsKeywords: "financial planning, budgeting, forecasting, variance analysis, business partnering, P&L management, headcount planning, Hyperion, Anaplan, Adaptive Insights, rolling forecast, MAPE, scenario modeling",
    leadWith: "P&L scope, forecast accuracy metrics, planning cycle ownership, and business partnering examples where your analysis drove operating decisions",
    certifications: "CFA, CPA, MBA (useful but not required at analyst level)",
  },
  {
    track: "Investment Banking / Corporate Development",
    atsKeywords: "DCF, LBO, merger model, precedent transactions, comparable company analysis, pitch book, due diligence, M&A, capital markets, deal execution, Bloomberg, Capital IQ, FactSet",
    leadWith: "Transaction count, deal size, model types built, and any lead or co-lead responsibility on diligence or execution",
    certifications: "CFA (especially for research/CorpDev), Series 63/79 (for regulated banking roles)",
  },
  {
    track: "Financial Reporting / Accounting Analysis",
    atsKeywords: "GAAP, IFRS, SEC reporting, 10-K, 10-Q, MD&A, technical accounting, ASC 606, ASC 842, lease accounting, revenue recognition, audit support, SOX",
    leadWith: "Reporting scope (public vs private, filing frequency), technical accounting topics handled, and audit support history",
    certifications: "CPA (often required for reporting and technical accounting roles)",
  },
  {
    track: "Data / Analytics in Finance",
    atsKeywords: "SQL, Python, R, Tableau, Power BI, Snowflake, dbt, data warehouse, automated reporting, KPI dashboard, financial data modeling, self-service analytics",
    leadWith: "Specific data tools used, automation impact (hours saved), and business insights generated from data analysis that changed decisions",
    certifications: "CFA, data certifications (Tableau Certified Data Analyst, Google Data Analytics), Python for Finance courses",
  },
];

export default async function FinancialAnalystResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Financial Analyst Resume — Examples, Skills & ATS Tips (2025)"
        description="Write a financial analyst resume that passes ATS and gets callbacks — with before/after examples by career level and finance track."
        url={`${BASE_URL}/blog/financial-analyst-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Financial Analyst Resume", url: `${BASE_URL}/blog/financial-analyst-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Finance</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Financial Analyst Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Finance hiring managers scan for modeling depth, financial scope, business impact, and data tools — in roughly that order. Most analyst resumes describe work produced. The ones that get callbacks describe decisions driven.
          </p>
        </div>
      </section>

      {/* What They Read For */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What finance hiring managers read for</h2>
          <div className="mt-8 space-y-5">
            {WHAT_THEY_READ_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.signal}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Red flag</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.redFlag}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong example</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.strongExample}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet Transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: bullet rewrites by career level</h2>
          <div className="mt-8 space-y-6">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.level} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.level}</p>
                </div>
                <div className="grid gap-0 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="rounded-lg bg-red-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.before}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">After</p>
                    <p className="rounded-lg bg-emerald-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.after}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[#4361EE]">What changed: </span>{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Track */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords by finance track</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">FP&A, investment banking, financial reporting, and data-focused finance roles are screened for entirely different keywords. Tailor to your target track.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {BY_TRACK.map((track) => (
              <div key={track.track} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{track.track}</h3>
                <div className="mt-4 space-y-3 text-[13px] text-[var(--muted)]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Lead with</p>
                    <p className="leading-6">{track.leadWith}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Key ATS terms</p>
                    <p className="leading-6">{track.atsKeywords}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--brand)]/[0.05] p-3">
                    <p className="font-semibold text-[#4361EE]">Certifications: {track.certifications}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your finance resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the specific finance job description — finds missing modeling keywords and scope metrics, rewrites weak bullets, and prepares you for the technical finance interview. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
