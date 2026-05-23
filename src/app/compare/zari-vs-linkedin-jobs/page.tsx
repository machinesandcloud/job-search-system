import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs LinkedIn Jobs — Best for Job Seekers in 2025?",
  description:
    "LinkedIn Jobs is the world's largest professional job network. Zari is an AI career coach that helps you win the roles you find there — ATS resume optimization, interview prep, and salary negotiation. Full comparison.",
  keywords: ["zari vs linkedin jobs", "linkedin jobs vs ai career coach", "linkedin job search", "best way to use linkedin for jobs", "linkedin jobs alternatives", "linkedin jobs review 2025"],
  alternates: { canonical: "/compare/zari-vs-linkedin-jobs" },
  openGraph: {
    title: "Zari vs LinkedIn Jobs (2025) — Full Comparison",
    description: "LinkedIn finds roles. Zari coaches you to win them. Where each tool wins for job seekers in 2025.",
    url: "/compare/zari-vs-linkedin-jobs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job discovery and search",
    linkedinJobs: { capable: true, detail: "LinkedIn Jobs is the world's largest professional job board — over 1 billion members, millions of active listings, and AI-powered job recommendations based on your profile and activity. Easy Apply lets you apply directly within LinkedIn. Job alerts and recruiter InMail make it the dominant job discovery platform for professional roles globally." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. Find your target roles on LinkedIn Jobs, then bring the specific JD to Zari to optimize your resume against it and prepare for the interview. These tools are sequential, not competing." },
    winner: "linkedin",
  },
  {
    task: "Profile visibility to recruiters",
    linkedinJobs: { capable: true, detail: "LinkedIn's recruiter ecosystem is unmatched — tens of thousands of recruiters use LinkedIn Recruiter daily to source candidates by title, skills, location, and activity signals. An optimized LinkedIn profile surfaces you in searches you never applied to, creating passive inbound from recruiters." },
    zari: { capable: false, detail: "Zari doesn't affect your visibility in LinkedIn's recruiter search. However, Zari does optimize your LinkedIn profile content — which directly determines how well your profile performs in those recruiter searches." },
    winner: "linkedin",
  },
  {
    task: "LinkedIn profile optimization",
    linkedinJobs: { capable: false, detail: "LinkedIn surfaces the tools to build a profile, but doesn't tell you if your headline is weak, your About section is unfocused, or your skills section is missing the keywords recruiters actually search. A complete profile and an optimized profile are very different things." },
    zari: { capable: true, detail: "Zari audits your LinkedIn headline, About section, experience bullets, and skills — then rewrites each section for recruiter search discoverability. The output is a profile that performs in LinkedIn's algorithm, not just one that technically has all sections filled in." },
    winner: "zari",
  },
  {
    task: "ATS resume optimization for specific roles",
    linkedinJobs: { capable: false, detail: "LinkedIn's Easy Apply feature lets you apply directly — but your submitted resume is compared against job requirements by the employer's ATS, and LinkedIn doesn't analyze your resume against the JD or help you optimize it for that specific role." },
    zari: { capable: true, detail: "For every LinkedIn role you want to apply to: paste the job description into Zari, upload your resume, and get a line-by-line analysis — missing keywords, weak bullets, formatting issues. Optimized for the specific JD, not generic resume advice." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    linkedinJobs: { capable: false, detail: "LinkedIn has some interview prep resources (LinkedIn Learning, sample questions) but no personalized coaching — no mock interview with your actual answers evaluated, no role-specific question generation from the job description, and no STAR-method scoring." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the exact LinkedIn job description you're targeting, evaluates your STAR-method answers with specific feedback, and coaches both behavioral and situational patterns for the specific company and role type." },
    winner: "zari",
  },
  {
    task: "Salary research",
    linkedinJobs: { capable: true, detail: "LinkedIn Salary provides compensation data by role, company, location, and seniority — sourced from self-reported member data and employer insights. Particularly useful for professional and corporate roles where LinkedIn has dense data." },
    zari: { capable: true, detail: "Zari incorporates compensation benchmarks into negotiation coaching — helping you understand your market rate and use it strategically in a counter offer conversation, including how to handle 'we can't go above band' and competing offer leverage." },
    winner: "linkedin",
  },
  {
    task: "Salary negotiation coaching",
    linkedinJobs: { capable: false, detail: "LinkedIn provides salary data but no negotiation coaching. The platform ends at the offer stage — how you negotiate what comes next is entirely on you." },
    zari: { capable: true, detail: "Zari coaches the full salary negotiation sequence — calculating your counter, scripting the conversation, handling pushbacks, and coaching equity, signing bonus, and start date negotiation. Where compensation is actually determined — not in the job listing, but in this conversation." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const linkedin = TASK_COMPARISON.filter(r => r.winner === "linkedin").length;
  return { zari, linkedin, total: TASK_COMPARISON.length };
})();

const HOW_TO_USE_BOTH = [
  {
    step: "Start with LinkedIn Jobs for discovery",
    detail: "Set up LinkedIn job alerts for your target role and location. Save interesting listings — don't apply immediately. Give yourself a batch of 3–5 relevant roles to work with before optimizing.",
  },
  {
    step: "Optimize your LinkedIn profile with Zari",
    detail: "Use Zari to audit and rewrite your LinkedIn headline, About section, and top skills. An optimized profile increases inbound from recruiters and improves how you appear when hiring managers check your LinkedIn after receiving your resume.",
  },
  {
    step: "Use Zari to optimize each application",
    detail: "For each role you decide to apply to: paste the LinkedIn JD into Zari with your resume. Get the ATS keyword analysis and bullet rewrites before hitting Easy Apply or submitting your resume.",
  },
  {
    step: "Prepare for the interview with Zari",
    detail: "When an interview is scheduled: return to Zari with the same job description. Generate the role-specific interview questions, practice your STAR answers, and identify the specific competencies the interviewer is evaluating.",
  },
  {
    step: "Negotiate the offer with Zari",
    detail: "When the offer comes: use Zari to calculate your counter, script the negotiation conversation, and prepare for pushbacks. Use LinkedIn Salary data as your market rate evidence in the conversation.",
  },
];

const FAQS = [
  { question: "Is LinkedIn the best job board in 2025?", answer: "For most professional roles — corporate, tech, finance, consulting, marketing, operations — yes. LinkedIn has the largest active recruiter base, the most sophisticated job matching for professional roles, and the largest network of first and second-degree connections that enable referrals. For hourly, healthcare, skilled trades, and general labor, Indeed has significantly larger inventory. For early-stage startups, Wellfound (AngelList) is more concentrated. For most college-educated professionals, LinkedIn is the primary job search channel." },
  { question: "Does using Easy Apply hurt your application?", answer: "It can, but not for the reason most people think. Easy Apply doesn't hurt your application because of the channel — it hurts when candidates apply without optimizing their materials for the specific role, because Easy Apply makes applying so frictionless that many candidates submit generic resumes. Employers know Easy Apply generates high volume and lower average quality, so ATS keyword matching and resume quality matter more, not less, when applying through Easy Apply." },
  { question: "How do I stand out on LinkedIn beyond just applying?", answer: "The highest-ROI actions beyond applying: (1) Optimize your profile for recruiter search — headline with keywords, not just job title; (2) Connect with employees at target companies before applying — a warm connection increases referral likelihood; (3) Engage with content from people at companies you're targeting — when you appear in their notifications repeatedly, your application name recognition increases; (4) Turn on Open to Work visible only to recruiters — the green banner for public display signals desperation; the recruiter-only setting is professional and passive." },
];

export default async function ZariVsLinkedInJobsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs LinkedIn Jobs", url: `${BASE_URL}/compare/zari-vs-linkedin-jobs` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs LinkedIn Jobs</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            LinkedIn Jobs is the dominant platform for professional job discovery and recruiter visibility. Zari coaches you to win the roles you find there — ATS optimization, interview prep, LinkedIn profile rewrites, and offer negotiation.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.linkedin}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">LinkedIn Jobs wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE_DATA.total} evaluated job search tasks</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4">
            {TASK_COMPARISON.map((row) => (
              <div key={row.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "linkedin" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.linkedinJobs.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">LinkedIn Jobs {row.linkedinJobs.capable ? "✓" : "✗"}</p>
                      {row.winner === "linkedin" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.linkedinJobs.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4361EE]">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use both */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to use LinkedIn Jobs and Zari together</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">These tools are sequential — LinkedIn Jobs feeds the top of your funnel, Zari converts opportunities into offers.</p>
          <div className="mt-7 space-y-4">
            {HOW_TO_USE_BOTH.map((step, i) => (
              <div key={step.step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-extrabold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{step.step}</p>
                  <p className="mt-1 text-[13.5px] text-[var(--muted)]">{step.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on LinkedIn? Now let&apos;s convert it to an offer.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific JD, rewrites your LinkedIn profile for recruiter search, coaches your interview, and helps you negotiate the offer. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
