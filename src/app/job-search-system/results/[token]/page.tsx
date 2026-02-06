import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";
import { CareerJourneyHero } from "@/components/premium/career-journey-hero";
import { ScoreBreakdown } from "@/components/premium/score-breakdown";
import { AIInsightsPanel } from "@/components/premium/ai-insights-panel";
import { Week1Experience } from "@/components/premium/week1-experience";
import { Week2Preview } from "@/components/premium/week2-preview";
import { MarketIntelPanel } from "@/components/premium/market-intel-panel";

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
  const careerAnalysis = assessment.careerAnalysis as any;
  const actionPlan = assessment.actionPlan as any;
  const companyMatches = (assessment.companyMatches as any)?.matches || [];
  const aiPendingMessage = "AI is generating this section now. Check back in a minute.";
  const isPro = assessment.hasPurchasedPro;
  const aiReady = assessment.aiAnalysisStatus === "complete" && Boolean(assessment.week1Plan);
  const week1Plan = (assessment.week1Plan as any)?.week1 || actionPlan?.week1 || null;
  const week2Preview = actionPlan?.week2Preview || null;

  return (
    <PortalShell
      token={token}
      active="dashboard"
      userEmail={session?.email || null}
      score={assessment.totalScore}
      statusLabel={statusLabel}
      aiReady={aiReady}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <CareerJourneyHero assessment={assessment} />

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Executive Summary</h2>
          <p className="mt-2 text-white/70">{careerAnalysis?.executiveSummary?.currentState || aiPendingMessage}</p>
          <p className="mt-2 text-white/70">{careerAnalysis?.executiveSummary?.targetState || aiPendingMessage}</p>
        </section>

        <ScoreBreakdown assessment={assessment} aiPending={aiPendingMessage} />
        <AIInsightsPanel assessment={assessment} aiPending={aiPendingMessage} />
        <MarketIntelPanel marketIntel={assessment.marketIntelligence} aiPending={aiPendingMessage} />

        <Week1Experience
          assessmentId={assessment.id}
          createdAt={assessment.createdAt.toISOString()}
          week1Plan={week1Plan}
          aiPending={aiPendingMessage}
        />

        {isPro ? (
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Week 2 Execution</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                {actionPlan?.week2?.title || "Execution Week"}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/70">{actionPlan?.week2?.focusArea || aiPendingMessage}</p>
            <div className="mt-4 space-y-3">
              {(actionPlan?.week2?.tasks || []).length ? (
                actionPlan.week2.tasks.map((task: any) => (
                  <div key={task.id} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                    <p className="text-sm font-semibold">{task.title || task.task}</p>
                    <p className="mt-1 text-xs text-white/60">{task.timeEstimate} • {task.priority}</p>
                    <p className="mt-2 text-sm text-white/80">{task.why || task.context?.whyNow}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4 text-sm text-white/70">
                  {aiPendingMessage}
                </div>
              )}
            </div>
          </section>
        ) : (
          <Week2Preview
            preview={week2Preview}
            aiPending={aiPendingMessage}
            targetCompanies={(assessment.targetCompanies as any)?.map((c: any) => c.name).filter(Boolean).slice(0, 3)}
          />
        )}

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Top Company Matches</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {(isPro ? companyMatches : companyMatches.slice(0, 3)).length ? (
              (isPro ? companyMatches : companyMatches.slice(0, 3)).map((match: any, index: number) => (
                <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                  <p className="text-sm font-semibold">{match.company}</p>
                  <p className="mt-2 text-xs text-white/60">{match.matchScore}% match</p>
                  <p className="mt-2 text-sm text-white/80">{match.whyGoodFit || aiPendingMessage}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4 text-sm text-white/70">
                {aiPendingMessage}
              </div>
            )}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
