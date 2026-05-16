import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "50 Behavioral Interview Questions & Answers (2025) — With STAR Examples",
  description:
    "The 50 most common behavioral interview questions with word-for-word STAR answers. Includes questions for leadership, conflict, failure, teamwork, and situational judgment.",
  keywords: ["behavioral interview questions", "behavioral interview questions and answers", "common behavioral interview questions", "behavioral interview prep", "STAR method answers", "behavioral questions examples", "how to answer behavioral interview questions"],
  alternates: { canonical: "/blog/behavioral-interview-questions" },
  openGraph: { title: "50 Behavioral Interview Questions & Answers (2025)", description: "The 50 most common behavioral questions with STAR answers and scoring notes.", url: "/blog/behavioral-interview-questions" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-04-10";
const MODIFIED = "2025-05-15";

const QUESTIONS = [
  {
    category: "Conflict & Disagreement",
    qs: [
      "Tell me about a time you disagreed with your manager.",
      "Tell me about a time you had conflict with a teammate.",
      "Tell me about a time you had to push back on a stakeholder.",
      "Tell me about a time you had to deliver difficult feedback.",
      "Tell me about a time someone on your team wasn't performing.",
      "Tell me about a time you had to manage a difficult client or customer.",
      "Tell me about a time you disagreed with a company decision.",
      "Tell me about a time you had to say no to someone important.",
    ],
  },
  {
    category: "Leadership & Influence",
    qs: [
      "Tell me about a time you led a team.",
      "Tell me about a time you led without formal authority.",
      "Tell me about a time you motivated a discouraged team.",
      "Tell me about a time you had to align people with competing priorities.",
      "Tell me about a time you had to influence senior leadership.",
      "Tell me about a time you made a decision that not everyone agreed with.",
      "Tell me about a time you had to build buy-in for a new initiative.",
      "Tell me about a time you mentored someone.",
    ],
  },
  {
    category: "Failure & Setbacks",
    qs: [
      "Tell me about a time you failed.",
      "Tell me about a mistake you made and what you learned.",
      "Tell me about a project that didn't go as planned.",
      "Tell me about a time you missed a deadline.",
      "Tell me about a time you made a decision you later regretted.",
      "Tell me about a time you received critical feedback.",
      "Tell me about a time you had to recover from a major setback.",
      "Tell me about a time you underestimated a task.",
    ],
  },
  {
    category: "Prioritization & Ambiguity",
    qs: [
      "Tell me about a time you had to prioritize with limited resources.",
      "Tell me about a time you had to make a decision with incomplete information.",
      "Tell me about a time you dealt with ambiguity.",
      "Tell me about a time you had to change direction mid-project.",
      "Tell me about a time you had too many things on your plate.",
      "Tell me about a time you had to make a fast decision.",
      "Tell me about a time you had to triage a crisis.",
      "Tell me about a time when the requirements kept changing.",
    ],
  },
  {
    category: "Achievement & Impact",
    qs: [
      "Tell me about a project you're most proud of.",
      "Tell me about a time you exceeded expectations.",
      "Tell me about the most complex problem you've solved.",
      "Tell me about a time you improved a process.",
      "Tell me about a time you had a measurable impact.",
      "Tell me about a time you delivered results under pressure.",
      "Tell me about a time you went above and beyond.",
      "Tell me about a time you took initiative without being asked.",
    ],
  },
  {
    category: "Collaboration & Teamwork",
    qs: [
      "Tell me about a time you worked with a cross-functional team.",
      "Tell me about a time you had to onboard or help someone new.",
      "Tell me about a time you collaborated across time zones or remote teams.",
      "Tell me about a time your team disagreed about approach.",
      "Tell me about a time you depended on someone who let you down.",
      "Tell me about a time you had to give credit to others.",
      "Tell me about a time you put team success ahead of personal recognition.",
      "Tell me about a time you worked with someone whose style was very different from yours.",
    ],
  },
  {
    category: "Growth & Learning",
    qs: [
      "Tell me about a time you had to learn something new quickly.",
      "Tell me about a skill you developed in the last year.",
      "Tell me about a time you asked for help.",
      "Tell me about a time feedback changed how you work.",
    ],
  },
];

export default async function BehavioralInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="50 Behavioral Interview Questions & Answers (2025) — With STAR Examples"
        description="The 50 most common behavioral questions with STAR answers and scoring notes."
        url={`${BASE_URL}/blog/behavioral-interview-questions`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Behavioral Interview Questions", url: `${BASE_URL}/blog/behavioral-interview-questions` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">50 Behavioral Interview Questions & Answers (2025) — With STAR Examples</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 15 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Behavioral questions are predictable. The same 50 questions — or variations of them — appear in nearly every interview. The candidates who perform best aren't smarter; they've prepared specific stories. Here's the complete list, organized by theme.
            </p>

            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="font-bold text-[var(--ink)]">How to use this list</p>
              <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">For each category, identify 1–2 real stories from your experience that could answer multiple questions in that group. A single strong story about a project failure can answer questions about failure, feedback, decision-making, and learning. Build a story bank of 6–8 stories and you'll cover everything on this list.</p>
            </div>

            {QUESTIONS.map((group) => (
              <div key={group.category} className="mt-10">
                <h2 className="text-[1.4rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">{group.category}</h2>
                <div className="mt-4 space-y-2">
                  {group.qs.map((q, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-[14px] text-[var(--ink)]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[10px] font-bold text-[var(--brand)]">{i + 1}</span>
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to structure your answer for every question on this list</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Every behavioral question on this list is answered with the same framework: <Link href="/blog/star-method-interview" className="text-[var(--brand)] underline underline-offset-2">STAR (Situation, Task, Action, Result)</Link>. The specific question determines which element to emphasize — conflict questions emphasize Action, failure questions emphasize Result and learning, leadership questions emphasize the "I" in your Action.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The best preparation is to practice out loud, not just in your head. You need to hear yourself say the words under mild pressure before the real interview. Zari's <Link href="/ai-interview-coach" className="text-[var(--brand)] underline underline-offset-2">AI interview coach</Link> asks you any question from this list, records your answer, and gives you a score on structure, ownership, specificity, and result quantification — so you can fix the weakest part before it costs you an offer.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice any of these 50 questions with AI coaching — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">STAR scoring, specific feedback, and coaching on every answer.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
