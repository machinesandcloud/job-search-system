import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export const metadata: Metadata = {
  title: "AI Career Coach Canada — #1 AI Career Coaching for Canadian Job Seekers (2025)",
  description:
    "Zari is Canada's leading AI career coach. Resume optimization for Canadian ATS, interview coaching for Canadian employers, LinkedIn, and salary negotiation in CAD. Free to start.",
  keywords: [
    "AI career coach Canada",
    "career coach Canada",
    "career coaching Canada",
    "best career coach Canada",
    "online career coach Canada",
    "career advice Canada 2025",
    "resume help Canada",
    "job search help Canada",
    "AI career advisor Canada",
    "free career coach Canada",
  ],
  alternates: { canonical: "/ai-career-coach-canada" },
  openGraph: {
    title: "AI Career Coach Canada — Zari",
    description: "Resume optimization, interview coaching, LinkedIn, and salary negotiation for Canadian job seekers. Free to start.",
    url: "/ai-career-coach-canada",
  },
};

const FAQS = [
  {
    question: "Is Zari specifically designed for the Canadian job market?",
    answer: "Zari is built to support both Canadian and US job markets, with specific awareness of Canadian market differences. It understands Canadian resume format conventions, Canadian ATS keyword patterns, and salary data in CAD for major Canadian markets (Toronto, Vancouver, Calgary, Montréal). It also has coaching for Canadian-specific hiring contexts like government roles and immigration-related job searching.",
  },
  {
    question: "Can Zari help with job searching in Canada as a newcomer or immigrant?",
    answer: "Yes. Zari is used extensively by newcomers to Canada — international students, PR applicants, and skilled worker immigrants. It helps translate international work experience into Canadian resume format, identify Canadian equivalents for foreign job titles, navigate Canadian credential recognition language, and prepare for Canadian interview styles which tend to be more collaborative and less competitive than US interviews.",
  },
  {
    question: "Does Zari know Canadian salary data in CAD?",
    answer: "Yes. Zari has salary benchmark data in CAD for Toronto, Vancouver, Calgary, and Montréal across 21 roles and all experience levels. You can see the median salary for your role and level in your city, understand the negotiation range (25th to 75th percentile), and practice the negotiation conversation before the real call.",
  },
  {
    question: "What Canadian employers have Zari users targeted?",
    answer: "Zari users in Canada have used it to prepare for roles at Shopify, RBC, TD Bank, CIBC, Manulife, Sun Life, Rogers, Bell, Telus, Amazon Canada, Google Canada, Microsoft Canada, Deloitte Canada, KPMG Canada, McKinsey Canada, and the federal and provincial public services. The coaching adapts to the specific hiring process and competency frameworks of each employer.",
  },
  {
    question: "How does Canadian interview coaching differ from US coaching?",
    answer: "Canadian interviews tend to be more competency-based than US interviews, with less emphasis on 'selling yourself aggressively' and more on collaborative problem-solving and teamwork. Government and financial services interviews in Canada have structured competency frameworks. Zari coaches to the specific format used by the employer — whether that's a behavioural interview at RBC, a case interview at McKinsey Canada, or a values-based interview at a non-profit.",
  },
];

const PROVINCES = [
  {
    name: "Ontario",
    flag: "🍁",
    hub: "Toronto",
    description: "Canada's largest job market. Finance (Bay Street), tech (Shopify, Wattpad), consulting, and government. Competitive and fast-paced.",
    salary: "CA$109K",
    href: "/salary/software-engineer-salary-toronto",
  },
  {
    name: "British Columbia",
    flag: "🌲",
    hub: "Vancouver",
    description: "Strong tech market (Amazon, Microsoft, Apple), gaming (EA, Activision), and a thriving startup scene. Beautiful but expensive.",
    salary: "CA$100K",
    href: "/salary/software-engineer-salary-vancouver",
  },
  {
    name: "Quebec",
    flag: "⚜️",
    hub: "Montréal",
    description: "Global AI hub (Mila, Google Brain), gaming capital (Ubisoft), and thriving startup ecosystem. French language skills open more doors.",
    salary: "CA$85K",
    href: "/salary/software-engineer-salary-montreal",
  },
  {
    name: "Alberta",
    flag: "⛽",
    hub: "Calgary",
    description: "Diversifying tech sector (energy tech, fintech, data analytics). No provincial income tax — highest net take-home in Canada.",
    salary: "CA$92K",
    href: "/salary/software-engineer-salary-calgary",
  },
];

export default async function AiCareerCoachCanadaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach Canada", url: `${BASE_URL}/ai-career-coach-canada` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #9B1D20 0%, #C8202A 30%, #1A1A2E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FF0000 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/50">
            🇨🇦 Built for Canadian Job Seekers
          </div>
          <h1 className="max-w-3xl text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.6rem]">
            The AI Career Coach<br />
            <span className="text-white/55">for Canada&apos;s Job Market</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/55">
            Resume optimisation for Canadian ATS. Interview coaching for Canadian employers. Salary benchmarks in CAD. From Toronto to Vancouver to Montréal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#9B1D20] transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
              Start free — no card required
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/blog/job-search-in-canada" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-6 text-[14px] font-semibold text-white transition-all hover:bg-white/[0.12]">
              Canada job search guide
            </Link>
          </div>
          <p className="mt-5 text-[12px] text-white/30">Used by job seekers at Shopify, RBC, TD Bank, Amazon Canada, Google Canada, Deloitte Canada, and McKinsey Canada</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={310} label="average applications per Canadian job posting" accent="#9B1D20" />
            <StatCard value={71} suffix="%" label="of Canadian resumes rejected by ATS before a human review" accent="#0D7182" />
            <StatCard value={62} suffix="%" label="of Canadian hiring managers expect candidates to negotiate" accent="#059669" />
            <StatCard value={38} suffix="K" label="new tech jobs added in Canada in 2024" accent="#7C3AED" />
          </div>
        </div>
      </section>

      {/* Province breakdown */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Canada&apos;s major job markets</h2>
          <p className="mt-3 mb-10 text-[14px] text-[var(--muted)]">Senior Software Engineer median salary in CAD. Each market has distinct industries, employers, and hiring cultures.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROVINCES.map((p) => (
              <div key={p.name} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.flag}</span>
                    <div>
                      <p className="font-extrabold text-[var(--ink)]">{p.hub}</p>
                      <p className="text-[11px] text-[var(--muted)]">{p.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[1.4rem] font-extrabold text-[var(--brand)]">{p.salary}</p>
                    <p className="text-[10px] text-[var(--muted)]">senior SWE median</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{p.description}</p>
                  <Link href={p.href} className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--brand)] hover:underline">
                    Full salary guide →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newcomers section */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <div className="grid sm:grid-cols-2">
              <div className="p-8 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
                <span className="text-3xl">🌍</span>
                <h3 className="mt-3 text-[1.3rem] font-extrabold text-[var(--ink)]">For newcomers to Canada</h3>
                <p className="mt-3 text-[13.5px] leading-7 text-[var(--muted)]">
                  Canada welcomes over 400,000 immigrants per year. Zari helps newcomers translate international experience into Canadian resume format, identify Canadian equivalents for foreign job titles, and prepare for Canadian interview culture — which values humility, collaboration, and cultural fit alongside technical competence.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "International work experience reframing",
                    "Canadian resume format and conventions",
                    "Province-specific job market guidance",
                    "Canadian salary benchmarks in CAD",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[var(--muted)]">
                      <span className="mt-0.5 text-[var(--brand)]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8">
                <span className="text-3xl">🏛️</span>
                <h3 className="mt-3 text-[1.3rem] font-extrabold text-[var(--ink)]">For Canadian public service</h3>
                <p className="mt-3 text-[13.5px] leading-7 text-[var(--muted)]">
                  Government of Canada and provincial public service hiring uses the Public Service Resourcing System (PSRS) and a strict statement-of-merit format. Zari coaches the unique requirements of Canadian public service applications — essential qualifications, asset qualifications, and the structured interview formats used by federal and provincial hiring boards.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "PSRS application coaching",
                    "Statement of merit response writing",
                    "Federal interview coaching",
                    "Language requirement preparation (French/English)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[var(--muted)]">
                      <span className="mt-0.5 text-[var(--brand)]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Questions from Canadian job seekers</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[var(--border)] p-6">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-3 text-[13.5px] leading-7 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="mb-4 text-[14px] font-bold text-[var(--ink)]">Canada career resources</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/blog/job-search-in-canada", label: "Job Search in Canada Guide" },
              { href: "/blog/canada-salary-guide", label: "Canada Salary Guide" },
              { href: "/salary/software-engineer-salary-toronto", label: "SWE Salary Toronto" },
              { href: "/salary/software-engineer-salary-vancouver", label: "SWE Salary Vancouver" },
              { href: "/salary/product-manager-salary-toronto", label: "PM Salary Toronto" },
              { href: "/salary/data-scientist-salary-toronto", label: "Data Scientist Salary Toronto" },
              { href: "/compare/zari-vs-workopolis", label: "Zari vs Workopolis" },
              { href: "/compare/zari-vs-otta", label: "Zari vs Otta" },
              { href: "/ai-career-coach", label: "AI Career Coach (Global)" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4361EE] hover:bg-[var(--brand)]/5 transition-all">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg, #9B1D20 0%, #C8202A 40%, #1A1A2E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.03em]">310 applicants per job.<br /><span className="text-white/60">Be the one they call back.</span></h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-white/50">
            Zari is the coaching layer between your application and the shortlist. CV scoring, interview coaching, and salary negotiation — built for Canada. Free first session.
          </p>
          <Link href={userId ? "/dashboard" : "/signup"} className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#9B1D20] transition-all hover:-translate-y-0.5">
            Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
