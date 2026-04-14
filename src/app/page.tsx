import Link from "next/link";
import { Card, Eyebrow, LogoCloud, PageFrame, Section, Stat } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

const pillars = [
  {
    title: "Resume review",
    body: "Identify weak evidence, generic bullets, and missing role signals. Rewrite only the parts that change interview odds.",
  },
  {
    title: "LinkedIn positioning",
    body: "Turn scattered experience into a coherent story with a sharper headline, stronger About section, and cleaner proof.",
  },
  {
    title: "Interview practice",
    body: "Practice out loud, inspect the transcript, and leave with feedback on clarity, structure, and credibility.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Point the coach at the right target.",
    body: "Start with your target role, current materials, and what keeps breaking in the process.",
  },
  {
    step: "02",
    title: "Work inside a dedicated coaching surface.",
    body: "Each use case gets its own page so resume review, LinkedIn edits, and interview prep stay structured.",
  },
  {
    step: "03",
    title: "Leave with concrete next moves.",
    body: "Every session ends in saved notes, prioritized actions, and enough continuity for the next round.",
  },
];

const pages = [
  {
    title: "Platform",
    href: "/platform",
    body: "See the product architecture, session flow, and why the coaching experience is organized around workspaces.",
  },
  {
    title: "Use cases",
    href: "/use-cases",
    body: "Explore resume review, LinkedIn positioning, mock interviews, and career direction separately.",
  },
  {
    title: "Security",
    href: "/security",
    body: "Understand what gets stored, how memory works, and how uploads and sessions stay scoped to the user.",
  },
  {
    title: "Pricing",
    href: "/pricing",
    body: "Start with a clear free tier now, then layer in premium coaching and richer usage controls later.",
  },
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <Section className="pb-12 pt-12">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <Eyebrow>AI Career Coach</Eyebrow>
            <h1 className="mt-8 max-w-5xl text-6xl leading-[0.92] tracking-[-0.05em] text-[var(--ink)] md:text-8xl">
              Career coaching for the materials, the message, and the interview.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Askia Coach helps candidates tighten the resume, reposition the story, and practice the conversation. It is built to feel
              like a practical coach with memory, structure, and follow-through, not a generic chatbot.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {userId ? (
                <Link href="/dashboard" className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--blue)]">
                  Open dashboard
                </Link>
              ) : (
                <DemoStartButton href="/dashboard" className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--blue)]">
                  Try the product
                </DemoStartButton>
              )}
              <Link href="/platform" className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--blue)]">
                Explore platform
              </Link>
            </div>
            <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
              Best for candidates who need sharper proof, stronger positioning, and better interviews across one connected workflow.
            </p>
          </div>

          <Card className="overflow-hidden border-none bg-[var(--navy)] p-0 text-white">
            <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 md:p-10">
                <Eyebrow dark>Coaching workspace</Eyebrow>
                <h2 className="mt-6 text-4xl leading-[1] tracking-[-0.04em] md:text-5xl">
                  One system for review, rehearsal, and follow-through.
                </h2>
                <p className="mt-5 max-w-md text-base leading-8 text-white/72">
                  The strongest coaching products make the outcome legible. This one is built around visible surfaces, saved context, and
                  dedicated pages for the real coaching jobs.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <Stat label="Use cases" value="4" />
                  <Stat label="Saved recaps" value="Yes" />
                  <Stat label="Voice-ready" value="Built in" />
                </div>
              </div>
              <div className="bg-[var(--bg-alt)] p-6 text-[var(--ink)] md:p-8">
                <div className="rounded-[28px] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Session focus</p>
                  <p className="mt-4 text-3xl leading-[1.05] tracking-[-0.04em]">
                    Translate customer operations work into credible TPM evidence.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    The coach points to where the proof is weak, what outcomes are undersold, and which stories should carry the interview.
                  </p>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[24px] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Action plan</p>
                    <ul className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                      <li>Rewrite three bullets around scale, systems, and measurable outcomes.</li>
                      <li>Reframe the LinkedIn headline around delivery leadership and program ownership.</li>
                    </ul>
                  </div>
                  <div className="rounded-[24px] bg-[linear-gradient(135deg,#3559e6_0%,#8e85ff_100%)] p-5 text-white shadow-[var(--shadow)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">What improves</p>
                    <p className="mt-4 text-3xl leading-[1.05] tracking-[-0.04em]">Sharper proof. Better story. Stronger interview answers.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
          Designed for candidates targeting teams at companies like
        </p>
        <LogoCloud />
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <Eyebrow>Core Coaching Jobs</Eyebrow>
          <h2 className="mt-6 max-w-xl text-5xl leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
            Three surfaces where candidates usually lose momentum.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-[var(--muted)]">
            Competitor sites make the value obvious fast: they separate distinct outcomes and explain why each one matters. This product
            needs the same clarity.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((item, index) => (
            <Card key={item.title} className={index === 1 ? "bg-[var(--surface-muted)]" : ""}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--blue)]">{item.title}</p>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <Card className="border-none bg-[linear-gradient(135deg,#111a2b_0%,#1b2941_100%)] p-10 text-white">
          <Eyebrow dark>How it works</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-5xl leading-[0.98] tracking-[-0.04em]">A coaching flow that stays legible from first upload to saved recap.</h2>
          <div className="mt-10 grid gap-5">
            {workflow.map((item) => (
              <div key={item.step} className="grid gap-4 rounded-[28px] border border-white/10 bg-white/6 p-6 md:grid-cols-[72px_1fr]">
                <div className="text-3xl leading-none tracking-[-0.05em] text-white/48">{item.step}</div>
                <div>
                  <p className="text-2xl leading-tight tracking-[-0.03em]">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/72">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5">
          <Card className="bg-[linear-gradient(135deg,#3559e6_0%,#6c7bff_100%)] text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">Why this feels different</p>
            <h3 className="mt-5 text-4xl leading-[1] tracking-[-0.04em]">The coach doesn’t just answer. It organizes the work.</h3>
            <p className="mt-5 text-base leading-8 text-white/80">
              Each page is built around a specific coaching job, so the product can review, rewrite, rehearse, and recap without collapsing
              into a single generic thread.
            </p>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">What gets saved</p>
            <div className="mt-5 grid gap-4">
              {[
                "Document reviews with issue lists and rewrite targets",
                "Session summaries and action plans for the next round",
                "Role goals and narrative notes that keep future coaching grounded",
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section className="pt-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Explore The Site</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-5xl leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
              This needs real pages, not one oversized homepage.
            </h2>
          </div>
          <Link href="/platform" className="rounded-full bg-[var(--coral)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--navy)]">
            Start with the platform
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pages.map((item) => (
            <Card key={item.title}>
              <p className="text-2xl leading-tight tracking-[-0.03em] text-[var(--ink)]">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              <Link href={item.href} className="mt-6 inline-flex text-sm font-semibold text-[var(--blue)]">
                Visit page
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}
