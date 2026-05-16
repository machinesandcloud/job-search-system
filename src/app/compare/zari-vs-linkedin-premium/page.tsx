import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs LinkedIn Premium — Which Is Worth It for Job Seekers? (2025)",
  description:
    "Comparing Zari and LinkedIn Premium Career for job seekers. LinkedIn Premium gives you InMail and profile views. Zari gives you resume coaching, interview prep, and salary negotiation.",
  keywords: ["Zari vs LinkedIn Premium", "LinkedIn Premium vs Zari", "LinkedIn Premium alternative", "is LinkedIn Premium worth it", "LinkedIn Premium Career review", "AI career coach vs LinkedIn Premium", "LinkedIn Premium for job seekers"],
  alternates: { canonical: "/compare/zari-vs-linkedin-premium" },
  openGraph: { title: "Zari vs LinkedIn Premium — Full Comparison 2025", description: "LinkedIn Premium gives you visibility. Zari makes you competitive. Here's what each one actually does.", url: "/compare/zari-vs-linkedin-premium" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Is LinkedIn Premium worth it for job seekers?", answer: "LinkedIn Premium Career gives you InMail credits (to message people outside your network), who viewed your profile, and applicant insights showing where you rank compared to other applicants. These are useful for visibility but don't help you become a stronger candidate. If you're applying to roles and not getting callbacks, Premium won't fix that — it just lets you see more data about the problem." },
  { question: "What does Zari do that LinkedIn Premium doesn't?", answer: "Zari is a coaching platform: it rewrites your resume for ATS, optimizes your LinkedIn profile for recruiter search, runs mock interviews with STAR evaluation, coaches you through salary negotiation, and tracks your progress across sessions. LinkedIn Premium shows you data about your job search but doesn't improve your underlying candidacy." },
  { question: "Should I use both Zari and LinkedIn Premium?", answer: "Possibly. They serve different purposes: LinkedIn Premium improves your visibility and networking on LinkedIn. Zari improves the actual quality of your candidacy — your resume, your interview performance, your negotiation. If you're actively job searching, Zari is the higher-impact investment. LinkedIn Premium is useful if outbound networking is your primary job-search strategy." },
];

const ROWS = [
  { feature: "Resume ATS optimization", zari: true, li: false },
  { feature: "LinkedIn profile optimization", zari: true, li: "Partial" },
  { feature: "Who viewed your profile", zari: false, li: true },
  { feature: "InMail credits (outbound messaging)", zari: false, li: true },
  { feature: "Applicant insights / rank comparison", zari: false, li: true },
  { feature: "Mock interview coaching", zari: true, li: false },
  { feature: "STAR answer evaluation", zari: true, li: false },
  { feature: "Salary negotiation coaching", zari: true, li: false },
  { feature: "Cover letter writing", zari: true, li: false },
  { feature: "Career strategy coaching", zari: true, li: false },
  { feature: "Session memory across coaching", zari: true, li: false },
  { feature: "Free tier", zari: true, li: false },
  { feature: "Monthly cost", zari: "Free–$29", li: "$40/mo" },
];

export default async function ZariVsLinkedInPremiumPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs LinkedIn Premium", url: `${BASE_URL}/compare/zari-vs-linkedin-premium` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Zari vs LinkedIn Premium · 2025 Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Zari vs LinkedIn Premium
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            LinkedIn Premium shows you data about your job search. Zari improves the quality of your candidacy. Here&apos;s what each one actually does — and which one moves the needle.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">LinkedIn Premium Career</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Visibility into your search</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                LinkedIn Premium gives you InMail credits, profile view data, and applicant insights. You can see where you rank compared to other applicants and message hiring managers directly. It improves your visibility and outreach reach — but it doesn&apos;t improve your resume, your interview answers, or your ability to negotiate.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--muted)]">Best for: Outbound networking, InMail outreach, passive visibility</div>
              <div className="mt-2 text-[13px] text-[var(--muted)]">Price: ~$40/month</div>
            </div>
            <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari AI Career Coach</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Actual coaching that improves you</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Zari rewrites your resume to pass ATS filters, optimizes your LinkedIn for recruiter search, runs mock interviews with STAR evaluation, coaches you through salary negotiation, and tracks everything across sessions. It makes you a stronger candidate — not just a more visible one.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--brand)]">Best for: Resume, interviews, LinkedIn, salary negotiation, career strategy</div>
              <div className="mt-2 text-[13px] text-[var(--muted)]">Price: Free to start · $29/month Pro</div>
            </div>
          </div>

          <h2 className="mb-8 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-4 text-left font-semibold text-[var(--muted)]">Feature</th>
                  <th className="px-5 py-4 text-center font-bold text-[var(--brand)]">Zari</th>
                  <th className="px-5 py-4 text-center font-semibold text-[var(--muted)]">LinkedIn Premium</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"}>
                    <td className="px-5 py-3.5 text-[var(--ink)]">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {row.zari === true ? <span className="text-[var(--brand)]">✓</span> : row.zari === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.zari}</span>}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {row.li === true ? <span className="text-emerald-600">✓</span> : row.li === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.li}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-6 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Start with Zari — free. No credit card.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-white/55">Resume coaching, interview prep, LinkedIn optimization, and salary negotiation — all in one AI career coach.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
