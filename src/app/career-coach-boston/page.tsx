import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Boston 2025 — AI Career Coaching for Boston Professionals",
  description: "AI career coaching for Boston professionals. Biotech, finance, and consulting salary benchmarks for Boston. Resume optimization and interview prep for MIT, Harvard, and Boston's top employers.",
  keywords: ["career coach boston", "career counselor boston", "boston career coach", "career coaching boston", "boston biotech jobs", "boston finance career coach", "mit career coach", "harvard career coaching", "boston job search 2025", "boston salary negotiation"],
  alternates: { canonical: "/career-coach-boston" },
  openGraph: { title: "Career Coach Boston 2025 — AI Career Coaching for Boston Professionals", description: "Boston biotech, finance, and consulting salary benchmarks. Resume optimization and interview prep for Boston's top employers.", url: "/career-coach-boston" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries dominate hiring in Boston in 2025?", answer: "Boston's economy is shaped by three world-class clusters: (1) Biotech and life sciences — Kendall Square is the most concentrated biotech cluster in the world. Moderna, Biogen, Vertex Pharmaceuticals, Ginkgo Bioworks, and hundreds of clinical-stage biotechs are headquartered in Greater Boston. Research talent from MIT and Harvard feeds this sector continuously. (2) Finance and investment management — Fidelity Investments HQ, State Street, Wellington Management, and dozens of hedge funds and private equity firms. (3) Technology — HubSpot, Wayfair, Toast, Klaviyo, and a dense startup ecosystem. Consulting (McKinsey Boston, Bain HQ, BCG Boston) rounds out the major sectors." },
  { question: "How much do biotech jobs pay in Boston?", answer: "Boston biotech salaries are competitive and have risen with the post-2020 biotech boom. 2025 benchmarks: Research Scientist (PhD, entry biotech): $90,000–$130,000; Senior Research Scientist: $120,000–$170,000; Associate Director, Clinical Development: $150,000–$220,000; VP Business Development: $200,000–$350,000+ with equity. Biotech companies compensate heavily in equity — options at clinical-stage companies can be worth significantly more than base salary if the drug advances. The risk-reward profile is very different from tech equity. Equity compensation events (IPOs, acquisitions, milestones) are common in Kendall Square." },
  { question: "Is Boston a good city to start a biotech or life sciences career?", answer: "Boston/Cambridge is the best city in the world to start a life sciences career. The density of companies, research institutions (MIT, Harvard, MGH, Dana-Farber), and specialized recruiters means that networking is exceptionally powerful here — many roles are filled through referrals before they're posted. The academic-to-industry transition is well-established: MIT and Harvard PhD/postdoc alumni transition into industry roles at Kendall Square companies at high rates. Key: build your LinkedIn network in Kendall Square specifically. Boston's biotech community is relationally dense — most senior leaders know each other." },
  { question: "What finance roles are big in Boston compared to New York?", answer: "Boston is particularly strong in asset management and investment management rather than investment banking (New York's strength). Fidelity Investments, State Street Global Advisors, Wellington Management, and Putnam Investments all have large Boston presences. For investment banking, Boston has solid middle-market activity (Baird, Piper Sandler), but front-office IB roles at bulge brackets are concentrated in New York. Private equity has a strong Boston presence (Bain Capital HQ, TA Associates). Quant and algorithmic trading is present but not as dominant as Chicago or New York." },
];

const SALARIES = [
  { role: "Senior Research Scientist", company: "Moderna / Biogen / Vertex", range: "$120,000–$170,000 + equity", note: "PhD typically required; equity is key" },
  { role: "Associate Director, Clinical", company: "Biotech (Series B–D)", range: "$150,000–$220,000 + options", note: "Options value varies hugely by stage" },
  { role: "Senior SWE", company: "HubSpot / Wayfair / Toast", range: "$150,000–$250,000 TC", note: "Below SF/NY but lower CoL" },
  { role: "Investment Analyst / AM", company: "Fidelity / Wellington / State St", range: "$100,000–$180,000 base", note: "Bonus-heavy at top asset managers" },
  { role: "Management Consultant", company: "Bain HQ / McKinsey / BCG", range: "$110,000–$165,000 base", note: "Post-MBA Associate level" },
  { role: "Healthcare (RN)", company: "MGH / BWH / Dana-Farber", range: "$85,000–$125,000", note: "Premium for specialized clinical roles" },
  { role: "Data Scientist", company: "Biotech / Fintech / Tech", range: "$120,000–$200,000", note: "High demand in pharma and AM" },
];

export default async function CareerCoachBostonPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Boston 2025 — AI Career Coaching for Boston Professionals"
        description="Boston biotech, finance, and consulting salary benchmarks. Resume optimization and interview prep for Boston's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-boston`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Boston", url: `${BASE_URL}/career-coach-boston` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #C8102E 45%, #1C3A5E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🫐 Boston · Biotech · Finance · Consulting
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Boston</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Boston&apos;s world-class biotech, asset management, and consulting markets. Kendall Square career strategy, salary negotiation, and interview prep — available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Boston salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Greater Boston compensation data. Biotech equity can represent a large multiple of base salary — options at clinical-stage companies carry significant upside and risk.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#C8102E]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Boston job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Biotech resume optimization", desc: "CV/resume optimization for Moderna, Biogen, Vertex, and Kendall Square biotech applications — with life sciences ATS keyword scoring." },
              { title: "Academic-to-industry transition", desc: "PhD and postdoc resume translation for industry roles. Highlights transferable skills from academic research in biotech/pharma-relevant language." },
              { title: "Finance interview prep", desc: "Fidelity, Wellington, and State Street interview preparation — including investment analysis, portfolio management, and operational roles." },
              { title: "Boston salary negotiation", desc: "Biotech equity analysis, asset management bonus benchmarks, and tech comp data for Greater Boston employers." },
              { title: "Consulting case prep", desc: "Bain, McKinsey, and BCG case interview frameworks with Boston market context. Bain HQ-specific culture coaching." },
              { title: "LinkedIn for Boston recruiters", desc: "Headline and About section optimization for Kendall Square biotech and Boston finance recruiter searches." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #C8102E 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Boston job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Boston&apos;s biotech, finance, and consulting markets — 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#C8102E]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
