import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Project Manager Resume — Examples, Skills & PMP Tips (2025)",
  description:
    "What hiring managers read for in a project manager resume — delivery metrics, methodology breadth, stakeholder management, and risk mitigation. With before/after bullets, skills section strategy, and ATS keywords for PMP, Agile, and hybrid PM roles.",
  keywords: ["project manager resume", "project manager resume examples", "project manager resume template", "PMP resume", "agile project manager resume", "project manager resume skills", "project manager resume 2025"],
  alternates: { canonical: "/blog/project-manager-resume" },
  openGraph: {
    title: "Project Manager Resume — Examples, Skills & PMP Tips (2025)",
    description: "What hiring managers read for in a PM resume — delivery record, methodology depth, stakeholder management, and risk approach — with before/after examples.",
    url: "/blog/project-manager-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_EVALUATE = [
  {
    signal: "Delivery record with hard numbers",
    detail: "Project managers are hired to deliver — on scope, on schedule, on budget. Hiring managers scan for quantified delivery evidence first: what was the project budget, was it delivered on time, what percentage of original scope was maintained, what was the financial impact. 'Managed projects' is the weakest possible framing. 'Delivered $4.2M ERP implementation 6 weeks ahead of schedule with 98% scope completion' is compelling.",
    commonMistake: "Bullets that describe your process ('created project plans,' 'ran status meetings,' 'maintained RAID logs') with no delivery outcomes. Process descriptions show you know PM methodology; outcome descriptions show you actually deliver.",
  },
  {
    signal: "Scale and complexity signals",
    detail: "Budget managed, team size, number of workstreams, number of stakeholder groups, geographic distribution — these signals establish the complexity level you're qualified for. A PM who's managed $500K projects is qualified for $500K projects; a PM who's managed $15M cross-functional programs is qualified for the enterprise tier.",
    commonMistake: "No mention of budget, team size, or organizational complexity. This makes it impossible for a hiring manager to understand if you're a match for the scope they're hiring for.",
  },
  {
    signal: "Methodology depth and breadth",
    detail: "The methodology landscape — Agile, Scrum, Waterfall, Kanban, SAFe, PRINCE2, PMI/PMP — matters for ATS filtering and signals your fit for the company's operating model. Tech companies want Agile; government/defense often wants Waterfall; large enterprises often want hybrid. Having PMP certification signals a baseline competency standard recognized across industries.",
    commonMistake: "Listing methodology names without evidence of applying them at scale. 'Familiar with Agile' is weaker than 'Ran 12 Scrum teams across 3 products using SAFe framework.'",
  },
  {
    signal: "Stakeholder and executive communication",
    detail: "Senior PM roles require managing up — presenting to C-suite, running steering committee meetings, managing sponsor relationships, and communicating risks before they become crises. Evidence of executive-level communication is a key differentiator for senior positions.",
    commonMistake: "All bullets focus on team management and delivery mechanics with no evidence of upward communication or executive stakeholder management. This reads as an IC PM who executes but doesn't lead.",
  },
];

const BY_METHODOLOGY = [
  {
    methodology: "Agile / Scrum PM",
    context: "Tech companies, product teams, software delivery organizations",
    keyTerms: ["sprint planning", "retrospectives", "velocity", "backlog refinement", "Scrum master", "product owner collaboration", "agile ceremonies", "burndown charts"],
    resumeEmphasis: "Velocity improvement over sprints, team happiness/retention, story point completion rate, release cadence, impediment removal speed",
    certifications: ["PMI-ACP", "CSM (Certified Scrum Master)", "CSPO", "SAFe SPC", "Scrum.org PSM"],
    sampleBullet: "Led 4-squad Agile delivery for mobile app relaunch — maintained 87% average sprint velocity over 8 months, shipped 23-feature roadmap 3 weeks ahead of planned release date.",
  },
  {
    methodology: "Waterfall / Traditional PM",
    context: "Government, defense, construction, infrastructure, regulated industries",
    keyTerms: ["WBS (Work Breakdown Structure)", "critical path", "earned value management", "RAID log", "baseline schedule", "change control", "MS Project", "stakeholder register"],
    resumeEmphasis: "Schedule performance index (SPI), cost performance index (CPI), variance at completion (VAC), milestone achievement rate",
    certifications: ["PMP (PMI)", "CAPM", "PRINCE2 Practitioner", "PGMP"],
    sampleBullet: "Managed $8.7M infrastructure upgrade program for federal agency — delivered on schedule (SPI 1.02) and 4% under budget (CPI 1.04) across 14 workstreams with 60+ stakeholders.",
  },
  {
    methodology: "Hybrid PM",
    context: "Enterprise companies transitioning to Agile, large program management",
    keyTerms: ["SAFe (Scaled Agile Framework)", "PI planning", "Kanban", "hybrid delivery model", "program increment", "portfolio management", "OKR alignment"],
    resumeEmphasis: "Portfolio-level metrics, cross-team dependency management, portfolio ROI, business outcome alignment",
    certifications: ["PMP + Agile combination", "SAFe Program Consultant (SPC)", "PMI-ACP + PMP"],
    sampleBullet: "Designed hybrid Agile-Waterfall delivery model for 40-person digital transformation program — integrated compliance requirements (Waterfall gate) with Agile sprint delivery across 6 product squads.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    before: "Managed multiple projects simultaneously while coordinating with cross-functional teams.",
    after: "Managed concurrent portfolio of 6 projects ($2.8M combined budget) across engineering, marketing, and operations — maintained 94% on-time milestone delivery rate over 18 months.",
    fix: "Portfolio size (6 projects), budget ($2.8M), cross-functional specificity, and a concrete delivery metric (94% on-time milestone rate).",
  },
  {
    before: "Led Agile transformation initiative to improve team delivery.",
    after: "Drove Agile adoption across 3 engineering teams (28 developers) — trained 6 scrum masters, redesigned sprint ceremonies, and improved average sprint velocity by 34% over 6 months. Reduced release cycle time from 8 weeks to 2 weeks.",
    fix: "Scale (3 teams, 28 people, 6 SMs), timeline (6 months), quantified improvement (34% velocity, 8 → 2 week cycle time). The 'before' could have been written by anyone who attended an Agile training.",
  },
  {
    before: "Managed vendor relationships and contract negotiations for various projects.",
    after: "Negotiated and managed $4.1M in vendor contracts across 8 suppliers — consolidated from 14 to 8 vendors during a portfolio rationalization, achieving $380K in annual cost savings while maintaining SLA performance above 98%.",
    fix: "Dollar figures ($4.1M contracts, $380K savings), vendor count (14 → 8), SLA performance, and a business outcome (cost savings from rationalization).",
  },
];

const FAQS = [
  {
    question: "Should a project manager resume include a PMP certification?",
    answer: "Yes — prominently. PMP is the most widely recognized PM certification and a common ATS filter for senior PM roles. List it after your name in the header (Jane Smith, PMP) and in your skills/certifications section. If you're working toward PMP, list 'PMP Candidate (exam scheduled Q3 2025)' — it signals the investment without overclaiming. Other certifications worth listing: PMI-ACP, CAPM, CSM, SAFe SPC, PRINCE2, and PGMP."
  },
  {
    question: "What's the difference between a project manager and product manager resume?",
    answer: "Project managers own delivery — getting work done on scope, schedule, and budget. Product managers own direction — deciding what to build and why. A project manager resume emphasizes delivery metrics (on-time rate, cost variance, scope completion), methodology certification, and stakeholder management. A product manager resume emphasizes business outcome ownership, customer discovery, roadmap decisions, and metrics like DAU growth or revenue impact. The distinction matters for ATS filtering — a project manager resume with product manager keywords and vice versa will hurt more than help."
  },
  {
    question: "How long should a project manager resume be?",
    answer: "One page for under 7 years of experience; two pages is appropriate for experienced PMs with diverse program portfolios. Senior PM and program manager resumes often benefit from 2 pages because the scope, org complexity, and delivery record genuinely takes space to document. The editing rule: every line should communicate something about the scope you've managed or an outcome you've driven. 'Attended weekly status meetings' doesn't survive the edit."
  },
  {
    question: "What are the most important ATS keywords for a project manager resume?",
    answer: "Mirror the job description exactly. High-frequency PM ATS terms: project management, program management, PMP, Agile, Scrum, Waterfall, stakeholder management, risk management, budget management, MS Project, JIRA, Confluence, cross-functional, change management, resource allocation, earned value management. For senior roles, add: portfolio management, governance, steering committee, executive communication. Include the specific tools listed in the job description — 'MS Project' and 'project management software' are not equivalent to an ATS."
  },
];

export default async function ProjectManagerResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Project Manager Resume — Examples, Skills & PMP Tips (2025)"
        description="What hiring managers read for in a PM resume — delivery record, methodology depth, stakeholder management, and risk approach."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/project-manager-resume`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Project Manager Resume", url: `${BASE_URL}/blog/project-manager-resume` },
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
            Project manager resume<br /><span className="gradient-text-animated">what hiring managers actually check</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            PM resumes are heavy on process descriptions and light on delivery outcomes — the exact opposite of what hiring managers want. Here&apos;s what they evaluate, by methodology and career level, with before/after examples and ATS keyword strategy.
          </p>
        </div>
      </section>

      {/* What they evaluate */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 signals PM hiring managers evaluate</h2>
          <div className="mt-8 space-y-5">
            {WHAT_THEY_EVALUATE.map((item) => (
              <div key={item.signal} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
                <div className="bg-red-50/40 px-6 py-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-600">Most common mistake</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.commonMistake}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before and after: 3 PM bullets rewritten</h2>
          <div className="mt-7 space-y-5">
            {BULLET_TRANSFORMATIONS.map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="divide-y divide-[var(--border)]">
                  <div className="bg-red-50/30 px-6 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="text-[13.5px] text-[var(--muted)]">{item.before}</p>
                  </div>
                  <div className="bg-emerald-50/30 px-6 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">After</p>
                    <p className="text-[13.5px] text-[var(--ink)] font-medium">{item.after}</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What made the difference</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By methodology */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume strategy by PM methodology</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The terms, metrics, and certifications that matter differ significantly by methodology. Match your resume to the company&apos;s operating model.</p>
          <div className="mt-7 space-y-5">
            {BY_METHODOLOGY.map((item) => (
              <div key={item.methodology} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.methodology}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)] italic">{item.context}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="px-6 py-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">ATS keywords to include</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyTerms.map((kw) => (
                          <span key={kw} className="rounded-full bg-[var(--bg)] border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]">{kw}</span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Certifications that help</p>
                      <ul className="space-y-1">
                        {item.certifications.map((c) => (
                          <li key={c} className="text-[12.5px] text-[var(--muted)]">{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-[var(--brand)]/[0.04] px-6 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Sample bullet</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] italic">&ldquo;{item.sampleBullet}&rdquo;</p>
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
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Project manager resume FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your PM resume scored for ATS and delivery impact.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari checks your resume against the specific PM role — identifies missing methodology keywords, rewrites process bullets as delivery outcomes, and checks ATS formatting. First optimization free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Optimize my resume free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
