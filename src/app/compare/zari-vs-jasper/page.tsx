import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Jasper for Job Search & Career Coaching (2025)",
  description:
    "Jasper is a marketing content platform. Zari is a purpose-built AI career coach. Honest comparison for job seekers wondering which AI tool to use for resume writing, interview prep, and LinkedIn optimization.",
  keywords: ["zari vs jasper", "jasper for resume", "jasper ai career", "jasper vs career coach", "best AI for job search", "AI resume writer comparison"],
  alternates: { canonical: "/compare/zari-vs-jasper" },
  openGraph: {
    title: "Zari vs Jasper for Job Search (2025)",
    description: "Jasper writes marketing content. Zari coaches careers. If you're using Jasper for your resume or interview prep, read this first.",
    url: "/compare/zari-vs-jasper",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "ATS resume optimization",
    jasper: { capable: false, detail: "Jasper is a marketing AI with brand-voice and content-at-scale features. It has no concept of ATS parsing rules, keyword density scoring, or the formatting patterns that determine whether a resume reaches a human reviewer." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific job description, identifies keyword gaps, flags formatting that breaks ATS parsing, and rewrites bullets to pass automated screening before a human sees it." },
    winner: "zari",
  },
  {
    task: "Interview preparation & coaching",
    jasper: { capable: false, detail: "Jasper can generate a list of likely interview questions from a prompt, but it's a content generation task — no STAR-method coaching, no feedback on your answers, no mock interview capability." },
    zari: { capable: true, detail: "Zari runs structured interview coaching sessions: generates role-specific questions, evaluates STAR responses, identifies weak answers, and runs mock interviews with specific feedback on substance and framing." },
    winner: "zari",
  },
  {
    task: "LinkedIn profile optimization",
    jasper: { capable: false, detail: "Jasper can rewrite LinkedIn sections you provide, but has no understanding of LinkedIn's algorithm, recruiter search behavior, or which keyword placements improve discoverability for your target roles." },
    zari: { capable: true, detail: "Zari optimizes specifically for LinkedIn's search algorithm — headline construction for recruiter discoverability, About section structure, skills section prioritization, and the keyword patterns that surface your profile." },
    winner: "zari",
  },
  {
    task: "Marketing & brand content at scale",
    jasper: { capable: true, detail: "Jasper was purpose-built for this. Marketing teams use it for blog posts, social copy, email sequences, ad copy, landing pages, and brand-voice consistency at scale. This is what it's for." },
    zari: { capable: false, detail: "Zari is built exclusively for career use cases — resume, LinkedIn, interviews, and salary negotiation. General content creation is out of scope." },
    winner: "jasper",
  },
  {
    task: "Job description analysis & targeting",
    jasper: { capable: false, detail: "Jasper can summarize a job description but can't tell you what skills to emphasize, what keywords the ATS will look for, or how your resume maps (or doesn't) to the specific requirements." },
    zari: { capable: true, detail: "Zari reads a job description and maps it against your resume — showing what to emphasize, what's missing, what keywords matter for ATS, and how to reframe your experience for this specific role." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    jasper: { capable: false, detail: "Not in Jasper's use case set. You could draft a negotiation email using it, but there's no compensation data, no negotiation coaching, and no ability to practice the live conversation." },
    zari: { capable: true, detail: "Zari coaches the full salary negotiation — market rate research, counteroffer strategy, scripts for the conversation, and specific objection-handling for the most common pushbacks." },
    winner: "zari",
  },
  {
    task: "Team content collaboration workflows",
    jasper: { capable: true, detail: "Jasper has strong team collaboration features: brand voice settings, content templates, collaborative editing, campaign management. It's built for content teams working at volume." },
    zari: { capable: false, detail: "Zari is a personal career coaching tool — no team features, no content collaboration, no brand voice management." },
    winner: "jasper",
  },
];

const SCORE_DATA = (() => {
  const zariWins = TASK_COMPARISON.filter(t => t.winner === "zari").length;
  const jasperWins = TASK_COMPARISON.filter(t => t.winner === "jasper").length;
  return { zariWins, jasperWins, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Can Jasper write a resume?", answer: "Jasper can generate resume-style content if you prompt it correctly, but it wasn't designed for it. It has no ATS optimization knowledge, no understanding of keyword density relative to a specific job description, and no formatting rules for machine readability. The output will be fluent text that may or may not pass automated screening. For casual use — someone who updates their resume once every few years — it might be adequate. For an active job search where ATS pass rates matter, a purpose-built tool like Zari will produce meaningfully better results." },
  { question: "Is Jasper good for job seekers?", answer: "Jasper can help with some writing tasks job seekers face — drafting cover letters, polishing bio copy, writing outreach emails. Where it falls short is anything that requires understanding the job search system specifically: ATS optimization, interview coaching, LinkedIn algorithm optimization, and salary negotiation. These are purpose-built career functions, not content generation tasks." },
  { question: "Should I use Jasper or Zari for my resume?", answer: "If your goal is a well-written document, Jasper can help. If your goal is a resume that passes ATS screening for a specific role, gets in front of human reviewers, and positions you correctly for the target level — use Zari. The distinction is writing quality (what Jasper does well) vs. strategic positioning and machine readability (what Zari is built for)." },
];

export default async function ZariVsJasperPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Jasper", url: `${BASE_URL}/compare/zari-vs-jasper` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Jasper</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Jasper is a marketing content platform built for content teams. Zari is purpose-built for career coaching. If you&apos;re considering Jasper for your job search, here&apos;s what you should know.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zariWins}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.jasperWins}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Jasper wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE_DATA.total} evaluated tasks</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task breakdown</h2>
          <div className="mt-8 space-y-4">
            {TASK_COMPARISON.map((row) => (
              <div key={row.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "jasper" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.jasper.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Jasper {row.jasper.capable ? "✓" : "✗"}</p>
                      {row.winner === "jasper" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins here</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.jasper.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--brand)]">Wins here</span>}
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Need a career coach, not a content tool?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari is purpose-built for job search — ATS optimization, interview coaching, LinkedIn discoverability, and salary negotiation. Try it free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
