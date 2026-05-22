import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job in Dubai 2025 — Complete Guide for Expats",
  description: "How to find a job in Dubai as an expat in 2025. Visa types (Employment Visa, Green Visa, Freelance Permit), top job boards, AED salary benchmarks, and CV format tips for the UAE market.",
  keywords: ["how to get a job in dubai", "get a job in dubai", "jobs in dubai for expats", "dubai job market 2025", "uae employment visa", "working in dubai", "dubai salary", "dubai cv format", "jobs dubai 2025", "expat jobs dubai"],
  alternates: { canonical: "/blog/how-to-get-a-job-in-dubai" },
  openGraph: { title: "How to Get a Job in Dubai 2025 — Complete Guide for Expats", description: "Visa options, job boards, AED salary benchmarks, and CV tips for finding work in Dubai as an expat.", url: "/blog/how-to-get-a-job-in-dubai" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Do I need a job offer before moving to Dubai?", answer: "Traditionally yes — the UAE Employment Visa (the standard route) requires employer sponsorship. However, the UAE Green Visa (5-year self-sponsored visa) allows skilled professionals with degrees and a minimum salary of AED 15,000/month to live in the UAE without employer sponsorship. The Freelance Work Permit (MOHRE or free zone issued) allows independent consultants to operate legally. Most expat job seekers use the Employment Visa route — arriving on a tourist visa, interviewing in-person, then converting to Employment Visa once an offer is received." },
  { question: "What is the best job board for finding work in Dubai?", answer: "Bayt.com and LinkedIn are the two primary platforms — most corporate and multinational hiring runs through both. GulfTalent covers mid-to-senior professional roles. Naukrigulf is strong for Indian and South Asian professionals. For finance and banking, eFinancialCareers. For government and semi-government roles (ADNOC, Emirates NBD, Etihad), company career pages and LinkedIn are the direct channels. Indeed UAE is active for volume recruitment. Agencies like Michael Page Gulf and Robert Half Dubai are effective for senior finance and professional services roles." },
  { question: "Do I need a different CV format for Dubai jobs?", answer: "Yes — the UAE CV format differs from US/UK standard. UAE employers generally accept (and often expect) a photograph, nationality, and marital status on CVs — these are not illegal in the UAE as they are in many Western markets. CVs are typically 2–3 pages for experienced professionals. Arabic name recognition matters for roles with local government clients. Zari's resume coaching adjusts formatting for UAE market norms while keeping the content achievement-focused." },
  { question: "Are Dubai salaries tax-free?", answer: "Yes — there is no personal income tax in the UAE. This is a significant compensation advantage for expats. However, there is no mandatory employer pension or social security contribution equivalent to Western markets — compensation packages are typically negotiated including housing allowance (significant in Dubai), medical insurance, and annual flight allowance. A AED 25,000/month gross salary (approximately $6,800 USD) with housing allowance is broadly comparable to a $130,000–$145,000 gross salary in a high-tax jurisdiction like the UK or Australia after accounting for taxes and housing costs." },
];

const VISAS = [
  { type: "Employment Visa", sponsor: "Employer sponsored", duration: "2 years (renewable)", notes: "Standard route; employer arranges visa on job offer" },
  { type: "UAE Green Visa", sponsor: "Self-sponsored", duration: "5 years", notes: "Requires degree + AED 15,000+/month minimum salary" },
  { type: "Freelance Work Permit", sponsor: "Self-sponsored (free zone)", duration: "1–2 years", notes: "MOHRE or free zone permit; covers independent consultants" },
  { type: "Golden Visa", sponsor: "Government-issued", duration: "10 years", notes: "For investors, specialists, and exceptional talent" },
  { type: "Tourist Visa (job search)", sponsor: "Self-arranged", duration: "30–60 days", notes: "Common to interview in-person before converting to employment visa" },
];

const SALARIES = [
  { role: "Software Engineer (3–5 yrs)", aed: "AED 18,000–28,000/mo", usd: "~$4,900–$7,600/mo" },
  { role: "Senior SWE / Tech Lead", aed: "AED 28,000–45,000/mo", usd: "~$7,600–$12,200/mo" },
  { role: "Finance Manager / Controller", aed: "AED 20,000–35,000/mo", usd: "~$5,400–$9,500/mo" },
  { role: "Investment Banker (Associate)", aed: "AED 25,000–45,000/mo", usd: "~$6,800–$12,200/mo" },
  { role: "Marketing Manager", aed: "AED 15,000–25,000/mo", usd: "~$4,100–$6,800/mo" },
  { role: "Management Consultant (Big 4)", aed: "AED 18,000–32,000/mo", usd: "~$4,900–$8,700/mo" },
  { role: "Nurse / Healthcare Professional", aed: "AED 8,000–18,000/mo", usd: "~$2,200–$4,900/mo" },
];

export default async function HowToGetAJobInDubaiPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-02-15";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Get a Job in Dubai 2025 — Complete Guide for Expats"
        description="Visa options, job boards, AED salary benchmarks, and CV tips for finding work in Dubai as an expat."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-to-get-a-job-in-dubai`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job in Dubai", url: `${BASE_URL}/blog/how-to-get-a-job-in-dubai` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 45%, #C8102E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🇦🇪 Dubai / UAE · Expat Job Guide 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Get a Job<br />
            <span className="text-white/50">in Dubai 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Visa types, job boards, AED salary benchmarks, and CV format tips for expats moving to Dubai — including the Green Visa and Freelance Permit options available in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · 10 min read · For expats and job seekers</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">UAE visa options for workers 2025</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Visa type</span><span>Sponsor</span><span>Duration</span><span>Key notes</span>
            </div>
            {VISAS.map(({ type, sponsor, duration, notes }) => (
              <div key={type} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{type}</span>
                <span className="text-[var(--muted)]">{sponsor}</span>
                <span>{duration}</span>
                <span className="text-[var(--muted)] text-[12px]">{notes}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Dubai salary benchmarks 2025 (AED / month, tax-free)</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="col-span-1">Role</span><span>AED / month</span><span>USD equivalent</span>
            </div>
            {SALARIES.map(({ role, aed, usd }) => (
              <div key={role} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="font-semibold text-[#D97706]">{aed}</span>
                <span className="text-[var(--muted)]">{usd}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[var(--muted)]">All figures are gross (no income tax in UAE). Many packages include housing allowance (AED 2,000–8,000+/month), medical insurance, and annual flight allowance — factor these into total compensation comparisons.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Top job boards for Dubai jobs</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "Bayt.com", desc: "The primary professional job board in the GCC. Strong across all sectors and seniority levels.", badge: "Most used" },
              { name: "LinkedIn", desc: "Essential for multinational companies and senior roles. Dubai recruiters are active on LinkedIn.", badge: "Multinationals" },
              { name: "GulfTalent", desc: "Mid-to-senior professional roles across UAE and broader Gulf.", badge: "Senior roles" },
              { name: "Naukrigulf", desc: "Strong for Indian and South Asian professionals. Broad sector coverage.", badge: "Large community" },
              { name: "eFinancialCareers", desc: "Finance and banking roles in DIFC and Abu Dhabi Financial Centre.", badge: "Finance" },
              { name: "Company career pages", desc: "ADNOC, Emirates, Etihad, Emirates NBD — major UAE employers hire directly.", badge: "Government / semi-gov" },
            ].map(({ name, desc, badge }) => (
              <div key={name} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-bold text-[14px]">{name}</span>
                  <span className="rounded-full bg-[#D97706]/10 px-2 py-0.5 text-[10px] font-semibold text-[#D97706]">{badge}</span>
                </div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your Dubai role with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">UAE-aware resume coaching, LinkedIn optimisation, and interview prep for Dubai&apos;s most competitive roles — available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#D97706]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
