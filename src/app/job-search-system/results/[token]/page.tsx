import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AccountGate } from "@/components/account-gate";
import { getUserSession } from "@/lib/user-auth";
import { CommandCenter } from "@/components/command-center";

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
      <main className="min-h-screen bg-[#0A0E27] px-6 pb-20 pt-12 text-white">
        <Link href="/job-search-system" className="text-sm text-white/60">
          Back to landing
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#0B1220] p-8">
            <h1 className="text-3xl font-semibold">Your Career Command Center</h1>
            <p className="mt-2 text-white/70">
              Create an account to unlock the full dashboard, action plan, and scripts library.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Preview score</p>
              <p className="mt-3 text-4xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                {assessment.totalScore}/100
              </p>
              <p className="mt-3 text-sm text-white/70">
                {(assessment.aiInsights as any)?.primaryGap || "Your insights are ready after signup."}
              </p>
            </div>
          </div>
          <AccountGate assessmentId={assessment.id} />
        </div>
      </main>
    );
  }

  return <CommandCenter assessment={assessment} userEmail={session?.email || null} />;
}
