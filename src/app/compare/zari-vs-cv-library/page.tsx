import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs CV-Library — Best for UK Job Seekers? (2025)",
  description:
    "CV-Library is one of the UK's largest independent job boards — with over 180,000 active jobs across every industry and region. Zari is an AI career coach that optimizes your CV, coaches interviews, and helps you negotiate offers. Full comparison for UK job seekers.",
  keywords: ["zari vs cv-library", "cv-library uk", "cv library job board", "uk job sites 2025", "ai career coach uk", "cv-library alternatives", "best uk job boards 2025"],
  alternates: { canonical: "/compare/zari-vs-cv-library" },
  openGraph: {
    title: "Zari vs CV-Library (2025) — Best for UK Job Seekers?",
    description: "CV-Library has 180,000+ active UK jobs. Zari coaches you to land them — CV optimization, interview prep, and UK salary negotiation. Full comparison.",
    url: "/compare/zari-vs-cv-library",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery across the UK",
    cvlibrary: { capable: true, detail: "CV-Library is one of the UK's largest independent job boards — with over 180,000 active jobs posted by direct employers and recruitment agencies across London, Manchester, Birmingham, Leeds, and every UK region. As a UK-owned platform, CV-Library has strong relationships with British SMEs and regional employers who prefer domestic job boards over global platforms. For UK job seekers, CV-Library operates alongside Reed.co.uk and Totaljobs as a primary discovery channel." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For UK job seekers: use CV-Library, Reed.co.uk, and LinkedIn to find your target roles — then bring the specific job description to Zari to optimize your CV and prepare for the competency-based interview." },
    winner: "cvlibrary",
  },
  {
    task: "Salary insights for UK roles",
    cvlibrary: { capable: true, detail: "CV-Library provides salary data and insights for the UK market — including average salaries by role, location, and sector. This is useful for assessing whether a role's advertised salary is competitive, understanding regional salary differences across the UK, and preparing a data-backed negotiation position." },
    zari: { capable: true, detail: "Zari incorporates UK salary market data into negotiation coaching — helping you position your counter offer with specific market evidence and coaching the full negotiation conversation, including UK-specific total compensation components like pension, holiday entitlement, and private health." },
    winner: "cvlibrary",
  },
  {
    task: "CV optimization for UK ATS systems",
    cvlibrary: { capable: false, detail: "CV-Library allows CV upload and profile creation but doesn't analyze your CV against specific job descriptions or optimize for ATS keyword matching. Applications through CV-Library route into employer ATS systems — the same global platforms (Workday, Taleo, Greenhouse) used by UK employers — that filter CVs before any human review." },
    zari: { capable: true, detail: "Zari analyzes your CV against the specific CV-Library job description — identifying keyword gaps, rewriting weak bullets for UK hiring norms (competency-based language, outcome-focused bullets), and validating formatting for the ATS systems used by UK employers. UK CV conventions (2 pages, professional summary, no photo required for most professional roles) are handled alongside ATS optimization." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    cvlibrary: { capable: false, detail: "CV-Library provides job listings and some career content but no personalized interview coaching. UK interviews — particularly the competency-based format used by most larger employers and all public sector organizations — are entirely the candidate's responsibility to prepare for." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the CV-Library job description, evaluates your competency-based answers using the STAR framework, and coaches both behavioral and technical interview patterns for the specific role type and sector you're targeting." },
    winner: "zari",
  },
  {
    task: "Profile visibility to UK recruiters",
    cvlibrary: { capable: true, detail: "CV-Library maintains a large searchable CV database actively used by UK employers and recruitment agencies. With 8 million registered candidates, CV-Library's database is one of the largest in the UK — making a complete, keyword-rich profile an important passive search asset alongside active applications." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. Zari's LinkedIn optimization improves your visibility to UK recruiters sourcing on LinkedIn — which operates as a parallel channel to CV-Library, particularly for professional, management, and technical roles." },
    winner: "cvlibrary",
  },
  {
    task: "LinkedIn profile optimization",
    cvlibrary: { capable: false, detail: "No LinkedIn integration or profile optimization. CV-Library and LinkedIn are parallel sourcing channels — optimizing your CV-Library profile doesn't affect your LinkedIn discoverability to the same UK recruiters and employers sourcing on both platforms." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for UK recruiter search visibility — important because most professional employers who post on CV-Library also source passively on LinkedIn, particularly for senior and specialized roles." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    cvlibrary: { capable: false, detail: "CV-Library provides salary data but no negotiation coaching. UK salary negotiation involves specific conventions — counter offers are standard but total compensation (pension contributions above the 3% statutory minimum, holiday above 28 days, private health, flexible working, and bonus) is often where the most value can be recovered when base salary flexibility is limited." },
    zari: { capable: true, detail: "Zari coaches the full UK negotiation sequence — calculating your counter, scripting the conversation, handling every common pushback including 'we're at the top of the band,' and negotiating total compensation components specific to UK employment law and norms." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const cvlibrary = TASK_COMPARISON.filter(r => r.winner === "cvlibrary").length;
  return { zari, cvlibrary, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is CV-Library one of the biggest job boards in the UK?", answer: "Yes — CV-Library is one of the UK's largest independent job boards, with over 180,000 active jobs and 8 million registered candidates. As a UK-owned platform focused exclusively on the British market, it has strong relationships with regional employers and SMEs that may not advertise on global platforms like LinkedIn or Indeed. For UK job seekers, CV-Library is a useful complement to Reed.co.uk and Indeed.co.uk — particularly for roles at smaller employers and those outside major metropolitan areas." },
  { question: "What makes a strong UK CV different from a US resume?", answer: "Key differences: (1) Length — UK CVs are typically 2 pages for experienced professionals; US resumes are usually 1 page; (2) Photos — more common on UK CVs than in the US, though not universal for professional roles; (3) References — UK CVs often include 'References available upon request' or two named referees; (4) Tone — UK CVs tend to be slightly more formal and understated than US resumes in how accomplishments are framed; (5) ATS formatting rules are identical — both countries use the same global ATS platforms, so keyword optimization and clean formatting apply equally." },
  { question: "How do UK employers search CV-Library's database?", answer: "UK employers and recruitment agencies search CV-Library's candidate database using keyword search — looking for job titles, skills, certifications, location, and industry terms. To maximize discoverability: include your target job title in your CV headline and throughout your experience descriptions; list all relevant qualifications, certifications, and skills explicitly; include your current and target location; and keep your profile updated, since CV-Library's algorithm prioritizes recently active candidates. The same ATS keyword principles that apply to job applications apply to database search discoverability." },
];

export default async function ZariVsCvLibraryPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs CV-Library", url: `${BASE_URL}/compare/zari-vs-cv-library` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs CV-Library</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            CV-Library is one of the UK&apos;s largest independent job boards — with over 180,000 active jobs and strong regional employer coverage. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.cvlibrary}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">CV-Library wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE_DATA.total} evaluated job search tasks</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4">
            {TASK_COMPARISON.map((row) => (
              <div key={row.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "cvlibrary" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.cvlibrary.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">CV-Library {row.cvlibrary.capable ? "✓" : "✗"}</p>
                      {row.winner === "cvlibrary" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.cvlibrary.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--brand)]">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a UK role on CV-Library? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your CV for UK ATS systems, coaches your competency-based interview, and helps you negotiate the full UK package — base, pension, holiday, and benefits. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
