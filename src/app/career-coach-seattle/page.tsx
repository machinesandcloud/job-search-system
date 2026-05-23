import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Seattle 2025 — AI Career Coaching for Seattle Professionals",
  description: "AI career coaching for Seattle professionals. Amazon and Microsoft interview prep, Seattle salary benchmarks, and resume optimization for tech, aerospace, and healthcare roles.",
  keywords: ["career coach seattle", "career counselor seattle", "seattle career coach", "career coaching seattle", "amazon interview prep", "microsoft interview prep", "seattle tech jobs 2025", "seattle salary negotiation", "career coach bellevue", "seattle job search"],
  alternates: { canonical: "/career-coach-seattle" },
  openGraph: { title: "Career Coach Seattle 2025 — AI Career Coaching for Seattle Professionals", description: "Amazon and Microsoft interview prep, Seattle salary benchmarks, and tech career coaching for the Seattle market.", url: "/career-coach-seattle" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the top employers in Seattle in 2025?", answer: "Seattle is dominated by two tech giants: Amazon (largest private employer in Seattle, HQ in South Lake Union) and Microsoft (Redmond campus, 50,000+ employees in greater Seattle). Beyond these: Boeing (historic employer, reduced since HQ move to Arlington, VA), Expedia Group, Zillow, Starbucks HQ, Costco HQ (Issaquah), T-Mobile (Bellevue), Alaska Airlines, Swedish Health Services, and a thriving startup ecosystem including Convoy, Remitly, and Outreach. Google, Meta, and Salesforce all have large Seattle offices. No state income tax in Washington — significant compensation advantage over California." },
  { question: "How do I prepare for an Amazon interview in Seattle?", answer: "Amazon interviews are uniquely heavy on behavioral questions tied to Amazon's 16 Leadership Principles (LPs). Every behavioral question maps to one or more LPs — and interviewers are explicitly scoring you against them. Key prep: (1) Prepare 6–8 STAR stories that cover multiple LPs, especially Customer Obsession, Dive Deep, Ownership, and Deliver Results. (2) For SWE roles: 2–3 LeetCode coding rounds, system design, and operational excellence questions. (3) For PM roles: customer-focused product design questions, metrics/data analysis, and LP behavioral rounds. (4) The 'bar raiser' round is a Amazon-specific calibration interview — they can veto even if all other interviewers pass you." },
  { question: "What is the no-income-tax advantage for Seattle salaries?", answer: "Washington State has no personal income tax — zero. For a $200,000 TC role in Seattle vs. the same role in San Francisco, the after-tax difference is roughly $25,000–$35,000/year (the difference between California's ~13% top rate and zero). For Amazon or Microsoft employees with $300,000+ TC, the after-tax advantage vs. a California role is $35,000–$50,000+/year. This is why many tech professionals prefer Seattle/Bellevue for high-TC tech roles when comparing to SF Bay Area equivalents. The cost of living is also lower than SF, though it has risen significantly since 2018." },
  { question: "How competitive is the Seattle tech job market in 2025?", answer: "Highly competitive for the top roles, but significantly less saturated than SF Bay Area. Amazon and Microsoft both have large hiring volumes — they recruit at scale and hire thousands of engineers annually, creating more opportunities than many people realize. Key insight: Amazon and Microsoft are large enough that many teams operate independently — two Amazon SWE roles with identical titles can have very different cultures, scopes, and leveling standards. Research specific teams, not just the company. Seattle also has a more affordable and less congested living environment than SF, which retains talent — making it worth targeting over a pure SF search for many professionals." },
];

const SALARIES = [
  { role: "Senior SWE (SDE III / L5)", company: "Amazon / Microsoft", range: "$180,000–$320,000 TC", note: "Amazon RSU-heavy; MSFT options" },
  { role: "Principal Engineer (L6/L7)", company: "Amazon / Microsoft", range: "$300,000–$500,000+ TC", note: "No state income tax advantage" },
  { role: "Senior Product Manager", company: "Amazon / Expedia / Zillow", range: "$170,000–$280,000 TC", note: "Amazon PM bands are well-defined" },
  { role: "Data Scientist / MLE", company: "Amazon / Microsoft / Convoy", range: "$170,000–$300,000 TC", note: "AWS ML roles especially strong" },
  { role: "Boeing (Aerospace Eng)", company: "Boeing / Blue Origin", range: "$100,000–$180,000", note: "Below market; mission-driven" },
  { role: "Healthcare (RN)", company: "Swedish / UW Medicine", range: "$80,000–$120,000", note: "Strong Seattle healthcare system" },
  { role: "Marketing Manager", company: "Starbucks / T-Mobile / Costco", range: "$90,000–$140,000", note: "Retail/CPG strong in PNW" },
];

export default async function CareerCoachSeattlePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Seattle 2025 — AI Career Coaching for Seattle Professionals"
        description="Amazon and Microsoft interview prep, Seattle salary benchmarks, and tech career coaching for the Seattle market."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-seattle`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Seattle", url: `${BASE_URL}/career-coach-seattle` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #232F3E 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🌲 Seattle · Amazon · Microsoft · No State Income Tax
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Seattle</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Seattle&apos;s tech market — Amazon and Microsoft interview prep, Leadership Principles coaching, and salary negotiation with no-state-tax context.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Seattle salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Washington State has no personal income tax — a significant after-tax advantage over California or New York roles at the same gross TC.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range (TC)</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#0D7182]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Seattle job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Amazon LP interview prep", desc: "Leadership Principles behavioral coaching — 6–8 STAR stories mapped to Amazon's 16 LPs. Bar raiser round preparation included." },
              { title: "Microsoft interview prep", desc: "Microsoft coding rounds, system design, and culture-fit interviews. STAR-format behavioral coaching aligned to Microsoft's values." },
              { title: "Seattle resume optimization", desc: "ATS keyword scoring for Amazon, Microsoft, and Seattle startup job postings with leveling vocabulary (SDE II, SDE III, SDE Principal)." },
              { title: "No-tax salary analysis", desc: "After-tax compensation comparison between Seattle, San Francisco, and New York roles — the real-dollar advantage of WA's no-income-tax policy." },
              { title: "AWS cloud career coaching", desc: "AWS certifications strategy, solutions architect interview prep, and cloud engineering career pathing." },
              { title: "LinkedIn for Seattle recruiters", desc: "Headline and About section optimization for Amazon and Microsoft internal recruiters and third-party Seattle tech recruiters." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #232F3E 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your Seattle tech role with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Amazon LP coaching, Microsoft interview prep, and Seattle salary negotiation — available 24/7.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#232F3E]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
