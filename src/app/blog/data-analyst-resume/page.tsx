import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Data Analyst Resume — SQL, Tools & ATS Keywords (2025)",
  description:
    "Data analyst hiring managers filter on SQL depth, visualization tools, business impact, and the quality of insights that changed decisions — not just dashboards built. Before/after bullet examples by career level and by analytics vertical.",
  keywords: ["data analyst resume", "data analyst resume examples", "data analyst resume 2025", "SQL resume", "data analyst skills resume", "business analyst resume", "data analyst ATS keywords"],
  alternates: { canonical: "/blog/data-analyst-resume" },
  openGraph: {
    title: "Data Analyst Resume — SQL, Tools & ATS Keywords (2025)",
    description: "What data analyst hiring managers actually screen for — SQL depth, business impact, and insights that changed decisions. With before/after examples by level.",
    url: "/blog/data-analyst-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_READ_FOR = [
  {
    signal: "SQL depth — not just 'proficient in SQL'",
    detail: "Hiring managers filter on SQL signal immediately. 'Proficient in SQL' appears on 90% of data analyst resumes and means nothing. What communicates real SQL depth: the specific query complexity you've written (window functions, CTEs, subqueries, query optimization), the scale of data you've queried (row counts, table size), and the infrastructure you've written against (Snowflake, BigQuery, Redshift, Databricks, PostgreSQL). Name the specific database and query patterns you've used most — not just the language.",
    redFlag: "'Proficient in SQL' with no context about complexity, scale, or database type. This is the most common data analyst resume filler phrase — it signals nothing about actual SQL capability.",
    strongExample: "Wrote complex multi-table SQL queries in BigQuery (10B+ row production warehouse) — including window functions for cohort retention analysis and CTEs for funnel attribution modeling; optimized 3 slow queries that reduced reporting pipeline runtime by 68%.",
  },
  {
    signal: "Visualization tools and dashboard ownership",
    detail: "List specific tools with context about what you built and who used it. 'Experience with Tableau' is baseline. What differentiates: dashboard scope (how many stakeholders, how many metrics), dashboard maintenance ownership (you built and owned it, not just contributed), and business adoption (the dashboard became the team's primary reporting source). For BI tools, also indicate whether you have data modeling experience (dbt, LookML) — a significant differentiator in 2025.",
    redFlag: "'Experience with Tableau and Power BI' with no mention of what dashboards were built, who used them, or any adoption or impact metric.",
    strongExample: "Built and maintained 4 executive dashboards in Tableau (used by 60+ stakeholders) covering customer acquisition, churn, revenue, and support metrics; dashboards replaced 3 weekly manual reports, saving 8 hours of analyst time weekly.",
  },
  {
    signal: "Business impact — the decision your analysis drove",
    detail: "Data analyst resumes consistently describe outputs (dashboards, reports, queries) without describing outcomes (decisions made, costs reduced, revenue influenced). The strongest data analyst bullets describe what changed because of the analysis. 'Built churn model' is output. 'Built churn model that identified 3 early-warning signals — retention team used model to intervene with 400 at-risk accounts, recovering $1.2M ARR' is impact. The decision or outcome is the differentiator.",
    redFlag: "'Responsible for building reports and dashboards to support business decisions' — outputs described with no actual decision, outcome, or impact.",
    strongExample: "Analyzed pricing experiment data across 8 cohorts using Python (pandas) — identified $230K in ARR uplift from a 12% price increase in enterprise segment with <3% churn impact; recommendation adopted by pricing committee and implemented in Q3.",
  },
  {
    signal: "Data storytelling and stakeholder communication",
    detail: "Senior data roles — and competitive junior roles at strong analytics organizations — look for evidence that you can communicate findings to non-technical audiences. Bullet points that mention presenting to leadership, translating complex analysis into business recommendations, or owning the analytics section of a strategic review signal this capability. Analysts who can't tell the story of their data plateaux earlier than peers who can.",
    redFlag: "Strong technical bullet points with no mention of any stakeholder interaction, presentation, or recommendation outcome. A resume that reads as pure technical execution with no communication of the insights produced.",
    strongExample: "Presented weekly product performance analysis to VP of Product and CPO — translated SQL/Python analysis into 5-slide narrative with actionable recommendations; 2 of 3 recommendations implemented in next sprint based on data.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Data Analyst (0–2 Years)",
    before: "Used SQL and Excel to support business reporting and analysis",
    after: "Wrote 30+ SQL queries in Snowflake to support weekly business review reporting for 5 business units; built automated Excel dashboard consolidating 4 data sources — reduced manual reporting time from 4 hours to 45 minutes weekly; identified $80K in subscription billing discrepancies through reconciliation analysis adopted by finance team",
    fix: "Query count (30+), database named (Snowflake), scope (5 BUs), specific output (dashboard with 4 sources), time saved, and a concrete finding with dollar impact replace 'used SQL and Excel.'",
  },
  {
    level: "Mid-Level Data Analyst (2–5 Years)",
    before: "Analyzed customer data and created dashboards to support marketing decisions",
    after: "Owned marketing analytics for DTC e-commerce company ($45M revenue) — built attribution model in Python (multi-touch, last-touch comparison) across 8 channels; Tableau dashboard adopted by all 6 marketing channel leads; analysis led to 22% budget reallocation from paid social to email, contributing to 18% improvement in blended CAC over 2 quarters",
    fix: "Revenue context, model type (attribution), channel count, tool (Python + Tableau), adoption metric (6 leads), and a business impact metric (CAC improvement) replace 'analyzed customer data.'",
  },
  {
    level: "Senior Data Analyst / Analytics Lead",
    before: "Led data analytics projects and mentored junior analysts on the team",
    after: "Led analytics function for 3-person team at B2B SaaS company ($120M ARR); built self-serve analytics infrastructure (Looker + dbt) enabling 40+ PMs and marketers to answer their own data questions — reduced ad-hoc analyst requests by 55%; mentored 2 junior analysts, both promoted within 18 months; presented quarterly business reviews to C-suite using data-driven narrative across revenue, retention, and product engagement",
    fix: "Team ownership, revenue context, infrastructure impact (Looker + dbt), adoption (40+ users), efficiency metric (55% reduction), mentorship outcome (both promoted), and executive stakeholder visibility.",
  },
];

const BY_VERTICAL = [
  {
    vertical: "Marketing Analytics",
    atsKeywords: "attribution modeling, CAC, LTV, funnel analysis, A/B testing, cohort analysis, Google Analytics, Meta Ads, campaign performance, ROAS, email analytics, segmentation",
    leadWith: "Channel attribution, CAC/LTV metrics, A/B test design and results, and budget reallocation recommendations based on your analysis",
    tools: "GA4, Looker, Tableau, Excel/Sheets, SQL, Python (pandas), Amplitude",
  },
  {
    vertical: "Product Analytics",
    atsKeywords: "product metrics, DAU/MAU, retention, funnel analysis, feature adoption, experiment design, A/B testing, event tracking, Amplitude, Mixpanel, user behavior",
    leadWith: "Feature adoption metrics, retention analysis, experiment design and results, and product decision outcomes driven by your data",
    tools: "Amplitude, Mixpanel, Looker, SQL, Python, BigQuery",
  },
  {
    vertical: "Finance and Business Analytics",
    atsKeywords: "FP&A, revenue analysis, variance analysis, P&L, cost analysis, financial modeling, forecasting, MAPE, budget analysis, SQL, Excel, Tableau",
    leadWith: "Revenue or cost impact of your analysis, forecast accuracy, and the financial decisions your work influenced",
    tools: "Excel, Tableau, SQL (Snowflake/Redshift), Python, Hyperion, Anaplan",
  },
  {
    vertical: "Operations Analytics",
    atsKeywords: "process efficiency, throughput, capacity planning, SLA, supply chain metrics, logistics analytics, KPI dashboard, operational reporting, SQL, Python",
    leadWith: "Efficiency improvements (time, cost, throughput) your analysis identified or validated, and operational decisions your data supported",
    tools: "SQL, Python, Tableau, Power BI, Excel",
  },
];

const FAQS = [
  { question: "What SQL skills should a data analyst list on their resume?", answer: "List SQL with specificity about the database system (BigQuery, Snowflake, PostgreSQL, Redshift, MySQL) and the query complexity you've worked with. Key SQL skills to mention if you have them: window functions (ROW_NUMBER, RANK, LAG/LEAD), CTEs (WITH clauses for complex multi-step queries), subqueries, JOINs across multiple tables, GROUP BY aggregations, and — for senior roles — query optimization and performance tuning. If you've worked with stored procedures, data pipelines, or scheduled queries, mention that too. The goal is to give the reader a calibrated sense of your SQL capability, not just confirm you've heard of it." },
  { question: "Is Python or SQL more important for a data analyst resume?", answer: "SQL is non-negotiable — it is the foundational skill for the vast majority of data analyst roles, and it's screened for by ATS and hiring managers as a baseline. Python is increasingly valuable but is not required for all data analyst roles. In 2025, Python (primarily pandas, matplotlib/seaborn, and scipy for statistical analysis) is a significant differentiator for mid-to-senior data analyst roles, particularly in product analytics, marketing analytics, and any role involving predictive modeling or statistical testing. The practical priority: SQL depth first, Python as a differentiator second." },
  { question: "How do I describe data analysis work without sounding generic?", answer: "The key is business outcome specificity. Instead of 'analyzed sales data,' write 'identified a 23% revenue drop in Q3 tied to a pricing change in the mid-market segment — analysis confirmed the revenue loss was in a low-LTV cohort, and the recommendation to hold the pricing change in enterprise drove $400K in retained ARR.' The formula: what you analyzed → what you found → what changed because you found it. Every data analyst bullet should answer: 'What decision did this analysis support, and what was the result?' If you can't answer that, rewrite the bullet to focus on a finding that had an impact rather than a process you executed." },
];

export default async function DataAnalystResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Data Analyst Resume — SQL, Tools & ATS Keywords (2025)"
        description="What data analyst hiring managers actually screen for — SQL depth, business impact, and insights that changed decisions. With before/after examples by level."
        url={`${BASE_URL}/blog/data-analyst-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Data Analyst Resume", url: `${BASE_URL}/blog/data-analyst-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Analytics</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Data Analyst Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Hiring managers filter on SQL depth, visualization tools, and whether your analysis actually changed a decision. Most data analyst resumes describe outputs. The ones that get callbacks describe outcomes.
          </p>
        </div>
      </section>

      {/* What They Read For */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What data analytics hiring managers read for</h2>
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
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[var(--brand)]">What changed: </span>{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Vertical */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords by analytics vertical</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Marketing analytics, product analytics, finance analytics, and ops analytics are screened for different keywords. Tailor to your target vertical.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {BY_VERTICAL.map((item) => (
              <div key={item.vertical} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.vertical}</h3>
                <div className="mt-4 space-y-3 text-[13px] text-[var(--muted)]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Lead with</p>
                    <p className="leading-6">{item.leadWith}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Key ATS terms</p>
                    <p className="leading-6">{item.atsKeywords}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--brand)]/[0.05] p-3">
                    <p className="font-semibold text-[var(--brand)]">Common tools: {item.tools}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your data analyst resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the specific data analyst job description — finds missing SQL and tool keywords, rewrites weak bullets for business impact, and coaches you through the technical and behavioral interview. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
