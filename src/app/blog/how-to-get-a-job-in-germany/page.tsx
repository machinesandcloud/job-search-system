import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job in Germany as a Foreigner 2025 — Complete Guide",
  description: "How to get a job in Germany as a foreigner in 2025. EU Blue Card, visa requirements, German CV format, best job boards, and the biggest differences from US/UK job searching.",
  keywords: ["how to get a job in germany", "work in germany as foreigner", "germany job search", "eu blue card germany", "german cv format", "jobs in germany english speaking", "move to germany for work", "germany work visa 2025", "working in germany", "germany job market"],
  alternates: { canonical: "/blog/how-to-get-a-job-in-germany" },
  openGraph: { title: "How to Get a Job in Germany as a Foreigner 2025 — Complete Guide", description: "EU Blue Card, visa requirements, German CV format, best job boards, and the biggest differences from US/UK job searching.", url: "/blog/how-to-get-a-job-in-germany" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What visa do I need to work in Germany?", answer: "The EU Blue Card is the most valuable work visa for skilled professionals from non-EU countries. Requirements: a recognized university degree, a job offer in Germany, and a minimum annual salary of €45,300 (2025) — or €41,041.80 for shortage occupations like STEM, IT, medicine, and nursing. The Blue Card enables permanent residency after 21 months (or 33 months for general Blue Card holders), allows family reunification immediately, and permits work anywhere in the EU. For EU/EEA citizens: no visa needed — you have full freedom of movement. For non-EU citizens without a degree: the Skilled Worker visa (Fachkräfte) exists for recognized vocational qualifications. Germany also offers a 6-month Job Seeker visa that allows you to enter Germany and search for work in person." },
  { question: "Do I need to speak German to get a job in Germany?", answer: "It depends on the role and sector. English-only roles exist and are growing — primarily in: international tech companies (SAP, Siemens Digital, N26, Zalando, Celonis), consulting (McKinsey, BCG, Bain German offices), finance (Deutsche Bank, Goldman Frankfurt), and international startups in Berlin. For most roles outside these sectors — manufacturing, public sector, healthcare, local companies — German at B2 or C1 level is required or strongly preferred. The realistic answer for most job seekers: if you're a software engineer, data scientist, or have rare technical skills, you can find an English-language role at a tech or consulting company. For any people-facing, management, or non-tech role, German is close to essential. Invest 6–12 months in German if you're serious about working in Germany long-term." },
  { question: "What are the best job boards for jobs in Germany?", answer: "The primary German job boards: (1) StepStone.de — Germany's largest job board, equivalent to Indeed in the US. Best for professional roles at major companies. (2) LinkedIn — increasingly standard, especially for tech and international companies. Many international-friendly roles are posted here first. (3) XING — Germany's LinkedIn equivalent, widely used by German companies and recruiters. Less global than LinkedIn but important for local networking. (4) Indeed.de — US model, growing in Germany. Good for volume search. (5) Bundesagentur für Arbeit (arbeitsagentur.de) — official federal job agency, required for visa documentation in some cases. For tech specifically: Berlin Startup Jobs (berlinstartupjobs.com), and direct company career pages for companies like SAP, Siemens, BMW, Bosch, BASF, Zalando, and Deutsche Bank." },
  { question: "How is a German CV different from a US/UK resume?", answer: "The German Lebenslauf (CV) has specific conventions that differ significantly from US/UK norms: (1) Professional photo is expected — unlike the US/UK where photos are avoided due to discrimination laws, German CVs typically include a professional headshot in the top-right corner. (2) Personal details — date of birth, nationality, and marital status are commonly included in German CVs. This is legally accepted in Germany. (3) Tabular, structured format — German CVs are typically formatted with dates on the left in a table/list structure, not the narrative bullet-point style common in the US. (4) Chronological, gap-free — unexplained gaps raise red flags in Germany. Be prepared to account for all time periods. (5) Anschreiben (cover letter) — formal cover letters remain standard in Germany, more so than in the US/UK. (6) Zeugnisse (reference letters) — German employers often request official employment certificates (Arbeitszeugnis) from previous employers. Request these from past German employers." },
];

const VISA_TYPES = [
  { visa: "EU Blue Card", requirement: "University degree + job offer + €45,300/yr salary", best_for: "Skilled professionals — fastest path to PR" },
  { visa: "Blue Card (shortage occupation)", requirement: "STEM/IT/medical degree + €41,041.80/yr", best_for: "Engineers, doctors, IT specialists — lower threshold" },
  { visa: "Skilled Worker Visa (Fachkräfte)", requirement: "Recognized vocational qualification + job offer", best_for: "Tradespeople, technicians without university degree" },
  { visa: "Job Seeker Visa", requirement: "University degree + proof of funds", best_for: "6 months in-person job search; no work permitted yet" },
  { visa: "Freelance Visa", requirement: "Proof of clients + financial viability", best_for: "Self-employed professionals — complex to obtain" },
];

export default async function HowToGetAJobInGermanyPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Get a Job in Germany as a Foreigner 2025 — Complete Guide"
        description="EU Blue Card, visa requirements, German CV format, best job boards, and the biggest differences from US/UK job searching."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-to-get-a-job-in-germany`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job in Germany", url: `${BASE_URL}/blog/how-to-get-a-job-in-germany` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #DD0000 50%, #FFCE00 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Germany Job Search · EU Blue Card · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Get a Job<br />
            <span className="text-white/70">in Germany</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">
            EU Blue Card requirements, German CV format, the best job boards, and everything that&apos;s different about job searching in Germany compared to the US or UK.
          </p>
          <p className="mt-3 text-[11px] text-white/40">Updated 2025 · 9 min read · For international job seekers</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Germany work visa options for foreigners</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">The EU Blue Card is the most valuable option for degree-holding professionals — it offers the fastest path to permanent residency in the EU.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Visa Type</span><span>Requirements</span><span>Best For</span>
            </div>
            {VISA_TYPES.map(({ visa, requirement, best_for }) => (
              <div key={visa} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold text-[#DD0000]">{visa}</span>
                <span className="text-[var(--muted)] text-[12px]">{requirement}</span>
                <span className="text-[var(--muted)] text-[12px]">{best_for}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[var(--muted)]">Salary thresholds are reviewed annually. Shortage occupations include IT, engineering, mathematics, natural sciences, and human medicine.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">German CV vs US/UK resume — key differences</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { diff: "Professional photo", detail: "Expected in Germany — include a professional headshot (Bewerbungsfoto) in the top-right. In the US/UK, photos are avoided due to discrimination laws. Get a professional photo taken, not a LinkedIn selfie." },
              { diff: "Personal details", detail: "Date of birth, nationality, and marital status are standard in German CVs. This is legally accepted and expected. Don&apos;t omit these as you would for a US application." },
              { diff: "Tabular format", detail: "German Lebensläufe use a structured table: dates on the left, roles/descriptions on the right. Not the narrative bullet-point format common in US/UK resumes." },
              { diff: "Gap-free timeline", detail: "Unexplained gaps raise significant red flags in Germany. Account for every period — including study gaps, travel, or unemployment. List them honestly." },
              { diff: "Anschreiben (cover letter)", detail: "Formal cover letters are still expected in Germany — more so than in the US/UK. One page, addressing the specific role and company, in formal German if possible." },
              { diff: "Zeugnisse (reference certificates)", detail: "German employers issue official Arbeitszeugnis (employment certificates) and expect to see them from previous German employers. Request yours proactively when you leave a German job." },
            ].map(({ diff, detail }) => (
              <div key={diff} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px] text-[#DD0000]">{diff}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Realistic German salary ranges (EUR, 2025)</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Annual Salary (EUR)</span><span>Notes</span>
            </div>
            {[
              { role: "Software Engineer (mid)", salary: "€65,000–€90,000", note: "Berlin ~€70k, Munich ~€85k; equity rare vs US" },
              { role: "Senior Software Engineer", salary: "€85,000–€120,000", note: "FAANG Germany offices pay US-adjacent TC" },
              { role: "Product Manager (mid)", salary: "€70,000–€95,000", note: "Startup PM often lower; Zalando/N26 competitive" },
              { role: "Data Scientist / ML Engineer", salary: "€75,000–€110,000", note: "ML roles growing fast; Siemens, SAP, startups" },
              { role: "Management Consultant", salary: "€80,000–€100,000", note: "Big 3 entry: €75k base + bonus; German offices" },
              { role: "Finance / Investment Banking", salary: "€90,000–€150,000+", note: "Frankfurt IB (Deutsche Bank, Goldman); bonus-heavy" },
              { role: "Engineering Manager", salary: "€100,000–€140,000", note: "Limited equity vs US — total comp gap vs Silicon Valley" },
            ].map(({ role, salary, note }) => (
              <div key={role} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="font-semibold text-[#DD0000]">{salary}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[var(--muted)]">German salaries are gross. After income tax and social contributions (~40–42% effective for mid-career), net take-home is significantly lower than US gross comparisons suggest. Factor in universal healthcare (no out-of-pocket premiums) and 20–30 mandatory vacation days.</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #DD0000 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your German job offer with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/60">Resume optimization for German and international job markets, mock interviews for EU Blue Card-qualifying roles. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#DD0000]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
