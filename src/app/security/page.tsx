import { getCurrentUserId } from "@/lib/mvp/auth";
import { Card, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";

export default async function SecurityPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Security"
      title="Trust and privacy need their own page."
      description="Culture Amp and CoachHub both give trust its own narrative. This product should do the same: data use, session retention, account controls, and provider boundaries should be visible instead of implied."
      primaryCta={{ href: "/settings", label: "Open privacy settings" }}
      secondaryCta={{ href: "/platform", label: "Back to platform" }}
    >
      <Section className="grid gap-6 pt-4 lg:grid-cols-3">
        {[
          {
            title: "Scoped coaching memory",
            body: "Store relevant summaries, goals, and notes instead of treating raw conversation logs as the product.",
          },
          {
            title: "Document controls",
            body: "Resume and profile files should be isolated to the user, deletable, and clearly tied to the session that used them.",
          },
          {
            title: "Provider abstraction",
            body: "Realtime and avatar providers should sit behind clear service boundaries so reliability and privacy choices can evolve.",
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
