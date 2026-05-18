import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "AI Engineer Resume — Examples, Skills & Keywords (2025)",
  description:
    "AI engineer is one of the hottest titles in tech — and most resumes miss what hiring managers actually look for: shipped LLM applications, RAG pipelines, evaluation frameworks, and production deployment. Before/after examples and complete keyword breakdown for 2025.",
  keywords: ["AI engineer resume", "AI engineer resume 2025", "LLM engineer resume", "generative AI resume", "AI resume keywords", "prompt engineer resume", "AI software engineer resume", "RAG pipeline resume"],
  alternates: { canonical: "/blog/ai-engineer-resume" },
  openGraph: {
    title: "AI Engineer Resume — Examples, Skills & Keywords (2025)",
    description: "AI engineer resumes that get callbacks show shipped LLM applications with business impact — not just familiarity with models.",
    url: "/blog/ai-engineer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_SETS_AI_APART = [
  { signal: "Shipped LLM applications, not experiments", detail: "The AI space is full of people who've 'worked with GPT-4' or 'experimented with LangChain.' What differentiates AI engineers who get callbacks is evidence of shipped production applications: customer-facing features using LLMs, internal tools with real usage, or projects with measurable business impact. Specify the model (GPT-4o, Claude 3.5, Llama 3), the framework (LangChain, LlamaIndex), the storage layer (Pinecone, pgvector, Weaviate), and what it does for users at scale." },
  { signal: "RAG architecture and evaluation", detail: "Retrieval-Augmented Generation is the core pattern for most enterprise AI applications in 2025. Resume evidence of building a real RAG pipeline — chunking strategy, embedding choice, retrieval optimization, re-ranking, and especially evaluation using RAGAS, TruLens, or a custom eval framework — signals hands-on production experience. 'Built RAG system' is common. 'Built RAG system with hybrid BM25+dense retrieval, evaluated with RAGAS, achieving 0.87 faithfulness score across 500-question benchmark' is rare and compelling." },
  { signal: "Fine-tuning and model customization", detail: "Fine-tuning experience (LoRA, QLoRA, full fine-tune) is increasingly asked for at senior AI engineer levels. Show the base model, the method, the dataset, and what improved: 'Fine-tuned Llama 3.1 8B using QLoRA on 15K proprietary support conversations — 31% reduction in hallucination rate vs zero-shot GPT-4o on domain-specific benchmark.' This combination of choices made + outcome measured is a senior signal." },
  { signal: "Prompt engineering as engineering, not art", detail: "Senior AI engineers treat prompt engineering systematically: version-controlled prompts, A/B tested prompt variants, systematic eval frameworks, and documented performance trade-offs. Resume language that shows this discipline — 'Developed versioned prompt library with automated regression testing across 200 test cases' — distinguishes you from candidates who think prompt engineering is just iterating in a chat window." },
];

const BEFORE_AFTER = [
  {
    level: "AI Engineer (Mid-Level)",
    before: { bullet: "Built chatbot using OpenAI API and LangChain for customer support use case", problems: ["'Built chatbot' describes a weekend project or a production system equally", "No scale, accuracy, or business impact", "OpenAI + LangChain is the starting point, not the achievement"] },
    after: { bullet: "Shipped customer support AI agent (GPT-4o, LangChain, Pinecone) reducing Tier-1 support tickets 34% — RAG pipeline over 50K KB articles, 91% answer accuracy on 300-question internal benchmark, serving 8K daily conversations with <1.2s P99 latency", improvements: ["Business impact quantified (34% ticket reduction)", "Architecture specifics show real engineering (RAG, KB size, evaluation)", "Production scale named (8K daily conversations, latency SLA)"] },
  },
  {
    level: "Senior AI Engineer",
    before: { bullet: "Led AI initiatives and built multiple LLM-powered features for the product", problems: ["'Led AI initiatives' — what specifically?", "'Multiple features' — what scale, what impact?", "No technical depth on the approach"] },
    after: { bullet: "Designed and shipped AI features platform (LlamaIndex, Claude 3.5, pgvector) used by 120K monthly active users — automated document analysis saving 40 hrs/week of analyst time; built eval framework (LLM-as-judge + golden dataset) that reduced regression rate 60% across 12 model updates", improvements: ["Scale named (120K MAU)", "Measurable analyst time saved (40 hrs/week)", "Eval framework shows engineering rigor (LLM-as-judge + golden dataset)"] },
  },
];

const SKILLS_TIERS = [
  { tier: "LLM Frameworks & Orchestration", keywords: ["LangChain", "LlamaIndex", "LangGraph", "AutoGen", "CrewAI", "Semantic Kernel", "Haystack"] },
  { tier: "Models & APIs", keywords: ["OpenAI API (GPT-4o, o1)", "Claude (Anthropic)", "Gemini", "Llama 3", "Mistral", "Cohere", "Hugging Face"] },
  { tier: "Vector Databases & RAG", keywords: ["Pinecone", "Weaviate", "Chroma", "Qdrant", "pgvector", "Milvus", "BM25", "hybrid search"] },
  { tier: "Fine-Tuning & Training", keywords: ["LoRA", "QLoRA", "PEFT", "RLHF", "DPO", "SFT", "Axolotl", "Unsloth", "FSDP"] },
  { tier: "Evaluation & Observability", keywords: ["RAGAS", "TruLens", "LangSmith", "Braintrust", "Arize", "LLM-as-judge", "golden dataset", "evals"] },
  { tier: "Deployment & Infrastructure", keywords: ["vLLM", "Ollama", "TGI", "Triton", "FastAPI", "modal.com", "Replicate", "Together AI"] },
];

const FAQS = [
  { question: "What's the difference between an AI engineer and an ML engineer resume?", answer: "AI engineer roles (as they're typically posted in 2025) focus on building LLM-powered applications — RAG systems, agents, AI features, and prompt engineering at scale. ML engineer roles focus on the full ML lifecycle: training, deploying, and monitoring models in production. AI engineer resumes should foreground LLM frameworks (LangChain, LlamaIndex), application architecture (RAG, agents), and evaluation. ML engineer resumes should foreground MLOps (MLflow, Kubeflow), deployment infrastructure (Triton, TorchServe), and training pipelines. There's overlap, and many companies use the titles interchangeably — read each job description carefully." },
  { question: "How do I show prompt engineering as a skill without it sounding trivial?", answer: "Frame it as an engineering discipline with measurement: 'Developed and maintained versioned prompt library (50+ production prompts) with automated regression testing — tracked accuracy, hallucination rate, and latency across each model update.' The systematic treatment (versioning, testing, benchmarking) is what makes it an engineering skill rather than iterative guessing. If you've A/B tested prompts and measured the outcome, show the experiment design and the result." },
  { question: "Should I list AI skills if I've only used them for personal projects?", answer: "Yes, with context. Clearly label project work as such ('Personal project:' or in a Projects section), name the model, framework, dataset, and what you built/achieved. AI is moving fast enough that genuine project depth — a RAG system over a real corpus, a fine-tuned model with eval results, a shipped side project with users — is credible signal even without professional experience. Do not list 'ChatGPT' as a skill without context; that signals consumer usage, not engineering capability." },
];

export default async function AIEngineerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="AI Engineer Resume — Examples, Skills & Keywords (2025)" description="AI engineer resumes that get callbacks show shipped LLM applications with business impact — not just familiarity with models." url={`${BASE_URL}/blog/ai-engineer-resume`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "AI Engineer Resume", url: `${BASE_URL}/blog/ai-engineer-resume` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · AI Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">AI Engineer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Shipped LLM applications, RAG pipelines, and evaluation frameworks — what AI hiring managers actually look for in 2025, with before/after examples and complete keyword tiers.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={340} suffix="%" label="Growth in AI Engineer job postings from 2023 to 2025" accent="#10B981" />
            <StatCard value={4} label="Signals that separate AI engineers who get callbacks from those who don't" accent="#0D7182" />
            <StatCard value={6} label="ATS keyword tiers for AI engineering roles in 2025" accent="#7C3AED" />
            <StatCard value={89} suffix="%" label="Of AI engineer resumes lack evaluation metrics — the top differentiator" accent="#DC2626" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What separates AI engineers who get callbacks from those who don&apos;t</h2>
          <div className="mt-6 space-y-4">
            {WHAT_SETS_AI_APART.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[var(--brand)]">{i + 1}</span>
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
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3"><p className="font-bold text-[var(--brand)]">{item.level}</p></div>
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keyword tiers for AI engineer roles — 2025</h2>
          <div className="mt-6 space-y-3">
            {SKILLS_TIERS.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[var(--border)] p-4">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{tier.tier}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your AI engineer resume reviewed by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and a target AI engineer job description — Zari rewrites your LLM project bullets to show production impact, evaluation rigor, and the 2025-specific keywords AI hiring managers scan for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
