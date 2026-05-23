import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at OpenAI — Interview Process & Tips (2025)",
  description:
    "OpenAI is one of the most selective employers in tech — combining deep technical requirements with unusually strong emphasis on AI safety values and mission alignment. Full breakdown of the OpenAI hiring process, what they look for, and how to position yourself.",
  keywords: ["how to get a job at openai", "openai interview process", "openai hiring", "openai software engineer interview", "openai research engineer", "working at openai", "openai career tips 2025"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-openai" },
  openGraph: {
    title: "How to Get a Job at OpenAI — Interview Process & Tips (2025)",
    description: "OpenAI combines deep technical requirements with strong mission alignment screening. Full process breakdown.",
    url: "/blog/how-to-get-a-job-at-openai",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_OPENAI_LOOKS_FOR = [
  { signal: "Genuine mission alignment — not performed enthusiasm", detail: "OpenAI screens for whether candidates actually care about safe, beneficial AI development — not just whether they're excited to work on impressive technology. The difference matters in interviews: candidates who have thought seriously about AI risks, who can articulate why safety matters in technical terms, and who have genuine opinions about AI development trade-offs are different from candidates who say 'I'm passionate about AI.' Authentic engagement with the hard questions OpenAI grapples with is a real signal." },
  { signal: "Technical depth at the frontier", detail: "OpenAI hires some of the most technical people in the world. For research and research engineering roles, this means genuine depth in ML theory, recent papers, and novel contributions. For product engineering roles, the bar is high but more conventionally measured — system design at scale, distributed systems, production ML infrastructure. Understanding the difference between the two tracks and preparing accordingly is essential." },
  { signal: "Collaborative intellectual culture", detail: "OpenAI's culture is highly collaborative and intellectually intense — people debate ideas rigorously, update views based on evidence, and engage seriously with disagreement. Interviews probe for intellectual humility alongside intellectual confidence: the ability to defend a position under challenge while being genuinely open to better arguments. Candidates who disengage when challenged or who can't articulate the strongest counterargument to their own position are weak fits." },
  { signal: "High agency and self-direction", detail: "OpenAI expects employees to identify important problems and pursue them, not wait for direction. Interviews probe for examples of self-directed work: research directions you chose and why, problems you identified and owned without being asked, ways you've navigated ambiguity toward a meaningful outcome. The pace and intensity of work at OpenAI requires high intrinsic motivation — it needs to show up in how you describe your track record." },
];

const ROLE_TRACKS = [
  { track: "Research Scientist / Research Engineer", requirements: "Strong publication record (NeurIPS, ICML, ICLR) or equivalent research contributions. Deep ML theory, novel experiments, and genuine research taste. Research engineers also need strong engineering skills to implement ideas at scale. Most research roles require a PhD or equivalent self-directed research contributions.", prep: "Review recent OpenAI papers thoroughly. Have clear opinions about their research direction. Be ready to present and defend prior research work in depth. Know the literature well enough to discuss what you'd work on and why it matters." },
  { track: "Software Engineer (Product & Infrastructure)", requirements: "Senior SWE bar — systems design, distributed infrastructure, production reliability. Most product engineering roles don't require ML depth but do require understanding the deployment and scaling challenges unique to large language models.", prep: "System design at scale (API serving, inference infrastructure, real-time systems). Production ML deployment patterns. Strong LeetCode fundamentals (medium-hard). Be prepared to discuss how you'd scale systems for 100M+ users." },
  { track: "Applied AI / Solutions", requirements: "Combination of technical depth and customer/partner engagement skills. Experience shipping AI-powered products, working with APIs at scale, and communicating technical concepts to non-technical stakeholders.", prep: "Be ready to demo technical competence through real work examples. Prepare for business context questions alongside technical ones. Know the OpenAI API deeply — rate limits, pricing, batching patterns, reliability considerations." },
];

const FAQS = [
  { question: "Does OpenAI hire people without a PhD?", answer: "Yes — a significant portion of OpenAI's engineering and operations workforce doesn't have PhDs. Research Scientist roles are PhD-heavy (or equivalent independent research experience). Software engineering, infrastructure, product, and applied AI roles hire strongly from industry without requiring advanced degrees. The selection criteria for non-research roles resembles other top-tier tech companies — strong engineering fundamentals, production experience, and demonstrated impact." },
  { question: "How important is AI safety knowledge for OpenAI interviews?", answer: "Varies significantly by role. For research roles and senior leadership positions, genuine engagement with AI safety is important — you should have thought seriously about alignment, interpretability, and the trade-offs in capability development. For product engineering, operations, and go-to-market roles, the bar is lower but you should understand OpenAI's mission and be able to speak authentically about why it matters. Generic 'I'm excited about AI' answers are insufficient at any level." },
  { question: "What's the best way to get noticed by OpenAI recruiters?", answer: "Contributions to the field: open-source work related to LLMs or AI safety, published research or preprints, involvement in AI safety communities, or public technical writing that demonstrates genuine expertise. Building impressive applications on the OpenAI API also gets attention — particularly work that demonstrates novel use cases, technical sophistication, or real user scale. A direct application with a standout resume is also viable — OpenAI actively recruits from competitive companies." },
];

export default async function HowToGetAJobAtOpenAIPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job at OpenAI — Interview Process & Tips (2025)"
        description="OpenAI combines deep technical requirements with strong mission alignment screening. Full process breakdown."
        url={`${BASE_URL}/blog/how-to-get-a-job-at-openai`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job at OpenAI", url: `${BASE_URL}/blog/how-to-get-a-job-at-openai` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · OpenAI</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at OpenAI</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Technical depth at the frontier, genuine mission alignment, and high agency. OpenAI is among the most selective employers in tech — here&apos;s how to prepare for each role track.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={3000} suffix="+" label="OpenAI employees globally (2025) — extremely selective at this scale" accent="#10B981" />
            <StatCard value={1} suffix="%" label="Estimated acceptance rate across all applicants" accent="#DC2626" />
            <StatCard value={3} label="Distinct role tracks — research, engineering, and applied AI — each prepared differently" accent="#7C3AED" />
            <StatCard value={4} label="Core traits OpenAI screens for beyond technical skills" accent="#D97706" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What OpenAI looks for beyond technical skills</h2>
          <div className="mt-6 space-y-4">
            {WHAT_OPENAI_LOOKS_FOR.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[13px] font-bold text-emerald-700">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The three role tracks — requirements and prep for each</h2>
          <div className="mt-6 space-y-4">
            {ROLE_TRACKS.map((item) => (
              <div key={item.track} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3">
                  <p className="font-bold text-[#4361EE]">{item.track}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Requirements</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.requirements}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to prepare</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.prep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for an OpenAI interview? Zari coaches the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you through mission alignment questions, behavioral prep for OpenAI&apos;s collaborative intellectual culture, and how to present research or engineering depth for each role track.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
