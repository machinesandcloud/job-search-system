import { redirect } from "next/navigation";
import { Card, Eyebrow, PageFrame, Section } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export default async function SettingsPage() {
  if (!(await getCurrentUserId())) {
    redirect("/login");
  }

  return (
    <PageFrame authenticated>
      <Section className="py-12">
        <Eyebrow>Settings and Privacy</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">Control retention, memory, and communication preferences.</h1>
      </Section>
      <Section className="grid gap-6 py-4 lg:grid-cols-3">
        {[
          {
            title: "Data retention",
            body: "This MVP persists local JSON-backed transcripts, sessions, documents, and reviews so the rebuilt product works without external services.",
          },
          {
            title: "Coaching memory",
            body: "Session notes and recap state are intentionally scoped to coaching context instead of keeping a raw dump of everything everywhere.",
          },
          {
            title: "Account actions",
            body: "Logout is live, and the schema now has room for document deletion, history purging, and full-account removal work.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">{item.title}</p>
            <p className="mt-4 text-base leading-7 text-white/70">{item.body}</p>
          </Card>
        ))}
      </Section>
    </PageFrame>
  );
}
