import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Google for Jobs — What Each Does for Job Seekers (2025)",
  description:
    "Google for Jobs aggregates listings from across the web directly in Google search results. Zari is an AI career coach that helps you win the roles you find there. Full comparison of what each tool actually does.",
  keywords: ["zari vs google for jobs", "google for jobs", "google jobs search", "google for jobs alternatives", "best way to find jobs 2025", "google jobs vs ai career coach"],
  alternates: { canonical: "/compare/zari-vs-google-for-jobs" },
  openGraph: {
    title: "Zari vs Google for Jobs (2025) — Full Comparison",
    description: "Google for Jobs surfaces listings. Zari coaches you to land them. Where each wins for job seekers in 2025.",
    url: "/compare/zari-vs-google-for-jobs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery and aggregation",
    googleForJobs: { capable: true, detail: "Google for Jobs is the world's most-used job discovery entry point — surfacing listings from Indeed, LinkedIn, Glassdoor, company career pages, and hundreds of other sources directly in Google search results. No account required. Search by any natural language query and filter by date, location, job type, and employer. The aggregation breadth is unmatched." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. It's a coaching platform — find your target roles through Google for Jobs, then bring the specific job description to Zari to optimize your application and prepare for the interview." },
    winner: "google",
  },
  {
    task: "Salary range visibility",
    googleForJobs: { capable: true, detail: "Google for Jobs displays salary ranges when provided by employers or sourced from third-party data — directly on the search results page before you click through. This transparency helps job seekers filter on compensation without applying to roles outside their target range." },
    zari: { capable: true, detail: "Zari incorporates salary benchmarks into negotiation coaching — helping you understand your market rate and use it in a counter offer conversation with the specific pushback scripts that match your situation." },
    winner: "google",
  },
  {
    task: "ATS resume optimization",
    googleForJobs: { capable: false, detail: "Google for Jobs surfaces the listing — but once you click through to apply, you're in the employer's ATS. Google provides no tools to optimize your resume for that specific job description or check ATS keyword matching. Discovery and application quality are entirely separate problems." },
    zari: { capable: true, detail: "For every role you find on Google for Jobs: paste the job description into Zari with your resume and get a line-by-line ATS analysis — missing keywords, weak bullets, formatting issues. The optimization is specific to that JD, not generic advice." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    googleForJobs: { capable: false, detail: "Google for Jobs is a listing aggregator with no interview preparation capability. The platform gets you the listing and sends you to the application — what happens after that is entirely up to you." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the exact job description you found on Google for Jobs, evaluates your STAR-method answers, and coaches behavioral and situational patterns for the specific company and role type." },
    winner: "zari",
  },
  {
    task: "Company research",
    googleForJobs: { capable: true, detail: "Google for Jobs links to Glassdoor reviews, company information, and related search results — giving job seekers easy access to company intelligence alongside the listing. Google's broader search infrastructure means company research is one tab away." },
    zari: { capable: false, detail: "Zari doesn't aggregate company reviews or intelligence. For company research, Google, Glassdoor, LinkedIn, and Blind are the right tools — Zari takes over at the application and interview preparation stage." },
    winner: "google",
  },
  {
    task: "LinkedIn profile optimization",
    googleForJobs: { capable: false, detail: "No LinkedIn integration or profile optimization capability. Google for Jobs surfaces listings — it doesn't improve how you appear to recruiters who are sourcing on LinkedIn in parallel with posting on job boards." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search discoverability — important because most employers who post listings that appear in Google for Jobs are also searching LinkedIn for passive candidates." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    googleForJobs: { capable: false, detail: "Google for Jobs shows salary ranges but has no negotiation coaching capability. The platform ends when you click Apply." },
    zari: { capable: true, detail: "Zari coaches the complete negotiation sequence — calculating your counter, scripting the conversation, and handling every common pushback. The salary range you saw on Google for Jobs becomes the market evidence Zari helps you deploy strategically." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const google = TASK_COMPARISON.filter(r => r.winner === "google").length;
  return { zari, google, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "What is Google for Jobs?", answer: "Google for Jobs is a job search feature embedded directly in Google Search results — it appears when you search queries like 'software engineer jobs near me' or 'marketing manager NYC.' It aggregates listings from Indeed, LinkedIn, Glassdoor, company career pages, and hundreds of other sources into a single searchable interface. You can filter by date posted, job type, salary range, and remote/on-site. It's not a job board — it's an aggregation layer on top of existing job boards, which means the listings come from those underlying sources." },
  { question: "Should I use Google for Jobs or go directly to Indeed and LinkedIn?", answer: "Both. Google for Jobs is the fastest way to search across multiple sources at once and is particularly useful for broad searches or when you don't know which board has the listings you're looking for. Going directly to Indeed or LinkedIn gives you more filtering options, saved searches with email alerts, and features like Easy Apply or LinkedIn InMail. The practical approach: use Google for Jobs for exploratory discovery, then set up job alerts on the specific boards where your target roles concentrate." },
  { question: "How do companies get their jobs to appear on Google for Jobs?", answer: "Companies get their listings to appear in Google for Jobs by adding structured data markup (JobPosting schema) to their career pages — or by posting on job boards (Indeed, LinkedIn, Glassdoor) that have already implemented this markup. Google crawls these sources and surfaces the listings in search results. This is why Google for Jobs' coverage is broad — it's aggregating from thousands of employer career pages and major job boards simultaneously." },
];

export default async function ZariVsGoogleForJobsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Google for Jobs", url: `${BASE_URL}/compare/zari-vs-google-for-jobs` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Google for Jobs</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Google for Jobs is the world&apos;s most-used job discovery entry point — aggregating listings from across the web into one search. Zari coaches you to win the roles you find there. They work sequentially, not competitively.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.google}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Google for Jobs wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "google" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.googleForJobs.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Google for Jobs {row.googleForJobs.capable ? "✓" : "✗"}</p>
                      {row.winner === "google" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.googleForJobs.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Google? Now let&apos;s convert it to an offer.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific JD, coaches your interview, and helps you negotiate the offer. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
