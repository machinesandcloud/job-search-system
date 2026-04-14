import { redirect } from "next/navigation";
import { PageFrame, Section } from "@/components/mvp";
import { MvpDashboardClient } from "@/components/mvp-dashboard-client";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  return (
    <PageFrame authenticated>
      <Section className="py-12">
        <MvpDashboardClient />
      </Section>
    </PageFrame>
  );
}
