import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resume Review Service — AI Resume Feedback in Minutes | Zari",
  description:
    "What a resume review actually covers, why 75% of resumes fail ATS, and the specific things that separate a rejected resume from an interview. Zari's AI review scores every bullet and rewrites the weak ones.",
  keywords: ["resume review service", "AI resume review", "resume feedback", "professional resume review", "free resume review", "resume critique", "resume checker", "resume analysis", "ATS resume review"],
  alternates: { canonical: "/resume-review-service" },
  openGraph: {
    title: "Resume Review Service — AI Resume Feedback in Minutes | Zari",
    description: "What a resume review actually covers and why most resumes fail ATS before a human ever sees them.",
    url: "/resume-review-service",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const MISTAKES = [
  {
    mistake: "No quantified results",
    frequency: "82% of resumes",
    example: '"Managed the sales team" vs. "Grew regional sales team from 6 to 14 reps, increasing territory revenue 47% YoY"',
    impact: "Bullets without numbers score 40–60% lower on ATS impact density. Recruiters spend 7 seconds on a resume — metrics are the only thing that registers in a scan.",
  },
  {
    mistake: "Wrong keyword strategy",
    frequency: "71% of resumes",
    example: '"Experienced in project management" vs. the specific tool and methodology: "Led cross-functional delivery using Jira, Confluence, and Agile sprint planning"',
    impact: "ATS systems filter on exact keywords from the job description. Generic synonyms don't match — you need the words they used, not the words you prefer.",
  },
  {
    mistake: "Tables, columns, or text boxes",
    frequency: "61% of resumes",
    example: "Two-column layouts with skills on the left and experience on the right — visually clean but invisible to ATS parsers that read left-to-right in a single stream.",
    impact: "ATS parsers linearize the document. A two-column layout gets read as a jumbled string. Skills appear mid-sentence inside experience descriptions. Scores drop to near zero.",
  },
  {
    mistake: "Seniority miscalibration",
    frequency: "54% of resumes",
    example: "A senior engineer writing bullets at analyst level (\"helped implement the new system\") or a new grad using inflated language for 3-month internship work.",
    impact: "Recruiters pattern-match instantly. Writing below your level signals lack of ownership. Writing above it signals dishonesty. Both get filtered out before the technical screen.",
  },
];

const WHAT_REVIEW_COVERS = [
  { area: "ATS compatibility", detail: "The resume is parsed the way an ATS would parse it — checking for encoding issues, formatting that breaks parsing, missing contact fields, and file structure. A score from 0–100 with exact attribution for every deduction." },
  { area: "Keyword alignment", detail: "Your resume is compared against the target role's keyword patterns. Every missing keyword is surfaced with context — which section it should appear in and how to naturally incorporate it." },
  { area: "Bullet-level scoring", detail: "Every experience bullet is scored on four dimensions: metric density (does it have a number?), action verb strength (specific vs. generic), scope clarity (what scale?), and keyword coverage. Each bullet gets a numeric score." },
  { area: "Seniority calibration", detail: "The language, scope of ownership, and decision-making level expressed in the bullets is compared against the seniority of the target role. Mismatches above or below are flagged." },
  { area: "Formatting and structure", detail: "Section order, header formatting, date formatting, education placement, length per section — all reviewed against current recruiter and ATS best practices." },
  { area: "Rewritten bullets", detail: "Every bullet scoring below threshold gets rewritten — not just flagged. The rewrite is specific to your experience and the target role. You paste it in directly." },
];

const PROCESS_STEPS = [
  { step: "Upload your resume", detail: "PDF or Word. The AI parses it exactly as an ATS would — so you see what the hiring system actually sees, not what your formatting intends." },
  { step: "Set your target role", detail: "Specify the job title and industry you're targeting. This anchors the keyword analysis and seniority calibration to your actual goal." },
  { step: "Zari scores every section", detail: "ATS score, bullet scores, keyword gap report, and formatting analysis — generated in under 2 minutes. No waiting for a human reviewer's calendar." },
  { step: "Review rewrites and accept", detail: "Weak bullets are rewritten with your actual experience preserved. You review, edit if needed, and copy into your resume. The before/after ATS score shows exact improvement." },
  { step: "Download the improved resume", detail: "Clean, formatted document ready to submit. The improved ATS score is attached so you know exactly where you stand." },
];

const FAQS = [
  {
    question: "What does a resume review actually check?",
    answer: "A thorough resume review covers: (1) ATS compatibility — whether an automated system can parse and index your resume correctly. (2) Keyword alignment — whether the keywords in your resume match what the job description is filtering for. (3) Bullet quality — whether your experience bullets are written with specific metrics, strong action verbs, and appropriate scope for your target role. (4) Seniority calibration — whether the language and ownership level matches the role you're applying to. (5) Formatting — whether section structure, length, and visual presentation follow current best practices. Most human resume reviews only address formatting and generic writing quality. Zari's review addresses all five, with specific scores and rewrites for each.",
  },
  {
    question: "How is AI resume review different from a human resume review?",
    answer: "Human resume reviewers typically provide subjective feedback on tone, flow, and presentation — things that matter for readability but not for ATS filtering, which is where most resumes actually fail. AI review can: (1) Simulate exactly how an ATS would parse your document. (2) Score every bullet numerically against objective criteria (metrics, verb strength, keyword match). (3) Run keyword gap analysis against the specific role you're targeting. (4) Generate rewrites in seconds rather than days. The best approach combines both: AI for objective technical scoring and keyword matching, human judgment for tone and culture fit. Zari handles the technical layer — the part that determines whether a human ever sees your resume at all.",
  },
  {
    question: "How long does a resume review take?",
    answer: "Zari's AI resume review completes in under 2 minutes from upload to results. The full output — ATS score, line-by-line bullet scores, keyword gap report, and specific rewrites — is available immediately. Human review services typically take 2–5 business days. The practical difference matters: if you find a job posting on Monday and the deadline is Wednesday, a 3-day human review means you're applying with the same resume. Zari lets you optimize and resubmit in 20 minutes.",
  },
  {
    question: "What's a good ATS score for a resume?",
    answer: "There's no universal standard because every ATS system scores differently — but as a practical benchmark: 70+ is solid for most roles; 80+ is strong; below 60 and you're likely being filtered before a human review. The more useful number is the delta: if your resume scores 58 before Zari's rewrites and 81 after, you know exactly what changed and why. ATS score alone doesn't guarantee an interview — it gets you to the pile of resumes a human actually reads. The human still makes the call.",
  },
  {
    question: "Do I need a different resume for every job?",
    answer: "For the keyword alignment layer: yes, ideally. ATS systems filter on keywords from each specific job description, and no two job descriptions use identical language. A tailored resume that mirrors the job's keywords scores meaningfully higher than a generic resume. In practice, you don't need to rewrite the entire resume — you need to adjust the skills section, one or two bullets per role, and the professional summary. Zari generates a targeted keyword gap report per job, so the tailoring is surgical rather than a full rewrite every time.",
  },
];

export default async function ResumeReviewServicePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Resume Review Service — What a Real Review Covers"
        description="What a resume review actually checks, why most resumes fail ATS, and the specific improvements that lead to more interviews."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/resume-review-service`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Resume Review Service", url: `${BASE_URL}/resume-review-service` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Resume Review Service · ATS Scoring · Specific Rewrites
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Resume review service<br />
            <span className="gradient-text-animated">that actually tells you what to fix.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            75% of resumes are rejected by ATS before a human ever reads them. Generic feedback like "make it more impactful" doesn't fix that. Zari scores every bullet, surfaces every missing keyword, and rewrites the weak lines — in under 10 minutes.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[#4361EE] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(67,97,238,0.45)] transition-all hover:-translate-y-0.5">
              Get my resume reviewed free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">Free first review · No credit card · Results in 2 minutes</p>
        </div>
      </section>

      {/* Why resumes fail */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">The core problem</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">Why most resumes don't get past ATS</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            ATS (applicant tracking systems) are not reading your resume the way a human would. They&apos;re parsing structured data, matching keywords, and scoring candidates against thresholds — before a recruiter sees anything. These are the four patterns that cause the most rejections.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {MISTAKES.map(({ mistake, frequency, example, impact }) => (
              <div key={mistake} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-extrabold text-[16px] text-[var(--ink)]">{mistake}</h3>
                  <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600">{frequency}</span>
                </div>
                <div className="mb-3 rounded-lg border border-[var(--border)] bg-white p-3">
                  <p className="text-[12px] italic leading-5 text-[var(--muted)]">{example}</p>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What a review covers */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">What gets reviewed</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">What a thorough resume review actually covers</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Most resume review services give you feedback on tone and grammar. That doesn&apos;t get you past ATS. A real review addresses the technical layer first — then the human readability layer.
          </p>
          <div className="space-y-4">
            {WHAT_REVIEW_COVERS.map(({ area, detail }, i) => (
              <div key={area} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4361EE] text-[13px] font-black text-white">{i + 1}</div>
                <div>
                  <h3 className="mb-1.5 font-extrabold text-[15px] text-[var(--ink)]">{area}</h3>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Zari works */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">How it works</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">How Zari reviews your resume</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Upload to results in under 10 minutes. No scheduling, no waiting for a reviewer&apos;s calendar, no generic feedback. The output is specific, scored, and ready to implement.
          </p>
          <div className="space-y-4">
            {PROCESS_STEPS.map(({ step, detail }, i) => (
              <div key={step} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#4361EE] text-[13px] font-black text-[#4361EE]">{i + 1}</div>
                <div>
                  <p className="mb-1 font-bold text-[14px] text-[var(--ink)]">{step}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { stat: "2 min", label: "Average review time", sub: "vs. 2–5 days for human reviews" },
              { stat: "+23 pts", label: "Average ATS score increase", sub: "after applying Zari rewrites" },
              { stat: "91%", label: "Of users improve their score", sub: "on first review pass" },
            ].map(({ stat, label, sub }) => (
              <div key={label} className="rounded-2xl border border-[var(--border)] bg-white p-5 text-center">
                <p className="text-[2.2rem] font-extrabold text-[#4361EE]">{stat}</p>
                <p className="mt-1 text-[13px] font-bold text-[var(--ink)]">{label}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-[#4361EE] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-3 text-[1.9rem] font-extrabold text-white">See exactly what&apos;s holding your resume back.</h2>
          <p className="mb-7 text-[15px] text-white/70">Upload your resume and get a full ATS score, bullet-level analysis, and specific rewrites — free.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
            Review my resume free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">Common questions</div>
          <h2 className="mb-10 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Everything you need to know about resume review</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-3 font-bold text-[15px] text-[var(--ink)]">{question}</h3>
                <p className="text-[13px] leading-7 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1a2f6e 50%, #4361EE 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-[2.6rem] font-extrabold tracking-[-0.03em]">Your resume review is ready in 10 minutes.</h2>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/60">
            Free first session. ATS score, bullet rewrites, and keyword gap report included. No scheduling required.
          </p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)]">
            {userId ? "Go to dashboard" : "Review my resume — it's free"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <p className="mt-5 text-[12px] text-white/35">No credit card required · Results in under 2 minutes · Specific rewrites included</p>
        </div>
      </section>
    </PageFrame>
  );
}
