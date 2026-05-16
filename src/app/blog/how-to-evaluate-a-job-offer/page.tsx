import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Evaluate a Job Offer — The Complete Framework (2025)",
  description:
    "How to evaluate a job offer beyond just the salary. The complete framework for assessing compensation, role fit, company health, team quality, and long-term trajectory before you sign.",
  keywords: ["how to evaluate a job offer", "job offer evaluation", "evaluating a job offer", "how to assess a job offer", "job offer checklist", "should i take this job offer", "job offer red flags", "comparing job offers"],
  alternates: { canonical: "/blog/how-to-evaluate-a-job-offer" },
  openGraph: {
    title: "How to Evaluate a Job Offer — The Complete Framework (2025)",
    description: "The 6-dimension framework for evaluating any job offer — compensation, role fit, company health, team, culture, and career trajectory.",
    url: "/blog/how-to-evaluate-a-job-offer",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const DIMENSIONS = [
  {
    name: "Total compensation — not just base salary",
    accent: "#0D7182",
    questions: [
      "What is the base salary, and how does it compare to your current market rate?",
      "What is the bonus structure — target percentage, discretionary vs. formula-driven, historical payout rate?",
      "If there is equity: what type (RSUs, options)? What is the vesting schedule? What is the current 409A valuation or public market price? What is the liquidation preference stack if it's a private company?",
      "What are the benefits: health insurance quality, 401(k) match, PTO policy, parental leave?",
      "What is the total compensation number — base + expected bonus + equity value / 4 (annual vest) + benefits?",
    ],
    redFlag: "Offers that lead with a low base and promise large bonuses that are 'discretionary' — meaning they can be zero. Total compensation including historical bonus payout is the number that matters.",
  },
  {
    name: "The role itself",
    accent: "#7a8dff",
    questions: [
      "What does the first 90 days look like — what will you be responsible for, and how will success be defined?",
      "What does the career ladder look like from this role — what is the next level, and what does it take to reach it?",
      "Who will you be reporting to, and how long have they been in the role?",
      "What resources do you have — headcount, budget, tools?",
      "What is the scope — is this a role that grows or a role that is capped?",
    ],
    redFlag: "A role with no clear definition of success in the first 90 days is a role where you'll be set up to fail. Ambiguity that isn't your job to define is a red flag.",
  },
  {
    name: "Company health and trajectory",
    accent: "#EC4899",
    questions: [
      "For private companies: when is the last fundraise, at what valuation, and how much runway does the company have?",
      "Is the company growing revenue year-over-year, and at what rate?",
      "Is the company profitable or on a path to profitability?",
      "What is the competitive landscape — is the company a clear market leader, a challenger, or in a crowded space without differentiation?",
      "What is the churn rate among employees at your level — have multiple people been in this role recently?",
    ],
    redFlag: "A company on its fourth person in this role in three years is a signal that the role — or the manager — is structurally broken. Glassdoor isn't perfect but repeated themes across reviews are worth taking seriously.",
  },
  {
    name: "Manager and team quality",
    accent: "#F97316",
    questions: [
      "How long has your hiring manager been in the role?",
      "Did the people you interviewed with seem engaged, intellectually sharp, and like people you'd want to work with?",
      "Can you speak with someone from the team — not arranged by the company — to get an unfiltered read?",
      "What is the average tenure of people at your level in the company?",
      "Does your future manager have a track record of promoting their reports?",
    ],
    redFlag: "A manager who has been in the role for less than six months is a wildcard. You're betting on who they'll be, not who they are. It can work out, but weight that uncertainty.",
  },
  {
    name: "Culture and working conditions",
    accent: "#10B981",
    questions: [
      "What are the actual working hours — what does 'overtime' or 'crunch' look like in practice?",
      "What is the remote/hybrid/in-office policy, and is it genuine or is it expected that you'll be in-office regardless?",
      "How are decisions made — top-down or with genuine team input?",
      "What happened to the person who was in this role before you?",
      "How does the company talk about failure — punitive or learning-oriented?",
    ],
    redFlag: "Ask 'what happened to the person before me?' directly. The answer is almost always more informative than any other question. A company that hedges or deflects this question is hiding something.",
  },
  {
    name: "Career trajectory and learning",
    accent: "#4ca7e6",
    questions: [
      "Will this role make you more hireable in two to three years — will you have built skills, led initiatives, or accumulated credentials that open doors?",
      "Does the company invest in professional development, and does that investment actually materialize (budget, time, encouragement)?",
      "Are the people above you in the org in roles you aspire to — do you see your future self in their trajectories?",
      "Are there alumni of this company / team who are well-respected in the industry?",
      "Does this role expand or narrow your options for what comes next?",
    ],
    redFlag: "A role that pays well but teaches you nothing — where you're executing on autopilot rather than growing — can be the most expensive career decision you make. Salary is easy to see; optionality is hard to price but worth more long term.",
  },
];

export default async function HowToEvaluateJobOfferPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Evaluate a Job Offer — The Complete Framework (2025)"
        description="The 6-dimension framework for evaluating any job offer — compensation, role fit, company health, team, culture, and career trajectory."
        url={`${BASE_URL}/blog/how-to-evaluate-a-job-offer`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Evaluate a Job Offer", url: `${BASE_URL}/blog/how-to-evaluate-a-job-offer` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Evaluate a Job Offer — The Complete Framework (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 11 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Most people evaluate a job offer by looking at the salary and deciding if it&apos;s enough. That&apos;s necessary — but it&apos;s not sufficient. The salary is the easiest number to find and often the least predictive of whether you&apos;ll be happy in 18 months. Here&apos;s the framework that covers what actually matters.
            </p>

            <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <p className="font-bold text-[var(--ink)]">Before you evaluate: get everything in writing</p>
              <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">Don&apos;t evaluate an offer until you have a written offer letter that includes base salary, bonus structure, equity grant details, and start date. Verbal offers are not offers. Any verbal promise that doesn&apos;t appear in the letter doesn&apos;t exist.</p>
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 6-dimension framework</h2>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Work through each dimension methodically. A great score on five dimensions and a red flag on one is worth taking seriously.</p>

            <div className="mt-6 space-y-8">
              {DIMENSIONS.map((dim, i) => (
                <div key={dim.name} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: dim.accent }}>{i + 1}</div>
                    <p className="font-bold text-[var(--ink)]">{dim.name}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Questions to answer</p>
                    <ul className="space-y-2">
                      {dim.questions.map((q) => (
                        <li key={q} className="flex items-start gap-2 text-[13.5px] leading-6 text-[var(--muted)]">
                          <span className="mt-0.5 flex-shrink-0 text-[var(--brand)]">→</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 rounded-xl border border-red-100 bg-red-50/30 p-3">
                      <p className="text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-red-600">Red flag: </span>{dim.redFlag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Comparing two offers</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              When you have two offers, don&apos;t compare salary lines — compare total compensation and then weight the non-financial dimensions by how much they matter to you right now. A higher-paying role with a bad manager costs you far more than the salary differential when you factor in a miserable working environment, a damaged performance record, and the job search you&apos;ll be doing again in a year.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Two questions worth writing out when you have competing offers:
            </p>
            <div className="mt-4 space-y-3">
              {[
                "In two years, which role will have made you more hireable and more capable — regardless of title or salary?",
                "Which role will you be more relieved to have taken — not excited, relieved? Excitement fades. Relief at a good decision compounds.",
              ].map((q) => (
                <div key={q} className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] px-5 py-4">
                  <p className="text-[14px] italic text-[var(--muted)]">&ldquo;{q}&rdquo;</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">When to negotiate before you evaluate</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Always negotiate before you fully evaluate. Your evaluation of a borderline offer is different if the base is $10K higher. Getting a counteroffer is not accepting it — it&apos;s information. Negotiate first, then decide with the best terms on the table.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The exception: if the offer is already clearly strong and you&apos;re certain you want the role. Aggressive negotiation on an offer you were always going to accept is a relationship tax you&apos;ll pay for months.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get AI coaching on your offer — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Salary negotiation coaching, counter-offer scripts, and equity analysis — Zari helps you get the best possible terms before you sign.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
