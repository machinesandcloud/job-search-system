import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";
import { AIAnalysisScreen } from "@/components/premium/ai-analysis-screen";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function CoverLetterPage({ params }: { params: Promise<{ token: string }> }) {
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
            <h1 className="text-3xl font-semibold">Cover Letter Command Center</h1>
            <p className="mt-2 text-white/70">Create an account to unlock your cover letter kit.</p>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  const coverLetterKit = assessment.coverLetterKit as any;
  const isPro = assessment.hasPurchasedPro;
  const statusLabel = assessment.totalScore >= 70 ? "Fast Track" : assessment.totalScore >= 45 ? "Growth Ready" : "Foundation Phase";
  const aiReady = assessment.aiAnalysisStatus === "complete";

  if (!aiReady) {
    return (
      <PortalShell
        token={token}
        active="cover-letter"
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
      active="cover-letter"
      userEmail={session?.email || null}
      score={assessment.totalScore}
      statusLabel={statusLabel}
      aiReady={aiReady}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#131B2E] to-[#0B1220] p-8">
          <h1 className="text-3xl font-semibold">Cover Letter Kit</h1>
          <p className="mt-2 text-white/70">Personalized hooks, key points, and templates for your target companies.</p>
        </section>

        <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Overview Strategy</h2>
              <p className="mt-3 text-white/80 whitespace-pre-wrap">{coverLetterKit.overview}</p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              {(isPro ? coverLetterKit.companySpecific : (coverLetterKit.companySpecific || []).slice(0, 1)).map((item: any, index: number) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{item.company}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">Company hook</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">Hook</p>
                  <p className="mt-1 text-white/80">{item.hook}</p>
                  <p className="mt-4 text-sm text-white/60">Key Points</p>
                  <ul className="mt-2 space-y-2 text-white/80">
                    {(item.keyPoints || []).map((point: string, idx: number) => (
                      <li key={idx}>• {point}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-white/60">Template</p>
                  <div className="mt-2 rounded-xl border border-white/10 bg-[#0B1220] p-4 text-sm text-white/80 whitespace-pre-wrap">
                    {item.template}
                  </div>
                </div>
              ))}
            </section>

            {(coverLetterKit.customizationChecklist || []).length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Customization Checklist</h2>
                <ul className="mt-3 space-y-2 text-white/80">
                  {coverLetterKit.customizationChecklist.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </section>
            )}
            {!isPro && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                Upgrade to Pro Pack to unlock cover letter templates for all target companies.
              </div>
            )}
          </div>
      </div>
    </PortalShell>
  );
}
