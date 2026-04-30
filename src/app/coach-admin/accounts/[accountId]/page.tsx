import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CoachAdminNoteForm,
  SupportTicketCreateForm,
} from "@/components/coach-admin-forms";
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

function statusBadge(value: string, tone?: "payment" | "success") {
  const isGood = tone === "success" || ["active", "trialing", "resolved"].includes(value);
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
        isGood ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"
      }`}
    >
      {value.replace(/_/g, " ")}
    </span>
  );
}

function statCard(label: string, value: string | number, note: string) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{note}</p>
    </div>
  );
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
      take: 20,
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

  const featureUsage: Array<[string, number]> = (Array.from(
    tokenEntries.reduce((map: Map<string, number>, entry: FeatureTokenEntry) => {
      const key = entry.featureName || "unlabeled";
      map.set(key, (map.get(key) || 0) + entry.totalTokens);
      return map;
    }, new Map<string, number>())
  ) as Array<[string, number]>)
    .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
    .slice(0, 8);

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

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/coach-admin" className="text-sm text-cyan-300 transition hover:text-cyan-200">
            ← Back to overview
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white">{account.name}</h1>
            {statusBadge(subscription?.status || account.status, subscription?.paymentIssue ? "payment" : "success")}
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Owner: {account.ownerUser.email} · Created {formatDate(account.createdAt)} · Account ID {account.id.slice(0, 8)}
          </p>
        </div>
        <div className="text-right text-sm text-slate-400">
          <p>Plan</p>
          <p className="mt-1 text-base font-semibold text-slate-100">
            {subscription?.planName || subscription?.stripePriceId || "No subscription"}
          </p>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCard("Subscription", subscription?.status || account.status, subscription ? "Stripe is the billing source of truth" : "Checkout not completed yet")}
        {statCard("Renewal", formatDate(subscription?.currentPeriodEnd), subscription?.cancelAtPeriodEnd ? "Will cancel at period end" : "Current renewal boundary")}
        {statCard("MRR estimate", planAmount ? formatCurrency(planAmount / 100) : "$0", "Derived from stored plan / price mapping")}
        {statCard(
          "Token usage",
          tokenUsage ? `${tokenUsage.used.toLocaleString()} / ${tokenUsage.limit.toLocaleString()}` : "No usage yet",
          tokenUsage ? `${tokenUsage.remaining.toLocaleString()} tokens remaining this period` : "Usage starts tracking after paid feature calls"
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Members</p>
            <div className="mt-4 grid gap-3">
              {account.users.map((user: (typeof account.users)[number]) => (
                <div key={user.id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{user.email}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                        {user.role} · {user.planTier}
                      </p>
                    </div>
                    {user.id === account.ownerUserId ? (
                      <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                        Owner
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Support tickets</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">Account support view</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                <span>{ticketCounts.open || 0} open</span>
                <span>{ticketCounts.in_progress || 0} in progress</span>
                <span>{ticketCounts.resolved || 0} resolved</span>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {tickets.length ? (
                tickets.map((ticket: (typeof tickets)[number]) => (
                  <Link
                    key={ticket.id}
                    href={`/coach-admin/tickets/${ticket.id}`}
                    className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-slate-700 hover:bg-slate-950"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-white">{ticket.subject}</p>
                      {statusBadge(ticket.status)}
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{ticket.description.slice(0, 180)}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Reporter: {ticket.reporter?.email || "—"} · Assigned: {ticket.assignedTo?.email || "unassigned"} · Updated {formatDate(ticket.updatedAt)}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-500">
                  No support tickets yet for this account.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Subscription health</p>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Payment issue</span>
                <span className={account.paymentIssue ? "text-amber-200" : "text-emerald-200"}>
                  {account.paymentIssue ? "Flagged" : "Healthy"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Current period start</span>
                <span>{formatDate(subscription?.currentPeriodStart)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Current period end</span>
                <span>{formatDate(subscription?.currentPeriodEnd)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Trial end</span>
                <span>{formatDate(subscription?.trialEnd)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Cancel at period end</span>
                <span>{subscription?.cancelAtPeriodEnd ? "Yes" : "No"}</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white">Current-period token usage</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{usagePercent}% used</p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-cyan-400" style={{ width: `${usagePercent}%` }} />
              </div>
              <p className="mt-3 text-sm text-slate-400">
                {tokenUsage
                  ? `${tokenUsage.used.toLocaleString()} used · ${tokenUsage.remaining.toLocaleString()} remaining`
                  : "No tracked token usage for the current billing period yet."}
              </p>
              {featureUsage.length ? (
                <div className="mt-4 grid gap-2">
                  {featureUsage.map(([feature, total]: [string, number]) => (
                    <div key={feature} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-slate-300">{feature}</span>
                      <span className="text-slate-500">{total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Create support ticket</p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">Open a case for this account</h2>
            <div className="mt-5">
              <SupportTicketCreateForm accountId={accountId} reporterOptions={reporterOptions} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Admin notes</p>
            <div className="mt-5">
              <CoachAdminNoteForm endpoint={`/api/coach-admin/accounts/${accountId}/notes`} />
            </div>
            <div className="mt-5 grid gap-3">
              {adminNotes.length ? (
                adminNotes.map((note: (typeof adminNotes)[number]) => (
                  <div key={note.id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                    <p className="text-sm leading-6 text-slate-200">{note.note}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {note.author.email} · {formatDate(note.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-500">
                  No internal notes yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Recent events</p>
          <div className="mt-5 grid gap-3">
            {events.length ? (
              events.map((event: (typeof events)[number]) => (
                <div key={event.id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-medium text-white">{event.eventName}</p>
                    <p className="text-xs text-slate-500">{formatDate(event.createdAt)}</p>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Actor: {event.user?.email || "system"}</p>
                  {event.metadataJson ? (
                    <pre className="mt-3 overflow-x-auto rounded-2xl bg-slate-950 p-3 text-xs text-slate-400">
                      {JSON.stringify(event.metadataJson, null, 2)}
                    </pre>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-500">
                No recent app events for this account yet.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Billing references</p>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-500">Stripe customer ID</p>
              <p className="mt-1 break-all font-mono text-xs text-slate-300">{subscription?.stripeCustomerId || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500">Stripe subscription ID</p>
              <p className="mt-1 break-all font-mono text-xs text-slate-300">{subscription?.stripeSubscriptionId || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500">Stripe price ID</p>
              <p className="mt-1 break-all font-mono text-xs text-slate-300">{subscription?.stripePriceId || "—"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
