import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "AI Career Coach Singapore 2025 — Career Coaching in Singapore (SGD)",
  description: "Zari is the AI career coach for Singapore's job market. Resume ATS scoring for JobStreet & LinkedIn, interview prep for MNCs and tech companies, SGD salary benchmarks, and EP/S Pass guidance.",
  keywords: ["AI career coach Singapore", "career coach Singapore", "career coaching Singapore", "online career coach Singapore", "career counselling Singapore", "job coaching Singapore", "salary negotiation Singapore", "career guidance Singapore 2025", "EP pass Singapore", "Singapore job market"],
  alternates: { canonical: "/ai-career-coach-singapore" },
  openGraph: { title: "AI Career Coach Singapore 2025 — Career Coaching for Singapore's Job Market", description: "Resume, LinkedIn, interview, and salary coaching for Singapore — JobStreet, MNCs, tech companies, and EP/S Pass roles.", url: "/ai-career-coach-singapore" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does the Singapore job market differ from other markets?", answer: "Singapore is a highly competitive, credentials-conscious market with strong MNC presence across finance, tech, consulting, and logistics. Employment Pass (EP) and S Pass holders make up a significant portion of mid-to-senior hires. Key differences: salary benchmarks are significantly higher than regional averages, government jobs (civil service, GLCs) follow structured grading systems, and Singaporean employers tend to be more formal in initial hiring than Australia or the US." },
  { question: "What salary data does Zari use for Singapore roles?", answer: "Zari benchmarks against the MOM (Ministry of Manpower) Graduate Employment Survey, industry salary surveys from MAS, IMDA, and professional associations, and market data from JobStreet and LinkedIn Singapore. Salaries in Singapore vary significantly by sector: tech at MNCs or regional HQs pays significantly more than local SMEs, and financial services at tier-1 banks (DBS, UOB, OCBC, global banks) command premiums." },
  { question: "Does Zari help with EP/S Pass salary thresholds?", answer: "Yes. Singapore's Employment Pass requires minimum qualifying salaries that change annually (currently S$5,000/month for most sectors, higher for financial services). When negotiating offers as an EP holder, the qualifying threshold is a floor, not a target. Zari's salary coaching helps you understand the market rate above that floor and negotiate accordingly without jeopardising your pass approval." },
  { question: "What job boards should I use to find jobs in Singapore?", answer: "JobStreet Singapore and LinkedIn are the primary platforms. MyCareersFuture (government-linked, Singapore citizens and PRs priority) is important for roles that qualify for local candidate preferences. JobsDB covers some sectors. For finance roles, eFinancialCareers is active. For government and GLC roles, individual ministry and agency career pages are the primary source." },
];

export default async function AICareerCoachSingaporePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach Singapore", url: `${BASE_URL}/ai-career-coach-singapore` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #EF3340 0%, #0D1B2A 45%, #FFFFFF 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                🇸🇬 AI Career Coach — Singapore
              </div>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
                AI Career Coach<br />
                <span className="text-white/50">Built for Singapore.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[16px] leading-7 text-white/55">
                Resume coaching for MNCs and tech companies. SGD salary benchmarks. EP/S Pass guidance. Interview prep for Singapore&apos;s most competitive roles — available 24/7, no scheduling.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#EF3340]">Start free — no credit card</Link>
                <Link href="/ai-career-coach" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">Learn more →</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[340px] lg:flex-shrink-0">
              {[
                { v: "S$SGD", l: "salary benchmarks by role" },
                { v: "EP", l: "Employment Pass salary guidance" },
                { v: "MNC", l: "interview coaching for global firms" },
                { v: "24/7", l: "available — no scheduling wait" },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
                  <div className="text-[1.6rem] font-extrabold leading-none">{v}</div>
                  <div className="mt-1 text-[10px] text-white/40 leading-4">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={6} label="coaching surfaces: resume, LinkedIn, interview, salary, promotion, career strategy" accent="#EF3340" />
            <StatCard value={89} suffix="%" label="of users improve their ATS score in first session" accent="#0D7182" />
            <StatCard value={10} label="minutes to first actionable output — no scheduling needed" accent="#059669" />
            <StatCard value={29} label="per month — fraction of Singapore career coaching rates" accent="#7C3AED" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Singapore salary benchmarks 2025 (S$ / year)</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="col-span-2">Role</span><span>Local company / SME</span><span>MNC / Regional HQ</span>
            </div>
            {[
              { role: "Software Engineer (3–5 yrs)", local: "S$70–95k", mnc: "S$95–140k" },
              { role: "Senior SWE / Tech Lead", local: "S$95–130k", mnc: "S$130–200k" },
              { role: "Product Manager", local: "S$90–120k", mnc: "S$120–180k" },
              { role: "Data Scientist", local: "S$75–105k", mnc: "S$105–155k" },
              { role: "Investment Banking Analyst", local: "S$80–110k", mnc: "S$100–160k" },
              { role: "Management Consultant (Big 4)", local: "S$65–90k", mnc: "S$70–100k" },
              { role: "Marketing Manager", local: "S$65–90k", mnc: "S$90–130k" },
            ].map(({ role, local, mnc }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="col-span-2 font-bold">{role}</span>
                <span className="text-[var(--muted)]">{local}</span>
                <span className="font-semibold text-[#EF3340]">{mnc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Common questions</h2>
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

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #EF3340 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">Career coaching for Singapore — available now.</h2>
          <p className="mb-8 text-[15px] text-white/55">No scheduling. No commute. SGD salary benchmarks, MNC interview prep, and LinkedIn coaching for Singapore&apos;s most competitive roles.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#EF3340]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
