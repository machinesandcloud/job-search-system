import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";

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

  return (
    <PortalShell token={token} active="resume" userEmail={session?.email || null} score={assessment.totalScore} statusLabel={statusLabel}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold">Resume Optimization</h1>
          <p className="mt-2 text-white/70">AI-generated fixes based on your uploaded resume.</p>
        </div>

        {!resumeAnalysis ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            AI is generating your resume insights now. This section will populate automatically.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Score</h2>
              <p className="mt-3 text-4xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                {resumeAnalysis.overallScore}/100
              </p>
              <p className="mt-2 text-sm text-white/60">ATS Score: {resumeAnalysis.atsScore}/100</p>
              <div className="mt-6 space-y-2">
                {(isPro ? resumeAnalysis.quickWins : (resumeAnalysis.quickWins || []).slice(0, 2)).map((win: any, index: number) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                    <p className="font-semibold">{win.fix}</p>
                    <p className="text-xs text-white/60">Impact: {win.impact}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Top Issues</h2>
              <div className="mt-4 space-y-3">
                {(isPro ? resumeAnalysis.issues : (resumeAnalysis.issues || []).slice(0, 3)).map((issue: any, index: number) => (
                  <div key={issue.id || index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                    <p className="text-sm font-semibold text-white">{issue.issue}</p>
                    <p className="mt-1 text-xs text-white/60">{issue.location}</p>
                    <p className="mt-3 text-sm text-white/80">{issue.suggestedFix}</p>
                  </div>
                ))}
              </div>
              {!isPro && (
                <p className="mt-4 text-sm text-white/60">
                  Upgrade to Pro Pack to unlock the full resume analysis and optimization plan.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
