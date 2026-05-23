import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Jobscan — ATS Scorer vs AI Career Coach (2025)",
  description:
    "Jobscan tells you your resume score and which keywords are missing. Zari rewrites the bullets to add those keywords — then coaches you on LinkedIn, interviews, and salary. Honest comparison.",
  keywords: ["Zari vs Jobscan", "Jobscan alternative", "Jobscan vs AI career coach", "Jobscan review 2025", "better than Jobscan", "ATS resume checker comparison", "jobscan worth it"],
  alternates: { canonical: "/compare/zari-vs-jobscan" },
  openGraph: {
    title: "Zari vs Jobscan — Which Actually Gets You Hired? (2025)",
    description: "Jobscan diagnoses the problem. Zari diagnoses it AND fixes it — then takes you through the rest of the job search.",
    url: "/compare/zari-vs-jobscan",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What does Jobscan actually do?",
    answer: "Jobscan is an ATS optimization tool that compares your resume against a job description and returns a 'match rate' score (0–100). It categorizes missing keywords into hard skills, soft skills, and other terms. The Power plan runs ~$49.95/month. It's a diagnostic tool — strong at telling you what's missing, but it doesn't rewrite your resume for you.",
  },
  {
    question: "What's the difference between Jobscan's feedback and Zari's?",
    answer: "Jobscan tells you: 'missing keyword: cloud infrastructure.' Zari rewrites the specific bullet that should contain it — for example: 'Managed cloud infrastructure migration to AWS, cutting provisioning time from 3 weeks to 4 hours.' Jobscan gives you the gap list. Zari gives you the gap list and the new bullet.",
  },
  {
    question: "Is Jobscan worth it in 2025?",
    answer: "As a standalone ATS scanner, Jobscan is functional but narrow. At $49.95/month it's expensive for what it delivers — it tells you your score and keyword gaps, but the actual rewriting is still on you. For most job seekers, Zari delivers the same ATS analysis plus the rewrites, LinkedIn coaching, and interview prep at a lower combined cost.",
  },
  {
    question: "Does Zari do ATS scoring?",
    answer: "Yes. Zari's resume coaching includes ATS keyword analysis and match-rate assessment against the specific job description you're targeting. The difference is what happens after the score: Zari produces the rewritten bullets, not just the diagnostic.",
  },
  {
    question: "Can I use Jobscan and Zari together?",
    answer: "You could, but there's significant overlap — both analyze keyword gaps. The more practical workflow is to use Zari for the full loop: ATS analysis → rewritten resume → LinkedIn optimization → interview prep → salary negotiation. Keeping Jobscan on top of that is paying twice for the diagnostic.",
  },
];

const DIMENSIONS = [
  {
    category: "ATS Keyword Analysis",
    jobscan: "Core product strength. Jobscan parses both your resume and the target JD, then maps hard skills, soft skills, and other keyword categories to show your match rate as a percentage score.",
    zari: "Performs the same keyword gap analysis — matching your resume against the JD to identify what's missing and where. The output is a prioritized list of gaps alongside the rewritten bullets that close them.",
    winner: "tie",
    winnerNote: "Both do keyword gap analysis. The difference is what happens after the score.",
  },
  {
    category: "Resume Rewrites",
    jobscan: "Tells you which keywords to add but doesn't write the updated bullets. You still need to figure out how to work 'cross-functional leadership' or 'stakeholder management' into a bullet naturally without making it sound like keyword stuffing.",
    zari: "Produces the rewritten bullets directly. If your resume is missing 'cloud infrastructure experience' for a DevOps role, Zari writes: 'Managed AWS EC2 and RDS cluster deployments for 14 microservices, reducing provisioning time from 3 weeks to 4 hours.'",
    winner: "zari",
    winnerNote: "The gap between 'add this keyword' and 'here's the rewritten sentence' is where most job seekers lose time.",
  },
  {
    category: "LinkedIn Optimization",
    jobscan: "Has a LinkedIn Optimization feature that analyzes your LinkedIn headline, About section, and experience bullets. Shows a score and highlights gaps but, consistent with the rest of the product, leaves the rewrites to you.",
    zari: "Rewrites your LinkedIn headline, About section, and experience bullets — optimized for the keywords recruiters search when looking for your role. The output is a ready-to-paste updated profile, not a feedback list.",
    winner: "zari",
    winnerNote: "LinkedIn optimization requires actual rewrites to move recruiter search rankings.",
  },
  {
    category: "Interview Coaching",
    jobscan: "Not offered. Jobscan is focused entirely on resume and LinkedIn analysis. Once your application is in, Jobscan's job is done.",
    zari: "Full AI mock interview coach — common questions, behavioral (STAR evaluation), role-specific technical questions, and real-time feedback on clarity, specificity, and weak spots in your answers.",
    winner: "zari",
    winnerNote: "A well-optimized resume gets you the interview. Coaching gets you the offer.",
  },
  {
    category: "Salary Negotiation",
    jobscan: "Not offered.",
    zari: "Simulates salary negotiation conversations, helps you research market compensation for your target role and level, and prepares responses for common pushbacks: 'we're at the top of the band,' 'we can revisit after 90 days,' 'that's above what we budgeted.'",
    winner: "zari",
    winnerNote: "The offer stage is where most candidates leave money on the table.",
  },
  {
    category: "Pricing",
    jobscan: "Power plan: ~$49.95/month. Free tier is very limited — only a handful of scans, no full keyword breakdown.",
    zari: "Free first session on every coaching surface — resume, LinkedIn, interview, and negotiation. Paid plans start lower than Jobscan's Power plan and cover the full job search.",
    winner: "zari",
    winnerNote: "At $49.95/month for keyword analysis alone, Jobscan is expensive for what it delivers.",
  },
];

export default async function ZariVsJobscanPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Jobscan", url: `${BASE_URL}/compare/zari-vs-jobscan` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Jobscan</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Jobscan shows you the score and the missing keywords. But knowing you need to &ldquo;add cloud infrastructure experience&rdquo; isn&apos;t the same as having a rewritten bullet that says it compellingly. Here&apos;s the full comparison.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Jobscan is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Pure ATS keyword diagnostic when that's all you need",
                  "One-time resume audit if you already know how to rewrite",
                  "Candidates who want a fast score against a specific JD",
                  "Checking if your resume passes the first filter",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "ATS analysis + actual bullet rewrites in one session",
                  "LinkedIn optimization that increases recruiter inbound",
                  "Mock interview coaching after the resume lands",
                  "Anyone who needs more than a score — they need the fix",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[var(--brand)]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The core problem with diagnostic-only tools */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why ATS scoring alone isn&apos;t enough</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            Jobscan&apos;s match rate is genuinely useful — if you score a 42% against a job description, you have a problem worth solving. But here&apos;s where the workflow breaks down for most people:
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                step: "You upload your resume and the JD",
                result: "Jobscan tells you: missing keywords — 'AWS', 'CI/CD', 'cross-functional leadership', 'stakeholder management'",
              },
              {
                step: "Now you need to add those terms",
                result: "Jobscan's job is done. You're staring at your existing bullets trying to figure out how to work in 'stakeholder management' without it reading like a keyword list.",
              },
              {
                step: "You write something generic",
                result: "Most people default to: 'Worked cross-functionally with stakeholders to manage AWS infrastructure.' This technically adds the keywords but signals to human reviewers that you padded the resume.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[var(--brand)]">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.step}</p>
                    <p className="mt-1 text-[13.5px] text-[var(--muted)]">{item.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/50 p-5">
            <p className="text-[14px] leading-7 text-[var(--ink)]">
              <span className="font-bold">The real gap:</span> Knowing you need &ldquo;AWS experience&rdquo; in your resume is table stakes. Writing a bullet that demonstrates AWS work compellingly — &ldquo;Migrated 14 microservices from on-prem to AWS ECS, cutting deployment time from 3 weeks to 4 hours&rdquo; — is the actual skill. Jobscan can&apos;t do that. Zari can.
            </p>
          </div>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">An honest look at where each tool wins — and where the comparison isn&apos;t close.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" :
                    dim.winner === "tie" ? "bg-slate-100 text-slate-500" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "tie" ? "Tie" : "Jobscan wins"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Jobscan</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.jobscan}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Jobscan is a competent ATS scanner. If you have a resume you&apos;re happy with and just want to validate keyword coverage before submitting, it does that job at a basic level.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              But for most job seekers, the bottleneck isn&apos;t knowing which keywords are missing — it&apos;s writing bullets that include those keywords in a way that reads as authentic experience, not padding. Jobscan stops at the diagnosis. Zari does the diagnosis and the rewrite.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              And then there&apos;s everything else: LinkedIn optimization, interview prep, salary negotiation. Jobscan ends when your application goes in. The job search continues well past that point — Zari was built for the whole thing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
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
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Score + rewrite + coach — all in one.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">Free first session. No credit card. ATS scoring and bullet rewrites included.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
