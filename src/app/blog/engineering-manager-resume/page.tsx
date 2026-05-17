import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Engineering Manager Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "An engineering manager resume isn't a senior engineer resume with 'managed a team' added. What hiring managers read for at the EM level — team building, delivery ownership, technical credibility, and organizational influence — with before/after examples and ATS keyword strategy.",
  keywords: ["engineering manager resume", "engineering manager resume examples", "EM resume 2025", "engineering manager resume template", "how to write engineering manager resume", "technical manager resume", "EM resume ATS", "software engineering manager resume"],
  alternates: { canonical: "/blog/engineering-manager-resume" },
  openGraph: {
    title: "Engineering Manager Resume — Examples, Skills & ATS Tips (2025)",
    description: "What hiring managers read for in an EM resume — team building, delivery, technical credibility, and org influence. Before/after examples and ATS keyword strategy.",
    url: "/blog/engineering-manager-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How much technical detail should an engineering manager include on their resume?",
    answer: "Enough to establish credibility, not enough to look like you want to be an IC again. Your technical experience should appear in context — the languages and systems you've shipped with, the architecture decisions you've owned, the technical debt tradeoffs you've navigated. It shouldn't be the headline. Hiring managers for EM roles want to see that you can credibly engage with your engineers and make sound technical calls, not that you're the strongest coder on the team.",
  },
  {
    question: "Should I include my individual contributor experience on an EM resume?",
    answer: "Yes, but condense it. Your IC years establish your technical foundation and your understanding of the work your team does. Don't list IC job responsibilities in detail — give 1–2 bullets that establish the tech stack and scale, then let your EM experience dominate the resume. A common mistake is giving equal space to IC and EM roles, which makes it ambiguous what level you're operating at.",
  },
  {
    question: "I'm a senior engineer trying to move into an EM role. How should I frame my resume?",
    answer: "Emphasize the management-adjacent work you've already done: mentoring (how many engineers, outcomes), on-call rotation ownership, sprint planning or project lead responsibilities, cross-functional coordination, and any involvement in hiring or performance processes. These are the signals that suggest EM readiness. If you haven't done any of this formally, start doing it now — and document it. The gap between 'I mentored 2 junior engineers and one of them got promoted' and 'I've been on an on-call rotation' is the gap between a competitive and weak EM candidate who's still an IC.",
  },
  {
    question: "What team size should I include on my resume?",
    answer: "Always. Team size is one of the primary signals EM hiring managers use to calibrate your experience. There's a meaningful difference between managing a 4-person team and a 25-person team across 3 time zones. The number also sets expectations: if you're applying to manage a 20-person org and your resume shows you've only managed 3 people, your application may be filtered before you get a chance to make the case in person.",
  },
  {
    question: "Do engineering managers need to list programming languages?",
    answer: "List the primary languages and systems you're credible in — not a comprehensive list of everything you've ever touched. For an EM applying to manage a Python/ML team, 'Python, PyTorch, Kubernetes, AWS' in a skills section signals credibility. 'Java, Python, Go, C++, Ruby, Scala' with no context signals keyword stuffing. Your code contributions in an EM role are likely minimal, so the goal is 'I understand this stack' not 'I'm an expert in all of these.'",
  },
];

export default async function EngineeringManagerResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Engineering Manager Resume — Examples, Skills & ATS Tips (2025)"
        description="What hiring managers read for in an EM resume — team building, delivery, technical credibility, and org influence. Before/after examples."
        url={`${BASE_URL}/blog/engineering-manager-resume`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Engineering Manager Resume", url: `${BASE_URL}/blog/engineering-manager-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">Engineering Manager Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">An EM resume isn&apos;t a senior engineer resume with &ldquo;managed a team&rdquo; added. What hiring managers actually read for at this level — and the before/after examples that show how to write it.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>12 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The frame shift from IC to EM</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The most common mistake on an engineering manager resume is writing it like a senior engineer resume. The frame is wrong. As an IC, you&apos;re evaluated on the quality and scale of your individual technical output. As an EM, you&apos;re evaluated on the quality of your team&apos;s output, the health of the team, and your organization&apos;s impact on the business.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-100 bg-red-50/30 p-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-red-400">IC resume frame (wrong for EM)</p>
                <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                  <li>→ What I built</li>
                  <li>→ Technologies I used</li>
                  <li>→ My personal technical decisions</li>
                  <li>→ Features I shipped</li>
                  <li>→ Performance improvements I made</li>
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-emerald-500">EM resume frame (correct)</p>
                <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                  <li>→ What my team delivered</li>
                  <li>→ How the team was structured and grew</li>
                  <li>→ Technical decisions I enabled or drove</li>
                  <li>→ Cross-functional outcomes I owned</li>
                  <li>→ Org-level process and culture I built</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <p className="text-[14px] leading-7 text-[var(--ink)]">
                <span className="font-bold">The core signal hiring managers look for:</span> Does this person operate as a force multiplier — someone who makes their engineers more effective — or as a senior IC who happens to also run standup? The frame of every bullet on your resume should answer that question.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The 5 dimensions EM hiring managers evaluate</h2>

            <div className="mt-5 space-y-4">
              {[
                {
                  dimension: "Team building and growth",
                  weight: "Very High",
                  detail: "How many engineers have you managed? How did you grow your team — recruiting, onboarding, developing ICs to senior and staff? Have you made hiring calls, performance management decisions, or built the team from scratch? This is the core of EM work and should be the most prominent signal on your resume.",
                  example: "Grew the platform team from 4 to 14 engineers over 18 months, including hiring 6 senior engineers and promoting 2 ICs to senior — team became self-sufficient on on-call rotation with no manager involvement.",
                },
                {
                  dimension: "Delivery ownership",
                  weight: "Very High",
                  detail: "What did your team ship, and what was its business impact? Not 'we shipped the feature' — what was the business context, what did the delivery require, and what changed as a result? EMs who can connect engineering work to business outcomes are the ones who get into senior EM and director conversations.",
                  example: "Led the team that rebuilt the checkout pipeline under a hard 6-week deadline tied to a payments compliance requirement — delivered on time, reducing failed transaction rate from 2.3% to 0.4%, recovering an estimated $2.1M in annual transaction volume.",
                },
                {
                  dimension: "Technical credibility",
                  weight: "Medium",
                  detail: "You don&apos;t need to be the best engineer on your team. You do need to be credible enough to make architecture decisions, evaluate technical tradeoffs, and have productive conversations with staff engineers. Show this through the tech stack your team operated in, architecture decisions you drove, and technical debt or reliability work you championed.",
                  example: "Led the architectural decision to migrate from a monolith to a service-oriented model — managed the phased rollout over 3 quarters with no production downtime, reducing mean deployment time from 4 hours to 22 minutes.",
                },
                {
                  dimension: "Cross-functional influence",
                  weight: "High",
                  detail: "EMs sit at the interface of engineering, product, and the business. Can you describe times you influenced product direction, navigated stakeholder conflict, or drove roadmap decisions? These signals separate execution-oriented EMs from strategic ones.",
                  example: "Partnered with product and design to challenge a Q3 roadmap that would have required 6 months of infrastructure work for a feature with low user confidence — proposed a 3-week spike approach that validated assumptions before the full build; product pivot saved ~$800K in engineering cost.",
                },
                {
                  dimension: "Process and engineering culture",
                  weight: "Medium",
                  detail: "Incident management, on-call health, sprint cadence, code review culture, documentation standards — these are EM-owned. If you improved the reliability posture of your team, reduced engineer toil, or built a culture of technical quality, these belong on your resume.",
                  example: "Redesigned on-call rotation after 4 consecutive quarters of engineer burnout — split the rotation into tiers (one senior per week, two on-call per rotation), reduced average wake-up incidents from 6 per week to 1.2, and improved team NPS score from 28 to 67 over two quarters.",
                },
              ].map(item => (
                <div key={item.dimension} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4 flex items-center justify-between">
                    <h3 className="font-bold text-[var(--ink)]">{item.dimension}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.weight === 'Very High' ? 'bg-[var(--brand)]/10 text-[var(--brand)]' : item.weight === 'High' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                      {item.weight}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                    <div className="mt-4">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500">Strong bullet example</p>
                      <blockquote className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)] italic">
                        &ldquo;{item.example}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before and after: EM resume bullet rewrites</h2>

            <div className="mt-5 space-y-6">
              {[
                {
                  context: "Team leadership",
                  before: "Managed a team of software engineers.",
                  after: "Managed an 8-person backend team across two time zones (US/Poland) — reduced cross-timezone delivery friction by establishing async decision logs and a bi-weekly architecture review; team's sprint completion rate improved from 62% to 88% over 6 months.",
                },
                {
                  context: "Hiring",
                  before: "Was involved in the hiring process.",
                  after: "Built the hiring process for the API team from scratch — defined role levels, wrote rubrics for system design and behavioral interviews, and reduced time-to-offer from 6 weeks to 3.5 weeks while maintaining a 9-month post-hire retention rate of 100%.",
                },
                {
                  context: "Delivery",
                  before: "Led the development of a new data pipeline.",
                  after: "Led the team that built the real-time event streaming pipeline supporting 2.4B daily events — shipped in 14 weeks against a 16-week commitment, enabling the analytics team to launch a feature that drove a 12% increase in paid conversions.",
                },
                {
                  context: "Technical decision",
                  before: "Made technical architecture decisions.",
                  after: "Championed the migration from a home-built task queue to Kafka after documenting 3 production incidents caused by queue saturation — led the design review, coordinated the migration across 4 teams, and achieved zero-downtime cutover; queue-related incidents dropped to zero.",
                },
              ].map(item => (
                <div key={item.context} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                    <h3 className="font-semibold text-[var(--ink)] text-[13px]">{item.context}</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-400">Before</p>
                      <div className="rounded-lg border border-red-100 bg-red-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.before}&rdquo;</div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500">After</p>
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.after}&rdquo;</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS keywords for engineering manager roles</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              EM job descriptions vary by company size and stack. Tailor keywords to the specific posting — these are the most commonly required terms across EM roles:
            </p>

            <div className="mt-5 space-y-4">
              {[
                {
                  category: "People management",
                  keywords: ["Team building", "Hiring", "Performance management", "Career development", "1:1s", "Mentorship", "Onboarding", "Retention", "Staff engineering", "Headcount planning"],
                },
                {
                  category: "Delivery & process",
                  keywords: ["Agile", "Scrum", "Sprint planning", "Roadmap", "OKRs", "KPIs", "On-call", "Incident management", "SLAs / SLOs / SLIs", "Postmortems", "DORA metrics"],
                },
                {
                  category: "Technical leadership",
                  keywords: ["System design", "Architecture review", "Technical debt", "Platform engineering", "API design", "Microservices", "Distributed systems", "Cloud infrastructure", "AWS / GCP / Azure"],
                },
                {
                  category: "Cross-functional & org",
                  keywords: ["Cross-functional collaboration", "Stakeholder management", "Product partnership", "Engineering strategy", "Org design", "Engineering culture", "Technical roadmap"],
                },
              ].map(group => (
                <div key={group.category} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.keywords.map(kw => (
                      <span key={kw} className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] text-[var(--ink)]">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Common questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your EM resume optimized for the roles you&apos;re targeting</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari analyzes your engineering manager resume against specific job descriptions — rewrites IC-framed bullets to read at the EM level, identifies missing leadership signals, and tailors keywords for ATS. Plus interview prep for EM and director-level conversations.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my EM resume →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
