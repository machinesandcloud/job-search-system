import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Operations Manager Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "What ops hiring managers read for in a resume — P&L ownership, process improvement metrics, team scale, and cross-functional leadership. With before/after examples and ATS keywords by industry.",
  keywords: ["operations manager resume", "ops manager resume", "director of operations resume", "operations resume examples", "operations manager skills", "operations resume 2025"],
  alternates: { canonical: "/blog/operations-manager-resume" },
  openGraph: {
    title: "Operations Manager Resume — Examples, Skills & ATS Tips (2025)",
    description: "Write an ops manager resume that quantifies process impact and gets past ATS — with real before/after examples.",
    url: "/blog/operations-manager-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_READ_FOR = [
  {
    dimension: "P&L and budget ownership",
    why: "Operations managers run the cost side of the business. Hiring managers look immediately for evidence of budget scope — what you owned, what you controlled, and whether you moved the needle on cost efficiency. A resume that never mentions budget, headcount, or cost metrics looks junior regardless of title.",
    redFlag: "Resume describes operational activity with no financial scope. 'Managed daily operations' with no budget or P&L context.",
    strongExample: "Managed $8.4M operating budget across 3 distribution centers; reduced cost-per-unit by 22% through vendor renegotiation and warehouse layout redesign over 18 months.",
  },
  {
    dimension: "Process improvement with measured results",
    why: "Operations is fundamentally about making systems work better. Hiring managers want to see the specific process you improved, the methodology you used (Lean, Six Sigma, Kaizen, process mapping), and the measurable result. The number isn't the point — it's evidence that you think in terms of systems and outcomes, not just activity.",
    redFlag: "Bullet says 'improved processes' or 'streamlined workflows' with no specificity on what changed or by how much.",
    strongExample: "Redesigned inbound fulfillment workflow using value stream mapping; reduced pick-and-pack cycle time from 4.2 hours to 2.1 hours, increasing daily throughput by 38% without adding headcount.",
  },
  {
    dimension: "Cross-functional and vendor management",
    why: "Ops managers interface with finance, logistics, HR, procurement, and often technology simultaneously. Evidence of cross-functional influence — without direct authority — shows leadership maturity. Vendor management scope is equally important: how many vendors, what spend, what contract leverage you held.",
    redFlag: "Resume is siloed — only describes direct team management. No mention of cross-functional projects, procurement, or vendor relationships.",
    strongExample: "Led cross-functional task force (logistics, IT, finance) to implement WMS system; negotiated SLA terms with 3PL partner cutting mis-ship rate from 3.1% to 0.4% over two quarters.",
  },
  {
    dimension: "Team scale and development",
    why: "Operations leadership is always people leadership at scale. Hiring managers look for direct report headcount, any union or hourly workforce management complexity, and evidence that you develop talent (retention rate, promotions from within, performance improvement outcomes).",
    redFlag: "Lists team management without numbers. 'Managed a team' is meaningless — managed 3 people or 150 people is not.",
    strongExample: "Led 65-person operations team (12 supervisors, 53 hourly associates) across 2 shifts; improved 90-day retention from 61% to 84% through structured onboarding and bi-weekly coaching cadence.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Operations Coordinator → Manager",
    before: "Helped manage operations and coordinate teams to meet daily goals",
    after: "Coordinated 22-person warehouse team across 2 shifts to meet daily throughput targets of 1,400 units; escalated bottlenecks to floor manager and maintained 97.2% on-time fulfillment over 6-month peak season",
    fix: "Specificity at every level: team size, shift coverage, throughput target, escalation ownership, and a measurable outcome. 'Helped' is removed entirely.",
  },
  {
    level: "Operations Manager",
    before: "Managed operations and improved efficiency across multiple facilities",
    after: "Oversaw operations across 3 manufacturing facilities (combined 180 FTEs, $12M operating budget); implemented standard work documentation and Lean daily management system, reducing downtime by 29% and scrap rate by 17% over 12 months",
    fix: "FTE count, budget, methodology named, and two distinct outcome metrics. 'Multiple facilities' is replaced with the actual scope.",
  },
  {
    level: "Director of Operations",
    before: "Led operations strategy and drove company-wide improvements",
    after: "Defined and executed 3-year operations roadmap for 400-employee manufacturer; led ERP migration, consolidated 5 regional supply chains into 1 national hub, and delivered $3.2M in annualized cost savings — 14% below cost baseline at Board commitment",
    fix: "Director-level bullets must show strategic ownership (roadmap, multi-year), scope (400 employees), transformation (ERP, consolidation), and board-level financial accountability.",
  },
];

const BY_INDUSTRY = [
  {
    industry: "Supply Chain & Logistics",
    emphasis: "3PL management, WMS platforms (Manhattan, SAP WM, Oracle), KPIs (OTIF, DIFOT, fill rate, shrinkage), inventory turns, carrier negotiation",
    atsKeywords: "OTIF, 3PL, WMS, inventory control, freight management, distribution center, last-mile, carrier negotiation, supply chain optimization",
    certifications: "APICS CSCP, CLTD, Six Sigma Green/Black Belt, Lean certification",
  },
  {
    industry: "Manufacturing",
    emphasis: "OEE improvement, downtime reduction, lean/Six Sigma methodology, SPC, quality systems (ISO, TS16949), shift scheduling, safety record (OSHA recordable rates)",
    atsKeywords: "OEE, Lean, Six Sigma, Kaizen, standard work, SMED, value stream mapping, safety compliance, OSHA, quality management, production planning",
    certifications: "Six Sigma Black Belt, ASQ CQE, PMP, APICS CPIM",
  },
  {
    industry: "Retail & E-Commerce",
    emphasis: "Inventory shrink, return rate management, store ops KPIs (UPT, ATV, conversion), fulfillment throughput, vendor compliance, labor scheduling optimization",
    atsKeywords: "inventory shrink, labor scheduling, fulfillment, BOPIS, omnichannel, vendor compliance, SKU rationalization, shrink reduction, pick-and-pack",
    certifications: "Lean Six Sigma, PMP, CSCM",
  },
  {
    industry: "Tech & SaaS Operations",
    emphasis: "Tooling and systems (Salesforce, Zendesk, Jira), operational efficiency metrics (CSAT, NPS, resolution time), vendor/contract management, headcount planning, cross-functional OKR ownership",
    atsKeywords: "process automation, OKR, operational efficiency, vendor management, CSAT, SLA, tooling stack, cross-functional leadership, headcount planning",
    certifications: "PMP, Six Sigma Green Belt, ITIL (for IT ops), AWS/GCP (for cloud ops)",
  },
];

export default async function OperationsManagerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Operations Manager Resume — Examples, Skills & ATS Tips (2025)"
        description="What ops hiring managers read for — P&L, process metrics, team scale, cross-functional leadership."
        url={`${BASE_URL}/blog/operations-manager-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Operations Manager Resume", url: `${BASE_URL}/blog/operations-manager-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Operations</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Operations Manager Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Ops hiring managers read for budget scope, process improvement metrics, team scale, and cross-functional leadership. Here&apos;s how to show all four — with real before/after examples by level and industry.
          </p>
        </div>
      </section>

      {/* What They Read For */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What operations hiring managers read for</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">These four signals determine whether your resume gets a callback or goes to the no pile — regardless of experience.</p>
          <div className="mt-8 space-y-5">
            {WHAT_THEY_READ_FOR.map((item) => (
              <div key={item.dimension} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.dimension}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.why}</p>
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

      {/* By Industry */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords and resume strategy by industry</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Operations roles across industries use different language and value different signals. Match your resume to the terminology of the sector you&apos;re targeting.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {BY_INDUSTRY.map((sector) => (
              <div key={sector.industry} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{sector.industry}</h3>
                <div className="mt-4 space-y-3 text-[13px] text-[var(--muted)]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Lead with</p>
                    <p className="leading-6">{sector.emphasis}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">ATS keywords</p>
                    <p className="leading-6">{sector.atsKeywords}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--brand)]/[0.05] p-3">
                    <p className="font-semibold text-[#4361EE]">Certifications: {sector.certifications}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your operations resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the specific job description — finds missing process and leadership keywords, rewrites weak bullets, and checks ATS formatting. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
