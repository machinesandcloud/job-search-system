import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Data Analyst Interview Questions 2025 — SQL, Stats & Behavioral Answers",
  description:
    "The 40 most common data analyst interview questions with example answers. Covers SQL, statistics, probability, A/B testing, business case, and behavioral questions for junior and senior roles.",
  keywords: [
    "data analyst interview questions",
    "data analyst interview questions and answers",
    "SQL interview questions data analyst",
    "data analyst behavioral interview questions",
    "data analytics interview prep",
    "how to prepare for data analyst interview",
    "data analyst interview 2025",
    "data analysis interview questions",
    "business analytics interview questions",
    "data analyst technical interview",
  ],
  alternates: { canonical: "/blog/data-analyst-interview-questions" },
  openGraph: {
    title: "Data Analyst Interview Questions 2025 — 40 Questions with Answers",
    description: "SQL, statistics, A/B testing, business case, and behavioral questions for data analyst interviews with real answer examples.",
    url: "/blog/data-analyst-interview-questions",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What SQL questions should I expect in a data analyst interview?",
    answer: "Core SQL topics: JOINs (inner, left, right, full outer), GROUP BY with HAVING, window functions (ROW_NUMBER, RANK, LEAD/LAG, SUM OVER), subqueries and CTEs, and performance considerations. In behavioural coding screens, the most common formats are: 'write a query to find X from this table', cohort analysis, funnel queries, and self-join problems. Know how to write rolling averages and running totals with window functions.",
  },
  {
    question: "Do I need to know Python or just SQL for a data analyst role?",
    answer: "For entry to mid-level data analyst roles, strong SQL is the primary requirement. Python (pandas, matplotlib, seaborn) is increasingly expected for senior and lead roles, especially for data cleaning, automation, and visualisation beyond BI tools. Statistics (A/B testing, hypothesis testing, regression) is tested more heavily at companies with mature data cultures (tech, fintech, healthcare).",
  },
  {
    question: "How do I answer 'Tell me about a time you used data to change a decision'?",
    answer: "Use a specific STAR story: the decision that was about to be made or was already made (Situation), what you were asked or chose to investigate (Task), the specific analysis you ran — what data, what method, what you found (Action), and what decision changed and what happened as a result (Result). Quantify the impact if possible: 'This led to a 14% reduction in churn over the following quarter'. Avoid vague stories about 'dashboards I built'.",
  },
  {
    question: "What's the hardest type of data analyst interview question?",
    answer: "Business case / product sense questions are where most candidates struggle: 'DAU dropped 15% last Tuesday — walk me through how you'd investigate.' This tests structured thinking, knowledge of analytical frameworks, and communication. The answer should be structured as a funnel: data pipeline issues? → product bug? → external event? → metric definition change? → user behavior change? Demonstrate systematic elimination, not just listing possibilities.",
  },
];

const CATEGORIES = [
  {
    category: "SQL & Technical",
    color: "#0D7182",
    icon: "🗄️",
    questions: [
      { q: "Write a query to find the second highest salary in a table.", hint: "Use DENSE_RANK() window function or a subquery with LIMIT/OFFSET." },
      { q: "What's the difference between HAVING and WHERE?", hint: "WHERE filters rows before aggregation; HAVING filters after. Use HAVING to filter on aggregated values (SUM, COUNT)." },
      { q: "How would you write a rolling 7-day average for daily revenue?", hint: "Use AVG() OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)." },
      { q: "What's a CTE and when would you use it over a subquery?", hint: "CTEs improve readability and allow re-use of the same result set multiple times. Subqueries are fine for single-use, inline logic." },
      { q: "How would you find duplicate records in a table?", hint: "GROUP BY all relevant columns + HAVING COUNT(*) > 1, or use ROW_NUMBER() OVER (PARTITION BY ... ORDER BY id) and filter WHERE rn > 1." },
    ],
  },
  {
    category: "Statistics & A/B Testing",
    color: "#7C3AED",
    icon: "📊",
    questions: [
      { q: "What is a p-value and what does it tell you?", hint: "Probability of seeing results as extreme as yours if the null hypothesis were true. NOT the probability the null is true. Threshold is arbitrary (0.05 is convention, not magic)." },
      { q: "How would you design an A/B test for a new checkout button colour?", hint: "Define success metric (conversion rate). Calculate sample size for given MDE and power. Randomise at user level. Set end date before looking at results. Consider novelty effect." },
      { q: "What's the difference between Type I and Type II errors?", hint: "Type I = false positive (rejecting null when it's true). Type II = false negative (failing to reject null when it's false). False positive rate = significance level (α). False negative rate = 1 - power (β)." },
      { q: "How do you detect if an A/B test has sample ratio mismatch?", hint: "Run a chi-squared test on the assignment proportions. SRM means the randomisation was biased — trust any result from an SRM test with caution." },
    ],
  },
  {
    category: "Product / Business Case",
    color: "#DC2626",
    icon: "📉",
    questions: [
      { q: "DAU dropped 15% last Tuesday. Walk me through how you'd investigate.", hint: "Structure your investigation: (1) Is the data correct? Check pipeline/logging. (2) Is it global or segment-specific? (3) Is it correlated with a deploy or external event? (4) Which funnel steps show the drop? Work systematically, not randomly." },
      { q: "How would you measure the success of a new feature?", hint: "Define a primary metric tied to the feature's goal. Define guardrail metrics (things that shouldn't get worse). Use A/B test or time-series comparison. Consider leading vs lagging indicators." },
      { q: "How would you prioritise 10 dashboards with limited engineering time?", hint: "Framework: (1) Who uses it and how often? (2) What decision does it drive? (3) What's the cost of getting it wrong? Prioritise high-impact, high-frequency, decision-driving dashboards." },
    ],
  },
  {
    category: "Behavioral",
    color: "#059669",
    icon: "💬",
    questions: [
      { q: "Tell me about a time you found an insight that surprised stakeholders.", hint: "Specific STAR story. What was the analysis, what did you expect vs find, how did you communicate it, what changed? Quantify the outcome." },
      { q: "How do you communicate uncertainty in your analysis?", hint: "Say: confidence intervals, scenario ranges, data quality caveats, sample size limitations. Show that you can be accurate about uncertainty — that's more valuable than false confidence." },
      { q: "Tell me about a time you pushed back on a metric or methodology.", hint: "Good data analysts challenge the question, not just answer it. A story where you identified that the wrong metric was being used or that sampling bias would invalidate the conclusion is very strong." },
    ],
  },
];

export default async function DataAnalystInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Data Analyst Interview Questions 2025"
        description="40 data analyst interview questions with answers covering SQL, statistics, A/B testing, and behavioral."
        url={`${BASE_URL}/blog/data-analyst-interview-questions`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "Data Analyst Interview Questions", url: `${BASE_URL}/blog/data-analyst-interview-questions` },
        ]}
      />

      <section
        className="relative overflow-hidden pb-16 pt-14 text-white"
        style={{ background: "linear-gradient(135deg, #0D7182 0%, #065666 40%, #1a1a2e 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Data Analytics</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Data Analyst Interview Questions 2025
          </h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/40">SQL · Statistics · A/B Testing · Business Case · Behavioral</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">
            The 40 most commonly asked data analyst interview questions with answer frameworks. Covers every round from take-home SQL to final behavioral loop.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={40} label="questions with frameworks and answer hints" accent="#0D7182" />
            <StatCard value={4} label="interview stages covered: SQL, stats, business, behavioral" accent="#7C3AED" />
            <StatCard value={85} suffix="%" label="of data analyst interviews include a SQL coding screen" accent="#059669" />
            <StatCard value={3} label="main areas that separate avg from standout candidates" accent="#DC2626" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          {CATEGORIES.map(({ category, color, icon, questions }) => (
            <div key={category} className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em]">{category} questions</h2>
              </div>
              <div className="space-y-4">
                {questions.map(({ q, hint }, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                    <div className="flex items-start gap-3 p-4 border-b border-[var(--border)]">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: color }}>{i + 1}</span>
                      <p className="font-semibold text-[14px]">{q}</p>
                    </div>
                    <div className="px-4 py-3 flex items-start gap-2">
                      <span className="text-[11px] font-bold uppercase text-[var(--muted)] mt-0.5 flex-shrink-0">Hint</span>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">What separates good from great data analysts in interviews</h2>
          <div className="space-y-3 mb-10">
            {[
              { title: "Structured thinking over pattern matching", body: "Great analysts structure their investigation before diving in. When asked to diagnose a metric drop, they frame a hypothesis tree, not a list. They say 'my first hypothesis is X because Y, let me check Z' — not 'I'd look at everything'." },
              { title: "Communicate uncertainty explicitly", body: "Average candidates state conclusions. Great ones state conclusions with confidence intervals and caveats: 'The data suggests X, but this is based on 3 weeks of data which may not account for seasonal patterns. I'd want to validate with a longer window before acting on this.'" },
              { title: "Challenge the question", body: "The best data analyst interview answer sometimes starts with 'That's an interesting metric choice — is that actually what we want to optimise?' Showing you can think about whether you're solving the right problem is more impressive than perfectly solving the stated problem." },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px]">{title}</div>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #0D7182 0%, #065666 100%)" }} className="py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Practice, not just reading.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari runs data analyst mock interviews with STAR scoring, SQL reasoning questions, and business case walkthroughs — all with specific feedback on your answers.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Start mock interview free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
