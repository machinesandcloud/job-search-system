import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";
import { AIAnalysisScreen } from "@/components/premium/ai-analysis-screen";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ScriptsPage({ params }: { params: Promise<{ token: string }> }) {
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
            <h1 className="text-3xl font-semibold">Scripts Library</h1>
            <p className="mt-2 text-white/70">Create an account to unlock your scripts library.</p>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  const scripts = (assessment.personalizedScripts as any)?.scripts || [];
  const statusLabel = assessment.totalScore >= 70 ? "Fast Track" : assessment.totalScore >= 45 ? "Growth Ready" : "Foundation Phase";
  const isPro = assessment.hasPurchasedPro;
  const aiReady = assessment.aiAnalysisStatus === "complete";

  if (!aiReady) {
    return (
      <PortalShell
        token={token}
        active="scripts"
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
      active="scripts"
      userEmail={session?.email || null}
      score={assessment.totalScore}
      statusLabel={statusLabel}
      aiReady={aiReady}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#131B2E] to-[#0B1220] p-8">
          <h1 className="text-3xl font-semibold">Scripts Library</h1>
          <p className="mt-2 text-white/70">Outreach, follow-up, and negotiation scripts written for your exact background.</p>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
            {(isPro ? scripts : scripts.slice(0, 4)).map((script: any, index: number) => (
              <div key={script.id || index} className="rounded-2xl border border-white/10 bg-[#0B1220] p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{script.title}</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">{script.category}</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{script.description}</p>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 whitespace-pre-wrap">
                  {script.content}
                </div>
              </div>
            ))}
          </div>

        {!isPro && scripts.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            Upgrade to Pro Pack to unlock the full script library and advanced follow-up sequences.
          </div>
        )}
      </div>
    </PortalShell>
  );
}
