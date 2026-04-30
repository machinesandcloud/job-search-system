import Link from "next/link";
import { redirect } from "next/navigation";
import { CoachAdminLoginForm } from "@/components/coach-admin-forms";
import {
  getCoachAdminBetaAutoLoginConfig,
  getCoachAdminSession,
} from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { getPlanMonthlyAmountCents } from "@/lib/billing";

function statCard(label: string, value: string | number, note: string) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{note}</p>
    </div>
  );
}

export default async function CoachAdminPage() {
  const session = await getCoachAdminSession();
  if (!session) {
    if (getCoachAdminBetaAutoLoginConfig()) {
      redirect("/api/coach-admin/beta-login?next=/coach-admin");
    }
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <CoachAdminLoginForm />
      </div>
    );
  }

  const [subscriptions, accounts, recentTickets, tokenAggregate] = await Promise.all([
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

  const activeCount = subscriptions.filter((item: any) => item.status === "active").length;
  const trialingCount = subscriptions.filter((item: any) => item.status === "trialing").length;
  const pastDueCount = subscriptions.filter((item: any) => item.status === "past_due" || item.status === "unpaid").length;
  const canceledCount = subscriptions.filter((item: any) => item.status === "canceled").length;
  const failedPaymentsCount = subscriptions.filter((item: any) => item.paymentIssue || item.status === "past_due" || item.status === "unpaid").length;
  const mrrCents = subscriptions
    .filter((item: any) => item.status === "active" || item.status === "trialing")
    .reduce((sum: number, item: any) => sum + getPlanMonthlyAmountCents(item.planName, item.stripePriceId), 0);
  const upcomingRenewals = subscriptions.filter((item: any) => {
    if (!item.currentPeriodEnd) return false;
    const days = (new Date(item.currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days >= 0 && days <= 14 && (item.status === "active" || item.status === "trialing");
  }).length;

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCard("Active subscriptions", activeCount, "Accounts with paid access right now")}
        {statCard("Trial users", trialingCount, "Accounts currently in a Stripe trial")}
        {statCard("Past due / unpaid", pastDueCount, "Accounts currently blocked or at risk")}
        {statCard("Canceled", canceledCount, "Accounts that no longer have paid access")}
        {statCard("MRR estimate", formatCurrency(mrrCents / 100), "Approximate monthly recurring revenue")}
        {statCard("Failed payments", failedPaymentsCount, "Accounts flagged with payment issues")}
        {statCard("Upcoming renewals", upcomingRenewals, "Renewals due in the next 14 days")}
        {statCard("Tracked AI tokens", (tokenAggregate._sum.totalTokens || 0).toLocaleString(), "All recorded OpenAI usage across accounts")}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Accounts</p>
              <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em]">Customer and subscription view</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="pb-3 pr-4">Account</th>
                  <th className="pb-3 pr-4">Owner</th>
                  <th className="pb-3 pr-4">Subscription</th>
                  <th className="pb-3 pr-4">Renewal</th>
                  <th className="pb-3 pr-4">Payment</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account: any) => {
                  const owner = account.users.find((user: any) => user.id === account.ownerUserId) || account.users[0];
                  return (
                    <tr key={account.id} className="border-t border-slate-800 align-top">
                      <td className="py-4 pr-4">
                        <Link href={`/coach-admin/accounts/${account.id}`} className="font-medium text-white transition hover:text-cyan-300">
                          {account.name}
                        </Link>
                        <p className="mt-1 text-xs text-slate-500">{account.id.slice(0, 8)}</p>
                      </td>
                      <td className="py-4 pr-4 text-slate-300">
                        <div>{owner?.email || "Unknown"}</div>
                        <div className="mt-1 text-xs text-slate-500">{account.users.length} user(s)</div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="font-medium capitalize text-slate-200">{account.subscription?.status || account.status}</div>
                        <div className="mt-1 text-xs text-slate-500">{account.subscription?.planName || account.subscription?.stripePriceId || "No plan yet"}</div>
                      </td>
                      <td className="py-4 pr-4 text-slate-300">
                        {account.subscription?.currentPeriodEnd
                          ? new Date(account.subscription.currentPeriodEnd).toISOString().slice(0, 10)
                          : "—"}
                      </td>
                      <td className="py-4 pr-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${account.paymentIssue ? "bg-amber-500/15 text-amber-200" : "bg-emerald-500/15 text-emerald-200"}`}>
                          {account.paymentIssue ? "Issue flagged" : "Healthy"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Support</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em]">Recent tickets</h2>
              </div>
              <Link href="/coach-admin/tickets" className="text-sm text-cyan-300 transition hover:text-cyan-200">
                View all →
              </Link>
            </div>
            <div className="grid gap-3">
              {recentTickets.map((ticket: any) => (
                <Link key={ticket.id} href={`/coach-admin/tickets/${ticket.id}`} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-slate-700 hover:bg-slate-950">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{ticket.subject}</p>
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{ticket.status.replace("_", " ")}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{ticket.account?.name || "Unknown account"}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Reporter: {ticket.reporter?.email || "—"} · Assigned: {ticket.assignedTo?.email || "unassigned"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
