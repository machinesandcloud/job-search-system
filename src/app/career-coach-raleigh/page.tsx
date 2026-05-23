import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Raleigh 2025 — AI Career Coaching for Research Triangle Professionals",
  description: "AI career coaching for Raleigh, Durham, and the Research Triangle. Salary benchmarks, biotech and tech interview prep, resume optimization for Red Hat, SAS, Cisco, and NC's top employers.",
  keywords: ["career coach raleigh", "career coach durham", "career coach research triangle", "raleigh career coaching", "career counselor raleigh nc", "research triangle job search", "raleigh tech jobs 2025", "sas institute careers", "red hat careers", "raleigh salary negotiation"],
  alternates: { canonical: "/career-coach-raleigh" },
  openGraph: { title: "Career Coach Raleigh 2025 — AI Career Coaching for Research Triangle Professionals", description: "Raleigh-Durham salary benchmarks, biotech and tech interview prep, and resume optimization for Research Triangle's top employers.", url: "/career-coach-raleigh" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What makes Raleigh-Durham one of the best tech job markets?", answer: "The Research Triangle — Raleigh, Durham, and Chapel Hill — is anchored by three world-class universities (NC State, Duke, UNC-Chapel Hill) and has built one of the most balanced tech ecosystems in the US. Key employers: Red Hat (open-source software, now IBM subsidiary — HQ in Raleigh), SAS Institute (world&apos;s largest private software company — HQ in Cary), Cisco (major Triangle campus), IBM (major Research Triangle Park campus), Lenovo North America HQ. Biotech & pharma: the Research Triangle Park hosts hundreds of pharma and biotech companies including Biogen, IQVIA, and Novo Nordisk. The Triangle has the highest concentration of PhDs per capita in the US, making it uniquely competitive for research and scientific roles." },
  { question: "What are typical salaries in Raleigh-Durham?", answer: "Research Triangle salaries are competitive for the Southeast and below Silicon Valley but growing. 2025 benchmarks: Software Engineer (SAS, Red Hat, IBM): $115,000–$190,000 TC; Biotech Scientist / Research Scientist: $90,000–$160,000; Data Scientist: $100,000–$170,000; Product Manager (Tech): $115,000–$180,000 TC; Pharmaceutical/Clinical roles: $85,000–$150,000; Healthcare (Duke Health, UNC Health): $80,000–$140,000; Registered Nurse: $68,000–$98,000. North Carolina has a flat 4.5% state income tax rate, making take-home highly competitive versus Northeast and West Coast cities." },
  { question: "How do I get a job at SAS Institute in Cary, NC?", answer: "SAS Institute is the world&apos;s largest privately held software company and one of the best employers in the US (consistently top-5 on Fortune&apos;s Best Companies to Work For). Hiring process: 1) Apply via SAS careers site — most roles posted internally first. Keyword-optimize your resume for SAS analytics, data management, and enterprise software terms. 2) Recruiter phone screen. 3) Technical interview (for engineering: coding challenge; for analytics/sales: product knowledge and use-case problem solving). 4) Panel interviews — typically 4–6 people including peer team members. Key: SAS values long-term employment — they have exceptionally low turnover. Emphasize career longevity, collaboration, and customer impact in your narrative." },
  { question: "Is the Research Triangle competitive for non-tech roles?", answer: "Yes — and it&apos;s frequently underestimated by job seekers. Because the Triangle is known as a tech hub, the competition for non-tech roles (marketing, finance, operations, HR) is actually lower than equivalent markets. The university systems drive strong hiring in education administration, research operations, clinical research, and scientific publishing. State government (NC is a major employer) and healthcare (Duke Health, UNC Health, WakeMed) create significant non-tech professional demand. The cost of living advantage (Raleigh housing is 40–60% below DC or NYC) makes the Triangle attractive for building wealth even at non-tech salaries." },
];

const SALARIES = [
  { role: "Software Engineer (Senior)", company: "SAS, Red Hat (IBM), Cisco", range: "$115,000–$190,000 TC", note: "SAS = one of best US employers; low turnover" },
  { role: "Biotech / Research Scientist", company: "Biogen, IQVIA, Novo Nordisk", range: "$90,000–$160,000", note: "RTP has 500+ pharma/biotech companies" },
  { role: "Data Scientist / ML Engineer", company: "SAS, IBM, Credit Karma", range: "$100,000–$170,000", note: "High demand; SAS Analytics ecosystem" },
  { role: "Product Manager (Tech)", company: "Red Hat, Pendo, MetLife", range: "$115,000–$180,000 TC", note: "Growing startup ecosystem in Durham" },
  { role: "Clinical / Pharma Roles", company: "Quintiles IQVIA, Biogen", range: "$85,000–$150,000", note: "Clinical research; CRO industry HQ here" },
  { role: "Healthcare Administrator", company: "Duke Health, UNC Health", range: "$80,000–$140,000", note: "Two of the best health systems in the South" },
  { role: "Registered Nurse (RN)", company: "Duke, UNC, WakeMed", range: "$68,000–$98,000", note: "Triangle hospitals have national reputations" },
];

export default async function CareerCoachRaleighPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Raleigh 2025 — AI Career Coaching for Research Triangle Professionals"
        description="Raleigh-Durham salary benchmarks, biotech and tech interview prep, and resume optimization for Research Triangle's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-raleigh`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Raleigh", url: `${BASE_URL}/career-coach-raleigh` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #CC0000 50%, #1B3A6B 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Raleigh · Durham · Research Triangle · Biotech · Tech · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Raleigh, North Carolina</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Research Triangle professionals — tech, biotech, pharma, and healthcare. Resume optimization, interview prep for SAS and Red Hat, and salary negotiation available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · NC flat 4.5% tax · Research Triangle Park</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Raleigh-Durham salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Research Triangle compensation data covering Raleigh, Durham, Cary, and Research Triangle Park. NC flat 4.5% state income tax.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#1B3A6B]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Research Triangle job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "SAS & Red Hat interview prep", desc: "Behavioral and technical drills for SAS Institute, Red Hat, and IBM Research Triangle Park interviews." },
              { title: "Raleigh resume optimization", desc: "ATS scoring against Triangle job postings. Keyword gap analysis for software, biotech, and pharma descriptions." },
              { title: "Salary negotiation coaching", desc: "Raleigh-Durham comp benchmarks. Know your market rate vs. DC or NYC and avoid undervaluing your work." },
              { title: "Biotech and pharma prep", desc: "Interview coaching for Research Triangle Park biotech roles — Biogen, IQVIA, Novo Nordisk, clinical research." },
              { title: "Startup career coaching", desc: "Durham startup ecosystem is growing. Zari coaches candidates targeting early-stage and growth-stage Triangle companies." },
              { title: "LinkedIn for Triangle recruiters", desc: "Optimize your headline and About section to appear in searches by Triangle-area tech and pharma recruiters." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #CC0000 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Research Triangle job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for the Research Triangle — tech, biotech, pharma, and healthcare. Available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1B3A6B]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
