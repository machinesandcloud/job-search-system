import Link from "next/link";
import { PageViewLogger } from "@/components/page-view-logger";

export default function CoachingApplyPage() {
  return (
    <main className="lp-bg">
      <PageViewLogger type="coaching_apply_viewed" />
      <section className="cmd-shell pb-16 pt-16">
        <div className="cmd-panel rounded-3xl p-8">
          <p className="text-xs uppercase tracking-wide text-slate-400">Coaching Application</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-100">
            Build your system with weekly accountability and live feedback.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            For professionals on a 30-day timeline who want hands-on coaching. We co-build your plan, refine proof
            assets, and keep execution on track.
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
