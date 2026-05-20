import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Highest Paying Jobs in Canada 2025 — Salaries, Skills & Top Cities",
  description:
    "The 20 highest paying jobs in Canada in 2025 with real salary data in CAD. Tech, finance, engineering, and healthcare roles across Toronto, Vancouver, Calgary, and Montréal.",
  keywords: [
    "highest paying jobs Canada",
    "highest paying jobs in Canada 2025",
    "best paying jobs Canada",
    "top salaries Canada",
    "highest paid careers Canada",
    "Canada salary guide 2025",
    "tech jobs Canada salary",
    "Toronto salary guide",
    "Vancouver salary",
    "best careers Canada 2025",
  ],
  alternates: { canonical: "/blog/highest-paying-jobs-canada" },
  openGraph: {
    title: "Highest Paying Jobs in Canada 2025 — Real CAD Salary Data",
    description: "The 20 highest paying jobs in Canada with real salary data in CAD by city and experience level.",
    url: "/blog/highest-paying-jobs-canada",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is the highest paying job in Canada in 2025?",
    answer: "Physicians and surgeons earn the highest salaries in Canada with median total compensation of CA$300K–CA$500K. Among knowledge-economy roles, software engineers at senior staff level at major tech companies in Toronto or Vancouver earn CA$200K–CA$350K total comp. Investment bankers and management consultants at top firms earn CA$180K–CA$400K+ at VP level.",
  },
  {
    question: "What is the average software engineer salary in Toronto?",
    answer: "The median software engineer salary in Toronto is approximately CA$109K for mid-level (3–6 years) and CA$140K for senior level (6+ years). At major tech companies (Google Toronto, Amazon, Shopify, Wealthsimple), total comp including equity can reach CA$200K–CA$350K at senior level.",
  },
  {
    question: "Is Vancouver or Toronto better for tech jobs and salaries?",
    answer: "Toronto has more total tech job volume and stronger finance-adjacent roles (fintech, enterprise software). Vancouver has a strong gaming industry, Amazon HQ2 presence, and lower (but growing) senior tech salaries. Toronto median senior SWE: CA$140K. Vancouver: CA$132K. Cost of living is high in both cities, but both are significantly below San Francisco compensation levels — Vancouver is closer to the US Pacific Northwest.",
  },
  {
    question: "How do Canadian salaries compare to US salaries?",
    answer: "Canadian salaries in tech and finance are typically 30–45% lower than equivalent US roles in absolute dollar terms, but the gap narrows significantly when adjusted for lower taxes (especially in Alberta), lower cost of living outside of Toronto and Vancouver, and universal healthcare which eliminates employer benefits costs from personal financial planning. The CAD/USD exchange rate adds additional complexity.",
  },
  {
    question: "What are the highest paying jobs in Calgary?",
    answer: "Calgary is dominated by the energy sector — petroleum engineers and geoscientists earn CA$120K–CA$200K. Beyond energy, Shopify, Amazon, and several fintech companies have Calgary offices. The lack of provincial income tax in Alberta means a CA$130K Calgary salary has similar after-tax take-home to a CA$155K Toronto salary.",
  },
];

const JOBS = [
  { rank: 1, title: "Physician / Surgeon", sector: "Healthcare", median: "CA$320,000", color: "#DC2626" },
  { rank: 2, title: "Investment Banker (VP+)", sector: "Finance", median: "CA$280,000", color: "#9B1D20" },
  { rank: 3, title: "Software Engineer (Staff)", sector: "Technology", median: "CA$210,000", color: "#0078A8" },
  { rank: 4, title: "Machine Learning Engineer", sector: "Technology", median: "CA$175,000", color: "#0078A8" },
  { rank: 5, title: "Management Consultant (Senior)", sector: "Consulting", median: "CA$165,000", color: "#7C3AED" },
  { rank: 6, title: "Petroleum Engineer", sector: "Energy", median: "CA$150,000", color: "#D97706" },
  { rank: 7, title: "Dentist", sector: "Healthcare", median: "CA$155,000", color: "#DC2626" },
  { rank: 8, title: "Data Science Director", sector: "Technology", median: "CA$155,000", color: "#0078A8" },
  { rank: 9, title: "Lawyer (Partner)", sector: "Legal", median: "CA$250,000", color: "#059669" },
  { rank: 10, title: "Engineering Manager (Tech)", sector: "Technology", median: "CA$170,000", color: "#0078A8" },
];

export default async function HighestPayingJobsCanadaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Highest Paying Jobs in Canada 2025"
        description="Real CAD salary data for the 20 highest paying jobs in Canada by city."
        url={`${BASE_URL}/blog/highest-paying-jobs-canada`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "Highest Paying Jobs Canada", url: `${BASE_URL}/blog/highest-paying-jobs-canada` },
        ]}
      />

      <section
        className="relative overflow-hidden pb-16 pt-14 text-white"
        style={{ background: "linear-gradient(135deg, #9B1D20 0%, #C8202A 35%, #1A1A2E 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">🇨🇦 Canada Guide</span>
            <span className="text-[12px] text-white/35">15 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Highest Paying Jobs in Canada 2025
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">
            Real salary data in CAD across Toronto, Vancouver, Calgary, and Montréal. Covers tech, finance, law, healthcare, and energy.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={140} suffix="K" label="median senior SWE salary in Toronto (CAD)" accent="#9B1D20" />
            <StatCard value={320} suffix="K" label="median physician salary in Canada (CAD)" accent="#7C3AED" />
            <StatCard value={0} suffix="%" label="provincial income tax in Alberta — no deduction" accent="#D97706" />
            <StatCard value={4} label="major cities benchmarked with CAD salary data" accent="#0078A8" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Top 10 highest paying jobs in Canada — 2025</h2>
          <p className="mb-6 text-[14px] text-[var(--muted)]">Salaries shown are median total compensation (base + bonus) for senior levels in Toronto or Vancouver. Alberta roles show Calgary data which may have higher after-tax value due to no provincial income tax.</p>

          <div className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-[40px_1fr_auto] gap-0 bg-[var(--bg)] p-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)]">
              <span>#</span><span>Role</span><span>Median comp</span>
            </div>
            {JOBS.map(({ rank, title, sector, median, color }) => (
              <div key={rank} className="grid grid-cols-[40px_1fr_auto] items-center gap-0 border-b border-[var(--border)] p-4 last:border-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold text-white" style={{ background: color }}>{rank}</div>
                <div className="px-3">
                  <div className="text-[14px] font-bold">{title}</div>
                  <div className="text-[11px] text-[var(--muted)]">{sector}</div>
                </div>
                <div className="text-[15px] font-extrabold" style={{ color }}>{median}</div>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">City salary comparison — Canada 2025</h2>
          <div className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-5 bg-[var(--bg)] border-b border-[var(--border)] p-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
              <span className="col-span-2">City</span>
              <span>SWE (Sr)</span>
              <span>PM (Sr)</span>
              <span>Finance</span>
            </div>
            {[
              { city: "Toronto 🏙️", swe: "CA$140K", pm: "CA$125K", fin: "CA$180K" },
              { city: "Vancouver 🌊", swe: "CA$132K", pm: "CA$118K", fin: "CA$158K" },
              { city: "Calgary 🤠", swe: "CA$120K", pm: "CA$108K", fin: "CA$145K" },
              { city: "Montréal 🏔️", swe: "CA$112K", pm: "CA$100K", fin: "CA$135K" },
            ].map(({ city, swe, pm, fin }) => (
              <div key={city} className="grid grid-cols-5 items-center border-b border-[var(--border)] p-3 text-[13px] last:border-0">
                <span className="col-span-2 font-semibold">{city}</span>
                <span>{swe}</span>
                <span>{pm}</span>
                <span className="font-bold text-[#9B1D20]">{fin}</span>
              </div>
            ))}
          </div>

          <div className="mb-12 rounded-2xl border-l-4 border-[#D97706] bg-[#D97706]/5 p-5">
            <p className="text-[14px] font-bold text-[#D97706] mb-1">Calgary / Alberta advantage</p>
            <p className="text-[14px] leading-6 text-[var(--muted)]">Alberta has no provincial income tax. A CA$130K Calgary salary has approximately the same after-tax take-home as a CA$155K Toronto salary. For senior roles in energy, tech, and finance, Calgary&apos;s effective compensation is underrated in raw comparison tables.</p>
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">How to position yourself for high-paying Canadian roles</h2>
          <div className="space-y-4 mb-10">
            {[
              { title: "Target the right city for your sector", body: "Tech: Toronto or Vancouver. Energy: Calgary. AI research: Montréal (home of Mila, the world's largest AI research centre). Finance: Toronto. Government: Ottawa. Choose your city based on your sector, not salary tables alone." },
              { title: "Understand Canadian hiring culture", body: "Canadian employers value competency demonstration, stability signals, and cultural fit highly. References matter more than in the US. Be prepared for 3–5 interview rounds for senior roles, often including competency-based panels." },
              { title: "Optimise your resume for Canadian employer ATS", body: "Canadian resumes follow similar conventions to US resumes (1–2 pages, quantified bullets) but with Canadian spelling and slightly more narrative summary sections. Zari scores your resume against Canadian employer ATS patterns." },
              { title: "Know your number in CAD", body: "Zari provides salary data in CAD by role, level, and city. Use this to set your expectation, counter offer, and negotiate — not a converted USD figure." },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px]">{title}</div>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">FAQ</h2>
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

      <section style={{ background: "linear-gradient(135deg, #9B1D20 0%, #C8202A 100%)" }} className="py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-2 text-3xl">🇨🇦</div>
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Ready to target a top Canadian salary?</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari prepares your resume for Canadian employer ATS, provides real CAD salary benchmarks, and coaches you through Canadian interview formats — including Government of Canada applications.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#9B1D20]">Start free</Link>
            <Link href="/ai-career-coach-canada" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">Canada Career Coach →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
