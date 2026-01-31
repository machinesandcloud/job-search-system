import Link from "next/link";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export default async function LeadDetail({ params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return (
      <main className="section-shell min-h-screen py-16">
        <p className="text-sm text-slate-500">Unauthorized.</p>
      </main>
    );
  }
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { purchases: true, companies: { include: { company: true } }, events: true },
  });
  if (!lead) {
    return (
      <main className="section-shell min-h-screen py-16">
        <p className="text-sm text-slate-500">Lead not found.</p>
      </main>
    );
  }

  return (
    <main className="section-shell min-h-screen py-10">
      <Link href="/admin" className="text-sm text-slate-500">Back</Link>
      <h1 className="mt-4 text-2xl font-semibold">Lead detail</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="text-sm text-slate-600">Email: {lead.email || "(none)"}</p>
          <p className="text-sm text-slate-600">Score: {lead.score}</p>
          <p className="text-sm text-slate-600">Route: {lead.route}</p>
          <p className="text-sm text-slate-600">Created: {lead.createdAt.toISOString()}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Companies</h2>
          <ul className="mt-2 text-sm text-slate-600">
            {lead.companies.map((entry) => (
              <li key={entry.companyId}>{entry.company.name}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Answers</h2>
          <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-600">
            {JSON.stringify(lead.answers, null, 2)}
          </pre>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Events</h2>
          <ul className="mt-2 text-sm text-slate-600">
            {lead.events.map((event) => (
              <li key={event.id}>{event.createdAt.toISOString()} - {event.type}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
