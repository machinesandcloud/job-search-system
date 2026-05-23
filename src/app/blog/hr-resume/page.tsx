import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "HR Resume — Examples, Skills & ATS Tips for HR Professionals (2025)",
  description:
    "What HR hiring managers read for in an HR resume — program ownership, workforce metrics, compliance breadth, and HRIS fluency. With before/after bullet examples for HR coordinator, HRBP, and HR director — plus ATS keywords by HR function.",
  keywords: ["HR resume", "human resources resume", "HRBP resume", "HR business partner resume", "HR manager resume", "HR director resume", "human resources resume examples 2025"],
  alternates: { canonical: "/blog/hr-resume" },
  openGraph: {
    title: "HR Resume — Examples, Skills & ATS Tips (2025)",
    description: "Write an HR resume that passes ATS and gets callbacks — with before/after examples for every HR career level.",
    url: "/blog/hr-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_READ_FOR = [
  {
    signal: "Workforce scope — the number everything else is calibrated against",
    detail: "HR professionals are evaluated against the workforce they supported. An HR Business Partner supporting 400 employees is a fundamentally different role than one supporting 40 — and hiring managers know it. Include employee headcount for every role you list: how many employees you supported, how many you hired in a given period, how many you managed through a reduction. This number anchors all your other accomplishments.",
    redFlag: "'Supported the HR function for a growing technology company' — no headcount, no scale, no useful signal.",
    strongExample: "Served as sole HRBP for 420-employee SaaS division; supported managers across Engineering, Product, and GTM on performance management, employee relations, and workforce planning.",
  },
  {
    signal: "Program ownership with measurable results",
    detail: "HR adds value through programs — onboarding, performance management, compensation reviews, DEI initiatives, retention strategies, L&D programs. Hiring managers look for evidence that you owned a program from design to execution, and that it produced a measurable outcome. Time-to-hire reduction, retention rate improvement, engagement score gains, offer acceptance rate — these are the numbers that differentiate HR professionals.",
    redFlag: "'Assisted with performance management and supported the annual review process' — no ownership, no outcome.",
    strongExample: "Redesigned 90-day onboarding program for 200+ new hires/year; reduced time-to-productivity from 11 weeks to 7 weeks and improved 90-day retention from 74% to 89% over 2 hiring cycles.",
  },
  {
    signal: "Employee relations complexity",
    detail: "ER experience — performance improvement plans, investigations, terminations, accommodations, policy interpretation — is a major differentiator, especially for mid-to-senior HR roles. Hiring managers look for evidence that you've handled difficult, high-stakes situations that required judgment, documentation rigor, and legal awareness. You don't need to name individuals, but you should convey scope and complexity.",
    redFlag: "Resume describes only the pleasant parts of HR (hiring, culture, onboarding) with no evidence of handling conflict, investigations, or PIPs.",
    strongExample: "Managed 28 employee relations cases in 2023 including 4 formal harassment investigations, 12 PIPs with documented coaching plans, and 6 exit processes; zero escalations to litigation.",
  },
  {
    signal: "HRIS and technology fluency",
    detail: "Modern HR operates through systems. Workday, ADP, BambooHR, Rippling, Greenhouse, Lever, Lattice, 15Five, Glint, Compensation platforms (Radford, Mercer, Pave) — naming your specific HRIS and ancillary tools signals that you can operate without a 3-month onboarding ramp. This is especially important when organizations are implementing or migrating systems.",
    redFlag: "'Proficient in HRIS systems' without naming any. This is the HR resume equivalent of 'experienced with software.'",
    strongExample: "Systems: Workday (HRIS, recruiting, absence management), Greenhouse (ATS), Lattice (performance management), Pave (compensation benchmarking), Rippling (payroll integration), Google Workspace.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "HR Coordinator",
    before: "Assisted with recruiting and helped onboard new employees",
    after: "Coordinated full-cycle recruiting for 35 open roles across 6 departments over 12 months; managed ATS (Greenhouse) pipeline, scheduled 180+ interviews, and administered background checks — supporting 92% offer acceptance rate and 8-day average time-to-offer from hiring manager approval",
    fix: "Volume (35 roles, 180+ interviews), system named (Greenhouse), timeline (12 months), and two outcome metrics (offer acceptance rate, time-to-offer) replace 'assisted with recruiting.'",
  },
  {
    level: "HR Business Partner",
    before: "Partnered with business leaders on HR initiatives and supported employees",
    after: "Served as strategic HRBP for 280-person Engineering org; led Q3 compensation review impacting 190 employees, partnered on 2 reorgs affecting 45 roles, and reduced voluntary attrition from 18% to 11% through stay interview program and targeted retention bonuses for top quartile performers",
    fix: "Org size, three distinct initiatives with scope numbers, and a measurable attrition outcome replace the completely generic 'partnered on HR initiatives.'",
  },
  {
    level: "HR Director",
    before: "Led the HR department and managed a team of HR professionals",
    after: "Built and led 9-person HR team (2 HRBPs, 3 recruiters, 2 HR coordinators, 1 comp analyst, 1 L&D specialist) supporting 1,200-employee organization through Series D and 60% headcount growth; designed and implemented HR infrastructure (HRIS migration from BambooHR to Workday, compensation philosophy, career laddering) during 18-month scale phase",
    fix: "Team composition by role (not just count), company scale, growth context, and the specific infrastructure built during the growth phase — these are director-level signals that distinguish strategy ownership from management overhead.",
  },
];

const BY_HR_FUNCTION = [
  {
    function: "Talent Acquisition / Recruiting",
    atsKeywords: "full-cycle recruiting, time-to-fill, offer acceptance rate, pipeline management, sourcing, Boolean search, LinkedIn Recruiter, Greenhouse, Lever, technical recruiting, passive candidate sourcing",
    leadWith: "Roles filled per period, time-to-fill vs. benchmark, offer acceptance rate, and any specialized recruiting (executive, technical, diversity hiring)",
    certifications: "PHR, SHRM-CP, LinkedIn Recruiting certificate",
  },
  {
    function: "HR Business Partner / Generalist",
    atsKeywords: "employee relations, performance management, workforce planning, organizational design, comp analysis, headcount planning, PIP, HRBP, strategic HR, talent management",
    leadWith: "Employee headcount supported, ER case volume, retention outcomes, comp review scope, and org design projects",
    certifications: "PHR, SPHR, SHRM-CP, SHRM-SCP",
  },
  {
    function: "Compensation & Benefits",
    atsKeywords: "compensation benchmarking, job architecture, salary bands, equity administration, Radford, Mercer, Pave, benefits administration, total rewards, open enrollment, FLSA compliance, 401k administration",
    leadWith: "Compensation review scope (# employees, budget), benchmarking methodology, benefits cost management, and any equity program design",
    certifications: "CCP (Certified Compensation Professional), CBP (Certified Benefits Professional), GRP",
  },
  {
    function: "L&D / People Development",
    atsKeywords: "learning management system, LMS, curriculum design, leadership development, onboarding, training effectiveness, Kirkpatrick model, time-to-productivity, e-learning, Articulate, facilitation",
    leadWith: "Program learner count, before/after time-to-productivity or retention, training completion rates, and any learning tech implemented",
    certifications: "CPLP (Certified Professional in Learning), ATD, coaching certification (ICF)",
  },
];

export default async function HrResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="HR Resume — Examples, Skills & ATS Tips (2025)"
        description="Write an HR resume that passes ATS and gets callbacks — with before/after examples for every HR career level."
        url={`${BASE_URL}/blog/hr-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "HR Resume", url: `${BASE_URL}/blog/hr-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Human Resources</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">HR Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            HR hiring managers filter for workforce scope, program ownership with measurable results, and HRIS fluency — in that order. Most HR resumes describe activities. Winning resumes describe outcomes. Here&apos;s the difference.
          </p>
        </div>
      </section>

      {/* What They Read For */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What HR hiring managers read for</h2>
          <div className="mt-8 space-y-5">
            {WHAT_THEY_READ_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.signal}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Red flag</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.redFlag}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong example</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.strongExample}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet Transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: bullet rewrites by career level</h2>
          <div className="mt-8 space-y-6">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.level} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.level}</p>
                </div>
                <div className="grid gap-0 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="rounded-lg bg-red-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.before}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">After</p>
                    <p className="rounded-lg bg-emerald-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.after}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[#4361EE]">What changed: </span>{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By HR Function */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords and strategy by HR function</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Talent acquisition, HRBP, comp & benefits, and L&D roles are screened for completely different terms. Match your resume to the function you&apos;re targeting.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {BY_HR_FUNCTION.map((fn) => (
              <div key={fn.function} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{fn.function}</h3>
                <div className="mt-4 space-y-3 text-[13px] text-[var(--muted)]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Lead with</p>
                    <p className="leading-6">{fn.leadWith}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Key ATS terms</p>
                    <p className="leading-6">{fn.atsKeywords}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--brand)]/[0.05] p-3">
                    <p className="font-semibold text-[#4361EE]">Certifications: {fn.certifications}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your HR resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your HR resume against the specific job description — finds missing program ownership language and metrics, rewrites weak bullets, and prepares you for the HR interview. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
