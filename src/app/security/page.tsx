import Link from "next/link";
import { Card, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";
import { getCurrentUserId } from "@/lib/mvp/auth";

const controls = [
  {
    title: "Scoped coaching memory",
    body: "Store summaries, goals, and relevant notes so future sessions start with context instead of replaying the entire past.",
  },
  {
    title: "Document ownership",
    body: "Resume and profile uploads stay tied to the account that created them and should remain deletable from the product.",
  },
  {
    title: "Provider boundaries",
    body: "Realtime, review generation, and avatar services should remain behind explicit service layers so privacy and vendor choices stay flexible.",
  },
];

export default async function SecurityPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Security"
      title="Trust, privacy, and control should be obvious without digging."
      description="Competitor sites make space for trust because users need to know what is stored, what is private, and what parts of the experience are handled by external providers. This page does the same for Askia Coach."
      primaryCta={{ href: "/settings", label: "Open settings" }}
      secondaryCta={{ href: "/platform", label: "Back to platform" }}
      spotlightTitle="Private by product design, not just footer copy."
      spotlightBody="A coaching product needs to be explicit about memory, document handling, and provider boundaries. Candidates are uploading resumes, practicing sensitive stories, and saving notes that should remain under their control."
      spotlightPoints={[
        "Only store what improves continuity and user value.",
        "Make deletion and session scoping visible in the product.",
        "Keep provider usage narrow and explain it plainly.",
      ]}
      stats={[
        { label: "Memory", value: "Scoped" },
        { label: "Uploads", value: "Owned" },
        { label: "Providers", value: "Bounded" },
      ]}
    >
      <Section className="grid gap-5 pt-8 lg:grid-cols-3">
        {controls.map((item) => (
          <Card key={item.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--blue)]">{item.title}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
          </Card>
        ))}
      </Section>

      <Section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="border-none bg-[var(--navy)] text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Security principles</p>
          <div className="mt-6 grid gap-4">
            {[
              "Collect the least data necessary to improve the coaching experience.",
              "Prefer scoped summaries and structured memory over raw transcript dependence.",
              "Expose account controls so users can manage documents, sessions, and history.",
              "Document where third-party services are involved and what they do.",
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4 text-sm leading-7 text-white/78">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-[var(--surface-muted)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Operational trust</p>
          <h2 className="mt-5 text-5xl leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">Candidates should understand how the product handles their work before they upload anything.</h2>
          <p className="mt-5 text-base leading-8 text-[var(--muted)]">
            Security here is not just infrastructure language. It is product clarity: what is kept, what is optional, what is shared with
            providers, and what can be removed.
          </p>
          <Link href="/pricing" className="mt-6 inline-flex rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--blue)]">
            View plans
          </Link>
        </Card>
      </Section>
    </MarketingShell>
  );
}
