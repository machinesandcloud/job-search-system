import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Video Interview Tips 2025 — How to Ace Your Remote Interview",
  description: "20 video interview tips covering setup, camera, lighting, audio, body language, eye contact, and technical prep. Works for Zoom, Teams, Google Meet, and one-way video interviews.",
  keywords: ["video interview tips", "how to do a video interview", "Zoom interview tips", "video job interview tips", "remote interview tips", "one-way video interview tips", "Microsoft Teams interview tips", "video interview preparation", "virtual interview tips", "online interview tips 2025"],
  alternates: { canonical: "/blog/video-interview-tips" },
  openGraph: { title: "Video Interview Tips 2025 — 20 Tactics to Ace Remote Interviews", description: "Setup, lighting, camera, audio, eye contact, and body language for video interviews on Zoom, Teams, and Google Meet.", url: "/blog/video-interview-tips" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "What's the most common video interview mistake?", answer: "Looking at your own face on screen instead of the camera. When you watch yourself, the interviewer sees you looking slightly downward — which reads as avoidance or discomfort. Close your self-view or put a small arrow sticker on your camera. Practice making camera contact feel natural: think of the camera lens as the interviewer's eyes." },
  { question: "How should I set up my background for a video interview?", answer: "A clean, neutral wall or bookshelf is best. Virtual backgrounds are acceptable but can glitch and create a 'floating head' effect that's distracting. The most important rule: nothing that competes for attention. No busy art, no people walking past, no open doors into messy rooms. Natural light from a window is ideal — sit facing it, not with it behind you." },
  { question: "How early should I join a video interview?", answer: "Join the meeting room 5 minutes early, not 10–15. Too early can create awkward pressure on the interviewer. Log into the platform 15 minutes before to test your setup, but wait in the lobby until the actual meeting start time. Have the dial-in link open and ready 10 minutes before." },
  { question: "What if my internet cuts out during the interview?", answer: "Prepare a backup before the interview: your phone as a hotspot, the interviewer's direct dial number (ask the recruiter beforehand), and a pre-written message to send if you drop: 'Apologies — connection dropped. Reconnecting now.' Mentioning your internet backup plan at the start of the interview is perfectly acceptable and signals professionalism." },
];

const TIPS = [
  { num: "01", cat: "Camera & Eye Contact", tip: "Look at the camera lens, not at the interviewer's face on screen.", detail: "Your face on screen looks down when you look at their face. Put a small sticker near your camera as a reminder." },
  { num: "02", cat: "Camera & Eye Contact", tip: "Position your camera at eye level — not looking up your nose.", detail: "Laptop on a stand or stack of books. Eye-level camera reads as confident and direct." },
  { num: "03", cat: "Lighting", tip: "Sit facing your light source — window or lamp behind the camera.", detail: "Light behind you puts your face in shadow. Light from the side creates unflattering harsh shadows. Front-facing light is even and professional." },
  { num: "04", cat: "Lighting", tip: "Use a ring light if your room has poor natural light.", detail: "A $25 ring light eliminates most lighting problems. Worth it for any role you care about." },
  { num: "05", cat: "Audio", tip: "Use headphones with a built-in mic or a dedicated mic — not laptop speakers.", detail: "Laptop mics pick up room echo. Headphone mics reduce echo and background noise dramatically." },
  { num: "06", cat: "Audio", tip: "Test your audio 10 minutes before with a test call.", detail: "Most video platforms have a 'test audio' feature in settings. Use it every time." },
  { num: "07", cat: "Setup", tip: "Close every unnecessary application and tab before the interview.", detail: "Notifications during an interview are jarring. Slack, email, phone — all on do-not-disturb." },
  { num: "08", cat: "Setup", tip: "Have a physical notepad for notes — not a keyboard.", detail: "Typing during an interview sounds like you're writing emails. A notepad is quieter and more natural." },
  { num: "09", cat: "Body Language", tip: "Sit slightly forward, not slumped back.", detail: "Leaning slightly forward signals engagement. Slumped back signals disinterest even if you're paying close attention." },
  { num: "10", cat: "Body Language", tip: "Smile and nod naturally — verbal acknowledgment ('mm-hmm') is more obvious on video.", detail: "On video, passive expressions look blank. Slightly exaggerate your active listening signals." },
  { num: "11", cat: "Preparation", tip: "Do a full mock run the day before at the same desk with the same setup.", detail: "Catch problems with lighting, background, internet, and software before they happen during the real thing." },
  { num: "12", cat: "Preparation", tip: "Have your resume, notes, and key bullet points visible on a second screen or printed.", detail: "Don't read from them — but a quick glance at a bullet point you prepared is completely acceptable in a video format." },
];

export default async function VideoInterviewTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Video Interview Tips 2025" description="20 video interview tips for setup, camera, lighting, audio, and body language on Zoom, Teams, and Google Meet." url={`${BASE_URL}/blog/video-interview-tips`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Video Interview Tips", url: `${BASE_URL}/blog/video-interview-tips` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0369A1 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Interview Prep</span>
            <span className="text-[12px] text-white/35">11 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Video Interview Tips 2025</h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/40">20 Tactics for Zoom, Teams, Google Meet & One-Way Video</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">Most candidates spend 95% of their prep on answers and 0% on setup. But a bad camera angle, poor lighting, or echo audio tanks your impression before you say a word. Fix the setup first.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={67} suffix="%" label="of interviews are now conducted via video" accent="#0369A1" />
            <StatCard value={7} label="seconds for first impression to form on video" accent="#7C3AED" />
            <StatCard value={80} suffix="%" label="of hiring decisions influenced by non-verbal cues" accent="#059669" />
            <StatCard value={1} label="ring light eliminates most lighting problems ($25–$40)" accent="#D97706" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 12 highest-impact video interview tips</h2>
          <div className="space-y-3 mb-14">
            {TIPS.map(({ num, cat, tip, detail }) => (
              <div key={num} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
                  <span className="text-[22px] font-extrabold text-[#0369A1]/30">{num}</span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0369A1]">{cat}</span>
                    <p className="font-bold text-[14px]">{tip}</p>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">One-way video interviews — special considerations</h2>
          <p className="mb-5 text-[14px] text-[var(--muted)]">Platforms like HireVue, Spark Hire, and Montage record asynchronous video answers. You record your response to a question and submit — no live interaction. These require different preparation:</p>
          <div className="mb-12 grid gap-3 sm:grid-cols-2">
            {[
              { icon: "⏱️", title: "Know your time limit", body: "Most one-way platforms show your time limit per answer (30s, 90s, 2 min). Practice answering within the limit before you record." },
              { icon: "🎯", title: "Start strong in the first 5 seconds", body: "No live interviewer to warm up to. Open with a clear, confident statement — not 'Um, so, like, I think...'" },
              { icon: "🔁", title: "Use your re-record allowance wisely", body: "Most platforms allow 1–2 retakes. Don't over-retake — your first or second take is usually more natural than your fifth." },
              { icon: "📱", title: "Disable phone notifications", body: "A ping mid-answer in a one-way video looks far worse than it sounds. Full DND before you start." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-2 text-xl">{icon}</div>
                <div className="mb-1 font-bold text-[14px]">{title}</div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 10-minute pre-interview checklist</h2>
          <div className="mb-10 space-y-2">
            {["Log into the video platform and test audio/video", "Close all apps except the video call", "Silence phone and put it face-down", "Put notepad and pen within reach", "Have water accessible (not fizzy)", "Confirm the meeting link and dial-in backup", "Set your camera at eye level", "Check your background and lighting", "Open your resume on a second screen or print it", "Take 3 slow breaths — go"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-[#0369A1] text-[10px] font-bold text-[#0369A1] flex-shrink-0">{i + 1}</div>
                <p className="text-[13px] text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0369A1 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Great setup. Now nail the answers.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari runs mock video interview simulations with STAR scoring and voice coaching — so your answers are as polished as your setup.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0369A1]">Start mock interview free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
