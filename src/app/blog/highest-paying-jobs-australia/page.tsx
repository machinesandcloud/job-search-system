import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Highest Paying Jobs in Australia 2025 — Top Salaries by Industry",
  description: "The highest paying jobs in Australia in 2025 by industry — mining, tech, finance, medicine, and law. Real AUD salary ranges from SEEK, ABS, and industry surveys.",
  keywords: ["highest paying jobs australia", "highest paid jobs australia", "best paying jobs australia 2025", "top salaries australia", "highest salary australia", "highest paying careers australia", "best careers australia", "mining salary australia", "doctor salary australia", "lawyer salary australia"],
  alternates: { canonical: "/blog/highest-paying-jobs-australia" },
  openGraph: { title: "Highest Paying Jobs in Australia 2025 — Top Salaries by Industry", description: "Mining, medicine, tech, finance, law — the highest paid roles in Australia by sector with real 2025 salary data.", url: "/blog/highest-paying-jobs-australia" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the highest paying job in Australia?", answer: "Surgeons and anaesthetists are consistently the highest-paid professionals in Australia, with total earnings regularly exceeding A$500,000 per year including private billing. Outside medicine, mining engineers and senior executives at ASX-listed companies command A$250,000–A$400,000+. In tech, principal engineers and senior PMs at companies with US-benchmarked pay (Atlassian, Canva, Afterpay) earn A$250,000–A$400,000+ including equity." },
  { question: "Does mining still pay the most in Australia?", answer: "Mining remains one of the highest-paying industries for non-degree-required roles — a truck driver in the Pilbara can earn A$130,000–A$180,000 FIFO. At the professional level, mining engineers (A$130,000–A$200,000+) and geologists (A$110,000–A$180,000) are well above national averages. The caveat: FIFO lifestyle and remote locations are part of the package." },
  { question: "What's the highest paying graduate job in Australia?", answer: "Management consulting (MBB: A$90,000–A$110,000 starting), investment banking (A$85,000–A$100,000 base + bonus), and actuarial (A$75,000–A$90,000) are consistently the top-paying graduate options. Tech at companies with US pay scales (Google, Atlassian, Canva) has graduate packages of A$100,000–A$130,000 including signing and equity. Medicine is excluded as it requires postgraduate training." },
  { question: "How do I get a higher salary in Australia?", answer: "The most reliable lever is changing employers — internal raises rarely match market. Australian salary data from SEEK, Hays, and ABS shows professionals who move companies every 2–3 years earn 20–40% more than those who stay. Negotiation at offer stage is critical: SEEK data shows 65% of employers expect negotiation, and first offers are routinely 5–15% below the approved budget." },
];

const JOBS = [
  { industry: "Medicine", role: "Surgeon (specialist)", range: "A$350,000–A$600,000+", note: "Private billing, specialist fees" },
  { industry: "Medicine", role: "Anaesthetist", range: "A$300,000–A$500,000+", note: "High demand, shortage specialty" },
  { industry: "Medicine", role: "GP (practice owner)", range: "A$180,000–A$350,000", note: "Mixed billing, rural loadings" },
  { industry: "Finance", role: "Investment Banker (VP+)", range: "A$200,000–A$400,000+", note: "Base + cash bonus + deferred" },
  { industry: "Finance", role: "CFO (ASX company)", range: "A$250,000–A$500,000+", note: "Total remuneration package" },
  { industry: "Finance", role: "Actuary (Fellow)", range: "A$180,000–A$280,000", note: "Insurance, super, consulting" },
  { industry: "Mining", role: "Mining Engineer", range: "A$140,000–A$220,000", note: "FIFO premium included" },
  { industry: "Mining", role: "FIFO Electrician / Operator", range: "A$120,000–A$180,000", note: "Trades, no degree required" },
  { industry: "Law", role: "Partner (top-tier firm)", range: "A$300,000–A$700,000+", note: "Equity partnership" },
  { industry: "Law", role: "Senior Associate (biglaw)", range: "A$150,000–A$220,000", note: "MinterEllison, Allens, HSF" },
  { industry: "Tech", role: "Principal SWE (US-pay scale)", range: "A$250,000–A$400,000+", note: "Atlassian, Canva, FAANG AU" },
  { industry: "Tech", role: "Senior SWE", range: "A$140,000–A$200,000", note: "Tech hub: Sydney / Melbourne" },
];

export default async function HighestPayingJobsAustraliaPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-02-10";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Highest Paying Jobs in Australia 2025 — Top Salaries by Industry"
        description="Mining, medicine, tech, finance, law — the highest paid roles in Australia with real 2025 AUD salary data."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/highest-paying-jobs-australia`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Highest Paying Jobs Australia", url: `${BASE_URL}/blog/highest-paying-jobs-australia` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 45%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🇦🇺 Australia · Salary Data 2025 · AUD
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Highest Paying Jobs<br />
            <span className="text-white/50">in Australia 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Real AUD salary ranges across medicine, mining, finance, law, and tech — with the data sources, caveats, and how to use this to negotiate.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · Sources: SEEK, ABS, Hays, Robert Half</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Top salaries by industry — Australia 2025 (AUD)</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Total compensation (base + superannuation + typical bonus). FIFO loadings included where applicable.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Industry</span><span className="col-span-1">Role</span><span>Salary range</span><span>Notes</span>
            </div>
            {JOBS.map(({ industry, role, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-semibold text-[#D97706]">{industry}</span>
                <span className="font-bold">{role}</span>
                <span className="font-semibold">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">How to use this data to negotiate</h2>
          <div className="space-y-5 text-[14px] leading-7 text-[var(--muted)]">
            <p><strong className="text-[var(--ink)]">1. Use sector-specific sources, not just SEEK.</strong> SEEK averages skew low because they include all experience levels. For senior roles, use Hays Salary Guide (free download), Robert Half benchmarks, or LinkedIn Salary. For mining, FIFO Australia and the AMA are authoritative. For law, the Clerk Update from NACLC tracks top-tier firm rates.</p>
            <p><strong className="text-[var(--ink)]">2. Anchor above your target.</strong> Australian employers expect negotiation — first offers are routinely 5–15% below the approved budget. Anchoring 15–20% above your target leaves room to close at your actual number. Do not anchor at your target.</p>
            <p><strong className="text-[var(--ink)]">3. Know your total package, not just base.</strong> Super (11.5% in FY2025), bonuses, equity, and FBT benefits can represent 20–40% of total compensation. A A$130,000 base at a company with a generous bonus structure may outperform a A$155,000 base with no variable component.</p>
            <p><strong className="text-[var(--ink)]">4. Moving roles is the fastest pay lever.</strong> Average tenure-based raises in Australia are 3–5% annually. Moving employers typically delivers 10–25% increases at the same seniority level. For high-earners in mining, law, and medicine, switching employers or moving to private practice can double base earnings.</p>
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
          <h2 className="mb-4 text-[2rem] font-extrabold">Know your market rate. Negotiate your worth.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari's salary coaching benchmarks your offer against real market data and gives you word-for-word negotiation scripts for Australian employers.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#D97706]">Start salary coaching free</Link>
            <Link href="/salary-negotiation-coach" className="inline-block rounded-xl border border-white/20 bg-white/[0.08] px-8 py-4 text-[14px] font-semibold text-white">Salary negotiation coach →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
