import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Glassdoor — What Each Does Well for Job Seekers (2025)",
  description:
    "Glassdoor provides salary data, company reviews, and interview experience reports. Zari coaches you through the actual job search. Honest comparison — and why you probably need both.",
  keywords: ["zari vs glassdoor", "glassdoor vs ai career coach", "glassdoor comparison", "glassdoor alternatives", "best job search tools 2025", "glassdoor vs zari"],
  alternates: { canonical: "/compare/zari-vs-glassdoor" },
  openGraph: {
    title: "Zari vs Glassdoor (2025) — Full Comparison",
    description: "Glassdoor gives you the data. Zari coaches you through using it. Here's exactly where each wins — and how they work together.",
    url: "/compare/zari-vs-glassdoor",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Salary benchmarking & comp data",
    glassdoor: { capable: true, detail: "Glassdoor's salary database is one of the most-used comp research tools — user-reported salaries by role, location, company, and experience level. It's the most common starting point for salary research before a negotiation." },
    zari: { capable: true, detail: "Zari incorporates salary benchmarking into the negotiation coaching workflow — helping you understand what the market pays and how to use that data in an actual counter offer conversation, not just view a number." },
    winner: "glassdoor",
  },
  {
    task: "Company reviews and culture research",
    glassdoor: { capable: true, detail: "Glassdoor's company review database is its core product — thousands of employee reviews, CEO approval ratings, culture scores, work/life balance ratings, and comment-level feedback organized by recency and role." },
    zari: { capable: false, detail: "Zari doesn't aggregate company review data. For researching what it's actually like to work somewhere, Glassdoor is the right tool — use it before your first interview to understand what current employees say." },
    winner: "glassdoor",
  },
  {
    task: "Interview experience reports",
    glassdoor: { capable: true, detail: "Glassdoor's interview section shows what candidates report being asked — specific questions, difficulty ratings, and whether the experience was positive or negative. Useful for role-specific prep at target companies." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions based on the actual job description, coaches your answers using the STAR method, identifies weak responses with specific feedback, and runs full mock interviews. It's active practice, not passive reading." },
    winner: "zari",
  },
  {
    task: "ATS resume optimization",
    glassdoor: { capable: false, detail: "Glassdoor has no resume optimization capability. It does not analyze your resume against a job description, check for ATS formatting issues, or provide keyword scoring." },
    zari: { capable: true, detail: "Zari compares your resume to the specific job description, identifies missing keywords, rewrites weak bullets, and checks ATS formatting — the work that determines whether your application reaches a human at all." },
    winner: "zari",
  },
  {
    task: "LinkedIn profile optimization",
    glassdoor: { capable: false, detail: "No LinkedIn integration or optimization capability. Glassdoor is a separate platform focused on company intelligence and job listings." },
    zari: { capable: true, detail: "Zari audits and rewrites LinkedIn headline, About section, and skills for recruiter search discoverability — targeting the LinkedIn algorithm factors that determine whether you appear in recruiter searches." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    glassdoor: { capable: false, detail: "Glassdoor provides salary data but no coaching on the negotiation itself — no scripts, no pushback handling, no counter offer strategy. The data is a starting point; the coaching is missing." },
    zari: { capable: true, detail: "Zari coaches the full negotiation from counter offer calculation to handling 'we can't go higher' and competing offer leverage — not just what to ask for, but how to ask for it and what to say when they push back." },
    winner: "zari",
  },
  {
    task: "Job listings and application tracking",
    glassdoor: { capable: true, detail: "Glassdoor lists millions of jobs with company context integrated — you can see salary data, culture reviews, and interview questions alongside the listing. For research-intensive applications, this integration is valuable." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings or track applications. It's a coaching platform — you bring the job description, Zari helps you compete for it. Job discovery happens elsewhere." },
    winner: "glassdoor",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const glassdoor = TASK_COMPARISON.filter(r => r.winner === "glassdoor").length;
  return { zari, glassdoor, total: TASK_COMPARISON.length };
})();

const HOW_THEY_WORK_TOGETHER = [
  { phase: "Before applying", glassdoorRole: "Research company culture, read recent employee reviews, check CEO approval rating, understand what current employees say about the interview process and management style.", zariRole: "Optimize your resume and LinkedIn for the role. Ensure your document passes ATS before you even apply — Glassdoor reviews don't help if your resume never reaches a human." },
  { phase: "Interview prep", glassdoorRole: "Read interview experience reports for the specific company and role. Understand the format, difficulty, and specific questions previous candidates were asked.", zariRole: "Practice those questions with a mock interview coach that gives you specific feedback on your answers — not just a list to read, but active preparation with STAR method coaching." },
  { phase: "Evaluating an offer", glassdoorRole: "Verify the salary against Glassdoor's comp data. Read reviews of the team, manager, and culture to understand what you're walking into. Check benefits and work/life balance ratings.", zariRole: "Coach the negotiation itself — using the Glassdoor market data as the anchor for your counter offer, then handling the conversation that follows." },
];

const FAQS = [
  { question: "Is Glassdoor salary data accurate?", answer: "Glassdoor salary data is self-reported, which introduces bias — people are more likely to report salaries when they're proud of them or angry about them, not when they're average. It's a useful starting range, but not an authoritative number. Cross-reference with LinkedIn Salary, Levels.fyi (for tech), and Payscale before anchoring a negotiation to a single source. Glassdoor is most accurate for roles with large sample sizes — common corporate and tech roles at major companies." },
  { question: "Can Glassdoor reviews be trusted?", answer: "Glassdoor reviews are a signal, not a verdict. Employers can respond to reviews, and some companies are known to encourage positive reviews. That said, patterns in negative reviews — especially consistent themes about management, culture, or growth — are usually genuine. Look for patterns across many reviews, weight recent reviews more heavily (company culture can change quickly), and focus on comments from roles similar to the one you're considering." },
  { question: "Does Glassdoor have interview questions?", answer: "Yes — Glassdoor's interview question database is one of its most useful features. Candidates report specific questions they were asked, along with the difficulty and experience rating. The limitation: questions are reported by individuals, not verified, and may be outdated as hiring processes change. Use Glassdoor questions as a research starting point, then practice with a tool that gives you active feedback on your answers, not just the question list." },
];

export default async function ZariVsGlassdoorPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Glassdoor", url: `${BASE_URL}/compare/zari-vs-glassdoor` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Glassdoor</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Glassdoor gives you the data — salary ranges, culture reviews, interview questions. Zari coaches you through using it. They work at different stages of the same job search.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.glassdoor}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Glassdoor wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "glassdoor" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.glassdoor.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Glassdoor {row.glassdoor.capable ? "✓" : "✗"}</p>
                      {row.winner === "glassdoor" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.glassdoor.detail}</p>
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

      {/* How they work together */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)] text-center">How they work together — by job search phase</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)] text-center">Most successful candidates use both tools. Here&apos;s the sequencing that works.</p>
          <div className="mt-8 space-y-4">
            {HOW_THEY_WORK_TOGETHER.map((item) => (
              <div key={item.phase} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-6 py-3.5">
                  <p className="font-extrabold text-[var(--ink)]">{item.phase}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Use Glassdoor for</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.glassdoorRole}</p>
                  </div>
                  <div className="bg-[var(--brand)]/[0.03] px-6 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Use Zari for</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.zariRole}</p>
                  </div>
                </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Glassdoor showed you the data. Zari coaches you through using it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Start with your resume, LinkedIn, or interview prep. Zari coaches the full job search — ATS optimization, mock interviews, LinkedIn audit, and salary negotiation. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
