import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Dallas 2025 — AI Career Coaching for Dallas Texas Professionals",
  description: "AI career coaching for Dallas professionals. Dallas salary benchmarks for tech, finance, telecom, and healthcare. Resume optimization and interview prep for AT&T, Texas Instruments, and Dallas's top employers.",
  keywords: ["career coach dallas", "career counselor dallas", "dallas career coach", "career coaching dallas tx", "dallas tech jobs 2025", "dallas salary negotiation", "at&t career coaching", "texas instruments interview", "dallas finance career", "dfw career coach"],
  alternates: { canonical: "/career-coach-dallas" },
  openGraph: { title: "Career Coach Dallas 2025 — AI Career Coaching for Dallas Texas Professionals", description: "Dallas salary benchmarks for tech, finance, and telecom. Interview prep for AT&T, Texas Instruments, and Dallas's top employers.", url: "/career-coach-dallas" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries dominate Dallas's job market?", answer: "Dallas-Fort Worth is one of the most economically diverse major markets in the US. Key sectors: (1) Technology — AT&T HQ (Dallas), Texas Instruments HQ (Dallas), McKesson HQ (Irving), Oracle has a major presence in Austin but many Dallas-area roles. The Toyota and State Farm corporate relocations brought large non-tech corporate tech teams. (2) Finance and banking — JPMorgan Chase's largest US campus outside NYC is in Plano; Goldman Sachs has a major Dallas operations center; Charles Schwab relocated HQ to Westlake (DFW area). (3) Healthcare — Tenet Healthcare HQ, Baylor Scott & White, UT Southwestern Medical Center. (4) Energy — smaller than Houston but significant, with Pioneer Natural Resources, Oncor, and Vistra Energy." },
  { question: "How much do tech jobs pay in Dallas?", answer: "Dallas tech salaries are competitive — similar to Austin but with a larger enterprise and telecom component. 2025 benchmarks: Senior Software Engineer: $130,000–$210,000 TC; Semiconductor Engineer at Texas Instruments: $110,000–$175,000; Telecom Engineer at AT&T: $100,000–$160,000; Data Scientist: $110,000–$175,000; Finance Tech at JPMorgan/Goldman: $130,000–$220,000 TC. Texas has no state income tax — your take-home is meaningfully higher than equivalent California or New York salaries. Dallas has overtaken Austin in absolute corporate job volume, though Austin has more startup activity." },
  { question: "Is Dallas good for finance and banking careers?", answer: "Yes — and it's underrated as a finance hub. JPMorgan Chase has its largest US operational campus in Plano, employing thousands in technology, operations, risk, and compliance. Goldman Sachs's Dallas office is one of its largest globally. Charles Schwab relocated its headquarters from San Francisco to Westlake, TX. AT&T's finance function (treasury, M&A, FP&A) is headquartered in Dallas. The finance talent pool benefits from the same no-state-income-tax advantage that draws employers to Texas. For mid-to-back-office finance roles, Dallas is one of the best markets in the US outside New York — lower cost of living, no state taxes, and a growing employer base." },
  { question: "How does Dallas compare to Austin for tech jobs?", answer: "Dallas and Austin serve different tech job profiles. Austin has more startups, venture-backed companies, and disruptive tech (Tesla, Oracle relocated HQ, Silicon Hills). Dallas has more enterprise tech, Fortune 500 corporate technology roles, and financial technology. For professionals seeking stable, well-compensated corporate tech roles at large organizations, Dallas often wins on comp — JPMorgan's Dallas tech roles frequently pay better than Austin startup equivalents. Dallas is also more established and less volatile than Austin's boom-and-bust startup cycle. The Dallas–Fort Worth metro has 7.8 million people vs Austin's 2.4 million — a much larger talent market and job base." },
];

const SALARIES = [
  { role: "Senior Software Engineer", company: "JPMorgan / AT&T / Oracle DFW", range: "$130,000–$210,000 TC", note: "Enterprise tech dominant in DFW" },
  { role: "Semiconductor Engineer", company: "Texas Instruments HQ", range: "$110,000–$175,000", note: "TI pays below FAANG; great WLB" },
  { role: "Finance Tech (SWE / Analyst)", company: "Goldman Sachs / JPMorgan Chase", range: "$130,000–$220,000 TC", note: "GS Dallas growing fast" },
  { role: "Data Scientist", company: "Finance / Healthcare / Telecom", range: "$110,000–$175,000 TC", note: "Strong in financial services" },
  { role: "Healthcare (RN)", company: "UT Southwestern / Baylor S&W", range: "$70,000–$105,000", note: "Texas nursing below CA/NY rates" },
  { role: "Telecom Engineer", company: "AT&T HQ / T-Mobile", range: "$100,000–$160,000", note: "AT&T HQ in Dallas" },
  { role: "Product Manager", company: "Tech / Fintech / Corporate", range: "$120,000–$200,000 TC", note: "Growing PM market in DFW" },
];

export default async function CareerCoachDallasPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Dallas 2025 — AI Career Coaching for Dallas Texas Professionals"
        description="Dallas salary benchmarks for tech, finance, and telecom. Interview prep for AT&T, Texas Instruments, and Dallas's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-dallas`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Dallas", url: `${BASE_URL}/career-coach-dallas` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0369A1 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            ⭐ Dallas TX · Tech · Finance · No State Income Tax
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Dallas</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Dallas&apos;s enterprise tech, financial services, and telecom markets. AT&T, JPMorgan, and Texas Instruments interview prep — salary negotiation 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Dallas salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Texas has no state income tax. Dallas is a large, diverse market with competitive enterprise tech and finance compensation.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range (TC)</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#0369A1]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Dallas job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Enterprise tech interview prep", desc: "AT&T, Texas Instruments, McKesson, and JPMorgan Dallas interview coaching — technical and non-technical roles." },
              { title: "Finance & banking prep", desc: "JPMorgan Chase, Goldman Sachs, and Charles Schwab Dallas interview coaching for technology, operations, and finance roles." },
              { title: "Dallas resume optimization", desc: "ATS keyword scoring for Dallas enterprise tech, finance, and healthcare job postings." },
              { title: "Dallas salary negotiation", desc: "DFW market comp benchmarks with Texas no-state-tax take-home analysis and enterprise vs startup comp comparison." },
              { title: "Corporate relocation strategy", desc: "For professionals following Toyota, Schwab, or other corporate relocations to DFW — navigating the local market as a newcomer." },
              { title: "LinkedIn for Dallas recruiters", desc: "Headline and About section optimization for DFW enterprise tech, finance, and telecom recruiter searches." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0369A1 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Dallas job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Dallas&apos;s tech, finance, and telecom markets — 24/7, no scheduling required.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0369A1]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
