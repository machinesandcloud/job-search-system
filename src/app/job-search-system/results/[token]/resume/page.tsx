import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";
import { AIAnalysisScreen } from "@/components/premium/ai-analysis-screen";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ResumePage({ params }: { params: Promise<{ token: string }> }) {
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
            <h1 className="text-3xl font-semibold">Resume Command Center</h1>
            <p className="mt-2 text-white/70">Create an account to unlock your resume optimization plan.</p>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  const resumeAnalysis = assessment.resumeAnalysis as any;
  const isPro = assessment.hasPurchasedPro;
  const statusLabel = assessment.totalScore >= 70 ? "Fast Track" : assessment.totalScore >= 45 ? "Growth Ready" : "Foundation Phase";
  const aiReady =
    assessment.aiAnalysisStatus === "complete" &&
    Boolean((assessment.week1Plan as any)?.week1?.tasks?.length) &&
    Boolean(assessment.resumeAnalysis);

  if (!aiReady) {
    return (
      <PortalShell
        token={token}
        active="resume"
        userEmail={session?.email || null}
        score={assessment.totalScore}
        statusLabel={statusLabel}
        aiReady={aiReady}
        enableRefresh={false}
      >
        <div className="mx-auto w-full max-w-4xl">
          <AIAnalysisScreen token={token} />
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell
      token={token}
      active="resume"
      userEmail={session?.email || null}
      score={assessment.totalScore}
      statusLabel={statusLabel}
      aiReady={aiReady}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#131B2E] to-[#0B1220] p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold">Resume Command Center</h1>
              <p className="mt-2 text-white/70">Pinpointed fixes and ATS improvements tailored to your resume.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Overall score</p>
              <p className="mt-2 text-4xl font-semibold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                {resumeAnalysis?.overallScore ?? "--"}/100
              </p>
              <p className="mt-1 text-xs text-white/60">ATS: {resumeAnalysis?.atsScore ?? "--"}/100</p>
            </div>
          </div>
        </section>

        <>
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Priority Fixes</h2>
                <div className="mt-4 space-y-4">
                  {(isPro ? resumeAnalysis.issues : (resumeAnalysis.issues || []).slice(0, 3)).map((issue: any, index: number) => (
                    <div key={issue.id || index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span className="uppercase tracking-[0.2em]">{issue.severity} priority</span>
                        <span>{issue.location}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-white">{issue.issue}</p>
                      <p className="mt-2 text-sm text-white/70">{issue.suggestedFix}</p>
                    </div>
                  ))}
                  {!isPro && (
                    <p className="text-xs text-white/50">
                      Upgrade to Pro Pack to unlock the full list of resume fixes and custom rewrites.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Quick Wins</h2>
                <div className="mt-4 space-y-3">
                  {(isPro ? resumeAnalysis.quickWins : (resumeAnalysis.quickWins || []).slice(0, 2)).map((win: any, index: number) => (
                    <div key={index} className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-white">{win.fix}</p>
                      <p className="mt-1 text-xs text-white/60">Impact: {win.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Missing Keywords</h2>
                <div className="mt-4 space-y-3">
                  {(isPro ? resumeAnalysis.missingKeywords : (resumeAnalysis.missingKeywords || []).slice(0, 4)).map((item: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-sm font-semibold">{item.keyword}</p>
                      <p className="mt-1 text-xs text-white/60">Add to: {item.whereToAdd}</p>
                      <p className="mt-2 text-sm text-white/70">{item.howToAdd}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Weak Achievements</h2>
                <div className="mt-4 space-y-3">
                  {(isPro ? resumeAnalysis.weakAchievements : (resumeAnalysis.weakAchievements || []).slice(0, 2)).map((item: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Current</p>
                      <p className="mt-1 text-sm text-white/70">{item.currentText}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-emerald-300">Improved</p>
                      <p className="mt-1 text-sm text-white">{item.improvedText}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
        </>
      </div>
    </PortalShell>
  );
}
