import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Huntr — Job Tracker vs AI Career Coach (2025)",
  description:
    "Huntr is the best job search tracker with a Kanban board, contact management, and resume builder. Zari coaches the quality of each application — deep resume tailoring, interview prep, and salary negotiation. Full comparison for 2025.",
  keywords: ["zari vs huntr", "huntr alternative", "huntr job tracker", "huntr review 2025", "best job search tracker", "job search CRM comparison", "huntr vs other job trackers"],
  alternates: { canonical: "/compare/zari-vs-huntr" },
  openGraph: {
    title: "Zari vs Huntr — Job Tracker vs AI Career Coach (2025)",
    description: "Huntr organizes your job search. Zari coaches you to win it. They solve completely different problems.",
    url: "/compare/zari-vs-huntr",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Job application tracking and pipeline management",
    huntr: { verdict: "Huntr wins", score: "win", detail: "Huntr is the most polished job search CRM available — Kanban board with customizable stages (Wishlist, Applied, Phone Screen, Interview, Offer, Rejected), contact tracking per company, notes, activity logs, and deadline reminders. For managing 20-40 active applications without losing track of follow-ups, Huntr is purpose-built for this problem. The interface is clean, the browser extension adds jobs from any page, and the free tier is generous." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari doesn't track applications or manage pipelines. Use Huntr for organizational infrastructure. Use Zari to optimize what goes into that pipeline — each application quality, each interview outcome, each offer negotiation." },
  },
  {
    task: "Resume building and storage",
    huntr: { verdict: "Huntr has a resume builder", score: "partial", detail: "Huntr includes a basic resume builder and lets you store multiple resume versions. It's useful for keeping tailored versions of your resume organized alongside the jobs they were used for. The builder covers formatting fundamentals but doesn't include AI tailoring or keyword optimization." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari doesn't build resumes from scratch — it makes your existing resume significantly more effective by rewriting bullets to show impact, identifying ATS keyword gaps, and tailoring specifically for each job description. The output is a resume that passes screening and differentiates you from candidates who only did keyword matching." },
  },
  {
    task: "Contact and recruiter relationship management",
    huntr: { verdict: "Huntr wins", score: "win", detail: "Huntr's contact management is a genuine differentiator — you can attach contacts to jobs, track who you've spoken with at each company, log conversation notes, and set follow-up reminders. For managing recruiter relationships, internal referrals, and networking contacts across a complex job search, this is functionality that spreadsheets can't match." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari focuses on conversation quality, not tracking. It can help you prepare for a specific recruiter call or write a targeted follow-up message, but relationship tracking is Huntr's domain." },
  },
  {
    task: "ATS resume tailoring per job description",
    huntr: { verdict: "Huntr has basic ATS tools", score: "partial", detail: "Huntr includes resume tailoring that highlights keyword matches between your resume and a job description. It surfaces gaps at the keyword level — showing which terms from the JD are missing from your document." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari rewrites the bullets behind the keywords. Keyword insertion ('proficient in Python') passes ATS but doesn't impress the hiring manager. 'Reduced model inference latency 60% through Python-based pipeline optimization' does both. The rewriting is where the callback rate improvement actually comes from." },
  },
  {
    task: "Interview preparation",
    huntr: { verdict: "Huntr doesn't help", score: "loss", detail: "Huntr is a job search organization tool. Interview preparation is outside its product scope." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches interviews at the company and role level — what Stripe's engineering bar looks like, how to prepare STAR stories for behavioral rounds, what system design questions to expect at a given seniority level, and how to handle 'tell me about a failure' without disqualifying yourself. Generic prep and specific prep have very different interview outcomes." },
  },
  {
    task: "Salary negotiation",
    huntr: { verdict: "Huntr doesn't help", score: "loss", detail: "No negotiation features. Huntr tracks that an offer arrived — what you do about it is outside the product." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches every stage of the negotiation: the counter offer language, how to handle 'this is our best offer,' how to push on equity when base is firm, and how to negotiate signing bonus and remote work stipends. This is where AI career coaching pays for itself most directly." },
  },
  {
    task: "Job search analytics and insights",
    huntr: { verdict: "Huntr wins", score: "win", detail: "Huntr gives you analytics on your job search — application volume by stage, conversion rates (applied → phone screen → interview → offer), average time in each stage. This data helps you identify where in your funnel you're losing and what to focus on. If you have a 40% phone screen rate but a 10% first-round interview conversion, the problem is a different stage than if your applications are getting no responses at all." },
    zari: { verdict: "Complements Huntr", score: "partial", detail: "Huntr identifies the stage where you're losing. Zari coaches the fix: if your application → response rate is low, Zari works on resume quality and tailoring. If your phone screen → interview rate is low, Zari works on recruiter conversation preparation. The analytics and the coaching are complementary." },
  },
];

const FAQS = [
  { question: "Is Huntr free?", answer: "Huntr has a free tier with basic functionality — job tracking and basic resume storage. Paid tiers unlock AI features, advanced resume tailoring, and more contacts per job. The free tier is functional for basic pipeline management. Zari offers a free trial as well — try both before subscribing to either." },
  { question: "What makes Huntr better than a spreadsheet?", answer: "Huntr's main advantages over a spreadsheet: contact management (linking people to jobs), the browser extension (one-click job saving from any site), deadline reminders, and funnel analytics. For a job search under 10 applications, a spreadsheet is fine. For 20+ active applications with multiple contacts per company and networking touchpoints to track, Huntr's structure prevents things from falling through the cracks." },
  { question: "Who benefits most from using both Huntr and Zari?", answer: "Mid-to-senior professionals doing a serious job search over 1-3 months: enough volume that Huntr's organizational structure adds value, and enough career stage complexity that Zari's coaching depth (company-specific interview prep, negotiation coaching) pays off significantly. The combination is particularly powerful if you're targeting 5-10 specific companies — Huntr tracks the relationships and touchpoints, Zari optimizes the quality of each one." },
];

export default async function ZariVsHuntrPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Huntr", url: `${BASE_URL}/compare/zari-vs-huntr` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Job Search</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Huntr</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Huntr is the best job search tracker — organizing applications, contacts, and pipeline stages. Zari coaches the quality of each application, interview, and negotiation. They solve completely different problems.
          </p>
          <div className="mt-8 flex justify-center">
            <WinScore zariWins={4} total={7} competitorName="Huntr" />
          </div>
        </div>
      </section>

      {/* Summary verdict */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Huntr wins for</p>
              <ul className="space-y-1.5">
                {["Best-in-class job search Kanban board", "Contact and recruiter relationship management", "Job search funnel analytics (application → offer rate)"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-emerald-500 font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Zari wins for</p>
              <ul className="space-y-1.5">
                {["Deep resume bullet rewriting that goes beyond ATS keyword matching", "Company-specific and role-specific interview coaching", "Salary negotiation and full package optimization"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-[#4361EE] font-bold">✓</span>{item}</li>
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
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.huntr.score === "win" ? "text-emerald-600" : row.huntr.score === "partial" ? "text-amber-500" : "text-red-500"}`}>
                      Huntr — {row.huntr.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.huntr.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Track your search with Huntr. Win each application with Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari works alongside whatever tracker you use — paste a job description, get a tailored resume, prepare for the interview, and negotiate the offer. Quality on top of any pipeline.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
