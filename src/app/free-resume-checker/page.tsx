import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Free Resume Checker — AI Resume Score & ATS Optimization",
  description:
    "Check your resume for free. Zari's AI resume checker scores your resume against ATS filters, identifies weak bullets, keyword gaps, and formatting issues — then rewrites it for your target role.",
  keywords: ["free resume checker", "resume checker", "AI resume checker", "resume score", "check my resume", "free resume review", "resume analyzer", "ATS resume checker free"],
  alternates: { canonical: "/free-resume-checker" },
  openGraph: { title: "Free Resume Checker — AI Resume Score & ATS Optimization", description: "Score your resume against ATS filters, find keyword gaps, and get rewrites — free.", url: "/free-resume-checker" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Is the resume checker really free?", answer: "Yes. You can upload your resume and get an ATS score, a breakdown of weak bullets, and keyword gap analysis for free — no credit card required. The complete bullet rewrites and role-specific optimization are part of the full Zari coaching platform." },
  { question: "What does the resume checker look for?", answer: "Zari's resume checker analyzes: ATS format compatibility (columns, tables, headers that break parsing), keyword coverage against the target role, bullet strength (action verb quality, metric density, impact clarity), section completeness (summary, skills, education), and overall score benchmarked against hired candidates." },
  { question: "How is this different from other free resume checkers?", answer: "Most free resume checkers give you a score and leave you with a list of things to fix. Zari's checker identifies the weak points AND rewrites them — so you get the improved version, not just a report card." },
];

export default async function FreeResumeCheckerPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Free Resume Checker", url: `${BASE_URL}/free-resume-checker` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Free Resume Checker · ATS Score · Keyword Analysis
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Find out why your<br />
            <span className="gradient-text-animated">resume isn't landing.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari's free resume checker scores your resume against ATS systems used by real hiring companies — then shows you exactly which bullets are weak, which keywords are missing, and how to fix them.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Check my resume free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <p className="w-full text-[13px] text-white/35">No credit card. No email wall for the score.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari checks</h2>
          <p className="mb-12 text-[15px] text-[var(--muted)]">Six dimensions, scored and explained — not just a number.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { num: "01", title: "ATS format compatibility", body: "Column layouts, tables, headers, text boxes — these silently break ATS parsing. Zari detects every formatting issue that causes your resume to be misread or rejected before a human sees it." },
              { num: "02", title: "Keyword coverage", body: "Your resume is matched against the target job description. Missing keywords — even exact-match terms for skills you have — are surfaced so you can add them in context." },
              { num: "03", title: "Bullet strength scoring", body: "Every bullet is scored on action verb quality, metric presence, and impact clarity. Weak bullets are flagged with specific feedback on what's missing." },
              { num: "04", title: "Impact and metric density", body: "Resumes with quantified achievements get 40% more callbacks. Zari identifies every bullet that can be quantified and suggests how to add the number." },
              { num: "05", title: "Section completeness", body: "Missing or weak sections that cost you — summary, skills, education formatting, certifications — identified and prioritized by impact." },
              { num: "06", title: "Overall ATS score", body: "A composite score benchmarked against resumes from candidates who received interviews — with a clear breakdown of where you're losing points." },
            ].map((item) => (
              <div key={item.num} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]/60">{item.num}</p>
                <h3 className="mb-2 text-[14.5px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Check → score → rewrite</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Upload your resume", body: "PDF or Word. Zari parses it exactly the way ATS systems do — so you see what the machine sees, not what you see." },
              { step: "2", title: "Get your score and breakdown", body: "Overall ATS score plus a detailed breakdown by section. Every weak point labeled with a reason, not just a flag." },
              { step: "3", title: "Review the rewrites", body: "Zari doesn't just tell you what to fix — it writes the improved version. Every weak bullet rewritten with stronger language, metrics, and role-relevant keywords." },
              { step: "4", title: "Download and apply", body: "Export your optimized resume. Apply with confidence — knowing your resume will pass the filter that blocks 87% of candidates before a human ever reads them." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-bold text-white">{item.step}</div>
                <div>
                  <p className="mb-1.5 font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your resume score — in 60 seconds. Free.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">No credit card. No email gate. Just your score and the exact fixes.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Check my resume" : "Check my resume free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
