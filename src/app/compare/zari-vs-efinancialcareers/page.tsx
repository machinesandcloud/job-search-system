import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs eFinancialCareers — Best for Finance & Banking Jobs? (2025)",
  description:
    "eFinancialCareers is the leading job board for finance, banking, investment management, and fintech roles globally — covering London, New York, Hong Kong, Singapore, and all major financial centers. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate offers in finance. Full comparison.",
  keywords: ["zari vs efinancialcareers", "efinancialcareers finance jobs", "finance job board", "banking jobs 2025", "investment banking resume", "fintech jobs", "efinancialcareers alternatives", "finance career coach"],
  alternates: { canonical: "/compare/zari-vs-efinancialcareers" },
  openGraph: {
    title: "Zari vs eFinancialCareers (2025) — Best for Finance & Banking Jobs?",
    description: "eFinancialCareers covers finance and banking roles globally. Zari coaches you to land them — ATS optimization for financial services hiring, technical interview prep, and compensation negotiation. Full comparison.",
    url: "/compare/zari-vs-efinancialcareers",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Finance job listing discovery globally",
    efc: { capable: true, detail: "eFinancialCareers is the specialist job board for financial services — covering investment banking, asset management, private equity, hedge funds, fintech, risk, compliance, quantitative research, and financial technology roles across London, New York, Hong Kong, Singapore, Frankfurt, Sydney, and all major financial centers. As a specialist platform, it has deeper penetration into financial services hiring than generalist boards like LinkedIn Jobs or Indeed — particularly for roles at sell-side banks, buy-side firms, and fintech companies who prefer to advertise where finance talent actively searches." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For finance job seekers: eFinancialCareers for specialist financial services roles, LinkedIn for senior and cross-industry finance roles, and specific firm career pages for bulge bracket banks and top asset managers — then bring the specific job description to Zari to optimize your application and prepare for the technical and behavioral interview." },
    winner: "efc",
  },
  {
    task: "Salary data for financial services roles",
    efc: { capable: true, detail: "eFinancialCareers publishes salary surveys and compensation benchmarking data for financial services roles — including front office, middle office, risk, compliance, and technology roles across major financial centers. This data covers total compensation (base + bonus structures common in financial services) and is specific enough to be useful for evaluating offers in an industry where bonus represents a significant portion of annual earnings." },
    zari: { capable: true, detail: "Zari incorporates financial services compensation context into negotiation coaching — including how to frame the base vs. bonus conversation, guaranteed bonus negotiation for new joiners (common in front office hiring), sign-on for forfeited compensation, and the deferred compensation structures (deferred cash, restricted stock, carried interest) that are common at senior levels in financial services." },
    winner: "efc",
  },
  {
    task: "ATS resume optimization for financial services",
    efc: { capable: false, detail: "eFinancialCareers allows profile creation and job applications but doesn't analyze your resume against specific job descriptions or optimize for the ATS systems used by financial services employers. Banks, asset managers, and fintech firms use ATS platforms (Taleo, Workday, Kenexa, and proprietary systems at larger banks) that screen applications before any human review." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific eFinancialCareers job description — identifying finance-specific keyword gaps (products traded, deal types, risk frameworks, regulatory experience, certifications like CFA, FRM, or Series 7), rewriting bullets to lead with deal size, AUM, P&L impact, or risk reduction metrics that finance hiring managers respond to, and validating ATS formatting for the systems used by banks and asset managers." },
    winner: "zari",
  },
  {
    task: "Technical finance interview preparation",
    efc: { capable: false, detail: "eFinancialCareers provides job listings and some career content but no personalized interview coaching. Finance interviews — especially for investment banking, equity research, quantitative roles, and buy-side positions — involve technical knowledge assessment (valuation, accounting, financial modeling, market knowledge) alongside behavioral and fit questions that are highly role-specific." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the eFinancialCareers job description — covering technical finance questions (DCF, LBO mechanics, credit analysis, risk frameworks, trading desk knowledge), behavioral questions using the STAR method adapted for financial services, and 'fit' questions that are standard in finance hiring (why this firm, why this desk, why this asset class)." },
    winner: "zari",
  },
  {
    task: "Finance recruiter network and visibility",
    efc: { capable: true, detail: "eFinancialCareers has a searchable candidate database actively used by specialized finance recruiters and in-house financial services talent teams. Finance recruiting is heavily intermediated by specialized search firms (Selby Jennings, Heidrick & Struggles, Michael Page Financial Services, Options Group) who search eFinancialCareers alongside LinkedIn. A complete, keyword-rich eFinancialCareers profile creates meaningful passive discoverability in an industry where many of the best roles are never publicly advertised." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. Zari's LinkedIn optimization improves your visibility to finance recruiters who source on LinkedIn — important for the growing segment of financial services roles posted on LinkedIn by fintech companies, boutique banks, and family offices." },
    winner: "efc",
  },
  {
    task: "LinkedIn profile optimization",
    efc: { capable: false, detail: "No LinkedIn integration or optimization. For financial services professionals, eFinancialCareers and LinkedIn are parallel search channels — specialized finance recruiters use both, with eFinancialCareers stronger for banking and traditional asset management and LinkedIn stronger for fintech and boutique/entrepreneurial finance." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for finance recruiter search visibility — ensuring that product types, deal experience, certifications, and quantified outcomes (AUM managed, P&L contribution, portfolio performance) are correctly positioned for how finance recruiters search." },
    winner: "zari",
  },
  {
    task: "Compensation negotiation coaching for finance",
    efc: { capable: false, detail: "eFinancialCareers provides salary data but no negotiation coaching. Finance compensation negotiation is uniquely complex: the base vs. bonus split varies dramatically by role (equity research analyst vs. trader vs. risk manager vs. compliance); guaranteed bonuses for the first year or two are standard in front office hiring; deferred compensation and clawbacks must be factored into total package comparison; and sign-on bonuses to replace forfeited compensation from the previous employer are routinely negotiated." },
    zari: { capable: true, detail: "Zari coaches financial services compensation negotiation — including guaranteed bonus conversations, sign-on structure to replace forfeited prior-year bonuses and unvested deferred compensation, base vs. total compensation framing, and how to negotiate across multiple competing offers in a sector where counter-offers are common and expected." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const efc = TASK_COMPARISON.filter(r => r.winner === "efc").length;
  return { zari, efc, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is eFinancialCareers worth using for finance job searches?", answer: "Yes — eFinancialCareers is the specialist job board with the deepest penetration into financial services hiring. For investment banking, asset management, risk, compliance, and fintech roles, it's more targeted than general boards. The specific value: (1) roles posted specifically for finance candidates that don't appear on general boards; (2) a candidate database actively searched by specialized finance recruiters; (3) finance-specific salary data. The complementary approach: eFinancialCareers for specialist banking and asset management roles, LinkedIn for fintech and boutique finance, and company career pages for specific top firms." },
  { question: "What's unique about compensation negotiation in finance?", answer: "Finance compensation is more complex than most industries: (1) Base vs. bonus split — front office roles often have a modest base with significant discretionary bonus; when negotiating, you're often really negotiating bonus expectations rather than base; (2) Guaranteed bonuses — common for first 1-2 years in front office roles to attract candidates away from prior-year bonus eligibility; negotiable in amount and duration; (3) Deferred compensation — senior roles often have deferred cash, RSUs, or carried interest with multi-year vesting; this creates 'golden handcuffs' that a new employer often needs to buy out; (4) Sign-on bonuses — routinely used to replace forfeited prior-year bonus and unvested deferred comp; this is standard, not exceptional, to negotiate; (5) Clawbacks — most banks have clawback provisions on guaranteed bonuses and deferred comp; review the terms before accepting." },
  { question: "What certifications matter most for a finance resume?", answer: "Depends heavily on the role: (1) CFA (Chartered Financial Analyst) — highest-value general finance credential; expected for equity research, asset management, and many front-office roles; (2) FRM (Financial Risk Manager) — standard for risk management roles at banks and asset managers; (3) CAIA (Chartered Alternative Investment Analyst) — valued for private equity, hedge fund, and alternatives roles; (4) Series 7/63/65/66 — required for registered representative and investment advisor roles in the US; (5) CAIA + CFA together — strong combination for alternatives and multi-asset portfolio roles; (6) CQF (Certificate in Quantitative Finance) or FE/MFE degrees — for quantitative research and structured products; (7) CFP (Certified Financial Planner) — for wealth management and financial advisory. On your resume: list status (passed, enrolled, pursuing), exam level for in-progress credentials, and any relevant continuing education." },
];

export default async function ZariVsEFinancialCareersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs eFinancialCareers", url: `${BASE_URL}/compare/zari-vs-efinancialcareers` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs eFinancialCareers</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            eFinancialCareers is the specialist job board for finance and banking — covering investment banking, asset management, fintech, and all major financial centers globally. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.efc}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">eFinancialCareers wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE_DATA.total} evaluated job search tasks</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4">
            {TASK_COMPARISON.map((row) => (
              <div key={row.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "efc" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.efc.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">eFinancialCareers {row.efc.capable ? "✓" : "✗"}</p>
                      {row.winner === "efc" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.efc.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--brand)]">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a finance role on eFinancialCareers? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for financial services ATS systems, coaches your technical and behavioral interview for the specific role and firm type, and helps you negotiate total compensation — base, guaranteed bonus, sign-on, and deferred comp. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
