import Link from "next/link";
import { Card, Eyebrow, PageFrame, Section, Stat } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

const useCases = [
  {
    title: "Resume review",
    body: "Get direct feedback on clarity, metrics, ATS signals, and role fit without having to decode generic AI output.",
  },
  {
    title: "LinkedIn rewrite",
    body: "Tighten headline, About section, and experience bullets so your profile reads like a deliberate career move.",
  },
  {
    title: "Mock interviews",
    body: "Practice aloud, keep the transcript visible, and get concrete feedback on structure, specificity, and confidence.",
  },
  {
    title: "Career direction",
    body: "Use session history and documents together to clarify fit, gaps, and the next highest-value move.",
  },
];

const principles = [
  "Structured coaching over generic motivation",
  "Visible transcript, saved notes, and action plans",
  "Warm editorial design instead of generic AI sci-fi",
  "Built to evolve into realtime voice and avatar sessions",
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <Section className="grid gap-8 pb-8 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl">
          <Eyebrow>AI Career Coach</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-[var(--ink)] md:text-7xl">
            Career coaching that fixes the materials, the message, and the interview.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Askia Coach is a document-aware coaching workspace for resume review, LinkedIn positioning, mock interviews, and saved action plans. It should feel like a sharp, practical coach. Not a glowing chatbot.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {userId ? (
              <Link href="/dashboard" className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">
                Open dashboard
              </Link>
            ) : (
              <DemoStartButton href="/dashboard" className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">
                Try demo instantly
              </DemoStartButton>
            )}
            <Link href="/workspaces/resume" className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--teal)]">
              Review resume
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Use cases" value="4" />
            <Stat label="Saved surfaces" value="8" />
            <Stat label="Buildable MVP" value="Yes" />
          </div>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-[var(--border)] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Coaching workspace</p>
            <div className="mt-5 rounded-[26px] border border-[var(--border)] bg-[var(--bg-soft)] p-5">
              <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    <span>Live coaching room</span>
                    <span>Resume mode</span>
                  </div>
                  <div className="mt-5 rounded-[22px] bg-[linear-gradient(180deg,#efe7db,#e3d8c8)] p-5">
                    <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Coach focus</p>
                      <p className="mt-3 text-xl font-semibold text-[var(--ink)]">Translate customer-ops experience into TPM evidence.</p>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Three strongest gaps: vague scope, weak systems language, and missing cross-functional delivery proof.</p>
                    </div>
                    <div className="mt-4 flex gap-2 text-xs font-semibold text-[var(--muted)]">
                      {["Mic", "Captions", "Notes", "Complete"].map((item) => (
                        <div key={item} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Transcript</p>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl bg-[var(--bg-soft)] p-3 text-sm text-[var(--ink)]">What outcome matters most today: sharper stories, stronger positioning, or mock interview practice?</div>
                      <div className="rounded-2xl bg-[var(--teal-soft)] p-3 text-sm text-[var(--ink)]">I need to reposition for TPM roles and stop sounding vague.</div>
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Action plan</p>
                    <ul className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
                      <li className="rounded-2xl bg-[var(--bg-soft)] px-3 py-3">Rewrite top 3 bullets around scope, systems, and measurable outcomes.</li>
                      <li className="rounded-2xl bg-[var(--bg-soft)] px-3 py-3">Refresh LinkedIn headline for delivery leadership and TPM transition.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 p-6">
            {principles.map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section className="grid gap-5 pt-4 md:grid-cols-2 xl:grid-cols-4">
        {useCases.map((item) => (
          <Card key={item.title}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{item.title}</p>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">{item.body}</p>
          </Card>
        ))}
      </Section>

      <Section className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <Card className="bg-[var(--ink)] text-[var(--bg-soft)]">
          <Eyebrow>Why This Works</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">The best career tools look more like a premium workspace than an AI theme pack.</h2>
          <p className="mt-4 text-base leading-7 text-[rgba(246,241,232,0.72)]">
            This product needs trust, clarity, and visible outputs. That means strong typography, real UI framing, warm neutrals, and clear coaching structure. Not neon gradients, not faux command-center styling.
          </p>
        </Card>
        <Card>
          <Eyebrow>Product Shape</Eyebrow>
          <div className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-4">Landing page that explains the offer without AI hype language.</div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-4">Dashboard with saved sessions, usage limits, and action plans.</div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-4">Resume, LinkedIn, and interview workspaces with outputs that feel coach-led and practical.</div>
          </div>
        </Card>
      </Section>
    </PageFrame>
  );
}
