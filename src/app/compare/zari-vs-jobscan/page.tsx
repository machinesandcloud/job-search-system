import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Jobscan — AI Career Coach vs ATS Resume Checker (2025)",
  description:
    "Jobscan scores your resume against job descriptions. Zari scores AND rewrites every weak bullet, then coaches you on LinkedIn, interviews, and salary negotiation too.",
  keywords: ["Zari vs Jobscan", "Jobscan alternative", "Jobscan vs AI career coach", "Jobscan review", "better than Jobscan", "ATS resume checker comparison"],
  alternates: { canonical: "/compare/zari-vs-jobscan" },
  openGraph: { title: "Zari vs Jobscan — Beyond ATS Scoring", description: "Jobscan tells you what's wrong. Zari tells you AND fixes it — then coaches you on everything else too.", url: "/compare/zari-vs-jobscan" },
};

const FAQS = [
  { question: "What does Jobscan do?", answer: "Jobscan is an ATS optimization tool that scores your resume against a job description and identifies missing keywords. It's focused on resume analysis — it tells you what's wrong but doesn't write the improved version for you." },
  { question: "How is Zari different from Jobscan?", answer: "Zari does everything Jobscan does (ATS scoring, keyword gap analysis) plus rewrites the weak bullets for you, covers LinkedIn optimization, mock interview coaching, salary negotiation, and promotion coaching — all with session memory across every interaction." },
  { question: "Is Jobscan worth it if I have Zari?", answer: "No — Zari's resume coaching includes the ATS scoring and keyword analysis that Jobscan specializes in, plus the rewrites, LinkedIn work, interview prep, and broader career coaching that Jobscan doesn't offer." },
];

const ROWS = [
  { feature: "ATS scoring vs job description", zari: true, jobscan: true },
  { feature: "Keyword gap identification", zari: true, jobscan: true },
  { feature: "Bullet rewrites (not just feedback)", zari: true, jobscan: false },
  { feature: "LinkedIn profile optimization", zari: true, jobscan: "Partial" },
  { feature: "Mock interview coaching", zari: true, jobscan: false },
  { feature: "Salary negotiation coaching", zari: true, jobscan: false },
  { feature: "Promotion coaching", zari: true, jobscan: false },
  { feature: "Session memory", zari: true, jobscan: false },
  { feature: "Voice coaching mode", zari: true, jobscan: false },
  { feature: "Free tier available", zari: true, jobscan: "Partial" },
];

export default async function ZariVsJobscanPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Link href="/compare" className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em]">Zari vs Jobscan</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/50">Jobscan tells you the score. Zari gives you the score, rewrites the resume, and coaches you on everything else.</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="py-4 pl-6 text-left text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Feature</th>
                  <th className="py-4 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</th>
                  <th className="py-4 pr-6 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Jobscan</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"}>
                    <td className="py-3.5 pl-6 text-[13.5px] text-[var(--ink)]">{row.feature}</td>
                    <td className="py-3.5 text-center">
                      {row.zari === true ? <span className="text-emerald-500">✓</span> : <span className="text-[var(--muted)]/40">—</span>}
                    </td>
                    <td className="py-3.5 pr-6 text-center">
                      {row.jobscan === true ? <span className="text-emerald-500">✓</span> : row.jobscan === false ? <span className="text-[var(--muted)]/40">—</span> : <span className="text-amber-500 text-[12px]">{row.jobscan}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
            <h3 className="mb-3 text-[15px] font-bold text-[var(--ink)]">The key difference</h3>
            <p className="text-[14px] leading-7 text-[var(--muted)]">Jobscan is a resume diagnostic — it tells you your ATS score and flags keyword gaps. You still have to figure out how to rewrite the bullets, optimize LinkedIn, prepare for interviews, and negotiate your offer. Zari does all of that, starting with the same ATS analysis Jobscan specializes in.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.8rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Score + rewrite + coach — all in one.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">Free first session. No credit card. ATS scoring included.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
