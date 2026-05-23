import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Full Stack Developer Resume — Examples & ATS Tips (2025)",
  description:
    "Full stack developer resumes need to prove you can own a feature end-to-end — not just list frontend and backend technologies. What hiring managers look for, ATS keywords, and before/after examples for junior through senior full stack engineers.",
  keywords: ["full stack developer resume", "full stack resume", "full stack developer resume examples", "full stack engineer resume", "full stack resume template 2025", "full stack ATS keywords", "MERN stack resume", "MEAN stack resume", "full stack developer resume 2025"],
  alternates: { canonical: "/blog/full-stack-developer-resume" },
  openGraph: {
    title: "Full Stack Developer Resume — Examples & ATS Tips (2025)",
    description: "Full stack resumes need to show end-to-end feature ownership, not just a list of technologies. Before/after examples for every level.",
    url: "/blog/full-stack-developer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_SCAN = [
  {
    signal: "End-to-end ownership evidence",
    detail: "The value proposition of a full stack developer is feature ownership across the entire delivery chain — from database schema to API design to UI implementation to deployment. Hiring managers look for evidence you've actually done this, not just that you know both React and Node.js. 'Built the customer dashboard from schema design to production deployment' is exactly the framing they want. 'Worked on frontend and backend' is not.",
    keywords: ["end-to-end", "full ownership", "feature delivery", "schema design", "REST API", "UI implementation", "deployment", "CI/CD", "product feature"],
  },
  {
    signal: "Stack depth vs stack breadth",
    detail: "Full stack developers face a specific resume challenge: their skills breadth reads as shallow if not framed carefully. The fix is to show depth in at least two areas (e.g., advanced React patterns + PostgreSQL query optimization) while acknowledging breadth. Hiring managers want someone who doesn't block a feature at any layer — but they also don't want someone who's a tourist in every layer. Show the areas where you're genuinely strong.",
    keywords: ["React", "Next.js", "Node.js", "Express", "TypeScript", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS"],
  },
  {
    signal: "Product impact metrics",
    detail: "Full stack developers often have clearer impact metrics than specialists because they own the whole feature. A backend engineer optimized a query; a full stack developer built the feature that increased checkout completion by 18%. The full stack frame makes business outcomes more directly attributable. Use this advantage: tie your technical work to user metrics, conversion rates, load times, or revenue impact.",
    keywords: ["conversion rate", "user engagement", "load time", "revenue impact", "A/B test", "feature adoption", "retention", "DAU", "page performance"],
  },
  {
    signal: "Architecture decision awareness",
    detail: "At mid-to-senior level, full stack engineers are expected to make architecture decisions across the stack — choosing between REST and GraphQL, deciding on caching strategy, designing the database schema, selecting state management approach. Listing these decisions and your reasoning signals the engineering seniority that separates a full stack developer who implements from one who designs.",
    keywords: ["GraphQL", "REST", "tRPC", "state management", "caching", "CDN", "SSR", "SSG", "database design", "API design"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Full Stack Developer",
    before: "Built features for a web application using React and Node.js",
    after: "Built 4 end-to-end product features for a B2B SaaS platform (React 18 frontend, Node.js/Express API, PostgreSQL) — implemented user permission system supporting 3 role tiers, reducing support tickets about access issues by 60%; each feature owned from schema design through API implementation to React UI and deployment to AWS",
    what_changed: "Named the stack specifically (React 18, Node.js/Express, PostgreSQL), showed end-to-end ownership explicitly, named what was built (user permission system), quantified the outcome (60% support ticket reduction), and described the AWS deployment.",
  },
  {
    level: "Mid-Level Full Stack Engineer",
    before: "Developed multiple features for e-commerce platform and improved performance",
    after: "Led development of checkout redesign across full stack — Next.js App Router frontend with Stripe integration, Node.js payment service, PostgreSQL transaction schema; improved checkout completion rate from 61% to 74% (contributing to $840K additional annual revenue); reduced Time to First Byte from 2.1s to 380ms by migrating to SSR and adding edge caching via Cloudflare",
    what_changed: "Named the specific feature (checkout redesign), showed full ownership across frontend (Next.js) + backend (Node.js) + data (PostgreSQL), tied technical work to revenue ($840K), added TTFB performance improvement with architecture reasoning (SSR + edge caching).",
  },
  {
    level: "Senior Full Stack Engineer / Lead",
    before: "Led full stack development and mentored junior developers",
    after: "Architected and led development of real-time collaboration feature (WebSocket backend, React optimistic UI, Yjs CRDT conflict resolution) — reduced perceived latency from 400ms to <50ms; designed the event sourcing schema supporting audit log compliance for enterprise tier; grew feature from 0 to 12,000 daily active users in 6 months; mentored 3 engineers through their first production deployments",
    what_changed: "Named the specific architectural challenge (real-time collaboration, CRDTs), showed the technical depth across layers (WebSocket, React optimistic UI, Yjs), quantified latency improvement, noted compliance context (audit log for enterprise), and showed growth (0→12K DAU) with mentorship specifics (3 engineers, first production deployments).",
  },
];

const STACK_EXAMPLES = [
  {
    name: "MERN Stack",
    stack: "MongoDB + Express + React + Node.js",
    keywords: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "REST API", "JWT", "AWS/Heroku"],
    tip: "Common in startups and mid-size companies. Emphasize document schema design, aggregation pipelines if relevant, and any Redis caching layer.",
  },
  {
    name: "Next.js + PostgreSQL",
    stack: "Next.js (App Router) + tRPC/REST + PostgreSQL + Prisma",
    keywords: ["Next.js", "React Server Components", "Prisma", "PostgreSQL", "tRPC", "Vercel", "TypeScript"],
    tip: "The modern full stack choice. Emphasize App Router understanding (Server vs Client components), Prisma migration strategy, and whether you used SSR/SSG/ISR and why.",
  },
  {
    name: "Django + React",
    stack: "Django REST Framework + React + PostgreSQL",
    keywords: ["Django", "DRF", "React", "PostgreSQL", "Celery", "Redis", "Docker", "Python"],
    tip: "Common in data-adjacent full stack roles and European companies. Emphasize Django ORM optimization (select_related, prefetch_related) and any Celery background task design.",
  },
  {
    name: "Spring Boot + React",
    stack: "Spring Boot + React + PostgreSQL/MySQL",
    keywords: ["Spring Boot", "Java", "React", "JPA", "Hibernate", "JWT", "Docker", "AWS"],
    tip: "Dominant in enterprise and financial services full stack. Emphasize Spring Security configuration and the API contract management approach between teams.",
  },
];

const FAQS = [
  { question: "Should I call myself a full stack developer or specialize?", answer: "This depends on what roles you're targeting and where your genuine strengths are. 'Full stack developer' is a real and in-demand role — especially at startups, scale-ups, and small product teams where feature ownership across layers is valued. At FAANG and large tech companies, engineering roles are typically more specialized, and calling yourself full stack can read as not being expert enough in either layer. For most product companies under 500 people, full stack is a competitive advantage. For FAANG or specialized senior roles, lead with your stronger side (frontend or backend) and mention full stack experience as context." },
  { question: "How do you list both frontend and backend skills without looking shallow?", answer: "Structure your skills section with clear categories (Frontend, Backend, Data, Infrastructure) so the depth in each area is visible rather than blended. In your bullets, show actual depth: don't just say you know React — show that you implemented React Query's cache invalidation strategy, or migrated from Redux to Zustand and why. Depth signals in individual bullets matter more than the breadth of your skills list. One strong example of deep knowledge in each layer is worth more than listing every framework you've touched." },
  { question: "What's the difference between a full stack developer resume and a software engineer resume?", answer: "A software engineer resume can cover any part of the stack. A full stack developer resume specifically emphasizes cross-layer feature ownership — the ability to take a feature from product concept to database schema to API to UI to deployment without blockers. The key framing difference: full stack bullets should explicitly show the chain of ownership ('designed schema → built API → built UI → deployed'), while software engineer bullets can focus on depth in one area. If you're full stack, use that framing — it's a selling point for the right roles." },
];

export default async function FullStackDeveloperResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Full Stack Developer Resume — Examples & ATS Tips (2025)"
        description="Full stack resumes need to show end-to-end feature ownership, not just a list of technologies. Before/after examples for every level."
        url={`${BASE_URL}/blog/full-stack-developer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Full Stack Developer Resume", url: `${BASE_URL}/blog/full-stack-developer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Full Stack Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Full Stack Developer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Listing React and Node.js doesn&apos;t prove you can own a feature. Full stack resumes need end-to-end ownership evidence, product impact metrics, and architecture decisions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={38} suffix="%" label="Of all developer job postings seek full stack or cross-layer skills" accent="#0D7182" />
            <StatCard value={12} suffix="%" label="Higher base salary for full stack vs pure frontend at startups" accent="#059669" />
            <StatCard value={4} label="Common full stack combinations covered in this guide (MERN, Next.js, Django, Spring)" accent="#7C3AED" />
            <StatCard value={74} suffix="%" label="Of full stack resumes fail to show end-to-end feature ownership" accent="#DC2626" />
          </div>
        </div>
      </section>

      {/* What they scan */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What full stack hiring managers actually look for</h2>
          <div className="mt-6 space-y-4">
            {WHAT_HIRING_MANAGERS_SCAN.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.keywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-[var(--brand)]/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-[#4361EE]">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/after */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after: full stack resume bullets</h2>
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
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-1">What changed</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{ex.what_changed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack-specific keywords */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords by stack</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">Match your exact stack terminology to the job description. &apos;Node.js&apos; and &apos;NodeJS&apos; may parse differently.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {STACK_EXAMPLES.map((s) => (
              <div key={s.name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{s.name}</p>
                <p className="text-[12px] text-[var(--muted)] mb-3">{s.stack}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {s.keywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-[var(--brand)]/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-[#4361EE]">{kw}</span>
                  ))}
                </div>
                <p className="text-[12px] leading-5 text-[var(--muted)]"><span className="font-bold text-[var(--ink)]">Tip: </span>{s.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your full stack resume for each role&apos;s specific requirements.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste the job description and Zari identifies the stack-specific keywords, rewrites your bullets to show end-to-end ownership, and validates ATS compatibility.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
