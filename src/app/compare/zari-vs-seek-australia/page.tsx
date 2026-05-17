import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs SEEK — Best for Job Seekers in Australia? (2025)",
  description:
    "SEEK is Australia's #1 job board — with millions of active listings across every industry, role level, and location in Australia and New Zealand. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate offers. Full comparison for Australian job seekers.",
  keywords: ["zari vs seek", "seek australia jobs", "seek job board review 2025", "seek alternatives australia", "best job board australia 2025", "australia job search", "seek.com.au review", "ai career coach australia"],
  alternates: { canonical: "/compare/zari-vs-seek-australia" },
  openGraph: {
    title: "Zari vs SEEK Australia (2025) — Best for Australian Job Seekers?",
    description: "SEEK is Australia's #1 job board. Zari coaches you to land those roles — resume optimization, interview prep, and offer negotiation for the Australian market.",
    url: "/compare/zari-vs-seek-australia",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery across Australia and New Zealand",
    seek: { capable: true, detail: "SEEK is Australia's dominant job board by every measure — listing volume, monthly active users, and employer adoption. With millions of active listings across Sydney, Melbourne, Brisbane, Perth, Adelaide, Auckland, and regional Australia, SEEK covers roles across industries including mining and resources, financial services, healthcare, construction, technology, retail, and government. For Australian job seekers, SEEK is the non-negotiable primary job board — the equivalent of LinkedIn Jobs in the US market but with even stronger domestic market penetration." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For Australian job seekers: SEEK is your primary listing channel — supplement with LinkedIn for MNC and corporate roles, Indeed.com.au for additional volume, and specific professional association job boards (e.g., CPA Australia, Engineers Australia) for credentialed roles. Bring any SEEK job description to Zari to optimize your application." },
    winner: "seek",
  },
  {
    task: "Resume profile visibility to Australian employers",
    seek: { capable: true, detail: "SEEK Talent Search allows Australian employers and recruitment agencies to search SEEK's candidate database. A complete, keyword-optimized SEEK profile creates passive visibility for roles that may not be publicly advertised — particularly with the large recruitment agency sector in Australia (Michael Page, Hays, Robert Half, Randstad, Hudson all actively source from SEEK). For professionals open to being approached by agencies, an up-to-date SEEK profile is essential." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. For passive discoverability in the Australian market: SEEK profile optimization covers the local and agency market; LinkedIn optimization covers MNC, tech, and international employer sourcing." },
    winner: "seek",
  },
  {
    task: "ATS resume optimization for Australian employers",
    seek: { capable: false, detail: "SEEK allows resume uploads but doesn't optimize your CV against specific job descriptions or for the ATS systems used by Australian employers. Large Australian employers — Commonwealth Bank, Woolworths, BHP, Telstra, ANZ, government departments — use ATS systems (Workday, Taleo, SuccessFactors) that filter applications before human review. SEEK's recruiter platform also uses matching algorithms that favor keyword-rich profiles." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific SEEK job description — identifying keyword gaps for Australian hiring terminology (selection criteria in government applications, capability frameworks), rewriting bullets to lead with quantified impact, and validating ATS formatting for the platforms used by major Australian employers. For government roles specifically, Zari helps structure the mandatory selection criteria responses that are required by most Australian public sector applications." },
    winner: "zari",
  },
  {
    task: "Interview preparation for Australian roles",
    seek: { capable: false, detail: "SEEK provides career content and some interview guidance but no personalized, role-specific interview coaching. Australian interview norms vary by sector: government and large corporate interviews typically use structured competency-based frameworks (often with stated selection criteria); tech company interviews increasingly mirror US-style behavioral and technical rounds; resource sector interviews emphasize safety culture and technical competence; and small business interviews are often more conversational." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the SEEK job description and coaches your answers for the specific Australian employer type — including coaching on addressing the formal selection criteria common in government applications, competency-based responses for large corporate interviews, and technical competency demonstrations for mining, engineering, and specialized professional roles." },
    winner: "zari",
  },
  {
    task: "Australian salary benchmarking",
    seek: { capable: true, detail: "SEEK's Salary Insights tool provides Australian market salary data by job title, industry, experience, and location — including the significant differences between Sydney and Melbourne vs. regional and state capital markets. This is calibrated to the Australian market in ways that global tools often aren't. SEEK also provides data on hiring trends, in-demand skills, and candidate supply/demand dynamics that are useful for understanding leverage in the Australian job market." },
    zari: { capable: true, detail: "Zari incorporates Australian compensation context into negotiation coaching — including how to use SEEK salary data as a negotiating reference, the Australian superannuation component of total compensation (currently 11.5%), packaging options (salary sacrifice, novated leases), and negotiation norms specific to the Australian market where direct salary discussion is typically less taboo than in some other markets." },
    winner: "seek",
  },
  {
    task: "LinkedIn profile optimization",
    seek: { capable: false, detail: "No LinkedIn integration or optimization. In Australia, SEEK and LinkedIn serve overlapping but distinct audiences — SEEK for active job searching and domestic employer/agency sourcing; LinkedIn for MNCs, technology companies, international employers, and passive sourcing by international-focused recruiters." },
    zari: { capable: true, detail: "Zari optimizes your LinkedIn profile for Australian and international employer visibility — including positioning experience for the Australian market context, using Australian-specific keywords and role titles (e.g., 'Commercial Manager' rather than 'VP of Sales' in Australian corporate culture), and ensuring discoverability to the international employers and executive search firms that source Australian senior talent on LinkedIn." },
    winner: "zari",
  },
  {
    task: "Salary negotiation for Australian roles",
    seek: { capable: false, detail: "SEEK provides salary data but no negotiation coaching. Australian salary negotiation has specific contexts: the Fair Work framework sets minimum conditions and Award rates in many industries, creating a floor that's non-negotiable but also a clear market benchmark; total remuneration discussions should include superannuation; and salary packaging options (particularly in NFP and healthcare sectors) can significantly affect effective take-home pay." },
    zari: { capable: true, detail: "Zari coaches salary negotiation for the Australian market — including how to discuss superannuation (always clarify whether a quoted salary is inclusive or exclusive of super), how to negotiate salary packaging in sectors where it's available, and how to benchmark against SEEK Salary Insights data in a negotiation conversation. Includes guidance on the Award Rate floor relevant in industries where Awards apply." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const seek = TASK_COMPARISON.filter(r => r.winner === "seek").length;
  return { zari, seek, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is SEEK the best job board in Australia?", answer: "SEEK is Australia's dominant job board by listing volume and employer adoption — it's effectively the non-negotiable primary job board for Australian job searching. That said, 'best' depends on your role and industry: LinkedIn is essential for senior, MNC, and technology roles where passive sourcing is common; Indeed.com.au adds volume for high-frequency searching; professional association job boards (CPA Australia for accounting, Engineers Australia, AHPRA-adjacent boards for healthcare) are critical for credentialed roles; and government jobs are posted on APSJobs (federal) and state government portals that operate independently of SEEK. The effective approach: SEEK as your primary channel + LinkedIn for your industry + sector-specific boards where relevant." },
  { question: "How is Australian superannuation handled in salary discussions?", answer: "Superannuation (super) is Australia's mandatory retirement contribution — currently 11.5% of salary, paid by the employer in addition to base salary. This is a significant addition to total compensation that affects how Australian salaries should be compared internationally and with each other. Critical in negotiations: always clarify whether a quoted salary is 'base + super' (the total employer cost is base × 1.115) or 'package inclusive of super' (meaning super comes out of the stated package). For example, a $100K 'package inclusive of super' equals roughly $87K base; a $100K 'base + super' equals roughly $115K total employer cost. This distinction is frequently unclear in job ads — always confirm before accepting." },
  { question: "What are selection criteria in Australian government job applications?", answer: "Selection criteria are the formal competency statements required in most Australian public sector job applications (federal, state, and local government). Instead of a cover letter, you typically respond to 3-6 specific criteria such as 'Demonstrated ability to manage competing priorities in a high-volume environment' with a structured response (usually using the STAR method). Each criterion response is 200-400 words. Selection criteria responses are the primary filter in government hiring — a strong resume with weak criteria responses will not advance. Criteria responses are evaluated separately from resumes, and your responses are often scored by a panel against specific behavioral indicators." },
];

export default async function ZariVsSeekAustraliaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs SEEK Australia", url: `${BASE_URL}/compare/zari-vs-seek-australia` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs SEEK</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            SEEK is Australia&apos;s #1 job board — millions of active listings across every industry and location in Australia and New Zealand. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.seek}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">SEEK wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "seek" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.seek.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">SEEK {row.seek.capable ? "✓" : "✗"}</p>
                      {row.winner === "seek" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.seek.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on SEEK? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific SEEK role, coaches your interview for Australian employer norms (including selection criteria for government roles), and helps negotiate your total package. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
