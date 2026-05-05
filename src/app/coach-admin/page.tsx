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
  coachAdminInsetCardClass,
  coachAdminListCardClass,
  coachAdminSubtleCardClass,
  coachAdminTextMutedClass,
  coachAdminTextPrimaryClass,
  coachAdminTextSoftClass,
  cx,
} from "@/components/coach-admin-ui";
import {
  getCoachAdminBetaAutoLoginConfig,
  getCoachAdminSession,
} from "@/lib/coach-admin-auth";
import { isDatabaseReady, prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import {
  estimateTrackedTokenCostUsd,
  ensureCoachAdminUser,
  formatUsdEstimate,
  getAiUsageSummary,
  getPlanMonthlyAmountCents,
  isPlaceholderCoachAdminEmail,
} from "@/lib/billing";
import { repairPlatformUsersWithoutAccounts } from "@/lib/platform-users";

function formatDate(value?: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value?: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
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
  if (isInternalOperatorAccount(account)) return "Internal operator";
  if (account.paymentIssue) return "Payment issue";
  if (!account.subscription) return "Needs checkout";
  if (account.subscription.status === "trialing") return "Trialing";
  if (account.subscription.status === "active") return "Healthy";
  return account.subscription.status.replace(/_/g, " ");
}

function isInternalOperatorAccount(account: any) {
  return Array.isArray(account?.users) && account.users.some((user: any) => user.role === "admin" || user.role === "support");
}

function getAccountPlanLabel(account: any) {
  if (isInternalOperatorAccount(account)) return "Internal operator account";
  return account.subscription?.planName || account.subscription?.stripePriceId || "No plan yet";
}

function isPlaceholderInternalOperatorAccount(account: any) {
  if (!isInternalOperatorAccount(account)) return false;
  return Array.isArray(account?.users) && account.users.some((user: any) => isPlaceholderCoachAdminEmail(user?.email));
}

function getMetadataRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function getRequestPreview(metadata: unknown) {
  const record = getMetadataRecord(metadata);
  const preview = typeof record.requestPreview === "string" ? record.requestPreview.trim() : "";
  if (preview) return preview;
  const fallback = typeof record.featureName === "string" ? record.featureName.trim() : "";
  return fallback || "No request preview captured";
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
  let aiUsageSummary = null as Awaited<ReturnType<typeof getAiUsageSummary>>;
  let recentAiRequests: any[] = [];
  let repairedUsersCount = 0;

  try {
    await ensureCoachAdminUser(session.email, session.role);
    const repairResult = await repairPlatformUsersWithoutAccounts();
    repairedUsersCount = repairResult.repaired;

    [subscriptions, accounts, recentTickets, aiUsageSummary, recentAiRequests] = await Promise.all([
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
      getAiUsageSummary({ limit: 8 }),
      prisma.aiTokenUsage.findMany({
        orderBy: { createdAt: "desc" },
        take: 12,
        select: {
          id: true,
          createdAt: true,
          model: true,
          featureName: true,
          inputTokens: true,
          outputTokens: true,
          totalTokens: true,
          metadataJson: true,
          user: {
            select: {
              email: true,
            },
          },
          account: {
            select: {
              id: true,
              name: true,
            },
          },
        },
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
  const totalTokens = aiUsageSummary?.total.totalTokens || 0;
  const estimatedAiSpend = aiUsageSummary?.total.estimatedCostUsd || 0;
  const trackedUsers = aiUsageSummary?.total.trackedUsers || 0;
  const topAiUsers = aiUsageSummary?.byUser || [];
  const subscriptionMax = Math.max(activeCount, trialingCount, pastDueCount, canceledCount, 1);
  const visibleAccounts = accounts.filter((account: any) => !isPlaceholderInternalOperatorAccount(account));

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CoachAdminPanel
          eyebrow="Overview"
          title="Billing and account health"
          description="Monitor subscription state, payment risk, renewals, and AI spend from the same control surface."
          action={<CoachAdminLinkButton href="/coach-admin/tickets" tone="brand">Open ticket queue</CoachAdminLinkButton>}
          className="min-h-[320px]"
        >
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className={cx(coachAdminInsetCardClass, "p-5")}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={cx("text-[11px] font-semibold uppercase tracking-[0.22em]", coachAdminTextSoftClass)}>Monthly recurring revenue</p>
                  <div className={cx("mt-3 text-5xl font-semibold tracking-[-0.08em]", coachAdminTextPrimaryClass)}>{formatCurrency(mrrCents / 100)}</div>
                  <p className={cx("mt-3 text-sm leading-6", coachAdminTextMutedClass)}>Annualized run-rate {formatCurrency(arrCents / 100)} based on current active and trialing accounts.</p>
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
                label="Estimated AI spend"
                value={formatUsdEstimate(estimatedAiSpend)}
                note={`Tracked text-model spend across ${trackedUsers || 0} user${trackedUsers === 1 ? "" : "s"}.`}
                tone="cyan"
                accent={<div className="h-14 w-14 rounded-full border border-cyan-300/20 bg-cyan-400/10" />}
              />
            </div>
          </div>
        </CoachAdminPanel>

        <CoachAdminPanel eyebrow="Subscription state" title="Access mix" description="See where paid access is healthy, where it is at risk, and what needs intervention.">
          <div className="space-y-5">
            <CoachAdminProgress label="Active" value={activeCount} max={subscriptionMax} tone="emerald" />
            <CoachAdminProgress label="Trialing" value={trialingCount} max={subscriptionMax} tone="cyan" />
            <CoachAdminProgress label="Past due / unpaid" value={pastDueCount} max={subscriptionMax} tone="gold" />
            <CoachAdminProgress label="Canceled" value={canceledCount} max={subscriptionMax} tone="rose" />
          </div>

          <div className="mt-6 grid gap-3">
            <div className={cx(coachAdminSubtleCardClass, "px-4 py-4")}>
              <p className={cx("text-[11px] font-semibold uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>Failed payments</p>
              <p className={cx("mt-2 text-2xl font-semibold tracking-[-0.05em]", coachAdminTextPrimaryClass)}>{failedPaymentsCount}</p>
              <p className={cx("mt-2 text-sm leading-6", coachAdminTextMutedClass)}>Accounts that should already be on your recovery radar.</p>
            </div>
            <div className={cx(coachAdminSubtleCardClass, "px-4 py-4")}>
              <p className={cx("text-[11px] font-semibold uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>Upcoming renewals</p>
              <p className={cx("mt-2 text-2xl font-semibold tracking-[-0.05em]", coachAdminTextPrimaryClass)}>{upcomingRenewals}</p>
              <p className={cx("mt-2 text-sm leading-6", coachAdminTextMutedClass)}>Useful for pre-renewal outreach and monitoring churn signals.</p>
            </div>
          </div>
        </CoachAdminPanel>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        <CoachAdminMetricCard label="Active subscriptions" value={activeCount} note="Accounts with paid access right now." tone="emerald" />
        <CoachAdminMetricCard label="Trial users" value={trialingCount} note="Current Stripe trials that can convert or churn." tone="cyan" />
        <CoachAdminMetricCard label="Past due / unpaid" value={pastDueCount} note="Accounts currently blocked or trending toward support." tone="gold" />
        <CoachAdminMetricCard label="Canceled" value={canceledCount} note="Accounts no longer carrying paid access." tone="rose" />
        <CoachAdminMetricCard label="Tracked model tokens" value={totalTokens.toLocaleString()} note="Lifetime tracked OpenAI prompt and completion tokens." tone="brand" />
        <CoachAdminMetricCard label="Tracked users" value={trackedUsers} note="Users with recorded tokenized AI activity." tone="slate" />
      </section>

      {repairedUsersCount > 0 ? (
        <CoachAdminPanel
          eyebrow="Recovered records"
          title="Operator repair pass completed"
          description={`Re-linked ${repairedUsersCount} user${repairedUsersCount === 1 ? "" : "s"} that existed in the platform but were missing a visible account record.`}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <CoachAdminMetaItem label="What happened" value="Some earlier auth attempts created real users before the account link was fully established." />
            <CoachAdminMetaItem label="What changed" value="This admin load repaired those users into normal account records automatically." />
            <CoachAdminMetaItem label="What to do" value="Refresh this page once if you want to see the repaired records in the account list below." />
          </div>
        </CoachAdminPanel>
      ) : null}

      <section id="accounts" className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CoachAdminPanel
          eyebrow="Accounts"
          title="Customer accounts"
          description="Open any account to inspect billing state, user-level usage, support history, and internal notes."
          action={<CoachAdminPill tone="slate">{visibleAccounts.length} visible accounts</CoachAdminPill>}
        >
          <div className="grid gap-3">
            {visibleAccounts.length ? (
              visibleAccounts.slice(0, 8).map((account: any) => {
                const owner = account.users.find((user: any) => user.id === account.ownerUserId) || account.users[0];
                const status = account.subscription?.status || account.status;
                const plan = getAccountPlanLabel(account);
                const statusPillTone = isInternalOperatorAccount(account) ? "brand" : statusTone(status);
                return (
                  <Link
                    key={account.id}
                    href={`/coach-admin/accounts/${account.id}`}
                className={cx("group px-5 py-4", coachAdminListCardClass)}
              >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className={cx("text-lg font-semibold tracking-[-0.04em]", coachAdminTextPrimaryClass)}>{account.name}</p>
                          <CoachAdminPill tone={statusPillTone}>{getHealthLabel(account)}</CoachAdminPill>
                        </div>
                        <p className={cx("mt-2 text-sm", coachAdminTextMutedClass)}>{owner?.email || "Unknown owner"} · {account.users.length} user(s)</p>
                      </div>
                      <div className="text-right">
                        <p className={cx("text-[11px] font-semibold uppercase tracking-[0.18em]", coachAdminTextSoftClass)}>Renewal</p>
                        <p className={cx("mt-2 text-sm", coachAdminTextPrimaryClass)}>{formatDate(account.subscription?.currentPeriodEnd)}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                      <div className={cx("rounded-[18px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)] px-4 py-3 text-sm", coachAdminTextMutedClass)}>{plan}</div>
                      <div className={cx("text-sm transition", coachAdminTextSoftClass, "group-hover:text-[color:var(--ca-text-muted)]")}>
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
                  <Link key={account.id} href={`/coach-admin/accounts/${account.id}`} className={cx("px-4 py-4", coachAdminListCardClass, "rounded-[22px]")}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={cx("font-medium", coachAdminTextPrimaryClass)}>{account.name}</p>
                        <p className={cx("mt-1 text-sm", coachAdminTextMutedClass)}>{getHealthLabel(account)}</p>
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
            description="The current support queue, prioritized for fast operator triage."
            action={<CoachAdminLinkButton href="/coach-admin/tickets" tone="cyan">View all tickets</CoachAdminLinkButton>}
          >
            <div className="grid gap-3">
              {recentHotTickets.length ? (
                recentHotTickets.map((ticket: any) => (
                  <Link key={ticket.id} href={`/coach-admin/tickets/${ticket.id}`} className={cx("px-4 py-4", coachAdminListCardClass, "rounded-[22px]")}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className={cx("font-medium", coachAdminTextPrimaryClass)}>{ticket.subject}</p>
                        <p className={cx("mt-1 line-clamp-2 text-sm leading-6", coachAdminTextMutedClass)}>{ticket.account?.name || "Unknown account"} · {ticket.reporter?.email || "No reporter"}</p>
                      </div>
                      <CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill>
                    </div>
                    <div className={cx("mt-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>
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

      <section id="ai-usage" className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <CoachAdminPanel
          eyebrow="AI utilization"
          title="Who is consuming model spend"
          description="Per-user view of tracked OpenAI token usage and estimated spend."
          action={<CoachAdminPill tone="slate">{formatUsdEstimate(estimatedAiSpend)} total</CoachAdminPill>}
        >
          <div className="grid gap-3">
            {topAiUsers.length ? (
              topAiUsers.map((user) => (
                <div key={user.userId || user.email} className={cx("rounded-[24px] px-4 py-4", coachAdminListCardClass)}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className={cx("font-medium", coachAdminTextPrimaryClass)}>{user.email}</p>
                      <p className={cx("mt-1 text-xs uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>
                        {user.role} · {user.requestCount} request{user.requestCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cx("text-sm font-semibold", coachAdminTextPrimaryClass)}>{formatUsdEstimate(user.estimatedCostUsd)}</p>
                      <p className={cx("mt-1 text-xs uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>{user.totalTokens.toLocaleString()} tokens</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className={cx("rounded-[18px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)] px-3 py-3")}>
                      <p className={cx("text-[10px] font-semibold uppercase tracking-[0.18em]", coachAdminTextSoftClass)}>Input</p>
                      <p className={cx("mt-2 text-sm font-medium", coachAdminTextPrimaryClass)}>{user.inputTokens.toLocaleString()}</p>
                    </div>
                    <div className={cx("rounded-[18px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)] px-3 py-3")}>
                      <p className={cx("text-[10px] font-semibold uppercase tracking-[0.18em]", coachAdminTextSoftClass)}>Top model</p>
                      <p className={cx("mt-2 text-sm font-medium", coachAdminTextPrimaryClass)}>{user.topModel || "Unknown"}</p>
                    </div>
                    <div className={cx("rounded-[18px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)] px-3 py-3")}>
                      <p className={cx("text-[10px] font-semibold uppercase tracking-[0.18em]", coachAdminTextSoftClass)}>Top feature</p>
                      <p className={cx("mt-2 text-sm font-medium", coachAdminTextPrimaryClass)}>{user.topFeature || "Unlabeled"}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <CoachAdminEmptyState title="No tracked user activity yet" body="As users call paid AI routes, token usage and estimated spend will show up here." />
            )}
          </div>
        </CoachAdminPanel>

        <CoachAdminPanel
          eyebrow="AI mix"
          title="Global usage snapshot"
          description="Global OpenAI usage across the app."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <CoachAdminMetricCard
              label="Estimated spend"
              value={formatUsdEstimate(estimatedAiSpend)}
              note="Current estimate from tracked GPT-4o family token usage."
              tone="brand"
            />
            <CoachAdminMetricCard
              label="Top model"
              value={aiUsageSummary?.total.topModel || "—"}
              note="Model generating the most tracked tokens right now."
              tone="slate"
            />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className={cx(coachAdminSubtleCardClass, "px-4 py-4")}>
              <p className={cx("text-[11px] font-semibold uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>Requests</p>
              <p className={cx("mt-2 text-2xl font-semibold tracking-[-0.05em]", coachAdminTextPrimaryClass)}>{aiUsageSummary?.total.requestCount.toLocaleString() || "0"}</p>
            </div>
            <div className={cx(coachAdminSubtleCardClass, "px-4 py-4")}>
              <p className={cx("text-[11px] font-semibold uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>Input tokens</p>
              <p className={cx("mt-2 text-2xl font-semibold tracking-[-0.05em]", coachAdminTextPrimaryClass)}>{aiUsageSummary?.total.inputTokens.toLocaleString() || "0"}</p>
            </div>
            <div className={cx(coachAdminSubtleCardClass, "px-4 py-4")}>
              <p className={cx("text-[11px] font-semibold uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>Output tokens</p>
              <p className={cx("mt-2 text-2xl font-semibold tracking-[-0.05em]", coachAdminTextPrimaryClass)}>{aiUsageSummary?.total.outputTokens.toLocaleString() || "0"}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className={cx("text-[11px] font-semibold uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>Recent model calls</p>
            <div className="mt-3 grid gap-3">
              {recentAiRequests.length ? (
                recentAiRequests.map((entry: any) => {
                  const estimate = estimateTrackedTokenCostUsd({
                    model: entry.model,
                    inputTokens: entry.inputTokens,
                    outputTokens: entry.outputTokens,
                    totalTokens: entry.totalTokens,
                  });

                  return (
                    <div key={entry.id} className={cx("rounded-[22px] px-4 py-4", coachAdminListCardClass)}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className={cx("font-medium", coachAdminTextPrimaryClass)}>
                            {entry.featureName || "llm_request"} · {entry.model}
                          </p>
                          <p className={cx("mt-2 text-sm leading-6", coachAdminTextMutedClass)}>
                            {getRequestPreview(entry.metadataJson)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={cx("text-sm font-semibold", coachAdminTextPrimaryClass)}>{formatUsdEstimate(estimate.estimatedCostUsd)}</p>
                          <p className={cx("mt-1 text-xs uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>
                            {entry.totalTokens.toLocaleString()} tokens
                          </p>
                        </div>
                      </div>
                      <div className={cx("mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>
                        <span>{formatDateTime(entry.createdAt)}</span>
                        <span>•</span>
                        <span>{entry.user?.email || "Unknown user"}</span>
                        <span>•</span>
                        <span>{entry.account?.name || "Unknown account"}</span>
                      </div>
                      <div className="mt-3 grid gap-2 md:grid-cols-3">
                        <CoachAdminMetaItem label="Input" value={entry.inputTokens.toLocaleString()} />
                        <CoachAdminMetaItem label="Output" value={entry.outputTokens.toLocaleString()} />
                        <CoachAdminMetaItem label="Total" value={entry.totalTokens.toLocaleString()} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <CoachAdminEmptyState title="No tracked model calls yet" body="As users call AI routes, exact request previews and token counts will populate here." />
              )}
            </div>
          </div>
        </CoachAdminPanel>
      </section>
    </div>
  );
}
