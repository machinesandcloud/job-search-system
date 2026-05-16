import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get Promoted: The Promotion Strategy That Actually Works",
  description:
    "The promotion strategy used by high performers who get promoted consistently. Visibility, sponsorship, and making the case at the right moment — a practical framework for any level.",
  keywords: ["how to get promoted", "promotion strategy", "career promotion tips", "get promoted at work", "promotion at work guide", "how to advance career", "promotion advice", "career level up"],
  alternates: { canonical: "/blog/promotion-strategy-guide" },
  openGraph: { title: "How to Get Promoted: The Strategy That Works", description: "Visibility, sponsorship, making the case. The promotion framework for consistent performers.", url: "/blog/promotion-strategy-guide" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function PromotionStrategyGuidePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get Promoted: The Promotion Strategy That Actually Works" description="Visibility, sponsorship, and making the case. A practical promotion framework for any level." url={`${BASE_URL}/blog/promotion-strategy-guide`} datePublished="2025-03-01" />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Promotion Strategy Guide", url: `${BASE_URL}/blog/promotion-strategy-guide` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[#EC4899]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EC4899]">Promotion</span>
            <span className="text-[12px] text-white/35">10 min read · March 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">How to Get Promoted:<br /><span className="text-white/50">The Strategy That Works</span></h1>
          <p className="text-[16px] leading-8 text-white/50">Promotions aren&apos;t about working harder. They&apos;re about working visibly, building sponsorship, and making the case at the right moment.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15.5px] leading-8 text-[var(--muted)]">
          <p>The highest performers in most organizations are not always the ones who get promoted first. Promotions go to the people who are performing at the next level, are visible to the people who make promotion decisions, and have built the sponsorship to carry them through the process.</p>
          <p>This is the framework that covers all three.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Principle 1: Perform at the next level before the title</h2>
          <p>Companies rarely promote people to a level they haven&apos;t already demonstrated. To be considered for a promotion, you need to be already operating at the next level in at least some dimensions — scope of work, quality of decisions, leadership influence.</p>
          <p>How to start operating at the next level:</p>
          <ul className="space-y-2">
            {["Take on scope your peers aren't taking on — lead cross-functional projects, own outcomes, not just tasks", "Solve problems before being asked — anticipate what's coming and address it proactively", "Communicate at the next level — write memos, present recommendations, explain reasoning rather than just reporting status"].map(i => (
              <li key={i} className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#EC4899] flex-shrink-0" /><span>{i}</span></li>
            ))}
          </ul>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Principle 2: Build visibility with the right people</h2>
          <p>Your manager knows your work. The people making promotion decisions may not. Visibility with senior stakeholders is essential — and most professionals don&apos;t build it intentionally.</p>
          <div className="space-y-3">
            {[
              { title: "Monthly skip-level updates", body: "A brief, well-structured monthly email to your manager's manager on what you're working on, what you've shipped, and what's next. One page. Specific outcomes. Consistent." },
              { title: "Presentation in the right rooms", body: "Volunteer to present your team's work in cross-functional meetings, executive reviews, or all-hands. Being the face of the work builds senior visibility quickly." },
              { title: "Written artifacts", body: "Write proposals, retrospectives, and strategy documents that circulate beyond your immediate team. Written artifacts compound visibility — they're seen by people you've never met." },
            ].map(item => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)] mb-1">{item.title}</p>
                <p className="text-[14px] leading-7">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Principle 3: Build and activate sponsorship</h2>
          <p>Sponsorship is different from mentorship. A mentor gives you advice. A sponsor advocates for you when you&apos;re not in the room. Promotions happen in conversations between managers — and you need someone in those conversations on your side.</p>
          <p>How to build sponsorship deliberately: do high-quality work for senior people who have influence over your promotion track. Make their work easier, solve their problems, and make them look good. Over time, they become advocates.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">Principle 4: Make the explicit case</h2>
          <p>Most people wait for their manager to notice they&apos;re ready for promotion. The high performers who get promoted faster make an explicit case: &quot;I believe I&apos;m performing at the next level. Here&apos;s the evidence. I&apos;d like to discuss the timeline.&quot;</p>
          <p>Structure your case around: scope of work (at what level?), outcomes and impact (with metrics), gaps acknowledged (what you&apos;re working on), and a specific ask (review in 6 months, promotion in next cycle).</p>

          <div className="mt-10 rounded-2xl border border-[#EC4899]/20 bg-[#EC4899]/[0.04] p-6 text-center">
            <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Build your promotion case with AI coaching</p>
            <p className="mb-5 text-[13.5px] text-[var(--muted)]">Zari helps you structure your evidence, practice your manager pitch, and close your gaps. Free first session.</p>
            <Link href="/promotion-coach" className="inline-flex h-11 items-center gap-2 rounded-xl px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#EC4899" }}>
              Build my promotion case free <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
