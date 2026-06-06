import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Interview Coach — Practice & Ace Any Job Interview | Zari",
  description:
    "Why most interview prep fails, the STAR method explained deeply, how interviewers score answers, and the fatal mistakes that end interviews. Zari's AI coach gives live scoring and specific fixes after every answer.",
  keywords: ["AI interview coach", "mock interview AI", "interview preparation", "job interview coaching", "AI interview practice", "STAR method coaching", "behavioral interview prep", "interview simulator", "online interview coach", "interview feedback"],
  alternates: { canonical: "/ai-interview-coach" },
  openGraph: {
    title: "AI Interview Coach — Practice Until You're Unbreakable | Zari",
    description: "Why most interview prep fails, how interviewers actually score your answers, and how Zari's AI coach fixes your answers in real time.",
    url: "/ai-interview-coach",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PREP_MISTAKES = [
  {
    mistake: "Practicing answers instead of practicing structure",
    detail: "Most candidates memorize 10–15 stories and try to map them to questions. But real interviews ask variants, follow-ups, and curveballs. Practicing answers builds a script — practicing the STAR structure builds a skill. The skill transfers; the script doesn't.",
  },
  {
    mistake: "Describing what the team did, not what you did",
    detail: "The single most common reason answers fail behavioral scoring: the Action section says 'we deployed the feature' or 'our team improved retention.' Interviewers are evaluating your judgment and initiative — not your team's. Every answer must have an explicit 'I' in the Action.",
  },
  {
    mistake: "Missing the Result entirely",
    detail: "Research shows over 60% of behavioral answers in real interviews lack a quantified result. 'The project was a success' is not a result. 'User activation increased 34% in 6 weeks, exceeding the target by 12 points' is a result. Numbers are the only part of your answer a stressed interviewer will remember.",
  },
  {
    mistake: "Practicing in a comfortable environment",
    detail: "Answering questions alone in your notes is not practice — it is planning. Real interviews are high-pressure, timed, and verbal. You need to practice speaking answers out loud, under time pressure, to questions you haven't seen before. This is what separates candidates who 'felt prepared' from candidates who performed.",
  },
];

const INTERVIEW_TYPES = [
  { name: "Behavioral (STAR)", description: "Questions about past experience — leadership, conflict, failure, achievement. Scored on Situation, Task, Action, Result, and Leadership signal. Common in every interview loop for all seniority levels.", what_fails: "Generic actions, no metric in the result, describing team work as personal work." },
  { name: "Technical depth interviews", description: "System design, architecture decisions, domain problem-solving. The evaluator is looking for structured thinking — how you decompose problems, manage trade-offs, and communicate under pressure. Not just the right answer.", what_fails: "Jumping to solutions before understanding the problem, not thinking out loud, vague trade-off language." },
  { name: "Case interviews", description: "Used in consulting and strategy roles. Structured frameworks, top-down communication, clear math. McKinsey, BCG, Bain cases follow distinct formats — and judges can tell in 30 seconds whether you've practiced the format.", what_fails: "Bottom-up thinking, not structuring before analyzing, running calculations without explaining them." },
  { name: "Panel interviews", description: "Multiple interviewers ask from different functional perspectives — engineering, product, design, finance. Each evaluator has different success criteria. Candidates who don't know this try to give one generic answer to all angles.", what_fails: "One-size-fits-all answers, not reading which interviewer is most skeptical, ignoring the quiet evaluator." },
];

const HOW_SCORING_WORKS = [
  { dimension: "Situation clarity", detail: "Did you establish the context quickly? Interviewers need to understand the setting in under 30 seconds. Long, winding setups lose the room before you get to the substance." },
  { dimension: "Task definition", detail: "Did you define what your specific responsibility was — not the team's goal, but your role and ownership? Weak answers blur 'what needed to happen' with 'what I specifically owned.'" },
  { dimension: "Action specificity", detail: "Did you describe what you personally did? This is the highest-weight component for most evaluators. Vague actions ('worked on', 'helped with', 'was involved in') score near zero. Specific decisions, approaches, and rationale score high." },
  { dimension: "Quantified result", detail: "Did you give a metric? Not every result has a number, but most do — and candidates who don't provide one leave the interviewer with nothing to anchor the story to. Revenue, time, percentage, headcount, scale — any real number beats no number." },
  { dimension: "Leadership signal", detail: "Did you show ownership, judgment under ambiguity, or cross-functional influence? For senior roles, this is the differentiating component. ICs and directors are evaluated against different bars here." },
  { dimension: "Communication quality", detail: "Was the answer structured and concise? Rambling, repetition, and filler words ('um', 'like', 'you know') degrade the impression even when the content is strong. Most candidates don't realize how much filler they use until they hear a recording." },
];

const FATAL_MISTAKES = [
  { mistake: "Saying 'we' in behavioral answers", impact: "Interviewers need to evaluate you — not your team. If every action is attributed to the group, there's nothing to grade. The fix is mechanical: go back and replace every 'we did' with 'I decided' or 'I led' and make it accurate." },
  { mistake: "No preparation for follow-up questions", impact: "Real interviewers always probe. 'What would you do differently?' 'Why did you choose that approach?' 'What did your manager say?' Candidates who haven't practiced follow-ups freeze or give inconsistent answers that contradict their main story." },
  { mistake: "Using the same story for multiple questions", impact: "Experienced interviewers notice. Using the same project to answer 'tell me about a time you failed' and 'tell me about a time you showed leadership' signals you have a shallow story bank. You need 6–8 distinct examples across different competencies." },
  { mistake: "Skipping the result", impact: "Even if your action section is strong, an answer without a result feels incomplete. Interviewers are trained to score the result — and a missing result automatically caps your score regardless of how good the action was." },
];

const FAQS = [
  {
    question: "Why does most interview prep fail even when candidates feel ready?",
    answer: "The most common failure mode: candidates confuse planning with practice. Writing out answers in a notebook, reading interview guides, and mentally rehearsing stories are all planning activities — they do not build the real-time verbal performance skill that interviews require. Research on skill acquisition consistently shows that performance under pressure requires practicing under pressure. The specific mechanism that fails most candidates is called 'fluency illusion' — the material feels familiar when you read it, so your brain signals readiness, even though you haven't actually activated the retrieval and verbal production pathways that an interview uses. The fix is uncomfortable: answer questions you haven't seen before, out loud, timed, with someone or something evaluating you. Zari forces this format by generating new question variants each session so you can't fall back on a rehearsed script.",
  },
  {
    question: "What is the STAR method and how do interviewers actually use it to score answers?",
    answer: "STAR stands for Situation, Task, Action, Result — a framework used by virtually all trained behavioral interviewers to evaluate answers to experience-based questions. Here's how each component is weighted in practice: Situation (10–15% of score) — establishes context quickly. Task (10–15%) — defines your specific role and ownership. Action (40–50%) — the highest-weight component. This is where your judgment, initiative, and capability are demonstrated. Weak actions are generic ('I worked on it'), strong actions are specific ('I redesigned the pricing model after discovering our discount structure was eroding margin by 8 points'). Result (20–30%) — preferably quantified. A result with a specific metric is worth significantly more than a vague positive outcome. Leadership signal is often scored as a sixth component for senior-level interviews, assessing whether you demonstrated ownership, influence, or judgment under ambiguity beyond just executing a task.",
  },
  {
    question: "What types of interview questions does Zari cover?",
    answer: "Zari covers: (1) Behavioral interviews — STAR-format questions matched to your role and seniority, covering leadership, conflict, failure, achievement, cross-functional collaboration, and ambiguity. (2) Technical interviews — coding problem walkthroughs with approach and communication scoring, system design questions, and domain-specific problem solving. (3) Case interviews — consulting format with framework assessment, math accuracy, and top-down recommendation structure. (4) Role-specific interviews — PM interviews (product sense, estimation, metrics, PM behavioral), finance interviews (valuation, LBO, M&A), and management interviews (people management, underperformance, skip-level scenarios). (5) Panel simulation — multi-interviewer scenarios where different angles are probed in sequence. For every type, Zari scores structure and content, not just whether the answer 'sounds good.'",
  },
  {
    question: "How does Zari score my interview answers differently from just practicing alone?",
    answer: "Practicing alone has a critical flaw: you're the evaluator, and you're biased toward your own answers. Your brain fills in gaps in your reasoning, hears your answers more clearly than they were spoken, and doesn't push back on vague language. Zari's AI scores every STAR component on a numeric scale with specific feedback at the sentence level. For example: 'Your Action section described what the team did (we launched, we built) instead of your individual contribution. Identify one decision you personally made and reframe it with first-person language.' This level of specificity is unavailable from self-evaluation and rare even from human coaches. Additionally, Zari asks follow-up questions just as a real interviewer would — stress-testing the consistency and depth of your answers. The combination of objective scoring, sentence-level feedback, and follow-up pressure replicates what real high-stakes interviews actually evaluate.",
  },
  {
    question: "How many practice sessions do I need before a real interview?",
    answer: "As a baseline: 3–5 full mock interview sessions before a high-stakes interview loop is the minimum for most professionals. The first session reveals your biggest structural gaps — typically missing results, weak action specificity, or relying on one or two overused stories. Sessions 2 and 3 are where you internalize the STAR structure and your scores improve most. Sessions 4–5 build the fluency and confidence so the structure becomes automatic, not labored. For very competitive loops — FAANG behavioral + technical, McKinsey or BCG case rounds, or director-level panels — 8–12 sessions is common among candidates who are seriously optimizing. The most useful signal is your STAR score trend across sessions. If your Action and Result scores are consistently 8+ and you have 6–8 distinct stories covering different competencies, you're in good shape. Zari tracks your improvement so you can see exactly where you are.",
  },
  {
    question: "Can Zari help with technical interview preparation, not just behavioral?",
    answer: "Yes. For technical roles, interview loops always include both behavioral and technical rounds — and candidates often over-index on LeetCode practice while neglecting the behavioral component, which can disqualify them in the debrief even if their technical performance was adequate. Zari coaches technical interview communication: thinking out loud, explaining trade-offs, asking clarifying questions before jumping to implementation, and structuring your approach before writing code or drawing an architecture diagram. For system design, Zari walks through problem framing, component identification, capacity estimation, and trade-off articulation — scoring how clearly you communicate your reasoning. For non-coding technical roles (finance, product, consulting), Zari covers domain-specific technical questions with framework and accuracy scoring.",
  },
];

export default async function AiInterviewCoachPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="AI Interview Coach — Why Most Prep Fails and What Actually Works"
        description="Why most interview prep fails, how STAR scoring works, the fatal mistakes that end interviews, and how Zari's AI coach gives specific fixes after every answer."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/ai-interview-coach`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Interview Coach", url: `${BASE_URL}/ai-interview-coach` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#7a8dff", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Interview Coach · Behavioral · Technical · Voice Mode
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Practice until your answers<br />
            <span style={{ background: "linear-gradient(135deg,#7a8dff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>are impossible to shake.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Most candidates feel prepared and still fail. The gap isn't knowledge — it's real-time verbal performance under pressure. Zari runs live mock interviews, scores every STAR component, and gives you the exact sentence to fix. Available 24/7, for any role.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(122,141,255,0.40)] transition-all hover:-translate-y-0.5" style={{ background: "#7a8dff" }}>
              Start interview prep free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">Free first session · No credit card · Voice or text · Any role</p>
        </div>
      </section>

      {/* Why most prep fails */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#7a8dff]">The core problem</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">Why most interview prep fails</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Candidates who feel fully prepared still underperform at a surprising rate. These are the structural reasons — not motivation or intelligence, but specific preparation mistakes that are entirely fixable.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {PREP_MISTAKES.map(({ mistake, detail }) => (
              <div key={mistake} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-3 font-extrabold text-[15px] text-[var(--ink)]">{mistake}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How interviewers score answers */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#7a8dff]">How scoring works</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">How interviewers actually score your answers</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Trained behavioral interviewers use a structured rubric — not gut feeling. Understanding the dimensions they score against is the first step to answering above the threshold. Zari scores the same six dimensions in real time.
          </p>
          <div className="space-y-4">
            {HOW_SCORING_WORKS.map(({ dimension, detail }, i) => (
              <div key={dimension} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7a8dff] text-[13px] font-black text-white">{i + 1}</div>
                <div>
                  <h3 className="mb-1.5 font-extrabold text-[15px] text-[var(--ink)]">{dimension}</h3>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview types */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#7a8dff]">Types of interviews</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">The four interview types — and what each one actually evaluates</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Every interview format has a different success model. Preparing for the wrong format — or treating all formats the same — is one of the most common structural errors. Zari adapts to each type.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {INTERVIEW_TYPES.map(({ name, description, what_fails }) => (
              <div key={name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 font-extrabold text-[15px] text-[var(--ink)]">{name}</h3>
                <p className="mb-3 text-[13px] leading-6 text-[var(--muted)]">{description}</p>
                <div className="rounded-lg bg-red-50 px-4 py-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-red-500 mb-1">Common failure</p>
                  <p className="text-[12px] leading-5 text-red-700">{what_fails}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#7a8dff]">The fatal mistakes</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">Fatal mistakes that end interviews</h2>
          <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            These errors don't just weaken answers — they signal disqualifying patterns to trained interviewers. Each one is fixable with deliberate practice.
          </p>
          <div className="space-y-4 mb-12">
            {FATAL_MISTAKES.map(({ mistake, impact }) => (
              <div key={mistake} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 font-extrabold text-[15px] text-[var(--ink)]">{mistake}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{impact}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { stat: "3/10", label: "Average first-session STAR score", sub: "Before Zari coaching" },
              { stat: "8.7/10", label: "Average score after 3 sessions", sub: "Across all question types" },
              { stat: "6+", label: "Distinct story examples needed", sub: "For a competitive interview bank" },
            ].map(({ stat, label, sub }) => (
              <div key={label} className="rounded-2xl border border-[var(--border)] bg-white p-5 text-center">
                <p className="text-[2.2rem] font-extrabold text-[#7a8dff]">{stat}</p>
                <p className="mt-1 text-[13px] font-bold text-[var(--ink)]">{label}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-[#7a8dff] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-3 text-[1.9rem] font-extrabold text-white">Find out exactly what your answers are missing.</h2>
          <p className="mb-7 text-[15px] text-white/75">One free mock interview session. Zari scores every STAR component and gives you the specific sentence to fix.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#7a8dff] transition-all hover:-translate-y-0.5">
            Start my first session free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#7a8dff]">Common questions</div>
          <h2 className="mb-10 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Everything you need to know about AI interview coaching</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-3 font-bold text-[15px] text-[var(--ink)]">{question}</h3>
                <p className="text-[13px] leading-7 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28 text-white" style={{ background: "linear-gradient(135deg, #0d0d2b 0%, #3d4a99 50%, #7a8dff 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-[2.6rem] font-extrabold tracking-[-0.03em]">Your interview coach is ready now.</h2>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/60">
            One free session. Voice or text. Behavioral, technical, or case — your call. Zari scores every answer and tells you exactly what to fix before the real thing.
          </p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#7a8dff] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)]">
            {userId ? "Go to dashboard" : "Start interview prep free"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <p className="mt-5 text-[12px] text-white/35">No credit card required · Free first session · STAR scoring included · Voice or text</p>
        </div>
      </section>
    </PageFrame>
  );
}
