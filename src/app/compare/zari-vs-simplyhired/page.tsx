import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs SimplyHired — Best for Job Seekers in 2025?",
  description:
    "SimplyHired aggregates job listings from across the web with salary estimates. Zari coaches you to win the roles you find there — ATS resume optimization, interview prep, and salary negotiation. Honest comparison.",
  keywords: ["zari vs simplyhired", "simplyhired alternatives", "simplyhired job search", "simplyhired vs ai career coach", "best job search sites 2025", "simplyhired review"],
  alternates: { canonical: "/compare/zari-vs-simplyhired" },
  openGraph: {
    title: "Zari vs SimplyHired (2025) — Full Comparison",
    description: "SimplyHired aggregates job listings. Zari coaches you to land them. Where each wins for job seekers in 2025.",
    url: "/compare/zari-vs-simplyhired",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing aggregation and search",
    simplyhired: { capable: true, detail: "SimplyHired aggregates job listings from company career pages, job boards, and staffing agencies into a single searchable index. It covers broad geographic and industry reach and includes salary estimate overlays on listings — a useful feature for gauging compensation before applying." },
    zari: { capable: false, detail: "Zari doesn't aggregate or search job listings. It's a coaching platform — find your roles on SimplyHired or another job board, then use Zari to optimize your application materials and prepare for interviews." },
    winner: "simplyhired",
  },
  {
    task: "Salary estimates on job listings",
    simplyhired: { capable: true, detail: "SimplyHired overlays salary estimates on most listings — aggregated from employer postings, government data, and user reports. These estimates give job seekers useful context for compensation expectations before investing time in the application process." },
    zari: { capable: true, detail: "Zari uses market salary data in negotiation coaching — not just to show you a number, but to coach you through using that number as leverage in a counter offer conversation, including how to handle pushbacks and equity components." },
    winner: "simplyhired",
  },
  {
    task: "ATS resume optimization",
    simplyhired: { capable: false, detail: "SimplyHired provides job discovery but no tools for analyzing or improving your resume against specific job descriptions. The platform is an aggregator — what you submit and how competitive it is when it reaches the employer's ATS is entirely up to you." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific SimplyHired job description — identifying missing keywords, rewriting weak bullets to show measurable impact, and validating ATS formatting. Most SimplyHired listings funnel to employer ATS systems that filter before any human sees your resume." },
    winner: "zari",
  },
  {
    task: "Interview coaching",
    simplyhired: { capable: false, detail: "SimplyHired is a job listing aggregator with no interview preparation capability. The platform doesn't offer mock interviews, role-specific question generation, or any coaching beyond the job listing itself." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the job description you found on SimplyHired, evaluates your STAR-method answers, and coaches both behavioral and situational responses. The difference between a good application and a successful hire is usually what happens in the interview." },
    winner: "zari",
  },
  {
    task: "Resume and profile visibility",
    simplyhired: { capable: false, detail: "SimplyHired doesn't offer a resume database that employers actively search. Applications go outbound to employers; the platform doesn't create inbound discovery opportunities for candidates." },
    zari: { capable: false, detail: "Zari also doesn't create employer-visible profiles. However, Zari's LinkedIn optimization improves your visibility in the LinkedIn recruiter search that most hiring managers use in parallel with job boards like SimplyHired." },
    winner: "simplyhired",
  },
  {
    task: "LinkedIn profile optimization",
    simplyhired: { capable: false, detail: "No LinkedIn integration or optimization capability. SimplyHired is a standalone job board aggregator with no connection to the LinkedIn recruiter ecosystem." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search visibility. Most employers who post on SimplyHired also search LinkedIn independently — your profile appearance in both channels matters." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    simplyhired: { capable: false, detail: "SimplyHired provides salary estimate data on listings but no negotiation coaching — no scripts, no pushback handling, no counter offer strategy. The platform ends at the application stage." },
    zari: { capable: true, detail: "Zari coaches the complete salary negotiation — from calculating your counter to handling every common pushback. The salary estimate you saw on SimplyHired becomes the market evidence Zari helps you use strategically in the conversation." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const simplyhired = TASK_COMPARISON.filter(r => r.winner === "simplyhired").length;
  return { zari, simplyhired, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is SimplyHired still a good job board in 2025?", answer: "SimplyHired is a useful supplementary job board for coverage — its aggregation means you may find listings that don't appear on Indeed or LinkedIn. However, its active user base and listing freshness are smaller than Indeed, LinkedIn, and Google for Jobs for most professional roles. The practical approach: set up SimplyHired job alerts as a backup channel alongside your primary boards, rather than making it your primary search platform." },
  { question: "How does SimplyHired compare to Indeed?", answer: "Indeed has significantly larger listing volume, more active job seekers and employers, and more sophisticated search and recommendation algorithms. SimplyHired aggregates some listings that Indeed doesn't, particularly from smaller regional employers and niche job boards. For most professional job seekers, Indeed and LinkedIn are the primary channels; SimplyHired adds coverage but doesn't replace them." },
  { question: "How does using Zari after finding a job on SimplyHired improve my odds?", answer: "SimplyHired gets your application into the employer's ATS — but most ATS systems auto-filter 60–80% of applications before a human ever reads them. Zari closes that gap by analyzing your resume against the specific job description, identifying the keywords the ATS is scanning for, and rewriting your application materials to match. After passing ATS, Zari prepares you for the human interview. These are the two biggest conversion points in the hiring funnel — and SimplyHired helps with neither." },
];

export default async function ZariVsSimplyHiredPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs SimplyHired", url: `${BASE_URL}/compare/zari-vs-simplyhired` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs SimplyHired</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            SimplyHired aggregates job listings with salary estimates — useful for discovery. Zari coaches you to win the applications you submit — ATS optimization, interviews, and offer negotiation. Two different jobs in the hiring funnel.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.simplyhired}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">SimplyHired wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "simplyhired" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.simplyhired.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">SimplyHired {row.simplyhired.capable ? "✓" : "✗"}</p>
                      {row.winner === "simplyhired" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.simplyhired.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on SimplyHired? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for ATS, coaches your interview, and helps you negotiate the offer. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
