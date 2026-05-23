import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Nashville 2025 — AI Career Coaching for Nashville Professionals",
  description: "AI career coaching for Nashville, TN professionals. Nashville salary benchmarks, healthcare and tech interview prep, resume optimization for HCA Healthcare, Amazon, and Nashville's booming job market.",
  keywords: ["career coach nashville", "career coach nashville tn", "career coaching nashville", "nashville career counselor", "executive career coach nashville", "nashville job search 2025", "hca healthcare careers", "amazon nashville jobs", "nashville tech jobs", "nashville salary negotiation"],
  alternates: { canonical: "/career-coach-nashville" },
  openGraph: { title: "Career Coach Nashville 2025 — AI Career Coaching for Nashville Professionals", description: "Nashville salary benchmarks, healthcare and tech interview prep, and resume optimization for Music City's fastest-growing employers.", url: "/career-coach-nashville" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries are booming in Nashville in 2025?", answer: "Nashville is one of the hottest job markets in the US driven by three forces: Healthcare: HCA Healthcare (world&apos;s largest for-profit hospital chain — HQ in Nashville), Vanderbilt University Medical Center, Ascension Health, LifePoint Health, and dozens of healthcare IT companies. Technology: Amazon HQ2 East (Nashville campus for operations), Oracle (relocated HQ to Nashville), AllianceBernstein, and a growing startup ecosystem. Entertainment/Media: Country music industry, major labels (Universal, Sony, Warner all have Nashville offices), Opry Entertainment. Plus zero state income tax makes Nashville uniquely attractive to high earners from California and New York." },
  { question: "What are typical salaries in Nashville?", answer: "Nashville salaries have risen sharply with the tech and healthcare influx. 2025 benchmarks: Healthcare Executive (HCA, Vanderbilt): $110,000–$200,000; Software Engineer (Oracle, Amazon Nashville): $110,000–$190,000 TC; Healthcare Administrator: $85,000–$145,000; Registered Nurse (Vanderbilt, HCA): $72,000–$105,000; Financial Analyst (AllianceBernstein): $80,000–$130,000; Product Manager (Tech): $120,000–$185,000 TC; Entertainment/Label roles: $60,000–$130,000 depending on function. Tennessee has zero state income tax on wages, meaning every dollar in salary is yours (no state withholding on W-2 income)." },
  { question: "Is Nashville worth relocating to for career growth?", answer: "For the right professional, Nashville is one of the best relocation decisions in 2025. The combination of: zero state income tax on earned income, a housing market that (while risen) is still 40–60% below San Francisco or NYC, a genuinely booming economy (Nashville consistently ranks top 5 in job growth), and a growing tech and healthcare ecosystem makes it compelling. Oracle relocating its HQ added thousands of tech jobs. Amazon&apos;s operations hub in Nashville is growing. For healthcare executives and healthcare IT professionals, Nashville is effectively the healthcare capital of the US — the density of healthcare companies per capita is unmatched." },
  { question: "How do I get a job at HCA Healthcare?", answer: "HCA Healthcare is the world&apos;s largest for-profit hospital chain and Nashville&apos;s largest employer. Hiring process: 1) Apply through HCA&apos;s career site — most roles are posted there first. ATS is Workday-based, so resume keyword optimization is critical. 2) Phone screen with HR (30–45 min). 3) Panel interview with department leadership (typically 3–5 people). Key themes: patient outcomes, operational efficiency, financial stewardship. For corporate roles at HQ: focus on data-driven decision-making, cross-functional collaboration, and scalability. HCA pays well for the Southeast — corporate HQ roles carry salaries 10–15% above typical Nashville market for equivalent experience." },
];

const SALARIES = [
  { role: "Healthcare Executive / Director", company: "HCA Healthcare, Vanderbilt", range: "$110,000–$200,000", note: "Nashville = healthcare capital of US" },
  { role: "Software Engineer (Senior)", company: "Oracle, Amazon Nashville", range: "$110,000–$190,000 TC", note: "Oracle HQ relocation brought many roles" },
  { role: "Healthcare IT / Analyst", company: "HCA, Change Healthcare", range: "$90,000–$155,000", note: "Intersection of health + tech = premium" },
  { role: "Registered Nurse (RN)", company: "Vanderbilt, HCA, Ascension", range: "$72,000–$105,000", note: "High demand; Nashville has national draw" },
  { role: "Financial Analyst", company: "AllianceBernstein, Genesco", range: "$80,000–$130,000", note: "AllianceBernstein relocated HQ to Nashville" },
  { role: "Product Manager (Tech)", company: "Oracle, Asurion, CoreCivic", range: "$120,000–$185,000 TC", note: "Nashville tech PM market growing" },
  { role: "Entertainment / Label Executive", company: "Universal, Sony, Warner", range: "$60,000–$130,000", note: "Wide range by function and seniority" },
];

export default async function CareerCoachNashvillePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Nashville 2025 — AI Career Coaching for Nashville Professionals"
        description="Nashville salary benchmarks, healthcare and tech interview prep, and resume optimization for Music City's fastest-growing employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-nashville`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Nashville", url: `${BASE_URL}/career-coach-nashville` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #6B2D8B 50%, #C0392B 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Nashville · Healthcare · Tech · Zero Income Tax · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Nashville, Tennessee</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Nashville&apos;s booming market — healthcare, Oracle, Amazon, and entertainment. Resume optimization, interview prep, and salary negotiation available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Zero TN income tax · HCA Healthcare HQ</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Nashville salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Greater Nashville compensation data. Tennessee has zero state income tax on W-2 wages — every dollar stays with you.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#6B2D8B]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Nashville job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Healthcare interview prep", desc: "Competency and behavioral drills for HCA Healthcare, Vanderbilt, Ascension, and Nashville health system leadership roles." },
              { title: "Nashville resume optimization", desc: "ATS scoring against Nashville job postings. Keyword gap analysis for healthcare, tech, and finance descriptions." },
              { title: "Salary negotiation coaching", desc: "Nashville comp benchmarks. Zero TN income tax means your negotiation math is different — Zari helps you model it correctly." },
              { title: "Oracle and Amazon prep", desc: "Technical and behavioral interview coaching for Oracle Nashville HQ and Amazon operations and tech roles." },
              { title: "Relocation negotiation", desc: "If moving to Nashville from CA or NY, Zari coaches you to negotiate the relocation package and frame your experience for the local market." },
              { title: "LinkedIn for Nashville recruiters", desc: "Optimize your headline and About to rank in searches by Nashville healthcare, tech, and finance recruiters." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #6B2D8B 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Nashville job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for Nashville&apos;s booming healthcare, tech, and entertainment market. Available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#6B2D8B]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
