import Link from "next/link";
import { Card, Eyebrow, PageFrame, Section, Stat } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

const useCases = [
  {
    title: "Resume review",
    body: "Upload PDF or DOCX files and get structured feedback on ATS readiness, clarity, impact, and positioning.",
  },
  {
    title: "LinkedIn review",
    body: "Paste profile sections or upload an export to rewrite your headline, About section, and experience entries.",
  },
  {
    title: "Mock interviews",
    body: "Practice by voice or text, then get direct feedback on structure, specificity, and confidence.",
  },
  {
    title: "Career guidance",
    body: "Use session memory and coaching context to clarify role fit, positioning gaps, and next actions.",
  },
];

const architecture = [
  "OpenAI Realtime-ready session architecture with transcript and event ingestion",
  "Avatar adapter layer prepared for Tavus with graceful audio-only fallback",
  "Document-aware workflows for resume and LinkedIn analysis",
  "Dashboard, action plans, usage limits, privacy controls, and saved session history",
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <Section className="grid gap-10 pb-10 pt-14 md:grid-cols-[1.15fr_0.85fr] md:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>AI Career Coach MVP</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">
            Talk face-to-face with an AI coach that fixes your resume, sharpens your LinkedIn, and runs live interview prep.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            The old job-search funnel has been replaced with the new product shape from the April 13, 2026 build spec: onboarding, dashboard, live coaching room, document reviews, mock interviews, session recap, and privacy controls.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {userId ? (
              <Link href="/dashboard" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100">
                Open dashboard
              </Link>
            ) : (
              <DemoStartButton href="/dashboard" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100">
                Try demo instantly
              </DemoStartButton>
            )}
            <Link href="/coach" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-white/28">
              Enter live room
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Core surfaces rebuilt" value="8" />
            <Stat label="Spec-aligned APIs added" value="10" />
            <Stat label="MVP modes" value="6" />
          </div>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">Live coaching room</p>
            <div className="mt-4 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.22),transparent_40%),#111c2b] p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/48">
                <span>Avatar online</span>
                <span>Realtime connected</span>
              </div>
              <div className="mt-4 grid min-h-[260px] place-items-center rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
                <div className="text-center">
                  <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-orange-200/30 bg-[linear-gradient(135deg,rgba(249,115,22,0.65),rgba(244,63,94,0.60))] text-3xl font-semibold shadow-[0_22px_55px_rgba(244,63,94,0.30)]">
                    AI
                  </div>
                  <p className="mt-5 text-xl font-semibold text-white">Structured coaching in voice, video, or text</p>
                  <p className="mt-2 text-sm text-white/60">Listening, thinking, speaking, and reviewing document states are all visible.</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-3 text-center text-xs text-white/62">
                {["Mic", "Speaker", "Avatar", "Captions", "End"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-6">
            {architecture.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white/74">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => (
            <Card key={item.title}>
              <p className="text-sm uppercase tracking-[0.22em] text-orange-100/80">{item.title}</p>
              <p className="mt-4 text-base leading-7 text-white/70">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <Eyebrow>What changed</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">The product is now centered on ongoing coaching, not a one-off assessment funnel.</h2>
          <p className="mt-4 text-base leading-7 text-white/70">
            The new information architecture follows the spec directly: authentication, onboarding, dashboard, live session, specialized review workspaces, saved recaps, and settings/privacy. The old `job-search-system` experience now forwards into this rebuilt flow.
          </p>
        </Card>
        <Card>
          <Eyebrow>MVP boundaries</Eyebrow>
          <div className="mt-5 grid gap-3 text-sm text-white/72">
            <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">In scope: browser-based coaching, voice/avatar-ready session architecture, document review, memory, analytics hooks, free-tier metering.</div>
            <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">Out of scope: mobile apps, LinkedIn scraping, enterprise seats, ATS integrations, unlimited free usage.</div>
            <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">Implementation note: provider integrations are abstracted and currently stubbed so the app shape is in place without hard-coding one vendor everywhere.</div>
          </div>
        </Card>
      </Section>
    </PageFrame>
  );
}
