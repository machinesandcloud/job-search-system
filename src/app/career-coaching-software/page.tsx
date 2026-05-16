import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Career Coaching Software — AI Platform for Professional Growth",
  description:
    "Zari is the most comprehensive career coaching software available. AI-powered resume optimization, LinkedIn coaching, interview prep, and promotion strategy — all in one platform with session memory.",
  keywords: ["career coaching software", "career development software", "career management platform", "AI career platform", "professional development software", "career coaching app", "career growth software"],
  alternates: { canonical: "/career-coaching-software" },
  openGraph: { title: "Zari — Career Coaching Software Built for Results", description: "The only career coaching software with session memory, document context, and specific outputs across every coaching surface.", url: "/career-coaching-software" },
};

export default async function CareerCoachingSoftwarePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Coaching Software · Session Memory · Six Surfaces</div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">Career coaching software<br /><span className="gradient-text-animated">that compounds over time.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Most career tools are one-off generators. Zari is a coaching system — with session memory, document context, and six specialized surfaces that build on each other every time you use it.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Try the software free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">Explore the platform</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What separates Zari from other career software</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Session memory", body: "Every session is stored and summarized. Session 5 builds on sessions 1–4 — your target role, open action items, and progress history persist automatically." },
              { title: "Document context", body: "Upload your resume and LinkedIn once. Every coaching session references your actual materials — not generic scenarios." },
              { title: "Six coaching surfaces", body: "Resume, LinkedIn, interviews, career strategy, promotion coaching, and salary negotiation — each with its own dedicated workspace." },
              { title: "Specific outputs, not suggestions", body: "Zari writes the improved resume bullet, the LinkedIn headline, the negotiation script. Not 'consider being more specific' — the specific version, written for you." },
              { title: "Recap and action tracking", body: "Every session produces a structured recap: what changed, what's open, what to do next. Your progress is visible and persistent." },
              { title: "Voice coaching mode", body: "Speak answers out loud. The software evaluates pacing, structure, and filler words — the only career tool that works like a real coaching session." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Career coaching software that actually works.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. No card. All six coaching surfaces available immediately.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
