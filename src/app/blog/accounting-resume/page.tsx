import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Accounting Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "How to write an accounting resume that passes ATS and impresses hiring managers — with before/after bullet examples for staff accountant, senior accountant, controller, and CPA tracks. ATS keywords by role type.",
  keywords: ["accounting resume", "accountant resume", "CPA resume", "staff accountant resume", "controller resume", "accounting resume examples 2025", "accounting resume tips"],
  alternates: { canonical: "/blog/accounting-resume" },
  openGraph: {
    title: "Accounting Resume — Examples, Skills & ATS Tips (2025)",
    description: "Write an accounting resume that passes ATS and gets callbacks — with real before/after examples by level.",
    url: "/blog/accounting-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_READ_FOR = [
  {
    signal: "Software fluency and system experience",
    detail: "Accounting hiring managers filter immediately for software. QuickBooks, SAP, Oracle, NetSuite, Sage, Dynamics 365, Yardi (real estate), or industry-specific ERP systems are not afterthoughts — they're primary filters. A controller who has run a NetSuite migration is categorically different from one who hasn't. Your software experience belongs at the top of your resume, not buried in a skills section.",
    redFlag: "Listing 'Microsoft Office' as a primary skill in 2025. It's table stakes, not a differentiator. Not listing the specific ERP or accounting software used at each role.",
    strongExample: "Systems: NetSuite (GL, AP, AR, financial reporting), Salesforce (revenue reconciliation), Expensify, FloQast (close management) — managed NetSuite ERP migration from QuickBooks Desktop serving 220-employee company.",
  },
  {
    signal: "Month-end close ownership and timeline",
    detail: "The close process is the heartbeat of accounting operations. Hiring managers want to know your close timeline (how many days), what you owned within it, and whether you've improved it. 'Responsible for month-end close' tells them nothing. 'Reduced close cycle from 12 days to 7 days' tells them everything.",
    redFlag: "'Responsible for month-end, quarter-end, and year-end close processes' — present in nearly every accounting resume and functionally meaningless.",
    strongExample: "Led 7-day month-end close for 14-entity organization; reduced close cycle from 12 to 7 days by automating journal entries and standardizing reconciliation templates across subsidiaries.",
  },
  {
    signal: "Scope and dollar amounts",
    detail: "Accounting resumes need financial scope at every level — portfolio size, budget managed, revenue reconciled, audit coverage. Without numbers, the reader has no way to calibrate your experience. A staff accountant managing $800K in vendor payments and one managing $45M in vendor payments need different language, but both should include the number.",
    redFlag: "Bullet after bullet with no financial scope. 'Prepared financial statements,' 'processed vendor invoices,' 'reconciled accounts' — all meaningless without scale.",
    strongExample: "Managed full-cycle accounts payable for $42M annual spend; processed 1,200+ vendor invoices monthly with 99.8% accuracy rate, zero late payment penalties over 3-year tenure.",
  },
  {
    signal: "Compliance, audit, and internal controls",
    detail: "For senior roles especially, compliance ownership is a major signal — SOX (Sarbanes-Oxley) compliance, internal controls documentation, external audit coordination, and regulatory reporting. Even at staff level, evidence that you've worked in a regulated environment (public company, healthcare, banking) or supported an audit is differentiating.",
    redFlag: "No mention of audit experience, internal controls, or compliance — particularly critical for controller and CFO-adjacent roles.",
    strongExample: "Primary liaison for annual Big Four external audit; prepared audit support packages for 40+ balance sheet accounts with zero audit adjustments for 2 consecutive fiscal years.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Staff Accountant",
    before: "Prepared journal entries and reconciled accounts for month-end close",
    after: "Prepared 60+ monthly journal entries and reconciled 25 GL accounts for 5-day close cycle at $120M revenue company; resolved $340K in reconciling items during Q3 audit with zero restatements",
    fix: "Quantities (60+ entries, 25 accounts, 5-day close), financial scope ($120M revenue), and an outcome (zero restatements) transform a generic duty into a specific accomplishment.",
  },
  {
    level: "Senior Accountant",
    before: "Managed accounts payable and receivable processes for the company",
    after: "Owned full-cycle AP/AR for $28M annual vendor spend and $18M receivables portfolio; reduced DSO from 47 to 31 days by implementing automated dunning workflow, recovering $1.2M in aged receivables within 90 days",
    fix: "AP/AR scope ($28M, $18M), the DSO improvement metric (47→31 days), and the dollar impact of the project ($1.2M recovered) replace the generic 'managed processes' framing.",
  },
  {
    level: "Controller",
    before: "Oversaw the accounting department and all financial reporting",
    after: "Led 8-person accounting team through first-year GAAP to IFRS transition for newly acquired European subsidiary; delivered compliant financial statements 3 weeks ahead of external deadline with zero restatements and received unqualified audit opinion",
    fix: "Controller-level bullets must show scope (8-person team), complexity (GAAP→IFRS transition), timeline performance (3 weeks ahead), and audit outcome (unqualified opinion).",
  },
];

const BY_ROLE = [
  {
    role: "Staff / Senior Accountant",
    atsKeywords: "general ledger, journal entries, account reconciliation, month-end close, accounts payable, accounts receivable, bank reconciliation, fixed assets, accruals, prepaid expenses",
    certifications: "CPA exam progress (note exam sections passed), CMA (Certified Management Accountant)",
    leadWith: "Software proficiency, close timeline, reconciliation accuracy, and any audit support experience",
  },
  {
    role: "Controller",
    atsKeywords: "month-end close, financial reporting, GAAP, internal controls, SOX compliance, budget management, variance analysis, consolidation, intercompany, audit coordination, ERP implementation",
    certifications: "CPA (required for most), CMA, MBA",
    leadWith: "Close cycle, team size, audit history, system implementations, and any M&A or multi-entity experience",
  },
  {
    role: "CPA / Tax",
    atsKeywords: "tax compliance, tax preparation, federal tax, state tax, tax research, partnership returns, S-Corp, corporate tax, deferred tax, ASC 740, tax provision",
    certifications: "CPA (essential), EA (Enrolled Agent for tax-specific roles)",
    leadWith: "Tax software (ProSystem fx, Drake, Lacerte, UltraTax), return complexity/count, and any IRS or state audit experience",
  },
  {
    role: "FP&A / Finance",
    atsKeywords: "financial planning, financial analysis, budgeting, forecasting, variance analysis, financial modeling, three-statement model, scenario analysis, KPI reporting, management reporting, Hyperion, Adaptive Insights",
    certifications: "CFA, CPA, MBA — in that order of differentiation for FP&A",
    leadWith: "Modeling tools, budget scope ($), forecast accuracy rates, and any business partnering examples showing influence over operating decisions",
  },
];

export default async function AccountingResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Accounting Resume — Examples, Skills & ATS Tips (2025)"
        description="Write an accounting resume that passes ATS and gets callbacks — with real before/after examples by level."
        url={`${BASE_URL}/blog/accounting-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Accounting Resume", url: `${BASE_URL}/blog/accounting-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Accounting & Finance</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Accounting Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Accounting hiring managers filter for software, close timeline, financial scope, and compliance experience — in that order. Here&apos;s how to show each clearly, with before/after examples by career level.
          </p>
        </div>
      </section>

      {/* What They Read For */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What accounting hiring managers read for</h2>
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

      {/* By Role */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords and strategy by accounting role</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Different accounting roles require different keyword strategies. A tax accountant and a controller are screened for completely different terms.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {BY_ROLE.map((role) => (
              <div key={role.role} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{role.role}</h3>
                <div className="mt-4 space-y-3 text-[13px] text-[var(--muted)]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Lead with</p>
                    <p className="leading-6">{role.leadWith}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Key ATS terms</p>
                    <p className="leading-6">{role.atsKeywords}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--brand)]/[0.05] p-3">
                    <p className="font-semibold text-[var(--brand)]">Certifications: {role.certifications}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your accounting resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the specific job description — finds missing financial keywords, rewrites weak bullets, and checks ATS formatting. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
