import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs FlexJobs — Best for Remote & Flexible Job Seekers? (2025)",
  description:
    "FlexJobs is a curated, scam-free job board for remote, part-time, freelance, and flexible work — with hand-screened listings across hundreds of categories. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate flexible and remote job offers. Full comparison.",
  keywords: ["zari vs flexjobs", "flexjobs review 2025", "flexjobs alternatives", "best remote job boards 2025", "flexible work job board", "part-time remote jobs", "is flexjobs worth it", "flexjobs subscription cost"],
  alternates: { canonical: "/compare/zari-vs-flexjobs" },
  openGraph: {
    title: "Zari vs FlexJobs (2025) — Best for Remote & Flexible Job Seekers?",
    description: "FlexJobs curates scam-free flexible and remote listings. Zari coaches you to land them — resume optimization, interview prep, and offer negotiation for flexible roles.",
    url: "/compare/zari-vs-flexjobs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Curated remote and flexible job discovery",
    flexjobs: { capable: true, detail: "FlexJobs' core value proposition is curation: every listing is hand-screened by a team to verify legitimacy, remote/flexible arrangements, and employer quality. Unlike free job boards where remote job listings often include scams, misclassified roles, or companies that post 'remote' positions that require local presence, FlexJobs' listings are vetted. Covers 50+ flexible work categories — from fully remote to part-time, freelance, compressed workweek, and hybrid arrangements — across hundreds of companies." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For flexible work searchers: use FlexJobs for curated, scam-free listings; supplement with We Work Remotely and Remote.co for additional fully-remote roles. Bring the FlexJobs job description to Zari to optimize your application for flexible work hiring signals." },
    winner: "flexjobs",
  },
  {
    task: "Scam and fraud protection",
    flexjobs: { capable: true, detail: "This is FlexJobs' most distinctive value-add. The flexible and remote job market is disproportionately targeted by job scams — fake postings designed to collect personal information or payments. FlexJobs manually reviews every listing against a multi-point legitimacy check. For job seekers who've been burned by scam listings on free boards, or who are new to remote job searching, this protection justifies the subscription cost." },
    zari: { capable: false, detail: "Zari doesn't screen job listings for legitimacy. However, Zari can help you evaluate whether a job description reads as legitimate — unusual vagueness, excessive pay for minimal qualifications, and requests for personal information in early communications are signals Zari can help you identify as part of application coaching." },
    winner: "flexjobs",
  },
  {
    task: "Resume optimization for flexible role applications",
    flexjobs: { capable: false, detail: "FlexJobs provides a resume review service as a paid add-on, but doesn't offer automated, role-specific optimization. Flexible and remote role applications require specific resume signals: explicit remote experience labeling, async communication skills, self-direction indicators, and ATS formatting for the applicant tracking systems used by flexible-work employers." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific FlexJobs job description — adding remote/flexible work signals (async communication, home office setup, time zone flexibility), rewriting bullets to surface independent execution, and validating ATS formatting for the tools commonly used by distributed-first employers like Greenhouse, Lever, and Ashby." },
    winner: "zari",
  },
  {
    task: "Interview preparation for flexible and remote roles",
    flexjobs: { capable: false, detail: "FlexJobs provides career coaching resources and articles but no personalized, role-specific interview preparation. Remote and flexible work interviews typically assess specific competencies: communication preference (async vs. sync), self-management style, how you handle ambiguity without in-person access to managers, and evidence that you've successfully executed in distributed environments." },
    zari: { capable: true, detail: "Zari generates interview questions directly from the FlexJobs job description, including flexible work-specific questions: 'How do you structure your workday without a set office schedule?', 'Describe how you've managed a project when your team was in different time zones', and 'How do you communicate blockers when you can't reach your manager synchronously?' — with coached answer frameworks for each." },
    winner: "zari",
  },
  {
    task: "Flexible work salary benchmarking",
    flexjobs: { capable: true, detail: "FlexJobs provides salary research tools for the roles and industries represented in their listings. For flexible work compensation, this is particularly useful: part-time and freelance rates vary significantly by structure (hourly vs. project vs. retainer), and remote compensation varies by company's pay philosophy (global rates, location-adjusted, or US-national)." },
    zari: { capable: true, detail: "Zari incorporates flexible work compensation context into negotiation coaching — including how to structure compensation conversations for part-time roles (hourly vs. prorated salary), how to handle location-adjusted pay for remote roles, and how to negotiate the benefits components specific to flexible arrangements: home office stipends, equipment budgets, and coworking allowances." },
    winner: "flexjobs",
  },
  {
    task: "LinkedIn profile optimization for flexible work",
    flexjobs: { capable: false, detail: "FlexJobs doesn't integrate with LinkedIn or optimize profiles for recruiter visibility. LinkedIn is a parallel discovery channel for flexible and remote work: recruiters at remote-first companies search for candidates on LinkedIn, and a profile that doesn't signal remote-readiness misses passive inbound sourcing opportunities." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline and About section for remote and flexible work recruiter search visibility — signaling async communication experience, distributed team management, and the self-direction markers that remote hiring managers search for when sourcing passively on LinkedIn." },
    winner: "zari",
  },
  {
    task: "Negotiating flexible work arrangements",
    flexjobs: { capable: false, detail: "FlexJobs helps you discover roles that already have flexible arrangements — but doesn't coach you on negotiating the specifics of those arrangements or converting a standard offer into a flexible one. Flexible work negotiation has specific dynamics: negotiating hours vs. salary for part-time, negotiating equipment and home office budgets, and handling location-based pay conversations for remote roles." },
    zari: { capable: true, detail: "Zari coaches flexible work negotiation end-to-end: how to confirm and negotiate the specific flexibility terms (hours, days, async expectation), how to negotiate remote work benefits (equipment, internet, coworking stipends), and how to handle location-adjusted pay conversations — including when to push for a higher tier or global rate." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const flexjobs = TASK_COMPARISON.filter(r => r.winner === "flexjobs").length;
  return { zari, flexjobs, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is FlexJobs worth the subscription cost?", answer: "FlexJobs charges a subscription fee (monthly or annual) — unlike most job boards that are free to use. Whether it's worth it depends on what you're optimizing for: (1) If you're searching specifically for vetted, scam-free flexible or remote listings and want to avoid the noise on free boards, the subscription pays for itself if it saves you significant time filtering. (2) If you're doing a high-volume search across all job types (not just flexible/remote), the general boards (LinkedIn, Indeed) have more total volume. (3) If you've had bad experiences with scam listings on free remote job boards, FlexJobs' verification process is a meaningful protection. The most effective approach: use FlexJobs for its specific niche (verified flexible and remote roles), not as a replacement for a broader multi-platform search strategy." },
  { question: "How do you negotiate a remote work arrangement for a job that isn't posted as remote?", answer: "Remote work negotiation is most effective after receiving an offer — not before. The sequence: (1) Don't make remote work a condition of applying or early interviews, which screens you out before you've demonstrated value; (2) Once you have an offer, ask: 'Is there flexibility on the location/work arrangement for this role? I've successfully worked remotely in previous roles and want to understand what flexibility is possible here'; (3) Frame it around value: your track record, the tools you use, and how you've managed collaboration across distributed teams; (4) If they say no upfront, decide whether to continue or not — don't try to negotiate a culture that isn't there. If they're open: propose a trial period (90 days) rather than a permanent arrangement, which reduces their perceived risk." },
  { question: "What's the difference between FlexJobs, Remote.co, and We Work Remotely?", answer: "All three are dedicated remote/flexible job boards, but with different emphases: FlexJobs covers the broadest range of flexible arrangements (remote, part-time, freelance, compressed workweek) and charges a subscription for access to a curated, scam-free listing set — its differentiation is quality over quantity. We Work Remotely is free and focuses specifically on fully-remote roles, particularly in tech, design, and marketing — its listings tend to concentrate in companies with remote-first cultures. Remote.co is also free and emphasizes fully-remote roles, with a somewhat more curated feel than WWR but less volume. The effective strategy is using 2-3 of these alongside LinkedIn (with remote filter) rather than treating any single board as complete coverage of the flexible work market." },
];

export default async function ZariVsFlexJobsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs FlexJobs", url: `${BASE_URL}/compare/zari-vs-flexjobs` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs FlexJobs</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            FlexJobs curates scam-free remote, part-time, freelance, and flexible job listings. Zari coaches you to land those roles — resume optimization for flexible work, interview prep, and offer negotiation.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.flexjobs}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">FlexJobs wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "flexjobs" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.flexjobs.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">FlexJobs {row.flexjobs.capable ? "✓" : "✗"}</p>
                      {row.winner === "flexjobs" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.flexjobs.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a flexible role on FlexJobs? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for flexible work signals, coaches your interview for remote-specific competency questions, and helps negotiate your flexible arrangement — hours, stipends, and location-based pay. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
