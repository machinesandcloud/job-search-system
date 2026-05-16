import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "LinkedIn Recommendation Examples — How to Write One That Actually Helps (2025)",
  description:
    "How to write a LinkedIn recommendation that stands out — with word-for-word examples for colleagues, managers, direct reports, and clients. Plus: how to ask for one and what to include.",
  keywords: ["linkedin recommendation examples", "how to write a linkedin recommendation", "linkedin recommendation template", "linkedin recommendation for colleague", "linkedin recommendation for manager", "linkedin recommendation request", "linkedin endorsement vs recommendation", "good linkedin recommendation example"],
  alternates: { canonical: "/blog/linkedin-recommendation-examples" },
  openGraph: {
    title: "LinkedIn Recommendation Examples — How to Write One That Actually Helps (2025)",
    description: "Word-for-word LinkedIn recommendation examples for colleagues, managers, and clients — plus the structure that makes them credible.",
    url: "/blog/linkedin-recommendation-examples",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const EXAMPLES = [
  {
    relationship: "Manager → Direct Report",
    context: "Software engineer who grew into technical leadership",
    accent: "#7a8dff",
    text: "I managed [Name] for three years at [Company], and I can say without qualification that she was the best engineer on my team — not just technically, but in the way she thought about problems and brought others along with her.\n\nWhen she joined, she was a strong individual contributor focused on getting features shipped. By the time she left, she was doing informal technical leadership for a team of four, running architecture reviews, and mentoring two junior engineers who both credited her as the biggest factor in their growth.\n\nWhat made her exceptional wasn't any single skill — it was her combination of technical depth, clear communication, and genuine investment in the people around her. She'd tell you when she disagreed, explain why, and usually be right.\n\nI'd hire her again immediately. Any team would be lucky to have her.",
    why: "This works because it shows trajectory (IC to leader), uses specific evidence (architecture reviews, mentoring), and ends with a hiring signal — not just a platitude.",
  },
  {
    relationship: "Colleague → Colleague",
    context: "Product manager working cross-functionally",
    accent: "#0D7182",
    text: "I worked with [Name] for two years as part of the same product squad at [Company], and he was consistently the PM I went to when I needed to understand how a decision connected to broader strategy.\n\nWhat stood out about [Name] was his ability to hold complexity without losing the thread. We were running three simultaneous roadmap tracks with competing dependencies, and he was the one who kept the whole picture in his head and made sure engineering, design, and data were aligned before we got into sprint planning — not after.\n\nHe's also unusually good at stakeholder work. I watched him navigate a difficult conversation with a VP who wanted something that would have sunk the roadmap. He didn't capitulate, didn't get defensive — he laid out the trade-offs clearly and got everyone to a better answer.\n\nIf you're evaluating [Name] for a senior PM or group PM role, the answer is yes.",
    why: "Specific situation (three roadmap tracks), names the actual skill (stakeholder navigation), and closes with a role-specific endorsement rather than generic praise.",
  },
  {
    relationship: "Direct Report → Manager",
    context: "First-time manager who was genuinely impactful",
    accent: "#EC4899",
    text: "[Name] was my manager at [Company] for 18 months, and she shaped how I think about product work more than anyone I've worked with.\n\nWhat made her great wasn't the strategy sessions or the frameworks — it was the way she ran 1:1s. She asked questions that forced me to think, rather than telling me what to think. She'd push back on my plans in ways that made them stronger, then get out of the way and let me own the execution.\n\nUnder her, I went from junior PM to running my own roadmap. She sponsored me for projects I wasn't sure I was ready for, was honest with me when I wasn't executing well, and advocated for my promotion in a way I only learned about after I got it.\n\nShe cared about the work. She cared about the team. Those two things aren't always both true of the same manager, and when they are, it shows.",
    why: "This is written from a direct report's perspective, which carries specific credibility. It names the manager's actual approach (pushing back, sponsoring, honest feedback) and shows personal impact.",
  },
  {
    relationship: "Client → Consultant / Agency",
    context: "Account lead at a strategy firm",
    accent: "#F97316",
    text: "[Name] led the engagement team that worked with us through a 9-month organizational restructuring at [Company]. I've worked with a lot of consultants. [Name] is the first one I would call if we faced a similar challenge tomorrow.\n\nThe difference wasn't the deliverables — it was how she ran the work. She spent the first three weeks listening before she wrote a single recommendation. She pushed back on our framing in the first month, which made us uncomfortable, and turned out to be completely right. She presented findings to our board in a way that was clear enough for non-technical directors and detailed enough for our CFO.\n\nShe also built real relationships across our senior team, which meant her recommendations had institutional trust behind them — not just consultant credibility.\n\nIf your company is facing a complex organizational or strategic challenge, [Name] is exactly who you want in the room.",
    why: "Client recommendations carry enormous weight. This one is specific about the engagement type, describes observable behaviors (listening first, pushing back), and ends with a clear use-case recommendation.",
  },
];

export default async function LinkedInRecommendationExamplesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="LinkedIn Recommendation Examples — How to Write One That Actually Helps (2025)"
        description="Word-for-word LinkedIn recommendation examples for colleagues, managers, and clients — plus the structure that makes them credible."
        url={`${BASE_URL}/blog/linkedin-recommendation-examples`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "LinkedIn Recommendation Examples", url: `${BASE_URL}/blog/linkedin-recommendation-examples` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">LinkedIn</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">LinkedIn Recommendation Examples — How to Write One That Actually Helps (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Most LinkedIn recommendations are useless — vague, interchangeable praise that tells a recruiter nothing they couldn&apos;t assume. A strong recommendation is a specific story, told by a credible source, that proves something about the person it&apos;s written for.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What makes a recommendation actually land</h2>
            <div className="mt-5 space-y-3">
              {[
                { principle: "Specificity over superlatives", detail: "'One of the best people I've ever worked with' is noise. 'She shipped a feature that reduced support tickets by 40% in the first month' is signal. Specific examples > generic praise every time." },
                { principle: "Name the relationship clearly", detail: "Recruiters read recommendations faster when they know the relationship upfront — managed, worked alongside, was managed by, was a client. Set that context in the first sentence." },
                { principle: "Show one thing, not everything", detail: "The mistake most recommendations make is trying to catalog every virtue. Pick the one or two things that most define this person's contribution and prove those with evidence. Everything else is noise." },
                { principle: "End with a hiring signal", detail: "The best recommendations end with something that sounds like a real endorsement: 'I'd hire her again without hesitation' or 'If you're evaluating him for a director role, the answer is yes.' Specific > general." },
              ].map((item) => (
                <div key={item.principle} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-1 font-bold text-[var(--ink)]">{item.principle}</p>
                  <p className="text-[13.5px] leading-5 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The structure that works</h2>
            <div className="mt-5 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <div className="space-y-4">
                {[
                  { n: 1, part: "Context (1–2 sentences)", desc: "Who you are, how you worked together, for how long. Establishes your credibility as a source." },
                  { n: 2, part: "The core claim (1 sentence)", desc: "The one thing you want them to know about this person. Their defining professional quality." },
                  { n: 3, part: "The evidence (2–4 sentences)", desc: "A specific situation, decision, or achievement that proves the claim. Not a list of everything they did — one strong example." },
                  { n: 4, part: "The endorsement (1 sentence)", desc: "A clear signal to the reader: 'I'd hire them again' or 'any team would be lucky to have her.'" },
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

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Word-for-word examples</h2>
            <p className="mt-3 text-[15px] text-[var(--muted)]">Four examples across common relationship types — each with a note on why it works.</p>

            <div className="mt-6 space-y-8">
              {EXAMPLES.map((ex) => (
                <div key={ex.relationship} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: ex.accent }} />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ex.accent }}>{ex.relationship}</p>
                      <p className="text-[11px] text-[var(--muted)]">{ex.context}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl bg-[var(--bg)] p-5">
                      {ex.text.split('\n\n').map((para, i) => (
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

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to ask for a recommendation</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The easiest recommendation to write is one where the person asking gives you most of the ingredients. If you&apos;re asking someone to write one for you, make it easy:
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Request message template:</p>
              <p className="mt-4">Hi [Name],</p>
              <p className="mt-3">I&apos;m actively searching for [type of role] and was hoping you&apos;d be willing to write a LinkedIn recommendation for me.</p>
              <p className="mt-3">I&apos;d love for it to focus on [specific project or quality you want highlighted] — I think that captures what I&apos;m most proud of from our time working together.</p>
              <p className="mt-3">I&apos;m happy to draft something for you to start from if that&apos;s helpful, or to answer any questions. Either way, I really appreciate it.</p>
              <p className="mt-3">[Your Name]</p>
            </div>
            <p className="mt-5 text-[14px] text-[var(--muted)]">
              Two things this does: it gives them a focus (so they don&apos;t stare at a blank screen) and it offers to draft a starting point, which most people will take you up on. If they let you draft it, write it in their voice and focus on one specific story.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What not to write</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"He is a great team player who always goes above and beyond.\"", why: "Pure filler. Every recommendation contains this sentence. It means nothing because it could be written for anyone." },
                { dont: "\"Working with her was an absolute pleasure.\"", why: "This is about your experience, not their capability. Recruiters don't care if you liked working with them — they care what they produced." },
                { dont: "A list of every skill and project you can think of", why: "Laundry lists dilute impact. One strong, specific example beats five vague ones every time." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Optimize your full LinkedIn presence — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Headline, About, experience bullets, and keyword optimization — AI coaching for your entire LinkedIn profile.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start LinkedIn coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
