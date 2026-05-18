import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { CoachAdminGrantModal } from "@/components/coach-admin-grants";

function fmt(v?: Date | null) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(v));
}

function StatusPill({ status }: { status: string }) {
  let color = "var(--ca-text3)";
  let bg    = "var(--ca-raise)";
  let bd    = "var(--ca-bd)";
  if (status === "active" || status === "trialing") {
    color = "#22C55E"; bg = "rgba(34,197,94,0.12)"; bd = "rgba(34,197,94,0.3)";
  } else if (status === "canceled") {
    color = "#EF4444"; bg = "rgba(239,68,68,0.12)"; bd = "rgba(239,68,68,0.3)";
  } else if (status === "past_due" || status === "unpaid") {
    color = "#F59E0B"; bg = "rgba(245,158,11,0.12)"; bd = "rgba(245,158,11,0.3)";
  }
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: bg, color, border: `1px solid ${bd}`, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

export default async function GrantsPage() {
  await requireCoachAdminSession();

  const [accounts, grantEvents] = await Promise.all([
    prisma.account.findMany({
      where: { subscription: { isNot: null } },
      include: {
        ownerUser: { select: { id: true, email: true, firstName: true, lastName: true } },
        subscription: { select: { stripeSubscriptionId: true, status: true, planName: true, currentPeriodEnd: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.appEvent.findMany({
      where: { eventName: "admin_credit_granted" },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const lastGrantByAccount = new Map<string, typeof grantEvents[number]>();
  for (const e of grantEvents) {
    if (e.accountId && !lastGrantByAccount.has(e.accountId)) {
      lastGrantByAccount.set(e.accountId, e);
    }
  }

  const COLS = "1fr 120px 110px 120px 1fr";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Page header */}
      <div>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.02em", margin: 0 }}>Grants &amp; Credits</h1>
        <p style={{ fontSize: 12.5, color: "var(--ca-text3)", marginTop: 4, margin: 0 }}>
          Grant free months or apply a discount to any account. User is notified automatically by email.
        </p>
      </div>

      {/* Accounts table */}
      <div style={{ borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden" }}>
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: COLS, padding: "8px 16px", borderBottom: "1px solid var(--ca-bd)", gap: 12 }}>
          {["Account", "Plan", "Status", "Renews", "Last grant"].map((h) => (
            <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
          ))}
        </div>

        {accounts.length === 0 && (
          <div style={{ padding: "20px 16px", fontSize: 12.5, color: "var(--ca-text3)", textAlign: "center" }}>No accounts yet.</div>
        )}

        {accounts.map((account: typeof accounts[0], i: number) => {
          const sub = account.subscription!;
          const lastGrant = lastGrantByAccount.get(account.id);
          const meta = lastGrant?.metadataJson as Record<string, unknown> | null;
          const name = [account.ownerUser.firstName, account.ownerUser.lastName].filter(Boolean).join(" ") || account.ownerUser.email;
          return (
            <div
              key={account.id}
              style={{ display: "grid", gridTemplateColumns: COLS, padding: "11px 16px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center", gap: 12 }}
            >
              {/* Account */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {name}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>
                  {account.ownerUser.email}
                </div>
              </div>

              {/* Plan */}
              <span style={{ fontSize: 12.5, color: "var(--ca-text2)" }}>{sub.planName ?? "—"}</span>

              {/* Status */}
              <StatusPill status={sub.status} />

              {/* Renews */}
              <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{fmt(sub.currentPeriodEnd)}</span>

              {/* Last grant + Grant button */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                {lastGrant ? (
                  <span style={{ fontSize: 11.5, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {meta?.type === "discount"
                      ? `${meta.discountPct}% off ${meta.discountMonths}mo`
                      : `+${meta?.months}mo`
                    } · {fmt(lastGrant.createdAt)}
                  </span>
                ) : (
                  <span style={{ fontSize: 11.5, color: "var(--ca-text3)", flex: 1 }}>—</span>
                )}
                <CoachAdminGrantModal
                  accountId={account.id}
                  userName={name || account.ownerUser.email}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grant history */}
      {grantEvents.length > 0 && (
        <div style={{ borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden" }}>
          <div style={{ padding: "11px 16px", borderBottom: "1px solid var(--ca-bd)" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>
              Grant history
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ca-text3)", background: "var(--ca-raise)", border: "1px solid var(--ca-bd)", borderRadius: 99, padding: "0 7px", lineHeight: "18px", marginLeft: 8 }}>
              {grantEvents.length}
            </span>
          </div>

          {grantEvents.map((e: typeof grantEvents[0], i: number) => {
            const meta = e.metadataJson as Record<string, unknown> | null;
            const account = accounts.find((a: typeof accounts[0]) => a.id === e.accountId);
            const label = meta?.type === "discount"
              ? `${meta.discountPct}% off for ${meta.discountMonths} month${Number(meta.discountMonths) > 1 ? "s" : ""}`
              : `${meta?.months} free month${Number(meta?.months) > 1 ? "s" : ""}`;
            return (
              <div
                key={e.id}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", gap: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {account?.ownerUser.email ?? e.accountId}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--ca-text2)", flexShrink: 0 }}>{label}</span>
                  {meta?.reason ? (
                    <span style={{ fontSize: 11.5, color: "var(--ca-text3)", flexShrink: 0 }}>· {String(meta.reason)}</span>
                  ) : null}
                </div>
                <span style={{ fontSize: 11.5, color: "var(--ca-text3)", whiteSpace: "nowrap", flexShrink: 0 }}>
                  by {String(meta?.grantedBy ?? "admin")} · {fmt(e.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
