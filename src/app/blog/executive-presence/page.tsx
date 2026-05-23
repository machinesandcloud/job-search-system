import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Executive Presence — What It Actually Is and How to Build It (2025)",
  description:
    "Executive presence is widely cited as a leadership requirement but rarely defined concretely. This guide breaks it into its actual components — communication, gravitas, and how you show up under pressure — with specific, actionable development practices.",
  keywords: ["executive presence", "executive presence definition", "how to develop executive presence", "executive presence at work", "executive presence tips", "leadership presence", "executive presence examples"],
  alternates: { canonical: "/blog/executive-presence" },
  openGraph: {
    title: "Executive Presence — What It Actually Is and How to Build It (2025)",
    description: "The concrete components of executive presence and how to develop each one — not vague advice about 'carrying yourself well.'",
    url: "/blog/executive-presence",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPONENTS = [
  {
    component: "Communication under uncertainty",
    what_it_is: "How you respond when asked a question you don't know the answer to, when plans change, when you're challenged publicly, or when you're delivering bad news. Leaders with strong presence respond to uncertainty with clarity about what they know, honesty about what they don't, and a path forward — not visible anxiety, deflection, or over-explanation.",
    how_to_develop: "Practice the structured pause: when asked a difficult question, say 'Let me think about that for a second' before answering. Stop filling silence with filler words. Prepare your delivery for difficult messages as rigorously as you prepare the content.",
    observable_signal: "Asked about a failing project, says: 'We're behind schedule. The root cause is X. We've made Y decision to address it. I'll have a revised forecast by Thursday.' Doesn't hedge, blame, or over-qualify.",
  },
  {
    component: "Concision and the ability to get to the point",
    what_it_is: "Senior leaders make decisions across more domains than anyone can be expert in — they need information quickly and trust people who can give it to them without unnecessary context. The ability to answer 'What should we do?' in two sentences, then support it, is a senior leadership signal. Rambling, burying the recommendation, and over-qualifying every statement signals junior thinking regardless of the content quality.",
    how_to_develop: "Practice leading with your recommendation before the rationale: 'I think we should do X. Here's why.' Reverse the order you naturally structure arguments. Time your important communications — most can be cut by 30-40% without losing substance.",
    observable_signal: "Asked for a project update in a senior meeting, leads with: 'We're on track to ship Q3. Three risks to watch — ranked by severity.' Then expands. Not: 'So we started this initiative back in Q1, and there have been several considerations...'",
  },
  {
    component: "How you show up when you're not speaking",
    what_it_is: "Executive presence is most visible in meetings, not presentations. How you engage when others are speaking, whether you signal agreement or skepticism clearly, how you respond when someone says something you disagree with, and what your physical and emotional state communicates — all of these are presence signals that senior leaders observe constantly in potential leadership candidates.",
    how_to_develop: "Audit your non-speaking behaviors: Do you check your phone in meetings? Do you visibly react to statements before thinking? Do you interrupt, or wait to be called on? Do you contribute to every meeting or only the ones in your domain? Leaders are observed all the time — not just when presenting.",
    observable_signal: "In a meeting discussing a topic adjacent to their area, actively engages with specific questions rather than staying quiet or only commenting in their domain. Gives full attention. When challenged, responds with curiosity before defense.",
  },
  {
    component: "Gravitational consistency — being the same person across contexts",
    what_it_is: "Leaders with strong presence behave consistently whether they're with their team, their peers, their manager, or the CEO. People who become visibly deferential with senior leaders and visibly dominant with junior ones are read as politically motivated rather than principled. Consistency across contexts is a trust signal — it tells people that your behavior is based on your values, not the power dynamics of the room.",
    how_to_develop: "Notice when you change your communication style based on the seniority of the room — and ask yourself whether the change is substantive (adjusting detail level) or performative (becoming less direct, more agreeable). The former is good communication; the latter is a presence liability.",
    observable_signal: "Gives the same honest assessment to a VP that they'd give to a peer. Doesn't position-switch based on who agrees. Acknowledges disagreement directly rather than going along in the room and dissenting in private.",
  },
  {
    component: "Taking up appropriate space",
    what_it_is: "This has nothing to do with volume or assertiveness. It means contributing at your level of seniority, asking questions that aren't afraid to expose knowledge gaps, sponsoring other people's ideas by building on them explicitly, and declining to shrink when challenged. Many high-performing professionals underinvest in this because they've been rewarded for execution, not for visibility — and discover late that visibility was a requirement for advancement they hadn't been told about.",
    how_to_develop: "If you're not speaking in large meetings, identify one thing you'll say per meeting — a question, an observation, a specific reinforcement of someone else's point. Build the habit before worrying about whether every contribution is perfect.",
    observable_signal: "In a strategic planning meeting, offers a perspective that reframes the problem rather than just answering the question as posed. Names the tradeoff the group is dancing around. Says 'I don't know' when asked something outside their domain — then asks who in the room does.",
  },
];

const FAQS = [
  { question: "Can executive presence be developed or is it innate?", answer: "It can absolutely be developed — and most of it is learned rather than innate. The behaviors that read as executive presence (concise communication, composure under pressure, consistency across contexts) are trainable through deliberate practice. The trap is treating presence as a personality trait ('I'm not naturally charismatic') rather than as a set of specific behaviors ('I need to lead with my recommendation instead of building to it'). Identify the specific gap, practice the specific behavior, get feedback on the specific behavior. Generic 'work on your presence' feedback is useless because it doesn't tell you what to do." },
  { question: "What's the difference between executive presence and confidence?", answer: "Confidence is internal — a belief about your own ability. Presence is the observable pattern others experience. You can be highly confident and have poor presence (rambling, dominating, inflexible). You can have excellent presence while managing significant self-doubt (most senior leaders do). Focus on the observable behaviors, not on feeling differently about yourself. The behaviors build the internal state over time, not the other way around." },
  { question: "Is executive presence different for women and underrepresented groups?", answer: "The double-bind is real: behaviors coded as 'executive presence' in dominant culture (directness, taking up space, gravitas) are often penalized when exhibited by women or people from underrepresented groups. This is a systems problem, not a personal one. Practically: find senior leaders who model the version of presence you want to emulate, in contexts that are affirming of it. Build sponsors, not just mentors — sponsors advocate for you in rooms you're not in, which matters more when your presence is being held to a different standard." },
];

export default async function ExecutivePresencePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Executive Presence — What It Actually Is and How to Build It (2025)"
        description="The concrete components of executive presence and how to develop each one — not vague advice about 'carrying yourself well.'"
        url={`${BASE_URL}/blog/executive-presence`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Executive Presence", url: `${BASE_URL}/blog/executive-presence` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Strategy · Leadership</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Executive Presence</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            &ldquo;You need more executive presence&rdquo; is one of the most common and least useful pieces of career feedback. Here&apos;s what it actually means, broken into 5 concrete, developable components.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={89} suffix="%" label="Of senior leaders cite executive presence as critical to advancement beyond manager level" accent="#7C3AED" />
            <StatCard value={5} label="Concrete components that constitute executive presence — all trainable" accent="#0D7182" />
            <StatCard value={67} suffix="%" label="Of professionals who received 'presence' feedback couldn't identify what specifically to change" accent="#DC2626" />
            <StatCard value={2} suffix="yrs" label="Average time to visibly develop presence with deliberate practice and feedback" accent="#D97706" />
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 components of executive presence — and how to develop each</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">Each component is specific, observable, and trainable. Start with the one most relevant to your current gap.</p>
          <div className="mt-6 space-y-5">
            {COMPONENTS.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                  <p className="font-bold text-[var(--ink)]">{item.component}</p>
                </div>
                <div className="p-5 grid sm:grid-cols-3 gap-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-2">What it is</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.what_it_is}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to develop it</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.how_to_develop}</p>
                  </div>
                  <div className="bg-[var(--bg)] rounded-xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Observable signal</p>
                    <p className="text-[12.5px] leading-5 text-[var(--ink)] italic">{item.observable_signal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for a senior interview or promotion? Zari coaches the full conversation.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari provides behavioral interview coaching that builds executive presence directly — practicing concise communication, delivering difficult messages, and handling challenging questions under pressure.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
