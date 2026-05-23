import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Transferable Skills — How to Identify and Use Them (2025)",
  description:
    "Transferable skills are the reason career changes work — but most people can't articulate theirs. A practical framework for identifying what you bring, how to reframe it for a new industry, and exactly how to present it in a resume and interview.",
  keywords: ["transferable skills", "transferable skills examples", "career change transferable skills", "what are transferable skills", "transferable skills resume", "transferable skills list 2025", "career pivot skills"],
  alternates: { canonical: "/blog/transferable-skills" },
  openGraph: {
    title: "Transferable Skills — How to Identify and Use Them (2025)",
    description: "Most career changers have more transferable skills than they realize — and can't articulate the ones they have. Framework for identifying, translating, and presenting what you actually bring.",
    url: "/blog/transferable-skills",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SKILL_CATEGORIES = [
  {
    category: "Communication and Persuasion",
    description: "Writing, presenting, negotiating, selling, explaining complex ideas to non-experts, managing up. These skills transfer across virtually every industry because every organization needs people who can communicate clearly and influence others.",
    examples_from: [
      { source: "Teacher", transfers_to: "Training, L&D, product education, customer success, consulting" },
      { source: "Journalist", transfers_to: "Content marketing, UX writing, communications, research" },
      { source: "Lawyer", transfers_to: "Negotiations, compliance, policy, consulting, business development" },
      { source: "Sales rep", transfers_to: "Account management, customer success, partnerships, recruiting" },
    ],
    how_to_articulate: "Be specific about the communication challenge and who your audience was. 'Communicated complex technical concepts' is generic. 'Translated regulatory compliance requirements into plain-language training materials for 300 non-legal employees, achieving 97% certification pass rate on first attempt' is specific.",
  },
  {
    category: "Analysis and Problem Solving",
    description: "Gathering information, identifying root causes, evaluating options, making recommendations under uncertainty. The analytical process transfers broadly — the domain knowledge is learnable, the reasoning approach is the skill.",
    examples_from: [
      { source: "Military intelligence analyst", transfers_to: "Business intelligence, strategy consulting, risk analysis, security" },
      { source: "Healthcare coordinator", transfers_to: "Operations, project management, process improvement" },
      { source: "Social worker", transfers_to: "HR, policy analysis, nonprofit operations, healthcare admin" },
      { source: "Research scientist", transfers_to: "Data analytics, product research, consulting, market research" },
    ],
    how_to_articulate: "Name the type of analysis and the decision it supported. 'Analyzed data to improve processes' is weak. 'Conducted root cause analysis of 18-month throughput decline — identified 3 bottlenecks and presented a prioritized remediation plan that reduced cycle time by 34% within 2 quarters' is strong.",
  },
  {
    category: "Leadership and Team Coordination",
    description: "Managing people, motivating teams, coordinating across functions, driving projects to completion. Leadership transferability is high — what changes between industries is the domain context, not the interpersonal and organizational skills.",
    examples_from: [
      { source: "Military officer", transfers_to: "Operations management, project management, team leadership, consulting" },
      { source: "Head coach / athletic director", transfers_to: "Team leadership, performance management, operations" },
      { source: "Nonprofit program director", transfers_to: "Program management, operations, community affairs, CSR" },
      { source: "Restaurant manager", transfers_to: "Operations, hospitality tech, retail, supply chain" },
    ],
    how_to_articulate: "Quantify team size, scope, and outcome. 'Managed a team' is table stakes. 'Led 14-person team through 6-month operational restructuring — maintained 99% SLA compliance and zero attrition throughout the transition period' demonstrates the skill.",
  },
  {
    category: "Process Design and Improvement",
    description: "Creating systems, standardizing workflows, identifying inefficiencies, implementing change. This skill is universally valued in any organization that scales — and it transfers across manufacturing, healthcare, tech, finance, and government.",
    examples_from: [
      { source: "Nurse", transfers_to: "Healthcare operations, clinical informatics, quality improvement" },
      { source: "Manufacturing supervisor", transfers_to: "Operations, supply chain, quality management, consulting" },
      { source: "Accountant", transfers_to: "Finance operations, ERP implementation, consulting, FP&A" },
      { source: "Event planner", transfers_to: "Project management, operations, client services" },
    ],
    how_to_articulate: "Describe the process problem, what you built or changed, and the measurable result. 'Improved processes' is uninformative. 'Redesigned patient intake workflow — reduced average wait time from 47 to 19 minutes and decreased front desk errors by 60%' is specific and compelling.",
  },
];

const TRANSLATION_FRAMEWORK = [
  {
    step: "Identify the underlying skill — not the domain",
    detail: "Every job you've held has an underlying skill set that exists independent of the industry. A caseworker who manages 40 cases simultaneously isn't just doing 'case management' — they're practicing capacity planning, stakeholder communication, documentation, and priority triage. Strip the domain language from your current experience and describe what you're actually doing.",
    example: "Instead of: 'Managed 40 active welfare cases across diverse populations.' Try: 'Managed 40 concurrent client relationships — coordinating across 8 internal teams and 12 external agencies, maintaining real-time case documentation, and triaging competing urgent needs in a high-volume environment.'",
  },
  {
    step: "Find the bridge to the new domain",
    detail: "For each skill you've identified, find the equivalent problem in the target industry. Project management in a hospital and project management in a software company are structurally identical — different domain language, same underlying skill. Research job descriptions in your target role and map your language to theirs.",
    example: "Healthcare: 'care coordination, multidisciplinary team, patient outcomes.' Tech: 'cross-functional collaboration, stakeholder management, product delivery.' The function is identical. The vocabulary is different. Map yours to theirs in every resume bullet.",
  },
  {
    step: "Validate with a metric",
    detail: "The fastest way to make a transferable skill credible is a number. Anyone can claim 'strong project management.' 'Managed 12 concurrent projects averaging $800K each — delivered 11 of 12 on-time and on-budget over 2 years' is verifiable. The metric removes the skepticism about whether the skill is real.",
    example: "Before: 'Strong communication skills demonstrated through teaching.' After: 'Communicated complex scientific concepts to general audiences — reached 12,000+ readers through monthly explainer articles, achieving 4.8/5.0 average clarity rating across 200+ reader surveys.'",
  },
  {
    step: "Address the gap — briefly and proactively",
    detail: "Acknowledging what you don't yet know shows self-awareness and removes the interviewer's unspoken objection. You don't need to apologize for the gap — just name it and show a plan. 'I haven't worked in SaaS before, but I've spent the past 3 months completing [specific course/project], and I've [specific proof of learning].'",
    example: "Don't hide domain gaps — they're visible anyway. 'The part I'd be building in the first 90 days is deep industry knowledge in fintech. I've already started: [specific actions].'' Proactive gap acknowledgment converts a weakness into a learning signal.",
  },
];

const FAQS = [
  { question: "What are the most universally transferable skills?", answer: "In order of transferability across industries: (1) Written communication — every organization needs people who can write clearly; (2) Data analysis and quantitative reasoning — increasingly valuable everywhere; (3) Project management — the ability to deliver something on time, on scope, on budget; (4) People management and team leadership — the process of helping people do their best work is largely universal; (5) Client or stakeholder relationship management — every organization has external or internal relationships to maintain; (6) Process design and documentation — the ability to take a chaotic workflow and systematize it. Skills that are less transferable: deep technical domain expertise (though the reasoning process behind it often is), regulatory knowledge specific to one industry, and specialized equipment or tool operation." },
  { question: "How do you list transferable skills on a resume?", answer: "The most important rule: show, don't tell. 'Strong transferable skills' is not a resume statement — it's a claim. The way to demonstrate transferable skills is through specific bullet points that describe what you did (in language that maps to the target role) and what the result was. The strategy: (1) Study the job description for language — what verbs and nouns do they use for the skills they need? (2) Rewrite your bullets using that language while maintaining honesty about what you did; (3) Add a skills section that lists the competencies explicitly (project management, data analysis, etc.) so ATS can match them; (4) Use a resume summary that explicitly bridges your background to the target role." },
  { question: "How do employers evaluate transferable skills in interviews?", answer: "Behavioral interview questions are the primary mechanism — 'Tell me about a time you managed a complex project' or 'Describe a situation where you had to influence someone without authority.' The STAR method (Situation, Task, Action, Result) works for any behavioral question regardless of industry. The key for career changers: choose stories where the skill — not the domain — is the centerpiece. If you're a teacher applying for a training role, your best interview story is about the time you diagnosed a learning gap and redesigned your approach, not about subject-matter expertise. The competency, not the industry, is what the interviewer is evaluating." },
];

export default async function TransferableSkillsPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Transferable Skills — How to Identify and Use Them (2025)"
        description="Most career changers have more transferable skills than they realize — and can't articulate the ones they have. Framework for identifying, translating, and presenting what you actually bring."
        url={`${BASE_URL}/blog/transferable-skills`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Transferable Skills", url: `${BASE_URL}/blog/transferable-skills` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Change · Skills</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Transferable Skills</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most people have more transferable skills than they realize — and can&apos;t clearly articulate the ones they have. A framework for identifying what you actually bring, how to translate it, and how to present it in a resume and interview.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 most transferable skill categories</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">With specific examples of where each skill comes from and where it transfers — and how to articulate it on a resume.</p>
          <div className="mt-8 space-y-6">
            {SKILL_CATEGORIES.map((item) => (
              <div key={item.category} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.category}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.description}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {item.examples_from.map((ex) => (
                    <div key={ex.source} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                      <p className="text-[12px] font-bold text-[var(--ink)]">{ex.source}</p>
                      <p className="text-[11px] text-[var(--muted)]">→ {ex.transfers_to}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-[var(--brand)]/[0.05] p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">How to articulate it</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.how_to_articulate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Translation Framework */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4-step framework for translating your experience</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">The gap between having a transferable skill and convincing an employer you have it is translation — here&apos;s how to close it.</p>
          <div className="mt-8 space-y-5">
            {TRANSLATION_FRAMEWORK.map((item, i) => (
              <div key={item.step} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">{item.step}</h3>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                    <div className="mt-3 rounded-xl bg-[var(--brand)]/[0.05] p-3">
                      <p className="text-[12px] font-semibold text-[#4361EE]">{item.example}</p>
                    </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari translates your background into the language of your target role.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste the job description and your resume — Zari identifies your transferable skills, rewrites your bullets in the target industry's language, and coaches you through the career change interview. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
