import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Amazon Behavioral Interview Questions 2025 — LP-Mapped STAR Answers",
  description:
    "The 30 most common Amazon behavioral interview questions with example STAR answers mapped to Amazon Leadership Principles. Updated for 2025 with SDE, PM, and operations roles.",
  keywords: [
    "Amazon behavioral interview questions",
    "Amazon leadership principles interview",
    "Amazon STAR interview answers",
    "Amazon interview preparation",
    "Amazon SDE interview questions",
    "Amazon PM interview questions",
    "how to prepare for Amazon interview",
    "Amazon interview tips 2025",
    "leadership principles examples",
    "Amazon loop interview",
  ],
  alternates: { canonical: "/blog/amazon-behavioral-interview-questions" },
  openGraph: {
    title: "Amazon Behavioral Interview Questions 2025 — 30 LP-Mapped Questions",
    description:
      "The 30 most common Amazon behavioral questions with STAR answers mapped to Leadership Principles. Real examples for SDE, PM, and ops roles.",
    url: "/blog/amazon-behavioral-interview-questions",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How many behavioral questions are in an Amazon loop interview?",
    answer:
      "A standard Amazon loop has 4–6 interview rounds, each 45–60 minutes. Each interviewer typically asks 2–3 behavioral questions (plus technical questions for SDE). You'll face 10–18 behavioral questions total across the loop. Each interviewer is assigned specific Leadership Principles to evaluate — so they won't repeat questions from other interviewers.",
  },
  {
    question: "Do I need to memorize all 16 Leadership Principles?",
    answer:
      "You should understand all 16, but the 5–7 most commonly tested are: Customer Obsession, Ownership, Bias for Action, Deliver Results, Dive Deep, Earn Trust, and Invent & Simplify. Prioritise preparing 2–3 strong stories for each of these. Have a library of ~8–10 versatile stories that can be adapted to different LPs.",
  },
  {
    question: "What if I don't have a direct example for a question?",
    answer:
      "Use a related example and bridge to the principle being tested. 'I haven't faced that exact situation, but here's a similar challenge...' is acceptable. What's not acceptable is answering with a hypothetical — Amazon interviewers are trained to press for real examples. If you sense the question is heading somewhere you lack an example, steer your answer toward your strongest relevant story early.",
  },
  {
    question: "How specific should my STAR answers be?",
    answer:
      "Very specific. Amazon interviews reward specificity: metrics, timelines, exact roles, specific decisions made. 'We improved performance significantly' is weak. 'I identified that our p99 latency was 2.1 seconds, traced it to a database index miss, and reduced it to 340ms within one sprint' is strong. The more specific you are, the harder it is to appear fabricated, and the more you demonstrate 'Dive Deep'.",
  },
  {
    question: "What's the biggest mistake in Amazon behavioral interviews?",
    answer:
      "Using 'we' instead of 'I'. Amazon wants to know YOUR specific contribution. Interviewers are trained to follow up with 'What was YOUR specific role in that?' Reframe all your stories to centre your individual action and decision-making while acknowledging team context.",
  },
];

const LPS = [
  { name: "Customer Obsession", signal: "Starting with the customer, working backwards. Sacrificing short-term metrics for long-term customer trust.", questions: ["Tell me about a time you went above and beyond for a customer.", "Describe a situation where you had to balance customer needs against business constraints.", "Give an example of when you used customer feedback to change something you were working on."] },
  { name: "Ownership", signal: "Acting beyond your role. Not saying 'that's not my job'. Taking responsibility for outcomes.", questions: ["Tell me about a time you took ownership of a problem outside your direct responsibility.", "Describe a situation where you had to make a decision without having all the information.", "Give an example of a time you made a mistake. What did you do?"] },
  { name: "Invent & Simplify", signal: "Finding simpler solutions. Challenging processes. Building things that scale.", questions: ["Tell me about a time you invented a new approach to a problem.", "Describe a process you simplified significantly.", "Give an example of when you found a creative solution to a complex problem."] },
  { name: "Bias for Action", signal: "Speed matters. Calculated risk-taking. Not waiting for perfect information.", questions: ["Tell me about a time you had to make a fast decision with incomplete information.", "Describe a situation where you took initiative without being asked.", "Give an example of a calculated risk you took."] },
  { name: "Deliver Results", signal: "Hitting targets despite obstacles. Prioritising ruthlessly. Closing.", questions: ["Tell me about a time you delivered a project despite significant obstacles.", "Describe a situation where you had to reprioritise to meet a deadline.", "Give an example of a time you exceeded your targets."] },
  { name: "Dive Deep", signal: "Detail orientation. Investigating root causes. Data over assumption.", questions: ["Tell me about a time you dug into data to solve a problem.", "Describe a situation where a surface-level solution wasn't enough.", "Give an example of when your attention to detail caught something important."] },
];

export default async function AmazonBehavioralInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Amazon Behavioral Interview Questions 2025"
        description="The 30 most common Amazon behavioral interview questions with STAR answers mapped to Leadership Principles."
        url={`${BASE_URL}/blog/amazon-behavioral-interview-questions`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "Amazon Behavioral Interview Questions", url: `${BASE_URL}/blog/amazon-behavioral-interview-questions` },
        ]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden pb-16 pt-14 text-white"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #FF9900 60%, #e68000 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
              Amazon Prep
            </span>
            <span className="text-[12px] text-white/35">18 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Amazon Behavioral Interview Questions 2025
          </h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/50">30 Questions Mapped to Leadership Principles — With STAR Answer Examples</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">
            Every Amazon behavioral question maps back to a Leadership Principle. If you know which LP the interviewer is testing, you can give them exactly what they&apos;re looking for.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={16} label="Amazon Leadership Principles — every question maps to one" accent="#FF9900" />
            <StatCard value={6} label="interview rounds in a typical Amazon loop" accent="#1a1a2e" />
            <StatCard value={18} label="behavioral questions you'll face in a full loop" accent="#7C3AED" />
            <StatCard value={8} label="core stories you need to cover every LP" accent="#059669" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">
            How Amazon behavioral interviews actually work
          </h2>
          <p className="mb-5 text-[15px] leading-7 text-[var(--muted)]">
            Amazon&apos;s behavioral interview process is more structured than most companies. Every interviewer is assigned a set of Leadership Principles to evaluate, and they&apos;re trained on the &ldquo;bar raiser&rdquo; framework — which means they&apos;re looking for evidence that you set a high bar, not just that you did your job.
          </p>
          <div className="mb-10 rounded-2xl border-l-4 border-[#FF9900] bg-[#FF9900]/5 p-5">
            <p className="text-[14px] font-bold text-[#FF9900] mb-1">The single most important thing to know:</p>
            <p className="text-[14px] leading-6 text-[var(--muted)]">Use &ldquo;I&rdquo;, not &ldquo;we&rdquo;. Amazon interviewers are trained to ask follow-up questions if you use &ldquo;we&rdquo;: &ldquo;What was <em>your</em> specific role?&rdquo; &ldquo;What decision did <em>you</em> make?&rdquo; Front-load your individual contribution in every answer.</p>
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">
            Leadership Principles — questions & signals by LP
          </h2>

          <div className="space-y-8 mb-14">
            {LPS.map(({ name, signal, questions }, i) => (
              <div key={name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
                <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[#FF9900]/[0.06] p-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF9900]/20 text-[11px] font-extrabold text-[#FF9900]">{i + 1}</span>
                  <div>
                    <h3 className="text-[15px] font-bold">{name}</h3>
                    <p className="text-[11px] text-[var(--muted)]">{signal}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {questions.map((q, qi) => (
                    <div key={qi} className="flex items-start gap-2 text-[13px] leading-6">
                      <span className="mt-0.5 text-[#FF9900] font-bold">Q{qi + 1}.</span>
                      <span className="text-[var(--muted)]">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">
            The STAR framework — Amazon&apos;s scoring lens
          </h2>
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {[
              { letter: "S", word: "Situation", desc: "Set the scene. 1–2 sentences max. What was the context, what was at stake? Include a metric if possible." },
              { letter: "T", word: "Task", desc: "What was your specific responsibility in this situation? What outcome were you responsible for?" },
              { letter: "A", word: "Action", desc: "The most important part. What specific steps did YOU take? 3–5 concrete actions. Use 'I', not 'we'." },
              { letter: "R", word: "Result", desc: "What was the measurable outcome? Revenue impact, time saved, error rate reduced. Percentages and dollar amounts are gold." },
            ].map(({ letter, word, desc }) => (
              <div key={letter} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FF9900]/15 text-[20px] font-extrabold text-[#FF9900]">{letter}</div>
                <div>
                  <div className="font-bold text-[14px] mb-1">{word}</div>
                  <p className="text-[12px] leading-5 text-[var(--muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">
            Example answer — Customer Obsession
          </h2>
          <p className="mb-4 text-[14px] text-[var(--muted)]">Question: &ldquo;Tell me about a time you went above and beyond for a customer.&rdquo;</p>
          <div className="mb-12 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-4">
            {[
              { label: "S — Situation", color: "#FF9900", text: "I was the on-call engineer when a payment processing bug caused 3,400 customers to be double-charged during Black Friday peak. This was a P0 incident with $180K in erroneous charges." },
              { label: "T — Task", color: "#7C3AED", text: "My responsibility was to identify the root cause, implement the fix, and ensure affected customers were refunded — while the system was still processing 40K transactions per hour." },
              { label: "A — Action", color: "#059669", text: "I immediately isolated the affected transaction queue, identified a race condition in our idempotency check introduced in the previous deploy, rolled back that specific service without a full rollback, then worked with the finance team to build a refund batch script. I drafted the customer communication email myself rather than waiting for the team lead, because I knew customers would see bank statements before morning." },
              { label: "R — Result", color: "#0078A8", text: "All 3,400 refunds were processed within 4 hours. The root cause fix was deployed same night. Zero customers escalated to our bank dispute process. I documented the post-mortem and proposed a new pre-deploy check for idempotency validation that we shipped the following sprint." },
            ].map(({ label, color, text }) => (
              <div key={label} className="flex gap-3">
                <div className="w-24 flex-shrink-0 text-[11px] font-bold pt-0.5" style={{ color }}>{label}</div>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-[1.7rem] font-extrabold tracking-[-0.02em]">Build your story library</h2>
          <p className="mb-6 text-[15px] leading-7 text-[var(--muted)]">
            The most efficient way to prepare is to build 8–10 strong stories that each cover multiple Leadership Principles. Tag each story against the LPs it demonstrates. If a question targets a LP you&apos;re weak on, find the closest story in your library and bridge to it.
          </p>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 mb-10">
            <h3 className="mb-3 text-[14px] font-bold">Story categories to cover</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "A project you owned end-to-end",
                "A time you disagreed with your manager (and either persuaded them or committed anyway)",
                "A difficult decision made with incomplete data",
                "A process or system you simplified or improved",
                "A significant mistake and what you did about it",
                "A time you went above and beyond a customer's request",
                "A time you used data to challenge an assumption",
                "A project that failed — what you did and what you learned",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-[13px] leading-6 text-[var(--muted)]">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-[#FF9900]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </article>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="bg-[#1a1a2e] py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold tracking-[-0.02em]">
            Practice makes the difference.
          </h2>
          <p className="mb-6 text-[15px] text-white/50">
            Zari runs full Amazon loop simulations — behavioral questions mapped to LPs, STAR scoring, and language feedback mid-answer. Practice until your stories are automatic.
          </p>
          <Link href="/platform" className="inline-block rounded-xl bg-[#FF9900] px-8 py-4 text-[15px] font-extrabold text-[#1a1a2e] transition-opacity hover:opacity-90">
            Start Amazon interview prep free
          </Link>
          <p className="mt-3 text-[12px] text-white/30">
            See also:{" "}
            <Link href="/blog/star-method-interview" className="hover:underline text-white/50">STAR method guide</Link>
            {" · "}
            <Link href="/blog/behavioral-interview-questions" className="hover:underline text-white/50">Behavioral questions master list</Link>
            {" · "}
            <Link href="/blog/common-interview-questions" className="hover:underline text-white/50">Common interview questions</Link>
          </p>
        </div>
      </section>
    </PageFrame>
  );
}
