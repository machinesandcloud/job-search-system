import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function CompanyStrategyPage({ params }: { params: Promise<{ token: string }> }) {
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
            <h1 className="text-3xl font-semibold">Company Strategy Command Center</h1>
            <p className="mt-2 text-white/70">Create an account to unlock company-specific strategies.</p>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  const statusLabel = assessment.totalScore >= 70 ? "Fast Track" : assessment.totalScore >= 45 ? "Growth Ready" : "Foundation Phase";
  const isPro = assessment.hasPurchasedPro;
  const companyStrategies = (assessment.companyStrategies as any)?.companyStrategies || [];
  const aiReady = assessment.aiAnalysisStatus === "complete" && Boolean(assessment.week1Plan);

  return (
    <PortalShell
      token={token}
      active="company-strategy"
      userEmail={session?.email || null}
      score={assessment.totalScore}
      statusLabel={statusLabel}
      aiReady={aiReady}
    >
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold">Company Strategy</h1>
          <p className="mt-2 text-white/70">AI-generated application strategies for each target company.</p>
        </div>

        {companyStrategies.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            AI is generating your company strategies now. This section will populate automatically.
          </div>
        ) : (
          <div className="space-y-6">
            {(isPro ? companyStrategies : companyStrategies.slice(0, 3)).map((company: any, index: number) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-[#0B1220] p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{company.company}</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {company.overallStrategy?.approach || "Strategy"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/70">{company.overallStrategy?.reasoning}</p>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">Application Tactics</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/80">
                      {(company.applicationTactics?.coverLetterPoints || []).map((point: string, idx: number) => (
                        <li key={idx}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">Networking Path</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/80">
                      {(company.networkingPath?.whoToTarget || []).map((target: any, idx: number) => (
                        <li key={idx}>
                          <span className="text-white/90">{target.role}</span> — {target.whatToSay}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {!isPro && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                Upgrade to Pro Pack to unlock full company strategies, deep-dive interview prep, and compensation guidance.
              </div>
            )}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
