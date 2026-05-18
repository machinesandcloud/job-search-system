import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at Apple — Interview Process & Tips (2025)",
  description:
    "Apple's hiring process is different from Google or Meta — design quality, product taste, and cross-functional craft matter as much as technical depth. What Apple looks for, how their interviews work, and how to prepare for every stage.",
  keywords: ["how to get a job at apple", "apple interview process", "apple software engineer interview", "apple hiring", "working at apple", "apple career tips", "apple interview prep 2025", "apple job application"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-apple" },
  openGraph: {
    title: "How to Get a Job at Apple — Interview Process & Tips (2025)",
    description: "Apple's hiring is different from other FAANG — design quality and product taste matter more. Full process breakdown and preparation guide.",
    url: "/blog/how-to-get-a-job-at-apple",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const APPLE_DIFFERENTIATORS = [
  {
    signal: "Design craft and attention to quality",
    detail: "Apple's cultural obsession with quality and detail permeates everything, including who they hire. Even for engineering roles, interviewers are evaluating whether you care about the craft of your work — not just whether it ships. They look for candidates who think about edge cases without being asked, who have opinions about how things should feel, and who've cared enough about previous work to go beyond the minimum viable solution. In interviews, this surfaces as: being asked about a decision you made to improve quality when you didn't have to.",
  },
  {
    signal: "Cross-functional thinking and product empathy",
    detail: "Apple's organizational model requires engineers, designers, and product managers to collaborate closely with very flat hierarchies in terms of craft input. Engineers at Apple are expected to have opinions about product decisions and design quality — not just implement them. Interviewers probe for this with questions like 'Tell me about a time you pushed back on a product decision for technical reasons' or 'What would you change about [Apple product]?' — they want to know you think about the full product, not just your layer.",
  },
  {
    signal: "Secrecy comfort and NDA discipline",
    detail: "Apple operates with extreme secrecy around products in development. This isn't just a legal requirement — it's a cultural value. They look for candidates who are comfortable working on projects they can't discuss, who don't need external validation through sharing their work, and who understand why the secrecy matters. In interviews, they assess this implicitly through how you discuss your current employer's confidential work.",
  },
  {
    signal: "Deep expertise in their domain areas",
    detail: "Apple hires deep specialists — they're looking for the world expert in a narrow technical area, not generalists who can work across many domains. For hardware roles, this means deep semiconductor, embedded systems, or materials knowledge. For software, it means genuine expertise in platform-specific areas: Swift/SwiftUI, Core ML, Metal, MapKit, or similar Apple framework depth. Generic software engineers struggle to get through Apple interviews compared to candidates with genuine Apple-platform expertise.",
  },
];

const INTERVIEW_STAGES = [
  {
    stage: "1. Recruiter screen (30 min)",
    what_happens: "Standard culture and background screen. Recruiter checks compensation alignment (Apple pays competitively but not always above market), work authorization, and general fit. They'll ask high-level behavioral questions.",
    how_to_prepare: "Know your numbers — Apple's recruiter screens are efficient. Have a clear, concise career narrative ready. Don't overshare salary history; deflect with 'I'd like to learn more about the role and Apple's band for this level before discussing compensation.'",
  },
  {
    stage: "2. Technical phone screen (45-60 min)",
    what_happens: "Usually conducted by an Apple engineer, not the recruiter. Covers a coding problem (LeetCode medium difficulty) and technical discussion about your background. Apple's technical screens tend to focus more on systems and design thinking than pure algorithm optimization.",
    how_to_prepare: "Practice LeetCode medium problems (arrays, strings, trees, graphs) but also prepare to discuss system design at a high level. Apple interviewers often care more about how you think through a problem than whether you hit the optimal solution immediately.",
  },
  {
    stage: "3. Virtual on-site (4-6 rounds, half-day)",
    what_happens: "Apple's on-sites typically include: 2-3 technical rounds (coding + system design), 1-2 behavioral rounds (cross-functional situations, quality decisions), and sometimes a domain-specific deep-dive. For senior roles, you may meet the hiring manager. Design and PM roles have additional portfolio and case components.",
    how_to_prepare: "For each technical round, practice thinking out loud about design decisions, not just code correctness. For behavioral rounds, prepare STAR stories about quality decisions, cross-functional disagreements, and times you went beyond requirements. Research what Apple product area you'd be joining — have specific, informed opinions.",
  },
  {
    stage: "4. Reference checks",
    what_happens: "Apple takes reference checks more seriously than most companies. They often contact references you didn't list (former managers, colleagues) through their own network. References are a real signal in Apple's process.",
    how_to_prepare: "Alert your references before Apple contacts them. Give them context about the role. Ensure your listed references are genuinely strong advocates — Apple asks pointed questions about your cross-functional work style, quality standards, and how you handle disagreement.",
  },
  {
    stage: "5. Offer and headcount approval",
    what_happens: "Apple's offers go through a headcount approval process that can take 2-4 weeks after the on-site. This is normal. If you're in competing offer timelines, notify your recruiter early — Apple can sometimes accelerate approval but cannot always move fast.",
    how_to_prepare: "Have competing offers or timelines communicated to your recruiter early, not at the moment of the offer. Apple's recruiter will be more helpful if they have time to work the internal process.",
  },
];

const WHAT_SETS_APPLE_APART = [
  { label: "vs Google", detail: "Google's process is more algorithmic — LeetCode hard, system design depth. Apple's process includes more behavioral and quality-focused questions, and domain expertise matters more than pure algorithm fluency." },
  { label: "vs Meta", detail: "Meta moves very fast and has a more open culture. Apple moves slower, has more NDA sensitivity, and rewards specialization over breadth. Meta's engineering culture is more data-driven; Apple's is more craft-driven." },
  { label: "vs Microsoft", detail: "Microsoft is more diverse in its product portfolio and hiring approach. Apple's products are fewer but higher-stakes — the attention to polish and quality is greater. Microsoft tends to value adaptability; Apple values depth." },
  { label: "vs Amazon", detail: "Amazon's Leadership Principles are explicit and central. Apple doesn't have a published behavioral framework — but its cultural values (design quality, secrecy, cross-functional collaboration) are just as consistent in practice." },
];

const FAQS = [
  { question: "Is Apple harder to get into than Google or Meta?", answer: "Different, not necessarily harder. Apple's process is less algorithmically grueling than Google's (fewer LeetCode hard problems, less emphasis on asymptotic complexity) but more demanding in domain-specific expertise and cultural fit. You need genuine depth in Apple's platform (Swift, Objective-C, Core frameworks, macOS/iOS internals) to compete for engineering roles. For non-engineering roles (design, PM, marketing), Apple's screening for taste and quality is extremely rigorous — arguably harder than FAANG equivalents." },
  { question: "Does Apple prefer internal candidates or referrals?", answer: "Yes — Apple hiring is heavily referral-driven. An internal referral doesn't guarantee an interview, but it significantly improves your chances of getting a recruiter call. The best way to get a referral is to attend Apple developer events (WWDC, Apple Design Awards), contribute to Apple-adjacent open source (Swift packages, open source iOS development), or connect with Apple engineers through the developer community. Cold applications to Apple without any connection have a low response rate." },
  { question: "How long does the Apple hiring process take?", answer: "Apple's hiring process takes longer than other FAANG companies — expect 6-12 weeks from initial recruiter contact to offer, sometimes longer. The headcount approval step (after the on-site) is the main variable and can take 2-4 additional weeks. If you're managing competing offers, communicate your timeline to your Apple recruiter early — they can sometimes accelerate but have real constraints. Don't pressure Apple with artificial deadlines you haven't actually received." },
];

export default async function HowToGetAJobAtApplePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job at Apple — Interview Process & Tips (2025)"
        description="Apple's hiring is different from other FAANG — design quality and product taste matter more. Full process breakdown and preparation guide."
        url={`${BASE_URL}/blog/how-to-get-a-job-at-apple`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job at Apple", url: `${BASE_URL}/blog/how-to-get-a-job-at-apple` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Apple</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at Apple</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Apple&apos;s hiring isn&apos;t just about passing LeetCode. Design quality, domain depth, and cross-functional craft matter in ways that differentiate Apple from every other FAANG company.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={165000} label="Apple employees globally (2025)" accent="#0D7182" />
            <StatCard value={2} suffix="%" label="Estimated acceptance rate at Apple — lower than most FAANG" accent="#DC2626" />
            <StatCard value={5} label="Interview rounds in a typical Apple on-site" accent="#7C3AED" />
            <StatCard value={8} suffix=" wks" label="Typical end-to-end hiring timeline (faster with competing offers)" accent="#D97706" />
          </div>
        </div>
      </section>

      {/* What Apple looks for */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Apple looks for that other FAANG companies don&apos;t emphasize</h2>
          <div className="mt-6 space-y-4">
            {APPLE_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[var(--brand)]">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview stages */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Apple&apos;s interview process — stage by stage</h2>
          <div className="mt-6 space-y-4">
            {INTERVIEW_STAGES.map((stage) => (
              <div key={stage.stage} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{stage.stage}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">What happens</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{stage.what_happens}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to prepare</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{stage.how_to_prepare}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apple vs other FAANG */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Apple vs other FAANG companies</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {WHAT_SETS_APPLE_APART.map((item) => (
              <div key={item.label} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--brand)] mb-2">{item.label}</p>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for an Apple interview? Zari simulates the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you through Apple-specific behavioral questions (design quality decisions, cross-functional disagreements), helps tailor your resume for Apple&apos;s domain focus, and simulates the on-site experience.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
