import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { CoachAdminGrantModal } from "@/components/coach-admin-grants";

function fmt(v?: Date | null) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(v));
}

function statusColor(status: string) {
  if (status === "active" || status === "trialing") return { bg: "#DCFCE7", color: "#166534" };
  if (status === "past_due" || status === "unpaid") return { bg: "#FEF9C3", color: "#854D0E" };
  if (status === "canceled") return { bg: "#FEE2E2", color: "#991B1B" };
  return { bg: "#F1F5F9", color: "#475569" };
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

  // Build a map of accountId → last grant for quick lookup
  const lastGrantByAccount = new Map<string, typeof grantEvents[number]>();
  for (const e of grantEvents) {
    if (e.accountId && !lastGrantByAccount.has(e.accountId)) {
      lastGrantByAccount.set(e.accountId, e);
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--ca-text, #0F172A)", marginBottom: 4 }}>Grants &amp; Credits</h1>
      <p style={{ fontSize: 14, color: "var(--ca-text3, #64748B)", marginBottom: 32 }}>
        Grant free months or apply a discount to any account. User is notified automatically by email.
      </p>

      {/* ── Accounts table ── */}
      <div style={{ background: "var(--ca-surface, #fff)", border: "1px solid var(--ca-bd, #E2E8F0)", borderRadius: 12, overflow: "hidden", marginBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 120px 130px 140px", padding: "10px 16px", borderBottom: "1px solid var(--ca-bd, #E2E8F0)", fontSize: 11, fontWeight: 700, color: "var(--ca-text3, #64748B)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <span>Account</span>
          <span>Plan</span>
          <span>Status</span>
          <span>Renews</span>
          <span>Last grant</span>
        </div>
        {accounts.map((account: typeof accounts[0]) => {
          const sub = account.subscription!;
          const sc = statusColor(sub.status);
          const lastGrant = lastGrantByAccount.get(account.id);
          const meta = lastGrant?.metadataJson as Record<string, unknown> | null;
          return (
            <div key={account.id} style={{ display: "grid", gridTemplateColumns: "1fr 160px 120px 130px 140px", padding: "12px 16px", borderBottom: "1px solid var(--ca-bd, #E2E8F0)", alignItems: "center", gap: 8 }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13.5, color: "var(--ca-text, #0F172A)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {account.ownerUser.firstName} {account.ownerUser.lastName}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "var(--ca-text3, #64748B)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {account.ownerUser.email}
                </p>
              </div>
              <span style={{ fontSize: 13, color: "var(--ca-text2, #334155)" }}>{sub.planName ?? "—"}</span>
              <span style={{ display: "inline-flex" }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: sc.bg, color: sc.color }}>
                  {sub.status}
                </span>
              </span>
              <span style={{ fontSize: 13, color: "var(--ca-text2, #334155)" }}>{fmt(sub.currentPeriodEnd)}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {lastGrant ? (
                  <span style={{ fontSize: 11, color: "var(--ca-text3, #64748B)" }}>
                    {meta?.type === "discount"
                      ? `${meta.discountPct}% off ${meta.discountMonths}mo`
                      : `+${meta?.months}mo`
                    } · {fmt(lastGrant.createdAt)}
                  </span>
                ) : (
                  <span style={{ fontSize: 11, color: "var(--ca-text3, #64748B)" }}>—</span>
                )}
                <CoachAdminGrantModal accountId={account.id} userName={`${account.ownerUser.firstName ?? ""} ${account.ownerUser.lastName ?? ""}`.trim() || account.ownerUser.email} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Grant history ── */}
      {grantEvents.length > 0 && (
        <section>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text3, #64748B)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Grant history ({grantEvents.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {grantEvents.map((e: typeof grantEvents[0]) => {
              const meta = e.metadataJson as Record<string, unknown> | null;
              const account = accounts.find((a: typeof accounts[0]) => a.id === e.accountId);
              const label = meta?.type === "discount"
                ? `${meta.discountPct}% off for ${meta.discountMonths} month${Number(meta.discountMonths) > 1 ? "s" : ""}`
                : `${meta?.months} free month${Number(meta?.months) > 1 ? "s" : ""}`;
              return (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--ca-surface, #fff)", border: "1px solid var(--ca-bd, #E2E8F0)", borderRadius: 8, gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ca-text, #0F172A)" }}>
                      {account?.ownerUser.email ?? e.accountId}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--ca-text3, #64748B)", marginLeft: 10 }}>{label}</span>
                    {meta?.reason ? <span style={{ fontSize: 12, color: "var(--ca-text3, #64748B)", marginLeft: 8 }}>· {String(meta.reason)}</span> : null}
                  </div>
                  <span style={{ fontSize: 12, color: "var(--ca-text3, #64748B)", whiteSpace: "nowrap" }}>
                    by {String(meta?.grantedBy ?? "admin")} · {fmt(e.createdAt)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
