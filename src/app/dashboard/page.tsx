import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ZariPortal } from "@/components/zari-portal";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");
  return <ZariPortal />;
}
