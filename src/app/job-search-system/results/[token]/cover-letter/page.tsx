import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";

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

  return (
    <PortalShell token={token} active="cover-letter" userEmail={session?.email || null} score={assessment.totalScore} statusLabel={statusLabel}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold">Cover Letter Kit</h1>
          <p className="mt-2 text-white/70">AI-generated cover letter strategies for your target companies.</p>
        </div>

        {!coverLetterKit ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            AI is generating your cover letter kit now. This section will populate automatically.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="mt-3 text-white/80 whitespace-pre-wrap">{coverLetterKit.overview}</p>
            </div>

            {(isPro ? coverLetterKit.companySpecific : (coverLetterKit.companySpecific || []).slice(0, 1)).map((item: any, index: number) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-[#0B1220] p-6">
                <h3 className="text-lg font-semibold">{item.company}</h3>
                <p className="mt-2 text-sm text-white/60">Hook</p>
                <p className="mt-1 text-white/80">{item.hook}</p>
                <p className="mt-4 text-sm text-white/60">Key Points</p>
                <ul className="mt-2 space-y-2 text-white/80">
                  {(item.keyPoints || []).map((point: string, idx: number) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-white/60">Template</p>
                <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 whitespace-pre-wrap">
                  {item.template}
                </div>
              </div>
            ))}

            {(coverLetterKit.customizationChecklist || []).length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Customization Checklist</h2>
                <ul className="mt-3 space-y-2 text-white/80">
                  {coverLetterKit.customizationChecklist.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {!isPro && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                Upgrade to Pro Pack to unlock cover letter templates for all target companies.
              </div>
            )}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
