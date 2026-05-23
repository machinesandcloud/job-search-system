import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs CareerOne — Best for Job Seekers in Australia? (2025)",
  description:
    "CareerOne is an Australian job board aggregating listings across Sydney, Melbourne, Brisbane, and all major Australian markets. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps you negotiate offers. Comparison for Australian job seekers.",
  keywords: ["zari vs careerone", "careerone australia", "careerone job board", "australia job search 2025", "ai career coach australia", "careerone alternatives", "seek vs careerone"],
  alternates: { canonical: "/compare/zari-vs-careerone" },
  openGraph: {
    title: "Zari vs CareerOne (2025) — Best for Australian Job Seekers?",
    description: "CareerOne aggregates Australian job listings. Zari coaches you to land them — ATS optimization for Australian norms, interview prep, and salary negotiation. Full comparison.",
    url: "/compare/zari-vs-careerone",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery in Australia",
    careerone: { capable: true, detail: "CareerOne is an Australian job board aggregating listings across Sydney, Melbourne, Brisbane, Perth, Adelaide, and all major Australian markets. It operates primarily as an aggregator — pulling listings from employer career pages and other sources — giving it broad coverage of Australian roles. For Australian job seekers, CareerOne provides useful complementary coverage to Seek, which remains the dominant primary job board for most Australian professional roles." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For Australian job seekers: use Seek as the primary channel and CareerOne for complementary coverage — then bring the specific job description to Zari to optimize your application and prepare for the interview." },
    winner: "careerone",
  },
  {
    task: "Salary information for the Australian market",
    careerone: { capable: true, detail: "CareerOne provides salary data for Australian roles — covering compensation by job title, location, and industry across Australia's major markets. This is useful context for the Australian market, where salary norms differ from the UK and US — particularly for understanding market rates across different cities and industries." },
    zari: { capable: true, detail: "Zari incorporates Australian compensation context into negotiation coaching — including superannuation (employer contributions above the 11% SGC minimum are negotiable), Australian-specific total compensation components, and the negotiation conversation norms specific to Australian workplace culture." },
    winner: "careerone",
  },
  {
    task: "ATS resume optimization",
    careerone: { capable: false, detail: "CareerOne allows resume upload and application but doesn't analyze your resume against specific job descriptions or optimize for ATS keyword matching. Australian employers use the same global ATS platforms as their international counterparts — CareerOne routes applications into these systems but provides no tools to help candidates pass them." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific CareerOne job description — identifying keyword gaps, rewriting weak bullets for Australian hiring conventions, and validating ATS formatting. Australian resume conventions (2-page format is accepted, referees section expected, professional summary at top) are handled alongside ATS optimization." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    careerone: { capable: false, detail: "CareerOne provides job listings and some career content but no personalized interview coaching. Australian interviews — which typically emphasize behavioral (STAR) questions and cultural fit alongside technical competency — are entirely the candidate's responsibility to prepare for." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the CareerOne job description, evaluates your STAR-method answers for Australian interview contexts, and coaches behavioral, situational, and technical interview patterns specific to the role and industry." },
    winner: "zari",
  },
  {
    task: "Visibility to Australian recruiters",
    careerone: { capable: true, detail: "CareerOne's resume database is searchable by Australian employers and recruitment agencies. Uploading a complete profile creates passive discoverability — Australian recruitment agencies, which place a significant portion of professional roles in Australia, actively search board databases alongside LinkedIn." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. Zari's LinkedIn optimization improves your discoverability to Australian recruiters sourcing on LinkedIn — which is used alongside Seek and CareerOne by most professional employers in Australia, particularly for mid-to-senior roles." },
    winner: "careerone",
  },
  {
    task: "LinkedIn profile optimization",
    careerone: { capable: false, detail: "No LinkedIn integration or profile optimization. CareerOne and LinkedIn are parallel channels for most Australian professional roles — a strong CareerOne profile doesn't affect your LinkedIn discoverability to the same recruiters sourcing across both platforms." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for recruiter search visibility. Australian professional employers — particularly in Sydney's finance, tech, and consulting sectors and Melbourne's corporate market — use LinkedIn heavily alongside job board postings for both active and passive sourcing." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    careerone: { capable: false, detail: "CareerOne provides salary data but no negotiation coaching. Australian salary negotiation has specific norms — direct counter offers are standard, but the total compensation conversation includes superannuation contributions, leave entitlements, flexible work arrangements, and professional development budgets that are less common negotiation topics in other markets." },
    zari: { capable: true, detail: "Zari coaches salary negotiation for Australian workplace norms — including super contributions negotiation, total compensation framing, and the pushback scripts calibrated for Australian hiring practices across industries and employer types (government vs. corporate vs. startup)." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const careerone = TASK_COMPARISON.filter(r => r.winner === "careerone").length;
  return { zari, careerone, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is CareerOne or Seek better for Australian job seekers?", answer: "Seek is the dominant primary job board in Australia — with significantly larger listing volume, deeper employer relationships, and the most active recruiter network. For most professional roles in Australia, Seek should be the first search. CareerOne operates as an aggregator and is useful for complementary coverage, particularly for roles that appear in employer career pages that may not be fully indexed by Seek. The practical approach: Seek as primary, CareerOne as secondary, LinkedIn for professional and senior roles." },
  { question: "What's unique about Australian salary negotiation?", answer: "Several factors are specific to Australian salary negotiation: (1) Superannuation — employer super contributions (currently 11% SGC) are often presented as 'on top of' base salary, which affects how total compensation is calculated. Negotiating higher employer super contributions is possible, particularly at larger employers; (2) Leave entitlements — Australia has minimum leave requirements (4 weeks annual leave, personal/carer's leave) that are significantly more generous than the US. Senior roles often negotiate above the minimum; (3) Flexible work — post-2020, flexible working arrangements are a significant negotiation point in Australia, with many employers now expecting to discuss hybrid/remote arrangements as part of the offer; (4) The tone of negotiation is typically direct but relationship-preserving — similar in style to the UK but with its own cultural nuances." },
  { question: "Do Australian employers use ATS systems?", answer: "Yes — Australian employers use the same global ATS platforms as international employers (Workday, Taleo, Greenhouse, SmartRecruiters, and others). Large Australian employers, multinationals operating in Australia, and government agencies all use ATS filtering before human review. The same keyword optimization, formatting, and ATS compatibility rules apply to Australian applications as to US or UK applications. The one Australian-specific consideration: Australian resumes are typically 2 pages, which ATS handles without issue as long as the formatting is clean and text-parseable." },
];

export default async function ZariVsCareerOnePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs CareerOne", url: `${BASE_URL}/compare/zari-vs-careerone` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs CareerOne</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            CareerOne aggregates Australian job listings across Sydney, Melbourne, Brisbane, and all major markets — complementing Seek as a secondary discovery channel. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.careerone}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">CareerOne wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "careerone" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.careerone.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">CareerOne {row.careerone.capable ? "✓" : "✗"}</p>
                      {row.winner === "careerone" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.careerone.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4361EE]">Wins</span>}
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found an Australian role on CareerOne? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for Australian ATS systems, coaches your interview for the role and industry, and helps you negotiate the full Australian package — base, super, leave, and flexibility. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
