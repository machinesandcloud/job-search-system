import Link from "next/link";
import { PageViewLogger } from "@/components/page-view-logger";

export default function CoachingApplyPage() {
  return (
    <main className="lp-bg">
      <PageViewLogger type="coaching_apply_viewed" />
      <section className="section-shell pb-14 pt-16">
        <span className="lp-kicker">Coaching Sprint</span>
        <h1 className="mt-4 text-4xl font-semibold text-slate-100 md:text-5xl">
          Build your system with weekly accountability and live feedback.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          For candidates on a 30-day timeline who want hands-on coaching. We co-build your plan, refine your
          proof assets, and keep your outreach cadence on track.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/job-search-system/start"
            className="lp-cta rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Start with the free assessment
          </Link>
          <Link
            href="/job-search-system"
            className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200"
          >
            Back to system overview
          </Link>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">What we do together</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>- Weekly strategy + accountability check-ins.</li>
              <li>- Live edits on resume, LinkedIn, and outreach scripts.</li>
              <li>- Interview story bank and negotiation prep.</li>
              <li>- Target company list + referral outreach plan.</li>
            </ul>
          </div>
          <div className="lp-surface rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">Fit criteria</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Best for candidates who:</p>
              <ul className="space-y-2">
                <li>- Have 5+ hours per week to execute.</li>
                <li>- Want weekly feedback and fast iteration.</li>
                <li>- Are targeting mid-senior roles in the next 30-60 days.</li>
              </ul>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
              <p className="font-semibold text-slate-100">Next step</p>
              <p className="mt-2">Complete the assessment to see if coaching is the right fit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="lp-surface rounded-3xl p-8 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-400">Ready to accelerate?</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-100">Apply after you finish the assessment.</h3>
          <p className="mt-2 text-sm text-slate-300">We’ll review your inputs and invite you to schedule if it’s a fit.</p>
          <Link
            href="/job-search-system/start"
            className="lp-cta mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Start the assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
