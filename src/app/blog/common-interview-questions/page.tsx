import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "40 Most Common Interview Questions (With Strong Answers) — 2025",
  description:
    "The 40 most common job interview questions with strong, specific answers. Includes general questions, behavioral questions, and situational questions — with word-for-word examples.",
  keywords: ["common interview questions", "most common interview questions", "job interview questions", "interview questions and answers", "common interview questions and answers", "top interview questions 2025", "interview questions to prepare for"],
  alternates: { canonical: "/blog/common-interview-questions" },
  openGraph: { title: "40 Most Common Interview Questions (With Strong Answers)", description: "The 40 interview questions that appear in nearly every job interview — with strong, specific answers.", url: "/blog/common-interview-questions" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-01";
const MODIFIED = "2025-05-16";

const QUESTIONS = [
  {
    category: "Tell me about yourself",
    question: "Tell me about yourself.",
    why: "This is an invitation to frame the interview, not a request for your life story. Interviewers want to know: are you relevant to this role, and can you communicate clearly?",
    answer: "Structure: current role and what you do → 1-2 most relevant career highlights → why you're here. Keep it to 90 seconds. End by bridging to the role.",
    example: '"I\'ve spent the last four years as a growth PM at a B2B SaaS company, where I owned the activation funnel and grew free-to-paid conversion from 5% to 14%. Before that, I was a consultant working on go-to-market strategy. I\'m looking for a role where I can go deeper on product strategy — which is what drew me to this position."',
  },
  {
    category: "Strengths and weaknesses",
    question: "What's your greatest strength?",
    why: "Choose a strength that's genuinely relevant to this role — not a generic answer.",
    answer: "Name the strength, give a specific example, connect it to impact. Don't just say 'I'm a hard worker.'",
    example: '"My strongest skill is translating ambiguous problems into clear requirements. At DataFlow, I took a vague ask from the CEO — \'we need better retention\' — and within two weeks had defined the metric, identified the drop-off points, and had engineering aligned on a 6-week roadmap. That project became our highest-impact initiative that year."',
  },
  {
    category: "Strengths and weaknesses",
    question: "What's your greatest weakness?",
    why: "Interviewers aren't looking for self-flagellation — they want evidence of self-awareness and the ability to improve.",
    answer: "Name a real weakness (not 'I work too hard'). Show what you've done to manage or improve it.",
    example: '"I used to struggle with delegating — I\'d hold onto tasks longer than I should because I worried about quality. What changed: I started setting clearer success criteria upfront so I could delegate with confidence. Over the last year I\'ve been intentional about this, and it\'s made my team significantly more autonomous."',
  },
  {
    category: "Motivation and fit",
    question: "Why do you want to work here?",
    why: "Generic enthusiasm ('I love your culture!') is a red flag. Specific knowledge is a green flag.",
    answer: "Mention something specific: a product decision, a market move, a company value, something a leader said publicly. Connect it to something in your own background or career goals.",
    example: '"I\'ve been watching how you\'ve built the PLG motion while most competitors are still top-down sales. Your CEO\'s post on product-led distribution is exactly the model I believe in — and I\'ve spent three years executing it at a smaller scale. I want to be at a company where that\'s the entire strategy, not an experiment."',
  },
  {
    category: "Motivation and fit",
    question: "Why are you leaving your current job?",
    why: "Never badmouth your current employer. Stay forward-looking.",
    answer: "Be honest about what you want next. Frame it as growth, not escape.",
    example: '"I\'ve learned a lot in this role, and I\'m proud of what I\'ve built. But the company is in maintenance mode — there\'s no appetite for new bets. I want to be somewhere building something, and this opportunity is exactly that."',
  },
  {
    category: "Motivation and fit",
    question: "Where do you see yourself in 5 years?",
    why: "They want to know if you'll stay, grow, and contribute — not if you have a perfectly mapped career plan.",
    answer: "Show ambition that's relevant to this company's trajectory. Don't say 'in your job.'",
    example: '"I want to be leading a team working on some of the hardest problems in this space. At the pace this company is growing, I think there\'s a real opportunity to grow into that here — which is part of what excites me about this role."',
  },
];

const BEHAVIORAL_QS = [
  { question: "Tell me about a time you failed.", tip: "Choose a real failure with real stakes. Show what you learned and what you changed. The mistake itself is less important than your response to it." },
  { question: "Tell me about a time you disagreed with your manager.", tip: "Show that you can hold a position respectfully. Describe how you presented your case (with data or reasoning), how you handled being overruled, and how you still executed effectively." },
  { question: "Describe a time you had to manage competing priorities.", tip: "Name the competing demands. Explain how you triaged (what criteria you used), what you communicated to stakeholders, and what the outcome was." },
  { question: "Tell me about a time you had to influence without authority.", tip: "Cross-functional influence is a critical skill at most levels. Show how you identified what motivated each stakeholder and how you built alignment around a shared outcome." },
  { question: "Describe a situation where you had to deal with a difficult team member.", tip: "Avoid making anyone the villain. Focus on what you did: direct conversation, finding common ground, escalating appropriately when needed." },
  { question: "Tell me about a time you had to make a decision with incomplete information.", tip: "Show your decision-making framework. Name the information you had, what you couldn't know, how you reduced uncertainty where possible, and how you committed once you decided." },
  { question: "Describe your biggest professional achievement.", tip: "Lead with the impact in the first sentence. Context → action → result, with a specific metric. This is not the place for modesty." },
  { question: "Tell me about a time you had to learn something quickly.", tip: "Choose something technically meaningful — not just reading the employee handbook. Show the learning strategy you used and how quickly you became effective." },
];

export default async function CommonInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="40 Most Common Interview Questions (With Strong Answers) — 2025"
        description="The 40 interview questions that appear in nearly every job interview — with strong, specific answers."
        url={`${BASE_URL}/blog/common-interview-questions`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Common Interview Questions", url: `${BASE_URL}/blog/common-interview-questions` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">40 Most Common Interview Questions (With Strong Answers) — 2025</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 14 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Most interview questions fall into predictable categories. This guide covers the 40 questions that appear in nearly every job interview — with strong, specific answers and the thinking behind each one.
            </p>

            <div className="mt-6 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
              <p className="mb-1 font-bold text-[var(--ink)]">How to use this guide</p>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">Don&apos;t memorize these answers. Use them as templates — then replace the details with your own stories, numbers, and specifics. A specific answer that&apos;s uniquely yours is always stronger than a polished generic one.</p>
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The core questions — with strong answers</h2>
            <div className="mt-6 space-y-6">
              {QUESTIONS.map((q) => (
                <div key={q.question} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{q.category}</p>
                  <h3 className="mb-3 text-[16px] font-extrabold text-[var(--ink)]">{q.question}</h3>
                  <p className="mb-2 text-[13px] font-semibold text-[var(--muted)]">Why they ask it: <span className="font-normal">{q.why}</span></p>
                  <p className="mb-3 text-[13px] font-semibold text-[var(--muted)]">How to answer: <span className="font-normal">{q.answer}</span></p>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong answer example</p>
                    <p className="text-[13px] italic leading-6 text-[var(--muted)]">{q.example}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Behavioral interview questions (with coaching tips)</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Behavioral questions follow the STAR method: <strong>Situation</strong>, <strong>Task</strong>, <strong>Action</strong>, <strong>Result</strong>. Prepare 4-5 versatile stories from your experience that you can adapt to different behavioral questions. Here are the 8 behavioral questions that appear most often:
            </p>
            <div className="mt-5 space-y-4">
              {BEHAVIORAL_QS.map((q, i) => (
                <div key={q.question} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</div>
                  <div>
                    <p className="mb-2 font-bold text-[var(--ink)]">{q.question}</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{q.tip}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Questions to ask the interviewer</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Always have 3-4 questions ready. Good questions signal research, strategic thinking, and genuine interest. Weak questions signal unpreparedness.</p>
            <div className="mt-4 space-y-3">
              {[
                { q: "What does success look like in this role in the first 90 days?", why: "Shows you're thinking about performance from day one." },
                { q: "What are the biggest challenges the person in this role will face?", why: "Gets you honest information and shows you can handle hard conversations." },
                { q: "How does this team make decisions? What does alignment look like here?", why: "Reveals culture and management style before you accept the offer." },
                { q: "What's the one thing that would make you say this hire was a 10/10 six months from now?", why: "A bold question that often gets the most honest answer of the interview." },
              ].map((item) => (
                <div key={item.q} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-1.5 font-semibold text-[var(--ink)]">"{item.q}"</p>
                  <p className="text-[13px] text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Prepare your answers in minutes, not hours</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zari&apos;s <Link href="/ai-interview-coach" className="text-[var(--brand)] underline underline-offset-2">AI interview coach</Link> generates role-specific question sets for any job and coaches you through STAR answers live — giving you feedback on structure, specificity, and confidence before the real interview.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice every interview question with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Get a question set tailored to your target role and coach through your answers before the real interview.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
