import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Zety — AI Career Coach vs Resume Builder (2025)",
  description:
    "Zety builds polished resumes from templates with pre-written bullet suggestions. The problem: those suggestions are pulled from a library of generic phrases used by millions of Zety users — and ATS systems are starting to recognize the pattern. Zari coaches your job search with ATS scoring against the specific role you're targeting. Full comparison.",
  keywords: ["Zari vs Zety", "Zety alternative", "Zety review 2025", "is Zety worth it", "Zety ATS", "Zety vs AI career coach", "best resume builder 2025", "Zety resume templates"],
  alternates: { canonical: "/compare/zari-vs-zety" },
  openGraph: {
    title: "Zari vs Zety — AI Career Coach vs Resume Builder (2025)",
    description: "Zety's templates are polished. But the pre-written bullets that fill them are shared by millions of users — and ATS systems are starting to recognize them. Here's the full comparison.",
    url: "/compare/zari-vs-zety",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Does Zety actually help with ATS?",
    answer: "Zety offers basic ATS tips and a general resume score, but it doesn't do job-description-specific analysis. It can't tell you which keywords are missing for the specific role at the specific company you're targeting. The bigger ATS problem with Zety is structural: its multi-column templates with visual elements (icons, progress bars, sidebars) break parsing in many corporate ATS systems. Zari's resume coaching focuses on ATS-optimized structure and JD-specific keyword alignment.",
  },
  {
    question: "Are Zety's pre-written bullet suggestions a problem?",
    answer: "They can be. Zety's bullet suggestions are pulled from a shared library of generic phrases organized by job title — phrases like 'responsible for managing team projects' and 'collaborated with cross-functional stakeholders.' These suggestions are used by millions of Zety users. Recruiters at high-volume companies start recognizing the Zety voice, and the generic language doesn't pass the 'so what?' test that separates callbacks from rejections.",
  },
  {
    question: "Is Zety worth the cost?",
    answer: "Zety is $6–$24/month depending on plan. For a one-time resume refresh where you just need a clean formatted document quickly, it delivers that. The value question is: does a formatted template help you land the job? If you already have strong, specific content, Zety can format it well. If you need coaching on what to write — or help beyond the resume — the value equation shifts. Zari starts free and covers the full job search.",
  },
  {
    question: "Can I use both Zety and Zari together?",
    answer: "Yes — some candidates use Zari to develop strong, ATS-optimized resume content, then use Zety to format it into a visually polished PDF for direct sends to contacts. The risk is that Zety's templates can break ATS parsing if the multi-column or graphic-heavy formats are used. The safest path is to use Zety's single-column templates only if you're also routing through ATS.",
  },
];

const DIMENSIONS = [
  {
    category: "Resume Templates",
    zety: "18+ professionally designed templates with genuine visual polish. Strong for printed resumes and direct sends in creative/design roles. Multi-column and graphic-heavy options look impressive as PDFs.",
    zari: "Clean, ATS-optimized resume structure without visual templates. Designed to parse correctly through any ATS system — no columns, no icons, no progress bars that break machine reading.",
    winner: "zety",
    winnerNote: "If you need a print-ready PDF for direct send, Zety's templates are genuinely polished.",
  },
  {
    category: "AI Content Suggestions",
    zety: "Pre-written bullet point library organized by job title. Useful as a starting point but shared by millions of users — generic phrases like 'responsible for managing team projects' don't differentiate you.",
    zari: "Generates and rewrites bullets from your actual experience — specificity, metrics, and impact framing based on what you actually did. Reviews your phrasing for the 'so what?' test every recruiter applies.",
    winner: "zari",
    winnerNote: "Generic shared-library bullets won't get you callbacks. Specificity wins.",
  },
  {
    category: "ATS Optimization",
    zety: "General ATS score and basic tips. No job-description-specific analysis. Multi-column and visual template elements can actively break parsing in many corporate ATS systems.",
    zari: "Real-time ATS scoring against the specific job description you're targeting. Keyword gap analysis, density review, and section-level recommendations for that exact role.",
    winner: "zari",
    winnerNote: "Generic ATS scores don't help you get past the filter at a specific company. JD-specific analysis is what moves the needle.",
  },
  {
    category: "Cover Letter",
    zety: "Template-based cover letter builder with pre-written phrases. Produces a formatted document quickly — same limitations as the resume suggestions (shared library, generic phrasing).",
    zari: "AI-generated cover letters tailored to the specific role, company context, and your actual background. Not assembled from a template library.",
    winner: "zari",
    winnerNote: "Template-assembled cover letters signal low effort. Company-specific personalization is what hiring managers notice.",
  },
  {
    category: "Interview Coaching",
    zety: "Not offered. Zety is a document creation tool and stops after the resume.",
    zari: "Full STAR framework coaching with real-time feedback on behavioral answers. Role-specific question sets for the stage and function you're interviewing for.",
    winner: "zari",
    winnerNote: "Most candidates don't lose at the resume — they lose in interviews. Zety doesn't cover it.",
  },
  {
    category: "LinkedIn Optimization",
    zety: "Not offered.",
    zari: "Full LinkedIn profile coaching — headline, About section, experience bullets, skills ordering, and recruiter search visibility strategy.",
    winner: "zari",
    winnerNote: "60%+ of hires involve LinkedIn. A polished resume with a neglected LinkedIn profile is a leaky bucket.",
  },
  {
    category: "Salary Negotiation",
    zety: "Not offered.",
    zari: "Coaches the full negotiation conversation — how to respond to the first offer, anchoring, handling pushback, and evaluating the total comp structure.",
    winner: "zari",
    winnerNote: "The average successful negotiation adds $5K–$25K to first-year comp. Skipping it is expensive.",
  },
  {
    category: "Pricing",
    zety: "$6–$24/month depending on plan. Free version is severely limited — the resume is watermarked and you can't download without paying.",
    zari: "Free to start, no credit card required. Full coaching begins immediately without a paywall.",
    winner: "zari",
    winnerNote: "You can evaluate Zari without committing financially. Zety's free tier is a funnel, not a product.",
  },
];

export default async function ZariVsZetyPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Zety", url: `${BASE_URL}/compare/zari-vs-zety` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Zety</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zety produces polished resumes quickly. Zari coaches you to land the job. The difference is scope — one tool stops at the document, the other coaches the full search.
          </p>

          {/* Quick verdict panels */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-white/40">Zety is better for</p>
              <ul className="space-y-2">
                {[
                  "Creating a visually polished PDF quickly",
                  "Creative, design, or marketing roles where PDF aesthetics matter",
                  "Direct sends to contacts — not ATS-routed applications",
                  "One-time resume refresh without ongoing coaching needs",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-emerald-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is better for</p>
              <ul className="space-y-2">
                {[
                  "ATS-heavy searches through company portals or LinkedIn",
                  "Candidates who need coaching beyond the resume document",
                  "Interview prep, LinkedIn optimization, and salary negotiation",
                  "Anyone who wants to evaluate before paying",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[var(--brand)]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The problem with template bullets */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-amber-600">The template problem</p>
            <h2 className="text-[1.3rem] font-extrabold text-[var(--ink)]">When millions of resumes use the same bullets</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zety&apos;s pre-written bullet suggestions come from a shared library used by millions of users. When you click &ldquo;Suggest bullets&rdquo; for a Marketing Manager role, you get the same phrases hundreds of thousands of other Zety users have used: &ldquo;developed and executed marketing campaigns,&rdquo; &ldquo;collaborated with cross-functional teams to drive results.&rdquo;
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Recruiters at high-volume companies see these patterns immediately. The Zety voice is recognizable — and it says nothing about <em>you</em>. The resumes that get callbacks are the ones that show specific outcomes, specific tools, and specific scale. That requires coaching on your real experience, not selecting from a pre-written menu.
            </p>
          </div>
        </div>
      </section>

      {/* Dimension-by-dimension */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">We cover every dimension that actually affects job search outcomes — not just resume building.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-slate-100 text-slate-500"}`}>
                    {dim.winner === "zari" ? "Zari wins" : "Zety wins"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Zety</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zety}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Honest verdict</p>
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Zety builds a document. Zari builds a job search strategy.</h3>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
              If you need a visually polished resume PDF in 30 minutes and you already have strong, specific content written, Zety is genuinely good at that. Its templates are well-designed and the formatting tools work.
            </p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
              But if you need to develop the content, optimize for a specific job description, prep for the interview, clean up your LinkedIn, or negotiate the offer — Zety doesn&apos;t cover any of it. That&apos;s the scope problem. Most active job seekers lose the role at one of those stages, not because their resume PDF looked wrong.
            </p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
              Zari starts free and covers the full search. If you&apos;re in an active job search right now, the cost of using a document builder instead of a full coaching platform is measured in job offers — not subscription fees.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Start for free — no card required</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume coaching, interview prep, LinkedIn optimization, and salary negotiation — one AI for the complete job search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
