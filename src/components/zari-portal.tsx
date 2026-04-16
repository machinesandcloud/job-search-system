"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatar, type AvatarState } from "@/components/zari-avatar";

/* ─── Types ─── */
type Screen = "dashboard" | "coaching" | "resume" | "interview" | "linkedin" | "history" | "plan";

/* ─── Helpers ─── */
function ScoreBadge({ score, max = 100 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 80 ? "#16A34A" : pct >= 60 ? "#D97706" : "#DC2626";
  const bg = pct >= 80 ? "#F0FFF4" : pct >= 60 ? "#FFF7ED" : "#FEF2F2";
  return (
    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: bg, color }}>
      {score}{max === 100 ? "" : `/${max}`}
    </span>
  );
}

function ProgressBar({ pct, color = "#4361EE" }: { pct: number; color?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[#F1F5F9]">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color, animation: "bar-fill 0.8s ease both" }} />
    </div>
  );
}

/* ─── Nav items ─── */
const NAV = [
  { id: "dashboard" as Screen, label: "Dashboard", icon: <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".8"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/></svg> },
  { id: "coaching"  as Screen, label: "Live Session", icon: <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4"><path d="M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.4"/><path d="M3 8v1a5 5 0 0010 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="8" y1="14" x2="8" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { id: "resume"    as Screen, label: "Resume Review", icon: <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4"><rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5 5h6M5 8h6M5 11h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { id: "interview" as Screen, label: "Mock Interview", icon: <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { id: "linkedin"  as Screen, label: "LinkedIn", icon: <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4"><rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M4 7v5M4 4.5v.5M7 12V9a2 2 0 014 0v3M7 9v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { id: "history"   as Screen, label: "Past Sessions", icon: <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { id: "plan"      as Screen, label: "Action Plan", icon: <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 1v4M11 1v4M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
];

const TOPBAR_META: Record<Screen, { title: string; badge: string; badgeColor: string }> = {
  dashboard: { title: "Dashboard", badge: "3 sessions this week", badgeColor: "#F0FFF4|#16A34A" },
  coaching:  { title: "Live coaching room", badge: "Session active", badgeColor: "#EEF2FF|#4361EE" },
  resume:    { title: "Resume review", badge: "Score: 74/100", badgeColor: "#EEF2FF|#4361EE" },
  interview: { title: "Mock interview", badge: "Question 2 of 6", badgeColor: "#FFF7ED|#D97706" },
  linkedin:  { title: "LinkedIn review", badge: "Score: 61/100", badgeColor: "#FFF7ED|#D97706" },
  history:   { title: "Past sessions", badge: "7 total", badgeColor: "#F0FFF4|#16A34A" },
  plan:      { title: "Action plan", badge: "5 of 9 done", badgeColor: "#F0FFF4|#16A34A" },
};

/* ════════════════════════════════════════════
   SCREEN: DASHBOARD
════════════════════════════════════════════ */
function ScreenDashboard({ goTo }: { goTo: (s: Screen) => void }) {
  return (
    <div className="portal-screen p-6">
      <p className="mb-1 text-[18px] font-bold text-[var(--ink)]">Good morning, Steve 👋</p>
      <p className="mb-6 text-[13px] text-[var(--muted)]">Working toward: <strong className="text-[var(--brand)]">Senior Product Manager</strong></p>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label:"Sessions", val:"7", sub:"+2 this week", icon:"📊" },
          { label:"Resume score", val:"74", sub:"Up from 58", icon:"📄" },
          { label:"Interview avg", val:"68%", sub:"3 mock sessions", icon:"🎯" },
          { label:"Actions done", val:"5/9", sub:"2 due this week", icon:"✅" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[var(--shadow)]">
            <div className="mb-2 text-[22px]">{s.icon}</div>
            <p className="text-[11px] font-medium text-[var(--muted)]">{s.label}</p>
            <p className="mt-0.5 text-[24px] font-extrabold text-[var(--ink)]">{s.val}</p>
            <p className="text-[11px] text-[var(--muted)]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Start a session */}
      <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Start a session</p>
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {[
          { screen:"coaching" as Screen, icon:"🎙", label:"Live coaching session", desc:"Talk face-to-face with your AI coach via voice avatar.", bg:"#EEF2FF", color:"#4361EE" },
          { screen:"resume"   as Screen, icon:"📄", label:"Resume review", desc:"Upload your resume · ATS score · rewrites with metrics.", bg:"#F0FFF4", color:"#16A34A" },
          { screen:"interview"as Screen, icon:"👔", label:"Mock interview", desc:"STAR-structured practice with real-time scoring.", bg:"#FFF7ED", color:"#D97706" },
          { screen:"linkedin" as Screen, icon:"💼", label:"LinkedIn review", desc:"Headline, About section, and keyword visibility score.", bg:"#F0F9FF", color:"#0284C7" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => goTo(item.screen)}
            className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-[var(--shadow)] transition-all hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-[20px]" style={{ background: item.bg }}>
              {item.icon}
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[var(--ink)]">{item.label}</p>
              <p className="text-[12px] leading-5 text-[var(--muted)]">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Recent sessions */}
      <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Recent sessions</p>
      <div className="space-y-2">
        {[
          { icon:"🎙", name:"Career direction — Senior PM transition", meta:"Today · 24 min · 3 action items", badge:"Coaching", bg:"#EEF2FF", color:"#4361EE", screen:"coaching" as Screen },
          { icon:"📄", name:"Resume review — Product Manager v3", meta:"Yesterday · 18 min", badge:"74/100", bg:"#F0FFF4", color:"#16A34A", screen:"resume" as Screen },
          { icon:"👔", name:"Behavioral mock interview — STAR method", meta:"2 days ago · 31 min", badge:"68%", bg:"#FFF7ED", color:"#D97706", screen:"interview" as Screen },
        ].map((s) => (
          <button key={s.name} onClick={() => goTo(s.screen)} className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-left transition-all hover:border-[var(--brand)]">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[16px]" style={{ background: s.bg }}>{s.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-semibold text-[var(--ink)]">{s.name}</p>
              <p className="text-[11px] text-[var(--muted)]">{s.meta}</p>
            </div>
            <span className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: s.bg, color: s.color }}>{s.badge}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: LIVE COACHING
════════════════════════════════════════════ */
function ScreenCoaching() {
  const [avatarState, setAvatarState] = useState<AvatarState>("speaking");
  const [activeTab, setActiveTab] = useState<"docs"|"notes"|"actions">("docs");
  const states: AvatarState[] = ["speaking","listening","thinking","speaking"];
  const durations = [3000, 2000, 1800, 3200];
  const [stateIdx, setStateIdx] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const next = (stateIdx + 1) % states.length;
      setStateIdx(next);
      setAvatarState(states[next]);
    }, durations[stateIdx]);
    return () => clearTimeout(t);
  }, [stateIdx]);

  return (
    <div className="portal-screen flex flex-col lg:flex-row" style={{ height: "calc(100vh - 52px)", overflow: "hidden" }}>
      {/* Left: avatar + transcript + controls */}
      <div className="flex flex-1 flex-col min-h-0">
        {/* Avatar area */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden" style={{ background:"linear-gradient(160deg,#0C1023 0%,#1a2035 100%)" }}>
          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background:"rgba(255,255,255,0.12)" }}>⬤ LIVE</span>
            <span className="rounded-full px-2.5 py-1 text-[10px] text-white/60" style={{ background:"rgba(255,255,255,0.08)" }}>Career Direction</span>
          </div>
          <div className="absolute right-3 top-3 text-[10px] text-white/30">HD · 18ms</div>

          <ZariAvatar state={avatarState} size={160} />
          <p className="mt-4 text-[15px] font-semibold text-white">Zari — Your Career Coach</p>
          <p className="mt-1 text-[12px] text-white/50">
            {avatarState === "speaking" ? "🟢 Speaking..." : avatarState === "listening" ? "🔵 Listening..." : "💜 Thinking..."}
          </p>

          {/* Live transcript bubble */}
          <div className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 text-[12px] leading-6 text-white/80" style={{ background:"rgba(0,0,0,0.40)", backdropFilter:"blur(8px)" }}>
            &ldquo;Based on your background in operations, the biggest gap for Senior PM roles is showing product strategy ownership. Let&apos;s work on that narrative together&hellip;&rdquo;
          </div>
        </div>

        {/* Transcript */}
        <div className="border-t border-[var(--border)] bg-[#F8FAFF] p-3" style={{ maxHeight: 160, overflowY:"auto" }}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Transcript</p>
          {[
            { who:"You", text:"I've been in operations for 4 years and want to transition to Senior PM at a tech company." },
            { who:"Zari", text:"Great context. Your ops background is a strong differentiator — the gap we need to close is product strategy ownership and stakeholder influence. Have you led any cross-functional initiatives?" },
            { who:"You", text:"Yes, I led a supply chain redesign that involved 5 teams last year…" },
          ].map((line, i) => (
            <p key={i} className="mb-1 text-[12px] leading-5 text-[var(--ink-2)]">
              <strong className="font-semibold text-[var(--ink)]">{line.who}:</strong> {line.text}
            </p>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 border-t border-[var(--border)] bg-white px-4 py-3">
          {[
            { icon:"🎙", title:"Mute" },
            { icon:"🔊", title:"Speaker" },
            { icon:"💬", title:"Captions" },
            { icon:"⏸", title:"Pause" },
            { icon:"⌨️", title:"Text mode" },
          ].map((btn) => (
            <button key={btn.title} title={btn.title} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-alt)] text-[16px] transition-all hover:border-[var(--brand)] hover:bg-[var(--brand-light)]">
              {btn.icon}
            </button>
          ))}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF2F2] text-[16px] border border-[#FECACA] transition-all hover:bg-[#FEE2E2]" title="End session">
            ✕
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col border-l border-[var(--border)] bg-white lg:w-72">
        {/* Tabs */}
        <div className="flex border-b border-[var(--border)]">
          {(["docs","notes","actions"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 py-2.5 text-[12px] font-semibold capitalize transition-colors" style={{ color: activeTab === tab ? "var(--brand)" : "var(--muted)", borderBottom: activeTab === tab ? "2px solid var(--brand)" : "2px solid transparent" }}>
              {tab === "docs" ? "Documents" : tab === "notes" ? "Notes" : "Actions"}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "docs" && (
            <div>
              <div className="mb-3 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-alt)] p-4 text-center text-[12px] text-[var(--muted)] cursor-pointer hover:border-[var(--brand)] transition-colors">
                + Upload resume or profile
              </div>
              {[
                { name:"Resume_PM_v3.pdf", size:"82 KB · Indexed", badge:"Active", bg:"#F0FFF4", color:"#16A34A" },
                { name:"LinkedIn_export.pdf", size:"34 KB · Indexed", badge:"Loaded", bg:"#EEF2FF", color:"#4361EE" },
              ].map((doc) => (
                <div key={doc.name} className="mb-2 flex items-center gap-3 rounded-xl border border-[var(--border)] p-3">
                  <span className="text-[20px]">📄</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[12px] font-semibold text-[var(--ink)]">{doc.name}</p>
                    <p className="text-[10px] text-[var(--muted)]">{doc.size}</p>
                  </div>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: doc.bg, color: doc.color }}>{doc.badge}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "notes" && (
            <div className="text-[13px] leading-6 text-[var(--ink-2)]">
              <p className="mb-3 font-semibold text-[var(--ink)]">Session notes</p>
              {["Ops to PM transition — 4 yrs experience", "Led supply chain redesign (5 teams)", "Gap: product strategy narrative", "Gap: stakeholder influence story", "Target: Senior PM at Series B–D tech"].map((note) => (
                <p key={note} className="mb-1.5">• {note}</p>
              ))}
            </div>
          )}
          {activeTab === "actions" && (
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Action items</p>
              {[
                { text:"Reframe supply chain project as product initiative", done:true },
                { text:"Write 3 STAR stories showing cross-functional influence", done:false },
                { text:"Update resume headline to 'Product-minded Ops Leader'", done:false },
              ].map((item) => (
                <div key={item.text} className="mb-3 flex items-start gap-2.5">
                  <div className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-[10px] ${item.done ? "bg-[#F0FFF4] text-[#16A34A] border border-[#BBF7D0]" : "border border-[var(--border)]"}`}>
                    {item.done && "✓"}
                  </div>
                  <p className={`text-[12px] leading-5 ${item.done ? "text-[var(--muted)] line-through" : "text-[var(--ink)]"}`}>{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: RESUME REVIEW
════════════════════════════════════════════ */
function ScreenResume() {
  return (
    <div className="portal-screen p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[16px] font-bold text-[var(--ink)]">Resume review</p>
          <p className="text-[13px] text-[var(--muted)]">Resume_PM_v3.pdf · Analyzed 2 min ago</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[12px] font-semibold text-[var(--ink)] transition hover:border-[var(--brand)]">Target a role</button>
          <button className="rounded-lg bg-[var(--brand)] px-3 py-2 text-[12px] font-semibold text-white shadow-[var(--shadow-brand)] transition hover:bg-[var(--brand-hover)]">Download rewrites</button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Document preview */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]">
          <p className="text-[16px] font-bold text-[var(--ink)]">Steve Ngoumnai</p>
          <p className="mb-4 text-[12px] text-[var(--muted)]">Operations Lead · London, UK</p>
          {[
            { label:"Summary", text:"Experienced operations professional with 4 years driving cross-functional process improvements at scale. Seeking to transition into Senior Product Manager roles…" },
            { label:"Experience", text:"Ops Lead — FinCo Ltd · 2021–present\nManaged supply chain redesign across 5 business units…" },
            { label:"Education", text:"BSc Business Management · UCL · 2019" },
          ].map((block) => (
            <div key={block.label} className="mb-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] p-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">{block.label}</p>
              <p className="text-[12px] leading-5 text-[var(--ink-2)] whitespace-pre-line">{block.text}</p>
            </div>
          ))}
        </div>

        {/* Analysis */}
        <div>
          {/* Score pills */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            {[
              { label:"Overall",   val:74, color:"#4361EE", bg:"#EEF2FF" },
              { label:"ATS score", val:68, color:"#D97706", bg:"#FFF7ED" },
              { label:"Clarity",   val:71, color:"#0284C7", bg:"#F0F9FF" },
              { label:"Impact",    val:61, color:"#DC2626", bg:"#FEF2F2" },
            ].map((sc) => (
              <div key={sc.label} className="rounded-xl border border-[var(--border)] bg-white p-3 text-center shadow-[var(--shadow)]">
                <p className="text-[22px] font-extrabold" style={{ color: sc.color }}>{sc.val}</p>
                <p className="text-[11px] text-[var(--muted)]">{sc.label}</p>
                <div className="mt-2"><ProgressBar pct={sc.val} color={sc.color} /></div>
              </div>
            ))}
          </div>

          {/* Findings */}
          <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-[var(--muted)]">Findings</p>
          {[
            { icon:"⚠️", text:"Summary doesn't mention product outcomes — ATS filters for 'product' keywords will miss you." },
            { icon:"⚠️", text:"Experience bullets are task-focused ('managed') rather than outcome-focused ('delivered 22% reduction')." },
            { icon:"✓",  text:"Cross-functional project scope is strong and differentiating.", good:true },
            { icon:"💡", text:"Add quantified metrics to at least 3 more bullets to reach 80+ impact score." },
          ].map((f) => (
            <div key={f.text} className={`mb-2 flex items-start gap-2 rounded-lg p-2.5 text-[12px] ${f.good ? "bg-[#F0FFF4] text-[#14532D]" : "bg-[#F8F9FF] text-[var(--ink-2)]"}`}>
              <span className="mt-0.5 flex-shrink-0">{f.icon}</span>
              <span className="leading-5">{f.text}</span>
            </div>
          ))}

          {/* Rewrite */}
          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[var(--shadow)]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Suggested rewrite — top bullet</p>
            <div className="mb-2 rounded-lg bg-[#FEF2F2] p-3 text-[12px] leading-5 text-[#991B1B] line-through">
              Managed supply chain redesign across 5 business units.
            </div>
            <div className="rounded-lg p-3 text-[12px] leading-5 text-[#14532D]" style={{ background:"#F0FFF4" }}>
              Led end-to-end supply chain redesign across 5 business units, reducing fulfilment time by 22% and saving £340K annually — delivered on time under executive sponsorship.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: MOCK INTERVIEW
════════════════════════════════════════════ */
function ScreenInterview({ goTo }: { goTo: (s: Screen) => void }) {
  return (
    <div className="portal-screen p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[16px] font-bold text-[var(--ink)]">Mock interview</p>
          <p className="text-[13px] text-[var(--muted)]">Senior PM · Behavioral · Question 2 of 6</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-[#FFF7ED] px-3 py-1.5 text-[11px] font-bold text-[#D97706]">In progress</span>
          <button onClick={() => goTo("coaching")} className="rounded-lg bg-[var(--brand)] px-3 py-2 text-[12px] font-semibold text-white">Switch to voice</button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div>
          {/* Question */}
          <div className="mb-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Question 2 of 6</p>
            <p className="mb-4 text-[15px] font-semibold leading-6 text-[var(--ink)]">
              Tell me about a time you had to align multiple stakeholders with conflicting priorities. How did you get buy-in?
            </p>
            <div className="mb-4 rounded-xl bg-[var(--bg-alt)] p-4 text-[13px] italic leading-6 text-[var(--ink-2)]">
              &ldquo;In my supply chain project, the finance team wanted to reduce costs by 30%, while logistics needed more budget for automation. I ran separate discovery sessions with each team, found the shared goal was speed-to-customer, and proposed a phased plan that hit both targets over 18 months. I got sign-off from both VPs in one joint presentation.&rdquo;
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { text:"Clear STAR structure", color:"#16A34A", bg:"#F0FFF4" },
                { text:"Concrete outcome", color:"#16A34A", bg:"#F0FFF4" },
                { text:"Add: how you handled resistance", color:"#D97706", bg:"#FFF7ED" },
                { text:"Missing: decision-making framework", color:"#DC2626", bg:"#FEF2F2" },
              ].map((pill) => (
                <span key={pill.text} className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: pill.bg, color: pill.color }}>{pill.text}</span>
              ))}
            </div>
          </div>

          {/* Coach feedback */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]">
            <p className="mb-2 text-[12px] font-bold text-[var(--ink)]">Zari&apos;s feedback</p>
            <p className="text-[13px] leading-6 text-[var(--muted)]">
              Good use of the STAR framework and strong concrete result. To score higher, add a sentence on how you navigated the VP who was initially resistant — that shows real stakeholder influence, which is exactly what Senior PM panels probe for.
            </p>
          </div>
        </div>

        {/* Score panel */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]">
          <div className="mb-4 text-center">
            <p className="text-[3rem] font-extrabold text-[var(--brand)]">68<span className="text-[1.4rem] text-[var(--muted)]">%</span></p>
            <p className="text-[12px] text-[var(--muted)]">Answer score</p>
          </div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Score breakdown</p>
          {[
            { label:"Structure",  val:85, color:"#16A34A" },
            { label:"Evidence",   val:78, color:"#16A34A" },
            { label:"Concision",  val:70, color:"#D97706" },
            { label:"Influence",  val:42, color:"#DC2626" },
            { label:"Framing",    val:55, color:"#D97706" },
          ].map((dim) => (
            <div key={dim.label} className="mb-2.5">
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="text-[var(--muted)]">{dim.label}</span>
                <span className="font-bold" style={{ color: dim.color }}>{dim.val}</span>
              </div>
              <ProgressBar pct={dim.val} color={dim.color} />
            </div>
          ))}
          <div className="mt-5 space-y-2">
            <button className="w-full rounded-xl border border-[var(--border)] py-2.5 text-[13px] font-semibold text-[var(--ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]">Retry this answer</button>
            <button className="w-full rounded-xl bg-[var(--brand)] py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--brand-hover)]">Next question →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: LINKEDIN
════════════════════════════════════════════ */
function ScreenLinkedIn() {
  return (
    <div className="portal-screen p-6">
      <div className="mb-5">
        <p className="text-[16px] font-bold text-[var(--ink)]">LinkedIn review</p>
        <p className="text-[13px] text-[var(--muted)]">Paste your sections or upload your LinkedIn export PDF</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          {/* Headline */}
          <p className="mb-2 text-[12px] font-bold text-[var(--ink)]">Headline</p>
          <div className="mb-1 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] p-3 text-[13px] text-[var(--muted)]">Operations Lead at FinCo Ltd</div>
          <div className="mb-4 rounded-xl p-3 text-[13px] text-[#14532D]" style={{ background:"#F0FFF4" }}>
            💡 Suggested: &ldquo;Operations Leader → Product | 5-team cross-functional delivery | Transition to Senior PM&rdquo;
          </div>
          {/* About */}
          <p className="mb-2 text-[12px] font-bold text-[var(--ink)]">About section</p>
          <div className="mb-2 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] p-3 text-[12px] leading-5 text-[var(--muted)]">
            I&apos;m an experienced operations professional passionate about process and people. I&apos;ve worked across supply chain, logistics, and vendor management for 4 years…
          </div>
          <div className="mb-1 rounded-lg bg-[#FEF2F2] p-2.5 text-[12px] text-[#991B1B]">⚠️ Doesn&apos;t mention target role — recruiters scanning for &ldquo;PM&rdquo; won&apos;t find you</div>
          <div className="rounded-lg bg-[#FEF2F2] p-2.5 text-[12px] text-[#991B1B]">⚠️ Missing keywords: product strategy, roadmap, stakeholder management</div>
        </div>
        <div>
          {/* Scores */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            {[
              { label:"Visibility", val:61, color:"#D97706", bg:"#FFF7ED" },
              { label:"Keyword fit", val:54, color:"#DC2626", bg:"#FEF2F2" },
            ].map((sc) => (
              <div key={sc.label} className="rounded-xl border border-[var(--border)] bg-white p-3 text-center shadow-[var(--shadow)]">
                <p className="text-[22px] font-extrabold" style={{ color: sc.color }}>{sc.val}</p>
                <p className="text-[11px] text-[var(--muted)]">{sc.label}</p>
                <div className="mt-2"><ProgressBar pct={sc.val} color={sc.color} /></div>
              </div>
            ))}
          </div>
          <p className="mb-2 text-[12px] font-bold text-[var(--ink)]">Keyword gaps</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              { text:"product strategy", color:"#DC2626", bg:"#FEF2F2" },
              { text:"roadmap", color:"#DC2626", bg:"#FEF2F2" },
              { text:"agile", color:"#D97706", bg:"#FFF7ED" },
              { text:"prioritisation", color:"#D97706", bg:"#FFF7ED" },
              { text:"cross-functional", color:"#16A34A", bg:"#F0FFF4" },
              { text:"stakeholders", color:"#16A34A", bg:"#F0FFF4" },
            ].map((kw) => (
              <span key={kw.text} className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: kw.bg, color: kw.color }}>{kw.text}</span>
            ))}
          </div>
          <button className="mb-2 w-full rounded-xl bg-[var(--brand)] py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--brand-hover)]">Generate full rewrite</button>
          <button className="w-full rounded-xl border border-[var(--border)] py-2.5 text-[13px] font-semibold text-[var(--ink)] transition hover:border-[var(--brand)]">Ask coach to explain</button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: HISTORY
════════════════════════════════════════════ */
function ScreenHistory() {
  return (
    <div className="portal-screen p-6">
      <p className="mb-5 text-[16px] font-bold text-[var(--ink)]">Past sessions</p>
      <div className="space-y-2">
        {[
          { icon:"🎙", name:"Career direction — Senior PM transition", meta:"Today · 24 min · 3 action items", badge:"Coaching", bg:"#EEF2FF", color:"#4361EE" },
          { icon:"📄", name:"Resume review — Product Manager v3", meta:"Yesterday · 18 min · Score: 74", badge:"74/100", bg:"#F0FFF4", color:"#16A34A" },
          { icon:"👔", name:"Behavioral mock — STAR method", meta:"2 days ago · 31 min · Score: 68%", badge:"68%", bg:"#FFF7ED", color:"#D97706" },
          { icon:"💼", name:"LinkedIn review & rewrite", meta:"4 days ago · 14 min · Visibility: 61", badge:"61/100", bg:"#F0F9FF", color:"#0284C7" },
          { icon:"🎙", name:"Goal setting & career direction", meta:"1 week ago · 19 min", badge:"Coaching", bg:"#EEF2FF", color:"#4361EE" },
        ].map((s) => (
          <div key={s.name} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 transition hover:border-[var(--brand)]">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[16px]" style={{ background: s.bg }}>{s.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-semibold text-[var(--ink)]">{s.name}</p>
              <p className="text-[11px] text-[var(--muted)]">{s.meta}</p>
            </div>
            <span className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: s.bg, color: s.color }}>{s.badge}</span>
            <button className="ml-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--muted)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]">Recap</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SCREEN: ACTION PLAN
════════════════════════════════════════════ */
function ScreenPlan() {
  const [done, setDone] = useState<Record<number, boolean>>({ 0:true, 1:true, 2:true, 3:true, 4:true });
  const tasks = [
    { group:"Due this week", items:[
      { text:"Write 3 STAR stories showing cross-functional influence — for interview prep" },
      { text:"Update LinkedIn headline with the suggested rewrite from your review session" },
    ]},
    { group:"Completed", items:[
      { text:"Upload resume and complete first review" },
      { text:"Reframe supply chain project as a product-led initiative" },
      { text:"Complete LinkedIn section review" },
      { text:"Run first mock behavioral interview" },
      { text:"Set clear target role and seniority level with coach" },
    ]},
  ];
  let idx = 0;
  return (
    <div className="portal-screen p-6">
      <div className="mb-5">
        <p className="text-[16px] font-bold text-[var(--ink)]">Your action plan</p>
        <p className="text-[13px] text-[var(--muted)]">9 tasks · 5 complete · 2 due this week</p>
      </div>
      {/* Progress bar */}
      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[var(--shadow)]">
        <div className="mb-2 flex justify-between text-[12px]">
          <span className="font-semibold text-[var(--ink)]">Overall progress</span>
          <span className="font-bold text-[var(--brand)]">56%</span>
        </div>
        <ProgressBar pct={56} />
        <div className="mt-2 flex gap-4 text-[11px] text-[var(--muted)]">
          <span>✅ 5 done</span>
          <span>⏳ 2 this week</span>
          <span>📋 2 upcoming</span>
        </div>
      </div>
      {tasks.map((group) => (
        <div key={group.group} className="mb-5">
          <p className="mb-2 text-[12px] font-bold text-[var(--ink)]">{group.group}</p>
          {group.items.map((item) => {
            const i = idx++;
            const isDone = !!done[i] || group.group === "Completed";
            return (
              <div key={item.text} className="mb-2 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 transition hover:border-[var(--brand)]">
                <button
                  onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-[11px] transition ${isDone ? "bg-[#F0FFF4] text-[#16A34A] border border-[#BBF7D0]" : "border-2 border-[var(--border)] hover:border-[var(--brand)]"}`}
                >
                  {isDone && "✓"}
                </button>
                <p className={`text-[13px] leading-5 ${isDone ? "text-[var(--muted)] line-through" : "text-[var(--ink)]"}`}>{item.text}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN PORTAL COMPONENT
════════════════════════════════════════════ */
export function ZariPortal() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const meta = TOPBAR_META[screen];
  const [bgColor, textColor] = meta.badgeColor.split("|");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background:"var(--portal-bg)" }}>

      {/* ── Sidebar ── */}
      <div className="flex w-56 flex-shrink-0 flex-col border-r border-[var(--portal-sidebar-border)]" style={{ background:"var(--portal-sidebar)" }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 p-4 pb-3">
          <ZariLogo size={28} />
          <span className="text-[14px] font-bold text-white">Zari</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/25">Main</p>
          {NAV.slice(0, 2).map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-all"
              style={{
                background: screen === item.id ? "var(--portal-sidebar-active)" : "transparent",
                color: screen === item.id ? "#fff" : "var(--portal-sidebar-text)",
                borderLeft: screen === item.id ? "2px solid var(--brand)" : "2px solid transparent",
                fontWeight: screen === item.id ? 600 : 400,
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <p className="mb-1.5 mt-3 px-3 text-[10px] font-bold uppercase tracking-wider text-white/25">Tools</p>
          {NAV.slice(2, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-all"
              style={{
                background: screen === item.id ? "var(--portal-sidebar-active)" : "transparent",
                color: screen === item.id ? "#fff" : "var(--portal-sidebar-text)",
                borderLeft: screen === item.id ? "2px solid var(--brand)" : "2px solid transparent",
                fontWeight: screen === item.id ? 600 : 400,
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <p className="mb-1.5 mt-3 px-3 text-[10px] font-bold uppercase tracking-wider text-white/25">History</p>
          {NAV.slice(5).map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-all"
              style={{
                background: screen === item.id ? "var(--portal-sidebar-active)" : "transparent",
                color: screen === item.id ? "#fff" : "var(--portal-sidebar-text)",
                borderLeft: screen === item.id ? "2px solid var(--brand)" : "2px solid transparent",
                fontWeight: screen === item.id ? 600 : 400,
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-[var(--portal-sidebar-border)] p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">SN</div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white">Steve N.</p>
              <p className="text-[10px] text-white/40">Free plan</p>
            </div>
            <Link href="/" className="text-[10px] text-white/25 hover:text-white/50 transition">← Site</Link>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-5 py-3">
          <div className="flex items-center gap-3">
            <p className="text-[15px] font-bold text-[var(--ink)]">{meta.title}</p>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: bgColor, color: textColor }}>{meta.badge}</span>
          </div>
          <button onClick={() => setScreen("coaching")} className="flex items-center gap-1.5 rounded-xl bg-[var(--brand)] px-4 py-2 text-[13px] font-bold text-white shadow-[var(--shadow-brand)] transition hover:bg-[var(--brand-hover)]">
            + New session
          </button>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-y-auto">
          {screen === "dashboard"  && <ScreenDashboard goTo={setScreen} />}
          {screen === "coaching"   && <ScreenCoaching />}
          {screen === "resume"     && <ScreenResume />}
          {screen === "interview"  && <ScreenInterview goTo={setScreen} />}
          {screen === "linkedin"   && <ScreenLinkedIn />}
          {screen === "history"    && <ScreenHistory />}
          {screen === "plan"       && <ScreenPlan />}
        </div>
      </div>
    </div>
  );
}
