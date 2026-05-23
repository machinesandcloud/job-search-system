import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Change at 40 — What's Different, What Works, and What to Stop Worrying About (2025)",
  description:
    "A practical guide to changing careers at 40. The 3 fears that are real vs the 3 that aren't, how to audit your transferable skills, resume strategy for mid-career changers, and the narrative reframe that makes 40+ an asset.",
  keywords: ["career change at 40", "changing careers at 40", "career change midlife", "how to change careers at 40", "second career at 40", "career pivot at 40", "starting over at 40 career"],
  alternates: { canonical: "/blog/career-change-at-40" },
  openGraph: {
    title: "Career Change at 40 — What's Different, What Works, What to Stop Worrying About (2025)",
    description: "The fear audit, transferable skills inventory, resume strategy, and interview reframe for mid-career changers.",
    url: "/blog/career-change-at-40",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FEARS = [
  {
    category: "real",
    fear: "Salary regression in a new field",
    truth: "Real — and worth planning for. Entry-level roles in a new field often pay 20–40% less than senior roles in your current field. The question is whether the regression is permanent or temporary. Most successful career changers at 40 recover to their prior income level within 3–5 years, often exceeding it — because they bring capabilities to a new field that new entrants don't have. Plan the cash flow gap, not whether to make the move.",
  },
  {
    category: "real",
    fear: "The ATS and recruiting system is designed for linear careers",
    truth: "Real — and solvable with the right positioning. ATS systems scan for keyword matches and linear career trajectories. A mid-career changer with a non-linear resume gets lower ATS scores by default. The fix: tailor aggressively for each role, emphasize transferable skills with the same vocabulary the new field uses, and use your cover letter to frame the transition before an algorithm rejects you.",
  },
  {
    category: "real",
    fear: "Some skills don't transfer and you'll have real gaps",
    truth: "Real — and worth auditing honestly. Not everything you know is relevant to the new field. The goal isn't to pretend your whole career transfers — it's to accurately identify what does, acknowledge what doesn't, and show evidence that you're closing the gap. Hiring managers respect honesty about gaps combined with demonstrated initiative to address them more than candidates who oversell fit.",
  },
  {
    category: "not_real",
    fear: "You're too old to be hired",
    truth: "The evidence doesn't support this — with nuance. Age discrimination exists at some companies and is illegal in many jurisdictions. But most hiring decisions at the 40+ level are about fit, capability, and risk — not age per se. The real risk factor is coming across as inflexible, over-credentialed for the actual role, or unwilling to learn. Those are addressable. Pure age discrimination is rarer than fear suggests.",
  },
  {
    category: "not_real",
    fear: "Your network doesn't apply to the new field",
    truth: "Your network transfers more than you think. Buyers, clients, vendors, partners — people who know your work and character from any context can refer you to people in the new field. The gap is knowing who in your existing network has connections to where you're going. A 20-minute call with 10 people who know you can surface leads you wouldn't have found through job boards.",
  },
  {
    category: "not_real",
    fear: "You'll have to compete with 25-year-olds and lose",
    truth: "You're not competing for the same roles. Entry-level roles that 25-year-olds apply for are not the same roles a successful 40-year-old career changer should target. Your value proposition is the opposite of theirs: decades of pattern recognition, professional judgment, client relationships, and the ability to operate independently. Target roles at the level where those things matter, not the level where raw technical skill and low cost dominate.",
  },
];

const TRANSFERABLE_INVENTORY = [
  { skill: "Project and stakeholder management", applies: "Almost universally — every field has projects and stakeholders. If you've shipped things on deadline with multiple parties involved, you have this." },
  { skill: "Communication and persuasion", applies: "Writing, presenting, negotiating, managing difficult conversations. These skills compound — a 40-year-old who communicates well has a track record a 25-year-old can't replicate." },
  { skill: "Domain expertise", applies: "Specifically relevant when the new field intersects with the old one. Finance → fintech. Healthcare → health tech. Marketing → SaaS sales. The crossover is where your expertise becomes rare rather than redundant." },
  { skill: "Leadership and people management", applies: "Any role that requires managing people, building teams, or running a function. Leadership experience doesn't transfer to individual contributor roles unless you frame it as operational maturity, not managerial status." },
  { skill: "Client and relationship management", applies: "Sales, consulting, account management, business development — these roles specifically value pre-existing relationship skills. Customer-facing roles in new industries often have a shorter ramp for experienced relationship managers." },
  { skill: "Technical or industry-specific skills", applies: "Transfers only within adjacent domains. A finance professional's Excel skills matter in operations analytics. A nurse's clinical skills matter in pharmaceutical sales. The further the jump, the less technical skill transfers — which is why the above skills matter more." },
];

const RESUME_STRATEGY = [
  { tactic: "Lead with a summary that frames the transition", detail: "Your resume summary is where you control the narrative before the reader forms their own interpretation. A well-written summary converts 'this person switched careers' into 'this person brings a rare combination of X from their prior field and Y from their new target.'" },
  { tactic: "Use the new field's vocabulary throughout", detail: "ATS systems and human readers both pattern-match to familiar language. If the new field calls something 'customer success' and your resume says 'client satisfaction management,' you look like a weaker match than you are. Research job descriptions in the target field and align your language." },
  { tactic: "Quantify impact, not responsibilities", detail: "Career changers can't compete on job title relevance — they can compete on impact. 'Managed $4M portfolio of client accounts with 94% retention' is compelling in almost any field. 'Responsible for client management' isn't compelling in any field." },
  { tactic: "Include transition signals", detail: "Relevant courses, certifications, freelance projects, volunteer work, or side projects in the new field signal commitment and reduce hiring-manager risk. Even a 3-month online certification shows intent in a way that a stated 'interest' in the field does not." },
];

const FAQS = [
  { question: "Is 40 too old to change careers?", answer: "No — but the approach needs to be different than it would be at 25. At 40, you have advantages a younger career changer doesn't: a track record, professional judgment, a network, and the financial stability to make a planned transition rather than a reactive one. The challenge is positioning those advantages for a new field rather than assuming they're obvious. Employers need to see that your experience applies — not just that you're interested." },
  { question: "How long does a career change at 40 take?", answer: "Most career changers who approach it strategically are in a new role within 6–18 months. The variables: how adjacent the new field is, whether you need additional credentials, how actively you can search, and how strong your network in the new field is. Pure passion pivots (e.g., finance to wildlife conservation) take longer than adjacent pivots (e.g., marketing director to SaaS sales). Treat it as a project with a timeline rather than a wish." },
  { question: "Do I need to go back to school to change careers at 40?", answer: "Usually not — and the opportunity cost is significant. A 2-year MBA costs $150,000+ and 2 years. For most career changes, targeted online certifications, a portfolio of relevant work, and a well-positioned application will do more for your candidacy than another degree. Exceptions: regulated fields (medicine, law, engineering) where credentials are legally required, and specific cases where the degree opens a door that's completely closed otherwise. Ask what problem the degree is solving before enrolling." },
  { question: "How do I explain a career change at 40 in interviews?", answer: "The framing that works: lead with the pull toward the new field, not the push away from the old one. 'I've spent 15 years building X capability and I want to apply it in Y context because [specific reason]' is a coherent narrative. 'I was burned out and needed something different' is not. Interviewers are evaluating whether your transition is a decision or an escape. Decisions have reasons; escapes have complaints. Prepare a 2–3 sentence transition narrative before every interview." },
];

export default async function CareerChangeAt40Page() {
  const userId = await getCurrentUserId();
  const realFears = FEARS.filter((f) => f.category === "real");
  const notRealFears = FEARS.filter((f) => f.category === "not_real");
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Career Change at 40 — What's Different, What Works, and What to Stop Worrying About (2025)"
        description="The fear audit, transferable skills inventory, resume strategy, and interview reframe for mid-career changers."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/career-change-at-40`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Career Change at 40", url: `${BASE_URL}/blog/career-change-at-40` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Change</span>
            <span className="text-[11px] text-white/30">12 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Career change at 40<br /><span className="gradient-text-animated">what actually matters</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most career change guides at 40 are either falsely optimistic (&quot;it&apos;s never too late!&quot;) or quietly discouraging (and focused on the risks). This guide is neither. It&apos;s a realistic look at what&apos;s different about changing careers at 40 — and a specific playbook for doing it right.
          </p>
        </div>
      </section>

      {/* Fear audit */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The fear audit: what&apos;s real and what isn&apos;t</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Not all fears about career change at 40 deserve equal weight. Some are legitimate planning constraints. Others are noise.</p>
          <div className="mt-10 space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">Fears worth taking seriously</p>
            {realFears.map((f) => (
              <div key={f.fear} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] bg-red-50 px-5 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <p className="font-bold text-red-700">{f.fear}</p>
                </div>
                <p className="px-5 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{f.truth}</p>
              </div>
            ))}
            <p className="pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4361EE]">Fears you can stop carrying</p>
            {notRealFears.map((f) => (
              <div key={f.fear} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--brand)]/[0.06] px-5 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  <p className="font-bold text-[#4361EE]">{f.fear}</p>
                </div>
                <p className="px-5 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{f.truth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transferable skills inventory */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Your transferable skills inventory</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The first exercise: inventory what you actually have before deciding what you need. Most 40-year-olds underestimate how much transfers.</p>
          <div className="mt-8 space-y-4">
            {TRANSFERABLE_INVENTORY.map((item, i) => (
              <div key={item.skill} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.skill}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.applies}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume strategy */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume strategy for mid-career changers</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">A career-change resume is a different document from a standard resume. These are the tactics that work specifically for the 40+ career changer.</p>
          <div className="mt-8 space-y-4">
            {RESUME_STRATEGY.map((item) => (
              <div key={item.tactic} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.tactic}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Career change at 40 FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">AI coaching for your career change</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari helps you audit your transferable skills, rebuild your resume for the new field with ATS optimization, and prepare the interview answers that make your transition coherent — not apologetic.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
