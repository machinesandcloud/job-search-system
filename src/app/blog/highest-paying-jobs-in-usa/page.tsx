import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Highest Paying Jobs in the USA 2025 — Salaries by Industry and City",
  description: "The highest paying jobs in the United States in 2025 — total compensation by role, industry, and city. Finance, tech, medicine, law, and what you actually take home after taxes.",
  keywords: ["highest paying jobs in usa", "highest paying jobs america", "best paying jobs 2025", "highest salary usa", "top paying careers usa", "highest paying careers", "best paying jobs in america", "usa salary guide 2025", "highest paying jobs by state"],
  alternates: { canonical: "/blog/highest-paying-jobs-in-usa" },
  openGraph: {
    title: "Highest Paying Jobs in the USA 2025 — Salaries by Industry and City",
    description: "Total compensation data for the highest paying careers in America — finance, tech, medicine, law, and what you keep after federal and state taxes.",
    url: "/blog/highest-paying-jobs-in-usa",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SALARIES = [
  { role: "Hedge Fund Manager / Portfolio Manager", industry: "Finance", range: "$500,000–$10,000,000+", note: "Carry and AUM-based bonus — uncapped upside" },
  { role: "Investment Banking MD / Partner", industry: "Finance", range: "$1,000,000–$5,000,000+", note: "Bonus often 3–5× base salary; deal-flow dependent" },
  { role: "Physician (Specialist)", industry: "Medicine", range: "$350,000–$700,000+", note: "Orthopedic, cardiology, neurosurgery top earners" },
  { role: "Big Tech L7/L8 Engineer", industry: "Technology", range: "$500,000–$1,200,000+ TC", note: "Google/Meta/Nvidia; RSU-heavy; SF/NY location" },
  { role: "Lawyer (BigLaw Partner)", industry: "Law", range: "$600,000–$5,000,000+", note: "Partner profits; NYC/LA BigLaw; book of business" },
  { role: "Chief Executive Officer (F500)", industry: "Corporate", range: "$5,000,000–$30,000,000+", note: "Stock comp dominates; S&P 500 CEO median $14M" },
  { role: "AI Researcher / ML Staff Engineer", industry: "Technology", range: "$400,000–$1,000,000+ TC", note: "OpenAI, Google DeepMind, Anthropic — equity-heavy" },
  { role: "Private Equity Associate/VP", industry: "Finance", range: "$300,000–$800,000+", note: "Carry kicks in at VP; 2-and-20 model" },
  { role: "Oral & Maxillofacial Surgeon", industry: "Medicine", range: "$400,000–$600,000+", note: "Dentist + MD; often private practice owner" },
  { role: "Chief Financial Officer (public co)", industry: "Corporate", range: "$400,000–$2,000,000+", note: "Stock comp grows significantly at public companies" },
  { role: "Anesthesiologist", industry: "Medicine", range: "$350,000–$550,000", note: "Consistent demand; hospital or CRNA group model" },
  { role: "Quantitative Researcher (HFT)", industry: "Finance", range: "$400,000–$1,000,000+", note: "Jane Street, Two Sigma, DE Shaw; alpha-driven" },
];

const FAQS = [
  { question: "What is the highest paying job in America in 2025?", answer: "The highest paying jobs in the US by total annual compensation: (1) Hedge fund portfolio managers and founders — no ceiling; top managers earn hundreds of millions. (2) Investment banking MDs and partners — $1M–$5M+ annually. (3) Big Tech engineering executives (L8/L9 at Google, Meta, Nvidia) — stock-heavy total comp often exceeds $1M. (4) Physicians in high-demand specialties — orthopedic surgeons and neurosurgeons average $600,000–$800,000. (5) BigLaw partners in elite NYC or LA firms — $1M–$5M+ depending on book of business. Key insight: jobs with uncapped upside (finance, entrepreneurship, equity-heavy tech) can dramatically exceed jobs with high but capped salaries (physicians, lawyers on salary)." },
  { question: "What are the highest paying jobs without a medical degree?", answer: "The highest paying non-medical careers in the US: (1) Software engineering at top tech companies — FAANG L5+ engineers earn $250,000–$600,000 TC without medical training. (2) Investment banking — analysts earn $170,000+ in year one; MDs and partners earn $1M+. (3) Quantitative finance — quant researchers at Jane Street, Two Sigma, or Citadel earn $300,000–$1,000,000+. (4) Management consulting (MBB partner) — $500,000–$1,000,000+. (5) Corporate law (BigLaw partner) — requires law degree but not medical. (6) Sales at enterprise tech companies — top account executives at Salesforce, Snowflake, or ServiceNow earn $300,000–$600,000+ in commission-heavy roles." },
  { question: "How does location affect salary in the United States?", answer: "Location is one of the most powerful salary levers in the US — but the net take-home calculation is complex. San Francisco / Bay Area: highest gross salaries in the US, particularly in tech (L5 SWE = $280,000–$450,000 TC). But: California income tax up to 13.3%, housing median $1.3M+. New York City: second-highest gross for finance and tech, but NYC + NY state tax on top of federal. Texas (Austin, Houston, Dallas): no state income tax; growing tech and energy salaries. Florida (Miami): no state income tax; financial services growing. Tennessee / Nevada / Wyoming: zero state income tax. The practical implication: a $200,000 job in Austin with zero state tax often takes home more than a $240,000 job in San Francisco after California taxes. Use Zari&apos;s salary calculator to run the comparison." },
  { question: "What are the highest paying jobs for college graduates without experience?", answer: "The highest-paying entry-level positions for new college graduates in 2025: (1) Software engineer at Big Tech (Google, Meta, Microsoft, Amazon) — $130,000–$180,000 TC at entry level with bachelor&apos;s in CS. (2) Investment banking analyst at bulge bracket (Goldman, JPMorgan, Morgan Stanley) — $100,000–$130,000 base + $60,000–$110,000 bonus = $170,000+ total. (3) Management consulting analyst (MBB) — $90,000–$110,000 base + signing bonus. (4) Quantitative trading/research analyst (Jane Street, Citadel, Two Sigma) — $150,000–$300,000 for top math/CS students. (5) Data scientist at tech company — $120,000–$160,000. Key: a strong GPA from a target school + internship experience in the role is essentially required for paths 2–4." },
];

export default async function HighestPayingJobsInUSAPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Highest Paying Jobs in the USA 2025 — Salaries by Industry and City"
        description="Total compensation data for the highest paying careers in America — finance, tech, medicine, law, and what you keep after federal and state taxes."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/blog/highest-paying-jobs-in-usa`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Highest Paying Jobs in the USA", url: `${BASE_URL}/blog/highest-paying-jobs-in-usa` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1C3A5E 50%, #4361EE 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Finance · Tech · Medicine · Law · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Highest Paying Jobs<br />
            <span className="text-white/50">in the USA 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Total compensation data for the highest paying careers in America — finance, technology, medicine, law, and what you actually keep after federal and state taxes.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated 2025 · 9 min read · Total comp including equity and bonus</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Highest paying careers in the United States — 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Total annual compensation including base salary, bonus, and equity. Federal income tax reaches 37% above $609,350; state taxes vary significantly — see the city breakdown below.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Industry</span><span>Annual TC</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, industry, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{industry}</span>
                <span className="font-semibold text-[#4361EE]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[var(--muted)]">TC = total compensation (base + bonus + equity). Ranges reflect senior roles in high-cost markets. Entry-level figures are significantly lower.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">How location changes your take-home pay</h2>
          <div className="space-y-4">
            {[
              { city: "San Francisco / Bay Area", gross: "$280,000 (L5 SWE)", takeHome: "~$168,000", note: "After federal 32–35%, CA state 9.3%, FICA. High gross; high tax; high housing ($1.3M median)." },
              { city: "New York City", gross: "$250,000 (L5 SWE)", takeHome: "~$152,000", note: "After federal, NY state (6.85%), NYC city tax (3.9%). Best for finance comp; high cost." },
              { city: "Austin, Texas", gross: "$210,000 (L5 SWE)", takeHome: "~$145,000", note: "No state income tax. Lower gross but much better take-home efficiency. Housing reasonable." },
              { city: "Miami, Florida", gross: "$200,000 (L5 SWE)", takeHome: "~$138,000", note: "No state income tax. Finance and tech growing. Similar logic to Texas." },
              { city: "Nashville, Tennessee", gross: "$190,000 (L5 SWE)", takeHome: "~$131,000", note: "No state income tax on wages. Oracle HQ; healthcare; lower cost of living." },
            ].map(({ city, gross, takeHome, note }) => (
              <div key={city} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-[14px]">{city}</p>
                    <p className="text-[12px] text-[var(--muted)] mt-1">Gross: {gross} · {note}</p>
                  </div>
                  <span className="shrink-0 font-bold text-[14px] text-[#4361EE]">{takeHome}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[var(--muted)]">Estimates assume standard deductions. Actual take-home depends on filing status, deductions, and other income.</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #4361EE 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land one of the highest paying jobs with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Resume optimization, interview coaching, and salary negotiation for finance, tech, and consulting roles. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#4361EE]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
