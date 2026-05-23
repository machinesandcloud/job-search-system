import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Monster — What Each Does for Job Seekers (2025)",
  description:
    "Monster is one of the oldest job boards with a resume database and career resources. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps you negotiate offers. Honest comparison.",
  keywords: ["zari vs monster", "monster job search", "monster.com alternatives", "best job search sites 2025", "monster vs ai career coach", "monster.com review"],
  alternates: { canonical: "/compare/zari-vs-monster" },
  openGraph: {
    title: "Zari vs Monster (2025) — Full Comparison",
    description: "Monster finds job listings. Zari coaches you to get hired. Where each wins for job seekers in 2025.",
    url: "/compare/zari-vs-monster",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery and search",
    monster: { capable: true, detail: "Monster aggregates millions of job listings and has been doing so since 1994. It covers a broad range of industries and locations. Search functionality includes filters for salary, job type, and location radius." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. It's a coaching platform — find your target role on Monster or another job board, then bring it to Zari to optimize your application and prepare for the interview." },
    winner: "monster",
  },
  {
    task: "Resume database visibility",
    monster: { capable: true, detail: "Monster has one of the largest resume databases — employers and recruiters actively search Monster's database. Uploading your resume makes you discoverable without actively applying to every role." },
    zari: { capable: false, detail: "Zari doesn't create a searchable profile for employers. Its value is coaching quality, not distribution." },
    winner: "monster",
  },
  {
    task: "ATS resume optimization",
    monster: { capable: false, detail: "Monster provides career advice articles on resume writing, but doesn't analyze your resume against specific job descriptions or provide ATS keyword optimization. Uploading to their database doesn't improve your resume's competitiveness." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific job description — finds missing keywords, rewrites weak bullets, and checks ATS formatting so your application passes screening before a human ever sees it." },
    winner: "zari",
  },
  {
    task: "Interview coaching",
    monster: { capable: false, detail: "Monster provides general interview advice articles, but no mock interview coaching, no STAR-method answer evaluation, and no role-specific question preparation with feedback." },
    zari: { capable: true, detail: "Zari runs full mock interviews — generating role-specific questions from the job description, evaluating your STAR-method answers, identifying weak responses, and coaching improvements with specific feedback." },
    winner: "zari",
  },
  {
    task: "Salary research",
    monster: { capable: true, detail: "Monster's salary tool provides compensation data by job title, location, and experience level — useful for establishing market rate context before a negotiation." },
    zari: { capable: true, detail: "Zari incorporates market salary data into negotiation coaching — not just what the number is, but how to use it in a counter offer conversation and how to handle the most common pushbacks." },
    winner: "monster",
  },
  {
    task: "LinkedIn profile optimization",
    monster: { capable: false, detail: "No LinkedIn integration or optimization. Monster operates as an independent platform with its own resume database." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search discoverability." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    monster: { capable: false, detail: "Monster provides general negotiation articles but no coaching — no scripts, no personalized pushback handling, and no counter offer strategy for your specific situation." },
    zari: { capable: true, detail: "Zari coaches the full salary negotiation — from calculating your counter to handling every pushback. This is where compensation is actually determined, not in the job listing." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const monster = TASK_COMPARISON.filter(r => r.winner === "monster").length;
  return { zari, monster, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Monster still a good job site in 2025?", answer: "Monster remains one of the largest job boards by listing volume, and its resume database is still actively searched by employers and recruiters — particularly in industries like healthcare, retail, and manufacturing. For high-tech, startup, or senior professional roles, LinkedIn and Indeed have larger and more relevant candidate pools. Monster's relative strength is breadth and database discoverability, not the cutting-edge matching technology that newer platforms offer." },
  { question: "What's the difference between Monster and Indeed?", answer: "Indeed is significantly larger by monthly traffic and listing volume, and its job search algorithm is generally considered more sophisticated. Monster's historic advantage is its resume database — recruiters have been searching it for decades, and some hiring pipelines are built around it. For most job seekers in 2025, Indeed produces more relevant matches; Monster is a useful supplementary channel, particularly for database visibility." },
  { question: "Should I use Monster, Indeed, and LinkedIn all at once?", answer: "Yes — running multiple job boards simultaneously makes sense since they have different listing inventories and recruiter audiences. The practical approach: set up job alerts on all three so you don't miss time-sensitive new listings, upload a complete profile to each, and then focus your active application effort on the platforms where your target roles are most concentrated. For tech and professional services, LinkedIn is typically the primary channel; for general roles, Indeed has the largest volume; Monster adds database coverage." },
];

export default async function ZariVsMonsterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Monster", url: `${BASE_URL}/compare/zari-vs-monster` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Monster</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Monster is one of the original job boards — listings, salary data, and a searchable resume database. Zari is an AI career coach that helps you compete for the roles you find there. Complementary, not competing.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.monster}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Monster wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "monster" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.monster.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Monster {row.monster.capable ? "✓" : "✗"}</p>
                      {row.winner === "monster" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.monster.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found your next role on Monster? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for ATS, coaches your interview, and helps you negotiate the offer. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
