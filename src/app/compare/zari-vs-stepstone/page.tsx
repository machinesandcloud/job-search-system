import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Stepstone — Best for Job Seekers in Germany & Europe? (2025)",
  description:
    "Stepstone is one of Europe's largest job boards — with millions of active listings in Germany, Austria, Belgium, the Netherlands, and beyond. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate offers. Full comparison for European job seekers.",
  keywords: ["zari vs stepstone", "stepstone germany", "stepstone jobs", "stepstone review 2025", "germany job search", "european job board 2025", "stepstone alternatives", "best job boards germany", "job search germany 2025"],
  alternates: { canonical: "/compare/zari-vs-stepstone" },
  openGraph: {
    title: "Zari vs Stepstone (2025) — Best for Job Seekers in Germany & Europe?",
    description: "Stepstone is Europe's leading job board with millions of listings in Germany and beyond. Zari coaches you to land those roles — resume optimization, interview prep, and offer negotiation.",
    url: "/compare/zari-vs-stepstone",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery in Germany and Europe",
    stepstone: { capable: true, detail: "Stepstone is one of Europe's largest and most-visited job boards — particularly dominant in Germany, with strong coverage in Austria, Belgium, the Netherlands, and other European markets. With millions of active job listings across all industries and seniority levels, Stepstone is a primary discovery channel for German-market job seekers alongside LinkedIn and XING. Its listing volume is significantly higher than XING, covering everything from Ausbildung (apprenticeship) and entry-level positions through to senior management and executive roles. For broad German job market coverage by volume, Stepstone is the top choice." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For German job seekers: use Stepstone for broad volume coverage across all industries; supplement with XING for Mittelstand and traditional industry roles, LinkedIn for MNCs and international employers, and Indeed.de for maximum total volume. Bring any Stepstone job description to Zari to optimize your application." },
    winner: "stepstone",
  },
  {
    task: "Salary benchmarking for European roles",
    stepstone: { capable: true, detail: "Stepstone's salary research tool (Gehaltsreport) is one of the most comprehensive salary benchmarking resources for the German market — covering gross salary by job function, industry, experience level, and German federal state. This is more Germany-specific than global tools like Glassdoor, and the Stepstone Gehaltsreport is frequently referenced in German salary negotiation conversations as a credible market benchmark." },
    zari: { capable: true, detail: "Zari incorporates German compensation context into negotiation coaching — including how to use market data (including Stepstone Gehaltsreport) effectively in German salary conversations, how to negotiate within Tarifvertrag (collective bargaining agreement) constraints, and how to handle the 13th month salary, holiday pay (Urlaubsgeld), and other standard German employment benefits that are part of total compensation." },
    winner: "stepstone",
  },
  {
    task: "Resume / CV optimization for German employers",
    stepstone: { capable: false, detail: "Stepstone allows CV uploads and profile creation but doesn't optimize your Lebenslauf against specific job descriptions or for the ATS systems used by German employers. Large German employers use SAP SuccessFactors extensively, and the parsing requirements differ from US-market ATS platforms. German CV conventions (professional photo optional but common, strict chronological format, specific sections for Ausbildung and Weiterbildung) also differ from English-language resume norms." },
    zari: { capable: true, detail: "Zari analyzes your CV against the specific Stepstone job description — identifying keyword gaps in German-specific terminology (Fachkenntnisse, Berufserfahrung, Führungserfahrung), rewriting bullets to lead with quantified impact, and validating ATS formatting for SAP SuccessFactors and other platforms dominant in German corporate environments." },
    winner: "zari",
  },
  {
    task: "Interview preparation for German employers",
    stepstone: { capable: false, detail: "Stepstone provides job listings and career content but no personalized interview coaching. German interview processes are typically structured and formal: thorough behavioral questions (Situationsfragen), detailed competency assessments, and often longer overall interview processes than UK or US equivalents. Technical depth and domain expertise are assessed more rigorously in many German industries — particularly engineering, manufacturing, and financial services." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the Stepstone job description and coaches you on German interview expectations — structured competency answers, technical depth demonstrations, and how to present your Werdegang (career path) coherently. Includes coaching on German interview norms: the importance of precision and thoroughness in answers, how to address Gehaltsvorstellungen (salary expectations) questions, and the Probezeit (probationary period) conversations common at job offer stage." },
    winner: "zari",
  },
  {
    task: "LinkedIn profile optimization",
    stepstone: { capable: false, detail: "No LinkedIn integration. In Germany, LinkedIn and Stepstone/XING are parallel channels — Stepstone for active job searching via listings, LinkedIn for passive sourcing by international employers and executive search firms. German professionals increasingly maintain both German-platform profiles and LinkedIn, particularly for roles with international dimension." },
    zari: { capable: true, detail: "Zari optimizes your LinkedIn profile for German and European recruiter visibility — including positioning your qualifications and experience for the international employer market operating in Germany, and ensuring your profile's language and content resonates with both German-market and English-language sourcing searches." },
    winner: "zari",
  },
  {
    task: "Salary negotiation for German roles",
    stepstone: { capable: false, detail: "Stepstone provides salary data but no negotiation coaching. German salary negotiation has specific characteristics: compensation conversations are typically more reserved than US or UK norms; Tarifvertrag (collective bargaining agreement) constraints limit negotiation in many sectors; the 13th month salary and annual bonus structures are standard considerations; and Gehaltsverhandlung (salary negotiation) often happens in one structured conversation rather than multiple rounds." },
    zari: { capable: true, detail: "Zari coaches salary negotiation calibrated to the specific employer and sector in the German market — including how to navigate Tarifvertrag constraints, how to use Stepstone Gehaltsreport data as a negotiating reference, and how to structure the Gehaltsverhandlung conversation in a way that's assertive but aligned with German professional communication norms." },
    winner: "zari",
  },
  {
    task: "Application tracking and job alert management",
    stepstone: { capable: true, detail: "Stepstone offers robust job alert and application tracking functionality — email alerts for new listings matching your criteria, saved job functionality, and application status tracking within the platform. For high-volume job searching in the German market, these organizational features help manage an active search across Stepstone's large listing database." },
    zari: { capable: false, detail: "Zari doesn't track applications or manage job alerts. Zari focuses on optimizing each individual application — resume, interview preparation, and offer negotiation — rather than managing the volume of the search itself. Use Stepstone's job alert system to surface relevant listings, then use Zari to optimize your applications to the most relevant ones." },
    winner: "stepstone",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const stepstone = TASK_COMPARISON.filter(r => r.winner === "stepstone").length;
  return { zari, stepstone, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Stepstone the best job board in Germany?", answer: "Stepstone is one of Germany's highest-traffic job boards by listing volume and visitor count — but 'best' depends on your target role and seniority. For broad coverage across industries and seniority levels, Stepstone leads in Germany alongside Indeed.de. For Mittelstand companies and traditional German industries, XING often has better coverage due to its stronger penetration with established German employers. For senior and executive roles, Stepstone Premium and GulfTalent-equivalent platforms, combined with direct executive search firm relationships, are often more effective. The practical approach: use Stepstone as your primary high-volume discovery channel and supplement with XING for Mittelstand roles and LinkedIn for MNC and international roles." },
  { question: "Do German employers prefer German-language or English-language applications?", answer: "It depends on the employer type and role. Traditional German employers, public sector organizations, and Mittelstand companies generally expect German-language applications — a German Lebenslauf, German cover letter (Anschreiben), and German-language communication throughout. International companies with German offices, tech startups, and companies with English as their working language may accept or even prefer English applications. The safest approach: if the job posting is in German, apply in German; if it's in English or dual-language, English is acceptable. If in doubt, a German application is always safer for German employers and signals cultural integration." },
  { question: "How does the German Probezeit (probationary period) affect your employment?", answer: "The Probezeit (probationary period) is typically 3-6 months at the start of German employment, during which both employer and employee can terminate the contract with shorter notice (usually 2 weeks rather than the standard 1-3 months). During Probezeit: you have the same legal protections as other employees in most respects (you can't be discriminated against or mistreated), but the reduced notice period makes the relationship easier to exit for both parties. In salary negotiation, you can ask about Probezeit conditions: some employers offer a salary review after successful completion of the probationary period — this is worth negotiating explicitly if the initial offer is below your target." },
];

export default async function ZariVsStepstonePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Stepstone", url: `${BASE_URL}/compare/zari-vs-stepstone` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Stepstone</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Stepstone is one of Europe&apos;s largest job boards — millions of active listings in Germany, Austria, Belgium, and the Netherlands. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.stepstone}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Stepstone wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "stepstone" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.stepstone.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Stepstone {row.stepstone.capable ? "✓" : "✗"}</p>
                      {row.winner === "stepstone" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.stepstone.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4361EE]">Wins</span>}
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Stepstone? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your Lebenslauf for the specific role, coaches your interview for German employer norms, and helps negotiate your Gesamtvergütung. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
