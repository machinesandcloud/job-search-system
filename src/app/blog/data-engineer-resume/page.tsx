import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Data Engineer Resume — Examples, Skills & ATS Keywords (2025)",
  description:
    "Data engineer resumes fail ATS when they list tools without showing what those tools built. Hiring managers scan for pipeline ownership, data volume, and the reliability metrics that separate junior pipeline builders from senior data platform engineers. Before/after examples across the data engineering stack.",
  keywords: ["data engineer resume", "data engineer resume examples", "data engineering resume", "data engineer skills resume", "ETL engineer resume", "data pipeline resume", "spark resume", "airflow resume", "data engineer ATS keywords 2025"],
  alternates: { canonical: "/blog/data-engineer-resume" },
  openGraph: {
    title: "Data Engineer Resume — Examples, Skills & ATS Keywords (2025)",
    description: "Data engineer resumes that pass ATS show pipeline ownership, data volume, and reliability. Before/after examples for junior, mid-level, and senior data engineers.",
    url: "/blog/data-engineer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_SCAN = [
  {
    signal: "Pipeline ownership — designed vs. contributed",
    detail: "The single biggest signal gap in data engineering resumes: 'worked on data pipeline' vs. 'designed and owned the ETL pipeline from ingestion to serving layer.' Hiring managers distinguish architects from contributors within 5 seconds. Use ownership verbs: designed, built, owned, led the migration, replaced, reduced. 'Worked on,' 'helped build,' and 'contributed to' are contributor signals, not ownership signals.",
    ats_terms: ["ETL pipeline", "data pipeline", "orchestration", "ingestion", "data lake", "data warehouse", "data platform", "streaming"],
  },
  {
    signal: "Data volume and throughput",
    detail: "Scale is the primary differentiator in data engineering seniority. A junior DE processes GBs; a senior DE architects for TBs and plans for PBs. Quantify: GB/TB per day processed, number of pipelines owned, number of tables served, records per second for streaming. Hiring managers reading dozens of resumes will remember '2TB nightly batch' and forget 'large dataset processing.'",
    ats_terms: ["terabytes", "petabytes", "high-throughput", "real-time", "batch processing", "streaming ingestion", "CDC"],
  },
  {
    signal: "Reliability and SLA ownership",
    detail: "Production data engineering is about reliability, not just capability. Hiring managers at companies with data-dependent operations (e-commerce, fintech, analytics-driven products) scan for: SLA ownership, uptime percentages, on-call experience, and incident management. A data engineer who built a pipeline is a builder; one who owns 99.9% SLA for 47 downstream tables is a production engineer.",
    ats_terms: ["SLA", "data quality", "monitoring", "alerting", "incident response", "data validation", "great expectations", "dbt tests"],
  },
  {
    signal: "Orchestration and platform toolchain",
    detail: "Modern data engineering is a specific, narrow toolchain. Hiring managers want to see the right stack for their environment. List the full orchestration stack: Airflow, Prefect, or Dagster for orchestration; Spark or Flink for processing; dbt for transformation; Kafka or Kinesis for streaming; Snowflake, BigQuery, or Redshift for warehousing; Delta Lake or Iceberg for table format. The right tools are non-negotiable for most roles.",
    ats_terms: ["Apache Airflow", "dbt", "Apache Spark", "PySpark", "Kafka", "Snowflake", "BigQuery", "Redshift", "Delta Lake", "Apache Iceberg", "Databricks"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Data Engineer",
    before: "Built data pipelines using Airflow and Python to move data from APIs to our data warehouse",
    after: "Built 8 Airflow DAGs ingesting data from 5 third-party APIs (Salesforce, HubSpot, Stripe, Zendesk, Intercom) into Snowflake — processed 40GB daily, enabling marketing team's first unified customer attribution model",
    what_changed: "Quantified pipeline count (8 DAGs), named the source systems (5 APIs), named the destination (Snowflake), quantified volume (40GB daily), named the downstream business impact (unified attribution model). The before version could describe anything; the after shows specific, production engineering.",
  },
  {
    level: "Mid-Level Data Engineer",
    before: "Improved data pipeline reliability and reduced processing time",
    after: "Redesigned nightly batch ETL from single monolithic Spark job to modular Airflow DAG architecture — reduced end-to-end processing time from 11 hours to 2.4 hours for 800GB daily load; implemented great_expectations data quality checks that caught 3 upstream schema breakages before they reached the reporting layer",
    what_changed: "Before/after processing time (11h → 2.4h), quantified data volume (800GB), named the architectural change (monolithic → modular DAG), added quality monitoring detail with concrete impact (3 schema breakages caught). Shows both performance improvement and reliability work.",
  },
  {
    level: "Senior Data Engineer / Tech Lead",
    before: "Led data platform team and built real-time data infrastructure",
    after: "Led 5-engineer data platform team through migration from batch-only Redshift architecture to hybrid Lambda architecture (Kafka + Flink + Delta Lake) — reduced data freshness SLA from T+24h to T+5min for 120 downstream analytics tables; designed schema registry and contract testing framework that reduced cross-team data incidents from 12/month to 1/month",
    what_changed: "Team size (5 engineers), specific architectural migration (batch-only → Lambda architecture), tool stack named (Kafka/Flink/Delta Lake), freshness improvement (T+24h → T+5min), scope (120 downstream tables), reliability impact (12 → 1 incidents/month).",
  },
];

const SKILLS_SECTION = {
  note: "Group data engineering skills by function — not alphabetically. Hiring managers scan for orchestration, processing, and storage tiers as a complete stack signal.",
  tiers: [
    { label: "Orchestration & Workflow", example: "Apache Airflow, Prefect, Dagster" },
    { label: "Processing & Transformation", example: "Apache Spark (PySpark), dbt, pandas, SQL, Apache Flink" },
    { label: "Streaming & Messaging", example: "Apache Kafka, AWS Kinesis, Pub/Sub, Debezium (CDC)" },
    { label: "Storage & Warehousing", example: "Snowflake, BigQuery, Redshift, Delta Lake, Apache Iceberg, S3, GCS" },
    { label: "Cloud & Infrastructure", example: "AWS (Glue, EMR, Lambda, RDS), GCP, Azure Data Factory, Terraform, Docker" },
    { label: "Data Quality & Observability", example: "Great Expectations, Monte Carlo, dbt tests, Prometheus, Grafana" },
    { label: "Languages", example: "Python (expert), SQL (expert), Scala (proficient), Bash" },
  ],
};

const BY_ROLE_TYPE = [
  {
    type: "Analytics / BI-focused DE",
    focus: "Transformation layer, warehouse modeling, dbt, and downstream BI tool integration",
    top_keywords: ["dbt", "dimensional modeling", "star schema", "Looker", "Tableau", "Snowflake", "data mart", "semantic layer"],
    differentiation: "Show the downstream impact on analytics: 'reduced report build time from 4 hours to 8 minutes,' 'enabled self-service analytics for 50-person sales team,' 'reduced time-to-insight from 3 days to same-day.' Analytics DEs are judged by how well they serve their stakeholders.",
  },
  {
    type: "Streaming / Real-time DE",
    focus: "Low-latency ingestion, event processing, Kafka architecture, and stateful stream processing",
    top_keywords: ["Kafka", "Flink", "Kinesis", "event-driven", "exactly-once semantics", "Kafka Streams", "consumer groups", "CDC", "stream processing"],
    differentiation: "Quantify latency and throughput: 'processed 2M events/second at P99 latency under 50ms,' 'built Flink job processing 500K records/hour with exactly-once semantics.' Streaming roles are performance-critical — show you understand the constraints.",
  },
  {
    type: "Platform / Infrastructure DE",
    focus: "Building the infrastructure other DEs run on — Airflow at scale, Databricks platform management, cost optimization",
    top_keywords: ["Databricks", "platform engineering", "infrastructure as code", "cost optimization", "multi-tenant", "developer experience", "CI/CD for data"],
    differentiation: "Show the multiplier effect: 'reduced DE team pipeline deployment time from 2 days to 2 hours,' 'cut cloud data processing costs by 38% through spot instance architecture,' 'standardized pipeline template adopted by 12-person DE team.' Platform DEs are measured by the productivity of others.",
  },
];

const FAQS = [
  { question: "Should a data engineer resume include SQL prominently?", answer: "Yes — SQL is non-negotiable for data engineers and should be listed prominently in your skills section. Beyond listing it, your experience bullets should demonstrate SQL capability implicitly: data warehouse modeling, transformation pipelines, query optimization. For senior roles, specific SQL skills matter: window functions, recursive CTEs, query plan optimization, and data model design. 'SQL' alone signals proficiency; showing what you built with it (dimensional models, semantic layer, performance-optimized analytical queries) shows mastery." },
  { question: "What's the difference between a data engineer resume and a data scientist resume?", answer: "Data engineers build and maintain the infrastructure that data scientists use; data scientists apply statistical methods and ML to the data that infrastructure produces. On a resume: data engineer resumes emphasize pipeline architecture, ETL tools, orchestration (Airflow), storage systems (Snowflake, BigQuery), and reliability metrics. Data scientist resumes emphasize statistical modeling, machine learning frameworks (scikit-learn, PyTorch), experimentation, and business insights from data. There's overlap in Python and SQL — but the emphasis is fundamentally different. If you do both, be explicit about which type of role you're targeting and organize the resume to lead with the relevant signals." },
  { question: "How do you show data engineering experience when most of your pipelines handle internal data?", answer: "Internal pipeline work is production engineering — the audience doesn't matter, the scale and reliability do. Quantify what you can: data volume processed daily, number of pipelines owned, downstream teams served, SLA met or improved, incidents prevented. You don't need to name the internal business domain to demonstrate engineering capability. What matters: 'owned 23 Airflow DAGs processing 200GB daily with 99.7% uptime over 18 months' is strong regardless of whether those pipelines fed marketing, finance, or product analytics." },
];

export default async function DataEngineerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Data Engineer Resume — Examples, Skills & ATS Keywords (2025)"
        description="Data engineer resumes that pass ATS show pipeline ownership, data volume, and reliability. Before/after examples for junior, mid-level, and senior data engineers."
        url={`${BASE_URL}/blog/data-engineer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Data Engineer Resume", url: `${BASE_URL}/blog/data-engineer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Data Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Data Engineer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Listing Airflow and Spark isn&apos;t enough. Hiring managers want pipeline ownership, data volume at scale, and the reliability metrics that separate production engineers from tutorial builders.
          </p>
        </div>
      </section>

      {/* What they scan */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What data engineering hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {WHAT_HIRING_MANAGERS_SCAN.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.ats_terms.map((t) => (
                    <span key={t} className="rounded-full bg-[var(--brand)]/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--brand)]">{t}</span>
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after: data engineer resume bullets</h2>
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Skills section structure</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">{SKILLS_SECTION.note}</p>
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
            {SKILLS_SECTION.tiers.map((tier) => (
              <div key={tier.label} className="border-b border-[var(--border)] last:border-0 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">{tier.label}</p>
                <p className="font-mono text-[12.5px] text-[var(--ink)]">{tier.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By role type */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">By data engineering specialization</h2>
          <div className="mt-6 space-y-4">
            {BY_ROLE_TYPE.map((spec) => (
              <div key={spec.type} className="rounded-2xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)] text-[16px]">{spec.type}</p>
                <p className="mt-1 text-[12.5px] text-[var(--muted)]">{spec.focus}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {spec.top_keywords.map((kw) => (
                    <span key={kw} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]">{kw}</span>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-[var(--bg)] p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">How to differentiate</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your data engineer resume for each role&apos;s specific stack.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes the job description, identifies the orchestration, processing, and storage stack signals the team is looking for, and rewrites your bullets to match — with ATS keyword validation. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
