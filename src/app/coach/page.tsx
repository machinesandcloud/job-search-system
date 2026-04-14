import { redirect } from "next/navigation";
import { PageFrame, Section } from "@/components/mvp";
import { MvpCoachRoom } from "@/components/mvp-coach-room";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { listSessionsForUser } from "@/lib/mvp/store";

export default async function CoachPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  const sessions = await listSessionsForUser(userId);
  const live = sessions.find((session) => session.status === "live") || sessions[0] || null;

  return (
    <PageFrame authenticated>
      <Section className="py-12">
        <MvpCoachRoom sessionId={live?.id || null} />
      </Section>
    </PageFrame>
  );
}
