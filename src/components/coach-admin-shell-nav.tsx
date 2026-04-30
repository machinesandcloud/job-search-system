"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

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

export function CoachAdminShellNav({
  email,
  role,
}: {
  email: string;
  role: string;
}) {
  const pathname = usePathname();

  return (
    <div className="hidden h-[calc(100vh-2rem)] min-h-[760px] xl:flex xl:flex-col">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,16,31,0.96),rgba(5,8,18,0.96))] p-4 shadow-[0_20px_90px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(67,97,238,0.22),transparent_35%),radial-gradient(circle_at_bottom,rgba(6,182,212,0.14),transparent_28%)]" />

        <div className="relative mb-6 flex h-16 items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.06]">
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
                      : "border-white/8 bg-white/[0.03] text-white/55 hover:border-white/16 hover:bg-white/[0.07] hover:text-white"
                  )}
                  title={item.label}
                >
                  <RailIcon path={item.path} />
                </Link>
              );
            })}
          </nav>

          <div className="relative mt-6 grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/70">Live operator</p>
              <p className="mt-3 break-all text-sm font-medium text-white">{email}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">{role}</p>
            </div>
            <CoachAdminLogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

