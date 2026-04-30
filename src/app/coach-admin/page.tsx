import Link from "next/link";
import { redirect } from "next/navigation";
import { CoachAdminLoginForm } from "@/components/coach-admin-forms";
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
  getCoachAdminBetaAutoLoginConfig,
  getCoachAdminSession,
} from "@/lib/coach-admin-auth";
import { isDatabaseReady, prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { getPlanMonthlyAmountCents } from "@/lib/billing";

function formatDate(value?: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function statusTone(status?: string | null) {
  const value = `${status || ""}`.toLowerCase();
  if (value === "active" || value === "trialing") return "emerald" as const;
  if (value === "past_due" || value === "unpaid") return "gold" as const;
  if (value === "canceled" || value === "incomplete_expired") return "rose" as const;
  return "slate" as const;
}

function priorityTone(priority?: string | null) {
  const value = `${priority || ""}`.toLowerCase();
  if (value === "urgent" || value === "high") return "rose" as const;
  if (value === "medium") return "gold" as const;
  return "cyan" as const;
}

function getHealthLabel(account: any) {
  if (account.paymentIssue) return "Payment issue";
  if (!account.subscription) return "Needs checkout";
  if (account.subscription.status === "trialing") return "Trialing";
  if (account.subscription.status === "active") return "Healthy";
  return account.subscription.status.replace(/_/g, " ");
}

function SetupWarning({ title, body }: { title: string; body: string }) {
  return (
    <CoachAdminPanel eyebrow="Billing setup needed" title={title} description={body}>
      <div className="grid gap-4 md:grid-cols-3">
        <CoachAdminMetaItem label="Database" value="Set `DATABASE_URL` or `NETLIFY_DATABASE_URL` in production." />
        <CoachAdminMetaItem label="Migrations" value="Apply the latest Prisma migration so billing models exist." />
        <CoachAdminMetaItem label="Access" value="The admin session is live. This is a data-layer readiness issue, not an auth failure." />
      </div>
    </CoachAdminPanel>
  );
}

export default async function CoachAdminPage() {
  const session = await getCoachAdminSession();
  if (!session) {
    if (getCoachAdminBetaAutoLoginConfig()) {
      redirect("/api/coach-admin/beta-login?next=/coach-admin");
    }
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-2">
        <CoachAdminLoginForm />
      </div>
    );
  }

  if (!isDatabaseReady()) {
    return (
      <SetupWarning
        title="Coach admin signed in, but the billing database is unavailable"
        body="This deployment does not currently have a valid runtime database connection for billing tables. Wire production database access and the dashboard will start hydrating with subscriptions, accounts, tickets, and token telemetry."
      />
    );
  }

  let subscriptions: any[] = [];
  let accounts: any[] = [];
  let recentTickets: any[] = [];
  let tokenAggregate: { _sum: { totalTokens: number | null } } = { _sum: { totalTokens: 0 } };

  try {
    [subscriptions, accounts, recentTickets, tokenAggregate] = await Promise.all([
      prisma.subscription.findMany({
        include: {
          account: { include: { users: true } },
        },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.account.findMany({
        include: {
          users: true,
          subscription: true,
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.supportTicket.findMany({
        include: {
          account: true,
          reporter: true,
          assignedTo: true,
        },
        orderBy: { updatedAt: "desc" },
        take: 12,
      }),
      prisma.aiTokenUsage.aggregate({
        _sum: { totalTokens: true },
      }),
    ]);
  } catch (error) {
    console.error("[coach-admin-page] failed to load billing data", error);
    return (
      <SetupWarning
        title="Admin session is live, but the billing tables are not ready"
        body="The most common causes are an unreachable production database or a migration that has not been applied yet. Auth is working. The dashboard dataset is what needs to catch up."
      />
    );
  }

  const activeCount = subscriptions.filter((item: any) => item.status === "active").length;
  const trialingCount = subscriptions.filter((item: any) => item.status === "trialing").length;
  const pastDueCount = subscriptions.filter((item: any) => item.status === "past_due" || item.status === "unpaid").length;
  const canceledCount = subscriptions.filter((item: any) => item.status === "canceled").length;
  const failedPaymentsCount = subscriptions.filter((item: any) => item.paymentIssue || item.status === "past_due" || item.status === "unpaid").length;
  const mrrCents = subscriptions
    .filter((item: any) => item.status === "active" || item.status === "trialing")
    .reduce((sum: number, item: any) => sum + getPlanMonthlyAmountCents(item.planName, item.stripePriceId), 0);
  const arrCents = mrrCents * 12;
  const upcomingRenewals = subscriptions.filter((item: any) => {
    if (!item.currentPeriodEnd) return false;
    const days = (new Date(item.currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days >= 0 && days <= 14 && (item.status === "active" || item.status === "trialing");
  }).length;

  const accountsHealthy = accounts.filter((item: any) => !item.paymentIssue && ["active", "trialing"].includes(item.subscription?.status || item.status)).length;
  const healthPercent = accounts.length ? Math.round((accountsHealthy / accounts.length) * 100) : 0;
  const topRiskAccounts = accounts
    .filter((item: any) => item.paymentIssue || ["past_due", "unpaid", "canceled"].includes(item.subscription?.status || item.status))
    .slice(0, 4);
  const prioritySortedTickets = [...recentTickets].sort((a: any, b: any) => {
    const order = { urgent: 4, high: 3, medium: 2, low: 1 } as Record<string, number>;
    return (order[b.priority] || 0) - (order[a.priority] || 0);
  });
  const recentHotTickets = prioritySortedTickets.slice(0, 4);
  const totalTokens = tokenAggregate._sum.totalTokens || 0;
  const subscriptionMax = Math.max(activeCount, trialingCount, pastDueCount, canceledCount, 1);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CoachAdminPanel
          eyebrow="Revenue pulse"
          title={
            <>
              Premium operator view for
              <span className="gradient-text-zari"> billing and account health.</span>
            </>
          }
          description="Monitor paid access, payment risk, support pressure, and AI usage from one high-signal surface. The numbers are the same as before. The framing is no longer dead."
          action={<CoachAdminLinkButton href="/coach-admin/tickets" tone="brand">Open ticket queue</CoachAdminLinkButton>}
          className="min-h-[320px]"
        >
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Monthly recurring revenue</p>
                  <div className="mt-3 text-5xl font-semibold tracking-[-0.08em] text-white">{formatCurrency(mrrCents / 100)}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">Annualized run-rate {formatCurrency(arrCents / 100)} based on current active and trialing accounts.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <CoachAdminPill tone="emerald">{activeCount} active</CoachAdminPill>
                  <CoachAdminPill tone="cyan">{trialingCount} trialing</CoachAdminPill>
                  <CoachAdminPill tone="gold">{upcomingRenewals} renewing soon</CoachAdminPill>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <CoachAdminProgress label="Revenue-ready accounts" value={activeCount + trialingCount} max={Math.max(accounts.length, 1)} tone="emerald" valueLabel={`${activeCount + trialingCount} / ${accounts.length || 0}`} />
                <CoachAdminProgress label="Payment risk load" value={failedPaymentsCount} max={Math.max(accounts.length, 1)} tone="gold" valueLabel={`${failedPaymentsCount} flagged`} />
              </div>
            </div>

            <div className="grid gap-4">
              <CoachAdminMetricCard
                label="Account health"
                value={`${healthPercent}%`}
                note="Percent of visible accounts currently in good standing."
                tone="emerald"
                accent={<div className="h-14 w-14 rounded-full border border-emerald-300/20 bg-emerald-400/10" />}
              />
              <CoachAdminMetricCard
                label="Tracked AI tokens"
                value={totalTokens.toLocaleString()}
                note="Lifetime usage recorded from paid AI features across all accounts."
                tone="cyan"
                accent={<div className="h-14 w-14 rounded-full border border-cyan-300/20 bg-cyan-400/10" />}
              />
            </div>
          </div>
        </CoachAdminPanel>

        <CoachAdminPanel eyebrow="Live distribution" title="Subscription mix" description="Watch the state balance before it becomes a support problem.">
          <div className="space-y-5">
            <CoachAdminProgress label="Active" value={activeCount} max={subscriptionMax} tone="emerald" />
            <CoachAdminProgress label="Trialing" value={trialingCount} max={subscriptionMax} tone="cyan" />
            <CoachAdminProgress label="Past due / unpaid" value={pastDueCount} max={subscriptionMax} tone="gold" />
            <CoachAdminProgress label="Canceled" value={canceledCount} max={subscriptionMax} tone="rose" />
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Failed payments</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">{failedPaymentsCount}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">Accounts that should already be on your recovery radar.</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Upcoming renewals</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">{upcomingRenewals}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">Useful for pre-renewal outreach and monitoring churn signals.</p>
            </div>
          </div>
        </CoachAdminPanel>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <CoachAdminMetricCard label="Active subscriptions" value={activeCount} note="Accounts with paid access right now." tone="emerald" />
        <CoachAdminMetricCard label="Trial users" value={trialingCount} note="Current Stripe trials that can convert or churn." tone="cyan" />
        <CoachAdminMetricCard label="Past due / unpaid" value={pastDueCount} note="Accounts currently blocked or trending toward support." tone="gold" />
        <CoachAdminMetricCard label="Canceled" value={canceledCount} note="Accounts no longer carrying paid access." tone="rose" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CoachAdminPanel
          eyebrow="Accounts"
          title="Customer command board"
          description="A sharper view of who is healthy, who is at risk, and which accounts are worth opening next."
          action={<CoachAdminPill tone="slate">{accounts.length} visible accounts</CoachAdminPill>}
        >
          <div className="grid gap-3">
            {accounts.length ? (
              accounts.slice(0, 8).map((account: any) => {
                const owner = account.users.find((user: any) => user.id === account.ownerUserId) || account.users[0];
                const status = account.subscription?.status || account.status;
                const plan = account.subscription?.planName || account.subscription?.stripePriceId || "No plan yet";
                return (
                  <Link
                    key={account.id}
                    href={`/coach-admin/accounts/${account.id}`}
                    className="group rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-white/16 hover:bg-white/[0.07]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-lg font-semibold tracking-[-0.04em] text-white">{account.name}</p>
                          <CoachAdminPill tone={statusTone(status)}>{getHealthLabel(account)}</CoachAdminPill>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">{owner?.email || "Unknown owner"} · {account.users.length} user(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Renewal</p>
                        <p className="mt-2 text-sm text-slate-200">{formatDate(account.subscription?.currentPeriodEnd)}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                      <div className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3 text-sm text-slate-300">{plan}</div>
                      <div className="text-sm text-white/52 group-hover:text-white/72">
                        Open account →
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <CoachAdminEmptyState title="No accounts yet" body="Once users complete checkout and sync into billing, their accounts will appear here." />
            )}
          </div>
        </CoachAdminPanel>

        <div className="grid gap-6">
          <CoachAdminPanel eyebrow="Risk radar" title="Accounts that need attention" description="Payment or lifecycle states that deserve operator follow-up.">
            <div className="grid gap-3">
              {topRiskAccounts.length ? (
                topRiskAccounts.map((account: any) => (
                  <Link key={account.id} href={`/coach-admin/accounts/${account.id}`} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-white/16 hover:bg-white/[0.07]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{account.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{getHealthLabel(account)}</p>
                      </div>
                      <CoachAdminPill tone={statusTone(account.subscription?.status || account.status)}>
                        {account.subscription?.status || account.status}
                      </CoachAdminPill>
                    </div>
                  </Link>
                ))
              ) : (
                <CoachAdminEmptyState title="No immediate payment risks" body="The risk list will populate as past_due, unpaid, canceled, or incomplete accounts appear." />
              )}
            </div>
          </CoachAdminPanel>

          <CoachAdminPanel
            eyebrow="Support"
            title="Recent tickets"
            description="The most urgent queue items, surfaced without making you read a table first."
            action={<CoachAdminLinkButton href="/coach-admin/tickets" tone="cyan">View all tickets</CoachAdminLinkButton>}
          >
            <div className="grid gap-3">
              {recentHotTickets.length ? (
                recentHotTickets.map((ticket: any) => (
                  <Link key={ticket.id} href={`/coach-admin/tickets/${ticket.id}`} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-white/16 hover:bg-white/[0.07]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white">{ticket.subject}</p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">{ticket.account?.name || "Unknown account"} · {ticket.reporter?.email || "No reporter"}</p>
                      </div>
                      <CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/38">
                      <span>{ticket.status.replace(/_/g, " ")}</span>
                      <span>•</span>
                      <span>Updated {formatDate(ticket.updatedAt)}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <CoachAdminEmptyState title="No tickets yet" body="Open, in-progress, and resolved support work will surface here once the queue starts moving." />
              )}
            </div>
          </CoachAdminPanel>
        </div>
      </section>
    </div>
  );
}

