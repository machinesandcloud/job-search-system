import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Resume Worded — Full Comparison (2025)",
  description:
    "Resume Worded reviews your resume and LinkedIn. Zari reviews AND rewrites them, then adds mock interview coaching, salary negotiation, and promotion coaching — with session memory.",
  keywords: ["Zari vs Resume Worded", "Resume Worded alternative", "Resume Worded vs AI career coach", "Resume Worded comparison", "better than Resume Worded"],
  alternates: { canonical: "/compare/zari-vs-resume-worded" },
  openGraph: { title: "Zari vs Resume Worded — Full Comparison 2025", description: "Resume Worded gives feedback. Zari gives feedback AND the rewritten version, plus interview, salary, and promotion coaching.", url: "/compare/zari-vs-resume-worded" },
};

const FAQS = [
  { question: "What is Resume Worded?", answer: "Resume Worded is a resume and LinkedIn review tool that provides AI-powered feedback on your materials, including an ATS score, line-by-line feedback, and suggestions for improvement. It focuses on feedback delivery rather than complete rewrites." },
  { question: "Is Zari better than Resume Worded?", answer: "For complete career coaching, yes. Zari includes the same ATS scoring and feedback functionality, plus complete bullet rewrites (not just suggestions), LinkedIn visibility optimization, mock interview coaching, salary negotiation practice, and promotion coaching. Resume Worded is stronger as a standalone resume review tool but doesn't cover the rest of the job search." },
];

const ROWS = [
  { feature: "Resume ATS scoring", zari: true, rw: true },
  { feature: "Line-by-line feedback", zari: true, rw: true },
  { feature: "Complete bullet rewrites", zari: true, rw: false },
  { feature: "LinkedIn optimization", zari: true, rw: "Partial" },
  { feature: "LinkedIn visibility score", zari: true, rw: "Partial" },
  { feature: "Mock interview coaching", zari: true, rw: false },
  { feature: "STAR answer scoring", zari: true, rw: false },
  { feature: "Salary negotiation coaching", zari: true, rw: false },
  { feature: "Promotion coaching", zari: true, rw: false },
  { feature: "Session memory", zari: true, rw: false },
  { feature: "Voice coaching", zari: true, rw: false },
];

export default async function ZariVsResumeWordedPage() {
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em]">Zari vs Resume Worded</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/50">Resume Worded gives feedback. Zari gives feedback, writes the fix, and coaches you on everything after the resume.</p>
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
                  <th className="py-4 pr-6 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Resume Worded</th>
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
                      {row.rw === true ? <span className="text-emerald-500">✓</span> : row.rw === false ? <span className="text-[var(--muted)]/40">—</span> : <span className="text-amber-500 text-[12px]">{row.rw}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6 space-y-4">
          {FAQS.map((f) => (
            <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Feedback + rewrites + full coaching — free to start.</h2>
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
