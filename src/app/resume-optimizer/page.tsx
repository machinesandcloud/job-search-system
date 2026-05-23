import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resume Optimizer 2025 — ATS Resume Optimization with Keyword Scoring",
  description: "Optimize your resume for ATS with Zari's AI resume optimizer. Real-time ATS scoring, keyword gap analysis, and resume rewriting for any job description. Free to start.",
  keywords: ["resume optimizer", "ats resume optimizer", "resume optimization", "optimize resume for ats", "resume keyword optimizer", "ats optimization", "resume score", "resume keyword checker", "ats friendly resume", "resume optimization tool 2025"],
  alternates: { canonical: "/resume-optimizer" },
  openGraph: { title: "Resume Optimizer 2025 — ATS Resume Optimization with Keyword Scoring", description: "Real-time ATS scoring, keyword gap analysis, and AI-powered resume rewriting for any job description.", url: "/resume-optimizer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is an ATS resume optimizer and why do I need one?", answer: "An ATS (Applicant Tracking System) resume optimizer analyzes your resume against a specific job description and scores how well it matches the keywords and criteria the ATS uses to filter candidates. Most large employers use ATS to automatically filter applications before a human sees them — estimates range from 70–90% of Fortune 500 companies. A resume that doesn't pass the ATS filter is never seen by a recruiter, no matter how qualified you are. An optimizer identifies which keywords you're missing, which sections are underperforming, and rewrites your resume to maximize your match score for that specific role." },
  { question: "How does ATS keyword scoring work?", answer: "ATS systems parse your resume text and compare it against the job description using keyword matching algorithms. Modern ATS (Greenhouse, Lever, Workday, iCIMS) use more sophisticated matching than simple keyword presence — they consider: (1) Keyword frequency and placement (skills in multiple sections score higher than mention once), (2) Exact phrase matching vs semantic similarity, (3) Required vs preferred qualifications (missing required keywords is a harder filter), (4) Years of experience claims for specific skills. Zari extracts the highest-weight keywords from any job description, identifies which are missing or underweighted in your resume, and rewrites to close those gaps." },
  { question: "What ATS score do I need to get an interview?", answer: "There's no universal threshold — it varies by company, role, and ATS configuration. As a practical guideline: scores below 50% on a well-calibrated optimizer suggest your resume is missing many critical keywords and may be automatically filtered out. Scores of 60–75% are competitive but improvable. Scores above 80% indicate strong alignment. The more important metric is relative score — if your optimized resume scores 85% and a competitor's scores 50%, yours is likely to advance. Key caveat: a high ATS score on a generic tool doesn't guarantee anything — the quality of the underlying keyword analysis matters enormously. Zari uses real job description parsing, not generic keyword lists." },
  { question: "Can I over-optimize my resume with too many keywords?", answer: "Yes — 'keyword stuffing' can hurt you in two ways: (1) Some ATS systems now detect and penalize unnatural keyword density (the same way search engines penalize SEO spam). (2) More importantly, a keyword-stuffed resume reads poorly to the human recruiter who sees it after passing the ATS. The goal is natural, high-density use of relevant terms — not inserting keywords randomly. The best approach: have every keyword in your resume correspond to a real skill or experience you have. If you're missing a keyword because you genuinely don't have the skill, adding it fraudulently will backfire in the interview." },
];

const CHECKS = [
  { check: "Keyword match score", desc: "How many of the job description's key terms appear in your resume — weighted by importance in the JD." },
  { check: "Missing critical keywords", desc: "Required skills and qualifications present in the JD but absent or underrepresented in your resume." },
  { check: "ATS formatting issues", desc: "Tables, text boxes, headers/footers, and non-standard fonts that ATS parsers can't read correctly." },
  { check: "Section-by-section scoring", desc: "Which sections (summary, experience, skills) are contributing most to your score — and where the gaps are." },
  { check: "Experience keyword density", desc: "Whether your most important keywords appear in your experience bullets, not just the skills section." },
  { check: "Quantification rate", desc: "Percentage of experience bullets that include measurable outcomes — the metric ATS and humans both favor." },
];

export default async function ResumeOptimizerPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Resume Optimizer 2025 — ATS Resume Optimization with Keyword Scoring"
        description="Real-time ATS scoring, keyword gap analysis, and AI-powered resume rewriting for any job description."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/resume-optimizer`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Resume Optimizer", url: `${BASE_URL}/resume-optimizer` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            ATS Optimization · Keyword Scoring · Instant
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Resume<br />
            <span className="text-white/50">Optimizer</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Real-time ATS scoring against any job description. See your keyword gaps, fix your formatting issues, and get a rewritten resume that passes ATS filters — in seconds.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · Free ATS score · Instant results</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari checks when optimizing your resume</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Six dimensions scored and reported — so you know exactly what to fix, not just a single score.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-2 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>What&apos;s checked</span><span>What it means</span>
            </div>
            {CHECKS.map(({ check, desc }) => (
              <div key={check} className="grid grid-cols-2 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{check}</span>
                <span className="text-[var(--muted)] text-[12px]">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">How the resume optimizer works</h2>
          <div className="space-y-4">
            {[
              { n: "1", title: "Upload resume + paste job description", desc: "Works with any resume format. Paste the job description you're targeting — not a generic template." },
              { n: "2", title: "Instant ATS score + keyword gap report", desc: "See your score in seconds. Every missing keyword identified, ranked by importance." },
              { n: "3", title: "AI-powered resume rewrite", desc: "Zari rewrites your bullets and summary to close keyword gaps naturally — not keyword stuffing." },
              { n: "4", title: "Verify improved score", desc: "Run the optimizer again on the rewritten version. See exactly how much your score improved." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#0D7182]/10 flex items-center justify-center text-[14px] font-extrabold text-[#0D7182]">{n}</div>
                <div>
                  <h3 className="mb-1 font-bold text-[14px]">{title}</h3>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Optimize your resume for ATS now.</h2>
          <p className="mb-8 text-[15px] text-white/55">Free ATS score against any job description — see your keyword gaps and fix them in minutes.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Score my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
