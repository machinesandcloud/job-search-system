import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Bayt.com — Best for Job Seekers in the Middle East? (2025)",
  description:
    "Bayt.com is the leading job board in the Arab world — with millions of job listings across the UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Egypt, Jordan, and Lebanon. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate offers in the GCC and MENA region.",
  keywords: ["zari vs bayt", "bayt.com review", "bayt.com jobs", "middle east job board 2025", "UAE jobs", "Saudi Arabia jobs", "MENA job search", "GCC careers", "bayt alternatives", "best job sites middle east"],
  alternates: { canonical: "/compare/zari-vs-bayt" },
  openGraph: {
    title: "Zari vs Bayt.com (2025) — Best for Middle East Job Seekers?",
    description: "Bayt.com leads the Arab job market with millions of listings across UAE, Saudi Arabia, and the broader MENA region. Zari coaches you to land those roles. Full comparison.",
    url: "/compare/zari-vs-bayt",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery across the MENA region",
    bayt: { capable: true, detail: "Bayt.com is the dominant job board in the Arab world — with active listings across the UAE (Dubai, Abu Dhabi), Saudi Arabia (Riyadh, Jeddah, NEOM-related roles), Kuwait, Qatar, Bahrain, Egypt, Jordan, and Lebanon. It covers roles in banking and financial services, construction and engineering, oil and gas, real estate, technology, healthcare, hospitality, retail, and government-linked entities. For professionals targeting GCC roles — whether UAE nationals seeking localization-track roles, expatriates looking for sponsored positions, or Arab professionals targeting the GCC from the Levant or Egypt — Bayt is the primary job board alongside LinkedIn." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For MENA job seekers: use Bayt.com as the primary regional discovery channel, LinkedIn for multinational and corporate roles, and specific job boards for niche sectors (GulfTalent for executive roles, Naukrigulf for South Asian expat community roles). Bring any Bayt job description to Zari to optimize your application." },
    winner: "bayt",
  },
  {
    task: "Candidate profile and CV bank visibility",
    bayt: { capable: true, detail: "Bayt.com maintains one of the largest CV databases in the MENA region — searched by thousands of recruiters and HR managers across the Arab world and by international staffing agencies placing professionals into GCC roles. A complete, keyword-optimized Bayt profile creates passive visibility for roles that may not be publicly advertised. Particularly valuable for professionals open to recruitment agency placement, as agencies in Dubai, Abu Dhabi, and Riyadh actively source from Bayt's database." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. For passive discoverability in the MENA market, Bayt profile optimization is the primary channel for local employers; LinkedIn optimization covers MNCs, international organizations, and roles that are sourced by international headhunters placing into GCC markets." },
    winner: "bayt",
  },
  {
    task: "ATS resume optimization for MENA employers",
    bayt: { capable: false, detail: "Bayt.com allows CV uploads and profile creation but doesn't analyze your CV against specific job descriptions or optimize for ATS keyword matching. Large employers in the GCC — multinational banks, petrochemical companies, government-linked entities, and international hospitality groups — use the same global ATS systems (Workday, Oracle Taleo, SAP SuccessFactors) as their international offices, even for locally-hired roles." },
    zari: { capable: true, detail: "Zari analyzes your CV against the specific Bayt job description — identifying keyword gaps, rewriting bullets to surface quantified impact (critical in GCC markets where compensation is often tied to demonstrable performance), and validating ATS formatting. For professionals applying to government or semi-government entities (ADQ, PIF, QatarEnergy, SABIC), ATS optimization is increasingly important as these organizations modernize their hiring infrastructure." },
    winner: "zari",
  },
  {
    task: "Interview preparation for GCC and MENA roles",
    bayt: { capable: false, detail: "Bayt.com provides career resources and articles but no personalized interview coaching. Interview formats in the GCC vary significantly by employer type: international banks and MNCs use structured behavioral or case interviews; local family businesses use relationship-oriented conversations; government and semi-government entities use formal panel interviews; and tech companies (especially in Dubai's DIFC or Abu Dhabi's Hub71 ecosystem) increasingly use global tech interview formats." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the Bayt job description and coaches your answers for the specific interview format — whether that's a competency-based interview at HSBC MENA, a senior panel interview for a government-linked role, or a technical screening for a Dubai-based tech startup. Includes coaching on GCC-specific interview norms: the importance of relationship context, the role of nationalization frameworks (Emiratisation, Saudisation, Kuwaitisation) in interview conversations, and how to handle compensation questions in markets where packages are often non-transparent." },
    winner: "zari",
  },
  {
    task: "GCC salary benchmarking",
    bayt: { capable: true, detail: "Bayt.com's salary insights cover GCC and broader MENA compensation — including tax-free base salaries, allowance structures (housing allowance, transport allowance, schooling allowance for families), and the total package components that make GCC compensation significantly more complex than Western salary comparison. For professionals evaluating their market value in Dubai, Riyadh, or Doha, Bayt's salary data is more regionally calibrated than global tools like Glassdoor." },
    zari: { capable: true, detail: "Zari incorporates GCC compensation context into negotiation coaching — including how to negotiate the allowance components of a GCC package (housing is often the highest-value negotiating point), how to handle conversations about visa sponsorship and its economic value, and how to negotiate total compensation when base salary alone understates the full package value." },
    winner: "bayt",
  },
  {
    task: "LinkedIn profile optimization",
    bayt: { capable: false, detail: "No LinkedIn integration or profile optimization. In the GCC, LinkedIn is a critical parallel channel — particularly for MNCs, international organizations, and executive search. Expatriate professionals often source roles through LinkedIn before they arrive in the region, and GCC-based recruiters for multinational roles source heavily on LinkedIn." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets to maximize visibility to MENA-based recruiters and GCC-focused international headhunters. Includes optimizing for GCC-specific search terms (MENA, GCC, UAE, KSA) and for the seniority levels where LinkedIn sourcing is most active in the region (mid-to-senior professional and executive roles)." },
    winner: "zari",
  },
  {
    task: "Salary negotiation for GCC offers",
    bayt: { capable: false, detail: "Bayt.com provides salary benchmarking but no negotiation coaching. GCC offer negotiation is structurally different from Western negotiation: (1) Total package negotiation matters more than base salary alone — housing allowance, school fees, flights home, and health insurance are major components; (2) Visa sponsorship and its economic cost to the employer is a leverage point; (3) Many GCC employers use non-transparent salary bands and respond differently to market data comparisons than Western employers." },
    zari: { capable: true, detail: "Zari coaches GCC offer negotiation end-to-end — including how to negotiate housing allowance (often 20-40% of total package), schooling allowance for families (one of the highest-value negotiable components), annual flights, and end-of-service gratuity terms. Includes coaching on how to handle the non-transparent salary culture common in Gulf markets and how to use market data effectively in negotiation conversations." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const bayt = TASK_COMPARISON.filter(r => r.winner === "bayt").length;
  return { zari, bayt, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "What are the best job boards for job seekers in the UAE and Saudi Arabia?", answer: "The primary platforms for GCC job seekers: Bayt.com for broad regional coverage; LinkedIn for MNCs, international banks, and senior professional roles sourced by international headhunters; GulfTalent for executive and senior management positions; Naukrigulf for the South Asian expat professional community (particularly strong in construction, engineering, and hospitality); Dubizzle Jobs for entry-to-mid level roles in the UAE; and specific company career pages for large GCC employers (ADNOC, SABIC, Saudi Aramco, Emirates Group, Etisalat/e&) that may not post all roles on aggregators. Government and semi-government roles in the GCC increasingly have their own portals (Abu Dhabi's tamm, Saudi Arabia's Jadarat) that run parallel to Bayt and LinkedIn." },
  { question: "How does Emiratisation (and equivalent GCC nationalization policies) affect job searching?", answer: "Emiratisation in the UAE, Saudisation (Nitaqat) in Saudi Arabia, and equivalent nationalization frameworks in other GCC states set quotas for local national employment in private sector companies. For expatriate job seekers, this means: (1) Some roles are reserved for nationals and will not progress an expatriate application regardless of qualifications — Bayt and other boards increasingly tag these roles; (2) Companies under nationalization pressure may prefer nationals for roles where both a national and expatriate apply; (3) In some sectors (banking, insurance, retail) the nationalization percentages are high enough that expatriate hiring is concentrated in specialized or senior roles. For national job seekers (Emirati, Saudi, Kuwaiti), nationalization quotas create structural advantages in certain sectors, and Bayt, Bayt's national-specific portals, and government career portals are the primary channels." },
  { question: "Is GCC compensation really tax-free, and how should that affect salary negotiation?", answer: "The UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman do not levy personal income tax on salaries — making GCC compensation effectively tax-free for most professionals (with the exception of US citizens, who are taxed globally by the IRS regardless of residency). The tax-free status is a real economic benefit that's already incorporated into the GCC market's compensation norms — GCC base salaries are generally lower than equivalent roles in the US or UK, but the absence of income tax means take-home pay is comparable or superior. In negotiation: don't expect to negotiate a 'tax uplift' on top of market rates — the tax-free status is already embedded in the market benchmarks. Instead, focus on the total package components (allowances, end-of-service gratuity, annual flights) where there is typically more negotiating room." },
];

export default async function ZariVsBaytPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Bayt.com", url: `${BASE_URL}/compare/zari-vs-bayt` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Bayt.com</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Bayt.com is the leading job board across the Arab world — UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Egypt, Jordan, and Lebanon. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.bayt}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Bayt.com wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "bayt" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.bayt.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Bayt.com {row.bayt.capable ? "✓" : "✗"}</p>
                      {row.winner === "bayt" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.bayt.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Bayt.com? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your CV for the specific employer and role type, coaches your interview for GCC market norms, and helps negotiate your total package — base, allowances, and benefits. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
