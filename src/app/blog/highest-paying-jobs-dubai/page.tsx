import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Highest Paying Jobs in Dubai 2025 — Salaries in AED and USD",
  description: "Highest paying jobs in Dubai in 2025 with salaries in AED and USD. Finance, tech, oil & gas, consulting, and how to get a UAE work visa for each role.",
  keywords: ["highest paying jobs dubai", "dubai salary guide 2025", "best paying jobs dubai", "dubai finance salary", "tech jobs dubai salary", "highest salary in dubai", "uae work visa", "dubai job market 2025", "tax free salary dubai", "dubai compensation"],
  alternates: { canonical: "/blog/highest-paying-jobs-dubai" },
  openGraph: { title: "Highest Paying Jobs in Dubai 2025 — Salaries in AED and USD", description: "Dubai&apos;s highest-paying roles by sector — AED salaries, tax-free equivalents, UAE visa requirements, and how to compete for them.", url: "/blog/highest-paying-jobs-dubai" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the highest paying industries in Dubai?", answer: "The highest-paying industries in Dubai by total compensation: (1) Financial services — investment banking (Emirates NBD, FAB, Mashreq), private banking (Julius Baer, UBS, Credit Suisse Dubai), and family office wealth management. Dubai is becoming a significant alternative to Geneva for wealth management. (2) Oil & gas / energy — ADNOC (Abu Dhabi National Oil Company) is one of the region's largest employers; Aramco has significant UAE presence. Senior engineering and executive roles: AED 50,000–120,000/month. (3) Technology — Microsoft, Google, Salesforce, Oracle, and regional tech companies. Software engineering and cloud roles pay AED 25,000–60,000/month at senior levels. (4) Management consulting — McKinsey, BCG, and Bain all have Dubai offices; senior consultant through partner: AED 40,000–120,000/month. (5) Healthcare and pharma — specialist physicians (AED 35,000–80,000/month), multinational pharma regional directors (AED 40,000–90,000/month)." },
  { question: "How does the tax-free Dubai salary compare to the US or UK?", answer: "Dubai has zero personal income tax — this is the defining financial feature of UAE employment. Comparison to understand the real advantage: A Dubai salary of AED 30,000/month (roughly USD 8,200/month / USD 98,400/year gross) = USD 98,400 take-home (before housing and benefits). US equivalent to match take-home: a US professional earning USD 140,000/year in California would take home approximately USD 98,000 after federal and state tax. UK equivalent: a UK professional earning £90,000 would take home approximately £62,000 after income tax and NI — that's less than the Dubai AED 30k/month. The tax advantage is real and significant, particularly for high earners. Caveat: Dubai has high living costs for certain categories — housing, international schooling, and car ownership are expensive. The tax advantage is partially offset for families." },
  { question: "What is the UAE Golden Visa and who qualifies?", answer: "The UAE Golden Visa is a 10-year residency visa introduced to attract high-value talent. Key qualifying categories: (1) Salary-based: professionals earning AED 30,000+ per month in select specialized fields (tech, healthcare, science, education). (2) Investors: real estate investors with property worth AED 2 million+, or business investors meeting specific thresholds. (3) Entrepreneurs: founders of innovative startups approved by designated UAE incubators. (4) Specialized talents: doctors, engineers, scientists, artists, and athletes approved by relevant UAE authorities. (5) Outstanding students: students with GPA 3.75+ from top UAE universities. The Golden Visa enables: 10-year residency (renewable), ability to sponsor family, no requirement for an employer sponsor, and ability to stay outside UAE for extended periods without losing residency. This is a significant improvement over standard Employment Visas, which require employer sponsorship." },
  { question: "What visa do I need to work in Dubai?", answer: "The primary work visas for Dubai/UAE: (1) Employment Visa — the standard work visa, sponsored by your employer. Your employer handles the application; you don't apply directly. Valid for 2–3 years, renewable. Requires a signed employment contract and medical fitness certificate. (2) UAE Green Visa — introduced 2022, for skilled workers and freelancers. Does NOT require employer sponsorship. Minimum monthly salary requirement: AED 15,000. Valid 5 years, self-renewable. (3) UAE Golden Visa — 10-year residency for high-net-worth individuals, top talents, and investors (see above). (4) Freelance Permit — issued by free zones (DMCC, Dubai Media City, DIFC) for self-employed professionals. Costs AED 7,500–15,000/year. (5) Entrepreneur / Startup Visa — for business founders in UAE free zones. Most international hires at major companies are processed on an Employment Visa — your employer's HR handles the paperwork." },
];

const SALARIES = [
  { role: "Investment Banker (VP)", salary: "AED 600,000–1,200,000+/yr", usd: "~USD 163,000–327,000+", notes: "Tax-free; Emirates NBD, FAB, Mashreq, global banks" },
  { role: "Private Banker / Wealth Manager", salary: "AED 500,000–1,000,000+/yr", usd: "~USD 136,000–272,000+", notes: "AUM-based bonus can 2–3x base; UBS, Julius Baer Dubai" },
  { role: "Senior Software Engineer (FAANG)", salary: "AED 300,000–600,000/yr", usd: "~USD 82,000–163,000", notes: "Microsoft, Google, Salesforce MENA hubs; RSUs" },
  { role: "Management Consultant (Manager)", salary: "AED 400,000–700,000/yr", usd: "~USD 109,000–191,000", notes: "McKinsey/BCG/Bain Dubai; no income tax inflates real value" },
  { role: "Oil & Gas Senior Engineer", salary: "AED 480,000–900,000/yr", usd: "~USD 131,000–245,000", notes: "ADNOC, Shell, BP; housing allowance typically included" },
  { role: "Regional Director (MNC)", salary: "AED 500,000–1,000,000/yr", usd: "~USD 136,000–272,000", notes: "MENA/GCC regional leadership at P&G, Unilever, etc." },
  { role: "Specialist Physician", salary: "AED 420,000–960,000/yr", usd: "~USD 114,000–261,000", notes: "MOH licensed; hospital-employed; housing benefit common" },
  { role: "Chief Financial Officer (mid-size)", salary: "AED 600,000–1,200,000/yr", usd: "~USD 163,000–327,000", notes: "All tax-free; significant real-world advantage vs US/UK peers" },
];

export default async function HighestPayingJobsDubaiPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Highest Paying Jobs in Dubai 2025 — Salaries in AED and USD"
        description="Dubai&apos;s highest-paying roles by sector — AED salaries, tax-free equivalents, UAE visa requirements, and how to compete for them."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/highest-paying-jobs-dubai`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Highest Paying Jobs Dubai", url: `${BASE_URL}/blog/highest-paying-jobs-dubai` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 50%, #C8102E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Dubai Salaries · Tax-Free · Finance & Tech · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Highest Paying Jobs<br />
            <span className="text-white/50">in Dubai</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Dubai salaries in AED and USD — the highest-paying roles in finance, tech, oil &amp; gas, and consulting, plus what UAE visa you need to get there.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated 2025 · 8 min read · 0% income tax · Salaries in AED and USD</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Highest paying roles in Dubai — 2025 salary guide</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">All figures are gross annual compensation. Dubai has <strong>zero personal income tax</strong> — every figure below is what you keep. Housing allowance is separately provided by most major employers (typically AED 80,000–180,000/yr for senior roles).</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Annual (AED)</span><span>Approx. USD</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, salary, usd, notes }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="font-semibold text-[#D97706]">{salary}</span>
                <span className="text-[var(--muted)] text-[12px]">{usd}</span>
                <span className="text-[var(--muted)] text-[12px]">{notes}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[var(--muted)]">Exchange rate: 1 USD ≈ 3.67 AED (pegged). Compensation packages at major employers often include housing allowance, annual flight tickets, and health insurance — the total package can add 20–40% to base salary.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">The tax-free advantage — what it actually means</h2>
          <div className="space-y-4">
            {[
              { label: "Dubai professional earning AED 30,000/month", takeHome: "AED 360,000/yr (100% take-home)", note: "No income tax. No VAT on salary. AED 360,000 = ~USD 98,000 in your pocket." },
              { label: "US equivalent (California, ~USD 140,000 gross)", takeHome: "~USD 98,000 take-home", note: "After federal (24%) + CA state (9.3%) + FICA. Need USD 140k gross to match AED 30k/month Dubai." },
              { label: "UK equivalent (~£90,000 gross)", takeHome: "~£62,000 take-home", note: "After income tax (40%) + NI (2%). Dubai AED 30k is worth ~£90k gross UK salary." },
              { label: "Germany equivalent (~€110,000 gross)", takeHome: "~€65,000 take-home", note: "After income tax + solidarity surcharge + social contributions (~41%). Dubai AED 30k = Germany €110k gross." },
            ].map(({ label, takeHome, note }) => (
              <div key={label} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-[13px]">{label}</p>
                    <p className="text-[12px] text-[var(--muted)] mt-1">{note}</p>
                  </div>
                  <span className="shrink-0 font-bold text-[13px] text-[#D97706]">{takeHome}</span>
                </div>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land a Dubai job offer with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Resume optimization for UAE and MENA markets, interview coaching for finance, tech, and consulting roles. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#D97706]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
