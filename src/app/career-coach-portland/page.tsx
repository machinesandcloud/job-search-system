import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Portland 2025 — AI Career Coaching for Portland Oregon Professionals",
  description: "AI career coaching for Portland, OR professionals. Portland salary benchmarks, tech and creative industry interview prep, resume optimization for Nike, Intel, and Portland's growing tech scene.",
  keywords: ["career coach portland", "career coach portland oregon", "career coaching portland or", "portland career counselor", "portland job search 2025", "nike careers", "intel hillsboro jobs", "portland tech jobs", "portland oregon salary", "portland career coach"],
  alternates: { canonical: "/career-coach-portland" },
  openGraph: { title: "Career Coach Portland 2025 — AI Career Coaching for Portland Oregon Professionals", description: "Portland salary benchmarks, tech and creative interview prep, and resume optimization for the Pacific Northwest's vibrant job market.", url: "/career-coach-portland" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the biggest employers in the Portland metro area?", answer: "Portland's economy is anchored by a mix of consumer brands, semiconductor manufacturing, and a growing tech ecosystem. Major employers: Consumer brands: Nike (world HQ in Beaverton — 10,000+ Oregon employees), Adidas North America (HQ in Portland), Columbia Sportswear (HQ in Portland), Daimler Trucks North America (HQ in Portland). Technology & Semiconductors: Intel (Hillsboro — one of their largest US campuses with 20,000+ employees), Precision Castparts, TriQuint/Qorvo. Healthcare: OHSU (Oregon Health & Science University — major academic medical center), Providence Health, Legacy Health. Retail: Costco (major tech hub in Portland area). Tech startups: Portland has a growing startup scene in SaaS, sustainability tech, and e-commerce." },
  { question: "What are typical salaries in Portland, Oregon?", answer: "Portland salaries are competitive Pacific Northwest rates — generally 10–20% below Seattle or San Francisco but also cheaper to live. 2025 benchmarks: Software Engineer at Intel Hillsboro: $125,000–$210,000 TC; Semiconductor/Process Engineer (Intel, Qorvo): $110,000–$185,000; Product Designer (Nike, Adidas): $90,000–$160,000; SWE at Nike Tech: $120,000–$200,000 TC; Financial Analyst: $75,000–$120,000; Healthcare roles (OHSU, Providence): $80,000–$145,000; Creative/Brand roles: $65,000–$130,000. Oregon has no sales tax but has a graduated income tax — top rate 9.9% on income above $250,000. Portland added a city income tax: Metro SHS 1% + Multnomah County PFA 1.5% on income above certain thresholds." },
  { question: "How do I get a job at Nike in Beaverton?", answer: "Nike&apos;s World Headquarters in Beaverton is one of the most coveted corporate campuses in the US. Hiring tips: 1) Apply via Nike&apos;s careers site — the ATS is Workday-based. Tailor your resume with Nike&apos;s language: &apos;Just Do It&apos; mindset, athlete-inspired, consumer-direct. 2) Nike highly values consumer understanding — demonstrate how you think about the end consumer (athlete) in your work examples. 3) For tech roles: strong emphasis on data, digital, and consumer experience. For product design: portfolio is everything — show footwear, apparel, or equipment-relevant work. 4) Culture fit is heavily screened — Nike looks for competitive drive and brand passion. Zari coaches candidates through Nike behavioral interviews and portfolio/case preparation." },
  { question: "Is Portland good for remote work professionals?", answer: "Portland is increasingly popular with remote workers because of the lifestyle — outdoor access (Columbia River Gorge, Mt. Hood, Oregon coast are all within 90 minutes), a genuinely livable mid-size city, and housing costs that (while risen) are significantly below San Francisco or Seattle. The tradeoff: Portland&apos;s local job market had a rough 2020–2023 with downtown disruptions, but 2025 shows recovery. For remote workers, the relevant question is Oregon taxes: Oregon taxes remote workers on all income regardless of where the employer is based. Portland adds the Metro SHS and PFA surcharges. Budget accordingly, but net living costs are often still lower than Bay Area equivalents." },
];

const SALARIES = [
  { role: "Software Engineer (Senior)", company: "Intel Hillsboro, Nike Tech", range: "$125,000–$210,000 TC", note: "Intel Hillsboro = 20k+ employee campus" },
  { role: "Semiconductor / Process Engineer", company: "Intel, Qorvo, TriQuint", range: "$110,000–$185,000", note: "Portland is major chip manufacturing hub" },
  { role: "Product Designer / Footwear", company: "Nike, Adidas, Columbia", range: "$90,000–$160,000", note: "Consumer brand design hub" },
  { role: "SWE (Consumer Brand Tech)", company: "Nike Digital, Adidas Tech", range: "$120,000–$200,000 TC", note: "Consumer tech roles at brand HQs" },
  { role: "Brand / Marketing Manager", company: "Nike, Columbia, Under Armour", range: "$85,000–$145,000", note: "Strong brand marketing community" },
  { role: "Healthcare Roles", company: "OHSU, Providence, Legacy", range: "$80,000–$145,000", note: "OHSU = top academic medical center" },
  { role: "Registered Nurse (RN)", company: "OHSU, Providence, Legacy", range: "$72,000–$105,000", note: "High demand across metro" },
];

export default async function CareerCoachPortlandPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Portland 2025 — AI Career Coaching for Portland Oregon Professionals"
        description="Portland salary benchmarks, tech and creative interview prep, and resume optimization for the Pacific Northwest's vibrant job market."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-portland`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Portland", url: `${BASE_URL}/career-coach-portland` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #1A3C34 0%, #2D6A4F 50%, #40916C 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Portland · Nike · Intel · Creative · Tech · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Portland, Oregon</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Portland&apos;s unique market — Nike and Adidas brand careers, Intel semiconductor engineering, and a growing tech ecosystem. Available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Pacific Northwest · Nike World HQ city</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Portland salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Portland metro compensation data. Note: Oregon has no sales tax but a graduated income tax. Portland adds Metro SHS and PFA city surcharges.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#2D6A4F]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Portland job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Nike interview coaching", desc: "Behavioral and brand-fit interview prep for Nike, Adidas, and Columbia Sportswear corporate roles — athlete mindset framing." },
              { title: "Portland resume optimization", desc: "ATS scoring against Portland job postings. Keyword gap analysis for consumer brand, semiconductor, and tech descriptions." },
              { title: "Salary negotiation coaching", desc: "Portland comp benchmarks vs. Seattle and San Francisco. Model your Oregon tax obligations and negotiate with confidence." },
              { title: "Intel interview prep", desc: "Technical and behavioral coaching for Intel Hillsboro semiconductor and engineering roles." },
              { title: "Creative and design careers", desc: "Portfolio review coaching and behavioral interview prep for design roles at Portland&apos;s leading consumer brands." },
              { title: "LinkedIn for Portland recruiters", desc: "Optimize your LinkedIn for Portland&apos;s consumer brand, semiconductor, and tech recruiter searches." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1A3C34 0%, #2D6A4F 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Portland job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for Portland&apos;s unique mix of consumer brands, semiconductors, and tech. Available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#2D6A4F]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
