import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Cover Letter With No Experience — 3 Examples (2025)",
  description:
    "How to write a cover letter when you have no work experience. The exact structure, 3 word-for-word examples for recent graduates and career changers, and the opening lines that get read.",
  keywords: ["cover letter with no experience", "how to write a cover letter with no experience", "cover letter no experience examples", "entry level cover letter", "cover letter for first job", "no experience cover letter template", "cover letter recent graduate", "internship cover letter no experience"],
  alternates: { canonical: "/blog/how-to-write-a-cover-letter-with-no-experience" },
  openGraph: {
    title: "How to Write a Cover Letter With No Experience — 3 Examples (2025)",
    description: "3 word-for-word cover letter examples for candidates with no work experience — plus the structure that turns limited background into genuine appeal.",
    url: "/blog/how-to-write-a-cover-letter-with-no-experience",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const EXAMPLES = [
  {
    profile: "Recent computer science graduate applying for a software engineering role",
    accent: "#7a8dff",
    letter: `Dear [Hiring Manager's Name],

I'm applying for the Software Engineer role at [Company]. I'm a recent CS graduate from [University], and while I don't have full-time work experience yet, I've spent the last three years building things I'm genuinely proud of — including a [brief project description] that [specific outcome, e.g., 'currently has 400 active users and processes $12K in monthly transactions'].

What drew me to [Company] specifically: I've used [their product] for [time period], and the [specific feature or decision] that ships in [recent version] showed a level of engineering thinking that I want to learn from firsthand. I've been studying how you've approached [specific technical area] and it's influenced how I think about [relevant technical topic].

I work quickly, I ask good questions, and I care about building software that actually works. I'd welcome the opportunity to talk about what you're building and how I might contribute.

[Your Name]`,
    why: "Three things this does: leads with a project result (not a degree), shows specific product research, and closes with a personality signal rather than generic enthusiasm.",
  },
  {
    profile: "Career changer with 5 years in marketing applying for a product manager role",
    accent: "#0D7182",
    letter: `Dear [Hiring Manager's Name],

I'm applying for the Product Manager role at [Company]. I'm making a deliberate move from marketing into product, and I want to explain briefly why — and why this specific role makes sense as the right starting point.

For five years I've been building and analyzing acquisition and activation funnels. The work I care most about has always been the same: understanding why users do what they do and designing systems that improve that behavior. What I've been doing is product work through a marketing lens. I want to do it from the inside.

I know I don't have a 'Product Manager' title. What I have is five years of cross-functional work with engineering and data, strong analytical instincts built from campaigns I actually had to make profitable, and a specific point of view on what [Company]'s [specific product area] could do better — based on [brief, genuine observation]. I'm happy to share that in a conversation.

[Your Name]`,
    why: "Career changers need to address the gap directly — not apologize for it. This letter makes the case that the transition is logical, not desperate, by naming the through-line across the career change.",
  },
  {
    profile: "College junior applying for a summer internship with no prior internship experience",
    accent: "#EC4899",
    letter: `Dear [Hiring Manager's Name],

I'm applying for the [Role] internship at [Company]. I'm a junior studying [major] at [University], and I'll be direct: this would be my first internship. I want to make the case that that's not a reason to stop reading.

Last semester I worked on a project for [class or extracurricular] where we [brief description]. I took on [specific responsibility] and [specific outcome]. It wasn't a corporate environment — but the problem was real, the deadline was real, and I had to figure out parts of it I'd never done before.

I'm applying to [Company] specifically because [one specific, genuine reason — product they use, mission they believe in, something they read about the team]. I've done more research on this role than any other I've applied to.

I don't have a resume full of experience. I have a lot of capacity to learn, clear evidence that I can execute, and genuine interest in what you're building. I hope that's worth a conversation.

[Your Name]`,
    why: "The 'I'll be direct' opener works because it names the obvious concern before the reader raises it — which reads as confident rather than defensive. The closing is honest without being self-deprecating.",
  },
];

export default async function CoverLetterNoExperiencePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Write a Cover Letter With No Experience — 3 Examples (2025)"
        description="3 word-for-word cover letter examples for candidates with no work experience — plus the structure that turns limited background into genuine appeal."
        url={`${BASE_URL}/blog/how-to-write-a-cover-letter-with-no-experience`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Cover Letter With No Experience", url: `${BASE_URL}/blog/how-to-write-a-cover-letter-with-no-experience` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Cover Letters</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Write a Cover Letter With No Experience — 3 Examples (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              A cover letter when you have no experience is not a confession — it&apos;s an argument. The argument isn&apos;t &ldquo;I&apos;m qualified,&rdquo; because you might not be on paper. The argument is: &ldquo;I&apos;m worth betting on.&rdquo; Here&apos;s how to make it.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The strategic shift: don&apos;t hide the gap</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most inexperienced candidates write cover letters that dance around the experience gap — they fill the space with enthusiasm, adjectives, and vague claims about passion. This reads as evasive, and experienced hiring managers notice immediately.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The stronger move: name the gap, briefly, then immediately redirect to what you have. &ldquo;I don&apos;t have X, but here&apos;s what I do have&rdquo; is a more persuasive structure than pretending X doesn&apos;t matter.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to put in a cover letter when you have nothing</h2>
            <div className="mt-5 space-y-3">
              {[
                { what: "Projects with outcomes", detail: "School projects, personal projects, club work, volunteer work — anything with a concrete result. Frame it in terms of what you did and what happened, not what it was called or which class it was for." },
                { what: "Specific company research", detail: "The most powerful differentiator for inexperienced candidates. A cover letter that shows you've actually used their product, read their engineering blog, or have a specific take on their market instantly separates you from the stack of generic applications." },
                { what: "The through-line logic", detail: "Why does your background — whatever it is — make you a good bet for this specific role? What's the logical connection? Make this explicit. Don't leave the reader to figure it out." },
                { what: "One personality signal", detail: "Not 'I'm passionate and hardworking' — everyone writes that. One specific detail about how you work, what you care about, or what you've taught yourself that tells a real story about you as a professional." },
              ].map((item) => (
                <div key={item.what} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <span className="text-[var(--brand)] font-bold mt-0.5">→</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.what}</p>
                    <p className="text-[13.5px] leading-5 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">3 word-for-word examples</h2>
            <p className="mt-2 text-[14px] text-[var(--muted)]">Each example is for a different situation — adapt the structure, not the words.</p>

            <div className="mt-6 space-y-8">
              {EXAMPLES.map((ex) => (
                <div key={ex.profile} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: ex.accent }} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ex.accent }}>{ex.profile}</p>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl bg-[var(--bg)] p-5 mb-4">
                      {ex.letter.split('\n\n').map((para, i) => (
                        <p key={i} className={`text-[13.5px] leading-7 text-[var(--muted)] ${i > 0 ? 'mt-4' : ''}`}>{para}</p>
                      ))}
                    </div>
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                      <p className="text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{ex.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Opening lines that get read (and ones that don&apos;t)</h2>
            <div className="mt-4 space-y-2">
              {[
                { line: "\"I'm applying for the [Role] at [Company].\"", verdict: "works", note: "Simple, direct. Gets to the point. Let the content do the work." },
                { line: "\"I'll be direct: this would be my first internship.\"", verdict: "works", note: "Confidence in naming the gap disarms it immediately." },
                { line: "\"I've used [their product] for [time] and I have a specific take on [thing].\"", verdict: "works", note: "Leads with genuine engagement. Hard to ignore." },
                { line: "\"I am writing to express my interest in the position of...\"", verdict: "skip", note: "Formal and passive. Wastes the first sentence on bureaucratic framing." },
                { line: "\"I am a highly motivated and passionate [role type]...\"", verdict: "skip", note: "Every cover letter says this. Immediately generic." },
              ].map((item) => (
                <div key={item.line} className={`flex items-start gap-3 rounded-xl border p-4 ${item.verdict === 'works' ? 'border-emerald-100 bg-emerald-50/30' : 'border-red-100 bg-red-50/30'}`}>
                  <span className={`font-bold text-[13px] mt-0.5 flex-shrink-0 ${item.verdict === 'works' ? 'text-emerald-500' : 'text-red-400'}`}>{item.verdict === 'works' ? '✓' : '✗'}</span>
                  <div>
                    <p className="font-mono text-[12.5px] text-[var(--muted)]">{item.line}</p>
                    <p className="text-[12px] text-[var(--muted)] mt-1">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your cover letter written by AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari writes personalized cover letters based on your actual experience and the specific job — not generic templates.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
