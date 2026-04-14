import Link from "next/link";
import { Card, Eyebrow, PageFrame, Section, Stat } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

const outcomes = [
  {
    title: "Resume review",
    body: "See exactly which bullets are weak, what signals are missing, and how to rewrite them for the role you want.",
  },
  {
    title: "LinkedIn rewrite",
    body: "Reposition headline, About, and experience so your profile reads like a coherent move, not a scattered history.",
  },
  {
    title: "Interview practice",
    body: "Practice answers with the transcript visible and get feedback on structure, evidence, confidence, and missed opportunities.",
  },
];

const proof = [
  "Structured coaching, not generic AI replies",
  "Saved sessions, documents, and action plans",
  "Built for resume, LinkedIn, interview, and career direction work",
  "Designed to grow into realtime voice and avatar sessions later",
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <Section className="pb-10 pt-10">
        <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <div className="rounded-[36px] bg-[var(--ink)] px-8 py-10 text-[var(--surface)] shadow-[var(--shadow)] md:px-10 md:py-12">
            <Eyebrow>AI Career Coach</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Fix the resume. Tighten the story. Practice the interview.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(255,250,242,0.72)]">
              Askia Coach is an AI career coaching workspace for resume review, LinkedIn positioning, mock interviews, and saved action plans. The product should feel like a sharp operator at your side, not a novelty chatbot.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {userId ? (
                <Link href="/dashboard" className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-2)]">
                  Open dashboard
                </Link>
              ) : (
                <DemoStartButton href="/dashboard" className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-2)]">
                  Try the product
                </DemoStartButton>
              )}
              <Link href="/platform" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-[var(--surface)] transition hover:border-white/40">
                Explore platform
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Stat label="Coaching jobs" value="4" />
              <Stat label="Core pages" value="12+" />
              <Stat label="Realtime-ready" value="Yes" />
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="rounded-[36px] border-none bg-[var(--sand)] p-0 shadow-[var(--shadow)]">
              <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
                <div className="border-b border-[var(--border)] p-7 md:border-b-0 md:border-r">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    <span>Live coaching room</span>
                    <span>Resume review</span>
                  </div>
                  <div className="mt-5 rounded-[28px] bg-[var(--panel)] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Coach focus</p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
                      Translate customer-ops experience into credible TPM proof.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                      The strongest examples here show scope, systems, and cross-functional delivery. The weakest ones sound busy but not consequential.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[var(--muted)]">
                    {["Transcript", "Notes", "Captions", "Complete"].map((item) => (
                      <div key={item} className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 p-7">
                  <div className="rounded-[24px] bg-[var(--panel)] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Transcript</p>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl bg-[var(--surface-2)] p-3 text-sm leading-6 text-[var(--ink)]">
                        What outcome matters most in this session: stronger positioning, sharper stories, or interview practice?
                      </div>
                      <div className="rounded-2xl bg-[rgba(45,102,103,0.14)] p-3 text-sm leading-6 text-[var(--ink)]">
                        I need to reposition for TPM roles and stop sounding vague.
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[24px] bg-[var(--panel)] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Action plan</p>
                    <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
                      <li>Rewrite top 3 bullets around scope, systems, and measurable outcomes.</li>
                      <li>Refresh LinkedIn headline for delivery leadership and TPM transition.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {proof.map((item, index) => (
                <Card
                  key={item}
                  className={index === 0 ? "border-none bg-[var(--accent)] text-white" : index === 1 ? "border-none bg-[var(--accent-2)] text-white" : ""}
                >
                  <p className={`text-sm leading-7 ${index < 2 ? "text-white" : "text-[var(--muted)]"}`}>{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="grid gap-6 pt-2 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow>What The Product Does</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[var(--ink)]">
            Dedicated pages for the real coaching jobs.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
            The reference products don’t rely on one landing page. They explain the platform, break out use cases, and create trust with dedicated security and product pages. This site needs the same depth.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {outcomes.map((item) => (
            <Card key={item.title} className="min-h-[220px]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{item.title}</p>
              <p className="mt-5 text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}
