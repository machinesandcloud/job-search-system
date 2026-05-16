import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What Is an ATS? How Applicant Tracking Systems Work (2025)",
  description:
    "What is an ATS? Learn how applicant tracking systems work, why 87% of resumes are auto-rejected, and exactly what you need to do to pass ATS screening and reach a human recruiter.",
  keywords: ["what is an ATS", "applicant tracking system", "how ATS works", "ATS resume tips", "why resumes get rejected", "ATS screening", "how to pass ATS", "ATS explained"],
  alternates: { canonical: "/blog/what-is-an-ats" },
  openGraph: { title: "What Is an ATS? How Applicant Tracking Systems Work (2025)", description: "How ATS software screens resumes, why most get rejected, and what to do about it.", url: "/blog/what-is-an-ats" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-01-20";
const MODIFIED = "2025-05-15";

export default async function WhatIsAnAtsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="What Is an ATS? How Applicant Tracking Systems Work (2025)"
        description="How ATS software screens resumes, why most get rejected, and what to do about it."
        url={`${BASE_URL}/blog/what-is-an-ats`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "What Is an ATS?", url: `${BASE_URL}/blog/what-is-an-ats` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search Basics</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">What Is an ATS? How Applicant Tracking Systems Work (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Before a human reads your resume, software does. That software is called an ATS — Applicant Tracking System — and it's the reason most applications end before they begin. Here's exactly how it works and what you need to do to get through it.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What is an ATS?</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              An ATS (Applicant Tracking System) is software that companies use to receive, organize, and filter job applications. When you submit an application on a company's job portal — or through LinkedIn, Indeed, or any job board — your resume flows into an ATS before any recruiter sees it.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The ATS parses your resume into structured data: name, contact info, work history, education, skills. It then scores that data against the job's requirements and filters applications by score. Recruiters see a ranked list — not your resume as you designed it.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Companies with 50+ employees almost universally use ATS. The most common systems are Workday, Greenhouse, Lever, iCIMS, Taleo, and BambooHR. Each has its own parsing quirks, but they all operate on the same core logic.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why 87% of resumes get rejected before a human reads them</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The 87% figure comes from HR data on application rejection rates at large companies. The reasons fall into two categories:
            </p>
            <p className="mt-4 font-bold text-[var(--ink)]">1. Formatting that breaks parsing</p>
            <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
              ATS systems parse text from top to bottom in a single column. Two-column layouts, text boxes, tables, and headers placed in the page margin confuse parsers and produce garbled or incomplete records. A candidate with perfect qualifications whose resume parses incorrectly may show up with no work history, no skills, or scrambled dates — and score below the threshold.
            </p>
            <p className="mt-4 font-bold text-[var(--ink)]">2. Missing keywords</p>
            <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
              ATS systems keyword-match your resume against the job description. If the job requires "project management" and you wrote "project coordination," you may miss the match. If you have experience with a required skill but never wrote the exact term the JD uses, you score lower — even though you're qualified.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How ATS scores your resume</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The scoring process varies by system, but the core logic is consistent:
            </p>
            <ol className="mt-4 space-y-3 text-[15px] leading-7 text-[var(--muted)]">
              <li><strong>Parse:</strong> The ATS extracts text from your document and classifies it into categories — work history, education, skills, contact info.</li>
              <li><strong>Match:</strong> The extracted data is compared against required and preferred qualifications in the job description. Keyword matches are weighted.</li>
              <li><strong>Score:</strong> A composite score is generated based on match rate, years of experience, education level, and other factors the recruiter configured.</li>
              <li><strong>Rank:</strong> All applications are ranked by score. Recruiters typically review the top 10–20% of applicants.</li>
            </ol>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Recruiters rarely set a hard cutoff score manually — instead, they work through the ranked list until they have enough qualified candidates to schedule. If you're not in the top of the ranked list, you're unlikely to be reviewed regardless of your qualifications.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 rules for passing ATS screening</h2>
            <div className="mt-4 space-y-5">
              {[
                { rule: "Use a single-column layout", detail: "Avoid two-column templates, tables, and text boxes. A clean, single-column layout parses correctly on every ATS. The design looks simpler, but the parsing reliability is worth it." },
                { rule: "Mirror the job description's language", detail: "If the JD says \"cross-functional collaboration,\" use that exact phrase — not \"working across teams.\" ATS matching is often literal. Read the JD carefully and incorporate the exact terms." },
                { rule: "Include a skills section", detail: "Many ATS systems specifically parse a skills section for keyword extraction. A dedicated skills section with role-relevant technical and soft skills increases your keyword match score." },
                { rule: "Use standard section headers", detail: "\"Work Experience,\" \"Education,\" \"Skills\" — not \"Where I've Worked\" or \"My Background.\" Non-standard headers can prevent ATS from correctly categorizing your content." },
                { rule: "Export as a compatible PDF", detail: "Most modern ATS systems handle PDF well, but the encoding matters. Use a PDF exported from Word or Google Docs rather than a design tool like Canva or Figma, which can produce encoding that breaks parsing." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</div>
                  <div>
                    <p className="mb-1 font-bold text-[var(--ink)]">{item.rule}</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The fastest way to check your resume's ATS score</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The quickest way to know if your resume passes ATS is to test it. Zari's <Link href="/free-ats-checker" className="text-[var(--brand)] underline underline-offset-2">free ATS checker</Link> parses your resume the same way ATS software does and returns a detailed score — formatting errors, keyword gaps, section issues — with specific fixes for each.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If you want to go deeper, <Link href="/ai-resume-writer" className="text-[var(--brand)] underline underline-offset-2">Zari's AI resume writer</Link> rewrites every weak bullet with ATS-targeted language so you don't just pass the filter — you rank near the top of it.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Check your resume's ATS score — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Find out exactly where your resume is losing points before you apply.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Test my resume free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
