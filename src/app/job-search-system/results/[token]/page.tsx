import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ResultsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const { assessment, session, isOwner } = await getAuthorizedAssessment(token);

  if (!isOwner) {
    return (
      <main className="min-h-screen bg-[#0A0E27] px-6 pb-20 pt-12 text-white">
        <Link href="/job-search-system" className="text-sm text-white/60">
          Back to landing
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#0B1220] p-8">
            <h1 className="text-3xl font-semibold">Your Career Command Center</h1>
            <p className="mt-2 text-white/70">
              Create an account to unlock the full dashboard, action plan, and scripts library.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Preview score</p>
              <p className="mt-3 text-4xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                {assessment.totalScore}/100
              </p>
              <p className="mt-3 text-sm text-white/70">
                {(assessment.aiInsights as any)?.primaryGap || "Your insights are ready after signup."}
              </p>
            </div>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  const statusLabel = assessment.totalScore >= 70 ? "Fast Track" : assessment.totalScore >= 45 ? "Growth Ready" : "Foundation Phase";
  const ai = assessment.aiInsights as any;
  const careerAnalysis = assessment.careerAnalysis as any;
  const actionPlan = assessment.actionPlan as any;
  const companyMatches = (assessment.companyMatches as any)?.matches || [];
  const isPro = assessment.hasPurchasedPro;

  const week1Tasks = actionPlan?.week1?.tasks || [];
  const tasksToShow = isPro ? week1Tasks : week1Tasks.slice(0, 3);

  return (
    <PortalShell token={token} active="dashboard" userEmail={session?.email || null} score={assessment.totalScore} statusLabel={statusLabel}>
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold">Career Command Center</h1>
          <p className="mt-2 text-white/70">{careerAnalysis?.executiveSummary?.currentState}</p>
          <p className="mt-2 text-white/70">{careerAnalysis?.executiveSummary?.targetState}</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Primary Gap</h2>
            <p className="mt-3 text-white/80">{ai?.primaryGap}</p>
            <p className="mt-3 text-sm text-white/60">{ai?.primaryGapExplanation}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Quick Win</h2>
            <p className="mt-3 text-white/80">{ai?.quickWin}</p>
            <p className="mt-3 text-sm text-white/60">{ai?.quickWinReasoning}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">This Week's Focus</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">{actionPlan?.week1?.title}</span>
          </div>
          <p className="mt-3 text-sm text-white/70">{actionPlan?.week1?.focusArea}</p>
          <div className="mt-4 space-y-3">
            {tasksToShow.map((task: any) => (
              <div key={task.id} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                <p className="text-sm font-semibold">{task.task}</p>
                <p className="mt-1 text-xs text-white/60">{task.timeEstimate} • {task.priority}</p>
                <p className="mt-2 text-sm text-white/80">{task.why}</p>
              </div>
            ))}
          </div>
          {!isPro && week1Tasks.length > tasksToShow.length && (
            <p className="mt-4 text-sm text-white/60">
              Upgrade to Pro Pack to unlock the full action plan and execution playbooks.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Top Company Matches</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {(isPro ? companyMatches : companyMatches.slice(0, 3)).map((match: any, index: number) => (
              <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                <p className="text-sm font-semibold">{match.company}</p>
                <p className="mt-2 text-xs text-white/60">{match.matchScore}% match</p>
                <p className="mt-2 text-sm text-white/80">{match.whyGoodFit}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
