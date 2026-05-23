import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Naukri — Best for Job Seekers in India? (2025)",
  description:
    "Naukri.com is India's #1 job portal — with over 6.5 crore registered job seekers and the largest recruiter base in the Indian market. Zari is an AI career coach that optimizes your resume for ATS, coaches interviews, and helps negotiate offers. Full comparison for Indian job seekers.",
  keywords: ["zari vs naukri", "naukri india", "naukri job search", "india job portal 2025", "ai career coach india", "naukri alternatives", "best job sites india 2025", "naukri resume tips"],
  alternates: { canonical: "/compare/zari-vs-naukri" },
  openGraph: {
    title: "Zari vs Naukri (2025) — Best for Indian Job Seekers?",
    description: "Naukri.com is India's #1 job portal. Zari coaches you to land those roles — ATS optimization for Indian hiring norms, interview prep, and salary negotiation. Full comparison.",
    url: "/compare/zari-vs-naukri",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery across India",
    naukri: { capable: true, detail: "Naukri.com is India's largest job portal — with over 1 lakh active job listings at any given time and relationships with most major Indian employers across IT, BFSI, manufacturing, consulting, and government sectors. Naukri covers metro and Tier-2 city jobs across Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, and beyond. For Indian job seekers, Naukri is the primary discovery channel across most industries, with LinkedIn serving as a parallel channel for senior and specialized roles." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For Indian job seekers: use Naukri.com as your primary channel across most industries, LinkedIn for senior and specialized roles, and company career pages for tier-1 tech and consulting firms — then bring the specific job description to Zari to optimize your application and prepare for the interview." },
    winner: "naukri",
  },
  {
    task: "Resume database visibility to Indian recruiters",
    naukri: { capable: true, detail: "Naukri's resume database is the most searched candidate database in India — with over 85,000 recruiters actively using it. Uploading a keyword-rich, updated profile creates significant passive discoverability, particularly for IT, engineering, and finance roles where recruiters source directly from the database. Naukri's 'Resume Score' feature and profile completion metrics guide candidates toward more searchable profiles." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. Zari's LinkedIn optimization improves your discoverability to Indian recruiters who source on LinkedIn — important for MNC roles, consulting, and senior leadership positions where LinkedIn usage by hiring managers is high alongside Naukri." },
    winner: "naukri",
  },
  {
    task: "ATS resume optimization for Indian employers",
    naukri: { capable: false, detail: "Naukri allows resume uploads and has a resume builder, but doesn't analyze your resume against specific job descriptions or optimize for the ATS systems used by Indian employers. Large Indian IT companies (TCS, Infosys, Wipro, HCL), MNCs operating in India, and funded startups all use ATS platforms that filter resumes before human review — Naukri routes applications into these systems but provides no tools to help candidates pass them." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific Naukri job description — identifying keyword gaps (technical stack, domain terms, certifications like TOGAF or PMP), rewriting weak bullets for the role and industry, and validating ATS formatting. Indian resume conventions (typically 2-3 pages for experienced candidates, objective statement common for freshers, projects section important for campus hires) are handled alongside global ATS optimization." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    naukri: { capable: false, detail: "Naukri provides job listings, salary insights, and some career content, but no personalized interview coaching. Indian interviews — particularly for IT roles — typically include technical rounds, HR rounds, and increasingly structured behavioral interviews at MNCs and well-funded startups. Preparation for these is the candidate's responsibility." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the Naukri job description, coaches technical and behavioral rounds, and prepares you for the HR round that is standard in Indian hiring — including salary discussion expectations (CTC vs. in-hand structure, variable pay components, joining bonus considerations)." },
    winner: "zari",
  },
  {
    task: "Salary data for the Indian market",
    naukri: { capable: true, detail: "Naukri's salary insights provide Indian market compensation data by role, location, experience band, and industry — covering the CTC (Cost to Company) structure common in Indian compensation. This is useful context for evaluating offers and preparing for HR round salary discussions, where the CTC framing includes basic salary, HRA, allowances, provident fund, and variable pay." },
    zari: { capable: true, detail: "Zari incorporates Indian compensation context into negotiation coaching — including CTC vs. take-home structure, variable pay negotiation, joining bonus as a counter-offer tool, increment expectations (median salary hikes at job change vs. internal appraisal), and the negotiation dynamics specific to Indian corporate culture across startup, MNC, and PSU contexts." },
    winner: "naukri",
  },
  {
    task: "LinkedIn profile optimization",
    naukri: { capable: false, detail: "No LinkedIn integration or profile optimization. Naukri and LinkedIn are parallel channels — Naukri dominates Indian SME and mid-market hiring while LinkedIn is more used by MNCs, tier-1 Indian tech companies, and for senior-level sourcing. An optimized Naukri profile doesn't translate to LinkedIn discoverability." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for recruiter search visibility. For Indian professionals targeting MNC roles, global team positions, or leadership tracks, LinkedIn optimization is a meaningful complement to Naukri profile management." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    naukri: { capable: false, detail: "Naukri provides salary benchmarking data but no negotiation coaching. Indian salary negotiation has specific conventions: CTC framing means the discussion is about total cost-to-company (not net pay); typical increments at job change run 20–30%+ vs. 8–15% for internal appraisals; joining bonuses are increasingly used to recover unvested equity or forfeited bonuses; and the HR round salary discussion has specific norms that differ from Western negotiation contexts." },
    zari: { capable: true, detail: "Zari coaches salary negotiation for the Indian market — including how to structure the CTC conversation, how to negotiate beyond the first offer in Indian corporate culture (where initial offers often have 10–20% upward flexibility), how to use competing Naukri offers as leverage, and how to negotiate joining bonuses and variable pay when base has a ceiling." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const naukri = TASK_COMPARISON.filter(r => r.winner === "naukri").length;
  return { zari, naukri, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Naukri still the best job portal in India in 2025?", answer: "Naukri.com remains the largest job portal in India by listing volume and recruiter activity — particularly for IT, BFSI, and mid-market Indian companies. However, the landscape has diversified: LinkedIn has become essential for MNC roles and senior positions; Instahyre and Cutshort cater to tech startups; iimjobs is used for management roles; and company career pages are primary for tier-1 IT companies (TCS, Infosys, Accenture India, Cognizant). For most Indian job seekers, the practical approach is Naukri as primary, LinkedIn for professional and senior roles, and targeted company pages for specific high-intent applications." },
  { question: "How is Indian salary structure different from US or UK compensation?", answer: "Indian compensation is typically quoted as CTC (Cost to Company) — the total employer cost including fixed salary, variable pay, provident fund (employer contribution), gratuity, and other allowances. Take-home (in-hand) salary is significantly lower than CTC, often 65–75% depending on the components. Key components to negotiate: (1) Basic salary percentage of CTC (higher basic = more PF contribution, more tax impact); (2) Variable pay percentage and achievability of targets; (3) Joining bonus to recover unvested equity or lost incentives from previous employer; (4) ESOP vesting schedule and exercise price for startup roles. At job change, median salary increments typically run 20–40% — significantly higher than internal appraisal increments of 8–15%." },
  { question: "Do Indian companies use ATS systems?", answer: "Yes — large Indian IT companies (TCS iON, Infosys, Wipro, HCL), MNCs operating in India, and funded startups all use ATS platforms. Common platforms: Taleo, SAP SuccessFactors (common at large Indian IT), Workday (MNCs), Greenhouse and Lever (funded startups), and proprietary systems at TCS and Infosys for campus hiring. The same ATS optimization principles apply: keyword match, clean formatting, no tables or graphics, and text-parseable PDFs. Indian-specific note: the skills section and certifications section are heavily keyword-searched in the Indian IT context — technical stack terms (Java, Python, AWS, Azure, SAP module names), certifications (PMP, TOGAF, AWS Solutions Architect), and domain terms (BFSI, telecom, healthcare) are all ATS-matched." },
];

export default async function ZariVsNaukriPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Naukri", url: `${BASE_URL}/compare/zari-vs-naukri` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Naukri</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Naukri.com is India&apos;s #1 job portal — with the largest recruiter network and listing volume across Indian markets. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.naukri}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Naukri wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "naukri" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.naukri.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Naukri {row.naukri.capable ? "✓" : "✗"}</p>
                      {row.winner === "naukri" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.naukri.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found an Indian role on Naukri? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for Indian ATS systems, coaches your technical and HR rounds, and helps you negotiate the full CTC — base, variable, joining bonus, and ESOP. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
