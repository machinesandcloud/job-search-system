import Link from "next/link";
import type { ReactNode } from "react";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";

export default async function CoachAdminLayout({ children }: LayoutProps<"/coach-admin"> & { children: ReactNode }) {
  const session = await getCoachAdminSession();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-5 shadow-2xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Coach Admin</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Billing, accounts, and support</h1>
          </div>
          {session ? (
            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-2 text-sm text-slate-300">
                <Link href="/coach-admin" className="rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white">Overview</Link>
                <Link href="/coach-admin/tickets" className="rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white">Tickets</Link>
              </nav>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-200">{session.email}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{session.role}</p>
              </div>
              <CoachAdminLogoutButton />
            </div>
          ) : null}
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
