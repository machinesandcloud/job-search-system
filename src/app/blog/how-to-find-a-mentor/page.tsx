import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Find a Mentor — A Practical Guide for Professionals (2025)",
  description:
    "Most mentorship advice tells you to 'find someone you admire and reach out.' That alone rarely works. This guide covers where to actually find mentors, exactly how to make the ask, and how to build a mentorship relationship that produces career results.",
  keywords: ["how to find a mentor", "finding a mentor at work", "mentor mentee relationship", "career mentor", "how to ask someone to be your mentor", "professional mentorship", "mentoring 2025"],
  alternates: { canonical: "/blog/how-to-find-a-mentor" },
  openGraph: {
    title: "How to Find a Mentor — A Practical Guide for Professionals (2025)",
    description: "Where to find mentors, exactly how to make the ask, and how to build a mentorship that produces results.",
    url: "/blog/how-to-find-a-mentor",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHERE_TO_FIND = [
  {
    source: "Inside your current company",
    detail: "The highest-value mentors are often people two or three levels above you at your current employer — they know your company's culture, internal politics, and advancement criteria, and they have context on your actual work. Senior leaders who run informal office hours, skip-level managers who've shown interest in your development, and accomplished peers in adjacent teams are all viable. The ask is lower-friction internally: they already know you, the relationship context exists, and meeting is easy.",
    how: "Identify 3-5 senior employees whose careers or working styles you genuinely respect. Request a one-time 30-minute conversation about a specific topic you're working through — not mentorship. If it goes well, ask if they'd be open to talking periodically.",
  },
  {
    source: "Former managers and colleagues",
    detail: "Your alumni network is underutilized. Former managers who promoted you or who you have genuine rapport with are ideal mentors — they know your work quality firsthand, they're outside the current political dynamics, and there's existing trust. They also often know people at target companies you're trying to move to.",
    how: "Reconnect with context: a specific update on where you are and a specific question about where you're going. Don't just say 'let's catch up' — propose a topic.",
  },
  {
    source: "Industry communities and professional associations",
    detail: "Most active professional communities — Slack groups, Discord servers, LinkedIn communities, industry associations — have senior members who explicitly want to help earlier-stage professionals. Mentors in these communities are often more accessible than famous people because they're there specifically to engage. Communities organized around a shared identity (women in engineering, first-gen professionals, domain-specific practitioners) often have the highest mentor density.",
    how: "Join 2-3 communities directly relevant to your career direction. Contribute first — answer questions, share relevant resources — before asking for anything. Mentorship opportunities emerge from established presence, not cold asks.",
  },
  {
    source: "Accelerators, fellowships, and formal programs",
    detail: "Programs like On Deck, Reforge, First Round's programs, domain-specific accelerators, and company-sponsored mentorship programs provide structured access to senior mentors with context on your specific goals. The barrier to entry (application, cost) self-selects for quality on both sides. For early-career professionals or those making major transitions, formal programs often provide more reliable access than cold outreach alone.",
    how: "Research programs specific to your industry or career goal. Many are free or scholarship-available. The structured environment makes the relationship easier to initiate and maintain.",
  },
  {
    source: "LinkedIn and cold outreach",
    detail: "Cold outreach to senior professionals works — rarely, and only with the right approach. The success rate for generic 'can I pick your brain' messages is low. The success rate for targeted, specific asks from people who demonstrate they've engaged seriously with the person's work is meaningfully higher. 5 targeted, research-backed messages will outperform 50 generic ones.",
    how: "Reference a specific piece of their work, article, talk, or opinion. Make a specific, low-commitment ask: one question by message, not a recurring mentorship relationship. Build the relationship before asking for the role.",
  },
];

const HOW_TO_ASK = [
  {
    stage: "The initial ask",
    right: "I've been following your work on [specific area] and have been thinking through a specific career decision around [topic]. I'd find your perspective genuinely useful — would a 20-minute call work in the next few weeks?",
    wrong: "Would you be willing to be my mentor? I'm looking for guidance on my career.",
    why: "A specific topic and time-bounded commitment is easy to say yes to. 'Mentor me' is a large, open-ended commitment that requires significant trust before most people will agree.",
  },
  {
    stage: "After the first conversation",
    right: "That was genuinely helpful — especially what you said about [specific insight]. I'd love to stay in touch as I work through this. Would you be open to connecting again in a month or two, depending on how things develop?",
    wrong: "Can we do this monthly? I'd like you to be my regular mentor.",
    why: "Proposing a recurring structure too early feels presumptuous. Let the relationship evolve — most lasting mentorships grow from occasional conversations rather than formal commitments.",
  },
  {
    stage: "Sustaining the relationship",
    right: "Update them with specific progress ('I took your advice and reached out to X — here's what happened'), share something relevant to their interests, and keep asks between conversations small and specific.",
    wrong: "Going dark between meetings, only reaching out when you need something, or every meeting being entirely about your problems without any reciprocal engagement.",
    why: "Mentors stay engaged with mentees who are responsive to their advice, show concrete progress, and bring genuine value to the relationship — not just recipients of guidance.",
  },
];

const FAQS = [
  { question: "What's the difference between a mentor and a sponsor?", answer: "A mentor advises you — they share knowledge, perspective, and guidance when you ask. A sponsor advocates for you — they use their political capital to recommend you for opportunities, projects, and roles when you're not in the room. Mentors develop you; sponsors deploy you. Both are valuable, but sponsorship has a more direct impact on career advancement. Most junior professionals need mentors; mid-career professionals moving toward senior leadership need sponsors. You cultivate sponsorship by delivering excellent work that gives someone a reason to advocate for you — it's earned through performance, not requested directly." },
  { question: "How many mentors should I have?", answer: "Most professionals benefit from 2-4 mentors covering different dimensions: a domain expert in your field, someone who knows your specific company or industry well, an experienced person who's made the career transition you're considering, and optionally a peer mentor (someone slightly ahead of you who can give unfiltered tactical advice). Trying to have too many formal mentor relationships spreads your relationship maintenance capacity too thin. Better to have 2 real relationships than 6 superficial ones." },
  { question: "What if my mentor's advice doesn't apply to my situation?", answer: "Take what's useful and respectfully note where your context differs. Good mentors understand their experience is not universally applicable — what worked in 2010 at a 5,000-person company may not apply to a 2025 startup. Engage critically: 'That makes sense for X situation, though I'm navigating Y which feels slightly different — does your advice change?' Mentors respect mentees who think rather than just receive." },
];

export default async function HowToFindAMentorPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Find a Mentor — A Practical Guide for Professionals (2025)"
        description="Where to find mentors, exactly how to make the ask, and how to build a mentorship that produces results."
        url={`${BASE_URL}/blog/how-to-find-a-mentor`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Find a Mentor", url: `${BASE_URL}/blog/how-to-find-a-mentor` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Strategy · Networking</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Find a Mentor</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            &ldquo;Find someone you admire and reach out&rdquo; is true but incomplete. Where to actually find mentors, how to make the ask, and how to build relationships that last.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={76} suffix="%" label="Of professionals say mentors were important to their career growth" accent="#059669" />
            <StatCard value={5} label="Sources where most lasting mentorships actually originate" accent="#0D7182" />
            <StatCard value={25} suffix="%" label="Higher promotion rate for employees with a mentor vs without" accent="#7C3AED" />
            <StatCard value={3} label="Stages of a successful mentor ask — from first contact to recurring relationship" accent="#D97706" />
          </div>
        </div>
      </section>

      {/* Where to find */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Where to actually find mentors — ranked by accessibility</h2>
          <div className="mt-6 space-y-5">
            {WHERE_TO_FIND.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                  <p className="font-bold text-[var(--ink)]">{item.source}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                  <div className="p-5 bg-emerald-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to approach it</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.how}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to ask */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to ask — at every stage of the relationship</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">What to say vs what not to say, and why each framing matters.</p>
          <div className="mt-6 space-y-4">
            {HOW_TO_ASK.map((item) => (
              <div key={item.stage} className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.stage}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-emerald-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">Say this</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] italic">&ldquo;{item.right}&rdquo;</p>
                  </div>
                  <div className="p-5 bg-red-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-2">Not this</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] italic mb-3">&ldquo;{item.wrong}&rdquo;</p>
                    <p className="text-[12px] leading-5 text-[var(--muted)]"><span className="font-bold">Why: </span>{item.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari is available whenever you need career coaching.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">For the career decisions and questions you can&apos;t always bring to a mentor — resume reviews, interview prep, negotiation coaching, and career strategy. Available on demand, not on someone else&apos;s schedule.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
