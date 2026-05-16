import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Lawyers & Legal Professionals — Zari (2025)",
  description:
    "AI career coaching for attorneys, lawyers, in-house counsel, and legal professionals. Resume, interview prep, and transition coaching for BigLaw exits, in-house moves, and lateral hires.",
  keywords: ["career coach for lawyers", "lawyer career coach", "attorney career coaching", "legal career coach", "in-house counsel career coach", "biglaw exit career coach", "legal job search help", "lawyer resume coaching"],
  alternates: { canonical: "/career-coach-for-lawyers" },
  openGraph: {
    title: "AI Career Coach for Lawyers — BigLaw Exits, In-House, and Lateral Moves (2025)",
    description: "Resume, LinkedIn, and interview coaching for attorneys navigating BigLaw exits, in-house transitions, and lateral hires.",
    url: "/career-coach-for-lawyers",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How do lawyers translate legal experience for in-house or non-legal roles?", answer: "The biggest risk for lawyers transitioning out of traditional practice is using legal language that doesn't resonate with business audiences. Zari helps you reframe legal skills — contract analysis, risk assessment, cross-functional collaboration, regulatory compliance — in the commercial language that corporate hiring managers and GCs respond to. Specificity and business impact matter far more than legal citations." },
  { question: "What does a strong lateral attorney resume look like?", answer: "For lateral moves within law firms, the resume should lead with deals or matters — the size, complexity, and industry of transactions or cases you've led. Rankings, league tables, chamber recognition, and client names matter where they can be disclosed. Zari helps you structure this efficiently, with the right level of detail for partners reviewing lateral candidates." },
  { question: "How should lawyers prep for in-house interviews?", answer: "In-house interviews are less about legal knowledge and more about business judgment, communication, and cultural fit. Expect questions about how you've worked with non-legal stakeholders, how you've managed competing priorities, how you've communicated risk to executives, and how you handle ambiguity. Zari coaches you on these behavioral dimensions specifically, which is where most attorney candidates underprepare." },
  { question: "Can Zari help with BigLaw exit strategy?", answer: "Yes. Zari works with BigLaw attorneys at every stage of exit planning — from refining a narrative around why you're leaving (which matters enormously for in-house roles) to optimizing your resume for roles that value legal credentials but aren't traditional practice, including tech companies, finance, consulting, and policy roles." },
];

const TRANSITIONS = [
  {
    from: "BigLaw Associate / Counsel",
    to: "In-house counsel at a technology or private equity company",
    challenge: "Most in-house teams want attorneys who can think commercially, not just legally. The interview isn't a law school exam — it's a test of whether you can work as a business partner.",
    howZariHelps: "Zari coaches you to reframe your deal or litigation experience in terms of business impact, risk management, and cross-functional partnership — the language that GCs and business leaders respond to.",
    accent: "#7a8dff",
  },
  {
    from: "Partner / Counsel",
    to: "General Counsel or VP Legal",
    challenge: "Senior legal roles require you to demonstrate executive leadership, not just legal expertise. You need to show board communication, budget ownership, and team building — and compress it all into a clear narrative.",
    howZariHelps: "Zari helps executive-track attorneys build a C-suite positioning narrative: how you've influenced strategy, managed organizational risk, and led legal departments as a business function.",
    accent: "#0D7182",
  },
  {
    from: "Litigation Associate",
    to: "Compliance, regulatory, or government affairs role",
    challenge: "The skills transfer — research, analysis, stakeholder management, written communication — but the framing needs to shift. Litigation experience often undersells its strategic value for compliance and regulatory roles.",
    howZariHelps: "Zari identifies the specific regulatory and risk management dimensions of your litigation background and helps you write a targeted resume and cover letter for compliance-specific positions.",
    accent: "#EC4899",
  },
  {
    from: "Attorney (any practice area)",
    to: "Non-legal role: consulting, business operations, tech strategy",
    challenge: "This is the hardest transition for lawyers because it requires a fundamental reframe. Legal credentials can feel like a liability — interviewers wonder if you'll want to 'go back to law.'",
    howZariHelps: "Zari helps you build a pivot narrative that makes your legal background an asset — demonstrating analytical rigor, stakeholder management, and business judgment without making the interviewer worry about retention.",
    accent: "#F97316",
  },
];

export default async function CareerCoachLawyersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Lawyers", url: `${BASE_URL}/career-coach-for-lawyers` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7a8dff]" />
            For Attorneys & Legal Professionals
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Lawyers</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Whether you&apos;re making a lateral move, exiting BigLaw, pursuing in-house roles, or pivoting out of law entirely — the legal job market rewards specific positioning. Zari&apos;s AI coaching helps you communicate your value to the audiences who are actually making hiring decisions.
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

      {/* Transition paths */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The moves lawyers are making — and where they get stuck</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Legal careers are rarely linear. Here are the transitions Zari coaches attorneys through most often.</p>
          <div className="mt-10 space-y-6">
            {TRANSITIONS.map((t) => (
              <div key={t.from} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: t.accent }} />
                  <p className="text-[12px] font-bold text-[var(--muted)]">
                    <span style={{ color: t.accent }}>{t.from}</span>
                    <span className="mx-2">→</span>
                    {t.to}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-400">The challenge</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{t.challenge}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">How Zari helps</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{t.howZariHelps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari covers */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari coaches for legal professionals</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              { title: "Resume for lateral attorney moves", body: "Deal tombstones, matter descriptions, practice area keywords, and the right level of client disclosure — structured for recruiter review at peer firms." },
              { title: "Resume for in-house transitions", body: "Reframing legal experience in commercial language. Identifying the business impact of your legal work — not just the legal complexity of it." },
              { title: "LinkedIn for attorney visibility", body: "Most attorney LinkedIn profiles are invisible to corporate recruiters. Zari optimizes your headline, About section, and experience for how GCs and talent teams actually search." },
              { title: "In-house interview coaching", body: "Practice business judgment questions, stakeholder communication scenarios, and 'why are you leaving law?' — the questions most BigLaw attorneys get tripped up by." },
              { title: "Non-legal pivot coaching", body: "If you're moving out of law entirely, Zari helps you build a narrative that makes your legal background an asset without making the interviewer wonder about your commitment." },
              { title: "Executive and GC positioning", body: "For senior attorneys moving into GC or VP Legal roles, Zari coaches executive-level narrative: board communication, department leadership, and strategic risk management framing." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The law firm problem */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Why legal resumes often underperform</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Law school trains you to be precise, thorough, and comprehensive. These are the exact opposite of what makes a great resume. Hiring managers spend 7–10 seconds on initial review — the most important thing is what&apos;s at the top, stated in plain language, with concrete numbers.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Attorneys also tend to describe work by what it was — &ldquo;assisted with M&A transactions&rdquo; — rather than what they contributed and at what scale. Zari identifies these patterns in your existing resume and rewrites them into the high-impact, quantified bullets that get callbacks.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Legal career coaching FAQs</h2>
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
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Legal career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume rewriting, LinkedIn optimization, in-house interview prep, and transition coaching built for attorneys at every stage.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
