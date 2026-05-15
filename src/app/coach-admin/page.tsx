import Link from "next/link";
import { redirect } from "next/navigation";
import { CoachAdminLoginForm } from "@/components/coach-admin-forms";
import { CoachAdminPill, coachAdminTextPrimaryClass, coachAdminTextMutedClass, coachAdminTextSoftClass, cx } from "@/components/coach-admin-ui";
import { getCoachAdminBetaAutoLoginConfig, getCoachAdminSession } from "@/lib/coach-admin-auth";
import { isDatabaseReady, prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import {
  estimateTrackedTokenCostUsd,
  ensureCoachAdminUser,
  formatUsdEstimate,
  getAiUsageSummary,
  getPlanMonthlyAmountCents,
  isPaymentIssueSubscriptionStatus,
  isPlaceholderCoachAdminEmail,
} from "@/lib/billing";
import { repairPlatformUsersWithoutAccounts } from "@/lib/platform-users";

function fmt(v?: Date | null, time?: boolean) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", time
    ? { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
    : { month: "short", day: "numeric" }
  ).format(new Date(v));
}

function statusTone(status?: string | null) {
  const v = `${status || ""}`.toLowerCase();
  if (v === "active" || v === "trialing") return "emerald" as const;
  if (v === "past_due" || v === "unpaid") return "gold" as const;
  if (v === "canceled" || v === "incomplete_expired") return "rose" as const;
  return "slate" as const;
}

function priorityTone(p?: string | null) {
  const v = `${p || ""}`.toLowerCase();
  if (v === "urgent" || v === "high") return "rose" as const;
  if (v === "medium") return "gold" as const;
  return "cyan" as const;
}

function isInternal(account: any) {
  return Array.isArray(account?.users) && account.users.some((u: any) => u.role === "admin" || u.role === "support");
}

function isPlaceholderInternal(account: any) {
  return isInternal(account) && Array.isArray(account?.users) && account.users.some((u: any) => isPlaceholderCoachAdminEmail(u?.email));
}

function healthLabel(account: any) {
  if (isInternal(account)) return "internal";
  if (!account.subscription) return "no plan";
  const s = `${account.subscription.status || account.status || ""}`.toLowerCase();
  if (s === "trialing") return "trial";
  if (s === "active") return "active";
  if (s === "canceled") return "canceled";
  if (s === "incomplete" || s === "incomplete_expired") return "incomplete";
  if (isPaymentIssueSubscriptionStatus(s)) return "past due";
  return s || "no plan";
}

function planLabel(account: any) {
  if (isInternal(account)) return "Internal";
  return account.subscription?.planName || "—";
}

function SectionHeader({ title, action, count }: { title: string; action?: React.ReactNode; count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>{title}</span>
        {count !== undefined && <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ca-text3)", background: "var(--ca-raise)", border: "1px solid var(--ca-bd)", borderRadius: 99, padding: "0 7px", lineHeight: "18px" }}>{count}</span>}
      </div>
      {action}
    </div>
  );
}

function Card({ children, style, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) {
  return (
    <div id={id} style={{ borderRadius: 16, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return (
    <div style={{ padding: "16px 14px", fontSize: 12.5, color: "var(--ca-text3)", textAlign: "center", borderTop: "1px solid var(--ca-bd)" }}>{label}</div>
  );
}

export default async function CoachAdminPage() {
  const session = await getCoachAdminSession();
  if (!session) {
    if (getCoachAdminBetaAutoLoginConfig()) redirect("/api/coach-admin/beta-login?next=/coach-admin");
    return (
      <div style={{ display: "flex", minHeight: "70vh", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
        <CoachAdminLoginForm />
      </div>
    );
  }

  if (!isDatabaseReady()) {
    return (
      <Card style={{ padding: 24, maxWidth: 640 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text)", marginBottom: 6 }}>Database unavailable</p>
        <p style={{ fontSize: 13, color: "var(--ca-text2)", lineHeight: 1.6 }}>Admin session is live but the billing database is not reachable. Wire <code>DATABASE_URL</code> and apply the Prisma migration to start loading data.</p>
      </Card>
    );
  }

  let subscriptions: any[] = [];
  let accounts: any[] = [];
  let recentTickets: any[] = [];
  let aiUsageSummary = null as Awaited<ReturnType<typeof getAiUsageSummary>>;
  let recentAiRequests: any[] = [];

  try {
    await ensureCoachAdminUser(session.email, session.role);
    await repairPlatformUsersWithoutAccounts();

    [subscriptions, accounts, recentTickets, aiUsageSummary, recentAiRequests] = await Promise.all([
      prisma.subscription.findMany({ include: { account: { include: { users: true } } }, orderBy: { updatedAt: "desc" } }),
      prisma.account.findMany({ include: { users: true, subscription: true }, orderBy: { createdAt: "desc" }, take: 30 }),
      prisma.supportTicket.findMany({ include: { account: true, reporter: true, assignedTo: true }, orderBy: { updatedAt: "desc" }, take: 20 }),
      getAiUsageSummary({ limit: 10 }),
      prisma.aiTokenUsage.findMany({
        orderBy: { createdAt: "desc" }, take: 20,
        select: { id: true, createdAt: true, model: true, featureName: true, inputTokens: true, outputTokens: true, totalTokens: true, metadataJson: true, user: { select: { email: true } }, account: { select: { id: true, name: true } } },
      }),
    ]);
  } catch (err) {
    console.error("[coach-admin-page] failed to load data", err);
    return (
      <Card style={{ padding: 24, maxWidth: 640 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text)", marginBottom: 6 }}>Data load failed</p>
        <p style={{ fontSize: 13, color: "var(--ca-text2)", lineHeight: 1.6 }}>The billing tables are likely unreachable or a migration is missing. Auth is working fine.</p>
      </Card>
    );
  }

  const activeCount     = subscriptions.filter((s: any) => s.status === "active").length;
  const trialingCount   = subscriptions.filter((s: any) => s.status === "trialing").length;
  const pastDueCount    = subscriptions.filter((s: any) => s.status === "past_due" || s.status === "unpaid").length;
  const canceledCount   = subscriptions.filter((s: any) => s.status === "canceled").length;
  const failedCount     = subscriptions.filter((s: any) => isPaymentIssueSubscriptionStatus(s.status)).length;
  const mrrCents        = subscriptions.filter((s: any) => s.status === "active" || s.status === "trialing").reduce((sum: number, s: any) => sum + getPlanMonthlyAmountCents(s.planName, s.stripePriceId), 0);
  const upcomingRenew   = subscriptions.filter((s: any) => { if (!s.currentPeriodEnd) return false; const d = (new Date(s.currentPeriodEnd).getTime() - Date.now()) / 86400000; return d >= 0 && d <= 14 && (s.status === "active" || s.status === "trialing"); }).length;
  const estimatedSpend  = aiUsageSummary?.total.estimatedCostUsd || 0;
  const totalTokens     = aiUsageSummary?.total.totalTokens || 0;
  const trackedUsers    = aiUsageSummary?.total.trackedUsers || 0;
  const topAiUsers      = aiUsageSummary?.byUser || [];
  const visibleAccounts = accounts.filter((a: any) => !isPlaceholderInternal(a));
  const riskAccounts    = accounts.filter((a: any) => { const s = a.subscription?.status || a.status; return isPaymentIssueSubscriptionStatus(s) || s === "canceled" || s === "incomplete_expired"; });
  const openTickets     = recentTickets.filter((t: any) => t.status !== "resolved" && t.status !== "closed");
  const subMax          = Math.max(activeCount, trialingCount, pastDueCount, canceledCount, 1);

  const kpis = [
    { label: "MRR",           value: formatCurrency(mrrCents / 100),            color: "#22C55E" },
    { label: "ARR",           value: formatCurrency(mrrCents / 100 * 12),        color: "#22C55E" },
    { label: "Active",        value: activeCount,                                color: "#3B82F6" },
    { label: "Trialing",      value: trialingCount,                              color: "#06B6D4" },
    { label: "At risk",       value: failedCount,                                color: failedCount > 0 ? "#F59E0B" : "var(--ca-text3)" },
    { label: "AI spend",      value: formatUsdEstimate(estimatedSpend),          color: "#8B5CF6" },
    { label: "Tokens",        value: totalTokens.toLocaleString(),               color: "var(--ca-text2)" },
    { label: "Renewing soon", value: upcomingRenew,                              color: upcomingRenew > 0 ? "#F59E0B" : "var(--ca-text3)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── KPI Strip ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 8 }}>
        {kpis.map(k => (
          <Card key={k.label} style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ca-text3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>{k.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: k.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{k.value}</div>
          </Card>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Accounts table */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionHeader title="Accounts" count={visibleAccounts.length} />
              <Link href="/coach-admin/accounts" style={{ fontSize: 11.5, fontWeight: 600, color: "#3B82F6", textDecoration: "none" }}>View all →</Link>
            </div>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 120px 80px 80px 36px", padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
              {["Account", "Status", "Owner", "Plan", "Renews", ""].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>
            {visibleAccounts.length ? visibleAccounts.slice(0, 12).map((account: any, i: number) => {
              const owner = account.users.find((u: any) => u.id === account.ownerUserId) || account.users[0];
              const hl = healthLabel(account);
              const tone = isInternal(account) ? "brand" : statusTone(account.subscription?.status || account.status);
              return (
                <Link key={account.id} href={`/coach-admin/accounts/${account.id}`} style={{ display: "grid", gridTemplateColumns: "1fr 90px 120px 80px 80px 36px", padding: "9px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", textDecoration: "none", transition: "background 0.1s", alignItems: "center" }}
                  className="coach-admin-row-hover">
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{account.name}</span>
                  <span><CoachAdminPill tone={tone}>{hl}</CoachAdminPill></span>
                  <span style={{ fontSize: 12, color: "var(--ca-text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{owner?.email?.split("@")[0] || "—"}</span>
                  <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{planLabel(account)}</span>
                  <span style={{ fontSize: 12, color: "var(--ca-text3)" }}>{fmt(account.subscription?.currentPeriodEnd)}</span>
                  <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "right" }}>→</span>
                </Link>
              );
            }) : <EmptyRow label="No accounts yet" />}
          </Card>

          {/* AI Usage per user */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionHeader title="AI Usage" count={trackedUsers} />
              <Link href="/coach-admin#ai-usage" style={{ fontSize: 11.5, fontWeight: 600, color: "#8B5CF6", textDecoration: "none" }}>{formatUsdEstimate(estimatedSpend)} total</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 90px 90px", padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
              {["User", "Requests", "Tokens", "Spend", "Top feature"].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>
            {topAiUsers.length ? topAiUsers.map((user, i) => (
              <div key={user.userId || user.email} style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 90px 90px", padding: "9px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
                <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{user.requestCount.toLocaleString()}</span>
                <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{user.totalTokens.toLocaleString()}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#8B5CF6" }}>{formatUsdEstimate(user.estimatedCostUsd)}</span>
                <span style={{ fontSize: 11, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.topFeature || "—"}</span>
              </div>
            )) : <EmptyRow label="No AI usage tracked yet" />}
          </Card>

          {/* Recent AI calls */}
          <Card id="ai-usage">
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)" }}>
              <SectionHeader title="Recent model calls" count={recentAiRequests.length} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 120px 60px 70px 80px", padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
              {["Feature", "User / Account", "Model", "Tokens", "Cost", "Time"].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>
            {recentAiRequests.length ? recentAiRequests.map((entry: any, i: number) => {
              const cost = estimateTrackedTokenCostUsd({ model: entry.model, inputTokens: entry.inputTokens, outputTokens: entry.outputTokens, totalTokens: entry.totalTokens });
              return (
                <div key={entry.id} style={{ display: "grid", gridTemplateColumns: "130px 1fr 120px 60px 70px 80px", padding: "8px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.featureName || "llm_request"}</span>
                  <span style={{ fontSize: 11.5, color: "var(--ca-text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.user?.email || "—"}{entry.account?.name ? ` · ${entry.account.name}` : ""}</span>
                  <span style={{ fontSize: 11, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.model}</span>
                  <span style={{ fontSize: 11.5, color: "var(--ca-text2)" }}>{entry.totalTokens.toLocaleString()}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "#8B5CF6" }}>{formatUsdEstimate(cost.estimatedCostUsd)}</span>
                  <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{fmt(entry.createdAt, true)}</span>
                </div>
              );
            }) : <EmptyRow label="No model calls recorded yet" />}
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Subscription mix */}
          <Card style={{ padding: "14px" }}>
            <SectionHeader title="Subscription mix" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[
                { label: "Active",    value: activeCount,   color: "#22C55E", bg: "rgba(34,197,94,0.08)" },
                { label: "Trialing",  value: trialingCount, color: "#06B6D4", bg: "rgba(6,182,212,0.08)" },
                { label: "Past due",  value: pastDueCount,  color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
                { label: "Canceled",  value: canceledCount, color: "#F43F5E", bg: "rgba(244,63,94,0.08)" },
              ].map(s => (
                <div key={s.label} style={{ borderRadius: 10, border: "1px solid var(--ca-bd)", background: s.bg, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</div>
                </div>
              ))}
            </div>
            {/* Progress bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                { label: "Active",   value: activeCount,   color: "#22C55E" },
                { label: "Trialing", value: trialingCount, color: "#06B6D4" },
                { label: "Past due", value: pastDueCount,  color: "#F59E0B" },
                { label: "Canceled", value: canceledCount, color: "#F43F5E" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ca-text3)", marginBottom: 3 }}>
                    <span>{s.label}</span><span>{s.value}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 99, background: "var(--ca-raise)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.max(4, Math.round((s.value / subMax) * 100))}%`, borderRadius: 99, background: s.color, transition: "width 0.3s" }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Quick stats */}
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ borderRadius: 10, border: "1px solid var(--ca-bd)", padding: "9px 11px" }}>
                <div style={{ fontSize: 10, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Failed payments</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: failedCount > 0 ? "#F59E0B" : "var(--ca-text3)", letterSpacing: "-0.04em" }}>{failedCount}</div>
              </div>
              <div style={{ borderRadius: 10, border: "1px solid var(--ca-bd)", padding: "9px 11px" }}>
                <div style={{ fontSize: 10, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Renewing ≤14d</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: upcomingRenew > 0 ? "#F59E0B" : "var(--ca-text3)", letterSpacing: "-0.04em" }}>{upcomingRenew}</div>
              </div>
            </div>
          </Card>

          {/* Support queue */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionHeader title="Support queue" count={openTickets.length} />
              <Link href="/coach-admin/tickets" style={{ fontSize: 11.5, fontWeight: 600, color: "#06B6D4", textDecoration: "none" }}>All →</Link>
            </div>
            {openTickets.length ? openTickets.slice(0, 8).map((ticket: any, i: number) => (
              <Link key={ticket.id} href={`/coach-admin/tickets/${ticket.id}`} style={{ display: "block", padding: "10px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", textDecoration: "none", transition: "background 0.1s" }} className="coach-admin-row-hover">
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ca-text)", lineHeight: 1.35, flex: 1 }}>{ticket.subject}</span>
                  <CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill>
                </div>
                <div style={{ fontSize: 11, color: "var(--ca-text3)" }}>
                  {ticket.account?.name || "Unknown"} · {fmt(ticket.updatedAt)}
                </div>
              </Link>
            )) : <EmptyRow label="No open tickets" />}
          </Card>

          {/* Risk radar */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)" }}>
              <SectionHeader title="Risk radar" count={riskAccounts.length} />
            </div>
            {riskAccounts.length ? riskAccounts.slice(0, 6).map((account: any, i: number) => (
              <Link key={account.id} href={`/coach-admin/accounts/${account.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", textDecoration: "none", transition: "background 0.1s" }} className="coach-admin-row-hover">
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{account.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 2 }}>{healthLabel(account)}</div>
                </div>
                <CoachAdminPill tone={statusTone(account.subscription?.status || account.status)}>{healthLabel(account)}</CoachAdminPill>
              </Link>
            )) : <EmptyRow label="No payment risks detected" />}
          </Card>

        </div>
      </div>
    </div>
  );
}
