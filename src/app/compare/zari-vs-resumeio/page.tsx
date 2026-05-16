import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Resume.io — AI Career Coach vs Resume Builder (2025)",
  description:
    "Zari vs Resume.io: is Resume.io's guided resume builder worth it, or does full AI career coaching get better results? Honest comparison with pricing, features, ATS scores, and interview support.",
  keywords: ["zari vs resume.io", "resume.io alternative", "resume.io review 2025", "resume.io vs ai career coach", "best resume builder 2025", "resume io competitor", "resume builder comparison 2025"],
  alternates: { canonical: "/compare/zari-vs-resumeio" },
  openGraph: {
    title: "Zari vs Resume.io — Which Gets You More Interviews? (2025)",
    description: "Resume.io guides you through building a resume. Zari coaches you through landing the job. Here's the full comparison.",
    url: "/compare/zari-vs-resumeio",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Is Resume.io ATS-friendly?", answer: "Resume.io offers clean templates and claims ATS compatibility, but like most visual builders, its multi-column templates and design elements can cause parsing issues in some ATS systems. Zari's resume coaching produces keyword-optimized content in formats that consistently pass ATS screening — optimized for machines, not visual appeal." },
  { question: "Does Resume.io have AI features?", answer: "Resume.io has added some AI-assisted writing suggestions in recent versions. These generate generic content from prompts and don't score your resume against specific job descriptions or identify missing keywords. Zari's AI does real ATS analysis: job-description matching, keyword scoring, and targeted rewrites." },
  { question: "What does Resume.io cost?", answer: "Resume.io offers a free tier with limited exports and a premium plan around $19.95/month or $95.40/year. A single download without a subscription costs around $2.95. Zari offers a free tier for all coaching surfaces (resume, LinkedIn, interview prep) with competitively priced premium plans." },
  { question: "Who should use Resume.io vs Zari?", answer: "Resume.io is best for candidates who need a clean, professional-looking resume quickly and already know their content is strong. Zari is better for anyone who wants coaching — help identifying what to say, how to say it, whether it will pass ATS, and how to prepare for the interviews that result from applying." },
];

const FEATURE_ROWS = [
  { feature: "Resume templates", resumeio: "100+ professional templates with clean design and good typography. Easy to fill out step-by-step.", zari: "No visual templates — AI coaching for content quality, ATS optimization, and keyword alignment against job descriptions." },
  { feature: "ATS keyword optimization", resumeio: "Basic tips. No job-description matching or keyword gap analysis.", zari: "Deep ATS analysis: paste a job description, get a keyword match score, identify specific gaps, receive rewritten bullets." },
  { feature: "AI writing assistance", resumeio: "AI suggestions for bullet points based on role/title. Generic output not tailored to your actual experience.", zari: "Conversational AI coaching: asks about your experience, rewrites bullets with specific impact and metrics, iterates with you." },
  { feature: "Cover letter builder", resumeio: "Matching cover letter templates with basic guided prompts.", zari: "AI-written cover letters personalized to your experience and the specific job you're targeting." },
  { feature: "Interview preparation", resumeio: "Not available.", zari: "Full AI interview coaching: practice questions, real-time feedback on STAR structure, specificity, and answer quality." },
  { feature: "LinkedIn optimization", resumeio: "Not available.", zari: "AI coaching for headline, About section, and experience bullets — optimized for recruiter search visibility." },
  { feature: "Salary negotiation", resumeio: "Not available.", zari: "Dedicated negotiation coaching with scripts, counter-offer strategy, and equity analysis." },
];

export default async function ZariVsResumeIoPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Resume.io", url: `${BASE_URL}/compare/zari-vs-resumeio` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Resume.io</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Resume.io is one of the most popular guided resume builders — clean templates, easy to use, reasonable price. But it stops at the document. Zari coaches you from the resume through the offer. Here&apos;s what that difference looks like in practice.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Resume.io is best for</p>
              <ul className="mt-4 space-y-2">
                {["Building a clean resume quickly", "Candidates who know their content is already strong", "Simple, guided template-based editing", "Affordable one-time or monthly access"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70"><span className="text-emerald-400 mt-0.5">✓</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is better for</p>
              <ul className="mt-4 space-y-2">
                {["ATS-optimized resume coaching against specific JDs", "Interview prep and behavioral coaching", "LinkedIn optimization for recruiter visibility", "Full job search coaching: resume → offer"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80"><span className="text-[var(--brand)] mt-0.5">✓</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature table */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature comparison</h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Feature</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Resume.io</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
            </div>
            {FEATURE_ROWS.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 gap-4 px-5 py-4 ${i % 2 === 1 ? "bg-[var(--bg)]" : "bg-white"} border-b border-[var(--border)] last:border-0`}>
                <p className="text-[13px] font-semibold text-[var(--ink)]">{row.feature}</p>
                <p className="text-[12.5px] leading-5 text-[var(--muted)]">{row.resumeio}</p>
                <p className="text-[12.5px] leading-5 text-[var(--muted)]">{row.zari}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/50 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Resume.io is a solid tool for building a professional-looking resume — the guided workflow makes it accessible for people who aren&apos;t sure how to structure or format their experience. If your content is already strong and you need a clean document fast, it&apos;s a reasonable choice.</p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">But a polished document is the beginning of a job search, not the end. If you&apos;re not getting interviews, the resume might be part of the problem — but ATS keyword alignment is often the bigger issue, and Resume.io doesn&apos;t help with that. And once you get interviews, Resume.io offers nothing. Zari was built for the whole journey.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Try Zari free — the full job search, not just the resume</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume coaching, ATS optimization, LinkedIn, interview prep, and salary negotiation — all in one AI coaching platform.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
