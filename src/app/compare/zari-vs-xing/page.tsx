import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs XING — Best for Job Seekers in Germany & DACH? (2025)",
  description:
    "XING is the dominant professional network and job board in Germany, Austria, and Switzerland — with millions of members and the largest recruiter database in the DACH region. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate offers. Full comparison for DACH job seekers.",
  keywords: ["zari vs xing", "xing jobs germany", "xing review 2025", "germany job board", "DACH job search", "austria jobs", "switzerland jobs", "xing alternatives germany", "job search germany 2025", "linkedin vs xing germany"],
  alternates: { canonical: "/compare/zari-vs-xing" },
  openGraph: {
    title: "Zari vs XING (2025) — Best for Job Seekers in Germany & DACH?",
    description: "XING leads the DACH professional network market. Zari coaches you to land those roles — resume optimization, interview prep, and offer negotiation for German market norms.",
    url: "/compare/zari-vs-xing",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job discovery and listing access in Germany, Austria, and Switzerland",
    xing: { capable: true, detail: "XING is the primary professional platform for the German-speaking DACH region — Germany, Austria, and Switzerland. With millions of members and the largest recruiter database for German-market roles, XING has a network density in the DACH region that LinkedIn doesn't fully replicate for mid-market German employers, Mittelstand companies, and locally-operated businesses. Many German companies that post exclusively in German post on XING over LinkedIn. For professionals targeting roles in manufacturing, automotive (VW, BMW, Mercedes-Benz supply chain), engineering, finance, and public sector in Germany, XING is a primary discovery channel alongside LinkedIn and Stepstone." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For DACH job seekers: use XING for German-market and Mittelstand roles; LinkedIn for MNCs and international employers operating in Germany; Stepstone for broad German market coverage; and Indeed.de for high-volume entry and mid-level searching. Bring any job description to Zari to optimize your Lebenslauf (CV) for the specific role." },
    winner: "xing",
  },
  {
    task: "Professional networking in the DACH region",
    xing: { capable: true, detail: "XING functions as both job board and professional network — similar to LinkedIn's dual function, but with much stronger penetration among German-speaking professionals. German recruiters, HR managers, and decision-makers who don't actively maintain LinkedIn profiles often maintain XING profiles. For professionals building relationships in German-speaking markets — particularly in traditional industries, regional businesses, and public sector — XING's network density is higher than any alternative platform in the region." },
    zari: { capable: false, detail: "Zari doesn't provide networking functionality. For DACH networking: XING is most effective for German Mittelstand and traditional industry connections; LinkedIn for international companies, tech sector, and diaspora professionals; and in-person industry associations (Bundesverbände, Wirtschaftsverbände) remain highly influential in German professional culture in ways that digital platforms don't fully replicate." },
    winner: "xing",
  },
  {
    task: "Lebenslauf (CV) optimization for German employers",
    xing: { capable: false, detail: "XING allows profile creation but doesn't optimize your Lebenslauf against specific job descriptions or for the ATS systems used by German employers. German-format CVs (Lebenslauf) have distinct conventions: typically includes a professional photo, personal data (date of birth, nationality — still common in Germany), and a strict reverse-chronological format. Large German employers and multinationals operating in Germany use ATS systems (SAP SuccessFactors is dominant in German corporate environments) that have specific parsing requirements." },
    zari: { capable: true, detail: "Zari analyzes your Lebenslauf against the specific job description — identifying keyword gaps in German-specific terminology, validating ATS formatting for SAP SuccessFactors and other platforms used by German employers, and rewriting bullets to lead with measurable impact. For international professionals applying to German employers, Zari helps align your CV format and content with German hiring manager expectations while maintaining ATS compatibility." },
    winner: "zari",
  },
  {
    task: "Interview preparation for German and DACH employers",
    xing: { capable: false, detail: "XING provides job listings and some career content but no personalized interview coaching. German interview culture has distinct characteristics: interviews are typically more formal and structured than US/UK norms; German hiring managers value thoroughness, precision, and evidence of deep domain expertise; questions about qualifications and professional development (Weiterbildung) are standard; and the interview process is often longer with more detailed technical assessment." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the job description and coaches you on German interview norms — including how to present your Werdegang (career path) coherently, how to answer precision-oriented competency questions, and how to demonstrate the domain expertise depth that German hiring managers expect. Includes coaching on questions around qualifications (Ausbildung, Studium) and professional development that are standard in German interviews." },
    winner: "zari",
  },
  {
    task: "German salary benchmarking",
    xing: { capable: true, detail: "XING provides salary data through its platform — particularly for German-market roles. German compensation structures include: Bruttojahresgehalt (gross annual salary), the 13th month salary (Weihnachtsgeld / 13. Monatsgehalt) common in German employment contracts, bonus structures, and the comprehensive benefits required by German labor law (30+ days vacation, generous sick leave, Elternzeit parental leave). XING's salary data is calibrated to the German market in a way that global tools like Glassdoor often aren't." },
    zari: { capable: true, detail: "Zari incorporates German compensation context into negotiation coaching — including how to negotiate the 13th month salary component, how German labor law shapes the baseline benefits package (and therefore what's actually negotiable), and how to approach salary conversations in a market where direct negotiation is culturally more reserved than in the US or UK." },
    winner: "xing",
  },
  {
    task: "LinkedIn profile optimization for DACH professionals",
    xing: { capable: false, detail: "XING doesn't optimize LinkedIn profiles. In the DACH market, LinkedIn and XING serve partially overlapping but distinct audiences — international employers in Germany, tech companies, and executive search predominantly use LinkedIn; traditional German employers, Mittelstand, and German public sector predominantly use XING. DACH professionals benefit from maintaining both profiles, optimized for their respective audiences." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for international employer visibility in the DACH market — including how to position German qualifications (Diplom, Master, Ausbildung) for international hiring managers, and how to signal DACH market expertise for companies entering or operating in the German-speaking region." },
    winner: "zari",
  },
  {
    task: "Salary negotiation for German roles",
    xing: { capable: false, detail: "XING provides salary data but no negotiation coaching. Salary negotiation in Germany operates differently than in the US: German compensation negotiation is typically more conservative, less adversarial, and structured around Tarifverträge (collective bargaining agreements) in many sectors. Negotiation norms vary significantly between small Mittelstand employers, large German corporations (Konzerne), and international companies operating in Germany." },
    zari: { capable: true, detail: "Zari coaches salary negotiation calibrated to the specific employer type and sector in the DACH market — including how to approach negotiation at tariff-bound employers (where the collective agreement limits flexibility), how to negotiate at MNCs operating in Germany (where there's typically more flexibility), and how to handle the German preference for discussing Gesamtvergütung (total compensation) rather than base salary in isolation." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const xing = TASK_COMPARISON.filter(r => r.winner === "xing").length;
  return { zari, xing, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Should I use XING or LinkedIn for job searching in Germany?", answer: "Use both — they serve partially overlapping but distinct audiences in Germany. XING has significantly higher penetration among traditional German employers, Mittelstand companies, and German-speaking professionals who don't actively maintain LinkedIn profiles. LinkedIn has stronger penetration among MNCs operating in Germany, the German tech sector, and executive search firms placing into German markets. The effective strategy for most German job seekers: maintain an up-to-date XING profile for German market discoverability and an up-to-date LinkedIn profile for international employer visibility and inbound sourcing. Don't treat it as either/or — the German job market uses both." },
  { question: "Is a photo required on a German Lebenslauf?", answer: "Legally in Germany, you cannot be required to include a photo, and discrimination based on appearance is prohibited (AGG — Allgemeines Gleichbehandlungsgesetz). In practice: including a professional photo on a German Lebenslauf remains culturally common and is still the norm for most applications, particularly in traditional industries. International companies operating in Germany (US tech companies, consulting firms with US-influenced cultures) may have moved away from this expectation. For online XING profiles, a professional photo is strongly recommended regardless of industry — profiles without photos receive significantly fewer recruiter views." },
  { question: "What's the Tarifvertrag and how does it affect salary negotiation in Germany?", answer: "A Tarifvertrag is a collective bargaining agreement negotiated between employers (or employer associations) and trade unions (Gewerkschaften). These agreements set minimum salaries, working hours, vacation entitlements, and other employment conditions for covered industries and employers. The implications for salary negotiation: (1) If your employer is Tarifgebunden (bound by the agreement), salary negotiation is constrained by the tariff grades — you may be able to negotiate your grade placement, but not a base salary below or significantly above the tariff scale; (2) Non-tariff employers (AT-Angestellte, usually higher-level roles) have significantly more negotiating flexibility; (3) Knowing whether a role is tariff-bound before entering salary conversations is important — ask the recruiter directly: 'Ist die Stelle tarifgebunden?' This is a normal, professional question in German hiring contexts." },
];

export default async function ZariVsXingPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs XING", url: `${BASE_URL}/compare/zari-vs-xing` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs XING</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            XING is the dominant professional network in Germany, Austria, and Switzerland — with millions of members and the primary recruiter database for DACH market roles. Zari coaches you to win those roles.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.xing}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">XING wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "xing" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.xing.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">XING {row.xing.capable ? "✓" : "✗"}</p>
                      {row.winner === "xing" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.xing.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role via XING? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your Lebenslauf for the specific role and employer type, coaches your interview for German market norms, and helps negotiate your package. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
