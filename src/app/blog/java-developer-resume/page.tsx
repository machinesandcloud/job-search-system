import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Java Developer Resume — Examples & ATS Keywords (2025)",
  description:
    "Java developer resumes that get interviews show system scale, framework depth, and architecture decisions — not just 'experience with Java.' Before/after examples for junior, mid-level, and senior Java engineers across backend, enterprise, and distributed systems.",
  keywords: ["java developer resume", "java resume", "java developer resume examples", "java engineer resume", "java resume template 2025", "java ATS keywords", "spring boot resume", "java backend developer resume"],
  alternates: { canonical: "/blog/java-developer-resume" },
  openGraph: {
    title: "Java Developer Resume — Examples & ATS Keywords (2025)",
    description: "Java resumes that get interviews show system scale and architecture decisions. Before/after examples for junior, mid, and senior Java engineers.",
    url: "/blog/java-developer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_SCAN = [
  {
    signal: "Backend system scale and throughput",
    detail: "Java is the dominant language for high-throughput, concurrent enterprise systems. Hiring managers for Java roles specifically look for scale signals: requests per second, concurrent users, data volume processed, uptime requirements. 'Built REST APIs in Spring Boot' is meaningless without scale context. '350K API requests/day with p99 latency under 80ms' is memorable. The JVM's concurrency model makes scale directly relevant — show it.",
    keywords: ["Spring Boot", "Spring Framework", "microservices", "REST", "gRPC", "high throughput", "concurrent", "distributed", "JVM", "multithreading"],
  },
  {
    signal: "Framework depth — Spring ecosystem fluency",
    detail: "Spring Boot is the de facto Java web framework at most product companies. But framework depth matters more than listing it: Spring Security (OAuth2, JWT), Spring Data (JPA, repositories), Spring Cloud (service discovery, circuit breakers), Spring Batch (ETL, job scheduling), Spring WebFlux (reactive). Listing Spring Boot once says you've used it. Listing the specific modules you've configured and why reveals expertise that separates seniors from juniors.",
    keywords: ["Spring Boot", "Spring Security", "Spring Data JPA", "Spring Cloud", "Spring Batch", "Spring WebFlux", "Hibernate", "Jackson", "Maven", "Gradle"],
  },
  {
    signal: "Architecture and design pattern decisions",
    detail: "Java backend roles, especially at senior level, involve architectural decisions that don't exist at the same scale in other ecosystems: designing for thread-safety, choosing between synchronous and reactive programming models, database connection pool tuning, Kafka consumer group design, or migrating from monolith to microservices. Naming these decisions — and the reasoning — signals engineering seniority that task descriptions cannot.",
    keywords: ["microservices", "event-driven", "CQRS", "hexagonal architecture", "domain-driven design", "Kafka", "RabbitMQ", "circuit breaker", "service mesh", "API gateway"],
  },
  {
    signal: "Testing discipline and code quality rigor",
    detail: "Java enterprise environments have mature testing culture. Hiring managers expect JUnit 5 and Mockito, integration testing with Testcontainers, contract testing awareness for microservices, and code quality gates (SonarQube, Checkstyle). Senior Java roles specifically ask about test coverage targets and what your team does about flaky tests. This is an easy signal to add that most resumes miss.",
    keywords: ["JUnit 5", "Mockito", "Testcontainers", "integration testing", "SonarQube", "code coverage", "TDD", "contract testing", "Pact", "Spring Boot Test"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Java Developer",
    before: "Built REST APIs using Spring Boot for a web application",
    after: "Built 8 REST API endpoints using Spring Boot 3 and Spring Security (JWT authentication) for an e-commerce order management system serving 15,000 monthly active users — wrote JUnit 5 integration tests achieving 82% coverage; reduced average API response time from 320ms to 95ms by fixing N+1 query issues with JPA fetch join optimization",
    what_changed: "Specifics on Spring version and modules used, concrete user scale (15,000 MAU), testing discipline (JUnit 5, 82% coverage), and a performance fix with before/after numbers. Eliminated the vague 'web application.'",
  },
  {
    level: "Mid-Level Java Engineer",
    before: "Worked on microservices architecture and improved system performance",
    after: "Decomposed a 180K-line Spring monolith into 7 independently deployable microservices (Spring Boot, Kafka event bus) — reduced average deployment time from 45 minutes to 6 minutes and enabled team of 12 to ship independently; designed the inter-service contract testing strategy using Pact, eliminating integration failures that had caused 3 production outages in Q1",
    what_changed: "Codebase scale (180K lines), number of services (7), deployment improvement (45m→6m), team context (12 engineers), and a concrete outcome tied to past production incidents (3 outages eliminated).",
  },
  {
    level: "Senior Java Engineer / Tech Lead",
    before: "Led backend team and designed distributed systems",
    after: "Designed event-sourced order processing system handling 2.3M transactions/day — chose Kafka over RabbitMQ for message replay capability needed for audit compliance; tuned JVM GC settings (G1GC, heap sizing) reducing GC pause times from 800ms to <50ms at P99; mentored 3 mid-level engineers through Spring WebFlux migration, cutting thread pool usage by 60% under load",
    what_changed: "Transaction volume (2.3M/day), explicit architectural decision with reasoning (Kafka vs RabbitMQ, compliance reason), JVM-specific optimization (GC tuning with before/after), mentorship impact (3 engineers), and reactive migration outcome (60% thread reduction).",
  },
];

const SKILLS_SECTION = {
  note: "Java skills sections should distinguish between core language, framework ecosystem, infrastructure, and data layers. Don't bury Spring Boot under 'Frameworks.'",
  tiers: [
    { label: "Core Language", example: "Java 17/21 (records, sealed classes, virtual threads), Java 11/8 (LTS features), Kotlin (production experience)" },
    { label: "Spring Ecosystem", example: "Spring Boot 3, Spring Security (OAuth2/JWT), Spring Data JPA, Spring Cloud (Eureka, Feign, Config), Spring Batch, Spring WebFlux" },
    { label: "Build & Tools", example: "Maven, Gradle, Docker, Kubernetes, Jenkins, GitHub Actions, SonarQube, IntelliJ IDEA" },
    { label: "Data & Messaging", example: "PostgreSQL, MySQL, MongoDB, Redis, Apache Kafka, RabbitMQ, Elasticsearch" },
    { label: "Testing", example: "JUnit 5, Mockito, Testcontainers, Spring Boot Test, Pact (contract testing), WireMock" },
    { label: "Cloud & Infra", example: "AWS (EC2, RDS, SQS, S3, ECS), GCP (Cloud Run, Pub/Sub), Terraform, Helm" },
    { label: "Observability", example: "Prometheus, Grafana, ELK Stack, Jaeger, OpenTelemetry, Micrometer" },
  ],
};

const ENTERPRISE_VS_STARTUP = [
  {
    context: "Enterprise / large company Java",
    signals: ["Complex legacy codebase navigation (Java 8/11 migration experience)", "Compliance and audit requirements (GDPR, SOX, financial systems)", "Large-scale CI/CD with gated deployments", "Cross-team API contract management", "On-call rotation, incident response, SLA adherence"],
    resume_tip: "Name the scale of the organization (enterprise clients, transaction volumes, regulatory context). Enterprise Java hiring managers want evidence you've operated at scale with constraints.",
  },
  {
    context: "Startup / scale-up Java",
    signals: ["Full ownership of services (design, build, deploy, monitor)", "Fast iteration with pragmatic trade-offs", "Java 17/21 features (modern language)", "Cloud-native patterns (containers, serverless, managed DBs)", "Wearing multiple hats (infra, data, backend)"],
    resume_tip: "Emphasize ownership and speed. Startup Java engineers are expected to own the whole stack — mention breadth and the speed at which you've shipped.",
  },
];

const FAQS = [
  { question: "Is Java still worth specializing in for 2025?", answer: "Yes — Java remains one of the highest-demand languages globally, particularly for enterprise backend, financial services, e-commerce, and distributed systems. The Spring Boot ecosystem continues to evolve rapidly (Spring Boot 3, Spring WebFlux, Spring AI), Java 21's virtual threads (Project Loom) are bringing significant concurrency improvements, and the JVM ecosystem's maturity makes it the default choice for high-stakes, high-throughput systems. Java salaries remain competitive with Go and Python at senior levels. Specializing in Java in 2025 means specializing in the language that runs a significant portion of the world's enterprise software." },
  { question: "How do you show Java expertise when you also know Python or Go?", answer: "Lead with Java in your skills section and structure your experience around Java-specific achievements. If your Python or Go work is in a different domain (e.g., Python for data pipelines, Go for CLI tools), list those separately and don't let them dilute your Java narrative. For roles requiring Java specifically, ATS systems are often configured to score Java mentions heavily — your Java experience should appear in your skills section, every relevant bullet, and your professional summary if you have one." },
  { question: "What Java version should I list on my resume?", answer: "List the highest version you're comfortable using in production. Java 17 (LTS) and Java 21 (LTS, virtual threads) are most relevant for 2025. If you've used Java 8 extensively (common in enterprise), mention it but also note any Java 11 or 17 migration experience — companies running Java 8 are actively trying to modernize. Listing 'Java 8' only can signal you're in legacy codebases; pairing it with 'migration to Java 17' shows you're bridging past and present." },
];

export default async function JavaDeveloperResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Java Developer Resume — Examples & ATS Keywords (2025)"
        description="Java resumes that get interviews show system scale and architecture decisions. Before/after examples for junior, mid, and senior Java engineers."
        url={`${BASE_URL}/blog/java-developer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Java Developer Resume", url: `${BASE_URL}/blog/java-developer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Backend Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Java Developer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            &ldquo;Built REST APIs in Spring Boot&rdquo; doesn&apos;t tell hiring managers anything. Java roles reward system scale, Spring ecosystem depth, and architectural decisions. Before/after for every level.
          </p>
        </div>
      </section>

      {/* Java market stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={1} suffix="st" label="Most used language for enterprise backend systems globally" accent="#DC2626" />
            <StatCard value={65} suffix="%" label="Of Fortune 500 backend systems run on Java or JVM languages" accent="#D97706" />
            <StatCard value={17} label="Java LTS version — the production standard for 2025 new projects" accent="#0D7182" />
            <StatCard value={42} suffix="%" label="Of Java job descriptions specifically require Spring Boot expertise" accent="#7C3AED" />
          </div>
        </div>
      </section>

      {/* What they scan */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Java hiring managers scan for</h2>
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after: Java resume bullets</h2>
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

      {/* Skills section */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Java skills section structure</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">{SKILLS_SECTION.note}</p>
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
            {SKILLS_SECTION.tiers.map((tier) => (
              <div key={tier.label} className="border-b border-[var(--border)] last:border-0 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">{tier.label}</p>
                <p className="font-mono text-[12px] text-[var(--ink)]">{tier.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise vs startup */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Framing enterprise vs startup Java experience</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">The signals that matter depend heavily on where you&apos;re applying. Same Java experience, different emphasis.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {ENTERPRISE_VS_STARTUP.map((item) => (
              <div key={item.context} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)] mb-3">{item.context}</p>
                <ul className="space-y-1.5 mb-4">
                  {item.signals.map((s) => (
                    <li key={s} className="flex gap-2 text-[13px] text-[var(--muted)]">
                      <span className="text-[#4361EE] font-bold flex-shrink-0">→</span> {s}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-[var(--brand)]/[0.04] border border-[var(--brand)]/10 p-3">
                  <p className="text-[12px] leading-5 text-[var(--muted)]"><span className="font-bold text-[#4361EE]">Tip: </span>{item.resume_tip}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your Java resume for each role&apos;s specific stack.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes the job description, identifies Spring ecosystem signals the team is looking for, and rewrites your bullets with scale evidence and architecture context. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
