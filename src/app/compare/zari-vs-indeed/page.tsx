import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Indeed — What Each Does Well for Job Seekers (2025)",
  description:
    "Indeed is the largest job search engine. Zari is an AI career coach. They're not really competitors — here's exactly where each wins and why most job seekers should use both.",
  keywords: ["zari vs indeed", "indeed vs ai career coach", "best job search tools 2025", "indeed alternatives", "indeed comparison", "job search tools comparison"],
  alternates: { canonical: "/compare/zari-vs-indeed" },
  openGraph: {
    title: "Zari vs Indeed (2025) — Full Comparison",
    description: "Indeed finds jobs. Zari helps you get them. Here's the honest breakdown of what each tool does — and why most job seekers need both.",
    url: "/compare/zari-vs-indeed",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Finding job listings",
    indeed: { capable: true, detail: "Indeed aggregates millions of job postings from company sites, ATS systems, and job boards into one searchable index. It's the largest job search engine in the world by volume. For sheer breadth of listings, nothing beats it." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. It's a coaching platform — you bring the job description to Zari, and Zari helps you compete for it. The two tools are sequential: find the job on Indeed, win it with Zari." },
    winner: "indeed",
  },
  {
    task: "ATS resume optimization",
    indeed: { capable: false, detail: "Indeed has a resume builder that produces a basic formatted resume, but it doesn't analyze your resume against a specific job description or provide ATS keyword scoring. Applying through Indeed doesn't make your resume more competitive — it just submits it." },
    zari: { capable: true, detail: "Zari compares your resume to the job description, identifies missing keywords, checks ATS-critical formatting issues, and rewrites bullets to pass the ATS screening that filters applicants before humans ever see them." },
    winner: "zari",
  },
  {
    task: "Salary data and research",
    indeed: { capable: true, detail: "Indeed Salary shows aggregated compensation data from job postings and user-reported salaries, broken down by role, location, and company. It's a useful starting point for market rate research." },
    zari: { capable: true, detail: "Zari incorporates salary benchmarking into the negotiation coaching context — helping you understand what the market pays and how to use that data in an actual negotiation conversation, not just view the number." },
    winner: "indeed",
  },
  {
    task: "Interview preparation",
    indeed: { capable: false, detail: "Indeed doesn't provide interview coaching. The 'Interview Questions' section shows general question lists by role — but no practice, no answer coaching, no behavioral framework, and no feedback on your responses." },
    zari: { capable: true, detail: "Zari runs mock interviews with role-specific questions, coaches STAR-method answers, identifies weak responses with specific feedback, and adapts the difficulty based on the target company and level." },
    winner: "zari",
  },
  {
    task: "LinkedIn profile optimization",
    indeed: { capable: false, detail: "No LinkedIn functionality. Indeed is a separate platform with no integration or optimization capability for LinkedIn profiles or recruiter discoverability on that platform." },
    zari: { capable: true, detail: "Zari audits and rewrites LinkedIn headline, About section, and skills for recruiter search discoverability — with understanding of LinkedIn's algorithm, not just general writing quality." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    indeed: { capable: false, detail: "Indeed provides salary data but no negotiation coaching — no scripts, no pushback handling, no strategy for the actual conversation. Knowing the market rate and knowing how to negotiate it are different skills." },
    zari: { capable: true, detail: "Zari coaches the full negotiation conversation — from calculating your counter offer to handling every pushback including 'we can't go higher,' competing offer leverage, and equity discussion." },
    winner: "zari",
  },
  {
    task: "Company research",
    indeed: { capable: true, detail: "Indeed shows company reviews, ratings, reported salaries, interview experiences, and benefits data — often more granular than other platforms for roles at companies with many employee reviews." },
    zari: { capable: false, detail: "Zari doesn't aggregate company review data. For company research before an interview or offer evaluation, Indeed and Glassdoor are the right tools." },
    winner: "indeed",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const indeed = TASK_COMPARISON.filter(r => r.winner === "indeed").length;
  return { zari, indeed, total: TASK_COMPARISON.length };
})();

const WHEN_TO_CHOOSE = [
  {
    tool: "Use Indeed when:",
    color: "#059669",
    items: [
      "Searching for open roles — it's the largest job listing aggregator",
      "Researching what companies pay for specific roles in specific cities",
      "Reading employee reviews and interview experience reports before applying",
      "Setting up job alerts for new postings that match your criteria",
    ],
  },
  {
    tool: "Use Zari when:",
    color: "#0D7182",
    items: [
      "Optimizing your resume for a specific job description before applying",
      "Preparing for a phone screen, technical round, or final interview",
      "Auditing and rewriting your LinkedIn profile for recruiter search",
      "Coaching through a salary negotiation after you have an offer",
    ],
  },
];

const FAQS = [
  { question: "Does Indeed have an AI resume writer?", answer: "Indeed has a basic resume builder that produces a formatted document, but it doesn't use AI to optimize your resume for a specific job description. It won't tell you what keywords you're missing, what sections to rewrite, or whether your format will pass ATS systems. For ATS optimization, tools like Zari that analyze your resume against the specific job description are purpose-built for that task." },
  { question: "Is Indeed enough to get a job?", answer: "Indeed is excellent at helping you find jobs to apply to — it's the largest job board aggregator and the most likely place to discover open roles. But finding a job posting is only the beginning. Getting through ATS screening, preparing for interviews, and negotiating a competitive offer all require different tools and skills. Most successful job seekers use Indeed to source roles and other tools to optimize for them." },
  { question: "Which is better: Indeed or LinkedIn for job searching?", answer: "They serve different functions. Indeed is better for volume — more listings, more companies, more alert configurations. LinkedIn is better for targeting — recruiting happens on LinkedIn, and having a well-optimized profile means recruiters come to you rather than you searching for them. Most active job seekers use both: LinkedIn for inbound recruiter interest and passive discoverability, Indeed for active application volume." },
];

export default async function ZariVsIndeedPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Indeed", url: `${BASE_URL}/compare/zari-vs-indeed` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Indeed</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Indeed finds jobs. Zari helps you get them. They&apos;re not really competing — here&apos;s the honest breakdown of what each does well, and why most job seekers should use both.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.indeed}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Indeed wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "indeed" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.indeed.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Indeed {row.indeed.capable ? "✓" : "✗"}</p>
                      {row.winner === "indeed" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.indeed.detail}</p>
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

      {/* When to choose */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)] text-center">These tools work sequentially, not competitively</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)] text-center">The best job search strategy uses both: Indeed to find roles, Zari to compete for them.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {WHEN_TO_CHOOSE.map((col) => (
              <div key={col.tool} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="font-extrabold text-[var(--ink)] mb-4" style={{ color: col.color }}>{col.tool}</p>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: col.color }} />
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a job on Indeed? Now let&apos;s help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for ATS, coaches your interview prep, and helps you negotiate the offer — starting from the job description you paste in. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
