import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Free Career Coach — AI Career Coaching at No Cost",
  description:
    "Get professional-grade career coaching for free. Zari's AI career coach delivers resume review, LinkedIn optimization, and interview prep — one free session on every surface. No credit card.",
  keywords: ["free career coach", "free AI career coaching", "career coaching free", "free resume review", "free interview coaching", "no cost career coach", "free career advice"],
  alternates: { canonical: "/free-career-coach" },
  openGraph: { title: "Free Career Coach — Zari AI, No Credit Card", description: "One free session on every coaching surface. Resume, LinkedIn, interviews, and career strategy — at no cost.", url: "/free-career-coach" },
};

export default async function FreeCareerCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            Free Career Coach · No Credit Card · No Lock-In
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Professional career coaching.<br /><span className="gradient-text-animated">Actually free to start.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari gives you one free session on every coaching surface — resume review, LinkedIn optimization, mock interviews, and career strategy. No credit card. No trial tricks. Real coaching, zero cost to start.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-emerald-500 px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(16,185,129,0.45)] transition-all hover:-translate-y-0.5">
              Start coaching — it's free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What you get for free</h2>
          <p className="mb-14 text-center text-[16px] text-[var(--muted)]">One complete coaching session on each surface. No card. No catch.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Free resume review", href: "/ai-resume-writer", body: "Upload your resume. Get ATS scoring, bullet-by-bullet feedback, and specific rewrites. One complete session, free." },
              { title: "Free LinkedIn optimization", href: "/ai-linkedin-optimizer", body: "Headline, About, and keyword analysis. Visibility score before and after. One complete session, free." },
              { title: "Free mock interview", href: "/ai-interview-coach", body: "Behavioral and technical questions with STAR scoring. Voice or text. One complete session, free." },
              { title: "Free career strategy session", href: "/career-change-coach", body: "Role fit analysis, gap identification, target company shortlist, and 30-day action plan. One complete session, free." },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 transition-all hover:-translate-y-1 hover:border-emerald-400/50">
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)] group-hover:text-emerald-700">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
                <p className="mt-3 text-[12px] font-semibold text-emerald-600">Start free →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#022b1e 0%,#10B981 50%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Free to start. Serious about results.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">No card. No lock-in. Four complete coaching sessions waiting for you.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-emerald-700 transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free now"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
