import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs ResumeLab — AI Career Coach vs Resume Builder (2025)",
  description:
    "ResumeLab provides a drag-and-drop resume builder with professionally designed templates. Zari coaches your job search — ATS optimization, interview prep, and salary negotiation. Here's which one you actually need.",
  keywords: ["zari vs resumelab", "resumelab alternative", "resumelab review 2025", "resume builder comparison", "AI career coach vs resume builder", "best resume builder 2025"],
  alternates: { canonical: "/compare/zari-vs-resumelab" },
  openGraph: {
    title: "Zari vs ResumeLab — AI Career Coach vs Resume Builder (2025)",
    description: "ResumeLab builds your resume template. Zari coaches your job search. Different tools — here's when to use each.",
    url: "/compare/zari-vs-resumelab",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  { task: "Resume formatting and visual design", resumelab: { verdict: "ResumeLab wins", score: "win", detail: "ResumeLab offers polished, professionally designed templates with clean typography, consistent spacing, and well-structured layouts. If you need a formatted resume from scratch and don't want to wrestle with Word or Google Docs, ResumeLab is faster and produces a cleaner output than DIY formatting." }, zari: { verdict: "Not Zari's focus", score: "na", detail: "Zari focuses on the content and strategy of your resume — the bullet language, ATS optimization, and keyword targeting — not the visual formatting. Paste your existing resume into Zari and it coaches the substance, not the design." } },
  { task: "ATS scoring and optimization", resumelab: { verdict: "Basic ATS guidance", score: "partial", detail: "ResumeLab provides general tips about ATS-friendly formatting and includes ATS-compatible templates. However, it doesn't analyze your resume against a specific job description or identify keyword gaps for a particular role." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari scores your resume against the specific JD you're targeting — identifying missing keywords, weak bullet language, and ATS-unfriendly patterns. The optimization is role-specific, not general." } },
  { task: "Resume bullet writing and improvement", resumelab: { verdict: "Template language and tips", score: "partial", detail: "ResumeLab provides pre-written bullet templates and examples for common roles. These are helpful starting points but don't reflect your specific accomplishments, metrics, or the language of the specific job you're targeting." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari rewrites your specific bullets to be stronger — turning vague descriptions into quantified, impact-first language. The rewrites are based on your actual experience and the specific job description, not generic templates." } },
  { task: "Interview preparation", resumelab: { verdict: "Not ResumeLab's scope", score: "loss", detail: "ResumeLab builds resumes. It doesn't provide interview coaching, STAR story development, or company-specific preparation." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches behavioral interviews, company-specific question patterns, and technical interview frameworks — all informed by the same job context used for resume optimization." } },
  { task: "Salary negotiation coaching", resumelab: { verdict: "Not included", score: "loss", detail: "After ResumeLab builds your resume, job search coaching is not part of the product." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari provides full negotiation coaching — from recruiter screening conversations to multi-offer comparison to signing bonus and equity negotiation." } },
];

const FAQS = [
  { question: "Does ResumeLab help your resume get past ATS?", answer: "Partially — ResumeLab templates are ATS-compatible (no tables, no headers/footers, no graphics that confuse parsers). But ATS compatibility is different from ATS optimization. A compatible resume won't break the parser; an optimized resume contains the specific keywords for the specific role that boost your match score. ResumeLab gives you the former; Zari gives you the latter." },
  { question: "Can I use ResumeLab to build the resume format and then use Zari for the content?", answer: "Yes — that's actually a solid approach. Use ResumeLab to build a clean, formatted resume template. Then bring that resume and your target job descriptions into Zari to optimize the bullet language, fix ATS keyword gaps, and strengthen your positioning. The two tools address different layers of the same document." },
  { question: "What does ResumeLab cost vs Zari?", answer: "ResumeLab uses a subscription model — typically $3-6/month for basic access, $8-16/month for full access with all templates and download formats. Zari is a usage-based AI coaching platform — you can start free and use premium features for interview prep and salary negotiation. For an active job search, the combination of both tools costs less than a single session with a human career coach." },
];

export default async function ZariVsResumeLabPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs ResumeLab", url: `${BASE_URL}/compare/zari-vs-resumelab` }]} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Resume Tools</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs ResumeLab</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">ResumeLab builds a beautifully formatted resume with professional templates. Zari coaches the content, ATS optimization, and everything after the resume — interviews and negotiation.</p>
          <div className="mt-8 flex justify-center"><WinScore zariWins={4} total={5} competitorName="ResumeLab" /></div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5"><p className="font-bold text-[var(--ink)]">{row.task}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5"><p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.resumelab.score === "win" ? "text-emerald-600" : row.resumelab.score === "partial" ? "text-amber-500" : "text-red-500"}`}>ResumeLab — {row.resumelab.verdict}</p><p className="text-[13px] leading-6 text-[var(--muted)]">{row.resumelab.detail}</p></div>
                  <div className="p-5"><p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>Zari — {row.zari.verdict}</p><p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Format with ResumeLab. Win with Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Use ResumeLab to build a clean template, then bring it to Zari to optimize every bullet for ATS, prepare for the interview, and negotiate the offer. The full job search toolkit.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
