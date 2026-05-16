import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Change Careers Successfully: Step-by-Step Guide (2025)",
  description:
    "A complete career change guide: how to identify transferable skills, reframe your resume, close the experience gap, and make interviewers see your pivot as an asset rather than a risk.",
  keywords: ["how to change careers", "career change guide", "career pivot tips", "career transition advice", "changing careers at 30", "career change resume tips", "career switch guide", "career change without experience"],
  alternates: { canonical: "/blog/career-change-guide" },
  openGraph: { title: "How to Change Careers Successfully 2025 — Step-by-Step Guide", description: "Transferable skills, resume reframing, and the interview story that makes your pivot make sense.", url: "/blog/career-change-guide" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function CareerChangeGuidePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Change Careers Successfully: Step-by-Step Guide (2025)" description="Complete career change guide: transferable skills, resume reframing, and interview narrative." url={`${BASE_URL}/blog/career-change-guide`} datePublished="2025-03-01" />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Career Change Guide", url: `${BASE_URL}/blog/career-change-guide` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[#F97316]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F97316]">Career Change</span>
            <span className="text-[12px] text-white/35">13 min read · March 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">How to Change Careers<br /><span className="text-white/50">Successfully: Step-by-Step</span></h1>
          <p className="text-[16px] leading-8 text-white/50">Career changers fail for predictable reasons. This guide covers how to avoid them all.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15.5px] leading-8 text-[var(--muted)]">
          <p>Career changes fail not because people lack the skills — they fail because candidates present their background in ways that emphasize the gap rather than the bridge. The mechanics of a successful pivot are learnable and repeatable.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Step 1: Map your transferable skills honestly</h2>
          <p>The first step is an honest audit of what you actually have versus what your target role requires. Not what you wish you had — what you can prove you&apos;ve done.</p>
          <p>Transferable skills by category:</p>
          <ul className="space-y-2">
            {["Process management: project management, operations, workflow design — transfer across industries with minimal reframing", "Data analysis: regardless of domain, quantitative work transfers strongly", "People leadership: managing, mentoring, cross-functional coordination", "Communication: writing, presenting, influencing — high value everywhere", "Client/customer work: understanding user needs translates to product, customer success, any client-facing role"].map(i => (
              <li key={i} className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F97316] flex-shrink-0" /><span>{i}</span></li>
            ))}
          </ul>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Step 2: Identify and close the experience gap</h2>
          <p>After mapping transferable skills, identify what&apos;s genuinely missing. Be specific — &quot;I don&apos;t have product experience&quot; is too broad. What specific skills or credentials does your target role consistently require that you don&apos;t have?</p>
          <p>Gap-closing strategies that actually work:</p>
          <ul className="space-y-2">
            {["Build a portfolio of work in your target domain (even personal projects count)", "Get a certification that signals domain knowledge (PMI for project management, product management courses, etc.)", "Seek adjacent roles that bridge the gap rather than jumping directly", "Find the role at a smaller company where they value the skill transfer more than the domain background"].map(i => (
              <li key={i} className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--brand)] flex-shrink-0" /><span>{i}</span></li>
            ))}
          </ul>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Step 3: Reframe your resume for the new field</h2>
          <p>Your resume needs to be rebuilt — not just tweaked — for a career change. The goal is to make a reader in the new field see relevant evidence, not irrelevant background.</p>
          <p>Key reframing principles:</p>
          <div className="space-y-3">
            {[
              { title: "Lead with transferable skills, not job titles", body: "A summary section that explicitly bridges your background to the new field is essential. Don't make readers figure out why your background is relevant — tell them." },
              { title: "Use keywords from the target field", body: "Your resume will be filtered by ATS systems that don't know you're pivoting. Include keywords from your target field's job descriptions wherever you can honestly claim them." },
              { title: "Reframe job descriptions", body: "Describe your previous work in language that resonates with the new field. A consultant 'managed stakeholder relationships and drove strategic recommendations' — which sounds a lot like product management." },
            ].map(item => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)] mb-1">{item.title}</p>
                <p className="text-[14px] leading-7">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Step 4: Build your interview narrative</h2>
          <p>The toughest part of a career change interview is &quot;why are you switching?&quot; — a question that surfaces the risk interviewers feel about hiring you over someone with direct experience.</p>
          <p>Your answer needs to accomplish three things: (1) make the switch sound intentional and reasoned, (2) demonstrate domain knowledge, and (3) defuse the risk of taking a chance on you.</p>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 font-mono text-[13.5px] leading-7 text-[var(--ink)]">
            <p>&quot;I&apos;ve been working in [current field] for [X years], and what I&apos;ve found is that [specific observation about the new field or shared challenge]. I&apos;ve already started [specific action — side project, certification, courses], and what I&apos;m bringing is [specific transferable strength]. I&apos;m targeting [specific role type] because [specific reason it fits your trajectory].&quot;</p>
          </div>

          <div className="mt-10 rounded-2xl border border-[#F97316]/20 bg-[#F97316]/[0.04] p-6 text-center">
            <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Get AI coaching for your career change</p>
            <p className="mb-5 text-[13.5px] text-[var(--muted)]">Zari builds your pivot narrative, reframes your resume, and prepares your interview story. Free first session.</p>
            <Link href="/career-change-coach" className="inline-flex h-11 items-center gap-2 rounded-xl px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#F97316" }}>
              Start my pivot plan free <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
