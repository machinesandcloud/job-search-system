import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How Long Should a Resume Be in 2025? The Definitive Answer",
  description: "How long should a resume be in 2025? One page vs two pages vs three pages — the definitive answer based on experience level, industry, and what recruiters actually read.",
  keywords: ["how long should a resume be", "resume length", "one page resume", "two page resume", "how many pages should a resume be", "resume length 2025", "resume page limit", "is a 2 page resume ok", "resume too long", "resume length rules"],
  alternates: { canonical: "/blog/how-long-should-a-resume-be" },
  openGraph: { title: "How Long Should a Resume Be in 2025? The Definitive Answer", description: "One page vs two pages vs three pages — the evidence-based answer for resume length based on your experience level and industry.", url: "/blog/how-long-should-a-resume-be" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Should a resume be one page or two pages?", answer: "It depends entirely on your experience level. Entry-level (0–3 years): one page is the correct target. Anything longer reads as padding. Mid-career (3–10 years): one to two pages. Two pages is acceptable if the second page adds substantive value — not white space and filler. Senior/executive (10+ years): two to three pages is appropriate and expected. Cramming 20 years onto one page produces an unreadable document that serves no one. The one-page rule is one of the most persistent pieces of bad career advice — it was designed for new graduates and has been incorrectly applied to all experience levels." },
  { question: "Do recruiters actually read the whole resume?", answer: "Eye-tracking research from recruiting firms shows: recruiters spend an average of 6–10 seconds on initial resume screening. In those seconds, they look at: your most recent job title and company, the overall structure and formatting quality, then the professional summary. If the first page passes that initial scan, they read more carefully. Implication: the first page must be perfect regardless of total length. Every element of the first page must earn its place. The second and third pages are read only if the first page earns attention." },
  { question: "What should I cut if my resume is too long?", answer: "Cut in this order: (1) Jobs older than 15 years — unless the role is directly relevant to what you're applying for, the detail from 15+ years ago rarely influences a hiring decision. List them briefly: company, title, dates, no bullets. (2) Generic duty-list bullets — 'Responsible for managing projects' adds no value. Either replace with achievement bullets or cut entirely. (3) Redundant skills — if you list every technology you've ever touched, the important ones get lost. Cut tools that are implicit (everyone knows Excel), obsolete, or irrelevant to the target role. (4) Objective statements — these are almost always generic filler. Replace with a strong professional summary or cut entirely." },
  { question: "Do different industries have different resume length expectations?", answer: "Yes. Academic CVs (for academic and research positions) can be 5–20+ pages — they include publications, presentations, grants, and teaching experience. This is a different document from a resume entirely. Legal resumes tend to be longer than tech resumes, often 2–3 pages for mid-career attorneys. Tech resumes tend to run 1–2 pages regardless of experience level — more senior engineers often still target 1 page as a signal of concision. Consulting resumes (McKinsey, BCG, Bain) are typically 1 page, even for experienced candidates — the one-page constraint is a test of prioritization ability that mirrors the case interview. Government/federal resumes can be 5–10 pages — USAJobs applications have different formatting requirements entirely." },
];

export default async function HowLongShouldAResumeBePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How Long Should a Resume Be in 2025? The Definitive Answer"
        description="One page vs two pages vs three pages — the evidence-based answer for resume length based on your experience level and industry."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-long-should-a-resume-be`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How Long Should a Resume Be", url: `${BASE_URL}/blog/how-long-should-a-resume-be` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Resume Length · One Page vs Two · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How Long Should<br />
            <span className="text-white/50">a Resume Be?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The definitive answer — one page vs two pages vs three pages, by experience level and industry. The one-page rule is widely misapplied.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 5 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Resume length by experience level</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">The correct resume length depends on how much substantive experience you have — not an arbitrary rule.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Experience level</span><span>Correct length</span><span>Why</span>
            </div>
            {[
              { level: "Entry-level (0–3 years)", length: "1 page", why: "Not enough substantive experience to fill 2 pages without padding" },
              { level: "Mid-career (3–10 years)", length: "1–2 pages", why: "2 pages acceptable only if page 2 has substantive content" },
              { level: "Senior (10–20 years)", length: "2 pages", why: "Enough relevant experience to justify 2 pages; cramming into 1 loses important detail" },
              { level: "Executive (20+ years)", length: "2–3 pages", why: "P&L scope, board roles, major initiatives require space to document adequately" },
              { level: "Academic / Research CV", length: "No limit", why: "Publications, grants, teaching history are each required — this is a different format" },
              { level: "Government / Federal resume", length: "5–10 pages", why: "USAJOBS format requires extensive detail that differs from commercial resume norms" },
            ].map(({ level, length, why }) => (
              <div key={level} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{level}</span>
                <span className="font-semibold text-[#059669]">{length}</span>
                <span className="text-[var(--muted)] text-[12px]">{why}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">What to cut — and what to keep</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#EF4444]">Cut these from your resume</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["Jobs older than 15 years (list title/company only, no bullets)", "Objective statements (replace with professional summary)", "Generic duty-list bullets ('responsible for...')", "Obvious skills (Word, Excel, 'communication skills')", "Hobbies and interests (unless directly relevant)", "'References available upon request' — assumed"].map(p => <li key={p} className="flex gap-2"><span className="text-[#EF4444] flex-shrink-0">✗</span>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#059669]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#059669]">Keep (and optimize) these</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["Professional summary (3–5 sentences, role-specific)", "Achievement bullets with quantified outcomes", "Relevant technical skills and certifications", "Education (more prominent for recent grads, less for veterans)", "Metrics that demonstrate scale and impact", "Keywords matching the specific job description"].map(p => <li key={p} className="flex gap-2"><span className="text-[#059669] flex-shrink-0">✓</span>{p}</li>)}
              </ul>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Optimize your resume length with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">ATS scoring, keyword gap analysis, and AI resume writing — Zari tells you exactly what to cut, add, and fix. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Optimize my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
