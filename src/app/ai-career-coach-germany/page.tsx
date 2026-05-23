import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach Germany 2025 — Career Coaching for Germany & DACH Market",
  description: "AI career coaching for Germany and the DACH market. German salary benchmarks, EU Blue Card guidance, StepStone and Xing job board strategy, and interview prep for German employers.",
  keywords: ["ai career coach germany", "career coach germany", "career coaching germany", "germany job search", "eu blue card", "stepstone germany", "xing career", "german job market 2025", "germany salary benchmark", "career coach dach"],
  alternates: { canonical: "/ai-career-coach-germany" },
  openGraph: { title: "AI Career Coach Germany 2025 — Career Coaching for Germany & DACH Market", description: "German salary benchmarks, EU Blue Card guidance, and job search strategy for Germany and the DACH region.", url: "/ai-career-coach-germany" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the EU Blue Card and who qualifies?", answer: "The EU Blue Card is a work and residence permit for highly qualified non-EU professionals working in Germany. Eligibility requirements: (1) A recognized university degree (German or equivalent foreign degree), (2) A job offer with a minimum annual salary of €45,300 gross (2024 threshold; €40,770 for shortage occupations like IT, engineering, medicine, and natural sciences). The Blue Card offers several advantages over standard work visas: faster processing, right to bring family members immediately, and a path to permanent residence in 33 months (21 months if B1 German). Since 2023 reforms, the German Opportunity Card (Chancenkarte) also allows skilled professionals to enter Germany for job searching without a pre-existing offer." },
  { question: "What are German salary levels compared to the UK or US?", answer: "German salaries are competitive in European terms but significantly below US levels for tech and finance roles, and somewhat below UK levels for senior tech. 2025 benchmarks (gross, before German income tax): Senior Software Engineer in Berlin: €70,000–€110,000; Senior SWE at SAP/Siemens: €80,000–€120,000; Product Manager (Senior): €75,000–€115,000; Management Consultant (Big 4): €65,000–€100,000; Engineering Manager: €95,000–€140,000. Key context: German employers typically don't include equity at the scale of US tech companies. Salary comparisons to the US look worse at gross level, but Germany's comprehensive social safety net (healthcare, unemployment insurance, pension) reduces the out-of-pocket spend US employees bear." },
  { question: "What are the best job boards for finding work in Germany?", answer: "Germany has a distinct job board ecosystem: (1) StepStone.de — Germany's largest professional job board, equivalent to LinkedIn/Indeed in market share for professional roles. (2) Xing — the dominant German professional network, comparable to LinkedIn in Germany. Active Xing profile is essential for German job searching; many German companies post roles on Xing before or instead of LinkedIn. (3) LinkedIn — increasingly important in Germany, especially for international companies and tech sector. (4) Indeed.de — high volume, strong for mid-market roles. (5) Bundesagentur für Arbeit (BA) — Germany's Federal Employment Agency, particularly relevant for shortage occupation roles. (6) Glassdoor.de — useful for salary research and company culture." },
  { question: "What should I know about German CV format?", answer: "German CVs (Lebenslauf) have specific formatting expectations that differ significantly from UK/US resumes: (1) Photo is standard and expected — German applications traditionally include a professional headshot. (2) Personal details — date of birth, marital status, and nationality are included (legal in Germany, unlike in the UK/US). (3) Tabular or semi-tabular format — dates on the left, content on the right, clean and structured. (4) Lückenloser Lebenslauf (gap-free CV) — German employers expect an account of every period, including military service, volunteering, or travel. Unexplained gaps raise questions. (5) Length: 1–2 pages for under-10 years experience; 2–3 pages for senior professionals. (6) Cover letter (Anschreiben) — still important in Germany, more so than in the UK or US." },
];

const SALARIES = [
  { role: "Senior Software Engineer", company: "Berlin tech / SAP / Siemens", range: "€70,000–€110,000 gross", note: "Below US/UK; no state income tax (but ~45% all-in)" },
  { role: "Engineering Manager", company: "German tech companies", range: "€95,000–€140,000 gross", note: "Premium for leadership in DACH" },
  { role: "Product Manager (Senior)", company: "B2B / SaaS / Corporate", range: "€75,000–€115,000 gross", note: "PM market growing in Berlin, Munich" },
  { role: "Management Consultant", company: "McKinsey / BCG / Big 4", range: "€65,000–€105,000 base", note: "Big 4 includes Deloitte, KPMG, PwC" },
  { role: "Mechanical / Industrial Eng", company: "BMW / Volkswagen / BASF", range: "€55,000–€90,000 gross", note: "Strong in Munich, Stuttgart, Frankfurt" },
  { role: "Finance / Accounting", company: "Corporate / Banking / Audit", range: "€55,000–€95,000 gross", note: "Frankfurt finance hub" },
  { role: "Data Scientist", company: "Tech / Corporate / Finance", range: "€65,000–€100,000 gross", note: "Growing demand across sectors" },
];

export default async function AiCareerCoachGermanyPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="AI Career Coach Germany 2025 — Career Coaching for Germany & DACH Market"
        description="German salary benchmarks, EU Blue Card guidance, and job search strategy for Germany and the DACH region."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/ai-career-coach-germany`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach Germany", url: `${BASE_URL}/ai-career-coach-germany` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #DD0000 45%, #FFCE00 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🇩🇪 Germany · DACH · EU Blue Card · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            AI Career Coach<br />
            <span className="text-white/50">Germany</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Career coaching for Germany&apos;s job market — EU Blue Card guidance, German CV format, StepStone and Xing strategy, salary benchmarks, and interview prep for German employers.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · Germany & DACH · For expats and locals</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">German salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Gross annual salary in EUR. Germany has progressive income tax — effective rate for €80,000 earner is approximately 28–32% (including Sozialversicherung contributions).</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Typical employer</span><span>Gross salary</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}<br /><span className="text-[10px]">{note}</span></span>
                <span className="font-semibold text-[#DD0000]">{range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Germany job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "German CV (Lebenslauf) writing", desc: "Tabular format, gap-free timeline, German CV conventions — including photo guidance and personal details formatting." },
              { title: "EU Blue Card guidance", desc: "Blue Card eligibility check, application process overview, and salary threshold verification for your role and qualification level." },
              { title: "German interview prep", desc: "Interview coaching calibrated to German corporate culture — more formal, structured, and qualification-focused than US/UK norms." },
              { title: "StepStone and Xing optimization", desc: "Xing profile optimization and StepStone application strategy for the German professional market." },
              { title: "DACH salary negotiation", desc: "German, Austrian, and Swiss salary benchmarks — and how to negotiate in a market where counter-offers are less common." },
              { title: "Anschreiben (cover letter) writing", desc: "German-style cover letter writing that follows Anschreiben conventions — formal, structured, and role-specific." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #DD0000 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your Germany role with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">German CV writing, EU Blue Card guidance, and German market interview prep — available 24/7, free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#DD0000]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
