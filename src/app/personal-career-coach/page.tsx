import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Personal Career Coach — AI Coaching Personalized to You",
  description:
    "Zari is your personal AI career coach — it knows your resume, your goals, and your blockers. Every session builds on the last. Career coaching that feels personal, at a fraction of human coach prices.",
  keywords: ["personal career coach", "private career coach", "one-on-one career coaching", "personalized career coach", "career coach online", "my career coach", "career mentor AI"],
  alternates: { canonical: "/personal-career-coach" },
  openGraph: { title: "Zari — Your Personal AI Career Coach", description: "A career coach that remembers everything, builds session-over-session, and is available 24/7.", url: "/personal-career-coach" },
};

export default async function PersonalCareerCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Personal AI Career Coach · Session Memory · 24/7</div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">A personal career coach<br /><span className="gradient-text-animated">that never forgets you.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari is the personal AI career coach that reads your actual resume, learns your target role, and builds on every session. Session 4 picks up where session 3 left off — no re-explaining, no starting over.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Meet your coach free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">See the platform</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What makes Zari feel personal</h2>
          <div className="space-y-6">
            {[
              { title: "Session memory across every call", body: "Zari stores a summary of every session — your target role, what was reviewed, your open action items. The next session picks up exactly where the last one ended." },
              { title: "Document context, always", body: "Upload your resume and LinkedIn once. Every coaching session references your actual materials — not generic advice, but specific feedback on your specific content." },
              { title: "Adapts to your career stage", body: "Job hunting, chasing a promotion, navigating a career pivot — Zari adapts its coaching to your situation. What it asks you, how it scores you, and what it recommends all shift based on your goal." },
              { title: "Recap after every session", body: "Every session produces a recap: what was reviewed, what changed, what's next. Your progress is visible, trackable, and persistent." },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/15">
                  <svg className="h-3.5 w-3.5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                </div>
                <div>
                  <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[14px] leading-7 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your personal career coach — free to start.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">No scheduling. No $300 session fees. Available right now.</p>
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
