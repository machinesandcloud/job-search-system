import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Machine Learning Engineer Resume — Examples & ATS Keywords (2025)",
  description:
    "ML engineer resumes that get callbacks show deployed models, measurable impact, and the full ML lifecycle — not just frameworks. Before/after examples for junior, mid, and senior levels with ATS keyword breakdowns.",
  keywords: ["machine learning engineer resume", "ML engineer resume", "AI engineer resume", "machine learning resume examples", "ML resume ATS keywords", "data scientist resume vs ML engineer", "machine learning resume 2025"],
  alternates: { canonical: "/blog/machine-learning-engineer-resume" },
  openGraph: {
    title: "Machine Learning Engineer Resume — Examples & ATS Keywords (2025)",
    description: "ML engineer resumes that get callbacks show deployed models, measurable impact, and the full ML lifecycle — not just frameworks.",
    url: "/blog/machine-learning-engineer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_SIGNALS = [
  {
    signal: "Production deployment — not just experiments",
    detail: "The single biggest differentiator between ML engineer resumes that get callbacks and those that don't is whether models were deployed to production. Notebooks and Kaggle competitions are fine for junior roles, but mid and senior ML engineers are expected to have shipped — models serving real traffic, with monitoring, retraining pipelines, and rollback procedures. Hiring managers specifically scan for 'deployed,' 'production,' 'serving,' and 'inference' as deployment signals.",
  },
  {
    signal: "ML lifecycle ownership — not just modeling",
    detail: "Strong ML resumes show ownership across the full cycle: data collection and cleaning, feature engineering, model training and evaluation, deployment, and monitoring for drift. Engineers who only show modeling steps are competing for research roles; engineers who show the full lifecycle compete for the higher-value production ML roles that tech companies actually hire in volume. Explicitly name each lifecycle phase you owned.",
  },
  {
    signal: "Quantified model impact — not just accuracy metrics",
    detail: "Accuracy, F1, and AUC are internal metrics. Hiring managers want business impact: 'Reduced fraud loss by $2.3M annually,' 'Increased recommendation CTR by 18%,' 'Reduced false positive rate from 12% to 3.1% — eliminating 40K unnecessary manual reviews/month.' Convert every model metric to its downstream business or operational impact. If you can't, describe the scale: 'Model serving 4M daily predictions across 12 product surfaces.'",
  },
  {
    signal: "Infrastructure and MLOps depth",
    detail: "Production ML requires more than PyTorch or TensorFlow. Senior ML engineers are expected to know experiment tracking (MLflow, Weights & Biases), feature stores (Feast, Tecton), model registries, CI/CD for ML pipelines, and monitoring for data drift and model degradation. These tools signal that you've built systems that survive past the first deployment — not just prototype models handed off to engineering.",
  },
];

const BEFORE_AFTER = [
  {
    level: "Junior ML Engineer",
    before: {
      bullet: "Built ML models using Python and scikit-learn for classification tasks",
      problems: ["No deployment mention — sounds like class project", "No impact metric", "'Classification tasks' is vague — what domain, what outcome?"],
    },
    after: {
      bullet: "Trained and deployed binary churn prediction model (scikit-learn, Flask + Docker) serving 50K daily predictions — 83% precision at 0.3 threshold, reducing proactive outreach spend by $180K/quarter",
      improvements: ["Deployed to production — concrete signal", "Business impact in dollars", "Threshold and precision show ML rigor"],
    },
  },
  {
    level: "Mid-Level ML Engineer",
    before: {
      bullet: "Worked on recommendation system improvements using collaborative filtering and deep learning techniques",
      problems: ["'Worked on' — no ownership", "'Improvements' — no baseline or delta", "No scale, no deployment, no business outcome"],
    },
    after: {
      bullet: "Rebuilt recommendation engine from item-based CF to two-tower neural model (TensorFlow, Vertex AI) — lifted CTR 23% and session engagement +11% across 8M daily active users; model serving latency under 40ms at p99",
      improvements: ["Ownership: 'rebuilt' shows full accountability", "Quantified business impact (CTR, engagement)", "Scale (8M DAU) and latency SLA show production rigor"],
    },
  },
  {
    level: "Senior ML Engineer",
    before: {
      bullet: "Led machine learning infrastructure initiatives and mentored junior engineers on ML best practices",
      problems: ["'Infrastructure initiatives' — what specifically?", "'ML best practices' — completely vague", "No impact of the mentoring or infrastructure work"],
    },
    after: {
      bullet: "Designed and built company-wide ML platform (Kubeflow, MLflow, Feast) used by 35 engineers across 4 teams — reduced model-to-production cycle from 6 weeks to 8 days; established experiment tracking standards now covering 180+ active experiments",
      improvements: ["Concrete platform artifacts named", "Adoption metric (35 engineers, 4 teams)", "Cycle time reduction — the business case for the platform"],
    },
  },
];

const SKILLS_TIERS = [
  { tier: "Core ML Frameworks", keywords: ["PyTorch", "TensorFlow", "scikit-learn", "Keras", "JAX", "XGBoost", "LightGBM", "CatBoost"] },
  { tier: "Large Language Models", keywords: ["Transformers (Hugging Face)", "LangChain", "LlamaIndex", "fine-tuning", "RLHF", "RAG", "vector databases", "embeddings"] },
  { tier: "MLOps & Experiment Tracking", keywords: ["MLflow", "Weights & Biases", "DVC", "Kubeflow", "Metaflow", "Prefect", "Airflow"] },
  { tier: "Serving & Inference", keywords: ["TorchServe", "TensorFlow Serving", "Triton", "BentoML", "FastAPI", "ONNX", "model quantization", "TensorRT"] },
  { tier: "Feature Engineering & Data", keywords: ["Feast", "Tecton", "Spark", "Flink", "dbt", "Pandas", "Polars", "SQL", "Kafka"] },
  { tier: "Cloud ML Platforms", keywords: ["SageMaker", "Vertex AI", "Azure ML", "Databricks", "Snowflake ML"] },
  { tier: "Monitoring & Observability", keywords: ["Evidently AI", "Whylabs", "Great Expectations", "data drift detection", "model monitoring"] },
];

const ROLE_DISTINCTIONS = [
  {
    role: "ML Engineer vs Data Scientist",
    what_to_emphasize: "Deployment, inference latency, system design, MLOps tooling, and production monitoring. Data scientists own experimentation; ML engineers own production. Lean into engineering depth — SLAs, throughput, CI/CD for models.",
  },
  {
    role: "ML Engineer vs AI Engineer",
    what_to_emphasize: "AI Engineer is increasingly used for roles building LLM-powered applications (RAG pipelines, fine-tuning, prompt engineering, agent frameworks). If targeting these roles, foreground LLM-specific experience: Hugging Face, LangChain, vector DBs, fine-tuning techniques.",
  },
  {
    role: "Research Engineer vs Production ML",
    what_to_emphasize: "Research engineer roles (FAANG research labs, AI labs) value publications, novel architecture contributions, and open-source. Production ML roles value scale, latency, reliability, and cost. Tailor your resume to one persona — trying to be both reads as neither.",
  },
];

const FAQS = [
  { question: "How is an ML engineer resume different from a data scientist resume?", answer: "The key difference is deployment emphasis. Data scientist resumes focus on analysis, modeling, and insights. ML engineer resumes must show deployed systems: models in production, serving infrastructure, CI/CD pipelines, and production monitoring. If your resume reads like a notebook — experiments, metrics, and visualizations without 'deployed,' 'serving,' or 'production' — it will be sorted into data science pipelines, not ML engineering. Lead with your production deployments." },
  { question: "Should I list Kaggle competitions or personal projects on an ML engineer resume?", answer: "Yes, for junior roles — Kaggle rankings (top 5%, Master tier) and well-documented personal projects signal initiative and ML fundamentals when you don't have production experience. For mid and senior roles, deprioritize Kaggle and lead with production systems. A Kaggle project at the top of a senior ML engineer resume signals a lack of production experience. Keep them in a Projects section below your work experience, or omit them entirely if you have 4+ years of production ML history." },
  { question: "What's the best way to show LLM/GenAI experience on my resume?", answer: "Be specific about the architecture and business outcome: 'Built RAG pipeline (LangChain, Pinecone, GPT-4) reducing customer support resolution time 34%' beats 'Worked with LLMs.' Specify: the framework (LangChain, LlamaIndex), the model (GPT-4, Claude, Llama 2), the retrieval/storage layer (Pinecone, Weaviate, pgvector), and the business impact. Fine-tuning experience is particularly valuable — name the base model, the method (LoRA, QLoRA, full fine-tune), and the improvement over the base model." },
];

export default async function MLEngineerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Machine Learning Engineer Resume — Examples & ATS Keywords (2025)"
        description="ML engineer resumes that get callbacks show deployed models, measurable impact, and the full ML lifecycle — not just frameworks."
        url={`${BASE_URL}/blog/machine-learning-engineer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "ML Engineer Resume", url: `${BASE_URL}/blog/machine-learning-engineer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Machine Learning</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Machine Learning Engineer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Deployed models and production systems — not Kaggle notebooks. What ML hiring managers actually scan for, with before/after examples at every level.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={4} suffix="x" label="More callbacks when 'deployed' appears in the resume vs 'built'" accent="#7C3AED" />
            <StatCard value={65} suffix="%" label="Of ML resumes lack production deployment evidence — the main screen-out signal" accent="#DC2626" />
            <StatCard value={7} label="Skill tiers that ATS parsers scan for in ML engineer postings" accent="#0D7182" />
            <StatCard value={40} suffix="%" label="Of ML engineer job postings now explicitly require LLM/GenAI experience" accent="#059669" />
          </div>
        </div>
      </section>

      {/* Hiring signals */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What ML hiring managers scan for in the first 10 seconds</h2>
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
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after resume bullets — junior, mid, and senior</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">The same experience — rewritten to show deployment, impact, and ML lifecycle ownership.</p>
          <div className="mt-6 space-y-6">
            {BEFORE_AFTER.map((item) => (
              <div key={item.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3">
                  <p className="font-bold text-[#4361EE]">{item.level}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-red-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-3">Before — gets screened out</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-red-100 rounded-lg p-3">{item.before.bullet}</p>
                    <ul className="space-y-1">
                      {item.before.problems.map((p) => (
                        <li key={p} className="flex gap-2 text-[12px] text-red-600"><span>✗</span>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 bg-emerald-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-3">After — gets callbacks</p>
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

      {/* Skills tiers */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">7-tier ML skills section — ATS keywords by category</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">Don&apos;t dump every framework in one line. ATS parsers match keywords in context — organize by tier.</p>
          <div className="mt-6 space-y-3">
            {SKILLS_TIERS.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[var(--border)] p-4">
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

      {/* Role distinctions */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Tailoring your resume for the specific ML role</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">ML Engineer, AI Engineer, Data Scientist, and Research Engineer are not the same job. Tailor accordingly.</p>
          <div className="mt-6 space-y-4">
            {ROLE_DISTINCTIONS.map((item) => (
              <div key={item.role} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)] mb-2">{item.role}</p>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{item.what_to_emphasize}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your ML resume reviewed by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and a target job description — Zari identifies missing deployment signals, rewrites weak bullets to show production impact, and surfaces the ATS keywords you&apos;re missing for ML engineer roles.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
