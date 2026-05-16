import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Consultants — Exit Opportunities, Industry Transition & Partner Track (2025)",
  description:
    "AI career coaching for management consultants. Exit strategy for MBB and Big 4, how to position consulting experience for industry roles, partner track coaching, and resume optimization for consultants leaving the field.",
  keywords: ["career coach for consultants", "management consulting exit opportunities", "consulting to industry transition", "MBB exit strategy", "consulting career coaching", "Big 4 exit opportunities", "partner track consulting", "how to leave consulting"],
  alternates: { canonical: "/career-coach-for-consultants" },
  openGraph: {
    title: "AI Career Coach for Consultants — Exit Opportunities & Industry Transition (2025)",
    description: "Exit strategy, industry positioning, resume optimization, and partner track coaching — purpose-built for management consultants.",
    url: "/career-coach-for-consultants",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const EXIT_PATHS = [
  {
    destination: "Corporate strategy & strategy ops",
    accent: "#7C3AED",
    competitiveness: "Moderate",
    who: "The most common landing spot for consultants, especially at the associate/senior associate level. In-house strategy teams specifically recruit for consulting backgrounds because the work is adjacent — you&apos;re still doing frameworks and slide decks, but for one company rather than many clients.",
    whatTheyWant: "Companies want consultants who can work without the client dynamic — ambiguous ownership, slower decisions, and political navigation that doesn&apos;t exist on a project basis. The biggest signal: have you demonstrated initiative beyond client deliverables? Do you have opinions about operating in a messy, unpredictable org?",
    zariCoaches: "Translating engagement work into owned outcomes. Reframing your resume from 'led workstream for X client' to demonstrated business impact. Coaching behavioral answers that address the 'can you thrive without client structure?' question.",
  },
  {
    destination: "Private equity & venture capital",
    accent: "#DC2626",
    competitiveness: "Highly competitive",
    who: "The prestige path for consultants — and the hardest. Most PE firms recruit directly from MBB and the top tier of Big 4 strategy practices. Timing is everything: on-cycle recruiting (October–November for first-year associates) is the primary path at large PE funds. Off-cycle opens doors at growth equity and mid-market funds throughout the year.",
    whatTheyWant: "PE firms want consultants who understand financial modeling and due diligence, can move fast in unstructured processes, and have operational credibility beyond slide decks. VC is more thesis-driven — sector expertise and founder relationships matter more than deal mechanics.",
    zariCoaches: "Positioning your consulting deal experience, financial analysis work, and sector exposure for PE/VC conversations. Coaching the investor mindset interviews that differ fundamentally from behavioral consulting interviews.",
  },
  {
    destination: "Startup (COO, Chief of Staff, BizOps lead)",
    accent: "#059669",
    competitiveness: "Low-to-moderate",
    who: "Startups actively recruit consultants for operational roles — often COO, Chief of Staff, Head of BizOps, or strategic finance. The value proposition: consultants can build structured processes in chaotic environments. The downside: lower compensation than banking exits, higher risk, and a culture shock if you&apos;ve only worked in large firm environments.",
    whatTheyWant: "Founders want evidence that you&apos;ve owned something — not managed a workstream. They&apos;re skeptical of consultants who can analyze but can&apos;t execute. The interview often probes for: what did you build from scratch? What failed? How do you operate when there&apos;s no playbook?",
    zariCoaches: "Reframing your consulting experience as evidence of execution, not just analysis. Coaching the specific founder-interview dynamic, which is less structured and more judgment-driven than corporate interviews.",
  },
  {
    destination: "Functional industry roles (finance, product, marketing)",
    accent: "#0891B2",
    competitiveness: "Moderate — with a positioning trap",
    who: "Consultants can transition into functional roles, but face a credibility gap: you were a generalist, and the role needs a specialist. Finance roles want financial modeling depth. Product roles want product ownership experience. Marketing roles want channels and attribution expertise — things you may have advised on but never owned.",
    whatTheyWant: "Evidence of depth, not breadth. The question every hiring manager asks: 'You&apos;ve advised on this — have you ever actually done it?' The more specific your engagement experience and the more you can quantify outcomes you personally drove, the stronger your positioning.",
    zariCoaches: "Identifying the consulting engagements most relevant to your target function and building a coherent positioning story. Coaching on how to close the 'generalist gap' in interviews without underselling your breadth.",
  },
];

const RESUME_PROBLEMS = [
  {
    problem: "Engagement names instead of impact",
    example: "'Led digital transformation engagement for Fortune 500 retail client' tells an industry recruiter nothing.",
    fix: "Translate every engagement into an outcome: 'Identified $85M in cost reduction opportunities across 6 supply chain nodes; recommendations adopted by client COO.' The client name doesn't travel — the number does.",
  },
  {
    problem: "Consulting jargon that doesn't translate",
    example: "'Synthesized findings from 47 stakeholder interviews to drive workstream alignment across client leadership' — this is meaningless to someone who's never worked in consulting.",
    fix: "Replace jargon with plain-language impact statements. 'Interviewed 47 executives to identify operational gaps; findings directly shaped $12M budget reallocation' says the same thing in language any hiring manager understands.",
  },
  {
    problem: "Missing functional keywords for ATS",
    example: "Consulting resumes use terms like 'workstream,' 'engagement,' 'due diligence,' 'deliverable' — none of which appear in industry job descriptions.",
    fix: "Map the functional equivalents: 'workstream' → 'project track' or 'initiative'; 'engagement' → 'project' or 'assignment'; 'hypothesis' → 'strategic recommendation.' Zari's ATS scoring identifies which keywords are missing from each job description you're targeting.",
  },
  {
    problem: "Overreliance on firm brand as a proxy for competence",
    example: "A resume that leads with McKinsey, Bain, or BCG and then lists client names without substance relies on brand recognition that stops working below director level at many companies.",
    fix: "The firm name is a door-opener, not a closer. Interviewers know you're smart — they need evidence of judgment, ownership, and specific outcomes. Lead with those, not credentials.",
  },
];

const FAQS = [
  { question: "When should I leave consulting for industry?", answer: "The conventional answer: after 2–3 years at the associate level gives you the most exit options with the strongest exit profile. At 4+ years, you're competing for senior strategy roles or staying the partner track path — exits are still possible but more selective. The real answer depends on what you want: if you want PE, you need to move during the on-cycle recruiting window in year 1–2. If you want startup, you can move anytime. If you want to make partner, most major firms require commitment by the principal/engagement manager level." },
  { question: "How do I explain leaving consulting to industry interviewers?", answer: "The framing that works: 'I've spent three years developing the analytical and strategic toolkit that consulting builds, and I'm ready to apply it with ownership rather than advisement.' Don't bad-mouth consulting — it signals poor judgment. Don't say you were 'burned out' — it signals fragility. The best answers connect your consulting experience to a specific thing the new role lets you do that consulting didn't." },
  { question: "Should I get an MBA before transitioning from consulting?", answer: "For MBB consultants aiming for PE or VC: the MBA is often required for associate-level entry — but if you're doing on-cycle recruiting, you do it as a pre-MBA associate. For industry strategy roles: the MBA adds cost and delay without proportionally improving your positioning. Most MBB-to-strategy transitions don't require an MBA. For career changes into new functions (product, finance) where you lack domain experience: an MBA can bridge the credibility gap, but boot camps, side projects, and transitional roles often work faster and cheaper." },
  { question: "How is consulting interview prep different from standard behavioral interviews?", answer: "Consultants often ace the analytical parts of interviews and struggle with the behavioral and interpersonal parts — because consulting trains you to demonstrate rigor, not vulnerability or failure. Industry behavioral interviews specifically probe for: times you failed, times you were wrong, times you had to work in ambiguity without a framework. If every STAR answer you've prepared demonstrates success and control, you're not ready for industry interviews. Zari coaches you specifically on the answers that consultants typically underprepare." },
];

export default async function CareerCoachForConsultantsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Consultants", url: `${BASE_URL}/career-coach-for-consultants` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
            For MBB, Big 4 & Boutique Consultants
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Consultants</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            The consulting career decision is binary: stay on the partner track or exit to industry. Both paths require deliberate positioning, a different kind of interview preparation, and a resume that speaks to a fundamentally different audience than client decks do. Zari coaches consultants through both.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* The consulting fork */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The consulting career decision</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Every consultant eventually faces the same fork: stay and pursue the partner track, or exit to industry. The timing and direction of that exit — or the commitment to stay — shapes the next 10 years of your career more than almost any other decision.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-3 font-bold text-[var(--ink)]">The exit track</p>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">Most associates exit within 2–4 years. The optimal window for the most competitive exits (PE, VC) is year 1–2. Industry strategy roles are accessible at any point. The longer you stay, the narrower your exit options but the stronger your positioning for senior roles. Exit decisions should be made proactively — reactive exits in year 4–5 have less leverage than planned exits in year 2.</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-3 font-bold text-[var(--ink)]">The partner track</p>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">Making partner at MBB or the Big 4 requires two distinct skill sets: delivery excellence (which most consultants have) and business development (which most don&apos;t practice until it&apos;s required). The differentiator at principal and engagement manager levels is your ability to develop client relationships and generate revenue — not your quality of analysis. Zari coaches the strategic visibility and communication patterns that partner-track candidates need at each level.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exit paths */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Exit paths — what each one actually requires</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Not all exits are equal — the preparation, timing, and positioning strategy differ significantly by destination.</p>
          <div className="mt-10 space-y-6">
            {EXIT_PATHS.map((path) => (
              <div key={path.destination} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-5" style={{ borderLeftColor: path.accent, borderLeftWidth: 4 }}>
                  <div className="flex items-center gap-3">
                    <p className="text-[17px] font-bold text-[var(--ink)]">{path.destination}</p>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: path.accent }}>{path.competitiveness}</span>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: path.who.replace(/&apos;/g, "'") }}></p>
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What they want from consultants</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: path.whatTheyWant.replace(/&apos;/g, "'") }}></p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: path.accent }}>How Zari coaches this</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{path.zariCoaches}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume problems */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why consulting resumes underperform in industry</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">A resume that worked perfectly at a consulting firm will often fail in industry hiring. These are the specific patterns that hold consultants back.</p>
          <div className="mt-10 space-y-5">
            {RESUME_PROBLEMS.map((rp, i) => (
              <div key={rp.problem} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{rp.problem}</p>
                  <p className="mb-3 text-[13px] italic text-[var(--muted)]">{rp.example}</p>
                  <div className="rounded-lg bg-[var(--brand)]/[0.06] p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1.5">The fix</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{rp.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari coaches */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari coaches for consultants</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Exit strategy planning", body: "Coaching on which exit path fits your goals, the timing that maximizes your options, and the positioning narrative that makes sense for your specific background and target destination." },
              { title: "Resume translation", body: "Transforming consulting resume language into industry-readable impact statements. ATS scoring against the specific industry roles you're targeting — consulting terminology doesn't survive ATS filters." },
              { title: "Industry behavioral interview prep", body: "Consultants struggle with failure, ambiguity, and ownership questions that industry interviewers specifically probe. Zari coaches the STAR answers that consulting culture tends to underprepare you for." },
              { title: "LinkedIn for industry positioning", body: "Transitioning your LinkedIn presence from consulting-focused to industry-credible without losing the MBB/Big 4 signal. Headline and About section optimization for recruiter search in your target function." },
              { title: "Partner track coaching", body: "Business development communication, executive presence, and strategic visibility — the dimensions that differentiate partner-track candidates at the principal and EM levels." },
              { title: "Salary negotiation for industry moves", body: "Consulting comp structures don't map cleanly to industry. Coaching on how to evaluate equity, base, bonus structures, and how to negotiate effectively when you're moving from an up-or-out to a corporate model." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Consulting career coaching FAQs</h2>
          <div className="mt-8 space-y-4">
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
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Consulting career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Exit strategy, resume translation, industry interview prep, and partner track coaching — all in one AI platform built for consultants navigating one of the highest-stakes career decisions in any profession.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
