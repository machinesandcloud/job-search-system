import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Frontend Developer Resume — Examples & ATS Keywords (2025)",
  description:
    "Frontend developer resumes that get callbacks show performance wins, user-facing impact, and cross-functional ownership — not just a framework list. Before/after examples and the full ATS keyword breakdown for frontend, UI, and web developer roles.",
  keywords: ["frontend developer resume", "frontend engineer resume", "UI developer resume", "React developer resume", "web developer resume 2025", "frontend resume keywords", "frontend resume examples"],
  alternates: { canonical: "/blog/frontend-developer-resume" },
  openGraph: {
    title: "Frontend Developer Resume — Examples & ATS Keywords (2025)",
    description: "Frontend resumes that show performance wins and user-facing impact — not just a framework list.",
    url: "/blog/frontend-developer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_SIGNALS = [
  { signal: "User-facing impact with metrics", detail: "Frontend hiring managers look for concrete user-facing outcomes: Core Web Vitals improvements, load time reductions, conversion rate lifts, and accessibility wins. 'Reduced LCP from 4.2s to 1.1s on product listing pages — improved mobile conversion rate 23%' is infinitely stronger than 'Improved frontend performance.' The metric needs to tie frontend work to business results, not just technical benchmarks." },
  { signal: "Component architecture and ownership", detail: "Senior frontend roles require design system ownership, component API decisions, and the ability to influence how a large codebase scales. Resume language should show scope: 'Built and maintained component library used by 4 product teams (React, TypeScript, Storybook) — reduced design-to-dev implementation time from 3 weeks to 4 days' signals architecture-level ownership that juniors don't have." },
  { signal: "Cross-functional collaboration with product and design", detail: "The best frontend developers bridge design and engineering — they translate Figma to production with fidelity, push back on designs that don't account for edge cases, and work in design tokens and systems. Resumes that show this collaboration signal: 'Partnered with design team on design system migration — established token standards for 120+ components, eliminated 40+ one-off style overrides across 6 repos.'" },
  { signal: "Testing, accessibility, and production ownership", detail: "Frontend resumes at senior levels should show production ownership: unit and integration test coverage numbers, accessibility compliance (WCAG levels), and evidence of owning quality gates. 'Wrote Cypress E2E test suite covering 180 critical user paths — caught 12 regression bugs before production; achieved WCAG 2.1 AA compliance across checkout flow' shows engineering discipline beyond UI construction." },
];

const BEFORE_AFTER = [
  {
    level: "Mid-Level Frontend Developer",
    before: { bullet: "Worked on the React frontend to improve performance and fix bugs across multiple pages", problems: ["No metric — improved by how much?", "'Multiple pages' is vague — what scope?", "'Worked on' implies support, not ownership"] },
    after: { bullet: "Led performance remediation for product catalog (React, Next.js) — reduced bundle size 45% through code-splitting and lazy loading, improved LCP from 3.8s to 0.9s, and brought mobile session abandonment down 18% over 6 weeks", improvements: ["Specific scope (product catalog)", "Three distinct metrics (bundle, LCP, abandonment)", "Timeline shows sustained ownership, not a one-day fix"] },
  },
  {
    level: "Senior Frontend Engineer",
    before: { bullet: "Built and maintained the design system used by the company's frontend teams", problems: ["'Built and maintained' is vague — what was the scope?", "No adoption metric — how many teams or components?", "No business impact stated"] },
    after: { bullet: "Architected company-wide design system (React, TypeScript, Storybook) adopted by 6 product teams across 3 product lines — standardized 95 components, reduced UI inconsistencies reported in user research by 70%, cut feature frontend build time from 2 weeks to 3 days", improvements: ["Adoption scope named (6 teams, 3 product lines, 95 components)", "User research tie-in shows product-quality thinking", "Business outcome: feature velocity improvement quantified"] },
  },
];

const ATS_KEYWORDS = [
  { tier: "Core Technologies", keywords: ["React", "TypeScript", "JavaScript", "Next.js", "Vue.js", "Angular", "HTML5", "CSS3", "Tailwind CSS", "styled-components"] },
  { tier: "Performance & Web Vitals", keywords: ["Core Web Vitals", "LCP", "CLS", "INP", "Lighthouse", "Web Performance", "bundle optimization", "code splitting", "lazy loading"] },
  { tier: "Build Tools & Ecosystem", keywords: ["Webpack", "Vite", "Rollup", "ESBuild", "npm", "pnpm", "monorepo", "Turborepo", "Nx"] },
  { tier: "Testing", keywords: ["Jest", "Cypress", "Playwright", "Testing Library", "Vitest", "unit testing", "E2E testing", "accessibility testing"] },
  { tier: "Design & Collaboration", keywords: ["Figma", "design systems", "Storybook", "design tokens", "WCAG", "accessibility", "responsive design", "mobile-first"] },
  { tier: "State & Data", keywords: ["Redux", "Zustand", "React Query", "TanStack Query", "GraphQL", "REST API", "SWR", "Context API"] },
];

const FAQS = [
  { question: "Should I list every JavaScript framework I've used on my frontend resume?", answer: "No — tool sprawl signals a generalist with no depth. Recruiters and ATS systems scan for specific keywords, but hiring managers penalize resumes that list 15 frameworks with no indication of depth. Instead, clearly tier your skills: 3-4 deep proficiencies (React, TypeScript, Next.js), 2-3 working knowledge (Vue, Svelte), and 1-2 exposure (Angular). ATS still catches all the keywords; hiring managers see depth, not noise." },
  { question: "How do I show senior-level frontend work if my company doesn't have metrics?", answer: "Proxy metrics work. If you don't have A/B test data, use: Lighthouse score improvements before/after, component library adoption numbers (teams, components, repos), accessibility audit scores, test coverage percentages, or qualitative scoping ('owned frontend across 3 of 5 product lines'). The goal is specificity and scale, not a specific number. Even 'Reduced open accessibility bugs from 140 to 8 over two quarters' shows discipline without needing analytics access." },
  { question: "Is a portfolio required for frontend developer roles?", answer: "At junior and mid levels, a strong portfolio can offset limited resume depth. At senior levels, portfolio weight decreases — depth of system design thinking and engineering judgment matter more than visual demos. For senior frontend roles, 2-3 well-documented case studies (the problem, your approach, the technical decisions, and the outcome) beat a portfolio of 10 undocumented projects. Link to GitHub repos with clean READMEs, not just deployed demos." },
];

export default async function FrontendDeveloperResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Frontend Developer Resume — Examples & ATS Keywords (2025)" description="Frontend resumes that show performance wins and user-facing impact — not just a framework list." url={`${BASE_URL}/blog/frontend-developer-resume`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Frontend Developer Resume", url: `${BASE_URL}/blog/frontend-developer-resume` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Frontend</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Frontend Developer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Performance wins, component ownership, and user-facing impact — what frontend hiring managers scan for, with before/after bullets and a 6-tier ATS keyword breakdown.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={4} label="Hiring signals frontend managers look for beyond a framework list" accent="#4361EE" />
            <StatCard value={72} suffix="%" label="Of frontend resumes list React without a single performance metric — main screen-out" accent="#DC2626" />
            <StatCard value={6} label="ATS keyword tiers covering frontend, performance, and web development roles" accent="#7C3AED" />
            <StatCard value={40} suffix="%" label="Higher callback rate when Core Web Vitals and component scope are named" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What frontend hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {HIRING_SIGNALS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[#4361EE]">{i + 1}</span>
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
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3"><p className="font-bold text-[#4361EE]">{item.level}</p></div>
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords for frontend and web developer roles</h2>
          <div className="mt-6 space-y-3">
            {ATS_KEYWORDS.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[var(--border)] p-4">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">{tier.tier}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your frontend resume reviewed by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and target JD — Zari rewrites your bullets to show Core Web Vitals wins, component architecture scope, and user-facing impact in the specific language frontend hiring managers scan for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
