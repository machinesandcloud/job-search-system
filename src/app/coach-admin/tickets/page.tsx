import Link from "next/link";
import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";

function formatDate(value?: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function filterLink(status: string, active: boolean) {
  return (
    <Link
      href={status === "all" ? "/coach-admin/tickets" : `/coach-admin/tickets?status=${status}`}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? "bg-cyan-500 text-slate-950" : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
      }`}
    >
      {status.replace(/_/g, " ")}
    </Link>
  );
}

type TicketsPageProps = {
  searchParams: Promise<{ status?: string | string[] | undefined }>;
};

export default async function CoachAdminTicketsPage({
  searchParams,
}: TicketsPageProps) {
  await requireCoachAdminSession("support");
  const query = await searchParams;
  const statusFilter = typeof query.status === "string" ? query.status : "all";
  const validStatuses = new Set(["all", "open", "in_progress", "resolved", "closed"]);
  const status = validStatuses.has(statusFilter) ? statusFilter : "all";

  const [tickets, counts] = await Promise.all([
    prisma.supportTicket.findMany({
      where: status === "all" ? undefined : { status: status as any },
      include: {
        account: true,
        reporter: true,
        assignedTo: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 100,
    }),
    prisma.supportTicket.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const countMap = counts.reduce((map: Record<string, number>, entry: (typeof counts)[number]) => {
    map[entry.status] = entry._count._all;
    return map;
  }, {} as Record<string, number>);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Support queue</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-white">Tickets</h1>
          <p className="mt-2 text-sm text-slate-400">Filter by current status and drill into the account or thread that needs work.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterLink("all", status === "all")}
          {filterLink("open", status === "open")}
          {filterLink("in_progress", status === "in_progress")}
          {filterLink("resolved", status === "resolved")}
          {filterLink("closed", status === "closed")}
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Open", countMap.open || 0],
          ["In progress", countMap.in_progress || 0],
          ["Resolved", countMap.resolved || 0],
          ["Closed", countMap.closed || 0],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="pb-3 pr-4">Ticket</th>
                <th className="pb-3 pr-4">Account</th>
                <th className="pb-3 pr-4">Priority</th>
                <th className="pb-3 pr-4">Reporter</th>
                <th className="pb-3 pr-4">Assigned</th>
                <th className="pb-3 pr-4">Updated</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket: (typeof tickets)[number]) => (
                <tr key={ticket.id} className="border-t border-slate-800 align-top">
                  <td className="py-4 pr-4">
                    <Link href={`/coach-admin/tickets/${ticket.id}`} className="font-medium text-white transition hover:text-cyan-300">
                      {ticket.subject}
                    </Link>
                    <p className="mt-1 text-xs text-slate-500">{ticket.status.replace(/_/g, " ")}</p>
                  </td>
                  <td className="py-4 pr-4">
                    <Link href={`/coach-admin/accounts/${ticket.accountId}`} className="text-slate-300 transition hover:text-white">
                      {ticket.account?.name || ticket.accountId.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 capitalize text-slate-300">{ticket.priority}</td>
                  <td className="py-4 pr-4 text-slate-400">{ticket.reporter?.email || "—"}</td>
                  <td className="py-4 pr-4 text-slate-400">{ticket.assignedTo?.email || "unassigned"}</td>
                  <td className="py-4 pr-4 text-slate-400">{formatDate(ticket.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!tickets.length ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-500">
            No tickets match this filter yet.
          </div>
        ) : null}
      </section>
    </div>
  );
}
