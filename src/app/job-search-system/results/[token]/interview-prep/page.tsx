import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { PortalShell } from "@/components/portal-shell";
import { getAuthorizedAssessment } from "@/lib/results-auth";
import { AIAnalysisScreen } from "@/components/premium/ai-analysis-screen";
import { ProfileUpdateActions } from "@/components/premium/profile-update-actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function InterviewPrepPage({ params }: { params: Promise<{ token: string }> }) {
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
            <h1 className="text-3xl font-semibold">Interview Prep Command Center</h1>
            <p className="mt-2 text-white/70">Create an account to unlock your interview preparation plan.</p>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  const interviewPrep = assessment.interviewPrep as any;
  const statusLabel = assessment.totalScore >= 70 ? "Fast Track" : assessment.totalScore >= 45 ? "Growth Ready" : "Foundation Phase";
  const aiReady = assessment.aiAnalysisStatus === "complete";

  const starStories = interviewPrep?.starStories || [];
  const technicalQuestions = interviewPrep?.technicalQuestions || [];
  const behavioralQuestions = interviewPrep?.behavioralQuestions || [];
  const questionsToAsk = interviewPrep?.questionsToAsk || [];

  if (!aiReady) {
    return (
      <PortalShell
        token={token}
        active="interview-prep"
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
      active="interview-prep"
      userEmail={session?.email || null}
      score={assessment.totalScore}
      statusLabel={statusLabel}
      aiReady={aiReady}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#131B2E] to-[#0B1220] p-8">
          <h1 className="text-3xl font-semibold">Interview Prep</h1>
          <p className="mt-2 text-white/70">Scripted STAR stories, technical prompts, and practice plans tailored to you.</p>
          <ProfileUpdateActions assessmentId={assessment.id} token={token} />
        </section>

        <div className="grid gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">STAR Stories</h2>
                <div className="mt-4 space-y-4">
                  {starStories.map((story: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">{story.category}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{story.prompt}</p>
                      <p className="mt-3 text-xs text-white/60">Why this works</p>
                      <p className="mt-1 text-sm text-white/80">{story.whyThisWorks}</p>
                    </div>
                  ))}
                  {starStories.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4 text-sm text-white/70">
                      Draft 2 STAR stories: one on impact and one on leadership under pressure.
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Technical Focus</h2>
                <div className="mt-4 space-y-4">
                  {technicalQuestions.map((question: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-sm font-semibold text-white">{question.question}</p>
                      <p className="mt-2 text-xs text-white/60">{question.topicArea}</p>
                      <p className="mt-3 text-sm text-white/80">{question.suggestedApproach}</p>
                    </div>
                  ))}
                  {technicalQuestions.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4 text-sm text-white/70">
                      Prepare system design and troubleshooting questions aligned to your target role.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Behavioral Questions</h2>
                <div className="mt-4 space-y-4">
                  {behavioralQuestions.map((question: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-sm font-semibold text-white">{question.question}</p>
                      <p className="mt-2 text-xs text-white/60">Why they ask</p>
                      <p className="mt-1 text-sm text-white/80">{question.whyTheyAskThis}</p>
                    </div>
                  ))}
                  {behavioralQuestions.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4 text-sm text-white/70">
                      Prepare behavioral responses around ownership, conflict, and stakeholder alignment.
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Questions to Ask</h2>
                <div className="mt-4 space-y-3">
                  {questionsToAsk.map((item: any, index: number) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-sm font-semibold text-white">{item.question}</p>
                      <p className="mt-1 text-xs text-white/60">{item.category}</p>
                      <p className="mt-2 text-sm text-white/80">{item.whyAsk}</p>
                    </div>
                  ))}
                  {questionsToAsk.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-[#0B1220] p-4 text-sm text-white/70">
                      Ask about success metrics, team priorities, and the system’s reliability goals.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {interviewPrep.practiceSchedule && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Practice Schedule</h2>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {Object.entries(interviewPrep.practiceSchedule).map(([day, plan]: [string, any]) => (
                    <div key={day} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">{day}</p>
                      <p className="mt-2 text-sm text-white/80">{plan}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
      </div>
    </PortalShell>
  );
}
