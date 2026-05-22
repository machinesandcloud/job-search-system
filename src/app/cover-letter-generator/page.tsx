import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator Free 2025 — Tailored Cover Letters in 60 Seconds",
  description: "Generate a tailored cover letter free with Zari's AI cover letter generator. Paste your resume and job description — get a role-specific, ATS-optimised cover letter in under 60 seconds.",
  keywords: ["cover letter generator", "AI cover letter generator", "cover letter generator free", "free cover letter generator", "cover letter maker", "AI cover letter writer", "cover letter builder", "cover letter template", "how to write a cover letter", "cover letter examples 2025"],
  alternates: { canonical: "/cover-letter-generator" },
  openGraph: { title: "AI Cover Letter Generator Free — Tailored in 60 Seconds", description: "Paste your resume and job description, get a tailored cover letter in 60 seconds. Free, no email required.", url: "/cover-letter-generator" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Do AI cover letter generators work?", answer: "Yes — if they're trained on the right inputs. Generic AI cover letters fail because they produce the same output for every job. Zari's cover letter generator takes three specific inputs: your resume, the exact job description, and the company name. The output is mapped to the specific keywords, responsibilities, and tone of that role — not a template with your name inserted." },
  { question: "How long should a cover letter be in 2025?", answer: "Three to four short paragraphs — never more than one page, and ideally under 350 words. Recruiters spend 7 seconds on an initial resume screen; cover letters get even less. Your cover letter needs one hook in the opening line, one achievement paragraph, one role-fit paragraph, and a short closing. Zari generates to this format by default." },
  { question: "Should I always send a cover letter?", answer: "Send one when it's optional — it signals effort. Skip it only when the application explicitly says not to include one. For competitive roles or roles where you're changing industries, a strong cover letter is often the difference between a first-round interview and silence. A weak, generic one is worse than no letter at all." },
  { question: "What should I never say in a cover letter?", answer: "\"I am writing to express my interest in\" (too generic), \"I am a hardworking team player\" (unprovable), \"I think I would be a great fit\" (assertion with no evidence), and anything about why the company is great for you rather than why you're great for them. Zari's generator is trained to avoid all of these patterns." },
];

const STEPS = [
  { n: "01", title: "Paste your resume", desc: "Copy in your current resume text. Zari extracts your experience, achievements, and skills." },
  { n: "02", title: "Paste the job description", desc: "Copy in the full job posting. Zari maps your experience to the specific requirements and keywords." },
  { n: "03", title: "Add the company name", desc: "Optional but improves output. Zari calibrates tone and specificity to the company type." },
  { n: "04", title: "Get your cover letter", desc: "60 seconds. Role-specific, ATS-ready, under 350 words. Edit or regenerate until it's right." },
];

export default async function CoverLetterGeneratorPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Cover Letter Generator", url: `${BASE_URL}/cover-letter-generator` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Cover Letter Generator · Free · No Email Required
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Cover letter.<br />
            <span className="text-white/50">Tailored. In 60 seconds.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Paste your resume and the job description. Get a role-specific, ATS-optimised cover letter that maps your actual experience to the exact requirements of the role.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">
              Generate my cover letter free
            </Link>
            <Link href="/ai-resume-writer" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">
              AI Resume Writer →
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">No credit card. Free tier includes 3 cover letters per month.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={60} label="seconds to generate a fully tailored, role-specific cover letter" accent="#059669" />
            <StatCard value={3} label="inputs: your resume, the job description, and company name — that's it" accent="#0D7182" />
            <StatCard value={350} label="words max — the format recruiters actually read in 2025" accent="#7C3AED" />
            <StatCard value={0} label="generic templates — every letter is written to the specific job description" accent="#D97706" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">How it works</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">Four steps. 60 seconds. No templates.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-3 text-[2rem] font-extrabold text-[#059669]/20">{n}</div>
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.02em]">Generic cover letter vs. Zari-generated</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Element</span><span>Generic / Template</span><span className="text-[#059669]">Zari-Generated</span>
            </div>
            {[
              { e: "Opening line", g: '"I am writing to express my interest in…"', z: "References a specific achievement matched to the role's top requirement" },
              { e: "Keywords", g: "Generic buzzwords: 'team player', 'results-driven'", z: "Exact keywords from the job description mapped to your experience" },
              { e: "Company mention", g: "Copy-pasted from company website About page", z: "Calibrated to company type, growth stage, and industry" },
              { e: "Tone", g: "Formal / stiff / identical across roles", z: "Adjusted to the role level: startup casual vs enterprise formal" },
              { e: "Length", g: "5–7 paragraphs, 600+ words", z: "3–4 paragraphs, under 350 words — what recruiters actually read" },
              { e: "ATS fit", g: "Often misses JD-specific keywords entirely", z: "Keyword-matched to JD so ATS parses the letter positively" },
            ].map(({ e, g, z }) => (
              <div key={e} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{e}</span>
                <span className="text-[var(--muted)]">{g}</span>
                <span className="font-semibold text-[#059669]">{z}</span>
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

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold">Stop sending generic cover letters.</h2>
          <p className="mb-8 text-[15px] text-white/55">Generate a tailored cover letter for this role in 60 seconds. Free — no credit card, no email wall.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Generate my cover letter free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
