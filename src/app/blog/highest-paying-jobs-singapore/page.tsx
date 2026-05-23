import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Highest Paying Jobs in Singapore 2025 — Salaries by Role and Industry",
  description: "Highest paying jobs in Singapore in 2025 with salaries in SGD. Finance, tech, consulting, law, and healthcare — which roles pay the most and how to get into them.",
  keywords: ["highest paying jobs singapore", "singapore salary guide 2025", "best paying jobs singapore", "singapore finance salary", "tech jobs singapore salary", "highest salary in singapore", "top paying careers singapore", "singapore job market 2025", "singapore employment pass", "singapore compensation"],
  alternates: { canonical: "/blog/highest-paying-jobs-singapore" },
  openGraph: { title: "Highest Paying Jobs in Singapore 2025 — Salaries by Role and Industry", description: "The highest-paying roles in Singapore by sector — salaries in SGD, what the roles require, and how to position yourself.", url: "/blog/highest-paying-jobs-singapore" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the highest paying industries in Singapore?", answer: "The highest-paying industries in Singapore by average compensation: (1) Financial services — investment banking, private banking, hedge funds, private equity. Singapore is Southeast Asia's financial hub; Goldman, JPMorgan, UBS, and every major global bank have significant Singapore offices. (2) Technology — Google, Meta, ByteDance, Sea Group, Grab, and regional HQs of global tech companies. FAANG Singapore salaries approach US levels for senior roles. (3) Management consulting — McKinsey, BCG, Bain Singapore offices are highly competitive and pay global rates. (4) Law — Magic Circle firms (Allen & Overy, Clifford Chance, Linklaters) and large US firms have Singapore offices; senior associates and partners earn SGD 300k–700k+. (5) Pharmaceuticals — Pfizer, Novartis, Roche, AstraZeneca have regional HQs in Singapore. Regional director roles: SGD 250k–500k." },
  { question: "What is a good salary in Singapore in 2025?", answer: "Salary benchmarks by career stage in Singapore: Fresh graduate (22–24 years): SGD 3,500–5,500/month is typical; finance and consulting roles start higher (SGD 5,000–8,000). Mid-career professional (5–10 years): SGD 8,000–18,000/month is solid; top-quartile tech/finance professionals earn SGD 15,000–25,000/month. Senior professional (Director/VP level): SGD 20,000–50,000/month base, often with performance bonuses of 20–50% of base. Singapore has no capital gains tax and a progressive income tax rate capping at 24% for income above SGD 320,000. The effective tax rate for most professionals is 15–22% — significantly lower than the US, UK, or Germany. This is a key reason global talent chooses Singapore." },
  { question: "How do I get an Employment Pass to work in Singapore?", answer: "The Employment Pass (EP) is Singapore's work visa for professionals. Key requirements as of 2025: Minimum qualifying salary of SGD 5,000/month for new applications (SGD 5,500 for financial services roles). Higher thresholds for older, more experienced applicants — the EP salary threshold increases with age. COMPASS (Complementarity Assessment Framework): since 2023, EP applications are assessed on a points-based system covering salary benchmark, qualifications, diversity, and support for local hiring. Points needed: 40+ out of 100. Application process: your employer applies via MOM (Ministry of Manpower) — individuals cannot apply directly. Processing time: 3–8 weeks. The EP is valid for 1–2 years initially, renewable. After 2 years on EP, you may be eligible for Permanent Residency (PR)." },
  { question: "Are Singapore tech salaries comparable to US tech salaries?", answer: "For senior roles at FAANG and top-tier tech companies: surprisingly close. Google, Meta, and ByteDance Singapore offices increasingly offer competitive total compensation packages — senior software engineers and staff engineers can earn SGD 200,000–400,000+ (approximately USD 150,000–300,000) in total compensation including bonuses and RSUs. For mid-level roles: Singapore tech salaries are typically 20–40% lower than equivalent US roles in absolute terms — but after tax, the gap narrows significantly due to Singapore's lower income tax. Singapore vs San Francisco comparison for a Senior SWE: SF gross ~USD 220,000 → post-tax ~USD 150,000–160,000 (CA). Singapore gross ~SGD 180,000 (USD 135,000) → post-tax ~SGD 155,000 (USD 116,000). The gap after tax is meaningful but smaller than it appears pre-tax." },
];

const SALARIES = [
  { role: "Investment Banker (VP)", salary: "SGD 250,000–500,000+", notes: "Base + bonus; Goldman/JPMorgan Singapore comparable to US" },
  { role: "Private Equity / Hedge Fund Professional", salary: "SGD 300,000–700,000+", notes: "Carry and bonus make total comp highly variable" },
  { role: "Senior Software Engineer (FAANG)", salary: "SGD 180,000–320,000", notes: "Google/Meta/ByteDance approach US levels for senior roles" },
  { role: "Management Consultant (Manager/Principal)", salary: "SGD 180,000–350,000", notes: "McKinsey/BCG/Bain Singapore; variable bonus" },
  { role: "Product Manager (Senior/Staff)", salary: "SGD 150,000–250,000", notes: "Sea Group, Grab, FAANG Singapore; equity component" },
  { role: "Regional Director (Pharma/MNC)", salary: "SGD 200,000–450,000", notes: "P&G, Pfizer, Roche APAC regional leadership" },
  { role: "Chief Financial Officer (mid-size)", salary: "SGD 250,000–500,000", notes: "Base only; bonuses can double total comp" },
  { role: "Data Scientist / ML Engineer (Senior)", salary: "SGD 120,000–220,000", notes: "Fastest-growing demand; AI talent premium in 2025" },
  { role: "M&A / Corporate Finance Lawyer", salary: "SGD 200,000–600,000+", notes: "Magic Circle and US BigLaw Singapore offices" },
];

export default async function HighestPayingJobsSingaporePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Highest Paying Jobs in Singapore 2025 — Salaries by Role and Industry"
        description="The highest-paying roles in Singapore by sector — salaries in SGD, what the roles require, and how to position yourself."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/highest-paying-jobs-singapore`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Highest Paying Jobs Singapore", url: `${BASE_URL}/blog/highest-paying-jobs-singapore` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #EF4444 50%, #D97706 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Singapore Salaries · Finance · Tech · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Highest Paying Jobs<br />
            <span className="text-white/50">in Singapore</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Singapore salaries by role and industry in 2025 — finance, tech, consulting, and the Employment Pass thresholds you need to qualify.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated 2025 · 8 min read · Salaries in SGD</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Highest paying roles in Singapore (2025)</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Total compensation including base salary and target bonus. Equity (RSUs, carry) makes senior tech and finance roles significantly higher. Singapore income tax caps at 24% — effective rate 15–22% for most professionals.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Annual Compensation (SGD)</span><span>Context</span>
            </div>
            {SALARIES.map(({ role, salary, notes }) => (
              <div key={role} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="font-semibold text-[#EF4444]">{salary}</span>
                <span className="text-[var(--muted)] text-[12px]">{notes}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Why Singapore — the key advantages</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { advantage: "Low income tax", detail: "Progressive rates capping at 24% (SGD 320k+). Effective rate for mid-to-senior professionals: 15–22%. No capital gains tax, no inheritance tax. Significant advantage vs US, UK, or Germany." },
              { advantage: "APAC regional hub", detail: "Most major multinationals house their Asia-Pacific HQs in Singapore — P&G, Google, Meta, Citibank, JPMorgan, McKinsey. Regional roles often command a premium and involve high-visibility work." },
              { advantage: "Employment Pass access", detail: "SGD 5,000/month minimum (2025) for EP qualification. COMPASS points system assesses salary benchmark, qualifications, company diversity, and local workforce support." },
              { advantage: "English-language market", detail: "English is Singapore&apos;s working language. No language barrier for US/UK/Australian professionals — major competitive advantage versus working in Germany, Japan, or mainland China." },
              { advantage: "Gateway to Southeast Asia", detail: "Singapore is the base for careers spanning Indonesia, Vietnam, Thailand, Philippines, and Malaysia — combined population 700M+. APAC career scope is substantially larger than individual markets." },
              { advantage: "Lifestyle and stability", detail: "Low crime, excellent public transit, Changi Airport hub for international travel, high-quality healthcare. Ranked consistently among top cities globally for quality of life for expats." },
            ].map(({ advantage, detail }) => (
              <div key={advantage} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px] text-[#EF4444]">{advantage}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{detail}</p>
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
              <div key={question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #EF4444 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land a Singapore job offer with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Resume optimization for Singapore and APAC markets, interview prep for finance, tech, and consulting roles. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#EF4444]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
