import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Zari vs Competitors — AI Career Coach Comparisons",
  description:
    "How does Zari compare to Kleo, Teal, Jobscan, Resume Worded, and other AI career tools? Honest side-by-side comparisons on every dimension that matters.",
  keywords: ["AI career coach comparison", "Zari vs Kleo", "Zari vs Teal", "Zari vs Jobscan", "best AI career coach comparison", "career tool comparison"],
  alternates: { canonical: "/compare" },
};

const COMPARISONS = [
  { href: "/compare/zari-vs-kleo", title: "Zari vs Kleo", summary: "Kleo specializes in LinkedIn content. Zari does resume, LinkedIn, interviews, and strategy with session memory." },
  { href: "/compare/zari-vs-teal", title: "Zari vs Teal", summary: "Teal is a job tracker. Zari is an AI career coach. Different tools for different jobs." },
  { href: "/compare/zari-vs-jobscan", title: "Zari vs Jobscan", summary: "Jobscan scores resumes. Zari scores AND rewrites them — then coaches you on LinkedIn and interviews too." },
  { href: "/compare/zari-vs-resume-worded", title: "Zari vs Resume Worded", summary: "Resume Worded gives feedback. Zari gives feedback AND writes the improved version for you." },
];

export default async function ComparePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em]">Zari vs the competition</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/50">Honest comparisons across every AI career tool worth considering.</p>
        </div>
      </section>
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6 space-y-4">
          {COMPARISONS.map((c) => (
            <Link key={c.href} href={c.href} className="group flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
              <div>
                <p className="font-bold text-[var(--ink)] group-hover:text-[var(--brand)]">{c.title}</p>
                <p className="mt-1 text-[13.5px] text-[var(--muted)]">{c.summary}</p>
              </div>
              <svg className="h-5 w-5 flex-shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
