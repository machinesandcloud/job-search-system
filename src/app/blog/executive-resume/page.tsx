import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Executive Resume — C-Suite & VP Resume Examples and Strategy (2025)",
  description:
    "How to write a VP or C-suite executive resume that reads at the right level. The framing, structure, and evidence that boards and search firms look for — plus what makes an executive resume fail.",
  keywords: ["executive resume", "C-suite resume", "VP resume", "executive resume examples", "CEO resume", "CFO resume", "how to write an executive resume"],
  alternates: { canonical: "/blog/executive-resume" },
  openGraph: {
    title: "Executive Resume — C-Suite & VP Resume Examples and Strategy (2025)",
    description: "What boards and executive search firms look for in a VP or C-suite resume — and why most executive resumes read at the wrong level.",
    url: "/blog/executive-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const LEVEL_FRAME_SHIFTS = [
  {
    shift: "From task completion to business outcomes",
    accent: "#7C3AED",
    managerLevel: `"Led the integration of three acquired companies, coordinating teams across engineering, finance, and operations over an 18-month period."`,
    executiveLevel: `"Integrated three acquisitions totaling $340M in combined revenue into the core business within 18 months — 0% customer churn during transition, 12% reduction in operating costs through consolidation, two acquired leadership teams fully retained."`,
    why: "At executive level, the frame is: what business result did this produce? The process (leading teams, coordinating) is assumed. The outcome is the signal.",
  },
  {
    shift: "From functional leadership to business strategy",
    accent: "#DC2626",
    managerLevel: `"Managed the engineering team of 45 engineers, overseeing product delivery and technical architecture."`,
    executiveLevel: `"Built and scaled engineering organization from 12 to 45 — established architecture review process that reduced critical production incidents by 61%, and repositioned the team from feature factory to platform model, enabling the 2023 self-serve product launch that generated $8M in year-one ARR."`,
    why: "Executive resumes should show how your function contributed to company-level strategy, not just that you ran your function well.",
  },
  {
    shift: "From team management to organizational leadership",
    accent: "#D97706",
    managerLevel: `"Hired and developed a strong sales team, driving consistent quota attainment."`,
    executiveLevel: `"Built GTM org from 4 to 38 across sales, partnerships, and revenue operations — implemented a sales methodology that reduced average sales cycle from 94 days to 61 days, drove 3 consecutive years of 140%+ ARR growth, and produced 4 managers who were promoted to VP roles."`,
    why: "At VP and above, organizational building is the job — not quota attainment. Show what you built, how you built it, and the downstream impact of the organization you created.",
  },
];

const EXECUTIVE_RESUME_RULES = [
  { rule: "Lead with a 3-5 line executive profile", detail: "Unlike mid-level resumes that skip summaries, executive resumes often benefit from a brief executive profile at the top — a tight paragraph that defines your value proposition: function, scope, industry expertise, and 1–2 headline achievements. This sets the read for search firms and boards who are pattern-matching against specific requirements." },
  { rule: "2 pages max — 3 only for very senior roles with board positions", detail: "A sprawling 4-page executive resume signals poor executive judgment. The ability to be decisive and concise about what matters is itself a leadership quality. Cut everything older than 15 years unless it's a marquee achievement that's still relevant." },
  { rule: "Quantify at the P&L level whenever possible", detail: "Revenue, EBITDA, total budget, headcount managed, and market share are the numbers boards and search firms look for. If you managed a P&L, state the size. If you influenced a company-level financial metric, quantify it. Abstract achievement language ('drove significant growth') is a red flag at this level." },
  { rule: "Include board and advisory experience", detail: "Board seats, advisory roles, and committee memberships are resume entries at executive level — they signal external credibility and cross-company perspective. List them with the company type, your role, and the timeframe." },
  { rule: "Education last and minimal", detail: "At VP and above, your education credentializes but doesn't differentiate. List degree, school, and year. A top MBA or undergraduate is worth keeping — but don't lead with it, and don't list continuing education unless it's a specific executive program (Harvard Kennedy School, Wharton AMP) that adds meaningful credibility." },
];

const WHAT_SEARCH_FIRMS_EVALUATE = [
  { signal: "Scale of P&L or organizational responsibility", detail: "The most direct proxy for executive readiness. Boards and search firms look first at the size of what you've managed — revenue, headcount, budget, geographic scope." },
  { signal: "Pattern of business-building vs. business-managing", detail: "Executives who have repeatedly grown organizations, entered new markets, or turned around underperforming businesses are evaluated differently from those who managed stable operations. Both profiles have demand, but the match matters for the specific role." },
  { signal: "Board-level communication evidence", detail: "Have you presented to boards? Managed investor relationships? Led M&A diligence at the deal committee level? These are specific experiences that signal board-readiness, and search firms look for explicit evidence in the resume." },
  { signal: "Industry and functional transferability", detail: "Many executive searches are explicitly cross-industry — they want operational depth from one sector applied to another. Your resume should make it easy to see which of your skills are industry-generic vs. sector-specific, and which transitions you're credibly positioned for." },
];

const FAQS = [
  { question: "Should an executive resume have a summary?", answer: "At VP and above, yes — but keep it tight. A 3–5 line executive profile that defines your function, scope, industry, and 1–2 headline achievements is useful for search firms and boards who are pattern-matching. This is different from the watery 'results-oriented leader' summaries that clutter mid-level resumes. If you can't write an executive profile that contains specific evidence in under 5 lines, skip it — generic summaries actively hurt at this level." },
  { question: "How long should a C-suite or VP resume be?", answer: "Two pages for most VP and C-suite roles. Three pages only for roles at the most senior levels (public company CFO, Fortune 500 CEO) where the career history is genuinely substantial — board seats, published work, M&A history — and where the audience (board search committees) has the context to absorb that length. Longer than 3 pages in almost any scenario is a self-disqualification." },
  { question: "How do I write an executive resume after being laid off or during a gap?", answer: "Address the transition proactively and briefly. One line in your header or profile: 'Available for VP-level engagements following [company] restructuring' or 'Completed [company] COO role in [month/year]; available for immediate engagement.' Don't hide it or leave an unexplained end date — that creates more questions than a clean acknowledgment. Executive job searches take 6–12 months on average; search firms are accustomed to working with candidates who are between roles." },
];

export default async function ExecutiveResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Executive Resume — C-Suite & VP Resume Examples and Strategy (2025)"
        description="What boards and executive search firms look for in a VP or C-suite resume — and why most executive resumes read at the wrong level."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/executive-resume`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Executive Resume", url: `${BASE_URL}/blog/executive-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</span>
            <span className="text-[11px] text-white/30">11 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Executive resume<br /><span className="gradient-text-animated">the framing that reads at VP and C-suite level</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most executive resumes read like senior manager resumes — they describe work done rather than businesses built and outcomes produced. Here&apos;s exactly how to shift the frame, and what boards and search firms are actually evaluating.
          </p>
        </div>
      </section>

      {/* Level frame shifts */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">3 frame shifts that make bullets read at executive level</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The same events, framed two different ways. One reads as a manager; one reads as an executive. Here&apos;s exactly what changes.</p>
          <div className="mt-8 space-y-6">
            {LEVEL_FRAME_SHIFTS.map((s) => (
              <div key={s.shift} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: s.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{s.shift}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="px-5 py-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Manager framing</p>
                      <p className="font-mono text-[12px] leading-5 text-[var(--muted)]">{s.managerLevel}</p>
                    </div>
                    <div className="bg-[var(--bg)] px-5 py-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Executive framing</p>
                      <p className="font-mono text-[12px] leading-5 text-[var(--ink)]">{s.executiveLevel}</p>
                    </div>
                  </div>
                  <div className="bg-amber-50/30 px-5 py-3">
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]"><span className="font-semibold text-amber-800">Why: </span>{s.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive resume rules */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 rules that are different for executive resumes</h2>
          <div className="mt-7 space-y-4">
            {EXECUTIVE_RESUME_RULES.map((item) => (
              <div key={item.rule} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What search firms evaluate */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What executive search firms are actually evaluating</h2>
          <div className="mt-7 space-y-4">
            {WHAT_SEARCH_FIRMS_EVALUATE.map((item, i) => (
              <div key={item.signal} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Executive resume FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your executive resume reviewed and reframed by AI.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches VP and C-suite candidates on resume framing, executive narrative, and board-level positioning — not just formatting and keyword optimization.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
