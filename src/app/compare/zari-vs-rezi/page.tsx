import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Rezi — Which AI Resume Tool Is Better? (2025)",
  description:
    "Comparing Zari and Rezi for ATS resume optimization. Rezi focuses on ATS-optimized resume building. Zari adds interview coaching, LinkedIn optimization, and salary negotiation on top of resume optimization.",
  keywords: ["Zari vs Rezi", "Rezi alternative", "Rezi vs Zari", "Rezi resume builder", "best ATS resume tool", "Rezi review 2025", "AI resume tool comparison"],
  alternates: { canonical: "/compare/zari-vs-rezi" },
  openGraph: { title: "Zari vs Rezi — Full Comparison 2025", description: "Rezi optimizes your resume for ATS. Zari optimizes your resume and coaches you through interviews, LinkedIn, and salary negotiation.", url: "/compare/zari-vs-rezi" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is Rezi?", answer: "Rezi is an AI-powered resume builder focused on ATS optimization. It analyzes your resume for ATS keyword matching and helps you build a resume that passes automated filters. It's one of the more established ATS-focused tools in the market." },
  { question: "How does Zari compare to Rezi?", answer: "Both tools help with ATS resume optimization. The key difference: Rezi is primarily a resume builder with ATS scoring. Zari is a full career coaching platform — it does ATS resume optimization, then continues into mock interview coaching with STAR evaluation, LinkedIn profile optimization, salary negotiation coaching, and maintains session memory across all of these. Rezi helps you build a better resume; Zari coaches you through the entire job search." },
  { question: "Which is better for ATS optimization specifically?", answer: "Both tools are credible for ATS optimization. Rezi has a strong focus on resume formatting and keyword density scoring. Zari's ATS optimization is part of a broader coaching workflow — it scores your resume against a specific job description, rewrites weak bullets, and connects the optimization to your interview preparation. For pure resume ATS scoring, either is solid; for a full job search coaching system, Zari is more comprehensive." },
];

const ROWS = [
  { feature: "ATS resume scoring", zari: true, rezi: true },
  { feature: "Resume bullet rewrites", zari: true, rezi: "Basic" },
  { feature: "Score vs specific JD", zari: true, rezi: true },
  { feature: "Session memory", zari: true, rezi: false },
  { feature: "Mock interview coaching", zari: true, rezi: false },
  { feature: "STAR answer evaluation", zari: true, rezi: false },
  { feature: "LinkedIn optimization", zari: true, rezi: false },
  { feature: "Salary negotiation coaching", zari: true, rezi: false },
  { feature: "Cover letter writing", zari: true, rezi: "Basic" },
  { feature: "Resume templates", zari: "Basic", rezi: true },
  { feature: "Free tier", zari: true, rezi: "Limited" },
];

export default async function ZariVsReziPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Rezi", url: `${BASE_URL}/compare/zari-vs-rezi` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Zari vs Rezi · 2025 Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">Zari vs Rezi</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Rezi focuses on ATS resume optimization. Zari does ATS optimization plus interview coaching, LinkedIn, and salary negotiation — all in one platform with session memory.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Rezi</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS-focused resume builder</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Rezi is built specifically for ATS optimization — it analyzes your resume for keyword density, formatting compatibility, and match score against job descriptions. It&apos;s one of the more established tools in this space. The focus is on the resume document and its ATS performance.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--muted)]">Best for: ATS resume building and keyword scoring</div>
            </div>
            <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari AI Career Coach</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS optimization + full coaching</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Zari does ATS resume scoring and rewrites, then continues through the rest of the job search: LinkedIn optimization, live interview coaching with STAR evaluation, and salary negotiation preparation. Session memory keeps your career context across all coaching surfaces.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--brand)]">Best for: Full job search — resume, LinkedIn, interviews, salary</div>
            </div>
          </div>

          <h2 className="mb-8 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-4 text-left font-semibold text-[var(--muted)]">Feature</th>
                  <th className="px-5 py-4 text-center font-bold text-[var(--brand)]">Zari</th>
                  <th className="px-5 py-4 text-center font-semibold text-[var(--muted)]">Rezi</th>
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
                      {row.rezi === true ? <span className="text-emerald-600">✓</span> : row.rezi === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.rezi}</span>}
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Start with Zari — free. No credit card.</h2>
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
