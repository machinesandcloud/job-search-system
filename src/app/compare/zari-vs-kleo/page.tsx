import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Kleo — Which AI Career Tool is Better? (2025)",
  description:
    "Comparing Zari and Kleo for AI career coaching. Kleo focuses on LinkedIn content creation. Zari covers resume, LinkedIn, interviews, career strategy, and salary negotiation with session memory.",
  keywords: ["Zari vs Kleo", "Kleo alternative", "Kleo vs Zari", "best AI career coach Kleo", "Kleo career tool comparison", "AI career coach vs Kleo"],
  alternates: { canonical: "/compare/zari-vs-kleo" },
  openGraph: { title: "Zari vs Kleo — Full Comparison 2025", description: "Kleo does LinkedIn content. Zari does everything: resume, LinkedIn, interviews, salary, and strategy.", url: "/compare/zari-vs-kleo" },
};

const FAQS = [
  { question: "Is Zari better than Kleo?", answer: "For career coaching specifically — yes. Kleo is focused on LinkedIn content creation and personal branding, making it a strong choice for professionals wanting to post more on LinkedIn. Zari is a career coaching platform covering resume optimization, LinkedIn visibility, mock interviews, salary negotiation, and promotion coaching. They serve different primary use cases." },
  { question: "Does Kleo do resume writing?", answer: "Kleo's primary focus is LinkedIn content creation and engagement — helping users post more consistently on LinkedIn. It does not offer resume ATS analysis, mock interview coaching, or salary negotiation coaching." },
  { question: "What does Zari do that Kleo doesn't?", answer: "Zari offers ATS resume scoring and rewrites, mock interview coaching with STAR evaluation, salary negotiation simulation, promotion coaching, career strategy, and session memory across all coaching surfaces. Kleo is focused on LinkedIn content and social strategy." },
];

const ROWS = [
  { feature: "Resume writing & ATS optimization", zari: true, kleo: false },
  { feature: "LinkedIn profile optimization", zari: true, kleo: "Partial" },
  { feature: "LinkedIn content creation", zari: false, kleo: true },
  { feature: "Mock interview coaching", zari: true, kleo: false },
  { feature: "STAR answer scoring", zari: true, kleo: false },
  { feature: "Voice coaching mode", zari: true, kleo: false },
  { feature: "Salary negotiation coaching", zari: true, kleo: false },
  { feature: "Promotion coaching", zari: true, kleo: false },
  { feature: "Career strategy & action plan", zari: true, kleo: false },
  { feature: "Session memory", zari: true, kleo: false },
  { feature: "Free tier available", zari: true, kleo: "Partial" },
];

export default async function ZariVsKleoPage() {
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em]">Zari vs Kleo</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/50">Kleo dominates LinkedIn content. Zari dominates career coaching. Here&apos;s the honest difference.</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="py-4 pl-6 text-left text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Feature</th>
                  <th className="py-4 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</th>
                  <th className="py-4 pr-6 text-center text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Kleo</th>
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
                      {row.kleo === true ? <span className="text-emerald-500">✓</span> : row.kleo === false ? <span className="text-[var(--muted)]/40">—</span> : <span className="text-amber-500 text-[12px]">{row.kleo}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <p className="mb-2 text-[13px] font-bold uppercase tracking-wider text-[var(--brand)]">Choose Zari if...</p>
              <ul className="space-y-2 text-[13.5px] text-[var(--muted)]">
                {["You're job searching and need resume + LinkedIn + interviews", "You want coaching that builds session-over-session", "You need salary negotiation or promotion coaching", "You want one platform for your entire career trajectory"].map(i => (
                  <li key={i} className="flex gap-2"><span className="text-[var(--brand)]">→</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-2 text-[13px] font-bold uppercase tracking-wider text-[var(--muted)]">Choose Kleo if...</p>
              <ul className="space-y-2 text-[13.5px] text-[var(--muted)]">
                {["You want to build a personal brand on LinkedIn", "Your primary goal is posting more content consistently", "You're focused on thought leadership, not job searching", "You want AI to help write LinkedIn posts"].map(i => (
                  <li key={i} className="flex gap-2"><span className="text-[var(--muted)]">→</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.8rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
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
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Try the complete AI career coach — free.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">One free session on every coaching surface. No card required.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              Start with Zari free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
