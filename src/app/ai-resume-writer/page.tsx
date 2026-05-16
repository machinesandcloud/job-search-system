import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Resume Writer — ATS-Optimized Resume in Minutes",
  description:
    "Zari's AI resume writer analyzes your resume line-by-line, scores every bullet against ATS filters, and delivers specific rewrites with measurable impact. Go from 52 to 89 ATS score in one session.",
  keywords: [
    "AI resume writer",
    "AI resume builder",
    "ATS resume optimizer",
    "resume writing AI",
    "best AI resume writer",
    "AI resume review",
    "resume optimization tool",
    "ATS scanner",
    "resume rewriter",
    "smart resume builder",
  ],
  alternates: { canonical: "/ai-resume-writer" },
  openGraph: {
    title: "Zari AI Resume Writer — ATS-Optimized in Minutes",
    description: "Stop getting filtered by ATS. Zari scores your resume, identifies keyword gaps, and delivers specific rewrites for your target role.",
    url: "/ai-resume-writer",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is an AI resume writer?", answer: "An AI resume writer uses artificial intelligence to analyze your resume, identify weaknesses in bullet structure, keyword coverage, and ATS compatibility, then deliver specific rewrites tailored to your target role and industry." },
  { question: "How does Zari's AI resume writer work?", answer: "Upload your resume and paste a job description. Zari's AI scores every bullet against ATS keyword patterns, flags low-impact language, and rewrites each bullet with measurable outcomes and relevant keywords — specific to the role you're applying to." },
  { question: "Does Zari's AI resume writer pass ATS systems?", answer: "Yes. Zari is built around ATS optimization. It analyzes keyword density, action verb strength, metric inclusion, and formatting — the exact factors ATS systems use to filter candidates before a human ever reads the resume." },
  { question: "How long does it take to get a resume written by AI?", answer: "Your first resume review and rewrite takes under 10 minutes. Upload your resume, describe your target role, and Zari delivers a scored analysis with bullet-by-bullet rewrites immediately." },
  { question: "Is Zari's AI resume writer free?", answer: "Yes — you get one free resume review session with no credit card required. Pro plans unlock unlimited resume sessions starting at $29/month." },
];

const STEPS = [
  { step: "01", title: "Upload your resume", body: "PDF or Word. Zari parses every section — summary, experience, skills, education." },
  { step: "02", title: "Paste a job description", body: "Optional but powerful. Zari aligns keyword gaps to the specific role you're targeting." },
  { step: "03", title: "Get your ATS score", body: "Every bullet is scored for impact, keyword density, and ATS compatibility. Instantly." },
  { step: "04", title: "Apply the rewrites", body: "Zari writes the improved version of every weak bullet. Copy it directly — no editing required." },
];

export default async function AiResumeWriterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Resume Writer", url: `${BASE_URL}/ai-resume-writer` }]} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#0D7182", opacity: 0.08, filter: "blur(140px)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", width: "400px", height: "400px", bottom: "-10%", right: "-5%", background: "#0D7182", opacity: 0.06, filter: "blur(120px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Resume Writer · ATS Optimizer
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Your resume, rewritten by AI<br />
            <span className="gradient-text-animated">to beat ATS and get callbacks.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            87% of resumes are rejected before a human reads them. Zari's AI resume writer analyzes every bullet against ATS filters and rewrites your resume with measurable impact — specific to your target role.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Write my resume free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">
              See how it works
            </Link>
          </div>
          {/* Score visual */}
          <div className="mt-12 inline-flex items-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-8 py-5">
            <div className="text-center">
              <p className="text-[2rem] font-extrabold text-white/30">52</p>
              <p className="text-[11px] text-white/25">Before Zari</p>
            </div>
            <svg className="h-5 w-5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            <div className="text-center">
              <p className="text-[2rem] font-extrabold text-[var(--brand)]">89</p>
              <p className="text-[11px] text-white/40">ATS Score</p>
            </div>
            <div className="border-l border-white/10 pl-6 text-left">
              <p className="text-[12px] font-semibold text-white">One session</p>
              <p className="text-[11px] text-white/35">Average improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
            How the AI resume writer works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="mb-3 text-[2rem] font-extrabold text-[var(--brand)]/20">{s.step}</p>
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)]">{s.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT ZARI ANALYZES */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
            What Zari's AI resume writer analyzes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "ATS keyword coverage", body: "Zari scans every bullet against the keyword patterns ATS systems look for in your target role — and flags every gap." },
              { title: "Bullet impact scoring", body: "Each bullet is rated for metric density, scope, and business outcome. Weak bullets get a specific score and a rewrite." },
              { title: "Action verb strength", body: "Generic verbs ('responsible for', 'helped with') are flagged and replaced with high-signal verbs that match your seniority." },
              { title: "Quantification gaps", body: "Zari identifies every bullet missing a number — percentage, dollar amount, scale — and prompts you for the data." },
              { title: "Format and length", body: "Section order, bullet length, density, and white space are checked against recruiter attention patterns." },
              { title: "Seniority calibration", body: "Language is checked against your target level. IC language vs. leadership signal vs. executive framing — Zari knows the difference." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-white p-5">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/15">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                </div>
                <div>
                  <p className="mb-1 text-[14px] font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-3 text-[15px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[14px] leading-7 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Write your resume with AI — free.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">One free resume session. No credit card. Results in under 10 minutes.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/pricing" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.06] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.11] hover:text-white">View pricing</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
