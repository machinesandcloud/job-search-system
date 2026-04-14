import { redirect } from "next/navigation";
import { PageFrame, Section } from "@/components/mvp";
import { MvpReviewWorkspace } from "@/components/mvp-review-workspace";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function ResumeWorkspacePage() {
  if (!(await getCurrentUserId())) {
    redirect("/login");
  }

  return (
    <PageFrame authenticated>
      <Section className="py-12">
        <MvpReviewWorkspace
          type="resume"
          title="Structured resume review with scores, findings, and rewrites."
          subtitle="Upload document metadata, run a resume review, and refresh the workspace from the local MVP store."
        />
      </Section>
    </PageFrame>
  );
}
