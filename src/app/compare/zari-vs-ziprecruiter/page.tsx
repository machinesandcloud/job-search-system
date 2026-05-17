import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs ZipRecruiter — Best for Active Job Seekers? (2025)",
  description:
    "ZipRecruiter matches job seekers with employers using AI-powered matching. Zari coaches you to win the match — ATS resume optimization, interview prep, and salary negotiation. Honest comparison.",
  keywords: ["zari vs ziprecruiter", "ziprecruiter vs ai career coach", "ziprecruiter alternatives", "best job search tools 2025", "ziprecruiter comparison", "ziprecruiter review"],
  alternates: { canonical: "/compare/zari-vs-ziprecruiter" },
  openGraph: {
    title: "Zari vs ZipRecruiter (2025) — Full Comparison",
    description: "ZipRecruiter matches you with jobs. Zari coaches you to land them. Here's exactly where each wins — and why job seekers should use both.",
    url: "/compare/zari-vs-ziprecruiter",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "AI-powered job matching and discovery",
    ziprecruiter: { capable: true, detail: "ZipRecruiter's Invite to Apply system uses AI to match your profile against open roles and notify employers when you're a strong fit. Matched candidates can receive employer invitations, which increases visibility without applying to each role individually." },
    zari: { capable: false, detail: "Zari doesn't match you with jobs or aggregate listings. It's a coaching platform — bring the role you were matched with on ZipRecruiter, and Zari helps you win the interview and negotiation." },
    winner: "ziprecruiter",
  },
  {
    task: "ATS resume optimization for specific roles",
    ziprecruiter: { capable: false, detail: "ZipRecruiter has a resume upload and profile feature, but doesn't analyze your resume against specific job descriptions or provide ATS keyword optimization. You can be matched with jobs regardless of how your resume performs against their requirements." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific job description — identifying keyword gaps, rewriting weak bullets, and checking ATS formatting. A ZipRecruiter match gets you seen; an optimized resume gets you the interview." },
    winner: "zari",
  },
  {
    task: "Resume visibility to employers",
    ziprecruiter: { capable: true, detail: "ZipRecruiter's database is searchable by employers — your profile can be discovered by employers actively searching for candidates with your background. This passive discovery channel adds to your active applications." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles or make you discoverable to employers. It improves the quality of your candidacy when you've been discovered through other channels." },
    winner: "ziprecruiter",
  },
  {
    task: "Interview preparation",
    ziprecruiter: { capable: false, detail: "ZipRecruiter doesn't provide interview coaching. The platform ends at the application and match stage — what happens in the interview is entirely on you." },
    zari: { capable: true, detail: "Zari coaches role-specific mock interviews — generating questions from the job description, evaluating STAR-method answers, identifying weak responses, and coaching the behavioral and technical patterns for your specific target role." },
    winner: "zari",
  },
  {
    task: "Salary data and research",
    ziprecruiter: { capable: true, detail: "ZipRecruiter's salary research tool provides market compensation data by role, location, and experience level — sourced from employer postings and self-reported data. Useful for baseline research before a negotiation." },
    zari: { capable: true, detail: "Zari incorporates salary benchmarking into the coaching workflow — helping you understand market rates and use that data in a real negotiation conversation, including counter offer strategy and pushback handling." },
    winner: "ziprecruiter",
  },
  {
    task: "LinkedIn profile optimization",
    ziprecruiter: { capable: false, detail: "No LinkedIn integration or optimization capability. ZipRecruiter operates as a separate platform with its own profile system." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter discoverability — important since many employers who use ZipRecruiter also source independently on LinkedIn." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    ziprecruiter: { capable: false, detail: "ZipRecruiter provides salary data but no negotiation coaching — no scripts, no pushback handling, no counter offer strategy. The platform doesn't support the post-offer conversation." },
    zari: { capable: true, detail: "Zari coaches the full negotiation — from calculating your counter to handling 'we can't go higher,' competing offer leverage, and equity discussion. This is where compensation is actually determined." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const ziprecruiter = TASK_COMPARISON.filter(r => r.winner === "ziprecruiter").length;
  return { zari, ziprecruiter, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is ZipRecruiter good for job seekers?", answer: "Yes — especially for active job seekers who want to be matched with employers rather than searching manually. ZipRecruiter's Invite to Apply system is a genuine time-saver: employers reach out when your profile matches their search criteria, which adds a passive discovery channel alongside your active applications. The limitation is that matching gets you seen — it doesn't make your resume more competitive or prepare you for the interview." },
  { question: "Does ZipRecruiter help you get hired?", answer: "ZipRecruiter helps you get discovered and get interviews. Whether you get hired after those interviews depends on your resume quality, interview preparation, and negotiation ability — none of which ZipRecruiter supports. Candidates who get matched through ZipRecruiter and then optimize their resume for the specific role and prepare their interview answers advance at significantly higher rates than those who apply passively and show up unprepared." },
  { question: "How does ZipRecruiter's matching work?", answer: "ZipRecruiter uses AI to analyze your profile (resume, skills, experience) and match you against open roles. Employers can then invite you to apply directly through the platform. From a job seeker's perspective: complete your profile thoroughly with specific skills and job titles, upload an updated resume, and indicate your job preferences precisely — these inputs directly affect the quality of matches the algorithm generates." },
];

export default async function ZariVsZipRecruiterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs ZipRecruiter", url: `${BASE_URL}/compare/zari-vs-ziprecruiter` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs ZipRecruiter</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            ZipRecruiter matches you with employers using AI. Zari coaches you to win the match — ATS optimization, mock interviews, and offer negotiation. Both in sequence beats either alone.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.ziprecruiter}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">ZipRecruiter wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "ziprecruiter" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.ziprecruiter.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">ZipRecruiter {row.ziprecruiter.capable ? "✓" : "✗"}</p>
                      {row.winner === "ziprecruiter" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.ziprecruiter.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Got a ZipRecruiter match? Now let&apos;s convert it to an offer.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific role, coaches your interview, and helps you negotiate the offer. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
