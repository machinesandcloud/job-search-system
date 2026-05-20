import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "UK CV Template 2025 — Free Word & PDF Templates With Examples",
  description: "Free UK CV templates with word-for-word examples for every section. Covers professional, graduate, career change, and ATS-optimised formats. Updated 2025.",
  keywords: ["UK CV template", "CV template UK 2025", "free UK CV template", "UK CV format 2025", "CV template download UK", "graduate CV template UK", "professional CV template UK", "ATS CV template UK"],
  alternates: { canonical: "/blog/cv-template-uk" },
  openGraph: { title: "UK CV Template 2025 — Free Templates With Examples", description: "Free UK CV templates for professional, graduate, and career-change roles. ATS-optimised.", url: "/blog/cv-template-uk" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the best CV format for UK jobs?", answer: "The reverse chronological format is the standard for UK CVs and works for 90% of job seekers. It lists your most recent experience first. The functional CV format (skills-led) is not recommended for most UK roles — many UK recruiters and ATS systems view it negatively, as it can appear to be hiding a career gap or lack of experience." },
  { question: "Should my UK CV have colour?", answer: "Subtle colour is fine for most roles — a coloured header or accent colour is widely used. Avoid heavy use of colour, complex graphics, or coloured backgrounds for the body text. For conservative industries (law, finance, NHS, Civil Service), stick to black and white. For creative roles (marketing, design), more colour is acceptable." },
  { question: "How do I write a CV with no experience UK?", answer: "For a UK CV with no experience: lead with a strong personal statement focused on skills and what you're looking for; include a skills section highlighting transferable skills; replace work experience with part-time jobs, volunteering, university projects, or extracurricular activities; put education near the top if you're a recent graduate. Quantify every contribution, even small ones." },
  { question: "What font should I use for a UK CV?", answer: "The most professional and ATS-safe fonts for UK CVs are: Calibri (size 11), Arial (size 11), Garamond (size 12), or Georgia (size 11.5). Avoid Times New Roman (dated), Comic Sans (unprofessional), or any decorative fonts. Consistency matters more than font choice — pick one and use it throughout." },
];

const SECTIONS = [
  {
    name: "Header",
    required: true,
    example: `James Taylor\nLondon, UK · james.taylor@email.co.uk · +44 7700 900123 · linkedin.com/in/jamestaylor`,
    notes: "Name on one line (large, bold). Below: city, email, phone, LinkedIn URL. No street address, no date of birth, no photo.",
  },
  {
    name: "Personal Statement",
    required: true,
    example: `A results-driven Senior Product Manager with 8 years' experience in B2B SaaS across fintech and HR tech. Specialises in 0-to-1 product development, with two product launches reaching £10M ARR within 18 months. Seeking a lead PM role at a Series B–D company with full product line ownership.`,
    notes: "2–4 sentences. Written in third person. Lead with level + specialism, include one proof point, state what you're looking for.",
  },
  {
    name: "Work Experience",
    required: true,
    example: `Senior Product Manager | Fintech Startup | March 2021 – Present\n• Led 0-to-1 development of a payment reconciliation product, generating £8M ARR in 12 months\n• Managed a cross-functional team of 11 (3 engineers, 2 designers, 1 data analyst) across 2 time zones\n• Reduced customer onboarding time by 40% through a redesigned onboarding flow (NPS +18 points)`,
    notes: "Reverse chronological. Job title | Company | Dates (Month Year – Month Year). 3–5 bullets per role. Start each bullet with an action verb. Include numbers wherever possible.",
  },
  {
    name: "Education",
    required: true,
    example: `BSc Computer Science | University of Edinburgh | 2013–2016\nClassification: 2:1 (Upper Second-Class Honours)\nDissertation: Machine Learning Applications in Financial Fraud Detection (78% mark)`,
    notes: "Degree, institution, years. Include classification (1st / 2:1 / 2:2). Include dissertation or relevant modules only if recent grad or highly relevant.",
  },
  {
    name: "Skills",
    required: false,
    example: `Technical: SQL, Tableau, JIRA, Figma, Mixpanel, Amplitude\nMethodologies: Agile, Scrum, OKRs, Jobs-to-be-Done\nLanguages: English (native), French (working proficiency)`,
    notes: "Keep it relevant to the role. Remove soft skills (they're assumed). Add languages and certifications here.",
  },
];

export default async function CvTemplateUkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="UK CV Template 2025" description="Free UK CV templates for professional, graduate, and career-change roles. ATS-optimised." url={`${BASE_URL}/blog/cv-template-uk`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "UK CV Template", url: `${BASE_URL}/blog/cv-template-uk` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 55%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">🇬🇧 UK Guide</span>
            <span className="text-[12px] text-white/35">11 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">UK CV Template 2025:<br /><span className="text-white/55">The Format That Gets UK Interviews</span></h1>
          <p className="mt-5 text-[15px] leading-7 text-white/50">Word-for-word examples of every CV section — personal statement, work experience, education, and skills. ATS-optimised for UK employers.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15px] leading-8 text-[var(--muted)]">

          <div className="rounded-2xl border border-[#012169]/15 bg-[#012169]/[0.03] p-5">
            <p className="text-[14px] font-medium text-[#012169]">This template is built specifically for UK employers. It uses UK conventions (2-page standard, British English, personal statement structure) and is optimised for the ATS systems used by UK companies. For US resume templates, see our <Link href="/blog/software-engineer-resume" className="underline">resume writing guide</Link>.</p>
          </div>

          <h2 className="!mt-10 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">The UK CV structure — with examples</h2>
          <p>Each section below includes an annotated example you can copy directly.</p>

          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.name} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{section.name}</p>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${section.required ? "bg-[#012169]/10 text-[#012169]" : "bg-slate-100 text-slate-500"}`}>
                    {section.required ? "Required" : "Optional"}
                  </span>
                </div>
                <div className="p-5">
                  <div className="mb-4 rounded-xl bg-slate-50 border border-slate-100 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Example</p>
                    <pre className="text-[13px] leading-6 text-[var(--ink)] whitespace-pre-wrap font-sans">{section.example}</pre>
                  </div>
                  <p className="text-[13px] leading-6"><span className="font-bold text-[var(--ink)]">Notes: </span>{section.notes}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">What not to include on a UK CV</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { item: "Photo", reason: "Not standard in UK hiring — can trigger bias concerns" },
              { item: "Date of birth / age", reason: "Age discrimination law — never required or appropriate" },
              { item: "Marital status / nationality", reason: "Not required; potentially disadvantageous" },
              { item: "References", reason: "Omit 'references available on request' — it's outdated" },
              { item: "Hobbies (generic)", reason: "'Reading, cooking, socialising' — says nothing. Only include if genuinely relevant" },
              { item: "Objective statement", reason: "This is an American convention — UK CVs use personal statements instead" },
            ].map((item) => (
              <div key={item.item} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <span className="mt-0.5 text-red-500 font-bold text-[13px]">✗</span>
                <div>
                  <p className="font-bold text-[var(--ink)] text-[13px]">{item.item}</p>
                  <p className="text-[12px] text-[var(--muted)]">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">CV frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#012169]/20 bg-[#012169]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Build your UK CV with AI — ATS-scored from the start</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari produces ATS-optimised UK CVs by asking you targeted questions about your experience and the role. Free first session.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl px-8 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#012169" }}>
              Build my UK CV free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">Related guides</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/blog/uk-cv-writing-tips", label: "UK CV Writing Tips" },
                { href: "/blog/uk-interview-tips", label: "UK Interview Tips" },
                { href: "/blog/graduate-jobs-uk", label: "Graduate Jobs UK" },
                { href: "/ai-career-coach-uk", label: "AI Career Coach UK" },
                { href: "/blog/ats-resume-tips", label: "ATS Optimisation" },
                { href: "/blog/professional-summary-for-resume", label: "Professional Summary Guide" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[12px] font-medium text-[var(--brand)] hover:bg-[var(--brand)]/5 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
