import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "First 90 Days in a New Job — How to Make an Impact Fast",
  description: "How to succeed in your first 90 days at a new job. The 30-60-90 day framework, how to build credibility fast, common new job mistakes, and how to position yourself for growth.",
  keywords: ["first 90 days new job", "30 60 90 day plan new job", "new job tips", "how to succeed in a new job", "first 30 days new job", "first 90 days strategy", "new job advice 2025", "onboarding tips", "starting new job tips", "how to make an impact in a new job"],
  alternates: { canonical: "/blog/first-90-days-new-job" },
  openGraph: { title: "First 90 Days in a New Job — How to Make an Impact Fast", description: "The 30-60-90 day framework for new job success — how to build credibility, avoid early mistakes, and position yourself for growth.", url: "/blog/first-90-days-new-job" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What should you accomplish in the first 30 days of a new job?", answer: "The first 30 days should be almost entirely focused on listening and learning, not doing and changing. Key objectives: (1) Map the landscape — understand who the key stakeholders are, what the informal power structure looks like (it's different from the org chart), and where the bodies are buried (the failed initiatives, the politics, the tensions). (2) Build one-on-one relationships — schedule 1:1s with your direct reports, peers, and key stakeholders. Listen more than you speak. (3) Understand how decisions actually get made — not the stated process, but the real one. (4) Identify your quick wins — low-risk, visible improvements you can make in months 2–3. Don't act on them yet. (5) Learn your manager's priorities and communication preferences — this is the most important relationship to calibrate early." },
  { question: "When should you start making changes in a new job?", answer: "The general rule: listen in month 1, plan in month 2, act in month 3. Making significant changes before you fully understand the context is the most common new-leader mistake. The reason people make it: they were hired partly because they had ideas and experience; it feels like inaction to hold back. The reality: people don't trust advice from someone who doesn't yet understand the situation. Even good ideas get rejected when they come from someone who's only been there 3 weeks. There are exceptions: if the situation is genuinely urgent, if you're brought in specifically to turn something around quickly, or if the change is clearly low-risk and has broad support. But absent these, 90 days of listening before major action is the right default." },
  { question: "How do you build credibility fast in a new job?", answer: "Credibility is built fastest by: (1) Delivering on small commitments reliably — if you say you'll send something by Friday, send it by Thursday. Under-promise and over-deliver consistently in months 1–3. (2) Asking good questions — in early meetings, asking insightful questions signals competence more than sharing opinions. 'What does success look like for this project?' is better than immediately proposing solutions. (3) Being visibly prepared — reading background materials thoroughly before meetings, knowing the company's strategy, understanding the product or service. (4) Demonstrating that you understand the context before offering solutions. (5) Supporting your manager's priorities — even if you disagree with some of them. Your first 90 days is not the time to fight every battle." },
  { question: "What are the most common mistakes people make in a new job?", answer: "The most consequential early mistakes: (1) Talking too much, listening too little — especially in the first month. (2) Bad-mouthing your previous company or colleagues — it damages trust immediately. (3) Making commitments you can't keep — early in a new role, people are watching how reliable you are. One missed deadline in week 2 signals unreliability. (4) Assuming the way you did things at your last company is the right way here. (5) Neglecting relationships with peers — many people focus on their manager and direct reports but ignore lateral relationships that are equally important. (6) Declaring what you'll change before you understand why things are the way they are. There's usually a reason, even if it's not immediately obvious." },
];

const PLAN = [
  { month: "Days 1–30: Learn", goal: "Listen, map, and understand", actions: ["Schedule 1:1s with all direct reports, peers, and key stakeholders", "Learn the informal org chart — who influences what", "Understand your manager's priorities and communication style", "Identify the 3 most important problems the team is facing", "Avoid proposing major changes"] },
  { month: "Days 31–60: Plan", goal: "Synthesize and identify opportunities", actions: ["Share your observations with your manager — ask for feedback", "Identify 2–3 high-impact, achievable quick wins", "Build a draft of your 90-day priorities and share it", "Deepen relationships with your key stakeholders", "Make small contributions that demonstrate your value"] },
  { month: "Days 61–90: Act", goal: "Deliver and build momentum", actions: ["Execute your quick wins — get something shipped or solved", "Establish your regular routines (1:1 cadence, team meetings)", "Propose your longer-term priorities and goals for months 4–12", "Ask for explicit feedback on how you're doing", "Identify your first visible success story to share"] },
];

export default async function First90DaysNewJobPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="First 90 Days in a New Job — How to Make an Impact Fast"
        description="The 30-60-90 day framework for new job success — how to build credibility, avoid early mistakes, and position yourself for growth."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/first-90-days-new-job`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "First 90 Days New Job", url: `${BASE_URL}/blog/first-90-days-new-job` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            New Job · 30-60-90 Plan · Onboarding
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            First 90 Days<br />
            <span className="text-white/50">in a New Job</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The 30-60-90 day playbook for making an impact fast — how to listen right, build credibility, avoid the most common mistakes, and position yourself for growth.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 8 min read · For all levels</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">The 30-60-90 day framework</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Each phase has a different primary goal. Don&apos;t rush to the Action phase before the Learn phase is complete.</p>
          <div className="space-y-4">
            {PLAN.map(({ month, goal, actions }) => (
              <div key={month} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-1 text-[11px] font-bold uppercase text-[#059669]">{month}</div>
                <h3 className="mb-3 font-bold text-[15px]">Goal: {goal}</h3>
                <ul className="space-y-1">
                  {actions.map(a => <li key={a} className="text-[13px] text-[var(--muted)] flex gap-2"><span className="flex-shrink-0 text-[#059669]">→</span>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land the job first — then nail the first 90 days.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari&apos;s AI career coaching helps you get the offer — resume optimization, interview prep, and salary negotiation. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
