import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Use LinkedIn to Find a Job 2025 — Complete Guide",
  description: "How to use LinkedIn to find a job in 2025: profile optimisation, job search filters, recruiter outreach, and LinkedIn Easy Apply strategy — everything that actually works.",
  keywords: ["how to use linkedin to find a job", "linkedin job search tips", "linkedin profile tips for job seekers", "linkedin easy apply", "how to get noticed on linkedin", "linkedin recruiter outreach", "linkedin job search 2025", "linkedin for job seekers", "linkedin job hunting tips"],
  alternates: { canonical: "/blog/how-to-use-linkedin-to-find-a-job" },
  openGraph: { title: "How to Use LinkedIn to Find a Job 2025 — Complete Guide", description: "Profile optimisation, job search filters, recruiter outreach, and Easy Apply strategy — everything that works on LinkedIn in 2025.", url: "/blog/how-to-use-linkedin-to-find-a-job" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Does LinkedIn Easy Apply actually work?", answer: "Yes, but with important caveats. LinkedIn Easy Apply submissions go directly to the ATS in most cases — the same system that filters all applications. Easy Apply is faster to submit but not lower quality if your profile is strong. The issue is volume: Easy Apply lowers the barrier for everyone, so competition is higher. The best strategy is Easy Apply for roles where your profile is a strong match (70%+ keyword overlap with JD), and direct application + cover letter for roles where you're less obviously qualified or where the company is a high-priority target." },
  { question: "How do I get recruiters to reach out to me on LinkedIn?", answer: "Three settings matter most: (1) Turn on Open to Work in your job preferences — set it to recruiters only, not the public green banner. (2) Optimise your headline for the exact job titles your target recruiters search. LinkedIn's algorithm surfaces profiles whose headlines match recruiter search queries. (3) Be recently active — LinkedIn's algorithm surfaces active profiles more. Commenting on industry posts and posting occasionally signals recency without requiring a major content strategy." },
  { question: "Is it worth connecting with recruiters on LinkedIn?", answer: "Yes — especially for roles you're actively targeting. A personalised connection request that references the specific role or company is accepted ~60% of the time. Once connected, a brief message explaining your background and interest in a specific role is appropriate. Keep it specific: 'I noticed you recruit for senior PM roles at Stripe — I'm a PM with 6 years in fintech and would love to be on your radar for senior or staff roles' outperforms generic 'I'm interested in opportunities at your company'." },
  { question: "What LinkedIn settings should I change for a job search?", answer: "Turn on Open to Work (recruiter-only visibility), update your job title preferences to include exact role titles you want (not just broad categories), set your location preferences to remote/hybrid if applicable, turn on Profile views — seeing who viewed your profile lets you identify active recruiters in your target companies. Also set your messaging to open to InMail from recruiters — many recruiters use LinkedIn message credits only for profiles that allow InMail." },
];

const STEPS = [
  { n: "1", title: "Optimise your headline first", desc: "Pack in your specialisation, top 2–3 skills, and target role type. 'Software Engineer at Company' wastes 200 of your 220 characters. Your headline is LinkedIn's most-weighted search field." },
  { n: "2", title: "Set your job preferences correctly", desc: "Open to Work → Recruiters only. Set job titles to exact titles you want (not broad categories). Location: include remote if applicable. Seniority: set the range, not just your current level." },
  { n: "3", title: "Use Job Alerts, not manual search", desc: "Set a saved search for your target role + location + seniority. LinkedIn Job Alerts send you matching roles daily — you see new postings within hours, before competition builds up." },
  { n: "4", title: "Identify the hiring manager before applying", desc: "Search the company + role title + 'hiring' or check comments on the job posting. A message to the hiring manager before or alongside your application materially increases callback rates." },
  { n: "5", title: "Apply within 24–48 hours of posting", desc: "LinkedIn data shows applications submitted in the first 48 hours have 3× higher response rates. Set alerts and apply fast — don't batch applications weekly." },
  { n: "6", title: "Build recruiter relationships proactively", desc: "Connect with 2–3 recruiters at your top target companies before you need them. Personalised note, one sentence about your background, one sentence about what you're looking for." },
];

export default async function HowToUseLinkedInToFindAJobPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-01-25";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Use LinkedIn to Find a Job 2025 — Complete Guide"
        description="Profile optimisation, job search filters, recruiter outreach, and Easy Apply strategy — everything that works on LinkedIn in 2025."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-to-use-linkedin-to-find-a-job`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Use LinkedIn to Find a Job", url: `${BASE_URL}/blog/how-to-use-linkedin-to-find-a-job` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0A66C2 55%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            LinkedIn Job Search · Strategy · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Use LinkedIn<br />
            <span className="text-white/50">to Find a Job in 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Profile settings, search strategy, recruiter outreach, and Easy Apply tactics — everything that actually works on LinkedIn for job seekers in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">6-step LinkedIn job search system</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">In order. Don&apos;t skip to step 5 before doing steps 1–2.</p>
          <div className="space-y-4">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[14px] font-extrabold text-[#0A66C2]">{n}</div>
                <div>
                  <h3 className="mb-1 font-bold text-[14px]">{title}</h3>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">LinkedIn job search: what works vs. what doesn&apos;t</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-2 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="text-[#EF4444]">Common mistakes (waste your time)</span>
              <span className="text-[#0A66C2]">What actually works</span>
            </div>
            {[
              { bad: "Apply to 50+ roles with a generic resume", good: "Apply to 15 targeted roles with a tailored resume + ATS score" },
              { bad: "Connect with everyone to build a 'large network'", good: "Connect with 5 recruiters at your 3 target companies with personalised notes" },
              { bad: "Post thought leadership content hoping recruiters notice", good: "Optimise your headline and turn on Open to Work — recruiter-only" },
              { bad: "Apply 2 weeks after a job is posted", good: "Set alerts and apply within 48 hours of posting" },
              { bad: "Send generic InMail: 'I'd love to work at your company'", good: "Specific InMail: role + one-line background + clear ask" },
              { bad: "List skills but ignore LinkedIn's skills endorsement section", good: "Pin your top 3 skills — endorsed skills appear in recruiter filters" },
            ].map(({ bad, good }) => (
              <div key={bad} className="grid grid-cols-2 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="text-[var(--muted)]">✗ {bad}</span>
                <span className="font-semibold text-[#0A66C2]">✓ {good}</span>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0A66C2 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Optimise your LinkedIn profile for job search.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari rewrites your headline, About section, and experience to rank higher in recruiter searches — free to start.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0A66C2]">Optimise my LinkedIn free</Link>
            <Link href="/linkedin-profile-writer" className="inline-block rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">LinkedIn profile writer →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
