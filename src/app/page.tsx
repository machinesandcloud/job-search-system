import Link from "next/link";
import { Card, Eyebrow, LogoCloud, PageFrame, Section, Stat } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

const pillars = [
  {
    title: "Resume review",
    body: "Find the bullets that still sound busy, surface what is missing, and rewrite around outcomes that hiring teams actually care about.",
  },
  {
    title: "LinkedIn positioning",
    body: "Tighten the headline, About section, and experience framing so your profile reads like a deliberate move instead of a timeline dump.",
  },
  {
    title: "Interview practice",
    body: "Practice answers in a structured session, inspect the transcript, and leave with sharper stories and clearer proof.",
  },
];

const workflow = [
  {
    step: "Target",
    body: "Start with the role you want, the materials you already have, and the part of the process that keeps failing.",
  },
  {
    step: "Coach",
    body: "Work inside a dedicated surface for resume review, LinkedIn editing, mock interviews, or career direction.",
  },
  {
    step: "Improve",
    body: "Get rewrites, session notes, and a next-step plan you can actually use in the next application or interview round.",
  },
];

const sitePages = [
  {
    title: "Platform",
    href: "/platform",
    body: "See how sessions, documents, recaps, and memory fit together.",
  },
  {
    title: "Use cases",
    href: "/use-cases",
    body: "Explore resume review, LinkedIn positioning, interviews, and direction.",
  },
  {
    title: "Security",
    href: "/security",
    body: "Understand privacy, storage, and how session data is scoped.",
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
      <Section className="pb-10 pt-10">
        <div className="overflow-hidden rounded-[40px] border border-[rgba(221,227,239,0.55)] bg-[linear-gradient(135deg,#0d1630_0%,#152652_100%)] shadow-[var(--shadow-lg)]">
          <div className="grid gap-0 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="relative px-8 py-10 text-white md:px-12 md:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,102,255,0.24),transparent_32%),radial-gradient(circle_at_30%_80%,rgba(255,107,61,0.18),transparent_22%)]" />
              <div className="relative">
                <Eyebrow dark>AI Career Coach</Eyebrow>
                <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.05em] md:text-7xl">
                  Sharpen the resume. Tighten the story. Practice the interview.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                  Askia Coach is a career coaching workspace for candidates who need stronger materials, clearer positioning, and better
                  interview performance without losing continuity from one session to the next.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {userId ? (
                    <Link href="/dashboard" className="rounded-full bg-[var(--coral)] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--navy)]">
                      Open dashboard
                    </Link>
                  ) : (
                    <DemoStartButton href="/dashboard" className="rounded-full bg-[var(--coral)] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--navy)]">
                      Try the product
                    </DemoStartButton>
                  )}
                  <Link href="/platform" className="rounded-full border border-white/16 bg-white/8 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--navy)]">
                    Explore platform
                  </Link>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Stat label="Use cases" value="4" inverted />
                  <Stat label="Saved memory" value="Yes" inverted />
                  <Stat label="Realtime ready" value="Built in" inverted />
                </div>
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#eef3ff_0%,#f7f8fc_100%)] p-6 md:p-8">
              <div className="grid gap-4">
                <div className="rounded-[30px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--blue)]">Live coaching room</p>
                      <p className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--ink)]">
                        Turn vague experience into stronger proof.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[var(--surface-muted)] px-4 py-3 text-right">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">Session mode</p>
                      <p className="mt-1 text-sm font-bold text-[var(--ink)]">TPM repositioning</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[24px] bg-[var(--surface-muted)] p-5">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">Coach focus</p>
                      <p className="mt-3 text-base font-bold leading-7 text-[var(--ink)]">
                        The top bullets mention work but do not show scope, systems ownership, or delivery impact.
                      </p>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-2xl bg-white p-4 text-sm leading-7 text-[var(--muted)]">
                          Reframe operations work around process scale, program complexity, and cross-functional delivery.
                        </div>
                        <div className="rounded-2xl bg-white p-4 text-sm leading-7 text-[var(--muted)]">
                          Pull one example into interview prep so the rewritten narrative and spoken answer stay aligned.
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="rounded-[24px] bg-[linear-gradient(135deg,#3866ff_0%,#6e8dff_100%)] p-5 text-white">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/72">Transcript insight</p>
                        <p className="mt-3 text-base font-bold leading-7">
                          “I keep sounding helpful, not high ownership. I need the story to land closer to delivery leadership.”
                        </p>
                      </div>
                      <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">Action plan</p>
                        <ul className="mt-3 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                          <li>Rewrite three experience bullets around systems and measurable outcomes.</li>
                          <li>Refresh LinkedIn headline and About section before the next application round.</li>
                          <li>Practice one delivery story in the interview workspace.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[24px] bg-[linear-gradient(135deg,#0e5d52_0%,#11806f_100%)] p-5 text-white shadow-[var(--shadow)]">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/70">Resume</p>
                    <p className="mt-3 text-sm leading-7">Spot weak evidence and rewrite the parts that actually affect response rates.</p>
                  </div>
                  <div className="rounded-[24px] bg-[linear-gradient(135deg,#ff6b3d_0%,#ff9366_100%)] p-5 text-white shadow-[var(--shadow)]">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/70">Positioning</p>
                    <p className="mt-3 text-sm leading-7">Align headline, story, and target role so your profile reads like a coherent move.</p>
                  </div>
                  <div className="rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">Interview</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Rehearse answers in a session that keeps transcript, notes, and next moves together.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-2">
        <p className="mb-5 text-center text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--muted)]">
          Built for candidates aiming at teams like
        </p>
        <LogoCloud />
      </Section>

      <Section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>What Askia Covers</Eyebrow>
          <h2 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--ink)]">
            The three places where strong candidates still leak momentum.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-[var(--muted)]">
            The best competitor pages are explicit about outcomes. This product should be just as clear about the work it improves and the
            decisions it helps users make.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((item, index) => (
            <Card key={item.title} className={index === 1 ? "bg-[var(--surface-muted)]" : ""}>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--blue)]">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="border-none bg-[var(--navy)] text-white shadow-[var(--shadow-lg)]">
          <Eyebrow dark>How the product works</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.04] tracking-[-0.04em]">
            A coaching workflow that stays structured from first upload to saved recap.
          </h2>
          <div className="mt-8 grid gap-4">
            {workflow.map((item) => (
              <div key={item.step} className="grid gap-4 rounded-[24px] border border-white/10 bg-white/6 p-5 md:grid-cols-[110px_1fr]">
                <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/58">{item.step}</p>
                <p className="text-sm leading-7 text-white/78">{item.body}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5">
          <Card className="bg-[linear-gradient(135deg,#3866ff_0%,#6f89ff_100%)] text-white">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/72">What makes it better</p>
            <h3 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-[-0.04em]">It organizes the work instead of pretending one chat can do everything.</h3>
            <p className="mt-4 text-base leading-8 text-white/82">
              Resume edits, profile positioning, interview rehearsal, and saved recaps all get their own surfaces so the coaching stays
              legible and reusable.
            </p>
          </Card>
          <Card>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--muted)]">What users keep</p>
            <div className="mt-5 grid gap-3">
              {[
                "Document reviews with issue lists and rewrite priorities.",
                "Session summaries and action plans for the next round.",
                "Goal and narrative memory that makes future sessions smarter.",
              ].map((item) => (
                <div key={item} className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section className="pt-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Explore The Product</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--ink)]">
              The site should help people understand the system, not just admire a hero.
            </h2>
          </div>
          <Link href="/platform" className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--blue)]">
            Start with the platform
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sitePages.map((item) => (
            <Card key={item.title}>
              <p className="text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--ink)]">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              <Link href={item.href} className="mt-6 inline-flex text-sm font-bold text-[var(--blue)]">
                Visit page
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}
