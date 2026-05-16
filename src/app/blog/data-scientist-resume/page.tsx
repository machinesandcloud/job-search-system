import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Data Scientist Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "How to write a data scientist resume that lands interviews at tech companies, banks, and startups. Resume examples for junior, mid-level, and senior data scientists — with ATS rules and real bullet formulas.",
  keywords: ["data scientist resume", "data scientist resume examples", "data science resume", "machine learning engineer resume", "how to write a data scientist resume", "data scientist resume template"],
  alternates: { canonical: "/blog/data-scientist-resume" },
  openGraph: {
    title: "Data Scientist Resume — Examples, Skills & ATS Tips (2025)",
    description: "The complete guide to writing a data scientist resume — with examples, bullet formulas, and ATS rules for 2025.",
    url: "/blog/data-scientist-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const BULLET_TRANSFORMATIONS = [
  {
    role: "Junior data scientist",
    accent: "#059669",
    weak: "Built a classification model to predict customer churn using scikit-learn.",
    strong: `"Trained a gradient boosted classifier (XGBoost) to predict 30-day churn — 84% precision at 0.3 threshold; deployed as a Flask API serving 12K daily predictions with < 80ms p99 latency. Model identified $2.1M in recoverable ARR in pilot quarter."`,
    whatMakesDifferent: "Adds the specific algorithm, the evaluation metric at a defined threshold, the deployment context, latency, and a business outcome tied to the model — not just 'built a model'.",
  },
  {
    role: "Mid-level data scientist",
    accent: "#7C3AED",
    weak: "Led A/B testing for product features and analyzed results to provide recommendations.",
    strong: `"Owned experimentation infrastructure for 3 product teams — designed 18 A/B tests over 12 months, implemented CUPED variance reduction to cut required sample size by 31%, and documented the decision framework now used across the org."`,
    whatMakesDifferent: "Shows ownership of the whole system, not just analysis. CUPED is a specific technique that signals depth. The documentation detail shows organizational impact, not just individual execution.",
  },
  {
    role: "Senior / staff data scientist",
    accent: "#DC2626",
    weak: "Managed a team of data scientists and worked with product and engineering to prioritize roadmap.",
    strong: `"Built and managed a 6-person DS team from 0 — established technical standards, interview rubrics, and a quarterly prioritization framework adopted by all 4 product verticals. Team shipped 3 revenue-attributable models generating $14M combined impact in 18 months."`,
    whatMakesDifferent: "Quantifies the team size, the scope of process built, the reach of the framework, and ties team output to revenue. Leadership reads clearly without just saying 'led'.",
  },
];

const SKILLS_BY_TRACK = [
  {
    track: "Analytics / insights DS",
    accent: "#0D7182",
    description: "Focus on SQL fluency, visualization, experimentation, and business communication. Often more analysis than modeling.",
    coreSkills: ["SQL (advanced)", "Python (pandas, numpy)", "A/B testing / experimentation", "Tableau / Looker / Power BI", "Statistical hypothesis testing", "dbt", "Spark (basic)"],
    whatToEmphasize: "Business impact of analyses, stakeholder communication, and the decisions your insights changed — not model architecture.",
  },
  {
    track: "Applied ML / modeling DS",
    accent: "#7C3AED",
    description: "Heavier on model development, feature engineering, and model deployment. Bridge between research and production.",
    coreSkills: ["Python (scikit-learn, XGBoost, LightGBM)", "Model evaluation & calibration", "Feature engineering", "MLflow / Weights & Biases", "FastAPI / Flask for serving", "SQL", "Cloud ML platforms (SageMaker, Vertex AI)"],
    whatToEmphasize: "Model performance metrics with business context, deployment complexity, and how your models held up in production over time.",
  },
  {
    track: "ML engineering / MLOps",
    accent: "#DC2626",
    description: "Close to software engineering. Focuses on model infrastructure, pipelines, and production reliability rather than model research.",
    coreSkills: ["Python", "MLflow / Kubeflow / Vertex AI", "Docker / Kubernetes", "CI/CD for ML pipelines", "Feature stores (Feast, Tecton)", "Monitoring & drift detection", "Spark / Kafka for data pipelines"],
    whatToEmphasize: "System reliability, pipeline performance, latency and throughput of serving infrastructure — reads more like an SWE resume with ML vocabulary.",
  },
  {
    track: "Research / NLP / deep learning",
    accent: "#D97706",
    description: "Often PhD-track or research-adjacent. Strong emphasis on publication record, novel technique development, and benchmarks.",
    coreSkills: ["Python (PyTorch, JAX, HuggingFace)", "LLM fine-tuning & RLHF", "Distributed training", "Research methodology", "Mathematical statistics", "CUDA / GPU optimization"],
    whatToEmphasize: "Publication list, benchmark results, open-source contributions, and any production deployment of research work. Even better: cite if a paper was implemented by others.",
  },
];

const COMMON_MISTAKES = [
  { mistake: "Listing projects without results", fix: "Every project needs a metric — accuracy, F1, latency, business impact, user scale. 'Built a recommendation system' is incomplete. 'Built a collaborative filtering recommendation system serving 400K users; increased CTR by 18% vs the rule-based baseline' is a resume bullet." },
  { mistake: "Generic skills sections with every tool ever touched", fix: "List tools you can answer questions about. A skills list that includes Spark, Airflow, Flink, Kafka, Hive, and Pig reads as padded unless your experience bullets back all of them up. Depth beats breadth." },
  { mistake: "Not distinguishing between 'used' and 'built'", fix: "Using a pre-trained BERT model from HuggingFace is not the same as fine-tuning it on domain-specific data, which is not the same as training a model architecture from scratch. Make the distinction explicit — hiring managers and DS interviewers will probe exactly this." },
  { mistake: "Education heavy with no research-to-production bridge", fix: "PhD data scientists often write PhD-style resumes — heavy on coursework and theory, light on production systems. If you've deployed anything, built any production pipeline, or shipped any model that served real users, lead with that. Academic depth is the baseline assumption for a PhD hire; production experience is the differentiator." },
  { mistake: "Impact buried at the end of bullets", fix: "ATS and recruiters skim. Lead with the outcome or put it prominently within the bullet, not after three sentences of technical setup. 'Reduced model training time by 60% by distributing preprocessing across Spark clusters' beats 'Implemented Spark-based preprocessing pipeline which was parallelized and resulted in a 60% reduction in training time'." },
];

const FAQS = [
  { question: "How do I write a data scientist resume with no industry experience?", answer: "Lead with your technical skills section, then project-heavy experience. Academic projects, Kaggle competitions, open-source contributions, and personal ML projects all count — they just need to be framed with the same business outcome framing you'd use for industry work. Include what the project was for, what model/method you used, and what the evaluation metric was. If you have an internship or research assistantship, put that first. GPA matters more here if it's strong (3.5+)." },
  { question: "Should I include Kaggle competitions on a data scientist resume?", answer: "Yes, if you placed well or used sophisticated techniques — especially if you're early in your career or pivoting from another field. A top-10% finish or a gold medal is meaningful signal. A basic participation in a beginner competition with a generic starter notebook is not worth listing. The threshold: would you be able to discuss your approach and results in a technical screen? If yes, include it. If no, skip it." },
  { question: "How long should a data science resume be?", answer: "Same rules as engineering: new grads and junior DSes: 1 page. Mid-level: 1 to 1.5 pages — go to 2 only if genuinely needed. Senior and staff: 1–2 pages. Research scientists with meaningful publication records: can go to 2 pages, listing top publications with citation counts if relevant. Don't pad — the density of relevant information matters more than the length." },
];

export default async function DataScientistResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Data Scientist Resume — Examples, Skills & ATS Tips (2025)"
        description="The complete guide to writing a data scientist resume — with examples, bullet formulas, and ATS rules for 2025."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/data-scientist-resume`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Data Scientist Resume", url: `${BASE_URL}/blog/data-scientist-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</span>
            <span className="text-[11px] text-white/30">12 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Data scientist resume<br /><span className="gradient-text-animated">bullet formulas, track-specific skills & ATS rules</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Data science roles span four distinct tracks — analytics, applied ML, MLOps, and research — and what works on a resume for one is wrong for another. This guide covers all four, with specific bullet examples and what hiring managers at tech companies and banks are actually looking for.
          </p>
        </div>
      </section>

      {/* Bullet transformations */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: weak bullets to strong bullets by career level</h2>
          <div className="mt-8 space-y-6">
            {BULLET_TRANSFORMATIONS.map((b) => (
              <div key={b.role} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: b.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{b.role}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Weak</p>
                    <p className="text-[13.5px] text-[var(--muted)] leading-6">{b.weak}</p>
                  </div>
                  <div className="bg-[var(--bg)] px-6 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong</p>
                    <p className="font-mono text-[12.5px] text-[var(--ink)] leading-6">{b.strong}</p>
                  </div>
                  <div className="px-6 py-3">
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">What changed:</span> {b.whatMakesDifferent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills by track */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Skills section by DS track — what to list and what to emphasize</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The same skills section won&apos;t work across all four tracks. Here&apos;s what hiring managers on each track actually want to see.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {SKILLS_BY_TRACK.map((track) => (
              <div key={track.track} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="px-6 py-4 border-b border-[var(--border)]" style={{ borderTopColor: track.accent, borderTopWidth: 3 }}>
                  <p className="font-extrabold text-[var(--ink)]">{track.track}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)] leading-5">{track.description}</p>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Core skills to list</p>
                    <div className="flex flex-wrap gap-1.5">
                      {track.coreSkills.map((skill) => (
                        <span key={skill} className="rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-[11px] font-medium text-[var(--ink)]">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)]/[0.04] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">Emphasize in bullets</p>
                    <p className="text-[12.5px] text-[var(--muted)] leading-5">{track.whatToEmphasize}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 mistakes that kill data scientist resumes</h2>
          <div className="mt-8 space-y-4">
            {COMMON_MISTAKES.map((item, i) => (
              <div key={item.mistake} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                <div className="flex items-start gap-4 px-5 py-4 border-b border-[var(--border)]">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-[12px] font-bold text-red-600">{i + 1}</span>
                  <p className="font-bold text-[var(--ink)] pt-0.5">{item.mistake}</p>
                </div>
                <div className="px-5 py-4 bg-[var(--bg)]">
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Data scientist resume FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your data science resume ATS-scored and rewritten.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against your target role, identifies keyword gaps specific to your DS track, and rewrites bullets to the level and framing that gets technical screens.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
