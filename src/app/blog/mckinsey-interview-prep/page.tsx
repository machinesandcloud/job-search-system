import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "McKinsey Interview Prep — The Complete Guide to Solve, Cases & PEI (2025)",
  description:
    "How McKinsey's hiring process works: the Solve digital assessment, case interviews that are hypothesis-driven (not framework-driven), and the PEI with its 4 scored themes. Stage-by-stage preparation guide.",
  keywords: ["McKinsey interview prep", "McKinsey case interview", "McKinsey PEI", "McKinsey Solve assessment", "how to get a job at McKinsey", "McKinsey interview process", "McKinsey hiring process"],
  alternates: { canonical: "/blog/mckinsey-interview-prep" },
  openGraph: {
    title: "McKinsey Interview Prep — Solve, Cases & PEI (2025)",
    description: "McKinsey's 3-stage gauntlet explained: the Solve assessment, hypothesis-driven case interviews, and the PEI themes McKinsey actually scores.",
    url: "/blog/mckinsey-interview-prep",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const STAGES = [
  {
    stage: "Stage 1: The Solve digital assessment",
    time: "~75 minutes",
    accent: "#7C3AED",
    what: "McKinsey replaced the old Problem Solving Test (PST) with Solve — a gamified digital assessment. It tests problem-solving, numerical reasoning, and logical inference through interactive scenarios rather than a multiple-choice test. Most candidates find it harder to prepare for than a standard test because the game-like format is unfamiliar.",
    howToPrep: [
      "Practice the specific game types — 'Ecosystem Building' (resource allocation under constraint) and 'Redrock Study' (causal inference from data). McKinsey publishes practice versions.",
      "Speed is critical. Solve is time-pressured. Practice reading charts and making numerical estimates quickly without a calculator.",
      "Don't overthink the 'right' answer. Solve tests consistency of reasoning — there are often no objectively correct answers, just better-reasoned ones.",
      "Mental math fluency is essential. Practice 2-digit multiplication and percentage estimation until it's automatic.",
    ],
  },
  {
    stage: "Stage 2: Case interviews",
    time: "4–6 rounds across 2 interview days",
    accent: "#0891B2",
    what: "McKinsey cases are candidate-led and hypothesis-driven. Unlike BCG (which accepts structured frameworks) or Bain (which is more interviewer-led), McKinsey expects you to form an initial hypothesis immediately and test it directionally. Interviewers evaluate whether you think like a consultant — not whether you know the right framework.",
    howToPrep: [
      "Lead with a hypothesis, not a framework. McKinsey interviewers are skeptical of candidates who recite issue trees. They want to hear: 'My initial hypothesis is X, and I want to test it by looking at Y and Z.'",
      "Synthesize as you go, not at the end. After each piece of analysis, say what it means for your hypothesis. 'This suggests X, which is consistent with my hypothesis / makes me want to revise it.'",
      "Numbers fluency is non-negotiable. Every case will have math. Practice doing case math in your head — rounding, estimation, sanity checks.",
      "Practice 2–3 cases per day for 4–6 weeks. Quality matters more than volume. A debriefed case you understand deeply is worth more than five you just went through.",
    ],
  },
  {
    stage: "Stage 3: The PEI (Personal Experience Interview)",
    time: "30–45 minutes, woven into case rounds",
    accent: "#059669",
    what: "The PEI is McKinsey's version of a behavioral interview — but it's more probing than standard STAR questions. McKinsey interviewers will ask one PEI question and drill into it for 20–30 minutes with detailed follow-ups. They're testing for 4 specific competency themes, and they will not move to the next story until they've fully explored the first one.",
    howToPrep: [
      "Prepare 3–4 deep stories, not 10 shallow ones. Your PEI story will be unpacked for 30 minutes — it needs enough texture to sustain that.",
      "Know your stories better than any facts. You should be able to answer 'what were you thinking at that exact moment?' without hesitation.",
      "Practice with a partner who pushes back. 'Why did you decide that?' 'What would you do differently?' 'What were the others in the room thinking?' — this is exactly how the interviewer will probe.",
      "The story you choose matters. Each of the 4 PEI themes has specific leadership behaviors McKinsey is testing for. Map your stories to the right theme before interviews.",
    ],
  },
];

const PEI_THEMES = [
  {
    theme: "Personal impact",
    what: "Did you influence a decision or outcome without direct authority? McKinsey wants evidence that you can move people and organizations through logic, relationships, and credibility — not position.",
    trap: "Choosing stories where you had authority or a clear mandate. McKinsey wants influence under constraint.",
    example: "You identified that a key stakeholder was blocking a project for unstated reasons, had a series of private conversations to understand their real concern, and modified the proposal to address it — resulting in buy-in you wouldn't have gotten otherwise.",
  },
  {
    theme: "Entrepreneurial drive",
    what: "Did you start something from nothing, take on something beyond your role, or push through ambiguity to create an outcome that didn't exist before?",
    trap: "Confusing hard work with entrepreneurialism. Working 80-hour weeks to deliver an assigned project is not an entrepreneurial story.",
    example: "You noticed a gap no one owned, proposed a solution no one asked for, built it with resources you borrowed rather than were given, and produced a measurable result that changed how the team operated.",
  },
  {
    theme: "Inclusive leadership",
    what: "Did you build and lead a team through conflict, diversity of perspective, or competing interests? McKinsey specifically tests whether you can bring people together rather than steamroll toward your preferred outcome.",
    trap: "Stories where everyone agreed and things went smoothly. Inclusive leadership stories need tension.",
    example: "You inherited a team with a pre-existing conflict between two strong contributors, diagnosed the root cause of the conflict through individual conversations, and restructured the team's interaction patterns in a way that resolved the dynamic and improved output.",
  },
  {
    theme: "Courageous change",
    what: "Did you challenge the status quo or push back against authority when you believed the direction was wrong? McKinsey values consultants who will tell clients uncomfortable truths — they test this directly.",
    trap: "Being diplomatic about disagreement. McKinsey wants you to have actually said the hard thing to the person who needed to hear it.",
    example: "You presented analysis that contradicted your senior partner's working hypothesis, knew it would create friction, and presented it clearly anyway — with the evidence that led you there and a recommendation for what to do given the new finding.",
  },
];

const FAQS = [
  { question: "How hard is it to get a job at McKinsey?", answer: "Acceptance rates at McKinsey are estimated at 1–3% of total applicants. At the case interview stage, pass rates are higher — roughly 30–50% of candidates who reach the interview round receive an offer, depending on the office. The filtering happens at the resume screen and Solve assessment. The implication: getting to the interview stage is the first battle; case and PEI preparation is the second." },
  { question: "Does McKinsey care about what school you went to?", answer: "McKinsey has a historically strong preference for target schools — top-5 undergrad programs, top-10 MBA programs, and elite professional schools. But this has relaxed meaningfully in recent years. McKinsey now recruits explicitly from non-target schools, and exceptional performance at the Solve and case stage can overcome a non-target background. The resume screen is the most school-dependent part of the process." },
  { question: "How is McKinsey different from BCG and Bain in the interview process?", answer: "McKinsey is the most hypothesis-driven of the three — they expect you to form a hypothesis at the start of a case and test it, not work through a pre-built issue tree. BCG cases are often more open to structured frameworks and interviewer-guided. Bain cases are frequently interviewer-led with more of a back-and-forth dialogue. The PEI is McKinsey-specific — BCG and Bain have behavioral interviews but not in the same deep-dive single-story format." },
  { question: "What should I do if I fail a McKinsey interview?", answer: "McKinsey has a re-application policy — most offices require 12–24 months before reapplying. Use that time deliberately: work on the specific weakness (Solve performance, case structure, or PEI depth), take on experiences that give you better PEI stories, and consider whether the timing of your application made sense. Many successful McKinsey hires failed a first-round interview. The PEI is often the differentiator on second attempts — people prep cases heavily and underprepare the personal experience component." },
];

export default async function McKinseyInterviewPrepPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="McKinsey Interview Prep — The Complete Guide to Solve, Cases & PEI (2025)"
        description="McKinsey's 3-stage gauntlet: Solve assessment, hypothesis-driven cases, and PEI themes explained."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/mckinsey-interview-prep`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "McKinsey Interview Prep", url: `${BASE_URL}/blog/mckinsey-interview-prep` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interview Prep</span>
            <span className="text-[11px] text-white/30">14 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            McKinsey interview prep<br /><span className="gradient-text-animated">the complete guide</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            McKinsey&apos;s interview process is distinct from every other firm: a gamified digital assessment, hypothesis-driven cases that actively resist frameworks, and a personal experience interview that drills one story for 30 minutes. Generic consulting prep doesn&apos;t prepare you for it.
          </p>
        </div>
      </section>

      {/* Three stages */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">McKinsey&apos;s 3-stage gauntlet</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Each stage requires different preparation. Most candidates over-index on cases and underprep Solve and the PEI.</p>
          <div className="mt-10 space-y-6">
            {STAGES.map((s, i) => (
              <div key={s.stage} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-6 py-5" style={{ borderLeftColor: s.accent, borderLeftWidth: 4 }}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ backgroundColor: s.accent }}>{i + 1}</span>
                    <div>
                      <p className="font-bold text-[var(--ink)]">{s.stage}</p>
                      <p className="text-[12px]" style={{ color: s.accent }}>{s.time}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">{s.what}</p>
                </div>
                <div className="px-6 py-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: s.accent }}>How to prepare</p>
                  <ul className="space-y-3">
                    {s.howToPrep.map((tip, j) => (
                      <li key={j} className="flex gap-3 text-[13.5px] leading-6 text-[var(--muted)]">
                        <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: s.accent }}>{j + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PEI Themes */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 PEI themes McKinsey scores</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Every PEI question maps to one of these four themes. Matching your stories to the right theme — and knowing what each one tests — is how you prepare for a 30-minute drill.</p>
          <div className="mt-8 space-y-5">
            {PEI_THEMES.map((t) => (
              <div key={t.theme} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[#052830] px-6 py-4">
                  <p className="font-bold text-white">{t.theme}</p>
                  <p className="mt-1 text-[13px] text-white/60">{t.what}</p>
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Common trap</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{t.trap}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Strong example pattern</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{t.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How McKinsey differs */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How McKinsey cases differ from BCG and Bain</h2>
          <div className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)]">
              {["", "McKinsey", "BCG / Bain"].map((h) => (
                <div key={h} className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{h}</div>
              ))}
            </div>
            {[
              { dimension: "Opening approach", mckinsey: "State a hypothesis immediately — before structure", bcg: "Issue tree / framework first" },
              { dimension: "Structure style", mckinsey: "Hypothesis-driven: test, revise, conclude", bcg: "Framework-driven: drill down the tree" },
              { dimension: "Interview style", mckinsey: "Mostly candidate-led", bcg: "More interviewer dialogue (Bain especially)" },
              { dimension: "Behavioral component", mckinsey: "PEI: one story, 30-minute deep dive", bcg: "Standard behavioral (STAR format)" },
              { dimension: "What they penalize", mckinsey: "Reciting frameworks without a hypothesis", bcg: "Unstructured thinking, jumping to conclusions" },
            ].map((row, i) => (
              <div key={row.dimension} className={`grid grid-cols-3 ${i < 4 ? "border-b border-[var(--border)]" : ""}`}>
                <div className="bg-[var(--bg)] px-5 py-4 text-[13px] font-semibold text-[var(--ink)]">{row.dimension}</div>
                <div className="px-5 py-4 text-[13px] text-[var(--muted)]">{row.mckinsey}</div>
                <div className="px-5 py-4 text-[13px] text-[var(--muted)]">{row.bcg}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">McKinsey interview FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get AI coaching for your McKinsey interview</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches behavioral answers with the STAR framework evaluated against McKinsey&apos;s PEI themes — so you go in with stories mapped to the specific competencies McKinsey tests.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
