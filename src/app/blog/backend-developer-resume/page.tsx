import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Backend Developer Resume — Examples, Skills & ATS Keywords (2025)",
  description:
    "Backend developer resumes that get callbacks show system scale, API design decisions, and database ownership — not just a stack list. Before/after examples for junior, mid, and senior levels with ATS keyword breakdown.",
  keywords: ["backend developer resume", "backend engineer resume", "backend resume examples", "backend developer resume 2025", "REST API resume", "backend developer skills", "server side developer resume"],
  alternates: { canonical: "/blog/backend-developer-resume" },
  openGraph: {
    title: "Backend Developer Resume — Examples, Skills & ATS Keywords (2025)",
    description: "Backend resumes that get callbacks show system scale, API decisions, and database ownership — not just a stack list.",
    url: "/blog/backend-developer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_SIGNALS = [
  { signal: "System scale and throughput", detail: "Hiring managers look for numbers that show the backend you built or maintained was real: requests per second, daily active users, data volume processed, SLA uptime. 'Built REST APIs' could describe a to-do app or a system serving 10M users. The scale context changes everything — 'Designed and maintained REST API handling 80K RPM with 99.97% uptime' is a completely different signal." },
  { signal: "API design ownership, not just implementation", detail: "Backend engineers who implement specs given by others read as mid-level at best. Engineers who designed the API contract — chose between REST, GraphQL, or gRPC with articulated reasoning, versioned the API, designed the error model, wrote the spec — read as senior. If you made design decisions, show them: 'Designed GraphQL schema for product catalog API, reducing over-fetching by 60% vs prior REST implementation.'" },
  { signal: "Database and storage decisions", detail: "The specific database choices you made and why are a senior signal: 'Chose PostgreSQL over MongoDB for transactional inventory system — ACID compliance requirement drove the decision' shows you understand trade-offs. Candidates who just list the databases they've used blend in. Candidates who show why they chose one and what the constraint was stand out." },
  { signal: "Reliability and observability engineering", detail: "Production backend systems require monitoring, alerting, error handling, and graceful degradation. Resume bullets that mention SLOs, error budgets, distributed tracing, or on-call contributions signal someone who has operated systems under real load — not just built greenfield features." },
];

const BEFORE_AFTER = [
  {
    level: "Junior Backend Developer",
    before: { bullet: "Worked on backend APIs using Node.js and Express for a web application", problems: ["'Worked on' — no ownership signal", "No scale or users mentioned", "Express is table stakes — what was interesting about the API?"] },
    after: { bullet: "Built and shipped REST API (Node.js, Express, PostgreSQL) powering a B2B dashboard serving 2K daily active users — 15 endpoints, JWT authentication, role-based access control, 99.9% uptime tracked via Datadog", improvements: ["Concrete scope (15 endpoints, specific auth)", "Users served (2K DAU)", "Observability named (Datadog) — shows production mindset"] },
  },
  {
    level: "Mid-Level Backend Engineer",
    before: { bullet: "Improved backend performance and helped migrate services to microservices architecture", problems: ["'Improved performance' — by how much?", "'Helped migrate' — what specifically was your contribution?", "Microservices without context is meaningless"] },
    after: { bullet: "Led decomposition of monolithic order service into 3 microservices (Node.js, RabbitMQ, PostgreSQL) — reduced P99 latency from 1.8s to 240ms; new event-driven architecture enabling independent deploys for 6 teams", improvements: ["Ownership clear ('led decomposition')", "Concrete latency improvement (1.8s → 240ms)", "Business impact: 6 teams now deploy independently"] },
  },
  {
    level: "Senior Backend Engineer",
    before: { bullet: "Architected backend systems and mentored junior engineers on best practices", problems: ["'Architected systems' — which systems? What constraints?", "'Mentored on best practices' — what changed as a result?", "Zero quantification anywhere"] },
    after: { bullet: "Designed event-sourced payment processing system (Java, Kafka, PostgreSQL) handling $180M/month in transactions — 99.999% availability, sub-50ms P99; established engineering standards adopted by 3 teams and reduced production incidents 42% YoY", improvements: ["Domain named (payments, financial scale)", "Reliability SLA quantified (99.999%)", "Engineering influence: 3 teams, measurable incident reduction"] },
  },
];

const SKILLS_TIERS = [
  { tier: "Languages", keywords: ["Node.js", "Python", "Java", "Go", "Rust", "Ruby", "PHP", "C#", ".NET"] },
  { tier: "Frameworks & APIs", keywords: ["Express", "FastAPI", "Django", "Spring Boot", "Rails", "Gin", "gRPC", "GraphQL", "REST", "OpenAPI"] },
  { tier: "Databases", keywords: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra", "DynamoDB", "Elasticsearch", "ClickHouse"] },
  { tier: "Messaging & Streaming", keywords: ["Kafka", "RabbitMQ", "SQS", "Pub/Sub", "Kinesis", "NATS"] },
  { tier: "Infrastructure & Cloud", keywords: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "Nginx"] },
  { tier: "Observability", keywords: ["Datadog", "Prometheus", "Grafana", "OpenTelemetry", "Sentry", "PagerDuty", "distributed tracing"] },
];

const FAQS = [
  { question: "Should a backend developer resume list every language and framework they've used?", answer: "No — list the tools you can discuss deeply in an interview. A long skills section with 25 technologies signals that you know none of them well. Lead with your primary stack (2-3 languages, your main framework, your main database) and add secondary tools below. If you list GraphQL, be ready to explain schema design, N+1 problems, and when you'd choose it over REST. If you can't defend a tool in an interview, remove it from your resume." },
  { question: "How important is system design on a backend resume vs. a backend interview?", answer: "Your resume needs to demonstrate that you've made system design decisions — which signals you'll be worth interviewing for system design depth. You don't describe a full architecture on a resume; you write bullets that prove you thought about scale, trade-offs, and reliability: 'chose Redis for session caching over database-backed sessions to avoid read amplification at 50K concurrent users' is a system design signal in resume form. The interview then probes for depth." },
  { question: "How do I show security awareness on a backend resume without making it the focus?", answer: "Embed security signals in feature bullets: 'JWT authentication with refresh token rotation,' 'rate-limited at the API gateway layer (1K req/min per IP),' 'parameterized queries throughout the data access layer (zero SQL injection surface).' Security context in the right place signals a production-grade engineer, not a security specialist. Don't list 'OWASP Top 10' as a skill — show it in how you describe what you built." },
];

export default async function BackendDeveloperResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Backend Developer Resume — Examples, Skills & ATS Keywords (2025)"
        description="Backend resumes that get callbacks show system scale, API decisions, and database ownership — not just a stack list."
        url={`${BASE_URL}/blog/backend-developer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Backend Developer Resume", url: `${BASE_URL}/blog/backend-developer-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Backend Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Backend Developer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            System scale, API ownership, and database decisions — what backend hiring managers scan for, with before/after bullets at every level.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={4} label="Hiring signals backend managers scan for in the first 10 seconds" accent="#0D7182" />
            <StatCard value={62} suffix="%" label="Of backend resumes lack any scale indicators — the first screen-out" accent="#DC2626" />
            <StatCard value={6} label="ATS skill tiers to structure your backend skills section" accent="#7C3AED" />
            <StatCard value={3} suffix="x" label="Higher callback rate when API and database design decisions are named" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What backend hiring managers scan for</h2>
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

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after resume bullets — junior, mid, and senior</h2>
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords for backend developer roles — by tier</h2>
          <div className="mt-6 space-y-3">
            {SKILLS_TIERS.map((tier) => (
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
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your backend resume rewritten by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and a job description — Zari rewrites your bullets to show scale, API ownership, and database decisions, and surfaces the keywords your target companies scan for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
