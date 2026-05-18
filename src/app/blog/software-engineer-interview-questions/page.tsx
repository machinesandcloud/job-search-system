import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Software Engineer Interview Questions — 2025 Complete Guide",
  description:
    "Every category of software engineer interview question with sample answers, difficulty levels, and what interviewers are actually evaluating. Coding, system design, behavioral, and company-specific prep for 2025.",
  keywords: ["software engineer interview questions", "software engineering interview", "coding interview questions", "system design interview questions", "behavioral interview software engineer", "FAANG interview questions 2025", "software engineer interview prep"],
  alternates: { canonical: "/blog/software-engineer-interview-questions" },
  openGraph: {
    title: "Software Engineer Interview Questions — 2025 Complete Guide",
    description: "Every category of software engineer interview question with sample answers and what interviewers are actually evaluating.",
    url: "/blog/software-engineer-interview-questions",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const QUESTION_CATEGORIES = [
  {
    category: "Coding / Data Structures & Algorithms",
    difficulty: "Medium–Hard",
    what_evaluated: "Problem-solving process, edge case awareness, code quality, and ability to optimize. Interviewers care more about your thinking than the optimal solution immediately.",
    sample_questions: [
      "Given an array of integers, find two numbers that sum to a target (Two Sum).",
      "Implement a Least Recently Used (LRU) cache.",
      "Find the longest substring without repeating characters.",
      "Design a data structure that supports O(1) insert, delete, and getRandom.",
      "Given a binary tree, serialize and deserialize it.",
    ],
    how_to_answer: "Think out loud from the start. State the brute force approach first, then optimize. Name the time and space complexity of every solution. Ask clarifying questions before writing code. Test with edge cases (empty input, single element, negatives) before declaring done.",
  },
  {
    category: "System Design",
    difficulty: "Hard (Senior+)",
    what_evaluated: "Architectural thinking, trade-off awareness, scalability intuition, and communication. No single correct answer — interviewers evaluate how you reason about constraints.",
    sample_questions: [
      "Design a URL shortener (like bit.ly).",
      "Design Twitter's feed ranking system.",
      "Design a distributed rate limiter.",
      "Design a notification system that sends 10M push notifications per day.",
      "Design a real-time collaborative document editor (like Google Docs).",
    ],
    how_to_answer: "Start with requirements clarification (scale, consistency requirements, latency targets). Sketch a high-level architecture first. Deep-dive on the hardest component. Proactively name the trade-offs you're making — CAP theorem, consistency vs. availability, read vs. write optimization. End by identifying bottlenecks and what you'd tackle next.",
  },
  {
    category: "Behavioral / STAR",
    difficulty: "Medium",
    what_evaluated: "Culture fit, self-awareness, collaboration patterns, and how you handle conflict and failure. Every top company uses behavioral rounds — they just frame the questions differently.",
    sample_questions: [
      "Tell me about a time you disagreed with a technical decision your team made.",
      "Describe a project where you had to deliver under significant time pressure.",
      "Tell me about the most complex technical problem you've solved.",
      "Give me an example of when you received critical feedback and how you responded.",
      "Tell me about a time you had to work with someone difficult.",
    ],
    how_to_answer: "Use STAR structure (Situation, Task, Action, Result) but lead with the result when the story is strong. Prepare 6-8 core stories that can flex across different question types. Each story should show: clear ownership, specific action you took, and a quantified or concrete result.",
  },
  {
    category: "Coding Design / Object-Oriented Design",
    difficulty: "Medium",
    what_evaluated: "Code organization, abstraction, extensibility, and how you translate requirements to structure before writing implementation.",
    sample_questions: [
      "Design a parking lot system.",
      "Design an elevator system for a 20-floor building.",
      "Design a chess game (classes, interactions).",
      "Design a library management system.",
      "Design a ride-sharing app backend (Uber/Lyft).",
    ],
    how_to_answer: "Identify the entities first (nouns in the requirements). Map relationships and responsibilities before any code. Apply SOLID principles — especially single responsibility and open/closed. Discuss trade-offs explicitly: composition vs. inheritance, interface vs. abstract class.",
  },
  {
    category: "Domain Knowledge / Technical Depth",
    difficulty: "Varies by seniority",
    what_evaluated: "Actual depth of knowledge in the role's domain — not surface familiarity. Senior engineers are expected to know why, not just what.",
    sample_questions: [
      "Explain the difference between process and thread. When would you use each?",
      "How does a database index work? What are the trade-offs of over-indexing?",
      "Explain eventual consistency vs. strong consistency. Give a real use case for each.",
      "What happens when you type a URL into a browser?",
      "Explain how TCP/IP works and when you'd choose UDP instead.",
    ],
    how_to_answer: "Go deep, not broad. Start with the mechanism, then explain the trade-offs, then give a real-world example. Acknowledge what you don't know rather than speculating — interviewers respect 'I don't know this deeply enough to be confident' far more than an incorrect confident answer.",
  },
  {
    category: "Culture and Role Fit",
    difficulty: "Easy–Medium",
    what_evaluated: "Whether you've researched the company, your genuine motivation for the role, and how you'd contribute beyond technical skills.",
    sample_questions: [
      "Why do you want to work at [Company]?",
      "What do you find most technically interesting about our product?",
      "Where do you want to be in 3 years?",
      "What do you look for in an engineering team?",
      "What kind of problems do you find most engaging?",
    ],
    how_to_answer: "Specificity wins. 'I use your product and find the infrastructure challenges interesting' beats 'I've heard great things about your culture.' Research the team's tech blog, recent engineering launches, and specific technical bets the company is making. Connect your specific background to what they're actually building.",
  },
];

const COMPANY_DIFFERENCES = [
  { company: "Google / Alphabet", focus: "Algorithmic depth — LeetCode hard is normal. Strong emphasis on scalability in system design. Behavioral rounds assess Googleyness (collaborative, humble, data-driven)." },
  { company: "Meta", focus: "Fast iteration and product thinking alongside technical depth. System design at scale with emphasis on real-time systems. Behavioral probes for impact and directness." },
  { company: "Amazon", focus: "Leadership Principles are central — every behavioral question maps to an LP. System design is heavy. Bar Raiser round evaluates whether you raise the overall bar." },
  { company: "Apple", focus: "Domain expertise over algorithmic breadth. Design quality and cross-functional thinking matter. Less LP-framework, more craft-oriented behavioral questions." },
  { company: "Microsoft", focus: "Problem-solving breadth across product areas. Azure infrastructure common in system design. Behavioral less rigid than Amazon — more conversational culture fit." },
  { company: "Startups (Series A–C)", focus: "Less algorithmic, more practical. May include take-home projects. Cultural fit and velocity matter more than system design theory. Often test on the specific stack." },
];

const FAQS = [
  { question: "How many LeetCode problems do I need to solve to pass a FAANG coding interview?", answer: "Quality over quantity. 100-150 problems across key patterns (sliding window, two pointers, BFS/DFS, dynamic programming, graphs, trees) is more effective than grinding 400+ randomly. Focus on understanding the pattern each problem teaches rather than memorizing solutions. Practice explaining your thinking out loud — the process matters as much as the answer. For LeetCode specifically: complete the Blind 75 list, then add company-tagged problems for your target companies." },
  { question: "What's the most important thing to practice for a system design interview?", answer: "Practicing the communication structure, not memorizing architectures. Most candidates who fail system design do so because they jump to components before establishing requirements, or propose solutions without naming trade-offs. Practice this loop: clarify requirements → estimate scale → high-level architecture → deep-dive one component → identify bottlenecks → discuss what you'd do next. A well-communicated average design beats a well-designed poorly communicated one." },
  { question: "How do I prepare for behavioral interviews as a software engineer?", answer: "Write down 6-8 stories from your career that demonstrate different situations: a technical decision you disagreed with, a project you led that had setbacks, feedback you received and acted on, a time you went beyond your scope, and your most impactful technical contribution. Practice each story out loud until it's under 2 minutes and leads with the result. Then map each story to the behavioral questions asked most frequently by your target company — you'll find that 6 good stories cover 90% of behavioral questions." },
];

export default async function SoftwareEngineerInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Software Engineer Interview Questions — 2025 Complete Guide"
        description="Every category of software engineer interview question with sample answers and what interviewers are actually evaluating."
        url={`${BASE_URL}/blog/software-engineer-interview-questions`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "SWE Interview Questions", url: `${BASE_URL}/blog/software-engineer-interview-questions` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Software Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Software Engineer Interview Questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Every category — coding, system design, behavioral, OOP, domain depth — with sample questions, what interviewers actually evaluate, and how to answer each type.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={6} label="Interview categories every SWE needs to prepare for" accent="#0D7182" />
            <StatCard value={75} label="Blind 75 — the most-recommended LeetCode problem set for FAANG prep" accent="#7C3AED" />
            <StatCard value={4} suffix=" hrs" label="Recommended daily prep time in the 6 weeks before a FAANG interview loop" accent="#D97706" />
            <StatCard value={8} label="Core behavioral stories that cover 90% of interview questions" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">All 6 interview categories — questions, signals, and how to answer</h2>
          <div className="mt-6 space-y-6">
            {QUESTION_CATEGORIES.map((cat, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-bold text-[var(--ink)] text-[17px]">{cat.category}</p>
                    <span className="rounded-full border border-[var(--border)] bg-white px-3 py-0.5 text-[11px] font-bold text-[var(--muted)]">Difficulty: {cat.difficulty}</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] text-[var(--muted)]"><span className="font-bold">What&apos;s evaluated:</span> {cat.what_evaluated}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Sample questions</p>
                    <ul className="space-y-2">
                      {cat.sample_questions.map((q) => (
                        <li key={q} className="flex gap-2 text-[12.5px] leading-5 text-[var(--ink)]"><span className="text-[var(--brand)] font-bold flex-shrink-0">→</span>{q}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 bg-emerald-50/30">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-3">How to answer</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{cat.how_to_answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How interview focus differs by company</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {COMPANY_DIFFERENCES.map((item) => (
              <div key={item.company} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--brand)] mb-2">{item.company}</p>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to practice with real feedback? Try Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari simulates software engineer interviews with live feedback — behavioral STAR coaching, system design walkthroughs, and coding problem explanations tailored to your target company and level.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
