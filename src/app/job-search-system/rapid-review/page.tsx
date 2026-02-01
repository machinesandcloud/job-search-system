import { PageViewLogger } from "@/components/page-view-logger";

export default function RapidReviewPage() {
  return (
    <main className="section-shell min-h-screen py-16">
      <PageViewLogger type="rapid_review_viewed" />
      <h1 className="text-3xl font-semibold text-slate-100">Rapid Review</h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        A focused 30-minute review of your plan, resume, and outreach strategy. We'll identify the fastest
        leverage points to accelerate interviews.
      </p>
      <p className="mt-6 text-sm text-slate-400">Pricing: $99 (toggleable via env flags).</p>
    </main>
  );
}
