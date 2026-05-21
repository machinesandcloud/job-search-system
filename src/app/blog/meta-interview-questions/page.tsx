import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Meta Interview Questions 2025 — Facebook Interview Prep Guide",
  description: "The most common Meta (Facebook) interview questions mapped to their core values: Move Fast, Be Bold, Focus on Impact, Be Open, Build Social Value. Includes behavioral and product questions.",
  keywords: ["meta interview questions", "facebook interview questions", "meta behavioral interview", "meta interview prep 2025", "facebook interview preparation", "meta culture interview", "move fast meta interview", "meta values interview", "meta product manager interview", "meta software engineer interview"],
  alternates: { canonical: "/blog/meta-interview-questions" },
  openGraph: { title: "Meta Interview Questions 2025 — Facebook Interview Prep Guide", description: "Common Meta behavioral and product questions mapped to core values — Move Fast, Be Bold, Focus on Impact, and more.", url: "/blog/meta-interview-questions" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are Meta's core values for interviews?", answer: "Meta's core values are: Move Fast (bias for action, ship early, iterate), Be Bold (take big swings, don't fear failure), Focus on Long-Term Impact (prioritise what actually moves the needle), Be Open (transparent communication, direct feedback), and Build Social Value (the mission of connecting people). Interviewers look for evidence of these in your answers — especially Move Fast and Focus on Impact, which show up in almost every behavioral round." },
  { question: "How is the Meta interview loop structured?", answer: "For most roles: recruiter screen → technical/skills phone interview → full loop of 4–6 interviews (1–2 behavioral, 1–2 technical or product, 1 cross-functional). Each interviewer scores you on a rubric and submits feedback independently. A hiring committee reviews all feedback. For PM roles, the loop includes a product design question, analytical question, and strategy question plus behavioral." },
  { question: "What's the difference between Meta and Google behavioral interviews?", answer: "Meta behaviorals are more action-focused — they want to hear about things you shipped, impact you drove, and speed of execution. Google skews more toward data-driven decision-making and structural problem-solving. Meta explicitly wants to hear about 'what you personally did' and 'what the metric impact was.' Vague, committee-driven answers land poorly at Meta." },
  { question: "Does Meta still use the 'jedi mind trick' question?", answer: "The 'Jedi mind trick' — 'What would you work on if you were CEO of Meta for a day?' — is a known Meta interview format for product and strategy roles. Treat it as a product strategy question: identify a real business problem Meta faces, propose a specific initiative, explain why it's the highest-leverage move, and quantify the impact. Avoid generic answers about 'privacy' or 'competition with TikTok' without specifics." },
];

const CATEGORIES = [
  {
    value: "Move Fast", color: "#1877F2", icon: "⚡",
    desc: "Bias for action, minimal bureaucracy, comfort with imperfect-but-shipped. Meta wants evidence you unblock yourself and others, not that you waited for consensus.",
    questions: [
      { q: "Tell me about a time you shipped something faster than expected.", signal: "What did you cut scope on? What was the trade-off? Was it the right call?" },
      { q: "Describe a situation where you moved forward without all the information you needed.", signal: "Comfort with ambiguity. Did you define a clear reversible decision? Did the result validate your call?" },
      { q: "Tell me about a time you removed a blocker for your team.", signal: "Proactive unblocking. What was the blocker, how long had it been there, what did you do?" },
    ]
  },
  {
    value: "Focus on Long-Term Impact", color: "#42B72A", icon: "🎯",
    desc: "Meta wants to know you're optimising for the metric that matters — not the one that's easy to measure.",
    questions: [
      { q: "Tell me about a time you chose the harder, higher-impact path over the easier win.", signal: "Trade-off thinking. Can you quantify the impact difference? Did you hold to it under pressure?" },
      { q: "Describe a project where you changed direction mid-way because the original goal wasn't the right goal.", signal: "Intellectual honesty + focus on outcome over sunk cost." },
      { q: "How have you prioritised between multiple high-impact opportunities?", signal: "Framework for prioritisation. Can you articulate which levers move the right metrics?" },
    ]
  },
  {
    value: "Be Bold", color: "#FA383E", icon: "🚀",
    desc: "Take big swings. Meta built its culture on being willing to make bets that might fail.",
    questions: [
      { q: "Tell me about a time you took a risk that didn't pay off.", signal: "Psychological safety with failure. What did you learn? Would you take the same bet again?" },
      { q: "Describe a time you challenged the direction of a project or decision by leadership.", signal: "Constructive disagreement. Did you have data? Did you escalate appropriately?" },
      { q: "What's the boldest idea you've proposed or worked on?", signal: "Ambition and strategic thinking. Were you the person who originated it or just executed it?" },
    ]
  },
  {
    value: "Be Open", color: "#F7B928", icon: "💬",
    desc: "Direct communication, receiving feedback without defensiveness, sharing information proactively.",
    questions: [
      { q: "Tell me about a time you delivered difficult feedback to a peer or manager.", signal: "Directness. Was the feedback specific, actionable, and delivered in a way that maintained the relationship?" },
      { q: "Describe a time you received feedback that changed how you worked.", signal: "Non-defensiveness and growth. The more significant the change, the better the answer." },
      { q: "How have you created transparency on a project when it wasn't going well?", signal: "Proactive communication of bad news. Did you sugarcoat it? Did you bring solutions?" },
    ]
  },
];

export default async function MetaInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Meta Interview Questions 2025" description="Common Meta behavioral and product interview questions mapped to core values — Move Fast, Be Bold, Focus on Long-Term Impact." url={`${BASE_URL}/blog/meta-interview-questions`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Meta Interview Questions", url: `${BASE_URL}/blog/meta-interview-questions` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1877F2 50%, #42B72A 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Interview Prep · Meta</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Meta Interview Questions 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">Meta&apos;s values-based interview framework — Move Fast, Be Bold, Focus on Long-Term Impact, Be Open — with signals and full question breakdowns.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Meta&apos;s core values — what each interview probes</h2>
          <div className="mb-12 grid gap-3 sm:grid-cols-5">
            {[
              { v: "Move Fast", c: "#1877F2" },
              { v: "Be Bold", c: "#FA383E" },
              { v: "Focus on Impact", c: "#42B72A" },
              { v: "Be Open", c: "#F7B928" },
              { v: "Build Social Value", c: "#7C3AED" },
            ].map(({ v, c }) => (
              <div key={v} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-center">
                <div className="text-[12px] font-bold" style={{ color: c }}>{v}</div>
              </div>
            ))}
          </div>

          {CATEGORIES.map(({ value, color, icon, desc, questions }) => (
            <div key={value} className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em]" style={{ color }}>{value}</h2>
              </div>
              <p className="mb-5 text-[14px] leading-6 text-[var(--muted)]">{desc}</p>
              <div className="space-y-3">
                {questions.map(({ q, signal }, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                    <div className="flex items-start gap-3 border-b border-[var(--border)] p-4">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold" style={{ background: `${color}18`, color }}>{i + 1}</span>
                      <p className="font-semibold text-[14px]">{q}</p>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-3">
                      <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold uppercase text-[var(--muted)]">Signal</span>
                      <p className="text-[13px] leading-5 text-[var(--muted)]">{signal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Meta product questions (PM roles)</h2>
          <div className="mb-10 space-y-3">
            {[
              { q: "How would you improve Facebook Groups?", tip: "User segmentation → pain points → prioritised improvements → success metrics. Don't just list features." },
              { q: "Design a new feature for Instagram that increases time-on-platform.", tip: "Define the goal (is more time actually good?). Explore user needs. Propose and evaluate trade-offs." },
              { q: "If you were PM of WhatsApp monetisation, what would you build?", tip: "Protect core user trust (free, no ads) while finding business model. Think: WhatsApp Business API, premium features, payments." },
              { q: "How do you measure the success of Facebook's News Feed?", tip: "Engagement vs. meaningful social interaction tension. Know that Meta has publicly moved away from raw engagement toward 'meaningful interactions.'" },
            ].map(({ q, tip }, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-start gap-3 border-b border-[var(--border)] p-4">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 text-[11px] font-extrabold text-[#1877F2]">{i + 1}</span>
                  <p className="font-semibold text-[14px]">{q}</p>
                </div>
                <div className="flex items-start gap-2 px-4 py-3">
                  <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold uppercase text-[var(--muted)]">Tip</span>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1877F2 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Practice your Meta interview answers.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari simulates Meta-style behavioral interviews with Move Fast / Focus on Impact scoring — so your stories hit the right signals before the real loop.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1877F2]">Start Meta interview prep free</Link>
          <p className="mt-4 text-[12px] text-white/30">Also see: <Link href="/blog/amazon-behavioral-interview-questions" className="underline">Amazon LP</Link> · <Link href="/blog/google-behavioral-interview-questions" className="underline">Google Googleyness</Link> · <Link href="/blog/microsoft-behavioral-interview-questions" className="underline">Microsoft Growth Mindset</Link></p>
        </div>
      </section>
    </PageFrame>
  );
}
