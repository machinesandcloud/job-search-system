import { PageFrame, Section } from "@/components/mvp";
import { MvpAuthForm } from "@/components/mvp-auth-form";

export default function LoginPage() {
  return (
    <PageFrame authenticated={false}>
      <Section className="max-w-3xl py-20">
        <MvpAuthForm mode="login" />
      </Section>
    </PageFrame>
  );
}
