import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Panel Interview Questions 2025 — How to Handle Multiple Interviewers",
  description: "How to prepare for a panel interview: the most common panel questions, how to manage eye contact and engagement with multiple interviewers, and how to handle disagreement between panelists.",
  keywords: ["panel interview questions", "how to handle a panel interview", "panel interview tips", "group interview tips", "panel interview preparation", "multiple interviewers interview", "panel interview strategies", "board interview questions", "panel interview advice 2025"],
  alternates: { canonical: "/blog/panel-interview-questions" },
  openGraph: { title: "Panel Interview Questions 2025 — Tips for Multiple Interviewers", description: "Common panel interview questions, eye contact management, how to handle panelist disagreement, and full preparation guide.", url: "/blog/panel-interview-questions" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "What is a panel interview?", answer: "A panel interview has 2–6 interviewers conducting the interview simultaneously, typically from different functions or levels of the hiring team. Common in government, academia, NHS/healthcare, finance, consulting, and senior roles at large companies. The panelists may take turns asking questions, or they may all ask spontaneously." },
  { question: "How do you make eye contact in a panel interview?", answer: "Address the person who asked the question when you start your answer (direct eye contact for the first sentence), then naturally sweep the panel as you continue, ending your answer back on the questioner. Avoid 'tennis match' eye-bouncing between panelists — it looks nervous. In a 3-person panel, think of your eye contact as roughly 50% on the questioner, 25% each on the other two." },
  { question: "What do you do if panelists disagree with each other during your interview?", answer: "Don't take sides. If panelists visibly disagree about something in their questions to you, acknowledge both perspectives: 'I can see why both considerations matter — in my experience, the balance depends on [context].' Panelists who disagree are often testing how you handle conflicting stakeholders, which is a core competency for most senior roles." },
  { question: "How long should panel interview answers be?", answer: "Slightly shorter than one-on-one answers. In a panel, you have multiple people's attention — longer answers lose the room faster. Target 90 seconds for behavioral STAR answers and 45–60 seconds for factual or situational questions. Then pause and invite follow-up: 'Does that cover what you were asking, or would you like more detail on any part?'" },
];

const COMMON_QUESTIONS = [
  { q: "Tell us about yourself and why you're interested in this role.", tip: "Deliver to the whole panel, not just the person who asked. Cover career arc, why this role, why now." },
  { q: "How do you handle working with stakeholders who have conflicting priorities?", tip: "Key for panel — they're often multiple stakeholders themselves. Show you can navigate without taking sides." },
  { q: "Give an example of when you had to make a decision without consensus.", tip: "Shows decision-making under pressure. Important for leadership and senior roles." },
  { q: "How would you describe your leadership/management style?", tip: "Be specific and concrete. 'I believe in servant leadership' means nothing without an example." },
  { q: "What questions do you have for us?", tip: "Address the whole panel, but tailor specific questions to specific roles: 'For the technical side of the panel, I wanted to ask...' Shows you've noticed who's in the room." },
];

export default async function PanelInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Panel Interview Questions 2025" description="How to prepare for panel interviews with multiple interviewers — common questions, eye contact, and stakeholder management." url={`${BASE_URL}/blog/panel-interview-questions`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Panel Interview Questions", url: `${BASE_URL}/blog/panel-interview-questions` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0D7182 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Interview Prep</span>
            <span className="text-[12px] text-white/35">12 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Panel Interview Questions 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">How to handle multiple interviewers: eye contact, answer length, who to address, and what to do when the panel disagrees with each other.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 3 things that make or break panel interviews</h2>
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "👁️", title: "Eye contact", body: "Address the questioner first, then sweep the panel, return to the questioner. 50/25/25 in a 3-person panel. Don't bounce anxiously between faces.", color: "#0D7182" },
              { icon: "⏱️", title: "Answer length", body: "90 seconds max for STAR answers. Multiple people's attention spans faster. End with an invitation for follow-up.", color: "#7C3AED" },
              { icon: "🤝", title: "Include everyone", body: "Research each panelist's role if you know them in advance. Direct specific questions to specific people at the end. Make each person feel acknowledged.", color: "#059669" },
            ].map(({ icon, title, body, color }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-2 text-2xl">{icon}</div>
                <h3 className="mb-1 font-bold text-[14px]" style={{ color }}>{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Most common panel interview questions</h2>
          <div className="mb-12 space-y-3">
            {COMMON_QUESTIONS.map(({ q, tip }, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-start gap-3 p-4 border-b border-[var(--border)]">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#0D7182]/10 text-[11px] font-extrabold text-[#0D7182]">{i + 1}</span>
                  <p className="font-semibold text-[14px]">{q}</p>
                </div>
                <div className="px-4 py-3 flex items-start gap-2">
                  <span className="text-[10px] font-bold uppercase text-[var(--muted)] flex-shrink-0 mt-0.5">Tip</span>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{tip}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Panel interview prep checklist</h2>
          <div className="mb-10 space-y-2">
            {[
              "Research each panelist's role and background before the interview",
              "Prepare 8–10 STAR stories covering leadership, conflict, results, and failure",
              "Practice delivering answers in 90 seconds — record yourself",
              "Prepare 4–5 questions, some tailored to specific panelist roles",
              "Practise the eye contact sweep in front of a mirror or with 2+ people",
              "Have your notes visible but don't read from them",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-[#0D7182] flex-shrink-0" />
                <p className="text-[13px] text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Practice with multiple interviewers.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari simulates panel interviews with STAR scoring and feedback on answer structure — so the real panel feels familiar, not frightening.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Start panel interview prep free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
