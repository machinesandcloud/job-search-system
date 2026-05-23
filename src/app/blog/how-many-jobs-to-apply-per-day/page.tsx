import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How Many Jobs Should I Apply to Per Day? 2025 Data-Backed Answer",
  description: "How many jobs should you apply to per day or per week in 2025? The data-backed answer — quality vs quantity, optimal application frequency, and the numbers that actually lead to offers.",
  keywords: ["how many jobs to apply per day", "how many jobs should i apply to", "job application volume", "how many job applications per week", "how many jobs to apply to", "job search volume", "how many applications to get a job", "job search tips 2025", "quality vs quantity job search", "how many jobs to apply to per day"],
  alternates: { canonical: "/blog/how-many-jobs-to-apply-per-day" },
  openGraph: { title: "How Many Jobs Should I Apply to Per Day? 2025 Data-Backed Answer", description: "Quality vs quantity in job searching — the optimal application frequency and the numbers that actually lead to offers.", url: "/blog/how-many-jobs-to-apply-per-day" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How many jobs should I apply to per week?", answer: "5–15 well-targeted, tailored applications per week is the research-backed optimal range for most professionals. This is not intuitive — many job seekers assume more is better. The reason quality beats quantity: each tailored application requires ATS keyword optimization for that specific job description. A resume that hits 80%+ on a job's ATS keywords gets callbacks at 2–3x the rate of a generic resume. If you send 50 generic applications, you're competing for attention with hundreds of other candidates using the same undifferentiated approach. If you send 15 tailored applications, each is optimized for that specific role. The math consistently favors quality over volume." },
  { question: "What is a good callback rate from job applications?", answer: "A 5–10% callback rate (recruiter phone screen or initial contact) is considered solid for cold applications. Below 3% suggests a resume or targeting problem — your resume isn't passing ATS filters, or you're applying to roles you're significantly underqualified or overqualified for. Above 15% is excellent and suggests strong profile-role match. Key metric to track separately: your callback-to-offer conversion rate. If you're getting callbacks but not offers, the problem is interview performance, not application quality. These are different problems requiring different fixes." },
  { question: "Does it help to apply to the same company multiple times?", answer: "Applying to multiple distinct roles at the same company is fine and common. Reapplying to the same specific role you already applied to (and didn't hear back from) is generally counterproductive — most ATS systems flag duplicate applications, and hiring managers who passed on your application once rarely reconsider without new information. Exception: if significant time has passed (6+ months), the role has been reposted, or you now have a warm referral or connection inside the company, re-applying can be worthwhile. The better approach than re-applying: get a referral. An internal referral at most companies moves your application to the top of the queue regardless of when it was submitted." },
  { question: "How long should I spend on each job application?", answer: "For a targeted application: 20–30 minutes per application is the right range. This includes: running your resume through ATS scoring against the specific JD (5–10 minutes), making targeted edits to close keyword gaps (10 minutes), and writing a brief tailored cover letter or application message if appropriate (5–10 minutes). Spending more than 45 minutes on a single application typically shows diminishing returns. Spending less than 10 minutes (generic copy-paste) produces the worst ROI — many applications but very few callbacks. The highest-leverage investment: 1–2 hours upfront to create a strong ATS-optimized base resume, then 20–30 minutes per application to tailor it." },
];

export default async function HowManyJobsToApplyPerDayPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How Many Jobs Should I Apply to Per Day? 2025 Data-Backed Answer"
        description="Quality vs quantity in job searching — the optimal application frequency and the numbers that actually lead to offers."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-many-jobs-to-apply-per-day`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How Many Jobs to Apply Per Day", url: `${BASE_URL}/blog/how-many-jobs-to-apply-per-day` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Job Search Strategy · Application Volume · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How Many Jobs Should<br />
            <span className="text-white/50">I Apply to Per Day?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The data-backed answer — why quality beats quantity, what callback rate tells you about your strategy, and the numbers that actually lead to offers in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 6 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Quality vs quantity: the numbers</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Approach</span><span>Applications/week</span><span>Est. callback rate</span><span>Outcome</span>
            </div>
            {[
              { approach: "Generic mass apply", volume: "40–100", rate: "1–3%", outcome: "High effort, low results. 100 apps → 1–3 callbacks" },
              { approach: "Targeted with tailored resume", volume: "5–15", rate: "5–10%", outcome: "Best ROI. 15 apps → 1–2 callbacks" },
              { approach: "Targeted + networking", volume: "5–10", rate: "15–30%", outcome: "Highest conversion. Warm referral triples callback rate" },
              { approach: "Under-applying (<5/week)", volume: "1–4", rate: "5–10%", outcome: "Too few opportunities; search takes too long" },
            ].map(({ approach, volume, rate, outcome }) => (
              <div key={approach} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{approach}</span>
                <span className="text-[var(--muted)] text-[12px]">{volume}</span>
                <span className={`font-semibold ${rate.includes("15") || rate.includes("5–10") ? "text-[#059669]" : "text-[#EF4444]"}`}>{rate}</span>
                <span className="text-[var(--muted)] text-[12px]">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">How to diagnose your job search problem</h2>
          <div className="space-y-4 text-[14px] leading-7 text-[var(--muted)]">
            <p><strong className="text-[var(--ink)]">Getting 0 callbacks?</strong> The problem is your resume or targeting. Run your resume through ATS scoring against the job descriptions you&apos;re applying to. If you&apos;re scoring below 60% consistently, your resume isn&apos;t passing the ATS filter. Fix the resume before applying more.</p>
            <p><strong className="text-[var(--ink)]">Getting callbacks but no interviews converting to offers?</strong> The problem is interview performance. Do 3–5 mock interviews with structured STAR feedback. Identify which question types are weak and drill those specifically.</p>
            <p><strong className="text-[var(--ink)]">Getting through interviews but no offers?</strong> The problem is closing — your final round performance, compensation expectation mismatch, or reference check issues. Each of these requires a different fix.</p>
            <p><strong className="text-[var(--ink)]">Search taking too long overall?</strong> Track your metrics: applications per week, callback rate, interview conversion rate. The data will tell you which stage to fix. Most people default to &ldquo;apply more&rdquo; regardless of where the drop-off is — this only helps if the problem is volume, not quality.</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Apply smarter, not more.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari scores your resume against any job description and tells you exactly which keywords you&apos;re missing. Optimize before you apply. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Score my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
