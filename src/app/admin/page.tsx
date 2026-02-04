import Link from "next/link";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin-login-form";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) {
    return (
      <main className="section-shell min-h-screen py-16">
        <AdminLoginForm />
      </main>
    );
  }

  const assessments = await prisma.assessment.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main className="section-shell min-h-screen py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100">Admin dashboard</h1>
        <p className="text-sm text-slate-400">Signed in as {session.email}</p>
      </div>
      <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm text-slate-100">
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="py-2">Assessment</th>
                <th>Score</th>
                <th>Route</th>
                <th>Purchased</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={assessment.id} className="border-t border-slate-800">
                  <td className="py-2">
                    <Link href={`/admin/leads/${assessment.id}`} className="text-slate-100">
                      {assessment.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td>{assessment.totalScore}</td>
                  <td>{assessment.recommendedRoute || "-"}</td>
                  <td>{assessment.hasPurchasedPro ? "Yes" : "No"}</td>
                  <td>{assessment.createdAt.toISOString().slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
