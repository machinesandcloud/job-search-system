"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatar, type AvatarState } from "@/components/zari-avatar";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type Screen = "session" | "resume" | "interview" | "linkedin" | "documents" | "plan" | "history";

/* ═══════════════════════════════════════════════════
   TINY HELPERS
═══════════════════════════════════════════════════ */
function ScoreRing({ score, color = "#4361EE", size = 56 }: { score: number; color?: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - score / 100);
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={5} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.24, fontWeight:800, color }}>{score}</span>
    </div>
  );
}

function Pill({ text, color, bg }: { text: string; color: string; bg: string }) {
  return <span style={{ fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:99, background:bg, color, flexShrink:0 }}>{text}</span>;
}

function ProgressBar({ pct, color="#4361EE" }: { pct:number; color?:string }) {
  return (
    <div style={{ height:5, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
      <div style={{ width:`${pct}%`, height:"100%", borderRadius:99, background:color }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SIDEBAR NAV CONFIG
═══════════════════════════════════════════════════ */
const NAV: { id: Screen; label: string; group: string; icon: React.ReactNode }[] = [
  { id:"session",   label:"Talk to Zari",     group:"Coach",     icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]"><path d="M10 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 9v1a6 6 0 0012 0V9"/><line x1="10" y1="15" x2="10" y2="18"/><line x1="7" y1="18" x2="13" y2="18"/></svg> },
  { id:"resume",    label:"Resume",           group:"Coach",     icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]"><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg> },
  { id:"interview", label:"Mock Interview",   group:"Coach",     icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]"><circle cx="10" cy="6" r="3"/><path d="M3 17c0-3.866 3.134-6 7-6s7 2.134 7 6"/></svg> },
  { id:"linkedin",  label:"LinkedIn",         group:"Coach",     icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]"><rect x="2" y="2" width="16" height="16" rx="3"/><path d="M6 9v5M6 6.5v.5M9 14V11a2.5 2.5 0 015 0v3M9 11v3"/></svg> },
  { id:"documents", label:"Documents",        group:"Materials", icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]"><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v4h4"/></svg> },
  { id:"plan",      label:"Action Plan",      group:"Materials", icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M6 2v4M14 2v4M3 9h14"/><path d="M7 13l2 2 4-4"/></svg> },
  { id:"history",   label:"History",          group:"History",   icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l2.5 2.5"/></svg> },
];

/* ═══════════════════════════════════════════════════
   SCREEN: SESSION  (primary — Kleo-style voice coaching)
═══════════════════════════════════════════════════ */
const SESSION_MSGS = [
  { role:"coach", text:"Good to see you again, Steve. Last time we worked on reframing your supply chain project as a product initiative. How are you feeling about that narrative now?" },
  { role:"user",  text:"Honestly much better — I rewrote the bullet and got 2 recruiter responses this week that mentioned the impact numbers." },
  { role:"coach", text:"That's huge. Impact-led bullets work. Now let's move to the next gap: your interview story around product strategy ownership. This is what senior PM panels will push hardest on. Want to practice the question?" },
  { role:"user",  text:"Yes, let's do it. I'm ready." },
];

const QUICK_PROMPTS = [
  "Practice a PM interview question",
  "Review my latest resume bullet",
  "Help me answer 'Why product?'",
  "Give me a LinkedIn headline",
  "What should I work on today?",
  "Run a mock STAR story",
];

function ScreenSession() {
  const stateSeq: AvatarState[] = ["speaking","listening","thinking","speaking","listening","speaking"];
  const durSeq = [3500, 2000, 2200, 3800, 1800, 3200];
  const [seqIdx, setSeqIdx] = useState(0);
  const [avatarState, setAvatarState] = useState<AvatarState>("speaking");
  const [input, setInput] = useState("");
  const [isVoice, setIsVoice] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [msgs, setMsgs] = useState(SESSION_MSGS);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setSeqIdx(i => (i+1)%stateSeq.length), durSeq[seqIdx]);
    return () => clearTimeout(t);
  }, [seqIdx]);
  useEffect(() => { setAvatarState(stateSeq[seqIdx]); }, [seqIdx]);
  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e+1), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [msgs]);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  function sendMessage(text: string) {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role:"user", text }]);
    setInput("");
    setTimeout(() => setMsgs(m => [...m, { role:"coach", text:"Great question — let me think through that with you. Based on what we've covered, here's how I'd approach it…" }]), 1200);
  }

  return (
    <div className="portal-screen flex flex-col" style={{ height:"calc(100vh - 56px)", overflow:"hidden", background:"#FAFBFF" }}>

      {/* ── TOP: avatar stage — Kleo-style centered card ── */}
      <div style={{ flexShrink:0, background:"white", borderBottom:"1px solid #E4E8F5" }}>
        <div style={{ maxWidth:680, margin:"0 auto", padding:"24px 24px 20px", display:"flex", flexDirection:"column", alignItems:"center" }}>

          {/* Session status chips */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, color:"#16A34A", padding:"4px 12px", borderRadius:99, background:"#F0FFF4", border:"1px solid #BBF7D0" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#22C55E", animation:"blink 1.1s ease-in-out infinite" }} />
              Live Session
            </span>
            <span style={{ fontSize:11, color:"#68738A", fontFamily:"monospace" }}>{fmt(elapsed)}</span>
            <span style={{ fontSize:11, color:"#68738A", padding:"4px 10px", borderRadius:99, background:"#F5F7FF", border:"1px solid #E4E8F5" }}>Career Direction · Session 5</span>
          </div>

          {/* Avatar — centered, no competing elements */}
          <ZariAvatar state={avatarState} size={160} interactive />

          {/* State label */}
          <div style={{ marginTop:28, fontSize:14, fontWeight:600, color:"#0A0A0F" }}>
            Zari <span style={{ fontWeight:400, color:"#68738A" }}>— AI Career Coach</span>
          </div>

          {/* Live speech bubble */}
          <div style={{ marginTop:12, maxWidth:540, background:"#F5F7FF", border:"1px solid #E4E8F5", borderRadius:"4px 18px 18px 18px", padding:"12px 16px", fontSize:13.5, lineHeight:1.65, color:"#1E2235", animation:"bubble-appear 0.35s ease both" }}>
            {avatarState === "speaking" && <>&ldquo;You mentioned recruiters responded to the impact numbers — let&apos;s now build that same specificity into your interview answers. I&apos;ll ask you the question the way a panel would.&rdquo;</>}
            {avatarState === "listening" && <span style={{ color:"#06B6D4", fontWeight:500, display:"flex", alignItems:"center", gap:6 }}><span style={{ width:6, height:6, borderRadius:"50%", background:"#06B6D4", animation:"blink 0.7s step-end infinite", flexShrink:0 }} />Listening to you…</span>}
            {avatarState === "thinking"  && <span style={{ color:"#A78BFA", fontWeight:500, display:"flex", alignItems:"center", gap:6 }}><span style={{ width:6, height:6, borderRadius:"50%", background:"#A78BFA", animation:"blink 1.3s ease infinite", flexShrink:0 }} />Analyzing your response…</span>}
          </div>

          {/* Quick prompts */}
          <div style={{ marginTop:14, display:"flex", flexWrap:"wrap", justifyContent:"center", gap:6 }}>
            {QUICK_PROMPTS.map(p => (
              <button key={p} onClick={() => sendMessage(p)} style={{ fontSize:11.5, fontWeight:500, color:"#4361EE", padding:"5px 12px", borderRadius:99, background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.18)", cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM: conversation + input ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0, maxWidth:680, width:"100%", margin:"0 auto", padding:"0 24px" }}>

        {/* Transcript */}
        <div ref={chatRef} style={{ flex:1, overflowY:"auto", padding:"20px 0 8px" }}>
          {msgs.map((msg, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:14, flexDirection: msg.role==="user" ? "row-reverse" : "row", animation:`bubble-appear 0.3s ease ${i*0.06}s both` }}>
              <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, background: msg.role==="coach" ? "linear-gradient(135deg,#4361EE,#818CF8)" : "#E4E8F5", color: msg.role==="coach" ? "white" : "#68738A", boxShadow: msg.role==="coach" ? "0 0 12px rgba(67,97,238,0.30)" : "none" }}>
                {msg.role === "coach" ? "Z" : "S"}
              </div>
              <div style={{ maxWidth:"72%", padding:"10px 14px", fontSize:13.5, lineHeight:1.65, borderRadius: msg.role==="coach" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", background: msg.role==="coach" ? "white" : "#4361EE", color: msg.role==="coach" ? "#1E2235" : "white", border: msg.role==="coach" ? "1px solid #E4E8F5" : "none", boxShadow: msg.role==="coach" ? "0 2px 8px rgba(0,0,0,0.05)" : "0 4px 14px rgba(67,97,238,0.28)" }}>
                {msg.text}
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          {avatarState === "thinking" && (
            <div style={{ display:"flex", gap:10, marginBottom:14 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, background:"linear-gradient(135deg,#4361EE,#818CF8)", color:"white", boxShadow:"0 0 12px rgba(67,97,238,0.30)" }}>Z</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, padding:"10px 16px", borderRadius:"4px 16px 16px 16px", background:"white", border:"1px solid #E4E8F5" }}>
                {[0,1,2].map(i => <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:"#CBD5E1", animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ borderTop:"1px solid #E4E8F5", paddingTop:12, paddingBottom:16, flexShrink:0 }}>
          <div style={{ display:"flex", gap:8, alignItems:"center", background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"8px 10px 8px 14px", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
            <button onClick={() => setIsVoice(v => !v)} style={{ width:34, height:34, borderRadius:"50%", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", background: isVoice ? "#4361EE" : "#F5F7FF", color: isVoice ? "white" : "#4361EE", flexShrink:0, transition:"all 0.2s" }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:16, height:16 }}><path d="M10 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 9v1a6 6 0 0012 0V9"/><line x1="10" y1="15" x2="10" y2="18"/></svg>
            </button>
            <input
              style={{ flex:1, border:"none", outline:"none", fontSize:14, color:"#0A0A0F", background:"transparent" }}
              placeholder={isVoice ? "Voice mode active — speak or type…" : "Ask Zari anything, or type a question to practice…"}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            />
            <button onClick={() => sendMessage(input)} style={{ width:34, height:34, borderRadius:10, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", background: input.trim() ? "#4361EE" : "#F5F7FF", color: input.trim() ? "white" : "#CBD5E1", flexShrink:0, transition:"all 0.2s" }}>
              <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:14, height:14 }}><path d="M3.105 3.105a1 1 0 011.263-.237l12 6a1 1 0 010 1.764l-12 6a1 1 0 01-1.367-1.31L4.945 10 3 4.678a1 1 0 01.105-1.573z"/></svg>
            </button>
          </div>
          <p style={{ textAlign:"center", fontSize:10.5, color:"#A0AABF", marginTop:6 }}>Press Enter to send · Click mic for voice mode · Your session is being saved</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: RESUME REVIEW
═══════════════════════════════════════════════════ */
function ScreenResume() {
  const [activeSection, setActiveSection] = useState<"overview"|"bullets"|"rewrite">("overview");

  return (
    <div className="portal-screen" style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:960, margin:"0 auto", padding:28 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:20, fontWeight:800, color:"#0A0A0F", marginBottom:3 }}>Resume Review</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>Resume_PM_v3.pdf · Analyzed just now · Target: Senior PM</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>Upload new version</button>
            <button style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:10, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.3)" }}>Download optimized</button>
          </div>
        </div>

        {/* Score cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12, marginBottom:24 }}>
          {[
            { label:"Overall", score:74, color:"#4361EE", delta:"+16 from first draft" },
            { label:"ATS Match", score:68, color:"#D97706", delta:"4 keywords missing" },
            { label:"Clarity", score:71, color:"#0284C7", delta:"Good structure" },
            { label:"Impact", score:61, color:"#DC2626", delta:"Needs metrics" },
          ].map(sc => (
            <div key={sc.label} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"16px", textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <ScoreRing score={sc.score} color={sc.color} size={60} />
              <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginTop:8 }}>{sc.label}</p>
              <p style={{ fontSize:10.5, color:"#68738A", marginTop:2 }}>{sc.delta}</p>
            </div>
          ))}
        </div>

        {/* Tab nav */}
        <div style={{ display:"flex", gap:4, background:"white", border:"1px solid #E4E8F5", borderRadius:12, padding:4, width:"fit-content", marginBottom:20 }}>
          {(["overview","bullets","rewrite"] as const).map(t => (
            <button key={t} onClick={() => setActiveSection(t)} style={{ padding:"6px 16px", borderRadius:9, border:"none", cursor:"pointer", fontSize:12.5, fontWeight:600, background: activeSection===t ? "#4361EE" : "transparent", color: activeSection===t ? "white" : "#68738A", transition:"all 0.15s", textTransform:"capitalize" }}>
              {t === "bullets" ? "Line-by-Line" : t === "rewrite" ? "AI Rewrites" : "Overview"}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {/* Left: doc preview */}
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#0A0A0F", marginBottom:2 }}>Steve Ngoumnai</div>
            <div style={{ fontSize:11.5, color:"#68738A", marginBottom:16 }}>Operations Lead · London, UK · steve@email.com</div>
            {[
              { label:"Summary", color:"#FEF3C7", border:"#FDE68A", text:"Experienced operations professional with 4 years driving cross-functional process improvements at scale. Seeking to transition into Senior Product Manager roles." },
              { label:"Experience", color:"white", border:"#E4E8F5", text:"Ops Lead — FinCo Ltd · 2021–present\n• Managed supply chain redesign across 5 business units\n• Led cross-functional team of 12 across Finance, Tech, and Ops\n• Reduced fulfilment time by 22%", note:"⚠️ Task-focused — needs impact metrics" },
              { label:"Education", color:"white", border:"#E4E8F5", text:"BSc Business Management · UCL · 2019" },
              { label:"Skills", color:"white", border:"#E4E8F5", text:"Operations · Supply Chain · Process Design · Stakeholder Management", note:"⚠️ Missing product keywords: Roadmap, OKRs, Discovery" },
            ].map(block => (
              <div key={block.label} style={{ marginBottom:10, borderRadius:10, border:`1px solid ${block.border}`, background:block.color, padding:"10px 12px" }}>
                <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A", marginBottom:5 }}>{block.label}</p>
                <p style={{ fontSize:11.5, color:"#1E2235", lineHeight:1.55, whiteSpace:"pre-line" }}>{block.text}</p>
                {block.note && <p style={{ fontSize:10.5, color:"#D97706", marginTop:5, fontWeight:600 }}>{block.note}</p>}
              </div>
            ))}
          </div>

          {/* Right: analysis */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {activeSection === "overview" && (
              <>
                <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:18, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:12 }}>Zari&apos;s findings</p>
                  {[
                    { type:"critical", icon:"🔴", text:"Summary doesn't mention product — will fail ATS filters for PM roles." },
                    { type:"warn",     icon:"🟡", text:"5 of 8 experience bullets are task-focused with no impact numbers." },
                    { type:"warn",     icon:"🟡", text:"Skills section missing 8 keywords found in target job descriptions." },
                    { type:"ok",       icon:"🟢", text:"Education and timeline are clean — no gaps, strong institution." },
                    { type:"ok",       icon:"🟢", text:"Cross-functional experience is genuine — it just needs reframing." },
                  ].map((f, i) => (
                    <div key={i} style={{ display:"flex", gap:9, padding:"9px 10px", borderRadius:9, background: f.type==="critical"?"#FEF2F2":f.type==="warn"?"#FFFBEB":"#F0FFF4", border:`1px solid ${f.type==="critical"?"#FECACA":f.type==="warn"?"#FDE68A":"#BBF7D0"}`, marginBottom:7 }}>
                      <span style={{ fontSize:13 }}>{f.icon}</span>
                      <p style={{ fontSize:12, color: f.type==="critical"?"#991B1B":f.type==="warn"?"#92400E":"#14532D", lineHeight:1.5 }}>{f.text}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:16, padding:18 }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"#4361EE", marginBottom:8 }}>Zari&apos;s recommendation</p>
                  <p style={{ fontSize:12.5, color:"#3451D1", lineHeight:1.6 }}>Rewrite your summary to lead with product outcomes, not operations. Change &quot;4 years in operations&quot; to &quot;Product-minded ops leader with a track record of shipping measurable outcomes across cross-functional teams.&quot;</p>
                  <button style={{ marginTop:10, fontSize:12, fontWeight:600, color:"#4361EE", background:"white", border:"1px solid rgba(67,97,238,0.25)", padding:"6px 14px", borderRadius:8, cursor:"pointer" }}>Ask Zari to rewrite this now →</button>
                </div>
              </>
            )}
            {activeSection === "bullets" && (
              <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:18 }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:12 }}>Bullet-by-bullet analysis</p>
                {[
                  { before:"Managed supply chain redesign across 5 business units", after:"Led end-to-end supply chain redesign across 5 business units · 22% faster fulfilment · £340K cost reduction", score:62 },
                  { before:"Worked with tech team to deliver system integration", after:"Partnered with Engineering to deliver ERP integration in 6 weeks — reduced manual processing by 40%", score:55 },
                  { before:"Led cross-functional meetings and managed stakeholders", after:"Facilitated weekly cross-functional reviews with VP-level stakeholders, driving alignment across Finance, Tech, and Ops", score:50 },
                ].map((b, i) => (
                  <div key={i} style={{ marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A" }}>Bullet {i+1}</p>
                      <Pill text={`${b.score}/100`} color="#D97706" bg="#FFF7ED" />
                    </div>
                    <p style={{ fontSize:11.5, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"7px 10px", textDecoration:"line-through", marginBottom:4 }}>{b.before}</p>
                    <p style={{ fontSize:11.5, color:"#14532D", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:8, padding:"7px 10px" }}>{b.after}</p>
                    <ProgressBar pct={b.score} color="#D97706" />
                  </div>
                ))}
              </div>
            )}
            {activeSection === "rewrite" && (
              <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:18 }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:4 }}>Full optimized resume</p>
                <p style={{ fontSize:11.5, color:"#68738A", marginBottom:14 }}>Zari rewrote your entire resume for Senior PM roles.</p>
                {[
                  { label:"Summary (rewritten)", text:"Product-minded Operations Leader driving cross-functional strategy, execution, and measurable outcomes. Transitioning to Senior PM with a 4-year track record of shipping supply chain and process improvements across teams of 12+." },
                  { label:"Top bullet (rewritten)", text:"Led end-to-end supply chain redesign across 5 business units — 22% faster fulfilment, £340K annual cost savings, and executive buy-in secured in under 3 weeks." },
                ].map(s => (
                  <div key={s.label} style={{ marginBottom:12, borderRadius:10, border:"1px solid #BBF7D0", background:"#F0FFF4", padding:"10px 12px" }}>
                    <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", color:"#16A34A", letterSpacing:"0.1em", marginBottom:5 }}>{s.label}</p>
                    <p style={{ fontSize:12, color:"#14532D", lineHeight:1.6 }}>{s.text}</p>
                  </div>
                ))}
                <button style={{ width:"100%", marginTop:4, fontSize:12.5, fontWeight:600, padding:"9px", borderRadius:10, border:"none", background:"#4361EE", color:"white", cursor:"pointer" }}>Copy all rewrites to clipboard →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: MOCK INTERVIEW
═══════════════════════════════════════════════════ */
const INTERVIEW_QS = [
  "Tell me about a time you led a cross-functional initiative that faced significant resistance. What was your approach and what was the outcome?",
  "How do you prioritize features when you have competing stakeholder demands and limited engineering capacity?",
  "Describe your process for defining a product strategy from scratch. Walk me through a real example.",
];

function ScreenInterview() {
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  function submit() { if (answer.trim()) setSubmitted(true); }

  return (
    <div className="portal-screen" style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:28 }}>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <div>
            <h1 style={{ fontSize:20, fontWeight:800, color:"#0A0A0F", marginBottom:3 }}>Mock Interview</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>STAR-method practice · Real-time AI scoring · Senior PM behavioral round</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:11, color:"#68738A" }}>Question {qIdx+1} of {INTERVIEW_QS.length}</span>
            <div style={{ display:"flex", gap:4 }}>
              {INTERVIEW_QS.map((_, i) => <div key={i} style={{ width:28, height:4, borderRadius:99, background: i<=qIdx?"#4361EE":"#E4E8F5" }} />)}
            </div>
          </div>
        </div>

        {/* Question card */}
        <div style={{ background:"linear-gradient(135deg,#4361EE,#6378F0)", borderRadius:16, padding:22, marginBottom:20, color:"white", boxShadow:"0 8px 24px rgba(67,97,238,0.30)" }}>
          <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:10, opacity:0.65 }}>Behavioral · Cross-functional leadership</div>
          <p style={{ fontSize:15.5, fontWeight:600, lineHeight:1.6 }}>{INTERVIEW_QS[qIdx]}</p>
          <div style={{ marginTop:14, display:"flex", gap:8 }}>
            {["Situation","Task","Action","Result"].map(s => (
              <span key={s} style={{ fontSize:10, fontWeight:600, padding:"3px 9px", borderRadius:99, background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.85)" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Voice + text answer */}
        {!submitted ? (
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, marginBottom:16, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>Your answer</p>
              <button onClick={() => setIsRecording(r => !r)} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:99, border:"none", cursor:"pointer", background: isRecording?"#FEF2F2":"#EEF2FF", color: isRecording?"#DC2626":"#4361EE", transition:"all 0.2s" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background: isRecording?"#DC2626":"#4361EE", animation: isRecording?"blink 0.8s step-end infinite":"none" }} />
                {isRecording ? "Stop recording" : "Record voice answer"}
              </button>
            </div>
            <textarea
              style={{ width:"100%", minHeight:140, border:"1px solid #E4E8F5", borderRadius:10, padding:"12px 14px", fontSize:13.5, lineHeight:1.65, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box" }}
              placeholder="Type your answer here, or click 'Record voice answer' to speak. Aim for 2–3 minutes. Use Situation, Task, Action, Result structure."
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:10 }}>
              <button onClick={submit} style={{ fontSize:13, fontWeight:700, padding:"9px 22px", borderRadius:10, border:"none", background: answer.trim()?"#4361EE":"#F1F5F9", color: answer.trim()?"white":"#CBD5E1", cursor: answer.trim()?"pointer":"default", transition:"all 0.2s", boxShadow: answer.trim()?"0 4px 14px rgba(67,97,238,0.28)":"none" }}>
                Submit for feedback →
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Feedback */}
            <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, marginBottom:12, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:14 }}>Zari&apos;s feedback</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                {[
                  { label:"STAR Structure", score:88, color:"#16A34A" },
                  { label:"Evidence quality", score:82, color:"#16A34A" },
                  { label:"Impact statement", score:68, color:"#D97706" },
                  { label:"Concision", score:61, color:"#D97706" },
                  { label:"Leadership signal", score:79, color:"#4361EE" },
                  { label:"Stakeholder savvy", score:73, color:"#4361EE" },
                ].map(s => (
                  <div key={s.label} style={{ border:"1px solid #E4E8F5", borderRadius:10, padding:"10px 12px", background:"#FAFBFF" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <p style={{ fontSize:11, color:"#68738A" }}>{s.label}</p>
                      <p style={{ fontSize:11, fontWeight:800, color:s.color }}>{s.score}</p>
                    </div>
                    <ProgressBar pct={s.score} color={s.color} />
                  </div>
                ))}
              </div>
              <div style={{ background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:12, padding:14 }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#4361EE", marginBottom:6 }}>Coaching note</p>
                <p style={{ fontSize:12.5, color:"#3451D1", lineHeight:1.6 }}>Strong Situation + Action. The gap is your Result — say specifically what changed: &ldquo;reduced cross-functional friction by getting Finance sign-off 3 weeks early, which accelerated launch by a sprint.&rdquo; Numbers land harder in panels.</p>
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => { setSubmitted(false); setAnswer(""); }} style={{ flex:1, fontSize:13, fontWeight:600, padding:"10px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>Try this question again</button>
              <button onClick={() => { setQIdx(q => (q+1)%INTERVIEW_QS.length); setSubmitted(false); setAnswer(""); }} style={{ flex:1, fontSize:13, fontWeight:700, padding:"10px", borderRadius:10, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.28)" }}>Next question →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: LINKEDIN
═══════════════════════════════════════════════════ */
function ScreenLinkedIn() {
  const [activeSection, setActiveSection] = useState<"headline"|"about"|"skills">("headline");
  return (
    <div className="portal-screen" style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:28 }}>
        <div style={{ marginBottom:22 }}>
          <h1 style={{ fontSize:20, fontWeight:800, color:"#0A0A0F", marginBottom:3 }}>LinkedIn Optimizer</h1>
          <p style={{ fontSize:13, color:"#68738A" }}>Zari analyzed your profile against 40+ Senior PM job descriptions</p>
        </div>

        {/* Scores */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:22 }}>
          {[
            { label:"Recruiter visibility", score:61, color:"#D97706", note:"Low — headline not indexed" },
            { label:"Keyword density", score:54, color:"#DC2626", note:"8 critical keywords missing" },
            { label:"Profile strength", score:72, color:"#4361EE", note:"Good — but headline kills it" },
          ].map(s => (
            <div key={s.label} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"16px 18px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", display:"flex", gap:14, alignItems:"center" }}>
              <ScoreRing score={s.score} color={s.color} size={56} />
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>{s.label}</p>
                <p style={{ fontSize:11, color:"#68738A", marginTop:2 }}>{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section tabs */}
        <div style={{ display:"flex", gap:4, background:"white", border:"1px solid #E4E8F5", borderRadius:12, padding:4, width:"fit-content", marginBottom:18 }}>
          {(["headline","about","skills"] as const).map(t => (
            <button key={t} onClick={() => setActiveSection(t)} style={{ padding:"6px 18px", borderRadius:9, border:"none", cursor:"pointer", fontSize:12.5, fontWeight:600, background: activeSection===t?"#4361EE":"transparent", color: activeSection===t?"white":"#68738A", textTransform:"capitalize" }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {/* Current */}
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", color:"#68738A", letterSpacing:"0.1em", marginBottom:12 }}>Current {activeSection}</p>
            {activeSection === "headline" && <p style={{ fontSize:14, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 12px" }}>Operations Lead at FinCo Ltd</p>}
            {activeSection === "about" && <p style={{ fontSize:12.5, color:"#1E2235", lineHeight:1.65, background:"#FAFBFF", border:"1px solid #E4E8F5", borderRadius:10, padding:"10px 12px" }}>Experienced operations professional with 4 years driving cross-functional process improvements at scale. Passionate about building efficient systems and working with diverse teams.</p>}
            {activeSection === "skills" && <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{["Operations","Supply Chain","Process Design","Stakeholder Management","ERP","Logistics","Team Leadership"].map(s => <span key={s} style={{ fontSize:11, padding:"3px 10px", borderRadius:99, background:"#F5F7FF", border:"1px solid #E4E8F5", color:"#68738A" }}>{s}</span>)}</div>}
            <div style={{ marginTop:14 }}>
              <p style={{ fontSize:11, fontWeight:700, color:"#DC2626", marginBottom:6 }}>Why this doesn&apos;t work:</p>
              {activeSection === "headline" && <p style={{ fontSize:11.5, color:"#991B1B" }}>No product signal. Recruiters searching for &ldquo;Product Manager&rdquo; won&apos;t find you. Title + company alone is the weakest possible headline.</p>}
              {activeSection === "about" && <p style={{ fontSize:11.5, color:"#991B1B" }}>Missing: product keywords, quantified outcomes, career direction, and a CTA. Reads like a job description, not a value proposition.</p>}
              {activeSection === "skills" && <p style={{ fontSize:11.5, color:"#991B1B" }}>No product skills listed. LinkedIn&apos;s algorithm won&apos;t match you to PM roles. Add: Product Strategy, Roadmap, OKRs, Discovery, Agile, GTM.</p>}
            </div>
          </div>

          {/* Rewrite */}
          <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", color:"#16A34A", letterSpacing:"0.1em", marginBottom:12 }}>Zari&apos;s rewrite</p>
            {activeSection === "headline" && <p style={{ fontSize:14, fontWeight:600, color:"#14532D", background:"white", border:"1px solid #BBF7D0", borderRadius:10, padding:"10px 12px", lineHeight:1.5 }}>Product-Minded Operations Leader → Transitioning to Senior PM | Supply Chain · Cross-Functional Strategy · £340K Impact</p>}
            {activeSection === "about" && <p style={{ fontSize:12.5, color:"#14532D", lineHeight:1.65, background:"white", border:"1px solid #BBF7D0", borderRadius:10, padding:"10px 12px" }}>Product-minded operations leader with 4 years of cross-functional execution across 5 business units. I ship measurable outcomes: 22% faster fulfilment, £340K in savings, exec-level stakeholder alignment. Transitioning to Senior PM where I can apply this delivery DNA to product strategy and roadmap ownership. Open to roles at Series B–D tech companies in fintech, operations tech, and supply chain software.</p>}
            {activeSection === "skills" && <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{["Product Strategy","Roadmap","OKRs","Discovery","Agile","GTM","Operations","Supply Chain","Stakeholder Management","Cross-functional","Process Design","Data Analysis"].map(s => <span key={s} style={{ fontSize:11, padding:"3px 10px", borderRadius:99, background:"white", border:"1px solid #BBF7D0", color:"#14532D" }}>{s}</span>)}</div>}
            <button style={{ marginTop:14, width:"100%", fontSize:12, fontWeight:600, padding:"8px", borderRadius:10, border:"none", background:"#16A34A", color:"white", cursor:"pointer" }}>Copy to LinkedIn →</button>
          </div>
        </div>

        {/* Missing keywords */}
        <div style={{ marginTop:20, background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:10 }}>Keywords missing from your profile</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {[
              { kw:"Product strategy", freq:"Found in 94% of target JDs" },
              { kw:"Roadmap", freq:"91%" },
              { kw:"OKRs", freq:"88%" },
              { kw:"Discovery", freq:"85%" },
              { kw:"Agile", freq:"82%" },
              { kw:"GTM", freq:"74%" },
              { kw:"P&L", freq:"68%" },
              { kw:"Stakeholder alignment", freq:"88%" },
            ].map(k => (
              <div key={k.kw} title={`Frequency: ${k.freq}`} style={{ fontSize:11.5, fontWeight:600, padding:"4px 12px", borderRadius:99, background:"#FEF3C7", color:"#92400E", border:"1px solid #FDE68A", cursor:"default" }}>{k.kw}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: DOCUMENTS
═══════════════════════════════════════════════════ */
function ScreenDocuments() {
  return (
    <div className="portal-screen" style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
          <div>
            <h1 style={{ fontSize:20, fontWeight:800, color:"#0A0A0F", marginBottom:3 }}>Documents</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>Your materials — used by Zari in every session automatically</p>
          </div>
          <button style={{ fontSize:12.5, fontWeight:600, padding:"8px 16px", borderRadius:10, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.28)", display:"flex", alignItems:"center", gap:6 }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:14, height:14 }}><path d="M10 4v12M4 10l6-6 6 6"/></svg>
            Upload document
          </button>
        </div>

        {/* Upload zone */}
        <div style={{ border:"2px dashed #CBD5E1", borderRadius:16, padding:32, textAlign:"center", marginBottom:20, cursor:"pointer", background:"white" }}>
          <div style={{ width:44, height:44, borderRadius:12, background:"#EEF2FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:22, height:22 }}><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v9"/></svg>
          </div>
          <p style={{ fontSize:14, fontWeight:600, color:"#0A0A0F", marginBottom:4 }}>Drop your resume, cover letter, or LinkedIn export here</p>
          <p style={{ fontSize:12, color:"#68738A" }}>PDF · DOCX · TXT — Zari indexes it immediately</p>
        </div>

        {/* File list */}
        {[
          { name:"Resume_PM_v3.pdf",          type:"Resume",         size:"82 KB", date:"Today", score:74, color:"#4361EE", bg:"#EEF2FF", status:"Indexed · Used in 4 sessions" },
          { name:"LinkedIn_profile_export.pdf",type:"LinkedIn",       size:"34 KB", date:"2 days ago", score:61, color:"#D97706", bg:"#FFF7ED", status:"Indexed · Analyzed" },
          { name:"Cover_letter_Notion.docx",   type:"Cover letter",   size:"12 KB", date:"Last week", score:null, color:"#8B5CF6", bg:"#F5F3FF", status:"Indexed" },
        ].map(doc => (
          <div key={doc.name} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"14px 18px", marginBottom:10, display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width:42, height:42, borderRadius:10, background:doc.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={doc.color} strokeWidth="1.8" style={{ width:20, height:20 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:13.5, fontWeight:600, color:"#0A0A0F", marginBottom:2 }}>{doc.name}</p>
              <p style={{ fontSize:11, color:"#68738A" }}>{doc.type} · {doc.size} · Uploaded {doc.date} · {doc.status}</p>
            </div>
            {doc.score && <ScoreRing score={doc.score} color={doc.color} size={44} />}
            <div style={{ display:"flex", gap:6 }}>
              <button style={{ fontSize:11, fontWeight:600, padding:"5px 11px", borderRadius:8, border:"1px solid #E4E8F5", background:"#FAFBFF", color:"#68738A", cursor:"pointer" }}>View</button>
              <button style={{ fontSize:11, fontWeight:600, padding:"5px 11px", borderRadius:8, border:"none", background:"#4361EE", color:"white", cursor:"pointer" }}>Review with Zari</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: ACTION PLAN
═══════════════════════════════════════════════════ */
function ScreenPlan() {
  const [done, setDone] = useState<Set<number>>(new Set([0, 2]));
  const tasks = [
    { text:"Reframe supply chain project as a product initiative in resume", cat:"Resume", priority:"high" },
    { text:"Write 3 STAR stories highlighting cross-functional influence", cat:"Interview", priority:"high" },
    { text:"Update LinkedIn headline to product-focused positioning", cat:"LinkedIn", priority:"high" },
    { text:"Add 8 missing PM keywords to LinkedIn profile", cat:"LinkedIn", priority:"med" },
    { text:"Request 2 LinkedIn recommendations from cross-functional peers", cat:"LinkedIn", priority:"med" },
    { text:"Apply to 3 target Senior PM roles at Series B–D tech companies", cat:"Job Search", priority:"high" },
    { text:"Book a follow-up session to practice PM interview answers", cat:"Session", priority:"low" },
    { text:"Research top 5 target companies — prep tailored talking points", cat:"Job Search", priority:"med" },
  ];
  const total = tasks.length, doneCount = done.size;

  return (
    <div className="portal-screen" style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:28 }}>
        <h1 style={{ fontSize:20, fontWeight:800, color:"#0A0A0F", marginBottom:4 }}>Action Plan</h1>
        <p style={{ fontSize:13, color:"#68738A", marginBottom:22 }}>Zari generates and updates this plan based on every session</p>

        {/* Progress bar */}
        <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, marginBottom:22, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
            <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Your progress</p>
            <span style={{ fontSize:13, fontWeight:800, color:"#4361EE" }}>{doneCount}/{total} completed</span>
          </div>
          <div style={{ height:10, borderRadius:99, background:"#EEF2FF", overflow:"hidden" }}>
            <div style={{ width:`${(doneCount/total)*100}%`, height:"100%", background:"linear-gradient(90deg,#4361EE,#818CF8)", borderRadius:99, transition:"width 0.4s ease" }} />
          </div>
          <div style={{ display:"flex", gap:12, marginTop:12, flexWrap:"wrap" }}>
            {["high","med","low"].map(p => {
              const cnt = tasks.filter(t=>t.priority===p).length;
              const doneCnt = tasks.filter((t,i)=>t.priority===p && done.has(i)).length;
              return <span key={p} style={{ fontSize:11, color:"#68738A" }}><strong style={{ color: p==="high"?"#DC2626":p==="med"?"#D97706":"#4361EE" }}>{doneCnt}/{cnt}</strong> {p} priority</span>;
            })}
          </div>
        </div>

        {/* Task list */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {tasks.map((task, i) => {
            const isDone = done.has(i);
            const pColor = task.priority==="high"?"#DC2626":task.priority==="med"?"#D97706":"#4361EE";
            const pBg    = task.priority==="high"?"#FEF2F2":task.priority==="med"?"#FFF7ED":"#EEF2FF";
            return (
              <button key={i} onClick={() => setDone(d => { const n=new Set(d); n.has(i)?n.delete(i):n.add(i); return n; })} style={{ display:"flex", alignItems:"center", gap:12, background:"white", border:`1px solid ${isDone?"#BBF7D0":"#E4E8F5"}`, borderRadius:14, padding:"13px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.15s", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ width:20, height:20, borderRadius:6, border:`2px solid ${isDone?"#16A34A":"#CBD5E1"}`, background:isDone?"#F0FFF4":"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                  {isDone && <svg viewBox="0 0 12 12" fill="none" style={{ width:10, height:10 }}><path d="M1.5 6l3 3 6-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                </div>
                <p style={{ flex:1, fontSize:13.5, color:isDone?"#A0AABF":"#0A0A0F", textDecoration:isDone?"line-through":"none", lineHeight:1.4 }}>{task.text}</p>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:99, background:"#F5F7FF", color:"#68738A", border:"1px solid #E4E8F5" }}>{task.cat}</span>
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:pBg, color:pColor }}>{task.priority}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: HISTORY
═══════════════════════════════════════════════════ */
function ScreenHistory() {
  return (
    <div className="portal-screen" style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:28 }}>
        <h1 style={{ fontSize:20, fontWeight:800, color:"#0A0A0F", marginBottom:4 }}>Session History</h1>
        <p style={{ fontSize:13, color:"#68738A", marginBottom:22 }}>Every session Zari remembers — building your coaching story over time</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { date:"Today",          title:"Career direction · Session 5",       duration:"28 min", type:"Session",   badge:"Active", color:"#4361EE", bg:"#EEF2FF",  items:["Recruiter response strategy","Interview narrative","Next action plan"] },
            { date:"Yesterday",      title:"Resume review · v3",                 duration:"19 min", type:"Resume",    badge:"74/100", color:"#16A34A", bg:"#F0FFF4",  items:["Supply chain bullet rewrite","ATS keyword gaps","Summary overhaul"] },
            { date:"3 days ago",     title:"Mock interview · Behavioral round 2",duration:"34 min", type:"Interview", badge:"73%",    color:"#D97706", bg:"#FFF7ED",  items:["Cross-functional leadership Q","STAR structure scored","3 rewrites"] },
            { date:"Last week",      title:"LinkedIn profile review",             duration:"22 min", type:"LinkedIn",  badge:"61→72", color:"#8B5CF6", bg:"#F5F3FF",  items:["Headline rewrite","About section","8 missing keywords"] },
            { date:"10 days ago",    title:"Career direction · Session 4",       duration:"31 min", type:"Session",   badge:"Saved", color:"#4361EE", bg:"#EEF2FF",  items:["PM transition narrative","Target company list","Action plan created"] },
          ].map((s, i) => (
            <div key={i} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div>
                  <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F", marginBottom:3 }}>{s.title}</p>
                  <p style={{ fontSize:11.5, color:"#68738A" }}>{s.date} · {s.duration}</p>
                </div>
                <Pill text={s.badge} color={s.color} bg={s.bg} />
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {s.items.map(it => <span key={it} style={{ fontSize:11, padding:"3px 10px", borderRadius:99, background:"#F5F7FF", border:"1px solid #E4E8F5", color:"#68738A" }}>{it}</span>)}
              </div>
              <button style={{ marginTop:12, fontSize:11.5, fontWeight:600, color:"#4361EE", background:"none", border:"none", cursor:"pointer", padding:0 }}>View full session →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PORTAL — Kleo-style white sidebar
═══════════════════════════════════════════════════ */
export function ZariPortal() {
  const [screen, setScreen] = useState<Screen>("session");

  const groups = ["Coach", "Materials", "History"];

  return (
    <div style={{ display:"flex", height:"100vh", background:"#FAFBFF", fontFamily:"inherit" }}>

      {/* ── SIDEBAR — Kleo white style ── */}
      <div style={{ width:228, flexShrink:0, background:"white", borderRight:"1px solid #E4E8F5", display:"flex", flexDirection:"column", height:"100vh", overflowY:"auto" }}>

        {/* Logo */}
        <div style={{ padding:"18px 16px 12px", borderBottom:"1px solid #F0F2F8" }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:9, textDecoration:"none" }}>
            <ZariLogo size={28} />
            <div>
              <p style={{ fontSize:14, fontWeight:800, color:"#0A0A0F", lineHeight:1.1 }}>Zari</p>
              <p style={{ fontSize:10, color:"#A0AABF", lineHeight:1 }}>AI Career Coach</p>
            </div>
          </Link>
        </div>

        {/* Progress card — Kleo-style "Your Progress" */}
        <div style={{ margin:"12px 10px 4px", background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid rgba(67,97,238,0.12)", borderRadius:12, padding:"12px 14px" }}>
          <p style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#6478F0", marginBottom:8 }}>Your Progress</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
            {[
              { label:"Sessions", val:"5" },
              { label:"Resume", val:"74" },
              { label:"Interviews", val:"3" },
              { label:"Plan", val:"2/8" },
            ].map(s => (
              <div key={s.label} style={{ background:"white", borderRadius:8, padding:"6px 8px", border:"1px solid rgba(67,97,238,0.10)" }}>
                <p style={{ fontSize:16, fontWeight:800, color:"#4361EE", lineHeight:1 }}>{s.val}</p>
                <p style={{ fontSize:9.5, color:"#A0AABF", marginTop:2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"8px 8px 8px" }}>
          {groups.map(group => {
            const items = NAV.filter(n => n.group === group);
            return (
              <div key={group} style={{ marginBottom:4 }}>
                <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#C4CDDF", padding:"8px 8px 4px" }}>{group}</p>
                {items.map(item => {
                  const active = screen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setScreen(item.id)}
                      style={{
                        display:"flex", alignItems:"center", gap:10,
                        width:"100%", padding:"8px 10px", borderRadius:10, marginBottom:2,
                        border:"none", cursor:"pointer", textAlign:"left",
                        background: active ? "#EEF2FF" : "transparent",
                        color: active ? "#4361EE" : "#68738A",
                        fontWeight: active ? 600 : 400,
                        fontSize: 13,
                        borderLeft: `2px solid ${active?"#4361EE":"transparent"}`,
                        transition:"all 0.12s ease",
                      }}
                    >
                      <span style={{ color: active ? "#4361EE" : "#A0AABF", flexShrink:0 }}>{item.icon}</span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        <div style={{ padding:"12px 12px 16px", borderTop:"1px solid #F0F2F8" }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"white", flexShrink:0 }}>SN</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:12, fontWeight:600, color:"#0A0A0F", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Steve N.</p>
              <p style={{ fontSize:10, color:"#A0AABF" }}>Free plan</p>
            </div>
            <Link href="/onboarding/plan" style={{ fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:6, background:"#4361EE", color:"white", textDecoration:"none", flexShrink:0 }}>Upgrade</Link>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflowX:"hidden" }}>

        {/* Topbar */}
        <div style={{ height:56, flexShrink:0, background:"white", borderBottom:"1px solid #E4E8F5", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px" }}>
          <div>
            <p style={{ fontSize:13.5, fontWeight:700, color:"#0A0A0F" }}>{NAV.find(n=>n.id===screen)?.label ?? "Dashboard"}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {screen !== "session" && (
              <button onClick={() => setScreen("session")} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, padding:"6px 14px", borderRadius:99, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.25)" }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:13, height:13 }}><path d="M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M3 8v.5a5 5 0 0010 0V8"/><line x1="8" y1="13.5" x2="8" y2="15.5"/></svg>
                Talk to Zari
              </button>
            )}
            <Link href="/" style={{ fontSize:12, color:"#A0AABF", textDecoration:"none" }}>← Back to site</Link>
          </div>
        </div>

        {/* Screen */}
        {screen === "session"   && <ScreenSession />}
        {screen === "resume"    && <ScreenResume />}
        {screen === "interview" && <ScreenInterview />}
        {screen === "linkedin"  && <ScreenLinkedIn />}
        {screen === "documents" && <ScreenDocuments />}
        {screen === "plan"      && <ScreenPlan />}
        {screen === "history"   && <ScreenHistory />}
      </div>
    </div>
  );
}
