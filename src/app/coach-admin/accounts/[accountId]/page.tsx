import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CoachAdminNoteForm,
  SupportTicketCreateForm,
} from "@/components/coach-admin-forms";
import {
  CoachAdminEmptyState,
  CoachAdminLinkButton,
  CoachAdminMetaItem,
  CoachAdminMetricCard,
  CoachAdminPanel,
  CoachAdminPill,
  CoachAdminProgress,
} from "@/components/coach-admin-ui";
import {
  getCurrentPeriodTokenUsage,
  getPlanMonthlyAmountCents,
} from "@/lib/billing";
import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

function formatDate(value?: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function statusTone(value?: string | null) {
  const normalized = `${value || ""}`.toLowerCase();
  if (normalized === "active" || normalized === "trialing" || normalized === "resolved") return "emerald" as const;
  if (normalized === "past_due" || normalized === "unpaid" || normalized === "in_progress") return "gold" as const;
  if (normalized === "canceled" || normalized === "closed") return "rose" as const;
  return "slate" as const;
}

function priorityTone(priority?: string | null) {
  const value = `${priority || ""}`.toLowerCase();
  if (value === "urgent" || value === "high") return "rose" as const;
  if (value === "medium") return "gold" as const;
  return "cyan" as const;
}

type AccountPageProps = {
  params: Promise<{ accountId: string }>;
};

type FeatureTokenEntry = {
  featureName: string | null;
  totalTokens: number;
};

export default async function CoachAdminAccountPage({ params }: AccountPageProps) {
  await requireCoachAdminSession("support");
  const { accountId } = await params;

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    include: {
      ownerUser: true,
      users: true,
      subscription: true,
    },
  });

  if (!account) notFound();

  const [tickets, events, adminNotes, tokenUsage, tokenEntries] = await Promise.all([
    prisma.supportTicket.findMany({
      where: { accountId },
      include: {
        reporter: true,
        assignedTo: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 10,
    }),
    prisma.appEvent.findMany({
      where: { accountId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    prisma.adminNote.findMany({
      where: { accountId, supportTicketId: null },
      include: { author: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    getCurrentPeriodTokenUsage(accountId),
    prisma.aiTokenUsage.findMany({
      where: {
        accountId,
        ...(account.subscription?.currentPeriodStart
          ? { createdAt: { gte: account.subscription.currentPeriodStart } }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        featureName: true,
        totalTokens: true,
      },
    }),
  ]);

  const featureUsageMap = tokenEntries.reduce((map: Map<string, number>, entry: FeatureTokenEntry) => {
    const key = entry.featureName || "unlabeled";
    map.set(key, (map.get(key) || 0) + entry.totalTokens);
    return map;
  }, new Map<string, number>());

  const featureUsage = [...featureUsageMap.entries()] as Array<[string, number]>;
  featureUsage
    .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
    .splice(8);

  const ticketCounts = tickets.reduce(
    (acc: Record<string, number>, ticket: (typeof tickets)[number]) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const reporterOptions = account.users.map((user: (typeof account.users)[number]) => ({
    id: user.id,
    label: user.email,
  }));

  const subscription = account.subscription;
  const planAmount = subscription ? getPlanMonthlyAmountCents(subscription.planName, subscription.stripePriceId) : 0;
  const usagePercent = tokenUsage?.limit ? Math.min(100, Math.round((tokenUsage.used / tokenUsage.limit) * 100)) : 0;
  const dominantFeature = featureUsage[0]?.[0] || "No usage yet";

  return (
    <div className="space-y-6">
      <CoachAdminPanel
        eyebrow="Account cockpit"
        title={account.name}
        description={`Owner ${account.ownerUser.email} · Created ${formatDate(account.createdAt)} · Account ID ${account.id.slice(0, 8)}`}
        action={<CoachAdminLinkButton href="/coach-admin" tone="slate">← Back to overview</CoachAdminLinkButton>}
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-[28px] border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <CoachAdminPill tone={statusTone(subscription?.status || account.status)}>{subscription?.status || account.status}</CoachAdminPill>
              {subscription?.cancelAtPeriodEnd ? <CoachAdminPill tone="gold">Cancels at period end</CoachAdminPill> : null}
              <CoachAdminPill tone={account.paymentIssue ? "gold" : "emerald"}>
                {account.paymentIssue ? "Payment issue flagged" : "Healthy payment state"}
              </CoachAdminPill>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <CoachAdminMetaItem label="Plan" value={subscription?.planName || subscription?.stripePriceId || "No subscription"} />
              <CoachAdminMetaItem label="Renewal" value={formatDate(subscription?.currentPeriodEnd)} />
              <CoachAdminMetaItem label="Members" value={`${account.users.length} seat${account.users.length === 1 ? "" : "s"}`} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <CoachAdminMetricCard label="MRR estimate" value={planAmount ? formatCurrency(planAmount / 100) : "$0"} note="Mapped from stored plan and price ID." tone="brand" />
            <CoachAdminMetricCard label="Token usage" value={tokenUsage ? `${usagePercent}%` : "0%"} note={tokenUsage ? `${tokenUsage.used.toLocaleString()} used this period` : "No tracked usage yet."} tone="cyan" />
            <CoachAdminMetricCard label="Open tickets" value={(ticketCounts.open || 0) + (ticketCounts.in_progress || 0)} note="Support load currently attached to this account." tone="gold" />
            <CoachAdminMetricCard label="Top feature" value={dominantFeature} note="Highest token-consuming feature this period." tone="slate" />
          </div>
        </div>
      </CoachAdminPanel>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6">
          <CoachAdminPanel eyebrow="People" title="Members and ownership" description="Who sits inside the account and how the seat map is organized.">
            <div className="grid gap-3">
              {account.users.map((user: (typeof account.users)[number]) => (
                <div key={user.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{user.email}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/38">{user.role} · {user.planTier}</p>
                    </div>
                    {user.id === account.ownerUserId ? <CoachAdminPill tone="cyan">Owner</CoachAdminPill> : null}
                  </div>
                </div>
              ))}
            </div>
          </CoachAdminPanel>

          <CoachAdminPanel eyebrow="Support" title="Account support view" description="Every ticket tied to this account, with priority and current assignment.">
            <div className="grid gap-3">
              {tickets.length ? (
                tickets.map((ticket: (typeof tickets)[number]) => (
                  <Link
                    key={ticket.id}
                    href={`/coach-admin/tickets/${ticket.id}`}
                    className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-white/16 hover:bg-white/[0.07]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-white">{ticket.subject}</p>
                          <CoachAdminPill tone={statusTone(ticket.status)}>{ticket.status.replace(/_/g, " ")}</CoachAdminPill>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{ticket.description}</p>
                      </div>
                      <CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill>
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-[0.16em] text-white/38">
                      Reporter {ticket.reporter?.email || "—"} · Assigned {ticket.assignedTo?.email || "unassigned"} · Updated {formatDate(ticket.updatedAt)}
                    </div>
                  </Link>
                ))
              ) : (
                <CoachAdminEmptyState title="No support tickets yet" body="Once support work is created for this account, it will appear here." />
              )}
            </div>
          </CoachAdminPanel>
        </div>

        <div className="grid gap-6">
          <CoachAdminPanel eyebrow="Subscription pulse" title="Billing and usage" description="Commercial status, renewal edge, and AI consumption for the current billing period.">
            <div className="grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <CoachAdminProgress
                  label="Current-period token consumption"
                  value={tokenUsage?.used || 0}
                  max={tokenUsage?.limit || 1}
                  tone="brand"
                  valueLabel={tokenUsage ? `${tokenUsage.used.toLocaleString()} / ${tokenUsage.limit.toLocaleString()}` : "No usage yet"}
                />
                <p className="mt-3 text-sm text-slate-400">
                  {tokenUsage
                    ? `${tokenUsage.remaining.toLocaleString()} tokens remain in the current period.`
                    : "Usage will start tracking as soon as paid AI routes are called."}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <CoachAdminMetaItem label="Payment issue" value={account.paymentIssue ? "Flagged" : "Healthy"} />
                <CoachAdminMetaItem label="Trial end" value={formatDate(subscription?.trialEnd)} />
                <CoachAdminMetaItem label="Current period start" value={formatDate(subscription?.currentPeriodStart)} />
                <CoachAdminMetaItem label="Current period end" value={formatDate(subscription?.currentPeriodEnd)} />
              </div>

              {featureUsage.length ? (
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Feature usage split</p>
                  <div className="mt-4 grid gap-3">
                    {featureUsage.map(([feature, total]: [string, number]) => (
                      <CoachAdminProgress key={feature} label={feature} value={total} max={featureUsage[0][1] || 1} tone="cyan" valueLabel={total.toLocaleString()} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </CoachAdminPanel>

          <CoachAdminPanel eyebrow="Create support ticket" title="Open a case for this account" description="Start internal support work without leaving the account surface.">
            <SupportTicketCreateForm accountId={accountId} reporterOptions={reporterOptions} />
          </CoachAdminPanel>

          <CoachAdminPanel eyebrow="Admin notes" title="Internal working memory" description="Operator notes, callouts, and context that should stay inside the team.">
            <CoachAdminNoteForm endpoint={`/api/coach-admin/accounts/${accountId}/notes`} />
            <div className="mt-5 grid gap-3">
              {adminNotes.length ? (
                adminNotes.map((note: (typeof adminNotes)[number]) => (
                  <div key={note.id} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <p className="text-sm leading-6 text-slate-200">{note.note}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/38">{note.author.email} · {formatDate(note.createdAt)}</p>
                  </div>
                ))
              ) : (
                <CoachAdminEmptyState title="No internal notes yet" body="Drop account context here for support, billing, or retention follow-up." />
              )}
            </div>
          </CoachAdminPanel>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <CoachAdminPanel eyebrow="Recent events" title="Product and billing activity" description="A tighter event stream for what this account is actually doing.">
          <div className="grid gap-3">
            {events.length ? (
              events.map((event: (typeof events)[number]) => (
                <div key={event.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-medium text-white">{event.eventName}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/38">{formatDate(event.createdAt)}</p>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/38">Actor {event.user?.email || "system"}</p>
                  {event.metadataJson ? (
                    <pre className="mt-3 overflow-x-auto rounded-[20px] border border-white/8 bg-black/20 p-3 text-xs text-slate-400">
                      {JSON.stringify(event.metadataJson, null, 2)}
                    </pre>
                  ) : null}
                </div>
              ))
            ) : (
              <CoachAdminEmptyState title="No recent app events" body="Important product and billing events will stream in here for this account." />
            )}
          </div>
        </CoachAdminPanel>

        <CoachAdminPanel eyebrow="Billing references" title="Stripe identifiers" description="Raw references for support, finance, and webhook debugging.">
          <div className="grid gap-3">
            <CoachAdminMetaItem label="Stripe customer ID" value={<span className="break-all font-mono text-xs text-slate-300">{subscription?.stripeCustomerId || "—"}</span>} />
            <CoachAdminMetaItem label="Stripe subscription ID" value={<span className="break-all font-mono text-xs text-slate-300">{subscription?.stripeSubscriptionId || "—"}</span>} />
            <CoachAdminMetaItem label="Stripe price ID" value={<span className="break-all font-mono text-xs text-slate-300">{subscription?.stripePriceId || "—"}</span>} />
          </div>
        </CoachAdminPanel>
      </section>
    </div>
  );
}
