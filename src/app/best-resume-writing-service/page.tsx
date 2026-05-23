import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Best Resume Writing Service 2025 — AI vs Human Writers Compared",
  description: "The best resume writing services in 2025 compared — AI-powered vs human writers, turnaround time, ATS scoring, and price. Zari's AI resume service starts free.",
  keywords: ["best resume writing service", "resume writing service", "professional resume writing service", "best resume service 2025", "resume writing service reviews", "top resume writing services", "resume writer near me", "affordable resume writing service", "resume writing service cost", "online resume writing service"],
  alternates: { canonical: "/best-resume-writing-service" },
  openGraph: { title: "Best Resume Writing Service 2025 — AI vs Human Writers Compared", description: "AI-powered vs human resume writing services compared by price, turnaround, and ATS optimization quality.", url: "/best-resume-writing-service" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How much does a professional resume writing service cost?", answer: "Traditional human resume writing services range from $150–$500 for entry-level resumes, $300–$800 for mid-career professionals, and $800–$2,500+ for executive-level resumes. These prices reflect 1–3 consultations with a writer plus 1–2 rounds of revisions, typically delivered in 3–7 business days. AI-powered resume services like Zari start free and provide instant ATS scoring, keyword gap analysis, and AI-written resume content optimized for specific job descriptions — without the wait or the cost. For most professionals targeting specific job descriptions, AI-powered optimization outperforms generic human-written resumes on ATS pass rates." },
  { question: "Do resume writing services actually work?", answer: "The answer depends heavily on what 'work' means. A professional resume service can significantly improve formatting, readability, and keyword density — all of which affect ATS pass rates. Studies consistently show that well-formatted, keyword-optimized resumes get 2–3x more callbacks than poorly formatted equivalents. However, resume writing services cannot invent experience you don't have — the underlying accomplishments must be yours. The best outcomes come from combining strong underlying experience with optimized presentation. The key failure mode of expensive human services: writers who don't understand your industry produce resumes with the wrong keywords, making them less effective despite better writing." },
  { question: "Is an AI resume writer better than a human resume writer?", answer: "For ATS optimization specifically, AI wins. AI resume tools can scan a job description, extract the exact keywords the ATS is looking for, score your current resume against them, and rewrite sections to close the gap — in seconds. Human writers typically don't have access to real-time ATS data for specific job postings. For narrative quality, context, and the intangible qualities that matter to human readers (the hiring manager, not the ATS), a skilled human writer with deep industry knowledge can still add value — especially for executive and senior roles where the ATS filter is less of a barrier. Best approach: use AI for ATS optimization, and use human judgment to refine the narrative." },
  { question: "What should I look for in a resume writing service?", answer: "Key criteria: (1) ATS optimization — does the service score your resume against actual job descriptions, or just provide generic improvements? (2) Industry knowledge — does the writer or AI understand your sector's vocabulary? (3) Turnaround time — 3–7 days is standard for human services; AI is instant. (4) Revision policy — how many revisions are included? (5) Guarantees — does the service offer a callback guarantee or satisfaction guarantee? Red flags: services that ask for your credit card before showing you anything, that guarantee specific outcomes (no legitimate service can guarantee interviews), or that have templates so generic they could apply to anyone." },
];

const COMPARISON = [
  { service: "Zari (AI)", price: "Free to start", ats: "Real-time ATS scoring", turnaround: "Instant", revisions: "Unlimited", best: "All job seekers" },
  { service: "TopResume", price: "$149–$349", ats: "Basic review", turnaround: "4–7 days", revisions: "2 rounds", best: "Mid-career" },
  { service: "Resume.io", price: "$24–$66/mo", ats: "Template-based", turnaround: "Self-service", revisions: "Unlimited (DIY)", best: "Budget DIY" },
  { service: "Let's Eat, Grandma", price: "$439–$899", ats: "Manual review", turnaround: "5–7 days", revisions: "2 rounds", best: "Senior roles" },
  { service: "Resumé Pilots", price: "$395–$695", ats: "Manual review", turnaround: "3–5 days", revisions: "2 rounds", best: "Executives" },
];

export default async function BestResumeWritingServicePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Best Resume Writing Service 2025 — AI vs Human Writers Compared"
        description="AI-powered vs human resume writing services compared by price, turnaround, and ATS optimization quality."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/best-resume-writing-service`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Best Resume Writing Service", url: `${BASE_URL}/best-resume-writing-service` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Resume Services · ATS Optimization · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Best Resume<br />
            <span className="text-white/50">Writing Service 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI-powered vs human resume writing services compared — by ATS optimization quality, turnaround time, price, and what actually gets you more callbacks.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · 6 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Resume writing services compared 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Services compared by ATS capability, price, and turnaround. ATS optimization is the most important criterion for most job seekers.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-6 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="col-span-1">Service</span><span>Price</span><span>ATS Scoring</span><span>Turnaround</span><span>Revisions</span><span>Best for</span>
            </div>
            {COMPARISON.map(({ service, price, ats, turnaround, revisions, best }) => (
              <div key={service} className={`grid grid-cols-6 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2 ${service === "Zari (AI)" ? "bg-[#059669]/5" : ""}`}>
                <span className="font-bold col-span-1">{service === "Zari (AI)" ? <><span className="text-[#059669]">★ </span>{service}</> : service}</span>
                <span className="font-semibold text-[#059669]">{price}</span>
                <span className={ats.includes("Real-time") ? "font-semibold text-[#059669]" : "text-[var(--muted)] text-[12px]"}>{ats}</span>
                <span className={turnaround === "Instant" ? "font-semibold text-[#059669]" : "text-[var(--muted)] text-[12px]"}>{turnaround}</span>
                <span className="text-[var(--muted)] text-[12px]">{revisions}</span>
                <span className="text-[var(--muted)] text-[12px]">{best}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari&apos;s resume service includes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "ATS score for any job posting", desc: "Paste any job description and get your resume scored against it instantly — with the specific keywords you're missing." },
              { title: "AI resume rewrite", desc: "Zari rewrites your resume sections to close ATS keyword gaps while preserving your authentic voice and real experience." },
              { title: "Before/after ATS comparison", desc: "See exactly how your ATS score improves after optimization — by section, by keyword, and overall." },
              { title: "Tailored to each application", desc: "Unlike human services that write one generic resume, Zari optimizes your resume for each specific job posting you apply to." },
              { title: "LinkedIn profile optimization", desc: "Resume optimization plus LinkedIn headline and About section rewrite — consistent personal brand across both." },
              { title: "Unlimited revisions", desc: "No revision caps. Iterate your resume as many times as you need across as many job applications as you want." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Get your resume ATS score free.</h2>
          <p className="mb-8 text-[15px] text-white/55">Upload your resume, paste a job description, and see your ATS score in seconds. No credit card. Instant results.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Score my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
