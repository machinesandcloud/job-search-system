import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Free ATS Checker — Test Your Resume Against ATS Systems",
  description:
    "Test your resume against ATS filters for free. Zari's ATS checker finds every formatting issue, keyword gap, and parsing error that gets your resume auto-rejected — before you apply.",
  keywords: ["free ATS checker", "ATS checker", "ATS resume checker", "ATS test", "ATS score free", "applicant tracking system checker", "resume ATS test", "ATS compatibility checker"],
  alternates: { canonical: "/free-ats-checker" },
  openGraph: { title: "Free ATS Checker — Test Your Resume Against ATS Systems", description: "Find every formatting issue and keyword gap that gets your resume auto-rejected by ATS — free.", url: "/free-ats-checker" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is an ATS checker?", answer: "An ATS (Applicant Tracking System) checker tests your resume against the same kind of automated filters that companies use to screen applications. These systems look for specific keywords, correct formatting, and parseable structure. Resumes that fail ATS screening are rejected before any human sees them — regardless of the candidate's qualifications." },
  { question: "How does Zari's ATS checker work?", answer: "You upload your resume and optionally paste the job description. Zari parses your resume the way ATS software does — identifying formatting that breaks parsing, keywords that are missing or used incorrectly, and structural issues that reduce your score. The result is a detailed breakdown with specific fixes, not just a pass/fail grade." },
  { question: "Is the ATS check really free?", answer: "Yes — the ATS compatibility scan, formatting error detection, and keyword gap analysis are all free. No credit card, no email required just to see your score. Full bullet rewrites and role-specific optimization are part of the Zari coaching platform." },
  { question: "What ATS systems does Zari test against?", answer: "Zari's ATS model is trained on the behavior of the most common enterprise ATS platforms — Workday, Greenhouse, Lever, iCIMS, Taleo, and BambooHR. These cover the vast majority of job applications at companies with 50+ employees." },
];

export default async function FreeAtsCheckerPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Free ATS Checker", url: `${BASE_URL}/free-ats-checker` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Free ATS Checker · Format · Keywords · Parsing
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            87% of resumes fail<br />
            <span className="gradient-text-animated">before a human reads them.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            ATS systems auto-reject resumes with formatting errors, missing keywords, and parsing failures — even from perfectly qualified candidates. Zari's free ATS checker finds every issue before you apply.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Test my resume free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <p className="w-full text-[13px] text-white/35">Free. No card required.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What ATS systems reject — and why</h2>
          <p className="mb-12 text-[15px] text-[var(--muted)]">Most candidates never know their resume was rejected before anyone read it. These are the most common failure points.</p>
          <div className="space-y-4">
            {[
              { title: "Column and table layouts", body: "Two-column resume templates are popular for their design — and disastrous in ATS. Most ATS software reads left-to-right across columns, mangling your content. Zari detects column layouts and flags them for correction." },
              { title: "Text boxes and graphics", body: "Headers, contact info, or content placed in text boxes is invisible to ATS parsers. Certificates and achievements in image format are entirely unreadable. Zari finds every element that won't parse." },
              { title: "Non-standard section headers", body: "\"My Experience\" or \"Where I've Worked\" instead of \"Work Experience\" can prevent ATS from categorizing your history. Zari identifies non-standard headers that break keyword mapping." },
              { title: "Missing role-specific keywords", body: "ATS systems keyword-match your resume against the job description. Missing exact-match terms — even for skills you have — drops your score below the threshold. Zari maps every missing keyword." },
              { title: "PDF formatting incompatibility", body: "Not all PDFs parse identically. Fonts, encoding, and export settings affect how ATS reads your file. Zari tests your PDF the same way ATS software does." },
              { title: "Incorrect date formatting", body: "Inconsistent date formats confuse ATS calculation of tenure. Zari checks every date and ensures your experience is parsed with accurate duration." },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10">
                  <svg className="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                </div>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[13.5px] leading-7 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Stop letting ATS reject you silently. Check now — free.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Full ATS compatibility scan. Keyword gap analysis. Zero cost to see your score.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Test my resume" : "Test my resume free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
