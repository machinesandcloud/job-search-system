import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "UK CV Writing Tips 2025 — How to Write a CV That Gets Interviews",
  description: "Expert UK CV writing tips with examples. Covers format, length, personal statement, ATS optimisation, and the key differences between a UK CV and a US resume. Updated for 2025.",
  keywords: ["UK CV writing tips", "how to write a CV UK", "CV format UK", "UK CV 2025", "CV tips UK", "writing a CV UK", "UK CV template", "ATS CV UK", "personal statement CV UK"],
  alternates: { canonical: "/blog/uk-cv-writing-tips" },
  openGraph: { title: "UK CV Writing Tips 2025 — Get Interviews Faster", description: "Format, length, ATS optimisation, personal statement, and the key differences between a UK CV and a US resume.", url: "/blog/uk-cv-writing-tips" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How long should a UK CV be?", answer: "Two pages is the standard for most UK employers. One page is acceptable for recent graduates. Three pages can work for very senior roles (10+ years experience) where three pages of genuinely relevant content exist. Never pad to fill space — a concise two-page CV outperforms a padded three-page one." },
  { question: "Should a UK CV have a photo?", answer: "No. Unlike some European countries, UK CVs should not include a photo. Including a photo can actually raise discrimination concerns and may cause your application to be rejected by some UK employers. The exception is roles where appearance is professionally relevant (e.g., acting, modelling)." },
  { question: "What's the difference between a UK CV and a US resume?", answer: "UK CVs are typically 2 pages (US resumes are 1 page), written in British English ('optimise' not 'optimize'), include a personal statement section, do not include an objective statement, and sometimes include nationality and right-to-work status. US resumes place more emphasis on quantified achievements in every bullet; UK CVs are typically slightly more narrative." },
  { question: "Should I include references on my UK CV?", answer: "The traditional 'References available on request' line is now considered outdated. Omit it entirely — references are assumed to be available. UK employers will ask for references at the offer stage, not during initial screening." },
];

export default async function UkCvWritingTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="UK CV Writing Tips 2025" description="Expert UK CV writing tips covering format, ATS, personal statement, and UK vs US differences." url={`${BASE_URL}/blog/uk-cv-writing-tips`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "UK CV Writing Tips", url: `${BASE_URL}/blog/uk-cv-writing-tips` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 55%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">🇬🇧 UK Guide</span>
            <span className="text-[12px] text-white/35">14 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">UK CV Writing Tips:<br /><span className="text-white/55">How to Write a CV That Gets Interviews</span></h1>
          <p className="mt-5 text-[15px] leading-7 text-white/50">Updated 2025 · UK-specific advice on format, ATS optimisation, personal statements, and what separates CVs that get shortlisted from ones that don&apos;t.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={73} suffix="%" label="of UK CVs rejected by ATS before a human reads them" accent="#012169" />
            <StatCard value={247} label="average applications per UK job posting" accent="#0D7182" />
            <StatCard value={6} label="seconds average recruiter spends on a CV initial scan" accent="#7C3AED" />
            <StatCard value={2} label="pages — the UK CV standard length" accent="#059669" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15px] leading-8 text-[var(--muted)]">

          <div className="rounded-2xl border border-[#012169]/20 bg-[#012169]/[0.04] p-5">
            <p className="text-[14px] font-medium text-[#012169]">UK CVs and US resumes are fundamentally different documents. This guide is written specifically for the UK market. If you&apos;re applying for UK roles, the advice here applies. If you&apos;re applying in the US, see our <Link href="/blog/software-engineer-resume" className="underline">resume writing guide</Link> instead.</p>
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">1. Format: What a UK CV should look like</h2>
          <p>The standard UK CV format is clean, readable, and two pages long. Here&apos;s the structure that UK recruiters expect:</p>
          <div className="space-y-3">
            {[
              { section: "Name and contact details", note: "Name, professional email, phone number, LinkedIn URL, city (not full address). No photo, no date of birth." },
              { section: "Personal statement (2–4 sentences)", note: "A short, punchy summary of who you are and what you&apos;re looking for. Written in third person." },
              { section: "Work experience (reverse chronological)", note: "Job title, company, dates (month and year), 3–5 bullet points per role using action verbs and quantified results." },
              { section: "Education", note: "Degree, university, classification (1st, 2:1, 2:2), relevant modules or dissertation if relevant. A-Levels and GCSEs for recent grads only." },
              { section: "Skills", note: "Technical skills, tools, languages. Keep it relevant to the role." },
            ].map((item) => (
              <div key={item.section} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#012169] text-[9px] font-bold text-white">✓</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.section}</p>
                  <p className="mt-0.5 text-[13px]" dangerouslySetInnerHTML={{ __html: item.note }} />
                </div>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">2. The personal statement: your 4-line pitch</h2>
          <p>The personal statement is uniquely important on UK CVs. It sits at the top, runs 2–4 sentences, and tells the recruiter in under 10 seconds whether to read on.</p>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
            <p className="text-[12px] font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Strong personal statement example</p>
            <p className="text-[14px] leading-7 text-[var(--ink)] italic">
              &ldquo;A results-driven Senior Product Manager with 7 years&apos; experience in B2B SaaS across fintech and HR tech. Proven track record of taking products from 0-to-1, with two launches that reached £10M ARR within 18 months. Currently seeking a senior IC or lead role at a Series B–D company where I can own a core product line end-to-end.&rdquo;
            </p>
          </div>
          <p>Notice what it does: states the level and specialism, provides a quantified proof point, and states what they&apos;re looking for. No soft skills. No filler.</p>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">3. ATS optimisation for UK job postings</h2>
          <p>73% of UK CVs never reach a human reviewer — they&apos;re filtered by ATS (Applicant Tracking Systems) used by companies like Workday, Greenhouse, and SAP SuccessFactors. To pass ATS screening:</p>
          <ul className="space-y-2">
            {[
              "Mirror the exact language in the job description — if the JD says 'stakeholder management', use that phrase, not 'managing stakeholders'",
              "Avoid tables, text boxes, headers/footers, and graphics — most UK ATS systems can&apos;t parse them",
              "Use a standard font (Calibri, Arial, Garamond) and simple section headings",
              "Save as a .docx or PDF — some older UK ATS systems struggle with PDFs",
              "Don&apos;t put key information in the header or footer — it&apos;s often not parsed",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#012169]" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">4. UK vs US CV differences — the complete list</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Element</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#012169]">🇬🇧 UK CV</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">🇺🇸 US Resume</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Length", "2 pages standard", "1 page preferred"],
                  ["Document name", "Called a 'CV'", "Called a 'resume'"],
                  ["Personal summary", "Personal statement (top, 2–4 sentences)", "Summary/objective (optional)"],
                  ["Photo", "Never included", "Never included"],
                  ["Spelling", "British English (optimise, colour, grey)", "American English (optimize, color, gray)"],
                  ["Education position", "After work experience (unless recent grad)", "After work experience typically"],
                  ["References", "Omit entirely (assumed available)", "'References available on request' (also optional)"],
                  ["Date format", "Month Year — Month Year (June 2022 – Present)", "MM/YYYY format common"],
                  ["Right to work", "Sometimes noted (especially post-Brexit)", "Not typically noted"],
                ].map(([element, uk, us], i) => (
                  <tr key={element} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--bg)]/50" : "bg-white"}`}>
                    <td className="px-5 py-3.5 font-medium text-[var(--ink)]">{element}</td>
                    <td className="px-4 py-3.5 text-[#012169]">{uk}</td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">5. Common UK CV mistakes</h2>
          <div className="space-y-3">
            {[
              { mistake: "Listing duties instead of achievements", fix: "Every bullet should say what you did AND the impact. 'Led a team of 6 engineers' is a duty. 'Led a team of 6 engineers to deliver a payment system handling £50M monthly' is an achievement." },
              { mistake: "Using American spellings", fix: "Run a spell-check set to English (UK). 'Optimize', 'analyze', 'color' — these flag you as someone who copied a US template." },
              { mistake: "Including a photo or date of birth", fix: "This is not common practice in the UK and can inadvertently trigger bias. Remove it." },
              { mistake: "Three-page CVs for standard roles", fix: "If you have under 15 years of experience, you can almost always fit onto 2 pages. Ruthlessly cut older or less relevant roles to 1–2 bullets." },
            ].map((item) => (
              <div key={item.mistake} className="rounded-xl border border-[var(--border)] p-5">
                <p className="flex items-center gap-2 font-bold text-[var(--ink)]"><span className="text-red-500">✗</span> {item.mistake}</p>
                <p className="mt-2 text-[13px] leading-6"><span className="font-semibold text-[var(--brand)]">Fix: </span>{item.fix}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">UK CV frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#012169]/20 bg-[#012169]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your UK CV ATS-scored — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari analyses your CV against the job description and tells you exactly which keywords are missing — using UK employer language patterns.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl px-8 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#012169" }}>
              Check my UK CV free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">Related UK career guides</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/blog/cv-template-uk", label: "UK CV Template" },
                { href: "/blog/uk-interview-tips", label: "UK Interview Tips" },
                { href: "/blog/graduate-jobs-uk", label: "Graduate Jobs UK" },
                { href: "/ai-career-coach-uk", label: "AI Career Coach UK" },
                { href: "/salary/software-engineer-salary-london", label: "SWE Salary London" },
                { href: "/blog/star-method-interview", label: "STAR Method" },
                { href: "/blog/ats-resume-tips", label: "ATS Optimisation Guide" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[12px] font-medium text-[var(--brand)] hover:bg-[var(--brand)]/5 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
