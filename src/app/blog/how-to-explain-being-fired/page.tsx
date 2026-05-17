import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Explain Being Fired in an Interview — Scripts That Work (2025)",
  description:
    "Most candidates handle this wrong — either over-explaining or being evasive. Here's the framework for explaining termination honestly without derailing your interview, with word-for-word scripts for every common scenario.",
  keywords: ["how to explain being fired", "fired from job interview answer", "how to explain termination in interview", "what to say when fired from previous job", "how to address being fired", "job interview fired answer 2025"],
  alternates: { canonical: "/blog/how-to-explain-being-fired" },
  openGraph: {
    title: "How to Explain Being Fired in an Interview (2025)",
    description: "Most candidates over-explain or get evasive. Here's the framework and word-for-word scripts for handling termination questions honestly.",
    url: "/blog/how-to-explain-being-fired",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Do I have to disclose that I was fired?",
    answer: "If asked directly — yes. Lying about termination is a common cause of rescinded offers and terminations for cause at new jobs, especially if a background check or reference call reveals the discrepancy. The goal isn't to hide it — it's to explain it in a way that's truthful without being unnecessarily damaging.",
  },
  {
    question: "Should I bring up being fired if they don't ask?",
    answer: "No. Volunteering it unprompted puts negative information in front of the interviewer that they didn't ask for. Answer the questions you're asked. If they ask why you left your last job or why you're looking for a new role, that's the moment to address it honestly.",
  },
  {
    question: "What if my previous employer will confirm I was terminated?",
    answer: "Most US employers only confirm title, dates of employment, and eligibility for rehire — they typically don't provide details about why someone left for liability reasons. You can't control what they say, but you can control your framing. Be consistent, be honest, and let your explanation stand on its own merits.",
  },
  {
    question: "Is being fired a dealbreaker?",
    answer: "Not inherently. How you explain it matters more than the fact of it. Interviewers understand that firings happen — layoffs, poor fit, performance issues, or circumstances beyond your control. What they're evaluating is your self-awareness, your honesty, and whether the same thing is likely to happen here.",
  },
];

export default async function HowToExplainBeingFiredPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Explain Being Fired in an Interview — Scripts That Work (2025)"
        description="Most candidates handle this wrong. Here's the framework and scripts for every common termination scenario."
        url={`${BASE_URL}/blog/how-to-explain-being-fired`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Explain Being Fired", url: `${BASE_URL}/blog/how-to-explain-being-fired` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interview Prep</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">How to Explain Being Fired</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Most candidates get this wrong in both directions — either over-explaining until it sounds defensive, or being so vague it raises more questions. Here&apos;s the framework and exact scripts.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>10 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The framework: brief, honest, forward</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The goal of your answer isn&apos;t to convince the interviewer it wasn&apos;t your fault. The goal is to give them a factual, brief explanation and then move immediately to what you learned and why this role is the right next step.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Three things that kill a termination explanation:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { mistake: "Badmouthing your previous employer", impact: "Signals to the interviewer that you might do the same to them. Even if the company was genuinely terrible, keep it neutral." },
                { mistake: "Over-explaining or offering too much detail", impact: "The longer and more defensive your explanation, the more suspicious it sounds. A brief, honest answer followed by a redirect is more credible than a 90-second defense." },
                { mistake: "Being evasive or vague", impact: "Vagueness creates a vacuum interviewers fill with the worst-case scenario. Being clear and matter-of-fact is more reassuring than being cagey." },
              ].map(item => (
                <div key={item.mistake} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="font-semibold text-[var(--ink)]">✗ {item.mistake}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.impact}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
              <p className="font-semibold text-[var(--ink)]">The formula that works:</p>
              <p className="mt-2 text-[14px] leading-6 text-[var(--muted)]">
                <span className="font-bold text-[var(--ink)]">[What happened]</span> + <span className="font-bold text-[var(--ink)]">[What you learned or would do differently]</span> + <span className="font-bold text-[var(--ink)]">[Why this role is the right next step]</span>
              </p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">
                Keep the first part short — one to two sentences. Spend most of your answer on the second and third parts.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Scripts for common termination scenarios</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">These are starting points — adapt the specific facts to your situation. The structure (brief explanation → learning → forward-looking) stays the same across scenarios.</p>

            <div className="mt-6 space-y-6">
              {[
                {
                  scenario: "Laid off (company downsizing, restructuring, or role elimination)",
                  color: "#059669",
                  script: "My position was eliminated as part of a broader restructuring — the company reduced headcount across the [division] by about 30%. It wasn't performance-related; several teams were consolidated. I used the time to [complete a certification / take on freelance work / do a thorough job search]. I'm actually glad it happened, because it gave me space to be intentional about the next role rather than just taking the first thing available.",
                  note: "Layoffs carry no stigma. State the facts clearly — role eliminated, not performance-related — and pivot quickly to what you did with the time.",
                },
                {
                  scenario: "Fired for performance issues",
                  color: "#F97316",
                  script: "I was let go from that role. Honestly, it was a situation where I was struggling with [specific issue — time management, the technical scope, the management style] and I didn't course-correct quickly enough. I've taken that seriously since — I [took a course, sought out a mentor, changed how I approach X]. I'm not looking to repeat that mistake. What attracted me to this role is [specific alignment with your strengths].",
                  note: "Acknowledge it directly. What kills you here is defensiveness or pretending it didn't happen. A candidate who understands why they struggled and can name what changed is more trustworthy than one who blames the company.",
                },
                {
                  scenario: "Fired due to culture or management conflict",
                  color: "#7C3AED",
                  script: "There was a fundamental mismatch between how that team worked and how I do my best work. I've reflected on it a lot — I think I would have caught the fit issue earlier if I'd asked better questions during the interview process about [communication style / autonomy / decision-making]. I now know more clearly what environments I thrive in and what to look for, which is part of why this role stood out.",
                  note: "Don't blame the manager, even if they deserve it. Frame it as a fit issue you understand better now. The learning should be about how you'll evaluate the next role, not about the previous company's failures.",
                },
                {
                  scenario: "Fired for a specific incident or mistake",
                  color: "#DC2626",
                  script: "I made a significant error in [brief, factual description]. It had real consequences for the company and I understand why they made the decision they did. I won't minimize it. What I can tell you is what I learned from it: [specific change in approach, process, or judgment]. That's been the lens I've brought to everything since.",
                  note: "This is the hardest scenario. Vagueness makes it worse. A clear, matter-of-fact account of what happened — without over-explaining — is more credible than a hedged story. The learning has to be specific, not generic.",
                },
              ].map(item => (
                <div key={item.scenario} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <h3 className="font-bold text-[var(--ink)]">{item.scenario}</h3>
                  </div>
                  <div className="p-6">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Script</p>
                    <blockquote className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-5 py-4 text-[14px] leading-7 text-[var(--ink)] italic">
                      &ldquo;{item.script}&rdquo;
                    </blockquote>
                    <p className="mt-4 text-[13.5px] leading-6 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What happens after you answer</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              After your answer, the interviewer will usually do one of three things:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { response: "Move on to the next question", action: "Good sign. Your answer was sufficient. Don't re-open it." },
                { response: "Ask a follow-up: 'Can you tell me more about what happened?'", action: "Stay consistent with your original answer. Add one level of specificity if the original was light, but don't introduce new elements that change the story." },
                { response: "Ask: 'Is this something we'd be likely to encounter here?'", action: "This is a real question. Answer it directly: 'I don't think so, and here's why — [specific reason this context is different or what you've changed].'" },
              ].map(item => (
                <div key={item.response} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-4">
                  <span className="mt-0.5 text-[var(--brand)]">→</span>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.response}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Common questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Practice answering this question before your interview</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari&apos;s mock interview coaching lets you practice answering termination questions and get feedback on whether your explanation sounds confident and credible — before you&apos;re in the room.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Practice with Zari →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
