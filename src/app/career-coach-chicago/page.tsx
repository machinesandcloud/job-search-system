import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Chicago 2025 — AI Career Coaching for Chicago Professionals",
  description: "AI career coaching for Chicago professionals. Chicago salary benchmarks for finance, consulting, healthcare, and tech. Resume optimization and interview prep for Chicago jobs.",
  keywords: ["career coach chicago", "career counselor chicago", "chicago career coach", "career coaching chicago", "career coach illinois", "executive career coach chicago", "chicago job search 2025", "chicago salary negotiation", "career coach loop chicago", "chicago career counseling"],
  alternates: { canonical: "/career-coach-chicago" },
  openGraph: { title: "Career Coach Chicago 2025 — AI Career Coaching for Chicago Professionals", description: "Chicago salary benchmarks for finance, consulting, and healthcare. Resume optimization and interview prep for the Chicago market.", url: "/career-coach-chicago" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries are strongest in Chicago in 2025?", answer: "Chicago has a diversified economy anchored by: Financial services (CME Group, Chicago trading firms like Citadel and DRW, Northern Trust, Morningstar, Discover Financial), Management consulting (McKinsey Chicago, BCG, Bain, Accenture HQ), Healthcare (Northwestern Medicine, Rush University Medical Center, Abbott, AbbVie), Technology (Salesforce Chicago, McDonald's tech hub, Grubhub, Groupon, United Airlines tech), Manufacturing and industrial (Boeing's headquarters moved to Arlington, VA but still major IL presence), and Retail (Walgreens Boots Alliance, Kraft Heinz). Chicago is the third-largest US city for headquarters of Fortune 500 companies." },
  { question: "What are typical salaries in Chicago?", answer: "Chicago salaries are competitive — below NYC/SF for most roles but with significantly lower cost of living. 2025 benchmarks: Software Engineer (Senior): $140,000–$220,000 TC; Quant/Algo Trader at prop firms (Citadel, DRW): $200,000–$800,000+ TC; Management Consultant (Associate/MBB): $100,000–$140,000 base; Healthcare (RN at Northwestern): $80,000–$115,000; Finance/Accounting (Manager): $90,000–$140,000; Marketing Manager: $80,000–$125,000. Note: Illinois has a flat income tax rate (4.95%) — more favorable than California or New York for high earners." },
  { question: "Is Chicago good for tech jobs?", answer: "Chicago is a growing but underrated tech market. Key hubs: the Merchandise Mart tech corridor (Google Chicago office, Braintree, Outcome Health), the River North startup ecosystem, and corporate tech roles at major Chicago HQ companies. Compared to SF/NYC, competition is lower and cost of living is significantly better — a $160,000 SWE salary in Chicago goes considerably further than the same in San Francisco. The tradeoff: fewer very high-TC FAANG-style roles, though Google, Salesforce, and Morningstar all have substantial Chicago tech offices." },
  { question: "What makes Chicago finance different from Wall Street?", answer: "Chicago is the home of derivatives and quantitative trading — a different financial world from New York's investment banking focus. The Chicago Board Options Exchange (CBOE), CME Group, and a dense cluster of proprietary trading firms (Citadel Securities, DRW, Jump Trading, IMC Financial Markets) create a quant-heavy finance ecosystem. These firms pay among the highest total compensation in the US for math/CS/physics PhDs and quantitative analysts. The interview process is heavily technical — probability, statistics, and fast mental math are standard. Traditional banking roles exist (Northern Trust, Baird) but are not Chicago's primary financial identity." },
];

const SALARIES = [
  { role: "Quant Trader / Analyst", company: "Citadel / DRW / Jump Trading", range: "$200,000–$800,000+ TC", note: "Highest variance in US finance" },
  { role: "Senior Software Engineer", company: "Salesforce / Morningstar / Grubhub", range: "$140,000–$220,000 TC", note: "Lower than SF, better CoL ratio" },
  { role: "Management Consultant", company: "McKinsey / BCG / Accenture", range: "$100,000–$165,000 base", note: "Post-MBA Associate level" },
  { role: "Finance Manager / Controller", company: "Northern Trust / Discover", range: "$90,000–$140,000", note: "Strong supply of finance talent" },
  { role: "Healthcare (RN)", company: "Northwestern / Rush / Abbott", range: "$80,000–$115,000", note: "Below NY/CA nursing rates" },
  { role: "Marketing Manager", company: "Kraft Heinz / Walgreens / McDonald's", range: "$80,000–$125,000", note: "Strong CPG marketing market" },
  { role: "Data Scientist", company: "Tech / Finance", range: "$110,000–$175,000", note: "Growing demand from quant firms" },
];

export default async function CareerCoachChicagoPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Chicago 2025 — AI Career Coaching for Chicago Professionals"
        description="Chicago salary benchmarks for finance, consulting, and healthcare. Resume optimization and interview prep for the Chicago market."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-chicago`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Chicago", url: `${BASE_URL}/career-coach-chicago` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🏙️ Chicago · Finance · Consulting · Healthcare
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Chicago</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Chicago&apos;s finance, consulting, healthcare, and tech markets. Salary negotiation, resume optimization, and interview prep — available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Chicago salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Chicago compensation data. Illinois flat income tax (4.95%) is advantageous vs CA/NY for high earners.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#1E3A5F]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Chicago job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Quant finance interview prep", desc: "Probability, statistics, and mental math drills for Citadel, DRW, Jump Trading, and CME Group quantitative roles." },
              { title: "Chicago resume optimization", desc: "ATS scoring for Chicago job postings across finance, consulting, and healthcare. Keyword gap analysis included." },
              { title: "Consulting case interview prep", desc: "McKinsey, BCG, Bain, and Accenture case interview practice with Chicago-specific market context." },
              { title: "Salary negotiation", desc: "Chicago comp benchmarks built in. Know your market rate at Chicago's top employers before you negotiate." },
              { title: "LinkedIn for Chicago recruiters", desc: "Headline and About section optimization for Chicago finance, consulting, and healthcare recruiter searches." },
              { title: "Healthcare career coaching", desc: "Northwestern Medicine, Rush, Abbott, and AbbVie interview prep and resume optimization." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Chicago job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Chicago&apos;s finance, consulting, and healthcare markets — 24/7, no scheduling required.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1E3A5F]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
