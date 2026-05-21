import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Highest Paying Jobs Without a Degree 2025 — Real Salaries",
  description: "The 20 highest paying jobs that don't require a 4-year college degree in 2025 — with real salary data, required skills, and the fastest paths to each role.",
  keywords: ["highest paying jobs without a degree", "high paying jobs no degree", "best jobs without college degree", "highest paying trade jobs", "tech jobs without degree", "high salary no degree 2025", "jobs that pay well without degree", "no degree high paying careers", "six figure jobs no degree", "good paying jobs no college"],
  alternates: { canonical: "/blog/highest-paying-jobs-no-degree" },
  openGraph: { title: "Highest Paying Jobs Without a Degree 2025", description: "20 jobs paying $80K–$250K that don't require a 4-year degree — with real salary data and fastest paths.", url: "/blog/highest-paying-jobs-no-degree" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "What's the highest paying job you can get without a degree?", answer: "In tech: software engineers who are self-taught or bootcamp-trained at senior levels earn $150K–$300K+. In trades: elevator installers and repairers earn a median of $97K nationally, with experienced technicians in high-cost cities earning $120K–$180K. In sales: enterprise software AEs at senior levels earn $180K–$400K+ in OTE with no degree required. Real estate and insurance also offer six-figure paths without a degree." },
  { question: "Can you really make $100K+ without a college degree?", answer: "Yes — and it's increasingly common in software, skilled trades, sales, and real estate. The main paths: learn a technical skill (coding, cybersecurity, cloud) through a bootcamp or self-study; enter a skilled trade through an apprenticeship; go into commission-based sales (tech, real estate, insurance) where earnings are primarily skill-based; or learn a specialized trade skill that's in shortage (HVAC, electrician, elevator tech)." },
  { question: "Is a coding bootcamp worth it without a CS degree?", answer: "For software engineering specifically, a bootcamp can be worth it if you complete the program, build a portfolio of real projects, and aggressively network. The ROI is highest at well-regarded bootcamps (App Academy, Lambda, Hack Reactor) and in markets with high tech demand. Average first-job salary for bootcamp graduates: $65K–$85K. 3–5 years in, salary trajectory converges with CS graduates at many companies." },
  { question: "What trade job pays the most?", answer: "Elevator installers/repairers are the highest-paid trade: median $97K, top earners in NYC/SF over $150K. Electrical contractors (business owners) can earn $150K–$400K+. Aircraft mechanics with FAA certifications earn $90K–$140K. Industrial machinery mechanics at manufacturing plants earn $80K–$120K. All of these require trade school, apprenticeships, or certifications — not a 4-year degree." },
];

const JOBS = [
  { rank: 1, title: "Software Engineer (Self-taught/Bootcamp)", salary: "$75K–$300K+", path: "Bootcamp or self-study, 8–18 months", color: "#0D7182" },
  { rank: 2, title: "Elevator Installer & Repairer", salary: "$97K–$180K", path: "4-year apprenticeship through NEIEP or IUEC", color: "#059669" },
  { rank: 3, title: "Enterprise Sales Executive (AE)", salary: "$100K–$400K OTE", path: "SDR → AE progression, 2–3 years", color: "#DC2626" },
  { rank: 4, title: "Air Traffic Controller", salary: "$90K–$180K", path: "FAA Academy, 2–3 years (no degree required in some paths)", color: "#0A66C2" },
  { rank: 5, title: "Cybersecurity Analyst", salary: "$80K–$160K", path: "CompTIA certs (Security+, CISSP), 6–18 months", color: "#7C3AED" },
  { rank: 6, title: "Electrician (Master / Contractor)", salary: "$70K–$200K+", path: "Apprenticeship (4–5 years) → contractor license", color: "#D97706" },
  { rank: 7, title: "Real Estate Agent / Broker", salary: "$60K–$300K+", path: "State license exam (weeks), build client base over 1–3 years", color: "#059669" },
  { rank: 8, title: "Cloud Engineer / AWS Certified", salary: "$100K–$190K", path: "AWS/GCP/Azure certifications, 6–12 months study", color: "#0D7182" },
  { rank: 9, title: "Commercial Pilot", salary: "$100K–$300K+", path: "FAA certifications and flight hours, 2–4 years", color: "#1D4ED8" },
  { rank: 10, title: "HVAC Master Technician / Business Owner", salary: "$80K–$250K+", path: "Apprenticeship + state license, 3–5 years", color: "#D97706" },
];

export default async function HighestPayingJobsNoDegree() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Highest Paying Jobs Without a Degree 2025" description="20 jobs paying $80K–$300K+ without a 4-year degree — with real salary data." url={`${BASE_URL}/blog/highest-paying-jobs-no-degree`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Highest Paying Jobs No Degree", url: `${BASE_URL}/blog/highest-paying-jobs-no-degree` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Salary Guide</span>
            <span className="text-[12px] text-white/35">14 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Highest Paying Jobs Without a Degree 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">20 roles paying $80K–$400K that don&apos;t require a 4-year college degree — with real salary data and fastest entry paths.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={65} suffix="M" label="US workers in jobs not requiring a 4-year degree" accent="#059669" />
            <StatCard value={97} suffix="K" label="median salary for elevator installers — top trade" accent="#D97706" />
            <StatCard value={300} suffix="K+" label="possible OTE for enterprise AEs with no degree" accent="#DC2626" />
            <StatCard value={8} label="months to a first software engineering job via bootcamp" accent="#0D7182" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Top 10 highest paying jobs without a degree — 2025</h2>
          <div className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-[40px_1fr_auto] bg-[var(--bg)] border-b border-[var(--border)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>#</span><span>Role</span><span>Salary range</span>
            </div>
            {JOBS.map(({ rank, title, salary, path, color }) => (
              <div key={rank} className="grid grid-cols-[40px_1fr_auto] items-start gap-0 border-b border-[var(--border)] p-4 last:border-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold text-white" style={{ background: color }}>{rank}</div>
                <div className="px-3">
                  <div className="font-bold text-[14px]">{title}</div>
                  <div className="text-[11px] text-[var(--muted)]">{path}</div>
                </div>
                <div className="text-[13px] font-extrabold whitespace-nowrap" style={{ color }}>{salary}</div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Three best sectors for high pay without a degree</h2>
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "💻", title: "Technology", desc: "Software engineering, cybersecurity, and cloud are increasingly skill-based. Bootcamps and certifications are accepted at thousands of companies. Senior engineers earn $200K+ without a degree at many companies including Google (which dropped degree requirements in 2021).", color: "#0D7182" },
              { icon: "🔧", title: "Skilled Trades", desc: "Master electricians, elevator techs, and HVAC contractors are in shortage. Apprenticeship pays you to learn. High demand, recession-resistant, and strong upside for business owners.", color: "#D97706" },
              { icon: "💰", title: "Sales", desc: "Enterprise sales is purely meritocratic. Your W2 reflects your skill, not your diploma. Top enterprise AEs at SaaS companies earn $300K–$500K+ in OTE — and most don't have CS degrees.", color: "#DC2626" },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-2 text-2xl">{icon}</div>
                <h3 className="mb-2 font-bold text-[14px]" style={{ color }}>{title}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Skills beat diplomas. Your resume needs to show that.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari builds a skills-first resume that positions your capabilities — not your credentials — for the high-paying roles you&apos;re targeting.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Optimize my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
