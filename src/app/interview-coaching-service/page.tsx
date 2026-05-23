import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Interview Coaching Service 2025 — AI Interview Coach with STAR Scoring",
  description: "AI-powered interview coaching service with STAR scoring, behavioral and technical interview prep, and instant feedback. Unlimited practice sessions available 24/7.",
  keywords: ["interview coaching service", "interview coach", "interview coaching online", "interview preparation service", "behavioral interview coaching", "technical interview coaching", "interview coach online", "interview prep service", "interview coaching 2025", "best interview coach"],
  alternates: { canonical: "/interview-coaching-service" },
  openGraph: { title: "Interview Coaching Service 2025 — AI Interview Coach with STAR Scoring", description: "AI interview coaching with STAR scoring and instant feedback — behavioral, technical, and case interview prep available 24/7.", url: "/interview-coaching-service" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What does an interview coaching service include?", answer: "A comprehensive interview coaching service should include: (1) Mock interview practice — simulated interview sessions with realistic questions. (2) Answer framework coaching — teaching you how to structure answers (STAR for behavioral, frameworks for case). (3) Feedback on specific answers — not just 'good job' but 'your Result was missing a metric' or 'you said we instead of I in the Action'. (4) Role and company-specific preparation — questions specific to PM interviews differ from SWE interviews differ from consulting interviews. (5) Follow-up question drilling — real interviewers always follow up; practice defending and elaborating on your answers. (6) Delivery coaching — some services also coach on pacing, filler words, and confidence signals." },
  { question: "How many interview coaching sessions do I need?", answer: "For most professionals: 3–5 mock interview sessions per interview loop is the sweet spot. The first 1–2 sessions reveal your biggest gaps. Sessions 3–4 are where you internalize the frameworks and your answers improve most dramatically. Session 5 is a confidence-building polish round. For difficult interviews (consulting case, FAANG behavioral + technical), 6–10 sessions is common for candidates who are truly optimizing. The key metric isn't sessions — it's whether your STAR scores are consistently improving across sessions. Zari tracks your improvement session-by-session, so you can see your progress and identify which question categories still need work." },
  { question: "Is interview coaching worth the cost?", answer: "For competitive roles, absolutely. Consider the math: a $150,000 salary vs a $140,000 salary (common first-offer vs negotiated outcome) is $10,000/year, plus compounding effects on future raises and roles. A single interview coaching session that helps you land an offer or negotiate $10,000 more pays for itself massively. For roles where you're competing against 50–200 candidates, the difference between a prepared and unprepared candidate is measurably large. Traditional interview coaches charge $150–$500/hour — Zari provides AI interview coaching with STAR scoring for a fraction of that, with the advantage of unlimited 24/7 availability for as many practice rounds as you need." },
  { question: "What's the difference between behavioral and technical interview coaching?", answer: "Behavioral interview coaching focuses on how you answer questions about past experiences — using the STAR framework, choosing the right stories, quantifying outcomes, and communicating leadership and judgment. This applies to virtually all professional interviews. Technical interview coaching focuses on problem-solving under pressure: coding interviews (algorithm selection, code quality, explaining your thought process), case interviews (structure, math, recommendation), or finance technical interviews (valuation, LBO, market sizing). Most interview loops require both types — you'll always have behavioral rounds even in technical loops. Zari coaches both, with STAR scoring for behavioral answers and framework/structure scoring for case and technical problem-solving." },
];

export default async function InterviewCoachingServicePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Interview Coaching Service 2025 — AI Interview Coach with STAR Scoring"
        description="AI interview coaching with STAR scoring and instant feedback — behavioral, technical, and case interview prep available 24/7."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/interview-coaching-service`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Interview Coaching Service", url: `${BASE_URL}/interview-coaching-service` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Interview Coaching · STAR Scoring · 24/7
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Interview<br />
            <span className="text-white/50">Coaching Service</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI interview coaching with STAR component scoring and instant feedback. Behavioral, technical, case, and role-specific interview preparation — unlimited sessions, available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · Unlimited sessions · STAR scoring · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari&apos;s interview coaching includes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "STAR component scoring", desc: "Every behavioral answer scored on Situation, Task, Action, and Result separately — tells you exactly which element is weak." },
              { title: "Unlimited mock interviews", desc: "Practice as many rounds as you need, 24/7. No scheduling, no credits, no per-session limits." },
              { title: "Role-specific question banks", desc: "Interview questions calibrated to your specific role — PM, SWE, consulting, finance, management, and more." },
              { title: "Follow-up question drilling", desc: "Zari follows up just like a real interviewer — exposing gaps in your answers and building your ability to elaborate." },
              { title: "Improvement tracking", desc: "Session-by-session score tracking — see which question categories you've mastered and which still need work." },
              { title: "Company-specific prep", desc: "Amazon Leadership Principles, McKinsey case format, Google's STAR/behavioral approach — calibrated to specific company formats." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Interview coaching: what Zari coaches differently</h2>
          <div className="space-y-4 text-[14px] leading-7 text-[var(--muted)]">
            <p><strong className="text-[var(--ink)]">Component-level feedback, not just pass/fail.</strong> Most interview practice tools tell you your answer was &ldquo;good&rdquo; or &ldquo;needs improvement.&rdquo; Zari scores every STAR component separately and gives specific sentence-level feedback — &ldquo;Your Action described what the team did, not what you specifically did. Reframe with I, not we.&rdquo;</p>
            <p><strong className="text-[var(--ink)]">New questions every session.</strong> Practicing the same question repeatedly builds memory, not real interview skill. Zari generates fresh variants — you develop the underlying skill of structuring answers in real time, which is what the interview actually tests.</p>
            <p><strong className="text-[var(--ink)]">Follow-up questioning.</strong> A real interviewer will probe your answers — &ldquo;What would you do differently?&rdquo; or &ldquo;Why did you choose that approach?&rdquo; Zari does the same, stress-testing your answers and revealing where your story is thin.</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start interview coaching with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Unlimited mock interviews with STAR scoring — free to start, 24/7, no scheduling.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start coaching free</Link>
            <Link href="/ai-interview-coach" className="inline-block rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">AI interview coach →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
