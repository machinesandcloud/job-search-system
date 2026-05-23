import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Wellfound (AngelList) — Best for Startup Job Seekers? (2025)",
  description:
    "Wellfound is the leading startup job board with salary transparency and direct founder access. Zari is an AI career coach. Here's where each wins — and why startup job seekers should use both.",
  keywords: ["zari vs wellfound", "wellfound vs angellist", "best startup job search tools", "wellfound alternatives", "startup job search 2025", "angellist job search"],
  alternates: { canonical: "/compare/zari-vs-wellfound" },
  openGraph: {
    title: "Zari vs Wellfound (AngelList) — Best for Startup Job Seekers? (2025)",
    description: "Wellfound finds you the startup role. Zari helps you land it. The honest comparison for startup-focused job seekers.",
    url: "/compare/zari-vs-wellfound",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Startup job discovery with salary transparency",
    wellfound: { capable: true, detail: "Wellfound (formerly AngelList Talent) is the dominant startup job board — with salary ranges, equity information, and company funding stage displayed on every listing. No other platform matches it for startup-specific job discovery with comp transparency." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. It's a coaching platform — you bring the role you found on Wellfound, and Zari helps you compete for it with an optimized resume, interview prep, and negotiation coaching." },
    winner: "wellfound",
  },
  {
    task: "ATS resume optimization for startup roles",
    wellfound: { capable: false, detail: "Wellfound has a profile system where you fill in your background, but it doesn't analyze your resume or profile against specific job requirements or provide ATS keyword optimization." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific job description — identifying missing keywords, rewriting weak bullets, and checking ATS formatting. At startups, your resume often reaches the founder directly, making quality even more important." },
    winner: "zari",
  },
  {
    task: "Direct access to founders and hiring managers",
    wellfound: { capable: true, detail: "Wellfound's direct application system routes your profile directly to founders and early employees at many startups — bypassing traditional ATS systems entirely. The direct access model is a genuine competitive advantage for early-stage roles." },
    zari: { capable: false, detail: "Zari doesn't provide access to companies or hiring managers. Its value is in making you competitive for the opportunities you find through platforms like Wellfound." },
    winner: "wellfound",
  },
  {
    task: "Interview prep for startup-specific interviews",
    wellfound: { capable: false, detail: "Wellfound doesn't provide interview coaching or preparation. The platform ends at the application stage — what happens after you apply is up to you." },
    zari: { capable: true, detail: "Zari coaches startup-specific interview patterns: cultural fit questions, mission alignment, how to discuss equity compensation intelligently, and the fast-paced interview format common at seed through Series B companies." },
    winner: "zari",
  },
  {
    task: "Equity and startup offer evaluation",
    wellfound: { capable: true, detail: "Wellfound surfaces equity information on listings and provides some context on funding stage and company trajectory — giving you baseline data for evaluating startup offers." },
    zari: { capable: true, detail: "Zari coaches the full startup offer evaluation — equity math (percentage, strike price, cap table context), vesting schedules, liquidity preferences, and how to negotiate equity at each funding stage." },
    winner: "zari",
  },
  {
    task: "LinkedIn profile optimization",
    wellfound: { capable: false, detail: "No LinkedIn integration or optimization capability. Wellfound operates as a standalone platform with its own profile system." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search discoverability — important for startup job seekers since many startup founders and recruiting firms source on LinkedIn in addition to Wellfound." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const wellfound = TASK_COMPARISON.filter(r => r.winner === "wellfound").length;
  return { zari, wellfound, total: TASK_COMPARISON.length };
})();

const STARTUP_JOB_SEEKER_TIPS = [
  { tip: "Understand the equity before you interview", detail: "Wellfound shows funding stage and sometimes equity range. Before interviewing at an early-stage company, understand what percentage the listed equity represents — a 0.1% option grant at a seed company is very different from 0.1% at Series C." },
  { tip: "Optimize your Wellfound profile separately from your resume", detail: "Wellfound's profile system is seen by founders directly. Fill in compensation expectations, remote preference, and skills precisely — founders filter on these before even reading your background." },
  { tip: "Tailor your application to the mission, not just the role", detail: "At early-stage startups, why you want to work at that specific company often matters as much as your qualifications. A resume optimized by Zari for keywords won't help if your cover note doesn't demonstrate genuine knowledge of what the company is building." },
  { tip: "Speed matters more at startups", detail: "Early-stage hiring moves fast. Apply the day you see the listing, have your interview prep ready before you hear back, and don't delay on offers. Startup founders often move on quickly to backup candidates." },
];

const FAQS = [
  { question: "Is Wellfound (AngelList) good for job searching?", answer: "Yes — especially for startup-focused job seekers. Wellfound is the dominant startup job board with salary and equity transparency on most listings, direct application access to founders at early-stage companies, and a curated database of funded startups. Its weakness is scope — it covers the startup world well and the traditional corporate world poorly. For corporate or enterprise roles, Indeed and LinkedIn are better sources." },
  { question: "Does Wellfound use ATS?", answer: "Many Wellfound applications route directly to founders or small teams without going through a traditional ATS — which is one of the platform's advantages. That said, larger Series B+ companies on Wellfound often do use ATS systems like Greenhouse or Lever. Check the company size and stage before assuming your application bypasses ATS screening entirely." },
  { question: "How do you stand out on Wellfound?", answer: "Three things: (1) a complete, specific Wellfound profile with compensation expectations and skills filled in precisely — founders filter on these; (2) a tailored cover note for each company that demonstrates you understand what they're building and why you want to work there specifically; (3) an underlying resume that would hold up if the founder shared it internally for feedback. Optimizing for all three — Wellfound profile, cover note, and underlying resume — is significantly more effective than relying on any one." },
];

export default async function ZariVsWellfoundPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Wellfound", url: `${BASE_URL}/compare/zari-vs-wellfound` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Wellfound</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Wellfound is the startup job board — salary-transparent, equity-forward, direct founder access. Zari coaches you to land the role once you&apos;ve found it. Sequential, not competing.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.wellfound}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Wellfound wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "wellfound" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.wellfound.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Wellfound {row.wellfound.capable ? "✓" : "✗"}</p>
                      {row.winner === "wellfound" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.wellfound.detail}</p>
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

      {/* Tips */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 tips for startup job seekers using both tools</h2>
          <div className="mt-7 space-y-4">
            {STARTUP_JOB_SEEKER_TIPS.map((item, i) => (
              <div key={item.tip} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.tip}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a startup role on Wellfound? Now let&apos;s land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific role, coaches your interview for startup culture and equity conversations, and helps you evaluate and negotiate the offer. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
