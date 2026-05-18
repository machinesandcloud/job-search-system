import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Job Hero — AI Job Search Tool Comparison (2025)",
  description:
    "Job Hero is an AI-powered job search organizer with resume tailoring and application tracking. Zari is a focused AI career coach for resume optimization, interview prep, and salary negotiation. Side-by-side comparison.",
  keywords: ["zari vs job hero", "job hero alternative", "job hero review 2025", "AI job search tools", "best AI career coach 2025", "AI resume tailor comparison", "job hero vs competition"],
  alternates: { canonical: "/compare/zari-vs-job-hero" },
  openGraph: {
    title: "Zari vs Job Hero — AI Job Search Tool Comparison (2025)",
    description: "Job Hero organizes your job search with AI tailoring. Zari coaches the entire process — resume, interviews, and negotiation. Full comparison.",
    url: "/compare/zari-vs-job-hero",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Job application tracking and pipeline management",
    jobhero: { verdict: "Job Hero wins", score: "win", detail: "Job Hero's core product is a job search CRM — a Kanban-style board for tracking applications, saving job listings from any site, and organizing follow-up tasks. For job seekers managing 20+ active applications simultaneously, this organized dashboard is genuinely useful. The browser extension lets you save jobs directly from LinkedIn, Indeed, and company career pages without leaving the page." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari focuses on the quality of each application and conversation, not application volume tracking. For pipeline management, Job Hero or a simple spreadsheet works. Zari is where you go to optimize each application once you've identified the right roles." },
  },
  {
    task: "AI resume tailoring to a specific job description",
    jobhero: { verdict: "Job Hero helps", score: "partial", detail: "Job Hero includes AI resume tailoring that matches your resume to a job description and identifies missing keywords. It's useful for basic ATS keyword matching — identifying gaps between your resume and the posting. The tailoring is primarily keyword-focused, identifying what's missing rather than coaching how to rewrite bullets to demonstrate the underlying skills." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari rewrites resume bullets to show the impact behind the keywords — not just insert them. 'Managed projects using Agile' passes keyword matching but doesn't differentiate. 'Led 6-person Agile team delivering 3-month product sprint 2 weeks early despite scope expansion' does both. Zari's tailoring goes from keyword gaps to rewritten bullets that pass ATS and impress the hiring manager reading them." },
  },
  {
    task: "Cover letter generation",
    jobhero: { verdict: "Job Hero includes this", score: "partial", detail: "Job Hero generates cover letters using the job description and your resume. The output is functional and personalized to the posting — useful if you need a cover letter quickly without a starting point. Like most AI cover letters, the quality varies by how clearly you've articulated your value in your resume input." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches cover letters with narrative — not just a reformatted resume. It identifies the 1-2 specific things about the company or role that are genuinely worth writing about (not just what's in every application), helps you open with something other than 'I am writing to apply,' and keeps the letter to the 3 paragraphs that actually get read." },
  },
  {
    task: "Interview preparation",
    jobhero: { verdict: "Job Hero doesn't help", score: "loss", detail: "Job Hero is a job search organization and application tool. There is no interview preparation functionality — once you've submitted an application, Job Hero's role ends." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches the full interview: behavioral questions with STAR feedback, role-specific technical question guidance, company research for cultural fit questions, and mock interview simulation. For each role you're preparing for, Zari can tailor the prep to the company, level, and interview format — the part of the job search that determines whether applications convert to offers." },
  },
  {
    task: "Salary negotiation coaching",
    jobhero: { verdict: "Job Hero doesn't help", score: "loss", detail: "No negotiation features. Job Hero's scope is the application phase — tracking, tailoring, and organizing. What happens after the offer is outside its product scope." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches the full negotiation: market benchmarking context, counter offer scripting, handling 'this is our best offer,' pushing on equity when base is firm, and negotiating the signing bonus and flexible work components. This is where the financial upside of AI career coaching is largest — getting an extra $15-30K from an offer negotiation is more valuable than any resume optimization." },
  },
  {
    task: "LinkedIn profile optimization",
    jobhero: { verdict: "Job Hero doesn't help", score: "loss", detail: "No LinkedIn optimization features in Job Hero's current product." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari optimizes your LinkedIn profile for recruiter discovery — rewriting your headline for keyword density, coaching your About section narrative, and aligning your profile with the job descriptions you're targeting. LinkedIn optimization affects inbound recruiter volume, not just outbound application conversion." },
  },
  {
    task: "Application volume and efficiency",
    jobhero: { verdict: "Job Hero wins", score: "win", detail: "Job Hero's browser extension and one-click saving from any job board makes it significantly faster to build an application pipeline. For high-volume job searching, the efficiency gains are real — spending less time copying and pasting job descriptions into a spreadsheet means more time actually applying." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari is quality-per-application, not volume. For high-volume job searching, Job Hero and Zari are complementary: Job Hero manages the pipeline, Zari optimizes the applications that matter most." },
  },
];

const FAQS = [
  { question: "Is Job Hero free?", answer: "Job Hero has a free tier with limited features — application tracking and basic AI tailoring. The paid tiers (Pro) unlock unlimited AI tailoring, cover letter generation, and additional features. Pricing is in the range of other AI job search tools ($20-30/month at the time of writing — check their current pricing as it changes). Zari also offers a free trial — try both before committing to a paid subscription." },
  { question: "Who should use Job Hero instead of Zari?", answer: "Job Hero is most valuable for high-volume job seekers — people actively applying to 15-30+ roles simultaneously who need organizational infrastructure. If your main problem is 'I'm losing track of where I applied and what follow-ups I owe,' Job Hero solves that well. If your main problem is 'I'm applying but not getting callbacks, or getting callbacks but not offers, or getting offers but not negotiating well,' Zari addresses the underlying quality problems that volume alone can't fix." },
  { question: "Can I use Job Hero and Zari at the same time?", answer: "Yes — they're complementary rather than competing. Use Job Hero to manage your application pipeline and save relevant job postings. Use Zari to optimize the applications you're most excited about: tailoring the resume specifically, prepping for each company's interview style, and coaching the negotiation when an offer comes. For a serious job search, having both a pipeline organizer and a coaching tool is a reasonable investment." },
];

export default async function ZariVsJobHeroPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Job Hero", url: `${BASE_URL}/compare/zari-vs-job-hero` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · AI Job Search</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Job Hero</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Job Hero organizes your job search pipeline with AI tailoring. Zari coaches every stage — resume depth, interview performance, and salary negotiation. Different problems, different tools.
          </p>
          <div className="mt-8 flex justify-center">
            <WinScore zariWins={4} total={7} competitorName="Job Hero" />
          </div>
        </div>
      </section>

      {/* Summary verdict */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Job Hero wins for</p>
              <ul className="space-y-1.5">
                {["Application pipeline tracking and CRM", "High-volume job search organization", "Browser extension for saving jobs anywhere"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-emerald-500 font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Zari wins for</p>
              <ul className="space-y-1.5">
                {["Deep resume bullet rewriting (not just keyword gap)", "Interview preparation and mock coaching", "Salary negotiation and offer strategy", "LinkedIn profile optimization"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-[var(--brand)] font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Task-by-task */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.jobhero.score === "win" ? "text-emerald-600" : row.jobhero.score === "partial" ? "text-amber-500" : "text-red-500"}`}>
                      Job Hero — {row.jobhero.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.jobhero.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[var(--brand)]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>
                      Zari — {row.zari.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to move beyond pipeline tracking?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches every stage from application to offer — deep resume tailoring that goes beyond keyword matching, interview prep for the specific companies you&apos;re targeting, and negotiation coaching that pays for itself many times over.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
