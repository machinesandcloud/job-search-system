import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "\"What Is Your Greatest Weakness?\" — 10 Strong Answers (2025)",
  description:
    "How to answer 'What is your greatest weakness?' in a job interview. Includes 10 real examples that work, the formula behind them, and what answers to never give.",
  keywords: ["what is your greatest weakness", "weakness interview answer", "weakness interview question", "greatest weakness interview", "how to answer what is your weakness", "weakness examples for interview", "weakness job interview answer", "interview weakness examples 2025"],
  alternates: { canonical: "/blog/weakness-interview-answer" },
  openGraph: { title: "\"What Is Your Greatest Weakness?\" — 10 Strong Answers", description: "The formula and 10 real examples for answering the weakness question — without sounding fake or rehearsed.", url: "/blog/weakness-interview-answer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-10";
const MODIFIED = "2025-05-16";

const EXAMPLES = [
  { weakness: "Delegating", answer: "I used to hold onto work too long because I was worried about quality — it slowed my team down more than it helped. Over the last year I've been deliberate about setting clear success criteria upfront and delegating earlier. It's made my team more autonomous and freed me to focus on higher-leverage work.", note: "Works for managers and senior ICs. Shows self-awareness and a concrete fix." },
  { weakness: "Public speaking", answer: "I'm a better writer than a speaker — I used to avoid presenting when I could. I joined a Toastmasters group 18 months ago and have since presented at three all-hands meetings. It's still not my strongest skill but it's no longer something I avoid.", note: "Shows initiative. The 'still not my strongest' line keeps it honest." },
  { weakness: "Saying no to new projects", answer: "I tend to take on too much because I find a lot of problems interesting. I've learned to apply a tighter filter — if it's not on my top three priorities, I decline or negotiate scope before starting. My last manager called it 'finally learning to be strategic with your time.'", note: "Strong because it frames the weakness as energy/enthusiasm — a genuine positive with a real downside." },
  { weakness: "Impatience with slow processes", answer: "I get frustrated when decisions take longer than I think they need to. Early in my career this made me push too hard, too fast. I've learned to distinguish between slowness that can be addressed and slowness that reflects real constraints I don't fully understand. I ask more questions now before pushing.", note: "Good for roles that value speed. Shows maturity without pretending the impatience went away." },
  { weakness: "Data over intuition", answer: "I used to push for more data before making decisions, even when we had enough to move. I've learned that waiting for perfect data is itself a decision — often a worse one. I've gotten better at identifying what's 'good enough to act' versus what genuinely needs more research.", note: "Works well for analytical roles — shows evolved judgment, not just a fixed flaw." },
  { weakness: "Giving difficult feedback", answer: "Direct feedback doesn't come naturally to me — I used to soften it to the point where it wasn't useful. I started asking managers and direct reports for feedback on my feedback, which helped me calibrate. I'm not perfect at it but I've improved significantly in the last two years.", note: "Universally relatable. Strong because it shows meta-awareness." },
  { weakness: "Context-switching between projects", answer: "I do my best work when I can go deep on one thing. In environments with a lot of parallel work I lose focus faster than I'd like. I've addressed this by time-blocking aggressively and being explicit with stakeholders about context-switching costs when asked to shift priorities mid-sprint.", note: "Honest without being disqualifying for the role. Pair with a note about how you manage it." },
  { weakness: "Accepting ambiguity in early stages", answer: "I want to know the success criteria before I start — which is usually a strength but can slow me down in very early-stage work where things are intentionally undefined. I've learned to write my own hypothesis of what success looks like and use it as a working assumption rather than waiting for someone to hand it to me.", note: "Great for startup or product roles where early ambiguity is normal." },
];

export default async function WeaknessInterviewAnswerPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title={`"What Is Your Greatest Weakness?" — 10 Strong Answers (2025)`}
        description="The formula and 10 real examples for answering the weakness question — without sounding fake or rehearsed."
        url={`${BASE_URL}/blog/weakness-interview-answer`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Weakness Interview Answer", url: `${BASE_URL}/blog/weakness-interview-answer` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">&ldquo;What Is Your Greatest Weakness?&rdquo; — 10 Strong Answers (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              The weakness question is one of the most mishandled in interviews. Candidates either give a fake answer (&ldquo;I work too hard&rdquo;) or over-confess something disqualifying. The real goal: show self-awareness and genuine growth without undermining your candidacy.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The formula for a strong weakness answer</h2>
            <div className="mt-5 space-y-3">
              {[
                { step: "Name a real weakness", desc: "Not a disguised strength. Not 'I'm a perfectionist' or 'I care too much.' A real thing that has genuinely limited you. Interviewers have heard the fake versions thousands of times." },
                { step: "Explain the impact briefly", desc: "One sentence on how it showed up in your work or how it affected others. This validates that it's a real weakness, not just a disclaimer." },
                { step: "Describe what you did about it", desc: "The most important part. Specific action, not 'I'm working on it.' What did you change, do, practice, or build? The answer to the weakness question is really a question about how you respond to your own limitations." },
                { step: "Signal the current state", desc: "Not 'I've completely overcome it' (unbelievable) and not 'it's still a major problem' (disqualifying). 'Significantly improved' or 'actively managing' is the right register." },
              ].map((item, i) => (
                <div key={item.step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</div>
                  <div>
                    <p className="mb-1 font-bold text-[var(--ink)]">{item.step}</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What never to say</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"I'm a perfectionist.\"", why: "This answer is so overused it signals that you either didn't prepare or aren't self-aware. Every interviewer has heard it thousands of times." },
                { dont: "\"I work too hard.\"", why: "Same problem. It's a non-answer dressed up as self-awareness. It tells the interviewer nothing real about you." },
                { dont: "\"I don't really have weaknesses.\"", why: "A red flag that suggests either a lack of self-awareness or an unwillingness to be honest. Both are disqualifying." },
                { dont: "A weakness that's central to the job", why: "If you're applying for a data analyst role, don't say you struggle with quantitative thinking. Match the weakness to something adjacent, not core." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">10 strong weakness answers</h2>
            <div className="mt-5 space-y-5">
              {EXAMPLES.map((ex, i) => (
                <div key={ex.weakness} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Weakness {i + 1}: {ex.weakness}</p>
                  <div className="mb-3 rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                    <p className="text-[13.5px] italic leading-7 text-[var(--muted)]">&ldquo;{ex.answer}&rdquo;</p>
                  </div>
                  <p className="text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{ex.note}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Practice your answer before the interview</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The weakness question is harder than it looks because it requires genuine reflection, not just a script. Zari&apos;s <Link href="/ai-interview-coach" className="text-[var(--brand)] underline underline-offset-2">AI interview coach</Link> surfaces this question, evaluates your answer in real-time, and gives feedback on whether it sounds genuine or rehearsed.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice every interview question with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Get real-time feedback on your weakness answer and every other question in your interview loop.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
