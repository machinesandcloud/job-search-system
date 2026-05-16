import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Product Managers — PM Resume, Interviews & Promotion",
  description:
    "Zari is the AI career coach for product managers. PM-specific resume optimization, case interview and behavioral prep, APM to Senior PM to Director coaching, and PM salary negotiation.",
  keywords: ["career coach for product managers", "AI career coach PM", "product manager interview coach", "PM resume coach", "product manager career coaching", "APM coaching", "PM level up", "senior PM coaching", "PM salary negotiation"],
  alternates: { canonical: "/career-coach-for-product-managers" },
  openGraph: { title: "AI Career Coach for Product Managers", description: "PM resume optimization, case + behavioral interview prep, APM → Director coaching, and PM salary negotiation.", url: "/career-coach-for-product-managers" },
};

const FAQS = [
  { question: "How does Zari help product managers with their resume?", answer: "Zari optimizes PM resumes for ATS systems and human readers — focusing on impact metrics, scope of influence, and the strategic signals that differentiate PMs across levels. It identifies keyword gaps against specific PM job descriptions (B2B SaaS, consumer, platform, growth) and rewrites bullets for the target seniority." },
  { question: "Does Zari prepare product managers for case interviews?", answer: "Yes. Zari covers PM case-interview frameworks (product design, estimation, strategy), behavioral questions (leadership, conflict, prioritization), and the metrics-driven storytelling that separates strong PM candidates. It scores your answers and provides specific coaching on structure and business acumen signals." },
  { question: "Can Zari help APMs break into PM or get promoted to Senior PM?", answer: "Yes. Zari is purpose-built for PM career transitions and level-ups — from APM to PM, PM to Senior PM, and Senior PM to Director. It identifies the specific gaps at each level and builds the narrative, resume, and interview answers calibrated for the target role." },
];

export default async function CareerCoachForProductManagersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#4ca7e6", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Product Managers · APM → Director
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#4ca7e6,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for PMs.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From APM-level resume positioning to Director-track interview coaching — Zari understands the specific signals that advance PM careers at every stage.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(76,167,230,0.40)] transition-all hover:-translate-y-0.5" style={{ background: "#4ca7e6" }}>
              Start PM coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for product managers</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#4ca7e6", title: "PM resume positioning", body: "Resume rewritten with PM-specific keywords, impact metrics at scale, and seniority signals calibrated for your target level — from APM to Group PM." },
              { accent: "#0D7182", title: "Case interview coaching", body: "Product design, estimation, strategy, and prioritization frameworks — practiced and scored until your thinking process is as strong as your answers." },
              { accent: "#7a8dff", title: "Behavioral question prep", body: "PM-specific questions: cross-functional conflict, ambiguity, stakeholder management, failure and recovery. Scored on STAR structure and business signal." },
              { accent: "#F97316", title: "Level-up strategy", body: "The signals that separate Senior PM from Director: strategy ownership, cross-functional influence, business impact scope. Zari identifies the gaps and builds the plan." },
              { accent: "#10B981", title: "PM salary negotiation", body: "Total comp for PM roles by company, level, and market. Counter-offer scripts, equity conversation coaching, and live negotiation simulation." },
              { accent: "#EC4899", title: "LinkedIn for PMs", body: "Headline and About rebuilt for PM recruiter search — specialization, domain, impact scope, and openness signal all optimized." },
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

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#021c2e 0%,#1a5f8a 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next PM role or level-up — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#1a5f8a] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
