import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Microsoft Copilot — Which AI Is Better for Job Search? (2025)",
  description:
    "Microsoft Copilot is a general-purpose AI embedded in Office apps. Zari is purpose-built for job search. Here's exactly where each tool wins — and where Copilot falls short for candidates.",
  keywords: ["Zari vs Microsoft Copilot", "Microsoft Copilot for job search", "Copilot vs AI career coach", "is Microsoft Copilot good for resumes", "AI job search tools comparison"],
  alternates: { canonical: "/compare/zari-vs-microsoft-copilot" },
  openGraph: {
    title: "Zari vs Microsoft Copilot — Which AI Is Better for Job Search? (2025)",
    description: "Copilot is great at some job search tasks and missing from others. Here's where each tool actually wins.",
    url: "/compare/zari-vs-microsoft-copilot",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SCENARIOS = [
  {
    task: "Tailoring your resume to a specific job posting",
    copilot: { verdict: "Limited", detail: "Copilot can compare two documents in Word if prompted correctly, but it has no awareness of ATS systems, keyword weighting, or what recruiters actually scan for. It will reword bullets — it won't tell you which keywords you're missing or whether your resume will pass screening." },
    zari: { verdict: "Built for this", detail: "Zari automatically scores your resume against the specific job description, identifies missing keywords by section, and rewrites bullets with the right density and framing. It knows what ATS systems look for because it's built around that problem." },
    winner: "Zari",
  },
  {
    task: "Writing a cover letter",
    copilot: { verdict: "Passable", detail: "Copilot in Word will draft a cover letter from a prompt. The output is generic — competently written but lacking specificity about the role, the company's actual priorities, or the candidate's fit. Works if you do significant manual editing after." },
    zari: { verdict: "Built for this", detail: "Zari generates a cover letter tailored to the specific role and company, grounded in your actual background and the job description requirements. It prompts you for the context that makes a cover letter specific rather than filling in blanks." },
    winner: "Zari",
  },
  {
    task: "Preparing for interviews",
    copilot: { verdict: "Can simulate Q&A", detail: "Copilot can roleplay as an interviewer if you set up the prompt. But it has no framework for evaluating your answers — no STAR scoring, no awareness of what the specific role expects, no coaching on what's weak in your response." },
    zari: { verdict: "Built for this", detail: "Full STAR framework evaluation with specific feedback on situation clarity, action specificity, and result quantification. Zari knows which questions to expect for the role you're targeting and coaches you on the dimensions interviewers actually score." },
    winner: "Zari",
  },
  {
    task: "Researching a company before an interview",
    copilot: { verdict: "Strong", detail: "Copilot with web search is excellent here — it can synthesize recent news, financials, leadership changes, and culture signals from multiple sources quickly. This is a genuine Copilot strength for job seekers." },
    zari: { verdict: "Not the focus", detail: "Zari is built for coaching, not research. For company research, Copilot or Perplexity is the better tool." },
    winner: "Copilot",
  },
  {
    task: "LinkedIn profile optimization",
    copilot: { verdict: "Can edit text", detail: "Copilot can rewrite your LinkedIn About section if you paste it in — but it has no awareness of LinkedIn's search algorithm, recruiter keyword behavior, or what signals actually drive profile views and InMails." },
    zari: { verdict: "Built for this", detail: "Zari coaches LinkedIn optimization with awareness of how recruiter search actually works — headline formulas, keyword placement in the About section, and the specific signals that drive InMail volume." },
    winner: "Zari",
  },
  {
    task: "Drafting professional emails (follow-ups, thank-yous, cold outreach)",
    copilot: { verdict: "Good", detail: "Copilot in Outlook is genuinely useful for drafting emails — it's fast, contextually aware if you give it the thread, and good at adjusting tone. For one-off email drafting, Copilot is a reasonable tool." },
    zari: { verdict: "Overkill for emails", detail: "Zari can coach email strategy, but using a full AI career coach for every email draft is unnecessary overhead." },
    winner: "Copilot",
  },
  {
    task: "Salary negotiation coaching",
    copilot: { verdict: "Generic advice", detail: "Copilot knows general negotiation principles — it can tell you to get competing offers, to counter in writing, to anchor high. But it has no model of your specific situation, industry comp benchmarks, or the leverage dynamics of your offer." },
    zari: { verdict: "Built for this", detail: "Zari coaches the actual negotiation conversation — what to say, how to handle specific pushback scripts, how to evaluate equity vs. base tradeoffs, and what the realistic range is for your level and market." },
    winner: "Zari",
  },
];

export default async function ZariVsMicrosoftCopilotPage() {
  const userId = await getCurrentUserId();
  const copilotWins = SCENARIOS.filter((s) => s.winner === "Copilot").length;
  const zariWins = SCENARIOS.filter((s) => s.winner === "Zari").length;

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Microsoft Copilot", url: `${BASE_URL}/compare/zari-vs-microsoft-copilot` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" /> Side-by-Side Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em]">Zari vs Microsoft Copilot</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/55">
            Copilot is a general AI embedded in Office apps. Zari is purpose-built for job search coaching. They overlap in some areas and diverge completely in others.
          </p>
        </div>
      </section>

      {/* What each tool is */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">What Microsoft Copilot is</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">A general-purpose AI built into Microsoft 365</p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">Copilot is embedded in Word, Outlook, LinkedIn, Teams, and other Microsoft products. It&apos;s a powerful general-purpose AI that can edit documents, summarize meetings, draft emails, and search the web. It has no career coaching framework and no model of your job search — it&apos;s a smart assistant that does whatever you prompt it to do.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">What Zari is</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">A purpose-built AI career coaching platform</p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">Zari is built specifically for job search — ATS resume scoring, STAR interview coaching, LinkedIn profile optimization, and salary negotiation strategy. It has session memory that tracks your search context, role targets, and coaching history. Unlike general AI, Zari brings a coaching framework to every interaction rather than responding to open-ended prompts.</p>
            </div>
          </div>

          {/* Score summary */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
              <p className="text-3xl font-extrabold text-[var(--brand)]">{zariWins}<span className="text-[16px]">/{SCENARIOS.length}</span></p>
              <p className="mt-1 text-[12px] text-[var(--muted)]">scenarios where Zari wins</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
              <p className="text-3xl font-extrabold text-[var(--ink)]">{copilotWins}<span className="text-[16px]">/{SCENARIOS.length}</span></p>
              <p className="mt-1 text-[12px] text-[var(--muted)]">scenarios where Copilot wins</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario breakdown */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task breakdown</h2>
          <div className="mt-8 space-y-5">
            {SCENARIOS.map((s) => (
              <div key={s.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{s.task}</p>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${s.winner === "Zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-gray-100 text-gray-700"}`}>{s.winner} wins</span>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Microsoft Copilot</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.copilot.verdict === "Strong" || s.copilot.verdict === "Good" ? "bg-green-50 text-green-700" : s.copilot.verdict === "Passable" || s.copilot.verdict === "Can simulate Q&A" || s.copilot.verdict === "Can edit text" || s.copilot.verdict === "Generic advice" ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-500"}`}>{s.copilot.verdict}</span>
                    </div>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.copilot.detail}</p>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.zari.verdict === "Built for this" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-gray-50 text-gray-500"}`}>{s.zari.verdict}</span>
                    </div>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Honest verdict</p>
            <p className="text-[17px] font-bold text-[var(--ink)]">Use both — they don&apos;t actually compete for most job search tasks</p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">Copilot is genuinely good at company research, email drafting, and document editing. If you have Microsoft 365, you already have access to it and there&apos;s no reason not to use it for those tasks.</p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">But Copilot has no model of your job search, no ATS framework, no STAR coaching, and no session memory. For everything that directly affects your candidacy — resume scoring, interview prep, LinkedIn optimization, salary negotiation — Zari is built for the problem in a way a general-purpose AI fundamentally isn&apos;t.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[var(--brand)]/[0.06] p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Use Copilot for</p>
                <ul className="space-y-1.5 text-[13px] text-[var(--muted)]">
                  <li>→ Company and industry research</li>
                  <li>→ Email drafting and editing</li>
                  <li>→ Document proofreading</li>
                  <li>→ Meeting summaries (if job searching actively)</li>
                </ul>
              </div>
              <div className="rounded-xl bg-[var(--brand)]/[0.06] p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Use Zari for</p>
                <ul className="space-y-1.5 text-[13px] text-[var(--muted)]">
                  <li>→ ATS resume scoring and rewriting</li>
                  <li>→ Behavioral interview coaching</li>
                  <li>→ LinkedIn profile optimization</li>
                  <li>→ Salary negotiation strategy</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
                Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
