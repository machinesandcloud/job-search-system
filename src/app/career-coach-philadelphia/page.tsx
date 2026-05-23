import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Philadelphia 2025 — AI Career Coaching for Philadelphia Professionals",
  description: "AI career coaching for Philadelphia professionals. Philadelphia salary benchmarks for healthcare, pharma, finance, and tech. Resume optimization and interview prep for Penn Medicine, GSK, and Philly's top employers.",
  keywords: ["career coach philadelphia", "career counselor philadelphia", "philadelphia career coach", "career coaching philly", "philadelphia healthcare jobs", "pharma career coach philadelphia", "penn medicine career", "gsk interview prep", "philadelphia salary negotiation", "philly tech jobs"],
  alternates: { canonical: "/career-coach-philadelphia" },
  openGraph: { title: "Career Coach Philadelphia 2025 — AI Career Coaching for Philadelphia Professionals", description: "Philadelphia salary benchmarks for healthcare, pharma, and finance. Interview prep for Penn Medicine, GSK, and Philly's top employers.", url: "/career-coach-philadelphia" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries are strongest in Philadelphia?", answer: "Philadelphia's economy is anchored by three world-class sectors: (1) Healthcare and life sciences — Penn Medicine, Jefferson Health, Children's Hospital of Philadelphia (CHOP), Temple Health, and Drexel Medicine form one of the largest medical corridors in the US. The University City Science Center is a life sciences hub. (2) Pharmaceutical and biotech — GSK (North American HQ in Upper Merion), Merck (HQ in Kenilworth NJ, but large Philly metro presence), Johnson & Johnson (NJ but accessible), and dozens of CROs and pharma services companies. (3) Finance and professional services — Vanguard (HQ Valley Forge), BlackRock (significant Philly presence), and a strong legal market. Technology is growing, with Comcast HQ a major employer." },
  { question: "How much do healthcare jobs pay in Philadelphia?", answer: "Philadelphia's healthcare compensation is strong, driven by the density and prestige of its health systems. 2025 benchmarks: Physician (employed, various specialties): $200,000–$500,000+; Advanced Practice Provider (NP/PA): $110,000–$170,000; Registered Nurse (RN): $80,000–$120,000; Healthcare IT/Informatics: $100,000–$160,000; Clinical Research Coordinator (pharma/CRO): $60,000–$100,000; Pharmaceutical Sales Representative: $80,000–$130,000 total comp; Pharma R&D (PhD Scientist): $95,000–$150,000. Pennsylvania has a flat income tax of 3.07% — one of the lowest in the Northeast, meaningfully better than New York." },
  { question: "Is Philadelphia good for pharma and biotech careers?", answer: "Exceptionally so. The Philadelphia–New Jersey biopharma corridor is one of the largest in the world, second only to the Boston/Cambridge cluster. GSK North American HQ is in Upper Merion, PA; Merck is 20 miles away in Kenilworth NJ; Johnson & Johnson is in New Brunswick NJ. Within Philadelphia itself, the University City Science Center and the Navy Yard development have attracted numerous biotech and CRO companies. Roles at major pharma companies (clinical development, regulatory affairs, R&D, commercial) are concentrated in this corridor. For professionals considering Boston vs Philly for pharma, Philly has lower cost of living and comparable opportunity at mature pharma companies — Boston has more early-stage biotech." },
  { question: "What finance roles are based in Philadelphia?", answer: "Philadelphia is strongest in asset management and fund administration, not investment banking (which is dominated by New York). Vanguard (HQ Valley Forge) is the world's second-largest asset manager — it employs thousands in investment management, technology, operations, and client services. The Philadelphia area also has SEI Investments, Lincoln Financial Group (HQ Radnor), and a cluster of independent RIAs and family offices. For professionals interested in passive investing, fund operations, or investment technology, Vanguard is one of the best employers in the world. However, it's important to note that Vanguard's culture is distinctly non-profit-driven in its ethos — compensation is competitive but not Wall Street aggressive." },
];

const SALARIES = [
  { role: "Registered Nurse (RN)", company: "Penn Medicine / CHOP / Jefferson", range: "$80,000–$120,000", note: "Philadelphia premium over national avg" },
  { role: "Pharma R&D Scientist (PhD)", company: "GSK / Merck / CRO", range: "$95,000–$150,000", note: "Plus equity at biotech; stock at pharma" },
  { role: "Asset Management Analyst", company: "Vanguard / SEI / Lincoln Fin", range: "$80,000–$140,000 base", note: "Vanguard culture: stable, collaborative" },
  { role: "Software Engineer", company: "Comcast / Vanguard Tech / Startup", range: "$120,000–$195,000 TC", note: "Growing tech market; below NYC/SF" },
  { role: "Clinical Research (CRO)", company: "ICON / Syneos / PPD (Thermo)", range: "$60,000–$100,000", note: "CRO market large in PA" },
  { role: "Pharma Commercial (Sales/Mktg)", company: "GSK / J&J / AstraZeneca", range: "$80,000–$160,000 TC", note: "Sales includes territory bonus" },
  { role: "Healthcare IT / Informatics", company: "Epic implementations / Health sys", range: "$100,000–$160,000", note: "Strong demand from large health systems" },
];

export default async function CareerCoachPhiladelphiaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Philadelphia 2025 — AI Career Coaching for Philadelphia Professionals"
        description="Philadelphia salary benchmarks for healthcare, pharma, and finance. Interview prep for Penn Medicine, GSK, and Philly's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-philadelphia`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Philadelphia", url: `${BASE_URL}/career-coach-philadelphia` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #004C97 50%, #A8996E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🦅 Philadelphia PA · Healthcare · Pharma · Finance
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Philadelphia</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Philadelphia&apos;s healthcare, pharma, and asset management markets. Penn Medicine, GSK, and Vanguard interview prep — salary negotiation and resume optimization 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Philadelphia salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Philadelphia metro compensation data. PA flat income tax (3.07%) is one of the lowest in the Northeast.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#004C97]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Philadelphia job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Healthcare resume optimization", desc: "Penn Medicine, CHOP, Jefferson, and Drexel Health ATS-optimized resume and cover letter writing." },
              { title: "Pharma career coaching", desc: "GSK, Merck, J&J, and CRO interview coaching — clinical development, regulatory, commercial, and R&D roles." },
              { title: "Vanguard & asset management prep", desc: "Vanguard, SEI Investments, and Lincoln Financial interview preparation — investment ops, technology, and client services." },
              { title: "Philadelphia salary negotiation", desc: "Philly market comp benchmarks with PA low-income-tax context and Northeast cost-of-living comparison." },
              { title: "Academic medical center prep", desc: "Penn, Jefferson, Temple, and Drexel academic medical center interview coaching and career transition support." },
              { title: "LinkedIn for Philly recruiters", desc: "Headline and About section optimization for Philadelphia healthcare, pharma, and finance recruiter searches." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #004C97 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Philadelphia job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Philadelphia&apos;s healthcare, pharma, and finance markets — 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#004C97]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
