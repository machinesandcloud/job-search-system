import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resume Checker Free — ATS Score, Keyword Gaps & Formatting Issues | Zari",
  description:
    "What an ATS score actually measures, how resume checkers work, what separates a real checker from a generic one, and how to interpret your results. Zari scores every section and rewrites weak bullets — free in under 2 minutes.",
  keywords: ["resume checker", "free resume checker", "ATS score", "resume checker free", "AI resume checker", "resume analysis", "resume grader", "ATS resume checker", "check my resume", "resume score"],
  alternates: { canonical: "/resume-checker" },
  openGraph: {
    title: "Resume Checker Free — ATS Score, Keyword Gaps & Formatting Issues | Zari",
    description: "What an ATS score actually measures and how to use one correctly. Free ATS score, keyword gaps, and bullet rewrites in under 2 minutes.",
    url: "/resume-checker",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SCORING_MISTAKES = [
  {
    mistake: "Treating ATS score as a single universal number",
    frequency: "Most free checkers",
    example: '"Your resume scored 74/100" — with no explanation of what ATS system, what job description, or what criteria produced that number.',
    impact: "An ATS score without a specific job description behind it is nearly meaningless. Workday, Greenhouse, Lever, and Taleo all weight keywords differently. A 74 against one JD might be a 51 against another. Generic scores give false confidence and don't tell you what to fix.",
  },
  {
    mistake: "Keyword matching on the wrong signal",
    frequency: "Generic checkers",
    example: 'Flagging "project management" as a missing keyword when the JD uses "program management" or "cross-functional delivery" — close enough semantically, but not a match in the ATS filter.',
    impact: "ATS systems match exact strings or close variants, not synonyms. A checker that doesn't parse the actual job description's language will miss the specific terms that determine whether your resume passes or fails the automated filter.",
  },
  {
    mistake: "Ignoring formatting as an ATS factor",
    frequency: "61% of submitted resumes",
    example: 'A two-column resume that looks clean in PDF but gets read as scrambled text by an ATS parser — skills appear mid-sentence inside the experience section.',
    impact: "Most free checkers evaluate the text layer only. They score what they can read. But an ATS that can't parse your resume correctly will score it at near zero regardless of how good your content is. Formatting compliance is half the battle.",
  },
  {
    mistake: "Scoring bullets without a seniority lens",
    frequency: "54% of resumes",
    example: "A director-level candidate writing bullets at analyst scope: 'Assisted with implementation of new CRM system' — the language signals an individual contributor, not a decision-maker.",
    impact: "ATS systems don't catch seniority mismatches — but recruiters do, in the first 7 seconds. A checker that scores bullets without calibrating to the target role's seniority level gives you a passing grade on content that will fail with the human reader.",
  },
];

const WHAT_CHECKER_COVERS = [
  { area: "ATS compatibility scan", detail: "Your resume is parsed the way the most common enterprise ATS platforms (Workday, Greenhouse, Lever, iCIMS, Taleo) would parse it. The scanner checks for encoding issues, linearization problems from multi-column layouts, non-standard header labels, missing contact fields, and font/file format issues. A score from 0–100 with line-item attribution for every deduction." },
  { area: "Job-description keyword gap analysis", detail: "Zari parses the specific job description you paste — not a generic keyword list for the industry. Every keyword in the JD is weighted by frequency and placement (required vs. preferred qualifications). The gap report shows which high-weight keywords are missing from your resume and which sections they should appear in." },
  { area: "Bullet-level quality scoring", detail: "Every experience bullet is scored on four dimensions: metric density (does it contain a measurable outcome?), action verb strength (specific and ownership-indicating vs. generic and passive), scope clarity (what scale of impact?), and keyword coverage (does it carry relevant terms?). Each bullet receives a numeric score, not just a binary pass/fail." },
  { area: "Seniority calibration check", detail: "The language, ownership level, and decision-making scope expressed across your bullets is compared against the seniority of the target role. Writing below your level signals lack of ownership. Writing above it raises credibility questions. Both patterns are flagged with specific examples." },
  { area: "Formatting and structure audit", detail: "Section order, header formatting (does 'Work History' parse as 'Experience'?), date formatting, education placement, file type compliance, and length per section — all reviewed against current recruiter and ATS best practices. The audit identifies every structural issue that could cause a mis-parse or a recruiter red flag." },
  { area: "Rewritten bullets for weak lines", detail: "Every bullet scoring below the threshold gets a specific rewrite — not a generic tip. The rewrite preserves your actual experience, incorporates the job's keywords naturally, and upgrades the verb and metric structure. You review, edit if needed, and paste directly into your resume." },
];

const PROCESS_STEPS = [
  { step: "Upload your resume", detail: "PDF or Word. The checker parses it exactly as an ATS would, exposing any formatting issues that a visual read would miss." },
  { step: "Paste the job description", detail: "This is the step most checkers skip. Zari anchors every keyword analysis and seniority calibration to the specific role you're applying for, not a generic industry template." },
  { step: "Review your ATS score breakdown", detail: "The score report attributes every point gained or lost to a specific issue — formatting, missing keyword, weak bullet, structural problem. You know exactly why you scored what you scored." },
  { step: "See your keyword gap report", detail: "Every keyword in the JD that's missing from your resume, ranked by importance. Each is mapped to the section where it should appear and given a natural integration example." },
  { step: "Apply rewrites and re-check", detail: "Weak bullets are rewritten. Accept the ones you agree with, edit what doesn't feel right, paste into your resume. Re-run the checker on the updated version to confirm your score improvement before submitting." },
];

const FAQS = [
  {
    question: "What is a good ATS score?",
    answer: "There is no universal standard, because every ATS configures its filters differently and every job description creates a different keyword target. As a practical working benchmark: below 60 is a warning sign — you're likely missing significant keywords or have formatting issues that cause mis-parsing. 60–74 is competitive but improvable. 75–84 is solid for most roles. 85+ indicates strong alignment. The more useful metric is the delta: if Zari shows your resume moving from 57 to 82 after applying rewrites, that shift tells you more than the absolute number. One important caveat: a high score on a generic checker that isn't anchored to a specific job description is not meaningful. The score only matters relative to the specific JD's keyword requirements, formatting preferences, and required-versus-preferred qualification structure.",
  },
  {
    question: "How do resume checkers work?",
    answer: "Resume checkers work in two layers. The first layer is parsing: the checker reads your resume the same way an ATS would, extracting structured data — name, contact info, work history, skills — and identifying any formatting elements that would break that extraction (columns, text boxes, non-standard section headers, complex tables). The second layer is scoring: the extracted text is compared against a keyword model, either a generic industry template or, in Zari's case, the actual job description you're targeting. The score reflects keyword match density, keyword placement (skills section versus experience bullets — experience placement scores higher), and structural compliance. Better checkers also score content quality: are bullets achievement-focused with metrics, or generic duty descriptions? The weakest checkers skip the JD comparison entirely and score against a generic model, which produces misleading results.",
  },
  {
    question: "Are free resume checkers accurate?",
    answer: "It depends entirely on what the checker is scoring against. Free checkers that score against generic industry keyword lists — rather than the specific job description you're applying to — produce scores that correlate poorly with actual ATS outcomes. The reason: ATS systems are configured per employer and per job description. The keywords that matter for a Senior Product Manager role at a Series B SaaS startup differ from the keywords for the same title at a healthcare system or a Fortune 100 consumer goods company. A generic checker gives you a number, but it's not the number that determines whether your resume passes the specific filter at the specific company. Zari anchors every score to a specific JD you paste, which makes the gap analysis actionable rather than generic. The formatting compliance layer is accurate across checkers because ATS parsing standards are consistent.",
  },
  {
    question: "What does an ATS score actually measure?",
    answer: "An ATS score is a composite of several weighted factors, and the weighting varies by ATS platform and employer configuration. The primary components are: keyword match rate (what percentage of the high-priority keywords from the job description appear in your resume, and in which sections), formatting compliance (does the resume parse correctly into structured fields, or does the ATS see a garbled string of text), section completeness (are required sections present with standard labels), and experience field parsing accuracy (are dates, job titles, and company names correctly extracted). Secondary components that more sophisticated checkers include: keyword density across multiple sections (a keyword in both the summary and experience scores higher than one appearance), quantification rate (percentage of bullets with measurable outcomes), and seniority signal alignment (do the language and scope match the level of the target role). Zari surfaces all of these as individual scored components, not just a single composite score.",
  },
  {
    question: "Should I use multiple resume checkers?",
    answer: "Running your resume through two or three different checkers has some value — mainly for catching formatting issues that one parser might miss. But there's a ceiling on how useful this is. The core problem with using multiple generic checkers is that you accumulate conflicting advice: one checker flags your resume as too long, another says it's fine; one penalizes the word 'responsible' in bullets, another doesn't flag it. You end up optimizing for the average of multiple tools rather than for the actual job you're applying to. A more useful approach: use one checker that's anchored to the actual job description (so your optimization is job-specific), run it before and after applying rewrites to confirm the score delta, and focus the rest of your time on tailoring the keyword section and top three bullets for each application. The goal is a resume that scores well against the specific role, not one that averages well across generic benchmarks.",
  },
];

export default async function ResumeCheckerPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Resume Checker — What ATS Score Actually Means and How to Use One Correctly"
        description="What an ATS score measures, how resume checkers work, what separates real checkers from generic ones, and how to interpret your results."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/resume-checker`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Resume Checker", url: `${BASE_URL}/resume-checker` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Resume Checker · ATS Score · Keyword Gap Analysis · Formatting Audit
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Resume checker that tells you<br />
            <span className="gradient-text-animated">exactly what to fix.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Most resume checkers give you a score with no explanation. Zari shows you every keyword you&apos;re missing, every formatting issue that breaks ATS parsing, and rewrites every underperforming bullet — anchored to the specific job you&apos;re applying to.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[#4361EE] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(67,97,238,0.45)] transition-all hover:-translate-y-0.5">
              Check my resume free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">Free first check · No credit card · Results in 2 minutes</p>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">Why most checkers mislead you</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">The four ways resume checkers produce wrong scores</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            A score without context is noise. Understanding how ATS scoring actually works — and where most checkers cut corners — lets you use your results correctly instead of optimizing for the wrong thing.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {SCORING_MISTAKES.map(({ mistake, frequency, example, impact }) => (
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

      {/* What it covers */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">What gets checked</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">What a thorough resume check actually covers</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            A score alone doesn&apos;t help you. Each dimension below produces specific, actionable output — not just a number and a generic tip.
          </p>
          <div className="space-y-4">
            {WHAT_CHECKER_COVERS.map(({ area, detail }, i) => (
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

      {/* How it works + stats */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">How it works</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">How Zari checks your resume</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Upload to results in under 2 minutes. Every output is specific to the job description you paste — not a generic industry score.
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
              { stat: "75%", label: "Of resumes never reach a human", sub: "filtered by ATS before recruiter review" },
              { stat: "+24 pts", label: "Average ATS score lift", sub: "after applying Zari checker rewrites" },
              { stat: "2 min", label: "From upload to full report", sub: "vs. 2–5 days for human review services" },
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
          <h2 className="mb-3 text-[1.9rem] font-extrabold text-white">See your ATS score against the actual job you want.</h2>
          <p className="mb-7 text-[15px] text-white/70">Free ATS score, keyword gap report, formatting audit, and bullet rewrites — anchored to the specific JD you paste. No credit card required.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
            Check my resume free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">Common questions</div>
          <h2 className="mb-10 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Everything you need to know about resume checkers and ATS scores</h2>
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
          <h2 className="mb-4 text-[2.6rem] font-extrabold tracking-[-0.03em]">Your ATS score report is ready in 2 minutes.</h2>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/60">
            Free first check. ATS score, keyword gaps, formatting audit, and specific bullet rewrites — anchored to the job you&apos;re applying to.
          </p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)]">
            {userId ? "Go to dashboard" : "Check my resume — it's free"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <p className="mt-5 text-[12px] text-white/35">No credit card required · Results in under 2 minutes · Rewrites included</p>
        </div>
      </section>
    </PageFrame>
  );
}
