import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Informational Interview Questions — 30 Questions That Build Real Relationships (2025)",
  description:
    "30 specific informational interview questions organized by conversation stage — opening, career path, industry insight, company culture, and close. Plus how to ask for one, what to do after, and the mistakes that make people not want to help you.",
  keywords: ["informational interview questions", "what to ask in an informational interview", "informational interview tips", "how to do an informational interview", "networking interview questions", "career informational interview"],
  alternates: { canonical: "/blog/informational-interview-questions" },
  openGraph: {
    title: "Informational Interview Questions — 30 Questions That Build Real Relationships (2025)",
    description: "30 questions by conversation stage, how to ask for the meeting, and what to do after — the full informational interview playbook.",
    url: "/blog/informational-interview-questions",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const QUESTION_SETS = [
  {
    stage: "Opening — establish context (first 5 minutes)",
    accent: "#7C3AED",
    purpose: "Set the person at ease, show you've done your homework, and make clear this is a conversation — not a covert job interview.",
    questions: [
      { q: "I read that you transitioned from [X] to [Y] — what prompted that shift?", why: "Shows you researched them specifically. Opens with their story, not yours." },
      { q: "You've been at [Company] for [X years] — what's kept you there?", why: "For people with long tenures, this is genuinely interesting and often reveals what the company actually values." },
      { q: "Your path from [early role] to [current role] isn't linear — what's the through-line you see in it?", why: "Invites reflection. Most people enjoy articulating their own narrative when asked thoughtfully." },
    ],
  },
  {
    stage: "Career path — understand how they got here",
    accent: "#0891B2",
    purpose: "Extract the decision-making logic, turning points, and hidden path information that doesn't appear in anyone's LinkedIn.",
    questions: [
      { q: "What decision in your career had the biggest impact on where you ended up — that wasn't obvious at the time?", why: "Reveals non-obvious path information. Surfaces the decisions that look obvious in hindsight but weren't." },
      { q: "Is there anything you would have done differently in your first three years that you'd tell someone starting now?", why: "Practically useful. Most people want to share hard-earned wisdom when invited to." },
      { q: "What's the skill or experience gap that held you back longest — and how did you close it?", why: "Honest and specific. Gives you a gap to plan for in your own path." },
      { q: "Were there roles or opportunities you turned down that you later regretted — or was relieved you passed on?", why: "Reveals how they evaluate career decisions. Teaches you their framework." },
      { q: "How important was networking vs. performance vs. timing in getting to where you are?", why: "Forces an honest breakdown of career success factors. The answer is often surprising." },
    ],
  },
  {
    stage: "Industry and role — understand the landscape",
    accent: "#059669",
    purpose: "Get the inside view on what the field actually looks like — the things that don't appear in job descriptions or industry reports.",
    questions: [
      { q: "What do most outsiders get wrong about what this role actually involves day-to-day?", why: "Gets past the job description. Almost everyone has a strong answer to this." },
      { q: "What's the most important thing to be good at in this field that rarely appears in job postings?", why: "The unlisted skills question. Surfaces hidden requirements for success." },
      { q: "How is the [industry/function] different from what it was 5 years ago — and where do you think it's heading?", why: "Tests their strategic awareness. Also useful for your own industry positioning." },
      { q: "Who are the 2–3 people in this space whose thinking you pay most attention to — and why?", why: "Surfaces high-quality information sources. Useful for building your own knowledge base." },
      { q: "What are the career paths people in this function typically end up taking — inside and outside the company?", why: "The exit path question. Understanding where the role leads is as important as understanding the role itself." },
    ],
  },
  {
    stage: "Company culture — the stuff not on Glassdoor",
    accent: "#D97706",
    purpose: "Understand what it's actually like to work somewhere — the dynamics, values, and culture signals that job descriptions never capture.",
    questions: [
      { q: "What kind of person tends to thrive at [Company] — and who doesn't?", why: "Direct culture fit question, but asked about the company, not you. Much easier to answer honestly." },
      { q: "What does the path to the next level actually look like at [Company] — what do people who get promoted consistently have in common?", why: "Reveals real promotion criteria vs. stated ones." },
      { q: "How would you describe the relationship between leadership and individual contributors here?", why: "Tells you how decisions get made, how much autonomy ICs have, and how accessible leaders are." },
      { q: "Is there anything you wish you'd known about the company's culture before you joined?", why: "Invites honest reflection on culture surprises — positive and negative." },
    ],
  },
  {
    stage: "Advice and close — make the ask",
    accent: "#DC2626",
    purpose: "End with actionable guidance specific to your situation and an appropriate next step that doesn't feel transactional.",
    questions: [
      { q: "Given what you know about my background, what would you focus on developing over the next 12 months if you were me?", why: "Specific, actionable. Forces them to engage with your situation rather than give generic advice." },
      { q: "Is there anyone in your network you think I should talk to — either in this field or in an adjacent one that might be relevant?", why: "The referral ask, framed naturally. Say 'feel free to decline' — it makes them more likely to help." },
      { q: "What resources — books, podcasts, communities — do people in this field pay attention to that I might not know about?", why: "Non-threatening close. Almost everyone can answer this and it's genuinely useful." },
      { q: "Is there a question I should have asked that I didn't?", why: "Gives them permission to share something they wanted to say. Often produces the most valuable insight of the conversation." },
    ],
  },
];

const FAQS = [
  { question: "How do you ask for an informational interview?", answer: "The request should be short (3–5 sentences), specific about why you're reaching out to them in particular, clear that you're asking for 20–30 minutes (not a job), and easy to say yes to. Example: 'I'm a software engineer exploring a move into product management and I came across your work at [Company] — specifically your post on [topic]. I'd love to ask you 3–4 questions about your transition from engineering to PM. Would you be open to a 20-minute call in the next few weeks? Happy to work around your schedule.' Success rate increases significantly when you reference something specific about their work." },
  { question: "How long should an informational interview be?", answer: "Request 20–30 minutes and honor the commitment. If the conversation is going well and they're engaged, they'll offer to continue. Ending on time when you said you would signals that you respect their calendar — which makes them more likely to refer you to others. Asking for more time without being invited almost always reads as inconsiderate." },
  { question: "Should you send questions in advance?", answer: "Optional, but often appreciated. Sending 2–3 questions in the calendar invite or confirmation email signals you're prepared and makes the conversation more efficient. Don't send all 10 questions you've prepared — just the 2–3 that set the direction. The best questions are ones they'll want to answer, not ones that feel like a quiz." },
  { question: "What do you do after an informational interview?", answer: "Send a thank-you email within 24 hours. Keep it brief — 3–5 sentences. Reference one specific thing they said that was valuable. If they offered to introduce you to someone, follow up with the connective email they can forward. Update your notes with key insights while the conversation is fresh. If you land a job in the field within 6 months, let them know — it's one of the most appreciated follow-ups you can send and cements the relationship." },
];

export default async function InformationalInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Informational Interview Questions — 30 Questions That Build Real Relationships (2025)"
        description="30 questions by conversation stage, how to ask for the meeting, and what to do after."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/informational-interview-questions`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Informational Interview Questions", url: `${BASE_URL}/blog/informational-interview-questions` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Networking</span>
            <span className="text-[11px] text-white/30">9 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Informational interview<br /><span className="gradient-text-animated">questions that work</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most informational interviews are forgettable — generic questions that produce generic answers. The questions below are designed to generate the specific, honest, inside-view information that changes how you navigate your career.
          </p>
        </div>
      </section>

      {/* What makes a great question */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What makes a great informational interview question</h2>
          <div className="mt-7 space-y-3 text-[15px] leading-7 text-[var(--muted)]">
            <p>Bad informational interview questions are ones Google can answer — company background, industry trends, what the role involves. Good ones surface the things that only come from personal experience: what they wish they&apos;d known, what actually caused them to get ahead, what the culture is really like, who to talk to next.</p>
            <p>The best questions make the person think. They invite reflection rather than recitation. And they demonstrate that you&apos;ve already done your homework — so they don&apos;t have to start from basics.</p>
          </div>
        </div>
      </section>

      {/* Question sets */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          {QUESTION_SETS.map((set) => (
            <div key={set.stage}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: set.accent }} />
                <h2 className="font-extrabold text-[var(--ink)]">{set.stage}</h2>
              </div>
              <p className="mb-6 text-[13.5px] text-[var(--muted)]">{set.purpose}</p>
              <div className="space-y-4">
                {set.questions.map((item) => (
                  <div key={item.q} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                    <div className="border-b border-[var(--border)] px-5 py-4" style={{ borderLeftColor: set.accent, borderLeftWidth: 3 }}>
                      <p className="font-semibold text-[var(--ink)]">&ldquo;{item.q}&rdquo;</p>
                    </div>
                    <div className="px-5 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: set.accent }}>Why it works</p>
                      <p className="text-[13px] text-[var(--muted)]">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mistakes */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Mistakes that make people not want to help you</h2>
          <div className="mt-8 space-y-4">
            {[
              { mistake: "Turning it into a job interview", detail: "The moment you ask 'are there any openings?' or pivot to 'here's why I'd be great at your company,' the dynamic shifts. They feel misled. The meeting was framed as informational — honor that framing and let them choose to offer more." },
              { mistake: "Asking questions you could have Googled", detail: "'What does [Company] do?' or 'What's the job market like in this field?' signals you didn't prepare. These questions waste limited time and imply you don't value theirs." },
              { mistake: "No follow-up", detail: "Not sending a thank-you email within 48 hours closes the door on the relationship. A 3-sentence email that references one specific thing from the conversation takes 5 minutes and makes a lasting impression." },
              { mistake: "Over-asking", detail: "Asking for more time, more introductions, and a job referral all in the same conversation is too much. Pick one ask per meeting. The referral ask ('Is there anyone you'd recommend I speak with?') is usually the right one." },
            ].map((item) => (
              <div key={item.mistake} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-red-400" />
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.mistake}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Informational interview FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Build your job search strategy with AI coaching</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you on networking outreach, informational interview strategy, resume optimization, and interview prep — the full job search, not just one piece of it.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
