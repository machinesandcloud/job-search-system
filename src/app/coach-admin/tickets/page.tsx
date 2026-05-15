import Link from "next/link";
import { CoachAdminPill } from "@/components/coach-admin-ui";
import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";

function fmt(v?: Date | null) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(v));
}

function priorityTone(p?: string | null) {
  const v = `${p || ""}`.toLowerCase();
  if (v === "urgent" || v === "high") return "rose" as const;
  if (v === "medium") return "gold" as const;
  return "cyan" as const;
}

function statusTone(s?: string | null) {
  const v = `${s || ""}`.toLowerCase();
  if (v === "resolved") return "emerald" as const;
  if (v === "in_progress") return "gold" as const;
  if (v === "closed") return "slate" as const;
  return "brand" as const;
}

type Props = { searchParams: Promise<{ status?: string | string[] }> };

export default async function CoachAdminTicketsPage({ searchParams }: Props) {
  await requireCoachAdminSession("support");
  const query = await searchParams;
  const statusFilter = typeof query.status === "string" ? query.status : "all";
  const valid = new Set(["all", "open", "in_progress", "resolved", "closed"]);
  const status = valid.has(statusFilter) ? statusFilter : "all";

  const [tickets, counts] = await Promise.all([
    prisma.supportTicket.findMany({
      where: status === "all" ? undefined : { status: status as "open" | "in_progress" | "resolved" | "closed" },
      include: { account: true, reporter: true, assignedTo: true },
      orderBy: { updatedAt: "desc" },
      take: 100,
    }),
    prisma.supportTicket.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const countMap = counts.reduce((m: Record<string, number>, e: typeof counts[number]) => { m[e.status] = e._count._all; return m; }, {});
  const urgentCount = tickets.filter((t: typeof tickets[number]) => ["urgent", "high"].includes(t.priority)).length;
  const assignedCount = tickets.filter((t: typeof tickets[number]) => Boolean(t.assignedToId)).length;

  const stats = [
    { label: "Open",       value: countMap.open || 0,        color: "#3B82F6" },
    { label: "In progress",value: countMap.in_progress || 0, color: "#F59E0B" },
    { label: "Resolved",   value: countMap.resolved || 0,    color: "#22C55E" },
    { label: "High urgency",value: urgentCount,              color: urgentCount > 0 ? "#F43F5E" : "var(--ca-text3)" },
    { label: "Assigned",   value: assignedCount,             color: "var(--ca-text2)" },
    { label: "Visible",    value: tickets.length,            color: "var(--ca-text2)" },
  ];

  const filters = [
    { key: "all",         label: "All" },
    { key: "open",        label: "Open" },
    { key: "in_progress", label: "In progress" },
    { key: "resolved",    label: "Resolved" },
    { key: "closed",      label: "Closed" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text)" }}>Support Queue</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {filters.map(f => {
            const active = status === f.key;
            return (
              <Link key={f.key}
                href={f.key === "all" ? "/coach-admin/tickets" : `/coach-admin/tickets?status=${f.key}`}
                style={{
                  display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                  border: active ? "1px solid rgba(59,130,246,0.4)" : "1px solid var(--ca-bd)",
                  background: active ? "rgba(59,130,246,0.14)" : "transparent",
                  color: active ? "#3B82F6" : "var(--ca-text2)",
                  textDecoration: "none", transition: "all 0.12s",
                }}>
                {f.label}{f.key !== "all" && countMap[f.key] ? ` · ${countMap[f.key]}` : ""}
              </Link>
            );
          })}
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
        {stats.map(s => (
          <div key={s.label} style={{ borderRadius: 12, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", padding: "10px 12px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Ticket table */}
      <div style={{ borderRadius: 14, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden" }}>
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 80px 130px 140px 80px", padding: "8px 16px", borderBottom: "1px solid var(--ca-bd)", gap: 10, background: "var(--ca-raise)" }}>
          {["Subject", "Status", "Priority", "Account", "Reporter / Assigned", "Updated"].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
          ))}
        </div>

        {tickets.length ? tickets.map((ticket: typeof tickets[number], i: number) => (
          <Link key={ticket.id} href={`/coach-admin/tickets/${ticket.id}`}
            style={{
              display: "grid", gridTemplateColumns: "1fr 90px 80px 130px 140px 80px",
              padding: "10px 16px", gap: 10, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none",
              textDecoration: "none", transition: "background 0.1s", alignItems: "center",
            }}
            className="coach-admin-row-hover">
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.subject}</div>
              {ticket.description && <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.description}</div>}
            </div>
            <span><CoachAdminPill tone={statusTone(ticket.status)}>{ticket.status.replace(/_/g, " ")}</CoachAdminPill></span>
            <span><CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill></span>
            <span style={{ fontSize: 12, color: "var(--ca-text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.account?.name || "—"}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11.5, color: "var(--ca-text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.reporter?.email || "—"}</div>
              <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.assignedTo?.email || "unassigned"}</div>
            </div>
            <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{fmt(ticket.updatedAt)}</span>
          </Link>
        )) : (
          <div style={{ padding: "20px 16px", fontSize: 13, color: "var(--ca-text3)", textAlign: "center" }}>No tickets match this filter</div>
        )}
      </div>
    </div>
  );
}
