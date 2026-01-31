import Link from "next/link";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin-login-form";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const session = await getAdminSession();
  if (!session) {
    return (
      <main className="section-shell min-h-screen py-16">
        <AdminLoginForm />
      </main>
    );
  }

  const params = searchParams || {};
  const route = typeof params.route === "string" ? params.route : undefined;
  const purchased = typeof params.purchased === "string" ? params.purchased : undefined;
  const minScore = typeof params.minScore === "string" ? Number(params.minScore) : undefined;
  const maxScore = typeof params.maxScore === "string" ? Number(params.maxScore) : undefined;

  const where: any = {};
  if (route) where.route = route;
  if (minScore !== undefined) where.score = { ...(where.score || {}), gte: minScore };
  if (maxScore !== undefined) where.score = { ...(where.score || {}), lte: maxScore };
  if (purchased) {
    where.purchases = { some: { status: purchased === "true" ? "SUCCEEDED" : undefined } };
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { purchases: true },
  });

  return (
    <main className="section-shell min-h-screen py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <p className="text-sm text-slate-500">Signed in as {session.email}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 grid gap-2 md:grid-cols-5">
          <Link href="/admin?route=DIY" className="text-sm text-slate-600">DIY</Link>
          <Link href="/admin?route=GUIDED" className="text-sm text-slate-600">Guided</Link>
          <Link href="/admin?route=FAST_TRACK" className="text-sm text-slate-600">Fast Track</Link>
          <Link href="/admin?purchased=true" className="text-sm text-slate-600">Purchased</Link>
          <Link href="/admin" className="text-sm text-slate-600">Reset</Link>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="py-2">Email</th>
                <th>Score</th>
                <th>Route</th>
                <th>Purchased</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-100">
                  <td className="py-2">
                    <Link href={`/admin/leads/${lead.id}`} className="text-slate-900">
                      {lead.email || "(no email)"}
                    </Link>
                  </td>
                  <td>{lead.score}</td>
                  <td>{lead.route}</td>
                  <td>{lead.purchases.some((p) => p.status === "SUCCEEDED") ? "Yes" : "No"}</td>
                  <td>{lead.createdAt.toISOString().slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
