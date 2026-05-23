import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Canada Salary Guide 2025 — Tech & Professional Salaries in CAD",
  description: "Comprehensive Canadian salary guide for tech, finance, and professional roles in 2025. Salary data in CAD by city (Toronto, Vancouver, Calgary, Montréal) with negotiation tactics.",
  keywords: ["Canada salary guide", "Canadian salary 2025", "tech salary Canada", "salary in Canada CAD", "software engineer salary Canada", "product manager salary Canada", "Toronto salary", "Vancouver salary", "salary negotiation Canada"],
  alternates: { canonical: "/blog/canada-salary-guide" },
  openGraph: { title: "Canada Salary Guide 2025 — Tech & Professional Roles in CAD", description: "CAD salary data by city and role, with negotiation tactics for the Canadian market.", url: "/blog/canada-salary-guide" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the average tech salary in Canada?", answer: "The average software engineer salary in Canada is approximately CA$105,000–CA$130,000 for mid-level roles and CA$130,000–CA$165,000 for senior roles, varying significantly by city. Toronto and Vancouver command the highest salaries (10–15% above the national average), while Montréal is 15–20% below the national tech average but has a much lower cost of living." },
  { question: "How do Canadian tech salaries compare to US salaries?", answer: "Canadian tech salaries are approximately 30–50% lower than equivalent US salaries in absolute dollar terms (even accounting for CAD/USD exchange rate). A senior software engineer earning CA$160,000 in Toronto would typically earn USD $200,000–$250,000 at an equivalent US employer. This gap narrows significantly when accounting for Canada's healthcare, work-life balance, and lower cost of living outside major cities." },
  { question: "Is it worth negotiating salary in Canada?", answer: "Yes — 62% of Canadian hiring managers expect negotiation. The average negotiation gap (difference between first offer and final offer for candidates who negotiate) is CA$8,000–CA$15,000 for professional roles. Anchor at the 75th percentile for your role and city using market data. Use the data to justify the ask, not leverage or ultimatums." },
  { question: "What is the best salary resource for Canadian jobs?", answer: "The most reliable Canadian salary data sources in 2025 are: Levels.fyi (best for tech — actual compensation data), LinkedIn Salary (broad coverage), Glassdoor (company-specific ranges), and the Government of Canada Job Bank salary tool (free, government-maintained). For negotiation benchmarks, combine at least two sources before making your ask." },
];

const CITY_DATA = [
  { city: "Toronto", province: "ON", flag: "🏙️", swe: "CA$109K", pm: "CA$133K", ds: "CA$107K", note: "Canada's largest tech market. Most competitive, highest salaries.", href: "/salary/software-engineer-salary-toronto" },
  { city: "Vancouver", province: "BC", flag: "🌲", swe: "CA$100K", pm: "CA$122K", ds: "CA$99K", note: "Strong Amazon/Microsoft presence. High cost of living.", href: "/salary/software-engineer-salary-vancouver" },
  { city: "Calgary", province: "AB", flag: "⛽", swe: "CA$92K", pm: "CA$112K", ds: "CA$91K", note: "No provincial income tax — highest net take-home in Canada.", href: "/salary/software-engineer-salary-calgary" },
  { city: "Montréal", province: "QC", flag: "⚜️", swe: "CA$85K", pm: "CA$103K", ds: "CA$85K", note: "Global AI hub (Mila). Lower salaries, much lower cost of living.", href: "/salary/software-engineer-salary-montreal" },
];

export default async function CanadaSalaryGuidePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Canada Salary Guide 2025" description="CAD salary benchmarks by role and city, with negotiation tactics for the Canadian job market." url={`${BASE_URL}/blog/canada-salary-guide`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Canada Salary Guide", url: `${BASE_URL}/blog/canada-salary-guide` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #9B1D20 0%, #C8202A 40%, #1A1A2E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">🇨🇦 Canada Guide</span>
            <span className="text-[12px] text-white/35">12 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Canada Salary Guide 2025:<br /><span className="text-white/55">Tech & Professional Pay in CAD</span></h1>
          <p className="mt-5 text-[15px] leading-7 text-white/50">Salary data in CAD by city (Toronto, Vancouver, Calgary, Montréal) across 20+ roles — with negotiation tactics for the Canadian market.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={62} suffix="%" label="of Canadian hiring managers expect salary negotiation" accent="#9B1D20" />
            <StatCard value={12} suffix="K" label="average CA$ gained per negotiation for professional roles" accent="#0D7182" />
            <StatCard value={30} suffix="–50%" label="lower in absolute terms vs equivalent US salaries" accent="#7C3AED" />
            <StatCard value={11} suffix="%" label="employer superannuation contribution (Canada Pension Plan)" accent="#059669" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15px] leading-8 text-[var(--muted)]">

          <h2 className="!mt-4 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Canadian salaries by city — 2025 snapshot</h2>
          <p>Mid-level Software Engineer base salary in CAD, reflecting the city&apos;s demand and cost-of-living premium.</p>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">City</th>
                  <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">SWE Senior</th>
                  <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">PM Senior</th>
                  <th className="px-5 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Data Scientist</th>
                </tr>
              </thead>
              <tbody>
                {CITY_DATA.map((row, i) => (
                  <tr key={row.city} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--bg)]/50" : "bg-white"}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{row.flag}</span>
                        <div>
                          <p className="font-bold text-[var(--ink)]">{row.city}</p>
                          <p className="text-[11px] text-[var(--muted)]">{row.province}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-extrabold text-[#4361EE]">{row.swe}</td>
                    <td className="px-4 py-4 text-right font-medium text-[var(--ink)]">{row.pm}</td>
                    <td className="px-5 py-4 text-right font-medium text-[var(--ink)]">{row.ds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CITY_DATA.map((c) => (
              <div key={c.city} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{c.flag}</span>
                  <div>
                    <p className="font-extrabold text-[var(--ink)]">{c.city}</p>
                    <p className="text-[11px] text-[var(--muted)]">{c.province} · Senior SWE median: <strong className="text-[#4361EE]">{c.swe}</strong></p>
                  </div>
                </div>
                <p className="text-[13px] leading-6">{c.note}</p>
                <Link href={c.href} className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#4361EE] hover:underline">
                  Full salary guide →
                </Link>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Canadian salary vs US salary — the real comparison</h2>
          <p>The direct comparison often discourages Canadian job seekers — but it misses important context:</p>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-4">
            {[
              { factor: "Healthcare", canada: "Universal healthcare (OHIP, MSP, etc.) — employer does not fund", us: "Employer-sponsored health insurance typically valued at $8,000–$15,000/yr" },
              { factor: "Parental leave", canada: "Up to 18 months government-funded at 55% of salary (EI)", us: "No federal mandate — varies by employer, often 6–12 weeks paid" },
              { factor: "Vacation", canada: "Minimum 2 weeks mandated; most professional roles offer 3–4 weeks", us: "No federal minimum — averages 10–15 days for professional roles" },
              { factor: "Tax rate (Ontario)", canada: "Combined federal + provincial: ~36% at CA$120K", us: "Combined federal + state: ~32% at USD $150K (varies by state)" },
              { factor: "Cost of living", canada: "Toronto/Vancouver expensive; other cities 20–40% cheaper than US equivalents", us: "SF/NYC comparable to Toronto/Vancouver; mid-size US cities 10–20% cheaper" },
            ].map((row) => (
              <div key={row.factor} className="grid grid-cols-[120px_1fr_1fr] gap-3 text-[13px]">
                <span className="font-bold text-[var(--ink)]">{row.factor}</span>
                <span className="text-[#9B1D20]">🇨🇦 {row.canada}</span>
                <span className="text-[var(--muted)]">🇺🇸 {row.us}</span>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">How to negotiate your Canadian salary</h2>
          <div className="space-y-3">
            {[
              { step: "Research your 75th percentile", detail: "Use Levels.fyi (tech), LinkedIn Salary, and Glassdoor. Find the 75th percentile for your role, level, and city in CAD. This is your anchor number." },
              { step: "Reference Canadian market data explicitly", detail: "Say: 'Based on Levels.fyi and LinkedIn salary data for senior software engineers in Toronto, the market range is CA$145K–CA$175K. I&apos;m targeting the upper end at CA$170K given [specific value you bring].'." },
              { step: "Don&apos;t forget the full package", detail: "Beyond base: sign-on bonus, RRSP matching (typically 3–5% of salary), stock options, extra vacation days, remote flexibility. All are negotiable at most Canadian employers." },
              { step: "Alberta negotiation tip", detail: "Alberta has no provincial income tax. If you&apos;re comparing a Calgary role to a Toronto role, your effective take-home on CA$120K in Calgary equals approximately CA$130K in Toronto. Use this when comparing competing offers." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#9B1D20] text-[10px] font-bold text-white mt-0.5">→</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.step}</p>
                  <p className="mt-1 text-[13px] leading-6" dangerouslySetInnerHTML={{ __html: item.detail }} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Frequently asked questions</h2>
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#9B1D20]/20 bg-[#9B1D20]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice negotiating your Canadian salary — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari runs live salary negotiation simulations with realistic Canadian employer pushback — in CAD. Free first session.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl px-8 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#9B1D20" }}>
              Practice negotiating free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">Related Canada guides</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/salary/software-engineer-salary-toronto", label: "SWE Salary Toronto" },
                { href: "/salary/software-engineer-salary-vancouver", label: "SWE Salary Vancouver" },
                { href: "/salary/product-manager-salary-toronto", label: "PM Salary Toronto" },
                { href: "/salary/data-scientist-salary-montreal", label: "Data Scientist Salary Montréal" },
                { href: "/salary-calculator", label: "Salary Calculator" },
                { href: "/ai-career-coach-canada", label: "AI Career Coach Canada" },
                { href: "/blog/salary-negotiation-tips", label: "Salary Negotiation Tips" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[12px] font-medium text-[#4361EE] hover:bg-[var(--brand)]/5 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
