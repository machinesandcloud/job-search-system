import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ScoreGauge } from "@/components/score-gauge";
import { AccountGate } from "@/components/account-gate";
import { getUserSession } from "@/lib/user-auth";
import { UpgradeButton } from "@/components/upgrade-button";
import { ProPackActions } from "@/components/pro-pack-actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ResultsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const assessment = await prisma.assessment.findUnique({
    where: { token },
  });
  if (!assessment) return notFound();

  const session = await getUserSession();
  const isOwner = session && assessment.userId && session.userId === assessment.userId;

  if (!isOwner) {
    return (
      <main className="cmd-shell pb-20 pt-12">
        <Link href="/job-search-system" className="text-sm text-slate-400">
          Back to landing
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="cmd-panel rounded-3xl p-6">
            <p className="tag mb-3">Preview</p>
            <h1 className="text-3xl font-semibold text-slate-100">Your Career System Preview</h1>
            <p className="mt-2 text-slate-300">
              Here’s a short preview. Create an account to unlock the full plan and templates.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <ScoreGauge score={assessment.totalScore} />
              <div>
                <p className="text-2xl font-semibold text-slate-100">{assessment.totalScore}/100</p>
                <p className="text-sm text-slate-400">Full score breakdown unlocked after signup.</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-wide text-slate-400">Week 1 cadence</p>
              <ul className="mt-2 space-y-1">
                {(assessment.aiInsights as any)?.weeklyPlan?.week1?.slice?.(0, 3)?.map((action: string) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
            </div>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  return (
    <main className="cmd-shell pb-20 pt-12">
      <Link href="/job-search-system" className="text-sm text-slate-400">
        Back to landing
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="mb-2 text-3xl font-semibold text-slate-100">Your Career System</h1>
          <p className="mb-6 text-slate-300">
            Score breakdown, insights, and your 14-day execution plan.
          </p>
          <div className="mb-6 grid gap-4 lg:grid-cols-2">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-sm text-slate-400">Score</p>
              <div className="mt-2 flex items-center gap-4">
                <ScoreGauge score={assessment.totalScore} />
                <div>
                  <p className="text-2xl font-semibold text-slate-100">{assessment.totalScore}/100</p>
                  <p className="text-xs text-slate-400">Career readiness</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">Clarity: {assessment.clarityScore}/25</div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">Assets: {assessment.assetsScore}/25</div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">Network: {assessment.networkScore}/25</div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">Execution: {assessment.executionScore}/25</div>
              </div>
            </div>
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-sm text-slate-400">Primary gap</p>
              <p className="mt-2 text-slate-100">{(assessment.aiInsights as any)?.primaryGap || "Pending"}</p>
              <p className="mt-4 text-sm text-slate-400">Quick win</p>
              <p className="mt-1 text-slate-100">{(assessment.aiInsights as any)?.quickWin || "Pending"}</p>
            </div>
          </div>
          <div className="cmd-panel rounded-3xl p-6">
            <p className="text-sm text-slate-400">14-day action plan</p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Week 1</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-200">
                  {(assessment.aiInsights as any)?.weeklyPlan?.week1?.map((action: string) => (
                    <li key={action}>- {action}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Week 2</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-200">
                  {(assessment.aiInsights as any)?.weeklyPlan?.week2?.map((action: string) => (
                    <li key={action}>- {action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <aside className="cmd-panel rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-slate-100">Upgrade to Pro Pack — $49</h2>
          <p className="mt-2 text-sm text-slate-300">
            Unlock ATS keyword map, outreach scripts, interview prep, and negotiation playbook.
          </p>
          {!assessment.hasPurchasedPro ? (
            <div className="mt-5">
              <UpgradeButton assessmentId={assessment.id} token={assessment.token} />
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
              Pro Pack is unlocked. Scroll down for the full kit.
            </div>
          )}
        </aside>
      </div>

      {assessment.hasPurchasedPro && assessment.proPackData ? (
        <section className="mt-12 grid gap-6">
          <div className="cmd-panel rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-slate-100">Pro Pack Content</h2>
            <p className="mt-2 text-sm text-slate-300">
              Your deep-dive company shortlist, ATS keyword map, scripts, and interview prep plan.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Top companies</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-200">
                  {(assessment.proPackData as any)?.topCompanies?.slice?.(0, 5)?.map((company: any) => (
                    <li key={company.name}>- {company.name}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">ATS keyword map</p>
                <p className="mt-2 text-sm text-slate-200">
                  {(assessment.proPackData as any)?.atsKeywords?.mustHaveKeywords?.slice?.(0, 6)?.join?.(", ") ||
                    "Keyword map pending"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Outreach scripts</p>
                <p className="mt-2 text-sm text-slate-200">Referral ask, recruiter opener, and follow-up sequence.</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Interview prep</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-200">
                  {(assessment.proPackData as any)?.interviewPrep?.slice?.(0, 3)?.map((item: string) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <ProPackActions token={assessment.token} />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
