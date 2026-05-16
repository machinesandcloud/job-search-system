import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "ATS Resume Tips: How to Beat Applicant Tracking Systems (2025)",
  description:
    "87% of resumes are rejected by ATS before a human sees them. This guide explains exactly how ATS systems work and the specific changes to make your resume pass every filter.",
  keywords: ["ATS resume tips", "how to beat ATS", "applicant tracking system tips", "ATS optimized resume", "ATS friendly resume", "pass ATS filter", "ATS resume keywords", "ATS score resume"],
  alternates: { canonical: "/blog/ats-resume-tips" },
  openGraph: { title: "ATS Resume Tips 2025 — Beat the Filters", description: "How ATS systems work and the exact changes that make your resume pass. Specific, actionable, tested.", url: "/blog/ats-resume-tips" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function AtsResumeTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="ATS Resume Tips: How to Beat Applicant Tracking Systems (2025)" description="87% of resumes are rejected by ATS before a human sees them. Exact changes to pass every filter." url={`${BASE_URL}/blog/ats-resume-tips`} datePublished="2025-03-01" />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "ATS Resume Tips", url: `${BASE_URL}/blog/ats-resume-tips` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[var(--brand)]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Resume</span>
            <span className="text-[12px] text-white/35">8 min read · March 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">ATS Resume Tips: How to Beat<br />Applicant Tracking Systems</h1>
          <p className="text-[16px] leading-8 text-white/50">87% of resumes never reach a human reviewer. Here&apos;s exactly how ATS systems filter, and what to do about it.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15.5px] leading-8 text-[var(--muted)]">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-bold text-red-700 mb-1">The hard truth</p>
            <p className="text-[14px] text-red-600">If you&apos;re applying to jobs at mid-to-large companies and not getting responses, there&apos;s a 60%+ chance your resume is being filtered by ATS before a human sees it. Most candidates have no idea this is happening.</p>
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">How ATS systems actually work</h2>
          <p>Applicant Tracking Systems (ATS) are software used by HR departments to filter incoming applications. They&apos;re not &quot;reading&quot; your resume — they&apos;re parsing it for signals: specific keywords, formatting patterns, and structural elements that match a defined criteria.</p>
          <p>The most common ATS platforms (Workday, Greenhouse, Lever, iCIMS) all work on similar principles:</p>
          <ul className="space-y-2">
            {["Keyword matching — does your resume contain the specific words from the job description?", "Section recognition — can the parser find your Work Experience, Education, and Skills sections?", "Date formatting — are your employment dates in a recognizable format?", "File parsing — is your resume in a format the ATS can read (PDF or Word)?"].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">The 7 ATS resume tips that actually move the needle</h2>

          <div className="space-y-5">
            {[
              { num: "01", title: "Mirror the exact language from the job description", body: "ATS systems match keywords literally. If the job description says 'cross-functional collaboration' and your resume says 'working with multiple teams,' it may not match. Copy the exact phrasing from the job description wherever you can do so honestly." },
              { num: "02", title: "Use a clean, single-column format", body: "Multi-column resumes, tables, headers and footers, and text boxes often cause parsing errors. ATS systems read left-to-right, top-to-bottom. Keep it simple: clean sections, standard fonts, no tables." },
              { num: "03", title: "Include a keyword-dense skills section", body: "A dedicated 'Skills' section lets you pack in role-relevant keywords without forcing them awkwardly into your experience bullets. Include both hard skills (specific tools, technologies, methodologies) and soft skills that appear in the job description." },
              { num: "04", title: "Use standard section headers", body: "ATS parsers look for standard section names. Use 'Work Experience' (not 'My Story' or 'Career History'), 'Education' (not 'Where I Learned'), 'Skills' (not 'What I Can Do'). Non-standard headers may cause the section to not be parsed correctly." },
              { num: "05", title: "Quantify every bullet you can", body: "Metrics aren't just good for humans — ATS systems score them too. 'Managed a team' scores lower than 'Managed a team of 12 across 3 regions.' Add numbers wherever you can — percentages, dollar amounts, time saved, team size, users served." },
              { num: "06", title: "Match your file format to the system", body: "Most ATS systems parse both PDF and Word, but .docx is often more reliably parsed than PDF. If a job application says 'PDF preferred' or 'Word only,' follow that instruction exactly." },
              { num: "07", title: "Score your resume before submitting", body: "Use a purpose-built ATS scanner (Zari does this) to get a score against the specific job description before you apply. Anything below 70 is likely to be filtered. Aim for 80+." },
            ].map((item) => (
              <div key={item.num} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="text-[1.8rem] font-extrabold text-[var(--brand)]/20 flex-shrink-0">{item.num}</p>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[14px] leading-7">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Common ATS mistakes to avoid</h2>
          <ul className="space-y-3">
            {[
              "Using images, icons, or graphics — ATS systems can't read them",
              "Putting contact information in the header (some parsers miss headers entirely)",
              "Using 'creative' section names that parsers don't recognize",
              "Sending a PDF when the company specifically requests Word (or vice versa)",
              "Using the same resume for every job — ATS scores drop significantly on non-tailored resumes",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6 text-center">
            <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Score your resume against any job description</p>
            <p className="mb-5 text-[13.5px] text-[var(--muted)]">Zari&apos;s ATS scanner gives you a score and specific keyword gaps in under 5 minutes. Free to start.</p>
            <Link href="/ai-resume-writer" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5">
              Check my ATS score <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
