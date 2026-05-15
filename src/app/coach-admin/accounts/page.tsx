import Link from "next/link";
import { CoachAdminPill } from "@/components/coach-admin-ui";
import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { getReadablePlanName, getPlanIncludedMonthlyCredits, isPaymentIssueSubscriptionStatus } from "@/lib/billing";

function statusTone(s?: string | null) {
  const v = `${s || ""}`.toLowerCase();
  if (v === "active" || v === "trialing") return "emerald" as const;
  if (v === "past_due" || v === "unpaid") return "gold" as const;
  if (v === "canceled" || v === "incomplete_expired") return "rose" as const;
  return "slate" as const;
}

function statusLabel(s?: string | null) {
  if (!s) return "no plan";
  return s.replace(/_/g, " ");
}

function fmt(v?: Date | null) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(v));
}

export default async function AccountsPage({ searchParams }: { searchParams: Promise<{ q?: string; filter?: string }> }) {
  await requireCoachAdminSession();
  const { q = "", filter = "all" } = await searchParams;
  const query = q.trim().toLowerCase();

  const accounts = await prisma.account.findMany({
    include: {
      users: { select: { id: true, email: true, firstName: true, lastName: true, role: true } },
      subscription: { select: { status: true, planName: true, stripePriceId: true, currentPeriodEnd: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  type AccountRow = (typeof accounts)[number];
  let filtered: AccountRow[] = accounts;
  if (query) {
    filtered = filtered.filter((a: AccountRow) => {
      const name = a.name?.toLowerCase() ?? "";
      const emails = a.users.map((u: AccountRow["users"][number]) => u.email.toLowerCase()).join(" ");
      const plan = a.subscription ? getReadablePlanName(a.subscription.planName, a.subscription.stripePriceId).toLowerCase() : "";
      return name.includes(query) || emails.includes(query) || plan.includes(query);
    });
  }
  if (filter === "active")   filtered = filtered.filter((a: AccountRow) => a.subscription?.status === "active" || a.subscription?.status === "trialing");
  if (filter === "issues")   filtered = filtered.filter((a: AccountRow) => isPaymentIssueSubscriptionStatus(a.subscription?.status ?? ""));
  if (filter === "canceled") filtered = filtered.filter((a: AccountRow) => a.subscription?.status === "canceled");
  if (filter === "no-plan")  filtered = filtered.filter((a: AccountRow) => !a.subscription);

  const activeCount   = accounts.filter((a: AccountRow) => a.subscription?.status === "active").length;
  const trialCount    = accounts.filter((a: AccountRow) => a.subscription?.status === "trialing").length;
  const issueCount    = accounts.filter((a: AccountRow) => isPaymentIssueSubscriptionStatus(a.subscription?.status ?? "")).length;
  const noPlanCount   = accounts.filter((a: AccountRow) => !a.subscription).length;

  const filterOptions = [
    { key: "all",      label: `All (${accounts.length})` },
    { key: "active",   label: `Active / Trial (${activeCount + trialCount})` },
    { key: "issues",   label: `Payment issues (${issueCount})` },
    { key: "canceled", label: "Canceled" },
    { key: "no-plan",  label: `No plan (${noPlanCount})` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Header bar: search + filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <form method="GET" style={{ flex: 1, minWidth: 240, maxWidth: 360 }}>
          <input name="q" defaultValue={q}
            placeholder="Search name, email, or plan…"
            style={{ width: "100%", boxSizing: "border-box", fontSize: 12.5, fontWeight: 500, padding: "7px 12px", borderRadius: 9, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", color: "var(--ca-text)", outline: "none", fontFamily: "inherit" }}
          />
        </form>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {filterOptions.map(f => {
            const active = filter === f.key;
            return (
              <Link key={f.key}
                href={f.key === "all" ? "/coach-admin/accounts" : `/coach-admin/accounts?filter=${f.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                style={{
                  display: "inline-flex", alignItems: "center", padding: "4px 11px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                  border: active ? "1px solid rgba(59,130,246,0.4)" : "1px solid var(--ca-bd)",
                  background: active ? "rgba(59,130,246,0.14)" : "transparent",
                  color: active ? "#3B82F6" : "var(--ca-text2)",
                  textDecoration: "none", transition: "all 0.12s",
                }}>
                {f.label}
              </Link>
            );
          })}
        </div>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--ca-text3)", flexShrink: 0 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div style={{ borderRadius: 14, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "36px 1fr 110px 90px 120px 100px 28px", padding: "8px 16px", borderBottom: "1px solid var(--ca-bd)", gap: 10, background: "var(--ca-raise)" }}>
          {["", "Account / Owner", "Status", "Plan", "Credits / mo", "Renewal", ""].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
          ))}
        </div>

        {filtered.length ? filtered.map((account: AccountRow, i: number) => {
          const owner = account.users.find((u: AccountRow["users"][number]) => u.id === (account as any).ownerUserId) || account.users[0];
          const plan = account.subscription ? getReadablePlanName(account.subscription.planName, account.subscription.stripePriceId) : "—";
          const credits = account.subscription ? getPlanIncludedMonthlyCredits(account.subscription.planName, account.subscription.stripePriceId) : null;
          const initial = (owner?.firstName?.[0] ?? owner?.email?.[0] ?? "?").toUpperCase();
          const isOperator = account.users.some((u: AccountRow["users"][number]) => u.role === "admin" || u.role === "support");
          const tone = isOperator ? "brand" as const : statusTone(account.subscription?.status);

          return (
            <Link key={account.id} href={`/coach-admin/accounts/${account.id}`}
              style={{
                display: "grid", gridTemplateColumns: "36px 1fr 110px 90px 120px 100px 28px",
                padding: "10px 16px", gap: 10, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none",
                textDecoration: "none", transition: "background 0.1s", alignItems: "center",
              }}
              className="coach-admin-row-hover">
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,rgba(67,97,238,0.2),rgba(6,182,212,0.12))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#7B9EFF", flexShrink: 0 }}>{initial}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{account.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--ca-text3)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{owner?.email ?? "—"}</div>
              </div>
              <span><CoachAdminPill tone={tone}>{isOperator ? "internal" : statusLabel(account.subscription?.status)}</CoachAdminPill></span>
              <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{plan}</span>
              <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{credits ? credits.toLocaleString() : "—"}</span>
              <span style={{ fontSize: 11.5, color: "var(--ca-text3)" }}>{fmt(account.subscription?.currentPeriodEnd)}</span>
              <span style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "right" }}>→</span>
            </Link>
          );
        }) : (
          <div style={{ padding: "20px 16px", fontSize: 13, color: "var(--ca-text3)", textAlign: "center" }}>
            {query ? `No accounts match "${q}"` : "No accounts yet"}
          </div>
        )}
      </div>
    </div>
  );
}
