import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { CoachAdminPill } from "@/components/coach-admin-ui";
import { CancelEnrollmentButton, UnsuppressButton, EnrollForm, TriggerQueueButton, BackfillButton } from "./actions-client";

export const dynamic = "force-dynamic";

function fmt(v?: Date | null, time = false) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", time
    ? { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
    : { month: "short", day: "numeric" }
  ).format(new Date(v));
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: 16, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, count, action }: { title: string; count?: number; action?: React.ReactNode }) {
  return (
    <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>{title}</span>
        {count !== undefined && (
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ca-text3)", background: "var(--ca-raise)", border: "1px solid var(--ca-bd)", borderRadius: 99, padding: "0 7px", lineHeight: "18px" }}>{count}</span>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <div style={{ padding: "16px", fontSize: 12.5, color: "var(--ca-text3)", textAlign: "center", borderTop: "1px solid var(--ca-bd)" }}>{label}</div>;
}

function TH({ cols, labels }: { cols: string; labels: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, padding: "7px 16px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
      {labels.map(h => (
        <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
      ))}
    </div>
  );
}

function sequenceTone(seq: string) {
  if (seq.startsWith("trial")) return "cyan" as const;
  if (seq.startsWith("paid") || seq.startsWith("milestone")) return "emerald" as const;
  if (seq.startsWith("win_back") || seq.startsWith("at_risk") || seq.startsWith("dunning")) return "rose" as const;
  if (seq.startsWith("upsell") || seq.startsWith("annual")) return "gold" as const;
  return "slate" as const;
}

function npsColor(score: number) {
  if (score >= 9) return "#22C55E";
  if (score >= 7) return "#F59E0B";
  return "#F43F5E";
}

export default async function AutomationPage() {
  const actor = await requireCoachAdminActor("support");
  const isAdmin = actor.session.role === "admin";

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const [
    activeEnrollments,
    completedToday,
    canceledToday,
    suppressions,
    churnSurveys,
    recentNpsEvents,
    recentFunnelEvents,
  ] = await Promise.all([
    prisma.emailSequenceEnrollment.findMany({
      where: { completedAt: null, canceledAt: null },
      orderBy: { nextSendAt: "asc" },
      take: 150,
    }),
    prisma.emailSequenceEnrollment.count({ where: { completedAt: { gte: todayStart } } }),
    prisma.emailSequenceEnrollment.count({ where: { canceledAt: { gte: todayStart } } }),
    prisma.emailSuppression.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.churnSurvey.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
    prisma.appEvent.findMany({
      where: { eventName: "nps_submitted" },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.appEvent.findMany({
      where: {
        eventName: {
          in: ["checkout_completed", "subscription_cancel_requested", "cancel_offer_accepted", "cancel_survey_submitted", "topup_completed"],
        },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);

  const npsDetractors = recentNpsEvents.filter(
    (e: { metadataJson: unknown }) => typeof (e.metadataJson as any)?.score === "number" && (e.metadataJson as any).score <= 6
  ).length;

  const kpis = [
    { label: "Queue size",     value: activeEnrollments.length, color: "#3B82F6" },
    { label: "Sent today",     value: completedToday,           color: "#22C55E" },
    { label: "Canceled today", value: canceledToday,            color: "#F59E0B" },
    { label: "Suppressions",   value: suppressions.length,      color: suppressions.length > 0 ? "#F43F5E" : "var(--ca-text3)" },
    { label: "Churn surveys",  value: churnSurveys.length,      color: "#8B5CF6" },
    { label: "NPS detractors", value: npsDetractors,            color: npsDetractors > 0 ? "#F43F5E" : "var(--ca-text3)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Backfill banner — admin only */}
      {isAdmin && (
        <Card style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", marginBottom: 2 }}>Backfill existing users</div>
            <div style={{ fontSize: 11.5, color: "var(--ca-text3)" }}>Enroll all un-enrolled users in their correct sequence and send immediately-due emails.</div>
          </div>
          <BackfillButton isAdmin={isAdmin} />
        </Card>
      )}

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
        {kpis.map(k => (
          <Card key={k.label} style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ca-text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: k.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{k.value}</div>
          </Card>
        ))}
      </div>

      {/* Two-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Active queue */}
          <Card>
            <CardHeader
              title="Active sequence queue"
              count={activeEnrollments.length}
              action={<TriggerQueueButton isAdmin={isAdmin} />}
            />
            <TH cols="1fr 160px 50px 130px 80px" labels={["Email", "Sequence", "Step", "Next send", ""]} />
            {activeEnrollments.length ? activeEnrollments.map((e: any, i: number) => (
              <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 160px 50px 130px 80px", padding: "9px 16px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 12.5, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.email}</span>
                <CoachAdminPill tone={sequenceTone(e.sequence)}>{e.sequence}</CoachAdminPill>
                <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>{e.step + 1}</span>
                <span style={{ fontSize: 12, color: e.nextSendAt && new Date(e.nextSendAt) <= now ? "#F59E0B" : "var(--ca-text2)" }}>
                  {fmt(e.nextSendAt, true)}
                </span>
                <CancelEnrollmentButton enrollmentId={e.id} email={e.email} sequence={e.sequence} />
              </div>
            )) : <EmptyRow label="No active enrollments" />}
          </Card>

          {/* Funnel events */}
          <Card>
            <CardHeader title="Recent funnel events" count={recentFunnelEvents.length} />
            <TH cols="1fr 220px 130px" labels={["User", "Event", "Date"]} />
            {recentFunnelEvents.length ? recentFunnelEvents.map((e: any, i: number) => {
              const meta = e.metadataJson as any;
              return (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 220px 130px", padding: "9px 16px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--ca-text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{meta?.email || e.userId || "—"}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ca-text)" }}>{e.eventName}</span>
                  <span style={{ fontSize: 11.5, color: "var(--ca-text3)" }}>{fmt(e.createdAt, true)}</span>
                </div>
              );
            }) : <EmptyRow label="No funnel events yet" />}
          </Card>

          {/* Churn surveys */}
          <Card>
            <CardHeader title="Churn surveys" count={churnSurveys.length} />
            <TH cols="1fr 140px 80px 80px 100px" labels={["Email", "Reason", "Offer", "Accepted", "Date"]} />
            {churnSurveys.length ? churnSurveys.map((s: any, i: number) => (
              <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 140px 80px 80px 100px", padding: "9px 16px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.email}</span>
                <CoachAdminPill tone={s.reason === "got_job" ? "emerald" : "slate"}>{s.reason}</CoachAdminPill>
                <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>{s.offerShown ? "✓" : "—"}</span>
                <span style={{ fontSize: 12, color: s.offerAccepted ? "#22C55E" : "var(--ca-text3)", fontWeight: s.offerAccepted ? 700 : 400, textAlign: "center" }}>{s.offerAccepted ? "✓" : "—"}</span>
                <span style={{ fontSize: 11.5, color: "var(--ca-text3)" }}>{fmt(s.createdAt)}</span>
              </div>
            )) : <EmptyRow label="No churn surveys yet" />}
          </Card>

        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Manual enroll */}
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Manual enroll</div>
            <EnrollForm />
          </Card>

          {/* NPS scores */}
          <Card>
            <CardHeader title="NPS scores" count={recentNpsEvents.length} />
            {recentNpsEvents.length ? recentNpsEvents.map((e: any, i: number) => {
              const meta = e.metadataJson as any;
              const score = meta?.score;
              return (
                <div key={e.id} style={{ padding: "10px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{meta?.email || e.userId || "—"}</span>
                    {typeof score === "number" && (
                      <span style={{ fontSize: 14, fontWeight: 800, color: npsColor(score), letterSpacing: "-0.04em", flexShrink: 0, marginLeft: 8 }}>{score}/10</span>
                    )}
                  </div>
                  {meta?.comment && (
                    <p style={{ fontSize: 11.5, color: "var(--ca-text2)", margin: 0, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      &ldquo;{meta.comment}&rdquo;
                    </p>
                  )}
                  <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 4 }}>{fmt(e.createdAt, true)}</div>
                </div>
              );
            }) : <EmptyRow label="No NPS responses yet" />}
          </Card>

          {/* Suppressions */}
          <Card>
            <CardHeader title="Email suppressions" count={suppressions.length} />
            {suppressions.length ? suppressions.map((s: any, i: number) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", gap: 8 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.email}</div>
                  <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 3 }}>{fmt(s.createdAt)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <CoachAdminPill tone={s.reason === "unsubscribe" ? "slate" : "rose"}>{s.reason}</CoachAdminPill>
                  <UnsuppressButton email={s.email} />
                </div>
              </div>
            )) : <EmptyRow label="No suppressions" />}
          </Card>

        </div>
      </div>
    </div>
  );
}
