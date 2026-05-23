import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Python Developer Resume — Examples & ATS Keywords (2025)",
  description:
    "Python developer resumes fail ATS not because of missing skills — but because of how those skills are presented. Backend engineers list Python as a language; hiring managers want to see what you built with it. Framework depth, system scale, and before/after examples for junior, mid-level, and senior Python roles.",
  keywords: ["python developer resume", "python resume", "python developer resume examples", "python software engineer resume", "backend developer resume", "django resume", "fastapi resume", "python ATS keywords 2025"],
  alternates: { canonical: "/blog/python-developer-resume" },
  openGraph: {
    title: "Python Developer Resume — Examples & ATS Keywords (2025)",
    description: "Python resumes that pass ATS show what you built, at what scale, with which frameworks. Before/after examples for junior, mid-level, and senior Python engineer roles.",
    url: "/blog/python-developer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_LOOK_FOR = [
  {
    signal: "Framework depth — not just 'Python'",
    detail: "Listing 'Python' as a skill tells a hiring manager nothing about your real capability. Python spans web development (Django, FastAPI, Flask), data engineering (PySpark, pandas, SQLAlchemy), ML/AI pipelines (PyTorch, TensorFlow, scikit-learn), scripting, and systems automation. Specify the frameworks you're expert in — 'Python, Django, FastAPI, SQLAlchemy' is 10x more signal than 'Python' alone.",
    ats_keywords: ["Django", "FastAPI", "Flask", "SQLAlchemy", "Celery", "Pydantic", "aiohttp", "asyncio"],
  },
  {
    signal: "System scale and ownership",
    detail: "Senior Python engineers own systems — they don't just write functions. Hiring managers scan for system ownership indicators: 'designed the API,' 'led migration from,' 'reduced latency by X%,' 'serves N requests/day.' Scope words (designed, led, architected, owned end-to-end) distinguish engineers who build from engineers who contribute.",
    ats_keywords: ["REST API", "microservices", "event-driven", "distributed systems", "high availability", "scalability", "latency optimization"],
  },
  {
    signal: "Infrastructure and deployment context",
    detail: "Modern Python engineering is inseparable from cloud deployment, CI/CD, and containerization. Hiring managers at companies deploying Python at scale want to see: AWS/GCP/Azure, Docker, Kubernetes, CI/CD pipeline ownership, and infrastructure-as-code exposure. Python developers who can't deploy their own code are less valuable than full-stack deployment engineers.",
    ats_keywords: ["AWS Lambda", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Terraform", "GCP Cloud Run", "ECS"],
  },
  {
    signal: "Testing and code quality discipline",
    detail: "Production Python engineers write tests. Hiring managers look for: pytest, coverage metrics, TDD experience, and code review participation. Candidates who don't surface testing signal they're writing scripts that work on their machine, not production code that ships with confidence.",
    ats_keywords: ["pytest", "unittest", "TDD", "code review", "type hints", "mypy", "black", "linting", "pre-commit"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Python Developer",
    before: "Built backend APIs using Python and Django for a customer portal",
    after: "Built 12 REST API endpoints in Django REST Framework for a customer self-service portal handling 2,000+ daily active users — reduced support ticket volume by 23% by enabling self-service account management",
    what_changed: "Added quantified user impact (2,000+ DAU, 23% ticket reduction), specified the framework (DRF not just Django), named the product purpose (customer self-service portal). The before-version could describe a weekend project; the after describes shipped production work.",
  },
  {
    level: "Mid-Level Python Engineer",
    before: "Worked on data pipeline using Python, Spark, and Airflow",
    after: "Redesigned batch ETL pipeline from monolithic Spark jobs to Airflow DAGs — reduced daily data processing time from 6 hours to 47 minutes for 800GB nightly load, enabling analytics team to run same-day reporting for the first time",
    what_changed: "Added before/after performance numbers (6 hours → 47 minutes), quantified data volume (800GB), named the downstream business impact (same-day reporting). The word 'worked on' became 'redesigned' — ownership vs. participation.",
  },
  {
    level: "Senior Python Engineer / Tech Lead",
    before: "Led backend team and improved system performance",
    after: "Led 4-engineer backend team through migration from synchronous Django views to async FastAPI — reduced P95 API latency from 840ms to 120ms across 15M daily requests; designed schema versioning strategy that eliminated breaking changes during 3-month rollout",
    what_changed: "Team size (4 engineers), specific technical migration (sync Django → async FastAPI), before/after latency metrics (840ms → 120ms), scale (15M daily requests), strategic contribution (schema versioning strategy).",
  },
];

const SKILLS_SECTION_STRUCTURE = {
  intro: "Python developer skills sections fail in two ways: either a wall of buzzwords with no context, or a one-line 'Python, SQL, AWS' that tells hiring managers nothing. The strongest structure is tiered by proficiency.",
  tiers: [
    {
      label: "Languages",
      example: "Python (expert), SQL (advanced), TypeScript (proficient), Bash (working knowledge)",
    },
    {
      label: "Frameworks & Libraries",
      example: "FastAPI, Django REST Framework, SQLAlchemy, Pydantic, Celery, pytest, pandas, NumPy",
    },
    {
      label: "Infrastructure & Cloud",
      example: "AWS (Lambda, ECS, RDS, S3), Docker, Kubernetes, Terraform, GitHub Actions",
    },
    {
      label: "Databases",
      example: "PostgreSQL, Redis, MongoDB, Elasticsearch",
    },
  ],
};

const BY_SPECIALIZATION = [
  {
    track: "Backend / API Engineering",
    top_frameworks: "FastAPI, Django REST Framework, Flask",
    key_keywords: ["REST API", "GraphQL", "JWT authentication", "OAuth2", "rate limiting", "API versioning", "OpenAPI/Swagger", "Pydantic validation"],
    differentiation: "Show system scale (requests/day, concurrent users, uptime %) and latency impact. Backend hiring managers care about throughput, reliability, and observability — mention Prometheus, Grafana, or DataDog if you've instrumented production systems.",
  },
  {
    track: "Data Engineering",
    top_frameworks: "Apache Spark (PySpark), Apache Airflow, dbt, pandas",
    key_keywords: ["ETL pipeline", "data lake", "data warehouse", "orchestration", "Snowflake", "BigQuery", "Redshift", "streaming", "Kafka"],
    differentiation: "Quantify data volumes (GB/TB processed per day) and pipeline reliability (uptime, SLA adherence). Data engineering roles value pipeline ownership — show you designed the architecture, not just wrote the transforms.",
  },
  {
    track: "ML / AI Engineering",
    top_frameworks: "PyTorch, scikit-learn, Hugging Face Transformers, MLflow, LangChain",
    key_keywords: ["model training", "inference optimization", "feature engineering", "model deployment", "A/B testing", "MLOps", "vector embeddings", "RAG"],
    differentiation: "Show both training and deployment. ML resumes that list training without deployment signal academic rather than production experience. Quantify model impact: 'improved model precision from 71% to 88%' or 'reduced inference latency to under 50ms for real-time scoring.'",
  },
];

const FAQS = [
  { question: "Should you list Python version experience on your resume?", answer: "Generally no — listing 'Python 3.9' or 'Python 3.11' adds no meaningful signal unless the role specifically requires a particular version (rare). What matters is which Python ecosystem you know: web frameworks, data tools, ML libraries, or systems scripting. Your framework and library list already signals your Python depth; version numbers are noise." },
  { question: "How do you show Python experience without a traditional software engineering background?", answer: "Python is used across roles that aren't formally 'software engineering': data analysts who write production ETL scripts, ML researchers who build training pipelines, DevOps engineers who automate infrastructure, and scientists who build computational tools. If your Python experience came from a non-engineering role, still list the impact: 'Built Python automation reducing manual reporting from 4 hours to 8 minutes' is strong regardless of your title. The key is showing that your Python produced measurable output." },
  { question: "What's the difference between a Python developer resume and a software engineer resume?", answer: "For most companies, there isn't one — 'Python developer' and 'software engineer (Python)' describe the same role. The difference is in specialization: a pure Python developer resume emphasizes Python-specific frameworks and ecosystem tools; a general software engineer resume using Python would also show comfort with other languages, system design, and cross-functional engineering skills. If you're applying to Python-specific roles (e.g., a Django shop, or a Python-first ML platform), lean into the ecosystem depth. If you're applying to general engineering roles at companies that happen to use Python, don't over-index on Python to the exclusion of general engineering signals." },
];

export default async function PythonDeveloperResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Python Developer Resume — Examples & ATS Keywords (2025)"
        description="Python resumes that pass ATS show what you built, at what scale, with which frameworks. Before/after examples for junior, mid-level, and senior Python engineer roles."
        url={`${BASE_URL}/blog/python-developer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Python Developer Resume", url: `${BASE_URL}/blog/python-developer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Python Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Python Developer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Listing &ldquo;Python&rdquo; as a skill is table stakes. Hiring managers want to see what you built with it, at what scale, and with which frameworks. Before/after examples for every level.
          </p>
        </div>
      </section>

      {/* What hiring managers look for */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Python hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {WHAT_HIRING_MANAGERS_LOOK_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.ats_keywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-[var(--brand)]/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-[#4361EE]">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after: Python resume bullets</h2>
          <div className="mt-6 space-y-5">
            {BULLET_TRANSFORMATIONS.map((ex) => (
              <div key={ex.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="font-bold text-[11px] uppercase tracking-wider text-[var(--muted)]">{ex.level}</p>
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

      {/* Skills section structure */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Skills section structure</h2>
          <p className="mt-3 text-[13.5px] text-[var(--muted)]">{SKILLS_SECTION_STRUCTURE.intro}</p>
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
            {SKILLS_SECTION_STRUCTURE.tiers.map((tier) => (
              <div key={tier.label} className="border-b border-[var(--border)] last:border-0 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">{tier.label}</p>
                <p className="font-mono text-[12.5px] text-[var(--ink)]">{tier.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By specialization */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">By Python specialization</h2>
          <div className="mt-6 space-y-4">
            {BY_SPECIALIZATION.map((spec) => (
              <div key={spec.track} className="rounded-2xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)] text-[16px]">{spec.track}</p>
                <p className="mt-1 text-[12px] text-[#4361EE] font-medium">Top frameworks: {spec.top_frameworks}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {spec.key_keywords.map((kw) => (
                    <span key={kw} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]">{kw}</span>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-[var(--bg)] p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-1">How to differentiate</p>
                  <p className="text-[12.5px] leading-5 text-[var(--muted)]">{spec.differentiation}</p>
                </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your Python developer resume for each role you apply to.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes the job description, identifies the specific Python frameworks and scale signals the hiring team is looking for, and rewrites your bullets to match — with ATS keyword validation and formatting checks. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
