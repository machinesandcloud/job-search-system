import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Copy.ai for Job Search & Career Coaching (2025)",
  description:
    "Honest breakdown: Copy.ai is a general-purpose content AI. Zari is built specifically for job search — with ATS resume analysis, interview coaching, LinkedIn optimization, and salary negotiation. See the difference.",
  keywords: ["zari vs copy.ai", "copy.ai for resume", "copy.ai vs career coach", "best AI for job search", "AI resume writer comparison"],
  alternates: { canonical: "/compare/zari-vs-copy-ai" },
  openGraph: {
    title: "Zari vs Copy.ai for Job Search (2025)",
    description: "Copy.ai writes content. Zari coaches careers. Here's when each tool is actually the right choice.",
    url: "/compare/zari-vs-copy-ai",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "ATS resume optimization",
    copyai: { capable: false, detail: "Copy.ai can rewrite resume bullets with better language, but has no concept of ATS parsing, keyword density, or formatting rules that affect machine readability. It generates good-sounding text that may still fail automated screening." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific job description, identifies missing keywords, flags formatting issues that break ATS parsing, and rewrites bullets to pass screening before a human ever sees it." },
    winner: "zari",
    significance: "high",
  },
  {
    task: "Cover letter writing",
    copyai: { capable: true, detail: "Copy.ai has strong cover letter templates and can generate fluent, professional letters quickly. It's genuinely good at this task for someone who knows what they want to say and needs help with phrasing." },
    zari: { capable: true, detail: "Zari writes cover letters tuned to the specific job description — matching the company's language, addressing requirements explicitly, and positioning your background relative to what the role actually needs." },
    winner: "zari",
    significance: "medium",
  },
  {
    task: "Interview preparation",
    copyai: { capable: false, detail: "Copy.ai can generate a list of likely interview questions, but it's a text generation task — there's no coaching layer, no behavioral method guidance, no way to practice and get feedback on your answers." },
    zari: { capable: true, detail: "Zari runs structured interview coaching sessions: generates role-specific questions, coaches STAR-method responses, identifies weak answers, and runs mock interviews with feedback on substance and delivery." },
    winner: "zari",
    significance: "high",
  },
  {
    task: "LinkedIn profile optimization",
    copyai: { capable: false, detail: "Copy.ai can rewrite LinkedIn sections you paste in, but it has no understanding of how LinkedIn's algorithm ranks profiles, what keyword placement matters for recruiter search, or how to optimize for discoverability." },
    zari: { capable: true, detail: "Zari optimizes for LinkedIn's search algorithm specifically — headline construction, About section structure, skills section strategy, and the keyword placement patterns that surface your profile to recruiters searching your target roles." },
    winner: "zari",
    significance: "high",
  },
  {
    task: "Salary negotiation coaching",
    copyai: { capable: false, detail: "Not a use case Copy.ai is designed for. You can use it to draft a negotiation email, but it has no negotiation coaching capability, no compensation data, and no ability to coach the live conversation." },
    zari: { capable: true, detail: "Zari coaches the full negotiation: market comp research, counteroffer strategy, objection handling, and specific scripts for the call — including how to respond when they say 'this is our final offer' (it usually isn't)." },
    winner: "zari",
    significance: "high",
  },
  {
    task: "General content writing (blog posts, social, marketing)",
    copyai: { capable: true, detail: "Copy.ai was built for this. Marketing copy, social posts, product descriptions, email sequences — it has dedicated workflows, templates, and a large team focused on this specific use case." },
    zari: { capable: false, detail: "Zari is built exclusively for career use cases. It's the wrong tool for general content marketing, blog writing, or anything outside the job search and career development context." },
    winner: "copyai",
    significance: "high",
  },
  {
    task: "Job description analysis & targeting",
    copyai: { capable: false, detail: "Copy.ai can summarize or rewrite a job description, but it can't tell you what skills to emphasize, how your background maps to the role, or what gaps exist between your resume and the requirements." },
    zari: { capable: true, detail: "Zari reads a job description and maps it against your resume — showing you exactly what to emphasize, what's missing, what keywords the ATS will look for, and how to position your experience for this specific role." },
    winner: "zari",
    significance: "high",
  },
];

const WHEN_TO_CHOOSE = [
  {
    tool: "Choose Zari when",
    accent: "#0D7182",
    items: [
      "You're actively job searching and need your resume to pass ATS screening",
      "You want structured interview coaching, not just a list of questions",
      "Your LinkedIn isn't getting recruiter views and you need the algorithm fixed",
      "You're negotiating an offer and need both data and coaching on the conversation",
      "You're making a career change and need your resume repositioned for a new field",
    ],
  },
  {
    tool: "Choose Copy.ai when",
    accent: "#6B7280",
    items: [
      "You need marketing copy — product descriptions, email sequences, ad copy",
      "You want blog posts, social media content, or content at scale",
      "Your use case is content operations for a marketing team",
      "You need brand voice consistency across large volumes of content",
      "The job is creating content, not finding one",
    ],
  },
];

const SCORE_DATA = (() => {
  const zariWins = TASK_COMPARISON.filter(t => t.winner === "zari").length;
  const copyaiWins = TASK_COMPARISON.filter(t => t.winner === "copyai").length;
  return { zariWins, copyaiWins, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Can I use Copy.ai to write my resume?", answer: "You can — Copy.ai can produce well-written resume bullets if you give it the right prompts. The limitation is what it doesn't know: ATS parsing rules, keyword optimization against a specific job description, and the formatting patterns that determine whether your resume gets read by a machine before a human. For a casual job seeker updating their resume occasionally, Copy.ai might be enough. For an active search where ATS pass rates matter, a purpose-built tool like Zari is meaningfully better." },
  { question: "Is Copy.ai good for job seekers?", answer: "Copy.ai is a general-purpose AI writing tool that job seekers sometimes use for resume bullets and cover letters. It generates fluent, professional-sounding text, but it wasn't designed for career use cases — it has no ATS optimization, no interview coaching, no LinkedIn algorithm knowledge, and no salary negotiation capability. It's a solid writing assistant that can help you sound better; it's not a career coach." },
  { question: "What does Zari do that Copy.ai can't?", answer: "The core differences are: (1) ATS resume analysis — Zari knows what makes a resume machine-readable and keyword-matched to a specific job; (2) Interview coaching — structured behavioral coaching with STAR-method feedback, not just question lists; (3) LinkedIn optimization — algorithm-aware profile strategy, not just rewriting text you paste in; (4) Salary negotiation — compensation data plus coaching the live conversation, including objection handling. These are purpose-built career functions that a general content AI doesn't have." },
];

export default async function ZariVsCopyAiPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Copy.ai", url: `${BASE_URL}/compare/zari-vs-copy-ai` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Tool Comparison · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">
            Zari vs Copy.ai
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Copy.ai is a general-purpose content AI. Zari is purpose-built for job search. The question isn&apos;t which is better at writing — it&apos;s whether your use case is content or career.
          </p>
          {/* Live scoreboard */}
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zariWins}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.copyaiWins}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Copy.ai wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE_DATA.total} evaluated tasks</p>
        </div>
      </section>

      {/* Task comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task breakdown</h2>
          <p className="mt-2 text-[15px] text-[var(--muted)]">Evaluated on whether each tool was purpose-built for the task — not just whether it can produce output.</p>
          <div className="mt-8 space-y-4">
            {TASK_COMPARISON.map((row) => (
              <div key={row.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${row.significance === "high" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                    {row.significance === "high" ? "High impact" : "Medium impact"}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "copyai" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.copyai.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Copy.ai {row.copyai.capable ? "✓" : "✗"}</p>
                      {row.winner === "copyai" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins here</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.copyai.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--brand)]">Wins here</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to choose */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The honest summary</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">These tools aren&apos;t really competing — they serve different use cases. Here&apos;s the clean answer.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {WHEN_TO_CHOOSE.map((col) => (
              <div key={col.tool} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="px-6 py-4 border-b border-[var(--border)]" style={{ borderTopColor: col.accent, borderTopWidth: 3 }}>
                  <p className="font-extrabold text-[var(--ink)]">{col.tool}</p>
                </div>
                <ul className="space-y-3 px-6 py-5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13.5px] text-[var(--ink)]">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: col.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to see what a career-specific AI actually does?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari is built for one thing: getting you into a better job. Resume, LinkedIn, interviews, and negotiation — purpose-built, not repurposed.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
