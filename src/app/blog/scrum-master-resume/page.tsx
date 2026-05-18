import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Scrum Master Resume — Examples & ATS Keywords (2025)",
  description:
    "Scrum Master resumes that land interviews show team velocity improvements, impediment removal, and delivery outcomes — not just CSM certification. Before/after examples and the ATS keyword breakdown for Scrum Master, Agile Coach, and Release Train Engineer roles.",
  keywords: ["scrum master resume", "scrum master resume examples", "agile coach resume", "CSM resume", "scrum master resume keywords", "agile resume 2025", "RTE resume"],
  alternates: { canonical: "/blog/scrum-master-resume" },
  openGraph: {
    title: "Scrum Master Resume — Examples & ATS Keywords (2025)",
    description: "Scrum Master resumes that show velocity improvements and delivery outcomes — not just certification.",
    url: "/blog/scrum-master-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_SIGNALS = [
  { signal: "Team velocity and delivery metrics", detail: "Scrum Master hiring managers want evidence that you've improved team performance — not just facilitated ceremonies. 'Managed Scrum ceremonies for 2 teams' signals process administration. 'Coached 2 feature teams (14 engineers) — increased sprint velocity from 42 to 78 points over 6 months, reduced sprint spillover from 35% to 8%, and shipped 4 consecutive quarters at or above forecast' shows coaching impact. The numbers make the difference." },
  { signal: "Impediment removal and cross-team coordination", detail: "A Scrum Master's highest-value work is removing the blockers that slow teams down — organizational dependencies, tooling issues, unclear requirements, interpersonal dynamics. Your resume should show specific impediments removed: 'Resolved 3-month deployment dependency between platform and product teams by facilitating inter-team DoD alignment — unblocked 6 quarters of stalled stories' is far more compelling than 'Facilitated cross-team communication.'" },
  { signal: "Coaching vs. managing distinction", detail: "Senior Scrum Master roles specifically look for candidates who coach teams toward self-organization rather than managing their processes. Resume language should reflect the coaching posture: 'coached,' 'enabled,' 'facilitated the team's decision to,' 'helped the team identify' — rather than 'enforced,' 'managed,' 'ran,' 'controlled.' This distinction signals understanding of Scrum theory, not just Scrum mechanics." },
  { signal: "SAFe and scaled agility experience", detail: "Organizations scaling beyond 2-3 teams increasingly use SAFe (Scaled Agile Framework), and Release Train Engineer roles command significantly higher salaries than single-team Scrum Masters. If you have experience facilitating PI Planning, managing ARTs, or coaching program-level agility, this should be prominent on your resume. SAFe certifications (SPC, RTE) combined with ART delivery metrics are the highest-signal combination for large enterprise roles." },
];

const BEFORE_AFTER = [
  {
    level: "Scrum Master",
    before: { bullet: "Facilitated daily standups, sprint planning, retrospectives, and sprint reviews for two development teams", problems: ["Lists ceremonies, not outcomes", "No velocity, delivery rate, or team health metrics", "Reads as administrative, not coaching"] },
    after: { bullet: "Scrum Master for two cross-functional feature teams (8 and 6 engineers) — improved combined sprint velocity 65% over 3 quarters, reduced critical impediment resolution time from 12 days to 2 days, and drove adoption of Definition of Done that reduced post-release defects 40%", improvements: ["Teams and scope named (14 engineers)", "Velocity improvement quantified (65%)", "Two distinct outcome types: delivery speed and quality"] },
  },
  {
    level: "Senior Scrum Master / Agile Coach",
    before: { bullet: "Led agile transformation for the engineering organization and coached multiple teams on agile best practices", problems: ["'Led agile transformation' without scope or outcome", "'Coached on agile best practices' is circular — what changed?", "No scale, no metrics, no before/after state"] },
    after: { bullet: "Drove Agile transformation across 6 product teams (42 engineers) — piloted SAFe framework adoption over 2 PI cycles, reduced time-to-market for major features from 9 months to 11 weeks, and decreased cross-team dependency blockers 55% through inter-team retrospective cadence and shared backlogs", improvements: ["Scope named (6 teams, 42 engineers, 2 PIs)", "Before/after time-to-market comparison (9 months → 11 weeks)", "SAFe signal for program-level coaching experience"] },
  },
];

const ATS_KEYWORDS = [
  { tier: "Agile Methodologies", keywords: ["Scrum", "SAFe", "Kanban", "Lean", "XP", "LeSS", "Nexus", "Disciplined Agile", "PI Planning"] },
  { tier: "Certifications", keywords: ["CSM", "PSM", "SAFe SPC", "SAFe RTE", "Agile Coach", "ICP-ACC", "PMI-ACP", "CSPO"] },
  { tier: "Delivery Metrics", keywords: ["sprint velocity", "throughput", "cycle time", "lead time", "error budget", "Definition of Done", "acceptance criteria", "release cadence"] },
  { tier: "Facilitation & Coaching", keywords: ["retrospectives", "PI Planning", "Inspect and Adapt", "coaching", "facilitation", "conflict resolution", "servant leadership", "team building"] },
  { tier: "Tools", keywords: ["Jira", "Confluence", "Azure DevOps", "Rally", "Miro", "Asana", "Monday.com", "Linear", "LeanKit"] },
  { tier: "Scaling & Program", keywords: ["ART", "Release Train", "Value Stream", "Program Increment", "cross-team dependencies", "Agile Portfolio Management"] },
];

const FAQS = [
  { question: "Do I need a CSM certification to get a Scrum Master job?", answer: "For entry-level Scrum Master roles, a CSM (Certified ScrumMaster from Scrum Alliance) or PSM I (Professional Scrum Master from Scrum.org) is almost table stakes — most job postings require it or list it as strongly preferred. Without certification, you'll be competing against candidates who have it, which is a significant disadvantage. For senior roles or Agile Coach positions, the SAFe SPC or RTE certification is the differentiating signal. The certification alone doesn't get you the role — the delivery metrics you can show alongside it do." },
  { question: "How do I show Scrum Master experience on a resume if my previous title was something else?", answer: "The title doesn't need to match. If you were a project manager who ran Scrum teams, a team lead who facilitated retrospectives, or an engineer who took on Scrum Master responsibilities, frame the work clearly: 'Acting Scrum Master (alongside Software Engineer role) — facilitated Scrum ceremonies for 6-person team, coached sprint planning, and resolved cross-team dependencies.' The specifics of what you actually did matter more than whether 'Scrum Master' was in your job title." },
  { question: "What's the difference between a Scrum Master resume and an Agile Coach resume?", answer: "Scope and level of coaching abstraction. A Scrum Master resume focuses on team-level delivery metrics, sprint-level coaching, and ceremony facilitation within 1-3 teams. An Agile Coach resume shows program-level and organizational change: transforming multiple teams, changing how leadership thinks about agility, building internal coaching capability, and sustained cultural change. Agile Coach resumes should show 'trained X Scrum Masters,' 'built an agile CoP of Y practitioners,' or 'shifted leadership from output to outcome measurement' — evidence of organizational impact, not just team facilitation." },
];

export default async function ScrumMasterResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Scrum Master Resume — Examples & ATS Keywords (2025)" description="Scrum Master resumes that show velocity improvements and delivery outcomes — not just certification." url={`${BASE_URL}/blog/scrum-master-resume`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Scrum Master Resume", url: `${BASE_URL}/blog/scrum-master-resume` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Agile / Scrum</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Scrum Master Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Velocity improvements, impediment removal outcomes, and coaching impact — what Scrum Master hiring managers scan for, with before/after bullets and the full ATS keyword breakdown.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={4} label="Hiring signals Scrum Master managers look for beyond CSM certification" accent="#0D7182" />
            <StatCard value={65} suffix="%" label="Of Scrum Master resumes list ceremonies without a single velocity metric" accent="#DC2626" />
            <StatCard value={6} label="ATS keyword tiers for Scrum Master, Agile Coach, and RTE roles" accent="#7C3AED" />
            <StatCard value={35} suffix="%" label="Salary premium for SAFe-certified Scrum Masters with ART delivery experience" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Scrum Master hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {HIRING_SIGNALS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[var(--brand)]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after resume bullets</h2>
          <div className="mt-6 space-y-6">
            {BEFORE_AFTER.map((item) => (
              <div key={item.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3"><p className="font-bold text-[var(--brand)]">{item.level}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-red-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-3">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-red-100 rounded-lg p-3">{item.before.bullet}</p>
                    <ul className="space-y-1">{item.before.problems.map((p) => <li key={p} className="flex gap-2 text-[12px] text-red-600"><span>✗</span>{p}</li>)}</ul>
                  </div>
                  <div className="p-5 bg-emerald-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-3">After</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-emerald-100 rounded-lg p-3">{item.after.bullet}</p>
                    <ul className="space-y-1">{item.after.improvements.map((imp) => <li key={imp} className="flex gap-2 text-[12px] text-emerald-700"><span>✓</span>{imp}</li>)}</ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords for Scrum Master and Agile roles</h2>
          <div className="mt-6 space-y-3">
            {ATS_KEYWORDS.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[var(--border)] p-4">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{tier.tier}</p>
                <div className="flex flex-wrap gap-1.5">{tier.keywords.map((kw) => <span key={kw} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[12px] font-medium text-[var(--ink)]">{kw}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your Scrum Master resume reviewed by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and target JD — Zari rewrites your bullets to show velocity improvements, impediment removal outcomes, and coaching impact in the specific language Scrum Master hiring managers scan for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
