import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "\"Why Do You Want to Work Here?\" — How to Answer (With Examples) 2025",
  description:
    "How to answer 'Why do you want to work here?' in a job interview. The formula, 5 word-for-word examples by situation, and what answers kill your candidacy on the spot.",
  keywords: ["why do you want to work here", "why do you want to work here answer", "why do you want to work here examples", "why do you want this job", "how to answer why do you want to work here", "interview question why this company", "why do you want to join our company"],
  alternates: { canonical: "/blog/how-to-answer-why-do-you-want-to-work-here" },
  openGraph: {
    title: "\"Why Do You Want to Work Here?\" — How to Answer (With Examples) 2025",
    description: "The formula and word-for-word examples for 'Why do you want to work here?' — the interview question that reveals how much research you've done.",
    url: "/blog/how-to-answer-why-do-you-want-to-work-here",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const WHAT_INTERVIEWERS_HEAR = [
  { answer: "\"I've always admired this company.\"", signal: "You admire the brand. You haven't done research. You'd say this to anyone." },
  { answer: "\"The role sounds like a great opportunity for growth.\"", signal: "You want to grow. You have no specific idea why this company is better for your growth than the ten others you're applying to." },
  { answer: "\"I love your culture and values.\"", signal: "You read the careers page. Interviewers know because every company has 'collaboration' and 'innovation' on their careers page." },
  { answer: "\"The compensation is very competitive.\"", signal: "Money motivated. While accurate for almost everyone, saying it signals that the job is a means, not a match." },
];

const EXAMPLES = [
  {
    context: "Mid-career switch into a mission-driven company",
    accent: "#0D7182",
    answer: "Two things, both genuine. First: I've followed [Company]'s work in [specific area] for a while — I read the [specific report or blog post or announcement] last year and it changed how I think about [the problem]. What you're doing in [specific product area] is the most interesting applied version of that problem I've seen.\n\nSecond: the role specifically. I want to move from [current domain] to [target domain], and this role is the place where that crossover exists — I'd be applying [skill I have] to [new domain]. That's rare, and it's the reason this role specifically is on a short list of a few.\n\nAnd I'll be honest — I've talked to [X] who works here, and the way she described [specific team dynamic or product philosophy] made me more interested, not less.",
    why: "Three-part structure: specific knowledge of their work, specific fit between role and career goal, and a signal that you've done primary research (talked to someone there). Each part is checkable — the interviewer can verify if your research is real.",
  },
  {
    context: "Early-career candidate applying to a competitive company",
    accent: "#7a8dff",
    answer: "I want to work here for a specific reason that I'll try to say without sounding generic: I want to build my career at a company where I can learn from people who have built things at scale. I'm early in my career, and the work I do in the next two years is going to shape what I'm capable of later.\n\nI looked at the engineering blog specifically — [specific post] — and it's the kind of thinking I want to be surrounded by. The systems work described there is a level above what I'd be working on anywhere else at this stage.\n\nI also applied here first. I wanted to give this process my full attention before I started interviewing more broadly, because this is genuinely the place I want to be.",
    why: "Honesty about career stage works. The 'I applied here first' line is bold and credible — if true, say it. The engineering blog reference shows genuine technical engagement.",
  },
  {
    context: "Returning to an industry after a detour",
    accent: "#EC4899",
    answer: "I spent three years in [other industry] deliberately — I wanted to understand [specific thing] from a different angle, and I did. But the work I want to do long-term is in [this industry], and it has been since I started my career.\n\nThe reason [Company] specifically: you're working on [specific problem] at a stage and scale that's rare. Most companies working on this are either too early — they haven't figured out the core product — or too late — the interesting architecture decisions have already been made. You're at the point where both the product and the technical infrastructure are still being built out, and I want to be part of that.\n\nThe other thing I'll say: I've done a lot of informational conversations in this space, and this team's reputation for [specific quality — e.g., rigor, technical depth, people development] comes up more than anyone else's.",
    why: "Addresses the career detour proactively and frames it as intentional. The 'too early or too late' framing shows market awareness and positions the company specifically — not generically.",
  },
  {
    context: "Lateral move to a competitor",
    accent: "#F97316",
    answer: "I've been at [Current Company] for [X years] and I've learned a lot — I'm proud of what I've built there. The reason I'm looking is specific: I've reached the ceiling of what I can learn in my current scope, and I'm not willing to wait another two years for an organizational change that may or may not happen.\n\nThe reason [Company]: you're solving the same problem I've been working on, but from a fundamentally different architecture. I've spent time studying how you've approached [specific technical or product area], and I think there's a version of this problem I haven't seen yet that your approach opens up.\n\nI'm not leaving because I'm unhappy. I'm moving because this is where the most interesting version of the work is happening right now.",
    why: "Lateral moves raise retention concerns — interviewers worry you're being managed out or that you'll leave again quickly. This answer addresses that directly: proactive choice, pull vs. push, and a specific intellectual reason for choosing this company over others.",
  },
  {
    context: "Nonprofit or mission-driven sector",
    accent: "#10B981",
    answer: "I've spent [X years] in [private sector role]. I've done well there, and I'm grateful for what I've built. But I've been asking myself for a while whether the work I'm doing is the most useful thing I can do with my skills right now.\n\nWhen I started researching [Organization], I wasn't expecting to be as persuaded as I am. The specific program I'm most interested in — [program name] — is producing [specific outcome you researched], and the approach you're taking is different from the conventional models I've seen in this space in [specific way].\n\nI want to bring [specific skills] to a problem that matters to me. I'm aware there are trade-offs. I've made the calculation deliberately, and [Organization] is where I want to start.",
    why: "Mission-driven organizations get a lot of 'I want to do something meaningful' applications. This answer is differentiated because it demonstrates specific research on a specific program — not just mission alignment at the brand level.",
  },
];

export default async function WhyDoYouWantToWorkHerePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title={`"Why Do You Want to Work Here?" — How to Answer (With Examples) 2025`}
        description="The formula and word-for-word examples for 'Why do you want to work here?' — the interview question that reveals how much research you've done."
        url={`${BASE_URL}/blog/how-to-answer-why-do-you-want-to-work-here`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Why Do You Want to Work Here", url: `${BASE_URL}/blog/how-to-answer-why-do-you-want-to-work-here` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">&ldquo;Why Do You Want to Work Here?&rdquo; — How to Answer (With Examples) 2025</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              &ldquo;Why do you want to work here?&rdquo; sounds like a softball but it&apos;s actually a research test. Interviewers have heard every generic answer hundreds of times. The ones who get offers are the ones who can say something specific — something that could only be said about this company, not any other.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What interviewers actually hear</h2>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Every answer signals something. Here&apos;s what the common ones say — and why they fail.</p>
            <div className="mt-5 space-y-3">
              {WHAT_INTERVIEWERS_HEAR.map((item) => (
                <div key={item.answer} className="overflow-hidden rounded-xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-red-50/30 px-4 py-3">
                    <p className="font-mono text-[12.5px] text-red-500">You say: {item.answer}</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">They hear: </span>{item.signal}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The formula for an answer that works</h2>
            <div className="mt-5 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <div className="space-y-4">
                {[
                  { n: "1", part: "Specific knowledge of their work", desc: "Reference something concrete — a product decision, an engineering blog post, an announcement, something a person there has said publicly. Proves you did homework." },
                  { n: "2", part: "Why this role connects to where you're going", desc: "The answer should be about fit in both directions — not just why you want them, but why this role specifically serves your trajectory." },
                  { n: "3", part: "Something you learned that most candidates didn't", desc: "Primary research: talked to someone who works there, used the product, read something beyond the homepage. This separates you from 90% of applicants." },
                ].map((item) => (
                  <div key={item.n} className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{item.n}</div>
                    <div>
                      <p className="font-bold text-[var(--ink)]">{item.part}</p>
                      <p className="text-[13px] text-[var(--muted)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 word-for-word examples by situation</h2>
            <p className="mt-3 text-[15px] text-[var(--muted)]">Each example is built for a specific career context — not interchangeable. Adapt the structure, not the content.</p>

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

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The research you should do before any interview</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              A great &ldquo;why us&rdquo; answer requires at least 30 minutes of focused research before every interview — not on the homepage, but on the stuff most candidates skip.
            </p>
            <div className="mt-4 space-y-2">
              {[
                "Read the engineering or product blog (if it exists) and find something specific",
                "Search for recent news: fundraising, product launches, executive hires",
                "Look up one or two people on the team on LinkedIn — their backgrounds tell you a lot about the kind of people they hire",
                "If possible, talk to someone who works or worked there — even a 15-minute conversation gives you something genuine to reference",
                "Use the product, if it's consumer-facing — have a real reaction to it",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5">
                  <span className="text-[var(--brand)] font-bold mt-0.5">✓</span>
                  <p className="text-[13.5px] text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice every interview question — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">AI interview coaching with real-time feedback on every answer. Practice &ldquo;why us&rdquo; and every other question in your interview loop.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
