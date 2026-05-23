import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs CareerBuilder — Best for Job Seekers in 2025?",
  description:
    "CareerBuilder is one of the original job boards with resume database and employer matching. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps you negotiate offers. Honest comparison.",
  keywords: ["zari vs careerbuilder", "careerbuilder alternatives", "careerbuilder job search", "careerbuilder vs ai career coach", "best job boards 2025", "careerbuilder review 2025"],
  alternates: { canonical: "/compare/zari-vs-careerbuilder" },
  openGraph: {
    title: "Zari vs CareerBuilder (2025) — Full Comparison",
    description: "CareerBuilder finds and matches job listings. Zari coaches you to win them. Where each wins for job seekers in 2025.",
    url: "/compare/zari-vs-careerbuilder",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery and search",
    careerbuilder: { capable: true, detail: "CareerBuilder is one of the original large-scale job boards, aggregating listings from employers across industries. It includes AI-powered job matching and recommendation features, and covers a wide range of roles from entry-level to executive across corporate, healthcare, manufacturing, and retail sectors." },
    zari: { capable: false, detail: "Zari doesn't aggregate or search job listings. It's a coaching platform — find your target roles on CareerBuilder or another job board, then bring the specific JD to Zari to optimize your application and prepare for the interview." },
    winner: "careerbuilder",
  },
  {
    task: "Resume database visibility",
    careerbuilder: { capable: true, detail: "CareerBuilder maintains a resume database that employers and recruiters search for passive candidates. Uploading a complete resume increases discoverability without requiring active applications to each role. The database has been a core product for decades and is actively used by many large employers, particularly in healthcare, logistics, and corporate services." },
    zari: { capable: false, detail: "Zari doesn't create a searchable profile for employers. Its value is coaching candidacy quality — improving the strength of your resume, interview performance, and negotiation skill once you're in a hiring process." },
    winner: "careerbuilder",
  },
  {
    task: "ATS resume optimization",
    careerbuilder: { capable: false, detail: "CareerBuilder allows resume upload and profile creation but doesn't analyze your resume against specific job descriptions or provide ATS keyword optimization. Most CareerBuilder applications route to employer ATS systems — CareerBuilder gets you to the door but doesn't help you get through it." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific job description from CareerBuilder — identifying keyword gaps, rewriting weak bullets to show measurable outcomes, and validating ATS formatting. The optimization is role-specific, not generic advice." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    careerbuilder: { capable: false, detail: "CareerBuilder provides some career resources and articles but no personalized interview coaching — no mock interview with your actual answers evaluated, no role-specific question generation from the job description, and no STAR-method scoring or feedback." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the CareerBuilder job description you're targeting, evaluates your STAR-method answers, identifies weak responses, and coaches specific improvement for both behavioral and situational interview patterns." },
    winner: "zari",
  },
  {
    task: "Salary research",
    careerbuilder: { capable: true, detail: "CareerBuilder's salary tools provide compensation data by job title, location, and experience level — useful for establishing market rate expectations before entering a negotiation. The data is aggregated from employer postings and reported salaries." },
    zari: { capable: true, detail: "Zari incorporates compensation benchmarks into negotiation coaching — helping you understand market rates and use that data strategically in a counter offer conversation, including band pushback handling and equity negotiation." },
    winner: "careerbuilder",
  },
  {
    task: "LinkedIn profile optimization",
    careerbuilder: { capable: false, detail: "No LinkedIn integration or optimization capability. CareerBuilder operates as a standalone platform with its own profile system. Optimizing your CareerBuilder profile doesn't improve your LinkedIn visibility, which is where most professional recruiters also source independently." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search discoverability — important because most employers who post on CareerBuilder also search LinkedIn, and your profile is the first thing most hiring managers check after seeing your resume." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    careerbuilder: { capable: false, detail: "CareerBuilder provides salary data but no negotiation coaching — no scripts, no pushback handling, no counter offer strategy. The platform ends at the application and discovery stage." },
    zari: { capable: true, detail: "Zari coaches the complete salary negotiation — from calculating your counter to handling 'we can't go higher,' the band limit, and competing offer leverage. Where compensation is actually determined: not in the job listing, but in this conversation." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const careerbuilder = TASK_COMPARISON.filter(r => r.winner === "careerbuilder").length;
  return { zari, careerbuilder, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is CareerBuilder still relevant in 2025?", answer: "CareerBuilder remains a relevant secondary job board for specific industry segments — particularly corporate, healthcare administration, retail management, and logistics roles. Its resume database is still actively searched by some large employers. For tech, startups, and many professional services roles, LinkedIn and Indeed have significantly larger and more relevant candidate and listing pools. The practical approach: upload a complete profile to CareerBuilder for database discoverability, but don't make it your primary active search channel unless your target industry is well-represented there." },
  { question: "How does CareerBuilder's AI matching work?", answer: "CareerBuilder uses machine learning to match your profile (uploaded resume, job preferences, skills) against open listings and surface recommendations. It also sends your profile to employers whose requirements match your background via their 'Talent Discovery' product. From a job seeker's perspective: a complete, keyword-rich profile is essential for these matching systems — they're only as accurate as the data you give them. Update your profile with the specific skills and job titles you're targeting, not just your current role." },
  { question: "Should I use CareerBuilder and Indeed at the same time?", answer: "Yes — running multiple job boards simultaneously makes sense since listing inventories overlap but aren't identical. The practical efficiency approach: set up job alerts on both (and LinkedIn) so you're notified of new listings without daily manual searching, then apply active effort only to roles that meet your target criteria. Each application should have a resume optimized for that specific JD rather than the same generic resume submitted everywhere." },
];

export default async function ZariVsCareerBuilderPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs CareerBuilder", url: `${BASE_URL}/compare/zari-vs-careerbuilder` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs CareerBuilder</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            CareerBuilder is one of the original job boards — listings, employer matching, and a resume database. Zari is an AI career coach that helps you compete for the roles you find there. Both in sequence beats either alone.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.careerbuilder}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">CareerBuilder wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "careerbuilder" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.careerbuilder.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">CareerBuilder {row.careerbuilder.capable ? "✓" : "✗"}</p>
                      {row.winner === "careerbuilder" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.careerbuilder.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found your next role on CareerBuilder? Let Zari help you land it.</p>
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
