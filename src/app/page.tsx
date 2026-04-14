import Image from "next/image";
import Link from "next/link";
import { Eyebrow, LogoCloud, PageFrame, Section, Stat } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

const pillars = [
  {
    title: "Resume review",
    body: "See exactly where the evidence is weak, which bullets still sound generic, and what needs rewriting before the next application round.",
  },
  {
    title: "LinkedIn positioning",
    body: "Turn a scattered profile into a deliberate move with a cleaner headline, stronger About section, and sharper experience framing.",
  },
  {
    title: "Interview practice",
    body: "Practice answers in a dedicated session, inspect the transcript, and strengthen the examples that still feel thin or defensive.",
  },
];

const workflow = [
  {
    title: "Start with the real problem",
    body: "Tell the coach whether the issue is callbacks, positioning, weak stories, or confidence in interviews.",
  },
  {
    title: "Work in the right surface",
    body: "Use separate spaces for resume review, LinkedIn editing, interview prep, and saved recaps instead of forcing everything through one thread.",
  },
  {
    title: "Leave with next actions",
    body: "Every session should end in rewrites, notes, and an action plan you can carry into the next application or round.",
  },
];

const sitePages = [
  {
    title: "Platform",
    href: "/platform",
    body: "Understand the system behind sessions, documents, recaps, and continuity.",
  },
  {
    title: "Use cases",
    href: "/use-cases",
    body: "See how resume review, LinkedIn, interviews, and direction each get their own path.",
  },
  {
    title: "Security",
    href: "/security",
    body: "Read how uploads, memory, and provider boundaries are handled.",
  },
  {
    title: "Pricing",
    href: "/pricing",
    body: "Start free, then expand usage for active job search cycles.",
  },
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <Section className="pb-12 pt-12">
        <div className="grid gap-12 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
          <div className="max-w-3xl">
            <Eyebrow>AI Career Coach</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.01] tracking-[-0.05em] text-[var(--ink)] md:text-7xl">
              Career coaching that fixes the resume, the narrative, and the interview.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Askia Coach helps candidates improve the materials, sharpen the story, and practice the conversation. It is built to feel
              structured, direct, and useful from one session to the next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {userId ? (
                <Link href="/dashboard" className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--blue)]">
                  Open dashboard
                </Link>
              ) : (
                <DemoStartButton href="/dashboard" className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--blue)]">
                  Try the product
                </DemoStartButton>
              )}
              <Link href="/platform" className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--blue)]">
                Explore platform
              </Link>
            </div>
            <div className="mt-10 grid gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
              <Stat label="Use cases" value="4" />
              <Stat label="Saved recaps" value="Yes" />
              <Stat label="Voice-ready" value="Built in" />
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#0d1630_0%,#152652_100%)] shadow-[var(--shadow-lg)]">
              <div className="grid gap-0 md:grid-cols-[1.04fr_0.96fr]">
                <div className="relative min-h-[440px]">
                  <Image
                    src="/images/command-center-office.jpg"
                    alt="Askia coaching workspace atmosphere"
                    fill
                    className="object-cover opacity-86"
                    sizes="(min-width: 1280px) 30vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,22,48,0.18),rgba(13,22,48,0.62))]" />
                  <div className="absolute left-7 top-7 max-w-[260px]">
                    <Eyebrow dark>Coaching workspace</Eyebrow>
                    <p className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
                      One system for review, rehearsal, and follow-through.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between bg-white px-7 py-7">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--blue)]">Session focus</p>
                    <p className="mt-4 text-3xl font-extrabold leading-[1.06] tracking-[-0.04em] text-[var(--ink)]">
                      Translate operations work into credible TPM proof.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                      The coach surfaces weak evidence, identifies where the story is undersold, and points to the examples that should carry
                      the interview.
                    </p>
                  </div>
                  <div className="mt-8 space-y-5 border-t border-[var(--border)] pt-6">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--muted)]">Transcript insight</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--ink)]">
                        “I keep sounding helpful, not high ownership. I need the story to land closer to delivery leadership.”
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--muted)]">Action plan</p>
                      <ul className="mt-2 space-y-2 text-sm leading-7 text-[var(--muted)]">
                        <li>Rewrite three bullets around scope, systems, and measurable outcomes.</li>
                        <li>Refresh headline and About section before the next application round.</li>
                        <li>Practice one delivery story in the interview workspace.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--muted)]">
          Candidates aim at companies like
        </p>
        <LogoCloud />
      </Section>

      <Section className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
        <div>
          <Eyebrow>Core Coaching Jobs</Eyebrow>
          <h2 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.03] tracking-[-0.04em] text-[var(--ink)]">
            The places where strong candidates still lose momentum.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-[var(--muted)]">
            Good coaching sites make the value obvious fast. This one should be just as clear about where it helps and what changes as a
            result.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((item) => (
            <div key={item.title} className="border-t border-[var(--border)] pt-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--blue)]">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#0d1630_0%,#152652_100%)] px-6 py-12 text-white shadow-[var(--shadow-lg)] md:px-10">
        <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-end">
          <div>
            <Eyebrow dark>How It Works</Eyebrow>
            <h2 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.03] tracking-[-0.04em]">
              A coaching flow that stays structured from first upload to saved recap.
            </h2>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {workflow.map((item) => (
              <div key={item.title} className="border-t border-white/14 pt-5">
                <p className="text-sm font-extrabold tracking-[-0.02em] text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/72">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="grid gap-12 xl:grid-cols-[1fr_1fr] xl:items-center">
        <div className="relative min-h-[520px] overflow-hidden rounded-[36px]">
          <Image
            src="/images/command-center-lobby.jpg"
            alt="Premium Askia coaching environment"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 36vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,48,0.05),rgba(13,22,48,0.55))]" />
          <div className="absolute bottom-0 left-0 right-0 px-8 py-8 text-white">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/72">Why it works</p>
            <p className="mt-3 max-w-lg text-3xl font-extrabold leading-[1.08] tracking-[-0.04em]">
              The product does not pretend one generic chat can handle every stage of the search.
            </p>
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <Eyebrow>What Users Keep</Eyebrow>
            <h2 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.03] tracking-[-0.04em] text-[var(--ink)]">
              Better materials, stronger stories, and actual continuity between sessions.
            </h2>
          </div>
          <div className="grid gap-8">
            {[
              "Document reviews with issue lists and rewrite priorities.",
              "Session summaries and action plans for the next round.",
              "Goal and narrative memory that makes future coaching smarter.",
            ].map((item) => (
              <div key={item} className="border-l-2 border-[var(--blue)] pl-5 text-base leading-8 text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Explore The Site</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.03] tracking-[-0.04em] text-[var(--ink)]">
              The public site should explain the system, not just decorate the homepage.
            </h2>
          </div>
          <Link href="/platform" className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--blue)]">
            Start with the platform
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {sitePages.map((item) => (
            <div key={item.title} className="border-t border-[var(--border)] pt-5">
              <p className="text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--ink)]">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              <Link href={item.href} className="mt-6 inline-flex text-sm font-bold text-[var(--blue)]">
                Visit page
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}
