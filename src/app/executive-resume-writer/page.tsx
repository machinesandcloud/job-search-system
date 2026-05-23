import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Executive Resume Writer 2025 — AI Resume Writing for VP, Director & C-Suite",
  description: "Executive resume writing for VP, Director, and C-suite professionals. ATS-optimized executive resumes with leadership narrative, board-ready formatting, and achievement quantification.",
  keywords: ["executive resume writer", "executive resume writing service", "c-suite resume writer", "vp resume writer", "director resume writer", "executive resume 2025", "c-level resume writing", "senior executive resume", "ceo resume writer", "executive career coach"],
  alternates: { canonical: "/executive-resume-writer" },
  openGraph: { title: "Executive Resume Writer 2025 — AI Resume Writing for VP, Director & C-Suite", description: "AI-powered executive resume writing for VP, Director, and C-suite. Leadership narrative, achievement quantification, and ATS optimization.", url: "/executive-resume-writer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What makes an executive resume different from a regular resume?", answer: "Executive resumes (VP, Director, C-suite) differ from individual contributor resumes in three fundamental ways: (1) Leadership scope — executive resumes must communicate the scale of your organizational impact (team size, budget owned, revenue influenced, P&L responsibility) not just your individual contributions. (2) Strategic narrative — executives are evaluated on business judgment and strategic thinking, not task completion. The resume must convey the 'why' behind decisions, not just the 'what' you did. (3) Human-first format — ATS still matters, but senior roles are often sourced through executive search, board referral, or headhunters. The resume will be read by humans early — formatting, narrative quality, and concision matter more than at junior levels." },
  { question: "How long should an executive resume be?", answer: "2–3 pages for most senior executives (VP through C-suite). The common advice to 'keep it to one page' applies to entry-level and early career — not executives. At the VP level and above, interviewers expect a comprehensive document. Key: length should be driven by substance, not padding. Every line should earn its place. The first page is the most critical — it must communicate your leadership scope, key achievements, and the narrative of your seniority within the first 30 seconds of scanning. Two common mistakes: (1) Cramming 20 years of experience onto one page — unreadable. (2) Three pages of job duty descriptions with no quantified outcomes — reads as a job description, not an executive's impact record." },
  { question: "What accomplishments should an executive put on a resume?", answer: "Executive resume accomplishments should be framed around: (1) P&L and revenue impact — 'Led $200M division to 3-year CAGR of 18%' or 'Increased gross margin from 42% to 58% over 3 years'. (2) Organizational scale — team size, budget, span of control. (3) Strategic initiatives — M&A (deal size, integration outcome), major product launches, market entries, digital transformations. (4) Turnaround or growth narratives — 'Inherited a business unit with declining revenue; returned it to growth within 18 months.' Avoid: generic leadership language ('effective communicator', 'results-driven'), individual contributor tasks (at VP level, describing specific code you wrote or presentations you gave is a seniority mismatch), and vague claims without numbers." },
  { question: "How much does executive resume writing cost?", answer: "Human executive resume writing services typically charge $800–$2,500+ for a complete executive package (resume, LinkedIn rewrite, cover letter). The highest-end executive resume firms charge $3,000–$5,000 for C-suite packages including career coaching sessions. Turnaround is typically 5–10 business days. Zari's AI executive resume service includes executive-calibrated ATS optimization, leadership narrative rewriting, P&L and scale achievement formatting, and LinkedIn optimization — at a fraction of the cost, with instant delivery. For executives whose time is worth $300–$500/hour, the speed difference alone justifies AI-first tooling." },
];

export default async function ExecutiveResumeWriterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Executive Resume Writer 2025 — AI Resume Writing for VP, Director & C-Suite"
        description="AI-powered executive resume writing for VP, Director, and C-suite. Leadership narrative, achievement quantification, and ATS optimization."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/executive-resume-writer`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Executive Resume Writer", url: `${BASE_URL}/executive-resume-writer` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Executive Resumes · VP · Director · C-Suite
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Executive<br />
            <span className="text-white/50">Resume Writer</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI-powered executive resume writing for VP, Director, and C-suite professionals. Leadership narrative, P&amp;L quantification, and ATS optimization — delivered instantly.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · For VP / Director / C-Suite · Instant · Free to start</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for executive resumes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Leadership scope quantification", desc: "Reframes your experience around team size, budget, P&L, and span of control — the metrics executive interviewers look for first." },
              { title: "Strategic narrative framing", desc: "Rewrites duty-list bullets into achievement narratives — 'Led $150M acquisition integration' instead of 'Responsible for integration activities'." },
              { title: "Executive ATS optimization", desc: "Scores your resume against VP/Director/C-suite job descriptions and closes keyword gaps for leadership vocabulary — strategy, transformation, growth." },
              { title: "Board-ready formatting", desc: "Clean, scannable 2-page format that performs with human readers (board members, executive search) and ATS systems alike." },
              { title: "LinkedIn executive optimization", desc: "Headline, About section, and experience rewrites calibrated to VP/C-suite recruiter searches and executive search firm queries." },
              { title: "Tailored per application", desc: "No generic executive resume. Each version is optimized for the specific role and company you're targeting." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Executive resume: weak vs strong</h2>
          <div className="space-y-4">
            {[
              { weak: "Responsible for managing the product roadmap and working with cross-functional stakeholders to deliver initiatives.", strong: "Owned the product roadmap for a $120M ARR B2B SaaS platform. Led cross-functional team of 32 to ship 6 major platform releases in 18 months, driving NPS from 32 to 61." },
              { weak: "Oversaw the finance function and implemented process improvements across the organization.", strong: "Led 14-person finance function for a 2,400-person global business. Implemented zero-based budgeting and reduced G&A by 22% ($8.4M) over 2 years while scaling revenue 34%." },
              { weak: "Managed a high-performing engineering team and delivered key technical projects on time.", strong: "Built and scaled engineering organization from 8 to 47 engineers across 3 locations. Reduced system downtime from 4.2% to 0.3% while shipping 3 new product lines contributing $18M in new ARR." },
            ].map(({ weak, strong }, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <div className="mb-2 text-[11px] font-bold uppercase text-[#EF4444]">Weak (duty-list)</div>
                    <p className="text-[13px] leading-6 text-[var(--muted)] italic">&ldquo;{weak}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 text-[11px] font-bold uppercase text-[#059669]">Strong (achievement-led)</div>
                    <p className="text-[13px] leading-6 text-[var(--ink)] font-medium">&ldquo;{strong}&rdquo;</p>
                  </div>
                </div>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Write your executive resume with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Leadership narrative, P&L quantification, and ATS optimization for VP, Director, and C-suite roles — free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1E3A5F]">Write my executive resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
