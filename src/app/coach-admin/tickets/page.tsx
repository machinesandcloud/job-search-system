import Link from "next/link";
import {
  CoachAdminEmptyState,
  CoachAdminMetricCard,
  CoachAdminPanel,
  CoachAdminPill,
  CoachAdminProgress,
} from "@/components/coach-admin-ui";
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

function priorityTone(priority?: string | null) {
  const value = `${priority || ""}`.toLowerCase();
  if (value === "urgent" || value === "high") return "rose" as const;
  if (value === "medium") return "gold" as const;
  return "cyan" as const;
}

function statusTone(status?: string | null) {
  const value = `${status || ""}`.toLowerCase();
  if (value === "resolved") return "emerald" as const;
  if (value === "in_progress") return "gold" as const;
  if (value === "closed") return "slate" as const;
  return "brand" as const;
}

function filterLink(status: string, active: boolean) {
  return (
    <Link
      href={status === "all" ? "/coach-admin/tickets" : `/coach-admin/tickets?status=${status}`}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#6378FF]/28 bg-[linear-gradient(135deg,rgba(67,97,238,0.3),rgba(6,182,212,0.12))] text-white shadow-[0_12px_30px_rgba(67,97,238,0.22)]"
          : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/18 hover:bg-white/[0.09] hover:text-white"
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

  const urgentCount = tickets.filter((ticket: any) => ["urgent", "high"].includes(ticket.priority)).length;
  const assignedCount = tickets.filter((ticket: any) => Boolean(ticket.assignedToId)).length;
  const maxCount = Math.max(countMap.open || 0, countMap.in_progress || 0, countMap.resolved || 0, countMap.closed || 0, 1);

  return (
    <div className="space-y-6">
      <CoachAdminPanel eyebrow="Support queue" title="Ticket operations" description="Filter the queue, spot the hotspots, and open the account context behind each issue.">
        <div className="flex flex-wrap gap-2">
          {filterLink("all", status === "all")}
          {filterLink("open", status === "open")}
          {filterLink("in_progress", status === "in_progress")}
          {filterLink("resolved", status === "resolved")}
          {filterLink("closed", status === "closed")}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <CoachAdminMetricCard label="Open" value={countMap.open || 0} note="Fresh support work waiting for action." tone="brand" />
            <CoachAdminMetricCard label="In progress" value={countMap.in_progress || 0} note="Tickets currently owned by an operator." tone="gold" />
            <CoachAdminMetricCard label="Resolved" value={countMap.resolved || 0} note="Work completed but still part of the recent picture." tone="emerald" />
            <CoachAdminMetricCard label="High urgency" value={urgentCount} note="Urgent or high-priority issues in the filtered set." tone="rose" />
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Queue balance</p>
            <div className="mt-5 space-y-4">
              <CoachAdminProgress label="Open" value={countMap.open || 0} max={maxCount} tone="brand" />
              <CoachAdminProgress label="In progress" value={countMap.in_progress || 0} max={maxCount} tone="gold" />
              <CoachAdminProgress label="Resolved" value={countMap.resolved || 0} max={maxCount} tone="emerald" />
              <CoachAdminProgress label="Closed" value={countMap.closed || 0} max={maxCount} tone="slate" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <CoachAdminPill tone="cyan">{assignedCount} assigned</CoachAdminPill>
              <CoachAdminPill tone="slate">{tickets.length} visible tickets</CoachAdminPill>
            </div>
          </div>
        </div>
      </CoachAdminPanel>

      <CoachAdminPanel eyebrow="Queue feed" title="Recent tickets" description="Cards instead of a dead table, with priority, account, assignee, and status all readable at a glance.">
        <div className="grid gap-3">
          {tickets.length ? (
            tickets.map((ticket: (typeof tickets)[number]) => (
              <Link
                key={ticket.id}
                href={`/coach-admin/tickets/${ticket.id}`}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-white/16 hover:bg-white/[0.08]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-lg font-semibold tracking-[-0.04em] text-white">{ticket.subject}</p>
                      <CoachAdminPill tone={statusTone(ticket.status)}>{ticket.status.replace(/_/g, " ")}</CoachAdminPill>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {ticket.account?.name || ticket.accountId.slice(0, 8)} · Reporter {ticket.reporter?.email || "—"} · Assigned {ticket.assignedTo?.email || "unassigned"}
                    </p>
                  </div>
                  <CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                  <p className="line-clamp-2 text-sm leading-6 text-slate-300">{ticket.description}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/38">Updated {formatDate(ticket.updatedAt)}</p>
                </div>
              </Link>
            ))
          ) : (
            <CoachAdminEmptyState title="No tickets match this filter" body="Try a broader status view or wait for the first support issue to come in." />
          )}
        </div>
      </CoachAdminPanel>
    </div>
  );
}

