import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "\"Where Do You See Yourself in 5 Years?\" — How to Answer (2025)",
  description:
    "How to answer 'Where do you see yourself in 5 years?' in a job interview. The formula, 5 examples by career stage, and the answers that instantly eliminate candidates.",
  keywords: ["where do you see yourself in 5 years", "where do you see yourself in 5 years interview question", "how to answer where do you see yourself in 5 years", "5 year plan interview question", "where do you see yourself in 5 years examples", "interview question 5 year plan"],
  alternates: { canonical: "/blog/where-do-you-see-yourself-in-5-years" },
  openGraph: {
    title: "\"Where Do You See Yourself in 5 Years?\" — How to Answer (2025)",
    description: "The 5-year plan interview question is harder than it looks. Here's the formula and 5 word-for-word examples that land well.",
    url: "/blog/where-do-you-see-yourself-in-5-years",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const EXAMPLES = [
  {
    context: "Early-career / entry-level",
    accent: "#7a8dff",
    answer: "In five years I want to be a genuine expert in [specific domain] — someone that colleagues come to when there's a hard problem to solve in that space. I'm early enough in my career that I'm still building the fundamentals, but I learn quickly and I'm intentional about what I'm trying to develop.\n\nIn the shorter term — the next year or two — I'm focused on mastering the core of this role and proving that I can execute independently. I want to be the person on the team who makes the work better, not just gets it done.\n\nI'm drawn to this role specifically because [specific reason] gives me the right starting point for that trajectory.",
    why: "Ambitious without being impatient. 'Genuine expert' is a better goal than a specific title because it focuses on capability rather than promotion. The 'short-term vs. long-term' structure shows maturity.",
  },
  {
    context: "Mid-career / pursuing management",
    accent: "#0D7182",
    answer: "In five years I'd like to be leading a team — probably eight to twelve people — where I'm responsible for both the output and the development of the people producing it. I've spent the last [X years] becoming a strong individual contributor, and I'm ready to put that in service of building something larger.\n\nI'm not in a rush to get the title — I want to earn the role by demonstrating that I can grow the people around me before I formally manage them. I've had some experience doing that informally in my current role, and it's what I want to do more of.\n\nThis specific role is attractive to me because [it's the right size of team / the domain is where I want to build management experience / the team is known for developing strong people managers].",
    why: "Shows progression logic (IC → manager) and maturity ('not in a rush to get the title'). The informal management experience signals readiness without overclaiming.",
  },
  {
    context: "Senior / director-track",
    accent: "#EC4899",
    answer: "In five years I want to be at a VP or director level, responsible for a function rather than a team — owning the strategy and execution of [domain] across an organization.\n\nI've built the craft at this point. What I'm developing now is the organizational muscle — how to influence without authority, how to build systems that scale without me in every decision, how to develop leaders rather than just performers. Those are the things that distinguish great directors from great senior managers.\n\nThis role is a concrete step toward that. [Specific reason the scope of this role or the company stage is right for that development].",
    why: "Names the transition from craft to organizational leadership specifically — this is the insight that differentiates senior candidates. The specificity about what they're still developing is credible and self-aware.",
  },
  {
    context: "Career changer",
    accent: "#F97316",
    answer: "In five years I want to be established in [new field] the way I was established in [previous field] — someone with real depth and a track record of impact. I'm making this change deliberately, not reactively, and I have a clear sense of what I'm building toward.\n\nIn the near term, I expect to be in learning mode — absorbing the domain knowledge I don't have yet and building credibility through results. The skills I'm bringing from [previous background] translate, but I need to prove that translation in practice.\n\nIn five years, I see myself having made that proof and being ready for [next-level responsibility in new field]. This role is where that proof starts.",
    why: "Career changers have to address the transition head-on — interviewers are wondering about commitment and fit. This answer is honest about the learning curve while showing clarity about direction.",
  },
  {
    context: "Someone who genuinely doesn't know (honest version)",
    accent: "#10B981",
    answer: "I'll give you an honest answer rather than a rehearsed one: I don't have a rigid five-year plan, and I've learned to be skeptical of people who do — because the work and opportunities that matter most often aren't visible that far out.\n\nWhat I do know: I want to be doing work that's harder than what I'm doing today, with more scope and more impact. I want to have built genuine expertise in [domain], and I want to be part of a team or organization where the people around me are raising my standards.\n\nI'm drawn to this role because it seems like the right environment for that. The specifics of where that leads — I'm less attached to the map than the direction.",
    why: "This works because it's authentic and turns the 'I don't know' into a philosophy rather than an avoidance. It requires genuine delivery — it reads as evasive if it sounds rehearsed. Use it only if it's actually true for you.",
  },
];

export default async function WhereDoYouSeeYourselfPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title={`"Where Do You See Yourself in 5 Years?" — How to Answer (2025)`}
        description="The 5-year plan interview question is harder than it looks. Here's the formula and 5 word-for-word examples that land well."
        url={`${BASE_URL}/blog/where-do-you-see-yourself-in-5-years`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Where Do You See Yourself in 5 Years", url: `${BASE_URL}/blog/where-do-you-see-yourself-in-5-years` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">&ldquo;Where Do You See Yourself in 5 Years?&rdquo; — How to Answer (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              The five-year question sounds like a planning exercise, but interviewers aren&apos;t grading your roadmap. They&apos;re checking three things: whether you have any ambition, whether your trajectory makes sense for this role, and whether you&apos;re going to leave in six months. Here&apos;s how to answer it well — and the answers that kill candidacies instantly.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What the question is actually testing</h2>
            <div className="mt-5 space-y-3">
              {[
                { test: "Ambition", detail: "An answer that's too small ('I just want to keep doing what I do') signals low motivation. An answer that's too large too fast ('I want to be a VP in 18 months') signals impatience or poor self-awareness." },
                { test: "Fit", detail: "Does your five-year direction make sense given what this role offers? If you want to be a VP of Engineering but you're applying to a content role, the disconnect is a problem." },
                { test: "Retention risk", detail: "If your five-year plan makes it obvious you'll leave in two years — to start your own company, move into a completely different field, go back to school — some interviewers will discount you." },
              ].map((item) => (
                <div key={item.test} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-1 font-bold text-[var(--ink)]">Testing: {item.test}</p>
                  <p className="text-[13.5px] leading-5 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The formula</h2>
            <div className="mt-5 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <div className="space-y-3">
                {[
                  { part: "A direction, not a destination", desc: "Don't commit to a specific title. Commit to a type of growth — leadership, expertise depth, cross-functional scope — that leaves room for reality to surprise you." },
                  { part: "Near-term specificity + long-term ambition", desc: "What you want to accomplish in 1–2 years (more concrete) + where you see that leading in 5 years (more directional). The two-part answer reads as thoughtful." },
                  { part: "The connection to this role", desc: "End with why this specific role is the right step toward that direction. Make the interviewer feel like you chose this role deliberately — not randomly." },
                ].map((item, i) => (
                  <div key={item.part} className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{i + 1}</div>
                    <div>
                      <p className="font-bold text-[var(--ink)]">{item.part}</p>
                      <p className="text-[13px] text-[var(--muted)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 word-for-word examples by career stage</h2>
            <div className="mt-6 space-y-8">
              {EXAMPLES.map((ex) => (
                <div key={ex.context} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: ex.accent }} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ex.accent }}>{ex.context}</p>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl bg-[var(--bg)] p-5">
                      {ex.answer.split('\n\n').map((para, i) => (
                        <p key={i} className={`text-[13.5px] italic leading-7 text-[var(--muted)] ${i > 0 ? 'mt-4' : ''}`}>&ldquo;{para}&rdquo;</p>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                      <p className="text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{ex.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Answers that eliminate candidates</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"I want to be in your position.\"", why: "Makes the interviewer uncomfortable. Even if true, reframe: 'I want to be at a leadership level in this function.'" },
                { dont: "\"I want to start my own company.\"", why: "Unless you're interviewing at a startup where entrepreneurship is valued, this signals you see the job as a way station. If it's true, don't say it in the interview." },
                { dont: "\"I'm not sure — I'm still figuring it out.\"", why: "No direction at all. You don't need a five-year plan, but you need a direction. 'Still figuring it out' reads as disengaged." },
                { dont: "\"I just want to grow and contribute to a great team.\"", why: "Everyone says this. It says nothing about you specifically and tells the interviewer nothing useful. Specificity is what makes an answer credible." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice every interview question — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">AI interview coaching with real-time feedback. Practice the 5-year question and every other question in your interview loop.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
