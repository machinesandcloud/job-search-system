import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs JobStreet — Best for Job Seekers in Southeast Asia? (2025)",
  description:
    "JobStreet is the dominant job board in Malaysia, Singapore, Philippines, and Indonesia. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps you negotiate offers. Full comparison for Southeast Asian job seekers.",
  keywords: ["zari vs jobstreet", "jobstreet malaysia", "jobstreet singapore", "jobstreet philippines", "southeast asia job search 2025", "ai career coach southeast asia", "jobstreet alternatives"],
  alternates: { canonical: "/compare/zari-vs-jobstreet" },
  openGraph: {
    title: "Zari vs JobStreet (2025) — Best for Southeast Asian Job Seekers?",
    description: "JobStreet finds jobs across Malaysia, Singapore, Philippines, and Indonesia. Zari coaches you to land them. Full comparison for SEA job seekers.",
    url: "/compare/zari-vs-jobstreet",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery in Southeast Asia",
    jobstreet: { capable: true, detail: "JobStreet is the dominant job board in Southeast Asia — operating across Malaysia, Singapore, Philippines, Indonesia, and other regional markets. It is the primary job search channel for most professional roles in these countries, with the largest listing volume and the most established relationships with local and multinational employers. For SEA job seekers, JobStreet is the first platform to search and the primary channel for most industries." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For Southeast Asian job seekers: use JobStreet to find your target roles — then bring the specific job description to Zari to optimize your resume and prepare for the interview." },
    winner: "jobstreet",
  },
  {
    task: "Salary data for Southeast Asian markets",
    jobstreet: { capable: true, detail: "JobStreet provides salary data for SEA markets — covering role-specific compensation by country, city, and industry. This is particularly valuable given the significant salary variation between Singapore (the highest-paying market in SEA), Malaysia, and the Philippines — and for candidates navigating whether to target local vs. multinational employer compensation bands." },
    zari: { capable: true, detail: "Zari incorporates compensation context into negotiation coaching — helping you use market rate data strategically, including the market-specific dynamics of negotiating with local companies vs. multinationals operating in SEA, which often have different pay structures and negotiation norms." },
    winner: "jobstreet",
  },
  {
    task: "ATS resume optimization",
    jobstreet: { capable: false, detail: "JobStreet allows resume upload and profile creation but doesn't analyze your resume against specific job descriptions or optimize for ATS keyword matching. Most applications from JobStreet route through employer ATS systems — particularly for multinational employers, which use the same global ATS platforms (Workday, Taleo, Greenhouse) as their counterparts in the US and UK." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific JobStreet job description — identifying keyword gaps, rewriting weak bullets, and validating ATS formatting. Multinational employers hiring through JobStreet in SEA use the same ATS screening as their global offices — the keyword matching principles are identical regardless of geography." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    jobstreet: { capable: false, detail: "JobStreet provides job listings and career resources but no personalized interview coaching. Interview preparation is entirely the candidate's responsibility — the platform ends at the application stage." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the JobStreet job description, evaluates your STAR-method answers, and coaches both behavioral and technical interview patterns. SEA interview formats vary by company and nationality — global MNCs typically use competency-based interviews identical to their Western counterparts, while local employers may have different conventions." },
    winner: "zari",
  },
  {
    task: "Profile visibility to SEA recruiters",
    jobstreet: { capable: true, detail: "JobStreet's candidate database is actively searched by employers and recruitment agencies across SEA. A complete JobStreet profile creates passive discoverability — for job seekers in Malaysia, Philippines, and Indonesia especially, JobStreet's database is the primary sourcing tool for local and regional employers recruiting in the area." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. However, Zari's LinkedIn optimization improves your discoverability to regional and multinational employers who source on LinkedIn — which is used alongside JobStreet by most professional employers in Singapore and increasingly in Malaysia and the Philippines." },
    winner: "jobstreet",
  },
  {
    task: "LinkedIn profile optimization",
    jobstreet: { capable: false, detail: "No LinkedIn integration or optimization. JobStreet and LinkedIn are parallel sourcing channels for most professional roles in SEA — especially for multinational employers and Singapore-based companies, who use LinkedIn extensively for both active and passive candidate discovery." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search visibility. Singapore's professional job market — and the multinational employer segment across the region — uses LinkedIn heavily alongside JobStreet for sourcing senior and specialized talent." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    jobstreet: { capable: false, detail: "JobStreet provides salary data but no negotiation coaching. SEA salary negotiation norms vary significantly by country and employer type — Singapore operates closest to Western norms (direct, market-rate-based), while Malaysia and the Philippines often have more indirect negotiation dynamics, particularly with local employers." },
    zari: { capable: true, detail: "Zari coaches salary negotiation accounting for regional context — covering counter offer framing, total compensation components (which vary significantly between local and MNC employers in SEA), and the negotiation conversation calibrated for the specific employer and country context you're operating in." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const jobstreet = TASK_COMPARISON.filter(r => r.winner === "jobstreet").length;
  return { zari, jobstreet, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is JobStreet the best job board in Southeast Asia?", answer: "For most professional roles in Malaysia, Philippines, and Indonesia — yes. JobStreet has the largest listing volume and the most established employer relationships in these markets, making it the primary search channel for most professional job seekers. In Singapore, the market is more distributed: JobStreet competes with LinkedIn, MyCareersFuture (the government-backed platform), and direct company career pages for most professional roles. The practical approach: JobStreet first for Malaysia, Philippines, and Indonesia; LinkedIn and JobStreet together for Singapore; supplement with industry-specific boards for specialized roles." },
  { question: "Do employers in Southeast Asia use ATS systems?", answer: "Yes — multinational employers hiring through JobStreet in SEA use the same global ATS platforms as their counterparts in the US, UK, and Australia. Workday, Taleo, SAP SuccessFactors, and Greenhouse are all common across MNCs operating in the region. Local employers in Malaysia and the Philippines may be less likely to use sophisticated ATS systems — but as these markets mature, ATS adoption is increasing. The safe assumption: optimize your resume for ATS for any role with a multinational employer or a large local company, and use a clean parseable format for all applications." },
  { question: "How does salary negotiation work in Singapore vs. Malaysia?", answer: "Singapore operates closest to Western salary negotiation norms: direct, market-data-based, and with explicit counter offers being standard. Most Singapore employers expect negotiation and set initial offers with room to move. Malaysia has a slightly more relationship-oriented negotiation culture — counter offers are standard but the framing tends to be more collaborative than positional. The Philippines typically has more constrained salary bands, particularly in the BPO and local enterprise sectors — though MNC employers hiring for professional roles generally negotiate similarly to Singapore. In all cases, researching the specific market rate (which differs significantly between countries and between MNC vs. local employers) is the critical first step." },
];

export default async function ZariVsJobstreetPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs JobStreet", url: `${BASE_URL}/compare/zari-vs-jobstreet` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs JobStreet</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            JobStreet is the dominant job board in Southeast Asia — Malaysia, Singapore, Philippines, Indonesia, and beyond. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.jobstreet}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">JobStreet wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "jobstreet" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.jobstreet.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">JobStreet {row.jobstreet.capable ? "✓" : "✗"}</p>
                      {row.winner === "jobstreet" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.jobstreet.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on JobStreet? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for ATS, coaches your interview for the specific role, and helps you negotiate the offer — wherever in Southeast Asia you&apos;re applying. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
