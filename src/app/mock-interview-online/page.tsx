import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Mock Interview Online 2025 — AI Mock Interviews with Instant Feedback",
  description: "Practice mock interviews online with Zari's AI interview coach. Behavioral, technical, and case interview practice with instant STAR scoring and feedback — available 24/7, no scheduling.",
  keywords: ["mock interview online", "online mock interview", "practice interview online", "ai mock interview", "mock interview practice", "free mock interview", "mock interview with feedback", "behavioral interview practice", "technical mock interview", "mock interview 2025"],
  alternates: { canonical: "/mock-interview-online" },
  openGraph: { title: "Mock Interview Online 2025 — AI Mock Interviews with Instant Feedback", description: "AI-powered mock interview practice with instant STAR scoring and feedback. Behavioral, technical, and case interviews available 24/7.", url: "/mock-interview-online" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How effective is practicing mock interviews online?", answer: "Highly effective — and measurably so. Research on interview preparation consistently shows that candidates who practice 3–5 mock interviews before a real interview perform significantly better than unprepared candidates. The mechanism: mock interviews force you to verbalize answers you've only thought through in your head, exposing gaps and filler language you weren't aware of. The most valuable practice is answering questions you haven't seen before in real time — not rehearsing scripted answers. Zari's AI interview coach generates new question variants each session, forcing genuine real-time practice rather than recitation." },
  { question: "What types of interviews can I practice with Zari?", answer: "Zari's mock interview practice covers: (1) Behavioral interviews — STAR-format questions for all seniority levels, scored against specific competencies. (2) Technical interviews — coding problem walkthroughs with approach evaluation (not just solution correctness). (3) Case interviews — consulting case practice with framework assessment for McKinsey, BCG, and Bain formats. (4) Role-specific interviews — product manager interviews (product sense, estimation, behavioral), marketing interviews, finance interviews. (5) Industry-specific interviews — including finance technical questions (LBO, DCF, valuation), healthcare clinical scenarios, and sales interviews. Available 24/7 — no scheduling, no waiting for a human coach to be available." },
  { question: "What is STAR scoring in mock interview feedback?", answer: "STAR scoring evaluates your interview answers against the STAR framework: Situation (did you establish relevant context clearly?), Task (did you define your specific role/responsibility?), Action (did you describe what you personally did — not 'we'?), Result (did you quantify the outcome?). Weak answers miss one or more elements — typically the Result (no metric) or confuse Task and Action. Zari's AI analyzes each answer and gives component scores plus specific improvement feedback. The most common gap: candidates describe what the team did ('we launched') rather than their individual contribution ('I designed the pricing model that drove the launch decision')." },
  { question: "How is AI mock interview practice different from practicing with a friend?", answer: "Practicing with a friend has one advantage: human judgment on delivery (eye contact, tone, pace). AI mock interviews have several structural advantages: (1) Availability — 24/7, no scheduling, no social awkwardness. (2) Consistency — the AI evaluates every answer against the same rubric, not based on the friend's mood or knowledge. (3) Volume — you can do 10 practice rounds in an hour without wearing out a friend. (4) Specificity — AI feedback identifies the exact sentence where your answer went generic or where you forgot to quantify. (5) No false comfort — friends often don't want to be harsh; the AI tells you when your answer was weak. Best approach: use AI for volume practice, use a trusted peer or coach for delivery feedback on your polished answers." },
];

const INTERVIEW_TYPES = [
  { type: "Behavioral (STAR)", desc: "Leadership, conflict, failure, and achievement questions. STAR scoring with specific component feedback.", roles: "All levels" },
  { type: "Product Manager", desc: "Product sense, estimation, metrics, and PM behavioral questions. Scored against PM competency framework.", roles: "PM / APM / GPM" },
  { type: "Consulting (Case)", desc: "Market sizing, profitability cases, and M&A cases. Framework assessment and structure scoring.", roles: "Consulting / MBA" },
  { type: "Technical (Coding)", desc: "Algorithm and data structure problem walkthroughs. Approach and communication scored.", roles: "SWE / MLE" },
  { type: "Finance (Technical)", desc: "LBO, DCF, valuation multiples, and M&A questions. IBD analyst and associate level.", roles: "IB / PE / Corp Dev" },
  { type: "Management (Leadership)", desc: "People management, underperformance, team building, and managing-up scenarios.", roles: "Manager / Director" },
];

export default async function MockInterviewOnlinePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Mock Interview Online 2025 — AI Mock Interviews with Instant Feedback"
        description="AI-powered mock interview practice with instant STAR scoring and feedback. Behavioral, technical, and case interviews available 24/7."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/mock-interview-online`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Mock Interview Online", url: `${BASE_URL}/mock-interview-online` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Mock Interviews · STAR Scoring · 24/7 Practice
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Mock Interview<br />
            <span className="text-white/50">Online</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI-powered mock interview practice with instant STAR scoring and component-level feedback. Behavioral, technical, case, and role-specific interviews — available 24/7, no scheduling.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI interview coach · No scheduling · Instant feedback</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Interview types available</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Practice the exact interview format your target role uses — with scoring calibrated to real hiring bars.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Interview type</span><span>What&apos;s scored</span><span>Best for</span>
            </div>
            {INTERVIEW_TYPES.map(({ type, desc, roles }) => (
              <div key={type} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{type}</span>
                <span className="text-[var(--muted)] text-[12px]">{desc}</span>
                <span className="font-semibold text-[#7C3AED]">{roles}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Why Zari&apos;s mock interview practice works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "STAR component scoring", desc: "Every answer scored on Situation, Task, Action, Result separately — tells you exactly which element is weak, not just 'needs improvement'." },
              { title: "New questions every session", desc: "Zari generates fresh question variants — you practice real-time thinking, not memorized scripts." },
              { title: "No scheduling required", desc: "Practice at 11pm before a 9am interview. No waiting for a human coach to be available. Unlimited sessions." },
              { title: "Role-calibrated scoring", desc: "The scoring rubric adjusts to your seniority — an IC answer vs a Director answer are evaluated against different bars." },
              { title: "Specific sentence feedback", desc: "Feedback identifies the exact sentence where you went generic, missed a metric, or described 'we' instead of 'I'." },
              { title: "Follow-up question drilling", desc: "Zari asks follow-up questions just like a real interviewer — stress-testing your answers and exposing where you're thin." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
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
          <h2 className="mb-4 text-[2rem] font-extrabold">Start practicing interviews now.</h2>
          <p className="mb-8 text-[15px] text-white/55">Unlimited mock interviews with instant STAR scoring — free to start, no scheduling, available 24/7.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start practicing free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
