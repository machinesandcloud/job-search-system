import { redirect } from "next/navigation";
import { PageFrame, Section } from "@/components/mvp";
import { MvpOnboardingForm } from "@/components/mvp-onboarding-form";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { getUserById } from "@/lib/mvp/store";

export default async function OnboardingPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/signup");
  }

  const user = await getUserById(userId);
  if (!user) {
    redirect("/signup");
  }

  return (
    <PageFrame authenticated>
      <Section className="max-w-4xl py-18">
        <MvpOnboardingForm profile={user.profile} />
      </Section>
    </PageFrame>
  );
}
