import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs BrighterMonday — Best for Job Seekers in Africa? (2025)",
  description:
    "BrighterMonday is a leading job board in East Africa — covering Kenya, Uganda, Tanzania, Rwanda, and Ethiopia with thousands of active listings. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate offers. Full comparison for African job seekers.",
  keywords: ["zari vs brightermonday", "brightermonday kenya", "brightermonday africa", "africa job board 2025", "east africa jobs", "kenya job search", "ai career coach africa", "brightermonday alternatives"],
  alternates: { canonical: "/compare/zari-vs-brightermonday" },
  openGraph: {
    title: "Zari vs BrighterMonday (2025) — Best for African Job Seekers?",
    description: "BrighterMonday leads East African job listings. Zari coaches you to land those roles — ATS optimization, interview prep, and salary negotiation. Full comparison.",
    url: "/compare/zari-vs-brightermonday",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery across East Africa",
    brightermonday: { capable: true, detail: "BrighterMonday is one of the most established job portals in East Africa — with active listings across Kenya, Uganda, Tanzania, Rwanda, and Ethiopia. It covers jobs across industries including banking and financial services, NGOs and international development, technology, telecommunications, healthcare, FMCG, and government-linked entities. For professionals in Nairobi, Kampala, Dar es Salaam, Kigali, and Addis Ababa, BrighterMonday is a primary discovery channel alongside LinkedIn for mid-to-senior roles." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For East African job seekers: use BrighterMonday for local and regional roles, LinkedIn for roles at MNCs and international organizations, and specific company career pages for multinational employers — then bring the job description to Zari to optimize your application." },
    winner: "brightermonday",
  },
  {
    task: "Recruiter database visibility",
    brightermonday: { capable: true, detail: "BrighterMonday's candidate database is searchable by employers across East Africa. Maintaining a complete, keyword-rich profile creates passive discoverability for roles that may not be publicly advertised — particularly with recruitment agencies that place professionals across Kenya's corporate, NGO, and international development sectors." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. Zari's LinkedIn optimization improves your discoverability to international employers and MNCs operating in Africa who source on LinkedIn alongside local job boards." },
    winner: "brightermonday",
  },
  {
    task: "ATS resume optimization",
    brightermonday: { capable: false, detail: "BrighterMonday allows profile creation and CV uploads but doesn't analyze your CV against specific job descriptions or optimize for ATS keyword matching. Multinational employers, large local conglomerates, banks, and international NGOs in East Africa all use ATS platforms that filter applications before human review." },
    zari: { capable: true, detail: "Zari analyzes your CV against the specific BrighterMonday job description — identifying keyword gaps, rewriting weak bullets to lead with quantified impact, and validating ATS formatting. East African professionals applying to MNCs, international development organizations, and regional banks should pay particular attention to ATS optimization, as global hiring systems are used even for locally-hired roles." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    brightermonday: { capable: false, detail: "BrighterMonday provides job listings and some career content but no personalized interview coaching. East African interviews vary significantly by employer type — NGO and development sector interviews typically use competency-based frameworks; corporate and banking interviews include both technical and behavioral rounds; MNC interviews often use global interview structures including case studies or group exercises." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the BrighterMonday job description and coaches you through the specific interview format — whether competency-based for NGO roles, technical for banking or technology positions, or the behavioral frameworks used by MNCs with global interview processes." },
    winner: "zari",
  },
  {
    task: "Salary data for African markets",
    brightermonday: { capable: true, detail: "BrighterMonday provides salary benchmarking for East African markets — including Kenyan Shillings (KES), Ugandan Shillings (UGX), Tanzanian Shillings (TZS), and USD-denominated roles common in international organizations. This is useful context for an employment market where compensation norms vary significantly between local companies, international NGOs, and MNC regional offices." },
    zari: { capable: true, detail: "Zari incorporates regional compensation context into negotiation coaching — including USD vs. local currency offer considerations for international organizations, negotiation dynamics specific to each sector (NGO vs. corporate vs. government), and total compensation components common in East Africa including housing allowances, transport allowances, and international schooling benefits for expatriate-equivalent packages." },
    winner: "brightermonday",
  },
  {
    task: "LinkedIn profile optimization",
    brightermonday: { capable: false, detail: "No LinkedIn integration or optimization. BrighterMonday and LinkedIn are parallel channels in East Africa — BrighterMonday for local employer sourcing; LinkedIn for international organizations, MNCs, diaspora-targeted roles, and senior professional discoverability by international headhunters." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for recruiter search visibility. For East African professionals targeting international development, technology, or MNC roles, LinkedIn optimization is often more impactful than BrighterMonday profile optimization because the hiring managers for those roles source internationally." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    brightermonday: { capable: false, detail: "BrighterMonday provides salary benchmarking but no negotiation coaching. Salary negotiation in East Africa has specific dynamics: NGO and international development roles often have published salary scales (UN GS, IAPSO bands) with limited flexibility on base but room in allowances and benefits; corporate roles have more negotiating room; and MNC regional office roles may negotiate against both local and international benchmarks." },
    zari: { capable: true, detail: "Zari coaches salary negotiation calibrated to the specific employer type and sector — including how to negotiate against UN or NGO salary bands, how to frame local-hire vs. international-hire compensation conversations, and how to negotiate total package including allowances for the East African context." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const brightermonday = TASK_COMPARISON.filter(r => r.winner === "brightermonday").length;
  return { zari, brightermonday, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "What are the best job boards for job seekers in Kenya?", answer: "The main platforms for Kenyan job seekers: BrighterMonday for broad local coverage across industries; LinkedIn for MNCs, international organizations, and senior professional roles; MyJobMag for entry-to-mid level roles; Fuzu for East African tech and startup roles; specific company career pages for large Kenyan employers (Safaricom, KCB, Equity Bank, East African Breweries, Nation Media Group) that may not post all roles on aggregators; and UN Jobs or ReliefWeb for international development and UN system positions. The effective approach is BrighterMonday + LinkedIn + targeted company pages rather than any single platform." },
  { question: "Do employers in Kenya and East Africa use ATS systems?", answer: "Yes — larger employers in East Africa increasingly use ATS platforms for hiring. Multinational companies operating in Kenya, Uganda, and Tanzania use the same global ATS systems (Workday, Taleo, Greenhouse, SAP SuccessFactors) as their international offices. Large local banks, telecoms, and FMCG companies have implemented ATS for volume hiring. International NGOs and development organizations use sector-specific platforms (ReliefWeb, NGO recruitment portals) that have their own filtering mechanisms. The ATS optimization principles that apply globally apply equally to applications at these employers — keyword matching, clean formatting, and text-parseable PDFs." },
  { question: "How does salary negotiation work for international NGO roles in East Africa?", answer: "International NGOs and UN agencies have structured salary scales that operate differently from corporate negotiation: (1) UN agencies use the GS (General Service) scale for local hires and the Professional scale for internationally recruited staff — these are published and have fixed steps, with limited room to negotiate base; (2) Internationally-recruited NGO roles are often pegged to frameworks like InterAction or ICSC salary scales, again with limited base flexibility but significant room in benefits (housing, education, transport, hardship allowances); (3) Locally-hired NGO staff have more negotiating room than UN-system staff but still operate within published or semi-published grade bands; (4) The most effective negotiation is often about step placement within a grade, benefits package composition, and title (which determines grade). Always ask for the organization's salary scale before negotiating." },
];

export default async function ZariVsBrighterMondayPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs BrighterMonday", url: `${BASE_URL}/compare/zari-vs-brightermonday` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs BrighterMonday</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            BrighterMonday is a leading job board across East Africa — covering Kenya, Uganda, Tanzania, Rwanda, and Ethiopia. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.brightermonday}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">BrighterMonday wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "brightermonday" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.brightermonday.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">BrighterMonday {row.brightermonday.capable ? "✓" : "✗"}</p>
                      {row.winner === "brightermonday" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.brightermonday.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on BrighterMonday? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your CV for the specific role and employer type, coaches your interview for the East African market, and helps negotiate your package. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
