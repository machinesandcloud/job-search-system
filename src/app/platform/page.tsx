import { getCurrentUserId } from "@/lib/mvp/auth";
import { Card, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";

export default async function PlatformPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Platform"
      title="One coaching platform for resume reviews, LinkedIn rewrites, interviews, and follow-through."
      description="The strongest reference sites explain the product through dedicated pages and product modules. This page does the same: product architecture, workflows, and the surfaces that make the coach usable day to day."
      primaryCta={{ href: "/dashboard", label: "Open dashboard" }}
      secondaryCta={{ href: "/use-cases", label: "See use cases" }}
    >
      <Section className="grid gap-6 pt-4 lg:grid-cols-3">
        {[
          {
            title: "Live coaching room",
            body: "A focused session surface with transcript, context, session controls, and action-plan drafting in one place.",
          },
          {
            title: "Review workspaces",
            body: "Dedicated pages for resume and LinkedIn review outputs so the coach can diagnose, rewrite, and prioritize fixes clearly.",
          },
          {
            title: "Saved memory",
            body: "The coach stores relevant goals, prior notes, and session summaries so future interactions start with continuity instead of repetition.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">{item.title}</p>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">{item.body}</p>
          </Card>
        ))}
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Platform flow</p>
          <div className="mt-5 grid gap-4">
            {[
              "1. Start with onboarding so the coach knows your role direction and current blockers.",
              "2. Choose a use case: resume, LinkedIn, interview practice, or career guidance.",
              "3. Work in a dedicated surface with visible transcript, structured outputs, and next actions.",
              "4. Save the recap back to the dashboard so the next session starts where the last one left off.",
            ].map((step) => (
              <div key={step} className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-soft)] px-5 py-4 text-sm text-[var(--muted)]">{step}</div>
            ))}
          </div>
        </Card>
        <Card className="bg-[var(--surface-strong)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">What this should feel like</p>
          <div className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">Coach-led, not AI-led</div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">Outcome-first, not prompt-first</div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">Workspace-oriented, not landing-page-only</div>
          </div>
        </Card>
      </Section>
    </MarketingShell>
  );
}
