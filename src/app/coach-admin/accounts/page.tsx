import Link from "next/link";
import {
  CoachAdminEmptyState,
  CoachAdminPanel,
  CoachAdminPill,
  coachAdminFilterButtonBaseClass,
  coachAdminListCardClass,
  coachAdminTextMutedClass,
  coachAdminTextPrimaryClass,
  cx,
} from "@/components/coach-admin-ui";
import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import {
  getReadablePlanName,
  getPlanIncludedMonthlyCredits,
  isPaymentIssueSubscriptionStatus,
} from "@/lib/billing";

function statusTone(status?: string | null) {
  const v = `${status || ""}`.toLowerCase();
  if (v === "active" || v === "trialing") return "emerald" as const;
  if (v === "past_due" || v === "unpaid") return "gold" as const;
  if (v === "canceled" || v === "incomplete_expired") return "rose" as const;
  return "slate" as const;
}

function statusLabel(status?: string | null) {
  if (!status) return "No plan";
  return status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

const TONE_CLASSES: Record<string, string> = {
  emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  gold: "border-amber-500/25 bg-amber-500/10 text-amber-400",
  rose: "border-rose-500/25 bg-rose-500/10 text-rose-400",
  slate: "border-slate-500/25 bg-slate-500/10 text-slate-400",
};

function StatusBadge({ status }: { status?: string | null }) {
  const tone = statusTone(status);
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", TONE_CLASSES[tone])}>
      {statusLabel(status)}
    </span>
  );
}

function filterLink(filter: string, current: string, label: string) {
  const active = current === filter;
  return (
    <Link
      href={filter === "all" ? "/coach-admin/accounts" : `/coach-admin/accounts?filter=${filter}`}
      className={`${coachAdminFilterButtonBaseClass} ${
        active
          ? "border-[#6378FF]/28 bg-[linear-gradient(135deg,rgba(67,97,238,0.3),rgba(6,182,212,0.12))] text-white shadow-[0_12px_30px_rgba(67,97,238,0.22)]"
          : "border-[color:var(--ca-border)] bg-[var(--ca-chip-bg)] text-[color:var(--ca-text-muted)] hover:text-[color:var(--ca-text)]"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; filter?: string }>;
}) {
  await requireCoachAdminSession();

  const { q = "", filter = "all" } = await searchParams;
  const query = q.trim().toLowerCase();

  const accounts = await prisma.account.findMany({
    include: {
      users: { select: { email: true, firstName: true, lastName: true } },
      subscription: { select: { status: true, planName: true, stripePriceId: true, currentPeriodEnd: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  let filtered = accounts;

  if (query) {
    filtered = filtered.filter((a: typeof accounts[number]) => {
      const ownerEmail = a.users[0]?.email?.toLowerCase() ?? "";
      const name = a.name?.toLowerCase() ?? "";
      const planN = a.subscription
        ? getReadablePlanName(a.subscription.planName, a.subscription.stripePriceId).toLowerCase()
        : "";
      return ownerEmail.includes(query) || name.includes(query) || planN.includes(query);
    });
  }

  if (filter === "active") filtered = filtered.filter((a: typeof accounts[number]) => a.subscription?.status === "active" || a.subscription?.status === "trialing");
  if (filter === "issues") filtered = filtered.filter((a: typeof accounts[number]) => isPaymentIssueSubscriptionStatus(a.subscription?.status ?? ""));
  if (filter === "canceled") filtered = filtered.filter((a: typeof accounts[number]) => a.subscription?.status === "canceled");
  if (filter === "no-plan") filtered = filtered.filter((a: typeof accounts[number]) => !a.subscription);

  return (
    <div className="space-y-6">
      <CoachAdminPanel
        title="Accounts"
        description="Search and filter all user accounts."
        action={<CoachAdminPill tone="slate">{filtered.length} results</CoachAdminPill>}
      >
        {/* Search bar */}
        <form method="GET" className="mb-5">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by email, name, or plan…"
            className="w-full rounded-[14px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] px-4 py-3 text-sm text-[color:var(--ca-text)] placeholder:text-[color:var(--ca-text-muted)] outline-none focus:border-[#6378FF]/50 focus:ring-2 focus:ring-[#6378FF]/10 transition"
          />
        </form>

        {/* Filter pills */}
        <div className="mb-5 flex flex-wrap gap-2">
          {filterLink("all", filter, `All (${accounts.length})`)}
          {filterLink("active", filter, "Active / Trialing")}
          {filterLink("issues", filter, "Payment Issues")}
          {filterLink("canceled", filter, "Canceled")}
          {filterLink("no-plan", filter, "No Plan")}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <CoachAdminEmptyState
            title={query ? "No accounts match" : "No accounts yet"}
            body={query ? `No accounts found for "${q}". Try a different search.` : "Accounts appear here once users complete onboarding."}
          />
        ) : (
          <div className="grid gap-3">
            {filtered.map((account: typeof accounts[number]) => {
              const owner = account.users[0];
              const plan = account.subscription
                ? getReadablePlanName(account.subscription.planName, account.subscription.stripePriceId)
                : "No plan";
              const credits = account.subscription
                ? getPlanIncludedMonthlyCredits(account.subscription.planName, account.subscription.stripePriceId)
                : null;
              const renewal = account.subscription?.currentPeriodEnd
                ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(account.subscription.currentPeriodEnd))
                : null;

              return (
                <Link
                  key={account.id}
                  href={`/coach-admin/accounts/${account.id}`}
                  className={cx("flex items-center gap-4 px-4 py-4", coachAdminListCardClass, "rounded-[18px]")}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,rgba(67,97,238,0.2),rgba(6,182,212,0.12))] text-sm font-bold text-[#7B9EFF]">
                    {(owner?.firstName?.[0] ?? owner?.email?.[0] ?? "?").toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cx("truncate font-semibold tracking-[-0.02em]", coachAdminTextPrimaryClass)}>
                      {owner?.firstName && owner?.lastName
                        ? `${owner.firstName} ${owner.lastName}`
                        : owner?.email ?? "Unknown"}
                    </p>
                    <p className={cx("mt-0.5 truncate text-sm", coachAdminTextMutedClass)}>
                      {owner?.email ?? "—"} · {account.users.length} user{account.users.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <StatusBadge status={account.subscription?.status} />
                    <span className={cx("text-xs", coachAdminTextMutedClass)}>{plan}{credits ? ` · ${credits.toLocaleString()} cr/mo` : ""}{renewal ? ` · renews ${renewal}` : ""}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </CoachAdminPanel>
    </div>
  );
}
