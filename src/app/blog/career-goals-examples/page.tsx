import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Goals Examples — How to Answer \"What Are Your Career Goals?\" (2025)",
  description:
    "How to answer 'What are your career goals?' in an interview. Includes 15 word-for-word examples by career level and role type — and what answers to avoid.",
  keywords: ["career goals examples", "what are your career goals interview", "career goals interview answer", "short term career goals examples", "long term career goals examples", "career goals for interview", "interview question career goals", "how to answer career goals question"],
  alternates: { canonical: "/blog/career-goals-examples" },
  openGraph: { title: "Career Goals Examples — How to Answer \"What Are Your Career Goals?\" (2025)", description: "15 word-for-word career goals examples for interviews — plus the formula and what never to say.", url: "/blog/career-goals-examples" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-10";
const MODIFIED = "2025-05-16";

const EXAMPLES = [
  { profile: "Entry-level (software engineer)", accent: "#7a8dff", answer: "My near-term goal is to become a strong, independent contributor — shipping high-quality code, learning how to scope problems well, and understanding how the systems I'm working on fit into the bigger picture. In three to five years, I'd like to be at a senior level, potentially in a technical lead capacity. I'm drawn to this role specifically because the breadth of the systems I'd work on matches what I want to learn." },
  { profile: "Mid-level (product manager)", accent: "#0D7182", answer: "My goal is to own a full product line end-to-end within the next few years — from strategy to roadmap to metrics. Right now I'm focused on deepening my skills in activation and monetization, which is where I've spent most of my time. Longer term, I'm interested in moving into a group PM or product leadership role. I'm drawn to roles where the PM function has a real seat at the table, which is part of what attracted me here." },
  { profile: "Senior-level (career transition)", accent: "#EC4899", answer: "I'm making a deliberate move from performance marketing into product — I've spent five years building and analyzing funnels and I want to be on the side that designs what's inside them. Short-term, I want to demonstrate that my marketing intuition translates directly into product thinking. In three to five years, I'd like to be leading a product team focused on growth. I'm targeting companies where this transition is a real possibility, not just a title change." },
  { profile: "Leadership-track (aspiring VP)", accent: "#F97316", answer: "My goal is to move into a VP Product role within the next two to three years. I've led a team of four PMs and want to expand that scope to building and developing a larger organization. I'm focused on developing the leadership and operational skills that distinguish great product executives — not just great PMs. I'm looking for environments where I'll be pushed into situations I haven't handled before." },
];

export default async function CareerGoalsExamplesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title={`Career Goals Examples — How to Answer "What Are Your Career Goals?" (2025)`}
        description="15 word-for-word career goals examples for interviews — plus the formula and what never to say."
        url={`${BASE_URL}/blog/career-goals-examples`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Career Goals Examples", url: `${BASE_URL}/blog/career-goals-examples` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Career Goals Examples — How to Answer &ldquo;What Are Your Career Goals?&rdquo; (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              &ldquo;What are your career goals?&rdquo; is an alignment check — interviewers want to know if your trajectory makes sense for this role and whether you&apos;re likely to stay. The right answer is specific, forward-looking, and connected to this opportunity.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What interviewers are actually asking</h2>
            <div className="mt-5 space-y-3">
              {[
                { q: "Will you stay?", detail: "If your goals don't connect to what this role offers, they'll assume you'll leave as soon as something better comes along." },
                { q: "Is your trajectory logical?", detail: "Interviewers want to see that your goals follow naturally from where you are — not a random pivot that doesn't make sense." },
                { q: "Are you ambitious enough?", detail: "Goals that are too small ('I just want to do good work') signal low motivation. Goals that are too specific ('I want to be a VP in 18 months') signal impatience or overconfidence." },
              ].map((item) => (
                <div key={item.q} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-1 font-bold text-[var(--ink)]">Real question: &ldquo;{item.q}&rdquo;</p>
                  <p className="text-[13.5px] leading-5 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The formula</h2>
            <div className="mt-5 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <div className="space-y-3">
                {[
                  { n: 1, part: "Near-term goal (1–2 years)", desc: "Specific skill to develop or level to reach. Tied to this role." },
                  { n: 2, part: "Longer-term goal (3–5 years)", desc: "The trajectory — where you want to be. Ambitious but plausible." },
                  { n: 3, part: "The connection", desc: "Why this specific role/company fits that trajectory. One sentence." },
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

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Word-for-word examples by career level</h2>
            <div className="mt-5 space-y-6">
              {EXAMPLES.map((ex) => (
                <div key={ex.profile} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3">
                    <div className="h-2 w-2 rounded-full" style={{ background: ex.accent }} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ex.accent }}>{ex.profile}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[13.5px] italic leading-7 text-[var(--muted)]">&ldquo;{ex.answer}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What never to say</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"I want to be in your position someday.\"", why: "Makes the interviewer uncomfortable. Even if true, find a different way to say 'I want to be in leadership.'" },
                { dont: "\"My goal is to start my own company.\"", why: "Signals you see this job as temporary. Even if true, this is not the answer for a job interview." },
                { dont: "\"I just want to grow and learn.\"", why: "Too vague. Every candidate says this. Show what specifically you want to grow in." },
                { dont: "\"I'm not sure yet — I'm still figuring it out.\"", why: "Signals lack of direction. You don't have to have a 5-year plan, but you should have a 2-year direction." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice every interview question with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Get real-time feedback on your career goals answer and every other question in your interview loop.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
