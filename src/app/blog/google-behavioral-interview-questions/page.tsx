import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Google Behavioral Interview Questions 2025 — STAR Answers & Prep Guide",
  description: "The 25 most common Google behavioral interview questions with STAR answers. Covers Googleyness, leadership, collaboration, and technical impact — for SWE, PM, and non-technical roles.",
  keywords: ["Google behavioral interview questions", "Google interview questions", "Google interview prep", "Google STAR interview", "Googleyness interview questions", "Google SWE interview behavioral", "Google PM interview questions", "how to prepare for Google interview", "Google loop interview", "Google interview tips 2025"],
  alternates: { canonical: "/blog/google-behavioral-interview-questions" },
  openGraph: { title: "Google Behavioral Interview Questions 2025", description: "25 Google behavioral questions with STAR frameworks. Googleyness, leadership, and impact — for SWE, PM, and ops.", url: "/blog/google-behavioral-interview-questions" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "Does Google use behavioral interviews?", answer: "Yes. Google's interview process includes behavioral rounds for all roles — both technical and non-technical. For SWEs, behavioral questions appear in 1–2 of the 5–6 loop rounds. For PM and UX roles, behavioral questions are the primary format. Google looks for 'Googleyness' — collaborative, humble, curious, and mission-driven people." },
  { question: "What is 'Googleyness' and how do I demonstrate it?", answer: "Googleyness is Google's informal culture fit evaluation: intellectual humility (comfort being wrong), genuine curiosity and learning orientation, comfort with ambiguity, collaborative default (not competitive), and alignment with Google's mission. To demonstrate it: show examples where you changed your mind based on evidence, where you helped colleagues without being asked, and where you were energised by problems rather than frustrated by them." },
  { question: "How many behavioral rounds are in a Google loop?", answer: "A typical Google engineering loop has 5–6 rounds: 2–3 coding rounds, 1 systems design round, and 1–2 behavioral/Googleyness rounds. For PM roles, most rounds are behavioral or product sense. The hiring committee reviews all rounds together — a single weak behavioral round can be compensated by strong technical rounds, but a poor Googleyness signal across multiple rounds is hard to overcome." },
  { question: "What's the biggest Google behavioral interview mistake?", answer: "Claiming sole credit for team work without acknowledging the team. Google specifically values humility and collaboration — interviewers are trained to ask 'What was the team's role?' and 'What would have happened without you?' Show your specific contribution while genuinely crediting others. The candidate who says 'we built this and I specifically was responsible for X' consistently outperforms the one who says 'I built this' alone." },
];

const CATEGORIES = [
  { name: "Googleyness / Culture Fit", color: "#4285F4", questions: [
    { q: "Tell me about a time you had to work with someone whose working style was very different from yours.", signal: "Collaboration, adaptability, no judgment" },
    { q: "Describe a situation where you had to convince someone with more experience that your approach was better.", signal: "Intellectual humility + confidence. You can be right AND respectful." },
    { q: "Tell me about a time you received feedback you disagreed with. What did you do?", signal: "Openness to feedback, psychological safety." },
    { q: "Tell me about a time you changed your mind based on new information.", signal: "Intellectual humility — critical for Googleyness." },
  ]},
  { name: "Leadership & Influence", color: "#34A853", questions: [
    { q: "Tell me about a time you influenced a decision without having direct authority.", signal: "Lateral influence, persuasion through evidence, not hierarchy." },
    { q: "Describe a time you had to lead a project through significant ambiguity.", signal: "Comfort with ambiguity. Decision-making without complete information." },
    { q: "Tell me about a time you identified a problem no one else had noticed.", signal: "Proactivity, initiative, systems-level thinking." },
    { q: "Give an example of when you had to make a difficult decision quickly.", signal: "Judgment under pressure. Bias for action with appropriate due diligence." },
  ]},
  { name: "Impact & Results", color: "#FBBC04", questions: [
    { q: "Tell me about your most impactful project. What was your specific contribution?", signal: "Ability to articulate measurable impact. Clarity on individual vs team role." },
    { q: "Describe a project where you had to balance speed and quality.", signal: "Judgment on tradeoffs. Understanding of when MVP is appropriate." },
    { q: "Tell me about a time you improved a process that other people had accepted as normal.", signal: "Bias for improvement, intellectual curiosity about 'why are we doing this?'" },
  ]},
  { name: "Failure & Learning", color: "#EA4335", questions: [
    { q: "Tell me about a project that failed. What happened and what did you learn?", signal: "Honest self-reflection. Learning orientation. Not blaming others." },
    { q: "Describe the biggest mistake you've made in your career. How did you handle it?", signal: "Ownership, accountability, growth mindset." },
    { q: "Tell me about a time you underestimated the complexity of a task.", signal: "Intellectual humility, calibration, and recovery story." },
  ]},
];

export default async function GoogleBehavioralInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Google Behavioral Interview Questions 2025" description="25 Google behavioral questions with STAR frameworks mapped to Googleyness, leadership, and impact." url={`${BASE_URL}/blog/google-behavioral-interview-questions`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Google Behavioral Interview Questions", url: `${BASE_URL}/blog/google-behavioral-interview-questions` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #4285F4 60%, #34A853 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Google Prep</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Google Behavioral Interview Questions 2025</h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/40">25 Questions — Googleyness, Leadership, Impact & Failure</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">Google behavioral rounds aren&apos;t looking for heroes. They&apos;re looking for humble, curious, collaborative people who happen to do exceptional work. Here&apos;s how to show exactly that.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={5} label="rounds in a typical Google engineering loop" accent="#4285F4" />
            <StatCard value={2} label="dedicated Googleyness / behavioral rounds" accent="#34A853" />
            <StatCard value={4} label="behavioral categories tested across all roles" accent="#FBBC04" />
            <StatCard value={8} label="core stories you need to cover every category" accent="#EA4335" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 rounded-2xl border-l-4 border-[#4285F4] bg-[#4285F4]/5 p-5">
            <p className="mb-1 font-bold text-[14px] text-[#4285F4]">The single most important thing about Google behavioral interviews:</p>
            <p className="text-[14px] leading-6 text-[var(--muted)]">Google doesn&apos;t want candidates who worked alone and crushed everything. They want candidates who made the team better, changed their mind when they were wrong, and stayed curious when things got hard. Every answer should reflect this — even when describing personal accomplishments.</p>
          </div>

          {CATEGORIES.map(({ name, color, questions }) => (
            <div key={name} className="mb-10">
              <h2 className="mb-5 text-[1.5rem] font-extrabold tracking-[-0.02em]" style={{ color }}>{name}</h2>
              <div className="space-y-3">
                {questions.map(({ q, signal }, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                    <div className="flex items-start gap-3 p-4 border-b border-[var(--border)]">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: color }}>{i + 1}</span>
                      <p className="font-semibold text-[14px]">{q}</p>
                    </div>
                    <div className="px-4 py-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] flex-shrink-0">Signal</span>
                      <p className="text-[12px] text-[var(--muted)]">{signal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The Googleyness STAR answer formula</h2>
          <div className="mb-10 space-y-3">
            {[
              { step: "S", label: "Situation", tip: "Set context briefly. Include team size and stakes." },
              { step: "T", label: "Task", tip: "What was YOUR specific responsibility — not the team's." },
              { step: "A", label: "Action", tip: "3–5 specific steps. Use 'I' but acknowledge collaborators: 'I led X, working closely with Y who...' This shows collaborative default." },
              { step: "R", label: "Result", tip: "Metric + learning. Google interviewers love 'and here's what I'd do differently' — it signals growth mindset." },
            ].map(({ step, label, tip }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-[18px] font-extrabold text-white" style={{ background: "#4285F4" }}>{step}</div>
                <div>
                  <div className="font-bold text-[14px]">{label}</div>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">FAQ</h2>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #4285F4 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Practice your Google answers out loud.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari simulates Google behavioral rounds with Googleyness-aware scoring and gives specific language feedback per answer.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#4285F4]">Start Google interview prep free</Link>
          <p className="mt-3 text-[12px] text-white/30">See also: <Link href="/blog/amazon-behavioral-interview-questions" className="hover:underline text-white/50">Amazon LP interview</Link> · <Link href="/blog/star-method-interview" className="hover:underline text-white/50">STAR method</Link></p>
        </div>
      </section>
    </PageFrame>
  );
}
