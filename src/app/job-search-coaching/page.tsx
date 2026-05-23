import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Job Search Coaching 2025 — AI Job Search Coach for Faster Results",
  description: "Job search coaching with Zari's AI coach. Job search strategy, application tracking, outreach templates, and weekly accountability — faster results with a systematic approach.",
  keywords: ["job search coaching", "job search coach", "job search strategy", "job search help", "how to find a job faster", "job search accountability", "job search tips 2025", "job search coaching online", "job search advisor", "career coach job search"],
  alternates: { canonical: "/job-search-coaching" },
  openGraph: { title: "Job Search Coaching 2025 — AI Job Search Coach for Faster Results", description: "AI job search coaching with strategy, outreach templates, and accountability — systematic approach for faster results.", url: "/job-search-coaching" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How long does a job search take in 2025?", answer: "The average job search for a mid-career professional in 2025 takes 3–6 months from starting active search to accepted offer. However, this average conceals enormous variance: a well-targeted, systematic search with strong materials can result in an offer in 4–8 weeks; an unfocused search sending generic applications can take 9–12 months with many rejections. The biggest predictors of search duration: (1) Quality and targeting of your resume for each application, (2) How many applications per week you send to well-matched roles (target 5–15 high-quality targeted applications per week, not 50 generic ones), (3) Whether you're networking inside your target companies or just applying cold, (4) How quickly you move through interviews when you get callbacks." },
  { question: "What is the best job search strategy in 2025?", answer: "The most effective 2025 job search strategy combines three channels: (1) Targeted cold applications with ATS-optimized resumes — apply within 48 hours of a posting going live (callback rates drop significantly after that window). (2) Warm networking — identify the hiring manager or team lead for target roles and reach out before or alongside your application. LinkedIn connection + personalized note has a 40–60% acceptance rate. A warm application has 3–5x the callback rate of a cold one. (3) Recruiter outreach — connect with 2–3 recruiters at each of your top target companies. One accepted connection at the right time can compress a 3-month search to 3 weeks. The mistake most job seekers make: spending 80% of their effort on cold applications and 0% on networking." },
  { question: "How many jobs should I apply to per week?", answer: "Quality over quantity is the consistent finding in job search research. 5–15 well-targeted, tailored applications per week produces better outcomes than 50 generic applications. The reason: each tailored application requires ATS keyword optimization for that specific job description — and a 70%+ ATS match rate produces dramatically higher callback rates than a generic resume applied to 50 roles. The practical framework: identify 10–20 target companies, monitor their careers pages and LinkedIn job alerts for relevant openings, and apply with a tailored resume within 48 hours of posting. Volume is a sign of unfocused strategy — targeting is a sign of efficient search." },
  { question: "What should I do if my job search is stalling?", answer: "Diagnose before you change strategy. Three failure modes require different fixes: (1) No callbacks at all — the problem is your resume or ATS optimization. Fix: score your resume against the job descriptions you're applying to. If you're consistently scoring below 60%, that's why you're not getting callbacks. (2) Callbacks but no interviews converting to offers — the problem is your interview performance. Fix: do 3–5 mock interviews with structured feedback. (3) Getting through interviews but no offers — the problem is likely your closing ability, offer stage communication, or compensation misalignment. Each failure mode requires a different intervention — most job seekers default to 'send more applications' regardless of which problem they have." },
];

const SYSTEM = [
  { phase: "Week 1–2: Foundation", steps: ["ATS-optimize your resume for your target role type", "Update LinkedIn headline, About, and settings", "Build your target company list (20–30 companies)", "Set up job alerts on LinkedIn, Indeed, and company career pages"] },
  { phase: "Week 3+: Active Search", steps: ["Apply to 5–15 targeted roles per week (tailored resume each time)", "Apply within 48 hours of posting going live", "For each application: identify the hiring manager and send a LinkedIn connection", "Connect with 2 recruiters per week at target companies"] },
  { phase: "Interview Stage", steps: ["5 mock interview sessions before your first real loop", "Research the company and team before every interview", "Send thank-you notes within 24 hours of each round", "Track your STAR stories — update after each interview"] },
  { phase: "Offer Stage", steps: ["Never accept on the spot — ask for 3–5 business days to review", "Research comp benchmarks before negotiating", "Negotiate total comp: base, bonus, equity, start date, remote flexibility", "Get the offer in writing before giving notice"] },
];

export default async function JobSearchCoachingPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Job Search Coaching 2025 — AI Job Search Coach for Faster Results"
        description="AI job search coaching with strategy, outreach templates, and accountability — systematic approach for faster results."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/job-search-coaching`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Job Search Coaching", url: `${BASE_URL}/job-search-coaching` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Job Search Strategy · Outreach · Accountability · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Job Search<br />
            <span className="text-white/50">Coaching</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI job search coaching with a systematic strategy — targeted applications, networking outreach, interview prep, and offer negotiation. Faster results than applying blind.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · Systematic approach · Available 24/7</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">The job search system that works</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Four phases. Each phase has a different goal and different tools. Don&apos;t skip to applications before your foundation is ready.</p>
          <div className="space-y-4">
            {SYSTEM.map(({ phase, steps }) => (
              <div key={phase} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-3 font-bold text-[14px] text-[#059669]">{phase}</h3>
                <ul className="space-y-1">
                  {steps.map(s => <li key={s} className="text-[13px] leading-5 text-[var(--muted)] flex gap-2"><span className="text-[#059669] flex-shrink-0">→</span>{s}</li>)}
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Run a smarter job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Job search strategy, ATS-optimized applications, interview prep, and offer negotiation — all in one AI career coach, free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start job search coaching free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
