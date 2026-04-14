import { getCurrentUserId } from "@/lib/mvp/auth";
import { Card, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";

export default async function UseCasesPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Use Cases"
      title="Pages for each coaching job, not one generic AI promise."
      description="The reference products make their value legible by separating distinct outcomes. This site should do the same for resumes, LinkedIn positioning, mock interviews, and career guidance."
      primaryCta={{ href: "/workspaces/resume", label: "Start with resume" }}
      secondaryCta={{ href: "/interview", label: "Try interview prep" }}
    >
      <Section className="grid gap-6 pt-4 md:grid-cols-2">
        {[
          {
            title: "Resume review",
            body: "Diagnose weak metrics, missing signals, and generic bullets, then rewrite the highest-leverage sections.",
          },
          {
            title: "LinkedIn rewrite",
            body: "Make headline, About section, and experience entries read like a deliberate, coherent transition.",
          },
          {
            title: "Interview preparation",
            body: "Practice the answers aloud, keep the transcript visible, and improve structure, confidence, and evidence.",
          },
          {
            title: "Career direction",
            body: "Clarify target roles, identify narrative gaps, and leave with a next-step plan instead of vague advice.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">{item.title}</p>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">{item.body}</p>
          </Card>
        ))}
      </Section>
    </MarketingShell>
  );
}
