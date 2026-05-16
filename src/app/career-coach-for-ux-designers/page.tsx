import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for UX Designers — Portfolio, Interviews & Career Path (2025)",
  description:
    "AI career coaching for UX designers, product designers, and UX researchers. Portfolio strategy, design interview prep, case study coaching, and UX career path guidance from junior to principal.",
  keywords: ["career coach for ux designers", "ux designer career coach", "ux design career coaching", "product designer career coach", "ux portfolio coaching", "design interview prep", "ux researcher career coach", "ux career path coaching"],
  alternates: { canonical: "/career-coach-for-ux-designers" },
  openGraph: {
    title: "AI Career Coach for UX Designers — Portfolio, Case Studies & Career Path (2025)",
    description: "Portfolio strategy, case study coaching, design interview prep, and UX career path guidance — AI coaching built for UX and product designers.",
    url: "/career-coach-for-ux-designers",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What makes a strong UX designer portfolio?", answer: "The most common mistake in UX portfolios is leading with visuals and skipping the thinking. Hiring managers and design leads want to see your process: how you defined the problem, what research you did, how you synthesized insights, what you tried that didn't work, and why you made the decisions you made. Your portfolio should tell a story of judgment, not just craft. Zari coaches you on how to structure case studies that show this thinking clearly." },
  { question: "How should UX designers prepare for portfolio review interviews?", answer: "Portfolio review interviews are less about defending your design choices and more about showing how you think. Common questions: 'What would you do differently?' 'How did you know this solution was right?' 'Tell me about a time a stakeholder pushed back on your design.' Zari coaches you on articulating the reasoning behind your work, handling pushback gracefully, and making the most of the 'what would you change' question that almost always comes up." },
  { question: "What do UX designers typically get wrong on their resume?", answer: "Two main issues. First, most UX resumes are too tool-focused ('Proficient in Figma, Sketch, Miro') and not impact-focused. Recruiters want to see what your design work accomplished — conversion rates, usability scores, task completion improvements, adoption metrics. Second, many UX resumes are designed beautifully and optimized poorly for ATS — unusual layouts that parse incorrectly and miss keyword screening. Zari helps with both." },
  { question: "How is the UX job market in 2025?", answer: "The UX market has contracted significantly since the 2021–2022 peak. Companies that over-hired are leaner, and junior and mid-level UX roles are more competitive. What's differentiating candidates in 2025: demonstrated product sense (not just UX craft), metrics-oriented portfolios, experience with AI-assisted design workflows, and ability to work in smaller teams with less design support. Zari's coaching reflects current market conditions, not the pre-2023 environment." },
];

const PORTFOLIO_PRINCIPLES = [
  { principle: "Problem before solution", detail: "Open every case study by clearly stating the problem: who has it, how you know they have it, and why it matters. Hiring managers lose interest when a case study opens with wireframes before context." },
  { principle: "Show the messy middle", detail: "The most compelling portfolios include failed ideas, pivoted directions, and insights that changed the approach. Showing what you tried and discarded demonstrates more sophisticated thinking than showing a linear path to a perfect solution." },
  { principle: "Quantify your impact", detail: "Every case study should end with: what happened because of this design? If you don't have quantitative data, use qualitative signal (usability test findings, stakeholder reception, adoption observations). If you have no outcome data at all, that's a gap worth acknowledging and explaining." },
  { principle: "Three case studies, fully owned", detail: "Three deep, well-articulated case studies where you clearly explain your contribution outperforms seven shallow ones. Breadth signals junior; depth signals senior." },
];

const INTERVIEW_TYPES = [
  { type: "Portfolio review", what: "The most common UX interview format. You present 1–2 case studies and field questions. Interviewers are evaluating your communication of design thinking, not just the work itself.", prep: "Practice presenting each case study in under 12 minutes, with clear problem-process-outcome structure. Prepare for 'what would you do differently?' and 'how did you know this was the right direction?' questions." },
  { type: "Design exercise / take-home", what: "Timed or take-home design problems that simulate real work. Common at larger companies. Evaluates problem-framing, process documentation, and design quality under constraint.", prep: "The framing matters as much as the output. Zari helps you structure your design exercise response to show your process explicitly — not just the final deliverable." },
  { type: "Whiteboard / live design session", what: "Real-time design problem-solving with an interviewer observing. Tests how you think out loud, how you handle ambiguity, and how you respond to feedback mid-process.", prep: "Practice thinking out loud explicitly: narrate your reasoning as you go, ask clarifying questions before designing, and check in rather than designing in isolation." },
  { type: "Behavioral / values fit", what: "Standard behavioral interview questions: tell me about a time you disagreed with a PM, tell me about a time your design failed. Universal across most UX roles.", prep: "Prepare STAR answers specifically about designer-stakeholder dynamics, design decisions that didn't perform as expected, and research that changed your direction." },
];

export default async function CareerCoachUXDesignersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for UX Designers", url: `${BASE_URL}/career-coach-for-ux-designers` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EC4899]" />
            For UX, Product & Interaction Designers
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">UX Designers</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            In a tighter design job market, the difference between callbacks and silence is usually the portfolio case studies — and what you say about them in interviews. Zari&apos;s AI coaching helps UX designers at every level articulate their thinking, strengthen their portfolio narrative, and navigate the specific interview formats that design roles use.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio principles */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What makes a portfolio stand out in 2025</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The UX market has shifted. These are the principles that separate portfolios that get callbacks from portfolios that get scrolled past.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PORTFOLIO_PRINCIPLES.map((p, i) => (
              <div key={p.principle} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</div>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{p.principle}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview types */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">UX interview formats — and how to prep for each</h2>
          <div className="mt-10 space-y-5">
            {INTERVIEW_TYPES.map((t) => (
              <div key={t.type} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{t.type}</p>
                  <p className="mt-1 text-[13px] text-[var(--muted)]">{t.what}</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-2">How to prep</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{t.prep}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari coaches */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari coaches for UX designers</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Portfolio case study coaching", body: "Zari helps you structure each case study with clear problem framing, process documentation, and impact measurement — the structure that design leads actually evaluate." },
              { title: "Portfolio review interview prep", body: "Practice presenting your work with real-time feedback. Zari coaches you on pacing, how to articulate design decisions, and how to handle the 'what would you do differently?' question." },
              { title: "Resume impact rewriting", body: "Turn tool lists and project descriptions into impact statements. Quantify usability improvements, conversion lifts, task completion rate changes, and adoption metrics." },
              { title: "Design exercise strategy", body: "Coaching on how to approach take-home design exercises: how to frame the problem, what to show in your process, and how to present findings — not just the deliverable." },
              { title: "LinkedIn for designers", body: "LinkedIn profile optimization for UX — headline, About section, and featured work — that surfaces your profile in recruiter searches for design roles." },
              { title: "Junior-to-senior transition", body: "Coaching on what distinguishes senior and principal-level design thinking from mid-level craft — the strategic narrative, cross-functional leadership signals, and systems thinking evidence that drive level promotion." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">UX career coaching FAQs</h2>
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

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">UX career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Portfolio case study coaching, design interview prep, resume optimization, and LinkedIn — all in one AI coaching platform built for designers.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
