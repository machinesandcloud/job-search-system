import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Should I Use ChatGPT to Write My Resume? 2025 Honest Answer",
  description: "Should you use ChatGPT to write your resume in 2025? The honest answer — what AI does well, where it fails for resumes, and why job-specific ATS optimization beats generic AI generation.",
  keywords: ["should i use chatgpt to write my resume", "chatgpt resume", "ai resume writer", "chatgpt resume writing", "using ai to write resume", "chatgpt resume tips", "ai resume 2025", "chatgpt resume good or bad", "write resume with ai", "chatgpt for job applications"],
  alternates: { canonical: "/blog/should-i-use-chatgpt-to-write-my-resume" },
  openGraph: { title: "Should I Use ChatGPT to Write My Resume? 2025 Honest Answer", description: "What AI does well for resumes, where ChatGPT fails, and why job-specific ATS optimization is what actually matters.", url: "/blog/should-i-use-chatgpt-to-write-my-resume" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Can ChatGPT write a good resume?", answer: "ChatGPT can help you improve your resume, but it can't write a great one from scratch without significant input from you. The fundamental limitation: ChatGPT doesn't know the specific job description you're targeting, your actual accomplishments with real metrics, or the specific ATS keywords the employer's system uses. It can improve your bullet point language (turning 'responsible for X' into stronger verbs), help you structure a professional summary, and suggest ways to quantify vague descriptions. What it can't do: optimize for a specific job's ATS requirements, invent metrics you don't have, or provide the industry-specific judgment about what matters for your target role." },
  { question: "Will recruiters know if I used AI to write my resume?", answer: "In most cases, no — and it doesn't matter. Resumes have always been professionally written, edited, and assisted. Using AI to improve your writing is no different from using Grammarly or having a colleague review your work. The question is whether the content is authentic and accurate. The concern is not AI-written content per se — it's generic, low-quality content that doesn't reflect your real experience. A strong AI-assisted resume that accurately represents your accomplishments is better than a weak human-written one. However: if you use ChatGPT to fabricate metrics, experience, or skills you don't have, that's a different problem entirely — it's dishonest and will be exposed in interviews." },
  { question: "What's the difference between ChatGPT and a specialized resume AI?", answer: "ChatGPT is a general-purpose conversational AI — it can help you write almost anything, but it has no access to real-time job data, no ATS optimization capability, and no ability to score your resume against a specific job description. Specialized resume AI tools (like Zari) are built specifically for the job search context: they can parse job descriptions and extract ATS keywords, score your resume against those keywords, identify specific gaps, rewrite your resume to close those gaps, and track improvement between versions. The analogy: asking ChatGPT to optimize your resume is like asking a general contractor to do electrical work — they might do okay, but an electrician is built for that task." },
  { question: "What's the best way to use AI for my resume?", answer: "Use AI in layers: (1) Use a specialized job-search AI (Zari) for ATS optimization — it knows which keywords matter for your specific target role and can rewrite to match. (2) Use ChatGPT or Claude to improve the language quality of specific bullets — paste in weak bullet points and ask it to suggest stronger, more achievement-oriented versions. (3) Use Grammarly or similar for grammar and spelling. (4) Use your own judgment and real experience as the foundation — AI can only improve what you give it. The biggest mistake: letting AI generate your entire resume without your real experience as input, then wondering why it doesn't represent you accurately." },
];

export default async function ShouldIUseChatGPTToWriteMyResumePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Should I Use ChatGPT to Write My Resume? 2025 Honest Answer"
        description="What AI does well for resumes, where ChatGPT fails, and why job-specific ATS optimization is what actually matters."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/should-i-use-chatgpt-to-write-my-resume`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Should I Use ChatGPT to Write My Resume", url: `${BASE_URL}/blog/should-i-use-chatgpt-to-write-my-resume` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            ChatGPT · AI Resume · Job Search 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Should I Use ChatGPT<br />
            <span className="text-white/50">to Write My Resume?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The honest answer — what ChatGPT does well on resumes, where it fails, and what you actually need to get more callbacks in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 7 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">ChatGPT for resumes: what works and what doesn&apos;t</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#059669]">What ChatGPT does well</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {[
                  "Improving bullet language — turning weak verbs into stronger ones",
                  "Writing a professional summary when given the right inputs",
                  "Suggesting ways to quantify vague accomplishments",
                  "Formatting checks and grammar improvement",
                  "Generating variations of the same bullet to compare options",
                ].map(p => <li key={p} className="flex gap-2"><span className="text-[#059669] flex-shrink-0">✓</span>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#EF4444]">Where ChatGPT falls short</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {[
                  "No access to real-time ATS data for specific job postings",
                  "Can't score your resume against a specific job description",
                  "Generates generic content without your real accomplishments",
                  "No industry-specific keyword optimization",
                  "No feedback loop — can't tell you if your score improved",
                ].map(p => <li key={p} className="flex gap-2"><span className="text-[#EF4444] flex-shrink-0">✗</span>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">The right AI stack for your resume in 2025</h2>
          <div className="space-y-4 text-[14px] leading-7 text-[var(--muted)]">
            <p><strong className="text-[var(--ink)]">Step 1: Start with your real experience.</strong> No AI can substitute for your actual accomplishments. Before using any AI tool, list your top 5–10 achievements with as much quantification as you can — revenue, growth rates, team sizes, cost savings, products shipped. This is the raw material AI improves, not invents.</p>
            <p><strong className="text-[var(--ink)]">Step 2: Use a specialized resume AI for ATS optimization.</strong> Paste the job description into Zari and see your ATS score. The specific keywords for your target role — the ones that determine whether the ATS filters you in or out — require a tool built for this. ChatGPT doesn&apos;t know what keywords the Greenhouse ATS at Stripe is looking for. Zari does.</p>
            <p><strong className="text-[var(--ink)]">Step 3: Use ChatGPT for language improvement on specific bullets.</strong> Take bullets that are factually accurate but weakly written and ask ChatGPT to improve them. Use it as an editor, not a ghost-writer. &ldquo;Improve this bullet to be more achievement-focused and start with a strong verb: [your bullet]&rdquo; is a good prompt.</p>
            <p><strong className="text-[var(--ink)]">Step 4: Final review by you.</strong> Read every line. Remove anything that doesn&apos;t sound like you or isn&apos;t completely accurate. AI can make resumes sound impressive — only you know what&apos;s true.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Use AI that&apos;s built for your job search.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari scores your resume against any job description and rewrites it to close keyword gaps — the ATS optimization ChatGPT can&apos;t do. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Try Zari free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
