import { redirect } from "next/navigation";
import { PageFrame, Section } from "@/components/mvp";
import { MvpReviewWorkspace } from "@/components/mvp-review-workspace";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function LinkedinWorkspacePage() {
  if (!(await getCurrentUserId())) {
    redirect("/login");
  }

  return (
    <PageFrame authenticated>
      <Section className="py-12">
        <MvpReviewWorkspace
          type="linkedin"
          title="Guided profile review with rewrite suggestions and positioning scores."
          subtitle="Upload LinkedIn profile metadata, generate a fresh review, and keep the workspace in sync with the persistent store."
        />
      </Section>
    </PageFrame>
  );
}
