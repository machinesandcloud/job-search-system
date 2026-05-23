import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs TopInterview 2025 — Which Interview Coaching Service is Better?",
  description:
    "Comparing Zari and TopInterview for interview coaching. Zari uses AI for unlimited on-demand practice. TopInterview uses human coaches for scheduled sessions. Which is right for you?",
  keywords: [
    "Zari vs TopInterview",
    "TopInterview review",
    "TopInterview alternative",
    "best interview coaching service",
    "AI interview coach vs human coach",
    "interview coaching service comparison",
    "TopInterview pricing",
    "online interview coaching",
    "TopInterview vs AI coach",
  ],
  alternates: { canonical: "/compare/zari-vs-topinterview" },
  openGraph: {
    title: "Zari vs TopInterview (2025) — AI vs. Human Interview Coaching",
    description: "AI-powered unlimited practice vs. human-coached scheduled sessions. Which gets you better interview results?",
    url: "/compare/zari-vs-topinterview",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is TopInterview?",
    answer: "TopInterview is a professional interview coaching service that pairs you with human career coaches for scheduled 1-on-1 mock interview sessions. Sessions are conducted via video call and coaches provide feedback on your answers, body language, and communication style. Packages start around $149 and include a set number of sessions.",
  },
  {
    question: "How is Zari different from TopInterview?",
    answer: "TopInterview uses human coaches for scheduled video sessions — you book a time and prep with a real person. Zari uses AI for unlimited on-demand practice available 24/7. Zari is significantly cheaper, works at any time, and gives structured STAR-scored feedback automatically. The tradeoff: human coaches can observe non-verbal communication and give more nuanced personalised feedback; Zari gives more consistent, repeatable feedback across unlimited sessions.",
  },
  {
    question: "Is TopInterview worth the cost?",
    answer: "TopInterview's packages range from approximately $149 to $399 for 1–3 sessions with a human coach. That's appropriate if you want high-touch personalised feedback for a high-stakes interview at a single company. For most job seekers going through multiple interview rounds across multiple companies, the cost makes it impractical to do more than 1–2 sessions. Zari allows unlimited practice across your entire job search for a fraction of that cost.",
  },
  {
    question: "Can Zari replace a human interview coach?",
    answer: "For most interview preparation needs, yes. Zari runs realistic behavioral and technical simulations, evaluates answers against a 6-dimension STAR framework, gives specific language feedback, and tracks patterns across sessions. Where human coaches still add unique value: high-stakes C-suite interviews, roles requiring very specific industry insight, and coaching on non-verbal communication that requires video observation. For the day-to-day preparation most job seekers need, Zari covers it.",
  },
];

const DIMENSIONS = [
  {
    category: "On-demand availability",
    topinterview: "Sessions are scheduled 1-3 days in advance and last 45–60 minutes. If you get an interview invite at 9pm and need to practice before a 9am call, you can't book a TopInterview session for that.",
    zari: "Available 24/7. Practice at midnight before a 9am interview. Run a session between interview rounds. Unlimited sessions, no scheduling required.",
    winner: "zari",
    winnerNote: "Availability on your schedule is a significant practical advantage for job seekers."
  },
  {
    category: "Cost per session",
    topinterview: "Packages range from approximately $149 (1 session) to $399 (3 sessions with unlimited email support). High-touch but expensive relative to most job seekers' budgets.",
    zari: "Free first session on all coaching surfaces. Pro plan from $29/month for unlimited sessions. The cost per session across a job search is dramatically lower.",
    winner: "zari",
    winnerNote: "For a 3-month job search with 10+ interview rounds, cost comparison is significant."
  },
  {
    category: "Feedback quality",
    topinterview: "Human coaches bring judgment, empathy, and the ability to read between the lines. They can identify habits you're not aware of and give context-sensitive advice that goes beyond a scoring rubric.",
    zari: "Structured STAR scoring across 6 dimensions. Consistent, repeatable feedback. Identifies specific weak points in your answer structure with actionable guidance. Voice mode for pacing and filler word detection.",
    winner: "tie",
    winnerNote: "Human coaches: more nuanced and empathetic. AI: more consistent and specific. Both are high quality in different ways."
  },
  {
    category: "Interview types covered",
    topinterview: "Behavioral interviews are the core product. Technical interview coaching is available but limited — most coaches aren't domain-specific technical experts.",
    zari: "Behavioral, technical, panel, PM, case interview formats. Role-specific question banks. Also covers promotion pitches, manager conversations, and performance reviews.",
    winner: "zari",
    winnerNote: "Broader interview format coverage beyond behavioral."
  },
  {
    category: "Career coaching beyond interviews",
    topinterview: "Interview coaching only. No resume review, LinkedIn optimisation, or salary negotiation coaching included.",
    zari: "Full career coaching platform: resume, LinkedIn, interview, salary negotiation, promotion coaching, and career strategy in one place.",
    winner: "zari",
    winnerNote: "Standalone interview coaching vs. full career coaching platform."
  },
  {
    category: "Session memory",
    topinterview: "Human coaches retain memory of previous sessions naturally. They can track your improvement over time and reference what you worked on before.",
    zari: "AI session memory tracks your coaching history, progress, and recurring weak points across sessions. Context carries forward without re-establishment.",
    winner: "tie",
    winnerNote: "Both retain context between sessions. Human coaches do it more naturally; Zari does it more structurally."
  },
];

export default async function ZariVsTopInterviewPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs TopInterview", url: `${BASE_URL}/compare/zari-vs-topinterview` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs TopInterview</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            AI-powered unlimited practice vs. scheduled sessions with a human career coach. Two valid approaches to interview prep — one scales to your entire job search, the other goes deeper for a single opportunity.
          </p>

          <div className="mt-8 flex justify-center">
            <WinScore zariWins={4} total={6} competitorName="TopInterview" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">TopInterview is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "High-stakes single-company interviews where you want human judgment",
                  "Feedback on body language, tone, and non-verbal communication",
                  "Roles requiring deep industry-specific insights from a domain expert",
                  "Candidates who strongly prefer 1-on-1 human coaching relationships",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Unlimited practice across a full job search with multiple interview rounds",
                  "On-demand prep at any time — no scheduling, available at midnight",
                  "Structured STAR scoring and specific language feedback per answer",
                  "Full career coaching beyond just interviews — resume, LinkedIn, salary",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[#4361EE]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Where each approach wins — and where it falls short.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "topinterview" ? "TopInterview wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">TopInterview</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.topinterview}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              TopInterview offers something Zari doesn&apos;t: a real human who can observe you, adapt in real-time, and provide the kind of intuitive judgment that comes from years of coaching experience. For a single, critical final-round interview, that has real value.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              But most job searches involve 5–15+ interview rounds across multiple companies over several months. At $149–$399 per package, TopInterview is prohibitively expensive to use throughout a full job search. Zari&apos;s unlimited model means you can practice before every single round — not just the ones you can afford to prep for.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The best answer for serious job seekers is often both: use Zari for systematic preparation across your job search, and consider a TopInterview session for the one company you want most.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--dark)] py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold tracking-[-0.02em]">Practice more. Pay less.</h2>
          <p className="mb-6 text-[15px] text-white/50">Unlimited mock interviews, STAR scoring, and language feedback — across your entire job search, not just one session.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[var(--dark)]">
            Start free — no credit card
          </Link>
          <p className="mt-4 text-[12px] text-white/30">
            Also see:{" "}
            <Link href="/compare/zari-vs-springboard" className="hover:underline text-white/50">Zari vs Springboard</Link>
            {" · "}
            <Link href="/compare/zari-vs-pathrise" className="hover:underline text-white/50">Zari vs Pathrise</Link>
          </p>
        </div>
      </section>
    </PageFrame>
  );
}
