import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Google Gemini for Career Coaching — Which Is Better? (2025)",
  description:
    "Comparing Zari and Google Gemini for resume writing, interview prep, and career coaching. Gemini is a general AI with real-time web search. Zari is purpose-built for career coaching with ATS scoring and session memory. Here's where the difference shows up.",
  keywords: ["Zari vs Gemini", "Gemini for career coaching", "Google Gemini resume help", "Google Gemini career advice", "AI career coach vs Gemini", "Gemini for job search", "Gemini resume writing", "Google Gemini interview prep"],
  alternates: { canonical: "/compare/zari-vs-gemini" },
  openGraph: {
    title: "Zari vs Google Gemini for Career Coaching — Which Is Better? (2025)",
    description: "Gemini's real-time web search is genuinely useful for job search research. But research and coaching are different problems. Here's where each tool wins.",
    url: "/compare/zari-vs-gemini",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Can Google Gemini help with resume writing and job interviews?",
    answer: "Yes — Gemini can draft resume bullets, suggest edits, and generate interview questions with the right prompting. Its real-time web access also means it can research salary data, company news, and job market conditions more accurately than models with static knowledge cutoffs. The gap is the same as other general AI: no session memory, no ATS scoring against a specific job description, no structured STAR evaluation. Gemini is capable with good prompting — but requires significant setup to use well for job search.",
  },
  {
    question: "What is Gemini's real advantage over other general AI tools?",
    answer: "Web search. Unlike ChatGPT (base model) or Claude, Gemini can retrieve live information from the web, including recent company news, current salary ranges from Glassdoor and Levels.fyi, and recent job postings. For pre-interview company research and salary benchmarking, Gemini is more current than models working from training data alone. This is a genuine advantage — but it's an advantage for the research phase of job search, not the coaching phase.",
  },
  {
    question: "Should I use Gemini or Zari for my job search?",
    answer: "Use them for different things. Gemini is excellent for pre-interview research: company news, funding rounds, recent product launches, salary benchmarking, learning about an unfamiliar industry. Zari is built for the coaching work: ATS-optimizing your resume against a specific job description, mock interviews with STAR feedback, LinkedIn optimization, and salary negotiation practice. For job search specifically, they're sequential — Gemini to research, Zari to execute.",
  },
  {
    question: "What does Zari do that Gemini can't?",
    answer: "The three things that matter most: (1) ATS scoring — paste your resume and a job description, Zari tells you your keyword match score and which gaps to close; Gemini has no way to do this without you providing the JD and manually prompting it to compare the two. (2) Session memory — Zari knows your career history across every conversation; Gemini starts fresh each session. (3) Structured interview evaluation — Zari evaluates your specific answers against STAR criteria and flags weak points; Gemini gives general feedback without a coaching framework.",
  },
];

const DIMENSIONS = [
  {
    dimension: "Company & industry research",
    winner: "gemini",
    gemini: "Gemini's web search access is a real advantage here. Ask Gemini about a company's recent funding, product launches, layoffs, or earnings — it pulls current information from the web with citations. For pre-interview research, it's faster and more current than manually searching LinkedIn or Google.",
    zari: "Zari doesn't have web search, but it coaches you on how to use your research effectively — what to work into your 'why this company' answer, what questions to ask based on what you've found, how to show preparation without it sounding rehearsed.",
  },
  {
    dimension: "Resume ATS optimization",
    winner: "zari",
    gemini: "Gemini can review resume bullets and suggest improvements if you paste both your resume and the job description and prompt it carefully. But this requires you to structure the request correctly, interpret the output, and repeat for each role. There's no scoring, no keyword gap analysis, and no memory of your background.",
    zari: "Purpose-built: paste a job description and your resume, get a specific ATS match score, a list of missing keywords ranked by importance, and rewritten bullets that include them naturally. Session memory means you don't re-explain your background every time.",
  },
  {
    dimension: "Salary benchmarking research",
    winner: "gemini",
    gemini: "Gemini can pull real-time salary data from Glassdoor, Levels.fyi, LinkedIn, Blind, and other sources. For understanding what a role pays at a specific company or level, Gemini is faster and more current than static knowledge bases.",
    zari: "Zari focuses on the negotiation itself — what number to anchor to, how to respond when they say the offer is firm, scripts for equity negotiation. It complements Gemini's research rather than replacing it.",
  },
  {
    dimension: "Interview coaching",
    winner: "zari",
    gemini: "Gemini can generate interview questions and general frameworks for answering them. It can also give feedback on a written answer if you paste it in. What it can't do: evaluate your real-time spoken answers, flag weak STAR structure, score answer quality against the question, or remember what you struggled with last session.",
    zari: "Full AI interview coach: simulate a mock interview, answer in real time, get structured STAR feedback after each response. Zari tracks which question types you struggle with across sessions and adjusts what to practice.",
  },
  {
    dimension: "LinkedIn optimization",
    winner: "zari",
    gemini: "Gemini can give general LinkedIn advice and rewrite individual sections if you paste them. It can't analyze your full profile against a target role, identify keyword gaps that affect recruiter search ranking, or score your headline for algorithm visibility.",
    zari: "Full LinkedIn coaching: headline optimization for recruiter search, About section rewriting, experience bullet optimization for ATS and keyword density. Understands the difference between writing for humans vs. writing for LinkedIn's search algorithm.",
  },
  {
    dimension: "General writing & flexibility",
    winner: "gemini",
    gemini: "Gemini is a capable general-purpose writing assistant — emails, cover letters, documents, research summaries. If you use Google Workspace, Gemini integrates directly into Docs, Gmail, and Sheets, which is genuinely useful for organizing a job search.",
    zari: "Zari is specialized for career coaching — it's not designed to be a general writing assistant. If you need help with things outside the job search funnel, Gemini or another general tool is the better fit.",
  },
  {
    dimension: "Salary negotiation coaching",
    winner: "zari",
    gemini: "Can discuss negotiation strategy at a general level. With the right prompting, can generate counter-offer scripts. Doesn't know your specific situation across sessions and can't give calibrated advice on whether to push or when to accept.",
    zari: "Dedicated salary negotiation coach: counter-offer scripts calibrated to your situation, how to respond to specific pushbacks ('we're at the top of the band'), equity negotiation strategy, and timing guidance on when to accept vs. hold.",
  },
];

export default async function ZariVsGeminiPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Gemini", url: `${BASE_URL}/compare/zari-vs-gemini` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Zari vs Google Gemini · 2025 Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.4rem]">
            Zari vs Google Gemini
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Gemini&apos;s web search is genuinely useful for job search research — company intel, salary data, industry context. But research and coaching are different problems. Here&apos;s where each tool actually wins.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Google Gemini</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">General AI with web search</p>
              <p className="mt-3 text-[13px] leading-6 text-white/50">Best for: company research, salary benchmarking, real-time information, Google Workspace integration. No ATS scoring, no session memory, no coaching framework.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">Purpose-built career coach</p>
              <p className="mt-3 text-[13px] leading-6 text-white/60">Built for the coaching phase: ATS resume scoring, mock interview evaluation, LinkedIn optimization, salary negotiation. Knows your career across sessions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">

          <div className="mb-4 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
            <p className="text-[14px] leading-7 text-[var(--ink)]">
              <span className="font-bold">The core difference: research vs. coaching.</span> Gemini is strong at finding information — what a company raised, what a role pays, what happened in a recent earnings call. Zari is built for what you do with that information: building the application, practicing the interview, negotiating the offer. Most successful job seekers use both — sequentially.
            </p>
          </div>

          <h2 className="mb-3 mt-14 text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Dimension by dimension</h2>
          <p className="mb-10 text-[15px] text-[var(--muted)]">An honest breakdown across every major job search activity.</p>

          <div className="space-y-5">
            {DIMENSIONS.map((d) => (
              <div key={d.dimension} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{d.dimension}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${d.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-slate-100 text-slate-600"}`}>
                    {d.winner === "zari" ? "Zari wins" : "Gemini wins"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Google Gemini</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{d.gemini}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{d.zari}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The verdict: complementary, not competing</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Gemini and Zari serve different phases of the same process. Before you engage with a role — use Gemini to research the company, understand the industry, and get a sense of what the role pays at that level. Once you&apos;re engaging — use Zari to build the tailored resume, practice the interviews, optimize LinkedIn, and negotiate the offer.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The gap where candidates struggle isn&apos;t usually research — they know how to Google. It&apos;s the execution: writing resume bullets that pass ATS, giving interview answers that score well on STAR, asking for salaries that are grounded in market data. That&apos;s the coaching layer. Gemini doesn&apos;t provide it by design. Zari does.
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

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em]">Try the AI built for career coaching — free.</h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] text-white/55">ATS scoring, mock interviews with STAR feedback, LinkedIn optimization, and salary negotiation. One free session on every surface — no card required.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
