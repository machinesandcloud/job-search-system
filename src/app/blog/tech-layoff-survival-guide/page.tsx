import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Tech Layoff Survival Guide 2025 — What to Do When You're Laid Off",
  description: "What to do in the first 24 hours, 2 weeks, and 3 months after a tech layoff. Severance negotiation, COBRA, job search strategy, and how to land your next role faster.",
  keywords: ["tech layoff survival guide", "laid off what to do", "tech layoffs 2025", "what to do when laid off", "layoff survival", "tech layoff job search", "severance negotiation", "layoff checklist", "laid off from tech", "how to handle a layoff"],
  alternates: { canonical: "/blog/tech-layoff-survival-guide" },
  openGraph: { title: "Tech Layoff Survival Guide 2025 — What to Do When You're Laid Off", description: "First 24 hours, 2 weeks, and 3 months after a tech layoff — severance negotiation, job search strategy, and what actually gets you hired again fastest.", url: "/blog/tech-layoff-survival-guide" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Can I negotiate my severance package?", answer: "Yes — and you should, even if HR presents the package as standard. Severance packages are rarely non-negotiable, especially for mid-to-senior employees. What is negotiable: (1) Severance amount — ask for more weeks of pay, especially if you're senior or have long tenure. (2) Equity vesting acceleration — ask for any unvested equity to vest, especially if you're close to a cliff or a new grant. (3) COBRA subsidy — ask the company to pay for 1–3 months of health insurance. (4) Outplacement services — some companies offer career coaching or resume writing as part of the package. (5) Non-compete terms — push back on overly broad non-compete clauses before signing. Key: don't sign anything on the day you're notified. Take the full review period (typically 21 days for those 40+) and consult an employment attorney if the package is significant." },
  { question: "How long does it take to find a tech job after a layoff in 2025?", answer: "The median job search for laid-off tech professionals in 2025 is 2–4 months for most levels, with significant variance by role and level. Senior engineers and staff-level engineers at well-known companies are typically finding roles in 6–12 weeks. Junior engineers face a harder market — 4–6 months is more typical. Product managers are having longer searches, 3–6 months. The biggest accelerators: being at a well-known company (FAANG, Stripe, Airbnb) — the brand accelerates screening; having a strong network in your target sector; and applying within 48 hours of a posting going live. The biggest delays: weak resume that doesn't pass ATS, applying only through LinkedIn Easy Apply without networking, and targeting only the biggest-name companies." },
  { question: "Should I tell interviewers I was laid off?", answer: "Yes — and be direct about it. Layoffs are extremely common in tech (hundreds of thousands of roles since 2022) and carry zero stigma. Trying to obscure a layoff or being evasive about why you left your previous role reads worse than the layoff itself. A simple, clean explanation: 'I was part of the company's restructuring in [month] — [X] people in my team/department were affected. I used the time to be selective about my next role and prioritize [what you're looking for].' What you should avoid: badmouthing the company, showing bitterness, or implying the layoff was performance-related when it wasn't. Keep it brief and pivot to the positive — what you're looking for next." },
  { question: "What's the first thing I should do after being laid off?", answer: "In the first 24 hours: (1) Do not sign any documents on the day you're notified. You typically have 21+ days to review. (2) Save copies of your work samples, performance reviews, and any documents you're allowed to keep (check your employment agreement — don't take proprietary materials). (3) Get clear on your last day and the exact severance terms. (4) File for unemployment the next business day — there's a waiting period in most states before benefits begin, so file immediately. (5) Review your health insurance situation — understand when your coverage ends and COBRA options. In the first week: update your resume, turn on Open to Work for recruiter-only on LinkedIn, and reach out to 10–15 people in your network to let them know you're looking." },
];

const TIMELINE = [
  {
    phase: "Day 1 — Don't panic, don't sign",
    items: [
      "Do not sign the severance agreement on day 1 — you have 21 days (if 40+)",
      "Request a clear timeline: last day, severance terms, benefits end date",
      "Save personal files you're authorized to keep (not proprietary code/data)",
      "File for unemployment benefits — waiting periods mean file immediately",
    ],
  },
  {
    phase: "Days 2–7 — Stabilize",
    items: [
      "Review (and potentially negotiate) your severance package",
      "Enroll in COBRA or find alternative health insurance",
      "Turn on LinkedIn Open to Work (recruiter-only setting)",
      "Update your resume and ATS-score it against your target role",
      "Reach out to 10–15 network contacts — let them know you're looking",
    ],
  },
  {
    phase: "Weeks 2–4 — Active search begins",
    items: [
      "Apply 5–15 targeted, tailored applications per week",
      "Connect with 2–3 recruiters at each target company",
      "Identify hiring managers for target roles and reach out directly",
      "Do 3–5 mock interview sessions before your first real interview",
      "Set job alerts — apply within 48 hours of a posting going live",
    ],
  },
  {
    phase: "Month 2–3 — Sustain and evaluate",
    items: [
      "Track your application-to-callback rate — below 5% signals a resume problem",
      "Track your callback-to-offer rate — below 20% signals an interview problem",
      "Expand your target list if search is stalling",
      "Consider contract roles to maintain income and keep skills current",
      "Negotiate hard when offers come — the first offer is rarely the best",
    ],
  },
];

export default async function TechLayoffSurvivalGuidePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Tech Layoff Survival Guide 2025 — What to Do When You're Laid Off"
        description="First 24 hours, 2 weeks, and 3 months after a tech layoff — severance negotiation, job search strategy, and what actually gets you hired again fastest."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/tech-layoff-survival-guide`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Tech Layoff Survival Guide", url: `${BASE_URL}/blog/tech-layoff-survival-guide` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Tech Layoffs · Job Search · Recovery · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Tech Layoff<br />
            <span className="text-white/50">Survival Guide 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            What to do in the first 24 hours, first two weeks, and first three months after a tech layoff — severance negotiation, COBRA, and the job search strategy that gets you hired fastest.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Layoff recovery timeline</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">What to do, in order. The first week is administrative — the search begins in week 2.</p>
          <div className="space-y-4">
            {TIMELINE.map(({ phase, items }) => (
              <div key={phase} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-3 font-bold text-[14px] text-[#7C3AED]">{phase}</h3>
                <ul className="space-y-1">
                  {items.map(item => <li key={item} className="text-[13px] text-[var(--muted)] flex gap-2"><span className="flex-shrink-0">→</span>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Resume ATS scoring, interview prep, and job search strategy — free to start, no scheduling, 24/7 available when you need it most.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
