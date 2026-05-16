import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Change Coach — AI Coaching for Your Career Pivot",
  description:
    "Changing industries or roles? Zari's AI career change coach reframes your resume for the new field, closes keyword gaps, and builds an interview story that positions your pivot as strategic — not desperate.",
  keywords: ["career change coach", "career pivot coach", "career transition coach", "AI career change help", "changing careers coach", "career switch guidance", "industry change coach"],
  alternates: { canonical: "/career-change-coach" },
  openGraph: { title: "Zari Career Change Coach — Make Your Pivot Land", description: "AI coaching for career changers: resume reframing, keyword gap analysis, and interview story for your new industry.", url: "/career-change-coach" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari help with a career change?", answer: "Zari runs a gap analysis between your current background and your target role — identifying which of your existing skills are most transferable, which keywords you're missing, and how to reframe your resume narrative to lead with evidence that's relevant to the new field." },
  { question: "Can Zari help if I'm changing to a completely different industry?", answer: "Yes. Zari is purpose-built for significant pivots — finance to tech, consulting to product, operations to strategy. It reframes your existing experience as evidence for the new role, not baggage from the old one." },
  { question: "What is the hardest part of a career change and how does Zari help?", answer: "The hardest part is making interviewers see your experience as relevant rather than risky. Zari builds a specific interview narrative that positions your switch as intentional and strategic — with language you can use out loud in the room." },
];

export default async function CareerChangeCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Change Coach", url: `${BASE_URL}/career-change-coach` }]} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#F97316", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Change Coach · Pivot Strategy · Resume Reframing</div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">Your experience translates.<br /><span style={{ background: "linear-gradient(135deg,#F97316,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Zari makes it obvious.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Career changers get filtered for the wrong reasons. Zari's AI career change coach reframes your resume for the new field, closes the keyword gap, and builds an interview story that positions your switch as intentional — not desperate.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#F97316" }}>
              Start my pivot plan free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/use-cases" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">See use cases</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What the career change coach does</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Transferable skill mapping", body: "Zari identifies the specific skills from your current role that are most valued in your target industry — and rewrites your resume to lead with those, not your title." },
              { title: "Keyword gap analysis", body: "Zari identifies the 3–5 keywords and signals your resume is missing for the new field — and either fills them from your existing work or flags what to build." },
              { title: "Interview narrative for the pivot", body: "Zari builds you a specific interview story that explains the career change as strategic — including how to handle the 'why are you switching?' question without sounding desperate." },
              { title: "LinkedIn repositioning", body: "Your LinkedIn headline and About are rewritten to signal the new direction without erasing your credibility from your previous career." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-3 text-[15px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[14px] leading-7 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#2d1500 0%,#9a4500 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your pivot starts here.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. Specific to your situation. No card required.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#9a4500] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
