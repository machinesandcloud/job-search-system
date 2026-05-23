import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Job Search Burnout — How to Recover and Search Smarter (2025)",
  description:
    "Job search burnout is real and predictable. Learn to identify which stage you're in, the strategies that help each stage, and how to restructure your search so the effort you put in actually produces results.",
  keywords: ["job search burnout", "job search depression", "job search anxiety", "burned out from job searching", "job search motivation", "how to keep going in job search 2025"],
  alternates: { canonical: "/blog/job-search-burnout" },
  openGraph: {
    title: "Job Search Burnout — How to Recover and Search Smarter (2025)",
    description: "Identify which burnout stage you're in and restructure your search so effort actually produces results.",
    url: "/blog/job-search-burnout",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const BURNOUT_STAGES = [
  {
    stage: "Stage 1 — Depletion (weeks 1–4)",
    signs: ["Optimism fading as first rejections arrive", "Applying to progressively more roles to compensate", "Checking email constantly for responses", "Resume tweaking becoming obsessive"],
    whyItHappens: "Job searching involves high-effort activity with unpredictable, delayed feedback. This pattern — high effort, variable reinforcement — is inherently exhausting. Most people enter Stage 1 with an unrealistically optimistic timeline.",
    whatHelps: "Audit the search strategy rather than increase volume. Most job seekers in Stage 1 are applying too broadly, submitting under-optimized resumes, and not targeting the roles where they have a real competitive advantage. Fix the strategy before adding more applications.",
  },
  {
    stage: "Stage 2 — Cynicism (weeks 4–8)",
    signs: ["Disengagement from the process — applications sent mechanically without investment", "Belief that the system is rigged or effort doesn't matter", "Avoiding the search entirely for days at a time", "Comparing yourself negatively to others who found jobs quickly"],
    whyItHappens: "Cynicism is a psychological defense against continued disappointment. When the search isn't producing results and you can't understand why, the mind protects itself by deciding the process is meaningless. It's a rational response to an irrational situation.",
    whatHelps: "Get a feedback loop. Rejections without feedback are demoralizing — you don't know if the problem is your resume, your target roles, your interview performance, or timing. A resume review, a mock interview with feedback, or a frank conversation with someone who's recently been hired breaks the information vacuum.",
  },
  {
    stage: "Stage 3 — Identity erosion (weeks 8+)",
    signs: ["Internalizing rejection as personal failure rather than process failure", "Withdrawing from professional networks and social connections", "Difficulty answering 'what do you do?' without anxiety", "Loss of confidence about capabilities that felt solid before"],
    whyItHappens: "Extended job searching attacks professional identity because work is central to how most people understand themselves. Months of being told 'no' — even implicitly through silence — rewires self-assessment. This is Stage 3 burnout and it requires a different intervention than strategy fixes.",
    whatHelps: "Reconnect with work through non-hiring contexts — volunteer projects, open source contributions, consulting, writing about your expertise. The goal is to generate evidence of professional capability that exists outside the hiring process. Coaching or therapy to address the identity impact, not just the search mechanics.",
  },
];

const SEARCH_RESTRUCTURE = [
  {
    problem: "Volume over targeting — applying to 20+ roles/week indiscriminately",
    cost: "Dilutes the energy available for each application, produces generic resumes that fail ATS, and makes every rejection anonymous — you don't know which variable failed",
    fix: "Set a sustainable application rate of 5–8 carefully targeted applications per week. Each application gets a tailored resume, a targeted cover letter if required, and a pre-researched company rationale. Measure quality metrics: response rate per application, not total applications submitted.",
  },
  {
    problem: "Job boards as the only channel",
    cost: "Inbound job board applications convert at 2–3% response rates. Most people's search effort is concentrated in the single lowest-ROI channel available.",
    fix: "Allocate search effort: 50% to referrals and networking (highest conversion, typically 20–40% response rate), 30% to targeted job board applications with optimized materials, 20% to passive channels (LinkedIn profile visibility, recruiter outreach response). The shift in time allocation feels counterintuitive but dramatically changes results.",
  },
  {
    problem: "Infinite scroll rejection — no data on what's working",
    cost: "Without tracking, each rejection is emotionally absorbing and informationally useless. You can't improve what you don't measure.",
    fix: "Track every application in a simple spreadsheet: company, role, date applied, channel (job board/referral/recruiter), resume version used, outcome, and stage of rejection. After 20 applications, the data pattern shows you exactly where the process is breaking down.",
  },
  {
    problem: "Searching while emotionally depleted",
    cost: "Burnout degrades judgment, writing quality, and interview performance. An interview done while depleted costs you the offer. A cover letter written mechanically signals disengagement that readers can feel.",
    fix: "Treat search capacity as a finite resource. Schedule search activities during your highest-energy hours. Take complete breaks — days where the job search doesn't exist. Sustained quality beats maximum volume in hiring decisions.",
  },
];

const FAQS = [
  { question: "How long do most job searches take?", answer: "Industry data varies significantly by field and seniority, but for professional roles (managers, specialists, experienced individual contributors), median job search length in 2024 was approximately 5–6 months. Senior and executive roles often extend to 8–12 months. Entry-level roles vary enormously by industry. The practical implication: if you're in month 2 and burned out, you may be less than halfway through a normal search timeline — which makes search strategy optimization, not just motivation restoration, the critical lever." },
  { question: "Is it normal to feel depressed during a job search?", answer: "Yes — and the research supports it. Studies on unemployment and extended job searching consistently show elevated rates of anxiety, depression, and reduced self-esteem, even among people who are employed but searching. The psychological impact of repeated rejection, financial uncertainty, and loss of professional identity are real stressors. If symptoms are severe or persistent, speaking with a mental health professional is appropriate — job search coaching helps with the process but doesn't treat clinical depression." },
  { question: "Should I take a break from searching?", answer: "Conditional yes. A few days to reset rarely meaningfully impacts search outcomes, and often improves the quality of what comes after. A multi-week break can slow momentum in active processes and create gaps in recruiter conversations. The better intervention for most people isn't stopping — it's reducing volume and improving quality. If your search is producing high-quality applications and you're managing interview preparation well, a short break is fine. If you're submitting 30 generic applications a week, stopping and restructuring is more valuable than pausing and restarting the same approach." },
];

export default async function JobSearchBurnoutPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Job Search Burnout — How to Recover and Search Smarter (2025)"
        description="Identify which burnout stage you're in and restructure your search so effort actually produces results."
        url={`${BASE_URL}/blog/job-search-burnout`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Job Search Burnout", url: `${BASE_URL}/blog/job-search-burnout` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Job Search Strategy · Mental Health</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Job Search Burnout</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Job search burnout is predictable, not a personal failure. Understanding which stage you&apos;re in changes what you actually need to do — and whether the answer is rest, strategy, or both.
          </p>
        </div>
      </section>

      {/* Burnout Stages */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 3 stages of job search burnout</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Each stage has different causes and different solutions. Treating Stage 3 burnout with Stage 1 solutions doesn&apos;t work.</p>
          <div className="mt-8 space-y-6">
            {BURNOUT_STAGES.map((stage, i) => (
              <div key={stage.stage} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <h3 className="font-bold text-[var(--ink)]">{stage.stage}</h3>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">You might be here if</p>
                  <ul className="space-y-1">
                    {stage.signs.map((sign) => (
                      <li key={sign} className="flex items-start gap-2 text-[13px] text-[var(--muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-[var(--bg)] p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why it happens</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{stage.whyItHappens}</p>
                  </div>
                  <div className="rounded-xl bg-[var(--brand)]/[0.05] p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">What actually helps</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{stage.whatHelps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Restructure */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Restructure the search — the 4 patterns that cause burnout</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Most job search burnout isn&apos;t caused by the market — it&apos;s caused by a search structure that burns energy without producing feedback or results.</p>
          <div className="mt-8 space-y-5">
            {SEARCH_RESTRUCTURE.map((item, i) => (
              <div key={item.problem} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-[12px] font-extrabold text-red-600">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.problem}</p>
                    <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]"><span className="font-semibold">Cost: </span>{item.cost}</p>
                    <div className="mt-3 rounded-xl bg-emerald-50 p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Fix</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.fix}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">The most common cause of job search burnout: effort without feedback.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari gives you the feedback loop that's missing — resume analysis against the specific job, mock interview evaluation with scoring, and coaching on exactly what to improve. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
