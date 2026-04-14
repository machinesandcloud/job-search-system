import Link from "next/link";
import { Card, Eyebrow, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";
import { getCurrentUserId } from "@/lib/mvp/auth";

const modules = [
  {
    title: "Live coaching room",
    body: "Voice-first or text-first sessions with visible context, saved notes, and recap generation in one place.",
  },
  {
    title: "Document workspaces",
    body: "Resume and LinkedIn reviews live in dedicated surfaces so feedback stays structured and editable.",
  },
  {
    title: "Dashboard memory",
    body: "Goals, prior sessions, uploaded documents, and next steps stay connected instead of resetting each visit.",
  },
  {
    title: "Interview prep",
    body: "Practice responses, capture the transcript, and work back from weak answers into stronger evidence.",
  },
];

const flow = [
  "Choose a target role and tell the coach what is breaking: callbacks, narrative, confidence, or signal quality.",
  "Upload the current resume or LinkedIn draft and open the right workspace.",
  "Run a session that diagnoses issues, rewrites the highest-leverage parts, and prepares the next conversation.",
  "Save the recap, return to the dashboard, and pick up from the last action instead of starting over.",
];

export default async function PlatformPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Platform"
      title="A coaching platform organized around sessions, documents, and next steps."
      description="Strong coaching products make the operating model obvious. Askia Coach is built around dedicated workspaces, persistent context, and saved follow-through so every session produces work you can actually use."
      primaryCta={{ href: "/dashboard", label: "Open dashboard" }}
      secondaryCta={{ href: "/use-cases", label: "Explore use cases" }}
      spotlightTitle="Structured coaching that keeps moving."
      spotlightBody="This page explains the system behind the experience: how sessions start, where documents live, and why the product is split into dedicated workspaces rather than one generic chat thread."
      spotlightPoints={[
        "Dedicated workspaces for resume review, LinkedIn rewriting, interview prep, and recaps.",
        "Visible session context so users can understand what the coach is responding to.",
        "Saved action plans and memory so each new session starts with continuity.",
      ]}
      stats={[
        { label: "Workspaces", value: "4" },
        { label: "Dashboard", value: "Persistent" },
        { label: "Recaps", value: "Saved" },
      ]}
    >
      <Section className="grid gap-5 pt-8 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((item, index) => (
          <Card key={item.title} className={index === 0 ? "bg-[var(--surface-muted)]" : ""}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--blue)]">{item.title}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
          </Card>
        ))}
      </Section>

      <Section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="border-none bg-[var(--navy)] text-white">
          <Eyebrow dark>Platform flow</Eyebrow>
          <div className="mt-7 grid gap-4">
            {flow.map((item, index) => (
              <div key={item} className="grid gap-4 rounded-[26px] border border-white/10 bg-white/6 p-6 md:grid-cols-[56px_1fr]">
                <div className="text-3xl leading-none tracking-[-0.05em] text-white/45">{`0${index + 1}`}</div>
                <p className="text-sm leading-7 text-white/78">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">What the platform should feel like</p>
            <div className="mt-5 grid gap-3">
              {[
                "Calm and high-trust, not gimmicky or over-animated.",
                "Coach-led and outcome-led, not prompt-led.",
                "Specific about the work being done on every page.",
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </Card>
          <Card className="bg-[linear-gradient(135deg,#3559e6_0%,#6e8dff_100%)] text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">Next surface</p>
            <h3 className="mt-5 text-4xl leading-[1] tracking-[-0.04em]">See the product through the jobs candidates actually need done.</h3>
            <Link href="/use-cases" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--bg)]">
              Go to use cases
            </Link>
          </Card>
        </div>
      </Section>
    </MarketingShell>
  );
}
