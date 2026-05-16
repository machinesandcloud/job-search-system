import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Kickresume — Which Is Better for Job Seekers? (2025)",
  description:
    "Comparing Zari and Kickresume for resume writing and career coaching. Kickresume builds visually polished resumes. Zari optimizes for ATS, then coaches you through interviews and salary negotiation.",
  keywords: ["Zari vs Kickresume", "Kickresume alternative", "Kickresume vs Zari", "best resume builder comparison", "Kickresume review", "AI resume builder vs career coach", "Kickresume vs AI career coach"],
  alternates: { canonical: "/compare/zari-vs-kickresume" },
  openGraph: { title: "Zari vs Kickresume — Full Comparison 2025", description: "Kickresume builds beautiful resumes. Zari optimizes them for ATS and coaches you through the rest of the job search.", url: "/compare/zari-vs-kickresume" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is Kickresume?", answer: "Kickresume is a resume builder that helps you create visually polished resumes using templates. It focuses on the design and formatting side of resume creation — you can build a professional-looking resume quickly using their template library. It also offers basic AI writing assistance." },
  { question: "What does Zari do that Kickresume doesn't?", answer: "Zari is a career coaching platform that goes far beyond resume building: ATS scoring against a specific job description, bullet-level rewrites with impact metrics, mock interview coaching with STAR evaluation, LinkedIn profile optimization, salary negotiation coaching, and session memory across all coaching surfaces. Kickresume helps you build the resume; Zari helps you land the job." },
  { question: "Which should I use?", answer: "They serve different purposes. Kickresume is useful for creating a clean, professional-looking resume document quickly. Zari is useful for optimizing that resume for a specific job, preparing for interviews, and coaching you through the entire job search. Many candidates use a resume builder for the document and a coaching platform like Zari for the optimization and preparation." },
];

const ROWS = [
  { feature: "Resume templates and design", zari: "Basic", kick: true },
  { feature: "ATS scoring vs specific JD", zari: true, kick: false },
  { feature: "Bullet-level ATS rewrites", zari: true, kick: false },
  { feature: "Mock interview coaching", zari: true, kick: false },
  { feature: "STAR answer evaluation", zari: true, kick: false },
  { feature: "LinkedIn profile optimization", zari: true, kick: false },
  { feature: "Salary negotiation coaching", zari: true, kick: false },
  { feature: "Session memory", zari: true, kick: false },
  { feature: "Cover letter writing", zari: true, kick: "Templates" },
  { feature: "PDF/Word export", zari: true, kick: true },
  { feature: "Free tier", zari: true, kick: "Limited" },
];

export default async function ZariVsKickresumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Kickresume", url: `${BASE_URL}/compare/zari-vs-kickresume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Zari vs Kickresume · 2025 Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">Zari vs Kickresume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Kickresume builds beautiful resumes. Zari optimizes your resume for ATS and coaches you through interviews, LinkedIn, and salary negotiation. Here&apos;s when each one is the right tool.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Kickresume</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Resume builder with templates</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Kickresume is a resume creation tool with a strong template library. It helps you build a visually polished, well-formatted resume quickly. It offers basic AI writing assistance for resume content. The focus is on the document — not on optimizing for a specific job or coaching you through the rest of the process.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--muted)]">Best for: Creating a clean, formatted resume document</div>
            </div>
            <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari AI Career Coach</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Full job search coaching platform</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Zari optimizes your resume against a specific job description, rewrites bullets to improve ATS match and impact density, and then coaches you through the rest of the job search: LinkedIn optimization, mock interviews with STAR evaluation, and salary negotiation. Session memory keeps your entire job search in context.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--brand)]">Best for: ATS optimization, interviews, LinkedIn, salary negotiation</div>
            </div>
          </div>

          <h2 className="mb-8 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-4 text-left font-semibold text-[var(--muted)]">Feature</th>
                  <th className="px-5 py-4 text-center font-bold text-[var(--brand)]">Zari</th>
                  <th className="px-5 py-4 text-center font-semibold text-[var(--muted)]">Kickresume</th>
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
                      {row.kick === true ? <span className="text-emerald-600">✓</span> : row.kick === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.kick}</span>}
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
