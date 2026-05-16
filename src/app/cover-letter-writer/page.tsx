import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Cover Letter Writer — Generate a Tailored Cover Letter in Minutes",
  description:
    "Write a compelling cover letter in minutes with Zari's AI cover letter writer. Tailored to the job description, ATS-optimized, and written to get past the 30-second recruiter scan.",
  keywords: ["AI cover letter writer", "cover letter writer", "cover letter generator", "AI cover letter", "write cover letter AI", "cover letter maker", "cover letter tool", "free cover letter writer"],
  alternates: { canonical: "/cover-letter-writer" },
  openGraph: { title: "AI Cover Letter Writer — Tailored Cover Letters in Minutes", description: "AI-generated cover letters tailored to the job description — ready in minutes, not hours.", url: "/cover-letter-writer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari's AI cover letter writer work?", answer: "You paste the job description and share key points about your background — Zari generates a tailored cover letter that addresses the specific role, mirrors the language of the job description, and leads with your most relevant experience. It's not a template fill-in; it writes the cover letter the way a strong candidate would write it." },
  { question: "Does the AI cover letter pass ATS?", answer: "Yes. Zari's cover letters are optimized for ATS keyword matching — the same approach we use for resumes. The letter incorporates role-specific keywords from the job description naturally, so it reads well to humans and scores well in ATS screening." },
  { question: "Should I always send a cover letter?", answer: "Only when it's optional or required. If the application says 'cover letter optional,' send one — it's a free opportunity to differentiate. If the application doesn't ask for one, don't attach it uninvited. Zari can write a targeted cover letter in under 3 minutes, so the effort cost is low." },
  { question: "Can Zari write cover letters for career changers?", answer: "Yes — career change cover letters require a specific approach: address the transition head-on, lead with transferable skills, and pre-empt the skeptical recruiter question ('why is a teacher applying for a PM role?'). Zari's career change cover letters are built around this structure." },
];

export default async function CoverLetterWriterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Cover Letter Writer", url: `${BASE_URL}/cover-letter-writer` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Cover Letter Writer · Tailored · ATS-Optimized · Free to Start
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            A cover letter worth reading<br />
            <span className="gradient-text-animated">in under 3 minutes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari reads the job description and writes a tailored cover letter that sounds like you wrote it — not a template. ATS-optimized, recruiter-tested, and ready to send.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Write my cover letter free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What makes Zari's cover letters different</h2>
          <p className="mb-12 text-[15px] text-[var(--muted)]">Most AI cover letter generators produce generic output that sounds like a template. Zari writes like a strong candidate who did their homework.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Tailored to the job description", body: "Zari reads the actual JD — not just your role title. The letter addresses the specific responsibilities, required skills, and company language in the posting. Recruiters can tell immediately whether a letter was written for this job or recycled." },
              { title: "Sounds like you, not like AI", body: "Generic AI outputs start with 'I am writing to express my interest in...' Zari writes with a specific opening hook based on your background and the role — the kind of opening that makes a recruiter read the second paragraph." },
              { title: "ATS keyword-optimized", body: "The same keyword matching Zari uses for resumes applies to cover letters. Role-specific terms appear naturally throughout the letter so it scores well in ATS screening without reading as keyword-stuffed." },
              { title: "Career change framing built in", body: "If you're making a career transition, Zari structures the letter to address the shift directly — leading with transferable strengths and pre-empting the skeptical question before the recruiter asks it." },
              { title: "The right length — always", body: "Cover letters should be 3–4 tight paragraphs. Not one sentence, not a full page. Zari keeps the letter to the length that recruiters actually read — enough to differentiate, short enough to respect their time." },
              { title: "Ready to send or easy to edit", body: "Zari's output is a finished cover letter, not a draft with brackets to fill in. You can send it as-is or adjust the tone and add personal details. Either way it takes minutes, not hours." },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/15">
                  <svg className="h-3.5 w-3.5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                </div>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[13.5px] leading-7 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">How it works</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Paste the job description", body: "Copy the full job posting into Zari. The more complete the JD, the more targeted the letter — Zari reads every requirement, responsibility, and company signal in the posting." },
              { step: "2", title: "Share your key background points", body: "Tell Zari 2–3 things about your experience most relevant to this role. You can also paste your resume for full context. Zari uses this to anchor the letter in your specific story." },
              { step: "3", title: "Get your tailored cover letter", body: "Zari writes a 3–4 paragraph cover letter optimized for this specific role: strong opening hook, specific evidence, company-relevant motivation, and a clear close." },
              { step: "4", title: "Edit, export, send", body: "Make any personal tweaks you want — tone, specific projects, company research you've done. Then export and attach to your application. Done in under 5 minutes." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-bold text-white">{item.step}</div>
                <div>
                  <p className="mb-1.5 font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">A cover letter that actually gets read — in 3 minutes. Free.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Write a cover letter" : "Write my cover letter free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
