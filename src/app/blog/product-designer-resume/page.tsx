import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Product Designer Resume — Portfolio vs Resume, ATS Keywords (2025)",
  description:
    "Product designer hiring is portfolio-first, but your resume still determines whether your portfolio gets opened. What design hiring managers screen for, how to write resume bullets that complement your case studies, and ATS keywords for design roles.",
  keywords: ["product designer resume", "UX designer resume", "product designer resume examples", "UX resume 2025", "design resume ATS keywords", "product designer resume vs portfolio", "UI UX designer resume"],
  alternates: { canonical: "/blog/product-designer-resume" },
  openGraph: {
    title: "Product Designer Resume — Portfolio vs Resume, ATS Keywords (2025)",
    description: "Design hiring is portfolio-first — but your resume determines if your portfolio gets opened. What to write and why.",
    url: "/blog/product-designer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PORTFOLIO_VS_RESUME = [
  {
    document: "Portfolio",
    purpose: "Shows your design process, taste, and problem-solving depth. This is what gets you the offer.",
    what_goes_here: "Case studies with problem framing, research approach, design iterations, final solution, and impact. Show your process, not just polished mockups.",
    mistake: "Putting your entire portfolio on your resume. The resume is a gate — not the main event.",
  },
  {
    document: "Resume",
    purpose: "Passes ATS, gets your portfolio opened, and gives hiring managers context before they look at your work.",
    what_goes_here: "Impact metrics, product scope, team context, tools, and the business outcome of your design work. This is where numbers live.",
    mistake: "Describing design outputs without business impact ('designed the checkout flow') — the resume should say what changed as a result of the design.",
  },
];

const HIRING_SIGNALS = [
  {
    signal: "Product impact — not deliverable lists",
    detail: "Design managers don't want to know you 'redesigned the onboarding flow.' They want to know what happened: '14-day activation rate increased from 31% to 58% after onboarding redesign, reducing time-to-first-value from 7 days to 2.' Every resume bullet should name the business or user outcome. If you can't quantify it, describe the scope: '3.2M monthly active users across web and iOS.'",
  },
  {
    signal: "Cross-functional collaboration evidence",
    detail: "Senior product designer roles require working directly with PMs, engineers, data analysts, and leadership. Your resume should show this: 'partnered with PM and data team to define success metrics before beginning design,' 'presented design system adoption plan to VP Engineering,' 'ran 14 usability sessions with PM and engineering leads observing.' This signals readiness for senior-level influence, not just craft execution.",
  },
  {
    signal: "Research and systems thinking",
    detail: "Tactical designers execute what PMs define. Strategic designers shape what gets built. The distinction shows in resume language: 'identified through user interviews that the core problem was X, not Y as originally scoped' vs 'followed the brief and delivered screens.' If you've done discovery work, user research, or redefined problem frames — put it on your resume explicitly. It's the difference between a 'designer' and a 'design partner.'",
  },
  {
    signal: "Design system and component-level work",
    detail: "At scale companies (50+ designers, mature products), design system contribution is a major signal. Building, maintaining, or contributing to a design system shows systematic thinking, collaboration with engineering, and long-term product quality investment. Name the system (Figma libraries, Storybook integration, token architecture) and the adoption scale (used by X designers across Y products).",
  },
];

const BEFORE_AFTER = [
  {
    level: "Mid-Level Product Designer",
    before: {
      bullet: "Designed new user onboarding experience for the mobile app",
      problems: ["Output, not outcome — what changed for users?", "No collaboration context — solo project or cross-functional?", "No scale — how many users affected?"],
    },
    after: {
      bullet: "Redesigned mobile onboarding (0→1 collaboration with PM and 2 iOS engineers) — day-7 retention improved 22%, CSAT score increased from 3.1 to 4.4/5 across 1.2M monthly new users",
      improvements: ["Collaboration named (PM, iOS engineers)", "Both business (retention) and user (CSAT) metrics", "Scale quantified (1.2M monthly new users)"],
    },
  },
  {
    level: "Senior Product Designer",
    before: {
      bullet: "Led design for the core product redesign and mentored junior designers on the team",
      problems: ["'Led design' and 'core product redesign' are both vague", "'Mentored' without outcomes — did the junior designer grow?", "No business impact of the redesign"],
    },
    after: {
      bullet: "Led full product redesign across 6 core workflows (7-person cross-functional team, 18-month initiative) — NPS improved from 28 to 61; grew and mentored 3 junior designers, 2 of whom were promoted to mid-level within the project",
      improvements: ["Scope defined (6 workflows, 7-person team, 18 months)", "Business metric (NPS improvement)", "Mentorship outcome quantified (2 promotions)"],
    },
  },
];

const ATS_KEYWORDS = [
  { tier: "Core Design Skills", keywords: ["product design", "UX design", "interaction design", "visual design", "UI design", "information architecture", "design systems"] },
  { tier: "Research Methods", keywords: ["user research", "usability testing", "card sorting", "A/B testing", "Jobs to Be Done", "contextual inquiry", "user interviews", "journey mapping"] },
  { tier: "Tools", keywords: ["Figma", "Sketch", "Adobe XD", "Principle", "ProtoPie", "Storybook", "Zeroheight", "Maze", "UserTesting", "Hotjar"] },
  { tier: "Process & Collaboration", keywords: ["design sprints", "design thinking", "agile", "cross-functional", "design critique", "stakeholder management", "accessibility (WCAG)", "responsive design"] },
  { tier: "Metrics & Impact", keywords: ["conversion rate", "activation rate", "retention", "NPS", "CSAT", "task completion rate", "time on task", "error rate"] },
];

const FAQS = [
  { question: "Do I need a resume if I have a strong portfolio?", answer: "Yes — always. Even in design hiring, recruiters use ATS systems that never see your portfolio. Your resume determines whether a human opens your portfolio link. Think of the resume as the trailer: it needs to make someone want to watch the film. A resume without impact metrics and the right ATS keywords will be filtered out before anyone sees your case studies, regardless of portfolio quality." },
  { question: "How do I write resume bullets for design work without quantitative metrics?", answer: "Not all design outcomes are quantifiable — especially in early-stage companies, research roles, or zero-to-one work. When you don't have metrics: describe the scope ('designed across 4 core product areas serving 800K users'), the organizational impact ('design system adopted by 18 engineers across 3 product teams'), or the qualitative signal ('usability study results directly changed the product roadmap for Q3'). The absence of a number doesn't mean the absence of impact — but you need to describe the impact in specific terms." },
  { question: "Should a product designer resume list every tool they know?", answer: "No — list the tools relevant to the roles you're targeting. Every senior design job posting expects Figma fluency in 2025 — listing it first suggests you're a junior. Lead with tools that differentiate: ProtoPie for advanced prototyping, Storybook for design-engineering handoff, Maze or UserTesting for research. Include Figma, but don't make it the headline. Omit tools you haven't used in 3+ years unless the job description specifically asks for them." },
];

export default async function ProductDesignerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Product Designer Resume — Portfolio vs Resume, ATS Keywords (2025)"
        description="Design hiring is portfolio-first — but your resume determines if your portfolio gets opened. What to write and why."
        url={`${BASE_URL}/blog/product-designer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Product Designer Resume", url: `${BASE_URL}/blog/product-designer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Product Design</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Product Designer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Design hiring is portfolio-first — but your resume determines whether your portfolio gets opened. Impact metrics, ATS keywords, and before/after bullets for every level.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={78} suffix="%" label="Of designer resumes filtered by ATS before a human sees the portfolio" accent="#DC2626" />
            <StatCard value={8} suffix="s" label="Time hiring managers spend on a designer's resume before deciding to open portfolio" accent="#D97706" />
            <StatCard value={5} label="ATS keyword tiers that design job postings scan for in 2025" accent="#7C3AED" />
            <StatCard value={3} suffix="x" label="Higher interview rate for designer resumes that include impact metrics vs deliverable lists" accent="#059669" />
          </div>
        </div>
      </section>

      {/* Portfolio vs Resume */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Portfolio vs resume — what belongs where</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">These documents serve different purposes. Confusing them costs you interviews.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PORTFOLIO_VS_RESUME.map((item) => (
              <div key={item.document} className="rounded-2xl border border-[var(--border)] p-5">
                <p className="font-bold text-[#4361EE] text-[17px] mb-2">{item.document}</p>
                <p className="text-[13px] leading-5 text-[var(--ink)] mb-3">{item.purpose}</p>
                <div className="mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Include here</p>
                  <p className="text-[12.5px] leading-5 text-[var(--muted)]">{item.what_goes_here}</p>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-100 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Common mistake</p>
                  <p className="text-[12.5px] leading-5 text-red-700">{item.mistake}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring signals */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What design hiring managers look for on the resume</h2>
          <div className="mt-6 space-y-4">
            {HIRING_SIGNALS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[#4361EE]">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after resume bullets — mid and senior levels</h2>
          <div className="mt-6 space-y-6">
            {BEFORE_AFTER.map((item) => (
              <div key={item.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3">
                  <p className="font-bold text-[#4361EE]">{item.level}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-red-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-3">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-red-100 rounded-lg p-3">{item.before.bullet}</p>
                    <ul className="space-y-1">
                      {item.before.problems.map((p) => (
                        <li key={p} className="flex gap-2 text-[12px] text-red-600"><span>✗</span>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 bg-emerald-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-3">After</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-emerald-100 rounded-lg p-3">{item.after.bullet}</p>
                    <ul className="space-y-1">
                      {item.after.improvements.map((imp) => (
                        <li key={imp} className="flex gap-2 text-[12px] text-emerald-700"><span>✓</span>{imp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Keywords */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords for product designer roles — organized by tier</h2>
          <div className="mt-6 space-y-3">
            {ATS_KEYWORDS.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[var(--border)] bg-white p-4">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">{tier.tier}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tier.keywords.map((kw) => (
                    <span key={kw} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[12px] font-medium text-[var(--ink)]">{kw}</span>
                  ))}
                </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your design resume reviewed by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and a target job posting — Zari rewrites your bullets to lead with business impact, surfaces missing ATS keywords, and helps you position your portfolio as the main event rather than an afterthought.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
