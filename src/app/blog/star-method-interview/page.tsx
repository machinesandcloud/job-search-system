import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "The STAR Method: How to Answer Behavioral Interview Questions (2025)",
  description:
    "Master the STAR method for behavioral interviews. Learn Situation, Task, Action, Result with 10 word-for-word examples — including what makes answers score high vs. get rejected.",
  keywords: ["STAR method interview", "STAR method", "behavioral interview questions", "STAR method examples", "how to answer behavioral questions", "situation task action result", "STAR interview technique", "behavioral interview prep"],
  alternates: { canonical: "/blog/star-method-interview" },
  openGraph: { title: "The STAR Method: How to Answer Behavioral Interview Questions (2025)", description: "STAR method explained with 10 scored examples — what makes answers strong vs. weak.", url: "/blog/star-method-interview" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-04-01";
const MODIFIED = "2025-05-15";

export default async function StarMethodPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="The STAR Method: How to Answer Behavioral Interview Questions (2025)"
        description="STAR method explained with 10 scored examples — what makes answers strong vs. weak."
        url={`${BASE_URL}/blog/star-method-interview`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "STAR Method Interview", url: `${BASE_URL}/blog/star-method-interview` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">The STAR Method: How to Answer Behavioral Interview Questions (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 12 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Behavioral interview questions — "Tell me about a time when..." — are the most common interview format. They're also the one most candidates fail not because of lack of experience, but because of structure. STAR gives you the structure. Here's how to use it and what separates a 9/10 answer from a 4/10.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What is the STAR method?</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              STAR stands for Situation, Task, Action, Result. It's a framework for structuring behavioral interview answers so they're complete, clear, and compelling.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { letter: "S", word: "Situation", desc: "Set the context. One or two sentences — where you were, what was happening. Keep it tight. Most candidates spend too long here." },
                { letter: "T", word: "Task", desc: "What was your specific responsibility? What did YOU own? Not what the team did — what were you personally accountable for?" },
                { letter: "A", word: "Action", desc: "What did you specifically do? This is the longest part of your answer. Concrete, specific actions — not 'we worked together' but what YOU decided, built, or changed." },
                { letter: "R", word: "Result", desc: "What happened because of your actions? A metric. A timeframe. Before vs. after. This is where most answers fail — they end with the action and skip the result." },
              ].map((item) => (
                <div key={item.letter} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--brand)] text-[16px] font-black text-white">{item.letter}</div>
                  <div>
                    <p className="mb-1 font-bold text-[var(--ink)]">{item.word}</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 10 behavioral questions you'll always face</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Interviewers rotate through a short list. Prepare strong STAR answers for these and you're ready for 90% of what you'll face:
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                "Tell me about a time you handled conflict.",
                "Tell me about a time you failed.",
                "Tell me about a time you led without authority.",
                "Tell me about a time you dealt with ambiguity.",
                "Tell me about a time you had to prioritize competing demands.",
                "Tell me about a time you influenced someone without authority.",
                "Tell me about a time you received critical feedback.",
                "Tell me about a project you're most proud of.",
                "Tell me about a time you made a decision with limited data.",
                "Tell me about a time you had to push back on leadership.",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-[13.5px] text-[var(--ink)]">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[10px] font-bold text-[var(--brand)]">{i + 1}</span>
                  {q}
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Weak vs. strong STAR: a scored comparison</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Question: <em>"Tell me about a time you had to deal with conflict on a team."</em>
            </p>

            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50/40 p-6">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-red-600">Weak answer — 3/10</p>
              <p className="text-[14px] italic leading-7 text-[var(--muted)]">
                "I was on a team project and one of my teammates wasn't pulling their weight. It was frustrating for everyone. I tried to talk to them and eventually we worked it out. It was a good learning experience about communication."
              </p>
              <div className="mt-4 space-y-1.5">
                {["No situation context — what project? what stakes?", "No specific task — what was your role?", "Vague action — 'talked to them' is not an answer", "No result — 'worked it out' is meaningless", "No learning that's specific to the situation"].map((issue) => (
                  <p key={issue} className="text-[12.5px] text-red-600">✗ {issue}</p>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-emerald-600">Strong answer — 9/10</p>
              <p className="text-[14px] italic leading-7 text-[var(--muted)]">
                "During a product launch at my last company, I was the PM working with a lead engineer who disagreed with the priority order I'd set. He wanted to push back the launch to add a feature I'd deprioritized because it wasn't in the initial scope. [S] My responsibility was to ship on time while keeping the team aligned. [T] I asked for a 30-minute sync just the two of us. I brought the usage data showing the feature he wanted had only been requested by 2% of users in beta, and the cost of delay was $80K in contracted customer commitments. I told him I wanted his technical judgment on the critical path, and that I'd add his feature to the immediate post-launch roadmap as priority 1. [A] We shipped on time, he owned the post-launch feature, and it was actually better for having had more time to build properly. That team built three more products together over the next year. [R]"
              </p>
              <div className="mt-4 space-y-1.5">
                {["Specific situation with real stakes ($80K commitment)", "Clear individual ownership (PM, not 'we')", "Specific actions: sync, data, framing, trade-off", "Quantified result: on time, relationship intact, next 3 products together", "Shows strategic thinking, not just conflict resolution"].map((strength) => (
                  <p key={strength} className="text-[12.5px] text-emerald-600">✓ {strength}</p>
                ))}
              </div>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 STAR mistakes that tank your score</h2>
            <div className="mt-4 space-y-4">
              {[
                { mistake: "Using 'we' instead of 'I'", fix: "Interviewers are assessing YOUR contribution, not your team's. Describe what YOU specifically did. Credit teammates by name if you want, but keep 'I' as the grammatical subject of every action." },
                { mistake: "Spending 70% of your time on Situation", fix: "Situation should be 10–15% of your answer. Context, not backstory. The Action is where 50% of your time should go." },
                { mistake: "Ending without a result", fix: "Every STAR answer must end with what happened. A metric, a before/after, a business outcome. 'It went well' is not a result." },
                { mistake: "Giving a hypothetical answer to a behavioral question", fix: "Behavioral questions require real examples. 'I would...' is not what was asked. If you don't have the exact scenario, use the closest real story and adapt it." },
                { mistake: "Recycling the same story for every question", fix: "Prepare 5–7 distinct stories that can be adapted to different questions. Interviewers notice when every answer is the same project." },
              ].map((item) => (
                <div key={item.mistake} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-2 font-bold text-[var(--ink)]">✗ {item.mistake}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.fix}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Get your STAR answers scored by AI</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Reading about STAR and delivering it under pressure are different skills. Zari's <Link href="/ai-interview-coach" className="text-[var(--brand)] underline underline-offset-2">AI interview coach</Link> runs you through behavioral questions, scores each answer across 6 dimensions (situation clarity, task ownership, action specificity, result quantification, conciseness, leadership signal), and gives specific feedback on exactly which part of your answer is weakest — so you fix it before the real interview.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice STAR answers with AI scoring — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Real behavioral questions. 6-dimension scoring. Specific feedback per answer.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
