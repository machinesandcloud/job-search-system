import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Miami 2025 — AI Career Coaching for Miami Florida Professionals",
  description: "AI career coaching for Miami professionals. Miami salary benchmarks for finance, tech, and international business. Resume optimization and interview prep for Miami's fast-growing job market.",
  keywords: ["career coach miami", "career counselor miami", "miami career coach", "career coaching miami fl", "miami tech jobs 2025", "miami salary negotiation", "career coach florida", "miami finance career", "brickell career coaching", "miami startup jobs"],
  alternates: { canonical: "/career-coach-miami" },
  openGraph: { title: "Career Coach Miami 2025 — AI Career Coaching for Miami Florida Professionals", description: "Miami salary benchmarks for finance, tech, and international business. Career coaching for Miami's fast-growing job market.", url: "/career-coach-miami" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Has Miami become a real tech hub?", answer: "Yes — Miami has undergone a genuine transformation since 2020. The combination of no state income tax, lower cost of living than NYC/SF, warm weather, and an active mayor promoting the city (Miami Mayor Francis Suarez's 'How can I help?' tweet to SF VCs went viral) drew significant tech talent relocation. Notable developments: Citadel relocated from Chicago to Miami in 2022 (and the cluster effect brought other finance firms); Microsoft Latin America HQ is in Miami; a dense Web3 and crypto community grew around Miami; Softbank opened a Miami-focused fund; and the Miami tech conference ecosystem (Bitcoin 2024, eMerge Americas) has grown. The hype has moderated somewhat since the 2021 peak, but Miami remains a legitimate and growing tech market." },
  { question: "What is Miami's finance scene like?", answer: "Miami is one of the leading financial hubs in the Americas, particularly for: (1) Latin American and international finance — Miami is the gateway to Latin American markets, and many multinational banks and PE firms have LATAM headquarters here (Santander, BBVA, Citi LATAM). (2) Hedge funds and family offices — a significant population of hedge funds, family offices, and wealth management firms have relocated from NYC and Chicago, attracted by Florida's no-income-tax and lifestyle. Key firms: Citadel, Icahn Enterprises, and dozens of smaller hedge funds along the Brickell corridor. (3) Real estate finance — Miami's hot real estate market drives substantial demand for real estate investment bankers, brokers, and property finance professionals." },
  { question: "What are the salary levels in Miami?", answer: "Miami salaries are mixed. Finance and tech roles at top firms are competitive with other major cities (no-income-tax makes gross salaries stretch further). However, salaries at smaller local companies and startups are often below coastal tech market rates. 2025 benchmarks: Senior SWE at major tech companies: $140,000–$220,000 TC; Hedge fund analyst: $150,000–$300,000+ (performance-tied); LATAM Banking (VP): $130,000–$200,000; Real estate finance: $100,000–$180,000; Healthcare (RN): $65,000–$100,000 (Florida nursing rates are lower than NY/CA). Florida has no state income tax — meaningful take-home advantage over NYC and CA roles at the same gross." },
  { question: "How strong is the Latin American business sector in Miami?", answer: "Exceptionally strong — Miami is the de facto business capital of Latin America. Bilingual (Spanish/English) or trilingual (Portuguese/Spanish/English) professionals have a significant advantage in Miami's job market. The LATAM business cluster includes: international trade and logistics, banking and financial services for LATAM clients, consumer goods companies with LATAM regional HQs, consulting firms with LATAM practices, and international media (Telemundo HQ, Univision, CNN en Español). For professionals with LATAM business experience or language skills, Miami offers opportunities that don't exist in any other US city." },
];

const SALARIES = [
  { role: "Senior Software Engineer", company: "Tech companies / Startups", range: "$140,000–$220,000 TC", note: "FL no income tax = higher take-home" },
  { role: "Hedge Fund Analyst", company: "Citadel / Family offices", range: "$150,000–$300,000+ TC", note: "Performance-tied; high variance" },
  { role: "LATAM Banking (VP)", company: "Santander / BBVA / Citi LATAM", range: "$130,000–$200,000 TC", note: "Bilingual premium in Miami" },
  { role: "Real Estate Finance", company: "RE investment / Development", range: "$100,000–$180,000", note: "Miami RE market premium" },
  { role: "Product Manager", company: "Miami tech / Startup", range: "$120,000–$190,000 TC", note: "Startups: lower cash, more equity" },
  { role: "Healthcare (RN)", company: "Jackson Health / Baptist Health", range: "$65,000–$100,000", note: "Florida below NY/CA nursing rates" },
  { role: "Crypto / Web3 Engineer", company: "Crypto startups / DeFi", range: "$130,000–$220,000 + tokens", note: "Miami crypto ecosystem active" },
];

export default async function CareerCoachMiamiPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Miami 2025 — AI Career Coaching for Miami Florida Professionals"
        description="Miami salary benchmarks for finance, tech, and international business. Career coaching for Miami's fast-growing job market."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-miami`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Miami", url: `${BASE_URL}/career-coach-miami` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0891B2 45%, #EC4899 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🌴 Miami FL · Finance · Tech · No State Income Tax
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Miami</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Miami&apos;s growing finance, tech, and international business markets. Hedge fund career coaching, LATAM business positioning, and salary negotiation 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Miami salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Florida has no state income tax — a significant take-home advantage over NYC and California roles at the same gross salary.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range (TC)</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#0891B2]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Miami job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Finance & hedge fund prep", desc: "Citadel, family office, and Brickell corridor finance interview coaching. Hedge fund analyst and PM role preparation." },
              { title: "LATAM business positioning", desc: "Resume and LinkedIn optimization highlighting bilingual skills and LATAM business experience for Miami's international market." },
              { title: "Miami tech interview prep", desc: "Miami startup and corporate tech interview coaching. Crypto and Web3 technical interview preparation." },
              { title: "Miami salary negotiation", desc: "Miami comp benchmarks with Florida no-income-tax take-home analysis vs NYC and California equivalents." },
              { title: "Relocation career strategy", desc: "For professionals relocating to Miami from NYC, SF, or Chicago — how to position your experience in Miami's market context." },
              { title: "LinkedIn for Miami recruiters", desc: "Headline and About section optimization for Miami finance, tech, and LATAM business recruiter searches." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0891B2 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Miami job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Miami&apos;s finance, tech, and international business markets — 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0891B2]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
