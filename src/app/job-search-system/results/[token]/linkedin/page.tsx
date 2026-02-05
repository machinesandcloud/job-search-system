import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";

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

  return (
    <PortalShell token={token} active="linkedin" userEmail={session?.email || null} score={assessment.totalScore} statusLabel={statusLabel}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold">LinkedIn Optimization</h1>
          <p className="mt-2 text-white/70">AI-generated LinkedIn copy and fixes based on your profile.</p>
        </div>

        {!linkedinAnalysis ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            AI is generating your LinkedIn insights now. This section will populate automatically.
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Headline</h2>
              <p className="mt-2 text-sm text-white/60">Current</p>
              <p className="mt-1 text-white/80">{linkedinAnalysis.headline?.current || ""}</p>
              <p className="mt-4 text-sm text-white/60">Optimized</p>
              <p className="mt-1 text-white">{linkedinAnalysis.headline?.optimized || ""}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">About Section</h2>
              <p className="mt-3 text-white/80 whitespace-pre-wrap">{linkedinAnalysis.about?.optimized || ""}</p>
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
          </div>
        )}
      </div>
    </PortalShell>
  );
}
