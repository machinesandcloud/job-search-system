import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How Long Does It Take to Find a Job in 2025?",
  description: "How long does the average job search take in 2025? Median timelines by industry, level, and market conditions — and the factors that make searches faster or longer.",
  keywords: ["how long does it take to find a job", "how long to find a job", "job search timeline", "how long is job search 2025", "average job search length", "how long to get a job offer", "job search duration", "how long between application and offer", "job search how long", "typical job search timeline"],
  alternates: { canonical: "/blog/how-long-does-it-take-to-find-a-job" },
  openGraph: { title: "How Long Does It Take to Find a Job in 2025?", description: "Median job search timelines by role, level, and market — and the specific factors that make searches faster or longer.", url: "/blog/how-long-does-it-take-to-find-a-job" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How long does the average job search take in 2025?", answer: "The average job search for a professional in 2025 is 3–5 months from starting active search to accepted offer. This is a median — the distribution is wide. Well-prepared candidates in strong markets can find roles in 4–8 weeks. Candidates with weak materials or in difficult markets may search 9–12 months. By level: entry-level (new grads) search longer, typically 3–6 months, because the market is more competitive and the bar for 'fit' is higher relative to experience. Mid-career (3–10 years) typically find roles in 2–4 months if searching actively. Senior/executive roles (VP+) take longer — 4–9 months is typical, partly because the search is often more passive and relationship-driven." },
  { question: "What factors make a job search faster?", answer: "The most significant accelerators: (1) Strong, ATS-optimized resume — candidates with well-optimized resumes get callbacks 2–3x more than those with generic ones. This is the single highest-leverage investment. (2) Applying within 48 hours of posting — applications in the first 48 hours have dramatically higher response rates than applications submitted later. Set job alerts. (3) Warm referrals — internal referrals at most companies move applications to the top of the queue. One warm introduction to a hiring manager can compress weeks of cold applications. (4) Being well-prepared for interviews — candidates who do well in first rounds get to offers faster because they don't repeat rounds. (5) Networking before you need it — professionals with active networks receive inbound opportunities they don't have to search for." },
  { question: "Why is the job search taking so long?", answer: "The most common reasons a job search takes longer than expected: (1) Resume not passing ATS filters — if you're getting 0 callbacks despite many applications, this is almost certainly the cause. Fix: run your resume through ATS scoring against the specific job descriptions you're applying to. (2) Targeting too narrow — applying only to dream companies or ideal titles, missing roles that would be strong steps toward your goal. (3) Not applying fast enough — applying 2+ weeks after a job posts means competing against 200+ applications; the best roles fill fastest. (4) Interview performance issues — callbacks that don't convert to offers signal interview gaps. (5) Compensation misalignment — if you're reaching offer stage but deals are falling through on comp, you may be targeting roles with misaligned expectations." },
  { question: "How long does it take from application to job offer?", answer: "The application-to-offer timeline at different company types: Startups: 2–4 weeks from application to offer (faster processes, fewer rounds). Mid-size tech companies: 3–6 weeks. FAANG (Google, Meta, Amazon, Apple, Netflix): 4–8 weeks from first screen to offer, longer if rounds need to be rescheduled. Investment banks/consulting: 6–10 weeks for full interview loops including case preparation rounds. Government/federal jobs: 3–6+ months (USAJobs processes are notoriously slow). These are process timelines — they assume your application was successful at each stage. The actual time from first application to offer depends on how many companies' processes you're going through in parallel." },
];

const TIMELINES = [
  { role: "Entry-level (0–2 years)", timeline: "3–6 months", notes: "Competitive market; portfolio and internships key differentiators" },
  { role: "Mid-career tech (SWE, PM, Data)", timeline: "2–4 months", notes: "Faster if FAANG alumni; slower in tight market" },
  { role: "Mid-career non-tech", timeline: "3–5 months", notes: "Networking-dependent; fewer job boards than tech" },
  { role: "Senior / Staff (tech)", timeline: "2–3 months", notes: "Often receive inbound; shorter active search phase" },
  { role: "VP / Director", timeline: "3–6 months", notes: "More passive search; exec search firm relationship key" },
  { role: "C-Suite / Executive", timeline: "6–12 months", notes: "Mostly referral/retained search; not a volume application game" },
  { role: "Career changer", timeline: "4–8 months", notes: "Extra time to reframe experience and build new network" },
];

export default async function HowLongDoesItTakeToFindAJobPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How Long Does It Take to Find a Job in 2025?"
        description="Median job search timelines by role, level, and market — and the specific factors that make searches faster or longer."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-long-does-it-take-to-find-a-job`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How Long Does It Take to Find a Job", url: `${BASE_URL}/blog/how-long-does-it-take-to-find-a-job` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Job Search Timeline · 2025 · By Level
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How Long Does It Take<br />
            <span className="text-white/50">to Find a Job?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Job search timelines by role and level — and the specific factors that make searches faster or slower in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · 7 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Typical job search timelines by level</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">These are medians for active, well-prepared searches. Passive or unoptimized searches take significantly longer.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role / Level</span><span>Typical timeline</span><span>Key factors</span>
            </div>
            {TIMELINES.map(({ role, timeline, notes }) => (
              <div key={role} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="font-semibold text-[#7C3AED]">{timeline}</span>
                <span className="text-[var(--muted)] text-[12px]">{notes}</span>
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
          <h2 className="mb-4 text-[2rem] font-extrabold">Shorten your job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">ATS-optimized resume, mock interview practice, and job search strategy — the combination that gets you hired faster. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
