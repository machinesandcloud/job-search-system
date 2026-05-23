import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach Dubai 2025 — Career Coaching for Dubai & UAE Professionals",
  description: "AI career coaching for Dubai and the UAE. AED salary benchmarks, Employment Visa and Green Visa guidance, Bayt and LinkedIn strategy, and interview prep for Dubai's top employers.",
  keywords: ["ai career coach dubai", "career coach dubai", "career coaching dubai", "dubai job search", "uae career coach", "dubai salary", "employment visa uae", "bayt jobs dubai", "dubai career coaching 2025", "career coach uae"],
  alternates: { canonical: "/ai-career-coach-dubai" },
  openGraph: { title: "AI Career Coach Dubai 2025 — Career Coaching for Dubai & UAE Professionals", description: "AED salary benchmarks, UAE visa guidance, and job search strategy for Dubai's competitive job market.", url: "/ai-career-coach-dubai" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the best strategy for getting a job in Dubai?", answer: "Dubai's job market is distinct from Western markets in several key ways: (1) In-person networking is more powerful than elsewhere — many roles in Dubai are filled through referrals and personal introductions before they're posted. Being physically present in Dubai for your job search is a significant advantage for most sectors. (2) Bayt.com is the primary job board — use it actively alongside LinkedIn. (3) The recruitment agency ecosystem is strong — agencies like Michael Page Gulf, Robert Half Dubai, and Hays Gulf place many mid-to-senior roles. Building relationships with a recruiter in your sector adds a channel that many candidates ignore. (4) The UAE Employment Visa requires employer sponsorship — you can interview on a tourist visa and convert to Employment Visa once you have an offer." },
  { question: "How does tax-free salary in Dubai compare to UK/US salaries?", answer: "Dubai's zero personal income tax is the most significant compensation factor for expats. A AED 25,000/month (approximately $6,800 USD) tax-free package in Dubai is broadly comparable to a $130,000–$145,000 gross salary in a high-tax jurisdiction like the UK or Australia after accounting for taxes and housing. The key formula: take the AED monthly salary × 12 for annual, then add the housing allowance (often AED 2,000–8,000+/month additional), medical insurance, and annual flight allowance. Dubai packages are typically structured as total compensation (salary + allowances) rather than just base salary. For UAE nationals or long-term residents: note the UAE introduced a 9% corporate tax in 2023, but personal income tax remains zero." },
  { question: "What CV format should I use for Dubai jobs?", answer: "The UAE CV differs from US/UK standard: (1) Photo is standard and expected — include a professional headshot. (2) Personal details — nationality, marital status, and visa status are commonly included. (3) Length: 2–3 pages for experienced professionals (longer than a US resume). (4) Visa status — clearly state your current visa status (Employment Visa, Resident Visa, Tourist/Visit Visa). If you're currently on a tourist visa for job searching, state this. (5) Languages — indicate language proficiency clearly; Arabic proficiency is valued for client-facing roles at UAE government entities. (6) Photo format: professional business attire, neutral background — the UAE market is conservative in professional presentation." },
  { question: "Which industries are hiring most in Dubai in 2025?", answer: "Dubai's most active hiring sectors in 2025: (1) Finance and banking — DIFC (Dubai International Financial Centre) is home to HSBC, Standard Chartered, Citi, Goldman Sachs, and dozens of regional banks and PE firms. Islamic finance is a growing specialty. (2) Technology — Dubai Internet City (DIC) is the tech hub, home to Microsoft, Oracle, Cisco, IBM, and a growing startup ecosystem. Dubai's Smart City initiatives drive significant government tech hiring. (3) Healthcare — Dubai Healthcare City (DHCC) and the broader UAE healthcare expansion are creating strong demand for doctors, nurses, and healthcare administrators. (4) Real estate and construction — still one of Dubai's defining sectors, with EMAAR, Aldar, and government development projects. (5) Hospitality and tourism — Marriott, Hilton, and dozens of luxury brands have major Dubai operations." },
];

const SALARIES = [
  { role: "Software Engineer (Senior)", company: "Dubai Internet City tech cos", range: "AED 22,000–38,000/mo", note: "Tax-free; includes housing allowance" },
  { role: "Finance / Banking (VP)", company: "DIFC banks / Investment firms", range: "AED 30,000–60,000/mo", note: "DIFC premium over onshore" },
  { role: "Product Manager", company: "Tech / Fintech / Gov digital", range: "AED 20,000–35,000/mo", note: "Dubai Smart City driving demand" },
  { role: "Marketing Manager", company: "Consumer / Hospitality / Tech", range: "AED 15,000–28,000/mo", note: "Arabic bilingual premium" },
  { role: "Management Consultant", company: "Big 4 / Strategy boutiques", range: "AED 20,000–38,000/mo", note: "Similar to London rates, no tax" },
  { role: "Healthcare (RN)", company: "Dubai Healthcare City", range: "AED 8,000–18,000/mo", note: "Varies widely by specialty" },
  { role: "Real Estate / Construction", company: "EMAAR / Aldar / Developers", range: "AED 15,000–40,000/mo", note: "Commission structures vary" },
];

export default async function AiCareerCoachDubaiPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="AI Career Coach Dubai 2025 — Career Coaching for Dubai & UAE Professionals"
        description="AED salary benchmarks, UAE visa guidance, and job search strategy for Dubai's competitive job market."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/ai-career-coach-dubai`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach Dubai", url: `${BASE_URL}/ai-career-coach-dubai` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 45%, #C8102E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🇦🇪 Dubai · UAE · Tax-Free · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            AI Career Coach<br />
            <span className="text-white/50">Dubai</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Career coaching for Dubai&apos;s job market — AED salary benchmarks, UAE Employment Visa and Green Visa guidance, Bayt strategy, and interview prep for DIFC and Dubai Internet City roles.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · Dubai & UAE · For expats and residents</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Dubai salary benchmarks 2025 (AED/month, tax-free)</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">All figures are gross monthly in AED. Zero personal income tax in the UAE — your gross salary is your take-home (minus any DIFC / free zone fees).</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Typical employer</span><span>AED / month</span><span>Notes</span>
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
          <p className="mt-4 text-[12px] text-[var(--muted)]">Packages typically include housing allowance (AED 2,000–10,000/month), medical insurance, and annual flight allowance. Factor into total compensation comparison with home country.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Dubai job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "UAE CV writing", desc: "UAE-format CV with photo guidance, personal details, visa status, and Arabic-friendly layout for Dubai employers." },
              { title: "Employment Visa & Green Visa", desc: "UAE Employment Visa process overview, Green Visa eligibility (AED 15,000+/month minimum), and Freelance Permit guidance." },
              { title: "Dubai interview prep", desc: "Interview coaching calibrated to Dubai's formal-yet-relationship-driven business culture across finance, tech, and government sectors." },
              { title: "Bayt and LinkedIn Dubai", desc: "Bayt.com profile optimization and LinkedIn strategy for Dubai recruiter searches — both platforms are essential in the UAE market." },
              { title: "AED salary negotiation", desc: "Dubai comp benchmarks with full package calculation (base + housing + medical + flight allowance) vs your current home country package." },
              { title: "DIFC finance career coaching", desc: "Dubai International Financial Centre interview prep for banking, investment, and financial services roles." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your Dubai role with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">UAE-aware resume coaching, visa guidance, and interview prep for Dubai&apos;s most competitive roles — available 24/7, free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#D97706]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
