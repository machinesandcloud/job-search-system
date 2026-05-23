import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Resume.io — Which Is Better for Job Seekers? (2025)",
  description:
    "Resume.io builds a clean, formatted resume. Zari optimizes your resume for ATS, coaches interviews, LinkedIn, and salary negotiation. Honest comparison for job seekers deciding which tool to use.",
  keywords: ["zari vs resume.io", "resume.io comparison", "resume.io vs ai career coach", "best resume builder", "resume.io review", "resume builder comparison 2025"],
  alternates: { canonical: "/compare/zari-vs-resume-io" },
  openGraph: {
    title: "Zari vs Resume.io (2025) — Full Comparison",
    description: "Resume.io designs a clean document. Zari optimizes it for ATS and coaches you through every step after. Here's where each wins.",
    url: "/compare/zari-vs-resume-io",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_ROWS = [
  {
    feature: "Resume templates & visual design",
    resumeio: { verdict: true, detail: "Resume.io offers polished, professionally designed templates in multiple styles. If visual presentation is your priority, Resume.io produces a clean, formatted document quickly." },
    zari: { verdict: false, detail: "Zari focuses on content optimization and ATS performance, not visual template design. The output is properly formatted for ATS parsing, not visual flair." },
    winner: "resumeio",
  },
  {
    feature: "ATS keyword optimization",
    resumeio: { verdict: false, detail: "Resume.io doesn't analyze your resume against a specific job description or provide ATS keyword scoring. It helps you build a well-formatted resume — not one that's optimized for machine screening." },
    zari: { verdict: true, detail: "Zari compares your resume to the job description, identifies missing keywords, checks ATS-critical formatting, and rewrites sections to improve pass-through rates — all against the specific role." },
    winner: "zari",
  },
  {
    feature: "Interview coaching",
    resumeio: { verdict: false, detail: "Resume.io is a resume builder. It doesn't provide interview coaching, question preparation, behavioral coaching, or mock interview capability." },
    zari: { verdict: true, detail: "Zari coaches interview preparation — generates role-specific questions, coaches STAR-method answers, identifies weak responses, and runs mock interviews with specific feedback." },
    winner: "zari",
  },
  {
    feature: "LinkedIn profile optimization",
    resumeio: { verdict: false, detail: "No LinkedIn functionality — Resume.io is a standalone resume tool." },
    zari: { verdict: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills section for recruiter search discoverability — with knowledge of LinkedIn's algorithm, not just writing quality." },
    winner: "zari",
  },
  {
    feature: "Salary negotiation coaching",
    resumeio: { verdict: false, detail: "Not in Resume.io's scope — it's a document tool, not a career coaching platform." },
    zari: { verdict: true, detail: "Zari coaches full salary negotiation — market comp research, counteroffer strategy, objection handling scripts, and the live conversation including equity discussion." },
    winner: "zari",
  },
  {
    feature: "Job-specific resume tailoring",
    resumeio: { verdict: false, detail: "Resume.io lets you build and save one resume that you can edit. There's no AI tailoring to specific job descriptions." },
    zari: { verdict: true, detail: "Zari tailors your resume for each specific role — not just keyword matching but repositioning your experience emphasis to match what the hiring manager is actually looking for." },
    winner: "zari",
  },
  {
    feature: "Content writing assistance",
    resumeio: { verdict: true, detail: "Resume.io provides guided prompts and some pre-written content for each resume section — helpful for people starting from scratch who aren't sure what to write." },
    zari: { verdict: true, detail: "Zari rewrites your resume sections with ATS optimization in mind — not just content suggestions but actual rewriting based on your background and the target role." },
    winner: "zari",
  },
];

const SCORE = (() => {
  const zari = COMPARISON_ROWS.filter(r => r.winner === "zari").length;
  const resumeio = COMPARISON_ROWS.filter(r => r.winner === "resumeio").length;
  return { zari, resumeio, total: COMPARISON_ROWS.length };
})();

const FAQS = [
  { question: "Is Resume.io good for getting jobs?", answer: "Resume.io produces a clean, well-formatted resume — which is the starting point of a job search, not the full picture. The limitation is that visual design doesn't help you pass ATS screening (which happens before a human sees your resume), and Resume.io doesn't coach the rest of the search: tailoring for specific roles, interview prep, LinkedIn optimization, or salary negotiation. It's a solid tool for the first step; you'll need additional tools for the rest." },
  { question: "Does Resume.io beat ATS systems?", answer: "Resume.io's templates are designed to be readable, and some are ATS-compatible. But 'ATS-compatible' means the parser can read the document — it doesn't mean your resume is optimized for the specific keywords, skills, and phrases the ATS is searching for. ATS keyword optimization requires analyzing your resume against a specific job description, which Resume.io doesn't do." },
  { question: "Which is better: Resume.io or Zari?", answer: "They serve different needs. If you want a polished, visually designed resume template and guidance on what to include in each section, Resume.io is purpose-built for that. If you want a resume that's optimized to pass ATS screening for specific roles, plus coaching on interviews, LinkedIn, and salary negotiation, Zari is purpose-built for that. Some job seekers use both — Resume.io for the visual template, Zari for the content optimization and coaching." },
];

export default async function ZariVsResumeIoPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Resume.io", url: `${BASE_URL}/compare/zari-vs-resume-io` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Resume.io</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Resume.io builds a clean, visually designed document. Zari optimizes it for ATS and coaches you through every step after. The question is whether you need design — or results.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE.resumeio}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Resume.io wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE.total} evaluated features</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.feature} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.feature}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "resumeio" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.resumeio.verdict ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Resume.io {row.resumeio.verdict ? "✓" : "✗"}</p>
                      {row.winner === "resumeio" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.resumeio.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.verdict ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.verdict ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4361EE]">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Need more than a resume template?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches the full job search — ATS optimization, LinkedIn, interview prep, and salary negotiation. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
