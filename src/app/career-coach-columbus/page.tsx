import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Columbus 2025 — AI Career Coaching for Columbus Ohio Professionals",
  description: "AI career coaching for Columbus, OH professionals. Columbus salary benchmarks, finance and tech interview prep, resume optimization for Nationwide, JPMorgan, and Ohio's fastest-growing city.",
  keywords: ["career coach columbus", "career coach columbus ohio", "career coaching columbus oh", "columbus career counselor", "columbus job search 2025", "nationwide insurance careers", "jpmorgan columbus jobs", "ohio state university careers", "columbus tech jobs", "columbus ohio salary negotiation"],
  alternates: { canonical: "/career-coach-columbus" },
  openGraph: { title: "Career Coach Columbus 2025 — AI Career Coaching for Columbus Ohio Professionals", description: "Columbus salary benchmarks, finance and tech interview prep, and resume optimization for Ohio's fastest-growing city.", url: "/career-coach-columbus" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What makes Columbus one of the fastest-growing job markets in the Midwest?", answer: "Columbus is outperforming most Midwest cities in job growth because of several converging factors: Tech investment: Intel is building a $20B+ chip manufacturing campus outside Columbus in New Albany — one of the largest US manufacturing investments in decades. JPMorgan Chase has a major Columbus technology and operations hub (15,000+ employees). Ohio State University: With 100,000+ students and one of the largest research budgets in the US, OSU drives significant research, healthcare, and startup activity. Insurance & Financial Services: Nationwide Insurance (HQ in Columbus), Huntington National Bank, and Fifth Third Bank all have significant Columbus presence. Retail/Logistics: Limited Brands/Victoria's Secret (HQ), Bath & Body Works (HQ), Big Lots, and Abercrombie all headquartered in Columbus. Columbus has no geographic barriers to growth — it can expand outward, keeping housing costs well below coastal markets." },
  { question: "What are typical salaries in Columbus, Ohio?", answer: "Columbus salaries are strong Midwest rates with a lower cost of living advantage. 2025 benchmarks: Software Engineer (JPMorgan, Intel incoming): $110,000–$185,000 TC; Financial Analyst (Nationwide, Huntington): $75,000–$125,000; Data Scientist / Analyst: $95,000–$160,000; Insurance Professional (Nationwide, Progressive): $70,000–$130,000; Healthcare (OhioHealth, OSU Wexner): $80,000–$145,000; Registered Nurse: $70,000–$100,000; Retail/Brand roles (L Brands, Abercrombie): $75,000–$130,000. Ohio has a graduated income tax — top rate 3.5% on income above $115,300 — one of the lower state tax rates, and Columbus has a 2.5% city income tax. Combined effective rate is very reasonable vs. coastal cities." },
  { question: "How will Intel's Ohio investment affect Columbus hiring?", answer: "Intel&apos;s $20B+ investment in New Albany, Ohio (Columbus suburb) is the largest private sector investment in Ohio history. Phase 1: two chip fabs under construction, expected to employ 3,000 direct Intel workers and 7,000+ construction workers. Long-term: Intel has committed to $100B in potential investment across multiple facilities. The impact extends far beyond Intel itself — suppliers, support services, engineering contractors, and ancillary businesses will add thousands of indirect jobs. For job seekers: semiconductor and manufacturing engineering roles will be in high demand for the next 5–10 years. Process engineering, fab operations, equipment engineering, and EHS roles are particularly needed. Intel is also partnering with Ohio State for workforce training programs." },
  { question: "Is Columbus good for finance careers?", answer: "Columbus is an underrated finance hub. Nationwide Insurance — one of the largest insurance companies in the US — is headquartered here and employs thousands in Columbus in actuarial, underwriting, claims, and corporate finance. JPMorgan Chase&apos;s Columbus tech and operations hub is one of their largest US hubs, with roles spanning software engineering, operations, compliance, and financial analysis. Huntington National Bank and Fifth Third Bank both have major Columbus presences. For aspiring actuaries: Columbus has one of the highest concentrations of actuarial employers in the US — Nationwide, Progressive, and several reinsurers. The combination of financial employers + OSU&apos;s business school pipeline makes Columbus a genuine career launchpad in finance." },
];

const SALARIES = [
  { role: "Software Engineer (Senior)", company: "JPMorgan Columbus, Intel NW Ohio", range: "$110,000–$185,000 TC", note: "Intel $20B fab investment = major new demand" },
  { role: "Financial / Insurance Analyst", company: "Nationwide, Huntington, 5/3", range: "$75,000–$125,000", note: "Insurance and banking HQ city" },
  { role: "Data Scientist / Analyst", company: "JPMorgan, Nationwide, L Brands", range: "$95,000–$160,000", note: "Strong demand across finance and retail" },
  { role: "Actuary", company: "Nationwide, Progressive, Grange", range: "$85,000–$160,000+", note: "Top-5 US actuarial employer market" },
  { role: "Healthcare Administrator", company: "OhioHealth, OSU Wexner", range: "$80,000–$145,000", note: "OSU Wexner = major academic medical center" },
  { role: "Retail / Brand Manager", company: "Victoria&apos;s Secret, Abercrombie", range: "$75,000–$130,000", note: "Multiple retail HQs drive demand" },
  { role: "Registered Nurse (RN)", company: "OhioHealth, Mount Carmel, OSU", range: "$70,000–$100,000", note: "Multiple large hospital systems in metro" },
];

export default async function CareerCoachColumbusPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Columbus 2025 — AI Career Coaching for Columbus Ohio Professionals"
        description="Columbus salary benchmarks, finance and tech interview prep, and resume optimization for Ohio's fastest-growing city."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-columbus`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Columbus", url: `${BASE_URL}/career-coach-columbus` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #BB0000 0%, #666666 50%, #BB0000 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Columbus · Finance · Tech · Intel Investment · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Columbus, Ohio</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Columbus&apos;s booming market — Intel&apos;s $20B investment, JPMorgan operations, Nationwide Insurance, and Ohio&apos;s fastest-growing metro. Available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Intel $20B Ohio fab · Ohio top 3.5% state tax</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Columbus salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Columbus area compensation data. Ohio state income tax tops at 3.5%; Columbus city income tax 2.5%.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#BB0000]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Columbus job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "JPMorgan Columbus prep", desc: "Behavioral and technical interview coaching for JPMorgan Chase Columbus operations and technology roles." },
              { title: "Columbus resume optimization", desc: "ATS scoring against Columbus job postings. Keyword gap analysis for finance, insurance, and tech descriptions." },
              { title: "Salary negotiation coaching", desc: "Columbus comp benchmarks with Ohio tax modeling. Know your market rate and negotiate with confidence." },
              { title: "Nationwide Insurance prep", desc: "Interview coaching for Nationwide Insurance corporate, actuarial, underwriting, and technology roles." },
              { title: "Semiconductor career coaching", desc: "Resume and interview prep for Intel Ohio fab roles — process engineering, fab operations, and equipment engineering." },
              { title: "LinkedIn for Columbus recruiters", desc: "Optimize your LinkedIn to rank in searches by Columbus-area finance, insurance, and tech recruiters." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #BB0000 0%, #666666 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Columbus job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for Columbus&apos;s finance, insurance, tech, and Intel-driven growth. Available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#BB0000]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
