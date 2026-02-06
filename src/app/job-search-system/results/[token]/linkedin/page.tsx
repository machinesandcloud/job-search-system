import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";
import { AIAnalysisScreen } from "@/components/premium/ai-analysis-screen";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function LinkedInPage({ params }: { params: Promise<{ token: string }> }) {
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
            <h1 className="text-3xl font-semibold">LinkedIn Command Center</h1>
            <p className="mt-2 text-white/70">Create an account to unlock your LinkedIn optimization plan.</p>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  const linkedinAnalysis = assessment.linkedinAnalysis as any;
  const isPro = assessment.hasPurchasedPro;
  const statusLabel = assessment.totalScore >= 70 ? "Fast Track" : assessment.totalScore >= 45 ? "Growth Ready" : "Foundation Phase";
  const aiReady =
    assessment.aiAnalysisStatus === "complete" &&
    Boolean((assessment.week1Plan as any)?.week1?.tasks?.length) &&
    Boolean(assessment.linkedinAnalysis);
  const aiPendingMessage = "";

  if (!aiReady) {
    return (
      <PortalShell
        token={token}
        active="linkedin"
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
      active="linkedin"
      userEmail={session?.email || null}
      score={assessment.totalScore}
      statusLabel={statusLabel}
      aiReady={aiReady}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#131B2E] to-[#0B1220] p-8">
          <h1 className="text-3xl font-semibold">LinkedIn Command Center</h1>
          <p className="mt-2 text-white/70">Headline, About, and skills optimized for recruiter search.</p>
        </section>

        <>
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Headline</h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">Current</p>
                    <p className="mt-2 text-sm text-white/80">{linkedinAnalysis.headline?.current || aiPendingMessage}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Optimized</p>
                    <p className="mt-2 text-sm text-white">{linkedinAnalysis.headline?.optimized || aiPendingMessage}</p>
                    <p className="mt-2 text-xs text-white/60">
                      Keywords: {(linkedinAnalysis.headline?.keywords || []).slice(0, 5).join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Skills Alignment</h2>
                <div className="mt-4 space-y-3">
                  {(linkedinAnalysis.skills?.toAdd || []).slice(0, isPro ? 6 : 3).map((skill: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-sm font-semibold">{skill.skill}</p>
                      <p className="mt-1 text-xs text-white/60">{skill.reason}</p>
                    </div>
                  ))}
                  {!isPro && (
                    <p className="text-xs text-white/50">
                      Upgrade to Pro Pack to unlock the full LinkedIn skills map and endorsement strategy.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">About Section (Optimized)</h2>
              <p className="mt-3 whitespace-pre-wrap text-white/80">{linkedinAnalysis.about?.optimized || aiPendingMessage}</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Experience Enhancements</h2>
                <div className="mt-4 space-y-3">
                  {(linkedinAnalysis.experience?.roleOptimizations || []).slice(0, isPro ? 4 : 2).map((role: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-sm font-semibold">{role.role}</p>
                      <p className="mt-2 text-xs text-white/60">Optimized Description</p>
                      <p className="mt-1 text-sm text-white/80">{role.optimizedDescription}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Action Checklist</h2>
                <div className="mt-3 space-y-3">
                  {(isPro ? linkedinAnalysis.actionChecklist : (linkedinAnalysis.actionChecklist || []).slice(0, 3)).map((item: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-sm font-semibold">{item.task}</p>
                      <p className="mt-1 text-xs text-white/60">{item.timeEstimate} • Priority {item.priority}</p>
                      <p className="mt-2 text-sm text-white/80">{item.impact}</p>
                    </div>
                  ))}
                </div>
                {!isPro && (
                  <p className="mt-4 text-sm text-white/60">
                    Upgrade to Pro Pack to unlock the full LinkedIn action checklist and advanced optimization.
                  </p>
                )}
              </div>
            </section>
        </>
      </div>
    </PortalShell>
  );
}
