import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return null;
  const { id } = await params;
  const assessment = await prisma.assessment.findUnique({ where: { id } });
  if (!assessment) {
    return <main className="section-shell min-h-screen py-16 text-slate-200">Not found</main>;
  }
  return (
    <main className="section-shell min-h-screen py-16 text-slate-200">
      <h1 className="text-2xl font-semibold">Assessment {assessment.id}</h1>
      <p className="mt-2 text-sm text-slate-300">Score: {assessment.totalScore}</p>
      <pre className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-4 text-xs text-slate-200">
        {JSON.stringify(assessment, null, 2)}
      </pre>
    </main>
  );
}
