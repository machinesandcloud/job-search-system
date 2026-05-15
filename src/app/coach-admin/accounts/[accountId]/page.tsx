import Link from "next/link";
import { notFound } from "next/navigation";
import { CoachAdminCancelSubscriptionButton, CoachAdminNoteForm, SupportTicketCreateForm } from "@/components/coach-admin-forms";
import { CoachAdminPill } from "@/components/coach-admin-ui";
import {
  estimateTrackedTokenCostUsd, formatUsdEstimate, getAiUsageSummary,
  getCurrentPeriodTokenUsage, getPlanIncludedMonthlyCredits,
  getPlanMonthlyAmountCents, getReadablePlanName, isPaymentIssueSubscriptionStatus,
} from "@/lib/billing";
import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

function fmt(v?: Date | null, time?: boolean) {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", time
    ? { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }
    : { month: "short", day: "numeric", year: "numeric" }
  ).format(new Date(v));
}

function statusTone(v?: string | null) {
  const s = `${v || ""}`.toLowerCase();
  if (s === "active" || s === "trialing" || s === "resolved") return "emerald" as const;
  if (s === "past_due" || s === "unpaid" || s === "in_progress") return "gold" as const;
  if (s === "canceled" || s === "closed") return "rose" as const;
  return "slate" as const;
}

function priorityTone(p?: string | null) {
  const v = `${p || ""}`.toLowerCase();
  if (v === "urgent" || v === "high") return "rose" as const;
  if (v === "medium") return "gold" as const;
  return "cyan" as const;
}

function isOperatorRole(role?: string | null) {
  return role === "admin" || role === "support";
}

function getMeta(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {} as Record<string, unknown>;
  return value as Record<string, unknown>;
}

type FeatureEntry = { id: string; createdAt: Date; model: string; featureName: string | null; inputTokens: number; outputTokens: number; totalTokens: number; metadataJson: unknown; user: { email: string } | null };
type Props = { params: Promise<{ accountId: string }>; searchParams: Promise<{ callsPage?: string }> };

function SectionLabel({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)" }}>{title}</span>
      {sub && <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{sub}</span>}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ borderRadius: 14, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden", ...style }}>{children}</div>;
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--ca-bd)" }}>
      <span style={{ fontSize: 11.5, color: "var(--ca-text3)", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ca-text2)", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <div style={{ padding: "16px", fontSize: 12.5, color: "var(--ca-text3)", textAlign: "center" }}>{label}</div>;
}

export default async function CoachAdminAccountPage({ params, searchParams }: Props) {
  const session = await requireCoachAdminSession("support");
  const { accountId } = await params;
  const { callsPage } = await searchParams;
  const pageIdx = Math.max(0, parseInt(callsPage ?? "0", 10) || 0);
  const PER_PAGE = 15;

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    include: { ownerUser: true, users: true, subscription: true },
  });
  if (!account) notFound();

  const periodStart = account.subscription?.currentPeriodStart || undefined;
  const periodEnd   = account.subscription?.currentPeriodEnd   || undefined;

  const [tickets, events, adminNotes, tokenUsage, tokenEntries, aiUsageSummary] = await Promise.all([
    prisma.supportTicket.findMany({ where: { accountId }, include: { reporter: true, assignedTo: true }, orderBy: { updatedAt: "desc" }, take: 20 }),
    prisma.appEvent.findMany({ where: { accountId }, include: { user: true }, orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.adminNote.findMany({ where: { accountId, supportTicketId: null }, include: { author: true }, orderBy: { createdAt: "desc" }, take: 20 }),
    getCurrentPeriodTokenUsage(accountId),
    prisma.aiTokenUsage.findMany({
      where: { accountId, ...(periodStart ? { createdAt: { gte: periodStart, lte: periodEnd } } : {}) },
      orderBy: { createdAt: "desc" }, take: 200,
      select: { id: true, createdAt: true, model: true, featureName: true, inputTokens: true, outputTokens: true, totalTokens: true, metadataJson: true, user: { select: { email: true } } },
    }),
    getAiUsageSummary({ accountId, from: periodStart, to: periodEnd, limit: 20 }),
  ]);

  const featureMap = tokenEntries.reduce((m: Map<string, number>, e: FeatureEntry) => {
    const k = e.featureName || "unlabeled";
    m.set(k, (m.get(k) || 0) + e.totalTokens);
    return m;
  }, new Map<string, number>());
  const featureUsage = [...featureMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const featureMax = featureUsage[0]?.[1] || 1;

  const subscription    = account.subscription;
  const planAmount      = subscription ? getPlanMonthlyAmountCents(subscription.planName, subscription.stripePriceId) : 0;
  const planCredits     = subscription ? getPlanIncludedMonthlyCredits(subscription.planName, subscription.stripePriceId) : null;
  const planLabel       = subscription ? getReadablePlanName(subscription.planName, subscription.stripePriceId) : "No subscription";
  const estimatedSpend  = aiUsageSummary?.total.estimatedCostUsd || 0;
  const userUsage       = aiUsageSummary?.byUser || [];
  const isInternal      = account.users.some((u: typeof account.users[number]) => isOperatorRole(u.role));
  const canCancel       = session.role === "admin" && !isInternal && Boolean(subscription?.stripeSubscriptionId) && subscription?.status !== "canceled";
  const hasPayIssue     = subscription ? isPaymentIssueSubscriptionStatus(subscription.status) : account.paymentIssue;
  const openTickets     = tickets.filter((t: typeof tickets[number]) => t.status !== "resolved" && t.status !== "closed").length;
  const creditPct       = tokenUsage && planCredits && planCredits > 0 ? Math.min(100, Math.round(((tokenUsage.usedCredits ?? 0) / planCredits) * 100)) : 0;

  const pagedEntries = (tokenEntries as FeatureEntry[]).slice(pageIdx * PER_PAGE, (pageIdx + 1) * PER_PAGE);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <Link href="/coach-admin/accounts" style={{ fontSize: 12, color: "var(--ca-text3)", textDecoration: "none" }}>← Accounts</Link>
        <span style={{ color: "var(--ca-bd)" }}>/</span>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ca-text)" }}>{account.name}</span>
        <CoachAdminPill tone={isInternal ? "brand" : statusTone(subscription?.status || account.status)}>
          {isInternal ? "internal" : (subscription?.status || account.status || "no plan")}
        </CoachAdminPill>
        {subscription?.cancelAtPeriodEnd && <CoachAdminPill tone="gold">Cancels at period end</CoachAdminPill>}
        {hasPayIssue && <CoachAdminPill tone="gold">Payment issue</CoachAdminPill>}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {canCancel && <CoachAdminCancelSubscriptionButton accountId={accountId} />}
        </div>
      </div>

      {/* ── KPI strip ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {[
          { label: "MRR estimate",   value: planAmount ? formatCurrency(planAmount / 100) : "$0",            color: "#22C55E" },
          { label: "Credits used",   value: tokenUsage ? `${(tokenUsage.usedCredits ?? 0).toLocaleString()} / ${planCredits ? planCredits.toLocaleString() : "∞"}` : "0", color: "#3B82F6" },
          { label: "Open tickets",   value: openTickets,                                                      color: openTickets > 0 ? "#F59E0B" : "var(--ca-text3)" },
          { label: "AI spend",       value: formatUsdEstimate(estimatedSpend),                                color: "#8B5CF6" },
        ].map(k => (
          <Card key={k.label} style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{k.value}</div>
          </Card>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" }}>

        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Members */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionLabel title="Members" sub={`${account.users.length} seat${account.users.length !== 1 ? "s" : ""}`} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 90px 90px", padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 10 }}>
              {["User", "Requests", "Tokens", "Spend", "Top feature"].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>
            {account.users.map((user: typeof account.users[number], i: number) => {
              const usage = userUsage.find(e => e.userId === user.id);
              const isOwner = user.id === account.ownerUserId;
              return (
                <div key={user.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 90px 90px", padding: "9px 14px", gap: 10, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ca-text)" }}>{user.email}</span>
                    {isOwner && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: "#06B6D4", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 99, padding: "0 6px" }}>owner</span>}
                    {isOperatorRole(user.role) && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: "#3B82F6", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 99, padding: "0 6px" }}>{user.role}</span>}
                  </div>
                  <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{usage?.requestCount.toLocaleString() || "0"}</span>
                  <span style={{ fontSize: 12, color: "var(--ca-text2)" }}>{(usage?.totalTokens || 0).toLocaleString()}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#8B5CF6" }}>{formatUsdEstimate(usage?.estimatedCostUsd || 0)}</span>
                  <span style={{ fontSize: 11, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{usage?.topFeature || "—"}</span>
                </div>
              );
            })}
          </Card>

          {/* Tickets */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionLabel title="Support tickets" sub={`${tickets.length} total`} />
              <Link href="/coach-admin/tickets" style={{ fontSize: 11.5, color: "#3B82F6", textDecoration: "none" }}>View all →</Link>
            </div>
            {tickets.length ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 80px 110px 80px", padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 10 }}>
                  {["Subject", "Status", "Priority", "Assignee", "Updated"].map(h => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
                  ))}
                </div>
                {tickets.map((ticket: typeof tickets[number], i: number) => (
                  <Link key={ticket.id} href={`/coach-admin/tickets/${ticket.id}`}
                    style={{ display: "grid", gridTemplateColumns: "1fr 90px 80px 110px 80px", padding: "9px 14px", gap: 10, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", textDecoration: "none", transition: "background 0.1s", alignItems: "center" }}
                    className="coach-admin-row-hover">
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.subject}</span>
                    <span><CoachAdminPill tone={statusTone(ticket.status)}>{ticket.status.replace(/_/g, " ")}</CoachAdminPill></span>
                    <span><CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill></span>
                    <span style={{ fontSize: 11.5, color: "var(--ca-text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.assignedTo?.email || "unassigned"}</span>
                    <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{fmt(ticket.updatedAt)}</span>
                  </Link>
                ))}
              </>
            ) : <EmptyRow label="No tickets for this account" />}
          </Card>

          {/* AI calls log */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionLabel title="Model calls" sub={`${tokenEntries.length} this period`} />
            </div>
            {tokenEntries.length ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 120px 60px 70px 90px", padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
                  {["Feature", "User", "Model", "Tokens", "Cost", "Time"].map(h => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
                  ))}
                </div>
                {pagedEntries.map((entry: FeatureEntry, i: number) => {
                  const cost = estimateTrackedTokenCostUsd({ model: entry.model, inputTokens: entry.inputTokens, outputTokens: entry.outputTokens, totalTokens: entry.totalTokens });
                  return (
                    <div key={entry.id} style={{ display: "grid", gridTemplateColumns: "130px 1fr 120px 60px 70px 90px", padding: "8px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.featureName || "llm_request"}</span>
                      <span style={{ fontSize: 11.5, color: "var(--ca-text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.user?.email || "—"}</span>
                      <span style={{ fontSize: 11, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.model}</span>
                      <span style={{ fontSize: 11.5, color: "var(--ca-text2)" }}>{entry.totalTokens.toLocaleString()}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "#8B5CF6" }}>{formatUsdEstimate(cost.estimatedCostUsd)}</span>
                      <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{fmt(entry.createdAt, true)}</span>
                    </div>
                  );
                })}
                {tokenEntries.length > PER_PAGE && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderTop: "1px solid var(--ca-bd)" }}>
                    <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>Page {pageIdx + 1} of {Math.ceil(tokenEntries.length / PER_PAGE)}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      {pageIdx > 0 && <Link href={`?callsPage=${pageIdx - 1}`} style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", textDecoration: "none" }}>← Prev</Link>}
                      {(pageIdx + 1) * PER_PAGE < tokenEntries.length && <Link href={`?callsPage=${pageIdx + 1}`} style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", textDecoration: "none" }}>Next →</Link>}
                    </div>
                  </div>
                )}
              </>
            ) : <EmptyRow label="No model calls tracked yet" />}
          </Card>

          {/* Events */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)" }}>
              <SectionLabel title="Recent events" sub={`${events.length} events`} />
            </div>
            {events.length ? events.map((event: typeof events[number], i: number) => (
              <div key={event.id} style={{ padding: "9px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ca-text)" }}>{event.eventName}</span>
                  <span style={{ fontSize: 11, color: "var(--ca-text3)", flexShrink: 0 }}>{fmt(event.createdAt)}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 2 }}>Actor: {event.user?.email || "system"}</div>
                {event.metadataJson && (
                  <pre style={{ marginTop: 6, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", fontSize: 10.5, color: "var(--ca-text2)", overflowX: "auto", fontFamily: "monospace", lineHeight: 1.5 }}>{JSON.stringify(event.metadataJson, null, 2)}</pre>
                )}
              </div>
            )) : <EmptyRow label="No events recorded" />}
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Billing details */}
          <Card style={{ padding: "14px" }}>
            <SectionLabel title="Billing" />
            <div>
              <MetaRow label="Plan" value={isInternal ? "Internal operator" : planLabel} />
              <MetaRow label="Monthly price" value={planAmount ? formatCurrency(planAmount / 100) : "—"} />
              <MetaRow label="Renewal" value={fmt(subscription?.currentPeriodEnd)} />
              <MetaRow label="Period start" value={fmt(subscription?.currentPeriodStart)} />
              <MetaRow label="Trial end" value={fmt(subscription?.trialEnd)} />
              <MetaRow label="Credits / mo" value={planCredits ? planCredits.toLocaleString() : "—"} />
              <MetaRow label="Credits used" value={tokenUsage ? `${(tokenUsage.usedCredits ?? 0).toLocaleString()}` : "0"} />
              <MetaRow label="Raw tokens" value={tokenUsage ? tokenUsage.used.toLocaleString() : "0"} />
              <MetaRow label="Payment state" value={hasPayIssue ? <span style={{ color: "#F59E0B" }}>Issue flagged</span> : <span style={{ color: "#22C55E" }}>Healthy</span>} />
            </div>
            {tokenUsage && planCredits && planCredits > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ca-text3)", marginBottom: 4 }}>
                  <span>Credit usage</span><span>{creditPct}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 99, background: "var(--ca-raise)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${creditPct}%`, borderRadius: 99, background: creditPct > 80 ? "#F59E0B" : "#22C55E" }} />
                </div>
              </div>
            )}
          </Card>

          {/* Stripe IDs */}
          <Card style={{ padding: "14px" }}>
            <SectionLabel title="Stripe references" />
            <div>
              <MetaRow label="Customer ID" value={<span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--ca-text2)" }}>{subscription?.stripeCustomerId || "—"}</span>} />
              <MetaRow label="Subscription ID" value={<span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--ca-text2)" }}>{subscription?.stripeSubscriptionId || "—"}</span>} />
              <MetaRow label="Price ID" value={<span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--ca-text2)" }}>{subscription?.stripePriceId || "—"}</span>} />
              <MetaRow label="Account ID" value={<span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--ca-text2)" }}>{account.id.slice(0, 16)}…</span>} />
            </div>
          </Card>

          {/* Feature usage */}
          {featureUsage.length > 0 && (
            <Card style={{ padding: "14px" }}>
              <SectionLabel title="Feature usage" sub="by token volume" />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {featureUsage.map(([feat, total]: [string, number]) => (
                  <div key={feat}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ca-text3)", marginBottom: 3 }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>{feat}</span>
                      <span>{total.toLocaleString()}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: "var(--ca-raise)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.max(4, Math.round((total / featureMax) * 100))}%`, borderRadius: 99, background: "#06B6D4" }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* New ticket */}
          <Card style={{ padding: "14px" }}>
            <SectionLabel title="Open a support ticket" />
            <SupportTicketCreateForm accountId={accountId} reporterOptions={account.users.map((u: typeof account.users[number]) => ({ id: u.id, label: u.email }))} />
          </Card>

          {/* Admin notes */}
          <Card style={{ padding: "14px" }}>
            <SectionLabel title="Internal notes" sub={adminNotes.length ? `${adminNotes.length} notes` : undefined} />
            <CoachAdminNoteForm endpoint={`/api/coach-admin/accounts/${accountId}/notes`} />
            {adminNotes.length > 0 && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {adminNotes.map((note: typeof adminNotes[number]) => (
                  <div key={note.id} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)" }}>
                    <p style={{ fontSize: 12.5, color: "var(--ca-text)", lineHeight: 1.55, margin: 0 }}>{note.note}</p>
                    <p style={{ fontSize: 10.5, color: "var(--ca-text3)", marginTop: 5 }}>{note.author.email} · {fmt(note.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
