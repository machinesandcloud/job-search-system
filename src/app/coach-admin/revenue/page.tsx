import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { getPlanMonthlyAmountCents, getReadablePlanName } from "@/lib/billing";
import { CoachAdminPill } from "@/components/coach-admin-ui";

export const dynamic = "force-dynamic";

function fmt(v?: Date | null, time = false) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", time
    ? { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
    : { month: "short", day: "numeric", year: "numeric" }
  ).format(new Date(v));
}

function dollars(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);
}

function pct(n: number, d: number) {
  if (!d) return "—";
  return `${Math.round((n / d) * 100)}%`;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden", ...style }}>{children}</div>;
}

function CardHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--ca-raise)" }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ca-text)" }}>{title}</span>
      {sub && <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{sub}</span>}
    </div>
  );
}

function TH({ cols, labels }: { cols: string; labels: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, padding: "6px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 8, background: "var(--ca-raise)" }}>
      {labels.map(h => <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>)}
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <div style={{ padding: "16px 14px", fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>{label}</div>;
}

function KpiBlock({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ flex: 1, padding: "16px 18px", borderLeft: "1px solid var(--ca-bd)" }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: color ?? "var(--ca-text)", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

function eventTone(name: string) {
  if (name === "checkout_completed" || name === "topup_completed" || name === "subscription_created") return "emerald" as const;
  if (name === "subscription_canceled" || name === "subscription_payment_failed" || name === "cancel_survey_submitted") return "rose" as const;
  if (name === "trial_will_end" || name === "subscription_upgrade_required") return "gold" as const;
  return "slate" as const;
}

export default async function RevenuePage() {
  await requireCoachAdminSession();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const [
    allSubscriptions,
    accountsThisMonth,
    checkoutsThisMonth,
    canceledThisMonth,
    revenueEvents,
    featureEvents,
    upgradeWalls,
    sessionActivity,
    topupRevenue,
    churnSurveys,
  ] = await Promise.all([
    // All subscriptions with account info
    prisma.subscription.findMany({
      include: { account: { include: { users: { select: { email: true, firstName: true } } } } },
    }),

    // New accounts this month (signups)
    prisma.account.count({ where: { createdAt: { gte: startOfMonth } } }),

    // Checkouts (paid conversions) this month
    prisma.appEvent.count({ where: { eventName: "checkout_completed", createdAt: { gte: startOfMonth } } }),

    // Cancellations this month
    prisma.subscription.count({ where: { canceledAt: { gte: startOfMonth } } }),

    // Recent revenue events for the feed
    prisma.appEvent.findMany({
      where: {
        eventName: { in: ["checkout_completed", "topup_completed", "subscription_canceled", "subscription_payment_failed", "subscription_created", "trial_will_end", "cancel_survey_submitted"] },
        createdAt: { gte: ninetyDaysAgo },
      },
      orderBy: { createdAt: "desc" },
      take: 40,
      include: { user: { select: { email: true } }, account: { select: { name: true } } },
    }),

    // Feature usage breakdown (last 30d)
    prisma.appEvent.groupBy({
      by: ["eventName"],
      where: { eventName: "feature_used", createdAt: { gte: thirtyDaysAgo } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),

    // Upgrade walls hit (last 30d) — these are hot upsell targets
    prisma.appEvent.findMany({
      where: { eventName: "subscription_upgrade_required", createdAt: { gte: thirtyDaysAgo } },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { user: { select: { email: true } } },
    }),

    // Session activity — last session per user
    prisma.coachingSession.groupBy({
      by: ["userId"],
      _count: { id: true },
      _max: { createdAt: true },
    }),

    // Topup revenue this month
    prisma.appEvent.count({ where: { eventName: "topup_completed", createdAt: { gte: startOfMonth } } }),

    // Churn surveys last 30d
    prisma.churnSurvey.groupBy({
      by: ["reason"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      where: { createdAt: { gte: thirtyDaysAgo } },
    }),
  ]);

  // ── MRR calculation ──────────────────────────────────────────────────────────
  type SubRow = typeof allSubscriptions[number];
  const subMrr = (s: SubRow) => getPlanMonthlyAmountCents(s.planName, s.stripePriceId);

  const activeSubs = allSubscriptions.filter((s: SubRow) => s.status === "active");
  const trialSubs = allSubscriptions.filter((s: SubRow) => s.status === "trialing");
  const paymentIssueSubs = allSubscriptions.filter((s: SubRow) => ["past_due", "unpaid"].includes(s.status));

  const mrr = activeSubs.reduce((sum: number, s: SubRow) => sum + subMrr(s), 0);
  const arr = mrr * 12;
  const arpu = activeSubs.length ? Math.round(mrr / activeSubs.length) : 0;

  const newMrrThisMonth = activeSubs
    .filter((s: SubRow) => s.createdAt >= startOfMonth)
    .reduce((sum: number, s: SubRow) => sum + subMrr(s), 0);

  const churnedMrrThisMonth = allSubscriptions
    .filter((s: SubRow) => s.canceledAt && s.canceledAt >= startOfMonth)
    .reduce((sum: number, s: SubRow) => sum + subMrr(s), 0);

  const totalEverTrialed = allSubscriptions.filter((s: SubRow) => s.trialEnd !== null).length;
  const totalConvertedFromTrial = allSubscriptions.filter((s: SubRow) => s.trialEnd !== null && s.status === "active").length;

  // Revenue by plan breakdown
  const planBreakdown = new Map<string, { count: number; mrr: number }>();
  for (const sub of activeSubs) {
    const label = getReadablePlanName(sub.planName, sub.stripePriceId);
    const cents = getPlanMonthlyAmountCents(sub.planName, sub.stripePriceId);
    const existing = planBreakdown.get(label) ?? { count: 0, mrr: 0 };
    planBreakdown.set(label, { count: existing.count + 1, mrr: existing.mrr + cents });
  }
  const planRows = [...planBreakdown.entries()].sort((a, b) => b[1].mrr - a[1].mrr);

  // Feature usage — group by featureName from metadataJson
  const featureUsageThisMonth = await prisma.appEvent.findMany({
    where: { eventName: "feature_used", createdAt: { gte: thirtyDaysAgo } },
    select: { metadataJson: true },
  });
  const featureMap = new Map<string, number>();
  for (const e of featureUsageThisMonth) {
    const meta = e.metadataJson as any;
    const name: string = meta?.featureName || "unknown";
    featureMap.set(name, (featureMap.get(name) ?? 0) + 1);
  }
  const topFeatures = [...featureMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  // Upgrade walls by feature
  const upgradeWallMap = new Map<string, number>();
  for (const e of upgradeWalls) {
    const meta = e.metadataJson as any;
    const name: string = meta?.featureName || "unknown";
    upgradeWallMap.set(name, (upgradeWallMap.get(name) ?? 0) + 1);
  }
  const topWalls = [...upgradeWallMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  // Session activity buckets
  const sessionMap = new Map<string, { count: number; lastAt: Date | null }>();
  for (const s of sessionActivity) {
    sessionMap.set(s.userId, { count: s._count.id, lastAt: s._max.createdAt });
  }
  const activeUsersLast30d = [...sessionMap.values()].filter(s => s.lastAt && s.lastAt >= thirtyDaysAgo).length;
  const activeUsersLast7d = [...sessionMap.values()].filter(s => s.lastAt && s.lastAt >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Page header */}
      <div>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.02em", margin: 0 }}>Revenue</h1>
        <p style={{ fontSize: 12, color: "var(--ca-text3)", margin: "2px 0 0" }}>MRR, conversion, feature adoption, and churn signals</p>
      </div>

      {/* ── KPI strip ────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden" }}>
        <div style={{ flex: 1, padding: "16px 18px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>MRR</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#3B82F6", letterSpacing: "-0.04em", lineHeight: 1 }}>{dollars(mrr)}</div>
          <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 5 }}>ARR {dollars(arr)}</div>
        </div>
        <KpiBlock label="Active" value={String(activeSubs.length)} sub={`${dollars(arpu)} ARPU`} color="#22C55E" />
        <KpiBlock label="Trials" value={String(trialSubs.length)} sub={totalEverTrialed ? `${pct(totalConvertedFromTrial, totalEverTrialed)} ever converted` : undefined} color="#06B6D4" />
        <KpiBlock label="New MRR (mo)" value={dollars(newMrrThisMonth)} sub={`${checkoutsThisMonth} checkout${checkoutsThisMonth !== 1 ? "s" : ""}`} color="#22C55E" />
        <KpiBlock label="Churned MRR (mo)" value={dollars(churnedMrrThisMonth)} sub={`${canceledThisMonth} canceled`} color={churnedMrrThisMonth > 0 ? "#F43F5E" : "var(--ca-text3)"} />
        <KpiBlock label="Net MRR (mo)" value={dollars(newMrrThisMonth - churnedMrrThisMonth)} color={(newMrrThisMonth - churnedMrrThisMonth) >= 0 ? "#22C55E" : "#F43F5E"} />
        <KpiBlock label="Payment issues" value={String(paymentIssueSubs.length)} color={paymentIssueSubs.length > 0 ? "#F59E0B" : "var(--ca-text3)"} />
        <KpiBlock label="DAU 7d / 30d" value={`${activeUsersLast7d} / ${activeUsersLast30d}`} sub="unique users with sessions" />
      </div>

      {/* ── 3-column grid ────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* Revenue by plan */}
        <Card>
          <CardHeader title="Revenue by plan" sub="active subscriptions" />
          <TH cols="1fr 60px 100px" labels={["Plan", "Subs", "MRR"]} />
          {planRows.length ? planRows.map(([plan, { count, mrr: planMrr }], i) => (
            <div key={plan} style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px", padding: "9px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ca-text)" }}>{plan}</span>
              <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>{count}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#3B82F6" }}>{dollars(planMrr)}</span>
            </div>
          )) : <EmptyRow label="No active subscribers yet" />}
          {planRows.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px", padding: "9px 14px", gap: 8, borderTop: "1px solid var(--ca-bd)", background: "var(--ca-raise)", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase" }}>Total</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", textAlign: "center" }}>{activeSubs.length}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#3B82F6" }}>{dollars(mrr)}</span>
            </div>
          )}
        </Card>

        {/* Conversion funnel */}
        <Card>
          <CardHeader title="Conversion funnel" sub="this month" />
          {[
            { label: "New signups", value: accountsThisMonth, color: "var(--ca-text)" },
            { label: "Checkout completed", value: checkoutsThisMonth, color: "#22C55E" },
            { label: "Active today", value: activeSubs.filter((s: { createdAt: Date }) => s.createdAt >= startOfMonth).length, color: "#3B82F6" },
          ].map((row, i) => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ca-text)" }}>{row.label}</div>
                {i > 0 && <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 2 }}>{pct(row.value, accountsThisMonth)} of signups</div>}
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: row.color, letterSpacing: "-0.04em" }}>{row.value}</span>
            </div>
          ))}
          <div style={{ padding: "10px 14px", borderTop: "1px solid var(--ca-bd)", background: "var(--ca-raise)" }}>
            <div style={{ fontSize: 11, color: "var(--ca-text3)" }}>Trial → Paid (all time): <strong style={{ color: "var(--ca-text)" }}>{pct(totalConvertedFromTrial, totalEverTrialed)}</strong> ({totalConvertedFromTrial} / {totalEverTrialed})</div>
          </div>
        </Card>

        {/* Churn reasons */}
        <Card>
          <CardHeader title="Churn reasons" sub="last 30 days" />
          <TH cols="1fr 60px 60px" labels={["Reason", "Count", "Offer ✓"]} />
          {churnSurveys.length ? churnSurveys.map((row: any, i: number) => {
            const offerAccepted = 0; // groupBy doesn't give us offer data easily — shown as 0
            return (
              <div key={row.reason} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px", padding: "8px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                <CoachAdminPill tone={row.reason === "got_job" ? "emerald" : "rose"}>{row.reason}</CoachAdminPill>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text)", textAlign: "center" }}>{row._count.id}</span>
                <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>—</span>
              </div>
            );
          }) : <EmptyRow label="No churn surveys yet" />}
        </Card>

      </div>

      {/* ── 2-column grid ────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* Feature adoption */}
        <Card>
          <CardHeader title="Feature adoption" sub="last 30 days" />
          <TH cols="1fr 70px" labels={["Feature", "Uses"]} />
          {topFeatures.length ? topFeatures.map(([name, count], i) => {
            const max = topFeatures[0][1];
            return (
              <div key={name} style={{ display: "grid", gridTemplateColumns: "1fr 70px", padding: "8px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--ca-text)", fontWeight: 500 }}>{name}</div>
                  <div style={{ height: 3, borderRadius: 2, background: "var(--ca-bd)", marginTop: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 2, background: "#3B82F6", width: `${Math.round((count / max) * 100)}%` }} />
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text3)", textAlign: "right" }}>{count}</span>
              </div>
            );
          }) : <EmptyRow label="No feature events in last 30 days" />}
        </Card>

        {/* Upgrade walls — hot upsell leads */}
        <Card>
          <CardHeader title="Upgrade walls hit" sub="last 30 days — hot upsell targets" />
          <TH cols="1fr 80px" labels={["Feature blocked", "Hits"]} />
          {topWalls.length ? topWalls.map(([name, count], i) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "1fr 80px", padding: "8px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--ca-text)" }}>{name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", textAlign: "right" }}>{count}×</span>
            </div>
          )) : <EmptyRow label="No upgrade walls hit" />}
          {topWalls.length > 0 && (
            <div style={{ padding: "10px 14px", borderTop: "1px solid var(--ca-bd)", background: "var(--ca-raise)" }}>
              <div style={{ fontSize: 11, color: "var(--ca-text3)" }}>These users are hitting plan limits. The upsell sequence should already be targeting them.</div>
            </div>
          )}
        </Card>

      </div>

      {/* ── Revenue event feed ───────────────────────────────────────────── */}
      <Card>
        <CardHeader title="Revenue events" sub="last 90 days" />
        <TH cols="160px 1fr 200px 110px" labels={["Event", "Account / user", "Detail", "Date"]} />
        {revenueEvents.length ? revenueEvents.map((e: any, i: number) => {
          const meta = e.metadataJson as any;
          const label = e.account?.name || e.user?.email || meta?.email || "—";
          const detail = meta?.planName || meta?.amount || meta?.reason || "";
          return (
            <div key={e.id} style={{ display: "grid", gridTemplateColumns: "160px 1fr 200px 110px", padding: "8px 16px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
              <CoachAdminPill tone={eventTone(e.eventName)}>{e.eventName.replace(/_/g, " ")}</CoachAdminPill>
              <span style={{ fontSize: 12, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
              <span style={{ fontSize: 11.5, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{detail}</span>
              <span style={{ fontSize: 11.5, color: "var(--ca-text3)" }}>{fmt(e.createdAt, true)}</span>
            </div>
          );
        }) : <EmptyRow label="No revenue events yet" />}
      </Card>

    </div>
  );
}
