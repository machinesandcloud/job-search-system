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
  const compact = `${localPart}@${domain}`;
  if (compact.length <= 24) return compact;
  if (localPart.length <= 12) return `${localPart}@…`;
  return `${localPart.slice(0, 12)}…`;
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
      <div className="relative flex h-full flex-col overflow-hidden rounded-[34px] border border-[color:var(--ca-border)] bg-[linear-gradient(180deg,var(--ca-shell-start),var(--ca-panel-end))] p-5 shadow-[var(--ca-panel-shadow)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--ca-ambient-1),transparent_35%),radial-gradient(circle_at_bottom,var(--ca-ambient-2),transparent_28%)]" />

        <div className="relative mb-7 flex h-[74px] items-center justify-center rounded-[24px] border border-[color:var(--ca-border)] bg-[var(--ca-chip-bg)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#3B82F6,#2563EB)] shadow-[0_12px_30px_rgba(37,99,235,0.32)]">
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
                    "group flex h-[60px] items-center justify-center rounded-[22px] border transition",
                    active
                      ? "border-[#3B82F6]/30 bg-[linear-gradient(135deg,#3B82F6,#2563EB)] text-white shadow-[0_12px_30px_rgba(37,99,235,0.26)]"
                      : "border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] text-[color:var(--ca-text-muted)] hover:border-[color:var(--ca-border-strong)] hover:bg-[var(--ca-surface-hover)] hover:text-[color:var(--ca-text)]"
                  )}
                  title={item.label}
                >
                  <RailIcon path={item.path} />
                </Link>
              );
            })}
          </nav>

          <div className="relative mt-8 grid gap-3">
            <div className="rounded-[28px] border border-[color:var(--ca-border)] bg-[linear-gradient(180deg,var(--ca-surface-soft),rgba(14,24,40,0.98))] px-4 py-4">
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/90">Live operator</p>
              <div className="mt-3.5 flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-[18px] border border-[color:var(--ca-border)] bg-[var(--ca-chip-bg)] text-base font-semibold tracking-[0.12em] text-cyan-300">
                  {initials}
                </div>
                <div className="w-full min-w-0 text-center">
                  <p title={email} className={cx("mx-auto max-w-full truncate text-[13px] font-semibold leading-5", coachAdminTextPrimaryClass)}>
                    {emailDisplay}
                  </p>
                  <p className={cx("mt-1.5 text-[10px] uppercase tracking-[0.22em]", coachAdminTextSoftClass)}>
                    {role}
                  </p>
                </div>
              </div>
            </div>
            <CoachAdminLogoutButton className={cx(coachAdminGhostButtonClass, "h-[50px] w-full justify-center px-4")} />
          </div>
        </div>
      </div>
    </div>
  );
}
