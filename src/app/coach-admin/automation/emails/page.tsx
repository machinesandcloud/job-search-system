import Link from "next/link";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { CoachAdminPill } from "@/components/coach-admin-ui";
import type { ZariSequence } from "@/lib/email-sequences";
import { SEQUENCE_DELAYS_META } from "../sequence-meta";

export const dynamic = "force-dynamic";

function fmt(v?: Date | null, time = false) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", time
    ? { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
    : { month: "short", day: "numeric" }
  ).format(new Date(v));
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ borderRadius: 16, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden", ...style }}>{children}</div>;
}

function CardHeader({ title, count, sub }: { title: string; count?: number; sub?: string }) {
  return (
    <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)" }}>{title}</span>
      {count !== undefined && <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ca-text3)", background: "var(--ca-raise)", border: "1px solid var(--ca-bd)", borderRadius: 99, padding: "0 7px", lineHeight: "18px" }}>{count}</span>}
      {sub && <span style={{ fontSize: 11, color: "var(--ca-text3)", marginLeft: "auto" }}>{sub}</span>}
    </div>
  );
}

function TH({ cols, labels }: { cols: string; labels: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, padding: "7px 16px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
      {labels.map(h => <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>)}
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <div style={{ padding: 16, fontSize: 12.5, color: "var(--ca-text3)", textAlign: "center", borderTop: "1px solid var(--ca-bd)" }}>{label}</div>;
}

function sequenceTone(seq: string) {
  if (seq.startsWith("trial")) return "cyan" as const;
  if (seq.startsWith("paid") || seq.startsWith("milestone")) return "emerald" as const;
  if (seq.startsWith("win_back") || seq.startsWith("at_risk") || seq.startsWith("dunning")) return "rose" as const;
  if (seq.startsWith("upsell") || seq.startsWith("annual")) return "gold" as const;
  return "slate" as const;
}

function statusTone(s: string) {
  if (s === "active") return "cyan" as const;
  if (s === "completed") return "emerald" as const;
  if (s === "canceled") return "rose" as const;
  return "slate" as const;
}

export default async function EmailsPage() {
  await requireCoachAdminActor("support");

  const now = new Date();

  const [sentLog, scheduled, allEnrollments, emailsByUser] = await Promise.all([
    // Sent email log
    prisma.appEvent.findMany({
      where: { eventName: "email_sent" },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),

    // Upcoming scheduled emails
    prisma.emailSequenceEnrollment.findMany({
      where: { completedAt: null, canceledAt: null, nextSendAt: { gt: now } },
      orderBy: { nextSendAt: "asc" },
      take: 200,
    }),

    // All enrollments for per-user campaign view
    prisma.emailSequenceEnrollment.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    }),

    // Group enrollments by email for user search
    prisma.emailSequenceEnrollment.groupBy({
      by: ["email"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 100,
    }),
  ]);

  // Build per-sequence summary from allEnrollments
  const sequenceMap = new Map<string, { total: number; active: number; completed: number; canceled: number }>();
  for (const e of allEnrollments) {
    const s = e.sequence;
    if (!sequenceMap.has(s)) sequenceMap.set(s, { total: 0, active: 0, completed: 0, canceled: 0 });
    const entry = sequenceMap.get(s)!;
    entry.total++;
    if (e.canceledAt) entry.canceled++;
    else if (e.completedAt) entry.completed++;
    else entry.active++;
  }
  const sequenceSummaries = [...sequenceMap.entries()]
    .sort((a, b) => b[1].total - a[1].total);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Nav back */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/coach-admin/automation" style={{ fontSize: 12, color: "var(--ca-text3)", textDecoration: "none" }}>← Automation</Link>
        <span style={{ fontSize: 12, color: "var(--ca-bd)" }}>/</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ca-text)" }}>Email Log</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* Left: Sent + Scheduled */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Sent emails */}
          <Card>
            <CardHeader title="Sent emails" count={sentLog.length} sub="last 200" />
            <TH cols="1fr 130px 90px 110px" labels={["Recipient", "Sequence / type", "Step", "Sent"]} />
            {sentLog.length ? sentLog.map((e: any, i: number) => {
              const m = e.metadataJson as any;
              return (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 130px 90px 110px", padding: "8px 16px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m?.email || "—"}</span>
                  <span>
                    {m?.sequence
                      ? <CoachAdminPill tone={sequenceTone(m.sequence)}>{m.sequence}</CoachAdminPill>
                      : <CoachAdminPill tone="slate">broadcast</CoachAdminPill>
                    }
                  </span>
                  <span style={{ fontSize: 11.5, color: "var(--ca-text3)" }}>
                    {m?.step != null ? `#${(m.step as number) + 1} — ${m.subject?.slice(0, 22) ?? ""}` : m?.subject?.slice(0, 30) ?? "—"}
                  </span>
                  <span style={{ fontSize: 11.5, color: "var(--ca-text3)" }}>{fmt(e.createdAt, true)}</span>
                </div>
              );
            }) : <EmptyRow label="No emails logged yet — emails sent from now on will appear here" />}
          </Card>

          {/* Scheduled (upcoming) */}
          <Card>
            <CardHeader title="Scheduled (upcoming)" count={scheduled.length} />
            <TH cols="1fr 140px 50px 120px" labels={["Recipient", "Sequence", "Step", "Sends at"]} />
            {scheduled.length ? scheduled.map((e: any, i: number) => (
              <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 140px 50px 120px", padding: "8px 16px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.email}</span>
                <CoachAdminPill tone={sequenceTone(e.sequence)}>{e.sequence}</CoachAdminPill>
                <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>#{e.step + 1}</span>
                <span style={{ fontSize: 11.5, color: "var(--ca-text2)" }}>{fmt(e.nextSendAt, true)}</span>
              </div>
            )) : <EmptyRow label="No emails scheduled" />}
          </Card>

        </div>

        {/* Right: Campaigns + Per-user */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Campaigns overview */}
          <Card>
            <CardHeader title="Campaigns" count={sequenceSummaries.length} />
            <TH cols="1fr 60px 60px 70px 70px" labels={["Sequence", "Total", "Active", "Done", "Canceled"]} />
            {sequenceSummaries.map(([seq, stats], i) => {
              const meta = SEQUENCE_DELAYS_META[seq as ZariSequence];
              return (
                <div key={seq} style={{ borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 70px 70px", padding: "9px 16px", gap: 8, alignItems: "center" }}>
                    <div>
                      <CoachAdminPill tone={sequenceTone(seq)}>{seq}</CoachAdminPill>
                      {meta && <span style={{ fontSize: 10.5, color: "var(--ca-text3)", marginLeft: 6 }}>{meta.steps} emails · {meta.duration}d</span>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text)", textAlign: "center" }}>{stats.total}</span>
                    <span style={{ fontSize: 12, color: "#06B6D4", textAlign: "center" }}>{stats.active}</span>
                    <span style={{ fontSize: 12, color: "#22C55E", textAlign: "center" }}>{stats.completed}</span>
                    <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>{stats.canceled}</span>
                  </div>
                </div>
              );
            })}
            {!sequenceSummaries.length && <EmptyRow label="No enrollments yet" />}
          </Card>

          {/* Per-user enrollments */}
          <Card>
            <CardHeader title="By contact" count={emailsByUser.length} />
            {emailsByUser.map((row: any, i: number) => {
              const userEnrollments = allEnrollments.filter((e: any) => e.email === row.email);
              return (
                <div key={row.email} style={{ borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
                  {/* Contact header */}
                  <div style={{ padding: "10px 16px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ca-text)" }}>{row.email}</span>
                    <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{row._count.id} sequence{row._count.id !== 1 ? "s" : ""}</span>
                  </div>
                  {/* Their enrollments */}
                  <div style={{ paddingBottom: 6 }}>
                    {userEnrollments.map((e: any) => {
                      const status = e.canceledAt ? "canceled" : e.completedAt ? "completed" : "active";
                      const stepsDone = e.canceledAt ? e.step : e.completedAt ? e.step : e.step;
                      return (
                        <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 4px 24px" }}>
                          <CoachAdminPill tone={sequenceTone(e.sequence)}>{e.sequence}</CoachAdminPill>
                          <CoachAdminPill tone={statusTone(status)}>{status}</CoachAdminPill>
                          <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>
                            {status === "active"
                              ? `step ${e.step + 1} · next ${fmt(e.nextSendAt, true)}`
                              : status === "completed"
                              ? `all ${e.step} sent · done ${fmt(e.completedAt)}`
                              : `canceled at step ${e.step + 1} · ${fmt(e.canceledAt)}`
                            }
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {!emailsByUser.length && <EmptyRow label="No enrollments yet" />}
          </Card>

        </div>
      </div>
    </div>
  );
}
