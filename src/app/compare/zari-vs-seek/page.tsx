import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Seek — Best for Job Seekers in Australia & Asia-Pacific? (2025)",
  description:
    "Seek is the dominant job board in Australia, New Zealand, and Southeast Asia. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps you negotiate offers. Honest comparison for APAC job seekers.",
  keywords: ["zari vs seek", "seek job board", "seek australia", "seek alternatives", "best job search australia 2025", "ai career coach australia", "seek vs ai career coach"],
  alternates: { canonical: "/compare/zari-vs-seek" },
  openGraph: {
    title: "Zari vs Seek (2025) — Best for Job Seekers in Australia?",
    description: "Seek finds jobs in Australia and APAC. Zari coaches you to land them — ATS optimization, interview prep, and salary negotiation. Full comparison.",
    url: "/compare/zari-vs-seek",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery in Australia and APAC",
    seek: { capable: true, detail: "Seek is the dominant job board in Australia — with significantly larger listing volume than Indeed.com.au or LinkedIn for Australian roles. Seek also operates in New Zealand, Southeast Asia (JobStreet), and has expanded into other APAC markets. For job seekers in Australia and New Zealand, Seek is the primary job board and should be the first channel checked." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings in any geography. For Australian job seekers, find your target roles on Seek, then bring the job description to Zari to optimize your application materials and prepare for the interview." },
    winner: "seek",
  },
  {
    task: "Salary information and market data",
    seek: { capable: true, detail: "Seek's salary insights tool provides role-specific compensation data for the Australian market — by job title, location (Sydney, Melbourne, Brisbane, Perth, etc.), and experience level. This is particularly valuable for candidates unfamiliar with Australian market rates or those returning from overseas." },
    zari: { capable: true, detail: "Zari incorporates compensation data into negotiation coaching — helping you understand your target market rate and use it strategically in a counter offer conversation, including the pushback handling specific to Australian workplace negotiation norms." },
    winner: "seek",
  },
  {
    task: "ATS resume optimization",
    seek: { capable: false, detail: "Seek allows resume upload and profile creation but doesn't analyze your resume against specific job descriptions or provide ATS keyword optimization. Most Seek applications route through employer ATS systems — Seek gets you to the door, not through it." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific Seek job description — identifying keyword gaps, rewriting weak bullets for Australian hiring conventions, and validating ATS formatting. Australian resume conventions differ from US formats (objective statements are less common; referees are expected) — Zari adapts to the market." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    seek: { capable: false, detail: "Seek provides job listings and some career articles but no personalized interview coaching. The platform ends at the application stage — interview preparation is entirely the candidate's responsibility." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the Seek job description, evaluates your STAR-method answers, and coaches both behavioral and situational interview patterns. Australian interviews heavily weight STAR-method behavioral questions — Zari prepares you specifically for this format." },
    winner: "zari",
  },
  {
    task: "Profile visibility to recruiters",
    seek: { capable: true, detail: "Seek's resume database is actively searched by Australian recruiters — uploading a complete profile creates passive discoverability without applying to every role. Seek's talent search product is used by most major Australian employers and recruitment agencies to source candidates." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. However, Zari's LinkedIn optimization improves your discoverability to the same recruiters who also source on LinkedIn — which is the primary sourcing platform for professional roles in Australia alongside Seek." },
    winner: "seek",
  },
  {
    task: "LinkedIn profile optimization",
    seek: { capable: false, detail: "No LinkedIn integration or optimization capability. Seek and LinkedIn are parallel channels for most Australian professional roles — optimizing on one doesn't improve your visibility on the other." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search visibility. Australian professional recruiters use both Seek and LinkedIn — an optimized LinkedIn profile significantly increases inbound recruiter contact, particularly for mid-to-senior roles." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    seek: { capable: false, detail: "Seek provides salary data but no negotiation coaching. Australian workplace culture has specific norms around salary negotiation — direct counter-offers are less common than in the US, and the conversation is often more relationship-oriented. Seek doesn't address any of this." },
    zari: { capable: true, detail: "Zari coaches salary negotiation accounting for workplace culture — the script differs between Australian and US negotiation contexts. Zari covers counter offer framing, total compensation negotiation (base, super contributions, leave entitlements, flexible work), and the pushback scripts calibrated for Australian hiring practices." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const seek = TASK_COMPARISON.filter(r => r.winner === "seek").length;
  return { zari, seek, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Seek the best job board in Australia?", answer: "For most professional roles in Australia, yes — Seek has the largest listing volume, the most active recruiter network, and the most established employer relationships of any Australian job board. LinkedIn is increasingly important for senior and professional roles. For entry-level, retail, and hospitality roles, Seek and Indeed.com.au are both relevant. The practical approach for Australian job seekers: Seek is the primary board for most searches; LinkedIn adds professional visibility; Indeed.com.au adds some coverage for roles not on Seek." },
  { question: "How do Australian resumes differ from US resumes?", answer: "Australian resumes (often called CVs locally) have several conventions that differ from US standards: (1) Referee sections are expected at the end — typically 2 professional referees with contact information; (2) Photos are more commonly included in Australia than in the US, though not universally; (3) Personal details (date of birth, citizenship status) may be included, unlike the US where these are omitted; (4) Length is more flexible — 2–4 pages is common for experienced professionals; (5) Objective statements are less common; a professional summary is preferred. ATS optimization principles are universal — keywords and formatting rules apply equally." },
  { question: "Can Zari help Australian job seekers specifically?", answer: "Yes — Zari's resume optimization and interview coaching work for any job description regardless of geography. The ATS keyword analysis, bullet rewriting, STAR-method interview coaching, and salary negotiation frameworks all apply to Australian hiring processes. For negotiation specifically, Zari can coach the Australian market's specific dynamics — including superannuation negotiation, flexible work arrangements, and the direct vs. relationship-oriented negotiation spectrum that varies by industry and employer type in Australia." },
];

export default async function ZariVsSeekPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Seek", url: `${BASE_URL}/compare/zari-vs-seek` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Seek</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Seek is Australia&apos;s dominant job board — the first place Australian recruiters post and the primary search channel for most professional roles in Australia and New Zealand. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.seek}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Seek wins</p>
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
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Seek {row.seek.capable ? "✓" : "✗"}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Seek? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the Australian market, coaches your interview, and helps you negotiate the full offer. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
