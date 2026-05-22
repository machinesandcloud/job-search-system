import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Chronological vs Functional Resume 2025 — Which Format Should You Use?",
  description: "Chronological vs functional resume: which format should you use in 2025? ATS impact, recruiter preference, and when each format is the right choice — with real examples.",
  keywords: ["chronological vs functional resume", "resume format 2025", "chronological resume", "functional resume", "combination resume", "best resume format", "resume format for career change", "ATS resume format", "which resume format", "resume format guide"],
  alternates: { canonical: "/blog/chronological-vs-functional-resume" },
  openGraph: { title: "Chronological vs Functional Resume 2025 — Which Format Should You Use?", description: "ATS impact, recruiter preference, and when each resume format is the right choice in 2025.", url: "/blog/chronological-vs-functional-resume" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the difference between a chronological and functional resume?", answer: "A chronological resume (reverse-chronological) lists your work history in order from most recent to oldest, with achievements and responsibilities under each employer. It's the standard format used by 90%+ of job seekers. A functional resume groups skills and accomplishments by category (e.g., 'Leadership', 'Project Management') instead of by employer, with work history minimized or listed without detail. The functional format is designed to hide employment gaps or emphasise skills over a specific job history." },
  { question: "Which resume format is best for ATS?", answer: "Reverse-chronological is best for ATS. Functional resumes fail ATS parsing for a straightforward reason: the ATS cannot associate your skills section entries with specific employers and dates. Most ATS systems require a structured work history (employer, title, dates) to score your resume. A functional format that buries or omits work history will typically score near zero in ATS systems like Workday, Greenhouse, and Taleo — regardless of the quality of your skills." },
  { question: "Should I use a functional resume for career changes?", answer: "No — despite the common advice, functional resumes hurt career changers in the modern job market. Recruiters are skeptical of functional formats because they're often used to hide thin experience. For career changers, a combination (hybrid) format works best: reverse-chronological work history, but with a 'Key Skills' or 'Relevant Experience' summary section at the top that frames your transferable experience before the detailed history." },
  { question: "What format should I use to hide employment gaps?", answer: "There is no resume format that successfully hides a significant employment gap from a recruiter reviewing your resume. Recruiters look for dates by habit. The right strategy is not to hide gaps but to address them confidently: include a brief explanation in your cover letter, be ready to discuss the gap in interviews (caregiving, health, personal development, freelance), and make sure your resume's content is achievement-strong enough that the gap is not the most interesting thing about your application." },
];

export default async function ChronologicalVsFunctionalResumePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-01-20";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Chronological vs Functional Resume 2025 — Which Format Should You Use?"
        description="ATS impact, recruiter preference, and when each resume format is the right choice in 2025."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/chronological-vs-functional-resume`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Chronological vs Functional Resume", url: `${BASE_URL}/blog/chronological-vs-functional-resume` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Resume Format Guide · ATS · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Chronological vs<br />
            <span className="text-white/50">Functional Resume</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Which resume format should you use in 2025? The ATS impact, recruiter preference, and when functional formats hurt more than they help — with real format examples.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 7 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">The three resume formats — compared</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Format</span><span>Structure</span><span>ATS compatibility</span><span>Best for</span>
            </div>
            {[
              { f: "Reverse-Chronological", s: "Jobs listed newest to oldest, with achievements under each", ats: "✓ Excellent — standard expected format", b: "Most job seekers (90%+ of applications)" },
              { f: "Functional (Skills-Based)", s: "Skills grouped by category; work history buried or minimal", ats: "✗ Poor — ATS cannot parse skills without dates/employers", b: "Almost nobody in 2025 — largely obsolete" },
              { f: "Combination (Hybrid)", s: "Summary + skills section up top, reverse-chron history below", ats: "✓ Good — if work history section is complete with dates", b: "Career changers, returning to work, senior executives" },
            ].map(({ f, s, ats, b }) => (
              <div key={f} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{f}</span>
                <span className="text-[var(--muted)]">{s}</span>
                <span>{ats}</span>
                <span className="text-[var(--muted)]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">When each format is the right choice</h2>
          <div className="space-y-6 text-[14px] leading-7 text-[var(--muted)]">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px] text-[#0D7182]">Use reverse-chronological (default for everyone)</h3>
              <p>If you have a continuous work history in the same field and are applying for roles at the same or adjacent seniority level — this is your format. No exceptions. ATS systems expect it, recruiters are trained to read it, and it puts your most recent (most relevant) experience first.</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px] text-[#7C3AED]">Use combination/hybrid format for:</h3>
              <ul className="space-y-2 mt-2">
                {["Career changers who need to frame transferable skills before the work history", "Professionals returning after a long gap (caregiving, health, education)", "Senior executives (VP+) where a high-level summary of impact belongs at the top", "People with highly relevant skills that don't appear in their most recent job title"].map(p => (
                  <li key={p} className="flex gap-2"><span className="text-[#7C3AED] flex-shrink-0">✓</span>{p}</li>
                ))}
              </ul>
              <p className="mt-3 text-[13px]"><strong>Critical rule:</strong> Even in a combination format, always include a full chronological work history with employers, titles, and dates. The skills summary is an addition, not a replacement.</p>
            </div>
            <div className="rounded-2xl border border-[#EF4444]/20 bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px] text-[#EF4444]">Never use a pure functional resume in 2025</h3>
              <p>The functional resume format was designed for the pre-ATS era when human recruiters read every application. Today, most applications pass through ATS before a human sees them. A pure functional format — where work history is deprioritized in favour of skills groupings — scores near zero in ATS systems and triggers immediate skepticism in human reviewers. It signals a significant gap or a weak work history regardless of intent.</p>
            </div>
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
          <h2 className="mb-4 text-[2rem] font-extrabold">Get your resume format right — and your ATS score.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari checks your resume format, ATS compatibility, and keyword gaps — free, in under 2 minutes.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Check my resume free</Link>
            <Link href="/resume-checker" className="inline-block rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">Resume checker →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
