import Link from "next/link";
import type { ReactNode } from "react";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";
import { CoachAdminPill } from "@/components/coach-admin-ui";
import { CoachAdminShellNav } from "@/components/coach-admin-shell-nav";

export default async function CoachAdminLayout({ children }: LayoutProps<"/coach-admin"> & { children: ReactNode }) {
  const session = await getCoachAdminSession();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(67,97,238,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_24%),radial-gradient(circle_at_bottom,rgba(129,140,248,0.10),transparent_26%)]" />
        <div className="absolute left-[-12%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#4361EE]/20 blur-[120px]" />
        <div className="absolute bottom-[-14%] right-[-8%] h-[360px] w-[360px] rounded-full bg-cyan-500/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1680px] px-4 py-4 md:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[108px_minmax(0,1fr)]">
          {session ? <CoachAdminShellNav email={session.email} role={session.role} /> : <div className="hidden xl:block" />}

          <div className="space-y-6">
            <header className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(13,18,34,0.96),rgba(10,16,30,0.88))] px-6 py-6 shadow-[0_24px_90px_rgba(2,6,23,0.58)] backdrop-blur-2xl md:px-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(67,97,238,0.22),transparent_30%),radial-gradient(circle_at_right,rgba(6,182,212,0.12),transparent_24%)]" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <CoachAdminPill tone="cyan">Coach Admin Console</CoachAdminPill>
                  <h1 className="mt-4 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.07em] text-white md:text-[3rem]">
                    Billing, accounts,
                    <span className="gradient-text-zari"> and support ops.</span>
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-[15px]">
                    Internal command surface for subscriptions, account health, support queue, and usage telemetry. Same visual language as the platform, but tuned for operator speed.
                  </p>
                </div>

                {session ? (
                  <div className="flex flex-col gap-4 lg:items-end">
                    <nav className="flex flex-wrap items-center gap-2">
                      <Link href="/coach-admin" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/72 transition hover:border-white/18 hover:bg-white/[0.09] hover:text-white">
                        Overview
                      </Link>
                      <Link href="/coach-admin/tickets" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/72 transition hover:border-white/18 hover:bg-white/[0.09] hover:text-white">
                        Tickets
                      </Link>
                    </nav>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-right">
                        <p className="text-sm font-medium text-white">{session.email}</p>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/42">{session.role}</p>
                      </div>
                      <CoachAdminLogoutButton className="xl:hidden" />
                    </div>
                  </div>
                ) : null}
              </div>
            </header>

            <div className="relative">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

