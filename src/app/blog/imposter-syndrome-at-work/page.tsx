import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Imposter Syndrome at Work — How to Recognize and Overcome It (2025)",
  description:
    "Imposter syndrome affects 70% of professionals at some point — including high performers. A practical guide to recognizing the 5 types of imposter syndrome, what actually helps (and what doesn't), and how it affects job searching and salary negotiation.",
  keywords: ["imposter syndrome at work", "imposter syndrome career", "overcoming imposter syndrome", "imposter syndrome job search", "imposter syndrome negotiation", "imposter syndrome 2025"],
  alternates: { canonical: "/blog/imposter-syndrome-at-work" },
  openGraph: {
    title: "Imposter Syndrome at Work — How to Recognize and Overcome It (2025)",
    description: "70% of professionals experience imposter syndrome. Here's how to recognize it, what actually helps, and how it quietly tanks salary negotiations.",
    url: "/blog/imposter-syndrome-at-work",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FIVE_TYPES = [
  {
    type: "The Perfectionist",
    pattern: "Sets impossibly high standards and experiences failure — not just disappointment — when falling short. Focuses obsessively on what went wrong rather than what went right. Delays starting projects out of fear of not executing them perfectly.",
    career_impact: "Avoids applying to roles where they don't meet 100% of the listed qualifications. Undersells accomplishments because nothing ever feels 'done enough' to mention. Leaves money on the table in negotiations by believing they need to be perfect before asking for more.",
    what_helps: "Distinguish between excellence standards (raising the bar over time) and perfectionism (never feeling good enough now). Track what you do well, not just where you fell short. Apply to roles where you meet 70–80% of requirements — that's the standard most hiring managers actually use.",
  },
  {
    type: "The Expert",
    pattern: "Feels they need to know everything before they can legitimately claim expertise. Constantly seeks additional certifications, courses, or credentials as prerequisites for self-permission. Embarrassed by gaps in knowledge even when the gaps are irrelevant to their actual role.",
    career_impact: "Over-qualifies before applying to senior roles. Stays in current positions longer than warranted because they don't yet feel 'ready.' Hesitates to negotiate on the basis of expertise because they can always name something they don't know.",
    what_helps: "Reframe expertise as pattern recognition and judgment, not encyclopedic knowledge. Senior roles require judgment under uncertainty — not certainty. The learning happens in the role, not before it.",
  },
  {
    type: "The Natural Genius",
    pattern: "Equates intelligence with ease. Believes that if something requires significant effort, it means they lack the talent others have. Struggles to recover from first attempts that don't go smoothly.",
    career_impact: "Avoids stretch assignments that might reveal the effort required. Interprets the normal difficulty of a new role as confirmation of inadequacy. Doesn't build the resilience that difficult work produces — which becomes a self-fulfilling prophecy.",
    what_helps: "Growth mindset reframe: struggle is information, not verdict. High performers in any field practice deliberately and fail repeatedly before mastery. The effort is the evidence of engagement, not inadequacy.",
  },
  {
    type: "The Soloist",
    pattern: "Believes asking for help reveals weakness or incompetence. Needs to accomplish things independently to prove they deserve their position. Avoids delegation because delegating means someone else sees their work process.",
    career_impact: "Underperforms on high-visibility projects where collaboration is the actual job. Doesn't build the mentorship relationships and sponsorship networks that drive promotion. Resists coaching and professional development.",
    what_helps: "Most high-achievement in organizational settings is collaborative. The soloists who don't build leverage networks plateau earlier than peers who learn to work through others. Reframe asking for help as resource management, not admission of failure.",
  },
  {
    type: "The Superhero",
    pattern: "Works harder than everyone around them as evidence that they belong. Inability to leave before everyone else, take vacation, or turn off — not because the work requires it, but because stopping would expose them.",
    career_impact: "Burnout at a pace faster than peers. Conflates hours worked with value created — which systematically undervalues their output in compensation conversations. Creates a false dependency on overwork that becomes increasingly unsustainable.",
    what_helps: "Separate output quality and business impact from input hours. The 40-hour week that produces $2M in revenue is worth more than the 70-hour week that produces $800K. Shift self-evaluation to outcomes, not effort volume.",
  },
];

const HOW_IT_AFFECTS_JOB_SEARCH = [
  {
    moment: "Deciding whether to apply",
    impact: "Imposter syndrome causes selective reading of job descriptions — candidates with imposter syndrome focus on requirements they don't meet and discount the majority they do. Studies consistently show that women apply when they meet ~100% of listed requirements; men apply when they meet ~60%. The listing is a wish list, not a minimum threshold. Missing 3 of 12 requirements is not a reason not to apply.",
    reframe: "The question isn't 'do I meet every requirement?' It's 'can I do this job, and will I grow in it?' If the answer to both is yes, apply.",
  },
  {
    moment: "Salary negotiation",
    impact: "Imposter syndrome in negotiations typically sounds like: 'I should be grateful for this offer,' 'They might rescind if I push too hard,' 'I don't have enough experience to justify a higher number.' These are imposter-syndrome narratives, not market facts. The market rate for your role exists independent of whether you feel you deserve it.",
    reframe: "You're not negotiating based on how much you feel you deserve — you're negotiating based on the market rate for the skills and experience you're bringing. Research the range, name your number, and let the data speak rather than your self-assessment.",
  },
  {
    moment: "Interview performance",
    impact: "Candidates with imposter syndrome often overly qualify their accomplishments in interviews: 'I was just lucky that the product succeeded,' 'The team really deserves the credit,' 'I'm not sure I could replicate that.' These hedges read as lack of confidence to interviewers — who are evaluating whether you believe in your own capabilities.",
    reframe: "You can be genuinely humble and still state your accomplishments clearly. 'I led the team that achieved X result' credits the team without erasing your leadership. 'I drove X outcome by doing Y' is not arrogance — it's the answer the interviewer needs to evaluate you.",
  },
];

const FAQS = [
  { question: "Does imposter syndrome ever go away?", answer: "For most people, it doesn't disappear — it shifts. High performers often experience imposter syndrome throughout their careers, but the relationship to it changes. With awareness and practice, the internal narrative ('I don't belong here') becomes one voice among many rather than the loudest one. The goal is not to eliminate imposter syndrome but to develop enough self-knowledge and evidence collection that the impostor narrative has less authority over your decisions." },
  { question: "Is imposter syndrome more common in certain fields?", answer: "Yes. Imposter syndrome is more commonly reported in high-achievement, competitive environments where standards are visible and comparison is constant: medicine, law, finance, academia, technology, and consulting. It's also more prevalent in people who are first-generation professionals in their field, first-generation college graduates, or among underrepresented groups in industries where few others share their background. Belonging uncertainty is a major trigger — when you don't see others like you succeeding visibly, the assumption that you don't belong has more room to grow." },
  { question: "How do I know if my self-doubt is imposter syndrome or a legitimate skill gap?", answer: "Useful self-doubt: specific, actionable, proportionate to the situation. 'I need to strengthen my Python skills before this interview' is accurate self-assessment with a clear path. Imposter syndrome: global, disproportionate, persistent across contexts. 'I'm not smart enough for this role' after a single difficult conversation is not proportionate evidence. The test: does your self-doubt identify a specific, improvable gap — or does it conclude that you fundamentally don't belong? The former is useful; the latter is imposter syndrome." },
];

export default async function ImposterSyndromeAtWorkPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Imposter Syndrome at Work — How to Recognize and Overcome It (2025)"
        description="70% of professionals experience imposter syndrome. Here's how to recognize the 5 types and what actually helps."
        url={`${BASE_URL}/blog/imposter-syndrome-at-work`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Imposter Syndrome at Work", url: `${BASE_URL}/blog/imposter-syndrome-at-work` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Strategy · Mental Health</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Imposter Syndrome at Work</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            70% of professionals experience imposter syndrome at some point — including the highest performers. Understanding which type you have, how it shows up in your career, and what actually helps is the difference between managing it and letting it manage your decisions.
          </p>
        </div>
      </section>

      {/* Five Types */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 types of imposter syndrome</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Psychologist Pauline Clance&apos;s research identified 5 distinct patterns — each with different triggers and different interventions.</p>
          <div className="mt-8 space-y-5">
            {FIVE_TYPES.map((item, i) => (
              <div key={item.type} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-extrabold text-[var(--brand)]">{i + 1}</span>
                  <h3 className="font-bold text-[var(--ink)]">{item.type}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Pattern</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.pattern}</p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Career impact</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.career_impact}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">What actually helps</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.what_helps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Search Impact */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How imposter syndrome shows up in your job search</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Imposter syndrome doesn&apos;t just affect how you feel at work — it directly influences career decisions with measurable financial consequences.</p>
          <div className="mt-8 space-y-5">
            {HOW_IT_AFFECTS_JOB_SEARCH.map((item) => (
              <div key={item.moment} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.moment}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.impact}</p>
                <div className="mt-4 rounded-xl bg-[var(--brand)]/[0.05] p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Reframe</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.reframe}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">The imposter narrative is loudest when you&apos;re unprepared. Zari fixes the preparation.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">When your resume is optimized, your interview answers are sharp, and your negotiation is scripted — the voice that says you don&apos;t belong has a lot less to work with. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
