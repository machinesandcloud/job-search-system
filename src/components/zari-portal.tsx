"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatar, type AvatarState } from "@/components/zari-avatar";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type Screen = "session" | "resume" | "interview" | "linkedin" | "documents" | "plan";
type CareerStage = "job-search" | "promotion" | "salary" | "career-change" | "leadership";

const STAGE_ICONS: Record<CareerStage, React.ReactNode> = {
  "job-search":    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/></svg>,
  "promotion":     <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><path d="M8 2v8M4 6l4-4 4 4"/><path d="M3 13h10"/></svg>,
  "salary":        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M5 4V3a3 3 0 016 0v1"/><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
  "career-change": <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><path d="M2 8h12M9 4l5 4-5 4"/></svg>,
  "leadership":    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><polygon points="8,2 10,6 14,6.5 11,9.5 11.5,14 8,12 4.5,14 5,9.5 2,6.5 6,6"/></svg>,
};

const STAGE_META: Record<CareerStage, { label:string; color:string; bg:string }> = {
  "job-search":    { label:"Job Search",          color:"#4361EE", bg:"#EEF2FF" },
  "promotion":     { label:"Get Promoted",         color:"#7C3AED", bg:"#F5F3FF" },
  "salary":        { label:"Salary & Negotiation", color:"#059669", bg:"#ECFDF5" },
  "career-change": { label:"Career Change",        color:"#0284C7", bg:"#EFF6FF" },
  "leadership":    { label:"Leadership & Exec",    color:"#D97706", bg:"#FFFBEB" },
};

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */
function ScoreRing({ score, color="#4361EE", size=56 }: { score:number; color?:string; size?:number }) {
  const r = (size-8)/2, circ = 2*Math.PI*r, dash = circ*(1-score/100);
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={5}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform={`rotate(-90 ${size/2} ${size/2})`}/>
      </svg>
      <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.24, fontWeight:800, color }}>{score}</span>
    </div>
  );
}

function Bar({ pct, color="#4361EE", h=5 }: { pct:number; color?:string; h?:number }) {
  return (
    <div style={{ height:h, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
      <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:99, transition:"width 0.6s ease" }}/>
    </div>
  );
}

function Tag({ text, color, bg }:{ text:string; color:string; bg:string }) {
  return <span style={{ fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:99, background:bg, color }}>{text}</span>;
}

/* ═══════════════════════════════════════════════════
   SIDEBAR NAV
═══════════════════════════════════════════════════ */
const BASE_ICONS: Record<Screen, React.ReactNode> = {
  session:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><path d="M10 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 9v1a6 6 0 0012 0V9"/><line x1="10" y1="15" x2="10" y2="18"/></svg>,
  resume:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>,
  interview: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><circle cx="10" cy="6" r="3"/><path d="M3 17c0-3.866 3.134-6 7-6s7 2.134 7 6"/></svg>,
  linkedin:  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="2" y="2" width="16" height="16" rx="3"/><path d="M6 9v5M6 6.5v.5M9 14V11a2.5 2.5 0 015 0v3M9 11v3"/></svg>,
  documents: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v4h4"/></svg>,
  plan:      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M6 2v4M14 2v4M3 9h14"/><path d="M7 13l2 2 4-4"/></svg>,
};

const STAGE_NAV_LABELS: Record<CareerStage, Record<Screen, string>> = {
  "job-search": {
    session:   "Talk to Zari",
    resume:    "Resume Review",
    interview: "Mock Interview",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Action Plan",
  },
  "promotion": {
    session:   "Talk to Zari",
    resume:    "Build My Case",
    interview: "Pitch Practice",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Promotion Plan",
  },
  "salary": {
    session:   "Talk to Zari",
    resume:    "Salary Research",
    interview: "Negotiation Sim",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Negotiation Plan",
  },
  "career-change": {
    session:   "Talk to Zari",
    resume:    "Reframe Resume",
    interview: "Pivot Interview",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Transition Plan",
  },
  "leadership": {
    session:   "Talk to Zari",
    resume:    "Executive Bio",
    interview: "Story Practice",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Leadership Plan",
  },
};

function getNav(stage: CareerStage): { id:Screen; label:string; icon:React.ReactNode }[] {
  const labels = STAGE_NAV_LABELS[stage];
  return (Object.keys(BASE_ICONS) as Screen[]).map(id => ({
    id,
    label: labels[id],
    icon:  BASE_ICONS[id],
  }));
}

/* ═══════════════════════════════════════════════════
   SCREEN: VOICE COACHING SESSION
═══════════════════════════════════════════════════ */
type ChatMsg = { role:string; text:string };
const STAGE_INIT_MSGS: Record<CareerStage, ChatMsg[]> = {
  "job-search": [
    { role:"coach", text:"Good to see you. Last session we reframed your supply chain project as a product initiative — and you got 2 recruiter responses because of it. Ready to work on interview stories today?" },
    { role:"user",  text:"Yes, let's do it. I'm feeling more confident." },
    { role:"coach", text:"Great. We'll practice the cross-functional leadership question — it's the one Senior PM panels push hardest on. Take your time and use STAR structure." },
  ],
  "promotion": [
    { role:"coach", text:"Let's build your promotion case. Tell me: what's the biggest thing you've owned in the last 6 months that no one else was doing at your level?" },
    { role:"user",  text:"I led the migration of 3 core services — it was originally scoped to someone at Staff level." },
    { role:"coach", text:"That's your lead story. Now let's quantify the impact and tie it to business outcomes your manager actually cares about. What shipped because of that migration?" },
  ],
  "salary": [
    { role:"coach", text:"Before we practice, let's anchor on your number. What's the offer on the table, and what did your research tell you about market rate for this role?" },
    { role:"user",  text:"They offered $145K. Levels.fyi shows p50 is around $162K for this title in SF." },
    { role:"coach", text:"You're $17K below market. That's a strong position to negotiate from. Let's run the conversation — I'll play the hiring manager. Ready?" },
  ],
  "career-change": [
    { role:"coach", text:"Career pivots live or die on narrative. Let's build yours. What's the most relevant part of your background for the new direction you're heading?" },
    { role:"user",  text:"I've been in finance for 6 years but I've always been closest to the product decisions." },
    { role:"coach", text:"That's your bridge — not a departure, a progression. Finance gave you commercial rigour. Now let's frame that as an asset, not a liability, for product roles." },
  ],
  "leadership": [
    { role:"coach", text:"At the executive level, how you communicate is as important as what you communicate. What's a high-stakes conversation or presentation you have coming up?" },
    { role:"user",  text:"I'm presenting the Q3 product strategy to the board next month." },
    { role:"coach", text:"Let's build that narrative. Board presentations need to answer three questions fast: what's the bet, why now, and what will success look like in 12 months? Let's start with the bet." },
  ],
};

const STAGE_PROMPTS: Record<CareerStage, string[]> = {
  "job-search": [
    "Practice a PM interview question",
    "Rewrite my resume bullet",
    "Help me answer 'Why product?'",
    "Give me a LinkedIn headline",
    "What should I work on today?",
    "Run a STAR story practice",
  ],
  "promotion": [
    "Help me build my promotion case",
    "What gaps do I still need to close?",
    "Practice my manager pitch",
    "Write my impact statement",
    "How do I get executive sponsorship?",
    "What does 'next level' look like for me?",
  ],
  "salary": [
    "What's the market rate for my role?",
    "Help me counter a low offer",
    "Practice the negotiation conversation",
    "How do I ask for a raise?",
    "What if they say no?",
    "Write my salary ask message",
  ],
  "career-change": [
    "How do I reframe my background?",
    "What transferable skills do I have?",
    "Rewrite my resume for a new industry",
    "Help me answer 'Why are you switching?'",
    "What's my story for interviews?",
    "Which roles should I target first?",
  ],
  "leadership": [
    "Build my executive presence",
    "How do I communicate to the board?",
    "Practice a leadership story",
    "Help me lead a difficult conversation",
    "Strengthen my strategic narrative",
    "What does VP-level impact look like?",
  ],
};

function ScreenSession({ stage }: { stage: CareerStage }) {
  const [avatarState, setAvatarState] = useState<AvatarState>("speaking");
  const [input, setInput] = useState("");
  const [isVoice, setIsVoice] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  /* ── Load or create a live session on mount / stage change ── */
  useEffect(() => {
    setSessionReady(false);
    setElapsed(0);
    let cancelled = false;

    async function initSession() {
      try {
        // Find an existing live session
        const res = await fetch("/api/sessions", { cache: "no-store" });
        const data = await res.json().catch(() => ({})) as {
          sessions?: Array<{
            id: string; status: string; mode: string;
            transcript?: Array<{ role: string; message: string }>;
          }>;
        };

        if (cancelled) return;
        const sessions = data.sessions ?? [];
        const live = sessions.find(s => s.status === "live");

        if (live) {
          setSessionId(live.id);
          // Restore transcript if it has real messages
          const transcript = live.transcript ?? [];
          if (transcript.length > 0) {
            setMsgs(transcript.map(t => ({ role: t.role, text: t.message })));
            if (!cancelled) setSessionReady(true);
            return;
          }
        } else {
          // Create a fresh session
          const createRes = await fetch("/api/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "career", title: `${STAGE_META[stage].label} Session` }),
          });
          const created = await createRes.json().catch(() => ({})) as { id?: string };
          if (!cancelled && created.id) setSessionId(created.id);
        }
      } catch {
        // non-fatal — continue without session persistence
      }

      // Fall back to default init messages
      if (!cancelled) {
        setMsgs(STAGE_INIT_MSGS[stage]);
        setSessionReady(true);
      }
    }

    void initSession();
    return () => { cancelled = true; };
  }, [stage]);

  useEffect(() => { const t = setInterval(() => setElapsed(e => e+1), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [msgs, isLoading]);
  useEffect(() => { if (sessionReady) setSessionReady(true); }, [sessionReady]);

  const fmt = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // If no session yet, create one now
    let sid = sessionId;
    if (!sid) {
      try {
        const createRes = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "career", title: `${STAGE_META[stage].label} Session` }),
        });
        const created = await createRes.json().catch(() => ({})) as { id?: string };
        if (created.id) { sid = created.id; setSessionId(created.id); }
      } catch { /* non-fatal */ }
    }

    setMsgs(m => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setAvatarState("thinking");
    setIsLoading(true);

    try {
      const res = await fetch("/api/zari/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          stage,
          history: msgs,
          sessionId: sid,
        }),
      });
      const data = await res.json().catch(() => ({})) as { message?: string };
      const reply = data.message?.trim() || "I'm having a little trouble right now — try again in a moment.";
      setMsgs(m => [...m, { role: "coach", text: reply }]);
      setAvatarState("speaking");
      setTimeout(() => setAvatarState("listening"), 3500);
    } catch {
      setMsgs(m => [...m, { role: "coach", text: "Connection issue — try again in a moment." }]);
      setAvatarState("idle");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display:"flex", height:"calc(100vh - 56px)", overflow:"hidden" }}>

      {/* ── LEFT PANEL: Zari + prompts ── */}
      <div style={{
        width:300, flexShrink:0,
        background:"white", borderRight:"1px solid #E4E8F5",
        display:"flex", flexDirection:"column",
        padding:"24px 20px",
      }}>
        {/* Status chips */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, color:"#16A34A", padding:"3px 10px", borderRadius:99, background:"#F0FFF4", border:"1px solid #BBF7D0" }}>
            <span style={{ width:5,height:5,borderRadius:"50%",background:"#22C55E",animation:"blink 1.1s ease-in-out infinite" }}/>
            Live
          </span>
          <span style={{ fontFamily:"monospace", fontSize:10.5, color:"#68738A", padding:"3px 10px", borderRadius:99, background:"#F5F7FF", border:"1px solid #E4E8F5" }}>{fmt(elapsed)}</span>
          <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10.5, fontWeight:600, color: STAGE_META[stage].color, padding:"3px 8px", borderRadius:99, background: STAGE_META[stage].bg, border:`1px solid ${STAGE_META[stage].color}30` }}>{STAGE_ICONS[stage]} {STAGE_META[stage].label}</span>
        </div>

        {/* Avatar — centred, contained */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
          <ZariAvatar state={avatarState} size={110} interactive />
        </div>

        {/* Name */}
        <div style={{ textAlign:"center", fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:8 }}>
          Zari <span style={{ fontWeight:400, color:"#68738A" }}>— AI Career Coach</span>
        </div>

        {/* State indicator */}
        <div style={{
          textAlign:"center", fontSize:12, fontWeight:500, marginBottom:18,
          color: avatarState==="speaking"?"#4361EE": avatarState==="listening"?"#06B6D4": avatarState==="thinking"?"#A78BFA":"#A0AABF",
          display:"flex", alignItems:"center", justifyContent:"center", gap:5,
        }}>
          <span style={{ width:6,height:6,borderRadius:"50%", background: avatarState==="speaking"?"#4361EE": avatarState==="listening"?"#06B6D4": avatarState==="thinking"?"#A78BFA":"#A0AABF", animation:"blink 1.2s ease-in-out infinite" }}/>
          {avatarState==="speaking" && "Speaking…"}
          {avatarState==="listening" && "Listening…"}
          {avatarState==="thinking" && "Thinking…"}
          {avatarState==="idle" && "Ready"}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"#F1F5F9", marginBottom:16 }}/>

        {/* Quick prompts */}
        <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"#A0AABF", marginBottom:10 }}>Quick prompts</p>
        <div style={{ display:"flex", flexDirection:"column", gap:6, flex:1, overflowY:"auto" }}>
          {STAGE_PROMPTS[stage].map(p => (
            <button key={p} onClick={() => void sendMessage(p)} disabled={isLoading} style={{ opacity: isLoading ? 0.5 : 1,
              fontSize:12, fontWeight:500, color: STAGE_META[stage].color,
              padding:"8px 11px", borderRadius:9, textAlign:"left",
              background: STAGE_META[stage].bg, border:`1px solid ${STAGE_META[stage].color}20`,
              cursor:"pointer", lineHeight:1.4,
              transition:"opacity 0.15s",
            }}>
              {p}
            </button>
          ))}
        </div>

        {/* Voice toggle */}
        <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #F1F5F9" }}>
          <button onClick={() => setIsVoice(v=>!v)} style={{
            width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            padding:"9px", borderRadius:10, border:"none", cursor:"pointer",
            background: isVoice ? "#4361EE" : "#F5F7FF",
            color: isVoice ? "white" : "#4361EE", fontSize:12.5, fontWeight:600,
            transition:"all 0.2s",
          }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:15,height:15 }}><path d="M10 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 9v1a6 6 0 0012 0V9"/><line x1="10" y1="15" x2="10" y2="18"/></svg>
            {isVoice ? "Voice on" : "Enable voice"}
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL: Transcript + input ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", background:"#FAFBFF", minWidth:0 }}>
        <div ref={chatRef} style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
          {/* Session loading skeleton */}
          {!sessionReady && msgs.length === 0 && (
            <div style={{ display:"flex", gap:10, marginBottom:16, animation:"bubble-appear 0.3s ease" }}>
              <div style={{ width:32,height:32,borderRadius:"50%",flexShrink:0,background:"linear-gradient(135deg,#4361EE,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white" }}>Z</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, padding:"11px 16px", borderRadius:"4px 16px 16px 16px", background:"white", border:"1px solid #E4E8F5" }}>
                {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:"50%",background:"#C7D2FE",animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          )}
          {msgs.map((msg, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:16, flexDirection:msg.role==="user"?"row-reverse":"row", animation:`bubble-appear 0.3s ease ${i*0.05}s both` }}>
              <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, background:msg.role==="coach"?"linear-gradient(135deg,#4361EE,#818CF8)":"#E4E8F5", color:msg.role==="coach"?"white":"#68738A", boxShadow:msg.role==="coach"?"0 0 10px rgba(67,97,238,0.25)":"none" }}>
                {msg.role==="coach"?"Z":"S"}
              </div>
              <div style={{ maxWidth:"72%", padding:"11px 15px", fontSize:13.5, lineHeight:1.65, borderRadius:msg.role==="coach"?"4px 16px 16px 16px":"16px 4px 16px 16px", background:msg.role==="coach"?"white":"#4361EE", color:msg.role==="coach"?"#1E2235":"white", border:msg.role==="coach"?"1px solid #E4E8F5":"none", boxShadow:msg.role==="coach"?"0 2px 8px rgba(0,0,0,0.04)":"0 4px 14px rgba(67,97,238,0.28)" }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display:"flex", gap:10, marginBottom:16, animation:"bubble-appear 0.2s ease" }}>
              <div style={{ width:32,height:32,borderRadius:"50%",flexShrink:0,background:"linear-gradient(135deg,#4361EE,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white" }}>Z</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, padding:"11px 16px", borderRadius:"4px 16px 16px 16px", background:"white", border:"1px solid #E4E8F5" }}>
                {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:"50%",background:"#818CF8",animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ flexShrink:0, padding:"0 28px 20px", borderTop:"1px solid #E4E8F5", paddingTop:14, background:"white" }}>
          <div style={{ position:"relative", background:"#FAFBFF", border:`1.5px solid ${isLoading ? "#C7D2FE" : "#E0E4EF"}`, borderRadius:14, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"border-color 0.2s" }}>
            <textarea
              style={{ width:"100%", border:"none", outline:"none", fontSize:14, color:"#0A0A0F", background:"transparent", resize:"none", padding:"12px 52px 12px 14px", fontFamily:"inherit", lineHeight:1.6, display:"block", opacity: isLoading ? 0.5 : 1 }}
              rows={3}
              placeholder={isLoading ? "Zari is thinking…" : isVoice ? "Voice mode active — speak or type…" : "Ask Zari anything, or type a question to practice…"}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();void sendMessage(input);} }}
              disabled={isLoading}
            />
            <button
              onClick={()=>void sendMessage(input)}
              disabled={isLoading || !input.trim()}
              style={{ position:"absolute", bottom:10, right:10, width:34,height:34,borderRadius:10,border:"none",cursor:isLoading||!input.trim()?"default":"pointer", background:input.trim()&&!isLoading?"#4361EE":"#E4E8F5", color:input.trim()&&!isLoading?"white":"#A0AABF", display:"flex",alignItems:"center",justifyContent:"center", transition:"all 0.15s" }}
            >
              {isLoading
                ? <span style={{ width:12,height:12,borderRadius:"50%",border:"2px solid #A0AABF",borderTopColor:"#4361EE",animation:"spin-slow 0.7s linear infinite",display:"block" }}/>
                : <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:14,height:14 }}><path d="M3.105 3.105a1 1 0 011.263-.237l12 6a1 1 0 010 1.764l-12 6a1 1 0 01-1.367-1.31L4.945 10 3 4.678a1 1 0 01.105-1.573z"/></svg>
              }
            </button>
          </div>
          <p style={{ textAlign:"center", fontSize:10, color:"#C4CDD8", marginTop:6 }}>Enter to send · Shift+Enter for new line · Powered by Zari AI</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: RESUME REVIEW — drag-drop upload + full analysis
═══════════════════════════════════════════════════ */
type ResumeStep = "upload"|"paste"|"analyzing"|"results";

type ResumeAnalysis = {
  overall: number; ats: number; impact: number; clarity: number;
  findings: { type: "critical"|"warn"|"ok"; text: string }[];
  bullets: { before: string; after: string; oldScore: number; newScore: number }[];
  recommendation: string;
  rewrittenSections: { label: string; text: string; score: number }[];
};

function ScreenResume({ stage }: { stage: CareerStage }) {
  const [step, setStep]         = useState<ResumeStep>("upload");
  const [progress, setProgress] = useState(0);
  const [tab, setTab]           = useState<"overview"|"bullets"|"rewrite">("overview");
  const [dragging, setDragging] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [aiResult,  setAiResult]   = useState<ResumeAnalysis | null>(null);
  const [analyzeErr, setAnalyzeErr] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setAnalyzeErr("");
    setStep("analyzing");
    setProgress(5);

    // Extract text from file
    let extracted = "";
    try {
      const fd = new FormData();
      fd.append("file", file);
      const extractRes = await fetch("/api/zari/extract", { method: "POST", body: fd });
      const extractData = await extractRes.json().catch(() => ({})) as { text?: string; error?: string };
      if (!extractData.text) {
        setStep("paste");
        setAnalyzeErr(extractData.error ?? "Could not read file — try pasting the text instead.");
        return;
      }
      extracted = extractData.text;
      setResumeText(extracted);
    } catch {
      setStep("paste");
      setAnalyzeErr("Could not read file — try pasting the text instead.");
      return;
    }

    await runAnalysis(extracted);
  }

  async function runAnalysis(text?: string) {
    const textToAnalyze = text ?? resumeText;
    if (!textToAnalyze.trim()) return;
    setAnalyzeErr("");
    if (step !== "analyzing") setStep("analyzing");

    let p = 5;
    const interval = setInterval(() => {
      p += Math.random() * 10 + 2;
      if (p >= 90) { clearInterval(interval); }
      setProgress(Math.min(p, 90));
    }, 200);

    try {
      const res = await fetch("/api/zari/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: textToAnalyze, stage }),
      });
      const data = await res.json().catch(() => null) as ResumeAnalysis | null;
      clearInterval(interval);
      setProgress(100);
      if (data && data.overall) {
        setAiResult(data);
        setTimeout(() => setStep("results"), 400);
      } else {
        setStep("paste");
        setAnalyzeErr("Analysis failed — try again.");
      }
    } catch {
      clearInterval(interval);
      setStep("paste");
      setAnalyzeErr("Connection error — try again.");
    }
  }

  const ANALYSIS_STAGES = [
    "Parsing document structure…",
    "Running ATS keyword scan…",
    "Scoring impact per bullet…",
    "Comparing to 40+ Senior PM job descriptions…",
    "Generating rewrites…",
    "Finalizing optimized version…",
  ];
  const [stageIdx, setStageIdx] = useState(0);
  useEffect(() => {
    if (step !== "analyzing") return;
    const t = setInterval(() => setStageIdx(i => Math.min(i+1, ANALYSIS_STAGES.length-1)), 800);
    return () => clearInterval(t);
  }, [step]);

  if (step === "paste") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:660, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <h1 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:8 }}>Paste your resume text</h1>
          <p style={{ fontSize:14, color:"#68738A" }}>Copy and paste your full resume below — Zari will score and rewrite it.</p>
        </div>
        {analyzeErr && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#991B1B" }}>{analyzeErr}</div>}
        <textarea
          style={{ width:"100%", minHeight:300, border:"1.5px solid #CBD5E1", borderRadius:14, padding:"14px 16px", fontSize:13.5, lineHeight:1.7, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"white", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}
          placeholder={"Paste your full resume here...\n\nName\nJob Title · Location · Email\n\nSummary\n...\n\nExperience\n..."}
          value={resumeText}
          onChange={e => setResumeText(e.target.value)}
        />
        <div style={{ display:"flex", gap:10, marginTop:14 }}>
          <button onClick={() => setStep("upload")} style={{ fontSize:13, fontWeight:600, padding:"10px 20px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>← Back</button>
          <button onClick={() => void runAnalysis()} disabled={!resumeText.trim()} style={{ flex:1, fontSize:14, fontWeight:700, padding:"11px", borderRadius:10, border:"none", background:resumeText.trim()?"#4361EE":"#E4E8F5", color:resumeText.trim()?"white":"#A0AABF", cursor:resumeText.trim()?"pointer":"default", boxShadow:resumeText.trim()?"0 4px 16px rgba(67,97,238,0.3)":"none" }}>
            Analyze with Zari →
          </button>
        </div>
      </div>
    </div>
  );

  if (step === "upload") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:660, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:56, height:56, borderRadius:16, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" style={{ width:26, height:26 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          </div>
          <h1 style={{ fontSize:26, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:10 }}>{SCREEN_RESUME_META[stage].title}</h1>
          <p style={{ fontSize:15.5, color:"#68738A", lineHeight:1.65, maxWidth:440, margin:"0 auto" }}>{SCREEN_RESUME_META[stage].desc}</p>
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" style={{ display:"none" }} onChange={e=>{ const f = e.target.files?.[0]; if(f) void handleFile(f); e.target.value=""; }}/>

        {/* Drag-drop zone */}
        <div
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files?.[0];if(f)void handleFile(f);}}
          onClick={()=>fileInputRef.current?.click()}
          style={{ border:`2px dashed ${dragging?"#4361EE":"#CBD5E1"}`, borderRadius:20, padding:"52px 32px", textAlign:"center", cursor:"pointer", background:dragging?"#EEF2FF":"white", transition:"all 0.2s", boxShadow:dragging?"0 0 0 4px rgba(67,97,238,0.12)":"none" }}
        >
          <div style={{ width:56, height:56, borderRadius:16, background:"#F5F7FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:26, height:26 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <p style={{ fontSize:15.5, fontWeight:700, color:"#0A0A0F", marginBottom:6 }}>Drop your resume here</p>
          <p style={{ fontSize:13.5, color:"#A0AABF", marginBottom:20 }}>PDF, DOCX, or TXT — or click to choose file</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"11px 24px", borderRadius:12, background:"#4361EE", color:"white", fontSize:14, fontWeight:700, boxShadow:"0 4px 16px rgba(67,97,238,0.32)" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:16, height:16 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Choose file
          </div>
        </div>
        <p style={{ textAlign:"center", fontSize:12, color:"#A0AABF", marginTop:12 }}>or <button onClick={e=>{e.stopPropagation();setStep("paste");}} style={{ background:"none",border:"none",color:"#4361EE",fontWeight:600,cursor:"pointer",fontSize:12,padding:0 }}>paste text instead</button></p>

        {/* What Zari will do */}
        <div style={{ marginTop:28, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {SCREEN_RESUME_META[stage].features.map(f => (
            <div key={f.title} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start" }}>
              <span style={{ fontSize:20 }}>{f.icon}</span>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:3 }}>{f.title}</p>
                <p style={{ fontSize:12, color:"#68738A", lineHeight:1.5 }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (step === "analyzing") return (
    <div style={{ height:"calc(100vh - 56px)", display:"flex", alignItems:"center", justifyContent:"center", background:"#FAFBFF" }}>
      <div style={{ maxWidth:480, width:"100%", padding:32, textAlign:"center" }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", animation:"sphere-breathe 2s ease-in-out infinite" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" style={{ width:36, height:36 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h2 style={{ fontSize:22, fontWeight:800, color:"#0A0A0F", marginBottom:8 }}>Zari is analyzing your resume…</h2>
        <p style={{ fontSize:14, color:"#68738A", marginBottom:32 }}>{ANALYSIS_STAGES[stageIdx]}</p>

        {/* Progress bar */}
        <div style={{ background:"#F1F5F9", borderRadius:99, height:8, overflow:"hidden", marginBottom:16 }}>
          <div style={{ width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#4361EE,#06B6D4)", borderRadius:99, transition:"width 0.3s ease" }}/>
        </div>
        <p style={{ fontSize:12, color:"#A0AABF" }}>{Math.round(progress)}% complete</p>

        <div style={{ marginTop:28, display:"flex", flexDirection:"column", gap:8 }}>
          {ANALYSIS_STAGES.slice(0, stageIdx+1).map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color: i===stageIdx?"#4361EE":"#A0AABF" }}>
              <svg viewBox="0 0 16 16" fill={i<stageIdx?"#22C55E":"none"} stroke={i===stageIdx?"#4361EE":"#CBD5E1"} strokeWidth="2" style={{ width:16, height:16, flexShrink:0, animation: i===stageIdx?"spin-slow 1.5s linear infinite":"none" }}>
                {i < stageIdx ? <polyline points="3,8 6,11 13,4"/> : <circle cx="8" cy="8" r="6"/>}
              </svg>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:28 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <h1 style={{ fontSize:22, fontWeight:900, color:"#0A0A0F", letterSpacing:"-0.03em" }}>Resume Review</h1>
              <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, background:"#F0FFF4", color:"#16A34A", border:"1px solid #BBF7D0" }}>Analyzed</span>
            </div>
            <p style={{ fontSize:13, color:"#68738A" }}>Resume_PM_v3.pdf · Target: Senior PM · Zari found 8 improvements</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setStep("upload")} style={{ fontSize:12, fontWeight:600, padding:"8px 16px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>
              Upload new version
            </button>
            <button style={{ fontSize:12, fontWeight:700, padding:"8px 18px", borderRadius:10, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.3)", display:"flex", alignItems:"center", gap:6 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:14,height:14 }}><path d="M10 4v12M4 10l6 6 6-6"/></svg>
              Download optimized resume
            </button>
          </div>
        </div>

        {/* Score strip */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
          {[
            { label:"Overall",  score: aiResult?.overall ?? 89, color:"#4361EE",  note:"Overall resume quality" },
            { label:"ATS Match",score: aiResult?.ats     ?? 91, color:"#16A34A",  note:"Keyword coverage" },
            { label:"Impact",   score: aiResult?.impact  ?? 84, color:"#0284C7",  note:"Metrics & outcomes" },
            { label:"Clarity",  score: aiResult?.clarity ?? 87, color:"#7C3AED",  note:"Structure & readability" },
          ].map(sc => (
            <div key={sc.label} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:16, textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <ScoreRing score={sc.score} color={sc.color} size={60}/>
              <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginTop:8 }}>{sc.label}</p>
              <p style={{ fontSize:10.5, color:"#16A34A", marginTop:2 }}>↑ {sc.note}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, background:"white", border:"1px solid #E4E8F5", borderRadius:12, padding:4, width:"fit-content", marginBottom:20 }}>
          {(["overview","bullets","rewrite"] as const).map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{ padding:"6px 18px", borderRadius:9, border:"none", cursor:"pointer", fontSize:12.5, fontWeight:600, background:tab===t?"#4361EE":"transparent", color:tab===t?"white":"#68738A" }}>
              {t==="bullets"?"Line-by-Line":t==="rewrite"?"AI Rewrites":"Overview"}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {/* Left: document preview */}
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#0A0A0F", marginBottom:2 }}>Steve Ngoumnai</div>
            <div style={{ fontSize:11.5, color:"#68738A", marginBottom:14 }}>Operations Lead · London, UK · steve@email.com</div>
            {[
              { label:"Summary", bad:true, text:"Experienced operations professional with 4 years driving cross-functional process improvements at scale. Seeking to transition into Senior Product Manager roles.", note:"⚠ No product keywords — fails ATS" },
              { label:"Experience", bad:true, text:"Ops Lead — FinCo Ltd · 2021–present\n• Managed supply chain redesign across 5 business units\n• Led cross-functional team of 12\n• Reduced fulfilment time by 22%", note:"⚠ Task-focused — no impact metrics" },
              { label:"Education", bad:false, text:"BSc Business Management · UCL · 2019" },
              { label:"Skills", bad:true, text:"Operations · Supply Chain · Process Design · Stakeholder Management", note:"⚠ Missing PM keywords" },
            ].map(b => (
              <div key={b.label} style={{ marginBottom:9, borderRadius:10, border:`1px solid ${b.bad?"#FECACA":"#E4E8F5"}`, background:b.bad?"#FFF5F5":"white", padding:"8px 11px" }}>
                <p style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:b.bad?"#DC2626":"#A0AABF", marginBottom:4 }}>{b.label}</p>
                <p style={{ fontSize:11.5, color:"#1E2235", lineHeight:1.5, whiteSpace:"pre-line" }}>{b.text}</p>
                {b.note && <p style={{ fontSize:10, color:"#D97706", marginTop:4, fontWeight:600 }}>{b.note}</p>}
              </div>
            ))}
          </div>

          {/* Right: analysis panel */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {tab==="overview" && <>
              <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:18, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:12 }}>Zari&apos;s findings</p>
                {(aiResult?.findings ?? [
                  { type:"critical" as const, text:"Summary contains no product keywords — fails ATS for PM roles." },
                  { type:"warn" as const,     text:"5 of 8 bullets are task-focused with no impact numbers." },
                  { type:"warn" as const,     text:"Skills section missing PM keywords found in target JDs." },
                  { type:"ok" as const,       text:"Education and timeline clean — no gaps, strong institution." },
                  { type:"ok" as const,       text:"Cross-functional background is valuable — needs reframing." },
                ]).map((f,i) => {
                  const icon = f.type==="critical"?"🔴":f.type==="warn"?"🟡":"🟢";
                  return (
                    <div key={i} style={{ display:"flex", gap:9, padding:"9px 10px", borderRadius:9, background:f.type==="critical"?"#FEF2F2":f.type==="warn"?"#FFFBEB":"#F0FFF4", border:`1px solid ${f.type==="critical"?"#FECACA":f.type==="warn"?"#FDE68A":"#BBF7D0"}`, marginBottom:7 }}>
                      <span style={{ fontSize:12 }}>{icon}</span>
                      <p style={{ fontSize:12, color:f.type==="critical"?"#991B1B":f.type==="warn"?"#92400E":"#14532D", lineHeight:1.5 }}>{f.text}</p>
                    </div>
                  );
                })}
              </div>
              <div style={{ background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:16, padding:18 }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#4361EE", marginBottom:8 }}>Zari&apos;s recommendation</p>
                <p style={{ fontSize:12.5, color:"#3451D1", lineHeight:1.6 }}>{aiResult?.recommendation ?? "Rewrite your summary to lead with product outcomes — that's the single change that will move your ATS score the most."}</p>
              </div>
            </>}

            {tab==="bullets" && (
              <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:18, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:14 }}>Bullet-by-bullet rewrites</p>
                {(aiResult?.bullets ?? [
                  { before:"Managed supply chain redesign across 5 business units", after:"Led end-to-end supply chain redesign across 5 business units · 22% faster fulfilment · £340K annual cost savings", oldScore:55, newScore:91 },
                  { before:"Worked with tech team to deliver system integration", after:"Partnered with Engineering to ship ERP integration in 6 weeks — reducing manual processing by 40% and cutting errors by $120K/yr", oldScore:48, newScore:88 },
                  { before:"Led cross-functional meetings and managed stakeholders", after:"Facilitated weekly reviews with VP-level stakeholders across Finance, Tech, and Ops — drove alignment that delivered 3 milestones on schedule", oldScore:42, newScore:85 },
                ]).map((b,i) => (
                  <div key={i} style={{ marginBottom:16, paddingBottom:16, borderBottom: i < (aiResult?.bullets.length ?? 3) - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                      <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A" }}>Bullet {i+1}</span>
                      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                        <Tag text={`${b.oldScore} →`} color="#D97706" bg="#FFF7ED"/>
                        <Tag text={`${b.newScore}`} color="#16A34A" bg="#F0FFF4"/>
                      </div>
                    </div>
                    <p style={{ fontSize:11.5, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"7px 10px", textDecoration:"line-through", marginBottom:5 }}>{b.before}</p>
                    <p style={{ fontSize:11.5, color:"#14532D", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:8, padding:"7px 10px" }}>{b.after}</p>
                  </div>
                ))}
              </div>
            )}

            {tab==="rewrite" && (
              <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:18, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                  <div>
                    <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:3 }}>Fully optimized resume</p>
                    <p style={{ fontSize:11.5, color:"#68738A" }}>Score: {aiResult?.overall ?? 89}/100 · ATS-ready</p>
                  </div>
                </div>
                {(aiResult?.rewrittenSections ?? [
                  { label:"Summary (rewritten)", text:"Product-minded Operations Leader driving cross-functional strategy, execution, and measurable outcomes. Transitioning to Senior PM with a 4-year track record of shipping supply chain and process improvements across teams of 12+.", score:94 },
                  { label:"Top bullet (rewritten)", text:"Led end-to-end supply chain redesign across 5 business units — 22% faster fulfilment, £340K annual savings, executive alignment secured in 3 weeks.", score:91 },
                  { label:"Skills (updated)", text:"Product Strategy · Roadmap · OKRs · Discovery · Agile · GTM · Operations · Supply Chain · Stakeholder Management · Cross-functional · Process Design · Data Analysis", score:88 },
                ]).map(s => (
                  <div key={s.label} style={{ marginBottom:12, borderRadius:10, border:"1px solid #BBF7D0", background:"#F0FFF4", padding:"10px 12px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <p style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", color:"#16A34A", letterSpacing:"0.1em" }}>{s.label}</p>
                      <Tag text={`${s.score}/100`} color="#16A34A" bg="white"/>
                    </div>
                    <p style={{ fontSize:12, color:"#14532D", lineHeight:1.6 }}>{s.text}</p>
                  </div>
                ))}
                <button style={{ width:"100%", fontSize:12.5, fontWeight:700, padding:"10px", borderRadius:10, border:"none", background:"#0A0A0F", color:"white", cursor:"pointer", marginTop:6 }}>Copy all rewrites to clipboard →</button>
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
/* ── Per-stage resume screen metadata ── */
const SCREEN_RESUME_META: Record<CareerStage, {
  title: string; desc: string;
  features: { icon:string; title:string; body:string }[];
}> = {
  "job-search": {
    title:"Resume Review",
    desc:"Upload your resume and Zari will score it, rewrite every weak bullet with impact metrics, and give you a job-ready version to send tonight.",
    features:[
      { icon:"🎯", title:"ATS keyword scan",      body:"Checks every bullet against your target job descriptions" },
      { icon:"✏️", title:"Bullet rewrites",        body:"Injects metrics and impact into every weak bullet" },
      { icon:"📊", title:"Before/after score",     body:"Shows your resume score from first draft to final version" },
      { icon:"⬇️", title:"Downloadable version",   body:"Get a job-ready PDF optimized for your target role" },
    ],
  },
  "promotion": {
    title:"Build My Case",
    desc:"Upload your self-assessment or recent work. Zari will build your promotion case with scope, impact, and the narrative your manager needs to go to bat for you.",
    features:[
      { icon:"📋", title:"Gap analysis",       body:"Maps where you are against next-level expectations" },
      { icon:"💪", title:"Impact statements",  body:"Turns your work into manager-ready evidence" },
      { icon:"🎯", title:"Promo narrative",    body:"Builds the story your manager tells the committee" },
      { icon:"🗣️", title:"Pitch dry run",      body:"Practice the exact conversation with your manager" },
    ],
  },
  "salary": {
    title:"Salary Research",
    desc:"Tell Zari your role, level, and location. Zari researches market comps, anchors your number, and preps you with the exact language to use in the conversation.",
    features:[
      { icon:"📈", title:"Market benchmarks",     body:"Levels.fyi, Glassdoor, and Blind data for your exact role" },
      { icon:"💰", title:"Total comp breakdown",  body:"Base, equity, bonus, and benefits comparison" },
      { icon:"🎯", title:"Negotiation anchors",   body:"The number to lead with and the floor to hold" },
      { icon:"📝", title:"Counter-offer scripts", body:"Exact language for every response they'll give you" },
    ],
  },
  "career-change": {
    title:"Reframe Resume",
    desc:"Upload your current resume and tell Zari your target role. Zari rewrites it from scratch — repositioning your experience to speak the language of the industry you're entering.",
    features:[
      { icon:"🔄", title:"Narrative reframe",        body:"Rewrites your story for a new audience" },
      { icon:"🗺️", title:"Transferable skills map",  body:"Shows which of your skills translate directly" },
      { icon:"🎯", title:"Target role alignment",    body:"Optimizes for the exact job descriptions you want" },
      { icon:"📊", title:"Before/after view",        body:"Side-by-side of old positioning vs new" },
    ],
  },
  "leadership": {
    title:"Executive Bio",
    desc:"Upload your current bio or resume. Zari will write a board-ready executive bio, speaker profile, and LinkedIn rewrite that positions you at the level you're actually operating at.",
    features:[
      { icon:"✍️", title:"Board-ready bio",    body:"Written for governance conversations and director roles" },
      { icon:"🎤", title:"Speaker profile",    body:"Optimized for conference and keynote positioning" },
      { icon:"💼", title:"LinkedIn rewrite",   body:"Executive-level headline, about, and experience" },
      { icon:"📖", title:"Narrative arc",      body:"Connects your career story with your leadership thesis" },
    ],
  },
};

/* ── Per-stage interview questions ── */
const STAGE_QUESTIONS: Record<CareerStage, { cat:string; level:string; q:string }[]> = {
  "job-search": [
    { cat:"Cross-functional leadership", level:"Senior PM",      q:"Tell me about a time you led a cross-functional initiative that faced significant resistance. What was your approach and what was the outcome?" },
    { cat:"Prioritization",              level:"Senior PM",      q:"How do you prioritize features when you have competing stakeholder demands and limited engineering capacity?" },
    { cat:"Product strategy",            level:"Senior PM",      q:"Describe your process for defining a product strategy from scratch. Walk me through a real example." },
    { cat:"Conflict resolution",         level:"Senior PM",      q:"Tell me about a time you had a significant disagreement with an engineer or designer. How did you resolve it?" },
  ],
  "promotion": [
    { cat:"Scope expansion",    level:"Promotion pitch", q:"Walk me through the biggest thing you owned in the last 6 months that was above your current level. What was the outcome?" },
    { cat:"Sponsorship",        level:"Promotion pitch", q:"Who are your executive sponsors, and how have you built those relationships intentionally? Give me a specific example." },
    { cat:"Business impact",    level:"Promotion pitch", q:"Tell me about a decision you made that had measurable business impact — revenue, retention, or cost. What was your direct contribution?" },
    { cat:"Manager alignment",  level:"Promotion pitch", q:"Your manager says you're 'not quite ready yet.' How do you respond, and what do you do next?" },
  ],
  "salary": [
    { cat:"Opening move",   level:"Negotiation sim", q:"The hiring manager says: 'We'd like to extend you an offer at $145K base.' What do you say next?" },
    { cat:"Pushback",       level:"Negotiation sim", q:"They say: 'That's above our band. The max we can do is $152K.' How do you respond?" },
    { cat:"Counter offer",  level:"Negotiation sim", q:"Your current employer responds to your resignation with a counter-offer 10% above the new role. What do you say?" },
    { cat:"Internal raise", level:"Negotiation sim", q:"You want to ask your manager for a raise. Walk me through how you'd open that conversation." },
  ],
  "career-change": [
    { cat:"Motivation",           level:"Pivot interview", q:"Why are you switching industries after 6 years? What's driving this change right now?" },
    { cat:"Narrative bridge",     level:"Pivot interview", q:"Your background is in finance. Why would you be better at product than someone who started in it?" },
    { cat:"Transferable skills",  level:"Pivot interview", q:"Give me a specific example where a skill from your previous career directly helped you solve a problem in a new context." },
    { cat:"Gap acknowledgement",  level:"Pivot interview", q:"What's the thing you're most behind on compared to someone who's been in this field their whole career? How are you closing it?" },
  ],
  "leadership": [
    { cat:"Executive communication",      level:"Director+", q:"Walk me through a time you had to communicate a strategic shift to the board or senior leadership. What was your approach?" },
    { cat:"Organizational design",         level:"Director+", q:"Tell me about a time you had to restructure a team or function. How did you navigate the human side of that?" },
    { cat:"Influence without authority",   level:"Director+", q:"Give me an example of driving a company-wide change without having direct authority over the people you needed to change." },
    { cat:"Leadership thesis",             level:"Director+", q:"What's your leadership thesis — the thing you believe about building teams that most leaders get wrong?" },
  ],
};

const SCREEN_INTERVIEW_META: Record<CareerStage, { title:string; subtitle:string }> = {
  "job-search":    { title:"Mock Interview",   subtitle:"STAR practice · Real-time AI scoring · Senior PM behavioral round" },
  "promotion":     { title:"Pitch Practice",   subtitle:"Manager pitch · Committee prep · Objection handling" },
  "salary":        { title:"Negotiation Sim",  subtitle:"Offer conversation · Counter scripts · Objection handling" },
  "career-change": { title:"Pivot Interview",  subtitle:"'Why are you switching?' · Narrative bridging · Hybrid role questions" },
  "leadership":    { title:"Story Practice",   subtitle:"Executive stories · Board communication · Leadership scenarios" },
};

type InterviewFeedback = {
  overallScore: number;
  dimensions: { label: string; score: number }[];
  coachNote: string;
  suggestedResult: string;
};

function dimColor(score: number) {
  if (score >= 75) return "#16A34A";
  if (score >= 55) return "#D97706";
  return "#DC2626";
}

type InterviewQuestion = { cat: string; level: string; q: string };

function ScreenInterview({ stage }: { stage: CareerStage }) {
  const [setupDone,   setSetupDone]   = useState(false);
  const [resumeText,  setResumeText]  = useState("");
  const [jobDesc,     setJobDesc]     = useState("");
  const [loadingQs,   setLoadingQs]   = useState(false);
  const [aiQuestions, setAiQuestions] = useState<InterviewQuestion[] | null>(null);
  const [qIdx,        setQIdx]        = useState(0);
  const [answer,      setAnswer]      = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recTime,     setRecTime]     = useState(0);
  const [isScoring,   setIsScoring]   = useState(false);
  const [feedback,    setFeedback]    = useState<InterviewFeedback | null>(null);
  const interviewFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isRecording) return;
    const t = setInterval(() => setRecTime(s=>s+1), 1000);
    return () => clearInterval(t);
  }, [isRecording]);

  // Reset when stage changes
  useEffect(() => { setSetupDone(false); setQIdx(0); setAnswer(""); setSubmitted(false); setFeedback(null); setAiQuestions(null); setResumeText(""); setJobDesc(""); }, [stage]);

  async function handleInterviewFile(file: File) {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/zari/extract", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({})) as { text?: string };
      if (data.text) setResumeText(data.text);
    } catch { /* ignore */ }
  }

  async function startInterview() {
    setLoadingQs(true);
    try {
      const res = await fetch("/api/zari/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate-questions", stage, resumeText, jobDescription: jobDesc }),
      });
      const data = await res.json().catch(() => ({})) as { questions?: InterviewQuestion[] };
      if (data.questions?.length) setAiQuestions(data.questions);
    } catch { /* fall back to static */ }
    setLoadingQs(false);
    setSetupDone(true);
    setQIdx(0);
  }

  const QUESTIONS: InterviewQuestion[] = aiQuestions ?? STAGE_QUESTIONS[stage];

  async function submit() {
    if (!answer.trim() || isScoring) return;
    setIsScoring(true);
    setSubmitted(true);
    const q = QUESTIONS[qIdx];
    try {
      const res = await fetch("/api/zari/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "score-answer", question: q.q, answer, stage, category: q.cat, resumeText, jobDescription: jobDesc }),
      });
      const data = await res.json().catch(() => null) as InterviewFeedback | null;
      if (data && data.overallScore) setFeedback(data);
    } catch { /* use fallback */ }
    setIsScoring(false);
  }

  const fmt = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  /* ── Setup step ── */
  if (!setupDone) return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:620, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#0F172A,#1E3A8A)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.6" style={{ width:22, height:22 }}><circle cx="10" cy="6" r="3"/><path d="M3 17c0-3.866 3.134-6 7-6s7 2.134 7 6"/></svg>
          </div>
          <h1 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:8 }}>{SCREEN_INTERVIEW_META[stage].title}</h1>
          <p style={{ fontSize:14, color:"#68738A", lineHeight:1.6 }}>Give Zari your resume and the job you&apos;re targeting — she&apos;ll generate questions specific to you, not generic ones from a textbook.</p>
        </div>

        <input ref={interviewFileRef} type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleInterviewFile(f); e.target.value=""; }}/>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <label style={{ fontSize:12, fontWeight:700, color:"#0A0A0F" }}>Your resume <span style={{ color:"#A0AABF", fontWeight:400 }}>(optional but recommended)</span></label>
              <button onClick={()=>interviewFileRef.current?.click()} style={{ fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:7, border:"1px solid #E4E8F5", background:"#F5F7FF", color:"#4361EE", cursor:"pointer" }}>
                {resumeText ? "✓ Uploaded" : "Upload file"}
              </button>
            </div>
            <textarea
              style={{ width:"100%", minHeight:90, border:"1.5px solid #E4E8F5", borderRadius:10, padding:"9px 11px", fontSize:13, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"#FAFBFF", lineHeight:1.6 }}
              placeholder="Or paste your resume text here…"
              value={resumeText} onChange={e=>setResumeText(e.target.value)}
            />
          </div>

          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:16 }}>
            <label style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", display:"block", marginBottom:8 }}>Target job description <span style={{ color:"#A0AABF", fontWeight:400 }}>(optional)</span></label>
            <textarea
              style={{ width:"100%", minHeight:90, border:"1.5px solid #E4E8F5", borderRadius:10, padding:"9px 11px", fontSize:13, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"#FAFBFF", lineHeight:1.6 }}
              placeholder="Paste the job posting you're preparing for…"
              value={jobDesc} onChange={e=>setJobDesc(e.target.value)}
            />
          </div>
        </div>

        <button onClick={()=>void startInterview()} disabled={loadingQs} style={{ width:"100%", marginTop:18, fontSize:14, fontWeight:700, padding:"12px", borderRadius:12, border:"none", background:"#0F172A", color:"white", cursor:loadingQs?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:loadingQs?0.7:1 }}>
          {loadingQs ? (
            <><span style={{ width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"white",animation:"spin-slow 0.7s linear infinite",display:"block" }}/> Generating your questions…</>
          ) : "Start interview →"}
        </button>
        <p style={{ textAlign:"center", fontSize:11.5, color:"#A0AABF", marginTop:10 }}>You can also skip straight in — Zari will use stage defaults.</p>
      </div>
    </div>
  );

  const q = QUESTIONS[qIdx];

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:860, margin:"0 auto", padding:28 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:900, color:"#0A0A0F", letterSpacing:"-0.03em", marginBottom:3 }}>{SCREEN_INTERVIEW_META[stage].title}</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>{SCREEN_INTERVIEW_META[stage].subtitle}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:12, color:"#68738A" }}>Question {qIdx+1} of {QUESTIONS.length}</span>
            <div style={{ display:"flex", gap:4 }}>
              {QUESTIONS.map((_,i) => <div key={i} style={{ width:32, height:4, borderRadius:99, background:i<=qIdx?"#4361EE":"#E4E8F5", transition:"background 0.3s" }}/>)}
            </div>
          </div>
        </div>

        {/* Question card */}
        <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A8A)", borderRadius:18, padding:"22px 24px", marginBottom:20, boxShadow:"0 12px 32px rgba(15,23,42,0.25)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"rgba(255,255,255,0.5)" }}>
              {q.cat} · {q.level}
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["Situation","Task","Action","Result"].map(s => <span key={s} style={{ fontSize:9.5, fontWeight:600, padding:"2px 8px", borderRadius:99, background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.75)" }}>{s}</span>)}
            </div>
          </div>
          <p style={{ fontSize:15.5, fontWeight:600, color:"white", lineHeight:1.65 }}>{q.q}</p>
          <div style={{ marginTop:14, fontSize:12, color:"rgba(255,255,255,0.4)" }}>
            Tip: Aim for 2–3 minutes. Lead with the Situation, make the Result specific and measurable.
          </div>
        </div>

        {!submitted ? (
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:18, padding:22, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Your answer</p>
              <button onClick={() => { setIsRecording(r=>!r); if(isRecording) setRecTime(0); }} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, padding:"7px 16px", borderRadius:99, border:"none", cursor:"pointer", background:isRecording?"#FEF2F2":"#EEF2FF", color:isRecording?"#DC2626":"#4361EE" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:isRecording?"#DC2626":"#4361EE", animation:isRecording?"blink 0.7s step-end infinite":"none" }}/>
                {isRecording ? `Stop · ${fmt(recTime)}` : "Record voice"}
              </button>
            </div>

            {/* Voice waveform when recording */}
            {isRecording && (
              <div style={{ background:"#EEF2FF", borderRadius:12, padding:"14px 18px", marginBottom:14, display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#4361EE" }}>Recording…</span>
                <div style={{ display:"flex", gap:2, alignItems:"flex-end", height:24 }}>
                  {Array.from({length:24}).map((_,i) => <div key={i} style={{ width:3, borderRadius:99, background:"#4361EE", height:Math.random()*20+4, animation:`voice-wave ${0.4+Math.random()*0.4}s ease-in-out ${i*0.03}s infinite alternate` }}/>)}
                </div>
              </div>
            )}

            <textarea
              style={{ width:"100%", minHeight:160, border:"1.5px solid #E4E8F5", borderRadius:12, padding:"12px 14px", fontSize:14, lineHeight:1.7, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", transition:"border-color 0.2s" }}
              placeholder="Type your answer here, or click 'Record voice' to speak. Use Situation → Task → Action → Result."
              value={answer} onChange={e=>setAnswer(e.target.value)}
            />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
              <span style={{ fontSize:12, color:"#A0AABF" }}>{answer.split(" ").filter(Boolean).length} words · aim for 150–250</span>
              <button onClick={()=>void submit()} disabled={!answer.trim() || isScoring} style={{ fontSize:13.5, fontWeight:700, padding:"10px 24px", borderRadius:12, border:"none", background:answer.trim()&&!isScoring?"#4361EE":"#F1F5F9", color:answer.trim()&&!isScoring?"white":"#CBD5E1", cursor:answer.trim()&&!isScoring?"pointer":"default", boxShadow:answer.trim()&&!isScoring?"0 4px 16px rgba(67,97,238,0.32)":"none" }}>
                {isScoring ? "Scoring…" : "Get feedback →"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {isScoring && (
              <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:18, padding:32, marginBottom:14, textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:14 }}>
                  {[0,1,2].map(i=><div key={i} style={{ width:9,height:9,borderRadius:"50%",background:"#818CF8",animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
                </div>
                <p style={{ fontSize:14, fontWeight:600, color:"#4361EE" }}>Zari is scoring your answer…</p>
                <p style={{ fontSize:12, color:"#A0AABF", marginTop:5 }}>Analyzing STAR structure, impact clarity, and coaching opportunities</p>
              </div>
            )}
            {!isScoring && (
            <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:18, padding:22, marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Zari&apos;s feedback</p>
                <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:99, background:"#F0FFF4", border:"1px solid #BBF7D0" }}>
                  <span style={{ fontSize:20, fontWeight:900, color:"#16A34A" }}>{feedback?.overallScore ?? 79}</span>
                  <span style={{ fontSize:11, color:"#16A34A", fontWeight:600 }}>/ 100</span>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
                {(feedback?.dimensions ?? [
                  { label:"STAR Structure",   score:88 },
                  { label:"Evidence",         score:82 },
                  { label:"Impact clarity",   score:64 },
                  { label:"Concision",        score:58 },
                  { label:"Leadership signal",score:79 },
                  { label:"Stakeholder lens", score:74 },
                ]).map(s => {
                  const color = dimColor(s.score);
                  return (
                    <div key={s.label} style={{ background:"#FAFBFF", border:"1px solid #F1F5F9", borderRadius:10, padding:"10px 12px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                        <span style={{ fontSize:11.5, color:"#68738A" }}>{s.label}</span>
                        <span style={{ fontSize:13, fontWeight:800, color }}>{s.score}</span>
                      </div>
                      <Bar pct={s.score} color={color}/>
                    </div>
                  );
                })}
              </div>

              <div style={{ background:"#F5F7FF", borderRadius:12, padding:16, marginBottom:12 }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#4361EE", marginBottom:6 }}>Coaching note from Zari</p>
                <p style={{ fontSize:13, color:"#3451D1", lineHeight:1.65 }}>{feedback?.coachNote ?? "Strong structure overall. The gap is in your Result — make it specific with a number, timeline, or business outcome. Panels score Result twice as heavily as the other components."}</p>
              </div>

              <div style={{ background:"#F0FFF4", borderRadius:12, padding:"12px 16px" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#16A34A", marginBottom:5 }}>Suggested Result statement</p>
                <p style={{ fontSize:12.5, color:"#14532D", lineHeight:1.6, fontStyle:"italic" }}>&ldquo;{feedback?.suggestedResult ?? "The outcome was delivered 2 weeks ahead of schedule, which unblocked the next sprint and directly contributed to the Q3 launch target."}&rdquo;</p>
              </div>
            </div>
            )}
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>{setSubmitted(false);setAnswer("");setFeedback(null);}} style={{ flex:1, fontSize:13.5, fontWeight:600, padding:"12px", borderRadius:12, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>Try again</button>
              <button onClick={()=>{setQIdx(q=>(q+1)%QUESTIONS.length);setSubmitted(false);setAnswer("");setFeedback(null);}} style={{ flex:1, fontSize:13.5, fontWeight:700, padding:"12px", borderRadius:12, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.28)" }}>Next question →</button>
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
type LinkedInResult = {
  headline: string; about: string; skills: string[];
  scores: { recruiterVisibility: number; keywordDensity: number; profileStrength: number };
  previousScores: { recruiterVisibility: number; keywordDensity: number; profileStrength: number };
  issues: { headline: string; about: string; skills: string };
  missingKeywords: string[];
};

function ScreenLinkedIn({ stage }: { stage: CareerStage }) {
  const [tab,        setTab]        = useState<"headline"|"about"|"skills">("headline");
  const [inputMode,  setInputMode]  = useState(true);
  const [resumeText, setLIResumeText] = useState("");
  const [headline,   setHeadline]   = useState("");
  const [about,      setAbout]      = useState("");
  const [skills,     setSkills]     = useState("");
  const [optimizing, setOptimizing] = useState(false);
  const [result,     setResult]     = useState<LinkedInResult | null>(null);
  const [optErr,     setOptErr]     = useState("");
  const liFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setInputMode(true); setResult(null); setHeadline(""); setAbout(""); setSkills(""); setLIResumeText(""); }, [stage]);

  async function handleLIFile(file: File) {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/zari/extract", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({})) as { text?: string };
      if (data.text) setLIResumeText(data.text);
    } catch { /* ignore */ }
  }

  async function optimize() {
    if (optimizing) return;
    setOptErr("");
    setOptimizing(true);
    try {
      const res = await fetch("/api/zari/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline, about, skills, stage, resumeText }),
      });
      const data = await res.json().catch(() => null) as LinkedInResult | null;
      if (data && data.headline) {
        setResult(data);
        setInputMode(false);
      } else {
        setOptErr("Optimization failed — try again.");
      }
    } catch {
      setOptErr("Connection error — try again.");
    }
    setOptimizing(false);
  }

  async function copyToClipboard(text: string) {
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
  }

  const hasInput = !!(resumeText || headline || about || skills);

  if (inputMode) return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:660, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#0077B5,#00A0DC)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
            <svg viewBox="0 0 20 20" fill="white" style={{ width:26, height:26 }}><rect x="2" y="2" width="16" height="16" rx="3"/><path fill="#0077B5" d="M6 9v5M6 6.5v.5M9 14V11a2.5 2.5 0 015 0v3M9 11v3"/></svg>
          </div>
          <h1 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:8 }}>LinkedIn Optimizer</h1>
          <p style={{ fontSize:14, color:"#68738A", lineHeight:1.6, maxWidth:440, margin:"0 auto" }}>Upload your resume and paste your current LinkedIn sections. Zari will rewrite everything so recruiters actually find you.</p>
        </div>

        {optErr && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#991B1B" }}>{optErr}</div>}

        <input ref={liFileRef} type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleLIFile(f); e.target.value=""; }}/>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Resume upload — first and most important */}
          <div style={{ background:"white", border:`1.5px solid ${resumeText?"#BBF7D0":"#E4E8F5"}`, borderRadius:14, padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:resumeText?8:0 }}>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:2 }}>Resume <span style={{ fontSize:11, fontWeight:500, color:"#4361EE", background:"#EEF2FF", padding:"1px 7px", borderRadius:99, marginLeft:6 }}>Recommended</span></p>
                <p style={{ fontSize:11.5, color:"#68738A" }}>Helps Zari write your LinkedIn the way it should read based on your actual experience</p>
              </div>
              <button onClick={()=>liFileRef.current?.click()} style={{ flexShrink:0, marginLeft:12, fontSize:12, fontWeight:700, padding:"7px 14px", borderRadius:9, border:`1px solid ${resumeText?"#BBF7D0":"#E4E8F5"}`, background:resumeText?"#F0FFF4":"#F5F7FF", color:resumeText?"#16A34A":"#4361EE", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                {resumeText ? "✓ Loaded" : "Upload PDF / DOCX"}
              </button>
            </div>
            {resumeText && <p style={{ fontSize:11, color:"#16A34A", marginTop:4 }}>Resume text extracted ({resumeText.length} chars) — Zari will use this to inform every rewrite.</p>}
          </div>

          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", display:"block", marginBottom:5 }}>Current Headline <span style={{ color:"#A0AABF", fontWeight:400 }}>(optional)</span></label>
            <input
              style={{ width:"100%", border:"1.5px solid #CBD5E1", borderRadius:10, padding:"10px 12px", fontSize:13.5, color:"#1E2235", outline:"none", fontFamily:"inherit", boxSizing:"border-box", background:"white" }}
              placeholder="e.g. Operations Lead at FinCo Ltd"
              value={headline} onChange={e=>setHeadline(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", display:"block", marginBottom:5 }}>Current About section <span style={{ color:"#A0AABF", fontWeight:400 }}>(optional)</span></label>
            <textarea
              style={{ width:"100%", minHeight:100, border:"1.5px solid #CBD5E1", borderRadius:10, padding:"10px 12px", fontSize:13.5, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"white", lineHeight:1.6 }}
              placeholder="Paste your About section…"
              value={about} onChange={e=>setAbout(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", display:"block", marginBottom:5 }}>Current Skills <span style={{ color:"#A0AABF", fontWeight:400 }}>(comma-separated, optional)</span></label>
            <textarea
              style={{ width:"100%", minHeight:60, border:"1.5px solid #CBD5E1", borderRadius:10, padding:"10px 12px", fontSize:13.5, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"white", lineHeight:1.6 }}
              placeholder="e.g. Operations, Supply Chain, Process Design…"
              value={skills} onChange={e=>setSkills(e.target.value)}
            />
          </div>
        </div>

        <button onClick={()=>void optimize()} disabled={optimizing || !hasInput} style={{ width:"100%", marginTop:18, fontSize:14, fontWeight:700, padding:"12px", borderRadius:12, border:"none", background:!optimizing&&hasInput?"#0077B5":"#E4E8F5", color:!optimizing&&hasInput?"white":"#A0AABF", cursor:!optimizing&&hasInput?"pointer":"default", boxShadow:!optimizing&&hasInput?"0 4px 16px rgba(0,119,181,0.3)":"none", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          {optimizing ? (
            <><span style={{ width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.4)",borderTopColor:"white",animation:"spin-slow 0.7s linear infinite",display:"block" }}/> Optimizing…</>
          ) : "Optimize with Zari →"}
        </button>
      </div>
    </div>
  );

  const sc = result?.scores ?? { recruiterVisibility:91, keywordDensity:84, profileStrength:88 };
  const prev = result?.previousScores ?? { recruiterVisibility:61, keywordDensity:54, profileStrength:72 };
  const issues = result?.issues ?? { headline:"No role-signal for target position.", about:"Missing keywords and quantified outcomes.", skills:"No skills matching target role requirements." };
  const keywords = result?.missingKeywords ?? ["Product Strategy (94%)","Roadmap (91%)","OKRs (88%)","Discovery (85%)","Agile (82%)","GTM (74%)"];

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:960, margin:"0 auto", padding:28 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", marginBottom:4 }}>LinkedIn Optimizer</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>Zari rewrote your profile to maximize recruiter visibility</p>
          </div>
          <button onClick={()=>setInputMode(true)} style={{ fontSize:12, fontWeight:600, padding:"8px 16px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>← Re-analyze</button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:22 }}>
          {[
            { label:"Recruiter visibility", score:sc.recruiterVisibility, prev:prev.recruiterVisibility, color:"#16A34A" },
            { label:"Keyword density",      score:sc.keywordDensity,      prev:prev.keywordDensity,      color:"#4361EE" },
            { label:"Profile strength",     score:sc.profileStrength,     prev:prev.profileStrength,     color:"#0284C7" },
          ].map(s => (
            <div key={s.label} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"16px 18px", display:"flex", gap:14, alignItems:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <ScoreRing score={s.score} color={s.color} size={56}/>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>{s.label}</p>
                <p style={{ fontSize:11, color:"#16A34A", fontWeight:600, marginTop:2 }}>↑ {s.score - s.prev} pts after rewrite</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:4, background:"white", border:"1px solid #E4E8F5", borderRadius:12, padding:4, width:"fit-content", marginBottom:18 }}>
          {(["headline","about","skills"] as const).map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{ padding:"6px 20px", borderRadius:9, border:"none", cursor:"pointer", fontSize:12.5, fontWeight:600, background:tab===t?"#0077B5":"transparent", color:tab===t?"white":"#68738A", textTransform:"capitalize" }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", color:"#DC2626", letterSpacing:"0.1em", marginBottom:12 }}>Current {tab}</p>
            {tab==="headline" && <p style={{ fontSize:14.5, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 12px" }}>{headline || "Operations Lead at FinCo Ltd"}</p>}
            {tab==="about"    && <p style={{ fontSize:13, color:"#1E2235", lineHeight:1.65, background:"#FAFBFF", border:"1px solid #E4E8F5", borderRadius:10, padding:"10px 12px" }}>{about || "Experienced operations professional with 4 years driving cross-functional process improvements at scale."}</p>}
            {tab==="skills"   && <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{(skills ? skills.split(",").map(s=>s.trim()).filter(Boolean) : ["Operations","Supply Chain","Process Design","Stakeholder Management"]).map(s=><span key={s} style={{ fontSize:11, padding:"3px 10px", borderRadius:99, background:"#F5F7FF", border:"1px solid #E4E8F5", color:"#68738A" }}>{s}</span>)}</div>}
            <div style={{ marginTop:14, fontSize:11, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"9px 11px" }}>
              ⚠ {issues[tab]}
            </div>
          </div>

          <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:16, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", color:"#16A34A", letterSpacing:"0.1em", marginBottom:12 }}>Zari&apos;s rewrite</p>
            {tab==="headline" && <p style={{ fontSize:14.5, fontWeight:600, color:"#14532D", background:"white", border:"1px solid #BBF7D0", borderRadius:10, padding:"10px 12px", lineHeight:1.5 }}>{result?.headline ?? "Product-Minded Leader | Operations → Senior PM | Cross-Functional Strategy · Measurable Impact"}</p>}
            {tab==="about"    && <p style={{ fontSize:13, color:"#14532D", lineHeight:1.65, background:"white", border:"1px solid #BBF7D0", borderRadius:10, padding:"10px 12px" }}>{result?.about ?? "Product-minded operations leader with 4 years driving cross-functional execution. I ship measurable outcomes. Transitioning to Senior PM."}</p>}
            {tab==="skills"   && <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{(result?.skills ?? ["Product Strategy","Roadmap","OKRs","Discovery","Agile","GTM","Operations","Supply Chain","Stakeholder Management","Cross-functional","Process Design","Data Analysis"]).map(s=><span key={s} style={{ fontSize:11, padding:"3px 10px", borderRadius:99, background:"white", border:"1px solid #BBF7D0", color:"#14532D" }}>{s}</span>)}</div>}
            <button onClick={()=>void copyToClipboard(tab==="headline"?(result?.headline??""):tab==="about"?(result?.about??""):(result?.skills??"").toString())} style={{ marginTop:14, width:"100%", fontSize:13, fontWeight:700, padding:"10px", borderRadius:10, border:"none", background:"#16A34A", color:"white", cursor:"pointer" }}>Copy to LinkedIn →</button>
          </div>
        </div>

        <div style={{ marginTop:18, background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20 }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:10 }}>Missing keywords (found in 68%+ of job descriptions for your target role)</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {keywords.map(k => (
              <span key={k} style={{ fontSize:11.5, fontWeight:600, padding:"4px 12px", borderRadius:99, background:"#FEF3C7", color:"#92400E", border:"1px solid #FDE68A" }}>{k}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: DOCUMENTS — drag-drop vault
═══════════════════════════════════════════════════ */
function ScreenDocuments() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleDrop() {
    setDragging(false);
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  }

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:840, margin:"0 auto", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", marginBottom:4 }}>My Documents</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>Zari uses these automatically in every session — always up to date</p>
          </div>
          <button style={{ fontSize:13, fontWeight:700, padding:"9px 18px", borderRadius:10, border:"none", background:"#4361EE", color:"white", cursor:"pointer", display:"flex", alignItems:"center", gap:7, boxShadow:"0 4px 14px rgba(67,97,238,0.28)" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:14,height:14 }}><path d="M10 3v12M4 9l6-6 6 6"/></svg>
            Upload document
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();handleDrop();}}
          style={{ border:`2px dashed ${dragging?"#4361EE":"#CBD5E1"}`, borderRadius:18, padding:40, textAlign:"center", marginBottom:22, cursor:"pointer", background:dragging?"#EEF2FF":"white", transition:"all 0.2s", position:"relative" }}
        >
          {uploading ? (
            <div>
              <div style={{ width:44, height:44, borderRadius:12, background:"#EEF2FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", animation:"sphere-breathe 1s ease-in-out infinite" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:22,height:22,animation:"spin-slow 1.5s linear infinite" }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <p style={{ fontSize:14, fontWeight:600, color:"#4361EE" }}>Uploading &amp; indexing…</p>
            </div>
          ) : (
            <>
              <div style={{ width:44, height:44, borderRadius:12, background:"#F5F7FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:22,height:22 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p style={{ fontSize:14, fontWeight:600, color:"#0A0A0F", marginBottom:4 }}>Drop resume, cover letter, or LinkedIn export here</p>
              <p style={{ fontSize:12.5, color:"#A0AABF" }}>PDF · DOCX · TXT · LinkedIn PDF export</p>
            </>
          )}
        </div>

        {/* File list */}
        {[
          { name:"Resume_PM_v3.pdf",           type:"Resume",        size:"82 KB", date:"Today",      score:89, color:"#4361EE", bg:"#EEF2FF", status:"Analyzed · Used in 5 sessions" },
          { name:"LinkedIn_profile_export.pdf", type:"LinkedIn",      size:"34 KB", date:"2 days ago", score:91, color:"#16A34A", bg:"#F0FFF4", status:"Analyzed · Optimized" },
          { name:"Cover_letter_Notion.docx",    type:"Cover letter",  size:"12 KB", date:"Last week",  score:null, color:"#8B5CF6", bg:"#F5F3FF", status:"Indexed · Not reviewed yet" },
        ].map(doc => (
          <div key={doc.name} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"14px 18px", marginBottom:10, display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:doc.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={doc.color} strokeWidth="1.8" style={{ width:20,height:20 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:13.5, fontWeight:700, color:"#0A0A0F", marginBottom:2 }}>{doc.name}</p>
              <p style={{ fontSize:11, color:"#68738A" }}>{doc.type} · {doc.size} · {doc.date} · {doc.status}</p>
            </div>
            {doc.score && (
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <ScoreRing score={doc.score} color={doc.color} size={44}/>
              </div>
            )}
            <div style={{ display:"flex", gap:7 }}>
              <button style={{ fontSize:11.5, fontWeight:600, padding:"6px 12px", borderRadius:8, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>View</button>
              <button style={{ fontSize:11.5, fontWeight:600, padding:"6px 12px", borderRadius:8, border:"none", background:"#4361EE", color:"white", cursor:"pointer" }}>Review with Zari</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const STAGE_TASKS: Record<CareerStage, { text:string; cat:string; pri:string }[]> = {
  "job-search": [
    { text:"Reframe supply chain project as a product initiative in resume",       cat:"Resume",     pri:"high" },
    { text:"Write 3 STAR stories highlighting cross-functional influence",         cat:"Interview",  pri:"high" },
    { text:"Update LinkedIn headline to product-focused positioning",              cat:"LinkedIn",   pri:"high" },
    { text:"Add 8 missing PM keywords to LinkedIn profile",                        cat:"LinkedIn",   pri:"med"  },
    { text:"Apply to 3 target Senior PM roles at Series B–D tech companies",       cat:"Job Search", pri:"high" },
    { text:"Practice the 'stakeholder resistance' question until score ≥ 85",      cat:"Interview",  pri:"high" },
    { text:"Research top 5 target companies — build tailored talking points",      cat:"Job Search", pri:"med"  },
    { text:"Book follow-up session to practice PM case interview",                 cat:"Session",    pri:"low"  },
  ],
  "promotion": [
    { text:"Document 3 scope-expansion stories with business impact numbers",      cat:"Case",       pri:"high" },
    { text:"Identify 2 executive sponsors and schedule a 30-min conversation",     cat:"Sponsorship",pri:"high" },
    { text:"Write the promotion self-review draft with Zari's framework",          cat:"Docs",       pri:"high" },
    { text:"Practice the manager promotion pitch until it flows naturally",        cat:"Session",    pri:"high" },
    { text:"Map your work to the next-level rubric — identify remaining gaps",     cat:"Planning",   pri:"med"  },
    { text:"Get a written recommendation from your cross-functional stakeholder",  cat:"Sponsorship",pri:"med"  },
    { text:"Schedule the formal promotion conversation with your manager",         cat:"Milestone",  pri:"low"  },
  ],
  "salary": [
    { text:"Research market rate on Levels.fyi, Glassdoor, and Blind",            cat:"Research",   pri:"high" },
    { text:"Build your value case: 3 impact stories with dollar/% outcomes",      cat:"Preparation",pri:"high" },
    { text:"Practice the ask conversation with Zari — role-play 3 scenarios",     cat:"Session",    pri:"high" },
    { text:"Prepare counter-offer response for 3 likely pushbacks",               cat:"Preparation",pri:"med"  },
    { text:"Write the salary ask email draft for async negotiation",              cat:"Docs",       pri:"med"  },
    { text:"Decide your walk-away number and alternatives (competing offer etc.)", cat:"Planning",   pri:"med"  },
  ],
  "career-change": [
    { text:"Rewrite resume to lead with transferable skills for new industry",     cat:"Resume",     pri:"high" },
    { text:"Build your 'why I'm switching' narrative — practice out loud 5x",     cat:"Interview",  pri:"high" },
    { text:"Target 10 roles that are transition-friendly (no 'must have X years')",cat:"Job Search", pri:"high" },
    { text:"Update LinkedIn to signal the new direction clearly",                  cat:"LinkedIn",   pri:"high" },
    { text:"Identify 3 people in target industry for informational interviews",    cat:"Network",    pri:"med"  },
    { text:"Complete 1 relevant project or course to show commitment to pivot",    cat:"Skills",     pri:"med"  },
    { text:"Draft a cover letter narrative that connects past to future clearly",   cat:"Docs",       pri:"low"  },
  ],
  "leadership": [
    { text:"Define your leadership brand: 3 words your team would use about you",  cat:"Brand",      pri:"high" },
    { text:"Practice the board presentation — time it, cut what's over 12 min",   cat:"Session",    pri:"high" },
    { text:"Write 2 strategic leadership stories using the SPEAR framework",       cat:"Narrative",  pri:"high" },
    { text:"Get skip-level feedback on communication clarity (ask directly)",      cat:"Feedback",   pri:"med"  },
    { text:"Identify 3 ways you can create more visibility with senior leadership",cat:"Visibility", pri:"med"  },
    { text:"Restructure 1 recurring update email to lead with insight not status", cat:"Comms",      pri:"med"  },
    { text:"Book a session to practice the difficult conversation you're avoiding",cat:"Session",    pri:"low"  },
  ],
};

/* ═══════════════════════════════════════════════════
   SCREEN: ACTION PLAN
═══════════════════════════════════════════════════ */
type PlanTask = { text: string; cat: string; pri: string };

function ScreenPlan({ stage }: { stage: CareerStage }) {
  const [done,        setDone]        = useState<Set<number>>(new Set([0]));
  const [aiTasks,     setAiTasks]     = useState<PlanTask[] | null>(null);
  const [aiCoachNote, setAiCoachNote] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(false);

  // Fetch AI plan on mount / stage change
  useEffect(() => {
    setDone(new Set([0]));
    setAiTasks(null);
    setAiCoachNote(null);
    setPlanLoading(true);
    fetch("/api/zari/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    })
      .then(r => r.json())
      .then((data: { tasks?: PlanTask[]; coachNote?: string }) => {
        if (data.tasks?.length) {
          setAiTasks(data.tasks);
          setAiCoachNote(data.coachNote ?? null);
        }
      })
      .catch(() => { /* fall back to static tasks */ })
      .finally(() => setPlanLoading(false));
  }, [stage]);

  const TASKS = aiTasks ?? STAGE_TASKS[stage];
  const pct = Math.round((done.size/TASKS.length)*100);

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:28 }}>
        {planLoading && (
          <div style={{ display:"flex", alignItems:"center", gap:10, background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:12, padding:"12px 16px", marginBottom:18, fontSize:13, color:"#4361EE", fontWeight:600 }}>
            <span style={{ width:14,height:14,borderRadius:"50%",border:"2px solid rgba(67,97,238,0.3)",borderTopColor:"#4361EE",animation:"spin-slow 0.7s linear infinite",display:"block",flexShrink:0 }}/>
            Zari is generating your personalized plan…
          </div>
        )}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", margin:0 }}>Action Plan</h1>
              <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:99, background: STAGE_META[stage].bg, color: STAGE_META[stage].color, border:`1px solid ${STAGE_META[stage].color}30` }}>{STAGE_ICONS[stage]} {STAGE_META[stage].label}</span>
              {aiTasks && <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:"#F0FFF4", color:"#16A34A", border:"1px solid #BBF7D0" }}>AI-generated</span>}
            </div>
            <p style={{ fontSize:13, color:"#68738A" }}>Zari personalizes this based on your profile and session history</p>
          </div>
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:12, padding:"10px 18px", display:"flex", gap:16, alignItems:"center" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#4361EE" }}>{done.size}</div>
              <div style={{ fontSize:10, color:"#A0AABF" }}>Done</div>
            </div>
            <div style={{ width:1, height:32, background:"#E4E8F5" }}/>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#0A0A0F" }}>{TASKS.length - done.size}</div>
              <div style={{ fontSize:10, color:"#A0AABF" }}>Remaining</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, marginBottom:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Your progress</span>
            <span style={{ fontSize:14, fontWeight:800, color:"#4361EE" }}>{pct}%</span>
          </div>
          <Bar pct={pct} color="#4361EE" h={10}/>
          <div style={{ display:"flex", gap:14, marginTop:10 }}>
            {["high","med","low"].map(p => {
              const total = TASKS.filter(t=>t.pri===p).length;
              const doneC = TASKS.filter((t,i)=>t.pri===p&&done.has(i)).length;
              return <span key={p} style={{ fontSize:11.5, color:"#68738A" }}>
                <strong style={{ color:p==="high"?"#DC2626":p==="med"?"#D97706":"#4361EE" }}>{doneC}/{total}</strong> {p} priority
              </span>;
            })}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {TASKS.map((task, i) => {
            const isDone = done.has(i);
            const pc = task.pri==="high"?"#DC2626":task.pri==="med"?"#D97706":"#4361EE";
            const pb = task.pri==="high"?"#FEF2F2":task.pri==="med"?"#FFF7ED":"#EEF2FF";
            return (
              <button key={i} onClick={()=>setDone(d=>{const n=new Set(d);n.has(i)?n.delete(i):n.add(i);return n;})}
                style={{ display:"flex", alignItems:"center", gap:12, background:"white", border:`1px solid ${isDone?"#BBF7D0":"#E4E8F5"}`, borderRadius:14, padding:"12px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${isDone?"#16A34A":"#CBD5E1"}`, background:isDone?"#F0FFF4":"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {isDone && <svg viewBox="0 0 12 12" fill="none" style={{ width:10,height:10 }}><path d="M1.5 6l3 3 6-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                </div>
                <span style={{ flex:1, fontSize:13.5, color:isDone?"#A0AABF":"#0A0A0F", textDecoration:isDone?"line-through":"none", lineHeight:1.4 }}>{task.text}</span>
                <Tag text={task.cat}  color="#68738A" bg="#F5F7FF"/>
                <Tag text={task.pri}  color={pc} bg={pb}/>
              </button>
            );
          })}
        </div>

        {/* Zari insight */}
        <div style={{ marginTop:20, background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid rgba(67,97,238,0.15)", borderRadius:16, padding:20 }}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:14, fontWeight:800, color:"white" }}>Z</div>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#4361EE", marginBottom:6 }}>Zari&apos;s coaching note</p>
              <p style={{ fontSize:13, color:"#3451D1", lineHeight:1.65 }}>{aiCoachNote ?? "Your highest-leverage action this week is completing the high-priority tasks. These will create the most momentum — check them off one by one and come back to Zari when you're ready to practice."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PORTAL SHELL
═══════════════════════════════════════════════════ */
export function ZariPortal() {
  const [screen, setScreen] = useState<Screen>("session");
  const [stage, setStage] = useState<CareerStage>("job-search");
  const [stageOpen, setStageOpen] = useState(false);

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"#FAFBFF", fontFamily:"var(--font-geist-sans,Inter,system-ui,sans-serif)" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes bubble-appear { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes voice-wave { from{height:3px} to{height:100%} }
        @keyframes sphere-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aurora-pulse { 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes neural-orbit-a { from{transform:rotate(0deg) translate(28px)} to{transform:rotate(360deg) translate(28px)} }
        @keyframes neural-orbit-b { from{transform:rotate(0deg) translate(20px)} to{transform:rotate(360deg) translate(20px)} }
        @keyframes ring-pulse { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        @keyframes listen-ripple { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.8);opacity:0} }
        @keyframes eye-glow { 0%,100%{opacity:0.9} 50%{opacity:0.6} }
        @keyframes aurora-a { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,10px) scale(1.05)} }
        @keyframes aurora-b { 0%,100%{transform:translate(0,0) scale(1)} 60%{transform:translate(-20px,15px) scale(1.04)} }
        @keyframes aurora-c { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(10px,-10px) scale(1.03)} }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ width:220, flexShrink:0, background:"white", borderRight:"1px solid #E4E8F5", display:"flex", flexDirection:"column", padding:"0 0 16px 0" }}>
        {/* Logo */}
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid #F1F5F9" }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
            <ZariLogo size={26}/>
            <span style={{ fontSize:16, fontWeight:800, color:"#0A0A0F", letterSpacing:"-0.03em" }}>Zari</span>
          </Link>
        </div>

        {/* User chip */}
        <div style={{ margin:"12px 10px 8px", background:"#F5F7FF", borderRadius:12, padding:"10px 12px", display:"flex", gap:10, alignItems:"center" }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"white", flexShrink:0 }}>S</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>Steve N.</div>
            <div style={{ fontSize:10.5, color:"#68738A", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Free plan</div>
          </div>
        </div>

        {/* Career Stage Selector */}
        <div style={{ margin:"0 10px 10px", position:"relative" }}>
          <button
            onClick={() => setStageOpen(o => !o)}
            style={{
              width:"100%", display:"flex", alignItems:"center", gap:8,
              padding:"9px 11px", borderRadius:11,
              border:`1.5px solid ${STAGE_META[stage].color}50`,
              background: STAGE_META[stage].bg,
              cursor:"pointer", fontSize:12.5, fontWeight:700,
              color: STAGE_META[stage].color,
              transition:"all 0.15s",
            }}
          >
            <span style={{ display:"flex", alignItems:"center" }}>{STAGE_ICONS[stage]}</span>
            <span style={{ flex:1, textAlign:"left" }}>{STAGE_META[stage].label}</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:12, height:12, transition:"transform 0.2s", transform: stageOpen ? "rotate(180deg)" : "rotate(0)" }}><path d="M4 6l4 4 4-4"/></svg>
          </button>

          {/* Dropdown */}
          {stageOpen && (
            <div style={{
              position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:50,
              background:"white", borderRadius:12, border:"1px solid #E4E8F5",
              boxShadow:"0 8px 32px rgba(0,0,0,0.12)", overflow:"hidden",
              animation:"bubble-appear 0.2s ease",
            }}>
              {(Object.entries(STAGE_META) as [CareerStage, typeof STAGE_META[CareerStage]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => { setStage(key); setStageOpen(false); setScreen("session"); }}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", gap:8,
                    padding:"9px 12px", border:"none", cursor:"pointer", textAlign:"left",
                    background: stage === key ? meta.bg : "white",
                    fontSize:12.5, fontWeight: stage === key ? 700 : 500,
                    color: stage === key ? meta.color : "#1E2235",
                    transition:"background 0.1s",
                  }}
                >
                  <span style={{ display:"flex", alignItems:"center", color: stage === key ? meta.color : "#68738A" }}>{STAGE_ICONS[key]}</span>
                  {meta.label}
                  {stage === key && <svg viewBox="0 0 16 16" fill={meta.color} style={{ width:12,height:12,marginLeft:"auto" }}><path d="M3 8l4 4 6-6" stroke={meta.color} strokeWidth="2.2" fill="none"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"0 8px 0" }}>
          {getNav(stage).map(n => (
            <button key={n.id} onClick={()=>setScreen(n.id)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 10px", borderRadius:10, border:"none", cursor:"pointer", textAlign:"left", marginBottom:2, background:screen===n.id?STAGE_META[stage].bg:"transparent", color:screen===n.id?STAGE_META[stage].color:"#68738A", fontWeight:screen===n.id?700:500, fontSize:13.5, transition:"all 0.15s" }}>
              {n.icon}
              {n.label}
              {n.id==="session" && <span style={{ marginLeft:"auto", fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:STAGE_META[stage].color, color:"white" }}>Live</span>}
            </button>
          ))}
        </nav>

        {/* Bottom: upgrade */}
        <div style={{ margin:"0 10px", background:"linear-gradient(135deg,#4361EE,#818CF8)", borderRadius:14, padding:"14px 14px", color:"white" }}>
          <div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>Unlock Pro</div>
          <div style={{ fontSize:11, opacity:0.75, marginBottom:10, lineHeight:1.4 }}>Unlimited sessions, priority coaching, resume downloads</div>
          <button style={{ width:"100%", fontSize:12, fontWeight:700, padding:"7px", borderRadius:8, border:"none", background:"white", color:"#4361EE", cursor:"pointer" }}>Upgrade →</button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {/* Top bar */}
        <div style={{ flexShrink:0, height:56, background:"white", borderBottom:"1px solid #E4E8F5", display:"flex", alignItems:"center", padding:"0 24px", gap:16 }}>
          <h2 style={{ fontSize:14.5, fontWeight:700, color:"#0A0A0F" }}>
            {getNav(stage).find(n=>n.id===screen)?.label}
          </h2>
          <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center" }}>
            <button style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:9, border:"1px solid #E4E8F5", background:"#FAFBFF", color:"#68738A", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:14,height:14 }}><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 10a2 2 0 110-4 2 2 0 010 4z"/></svg>
              Help
            </button>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:9, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>Sign out</button>
            </form>
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex:1, overflow:"hidden" }}>
          {screen==="session"   && <ScreenSession   stage={stage}/>}
          {screen==="resume"    && <ScreenResume    stage={stage}/>}
          {screen==="interview" && <ScreenInterview stage={stage}/>}
          {screen==="linkedin"  && <ScreenLinkedIn stage={stage}/>}
          {screen==="documents" && <ScreenDocuments/>}
          {screen==="plan"      && <ScreenPlan      stage={stage}/>}
        </div>
      </main>
    </div>
  );
}
