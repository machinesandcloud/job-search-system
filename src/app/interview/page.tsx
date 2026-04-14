import { redirect } from "next/navigation";
import { PageFrame, Section } from "@/components/mvp";
import { MvpInterviewSetup } from "@/components/mvp-interview-setup";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function InterviewPage() {
  if (!(await getCurrentUserId())) {
    redirect("/login");
  }

  return (
    <PageFrame authenticated>
      <Section className="py-12">
        <MvpInterviewSetup />
      </Section>
    </PageFrame>
  );
}
