import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Management Interview Questions 2025 — 30 Questions + Strong Answers",
  description: "The most common management interview questions in 2025 — with strong answer frameworks and what hiring managers are really looking for. For first-time managers through Director-level.",
  keywords: ["management interview questions", "manager interview questions", "interview questions for managers", "management interview questions and answers", "first time manager interview questions", "director interview questions", "people management interview questions", "leadership interview questions 2025"],
  alternates: { canonical: "/blog/management-interview-questions" },
  openGraph: { title: "Management Interview Questions 2025 — 30 Questions + Strong Answers", description: "The most common management interview questions with strong STAR-based answers for first-time managers through Director-level.", url: "/blog/management-interview-questions" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the most common management interview questions?", answer: "The six most common categories are: (1) Leadership style and philosophy, (2) How you handle underperformers, (3) How you build and motivate teams, (4) Conflict resolution between team members, (5) Managing up — influencing without authority, and (6) Your experience with performance management, including terminations. Every management interview at any level will include at least one question from each category." },
  { question: "How do I answer 'What is your management style?' in an interview?", answer: "Start by naming your style with a specific term (not 'it depends'), then describe one or two concrete behaviors that demonstrate it, then give a brief example of when that style produced a specific outcome. Example: 'I coach toward independence — I spend the first 90 days on a new hire heavily involved in their decisions, then progressively remove myself as they demonstrate judgment. On my last team, three of my direct reports were promoted within 18 months.' Avoid abstract answers like 'I adapt to each person' — they signal no philosophy." },
  { question: "How should I answer questions about managing underperformers?", answer: "Interviewers are testing whether you've actually done this — many managers avoid hard conversations. Structure your answer around: (1) Early identification — the metrics or signals that told you someone was underperforming, (2) Direct documented conversation — specific feedback, documented in writing, (3) Performance improvement plan with clear timeline and success criteria, and (4) Resolution — either successful improvement or parting ways. If you've only ever had outcomes where everyone improved, that's suspicious. Include at least one example where you had to terminate someone." },
  { question: "What's the hardest management interview question?", answer: "'Tell me about a time you failed as a manager.' This tests self-awareness more than anything else. The answer needs to be: a real failure (not a humble-brag), a description of what you got wrong specifically, and what you changed. Example: 'I promoted a strong IC into a lead role without preparing them adequately — I underestimated how different management is from individual contribution. They struggled for 6 months. I moved them back into an IC role, which was the right outcome, but I should have invested 3x more in the onboarding and set clearer checkpoints. Now I always run a 30/60/90 plan explicitly designed for the management transition.'" },
];

const QUESTIONS = [
  { cat: "Leadership Style", q: "What is your management style?", hint: "Name a specific style. Describe 2 behaviors. Give 1 outcome example." },
  { cat: "Leadership Style", q: "How do you motivate team members who seem disengaged?", hint: "Distinguish intrinsic vs extrinsic motivation. Use a specific example." },
  { cat: "Leadership Style", q: "How do you handle a strong performer who is difficult to work with?", hint: "Acknowledge the tension. Describe your approach to direct feedback without avoiding the difficulty." },
  { cat: "Underperformance", q: "Tell me about a time you managed an underperformer.", hint: "Include: identification, conversation, PIP or equivalent, resolution — even termination." },
  { cat: "Underperformance", q: "Have you ever had to fire someone? Walk me through it.", hint: "Show process + human dignity. Include what you did before the final decision." },
  { cat: "Underperformance", q: "How quickly do you identify underperformance, and what triggers your response?", hint: "Name specific metrics or signals. Not 'I rely on my gut.'" },
  { cat: "Team Building", q: "How do you onboard a new direct report?", hint: "Describe your 30/60/90 structure. Include how you calibrate your level of involvement." },
  { cat: "Team Building", q: "Tell me about a team you built from scratch.", hint: "Hiring criteria, onboarding, culture-setting, and outcomes with metrics." },
  { cat: "Team Building", q: "How do you retain top performers?", hint: "Show you understand growth, recognition, and that money is not the primary driver." },
  { cat: "Conflict Resolution", q: "Two of your direct reports are in conflict. How do you handle it?", hint: "Diagnose first, then intervene. Distinguish conflict types. Show when you stay out vs step in." },
  { cat: "Conflict Resolution", q: "Tell me about a time you resolved a conflict on your team.", hint: "Use STAR. Include what you learned about your own role in the conflict." },
  { cat: "Managing Up", q: "Tell me about a time you disagreed with your manager's decision.", hint: "Show you pushed back with data, then aligned fully once the decision was made." },
  { cat: "Managing Up", q: "How do you influence stakeholders who don't report to you?", hint: "Name specific techniques: pre-alignment, data framing, finding shared goals." },
  { cat: "Self-Awareness", q: "What's your biggest weakness as a manager?", hint: "Pick a real gap. Describe what you've done to address it. Not a humble-brag." },
  { cat: "Self-Awareness", q: "Tell me about a time you failed as a manager.", hint: "The strongest answer includes a mistake, specific accountability, and behavior change." },
];

export default async function ManagementInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-02-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Management Interview Questions 2025 — 30 Questions + Strong Answers"
        description="The most common management interview questions with strong STAR-based answers for first-time managers through Director-level."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/management-interview-questions`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Management Interview Questions", url: `${BASE_URL}/blog/management-interview-questions` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Management Interviews · STAR Answers · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Management Interview<br />
            <span className="text-white/50">Questions & Answers</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The 30 questions hiring managers ask in management interviews — with strong answer frameworks, what they&apos;re really testing, and how to distinguish yourself from candidates who give generic answers.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 10 min read · For managers, directors, and VPs</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">15 management interview questions — by category</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Each question includes what the interviewer is really testing and how to structure a strong answer.</p>
          <div className="space-y-3">
            {QUESTIONS.map(({ cat, q, hint }) => (
              <div key={q} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#0D7182]">{cat}</div>
                <h3 className="mb-2 font-bold text-[14px]">&ldquo;{q}&rdquo;</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">How to answer:</span> {hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">What separates strong answers from weak ones</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#EF4444]">Weak management answers</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {[
                  "Abstract principles without examples: 'I believe in empowering my team'",
                  "No metrics: 'My team performed really well'",
                  "No conflict or failure examples — sounds unbelievable",
                  "Generic leadership principles from a book",
                  "Management style described as 'it depends on the situation'",
                ].map(p => <li key={p} className="flex gap-2"><span className="text-[#EF4444] flex-shrink-0">✗</span>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#0D7182]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#0D7182]">Strong management answers</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {[
                  "Named philosophy + specific behaviors + outcome with numbers",
                  "Includes at least one underperformance or termination example",
                  "Describes a real failure with specific accountability",
                  "Shows managing up and sideways, not just down",
                  "Adapts language to the seniority level of the role",
                ].map(p => <li key={p} className="flex gap-2"><span className="text-[#0D7182] flex-shrink-0">✓</span>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Practice your management interview answers now.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari&apos;s AI interview coach runs unlimited mock management interviews with STAR scoring — available 24/7, no scheduling, instant feedback.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Practice now free</Link>
            <Link href="/ai-interview-coach" className="inline-block rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">AI interview coach →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
