import Link from "next/link";
import { PageViewLogger } from "@/components/page-view-logger";

export default function RapidReviewPage() {
  return (
    <main className="lp-bg">
      <PageViewLogger type="rapid_review_viewed" />
      <section className="cmd-shell pb-16 pt-16">
        <div className="cmd-panel rounded-3xl p-8">
          <p className="text-xs uppercase tracking-wide text-slate-400">Rapid Review</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-100">
            A 30-minute review to tighten your signal fast.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            We audit your current plan, resume, and outreach strategy to identify the fastest leverage points. You walk
            away with a tight action list for the next 7 days.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/job-search-system/start"
              className="cmd-cta rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Start free assessment
            </Link>
            <Link
              href="/job-search-system"
              className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200"
            >
              Back to command center
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
