import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Situational Interview Questions — Examples and Best Answers (2025)",
  description:
    "Situational interview questions describe a hypothetical scenario and ask what you would do. Unlike behavioral questions (what did you do), they test judgment and decision-making under constructed conditions. Full list of examples with strong answer frameworks.",
  keywords: ["situational interview questions", "situational interview questions and answers", "hypothetical interview questions", "situational vs behavioral interview questions", "how to answer situational interview questions 2025"],
  alternates: { canonical: "/blog/situational-interview-questions" },
  openGraph: {
    title: "Situational Interview Questions — Examples and Best Answers (2025)",
    description: "Situational questions test judgment under hypothetical conditions. Unlike behavioral questions, there's no specific past story required — but a structured answer framework is essential.",
    url: "/blog/situational-interview-questions",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SITUATIONAL_VS_BEHAVIORAL = {
  situational: { format: "'If you were in this situation, what would you do?'", what_it_tests: "Judgment, decision-making frameworks, values, and how you think through ambiguous or difficult scenarios", when_used: "Common in interviews for management and leadership roles, roles requiring significant judgment (healthcare, law, finance), and at companies that prefer forward-looking assessment to past performance review" },
  behavioral: { format: "'Tell me about a time when you...'", what_it_tests: "What you've actually done — using past behavior as a predictor of future behavior", when_used: "Standard across most industries and role types; particularly common in competency-based interviews" },
};

const ANSWER_FRAMEWORK = {
  name: "STAR-H (Situation, Task, Action, Result + Hypothetical bridge)",
  steps: [
    { step: "Clarify the scenario if needed", detail: "For complex hypotheticals, it's appropriate to ask 1–2 clarifying questions before answering. This signals analytical thinking rather than rushing to a conclusion. 'Just to make sure I understand the context — is this a situation where I have authority to make this decision directly, or would I need to escalate?'" },
    { step: "Name your decision framework", detail: "Don't just describe what you would do — describe how you would think about the decision. What information would you gather? What stakeholders would you consider? What tradeoffs would you weigh? This is what interviewers are actually measuring." },
    { step: "State your specific course of action", detail: "Be decisive. Wishy-washy answers that hedge on everything ('it depends...') signal lack of judgment. Give a specific answer while acknowledging the nuances that would inform it." },
    { step: "Connect to a real past experience if possible", detail: "The strongest answers briefly bridge to a related real situation: 'I haven't faced this exact scenario, but something similar happened when...' This validates your hypothetical reasoning with evidence from your actual experience." },
    { step: "Name the outcome you'd aim for", detail: "End with what success looks like — what would constitute a good resolution to the scenario? This shows you're oriented toward outcomes, not just process." },
  ],
};

const QUESTION_EXAMPLES = [
  {
    category: "Conflict and difficult conversations",
    questions_and_answers: [
      {
        question: "If a team member consistently missed deadlines and it was impacting the project, what would you do?",
        strong_answer: "First, I'd have a private conversation to understand what's driving the misses — it's often workload, unclear priorities, or an obstacle they haven't escalated. I'd want to understand before concluding it's a performance issue. If it's workload or clarity, we fix that together. If it's a capability or motivation issue, I'd set clear expectations, create a short-term recovery plan with specific checkpoints, and document it. If the behavior continued after support and clear expectations, I'd escalate to HR and begin a formal performance process. The instinct to avoid the conversation is always wrong — the team sees the behavior and is watching how leadership responds.",
        what_it_demonstrates: "Direct communication style, root-cause thinking, fairness, and escalation judgment",
      },
      {
        question: "How would you handle a situation where your manager asks you to do something you disagree with?",
        strong_answer: "I'd ask for a conversation to share my perspective before executing. I'd come with a specific concern and, if possible, an alternative approach. I don't think my role is to just implement what I'm told without critical thinking — that's not what good managers want from their team. But I also understand that my manager has context I may not have, and there's usually a reason for the direction. If after the conversation I understand the rationale and still disagree, I'd execute faithfully and note my concern in writing so there's a record. The one exception: if the request is ethically wrong, I wouldn't execute it regardless of seniority.",
        what_it_demonstrates: "Psychological safety, professional maturity, ethical clarity",
      },
    ],
  },
  {
    category: "Ambiguity and prioritization",
    questions_and_answers: [
      {
        question: "If you started a new role and found that your priorities weren't clear, how would you handle the first 30 days?",
        strong_answer: "I'd start by getting explicit alignment with my manager in the first week — I'd ask directly: 'What would make the first 90 days a success? What are the 2–3 most important things I should focus on first?' I'd also do listening sessions with key stakeholders and team members to build context quickly. By week 3, I'd document my understood priorities and share it with my manager for validation — that document surfacing a misalignment is itself a valuable early win. I wouldn't wait to be handed clarity; I'd create it and validate it.",
        what_it_demonstrates: "Proactive clarity-seeking, stakeholder management, written communication habit",
      },
      {
        question: "If you had too many competing priorities and couldn't do all of them, how would you decide what to do?",
        strong_answer: "I'd make the tradeoffs explicit rather than silently deciding. I'd first try to understand the urgency and impact of each competing item — sometimes what feels urgent is actually low-impact, and the high-impact work can look quiet. Then I'd bring the conflict to whoever needs to make the call: either my manager or the stakeholders involved. I'd come with a recommendation, not just the problem: 'I can do A and B by Thursday, or A and C — B would slip to next week. Given our current priorities, I recommend A and C, but I want to flag this and make sure you agree.' This creates alignment and removes me from the role of silently making decisions that affect others.",
        what_it_demonstrates: "Prioritization framework, upward communication, stakeholder transparency",
      },
    ],
  },
  {
    category: "Ethical and values-based scenarios",
    questions_and_answers: [
      {
        question: "If you discovered a colleague was taking credit for your work, what would you do?",
        strong_answer: "I'd address it directly with the colleague first — not accusatorially, but clearly. Something like: 'I noticed you presented [X] as your work in today's meeting — can we talk about how we represent our collaboration going forward?' Most of the time, this resolves it. If it continued, I'd discuss it with my manager — framing it not as 'my colleague stole my credit' but as 'I want to make sure our team's contributions are visible and attributed accurately.' I'd also make my own work more visible proactively going forward — sharing updates directly with stakeholders rather than only through the colleague.",
        what_it_demonstrates: "Direct conflict resolution, upward communication framing, self-advocacy",
      },
      {
        question: "If a client asked you to do something that was technically legal but felt wrong, what would you do?",
        strong_answer: "I'd push back on it — professionally and specifically. I'd name what concerns me about the request: 'I'm not comfortable with this approach because [specific reason] — I think it creates reputational risk / treats users unfairly / sets a precedent I'd want to avoid.' I'd also offer an alternative that achieves the client's underlying goal without the element I find problematic. If they insisted, I'd escalate internally before proceeding — this is exactly the situation where I'd want my manager and legal informed. My general principle is that the technical legality of something is the floor, not the ceiling of what we should do.",
        what_it_demonstrates: "Ethical judgment, client management, escalation sense",
      },
    ],
  },
];

const FAQS = [
  { question: "What's the difference between situational and behavioral interview questions?", answer: "Behavioral questions ask about past actions: 'Tell me about a time when you...' They use past behavior as a predictor of future performance. Situational questions describe a hypothetical future scenario: 'If you were in this situation, what would you do?' They test your judgment and decision-making framework directly. Most interviews mix both types. Behavioral questions are generally considered more predictive because they're grounded in real experience — but situational questions are valuable for assessing judgment in novel scenarios you may not have faced yet. Prepare for both: have your STAR story library for behavioral questions and a clear decision-making framework for situational ones." },
  { question: "How do you answer situational interview questions you have no experience with?", answer: "Be honest about the gap, then demonstrate your thinking anyway: 'I haven't faced this exact scenario, but here's how I would approach it...' Interviewers asking hypothetical questions don't necessarily expect you to have lived the exact situation — they want to see your reasoning process. Walk through how you'd gather information, what factors you'd weigh, what stakeholders you'd involve, and what decision you'd make. If there's a related experience from your history, bridge to it: 'Something similar happened when...' — this grounds your hypothetical answer in real evidence." },
  { question: "How long should a situational interview answer be?", answer: "2–3 minutes is the right range. Long enough to demonstrate real thinking; short enough that you don't lose the interviewer. The structure: 30 seconds to frame your approach, 60–90 seconds on your specific course of action and reasoning, 30 seconds on the outcome you'd aim for. If you're bridging to a real past example, add 30 seconds. If you're going significantly beyond 3 minutes, you've stopped demonstrating judgment and started demonstrating inability to synthesize — which is itself an answer to the question." },
];

export default async function SituationalInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Situational Interview Questions — Examples and Best Answers (2025)"
        description="Situational questions test judgment under hypothetical conditions. Unlike behavioral questions, there's no specific past story required — but a structured answer framework is essential."
        url={`${BASE_URL}/blog/situational-interview-questions`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Situational Interview Questions", url: `${BASE_URL}/blog/situational-interview-questions` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Situational Questions</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Situational Interview Questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Situational questions put you in a hypothetical scenario and ask what you&apos;d do. Unlike behavioral questions, they&apos;re not asking for a past story — they&apos;re measuring your judgment and decision-making framework directly.
          </p>
        </div>
      </section>

      {/* Situational vs behavioral */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Situational vs behavioral questions</h2>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-2">Situational</p>
              <p className="text-[13px] font-semibold text-[var(--ink)] italic mb-2">{SITUATIONAL_VS_BEHAVIORAL.situational.format}</p>
              <p className="text-[12.5px] leading-5 text-[var(--muted)] mb-2"><span className="font-semibold">Tests:</span> {SITUATIONAL_VS_BEHAVIORAL.situational.what_it_tests}</p>
              <p className="text-[12.5px] leading-5 text-[var(--muted)]"><span className="font-semibold">Common in:</span> {SITUATIONAL_VS_BEHAVIORAL.situational.when_used}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Behavioral</p>
              <p className="text-[13px] font-semibold text-[var(--ink)] italic mb-2">{SITUATIONAL_VS_BEHAVIORAL.behavioral.format}</p>
              <p className="text-[12.5px] leading-5 text-[var(--muted)] mb-2"><span className="font-semibold">Tests:</span> {SITUATIONAL_VS_BEHAVIORAL.behavioral.what_it_tests}</p>
              <p className="text-[12.5px] leading-5 text-[var(--muted)]"><span className="font-semibold">Common in:</span> {SITUATIONAL_VS_BEHAVIORAL.behavioral.when_used}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Answer framework */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The answer framework: {ANSWER_FRAMEWORK.name}</h2>
          <div className="mt-6 space-y-3">
            {ANSWER_FRAMEWORK.steps.map((s, i) => (
              <div key={s.step} className="rounded-xl border border-[var(--border)] p-5 flex gap-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-extrabold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{s.step}</p>
                  <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Question examples */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Examples with strong answers</h2>
          <div className="mt-6 space-y-8">
            {QUESTION_EXAMPLES.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-[14px] font-bold uppercase tracking-wider text-[var(--muted)] mb-4">{cat.category}</h3>
                <div className="space-y-5">
                  {cat.questions_and_answers.map((qa) => (
                    <div key={qa.question} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                      <div className="border-b border-[var(--border)] px-5 py-3 bg-[var(--dark)]">
                        <p className="text-[13px] font-semibold text-white/80 italic">&ldquo;{qa.question}&rdquo;</p>
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">Strong answer approach</p>
                        <p className="text-[13px] leading-6 text-[var(--muted)]">{qa.strong_answer}</p>
                        <div className="mt-3 rounded-xl bg-[var(--bg)] p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">What it demonstrates</p>
                          <p className="text-[12.5px] text-[var(--muted)]">{qa.what_it_demonstrates}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari coaches your situational and behavioral answers for the specific role — then evaluates your delivery.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari generates role-specific situational and behavioral questions from the job description, evaluates your judgment in answers, and coaches you through the full interview loop. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
