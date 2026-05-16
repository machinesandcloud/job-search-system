import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get Promoted Fast — The 90-Day Promotion Sprint (2025)",
  description:
    "A specific, tactical guide to accelerating promotion — the work-visibility matrix, how to find a sponsor (not just a mentor), the manager's manager test, and the promotion conversation framework that actually works.",
  keywords: ["how to get promoted fast", "how to get promoted at work", "promotion strategy", "career advancement tips", "how to get promoted quickly", "how to ask for a promotion", "career promotion guide 2025"],
  alternates: { canonical: "/blog/how-to-get-promoted-fast" },
  openGraph: {
    title: "How to Get Promoted Fast — The 90-Day Promotion Sprint (2025)",
    description: "The work-visibility matrix, sponsor vs mentor, and the promotion conversation framework — a tactical guide to accelerating your timeline.",
    url: "/blog/how-to-get-promoted-fast",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const VISIBILITY_MATRIX = [
  {
    quadrant: "High work, low visibility",
    label: "The invisible performer",
    color: "#D97706",
    description: "The most common trap. You're doing excellent work that no one above your manager knows about. You get strong performance reviews but no promotions — because promotion decisions involve people who have never seen your work.",
    fix: "Stop optimizing for the work. Start optimizing for who sees the outcomes. Write brief monthly summaries for your manager to forward. Get your work in front of skip-levels. Present your own results rather than letting your manager present them for you.",
  },
  {
    quadrant: "High work, high visibility",
    label: "The promotion candidate",
    color: "#059669",
    description: "The combination that drives promotion. Your output is strong and the right people know about it. This isn't self-promotion — it's ensuring that decision-makers have the evidence they need to advocate for you when the promotion conversation happens without you in the room.",
    fix: "Maintain the combination. The failure mode here is complacency — assuming visibility is permanent. Visibility decays. Keep creating new moments of demonstrated impact at the right level.",
  },
  {
    quadrant: "Low work, high visibility",
    label: "The over-communicator",
    color: "#DC2626",
    description: "Visible but not delivering. This gets you attention in the short term and credibility damage in the medium term. The people who know you well see through it; the people who don't eventually will.",
    fix: "Invest in substance first. High visibility without underlying performance creates a brittle position — one bad project exposes it.",
  },
  {
    quadrant: "Low work, low visibility",
    label: "Not on the promotion path",
    color: "#6B7280",
    description: "Neither delivering nor visible. This is either checked-out performance or a position where you're systematically under-challenged and under-stimulated.",
    fix: "Either raise your ambition level or change your environment. Some companies don't have a path for you — staying and grinding in the wrong environment is the slowest route to anywhere.",
  },
];

const SPRINT_WEEKS = [
  {
    week: "Weeks 1–2",
    title: "Audit and diagnose",
    actions: [
      "List every project and initiative you've shipped in the last 6 months with quantified outcomes.",
      "Identify who in your organization above your manager knows about each one. Most people realize this list is short.",
      "Ask your manager directly: 'What would I need to demonstrate to be a strong candidate for promotion in the next review cycle?' Record their answer exactly.",
      "Identify who has been promoted at your level recently and observe what's different about their work and visibility patterns.",
    ],
  },
  {
    week: "Weeks 3–6",
    title: "Build strategic visibility",
    actions: [
      "Propose to present your team's work at a cross-functional meeting, leadership review, or all-hands. One presentation to the right audience is worth months of excellent execution.",
      "Start a brief (2–3 bullet) monthly summary email to your manager that they can easily forward upward. Give them the ammunition to advocate for you.",
      "Identify 2–3 leaders above your manager who are relevant to your promotion decision. Find legitimate ways to contribute to or interact with their priorities.",
      "Take on one stretch project that is visibly owned by you — not a team initiative where your contribution is ambiguous.",
    ],
  },
  {
    week: "Weeks 7–10",
    title: "Activate your sponsor",
    actions: [
      "Distinguish between your mentor and your sponsor. A mentor gives advice. A sponsor actively advocates for your name in rooms you're not in. You need a sponsor.",
      "Identify who your sponsor is or who it should be — typically a senior leader who has seen your work and whose word carries weight in promotion decisions.",
      "Have an explicit conversation: 'I'm working toward promotion in the next cycle. Would you be willing to advocate for me if the opportunity comes up?' Most people never ask directly.",
      "Deliver something meaningful for your sponsor — make their advocacy easy by giving them a specific, recent result they can cite.",
    ],
  },
  {
    week: "Weeks 11–13",
    title: "The promotion conversation",
    actions: [
      "Request a dedicated meeting with your manager — not a performance review, but specifically a promotion planning conversation.",
      "Lead with outcomes, not inputs: 'In the last 6 months, I've done X, Y, Z at the level above my current role. I'd like to discuss what the path to [next level] looks like.'",
      "Ask for a specific timeline and specific gaps: 'What would I need to demonstrate, and by when, to be considered in the next cycle?' If the answer is vague, push for specifics.",
      "Follow up the conversation in writing — summarize what was agreed and what you're committing to. This creates accountability and prevents the conversation from evaporating.",
    ],
  },
];

const FAQS = [
  { question: "What's the difference between a mentor and a sponsor?", answer: "A mentor gives you advice and feedback — they invest time in your development. A sponsor advocates for you publicly — they put their own credibility on the line by recommending you for opportunities and promotions when you're not in the room. Most people who feel stuck in their careers have mentors but no sponsors. Mentors can't get you promoted. Sponsors can. The key difference: sponsors need to have seen your work and believe in it. You earn a sponsor through demonstrated performance, not through asking." },
  { question: "How long does it actually take to get promoted?", answer: "At most large companies, promotion cycles run once or twice per year — typically aligned to review periods (often January and July, or annual in October). This means the practical timeline for a promotion you target today is 6–18 months, depending on when the next cycle falls. Companies that do continuous promotions outside cycles exist but are rarer. The implication: if you want a promotion in the next cycle, you need to start 3–4 months before the cycle closes — not when reviews begin." },
  { question: "What if my manager isn't advocating for me?", answer: "This is the most common stuck point. Your manager may not be advocating for you because: they don't see your promotion as serving their interests; they genuinely don't know you want to be promoted; they don't have enough visibility into your work to make a strong case; or they're a weak advocate without political capital. The fix depends on the root cause. For cases 1 and 4, building sponsor relationships outside your manager's chain is the lever. For cases 2 and 3, direct conversation and the sprint plan above address it." },
  { question: "Should I apply externally to force an internal promotion?", answer: "External offers are the single most reliable forcing function for an internal promotion — they create urgency and a concrete comparison point that internal processes rarely create on their own. The risk: your employer may let you leave, you may need to actually take the external role to preserve credibility, and the relationship with your manager may shift. Use this tactic when you've exhausted internal levers and have genuinely strong external options you'd be happy taking. Don't fake an offer — experienced managers can tell, and it permanently damages trust." },
];

export default async function HowToGetPromotedFastPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get Promoted Fast — The 90-Day Promotion Sprint (2025)"
        description="The work-visibility matrix, sponsor vs mentor, and the promotion conversation framework."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-get-promoted-fast`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get Promoted Fast", url: `${BASE_URL}/blog/how-to-get-promoted-fast` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Growth</span>
            <span className="text-[11px] text-white/30">11 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to get promoted fast<br /><span className="gradient-text-animated">the 90-day sprint</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most people who get passed over for promotion aren&apos;t underperforming — they&apos;re invisible. They&apos;re stuck in the worst quadrant of the work-visibility matrix: doing excellent work that the wrong people see. Here&apos;s the exact playbook to fix it.
          </p>
        </div>
      </section>

      {/* Work-Visibility Matrix */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The work-visibility matrix</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Promotion requires both. Most candidates optimize for only one — and wonder why nothing happens.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {VISIBILITY_MATRIX.map((q) => (
              <div key={q.quadrant} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] px-5 py-4" style={{ borderLeftColor: q.color, borderLeftWidth: 4 }}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{q.quadrant}</p>
                  <p className="mt-0.5 font-bold text-[var(--ink)]">{q.label}</p>
                </div>
                <div className="p-5">
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{q.description}</p>
                  <div className="mt-4 rounded-lg bg-white px-4 py-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: q.color }}>What to do</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{q.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 90-Day Sprint */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 90-day promotion sprint</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Most promotion cycles close 2–3 months before you hear the result. This plan works backward from the cycle close date.</p>
          <div className="mt-10 space-y-6">
            {SPRINT_WEEKS.map((phase, i) => (
              <div key={phase.week} className="relative flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-extrabold text-white">{i + 1}</span>
                  {i < SPRINT_WEEKS.length - 1 && <div className="mt-2 w-px flex-1 bg-[var(--border)]" />}
                </div>
                <div className="pb-8 pt-0.5">
                  <p className="text-[12px] font-semibold text-[var(--brand)]">{phase.week}</p>
                  <p className="mb-3 text-[17px] font-bold text-[var(--ink)]">{phase.title}</p>
                  <ul className="space-y-3">
                    {phase.actions.map((action, j) => (
                      <li key={j} className="flex gap-3 text-[13.5px] leading-6 text-[var(--muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The manager's manager test */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The manager&apos;s manager test</h2>
          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-7">
            <p className="text-[15px] leading-7 text-[var(--muted)]">Ask yourself: <strong className="text-[var(--ink)]">if your manager&apos;s manager were asked right now to name the strongest performers at your level, would your name come up?</strong></p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">In most companies, your manager&apos;s manager is either the decision-maker or the most important advocate in the promotion process. They have almost no direct visibility into your day-to-day work. They form their opinion based on: what your manager says about you, whether they&apos;ve seen you present or lead, and whether your work has surfaced in contexts they care about.</p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">If the answer to the test is no, the strategic priority is making the answer yes — before the promotion cycle, not during it.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Promotion strategy FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get AI coaching on your promotion strategy</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you through the promotion conversation, the visibility strategy, and the career narrative that makes you a clear candidate — not someone your manager has to fight for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
