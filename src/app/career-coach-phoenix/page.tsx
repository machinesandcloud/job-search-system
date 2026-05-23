import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Phoenix 2025 — AI Career Coaching for Phoenix Professionals",
  description: "AI career coaching for Phoenix, AZ professionals. Phoenix salary benchmarks, tech and healthcare interview prep, resume optimization for Intel, Banner Health, and Arizona's fast-growing market.",
  keywords: ["career coach phoenix", "career coach scottsdale", "career coach arizona", "phoenix career coaching", "career counselor phoenix", "executive career coach phoenix", "phoenix job search 2025", "arizona career coach", "phoenix tech jobs", "phoenix salary negotiation"],
  alternates: { canonical: "/career-coach-phoenix" },
  openGraph: { title: "Career Coach Phoenix 2025 — AI Career Coaching for Phoenix Professionals", description: "Phoenix salary benchmarks, tech and healthcare interview prep, and resume optimization for Arizona's growing market.", url: "/career-coach-phoenix" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the biggest employers in Phoenix hiring in 2025?", answer: "Phoenix's largest employers span several sectors. Technology: Intel (Chandler chip fab campus — thousands of engineers), Microsoft (Mesa data centers), Amazon (multiple fulfillment and tech offices). Healthcare: Banner Health, Mayo Clinic Arizona, Dignity Health, Valleywise Health — Phoenix is one of the fastest-growing healthcare markets in the US. Finance: JPMorgan Chase (Tempe — major operations hub), Wells Fargo, American Express. Aerospace & defense: Honeywell, Raytheon (now RTX), Boeing. The Greater Phoenix metro is one of the fastest-growing metros in the US and has been attracting major relocations from California, including TSMC's $40B chip fab in north Phoenix." },
  { question: "What are typical salaries in Phoenix?", answer: "Phoenix salaries are generally 15–25% below San Francisco or Seattle, but the cost of living is significantly lower (housing especially). 2025 benchmarks: Software Engineer at Intel/Microsoft Phoenix: $130,000–$220,000 TC; Semiconductor Engineer (TSMC, Intel): $120,000–$200,000; Healthcare Administrator (Banner, Mayo): $90,000–$160,000; Registered Nurse: $75,000–$110,000; Finance Analyst (JPMorgan Tempe): $75,000–$130,000; Product Manager: $120,000–$190,000 TC. Arizona has no city income tax; state income tax is a flat 2.5% (effective 2023) — one of the lowest flat rates in the US." },
  { question: "How competitive is the Phoenix job market in 2025?", answer: "Phoenix is one of the most competitive sunbelt markets in 2025 because of rapid population growth (1.5M+ new residents in the last decade) combined with major corporate relocations. TSMC's $40B chip plant has triggered an entire semiconductor ecosystem buildout — hundreds of supplier and support companies are hiring. JPMorgan's Tempe campus is now one of their largest US hubs outside New York. Competition is real: ATS pass-through matters more than ever because high application volumes are common. Candidates moving from other tech hubs (California, Seattle) often have stronger resumes, so local candidates need ATS optimization to compete." },
  { question: "Should I use a career coach if I'm relocating to Phoenix?", answer: "Absolutely — especially if relocating from a higher-cost market. Recruiters at Phoenix-based companies often try to anchor compensation to local market rates, which can be 20–30% below your current city. A career coach helps you understand Phoenix market rates, negotiate a relocation package (typically $5,000–$20,000 for Phoenix moves), and frame your out-of-state experience so it doesn't trigger a lowball offer. Zari's AI career coach provides Phoenix-specific salary benchmarks so you enter negotiations knowing the market, not guessing." },
];

const SALARIES = [
  { role: "Software Engineer (Senior)", company: "Intel, Microsoft, Amazon AZ", range: "$130,000–$220,000 TC", note: "Intel Chandler campus; TSMC Phoenix hiring" },
  { role: "Semiconductor / Process Engineer", company: "TSMC, Intel, Microchip", range: "$120,000–$200,000", note: "TSMC AZ campus = major new demand" },
  { role: "Healthcare Administrator", company: "Banner Health, Mayo Clinic AZ", range: "$90,000–$160,000", note: "Phoenix is top-5 healthcare growth market" },
  { role: "Finance Analyst / Ops", company: "JPMorgan Tempe, Wells Fargo", range: "$75,000–$130,000", note: "JPMorgan Tempe campus is massive" },
  { role: "Registered Nurse (RN)", company: "Banner, Dignity, Valleywise", range: "$75,000–$110,000", note: "High demand; growing hospital systems" },
  { role: "Product Manager (Tech)", company: "GoDaddy, Axon, Carvana", range: "$120,000–$190,000 TC", note: "Scottsdale/Tempe tech scene growing" },
  { role: "Aerospace Engineer", company: "Honeywell, RTX, Boeing Mesa", range: "$95,000–$160,000", note: "Boeing AH-64 Apache built in Mesa" },
];

export default async function CareerCoachPhoenixPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Phoenix 2025 — AI Career Coaching for Phoenix Professionals"
        description="Phoenix salary benchmarks, tech and healthcare interview prep, and resume optimization for Arizona's growing market."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-phoenix`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Phoenix", url: `${BASE_URL}/career-coach-phoenix` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #FF6B35 60%, #F59E0B 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Phoenix · Tech · Healthcare · Finance · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Phoenix, Arizona</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Phoenix&apos;s fastest-growing market — semiconductors, healthcare, finance, and aerospace. Resume optimization, interview prep, and salary negotiation available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Arizona flat 2.5% tax · TSMC Phoenix hiring</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Phoenix salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Greater Phoenix compensation data including Scottsdale, Tempe, Chandler, and Mesa. Arizona flat income tax: 2.5%.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#FF6B35]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Phoenix job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Semiconductor interview prep", desc: "Technical drills for Intel, TSMC, and Microchip interviews — process engineering, chip design, and operations roles." },
              { title: "Phoenix resume optimization", desc: "ATS scoring against Phoenix and Arizona job postings. Keyword gap analysis for tech, healthcare, and finance job descriptions." },
              { title: "Salary negotiation coaching", desc: "Phoenix comp benchmarks built in. Know your market rate vs. California peers and how to negotiate relocation packages." },
              { title: "Healthcare interview prep", desc: "Behavioral and competency interview coaching for Banner Health, Mayo Clinic, and Dignity Health leadership roles." },
              { title: "Relocation package coaching", desc: "If moving to Phoenix from California or Seattle, Zari coaches you to negotiate relocation costs and avoid cost-of-living salary cuts." },
              { title: "LinkedIn for AZ recruiters", desc: "Rewrite your headline and About section to rank in searches by Phoenix-area recruiters in tech, healthcare, and finance." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #FF6B35 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Phoenix job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for Arizona&apos;s fastest-growing market — semiconductors, healthcare, finance, and aerospace. Available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#FF6B35]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
