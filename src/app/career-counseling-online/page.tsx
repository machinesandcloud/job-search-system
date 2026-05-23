import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Counseling Online 2025 — AI Career Counselor Available 24/7",
  description: "Online career counseling with Zari's AI career counselor. Career direction, job search strategy, career change guidance, and salary negotiation — available 24/7, no appointment needed.",
  keywords: ["career counseling online", "online career counseling", "career counselor online", "career counseling near me", "online career advisor", "virtual career counseling", "career guidance online", "career counseling 2025", "free career counseling online", "career change counseling"],
  alternates: { canonical: "/career-counseling-online" },
  openGraph: { title: "Career Counseling Online 2025 — AI Career Counselor Available 24/7", description: "AI career counseling for career direction, job search strategy, career change, and salary negotiation — 24/7, no appointment.", url: "/career-counseling-online" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What does online career counseling include?", answer: "Online career counseling typically covers: (1) Career direction — helping you identify what type of role, industry, or path aligns with your skills, experience, and goals. (2) Job search strategy — identifying the right target roles, companies, and channels for your search. (3) Career change planning — assessing transferable skills, identifying gaps, and sequencing steps for a career transition. (4) Resume and profile review — evaluating how your current materials present you. (5) Interview preparation — coaching on how to present yourself effectively. (6) Salary negotiation strategy — how to evaluate offers and negotiate compensation. Traditional career counseling is done in 1-on-1 sessions; Zari provides AI-driven counseling available 24/7 without appointment scheduling." },
  { question: "How is online career counseling different from career coaching?", answer: "The terms are often used interchangeably, but there's a useful distinction: career counseling tends to focus on direction-setting and self-assessment (what should I do?), while career coaching tends to focus on execution and performance (how do I do it better?). Career counselors may use formal assessment tools (Myers-Briggs, StrengthsFinder, Holland Code) to help clients understand their strengths and preferences. Career coaches focus more on skill development, interview prep, and job search execution. In practice, most professionals need both — Zari covers the full spectrum from career exploration and direction-setting through active job search coaching and interview preparation." },
  { question: "Is free career counseling online worth it?", answer: "It depends on the quality of the service. Genuinely free career counseling (government workforce centers, non-profit career centers, university alumni services) can be valuable but often has limited availability, long wait times, and generalist counselors who lack deep industry knowledge. AI-powered career counseling like Zari bridges the gap: it's available instantly 24/7, has deep knowledge of industry-specific job markets, and provides personalized advice based on your specific background and target roles. The limitation vs a senior human career counselor with 20 years of experience in your specific industry: nuanced judgment calls about unusual career situations are better handled by humans." },
  { question: "When should I see a career counselor vs just applying to jobs?", answer: "See a career counselor (human or AI) before mass-applying if: (1) You're getting no callbacks despite many applications — this signals a resume/positioning problem, not a volume problem. (2) You're considering a career change and aren't sure which direction to take. (3) You've been out of the workforce for a significant period and need to update your positioning. (4) You're unclear on your target role or industry. Applying to many jobs with the wrong resume or positioning is expensive in time and demoralizing — a few hours of counseling upfront often saves weeks of fruitless applications. The correct sequence: clarify direction → optimize materials → apply strategically." },
];

export default async function CareerCounselingOnlinePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Counseling Online 2025 — AI Career Counselor Available 24/7"
        description="AI career counseling for career direction, job search strategy, career change, and salary negotiation — 24/7, no appointment."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-counseling-online`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Counseling Online", url: `${BASE_URL}/career-counseling-online` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Career Counseling · Direction · Strategy · 24/7
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Counseling<br />
            <span className="text-white/50">Online</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career counseling for career direction, job search strategy, career change, and salary negotiation — available 24/7, no appointment required, free to start.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · Available 24/7 · No appointment needed</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari&apos;s career counseling covers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Career direction clarity", desc: "Structured conversation to identify your best-fit roles, industries, and career paths based on your skills, values, and experience." },
              { title: "Career change planning", desc: "Transferable skill mapping, gap analysis, and step-by-step transition plan for moving into a new industry or role type." },
              { title: "Job search strategy", desc: "Which roles to target, which companies to prioritize, which job boards to use, and how to allocate your application effort." },
              { title: "Resume and profile review", desc: "Identify what's working and what's holding you back in your current resume and LinkedIn profile." },
              { title: "Salary research and guidance", desc: "Research your market rate, understand total compensation components, and prepare a negotiation strategy." },
              { title: "Career stuck? Get unstuck", desc: "Advice on feeling underutilized, promotions that aren't coming, or unclear next steps in your current organization." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">AI career counseling vs traditional counseling</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[var(--muted)]">Traditional career counselor</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["$150–$350/hour for 1:1 sessions", "Schedule 1–2 weeks in advance", "Limited to counselor's industry knowledge", "Weekly or bi-weekly meetings", "Notes and homework between sessions"].map(p => <li key={p} className="flex gap-2"><span className="flex-shrink-0">—</span>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#059669]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#059669]">Zari AI career counseling</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["Free to start", "Available right now — 24/7", "Deep knowledge of specific industries and roles", "Unlimited sessions, no session cap", "Paired with resume, LinkedIn, and interview tools"].map(p => <li key={p} className="flex gap-2"><span className="text-[#059669] flex-shrink-0">✓</span>{p}</li>)}
              </ul>
            </div>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start career counseling with Zari now.</h2>
          <p className="mb-8 text-[15px] text-white/55">Career direction, job search strategy, and career change planning — available 24/7, no appointment, free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#D97706]">Start career counseling free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
