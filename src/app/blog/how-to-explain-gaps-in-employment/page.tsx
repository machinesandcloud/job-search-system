import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Explain Gaps in Employment — Scripts & Examples (2025)",
  description:
    "How to explain employment gaps on your resume and in interviews. Includes scripts for layoffs, health reasons, caregiving, and gap years — and what not to say.",
  keywords: ["how to explain gaps in employment", "employment gap explanation", "resume gap explanation", "how to explain gap in resume", "employment gap interview answer", "job gap on resume", "gap year explanation interview", "addressing resume gaps"],
  alternates: { canonical: "/blog/how-to-explain-gaps-in-employment" },
  openGraph: { title: "How to Explain Gaps in Employment — Scripts & Examples (2025)", description: "Word-for-word scripts for explaining employment gaps in interviews — for layoffs, health, caregiving, and career pivots.", url: "/blog/how-to-explain-gaps-in-employment" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-01";
const MODIFIED = "2025-05-16";

const SCENARIOS = [
  {
    scenario: "Layoff",
    color: "#0D7182",
    answer: "The company went through a significant reduction in force — [X%] of the team was let go, including my role. I used the time to [what you did: upskill, consult, take courses, care for a family member]. I've been actively searching for the past [timeframe] and specifically targeting [type of company/role] because [reason].",
    note: "Layoffs carry no stigma in the current market. Be matter-of-fact. The question after your answer will be about what you did during the gap — have a ready answer.",
  },
  {
    scenario: "Health reasons",
    color: "#EC4899",
    answer: "I took time off to address a health issue — it's been resolved and I'm fully ready to work. During that period, I [any productive activity if relevant]. I'm excited to get back to [type of work] and I've been looking specifically at [what you're targeting] because [reason].",
    note: "You are not legally required to disclose your health situation. 'I took time off for health reasons that have since been resolved' is sufficient and completely professional.",
  },
  {
    scenario: "Caregiving (parent, child, family member)",
    color: "#F97316",
    answer: "I stepped away to care for a [family member] who needed full-time support. That situation has been resolved and I'm ready to return to work. I've [any activity during the gap — kept up with the field, done project work, etc.]. I'm looking for [what and why].",
    note: "Caregiving is one of the most common and legitimate reasons for gaps. Frame it as a choice you made and then clearly pivot to your readiness to return.",
  },
  {
    scenario: "Burnout / mental health",
    color: "#7a8dff",
    answer: "I took deliberate time off to step back and recover from a period of intense work. I used the time to [specific activity: travel, recharge, reflect on career direction]. I came out of it with more clarity about what I want to be doing — which is part of why I'm specifically interested in this role.",
    note: "You don't owe specific details. 'Took time to step back and recover' is honest and sufficient. What matters more to interviewers is that you have clarity about what you want now.",
  },
  {
    scenario: "Gap year / travel / personal project",
    color: "#10B981",
    answer: "I made a deliberate decision to take time off after [leaving/finishing] to [travel, work on a personal project, pursue an interest]. I spent [timeframe] doing [specific activity]. I'm now ready to return to [type of work] with a clear focus on [what you're targeting].",
    note: "The more specific you are about what you did, the better. 'I traveled and took some time to figure things out' is weak. 'I spent six months in Southeast Asia learning to code mobile apps and shipped a project' is strong.",
  },
  {
    scenario: "Searching longer than expected",
    color: "#4ca7e6",
    answer: "The market has been harder than I expected — [brief acknowledgment]. During the search I've been [consulting, freelancing, upskilling, doing courses, contributing to open source]. I've been deliberate about not taking the wrong role — I'm specifically looking for [what and why], and this role fits that exactly.",
    note: "Don't be defensive about a long search. Acknowledge it briefly, pivot to what you've been doing, and focus on why this specific role is the right one.",
  },
];

export default async function ExplainEmploymentGapsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Explain Gaps in Employment — Scripts & Examples (2025)"
        description="Word-for-word scripts for explaining employment gaps in interviews — for layoffs, health, caregiving, and career pivots."
        url={`${BASE_URL}/blog/how-to-explain-gaps-in-employment`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Explain Gaps in Employment", url: `${BASE_URL}/blog/how-to-explain-gaps-in-employment` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Explain Gaps in Employment — Scripts & Examples (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Employment gaps are more common than they&apos;ve ever been. Most recruiters are not looking to eliminate you for a gap — they&apos;re looking to understand the context. The wrong answer isn&apos;t having a gap; it&apos;s being evasive or defensive about it.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The principle behind every good gap answer</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              A strong gap explanation does three things: (1) names the gap briefly and honestly, (2) says what you did or why the gap happened, (3) pivots to your current clarity and motivation. The pivot is the most important part — interviewers care most about whether you&apos;re ready and motivated now.
            </p>
            <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="font-bold text-[var(--ink)]">The formula:</p>
              <p className="mt-2 text-[14px] leading-6 text-[var(--muted)]"><strong>Context</strong> (what happened and why) → <strong>What you did</strong> (during the gap) → <strong>Why now</strong> (your readiness and what you&apos;re targeting)</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Word-for-word scripts by scenario</h2>
            <div className="mt-6 space-y-6">
              {SCENARIOS.map((s) => (
                <div key={s.scenario} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3.5">
                    <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.scenario}</p>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 mb-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong answer</p>
                      <p className="text-[13.5px] italic leading-6 text-[var(--muted)]">&quot;{s.answer}&quot;</p>
                    </div>
                    <p className="text-[13px] leading-5 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Note: </span>{s.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to handle gaps on your resume</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              For gaps under 6 months: use year-only dates in your work history (e.g., "2022–2024") instead of month-year. This reduces visual attention on short gaps without being dishonest.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              For gaps over 6 months: consider adding a brief entry explaining it — "Career Break — caregiving" or "Career Break — professional development" — with a one-line description if there&apos;s something meaningful to say. LinkedIn now has an official "Career Break" category for this.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              For freelance or consulting during a gap: list it as a role with a client list or project description. Even part-time or one-off projects are legitimate work history.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { dont: "Lying about dates to hide the gap", why: "Background checks will flag discrepancies in employment dates. A discovered lie costs you the offer and possibly the relationship — a gap never would have." },
                { dont: "Being vague and evasive ('personal reasons')", why: "Evasion triggers more concern than transparency. A clear, brief explanation closes the question; vagueness keeps it open." },
                { dont: "Over-explaining and over-apologizing", why: "Treating a gap as a crisis signals that you think it's disqualifying. It probably isn't — your anxiety about it is more noticeable than the gap." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Practice your gap explanation before the interview</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The gap question will come up. Rehearse your answer until it sounds natural — not memorized, but confident. Zari&apos;s <Link href="/ai-interview-coach" className="text-[var(--brand)] underline underline-offset-2">AI interview coach</Link> will surface this question and give you real-time feedback on how your answer lands.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice interview questions with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Get role-specific questions including gap explanations and coach through your answers before the real interview.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
