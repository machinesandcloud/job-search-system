import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Technical Interview Preparation — 8-Week Plan for Engineers (2025)",
  description:
    "A structured 8-week technical interview preparation plan covering coding, system design, and behavioral — with weekly focus areas, resource recommendations, and what to practice at each stage. Built for engineers targeting FAANG and top-tier companies.",
  keywords: ["technical interview preparation", "software engineer interview prep", "how to prepare for technical interview", "coding interview prep plan", "system design interview prep", "FAANG interview preparation 2025", "8 week interview prep"],
  alternates: { canonical: "/blog/technical-interview-preparation" },
  openGraph: {
    title: "Technical Interview Preparation — 8-Week Plan for Engineers (2025)",
    description: "A structured 8-week prep plan for technical interviews at FAANG and top-tier companies. Weekly focus areas and resources.",
    url: "/blog/technical-interview-preparation",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const EIGHT_WEEK_PLAN = [
  { week: "Week 1–2", phase: "Foundation", focus: "Data structures and core algorithms", daily: "2–3 LeetCode Easy problems, then move to Medium. Topics: arrays, strings, hash maps, two pointers, sliding window.", key_resource: "LeetCode Explore cards for each data structure. Practice explaining your solution out loud — not just getting it right silently." },
  { week: "Week 3–4", phase: "Depth", focus: "Trees, graphs, and recursion", daily: "2 LeetCode Medium problems per day. Topics: binary trees, BFS/DFS, graph traversal, backtracking, dynamic programming intro.", key_resource: "Blind 75 problem list — work through the tree and graph sections specifically. Spend time on problems you find hard, not problems you can solve easily." },
  { week: "Week 5", phase: "System Design Foundations", focus: "System design fundamentals", daily: "1 system design problem per day — spend 45 minutes treating it like a real interview. Topics: URL shortener, rate limiter, notification system, key-value store.", key_resource: "System Design Primer on GitHub. The goal is to internalize the communication structure: requirements → scale estimate → high-level architecture → deep dive → bottlenecks." },
  { week: "Week 6", phase: "System Design Depth", focus: "Complex system design and trade-offs", daily: "1 complex system design problem. Topics: distributed databases, real-time systems (chat, collaborative editing), recommendation systems, search infrastructure.", key_resource: "Engineering blogs of your target companies. Stripe, Airbnb, Netflix, and Uber all publish deep engineering content that shows how real systems are built." },
  { week: "Week 7", phase: "Behavioral Prep", focus: "STAR stories and company-specific behavioral", daily: "Write and practice 2 behavioral stories per day. Map each story to the question types your target company asks most. Record yourself and review for filler words, story length, and result specificity.", key_resource: "Zari's behavioral coaching — practice each story with AI feedback on STAR structure and specificity before you go live with a human interviewer." },
  { week: "Week 8", phase: "Full Simulation", focus: "End-to-end mock interviews", daily: "1-2 full mock interviews per day — coding (45 min), system design (45 min), behavioral (30 min). Prioritize live practice over more study. You learn more from simulating the real interview than from additional problem-solving.", key_resource: "interviewing.io or Pramp for live technical practice. Zari for behavioral and communication simulation. Record every mock and identify your top 3 failure modes." },
];

const COMMON_FAILURE_MODES = [
  { mode: "Solving silently", fix: "Interviewers evaluate your thinking, not just your answer. Practice narrating your approach before writing any code. This is a skill that requires deliberate practice — it doesn't happen automatically." },
  { mode: "Skipping edge cases", fix: "Before declaring done, test: empty input, single element, all-same elements, negative numbers, overflow. Say these out loud. Interviewers who see you proactively test edge cases add positive signal." },
  { mode: "Jumping to code without clarifying", fix: "The first 2-3 minutes of a coding interview are for clarifying the problem. Ask about input constraints, edge case handling, and expected output format. Candidates who ask good clarifying questions signal senior-level thinking." },
  { mode: "Over-engineering system design", fix: "A simple, clearly communicated architecture with explicit trade-off acknowledgment beats a complex architecture poorly explained. Start with the simplest solution that could work, then add complexity with justification." },
  { mode: "Behavioral stories without results", fix: "Every STAR story must end with a concrete result — not 'it went well' or 'we finished the project.' Quantify: percent improvement, dollar impact, time saved, users affected. If you can't quantify, describe the scale and significance specifically." },
];

const FAQS = [
  { question: "How much time per day should I spend preparing for technical interviews?", answer: "2-4 hours per day for 6-8 weeks is the typical effective range. Less than 2 hours/day makes the preparation too fragmented to build intuition. More than 4-5 hours/day leads to diminishing returns and burnout. Consistency matters more than any single day's volume — 2 focused hours daily for 8 weeks outperforms 8 hours on weekends only. The most important practice is thinking out loud while solving, which can only happen with sustained focused sessions." },
  { question: "Should I focus on breadth (many problems) or depth (mastering patterns)?", answer: "Patterns over problems. There are ~15 core algorithmic patterns that cover 80%+ of coding interview questions: two pointers, sliding window, BFS/DFS, backtracking, dynamic programming (2 types), merge sort, binary search, and a few others. Deeply understanding each pattern — when to apply it, how to recognize it, what the time/space complexity is — and solving 5-10 problems of each type is more effective than solving 300 random problems. The Blind 75 is a well-curated list that hits the core patterns efficiently." },
  { question: "How do I know when I'm ready to start interviewing?", answer: "You're ready when you can consistently solve LeetCode mediums in under 20 minutes with clean code and out-loud explanation, you can whiteboard a system design problem structure in 5 minutes and discuss trade-offs for 40 minutes, and you have 6 strong behavioral stories that flex across different question types. You don't need to be perfect before interviewing — companies also expect some nervousness, and interviewing itself is practice. Over-preparing to avoid rejection often leads to missing application windows." },
];

export default async function TechnicalInterviewPreparationPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Technical Interview Preparation — 8-Week Plan for Engineers (2025)" description="A structured 8-week prep plan for technical interviews at FAANG and top-tier companies." url={`${BASE_URL}/blog/technical-interview-preparation`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Technical Interview Preparation", url: `${BASE_URL}/blog/technical-interview-preparation` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Technical Interview Preparation</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">A structured 8-week plan — coding, system design, and behavioral — with weekly focus areas, resources, and the most common failure modes to eliminate before your interview loop.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={8} suffix=" wks" label="Recommended preparation timeline for FAANG-level technical interviews" accent="#0D7182" />
            <StatCard value={15} label="Core algorithmic patterns that cover 80%+ of coding interview questions" accent="#7C3AED" />
            <StatCard value={6} label="Behavioral stories needed to cover 90% of behavioral interview questions" accent="#059669" />
            <StatCard value={5} label="Most common failure modes — each worth eliminating before your loop" accent="#DC2626" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 8-week preparation plan — week by week</h2>
          <div className="mt-6 flex flex-col gap-0">
            {EIGHT_WEEK_PLAN.map((item, i) => (
              <div key={i} className="flex gap-4 border-b border-[var(--border)] py-5 last:border-0">
                <div className="flex-shrink-0 w-20">
                  <span className="inline-block rounded-lg bg-[var(--brand)] px-2.5 py-1 text-[11px] font-bold text-white text-center w-full">{item.week}</span>
                  <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] text-center">{item.phase}</p>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[var(--ink)] mb-1">{item.focus}</p>
                  <p className="text-[13px] leading-5 text-[var(--muted)] mb-2">{item.daily}</p>
                  <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-0.5">Key resource</p>
                    <p className="text-[12.5px] text-emerald-800">{item.key_resource}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 most common failure modes — and how to fix each</h2>
          <div className="mt-6 space-y-4">
            {COMMON_FAILURE_MODES.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <div className="flex gap-3 items-start">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-red-600">{i + 1}</span>
                  <div>
                    <p className="font-bold text-red-700">{item.mode}</p>
                    <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]"><span className="font-bold text-emerald-700">Fix: </span>{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to practice? Zari coaches every stage of your prep.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches behavioral prep (STAR feedback, company-specific questions), system design structure, and salary negotiation — the three areas where preparation most directly affects offer rate and compensation.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
