"use client";

import { useState } from "react";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatarDemo } from "@/components/zari-avatar";

type PreviewScreen = "session" | "resume" | "interview" | "linkedin" | "plan";

const ACCENT = "#2563EB";
const BG     = "#F8FAFC";
const CARD   = "#FFFFFF";
const BD     = "#E2E8F0";
const TEXT   = "#0F172A";
const TEXT2  = "#64748B";
const TEXT3  = "#94A3B8";
const RAISE  = "#F1F5F9";

/* ─── Stage selector (static, decorative) ─── */
function StagePill() {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:7,
      padding:"8px 11px", borderRadius:9, border:`1px solid ${BD}`,
      background:RAISE, fontSize:12.5, fontWeight:700, color:TEXT,
    }}>
      <svg viewBox="0 0 16 16" fill="none" stroke={ACCENT} strokeWidth="1.8" style={{ width:13,height:13,flexShrink:0 }}>
        <circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/>
      </svg>
      <span style={{ flex:1 }}>Job Search</span>
      <svg viewBox="0 0 16 16" fill="none" stroke={TEXT3} strokeWidth="2" style={{ width:10,height:10, flexShrink:0 }}>
        <path d="M4 6l4 4 4-4"/>
      </svg>
    </div>
  );
}

/* ─── Session / Chat ─── */
function PreviewSession() {
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:BG }}>
      <div style={{ background:CARD, borderBottom:`1px solid ${BD}`, padding:"16px 18px 12px", display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:12 }}>
          <span style={{ fontSize:9, fontWeight:700, color:"#16A34A", padding:"3px 9px", borderRadius:99, background:"#F0FFF4", border:"1px solid #BBF7D0", display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#22C55E", animation:"blink 1.1s ease-in-out infinite", display:"inline-block" }} />Live Session
          </span>
          <span style={{ fontSize:9, color:TEXT3, fontFamily:"monospace" }}>01:14</span>
        </div>
        <ZariAvatarDemo size={88} />
        <p style={{ marginTop:14, fontSize:12, fontWeight:600, color:TEXT }}>Zari <span style={{ fontWeight:400, color:TEXT2 }}>— AI Career Coach</span></p>
        <div style={{ marginTop:9, maxWidth:300, background:RAISE, border:`1px solid ${BD}`, borderRadius:"4px 12px 12px 12px", padding:"8px 11px", fontSize:11.5, lineHeight:1.6, color:TEXT }}>
          &ldquo;Your resume numbers are landing. Let&apos;s build the same specificity into your interview stories — I&apos;ll run the behavioral question a real panel would use.&rdquo;
        </div>
        <div style={{ marginTop:9, display:"flex", flexWrap:"wrap", justifyContent:"center", gap:5 }}>
          {["Practice a PM interview Q","Rewrite my resume bullet","What should I work on?"].map(p => (
            <span key={p} style={{ fontSize:9.5, fontWeight:500, color:ACCENT, padding:"3px 10px", borderRadius:99, background:"#EFF6FF", border:`1px solid ${ACCENT}30` }}>{p}</span>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 14px" }}>
        {[
          { role:"coach", text:"Your ops background is a real differentiator. Let's build a PM narrative around it." },
          { role:"user",  text:"I led a supply chain redesign — 5 teams, exec sign-off, 22% improvement." },
          { role:"coach", text:"That's a product initiative with impact numbers. Here's how we frame it for a Senior PM panel…" },
        ].map((m, i) => (
          <div key={i} style={{ display:"flex", gap:7, marginBottom:9, flexDirection:m.role==="user"?"row-reverse":"row" }}>
            <div style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, background:m.role==="coach"?`linear-gradient(135deg,${ACCENT},#60A5FA)`:"#E4E8F5", color:m.role==="coach"?"white":TEXT2 }}>
              {m.role==="coach"?"Z":"S"}
            </div>
            <div style={{ maxWidth:"75%", padding:"7px 10px", fontSize:11, lineHeight:1.55, borderRadius:m.role==="coach"?"3px 11px 11px 11px":"11px 3px 11px 11px", background:m.role==="coach"?CARD:ACCENT, color:m.role==="coach"?TEXT:"white", border:m.role==="coach"?`1px solid ${BD}`:"none" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"8px 10px", borderTop:`1px solid ${BD}`, background:CARD, flexShrink:0 }}>
        <div style={{ display:"flex", gap:6, background:RAISE, border:`1px solid ${BD}`, borderRadius:10, padding:"6px 8px 6px 11px", alignItems:"center" }}>
          <span style={{ fontSize:11, color:TEXT3, flex:1 }}>Ask Zari anything…</span>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"#EFF6FF", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg viewBox="0 0 16 16" fill="none" stroke={ACCENT} strokeWidth="1.8" style={{ width:11,height:11 }}><path d="M8 1a2.5 2.5 0 00-2.5 2.5v4a2.5 2.5 0 005 0V3.5A2.5 2.5 0 008 1z"/><path d="M3.5 8v.5a4.5 4.5 0 009 0V8"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Resume Review ─── */
function PreviewResume() {
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:BG }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div>
          <p style={{ fontSize:13, fontWeight:700, color:TEXT }}>Resume Review</p>
          <p style={{ fontSize:10, color:TEXT2 }}>Resume_PM_v3.pdf · Just analyzed</p>
        </div>
        <button style={{ fontSize:10, fontWeight:600, background:ACCENT, color:"white", border:"none", borderRadius:7, padding:"5px 10px", cursor:"pointer" }}>Download →</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6, marginBottom:12 }}>
        {[{l:"Overall",s:89,c:ACCENT},{l:"ATS",s:91,c:"#16A34A"},{l:"Impact",s:84,c:"#0284C7"},{l:"Clarity",s:87,c:"#7C3AED"}].map(sc => (
          <div key={sc.l} style={{ background:CARD, border:`1px solid ${BD}`, borderRadius:10, padding:"8px", textAlign:"center" }}>
            <p style={{ fontSize:17, fontWeight:800, color:sc.c }}>{sc.s}</p>
            <p style={{ fontSize:9, color:TEXT2 }}>{sc.l}</p>
            <div style={{ height:3, borderRadius:99, background:RAISE, marginTop:4 }}><div style={{ width:`${sc.s}%`, height:"100%", background:sc.c, borderRadius:99 }} /></div>
          </div>
        ))}
      </div>
      {[
        { t:"warn", text:"5 bullets are task-focused with no impact numbers — rewrite with metrics." },
        { t:"warn", text:"Summary missing product keywords — ATS will flag for PM roles." },
        { t:"ok",   text:"Education section clean and well-structured." },
      ].map((f,i) => (
        <div key={i} style={{ display:"flex", gap:7, background:f.t==="warn"?"#FEF2F2":"#F0FFF4", border:`1px solid ${f.t==="warn"?"#FECACA":"#BBF7D0"}`, borderRadius:8, padding:"7px 9px", marginBottom:5 }}>
          <span style={{ fontSize:11 }}>{f.t==="warn"?"⚠️":"✅"}</span>
          <p style={{ fontSize:10.5, color:f.t==="warn"?"#991B1B":"#14532D", lineHeight:1.5 }}>{f.text}</p>
        </div>
      ))}
      <p style={{ fontSize:10, fontWeight:700, color:TEXT2, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:10, marginBottom:5 }}>Zari&apos;s rewrite</p>
      <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:10, padding:10 }}>
        <p style={{ fontSize:10.5, color:"#14532D", lineHeight:1.6 }}>Led end-to-end supply chain redesign · 5 business units · 22% faster fulfilment · £340K cost reduction · exec buy-in secured in 3 weeks.</p>
      </div>
    </div>
  );
}

/* ─── Interview ─── */
function PreviewInterview() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:BG }}>
      <p style={{ fontSize:13, fontWeight:700, color:TEXT, marginBottom:10 }}>Interview Practice</p>
      <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A8A)", borderRadius:12, padding:12, color:"white", marginBottom:12 }}>
        <p style={{ fontSize:8.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", opacity:.55, marginBottom:5 }}>Q2 of 6 · Behavioral · Senior PM</p>
        <p style={{ fontSize:11.5, fontWeight:600, lineHeight:1.55 }}>Tell me about a time you led a cross-functional initiative that faced resistance. What was your approach?</p>
        <div style={{ marginTop:8, display:"flex", gap:5 }}>
          {["S","T","A","R"].map(s=><span key={s} style={{ fontSize:9, fontWeight:700, width:17, height:17, borderRadius:"50%", background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.85)", display:"flex", alignItems:"center", justifyContent:"center" }}>{s}</span>)}
        </div>
      </div>
      {!submitted ? (
        <>
          <textarea style={{ width:"100%", height:78, border:`1px solid ${BD}`, borderRadius:8, padding:"8px 10px", fontSize:11, lineHeight:1.5, resize:"none", outline:"none", fontFamily:"inherit", boxSizing:"border-box", color:TEXT, background:CARD }} placeholder="Type your STAR answer here…" />
          <button onClick={() => setSubmitted(true)} style={{ marginTop:8, width:"100%", fontSize:11.5, fontWeight:700, padding:"8px", borderRadius:9, border:"none", background:ACCENT, color:"white", cursor:"pointer" }}>Submit for feedback →</button>
        </>
      ) : (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10 }}>
            {[{l:"STAR Structure",s:88,c:"#16A34A"},{l:"Evidence",s:82,c:"#16A34A"},{l:"Impact",s:68,c:"#D97706"},{l:"Concision",s:61,c:"#D97706"}].map(sc => (
              <div key={sc.l} style={{ background:CARD, border:`1px solid ${BD}`, borderRadius:8, padding:"8px 10px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><p style={{ fontSize:10, color:TEXT2 }}>{sc.l}</p><p style={{ fontSize:10, fontWeight:700, color:sc.c }}>{sc.s}</p></div>
                <div style={{ height:3, borderRadius:99, background:RAISE }}><div style={{ width:`${sc.s}%`, height:"100%", background:sc.c, borderRadius:99 }} /></div>
              </div>
            ))}
          </div>
          <div style={{ background:"#EFF6FF", border:`1px solid ${ACCENT}25`, borderRadius:10, padding:10 }}>
            <p style={{ fontSize:10, fontWeight:700, color:ACCENT, marginBottom:3 }}>Zari&apos;s coaching note</p>
            <p style={{ fontSize:10.5, color:"#1D4ED8", lineHeight:1.55 }}>Strong structure. Add a quantified Result: &ldquo;Finance signed off 3 weeks early, shipping before the competitor.&rdquo;</p>
          </div>
          <button onClick={() => setSubmitted(false)} style={{ marginTop:8, width:"100%", fontSize:11, fontWeight:600, padding:"7px", borderRadius:9, border:`1px solid ${BD}`, background:CARD, color:TEXT, cursor:"pointer" }}>Next question →</button>
        </>
      )}
    </div>
  );
}

/* ─── LinkedIn ─── */
function PreviewLinkedIn() {
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:BG }}>
      <p style={{ fontSize:13, fontWeight:700, color:TEXT, marginBottom:10 }}>LinkedIn Optimizer</p>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        {[{l:"Visibility",s:91,c:"#16A34A"},{l:"Keywords",s:84,c:ACCENT},{l:"Headline",s:88,c:"#0284C7"}].map(sc => (
          <div key={sc.l} style={{ flex:1, background:CARD, border:`1px solid ${BD}`, borderRadius:10, padding:"10px", textAlign:"center" }}>
            <p style={{ fontSize:18, fontWeight:800, color:sc.c }}>{sc.s}</p>
            <p style={{ fontSize:9, color:TEXT2 }}>{sc.l}</p>
            <div style={{ height:3, borderRadius:99, background:RAISE, marginTop:4 }}><div style={{ width:`${sc.s}%`, height:"100%", background:sc.c, borderRadius:99 }} /></div>
          </div>
        ))}
      </div>
      <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:10, marginBottom:8 }}>
        <p style={{ fontSize:9, color:TEXT2, marginBottom:3 }}>Your current headline</p>
        <p style={{ fontSize:11, color:"#991B1B" }}>Operations Lead at FinCo Ltd</p>
      </div>
      <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:10, padding:10, marginBottom:10 }}>
        <p style={{ fontSize:9, color:TEXT2, marginBottom:3 }}>Zari&apos;s rewrite</p>
        <p style={{ fontSize:11, color:"#14532D", fontWeight:600, lineHeight:1.4 }}>Product-Minded Ops Leader → Senior PM | Cross-Functional Strategy · £340K Impact</p>
      </div>
      <p style={{ fontSize:10, fontWeight:700, color:TEXT2, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Missing keywords</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
        {["Product strategy","Roadmap","OKRs","Discovery","Agile","GTM"].map(kw => (
          <span key={kw} style={{ fontSize:9.5, fontWeight:600, padding:"3px 8px", borderRadius:99, background:"#FEF3C7", color:"#92400E", border:"1px solid #FDE68A" }}>{kw}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Action Plan ─── */
function PreviewPlan() {
  const [done, setDone] = useState<Set<number>>(new Set([0, 2]));
  const tasks = [
    "Reframe supply chain project as product initiative",
    "Write 3 STAR stories with cross-functional influence",
    "Update LinkedIn headline to product positioning",
    "Apply to 3 target Senior PM roles this week",
    "Practice behavioral question with Zari",
  ];
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:BG }}>
      <p style={{ fontSize:13, fontWeight:700, color:TEXT, marginBottom:10 }}>Action Plan</p>
      <div style={{ background:"#EFF6FF", border:`1px solid ${ACCENT}25`, borderRadius:12, padding:12, marginBottom:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <p style={{ fontSize:11, fontWeight:700, color:ACCENT }}>Progress</p>
          <p style={{ fontSize:11, fontWeight:700, color:ACCENT }}>{done.size}/{tasks.length}</p>
        </div>
        <div style={{ height:6, borderRadius:99, background:`${ACCENT}18` }}><div style={{ width:`${(done.size/tasks.length)*100}%`, height:"100%", background:ACCENT, borderRadius:99, transition:"width 0.3s" }} /></div>
      </div>
      {tasks.map((task, i) => (
        <button key={i} onClick={() => setDone(d => { const n=new Set(d); n.has(i)?n.delete(i):n.add(i); return n; })} style={{ display:"flex", alignItems:"center", gap:9, width:"100%", background:CARD, border:`1px solid ${done.has(i)?"#BBF7D0":BD}`, borderRadius:10, padding:"8px 10px", marginBottom:5, cursor:"pointer", textAlign:"left" }}>
          <div style={{ width:16, height:16, borderRadius:5, border:`2px solid ${done.has(i)?"#16A34A":"#CBD5E1"}`, background:done.has(i)?"#F0FFF4":CARD, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {done.has(i) && <span style={{ fontSize:8, color:"#16A34A", fontWeight:800 }}>✓</span>}
          </div>
          <p style={{ fontSize:11, color:done.has(i)?TEXT3:TEXT, textDecoration:done.has(i)?"line-through":"none", lineHeight:1.4 }}>{task}</p>
        </button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN EXPORT — Zari portal preview
════════════════════════════════════════════════ */

type NavGroup = { label: string; items: { id: PreviewScreen; label: string; icon: React.ReactNode }[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Tools",
    items: [
      { id:"resume",    label:"Resume Review", icon:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" style={{width:13,height:13,flexShrink:0}}><rect x="3" y="1" width="10" height="14" rx="1.5"/><path d="M6 5h4M6 8h4M6 11h2"/></svg> },
      { id:"interview", label:"Interview",     icon:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" style={{width:13,height:13,flexShrink:0}}><circle cx="8" cy="6" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg> },
      { id:"linkedin",  label:"LinkedIn",      icon:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" style={{width:13,height:13,flexShrink:0}}><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 7v4M5 5v.5M8 11V9a2 2 0 014 0v2M8 7v4"/></svg> },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id:"plan",      label:"Action Plan",   icon:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" style={{width:13,height:13,flexShrink:0}}><path d="M3 4h10M3 8h7M3 12h5"/><polyline points="11,9 13,11 16,7"/></svg> },
    ],
  },
];

export function PortalPreview() {
  const [active, setActive] = useState<PreviewScreen>("session");

  const allItems = NAV_GROUPS.flatMap(g => g.items);
  const activeLabel = active === "session" ? "Chat with Zari" : (allItems.find(n => n.id === active)?.label ?? "");

  return (
    <div className="platform-preview mx-auto overflow-hidden">
      {/* Browser chrome */}
      <div style={{ display:"flex", alignItems:"center", gap:8, borderBottom:`1px solid ${BD}`, background:RAISE, padding:"8px 14px" }}>
        <div style={{ display:"flex", gap:5 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c }}/>)}
        </div>
        <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, border:`1px solid ${BD}`, background:CARD, borderRadius:6, padding:"3px 12px", fontSize:11, color:TEXT2 }}>
            <svg style={{ width:10,height:10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            app.zaricoach.com/dashboard
          </div>
        </div>
      </div>

      {/* App body */}
      <div style={{ display:"flex", height:500 }}>

        {/* Sidebar */}
        <div style={{ width:200, flexShrink:0, background:CARD, borderRight:`1px solid ${BD}`, display:"flex", flexDirection:"column" }}>

          {/* Logo row */}
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"14px 14px 10px", borderBottom:`1px solid ${BD}` }}>
            <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#60A5FA)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 2px 8px ${ACCENT}40` }}>
              <ZariLogo size={14}/>
            </div>
            <span style={{ fontSize:15, fontWeight:800, color:TEXT, letterSpacing:"-0.04em" }}>Zari</span>
            <div style={{ marginLeft:"auto", width:26, height:26, borderRadius:7, border:`1px solid ${BD}`, background:RAISE, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke={TEXT3} strokeWidth="1.8" style={{width:12,height:12}}><path d="M17.5 12.5A7.5 7.5 0 1 1 7.5 2.5a5.83 5.83 0 0 0 10 10z"/></svg>
            </div>
          </div>

          {/* Stage selector */}
          <div style={{ padding:"10px 10px 6px" }}>
            <StagePill />
          </div>

          {/* Chat CTA */}
          <div style={{ padding:"4px 10px 8px" }}>
            <button onClick={() => setActive("session")} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:9, border:"none", background:active==="session" ? `linear-gradient(135deg,${ACCENT},#1D4ED8)` : "#EFF6FF", color:active==="session"?"white":ACCENT, fontWeight:700, fontSize:12.5, cursor:"pointer", boxShadow:active==="session"?`0 3px 12px ${ACCENT}45`:"none", letterSpacing:"-0.01em" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" style={{width:13,height:13,flexShrink:0}}><path d="M3 2h10a1 1 0 011 1v7a1 1 0 01-1 1H6l-4 3V3a1 1 0 011-1z"/></svg>
              Chat with Zari
            </button>
          </div>

          <div style={{ height:1, margin:"0 10px 6px", background:BD }}/>

          {/* Nav groups */}
          <nav style={{ flex:1, padding:"0 8px", display:"flex", flexDirection:"column", gap:0, overflowY:"auto" }}>
            {NAV_GROUPS.map(group => (
              <div key={group.label}>
                <div style={{ padding:"6px 8px 3px", fontSize:9.5, fontWeight:700, color:TEXT3, letterSpacing:"0.1em", textTransform:"uppercase" }}>{group.label}</div>
                {group.items.map(item => {
                  const isActive = active === item.id;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:7, marginBottom:1, border:"none", cursor:"pointer", textAlign:"left", background:isActive ? `${ACCENT}0D` : "transparent", color:isActive ? ACCENT : TEXT2, fontSize:12.5, fontWeight:isActive?600:400, boxShadow:isActive?`inset 3px 0 0 ${ACCENT}`:"inset 3px 0 0 transparent", transition:"all 0.12s" }}>
                      <span style={{ color:isActive?ACCENT:TEXT3, display:"flex",alignItems:"center" }}>{item.icon}</span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Upgrade card */}
          <div style={{ margin:"10px 10px 0", background:"linear-gradient(135deg,#EFF6FF,#F5F3FF)", borderRadius:10, padding:"11px 12px", border:`1px solid ${ACCENT}18` }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
              <div style={{ width:22, height:22, borderRadius:6, background:`linear-gradient(135deg,${ACCENT},#1D4ED8)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 2px 7px ${ACCENT}40` }}>
                <svg viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.8" style={{width:9,height:9}}><path d="M7 1l1.5 3L12 4.5l-2.5 2.5.6 3.5L7 9l-3.1 1.5.6-3.5L2 4.5 5.5 4z"/></svg>
              </div>
              <span style={{ fontSize:11.5, fontWeight:700, color:TEXT, letterSpacing:"-0.01em" }}>Upgrade to Pro</span>
            </div>
            <p style={{ fontSize:10.5, color:TEXT2, marginBottom:8, lineHeight:1.5 }}>Unlimited sessions, downloads &amp; priority coaching</p>
            <button style={{ width:"100%", fontSize:11.5, fontWeight:700, padding:"6px", borderRadius:8, border:"none", background:`linear-gradient(135deg,${ACCENT},#1D4ED8)`, color:"white", cursor:"pointer", boxShadow:`0 2px 10px ${ACCENT}40` }}>Upgrade →</button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>
          {/* Topbar */}
          <div style={{ height:44, flexShrink:0, background:CARD, borderBottom:`1px solid ${BD}`, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", position:"relative" }}>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${ACCENT}50,${ACCENT}10,transparent)`, pointerEvents:"none" }}/>
            <p style={{ fontSize:13, fontWeight:700, color:TEXT }}>{activeLabel}</p>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ fontSize:10.5, fontWeight:600, color:ACCENT, padding:"3px 9px", borderRadius:99, background:"#EFF6FF", border:`1px solid ${ACCENT}25`, display:"flex", alignItems:"center", gap:5 }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:11,height:11 }}><circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/></svg>
                Job Search
              </span>
              {active !== "session" && (
                <button onClick={() => setActive("session")} style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:99, border:"none", background:ACCENT, color:"white", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                  Chat with Zari
                </button>
              )}
            </div>
          </div>

          {/* Screen content */}
          <div style={{ flex:1, overflowY:"auto", minHeight:0 }}>
            {active === "session"   && <PreviewSession />}
            {active === "resume"    && <PreviewResume />}
            {active === "interview" && <PreviewInterview />}
            {active === "linkedin"  && <PreviewLinkedIn />}
            {active === "plan"      && <PreviewPlan />}
          </div>
        </div>
      </div>
    </div>
  );
}
