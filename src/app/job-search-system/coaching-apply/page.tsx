import { PageViewLogger } from "@/components/page-view-logger";

export default function CoachingApplyPage() {
  return (
    <main className="section-shell min-h-screen py-16">
      <PageViewLogger type="coaching_apply_viewed" />
      <h1 className="text-3xl font-semibold text-slate-100">Apply for Coaching</h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        If you are on a 30-day timeline and ready to move fast, apply for coaching to build your system with
        weekly accountability and negotiation support.
      </p>
      <p className="mt-6 text-sm text-slate-400">Application intake form to be connected later.</p>
    </main>
  );
}
