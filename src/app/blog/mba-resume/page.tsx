import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "MBA Resume — Templates, Examples & ATS Tips for Business School (2025)",
  description:
    "An MBA resume operates under different rules than a standard work resume: one page strictly, GPA on or off based on school norms, bullet format that leads with leadership scope rather than task description. What to include, how to format for consulting and finance recruiting, and the mistakes that filter MBB and banking candidates early.",
  keywords: ["MBA resume", "MBA resume examples", "MBA resume template", "consulting resume MBA", "investment banking resume MBA", "mba resume format", "mba resume tips 2025", "MBA recruiting resume", "business school resume"],
  alternates: { canonical: "/blog/mba-resume" },
  openGraph: {
    title: "MBA Resume — Templates, Examples & ATS Tips for Business School (2025)",
    description: "MBA resumes follow strict conventions — one page, specific bullet structure, and GPA rules that vary by program. What MBB and banking recruiters look for and what filters you out.",
    url: "/blog/mba-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const MBA_RESUME_RULES = [
  {
    rule: "One page. No exceptions.",
    detail: "This is the single most important formatting rule in MBA recruiting, and it's enforced uniformly at MBB, bulge bracket banks, and most Fortune 500 recruiting programs. Recruiters reviewing hundreds of resumes from top programs have explicitly stated they will not read page two. If you have 15 years of experience, you still produce a one-page resume — this forces prioritization, which is itself a signal of good judgment.",
  },
  {
    rule: "GPA: include it or don't, but understand the conventions",
    detail: "At schools where GPA is disclosed (most US programs), include it if it's above the program's rough median (typically 3.4-3.6 depending on program). For MBA recruiting specifically: MBB consulting firms and bulge bracket banks often have unofficial GPA considerations — a 3.6+ at a top-10 program is additive; a 3.2 may not help you. If you're below median, you can legitimately omit GPA — but if a firm's screener asks, be prepared to address it. Never misrepresent or round up.",
  },
  {
    rule: "Bullet structure: scope → action → impact",
    detail: "MBA resume bullets lead with the scope of responsibility (team size, budget, market), then the action taken, then the quantified impact. This is different from a standard work resume that often leads with the action. Example: 'Led cross-functional team of 12 across 3 business units to redesign supply chain — reduced inventory costs by $4.2M and improved on-time delivery from 87% to 97%.' The scope (12-person cross-functional team, 3 BUs) establishes credibility before the impact numbers land.",
  },
  {
    rule: "Consistency in formatting is non-negotiable",
    detail: "MBA resumes are reviewed by detail-oriented professionals who notice inconsistencies. Dates should be in the same format (Dec 2022 or December 2022 — pick one). Bullet points should all end without periods or all end with them. Company names should match official names. Margins should be consistent. Fonts should be one family. Inconsistency signals carelessness — not the signal you want in a consulting or banking application.",
  },
  {
    rule: "The education section moves based on your experience level",
    detail: "For students and first-year MBA candidates: education section first — the degree is the primary credential. For MBA candidates with 7+ years of pre-MBA experience and significant leadership: some recruiters prefer experience first. For MBB recruiting: education section is almost always first, with the MBA degree prominently listed. For banking: same convention. When in doubt, put education first in MBA recruiting contexts.",
  },
];

const BULLET_EXAMPLES = [
  {
    track: "Pre-MBA consulting/strategy",
    weak: "Analyzed market data and created presentations for senior leadership",
    strong: "Led market entry analysis for $300M expansion into Southeast Asia — synthesized 40+ stakeholder interviews and competitive intelligence; presented final recommendation to C-suite; recommendation adopted and implemented Q1 2023",
    why: "Scope (led the analysis, C-suite audience), specific deliverable ($300M expansion, 40+ interviews), and documented outcome (adopted and implemented). Weak version could describe an analyst at any level doing any work.",
  },
  {
    track: "Pre-MBA finance/banking",
    weak: "Worked on DCF models and financial analysis for M&A transactions",
    strong: "Built DCF and LBO models for 3 closed transactions ($250M-$1.1B enterprise value) and 7 live pitches in TMT sector — led weekly update calls with senior bankers and modeled multiple sponsor return scenarios for each deal",
    why: "Named the model types (DCF/LBO), transaction scale ($250M-$1.1B), sector (TMT), and the seniority of leadership interaction (senior bankers). 'Worked on' becomes 'built and led.'",
  },
  {
    track: "Pre-MBA operations/general management",
    weak: "Managed manufacturing operations and improved efficiency",
    strong: "Managed 180-person manufacturing team across 3 shifts for $85M production line — implemented LEAN principles reducing defect rate from 4.2% to 0.8% and increasing OEE from 74% to 89% in 14 months; promoted one level ahead of program schedule",
    why: "Team size (180 people), production scale ($85M), quantified improvement (defect rate, OEE), timeline (14 months), and career signal (promoted ahead of schedule).",
  },
];

const BY_RECRUITING_TRACK = [
  {
    track: "Management Consulting (MBB and Tier 2)",
    what_recruiters_prioritize: "Leadership scope, quantified impact, problem-solving evidence, and progression speed. MBB recruiters scan for signals of outsized impact relative to years of experience — 'managed a team' is table stakes; 'managed a team that delivered X outcome leading to Y company-level impact' is the standard.",
    specific_tips: [
      "Use action verbs that signal judgment: 'led,' 'advised,' 'restructured,' 'synthesized,' 'negotiated' — not 'assisted,' 'supported,' 'helped'",
      "Quantify everything where possible — dollar impact, percentage change, team size, timeline",
      "Include any consulting-adjacent experience prominently: client-facing work, cross-functional project leadership, executive presentations",
      "A strong Activities section matters at MBB — leadership roles in MBA clubs, case competition wins, and elected positions in student government are reviewed",
    ],
  },
  {
    track: "Investment Banking and Private Equity",
    what_recruiters_prioritize: "Technical depth (modeling experience, deal exposure), deal size and complexity, sector expertise, and the quality of institutions you've worked with. Banking and PE recruiting is heavily credential-filtered — school prestige, GPA, and brand-name pre-MBA employers carry significant weight.",
    specific_tips: [
      "Name every deal you were substantively involved in — transaction size, type (M&A, LBO, IPO, restructuring), and sector",
      "List technical skills prominently: Excel, PowerPoint, financial modeling, Bloomberg, Cap IQ, specific model types",
      "For PE recruiting: any buyside experience (deal sourcing, due diligence, portfolio company work) should lead in relevant bullets",
      "Club involvement matters: Finance or Investment Club, PE Club, case competition team — active leadership roles specifically",
    ],
  },
  {
    track: "Corporate Strategy and General Management",
    what_recruiters_prioritize: "Breadth of business exposure, P&L ownership or exposure, cross-functional leadership, and demonstrated ability to move between functional areas. Corporate strategy at Fortune 500 companies values the generalist leadership arc.",
    specific_tips: [
      "Highlight cross-functional experience explicitly — worked across Finance, Ops, and Marketing is more signal than deep functional expertise in a single area",
      "Show progression in scope: increasing team size, budget ownership, or geographic responsibility over time",
      "International or multi-market experience is valued — name the markets",
      "Quantify the business impact of strategic recommendations you made, not just that you made them",
    ],
  },
];

const FAQS = [
  { question: "Do you need an MBA resume before you apply to business school?", answer: "Yes — the business school application typically requires a professional resume as part of the admissions package. Admissions committee members use it differently than corporate recruiters: they're looking for the narrative arc of your career and the leadership experiences that led you to pursue an MBA, not just the most recent job. For admissions resumes, you can include slightly more context per role and a brief summary of your goals — though one page still remains the standard even for admissions resumes at most programs." },
  { question: "Should you list your undergraduate GPA on an MBA resume?", answer: "Generally yes, if it was strong (3.5+). Unlike some other contexts where undergraduate GPA becomes irrelevant after several years of work experience, MBA recruiting at MBB and banks considers undergraduate GPA as one signal among many — particularly at schools that have historically produced top candidates with known grade distributions. If your undergraduate GPA is below 3.0, omit it. If it's between 3.0 and 3.4, use judgment based on your specific school's grade distribution and the role you're targeting. Your MBA GPA, if above median, should always be included during MBA recruiting." },
  { question: "How is an MBA resume different from a regular resume?", answer: "Five key differences: (1) One page — more strictly enforced than in regular job searching, where two pages is acceptable at senior levels; (2) Education goes first — the MBA degree is the credential being leveraged; (3) Bullet structure leads with scope of responsibility, not just action; (4) GPA conventions are explicit and understood by all recruiters; (5) Club and activities sections are substantively reviewed, not dismissed as filler — at MBB, a case competition win or club president role is read carefully. Additionally, MBA resumes in recruiting contexts are often reviewed against a set of known candidates from the same program, so differentiation within a cohort matters more than differentiation from the general working population." },
];

export default async function MbaResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="MBA Resume — Templates, Examples & ATS Tips for Business School (2025)"
        description="MBA resumes follow strict conventions — one page, specific bullet structure, and GPA rules that vary by program. What MBB and banking recruiters look for and what filters you out."
        url={`${BASE_URL}/blog/mba-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "MBA Resume", url: `${BASE_URL}/blog/mba-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · MBA Recruiting</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">MBA Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            MBA resumes follow strict conventions that differ from standard work resumes — one page enforced absolutely, bullets that lead with scope not task, and GPA rules understood by every recruiter in the room.
          </p>
        </div>
      </section>

      {/* Rules */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 non-negotiable MBA resume rules</h2>
          <div className="mt-6 space-y-3">
            {MBA_RESUME_RULES.map((item, i) => (
              <div key={item.rule} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--brand)]/10 flex items-center justify-center text-[11px] font-bold text-[var(--brand)]">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                    <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet examples */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Bullet transformations by pre-MBA track</h2>
          <div className="mt-6 space-y-5">
            {BULLET_EXAMPLES.map((ex) => (
              <div key={ex.track} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{ex.track}</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="rounded-xl bg-red-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{ex.weak}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">After</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{ex.strong}</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg)] p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">What changed</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{ex.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By recruiting track */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">By recruiting track</h2>
          <div className="mt-6 space-y-4">
            {BY_RECRUITING_TRACK.map((track) => (
              <div key={track.track} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)] text-[16px]">{track.track}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{track.what_recruiters_prioritize}</p>
                <ul className="mt-3 space-y-1.5">
                  {track.specific_tips.map((tip) => (
                    <li key={tip} className="flex gap-2 text-[12.5px] text-[var(--muted)]">
                      <span className="text-[var(--brand)] font-bold flex-shrink-0">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your MBA resume for the specific recruiting track.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari rewrites your bullets for the consulting, banking, or corporate strategy audience — with scope-first structure, quantified impact, and ATS keyword validation for the firms you&apos;re targeting. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
