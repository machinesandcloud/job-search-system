import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Atlanta 2025 — AI Career Coaching for Atlanta Georgia Professionals",
  description: "AI career coaching for Atlanta professionals. Atlanta salary benchmarks for tech, media, and finance. Resume optimization and interview prep for Delta, Coca-Cola, Home Depot, and Atlanta's top employers.",
  keywords: ["career coach atlanta", "career counselor atlanta", "atlanta career coach", "career coaching atlanta ga", "atlanta tech jobs 2025", "atlanta salary negotiation", "career coach georgia", "delta airlines career", "coca-cola career prep", "home depot interview prep"],
  alternates: { canonical: "/career-coach-atlanta" },
  openGraph: { title: "Career Coach Atlanta 2025 — AI Career Coaching for Atlanta Georgia Professionals", description: "Atlanta salary benchmarks for tech, media, and corporate HQ roles. Resume optimization and interview prep for Atlanta's top employers.", url: "/career-coach-atlanta" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries are strongest in Atlanta in 2025?", answer: "Atlanta is a diverse corporate hub with several dominant sectors: (1) Technology — Atlanta is nicknamed the 'Silicon Peach' and is home to one of the largest tech ecosystems in the Southeast. Major employers: NCR Voyix, Salesforce Atlanta, Google's expanding Atlanta office, Microsoft, and a dense fintech cluster (Fiserv, Global Payments, NCR). (2) Corporate HQs — Delta Air Lines, Coca-Cola, Home Depot, UPS, Chick-fil-A, and dozens more Fortune 500 companies are headquartered in Atlanta. (3) Media — CNN (Warner Bros. Discovery HQ for news), Tyler Perry Studios, and a growing film/TV production industry. (4) Healthcare — Emory Healthcare, Grady Health System, and the CDC (federal employer)." },
  { question: "How much do tech jobs pay in Atlanta?", answer: "Atlanta tech salaries are competitive for the Southeast but below SF/NYC/Seattle. 2025 benchmarks: Senior Software Engineer: $130,000–$210,000 TC; Data Engineer / Data Scientist: $120,000–$190,000 TC; Product Manager (Senior): $140,000–$220,000 TC; Fintech/Payments Engineer: $130,000–$200,000 TC. Georgia has a flat income tax of 5.49% (reduced from 5.75% in 2024) — better than California and New York but not the zero-tax advantage of Texas and Washington. Atlanta's cost of living is significantly below SF/NYC, making these compensation levels stretch further." },
  { question: "Is Atlanta good for fintech and payments careers?", answer: "Exceptionally so — Atlanta processes approximately 70% of all US payment transactions. The fintech cluster includes Global Payments (HQ), NCR Voyix (HQ), Fiserv Atlanta, InComm Payments, and a constellation of smaller payments and fintech companies. For software engineers and product managers with payments, fraud, or financial infrastructure experience, Atlanta is one of the best markets in the US. The competition for these roles is lower than SF, and total compensation is meaningful even if not at SF Bay Area levels. The Atlanta fintech community is relationally dense — networking through the Atlanta FinTech community events is valuable." },
  { question: "What makes Atlanta's corporate job market distinctive?", answer: "Atlanta has an unusual density of Fortune 500 company headquarters for a city its size — Delta, Coca-Cola, Home Depot, UPS, and others. These are large, mature organizations with strong benefits, but internal career mobility and compensation vary widely by division and leadership. Key insight: Atlanta's corporate market is relationship-driven, and LinkedIn networking with current employees at target companies is more impactful here than in SF's more resume-meritocratic culture. The city's HBCUs (Spelman, Morehouse, Clark Atlanta) feed strong talent pipelines into Atlanta's corporate market — understanding this community is important for hiring managers and candidates alike." },
];

const SALARIES = [
  { role: "Senior Software Engineer", company: "Google / Salesforce / NCR", range: "$130,000–$210,000 TC", note: "Below SF; lower CoL benefit" },
  { role: "Fintech / Payments Engineer", company: "Global Payments / Fiserv / NCR", range: "$130,000–$200,000 TC", note: "70% of US payments processed in ATL" },
  { role: "Product Manager (Senior)", company: "Atlanta tech companies", range: "$140,000–$220,000 TC", note: "Fintech PM premium" },
  { role: "Corporate Finance (Manager)", company: "Delta / Coca-Cola / Home Depot", range: "$90,000–$150,000", note: "Fortune 500 HQ roles" },
  { role: "Marketing Manager", company: "Coca-Cola / Delta / Media", range: "$85,000–$135,000", note: "Brand marketing strong in ATL" },
  { role: "Healthcare", company: "Emory / Grady / CDC", range: "$70,000–$130,000", note: "CDC federal roles + benefits" },
  { role: "Data Scientist", company: "Fintech / Corporate", range: "$120,000–$190,000 TC", note: "Payments data science growing fast" },
];

export default async function CareerCoachAtlantaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Atlanta 2025 — AI Career Coaching for Atlanta Georgia Professionals"
        description="Atlanta salary benchmarks for tech, media, and corporate HQ roles. Resume optimization and interview prep for Atlanta's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-atlanta`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Atlanta", url: `${BASE_URL}/career-coach-atlanta` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #B22222 50%, #D97706 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🍑 Atlanta GA · Tech · Fintech · Fortune 500 HQs
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Atlanta</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Atlanta&apos;s Silicon Peach tech scene, Fortune 500 HQ market, and fintech cluster. Resume optimization, interview prep, and salary negotiation 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Atlanta salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Greater Atlanta compensation data. Lower cost of living than SF/NYC means these salaries stretch significantly further.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range (TC)</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#B22222]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Atlanta job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Fortune 500 HQ coaching", desc: "Interview prep and resume optimization for Delta, Coca-Cola, Home Depot, and UPS corporate roles — with Atlanta corporate culture context." },
              { title: "Fintech & payments prep", desc: "Global Payments, NCR, and Fiserv interview coaching. Payments domain knowledge and technical interview preparation." },
              { title: "Atlanta resume optimization", desc: "ATS keyword scoring for Atlanta job postings in tech, fintech, and corporate functions." },
              { title: "Atlanta salary negotiation", desc: "Atlanta comp benchmarks with cost-of-living context. Know your market rate before negotiating at any Atlanta employer." },
              { title: "Media & entertainment prep", desc: "CNN, Warner Bros. Discovery, and Tyler Perry Studios interview coaching for media, content, and production roles." },
              { title: "LinkedIn for Atlanta recruiters", desc: "Headline and About section optimization for Atlanta tech, fintech, and corporate recruiter searches." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #B22222 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Atlanta job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Atlanta&apos;s tech, fintech, and Fortune 500 markets — 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#B22222]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
