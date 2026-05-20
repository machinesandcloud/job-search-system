import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs The Ladders 2025 — Career Coach vs. Job Board for $100K+ Roles",
  description:
    "Comparing Zari (AI career coach) and The Ladders (premium job board) for high-salary job seekers. Zari prepares you to win offers. The Ladders helps you find them. Which do you need?",
  keywords: [
    "Zari vs The Ladders",
    "TheLadders review",
    "TheLadders alternative",
    "TheLadders vs AI career coach",
    "The Ladders job board review",
    "best job search tools for executives",
    "high salary job board",
    "executive job search tools",
    "TheLadders 2025",
    "100k job board",
  ],
  alternates: { canonical: "/compare/zari-vs-ladders" },
  openGraph: {
    title: "Zari vs The Ladders 2025 — Career Coach vs. Job Board",
    description: "The Ladders finds high-salary jobs. Zari prepares you to win them. Do you need one, the other, or both?",
    url: "/compare/zari-vs-ladders",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is The Ladders?",
    answer: "The Ladders is a premium job board focused on roles paying $100K or more. It was founded in 2003 and became one of the first platforms targeting high-salary job seekers. It offers job listings, resume review services, and recruiter access for executive and senior-level professionals. Subscription is required to access most features.",
  },
  {
    question: "Is The Ladders worth it in 2025?",
    answer: "The Ladders' value proposition has been challenged by LinkedIn, which now covers the vast majority of $100K+ job postings. Most senior professionals get better reach from LinkedIn's search, InMail, and recruiter outreach than from a Ladders subscription. The platform's resume review services are also relatively expensive compared to AI alternatives. For most senior job seekers, LinkedIn + a targeted outreach strategy delivers more results than a Ladders subscription alone.",
  },
  {
    question: "How does Zari help with $100K+ job searches?",
    answer: "Zari focuses on making you competitive for high-salary roles — not finding the listings. It optimises your resume for the ATS systems used by top employers, coaches you through the senior-level interviews common at $100K+ roles (competency-based, panel, case), and provides market salary data so you negotiate at the top of the range for your experience. At senior levels, the gap between prepared and unprepared candidates in interviews is where most $150K+ opportunities are won or lost.",
  },
  {
    question: "Can Zari help with executive job searches?",
    answer: "Yes. Zari has specific coaching surfaces for executive roles: executive resume optimisation (board-level narrative, strategic impact framing), executive interview coaching (vision setting, P&L ownership, board-ready communication), LinkedIn optimisation for C-suite visibility, and salary negotiation for total compensation packages including equity and benefits.",
  },
];

const DIMENSIONS = [
  {
    category: "Job discovery",
    ladders: "The Ladders aggregates high-salary job listings in one place. Designed for $100K+ roles — filters out lower-paying jobs that clutter general job boards. Good for structured discovery.",
    zari: "Zari doesn't list jobs — it prepares you to win them. It doesn't help with discovering openings but dramatically improves your chances of getting an offer when you find one.",
    winner: "ladders",
    winnerNote: "For finding $100K+ listings, The Ladders has a clear use case."
  },
  {
    category: "Resume preparation",
    ladders: "Offers professional resume writing services starting around $200–$400. Human resume writers. The quality varies and the process is relatively slow (days turnaround).",
    zari: "AI-powered ATS scoring and bullet rewrites with immediate output. Optimises your existing resume against specific job descriptions. Faster and less expensive than human resume writing services.",
    winner: "zari",
    winnerNote: "Speed, cost, and ATS optimisation all favor Zari for resume work."
  },
  {
    category: "Interview preparation",
    ladders: "The Ladders doesn't offer meaningful interview coaching. They have career advice articles, but no interactive mock interview product.",
    zari: "Full mock interview platform with STAR scoring, voice mode, behavioral and technical formats, and feedback on specific answer weaknesses. This is a core Zari strength.",
    winner: "zari",
    winnerNote: "The Ladders has essentially no interview coaching product."
  },
  {
    category: "Salary negotiation",
    ladders: "Salary data is available as part of the premium subscription. The data quality for $100K+ roles is reasonable, though not always as granular as needed.",
    zari: "Market compensation benchmarks by role, level, and city. Counter-offer script generation. Live negotiation simulation. For high-salary negotiations where a $20K–$50K delta is on the table, this is high-value coaching.",
    winner: "zari",
    winnerNote: "Active negotiation coaching vs. passive salary data."
  },
  {
    category: "Recruiter access",
    ladders: "Ladders Premium gives recruiters access to search your profile. Some executive recruiters do use the platform to find candidates. Useful passive channel.",
    zari: "No recruiter database. Zari improves your LinkedIn profile visibility which drives passive recruiter outreach — a higher-volume channel than Ladders' database.",
    winner: "ladders",
    winnerNote: "Direct recruiter access is a Ladders advantage for passive job searching."
  },
  {
    category: "Value for money",
    ladders: "Subscription ~$40/month. Additional resume writing services $200–$400 extra. Value depends heavily on whether the listings are meaningfully different from LinkedIn's senior filter.",
    zari: "Starts at $29/month for unlimited coaching across all surfaces. For a 3-month job search including resume, interview, and negotiation prep, the ROI difference is significant.",
    winner: "zari",
    winnerNote: "At comparable price points, Zari provides more actionable coaching output."
  },
];

export default async function ZariVsLaddersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs The Ladders", url: `${BASE_URL}/compare/zari-vs-ladders` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs The Ladders</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            The Ladders helps you find $100K+ jobs. Zari prepares you to win them. They solve different problems — the question is which problem is actually holding you back.
          </p>

          <div className="mt-8 flex justify-center">
            <WinScore zariWins={4} total={6} competitorName="The Ladders" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">The Ladders is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Discovering curated $100K+ job listings in one place",
                  "Passive recruiter visibility through their database",
                  "Aggregated salary data for high-salary role benchmarking",
                  "Professionals who want a dedicated senior-only job board",
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
                  "ATS-optimised resume preparation for senior and executive roles",
                  "Interview coaching with STAR scoring for C-suite and VP interviews",
                  "Salary negotiation preparation — where most $100K+ candidates leave money",
                  "Full career coaching from application through offer",
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">They&apos;re different tools — but here&apos;s where each wins.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" :
                    dim.winner === "ladders" ? "bg-slate-100 text-slate-500" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "ladders" ? "The Ladders wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">The Ladders</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.ladders}</p>
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
              The Ladders and Zari solve different problems. The Ladders helps with the &ldquo;finding&rdquo; problem. Zari helps with the &ldquo;winning&rdquo; problem.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most senior professionals don&apos;t have a discovery problem — LinkedIn surfaces $100K+ roles effectively, and most at that level have a network. The actual problem is conversion: interview performance, negotiation outcomes, and positioning against well-prepared competition. That&apos;s where Zari addresses the real gap.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If you have a discovery problem — if you genuinely can&apos;t find the right senior roles — The Ladders might help. If you find roles but struggle to convert them to offers, Zari is the lever that changes the outcome.
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
          <h2 className="mb-4 text-[2rem] font-extrabold tracking-[-0.02em]">Win the $100K+ role you&apos;re qualified for.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari prepares your resume, coaches your interviews, and makes sure you negotiate the full market rate — not just the first number they offer.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[var(--dark)]">
            Start free — no credit card
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
