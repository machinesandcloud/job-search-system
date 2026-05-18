import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "React Developer Resume — Examples & ATS Keywords (2025)",
  description:
    "React developer resumes that get callbacks show application complexity, performance impact, and state management depth — not just that you 'built UIs in React.' What frontend hiring managers scan for, with before/after examples for junior, mid-level, and senior React engineers.",
  keywords: ["react developer resume", "react resume", "react developer resume examples", "frontend developer resume", "react engineer resume", "react resume template 2025", "react ATS keywords", "next.js resume", "react hooks resume"],
  alternates: { canonical: "/blog/react-developer-resume" },
  openGraph: {
    title: "React Developer Resume — Examples & ATS Keywords (2025)",
    description: "React resumes that get callbacks show application complexity, performance impact, and ecosystem depth. Before/after examples for junior, mid, and senior React engineers.",
    url: "/blog/react-developer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_SCAN = [
  {
    signal: "Application complexity and product scope",
    detail: "Listing 'built components in React' describes tutorial work, not production engineering. Hiring managers want to understand the scope of what you built: was it a simple marketing site, a CRUD app, or a real-time dashboard used by 50,000 daily active users? Application complexity signals engineering capability. Describe your application in terms of users, features, data complexity, or business criticality — not just the technical stack.",
    keywords: ["SPA", "SSR", "SSG", "real-time", "dashboard", "multi-tenant", "interactive", "data visualization", "complex state"],
  },
  {
    signal: "State management depth and architecture decisions",
    detail: "React state management is where seniority becomes visible. A junior developer uses useState and props drilling; a senior developer decides when global state is warranted (Redux Toolkit, Zustand, Jotai, React Query), designs the data flow architecture, and understands the tradeoffs. Name your state management approach and why — especially when you made architectural choices: 'migrated from Redux to React Query for server state, reducing client-side state by 70%' shows judgment, not just tool use.",
    keywords: ["Redux", "Redux Toolkit", "Zustand", "Jotai", "React Query", "TanStack Query", "Context API", "Recoil", "state management", "data fetching"],
  },
  {
    signal: "Performance optimization evidence",
    detail: "Frontend performance is a measurable outcome that most React resumes fail to quantify. Hiring managers for senior roles specifically look for: Core Web Vitals improvements, bundle size reduction, render optimization (memoization, virtualization), and load time improvements. 'Reduced LCP from 4.2s to 1.1s' is memorable. 'Optimized performance' is not. If you've touched performance, quantify it.",
    keywords: ["Core Web Vitals", "LCP", "CLS", "FID", "lazy loading", "code splitting", "memoization", "React.memo", "useMemo", "useCallback", "virtual list", "bundle size"],
  },
  {
    signal: "Testing and component quality discipline",
    detail: "Production React engineering includes testing — specifically React Testing Library, Jest, and increasingly Cypress or Playwright for E2E. Hiring managers at companies with serious frontend engineering practices expect to see testing. Beyond testing, they look for TypeScript adoption (now standard at most product companies), component documentation (Storybook), and accessibility practices (WCAG compliance).",
    keywords: ["React Testing Library", "Jest", "Vitest", "Cypress", "Playwright", "TypeScript", "Storybook", "WCAG", "accessibility", "a11y"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Frontend / React Developer",
    before: "Built React components for an e-commerce website",
    after: "Built 15 reusable React components (product cards, cart, checkout flow) for e-commerce platform generating $2.8M monthly revenue — implemented responsive layouts for 80%+ mobile traffic, reducing mobile bounce rate from 54% to 38%",
    what_changed: "Quantified scope (15 components), named the product (e-commerce checkout), named the business context ($2.8M monthly revenue), added mobile-specific metric (mobile traffic %, bounce rate reduction).",
  },
  {
    level: "Mid-Level React Engineer",
    before: "Improved performance of React application and fixed bugs",
    after: "Audited and refactored React dashboard application serving 12,000 daily active users — reduced initial bundle size from 2.1MB to 840KB via code splitting and tree shaking; improved LCP from 3.8s to 1.4s; migrated class components to hooks, reducing component code by ~40%",
    what_changed: "Scale (12,000 DAU), specific technical work (bundle size with before/after numbers, LCP improvement, hooks migration), quantified code reduction. Vague 'performance improvement' became concrete metrics.",
  },
  {
    level: "Senior React Engineer / Frontend Lead",
    before: "Led frontend team and architected React applications",
    after: "Led 4-engineer frontend team through migration from CRA to Next.js App Router — improved Lighthouse performance score from 58 to 94 and enabled SSR for SEO-critical pages, contributing to 34% organic traffic increase; designed component library (40+ components in Storybook) adopted across 3 product teams",
    what_changed: "Team size (4 engineers), specific migration (CRA → Next.js App Router), Lighthouse score improvement (58→94), business impact (34% organic traffic), component library scope (40+ components, 3 product teams).",
  },
];

const SKILLS_SECTION = {
  note: "Frontend/React skills sections should be organized by layer — core language, framework/library, tooling, and testing. Don't list React at the top and then 50 unrelated tools.",
  tiers: [
    { label: "Core Languages", example: "TypeScript (expert), JavaScript (ES2023, expert), HTML5, CSS3 (advanced)" },
    { label: "React Ecosystem", example: "React 18, Next.js 14 (App Router), React Query (TanStack), Redux Toolkit, Zustand, React Router" },
    { label: "Styling & UI", example: "Tailwind CSS, CSS Modules, Styled Components, Radix UI, Shadcn/ui, Storybook" },
    { label: "Build & Tooling", example: "Vite, Webpack, Turbopack, ESLint, Prettier, Husky, pnpm/npm" },
    { label: "Testing", example: "Vitest, Jest, React Testing Library, Cypress, Playwright" },
    { label: "APIs & Data", example: "REST, GraphQL, tRPC, React Query, SWR, Axios" },
    { label: "Infrastructure", example: "Vercel, AWS (S3, CloudFront), Docker, GitHub Actions, CI/CD" },
  ],
};

const FAQS = [
  { question: "Should you list React version on your resume?", answer: "Mention React 18 if you've used hooks, Suspense, concurrent features, or the new App Router in Next.js — these are meaningful signals for companies that care about being on current React. For older versions: listing 'React 16' signals you're working in legacy codebases, which isn't inherently bad but is a data point. Generally, don't list 'React 17' or 'React 16.8' — just 'React' unless the version context is meaningful. For Next.js: specifying 'Next.js 14 (App Router)' vs. 'Next.js (Pages Router)' is meaningful because the architecture differs significantly." },
  { question: "How do you show React experience if most of your work was internal tools?", answer: "Internal tools are valid React engineering — the complexity of internal dashboards, admin panels, data visualization tools, and productivity software often exceeds that of public-facing sites. The key is describing the scale of the users and the engineering challenge: 'Built internal reporting dashboard used by 200-person finance team daily' is strong. 'Built internal tools' is weak. Describe user count, the data complexity, the real-time requirements, or the performance constraints that made it challenging engineering regardless of whether it's public-facing." },
  { question: "Is React still worth specializing in for 2025?", answer: "Yes — React remains the most widely deployed frontend framework for product companies, with a massive ecosystem and the largest developer community. Next.js (built on React) is the dominant full-stack framework for new web applications. The React ecosystem is actively innovating: React 18 concurrent features, Next.js App Router, React Server Components, and continued ecosystem growth in areas like state management, animation, and testing. Specializing in React in 2025 means specializing in a framework that's used at millions of companies, has strong job demand, and continues to evolve — that's a sound career bet." },
];

export default async function ReactDeveloperResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="React Developer Resume — Examples & ATS Keywords (2025)"
        description="React resumes that get callbacks show application complexity, performance impact, and ecosystem depth. Before/after examples for junior, mid, and senior React engineers."
        url={`${BASE_URL}/blog/react-developer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "React Developer Resume", url: `${BASE_URL}/blog/react-developer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Frontend Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">React Developer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            &ldquo;Built UI components in React&rdquo; describes tutorial work. Hiring managers want application complexity, performance impact numbers, and state management depth. Before/after for every level.
          </p>
        </div>
      </section>

      {/* React market stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={43} suffix="%" label="Of all frontend job openings mention React as a requirement" accent="#0D7182" />
            <StatCard value={2} suffix="M+" label="React developers worldwide — the largest frontend community" accent="#7C3AED" />
            <StatCard value={58} suffix="%" label="Of React resumes miss performance metrics — a major signal gap" accent="#DC2626" />
            <StatCard value={94} label="Lighthouse score threshold that top React engineers demonstrate on resumes" accent="#059669" />
          </div>
        </div>
      </section>

      {/* What they scan */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What React hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {WHAT_HIRING_MANAGERS_SCAN.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.keywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-[var(--brand)]/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--brand)]">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/after */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after: React resume bullets</h2>
          <div className="mt-6 space-y-5">
            {BULLET_TRANSFORMATIONS.map((ex) => (
              <div key={ex.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{ex.level}</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="rounded-xl bg-red-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{ex.before}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">After</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{ex.after}</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg)] p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">What changed</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{ex.what_changed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">React skills section structure</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">{SKILLS_SECTION.note}</p>
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
            {SKILLS_SECTION.tiers.map((tier) => (
              <div key={tier.label} className="border-b border-[var(--border)] last:border-0 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">{tier.label}</p>
                <p className="font-mono text-[12px] text-[var(--ink)]">{tier.example}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your React resume for each role&apos;s specific stack.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes the job description, identifies the React ecosystem signals the team is looking for, and rewrites your bullets — with ATS keyword validation and performance metric framing. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
