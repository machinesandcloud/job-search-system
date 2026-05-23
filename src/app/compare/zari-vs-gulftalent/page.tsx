import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs GulfTalent — Best for Executive Jobs in the GCC? (2025)",
  description:
    "GulfTalent is a leading job board for senior and executive roles in the Gulf — covering UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman with a focus on mid-to-senior professional roles. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate GCC executive packages. Full comparison.",
  keywords: ["zari vs gulftalent", "gulftalent review 2025", "gulftalent UAE", "gulftalent Saudi Arabia", "GCC executive jobs", "senior jobs UAE", "middle east professional jobs", "gulf executive careers", "gulftalent alternatives"],
  alternates: { canonical: "/compare/zari-vs-gulftalent" },
  openGraph: {
    title: "Zari vs GulfTalent (2025) — Best for Executive Jobs in the GCC?",
    description: "GulfTalent focuses on senior and executive roles in the Gulf. Zari coaches you to land them — resume optimization, executive interview prep, and GCC package negotiation.",
    url: "/compare/zari-vs-gulftalent",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Senior and executive job discovery in the GCC",
    gulftalent: { capable: true, detail: "GulfTalent specializes in mid-to-senior professional roles across the Gulf Cooperation Council — UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman. Unlike Bayt.com, which serves a broader spectrum including entry-level roles, GulfTalent's positioning skews toward professional and executive hiring: Managers, Directors, VPs, and C-suite leaders. Employers listing on GulfTalent include major GCC banks (Emirates NBD, First Abu Dhabi Bank, Saudi National Bank), petrochemical companies, international consulting firms with GCC offices, and regional conglomerates. For senior professionals targeting the Gulf, GulfTalent is a more curated and higher-quality listing set than general job boards." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For senior GCC job seekers: use GulfTalent for vetted senior listings, Bayt.com for broader coverage, LinkedIn for executive search sourcing and MNC roles, and direct outreach to executive search firms with dedicated GCC practices (Spencer Stuart, Heidrick & Struggles, Korn Ferry, Egon Zehnder all have UAE and Saudi offices). Bring any GulfTalent job description to Zari to optimize your executive CV and negotiation approach." },
    winner: "gulftalent",
  },
  {
    task: "Executive search firm network",
    gulftalent: { capable: true, detail: "GulfTalent has established relationships with major executive search and recruitment firms operating in the GCC. Many GulfTalent listings originate from retained search mandates at regional headhunting firms and international search firms with GCC offices. For senior professionals, the platform provides passive exposure to search firm networks that would otherwise require direct relationships — a meaningful access advantage at the senior level where many roles are never publicly advertised." },
    zari: { capable: false, detail: "Zari doesn't connect you to executive search networks. Zari helps you prepare for the conversations those search firm relationships lead to — executive CV optimization, senior-level interview coaching, and package negotiation for the GCC market." },
    winner: "gulftalent",
  },
  {
    task: "Executive CV optimization for GCC senior roles",
    gulftalent: { capable: false, detail: "GulfTalent allows CV uploads but doesn't offer role-specific CV analysis or optimization. Senior and executive CVs for GCC roles require specific calibration: quantified P&L ownership, team size at scale, regional market coverage, and the executive-level impact metrics that GCC boards and C-suite hiring committees look for. Most large GCC employers and search firms use ATS systems for initial screening even at the executive level — particularly for regional leadership roles at MNCs." },
    zari: { capable: true, detail: "Zari analyzes your executive CV against the specific GulfTalent job description — identifying gaps in P&L and team scale signals, rewriting bullets to lead with executive-level impact (revenue owned, teams led, strategic initiatives delivered), and ensuring the narrative coherence that executive CVs need to convey a clear leadership arc. Includes optimization for the ATS systems used by GCC-based MNCs (Workday, SAP SuccessFactors) even at senior levels." },
    winner: "zari",
  },
  {
    task: "Executive interview preparation for GCC roles",
    gulftalent: { capable: false, detail: "GulfTalent provides job listings and career content but no personalized interview coaching. Executive interviews in the GCC have specific characteristics: senior roles at government-linked entities (ADNOC, Aramco, QatarEnergy, sovereign wealth fund portfolio companies) involve board-level interviews and presentations; MNC regional leadership roles involve global leadership competency assessments; and understanding the cultural nuances of senior stakeholder interactions in the Gulf is a meaningful differentiator." },
    zari: { capable: true, detail: "Zari coaches executive interview preparation specific to the GulfTalent role and employer — including how to present a strategic vision for the region, how to navigate board-level stakeholder questions common at government-linked entities, and how to demonstrate understanding of the GCC's Vision 2030 / UAE Centennial strategic frameworks that increasingly shape senior hiring conversations at both public and private sector employers." },
    winner: "zari",
  },
  {
    task: "GCC executive salary benchmarking",
    gulftalent: { capable: true, detail: "GulfTalent provides regional salary data calibrated to senior roles in the Gulf — including base salary ranges by function and seniority, the allowance structures (housing, education, car, flights) that form a major portion of senior GCC packages, and equity or phantom equity structures at private companies. For executives evaluating market value in the GCC, GulfTalent's salary data is more relevant than Western-market tools." },
    zari: { capable: true, detail: "Zari incorporates GCC executive compensation context into negotiation coaching — including how to negotiate the full package (housing at executive level is often 30-40% of total comp), how to handle discretionary bonus conversations at family business conglomerates, and how to negotiate equity or shadow equity structures at private GCC companies where these are increasingly common at the C-suite." },
    winner: "gulftalent",
  },
  {
    task: "LinkedIn profile optimization for GCC executives",
    gulftalent: { capable: false, detail: "No LinkedIn integration or profile optimization. For senior GCC professionals, LinkedIn is the primary channel for inbound executive search sourcing — international headhunters, global MNCs building out regional leadership, and PE firms backing GCC portfolio companies all source senior candidates on LinkedIn before initiating outreach." },
    zari: { capable: true, detail: "Zari optimizes your LinkedIn executive presence for GCC leadership sourcing — including positioning your regional expertise (GCC market depth, Arabic language fluency, Vision 2030 alignment), executive-level keyword optimization for the sectors and functions most active in the Gulf, and a compelling About section that conveys your leadership narrative for both regional and international executive search audiences." },
    winner: "zari",
  },
  {
    task: "Executive package negotiation for GCC roles",
    gulftalent: { capable: false, detail: "GulfTalent provides salary data but no negotiation coaching. Senior GCC package negotiation involves components that don't exist in Western contexts: education allowance (significant for families with school-age children — international school fees in Dubai and Abu Dhabi can exceed $30,000-$50,000 annually), executive housing allowance (often provided as a flat or villa at the senior level rather than a cash allowance), annual return flights for the executive and family, and gratuity calculation under UAE or Saudi labor law." },
    zari: { capable: true, detail: "Zari coaches GCC executive package negotiation end-to-end — how to establish total compensation benchmarks that include all package components, how to negotiate housing allocation vs. allowance, how to handle education allowance conversations, and how to navigate gratuity and pension provisions under GCC labor frameworks. Includes coaching on negotiation dynamics specific to government-linked entities (typically structured packages with limited flexibility) vs. private conglomerates (more negotiating room)." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const gulftalent = TASK_COMPARISON.filter(r => r.winner === "gulftalent").length;
  return { zari, gulftalent, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "What's the difference between GulfTalent and Bayt.com for senior job seekers?", answer: "GulfTalent and Bayt.com both cover the GCC job market, but with different seniority profiles. GulfTalent skews senior — the platform is positioned for professional and executive hiring, with more concentration of Manager, Director, VP, and C-suite roles, and stronger integration with executive search firm listings. Bayt.com has broader coverage across all seniority levels, larger total listing volume, and stronger penetration with local UAE and MENA employers across the full hierarchy. The effective strategy for senior GCC job seekers: use both, with GulfTalent as your primary channel for senior-to-executive listings and Bayt.com for broader discovery, supplemented by LinkedIn for inbound executive search sourcing." },
  { question: "How important is Arabic language for executive roles in the GCC?", answer: "It depends significantly on the role and employer type. For government and semi-government roles (ministries, sovereign wealth funds, government-linked entities in the UAE and Saudi Arabia), Arabic language is increasingly a requirement as nationalization frameworks prioritize Arabic-speaking leaders. For MNC regional headquarters in Dubai or Riyadh, Arabic is frequently not required — executive meetings and reporting are conducted in English. For roles that involve direct government stakeholder management or regulatory relationship-building (common for Chief Government Affairs, Country Manager, or C-suite roles at large regulated businesses), Arabic proficiency is a meaningful differentiator even where it's not technically required. Always check whether the job description mentions Arabic — if it does, it's a real requirement; if it doesn't, assume English is sufficient." },
  { question: "What executive search firms are most active in the UAE and Saudi Arabia?", answer: "The major international search firms all have GCC presence: Spencer Stuart (Dubai office, strong in board and CEO-level mandates), Heidrick & Struggles (UAE, focused on technology and financial services at senior levels), Korn Ferry (UAE and Saudi Arabia, broad sector coverage at VP to C-suite), Egon Zehnder (Dubai, known for board advisory and CEO succession), and Russell Reynolds (UAE, strong in financial services and private equity). Regional boutique search firms are also significant: Boyden, Michael Baker, and locally-headquartered firms with deep GCC government and family business relationships. Building direct relationships with 2-3 search consultants in your function is more effective than applying through portals — most senior GCC placements originate through retained search, not open applications." },
];

export default async function ZariVsGulfTalentPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs GulfTalent", url: `${BASE_URL}/compare/zari-vs-gulftalent` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs GulfTalent</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            GulfTalent focuses on senior and executive roles across the GCC — UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman. Zari coaches you to land those roles and negotiate the full package.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.gulftalent}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">GulfTalent wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "gulftalent" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.gulftalent.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">GulfTalent {row.gulftalent.capable ? "✓" : "✗"}</p>
                      {row.winner === "gulftalent" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.gulftalent.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a senior role on GulfTalent? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your executive CV for the specific role and GCC employer type, coaches your senior-level interview, and helps negotiate the full package — base, housing, education allowance, and all components. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
