import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Teal — AI Career Coach vs Job Tracker (2025)",
  description:
    "Teal helps you track job applications. Zari coaches you to get more of them. Full comparison of Teal HQ vs Zari AI career coach on resume, interviews, LinkedIn, and career strategy.",
  keywords: ["Zari vs Teal", "Teal alternative", "Teal HQ vs Zari", "Teal HQ review", "Teal career tool comparison", "job tracker vs career coach"],
  alternates: { canonical: "/compare/zari-vs-teal" },
  openGraph: { title: "Zari vs Teal — Job Tracker vs AI Career Coach", description: "Teal organizes your job search. Zari makes your application materials actually land.", url: "/compare/zari-vs-teal" },
};

const FAQS = [
  { question: "Is Teal a career coach?", answer: "Teal HQ is primarily a job search management platform — it helps you track applications, organize your pipeline, and save job listings. It has some AI resume features but is not a career coaching platform with interview prep, LinkedIn coaching, or salary negotiation." },
  { question: "What does Zari do that Teal doesn't?", answer: "Zari provides AI-powered resume rewriting (not just scoring), mock interview coaching with STAR evaluation, LinkedIn optimization with visibility scoring, salary negotiation simulation, promotion coaching, and session memory. Teal provides job tracking, a resume builder, and a browser extension." },
  { question: "Can I use both Teal and Zari?", answer: "Yes — they're complementary. Teal as your job search CRM to track applications, Zari as your coaching platform to make those applications land. Many job seekers use a tracker for organization and a coaching tool for preparation." },
];

const ROWS = [
  { feature: "ATS resume scoring", zari: true, teal: "Partial" },
  { feature: "Resume bullet rewrites", zari: true, teal: false },
  { feature: "LinkedIn profile optimization", zari: true, teal: false },
  { feature: "Mock interview coaching", zari: true, teal: false },
  { feature: "Salary negotiation coaching", zari: true, teal: false },
  { feature: "Promotion coaching", zari: true, teal: false },
  { feature: "Job application tracker", zari: false, teal: true },
  { feature: "Job board / saved jobs", zari: false, teal: true },
  { feature: "Browser extension", zari: false, teal: true },
  { feature: "Session memory", zari: true, teal: false },
  { feature: "Voice coaching mode", zari: true, teal: false },
];

export default async function ZariVsTealPage() {
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em]">Zari vs Teal</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/50">Teal tracks your applications. Zari makes them land.</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-2 text-[13px] font-bold text-[var(--muted)]">Teal HQ</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">Job search manager</p>
              <p className="mt-2 text-[13.5px] text-[var(--muted)]">Track applications, save jobs, organize your pipeline. Useful once you&apos;re applying — doesn&apos;t coach you on what to do when you get a response.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/25 bg-[var(--brand)]/[0.04] p-6">
              <p className="mb-2 text-[13px] font-bold text-[var(--brand)]">Zari</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">AI career coach</p>
              <p className="mt-2 text-[13.5px] text-[var(--muted)]">Makes your resume pass ATS, optimizes LinkedIn for recruiter search, preps you for interviews, and coaches salary negotiation. Focused on getting you more responses, not tracking the rejections.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="py-4 pl-6 text-left text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Feature</th>
                  <th className="py-4 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</th>
                  <th className="py-4 pr-6 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Teal</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"}>
                    <td className="py-3.5 pl-6 text-[13.5px] text-[var(--ink)]">{row.feature}</td>
                    <td className="py-3.5 text-center">
                      {row.zari === true ? <span className="text-emerald-500">✓</span> : row.zari === false ? <span className="text-[var(--muted)]/40">—</span> : <span className="text-amber-500 text-[12px]">{row.zari}</span>}
                    </td>
                    <td className="py-3.5 pr-6 text-center">
                      {row.teal === true ? <span className="text-emerald-500">✓</span> : row.teal === false ? <span className="text-[var(--muted)]/40">—</span> : <span className="text-amber-500 text-[12px]">{row.teal}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Get more responses, not just more tracking.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">One free session on every coaching surface. No card required.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              Start with Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
