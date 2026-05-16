import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Resume Review Service — AI Resume Feedback in Minutes",
  description:
    "Zari's AI resume review service delivers line-by-line feedback, ATS scoring, and specific bullet rewrites in under 10 minutes. More detailed than a human reviewer, at a fraction of the cost.",
  keywords: ["resume review service", "AI resume review", "resume feedback", "professional resume review", "free resume review", "resume critique", "resume checker", "resume analysis"],
  alternates: { canonical: "/resume-review-service" },
  openGraph: { title: "Zari Resume Review Service — AI Feedback in 10 Minutes", description: "Line-by-line AI resume feedback with ATS scoring and specific rewrites. More detailed than human review.", url: "/resume-review-service" },
};

export default async function ResumeReviewServicePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume Review Service · ATS Scoring · Specific Rewrites</div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">Resume review service<br /><span className="gradient-text-animated">that actually tells you what to fix.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Generic feedback like "make it more impactful" doesn't help. Zari's AI resume review service scores every bullet on ATS compatibility, impact density, and seniority calibration — then rewrites the weak ones for you.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Get my resume reviewed free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What you get from a Zari resume review</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Overall ATS score", body: "A 0–100 score with attribution for every point gained or lost — so you know exactly where you stand before the rewrite." },
              { title: "Line-by-line bullet scoring", body: "Every experience bullet is scored for metric density, keyword coverage, action verb strength, and scope clarity. Specific number per bullet." },
              { title: "Keyword gap report", body: "Compared against your target role or industry patterns, Zari surfaces the keywords your resume is missing — the ones ATS filters are looking for." },
              { title: "Rewritten bullets", body: "Zari doesn't just flag problems — it writes the improved version of every weak bullet. You copy and paste directly into your resume." },
              { title: "Before / after comparison", body: "See your ATS score before and after the rewrites. Track specific improvement so you know exactly what changed." },
              { title: "Downloadable output", body: "Your reviewed resume with rewrites applied is available for download as a clean, formatted document ready to submit." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/15">
                  <svg className="h-3 w-3 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                </div>
                <div>
                  <p className="mb-1 text-[14px] font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your resume review is ready in 10 minutes.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free first session. Specific feedback. Rewrites included.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Review my resume free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
