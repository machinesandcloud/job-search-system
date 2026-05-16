import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Prepare for a Job Interview: Complete 2025 Guide",
  description:
    "The complete job interview preparation guide for 2025. Research, STAR method practice, company prep, behavioral questions, and the day-of routine that eliminates nerves.",
  keywords: ["how to prepare for a job interview", "job interview preparation", "interview prep tips", "behavioral interview prep", "STAR method interview", "interview preparation guide", "how to ace an interview", "job interview tips 2025"],
  alternates: { canonical: "/blog/how-to-prepare-for-job-interview" },
  openGraph: { title: "How to Prepare for a Job Interview: Complete 2025 Guide", description: "Research, practice, and the day-of routine that eliminates nerves. Everything you need to ace any interview.", url: "/blog/how-to-prepare-for-job-interview" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function HowToPrepareForJobInterviewPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Prepare for a Job Interview: Complete 2025 Guide" description="The complete job interview preparation guide. Research, STAR method, behavioral questions, and day-of routine." url={`${BASE_URL}/blog/how-to-prepare-for-job-interview`} datePublished="2025-04-01" />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Prepare for a Job Interview", url: `${BASE_URL}/blog/how-to-prepare-for-job-interview` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[#EC4899]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EC4899]">Interviews</span>
            <span className="text-[12px] text-white/35">12 min read · April 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">How to Prepare for a Job Interview:<br /><span className="text-white/50">Complete 2025 Guide</span></h1>
          <p className="text-[16px] leading-8 text-white/50">Most interview prep is too shallow. This is the framework that makes you unshakeable.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15.5px] leading-8 text-[var(--muted)]">
          <p>Most people prepare for interviews by skimming the job description and rehearsing &quot;tell me about yourself.&quot; That&apos;s not enough — not for competitive roles, not for companies that put candidates through 4–6 rounds.</p>
          <p>This guide covers a systematic preparation framework that eliminates nerves by making preparation thorough enough that nothing in the interview should surprise you.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Phase 1: Research (1–2 hours before any interview)</h2>
          <div className="space-y-4">
            {[
              { title: "Company research", body: "Read the last 4 earnings calls or press releases. Know the company's top strategic priorities, recent wins, and stated challenges. Interviewers notice when candidates understand the business context of the role they're applying for." },
              { title: "Role research", body: "Map the job description to your experience explicitly. For every key requirement, prepare a specific story from your background. Don't just note that you have the skill — have the story ready." },
              { title: "Interviewer research", body: "LinkedIn each person you're meeting with. Note their background, tenure, and areas of focus. Interviewers are more engaged when candidates ask informed questions about their specific work." },
            ].map(item => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)] mb-1">{item.title}</p>
                <p className="text-[14px] leading-7">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Phase 2: Behavioral question preparation (STAR method)</h2>
          <p>Behavioral questions (&quot;Tell me about a time when...&quot;) are the most common type in professional interviews and the most commonly answered poorly. The STAR method makes every answer structurally sound:</p>
          <ul className="space-y-2">
            {["S — Situation: Brief context (one sentence)", "T — Task: What you were responsible for", "A — Action: What you specifically did (most of your answer)", "R — Result: Measurable outcome of your actions"].map(i => (
              <li key={i} className="flex gap-3 items-start"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#EC4899] flex-shrink-0" /><span className="font-mono text-[14px] text-[var(--ink)]">{i}</span></li>
            ))}
          </ul>
          <p>Prepare 8–10 STAR stories that cover: leadership, conflict, failure and recovery, cross-functional work, ambiguity, and technical depth. Most behavioral questions can be answered with one of these stories.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Phase 3: Practice out loud (this is where most people skip)</h2>
          <p>Reading your STAR stories is not the same as saying them. The first time you say an answer out loud, you will realize it&apos;s much harder than you expected. This is why practice sessions — not just mental rehearsal — are essential.</p>
          <p>Options for out-loud practice:</p>
          <ul className="space-y-2">
            {["Record yourself answering questions and watch it back (uncomfortable and effective)", "Practice with a trusted person who will give honest feedback", "Use an AI interview coach (Zari) that evaluates your answers in real time and gives specific feedback on structure and language"].map(i => (
              <li key={i} className="flex gap-3 items-start"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" /><span>{i}</span></li>
            ))}
          </ul>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Phase 4: Questions to ask them</h2>
          <p>Interviews are evaluations in both directions. Candidates who ask thoughtful questions are consistently rated higher. Prepare 5–7 questions — you won&apos;t use all of them, but having too many is better than running out.</p>
          <p>Good question categories: team dynamics, how success is measured, what the biggest challenges are, what the hiring manager wishes the previous person in the role had done differently.</p>
          <p>Bad questions: anything easily answered by the company website, compensation questions before an offer, questions that suggest you haven&apos;t been paying attention.</p>

          <div className="mt-10 rounded-2xl border border-[#EC4899]/20 bg-[#EC4899]/[0.04] p-6 text-center">
            <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Practice with an AI interview coach</p>
            <p className="mb-5 text-[13.5px] text-[var(--muted)]">Zari runs realistic mock interviews with live STAR scoring. Voice or text. Every vague answer caught before the real thing. Free first session.</p>
            <Link href="/ai-interview-coach" className="inline-flex h-11 items-center gap-2 rounded-xl px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#EC4899" }}>
              Start interview prep free <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
