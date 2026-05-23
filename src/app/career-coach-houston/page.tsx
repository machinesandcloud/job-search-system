import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Houston 2025 — AI Career Coaching for Houston Texas Professionals",
  description: "AI career coaching for Houston professionals. Energy, healthcare, and aerospace salary benchmarks for Houston. Resume optimization and interview prep for ExxonMobil, Chevron, and Houston's top employers.",
  keywords: ["career coach houston", "career counselor houston", "houston career coach", "career coaching houston tx", "houston energy jobs", "oil and gas career coach", "houston medical center jobs", "nasa career coaching", "houston salary negotiation", "exxonmobil career prep"],
  alternates: { canonical: "/career-coach-houston" },
  openGraph: { title: "Career Coach Houston 2025 — AI Career Coaching for Houston Texas Professionals", description: "Houston energy, healthcare, and aerospace salary benchmarks. Interview prep for ExxonMobil, Chevron, and Houston's top employers.", url: "/career-coach-houston" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries dominate Houston's job market?", answer: "Houston's economy is defined by three world-class sectors: (1) Energy — the energy capital of the world. ExxonMobil, Chevron, Shell, BP, ConocoPhillips, Halliburton, Schlumberger (SLB), and Baker Hughes all have major Houston presences. The energy transition is reshaping roles — chemical engineers, data scientists, and sustainability specialists are now being recruited heavily alongside traditional petroleum engineers. (2) Healthcare — the Texas Medical Center is the largest medical complex in the world (60+ institutions, 106,000+ employees). UTHealth, Houston Methodist, MD Anderson Cancer Center. (3) Aerospace — NASA Johnson Space Center, Boeing, Lockheed Martin, SpaceX Houston, and a growing commercial space ecosystem." },
  { question: "How much do energy jobs pay in Houston?", answer: "Energy salaries in Houston are strong, especially at major integrated oil companies. 2025 benchmarks: Petroleum Engineer (mid-career): $120,000–$200,000+ (historically the highest-paid engineering discipline); Reservoir Engineer: $130,000–$220,000; Chemical Process Engineer: $90,000–$150,000; Geoscientist: $100,000–$180,000; Energy Data Scientist: $110,000–$175,000; O&G Finance / Corporate Development: $110,000–$200,000. Salaries are highly sensitive to oil prices — bonuses at oil majors can range from 10% to 50%+ of base depending on commodity prices. Texas has no state income tax, which enhances take-home." },
  { question: "Is Houston's energy job market diversifying?", answer: "Yes — significantly and necessarily. The energy transition is creating new roles alongside traditional O&G. Growing areas: Carbon capture and storage (CCS) engineering, Hydrogen production and infrastructure, Renewable energy project finance and development, Energy data science and digital transformation (ExxonMobil and Chevron both have large tech divisions), ESG and sustainability reporting, and LNG export infrastructure. The framing that 'energy jobs are dying' is inaccurate — the sector is transforming, not shrinking. Professionals with both engineering fundamentals and energy transition knowledge are the most marketable in 2025." },
  { question: "What makes NASA Johnson Space Center careers unique?", answer: "NASA JSC is the home of Mission Control and astronaut training, and it employs thousands of engineers, scientists, and operational staff — plus tens of thousands more in the contractor ecosystem (Boeing, Lockheed Martin, Jacobs, KBR). Federal NASA roles require US citizenship and security clearances for many positions. Contractor roles have more flexible requirements. The commercial space sector around JSC (SpaceX Starship, Axiom Space, Sierra Space) is hiring aggressively and pays better than traditional aerospace. SpaceX in particular has moved from being seen as an alternative to NASA to being a destination of choice for aerospace engineers in the Houston area." },
];

const SALARIES = [
  { role: "Petroleum / Reservoir Engineer", company: "ExxonMobil / Chevron / Shell", range: "$120,000–$220,000", note: "Bonus-heavy; oil price sensitive" },
  { role: "Chemical Process Engineer", company: "Major O&G / Halliburton / SLB", range: "$90,000–$150,000", note: "Services sector pays below majors" },
  { role: "Aerospace Engineer", company: "NASA JSC / Boeing / SpaceX", range: "$100,000–$180,000", note: "Commercial space paying premium" },
  { role: "Healthcare (RN)", company: "Texas Medical Center", range: "$75,000–$115,000", note: "Largest medical complex globally" },
  { role: "Energy Data Scientist", company: "ExxonMobil Tech / Chevron", range: "$110,000–$175,000", note: "Growing demand across energy sector" },
  { role: "Finance / Corp Dev (Energy)", company: "Integrated O&G / PE-backed E&P", range: "$110,000–$200,000 TC", note: "PE-backed E&P pays above market" },
  { role: "Software Engineer", company: "Energy tech / Healthcare tech", range: "$110,000–$190,000 TC", note: "Houston tech below SF/Austin" },
];

export default async function CareerCoachHoustonPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Houston 2025 — AI Career Coaching for Houston Texas Professionals"
        description="Houston energy, healthcare, and aerospace salary benchmarks. Interview prep for ExxonMobil, Chevron, and Houston's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-houston`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Houston", url: `${BASE_URL}/career-coach-houston` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 45%, #D97706 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🛢️ Houston TX · Energy · Healthcare · Aerospace
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Houston</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Houston&apos;s energy, healthcare, and aerospace markets. ExxonMobil, NASA, and Texas Medical Center interview prep — salary negotiation and resume optimization 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Houston salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Houston compensation data. Texas has no state income tax — your gross salary is closer to your take-home vs California or New York roles.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#D97706]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Houston job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Energy sector interview prep", desc: "ExxonMobil, Chevron, Halliburton, and SLB interview coaching — technical engineering, corporate finance, and data science roles." },
              { title: "Energy transition coaching", desc: "Resume repositioning for O&G professionals moving into energy transition, CCS, hydrogen, and renewables roles." },
              { title: "Healthcare career coaching", desc: "Texas Medical Center resume optimization and interview prep for MD Anderson, Houston Methodist, and UTHealth roles." },
              { title: "Aerospace interview prep", desc: "NASA JSC, Boeing, SpaceX Houston, and commercial space sector interview coaching and resume optimization." },
              { title: "Houston salary negotiation", desc: "Energy sector comp benchmarks including bonus structures, oil-price sensitivity, and no-state-tax after-tax calculations." },
              { title: "LinkedIn for Houston recruiters", desc: "Headline and About section optimization for Houston energy, healthcare, and aerospace recruiter searches." },
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
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Houston job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Houston&apos;s energy, healthcare, and aerospace markets — 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1E3A5F]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
