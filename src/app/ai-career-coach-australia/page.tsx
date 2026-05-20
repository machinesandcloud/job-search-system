import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "AI Career Coach Australia — Resume, Interview & Salary Help (2025)",
  description:
    "Australia's most powerful AI career coach. ATS-optimised resumes for Australian employers, salary benchmarks in AUD for Sydney and Melbourne, mock interviews, LinkedIn optimisation, and career strategy.",
  keywords: [
    "AI career coach Australia",
    "career coach Australia",
    "AI resume writer Australia",
    "career coaching Australia",
    "best AI career coach Australia",
    "free career coach Australia",
    "job search Australia",
    "resume help Australia",
    "Australian resume tips",
    "career advice Australia",
  ],
  alternates: { canonical: "/ai-career-coach-australia" },
  openGraph: {
    title: "AI Career Coach Australia — Land Your Next Job Faster",
    description:
      "ATS-optimised resumes, salary benchmarks in AUD, mock interviews and LinkedIn optimisation built for the Australian job market.",
    url: "/ai-career-coach-australia",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Is Zari built for the Australian job market?",
    answer:
      "Yes. Zari understands Australian employer expectations, ATS patterns used in Australia (including SEEK-based applications), and provides salary benchmarks in AUD for Sydney and Melbourne. It writes resumes optimised for Australian roles and formats them according to Australian employer conventions.",
  },
  {
    question: "How do Australian resumes differ from US resumes?",
    answer:
      "Australian resumes are typically 2–3 pages (vs. 1 page in the US), use Australian spelling ('organisation' not 'organization'), often include a career summary or objective statement, and may list referees or note 'references available on request'. They are generally slightly more narrative than US resumes but more concise than UK CVs.",
  },
  {
    question: "What salary data does Zari have for Australia?",
    answer:
      "Zari provides salary benchmarks in AUD for Sydney and Melbourne across 21 role types. All data is benchmarked at the 25th, 50th, and 75th percentiles with senior/mid/entry breakdowns. Salary data is updated regularly.",
  },
  {
    question: "Can Zari help me prepare for Australian interviews?",
    answer:
      "Yes. Australian interviews typically use a mix of behavioral and situational questions. Zari runs mock interview simulations using the STAR framework, evaluates your answers on 6 dimensions, and gives specific language feedback. It also covers panel interviews and competency-based formats common in Australian government and large organisations.",
  },
  {
    question: "Is Zari free?",
    answer:
      "Yes. Zari offers one free session per coaching surface — resume, LinkedIn, interview, and salary negotiation — with no credit card required. Pro plans are $29/month AUD equivalent for unlimited access across all coaching surfaces.",
  },
];

const CITIES = [
  {
    name: "Sydney",
    flag: "🏙️",
    topRole: "Software Engineer",
    salary: "A$145K",
    description: "Australia's largest tech hub with strong fintech, startups, and enterprise roles",
    color: "#0078A8",
  },
  {
    name: "Melbourne",
    flag: "🌆",
    topRole: "Product Manager",
    salary: "A$130K",
    description: "Major finance, consulting, and professional services market with top-tier employers",
    color: "#7C3AED",
  },
];

export default async function AiCareerCoachAustraliaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "AI Career Coach Australia", url: `${BASE_URL}/ai-career-coach-australia` },
        ]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden pb-20 pt-16 text-white"
        style={{ background: "linear-gradient(135deg, #003087 0%, #00509E 35%, #00264D 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        {/* Southern Cross subtle decoration */}
        <div className="pointer-events-none absolute right-8 top-8 text-6xl opacity-10 select-none">✦ ✦<br />✦ ✦<br />✦</div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            {/* Left */}
            <div className="flex-1">
              <div className="mb-5 flex items-center gap-3">
                <span className="text-4xl">🇦🇺</span>
                <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/60">
                  Australia
                </span>
              </div>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
                Australia&apos;s AI Career Coach.<br />
                <span className="text-white/50">Built for the Australian Market.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[16px] leading-7 text-white/55">
                ATS-optimised resumes for Australian employers. Salary benchmarks in AUD. Mock interviews with STAR feedback. LinkedIn optimisation. Career strategy — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/platform"
                  className="rounded-lg bg-white px-6 py-3 text-[14px] font-bold text-[#003087] transition-opacity hover:opacity-90"
                >
                  Start for free — no credit card
                </Link>
                <Link
                  href="/salary"
                  className="rounded-lg border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.14]"
                >
                  View AUD salary data →
                </Link>
              </div>
              <p className="mt-4 text-[12px] text-white/30">
                One free session per coaching surface · No CC required
              </p>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-2 gap-3 lg:w-[340px] lg:flex-shrink-0">
              {[
                { v: "68", s: "%", l: "of AU resumes rejected by ATS" },
                { v: "210", s: "+", l: "applications per job posting" },
                { v: "7", s: "s", l: "average recruiter scan time" },
                { v: "31", s: "%", l: "higher salary with coaching" },
              ].map(({ v, s, l }) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
                  <div className="text-[2rem] font-extrabold leading-none">
                    {v}<span className="text-[1.2rem] text-white/50">{s}</span>
                  </div>
                  <div className="mt-1.5 text-[10px] leading-4 text-white/40">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stat bar */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={68} suffix="%" label="of Australian resumes blocked by ATS" accent="#003087" />
            <StatCard value={21} label="role categories with AUD salary data" accent="#0078A8" />
            <StatCard value={2} label="major cities benchmarked — Sydney & Melbourne" accent="#7C3AED" />
            <StatCard value={10} label="minute session, specific actionable output" accent="#059669" />
          </div>
        </div>
      </section>

      {/* Why Australian-specific */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">
            Why generic AI coaching isn&apos;t enough for Australia
          </h2>
          <p className="mb-10 max-w-2xl text-[15px] text-[var(--muted)]">
            The Australian job market has specific conventions that US-trained tools miss. Zari knows the difference.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "📄",
                title: "Australian Resume Format",
                body: "2–3 pages, Australian spelling, career summary, referees. Not a 1-page US resume. Zari produces the right format for AU employers.",
                color: "#003087",
              },
              {
                icon: "🔍",
                title: "SEEK & AU ATS Patterns",
                body: "Most Australian job applications go through SEEK or similar platforms. Zari optimises your resume for the keyword patterns that AU ATS systems weight highest.",
                color: "#0078A8",
              },
              {
                icon: "🎯",
                title: "Behavioural Interviews",
                body: "Australian employers heavily favour behavioural questions. Zari evaluates your answers using STAR scoring and gives specific language improvements.",
                color: "#7C3AED",
              },
              {
                icon: "💰",
                title: "Salary in AUD",
                body: "All Zari salary data for Australia is in AUD — not a converted USD figure. Real benchmarks for Sydney and Melbourne by role and experience level.",
                color: "#059669",
              },
            ].map(({ icon, title, body, color }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                  style={{ background: `${color}15` }}
                >
                  {icon}
                </div>
                <h3 className="mb-2 text-[14px] font-bold">{title}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City salary section */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-2 text-[1.9rem] font-extrabold tracking-[-0.02em]">
            Australian salary benchmarks — AUD
          </h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">
            Senior software engineer median salaries by city. Full breakdowns at{" "}
            <Link href="/salary" className="text-[var(--brand)] hover:underline">zaricoach.com/salary</Link>.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {CITIES.map(({ name, flag, topRole, salary, description, color }) => (
              <div
                key={name}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
              >
                <div className="h-1.5 w-full" style={{ background: color }} />
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{flag}</span>
                        <h3 className="text-[18px] font-extrabold">{name}</h3>
                      </div>
                      <p className="mt-1 text-[12px] text-[var(--muted)]">{description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[22px] font-extrabold" style={{ color }}>{salary}</div>
                      <div className="text-[10px] text-[var(--muted)]">Sr {topRole} median</div>
                    </div>
                  </div>
                  <Link
                    href={`/salary/software-engineer-salary-${name.toLowerCase()}`}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold hover:underline"
                    style={{ color }}
                  >
                    Full salary data for {name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-[2rem] font-extrabold tracking-[-0.02em]">
            Everything you need to land the job
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "📝",
                title: "Australian Resume Optimisation",
                desc: "ATS scoring against the target role. Bullet rewrites with quantified impact. Australian format, Australian spelling, correct structure.",
                href: "/ai-resume-writer",
              },
              {
                icon: "🎤",
                title: "Mock Interview Coaching",
                desc: "Behavioural and situational simulations. STAR structure evaluation. Language and pacing feedback. Covers panel formats and competency interviews.",
                href: "/ai-interview-coach",
              },
              {
                icon: "💼",
                title: "LinkedIn Optimisation",
                desc: "Headline for recruiter search visibility. About section with keyword-dense narrative. Experience bullets for AU employer patterns.",
                href: "/ai-linkedin-optimizer",
              },
              {
                icon: "💰",
                title: "Salary Negotiation in AUD",
                desc: "Market data in AUD by role and city. Counter-offer scripts. Negotiation simulations with realistic pushback.",
                href: "/salary-negotiation-coach",
              },
              {
                icon: "📈",
                title: "Career Strategy",
                desc: "Role fit mapping for the AU market. 30-day action plan with weekly milestones. Target company shortlist based on your profile.",
                href: "/ai-career-coach",
              },
              {
                icon: "🏆",
                title: "Promotion Coaching",
                desc: "Promotion case building from your work evidence. Manager conversation prep. Performance review strategy.",
                href: "/promotion-coach",
              },
            ].map(({ icon, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 transition-colors hover:border-[#003087]/30 hover:bg-[#003087]/[0.02]"
              >
                <div className="mb-3 text-2xl">{icon}</div>
                <h3 className="mb-2 text-[14px] font-bold">{title}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{desc}</p>
                <div className="mt-3 text-[12px] font-semibold text-[#003087] opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-white"
        style={{ background: "linear-gradient(135deg, #003087 0%, #00509E 50%, #003087 100%)" }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-3 text-4xl">🇦🇺</div>
          <h2 className="mb-4 text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.02em]">
            68% ATS rejection rate.<br />Be in the 32%.
          </h2>
          <p className="mb-8 text-[15px] text-white/55">
            The average Australian job gets 210+ applications. Zari optimises your resume for the ATS before a human ever sees it — and coaches you through the interview when they do.
          </p>
          <Link
            href="/platform"
            className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#003087] transition-opacity hover:opacity-90"
          >
            Start free — no credit card
          </Link>
          <p className="mt-4 text-[12px] text-white/30">
            Free tier includes one full session on every coaching surface.
          </p>
        </div>
      </section>
    </PageFrame>
  );
}
