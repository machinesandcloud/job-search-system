import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Talent.com 2025 — AI Career Coach vs. Job Search Aggregator",
  description:
    "Comparing Zari (AI career coach) and Talent.com (job search aggregator). Talent.com aggregates millions of jobs. Zari prepares you to stand out and win them.",
  keywords: [
    "Zari vs Talent.com",
    "Talent.com review",
    "Talent.com alternative",
    "Talent.com vs AI career coach",
    "job search aggregator vs career coach",
    "Talent.com salary",
    "Talent.com 2025",
    "best job search tools",
    "AI career coach comparison",
  ],
  alternates: { canonical: "/compare/zari-vs-talent-com" },
  openGraph: {
    title: "Zari vs Talent.com 2025 — Job Search Aggregator vs. AI Career Coach",
    description: "Talent.com aggregates millions of jobs. Zari prepares you to win them. Different tools, different problems.",
    url: "/compare/zari-vs-talent-com",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is Talent.com?",
    answer: "Talent.com is a global job search aggregator that crawls listings from thousands of job boards and employer sites to create a searchable database of job postings. It operates in 30+ countries and claims over 30 million indexed jobs. It also provides salary data as part of the job search experience.",
  },
  {
    question: "How does Talent.com compare to Indeed or LinkedIn?",
    answer: "Talent.com is a job board aggregator — it collects listings from other sources rather than primarily hosting native postings. Indeed has a larger native posting base in North America. LinkedIn adds professional networking, recruiter outreach, and company pages. Talent.com's main advantages are global coverage (especially strong in Europe, Canada, and Australia) and relatively clean salary data display alongside listings.",
  },
  {
    question: "How is Zari different from Talent.com?",
    answer: "Talent.com is a discovery tool — it helps you find job openings. Zari is a coaching tool — it helps you win the jobs you find. They serve completely different functions. Talent.com is where you find the opportunity; Zari is how you prepare to convert it into an offer.",
  },
  {
    question: "Does Zari help with the job application process?",
    answer: "Yes — Zari helps with every part of the application that's in your control: your resume (ATS optimisation, bullet rewrites), your LinkedIn profile (headline, About, experience), your interview preparation (mock sessions with STAR scoring), and your negotiation (salary benchmarks, counter-offer scripts). It doesn't submit applications for you, but it ensures that every application you submit is competitive.",
  },
];

const DIMENSIONS = [
  {
    category: "Job discovery",
    talentcom: "Talent.com aggregates 30M+ job listings across 30+ countries. Excellent global coverage, especially strong in Canada, UK, France, and Australia. Good salary transparency alongside listings.",
    zari: "Zari doesn't list or aggregate jobs. It's a coaching product, not a job board. You use other platforms to discover jobs, then use Zari to prepare for them.",
    winner: "talentcom",
    winnerNote: "Talent.com solves discovery; Zari solves preparation. They don't compete here."
  },
  {
    category: "Resume preparation",
    talentcom: "No resume optimisation. Talent.com is purely a job discovery platform. Some salary data is useful for understanding target range, but no coaching on how to prepare your resume.",
    zari: "ATS scoring, keyword gap identification, and bullet rewrites for the specific role and JD. This is a core Zari function.",
    winner: "zari",
    winnerNote: "Talent.com has no resume coaching capability."
  },
  {
    category: "Interview coaching",
    talentcom: "No interview preparation. Talent.com doesn't offer coaching, simulations, or feedback on interview performance.",
    zari: "Full mock interview platform — behavioral, technical, panel, PM formats — with STAR scoring and language feedback. One of Zari's primary coaching surfaces.",
    winner: "zari",
    winnerNote: "Talent.com has no interview preparation capability."
  },
  {
    category: "Salary data",
    talentcom: "Talent.com displays salary ranges directly in job listings where available. Also has a salary comparison tool. Useful for getting a sense of range at the discovery stage.",
    zari: "Salary benchmarks by role, level, and city in USD, GBP, CAD, and AUD — across 21 roles and 23 cities. Active negotiation coaching with counter-offer scripts and live simulations.",
    winner: "zari",
    winnerNote: "Passive salary data vs. active negotiation coaching. Different depth of utility."
  },
  {
    category: "Global coverage",
    talentcom: "Strong global coverage — particularly Canada, UK, France, Germany, Australia. Better for non-US job searches than many US-centric boards.",
    zari: "Coaching surfaces tailored to UK, Canada, and Australia markets specifically — CV format, local ATS patterns, salary data in GBP, CAD, and AUD. International coaching depth, not just listings.",
    winner: "tie",
    winnerNote: "Both have strong international coverage — Talent.com for discovery, Zari for coaching."
  },
  {
    category: "Total job search value",
    talentcom: "Free aggregator — you get access without a subscription. The value is entirely in the listing inventory, which competes with Indeed and LinkedIn for volume and freshness.",
    zari: "Paid coaching platform ($29/month Pro, free first session per surface). Addresses the conversion problem — getting offers from applications — which is where most job seekers are actually losing.",
    winner: "zari",
    winnerNote: "Different points in the job search funnel. Use both, not one or the other."
  },
];

export default async function ZariVsTalentComPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Talent.com", url: `${BASE_URL}/compare/zari-vs-talent-com` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Talent.com</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Talent.com aggregates millions of jobs so you can find opportunities. Zari prepares you to win them. These tools solve different problems — the question is which problem is yours.
          </p>

          <div className="mt-8 flex justify-center">
            <WinScore zariWins={4} total={6} competitorName="Talent.com" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Talent.com is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Aggregating job listings across 30M+ postings globally",
                  "Finding international roles in Canada, UK, France, and Australia",
                  "Getting a quick salary range estimate alongside job listings",
                  "Job seekers who want one search to cover many boards",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Preparing your resume to pass ATS screening at the jobs you find",
                  "Interview coaching with STAR scoring for every round you face",
                  "Negotiating salary with benchmarks in USD, GBP, CAD, and AUD",
                  "Converting applications into offers — the conversion problem, not discovery",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[#4361EE]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Discovery vs. coaching — two different problems, two different tools.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" :
                    dim.winner === "talentcom" ? "bg-slate-100 text-slate-500" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "talentcom" ? "Talent.com wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Talent.com</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.talentcom}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Zari</p>
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
              Talent.com and Zari are genuinely complementary — they solve different problems at different stages of the job search funnel. Talent.com helps you find the openings. Zari helps you win them.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most job seekers don&apos;t have a discovery problem. They find plenty of jobs on LinkedIn, Indeed, and Talent.com. What they struggle with is conversion: their resume gets filtered before a human reads it, their interview answers are vague, or they accept the first salary offer because they don&apos;t know their market rate.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If finding the right roles is genuinely your bottleneck, Talent.com is a useful free aggregator. If converting applications into offers is the problem — which it is for most people — Zari is the lever.
            </p>
          </div>
        </div>
      </section>

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

      <section className="bg-[var(--dark)] py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold tracking-[-0.02em]">You found the jobs. Now win them.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari optimises your resume for ATS, prepares you for every interview round, and ensures you negotiate at full market value — globally, in USD, GBP, CAD, and AUD.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[var(--dark)]">
            Start free — no credit card
          </Link>
          <p className="mt-4 text-[12px] text-white/30">
            Also see:{" "}
            <Link href="/compare/zari-vs-indeed" className="hover:underline text-white/50">Zari vs Indeed</Link>
            {" · "}
            <Link href="/compare/zari-vs-linkedin-jobs" className="hover:underline text-white/50">Zari vs LinkedIn Jobs</Link>
          </p>
        </div>
      </section>
    </PageFrame>
  );
}
