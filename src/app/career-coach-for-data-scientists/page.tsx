import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Data Scientists — Resume, Interviews & Job Strategy",
  description:
    "Zari is the AI career coach for data scientists. Data science resume optimization, ML engineer interview prep, data scientist salary negotiation, and IC-to-leadership coaching.",
  keywords: ["career coach for data scientists", "data science career coach", "AI career coach data scientist", "data scientist resume help", "machine learning career coach", "data scientist interview prep", "data science job coach", "ML engineer career coaching"],
  alternates: { canonical: "/career-coach-for-data-scientists" },
  openGraph: { title: "AI Career Coach for Data Scientists", description: "Data science resume optimization, ML interview prep, and data scientist salary negotiation.", url: "/career-coach-for-data-scientists" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari optimize data scientist resumes?", answer: "Data science resumes require precision: the right technical stack (Python, R, SQL, TensorFlow, PyTorch, Spark), the right metrics (model accuracy, AUC, business impact of predictions), and clear separation between research and production-grade experience. Zari rewrites your resume bullets to quantify model performance, business outcomes, and dataset scale — and tailors the language for the target role (research scientist, applied ML, analytics engineering, or data leadership)." },
  { question: "Does Zari prep for machine learning engineer interviews?", answer: "Yes. ML engineer interviews go deep on systems design, model deployment, and production ML — very different from data science research interviews. Zari preps you for both: the ML system design questions (feature stores, model serving, monitoring), the coding questions (data manipulation, algorithmic problem-solving), and the ML fundamentals (bias-variance, regularization, evaluation metrics). Zari also preps for the behavioral questions specific to ML roles." },
  { question: "Can Zari help data scientists transition to leadership?", answer: "Yes — the IC-to-lead transition in data science is one of the most common coaching scenarios. Moving from senior data scientist to staff, principal, or data science manager requires a completely different interview approach: fewer coding questions, more questions about org design, cross-functional influence, and technical strategy. Zari prepares data science leaders for these conversations and helps them reframe their IC achievements as organizational impact." },
];

export default async function CareerCoachForDataScientistsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Data Scientists", url: `${BASE_URL}/career-coach-for-data-scientists` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#10B981", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Data Science · IC → Staff → Leadership
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#10B981,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for data scientists.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From ATS-optimized data science resumes to ML system design interview prep and staff-level coaching — Zari understands the technical depth and business impact language that advances data science careers.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#10B981" }}>
              Start data science coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for data scientists</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#10B981", title: "Data science resume optimization", body: "Python, SQL, TensorFlow, PyTorch, Spark — the technical stack signals that matter. Zari rewrites your experience bullets to quantify model accuracy, dataset scale, and business impact. Optimized for both ATS keyword matching and human reviewers who know the difference between experimentation and production ML." },
              { accent: "#0D7182", title: "ML engineer interview prep", body: "System design for production ML: feature stores, model serving, A/B testing frameworks, monitoring and drift detection. Zari preps you for the full ML engineer interview loop — coding, ML fundamentals, system design, and behavioral — with role-specific question banks and live coaching." },
              { accent: "#7a8dff", title: "Research scientist coaching", body: "PhD to industry, research to applied ML, academic paper to production model — the framing is different. Zari helps research scientists position their depth as a commercial advantage and prep for the research presentation and technical depth interviews at top AI labs and tech companies." },
              { accent: "#F97316", title: "Staff and principal coaching", body: "Staff data scientist and principal ML interviews focus on scope, influence, and org-level impact. Zari coaches you on how to present your technical leadership, reframe IC contributions as organizational wins, and answer the strategy questions that separate senior from staff." },
              { accent: "#EC4899", title: "Data science salary negotiation", body: "Data science comp varies enormously: base, bonus, equity, and signing. Zari gives you market benchmarks by role (DS vs MLE vs research), level (L4 to L7), and company stage — and the negotiation scripts to use them without leaving money on the table." },
              { accent: "#4ca7e6", title: "LinkedIn for data scientists", body: "Most data scientist LinkedIn profiles undersell. Zari rebuilds your headline for recruiter search (the difference between 'Data Scientist' and 'Senior Data Scientist · Python · ML · NLP at FAANG'), and rewrites your About to lead with business impact rather than technical inventory." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${item.accent}18` }}>
                  <div className="h-2 w-2 rounded-full" style={{ background: item.accent }} />
                </div>
                <h3 className="mb-2 text-[14.5px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6 space-y-4">
          {FAQS.map((f) => (
            <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#001a0f 0%,#10B981 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next data science role or level-up — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#10B981] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
