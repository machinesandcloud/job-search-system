import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Resume Checker Free 2025 — AI Resume Analysis & Scoring",
  description: "Check your resume free with Zari's AI resume checker. Instant ATS score, keyword gap analysis, formatting issues, and bullet rewrite suggestions — in under 2 minutes.",
  keywords: ["resume checker", "free resume checker", "resume checker free", "AI resume checker", "resume analysis", "resume score", "ATS resume checker", "check my resume", "resume grader", "resume review free"],
  alternates: { canonical: "/resume-checker" },
  openGraph: { title: "Resume Checker Free — AI Resume Analysis & ATS Score", description: "Instant ATS score, keyword gaps, and formatting issues. Check your resume free in under 2 minutes.", url: "/resume-checker" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What does a resume checker actually check?", answer: "A good resume checker analyses three things: ATS compatibility (does the formatting parse correctly?), keyword match (does your resume contain the keywords the job description requires?), and content quality (are your bullets achievement-focused with metrics, or duty-focused?). Zari's resume checker covers all three — it doesn't just check grammar, it tells you whether your resume will score above or below the ATS threshold for your target role." },
  { question: "How accurate is Zari's resume ATS score?", answer: "Zari's ATS model is trained on the parsing behaviour of the most common enterprise ATS platforms — Workday, Greenhouse, Lever, iCIMS, and Taleo. The score reflects your keyword match density against a specific job description, formatting compliance, and section structure. It's a predictive score, not a guarantee — but users who raise their Zari score above 75% consistently report higher callback rates." },
  { question: "Is the resume checker really free?", answer: "Yes — the ATS score, keyword gap analysis, and formatting check are free. No credit card, no email wall to get to your score. Full bullet rewrites, role-specific optimisation, and side-by-side resume rebuilding are part of Zari's coaching platform (free tier included)." },
  { question: "Should I use a different resume for every job application?", answer: "Yes — or at least a tailored version. ATS systems match your resume against a specific job description. A generic resume will score 40–60% on most postings. A tailored resume that incorporates the exact keywords from the JD can score 80–90%+. Zari makes this fast: paste your JD, get a score and keyword gap list in under 2 minutes, apply the suggested changes." },
];

const CHECKS = [
  { title: "ATS Compatibility Score", desc: "How well your resume parses in the ATS systems used by 95% of companies with 50+ employees. Formatted score out of 100.", icon: "🎯", color: "#0D7182" },
  { title: "Keyword Gap Analysis", desc: "Every keyword in the job description that your resume is missing. Mapped to the exact section where they should appear.", icon: "🔍", color: "#7C3AED" },
  { title: "Formatting Issues", desc: "Columns, text boxes, non-standard headers, inconsistent dates — every formatting element that breaks ATS parsing.", icon: "⚙️", color: "#D97706" },
  { title: "Bullet Quality Score", desc: "Are your bullets achievement-focused with metrics, or just duty descriptions? Zari scores every bullet and flags the weakest.", icon: "📝", color: "#059669" },
  { title: "Section Structure Check", desc: "Missing sections, wrong section order, headers that ATS systems don't recognise — all flagged with fixes.", icon: "📋", color: "#EF4444" },
  { title: "Rewrite Suggestions", desc: "Specific rewrites for your weakest bullets — not generic tips, actual improved versions of your existing content.", icon: "✍️", color: "#0A66C2" },
];

export default async function ResumeCheckerPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Resume Checker", url: `${BASE_URL}/resume-checker` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Free Resume Checker · ATS · Keywords · Formatting
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Check your resume.<br />
            <span className="text-white/50">Free. In 2 minutes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Get an ATS score, keyword gap analysis, and formatting check for your resume — before you send it to another job and hear nothing back.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">
              Check my resume free
            </Link>
            <Link href="/free-ats-checker" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">
              ATS checker →
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">No credit card. No email required to see your score.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={87} suffix="%" label="of resumes fail ATS before a human reads them" accent="#EF4444" />
            <StatCard value={2} label="minutes to get your full ATS score and keyword gap report" accent="#0D7182" />
            <StatCard value={89} suffix="%" label="of users improve their ATS score in their first session" accent="#7C3AED" />
            <StatCard value={0} label="credit card required — free tier includes full ATS scan" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">What Zari checks — and fixes</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">Six dimensions, not just a grammar check.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKS.map(({ title, desc, icon, color }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: `${color}15` }}>{icon}</div>
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.02em]">Resume checker vs. resume coach — what&apos;s the difference?</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Feature</span><span>Basic checker</span><span className="text-[#4361EE]">Zari (checker + coach)</span>
            </div>
            {[
              { f: "ATS compatibility score", basic: "✓ Score only", zari: "✓ Score + specific issues" },
              { f: "Keyword gap analysis", basic: "✗ Not included", zari: "✓ Every missing keyword mapped to JD" },
              { f: "Bullet rewrites", basic: "✗ Not included", zari: "✓ Specific rewrites for weak bullets" },
              { f: "Tailored to job description", basic: "✗ Generic", zari: "✓ Paste your JD, get role-specific output" },
              { f: "LinkedIn optimisation", basic: "✗ Not included", zari: "✓ Headline, About, experience rewrites" },
              { f: "Interview prep", basic: "✗ Not included", zari: "✓ Mock interviews based on your resume + JD" },
            ].map(({ f, basic, zari }) => (
              <div key={f} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{f}</span>
                <span className="text-[var(--muted)]">{basic}</span>
                <span className="font-semibold text-[#4361EE]">{zari}</span>
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

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold">Stop guessing. Check your resume now.</h2>
          <p className="mb-8 text-[15px] text-white/55">ATS score. Keyword gaps. Formatting issues. Bullet rewrites. Free, in 2 minutes.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Check my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
