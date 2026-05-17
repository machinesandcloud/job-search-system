import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Second Interview Tips — How to Prepare & What's Different (2025)",
  description:
    "A second interview means you passed the initial screen — but the criteria for the second round are fundamentally different. Hiring managers who liked you in round one are now testing for fit at a deeper level: decision-making, culture, and whether they can see themselves working with you daily. How to prepare specifically for round two.",
  keywords: ["second interview tips", "how to prepare for a second interview", "second round interview", "final interview tips", "second interview questions", "how to ace a second interview", "second interview what to expect 2025"],
  alternates: { canonical: "/blog/second-interview-tips" },
  openGraph: {
    title: "Second Interview Tips — How to Prepare & What's Different (2025)",
    description: "A second interview tests different things than the first. Preparation that worked in round one won't be enough in round two. Here's what changes and how to prepare.",
    url: "/blog/second-interview-tips",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_CHANGES = [
  {
    dimension: "The stakes are higher and the evaluators change",
    detail: "First interviews are usually with a recruiter or hiring manager — they're screening for basic qualifications and obvious red flags. Second interviews bring in the team you'd actually work with, senior leaders, cross-functional stakeholders, or future peers. Each person in the room is asking a different version of the same question: 'Can I work with this person effectively?' Your preparation needs to account for the multi-stakeholder audience, not just the hiring manager.",
  },
  {
    dimension: "The questions go deeper",
    detail: "Round one questions are often broad: tell me about yourself, why this role, walk me through your background. Round two questions are specific: 'Tell me about a time when you had to influence stakeholders who didn't report to you.' 'Describe the most complex technical decision you've made and walk me through your reasoning.' 'What's your approach when you disagree with your manager?' These questions probe decision-making quality, not just experience summary.",
  },
  {
    dimension: "Culture fit is being evaluated explicitly",
    detail: "Second interviews often include panel conversations or informal conversations over lunch or a tour — and those informal moments are the culture fit evaluation. How you treat the receptionist, how you interact with people who aren't interviewing you, and how you talk about past colleagues are all being observed. Treat every moment as part of the interview.",
  },
  {
    dimension: "Your first-round answers are now assumptions",
    detail: "The interviewers have already heard your first-round summary. They're not asking you to tell them about yourself from scratch — they're following up on what you said. This means: be consistent with your first-round answers, go deeper on the topics that clearly interested them, and be ready to expand on anything you mentioned in round one.",
  },
];

const HOW_TO_PREPARE = [
  {
    action: "Debrief round one in detail before round two",
    detail: "Immediately after round one, write down: every question asked, every answer you gave, where you felt the interviewer's energy increase or decrease, what topics seemed to resonate, and what you wish you'd said differently. This is your preparation bible for round two. In round two, you'll be building on these first-round impressions.",
  },
  {
    action: "Research each person who will interview you",
    detail: "Before round two, you should know: each interviewer's title and how they relate to the role, their professional background on LinkedIn, any published content (articles, talks, posts) that reveals their priorities, and how their role connects to yours. Tailor your examples to each interviewer's function — the engineering manager wants to hear about technical depth; the cross-functional stakeholder wants to hear about collaboration.",
  },
  {
    action: "Prepare deeper, more specific examples",
    detail: "Round two questions require more specific stories than round one. The STAR method still applies, but your answers need to go deeper: more detail on the complexity, more nuance on the challenges, and more honest reflection on what you'd do differently. 'I led a project that delivered X' is a round one answer. A round two answer walks through the decision-making, the obstacles, the tradeoffs, and the outcome — including what you learned.",
  },
  {
    action: "Develop 3-5 questions for each interviewer",
    detail: "Round two questions should reflect that you've already had one conversation. Don't ask what the role does (you should know that). Ask about: what success looks like at 6 and 12 months in this specific role, the biggest challenge the team is navigating right now, how the team makes decisions on [specific type of decision relevant to the role], and what they wish they'd known before joining. Specific questions signal engagement; generic questions signal you're going through the motions.",
  },
  {
    action: "Prepare a 30-60-90 day plan (for senior roles)",
    detail: "For manager, director, or senior individual contributor roles, a brief 30-60-90 day plan demonstrates strategic thinking and initiative. You don't need a formal document — but being able to articulate 'In my first 30 days I'd focus on X; in 60 days I'd move to Y; by 90 days I'd expect to be delivering Z' shows you're already thinking as someone in the role, not just someone wanting the role.",
  },
];

const QUESTIONS_TO_EXPECT = [
  {
    type: "Decision-making under pressure",
    examples: [
      "Tell me about a decision you made with incomplete information. What did you do and how did it turn out?",
      "Describe a time when you had to choose between two good options. How did you decide?",
    ],
    how_to_answer: "Show your framework for deciding, not just the outcome. Hiring managers want to see that you have a principled decision-making process — not just that you got lucky. Name the criteria you weighted, the tradeoffs you considered, and what you'd do the same or differently.",
  },
  {
    type: "Cross-functional influence",
    examples: [
      "Tell me about a time you had to influence someone who didn't report to you.",
      "Describe a situation where you needed to get buy-in from a team that had competing priorities.",
    ],
    how_to_answer: "Collaboration questions are about how you build relationships and earn trust across organizational boundaries. Strong answers name the specific stakeholder, describe the competing interest, explain your approach to understanding their perspective, and show how you found an outcome that worked for both parties.",
  },
  {
    type: "Handling failure and learning",
    examples: [
      "Tell me about the biggest professional mistake you've made and what you took from it.",
      "Describe a project that didn't go the way you planned. What would you do differently?",
    ],
    how_to_answer: "Second interviews often include a 'failure' question as a character test. The goal isn't to demonstrate perfection — it's to demonstrate self-awareness and growth. Name a real failure (not a disguised strength), explain what caused it, own your part, and describe what you changed as a result. Surface-level failure answers ('I worked too hard') are transparent and damage credibility.",
  },
  {
    type: "Motivation and long-term fit",
    examples: [
      "Why this company at this stage in your career — what makes this role the right next step?",
      "Where do you see yourself in 3-5 years, and how does this role fit into that?",
    ],
    how_to_answer: "Round two motivation questions need to go beyond 'I'm excited about the mission.' Connect your career trajectory to something specific about the company's current stage, the team's work, or the impact you'd have in this role. Vague enthusiasm is less convincing in round two — you've already expressed it in round one.",
  },
];

const FAQS = [
  { question: "How long after a first interview should you expect a second interview?", answer: "Typical timelines: 3-7 business days is the most common window between first and second interview, particularly at larger companies with structured hiring processes. Startups and smaller companies may move faster (1-3 days) or slower depending on how many candidates they're running in parallel. If you haven't heard within a week, it's appropriate to follow up with the recruiter: 'I remain very interested in the role and wanted to follow up on next steps — is there an expected timeline for the second round?' Don't follow up before 5 business days unless they specifically gave you a date they didn't meet." },
  { question: "Should you send a thank-you email after a second interview?", answer: "Yes — and a second-round thank-you email should be different from a first-round one. In round two, you've met more people and had deeper conversations. Send individual emails to each person who interviewed you, referencing something specific from your conversation with each. Generic 'thanks for the interview' emails to five people after round two read as template behavior; specific, individual emails that reference the conversation content demonstrate genuine engagement. Send within 24 hours of each interview day." },
  { question: "Is a second interview a good sign?", answer: "Yes — getting a second interview means you passed the initial qualification screen and are considered a viable candidate. But it's not a guarantee. Second interview conversion rates vary significantly by company: at large companies with structured hiring, second interviews may have 3-5 candidates competing for 1-2 roles; at smaller companies or for roles where you're the clear frontrunner, a second interview may be closer to a formality. The safest mindset: treat a second interview as an opportunity to confirm what you started in round one, not as a signal that the decision is made." },
];

export default async function SecondInterviewTipsPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Second Interview Tips — How to Prepare & What's Different (2025)"
        description="A second interview tests different things than the first. Preparation that worked in round one won't be enough in round two. Here's what changes and how to prepare."
        url={`${BASE_URL}/blog/second-interview-tips`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Second Interview Tips", url: `${BASE_URL}/blog/second-interview-tips` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Round Two</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Second Interview Tips</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            A second interview means you cleared the first screen — but the criteria change completely in round two. The preparation that worked in round one won&apos;t be enough here.
          </p>
        </div>
      </section>

      {/* What changes */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What changes in a second interview</h2>
          <div className="mt-6 space-y-3">
            {WHAT_CHANGES.map((item, i) => (
              <div key={item.dimension} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--brand)]/10 flex items-center justify-center text-[11px] font-bold text-[var(--brand)]">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.dimension}</p>
                    <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to prepare */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to prepare</h2>
          <div className="mt-6 space-y-3">
            {HOW_TO_PREPARE.map((item) => (
              <div key={item.action} className="rounded-xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.action}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions to expect */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Questions to expect in round two</h2>
          <div className="mt-6 space-y-4">
            {QUESTIONS_TO_EXPECT.map((q) => (
              <div key={q.type} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{q.type}</p>
                </div>
                <div className="p-5">
                  <div className="space-y-1.5 mb-4">
                    {q.examples.map((ex) => (
                      <p key={ex} className="text-[13px] italic text-[var(--muted)] pl-3 border-l-2 border-[var(--border)]">&ldquo;{ex}&rdquo;</p>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[var(--bg)] p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">How to answer</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{q.how_to_answer}</p>
                  </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari coaches your second interview round specifically.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari generates the specific questions you&apos;ll face in round two based on the role and company, coaches your deeper behavioral answers, and helps you develop the targeted questions and 30-60-90 plan that close the deal. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
