import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach New York City 2025 — AI Career Coaching for NYC Professionals",
  description: "AI career coaching for New York City professionals. NYC salary benchmarks, Wall Street interview prep, resume optimization for finance, tech, and consulting roles in New York.",
  keywords: ["career coach new york", "career coach nyc", "career coach new york city", "nyc career coach", "new york career coaching", "career counselor nyc", "executive career coach new york", "career coaching new york 2025", "nyc job search", "new york salary negotiation"],
  alternates: { canonical: "/career-coach-new-york" },
  openGraph: { title: "Career Coach New York City 2025 — AI Career Coaching for NYC Professionals", description: "NYC salary benchmarks, Wall Street interview prep, and resume optimization for finance, tech, and consulting roles.", url: "/career-coach-new-york" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How much does a career coach cost in New York City?", answer: "Traditional NYC career coaches charge $200–$500/hour for one-on-one sessions, with full packages ranging $2,000–$8,000+. Executive career coaches in NYC's finance and consulting sectors often charge $500–$1,000/hour. Zari provides AI-powered career coaching — resume optimization, interview prep, LinkedIn rewrite, and salary negotiation coaching — available 24/7 starting at a fraction of traditional coach rates. For NYC's competitive market, the ROI is measured in the salary difference between your first offer and your negotiated offer." },
  { question: "What industries dominate hiring in New York City?", answer: "New York City's largest hiring industries in 2025 are: Financial services (Goldman Sachs, JPMorgan, Blackstone, Citadel — highest base salaries in the US), Technology (Google, Meta, Amazon, Microsoft all have major NYC offices), Management consulting (McKinsey, BCG, Bain, Deloitte — largest US offices), Media and entertainment (NBCUniversal, Disney, Netflix NY), Healthcare (NYC Health + Hospitals, Memorial Sloan Kettering, NYU Langone), and Legal (many AmLaw 100 firms headquartered in Manhattan)." },
  { question: "What are typical salaries in New York City?", answer: "NYC salaries are among the highest in the US, offset by a high cost of living. 2025 benchmarks: Software Engineer L4/L5 at Google/Meta NYC: $200,000–$350,000+ TC; Investment Banking Analyst: $110,000–$130,000 base + $60,000–$110,000 bonus; Consulting Associate (MBB): $110,000–$130,000 base; Product Manager (tech): $150,000–$280,000 TC; Healthcare (RN): $90,000–$130,000; Marketing Manager: $90,000–$140,000. Key: NYC roles carry both NYC city tax (~3.9%) and NY state tax (~6.85%) on top of federal — factor into net compensation comparisons." },
  { question: "Is it worth working with a career coach for a Wall Street job search?", answer: "Yes — and the ROI is exceptionally high for finance roles. The difference between a prepared and unprepared candidate in a Goldman Sachs or Morgan Stanley interview is measurable in compensation: analysts who negotiate their first offer typically gain $10,000–$30,000 in total comp. Investment banking interviews have highly specific technical formats (LBO models, DCF, fit questions) that require preparation. Zari's AI finance interview coach runs technical and behavioral drills 24/7 — you can practice as many rounds as needed before your superday." },
];

const SALARIES = [
  { role: "Software Engineer (L4/L5)", company: "Google/Meta/Amazon NYC", range: "$200,000–$350,000+ TC", note: "RSU-heavy; highest TC in US" },
  { role: "Investment Banking Analyst", company: "Goldman, JPMorgan, MS", range: "$170,000–$240,000 total", note: "Base $110–130k + $60–110k bonus" },
  { role: "Management Consultant", company: "McKinsey, BCG, Bain NYC", range: "$110,000–$165,000 base", note: "Associate level post-MBA" },
  { role: "Product Manager (Senior)", company: "Tech / Startups", range: "$160,000–$280,000 TC", note: "Strong equity at late-stage cos" },
  { role: "Hedge Fund Analyst", company: "Citadel, D.E. Shaw, Two Sigma", range: "$200,000–$500,000+ TC", note: "Highest variance; performance-tied" },
  { role: "Marketing Manager", company: "Consumer/Media/Tech", range: "$90,000–$145,000", note: "Wide range by sector" },
  { role: "Registered Nurse (RN)", company: "NYU Langone, Sloan Kettering", range: "$90,000–$130,000", note: "NYC premium over national avg" },
];

export default async function CareerCoachNewYorkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach New York City 2025 — AI Career Coaching for NYC Professionals"
        description="NYC salary benchmarks, Wall Street interview prep, and resume optimization for finance, tech, and consulting roles."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-new-york`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach New York", url: `${BASE_URL}/career-coach-new-york` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1C3A5E 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🗽 New York City · Finance · Tech · Consulting
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">New York City</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching built for NYC&apos;s most competitive markets — Wall Street finance, Big Tech, MBB consulting, and startups. Resume optimization, interview prep, and salary negotiation available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">NYC salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">New York City compensation data. TC = total compensation including salary, bonus, and equity.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#1C3A5E]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for NYC job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Wall Street interview prep", desc: "Technical finance interview drills — LBO, DCF, M&A, fit questions. Formatted for Goldman, JPMorgan, and Blackstone superday rounds." },
              { title: "NYC resume optimization", desc: "ATS scoring against NYC job postings. Keyword gap analysis for finance, tech, and consulting job descriptions." },
              { title: "Salary negotiation coaching", desc: "NYC comp benchmarks built in. Know your market rate before you negotiate — and how to push for more." },
              { title: "Big Tech interview prep", desc: "FAANG behavioral and system design prep for Google, Meta, Amazon, and Microsoft NYC engineering roles." },
              { title: "LinkedIn for NYC recruiters", desc: "Rewrite your headline and About section to rank in searches by NYC-based finance and tech recruiters." },
              { title: "MBB consulting prep", desc: "McKinsey, BCG, Bain case interview frameworks, fit questions, and written case practice." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1C3A5E 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your NYC job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for New York&apos;s most competitive roles — finance, Big Tech, and consulting. Available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1C3A5E]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
