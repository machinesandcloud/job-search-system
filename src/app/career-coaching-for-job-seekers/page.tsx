import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Career Coaching for Job Seekers — AI-Powered Job Search Support",
  description:
    "Zari is the AI career coach for active job seekers. Resume ATS optimization, LinkedIn visibility, interview prep, and application strategy — everything you need to land the job faster.",
  keywords: ["career coaching for job seekers", "job seeker career coach", "AI job search coach", "career coaching job hunting", "job search strategy coach", "career coach for unemployed"],
  alternates: { canonical: "/career-coaching-for-job-seekers" },
};

export default async function CareerCoachingForJobSeekersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Career Coaching for Job Seekers · AI-Powered · Free to Start
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Stop applying blindly.<br />
            <span className="gradient-text-animated">Start getting responses.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari is AI career coaching built for active job seekers: ATS-optimized resume, LinkedIn rebuilt for recruiter search, realistic mock interviews, and a job search strategy — all in one platform.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">The full job search coaching stack</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { href: "/ai-resume-writer", title: "Resume — pass the ATS filter", body: "87% of resumes are rejected before a human reads them. Zari scores your resume against ATS filters and rewrites every weak bullet for your target role." },
              { href: "/ai-linkedin-optimizer", title: "LinkedIn — get found by recruiters", body: "Most profiles score under 60 on recruiter visibility. Zari rebuilds your headline, About, and keywords for maximum search ranking." },
              { href: "/ai-interview-coach", title: "Interviews — be ready for any question", body: "Behavioral and technical mock interviews with STAR scoring. Voice or text. Every vague answer caught before the real conversation." },
              { href: "/career-change-coach", title: "Strategy — stop applying blindly", body: "Role fit mapping, target company shortlist, 30-day action plan. Stop sending 50 applications into the void." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand)]/30">
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--brand)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your job search — coached from every angle.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. Resume, LinkedIn, interviews, and strategy — all in one place.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Get started free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
