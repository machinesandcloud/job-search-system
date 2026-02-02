import Link from "next/link";
import { PageViewLogger } from "@/components/page-view-logger";

export default function RapidReviewPage() {
  return (
    <main className="lp-bg">
      <PageViewLogger type="rapid_review_viewed" />
      <section className="section-shell pb-14 pt-16">
        <span className="lp-kicker">Rapid Review</span>
        <h1 className="mt-4 text-4xl font-semibold text-slate-100 md:text-5xl">
          A 30-minute review that pinpoints your fastest wins.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Get a focused audit of your plan, resume, and outreach strategy. We identify leverage points, fix weak
          signal, and leave you with a clear next-week action list.
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
            <p className="text-xs uppercase tracking-wide text-slate-400">What’s included</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>- Scorecard on your current job search readiness.</li>
              <li>- Resume and LinkedIn feedback focused on impact signal.</li>
              <li>- Outreach script improvements and follow-up cadence.</li>
              <li>- A one-page action list for the next 7 days.</li>
            </ul>
          </div>
          <div className="lp-surface rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">Pricing</p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">$99</p>
            <p className="mt-2 text-sm text-slate-300">Limited slots. Applied after you complete the assessment.</p>
            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
              <p className="font-semibold text-slate-100">Ideal for</p>
              <p className="mt-2">Candidates who want fast course-correction before scaling applications.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="lp-surface rounded-3xl p-8 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-400">Ready?</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-100">Lock in a rapid review after your assessment.</h3>
          <p className="mt-2 text-sm text-slate-300">We’ll make sure your plan is tight before you go all in.</p>
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
