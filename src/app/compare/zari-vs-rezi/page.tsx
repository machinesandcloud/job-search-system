import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Rezi — ATS Resume Builder vs AI Career Coach (2025)",
  description:
    "Rezi was built specifically for ATS optimization — one of the first tools to take keyword scoring seriously. Zari does ATS scoring and rewrites, then coaches interviews, LinkedIn, and salary negotiation. Honest comparison.",
  keywords: ["Zari vs Rezi", "Rezi alternative", "Rezi review 2025", "Rezi resume builder", "best ATS resume tool 2025", "rezi worth it", "rezi vs ai career coach"],
  alternates: { canonical: "/compare/zari-vs-rezi" },
  openGraph: {
    title: "Zari vs Rezi — ATS Tool vs Full AI Career Coach (2025)",
    description: "Rezi is serious about ATS optimization — more so than most resume builders. Zari does the same optimization and then coaches the full job search. Here's the difference.",
    url: "/compare/zari-vs-rezi",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is Rezi and what makes it different from other resume builders?",
    answer: "Rezi was built from the ground up for ATS optimization — unlike most resume builders that added ATS features as an afterthought. Core features: an AI Score that analyzes keyword density and formatting against a job description, ATS-safe templates with no columns or graphics, an AI Resume Writer that generates bullets from job title/duties, and a Tailor feature that rewrites your resume for a specific JD. Premium runs ~$29/month; a lifetime plan is available at ~$249.",
  },
  {
    question: "How does Rezi compare to Zari on ATS optimization?",
    answer: "Both tools do ATS keyword analysis and scoring. The key difference is what the AI produces. Rezi's AI Writer generates bullets based on job title and industry descriptions — it writes what a person in that role should have done. Zari's coaching approach produces bullets based on what you actually did — it asks follow-up questions about your specific work and produces targeted rewrites. For roles where your experience closely matches the generic description, Rezi works fine. For differentiated or non-standard backgrounds, Zari produces more accurate and compelling content.",
  },
  {
    question: "Is Rezi's ATS scoring accurate?",
    answer: "Rezi's ATS scoring is credible — it analyzes keyword match, density, and formatting in ways that reflect how real ATS systems parse resumes. No scoring tool is perfectly predictive (every company uses different software with different configurations), but Rezi's methodology is more rigorous than most. Zari's ATS analysis focuses on the same keyword gap identification, with the addition of producing the specific bullet rewrites to close those gaps.",
  },
  {
    question: "Does Rezi help with interviews?",
    answer: "Rezi has some interview preparation content but it's secondary — the product is built around resume creation and ATS optimization. There's no AI mock interview coach or STAR answer evaluation. Zari's interview coaching is a primary surface, not a supplementary one.",
  },
  {
    question: "Who should use Rezi vs Zari?",
    answer: "Rezi is the right choice if you want a dedicated ATS resume builder — one that takes keyword scoring seriously and produces ATS-safe formatting by default. Zari is better for the full job search: same ATS rigor plus actual bullet rewrites (not generated from title), plus LinkedIn optimization, interview coaching, and salary negotiation all in one platform.",
  },
];

const DIMENSIONS = [
  {
    category: "ATS Resume Scoring",
    rezi: "Rezi's core feature and genuine strength. The AI Score analyzes keyword density, formatting compatibility, and match rate against a specific job description. Rezi also checks for formatting issues that break parsers — columns, tables, headers — making it one of the more technically rigorous ATS checkers.",
    zari: "Performs the same ATS keyword analysis and match scoring against a specific JD. Identifies keyword gaps by category and severity. The output is the same diagnostic — the difference is what follows it.",
    winner: "tie",
    winnerNote: "Both do serious ATS scoring. Neither is meaningfully better on the diagnostic alone.",
  },
  {
    category: "Resume Content Generation",
    rezi: "Rezi's AI Writer generates bullet points from your job title and a brief description of duties. It produces plausible, ATS-friendly bullets based on what someone in that role typically does. Good for getting a first draft; less good for candidates with non-standard backgrounds or differentiated experience.",
    zari: "Coaching approach, not generation approach. Zari asks about your specific experience — the scope, the metrics, the before-and-after — and produces rewrites that reflect what you actually did. Better for differentiating your resume from other candidates who fed the same title into the same AI.",
    winner: "zari",
    winnerNote: "Generated-from-title vs. coached-from-experience produce different resumes. The coached version is harder for ATS-experienced reviewers to flag as AI-padded.",
  },
  {
    category: "Resume Tailoring",
    rezi: "Rezi's Tailor feature rewrites your existing resume against a specific job description — adjusting keyword emphasis and bullet framing based on the target role. One of the more sophisticated features in this product category.",
    zari: "Similar JD-specific optimization, but conversational — Zari walks through each section with you, asks what experience is most relevant, and produces targeted rewrites with context awareness across the session.",
    winner: "tie",
    winnerNote: "Both do JD-specific tailoring. Rezi's Tailor is automated; Zari's is conversational and iterative.",
  },
  {
    category: "ATS-Safe Formatting",
    rezi: "All Rezi templates are built to pass ATS parsing — no columns, no text boxes, no icons or graphics that break machine reading. This is a specific design decision that prioritizes machine readability over visual appeal.",
    zari: "Zari's resume coaching assumes and produces clean, ATS-safe formatting. It doesn't offer visual templates but the output content is always structured for machine readability.",
    winner: "tie",
    winnerNote: "Both prioritize ATS compatibility over visual design.",
  },
  {
    category: "LinkedIn Optimization",
    rezi: "Not a core feature. Rezi is focused entirely on the resume document.",
    zari: "Full LinkedIn optimization: headline, About section, and experience bullets rewritten for recruiter search keywords. Most recruiters source candidates via LinkedIn before they ever see a resume.",
    winner: "zari",
    winnerNote: "LinkedIn optimization is outside Rezi's scope.",
  },
  {
    category: "Interview Coaching",
    rezi: "Some interview preparation content, but not a primary feature. No AI mock interview or STAR evaluation.",
    zari: "Full AI interview coach with real-time feedback on behavioral and role-specific questions. STAR structure evaluation, clarity scoring, and practice across the question types you're most likely to encounter.",
    winner: "zari",
    winnerNote: "Getting an interview because of a strong ATS score means nothing if you aren't prepped for it.",
  },
  {
    category: "Salary Negotiation",
    rezi: "Not offered.",
    zari: "Dedicated negotiation coaching — anchoring strategy, counter-offer scripts, and practice handling standard pushbacks like 'we're at the top of the band' or 'the offer is firm.'",
    winner: "zari",
    winnerNote: "Offer negotiation is where 5–15% more compensation gets left on the table.",
  },
  {
    category: "Pricing Model",
    rezi: "Monthly (~$29) or lifetime (~$249). The lifetime option is unusual in this space and attractive for candidates doing a longer search or likely to job search multiple times.",
    zari: "Free first session on every surface. Paid plans are competitive with Rezi's monthly pricing and cover the full coaching stack — resume through offer.",
    winner: "tie",
    winnerNote: "Rezi's lifetime plan is genuinely attractive for frequent job searchers.",
  },
];

export default async function ZariVsReziPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Rezi", url: `${BASE_URL}/compare/zari-vs-rezi` },
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Rezi</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Rezi is one of the few resume tools that was actually built for ATS first — not a design tool that added ATS features as an afterthought. Zari does the same ATS scoring, plus rewrites the bullets, then coaches you through the rest of the job search. Here&apos;s the full comparison.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Rezi is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Rigorous ATS scoring with technically sound methodology",
                  "Candidates who want ATS-safe formatting guaranteed",
                  "People doing multiple job searches (the lifetime plan is genuinely good value)",
                  "Fast resume generation when your background fits a standard role description",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "ATS scoring plus actual bullet rewrites (not generated from title)",
                  "Non-standard backgrounds where generated content won't fit",
                  "LinkedIn optimization, interview coaching, and salary negotiation",
                  "Full-stack job search coaching in one platform",
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

      {/* The generate vs. coach distinction */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Two different kinds of AI writing</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            Both Rezi and Zari use AI to help produce resume bullets. But they work in fundamentally different directions:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-white p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-500 mb-3">Rezi&apos;s AI Writer (generation)</p>
              <p className="text-[14px] leading-6 text-[var(--muted)]">
                Input: job title + brief description.<br />
                Output: plausible bullets for someone in that role.<br /><br />
                Limitation: produces what a typical person in that role would have done — not what you specifically did. Works best when your background is conventional.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[var(--brand)] mb-3">Zari&apos;s Coaching (elicitation)</p>
              <p className="text-[14px] leading-6 text-[var(--muted)]">
                Input: conversation about your actual work.<br />
                Output: bullets from what you specifically did.<br /><br />
                More accurate for differentiating backgrounds. Harder to get flagged as AI-padded by experienced reviewers.
              </p>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-7 text-[var(--muted)]">
            Neither approach is wrong — they&apos;re suited for different situations. If your background is largely conventional for the role you&apos;re targeting, generated content works fine. If you have a non-standard career path, unusual scope, or a story worth telling, coaching produces a more accurate and distinctive resume.
          </p>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Honest assessment across every dimension — including where Rezi is genuinely competitive.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Rezi</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.rezi}</p>
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

          <div className="mt-16 rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Rezi is one of the more technically credible resume tools in the ATS space — it was built around keyword scoring rather than visual design, which makes it meaningfully more useful for corporate job applications. The Tailor feature and the lifetime pricing model are genuinely differentiating.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The limitation is the generation approach to content. Rezi writes what a person in your role typically does. That&apos;s a good starting point but produces content that reads like every other resume in the same category. Zari&apos;s coaching approach produces content specific to your experience, which is harder to replicate and more likely to stand out to human reviewers.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              And then there&apos;s the scope question. Rezi stops at the resume. Zari covers the arc from application to offer: LinkedIn optimization for inbound recruiter interest, interview coaching for the screens you land, and negotiation prep for the offers that follow. For a complete job search, the breadth difference matters.
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
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">ATS scoring + rewrites + full coaching.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">Free first session on every coaching surface. No card required.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
