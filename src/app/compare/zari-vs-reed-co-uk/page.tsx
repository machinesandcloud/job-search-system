import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Reed.co.uk — Best for Job Seekers in the UK? (2025)",
  description:
    "Reed.co.uk is one of the UK's largest job boards — with listings across London, Manchester, Birmingham, and every major UK market. Zari is an AI career coach that optimizes your CV, coaches interviews, and helps you negotiate offers. Full comparison for UK job seekers.",
  keywords: ["zari vs reed", "reed.co.uk job board", "reed uk jobs", "uk job search 2025", "ai career coach uk", "reed alternatives", "best job search uk"],
  alternates: { canonical: "/compare/zari-vs-reed-co-uk" },
  openGraph: {
    title: "Zari vs Reed.co.uk (2025) — Best for UK Job Seekers?",
    description: "Reed.co.uk finds jobs across the UK. Zari coaches you to land them — CV optimization, interview prep, and salary negotiation. Full comparison.",
    url: "/compare/zari-vs-reed-co-uk",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery in the UK",
    reed: { capable: true, detail: "Reed.co.uk is one of the UK's largest and most established job boards — with listings across London, Manchester, Birmingham, Leeds, Bristol, and every major UK market. Reed covers roles from entry-level through executive and operates across all industries including public sector, finance, healthcare, retail, and technology. For UK job seekers, Reed is a primary search channel alongside Indeed.co.uk and LinkedIn." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings in any geography. For UK job seekers: use Reed.co.uk, Indeed.co.uk, and LinkedIn to find your target roles — then bring the specific job description to Zari to optimize your CV and prepare for the interview." },
    winner: "reed",
  },
  {
    task: "Salary data for the UK market",
    reed: { capable: true, detail: "Reed provides salary data for the UK market — covering role-specific compensation by job title, location (London vs. regional UK), and industry. This is particularly useful for candidates navigating the significant salary gap between London and regional UK markets, or assessing contractor day rates vs. permanent salary equivalents." },
    zari: { capable: true, detail: "Zari incorporates UK compensation context into negotiation coaching — helping you use market rate data strategically in a counter offer conversation, including the UK-specific dynamics of base salary, pension contributions, holiday entitlement, and bonus structure." },
    winner: "reed",
  },
  {
    task: "CV optimization for UK ATS systems",
    reed: { capable: false, detail: "Reed allows CV upload and profile creation but doesn't analyze your CV against specific job descriptions or provide ATS keyword optimization. UK employers use the same ATS platforms as global employers (Workday, Taleo, Greenhouse) — Reed routes your application into these systems but provides no tools to optimize for them." },
    zari: { capable: true, detail: "Zari analyzes your CV against the specific Reed job description — identifying keyword gaps, rewriting weak bullets, and validating formatting for ATS systems used by UK employers. UK CV conventions (typically 2 pages, no photos, no references section, professional summary at top) are handled alongside ATS optimization." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    reed: { capable: false, detail: "Reed provides job listings and some career articles but no personalized interview coaching. UK interview formats — which often include competency-based questions, assessment centres, and case studies depending on sector — are entirely the candidate's responsibility to prepare for." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the Reed job description, evaluates your competency-based answer structure, and coaches both behavioral and technical interview formats. UK interviews heavily weight competency-based questions using STAR format — Zari prepares specifically for this structure and the UK-specific language conventions." },
    winner: "zari",
  },
  {
    task: "Profile visibility to UK recruiters",
    reed: { capable: true, detail: "Reed's CV database is actively searched by UK employers and recruitment agencies. A complete Reed profile creates passive discoverability — UK recruiters and the significant agency recruitment market use Reed's candidate database to source talent, particularly for roles in finance, healthcare, education, and public sector." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. However, Zari's LinkedIn optimization improves your discoverability to the UK recruiters and agencies who also source on LinkedIn — which alongside Reed is a primary sourcing channel for professional roles across all UK markets." },
    winner: "reed",
  },
  {
    task: "LinkedIn profile optimization",
    reed: { capable: false, detail: "No LinkedIn integration or profile optimization capability. Reed and LinkedIn are parallel channels for most UK professional roles — optimizing your Reed profile doesn't improve your LinkedIn discoverability to the recruitment agencies and direct employers sourcing across both platforms." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for recruiter search visibility. UK professional roles — especially London's finance, tech, and professional services sectors — use LinkedIn extensively for both active and passive candidate sourcing alongside Reed and other boards." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    reed: { capable: false, detail: "Reed provides salary data but no negotiation coaching. UK salary negotiation has specific conventions — direct counter-offers are standard but the conversation is typically more reserved than US-style negotiation, and total compensation (base, pension contributions, holiday entitlement above statutory, bonus) all have UK-specific norms that differ significantly from US or Australian practices." },
    zari: { capable: true, detail: "Zari coaches salary negotiation accounting for UK workplace norms — covering counter offer framing, total compensation components (base, employer pension contributions, holiday above the 28-day statutory minimum, private health coverage, bonus structure), and the pushback scripts calibrated for UK hiring practices across sectors and regions." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const reed = TASK_COMPARISON.filter(r => r.winner === "reed").length;
  return { zari, reed, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Reed.co.uk the biggest job board in the UK?", answer: "Reed.co.uk is one of the UK's largest and most established job boards — founded in 1999, it has significant depth across all UK regions and industries. In terms of listing volume, Reed competes with Indeed.co.uk (which aggregates from many sources) and LinkedIn. For professional roles, LinkedIn is increasingly dominant. For public sector, healthcare, and education roles, Reed and Totaljobs are particularly strong. For tech and startup roles, LinkedIn and specialist boards dominate. The practical approach: Reed is a primary channel for most UK searches; LinkedIn and Indeed.co.uk provide additional coverage." },
  { question: "How does a UK CV differ from a US resume?", answer: "Several important differences: (1) Length — UK CVs are typically 2 pages even for mid-career professionals; US resumes are usually 1 page for candidates with under 10 years of experience; (2) Photos — acceptable in the UK (though not universal), avoided in the US due to discrimination law concerns; (3) References — UK CVs often include 'References available upon request' or two referees; US resumes typically don't mention references; (4) Personal details — UK CVs may include nationality or right-to-work status; (5) The term 'CV' vs. 'resume' — in the UK, 'CV' is the standard term regardless of length; (6) ATS formatting rules are identical — keyword optimization and clean formatting apply equally to both." },
  { question: "What makes UK salary negotiation different?", answer: "Key differences from US salary negotiation: (1) Total compensation framing is essential — UK employers often have less flex on base salary but more flex on pension contributions (employer contributions above the 3% statutory minimum are negotiable), holiday entitlement (above the 28-day statutory), and private health/dental coverage; (2) London weighting is a real variable — salary expectations in London are 15–30% higher than regional UK markets for the same role, and this should be referenced explicitly when negotiating for London-based roles; (3) Notice periods are longer in the UK — typically 1–3 months for professional roles, which affects timing of start dates and sometimes creates counter-offer dynamics with current employers; (4) The conversation tone is typically more reserved than US negotiation — confident and direct, but less aggressive in framing." },
];

export default async function ZariVsReedCoUkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Reed.co.uk", url: `${BASE_URL}/compare/zari-vs-reed-co-uk` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Reed.co.uk</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Reed.co.uk is one of the UK&apos;s largest and most established job boards — active across London, Manchester, Birmingham, and every major UK market. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.reed}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Reed wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "reed" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.reed.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Reed.co.uk {row.reed.capable ? "✓" : "✗"}</p>
                      {row.winner === "reed" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.reed.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Reed? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your CV for UK ATS systems, coaches your competency-based interview, and helps you negotiate the full UK offer package. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
