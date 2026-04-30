import type { ReactNode } from "react";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { CoachAdminThemeShell } from "@/components/coach-admin-theme-shell";

export default async function CoachAdminLayout({ children }: LayoutProps<"/coach-admin"> & { children: ReactNode }) {
  const session = await getCoachAdminSession();

  return (
    <CoachAdminThemeShell
      session={session ? { email: session.email, role: session.role } : null}
    >
      {children}
    </CoachAdminThemeShell>
  );
}
