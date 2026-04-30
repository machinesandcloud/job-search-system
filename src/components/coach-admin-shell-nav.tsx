"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  coachAdminTextPrimaryClass,
  coachAdminTextSoftClass,
  cx,
} from "@/components/coach-admin-ui";

function NavIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NAV_ITEMS = [
  {
    href: "/coach-admin",
    label: "Billing Overview",
    section: "Navigation",
    path: "M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-5h6v5",
  },
  {
    href: "/coach-admin/tickets",
    label: "Support Queue",
    section: "Navigation",
    path: "M7 18h7.5A4.5 4.5 0 0 0 19 13.5V8.8A2.8 2.8 0 0 0 16.2 6H7.8A2.8 2.8 0 0 0 5 8.8v7.4L7 18Zm3-6h4m-7-3h10",
  },
];

function getInitials(email: string) {
  const localPart = email.split("@")[0] || "A";
  return localPart
    .split(/[^a-z0-9]/i)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || localPart.slice(0, 2).toUpperCase();
}

export function CoachAdminShellNav({
  email,
  role,
}: {
  email: string;
  role: string;
}) {
  const pathname = usePathname();
  const initials = getInitials(email);

  return (
    <aside className="hidden w-[286px] shrink-0 border-r border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] xl:flex xl:min-h-screen xl:flex-col">
      <div className="flex h-full flex-col px-4 py-4">
        <div className="flex items-center justify-between rounded-[18px] px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#3B82F6_0%,#2563EB_100%)] text-white shadow-[0_8px_20px_rgba(37,99,235,0.32)]">
              <span className="text-sm font-bold tracking-[-0.05em]">Z</span>
            </div>
            <div>
              <div className={cx("text-[1.05rem] font-semibold tracking-[-0.04em]", coachAdminTextPrimaryClass)}>Zari</div>
              <div className={cx("text-[11px] uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>Coach Admin</div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={cx("text-[11px] font-semibold uppercase tracking-[0.18em]", coachAdminTextSoftClass)}>Surface</p>
              <p className={cx("mt-1 text-sm font-semibold", coachAdminTextPrimaryClass)}>Billing & support</p>
            </div>
            <div className="rounded-full border border-emerald-400/22 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
              Live
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div className={cx("px-2 text-[11px] font-semibold uppercase tracking-[0.22em]", coachAdminTextSoftClass)}>Navigation</div>
          <nav className="mt-3 grid gap-2">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/coach-admin" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "flex items-center gap-3 rounded-[16px] px-4 py-3 transition",
                    active
                      ? "bg-[linear-gradient(135deg,#3B82F6_0%,#2563EB_100%)] text-white shadow-[0_10px_24px_rgba(37,99,235,0.26)]"
                      : "text-[color:var(--ca-text-muted)] hover:bg-[var(--ca-surface-hover)] hover:text-[color:var(--ca-text)]"
                  )}
                >
                  <span className={cx("flex h-9 w-9 items-center justify-center rounded-[12px] border", active ? "border-white/12 bg-white/12" : "border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)]")}>
                    <NavIcon path={item.path} />
                  </span>
                  <span className="text-sm font-semibold tracking-[-0.02em]">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto pt-6">
          <div className="rounded-[22px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/90">Live operator</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[color:var(--ca-border)] bg-[var(--ca-chip-bg)] text-sm font-semibold text-cyan-300">
                {initials}
              </div>
              <div className="min-w-0">
                <p className={cx("truncate text-sm font-semibold", coachAdminTextPrimaryClass)} title={email}>
                  {email}
                </p>
                <p className={cx("mt-1 text-[10px] uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>
                  {role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
