import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Project Managers — PMP, Agile & Scrum Careers (2025)",
  description:
    "AI career coaching for project managers, scrum masters, program managers, and PMPs. Resume optimization, PMP interview prep, Agile coaching, and career paths from PM to program director.",
  keywords: ["career coach for project managers", "project manager career coach", "PMP career coaching", "scrum master career coach", "program manager career coach", "agile project manager resume help", "project manager interview prep", "project manager career development"],
  alternates: { canonical: "/career-coach-for-project-managers" },
  openGraph: {
    title: "AI Career Coach for Project Managers — PMP, Agile & Scrum (2025)",
    description: "Resume coaching, PMP interview prep, and career path guidance for project managers, program managers, and scrum masters.",
    url: "/career-coach-for-project-managers",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How do project managers quantify impact on a resume?", answer: "Project management resumes often undersell impact by describing methodology instead of outcomes. Strong PM resume bullets lead with results: 'Delivered $4.2M ERP implementation 3 weeks ahead of schedule and 8% under budget' beats 'Managed ERP implementation project using waterfall methodology.' Quantify on-time delivery rate, budget variance, stakeholder satisfaction, team size, project portfolio size, and process improvements you drove. Zari helps you extract and frame these numbers from your actual experience." },
  { question: "What's the difference between a project manager and a program manager resume?", answer: "A project manager resume focuses on specific project delivery — timeline, budget, scope, risk mitigation. A program manager resume must show strategic oversight: managing interdependencies across multiple projects, influencing without authority, executive stakeholder management, and portfolio-level thinking. Zari coaches both and helps you understand which title and framing is appropriate for your target roles." },
  { question: "How should PMP-certified PMs position their certification?", answer: "PMP certification should be prominent — near the top of your resume, in your LinkedIn headline, and in your professional summary. But it's a floor, not a ceiling. Interviewers assume PMP holders know the PMBOK framework; they're evaluating your judgment, adaptability, and ability to drive outcomes in ambiguous situations. Zari helps you demonstrate those dimensions in your resume bullets and interview answers." },
  { question: "Can Zari help with Agile/Scrum career coaching?", answer: "Yes. Zari coaches scrum masters, agile coaches, and agile project managers on how to position their experience for both traditional PM roles and agile-specific roles. This includes coaching on how to discuss your Agile philosophy in interviews without sounding dogmatic, and how to demonstrate impact in environments where 'project success' looks different from waterfall delivery metrics." },
];

const RESUME_PROBLEMS = [
  { problem: "Leading with methodology, not outcomes", fix: "Swap 'Managed project using Agile/Scrum methodology' for 'Delivered 12 consecutive sprints on time, reducing customer-reported defects by 34% over 6 months.'" },
  { problem: "Listing certifications without context", fix: "PMP, CAPM, CSM, PMI-ACP — certifications matter but they're table stakes at most levels. Back each one with the work that makes it credible." },
  { problem: "Vague stakeholder management claims", fix: "'Managed stakeholders' is meaningless. 'Navigated competing priorities across 6 department heads to realign project scope and recover a 3-week schedule slip' shows real capability." },
  { problem: "Missing the scale signal", fix: "Always quantify: budget size, team size, number of simultaneous projects, project duration, number of stakeholders. Scale is how hiring managers rank PM candidates." },
  { problem: "No differentiation between PM levels", fix: "A senior PM or program director resume must show strategic ownership — not just execution. Budget accountability, resource allocation decisions, exec-level reporting, and cross-program governance are what differentiate senior roles." },
];

const CAREER_PATHS = [
  { from: "Junior PM / Associate PM", to: "Project Manager", key: "Demonstrate independent delivery — a project you owned end-to-end, not one you assisted on. Show that you can manage scope, timeline, and stakeholders without being managed yourself." },
  { from: "Project Manager", to: "Senior PM / Program Manager", key: "The jump requires evidence of complexity and scale. Multiple concurrent projects, larger budgets, more senior stakeholders, and cross-team coordination are what hiring managers look for at this level." },
  { from: "Program Manager", to: "Portfolio Director / VP PMO", key: "At this level, the job is organizational — building PM culture, frameworks, and talent. Your resume needs to show how you've shaped how the organization manages projects, not just managed projects yourself." },
  { from: "Technical PM", to: "Product Manager", key: "A common transition that requires a narrative reframe. Technical PMs often have strong delivery skills but need to demonstrate product thinking — user empathy, prioritization frameworks, business outcome orientation." },
];

export default async function CareerCoachProjectManagersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Project Managers", url: `${BASE_URL}/career-coach-for-project-managers` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ca7e6]" />
            For PMs, PMPs, Scrum Masters & Program Directors
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Project Managers</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            From PMP to program director, from waterfall to Agile, from technical PM to product — Zari&apos;s AI coaching helps project managers at every level build the career case that matches their actual impact.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* Resume problems */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The most common PM resume mistakes — and how to fix them</h2>
          <div className="mt-10 space-y-4">
            {RESUME_PROBLEMS.map((item) => (
              <div key={item.problem} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-red-50/30 px-5 py-3">
                  <p className="text-[12px] font-bold text-red-500">✗ Problem: {item.problem}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]"><span className="font-semibold text-emerald-600">Fix: </span>{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career paths */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Career progression paths Zari coaches</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CAREER_PATHS.map((path) => (
              <div key={path.from} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  <span className="text-[var(--brand)]">{path.from}</span> → {path.to}
                </p>
                <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">{path.key}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari covers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari coaches for project managers</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Resume impact rewriting", body: "Turn methodology descriptions into outcome statements. Quantify budget, timeline, team size, and business results. Structure your resume for the level you're targeting." },
              { title: "ATS keyword optimization", body: "PM roles have specific keyword profiles: PMP, PMBOK, Agile, Scrum, risk management, stakeholder management, resource allocation. Zari scores your resume against job-specific keyword requirements." },
              { title: "Behavioral interview coaching", body: "PM interviews are heavily behavioral: tell me about a time you managed a difficult stakeholder, a project that went off-track, or a scope change you had to navigate. Zari coaches your STAR answers with real-time feedback." },
              { title: "LinkedIn for PM visibility", body: "PM recruiters use specific search terms. Zari optimizes your headline, About section, and experience bullets for maximum recruiter discoverability." },
              { title: "PMP exam interview questions", body: "Some companies use interview questions drawn from PMBOK frameworks. Zari prepares you for both behavioral and knowledge-based PM interview formats." },
              { title: "Transition coaching (PM → Product)", body: "One of the most common career moves for PMs. Zari helps you identify your product-adjacent experience, build a narrative that demonstrates product thinking, and prepare for product management interviews." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Project manager career coaching FAQs</h2>
          <div className="mt-8 space-y-4">
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Project manager career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume rewriting, ATS optimization, behavioral interview prep, and PMP-to-PM-to-product transition coaching in one AI platform.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
