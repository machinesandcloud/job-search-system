import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Totaljobs — Best for Job Seekers in the UK? (2025)",
  description:
    "Totaljobs is one of the UK's major job boards — with listings across every industry and region. Zari is an AI career coach that optimizes your CV, coaches interviews, and helps you negotiate offers. Comparison for UK job seekers.",
  keywords: ["zari vs totaljobs", "totaljobs uk", "totaljobs job board", "uk job search 2025", "ai career coach uk", "totaljobs alternatives", "best job sites uk 2025"],
  alternates: { canonical: "/compare/zari-vs-totaljobs" },
  openGraph: {
    title: "Zari vs Totaljobs (2025) — Best for UK Job Seekers?",
    description: "Totaljobs lists hundreds of thousands of UK roles. Zari coaches you to land them — CV optimization, interview prep, and salary negotiation. Full comparison.",
    url: "/compare/zari-vs-totaljobs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery across the UK",
    totaljobs: { capable: true, detail: "Totaljobs is one of the UK's major job boards — with hundreds of thousands of active listings across London, Manchester, Birmingham, Leeds, Bristol, Glasgow, and every UK region. It covers entry-level through executive roles and spans all industries including finance, technology, healthcare, retail, and public sector. For UK job seekers, Totaljobs operates alongside Reed.co.uk and Indeed.co.uk as a primary discovery channel." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For UK job seekers: use Totaljobs, Reed.co.uk, and LinkedIn to find your target roles — then bring the specific job description to Zari to optimize your CV and prepare for the interview." },
    winner: "totaljobs",
  },
  {
    task: "Salary benchmarking for UK roles",
    totaljobs: { capable: true, detail: "Totaljobs provides salary data for the UK market — with role-specific salary ranges across job titles, regions, and industries. This is useful for assessing whether an offer is competitive against the broader UK market, and for understanding the London vs. regional salary gap that exists for most professional roles." },
    zari: { capable: true, detail: "Zari incorporates UK compensation context into negotiation coaching — helping you use salary benchmark data strategically in a counter offer conversation, including total compensation components specific to UK employment (base, pension, holiday, private health)." },
    winner: "totaljobs",
  },
  {
    task: "CV optimization for UK ATS systems",
    totaljobs: { capable: false, detail: "Totaljobs allows CV upload and profile creation but doesn't analyze your CV against specific job descriptions or provide ATS keyword optimization. UK employers use global ATS platforms that filter resumes before any human reviewer — Totaljobs routes your application into these systems but provides no tools to help you pass them." },
    zari: { capable: true, detail: "Zari analyzes your CV against the specific Totaljobs job description — identifying keyword gaps, rewriting weak bullets, and validating formatting for ATS systems used by UK employers. UK CV conventions (typically 2 pages, professional summary, no photo required) are handled alongside ATS optimization." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    totaljobs: { capable: false, detail: "Totaljobs provides job listings and career advice content but no personalized interview coaching. UK interview preparation — including competency-based interviews, assessment centres, and case studies common in consulting, finance, and public sector roles — is entirely the candidate's responsibility." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the Totaljobs job description, evaluates your competency-based answer structure using STAR format, and coaches both behavioral and technical interview patterns for the specific role and sector you're targeting." },
    winner: "zari",
  },
  {
    task: "Profile visibility to UK recruiters",
    totaljobs: { capable: true, detail: "Totaljobs maintains a searchable CV database used by UK employers and recruitment agencies. A complete Totaljobs profile creates passive candidate visibility — UK recruiters and the significant agency recruitment market actively search board databases to source talent, particularly for contract and permanent roles across all industries." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. Zari's LinkedIn optimization improves your discoverability to UK recruiters sourcing on LinkedIn — which is used alongside Totaljobs by most professional employers, particularly for senior and technical roles." },
    winner: "totaljobs",
  },
  {
    task: "LinkedIn profile optimization",
    totaljobs: { capable: false, detail: "No LinkedIn integration or profile optimization. Totaljobs and LinkedIn operate as parallel sourcing channels — a strong Totaljobs profile doesn't improve your LinkedIn discoverability, and vice versa. For UK professional roles, both channels matter." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience for UK recruiter search visibility. Professional and management roles in the UK — particularly in London's finance and tech sectors — are sourced heavily on LinkedIn alongside job board postings." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    totaljobs: { capable: false, detail: "Totaljobs provides salary data but no negotiation coaching. UK salary negotiation involves specific norms — direct counter offers are standard but the conversation is typically more measured than US-style negotiation, and total compensation (pension contributions, holiday above the statutory minimum, private health, flexible working) is an important part of the package discussion." },
    zari: { capable: true, detail: "Zari coaches salary negotiation for UK employment conventions — counter offer framing, total compensation negotiation (base, employer pension contributions, holiday, benefits, bonus), and the specific pushback scripts calibrated for UK hiring practices across industries and company types." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const totaljobs = TASK_COMPARISON.filter(r => r.winner === "totaljobs").length;
  return { zari, totaljobs, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Totaljobs or Reed better for UK job seekers?", answer: "Both are major UK job boards with similar broad coverage — the right answer depends on your industry and career level. Totaljobs tends to have strong coverage for commercial roles (sales, marketing, operations, finance) and regional UK markets outside London. Reed.co.uk is particularly strong for public sector, healthcare, and education roles, and has deep London coverage. In practice, using both alongside LinkedIn and Indeed.co.uk gives you the most complete UK job market coverage. Setting up job alerts on multiple platforms takes 30 minutes and ensures you see roles as soon as they're posted." },
  { question: "How many job boards should UK job seekers use?", answer: "For active job searching, 3–4 boards with saved searches and email alerts is the optimal approach. Beyond 4 boards, you spend more time managing platforms than applying to roles. The recommended combination for most UK professional roles: (1) LinkedIn — for both job discovery and passive visibility to recruiters; (2) Indeed.co.uk — largest aggregated listing volume; (3) Either Totaljobs or Reed — for deeper coverage in your target industry; (4) Any specialist board relevant to your field (CWJobs for tech, Guardian Jobs for media/charity, NHS Jobs for healthcare). Set up email alerts on all 4 rather than checking manually." },
  { question: "Do UK employers use competency-based interviews?", answer: "Yes — competency-based (or behaviour-based) interviews are the dominant format for professional and management roles in the UK, particularly in larger companies, public sector organisations, and any employer with a structured assessment process. The format asks for specific past examples of behaviour: 'Tell me about a time when you led a team through a significant change.' The STAR method (Situation, Task, Action, Result) is the standard response structure — UK employers and recruitment consultants explicitly train interviewers to use this framework, so candidates who answer in STAR format are giving interviewers exactly what they need to evaluate." },
];

export default async function ZariVsTotaljobsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Totaljobs", url: `${BASE_URL}/compare/zari-vs-totaljobs` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Totaljobs</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Totaljobs is one of the UK&apos;s major job boards — with hundreds of thousands of active listings across every UK region and industry. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.totaljobs}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Totaljobs wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "totaljobs" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.totaljobs.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Totaljobs {row.totaljobs.capable ? "✓" : "✗"}</p>
                      {row.winner === "totaljobs" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.totaljobs.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a UK role on Totaljobs? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your CV for UK ATS systems, coaches your competency-based interview, and helps you negotiate the full UK offer package — salary, pension, holiday, and benefits. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
