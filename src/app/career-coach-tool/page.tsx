import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Career Coach Tool — AI-Powered Career Coaching Software",
  description:
    "Zari is the most powerful career coach tool available. AI resume writing, LinkedIn optimization, mock interviews, and promotion coaching — all in one platform. Free to start.",
  keywords: ["career coach tool", "career coaching tool", "career coaching software", "AI career tool", "career development tool", "career growth tool", "career management software"],
  alternates: { canonical: "/career-coach-tool" },
  openGraph: { title: "Zari — The Ultimate AI Career Coach Tool", description: "One platform for resume, LinkedIn, interviews, promotions, and salary negotiation. The career tool that does the work.", url: "/career-coach-tool" },
};

export default async function CareerCoachToolPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Coach Tool · All-in-One Platform</div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">The career coach tool<br /><span className="gradient-text-animated">that does the actual work.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">Six coaching modules in one platform: AI resume writer, LinkedIn optimizer, mock interview coach, career strategist, promotion coach, and salary negotiation trainer. Each with session memory and specific outputs.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Try the tool free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">See the full platform</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Everything a career coach tool should do</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/ai-resume-writer", title: "AI Resume Writer", body: "ATS-optimized bullet rewrites with measurable impact. Score your resume before and after." },
              { href: "/ai-linkedin-optimizer", title: "LinkedIn Optimizer", body: "Headline, About, and experience rebuilt for recruiter search. Visibility score from 54 to 91." },
              { href: "/ai-interview-coach", title: "Interview Coach", body: "Behavioral and technical mock interviews with STAR scoring and voice mode." },
              { href: "/career-change-coach", title: "Career Strategy", body: "Role fit mapping, gap analysis, target company list, and 30-day action plan." },
              { href: "/promotion-coach", title: "Promotion Coach", body: "Build your case, practice your pitch, and prepare your gap analysis for the next level." },
              { href: "/salary-negotiation-coach", title: "Salary Negotiation", body: "Market benchmarks, counter-offer scripts, and live negotiation simulation." },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand)]/30">
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">The only career tool you need.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. All six coaching surfaces. No card required.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
