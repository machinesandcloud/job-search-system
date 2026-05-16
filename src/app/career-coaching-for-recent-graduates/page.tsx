import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Career Coaching for Recent Graduates — AI Career Coach for New Grads",
  description:
    "Starting your career after graduation? Zari's AI career coach helps new grads write entry-level resumes that pass ATS, optimize LinkedIn, and ace interviews — free to start.",
  keywords: ["career coaching for recent graduates", "new grad career coach", "entry level career coach", "career advice for graduates", "AI career coach for students", "career coaching for college students", "new grad job search help"],
  alternates: { canonical: "/career-coaching-for-recent-graduates" },
};

export default async function CareerCoachingForRecentGraduatesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Career Coaching · Recent Graduates · Entry Level
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Your first real job<br />
            <span className="gradient-text-animated">is closer than you think.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Recent graduates face a specific challenge: limited experience, high competition, and ATS systems that filter ruthlessly. Zari's AI career coach knows how to position entry-level candidates so they get callbacks — not silence.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Start free — no card <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">How Zari helps new grads compete</h2>
          <div className="space-y-5">
            {[
              { title: "Turn internships and projects into ATS-passing bullets", body: "Entry-level resumes often fail on impact density and keyword coverage. Zari analyzes your academic projects, internships, and coursework and rewrites them with measurable outcomes and role-relevant keywords — the way recruiters need to see them." },
              { title: "Build a LinkedIn that gets recruiter attention", body: "Most new grads have LinkedIn profiles that signal student, not professional. Zari rebuilds your headline, About, and experience for the job you're targeting — not the school you graduated from." },
              { title: "Interview prep for entry-level candidates", body: "Behavioral questions hit differently when you have 1–2 internships as your only work experience. Zari helps you extract strong STAR stories from limited experience and coaches you to answer with confidence." },
              { title: "Understand what entry-level really means", body: "Zari maps your background against entry-level job requirements and tells you which roles are realistic targets vs. long shots — so you can focus your applications where they'll land." },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/15">
                  <svg className="h-3.5 w-3.5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                </div>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Land your first real role — with AI in your corner.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. All four coaching surfaces — resume, LinkedIn, interviews, and strategy.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
