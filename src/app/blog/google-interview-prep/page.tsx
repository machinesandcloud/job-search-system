import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Google Interview Prep — The Complete Guide to Passing Google's Hiring Process (2025)",
  description:
    "How Google's hiring process actually works — recruiter screen, technical phone screens, onsite rounds, hiring committee, and offer. Coding strategy, Googleyness, system design, and comp structure explained.",
  keywords: ["Google interview prep", "how to prepare for Google interview", "Google technical interview", "Google hiring process", "Google coding interview", "Googleyness interview", "Google system design interview", "Google SWE interview tips"],
  alternates: { canonical: "/blog/google-interview-prep" },
  openGraph: {
    title: "Google Interview Prep — The Complete Guide to Passing Google's Hiring Process (2025)",
    description: "From recruiter screen to hiring committee: how Google's interview process works and how to prepare for every stage.",
    url: "/blog/google-interview-prep",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PROCESS_STAGES = [
  {
    stage: "Recruiter screen",
    duration: "15–20 minutes",
    what: "A Google recruiter reaches out — typically via LinkedIn or your application. This call covers your background, what you're looking for, comp expectations, and timeline. It's mostly a fit check, not a technical screen.",
    howToPass: "Be concrete about what you want (role, team type, impact). Have a clear current comp figure ready. Express genuine interest in Google specifically — recruiters talk to hundreds of people and can tell when someone is treating this as a backup. Ask about team fit and what the role's first 90 days look like.",
  },
  {
    stage: "Technical phone screen(s)",
    duration: "45–60 minutes each, 1–2 rounds",
    what: "A software engineer (not a recruiter) asks you to solve 1–2 coding problems in a shared editor like Google Docs or Coderpad. Problems are typically Medium Leetcode difficulty, sometimes Hard. Focus: data structures, algorithms, code quality.",
    howToPass: "Think out loud before you type. State your approach, time/space complexity, and edge cases before writing a single line. Google engineers score how you reason, not just whether your code compiles. A working solution with good communication beats a perfect solution in silence.",
  },
  {
    stage: "Virtual onsite",
    duration: "4–5 rounds, 45 minutes each",
    what: "The full interview loop. Typically: 2 coding rounds, 1 system design round (for L4+), 1 behavioral round, and sometimes a role-specific round (e.g., ML for ML roles). All conducted over video with a shared coding environment.",
    howToPass: "Treat each round as independent. A weak round doesn't automatically eliminate you — the hiring committee weighs the full packet. Don't rush: take a moment to think at the start of each problem instead of typing immediately. If you're stuck, say so and walk through your reasoning — interviewers can give hints if you've shown structured thinking.",
  },
  {
    stage: "Hiring committee review",
    duration: "1–2 weeks after onsite",
    what: "No single interviewer decides your fate. A group of senior engineers who didn't interview you reads your packet — feedback, scores, and resume — and votes. This is unique to Google. Your fate is in the hands of people who've never met you.",
    howToPass: "You can't influence the committee directly — but your interviewers write the feedback. Make their job easy by being memorable, specific, and articulate. Interviewers summarize you in writing; the clearer your thinking, the better the summary.",
  },
  {
    stage: "Compensation committee",
    duration: "1 week after HC approval",
    what: "Google sets your level (L3, L4, L5, etc.) and comp package through a separate committee. You may be approved at a different level than what you interviewed for if you performed significantly above or below expectations.",
    howToPass: "Have a competing offer or counter-offer ready. Google has salary bands per level and will negotiate within the band. Equity (GSUs) is often where the most negotiation room exists. The first offer is almost never the best offer.",
  },
];

const EVALUATION_CRITERIA = [
  {
    criterion: "General cognitive ability",
    description: "Google cares about how you think more than what you know. This isn't IQ — it's your ability to structure a novel problem, identify assumptions, and think through implications. It shows up in how you approach coding problems and how you reason through ambiguous behavioral questions.",
    example: "When stuck on a coding problem, don't stare at the screen. Say: 'I know brute force is O(n²) — I'm trying to think about whether a hash map could reduce the lookup cost to O(1).' That kind of visible reasoning is what scores well.",
  },
  {
    criterion: "Leadership",
    description: "Leadership at Google is not about managing people. Even for individual contributors, they want to see evidence that you took initiative, influenced others without authority, and drove outcomes beyond your job description. Every level is expected to lead something.",
    example: "Interviewers specifically look for: 'I noticed this problem wasn't getting solved, so I did X' rather than 'my manager asked me to do X.' If you can only point to things you were assigned, you'll score low on leadership regardless of seniority.",
  },
  {
    criterion: "Googleyness",
    description: "The most misunderstood criterion. Googleyness is not about liking Google's products or having the right personality. It's about: comfort with ambiguity, intellectual humility (you can be wrong), bias toward action, and being enjoyable to work with under pressure. Google explicitly does NOT want people who are arrogant or who shut down when they don't know something.",
    example: "When an interviewer says 'your approach won't scale — how would you change it?', the Googley response is curiosity: 'Good point — what's the constraint I'm missing?' The non-Googley response is defensiveness: 'It would scale because...'",
  },
  {
    criterion: "Role-related knowledge",
    description: "For software roles: your ability to actually write good code, design systems, and understand the domain of the role. This is the easiest criteria to prep for — it's the technical competency check. However, it's NOT the most heavily weighted. You can have excellent technical skills and still fail on the other three.",
    example: "Write clean, readable code with meaningful variable names. Comment on non-obvious choices. Handle edge cases explicitly. Don't just solve the problem — demonstrate that you write the kind of code you'd want to read in a code review.",
  },
];

const CODING_TOPICS = [
  { topic: "Arrays and strings", priority: "Critical", note: "Sliding window, two pointers, prefix sums — show up in almost every Google coding round." },
  { topic: "Hash maps and sets", priority: "Critical", note: "Used to optimize brute-force O(n²) solutions to O(n). Know when to reach for a map instinctively." },
  { topic: "Trees and graphs", priority: "Critical", note: "BFS, DFS, topological sort. Google loves tree traversal problems — binary trees, N-ary trees, and graph problems disguised as trees." },
  { topic: "Dynamic programming", priority: "High", note: "Not always a direct DP problem, but memoization and recognizing subproblems appears in many Hard problems." },
  { topic: "Heaps and priority queues", priority: "High", note: "K-th largest, merge K sorted lists, scheduling problems — common in onsite rounds." },
  { topic: "System design (L4+)", priority: "Critical for senior", note: "Design a URL shortener, design Twitter's feed, design a distributed cache. Scale matters: think billions of users, not thousands." },
];

const FAQS = [
  { question: "How long does the Google interview process take?", answer: "From first recruiter contact to offer, expect 6–10 weeks. The phone screens happen in weeks 1–3. The onsite is typically 2–3 weeks after. Hiring committee review takes 1–2 weeks. Offer and negotiation takes another 1–2 weeks. Timelines can compress if you have competing offers — tell your recruiter if you have deadlines and they will expedite." },
  { question: "What programming language should I use for Google coding interviews?", answer: "Python, Java, C++, or Go are all well-accepted at Google. Python is the most popular choice because it's concise — you can express more with less code, which leaves more time for problem-solving. Google has used Go internally for years, so it's accepted without hesitation. Avoid JavaScript if you can — it's allowed but interviewers are less familiar with its edge cases." },
  { question: "How competitive is the Google interview process?", answer: "Acceptance rates at Google are estimated at 0.2–0.5% of applicants. Most candidates who reach the onsite stage are technically qualified — the differentiator is usually Googleyness and cognitive ability signals. The hiring committee process means that a single weak round rarely eliminates you, but consistent mediocre scores across rounds will. Preparation specifically for Google's criteria (not just general Leetcode grinding) materially improves outcomes." },
  { question: "Can I negotiate the Google offer?", answer: "Yes — and you should. Google's first offer is rarely their best. The most negotiable components are base salary (within your level's band) and RSU count. If you have competing offers, present them — Google will match or beat them to close candidates they want. Signing bonuses are also common when Google is competing for a candidate. The offer doesn't expire during negotiation; recruiters expect it." },
];

export default async function GoogleInterviewPrepPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Google Interview Prep — The Complete Guide to Passing Google's Hiring Process (2025)"
        description="From recruiter screen to hiring committee: how Google's interview process works and how to prepare for every stage."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/google-interview-prep`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Google Interview Prep", url: `${BASE_URL}/blog/google-interview-prep` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interview Prep</span>
            <span className="text-[11px] text-white/30">15 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Google interview prep<br /><span className="gradient-text-animated">the complete guide</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Google&apos;s interview process is different from every other company. The hiring committee model, the Googleyness criterion, the level-setting compensation committee — none of it works the way candidates expect. Here&apos;s the full picture.
          </p>
        </div>
      </section>

      {/* Process stages */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Google&apos;s hiring process — stage by stage</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Most prep guides skip the process and jump straight to Leetcode. Understanding what happens at each stage and why changes how you prep for it.</p>
          <div className="mt-8 space-y-5">
            {PROCESS_STAGES.map((s, i) => (
              <div key={s.stage} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-start gap-4 border-b border-[var(--border)] bg-white px-6 py-5">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{s.stage}</p>
                    <p className="text-[12px] text-[var(--brand)]">{s.duration}</p>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{s.what}</p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">How to pass this stage</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.howToPass}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation criteria */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 criteria Google actually scores you on</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Every Google interviewer fills out a structured scorecard after your session. These are the 4 dimensions — understanding them changes what you optimize for.</p>
          <div className="mt-8 space-y-6">
            {EVALUATION_CRITERIA.map((c) => (
              <div key={c.criterion} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">{c.criterion}</p>
                <p className="text-[14px] leading-7 text-[var(--muted)]">{c.description}</p>
                <div className="mt-4 rounded-xl bg-[var(--bg)] px-4 py-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">What it looks like in the room</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{c.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coding topics */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Coding topics by priority for Google</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Not all Leetcode topics are equally common at Google. These appear with the highest frequency across engineering interviews at every level.</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-[1fr_auto] border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
              <span>Topic</span>
              <span>Priority</span>
            </div>
            {CODING_TOPICS.map((t, i) => (
              <div key={t.topic} className={`grid grid-cols-[1fr_auto] items-start gap-4 px-5 py-4 ${i < CODING_TOPICS.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                <div>
                  <p className="font-semibold text-[var(--ink)]">{t.topic}</p>
                  <p className="mt-0.5 text-[13px] text-[var(--muted)]">{t.note}</p>
                </div>
                <span className={`mt-0.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap ${t.priority === "Critical" || t.priority === "Critical for senior" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Google interview FAQs</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get AI coaching for your Google interview</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you on behavioral answers with STAR evaluation, Googleyness framing, and how to articulate your thinking the way Google interviewers score highest.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
