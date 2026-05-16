import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Google Gemini for Career Coaching — Which Is Better? (2025)",
  description:
    "Comparing Zari and Google Gemini for resume writing, interview prep, and career coaching. Gemini is a general AI assistant. Zari is purpose-built for career coaching with ATS scoring and session memory.",
  keywords: ["Zari vs Gemini", "Gemini for career coaching", "Google Gemini resume help", "Google Gemini career advice", "AI career coach vs Gemini", "Gemini for job search", "Gemini resume writing", "Google Gemini interview prep"],
  alternates: { canonical: "/compare/zari-vs-gemini" },
  openGraph: { title: "Zari vs Google Gemini for Career Coaching — Which Is Better? (2025)", description: "Gemini is Google's general-purpose AI. Zari is built specifically for career coaching. Here's the real difference.", url: "/compare/zari-vs-gemini" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Can Google Gemini help with resume writing and job interviews?", answer: "Yes — Gemini can draft resume bullets, suggest edits, and generate interview questions with the right prompting. The limitation is the same as other general AI assistants: no session memory, no ATS scoring against a specific job description, and no structured interview coaching with STAR evaluation. Gemini is capable with skilled prompting but requires significant manual effort to use well for job search." },
  { question: "What does Zari do that Gemini can't?", answer: "Zari is purpose-built for career coaching: it reads your resume and the actual job description together and tells you exactly what your ATS match score is and which keywords are missing. It remembers your career across sessions. It gives structured STAR feedback on interview answers — not just rewrites. And it coaches you through salary negotiation with market benchmarks. Gemini is a general tool that can approximate these tasks with effort; Zari is a purpose-built tool that does them by design." },
  { question: "Should I use Gemini or Zari for my job search?", answer: "They serve different purposes. Use Gemini for general writing tasks, research, and brainstorming. Use Zari when you need specific career outcomes: ATS-optimized resume, live interview coaching, LinkedIn optimization, and salary negotiation preparation. For job search specifically, Zari is the focused tool." },
];

const ROWS = [
  { feature: "Resume ATS scoring vs specific JD", zari: true, gemini: false },
  { feature: "Resume rewriting (not just feedback)", zari: true, gemini: "Manual" },
  { feature: "Session memory (knows your history)", zari: true, gemini: false },
  { feature: "Mock interview with STAR evaluation", zari: true, gemini: "Partial" },
  { feature: "LinkedIn profile scoring", zari: true, gemini: false },
  { feature: "Salary negotiation coaching", zari: true, gemini: "Partial" },
  { feature: "Career-specific question banks", zari: true, gemini: false },
  { feature: "Progress tracking across sessions", zari: true, gemini: false },
  { feature: "Google Workspace integration", zari: false, gemini: true },
  { feature: "Web search (real-time info)", zari: false, gemini: true },
  { feature: "General writing and research", zari: false, gemini: true },
  { feature: "Free tier", zari: true, gemini: true },
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
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Zari vs Google Gemini · 2025 Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Zari vs Google Gemini for Career Coaching
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Gemini is Google&apos;s general-purpose AI that can help with career tasks if you know how to prompt it. Zari is built specifically for career coaching. Here&apos;s what that difference means.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Google Gemini</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">General-purpose AI assistant</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Gemini can write resume bullets, give interview practice, and research salary data. Its advantages over other general AI tools: real-time web access and tight Google Workspace integration. The limits are the same: no session memory for your career history, no ATS scoring, and no structured interview coaching framework.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--muted)]">Best for: General writing, Google Workspace users, real-time research</div>
            </div>
            <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari AI Career Coach</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Purpose-built for job search</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Zari is trained specifically for career coaching: ATS scoring against the specific job you&apos;re targeting, session memory that remembers your career across conversations, structured STAR evaluation on interview answers, and salary negotiation coaching with real market benchmarks. Built to deliver career outcomes, not just generate text.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--brand)]">Best for: Resume, interviews, LinkedIn, negotiation, career strategy</div>
            </div>
          </div>

          <h2 className="mb-8 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-4 text-left font-semibold text-[var(--muted)]">Feature</th>
                  <th className="px-5 py-4 text-center font-bold text-[var(--brand)]">Zari</th>
                  <th className="px-5 py-4 text-center font-semibold text-[var(--muted)]">Gemini</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"}>
                    <td className="px-5 py-3.5 text-[var(--ink)]">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {row.zari === true ? <span className="text-[var(--brand)]">✓</span> : row.zari === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.zari}</span>}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {row.gemini === true ? <span className="text-emerald-600">✓</span> : row.gemini === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.gemini}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-6 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Try the AI built for career coaching — free.</h2>
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
