"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";
import {
  coachAdminGhostButtonClass,
  coachAdminTextPrimaryClass,
  coachAdminTextSoftClass,
  cx,
} from "@/components/coach-admin-ui";

function RailIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NAV_ITEMS = [
  {
    href: "/coach-admin",
    label: "Overview",
    path: "M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-5h6v5",
  },
  {
    href: "/coach-admin/tickets",
    label: "Support",
    path: "M7 18h7.5A4.5 4.5 0 0 0 19 13.5V8.8A2.8 2.8 0 0 0 16.2 6H7.8A2.8 2.8 0 0 0 5 8.8v7.4L7 18Zm3-6h4m-7-3h10",
  },
];

function getEmailDisplay(email: string) {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email;
  if (`${localPart}@${domain}`.length <= 18) return `${localPart}@${domain}`;
  return `${localPart.slice(0, 8)}…@${domain}`;
}

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
  const emailDisplay = getEmailDisplay(email);
  const initials = getInitials(email);

  return (
    <div className="hidden h-[calc(100vh-2rem)] min-h-[760px] xl:flex xl:flex-col">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-[color:var(--ca-border)] bg-[linear-gradient(180deg,var(--ca-shell-start),var(--ca-panel-end))] p-4 shadow-[var(--ca-panel-shadow)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--ca-ambient-1),transparent_35%),radial-gradient(circle_at_bottom,var(--ca-ambient-2),transparent_28%)]" />

        <div className="relative mb-6 flex h-16 items-center justify-center rounded-[22px] border border-[color:var(--ca-border)] bg-[var(--ca-chip-bg)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4361EE,#06B6D4)] shadow-[0_12px_30px_rgba(67,97,238,0.32)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className="h-5 w-5 text-white">
              <path d="M8 12h8M12 8v8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-between">
          <nav className="grid gap-3">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/coach-admin" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "group flex h-14 items-center justify-center rounded-2xl border transition",
                    active
                      ? "border-[#6378FF]/28 bg-[linear-gradient(135deg,rgba(67,97,238,0.3),rgba(6,182,212,0.12))] text-white shadow-[0_12px_30px_rgba(67,97,238,0.22)]"
                      : "border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] text-[color:var(--ca-text-muted)] hover:border-[color:var(--ca-border-strong)] hover:bg-[var(--ca-surface-hover)] hover:text-[color:var(--ca-text)]"
                  )}
                  title={item.label}
                >
                  <RailIcon path={item.path} />
                </Link>
              );
            })}
          </nav>

          <div className="relative mt-6 grid gap-3">
            <div className="rounded-[24px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] px-3.5 py-3">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">Live operator</p>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-[color:var(--ca-border)] bg-[var(--ca-chip-bg)] text-xs font-semibold tracking-[0.12em] text-cyan-300">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p title={email} className={cx("truncate text-sm font-medium", coachAdminTextPrimaryClass)}>
                    {emailDisplay}
                  </p>
                  <p className={cx("mt-1 text-[10px] uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>
                    {role}
                  </p>
                </div>
              </div>
            </div>
            <CoachAdminLogoutButton className={cx(coachAdminGhostButtonClass, "w-full justify-center")} />
          </div>
        </div>
      </div>
    </div>
  );
}
