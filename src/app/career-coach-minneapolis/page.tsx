import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Minneapolis 2025 — AI Career Coaching for Twin Cities Professionals",
  description: "AI career coaching for Minneapolis-St. Paul professionals. Twin Cities salary benchmarks, healthcare and Fortune 500 interview prep, resume optimization for UnitedHealth, Target, and 3M.",
  keywords: ["career coach minneapolis", "career coach twin cities", "career coach minnesota", "minneapolis career coaching", "career counselor minneapolis", "twin cities job search 2025", "unitedhealth careers", "target careers minneapolis", "3m careers", "minneapolis salary negotiation"],
  alternates: { canonical: "/career-coach-minneapolis" },
  openGraph: { title: "Career Coach Minneapolis 2025 — AI Career Coaching for Twin Cities Professionals", description: "Twin Cities salary benchmarks, Fortune 500 interview prep, and resume optimization for Minneapolis-St. Paul's top employers.", url: "/career-coach-minneapolis" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What major companies are headquartered in Minneapolis-St. Paul?", answer: "The Twin Cities has one of the highest concentrations of Fortune 500 HQs per capita in the US. Key employers: Healthcare: UnitedHealth Group (world&apos;s largest healthcare company by revenue — HQ in Minnetonka), Optum (UnitedHealth subsidiary — thousands of tech and analytics roles), Medtronic (medical devices giant — HQ in Fridley). Retail & Consumer: Target (HQ in Minneapolis — 10,000+ corporate employees), Best Buy (HQ in Richfield). Industrial / Science: 3M (HQ in St. Paul), Cargill (HQ in Minnetonka — world&apos;s largest private company). Financial: U.S. Bancorp (HQ in Minneapolis), Ameriprise Financial. Others: General Mills, Land O&apos;Lakes, Xcel Energy." },
  { question: "What are typical salaries in Minneapolis?", answer: "Minneapolis salaries are solid Midwest rates with less disparity from coastal cities than many assume. 2025 benchmarks: Software Engineer (UnitedHealth/Optum): $115,000–$185,000 TC; Medical Device Engineer (Medtronic): $95,000–$165,000; Data Scientist / Analyst (Target, UnitedHealth): $100,000–$165,000; Corporate Buyer / Merchandiser (Target): $75,000–$130,000; Financial Analyst (US Bancorp, Ameriprise): $80,000–$130,000; Registered Nurse: $72,000–$105,000; Product Manager: $115,000–$180,000 TC. Minnesota has a graduated income tax — top rate 9.85% on income over $183,340 — one of the higher Midwest rates, but the cost of living (especially housing) is significantly below coastal cities." },
  { question: "How do I get a job at UnitedHealth Group or Optum?", answer: "UnitedHealth Group is one of the most complex hiring environments in the US — the parent company has 400,000+ employees and dozens of subsidiaries. Key tips: 1) Know which entity you&apos;re applying to — UnitedHealthcare (insurance), Optum (services/technology), or OptumRx, OptumInsight, etc. Each has different culture and interview formats. 2) ATS is Workday-based — use specific healthcare and technology keywords from the job description. 3) Recruiter phone screen → hiring manager call → panel interviews (typically 4–6 people). Core themes: healthcare impact, analytical problem-solving, cross-functional collaboration. For tech roles at Optum: expect coding challenges and system design for senior roles. Zari coaches candidates through UnitedHealth-style behavioral and technical interviews." },
  { question: "Is the Minneapolis job market stable year-round?", answer: "Yes — Minneapolis has one of the most resilient job markets in the Midwest because of its Fortune 500 diversity. No single industry dominates, which means economic downturns hit Minneapolis later and softer than concentrated markets. Healthcare (UnitedHealth, Medtronic, Allina) is essentially recession-resistant. Target&apos;s corporate hiring fluctuates with retail cycles, but their tech and data roles are growing. 3M has restructured but remains a major employer. The Twin Cities is also a strong market for hybrid work — many of the large HQs maintain meaningful in-office presence, which has supported local hiring through the remote work shift. Winters are cold; summers are exceptional; the outdoor culture (lakes, trails, biking) makes retention easier than most Midwest metros." },
];

const SALARIES = [
  { role: "Software Engineer (Senior)", company: "UnitedHealth/Optum, Target Tech", range: "$115,000–$185,000 TC", note: "Optum is massive tech/data employer" },
  { role: "Medical Device Engineer", company: "Medtronic, Boston Scientific", range: "$95,000–$165,000", note: "Twin Cities = medical device capital" },
  { role: "Data Scientist / Analyst", company: "Target, UnitedHealth, 3M", range: "$100,000–$165,000", note: "Target Analytics is highly respected" },
  { role: "Corporate Buyer / Merchandiser", company: "Target, Best Buy, General Mills", range: "$75,000–$130,000", note: "Target HQ has 10k+ corporate employees" },
  { role: "Financial Analyst", company: "US Bancorp, Ameriprise, Cargill", range: "$80,000–$130,000", note: "Multiple major financial HQs" },
  { role: "Product Manager (Tech)", company: "Target, Optum, Ecolab", range: "$115,000–$180,000 TC", note: "Target&apos;s PM organization is top-tier" },
  { role: "Registered Nurse (RN)", company: "Allina, M Health Fairview, Mayo", range: "$72,000–$105,000", note: "Strong hospital systems across metro" },
];

export default async function CareerCoachMinneapolisPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Minneapolis 2025 — AI Career Coaching for Twin Cities Professionals"
        description="Twin Cities salary benchmarks, Fortune 500 interview prep, and resume optimization for Minneapolis-St. Paul's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-minneapolis`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Minneapolis", url: `${BASE_URL}/career-coach-minneapolis` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #003865 0%, #CC0033 50%, #003865 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Minneapolis · Fortune 500 · Healthcare · Retail · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Minneapolis, Minnesota</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for the Twin Cities — UnitedHealth, Target, Medtronic, 3M, and 16 other Fortune 500 HQs. Resume optimization, interview prep, and salary negotiation available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · 18 Fortune 500 HQs · Medical device capital</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Twin Cities salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Minneapolis-St. Paul compensation data across healthcare, tech, retail, and financial services.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#003865]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Twin Cities job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "UnitedHealth / Optum prep", desc: "Behavioral and technical interview coaching for UnitedHealth, Optum, OptumInsight, and healthcare tech roles." },
              { title: "Twin Cities resume optimization", desc: "ATS scoring against Minneapolis job postings. Keyword gap analysis for healthcare, retail, and tech descriptions." },
              { title: "Salary negotiation coaching", desc: "Twin Cities comp benchmarks with Midwest vs. coastal comparisons. Know your market rate before you negotiate." },
              { title: "Medtronic and medical device prep", desc: "Interview coaching for Medtronic, Boston Scientific, and medical device engineering and operations roles." },
              { title: "Target corporate prep", desc: "Interview coaching for Target HQ corporate roles — merchandising, analytics, technology, and operations." },
              { title: "LinkedIn for MN recruiters", desc: "Optimize your LinkedIn to rank in searches by Twin Cities corporate and healthcare recruiters." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #003865 0%, #CC0033 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Twin Cities job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for Minneapolis-St. Paul&apos;s Fortune 500 ecosystem. Available 24/7, no scheduling required.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#003865]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
