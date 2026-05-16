import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Accountants & CPAs — Zari (2025)",
  description:
    "AI career coaching built for accountants, CPAs, controllers, and finance leaders. Resume writing, interview prep, and transition coaching for public accounting exits, industry moves, and CFO-track careers.",
  keywords: ["career coach for accountants", "CPA career coach", "accountant career coaching", "public accounting career coach", "controller career coach", "CFO career coach", "accounting resume help", "big 4 exit career coach", "accountant job search help"],
  alternates: { canonical: "/career-coach-for-accountants" },
  openGraph: {
    title: "AI Career Coach for Accountants & CPAs — Zari (2025)",
    description: "Resume coaching, interview prep, and transition guidance for accountants making Big 4 exits, industry moves, and CFO-track career decisions.",
    url: "/career-coach-for-accountants",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How do accountants quantify their resume impact beyond 'managed accounts'?", answer: "The most common mistake on accounting resumes is describing scope without impact. Instead of 'managed accounts payable,' write about what you improved: 'Reduced close cycle from 10 days to 6 days by redesigning the AP reconciliation workflow.' Quantify error rate reductions, cost savings from process improvements, audit findings closed, team size managed, and dollar value of portfolios or transactions overseen. Zari's AI helps you surface these numbers from your experience and frame them for maximum impact." },
  { question: "What interview questions should CPAs expect when moving industry?", answer: "Industry interviews for accountants from public accounting focus heavily on translation: can you apply technical accounting knowledge in a business context rather than a client-service context? Expect questions about how you communicate financial information to non-finance stakeholders, how you'd build internal controls at a company that lacks them, and how you handle ambiguity without the structured environment of a firm. Zari coaches you on these behavioral dimensions specifically." },
  { question: "How should an accounting resume look different from a public accounting resume?", answer: "Public accounting resumes are organized by client or engagement type. Industry resumes are organized by impact and scope. When making the transition, restructure your resume around what you accomplished (improved, reduced, built, implemented) rather than what you did (audited, reviewed, prepared). The audience — controllers, CFOs, and talent teams — thinks about accounting as a function that serves the business, not as a client service." },
  { question: "Can Zari help with Big 4 exit strategy?", answer: "Yes. Zari coaches Big 4 professionals on every aspect of the industry transition: reframing your experience for corporate audiences, targeting the right types of companies and roles for your background, understanding the title and compensation norms in industry vs. public accounting, and preparing for interviews that test business judgment rather than technical accounting knowledge." },
];

const TRANSITIONS = [
  {
    path: "Big 4 / Mid-tier Firm → Industry (Corporate Accounting)",
    challenge: "The technical skills transfer perfectly. The framing doesn't. Public accounting resumes describe client-service work. Corporate controllers want to see business impact. Most Big 4 exits bury the lead — talking about what they did rather than what they improved.",
    coaching: "Zari helps you reframe your engagement experience into impact statements, identify the right industries and company stages for your background, and prepare for the 'why are you leaving public accounting?' question that every interviewer will ask.",
    accent: "#0D7182",
  },
  {
    path: "Corporate Accountant → Controller / Director of Finance",
    challenge: "The jump to controller is less technical and more managerial. You need to show that you can lead a team, own the close process end-to-end, build controls, and communicate with C-suite stakeholders. Most accounting resumes don't make this case.",
    coaching: "Zari surfaces the leadership and impact dimensions of your current role that you may be underselling — team management, process ownership, cross-functional work with FP&A, legal, or operations — and restructures your resume around them.",
    accent: "#7a8dff",
  },
  {
    path: "Controller / VP Finance → CFO",
    challenge: "The CFO role is fundamentally different from any accounting or controllership role. It requires a strategic narrative — not just technical credibility. You need to demonstrate board-level communication, capital structure thinking, M&A experience, and investor relations capability.",
    coaching: "Zari coaches CFO-track candidates on executive positioning: how to articulate strategic financial leadership vs. operational financial management, how to position for PE-backed and public company CFO roles, and how to negotiate executive compensation packages.",
    accent: "#EC4899",
  },
  {
    path: "Public Accounting → Non-Finance Role (Operations, Strategy, Consulting)",
    challenge: "The hardest transition because it requires the most reframing. Interviewers in non-finance roles may see your accounting background as narrow. The key is leading with the transferable skills — analytical rigor, structured problem-solving, stakeholder management — not the accounting label.",
    coaching: "Zari helps you build a pivot narrative that makes your accounting background an asset rather than a liability, and prepares you for the 'why are you leaving finance?' question in a way that sounds genuine rather than rehearsed.",
    accent: "#F97316",
  },
];

export default async function CareerCoachAccountantsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Accountants", url: `${BASE_URL}/career-coach-for-accountants` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            For CPAs, Controllers & Finance Leaders
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Accountants & CPAs</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Whether you&apos;re leaving public accounting for industry, building your path from controller to CFO, or making a cross-functional pivot — accounting careers require specific positioning to move. Zari&apos;s AI coaching helps you get it right.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { stat: "Big 4 exits", detail: "to industry at every level" },
              { stat: "CFO-track", detail: "executive positioning coaching" },
              { stat: "Interview prep", detail: "for behavioral and case formats" },
            ].map((item) => (
              <div key={item.stat} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center">
                <p className="text-[15px] font-bold text-white">{item.stat}</p>
                <p className="mt-1 text-[11px] text-white/40">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The accounting resume problem */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why accounting resumes often miss the mark</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              { issue: "Describing work, not impact", detail: "Accounting resumes are full of 'managed,' 'prepared,' 'reviewed.' Corporate hiring managers and executive recruiters want to know what you improved, built, or changed — not what your job description said." },
              { issue: "Technical detail without business context", detail: "GAAP, IFRS, ASC 842 — technical precision matters for technical screens, but your resume also needs to show you understand the business impact of financial work. Most accounting resumes don't make this connection." },
              { issue: "Public accounting framing in an industry context", detail: "Engagement-focused resumes make sense in firms. In industry, they're confusing. Hiring managers want to see your role in the organization — not a list of clients — and what changed because of your work." },
              { issue: "Missing leadership and cross-functional signal", detail: "Controllers and CFOs are leaders and collaborators. If your resume doesn't show team management, cross-functional partnerships (with ops, legal, FP&A), or board-level communication, you're leaving the most important credibility signal out." },
            ].map((item) => (
              <div key={item.issue} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.issue}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition paths */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Career transitions Zari coaches accountants through</h2>
          <div className="mt-10 space-y-5">
            {TRANSITIONS.map((t) => (
              <div key={t.path} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: t.accent }} />
                  <p className="text-[12px] font-bold" style={{ color: t.accent }}>{t.path}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">The challenge</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{t.challenge}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">What Zari coaches</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{t.coaching}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Accounting career coaching FAQs</h2>
          <div className="mt-8 space-y-4">
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
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Accounting career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume rewriting, Big 4 exit coaching, interview prep, and CFO-track positioning — AI coaching built for finance professionals at every level.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
