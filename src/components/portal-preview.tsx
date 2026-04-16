"use client";

import { useState } from "react";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatarDemo } from "@/components/zari-avatar";

type PreviewScreen = "session" | "resume" | "interview" | "linkedin" | "plan";

const NAV_ITEMS: { id: PreviewScreen; label: string; icon: string }[] = [
  { id: "session",   label: "Talk to Zari",   icon: "🎙" },
  { id: "resume",    label: "Resume",          icon: "📄" },
  { id: "interview", label: "Mock Interview",  icon: "👔" },
  { id: "linkedin",  label: "LinkedIn",        icon: "💼" },
  { id: "plan",      label: "Action Plan",     icon: "✅" },
];

/* ─── Session ─── */
function PreviewSession() {
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#FAFBFF" }}>
      {/* Avatar area */}
      <div style={{ background:"white", borderBottom:"1px solid #E4E8F5", padding:"18px 18px 14px", display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:14 }}>
          <span style={{ fontSize:9, fontWeight:700, color:"#16A34A", padding:"3px 9px", borderRadius:99, background:"#F0FFF4", border:"1px solid #BBF7D0", display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#22C55E", animation:"blink 1.1s ease-in-out infinite" }} />Live Session
          </span>
          <span style={{ fontSize:9, color:"#68738A", fontFamily:"monospace" }}>00:47</span>
        </div>
        <ZariAvatarDemo size={96} />
        <p style={{ marginTop:16, fontSize:12, fontWeight:600, color:"#0A0A0F" }}>Zari <span style={{ fontWeight:400, color:"#68738A" }}>— AI Career Coach</span></p>
        <div style={{ marginTop:10, maxWidth:300, background:"#F5F7FF", border:"1px solid #E4E8F5", borderRadius:"4px 12px 12px 12px", padding:"9px 12px", fontSize:11.5, lineHeight:1.6, color:"#1E2235" }}>
          &ldquo;Let&apos;s work on your interview narrative now — I&apos;ll ask the question the way a Senior PM panel would.&rdquo;
        </div>
        <div style={{ marginTop:10, display:"flex", flexWrap:"wrap", justifyContent:"center", gap:5 }}>
          {["Practice a PM interview Q","Review my resume bullet","What should I work on?"].map(p => (
            <span key={p} style={{ fontSize:9.5, fontWeight:500, color:"#4361EE", padding:"3px 10px", borderRadius:99, background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.18)" }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex:1, overflowY:"auto", padding:"12px 14px" }}>
        {[
          { role:"coach", text:"Your ops background is a real differentiator. Let's build a PM narrative around it." },
          { role:"user",  text:"I led a supply chain redesign last year — 5 teams, exec sign-off, 22% improvement." },
          { role:"coach", text:"Perfect. That's a product initiative with impact numbers. Here's how we frame it for a panel…" },
        ].map((m, i) => (
          <div key={i} style={{ display:"flex", gap:7, marginBottom:10, flexDirection:m.role==="user"?"row-reverse":"row" }}>
            <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, background:m.role==="coach"?"linear-gradient(135deg,#4361EE,#818CF8)":"#E4E8F5", color:m.role==="coach"?"white":"#68738A" }}>
              {m.role==="coach"?"Z":"S"}
            </div>
            <div style={{ maxWidth:"75%", padding:"7px 10px", fontSize:11, lineHeight:1.55, borderRadius:m.role==="coach"?"3px 12px 12px 12px":"12px 3px 12px 12px", background:m.role==="coach"?"white":"#4361EE", color:m.role==="coach"?"#1E2235":"white", border:m.role==="coach"?"1px solid #E4E8F5":"none" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding:"8px 10px", borderTop:"1px solid #E4E8F5", background:"white", flexShrink:0 }}>
        <div style={{ display:"flex", gap:6, background:"#F5F7FF", border:"1px solid #E4E8F5", borderRadius:10, padding:"6px 8px 6px 11px", alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#A0AABF", flex:1 }}>Ask Zari anything…</span>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"#EEF2FF", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:12, height:12 }}><path d="M8 1a2.5 2.5 0 00-2.5 2.5v4a2.5 2.5 0 005 0V3.5A2.5 2.5 0 008 1z"/><path d="M3.5 8v.5a4.5 4.5 0 009 0V8"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Resume ─── */
function PreviewResume() {
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:"#FAFBFF" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div>
          <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>Resume Review</p>
          <p style={{ fontSize:10, color:"#68738A" }}>Resume_PM_v3.pdf · Just analyzed</p>
        </div>
        <button style={{ fontSize:10, fontWeight:600, background:"#4361EE", color:"white", border:"none", borderRadius:7, padding:"5px 10px", cursor:"pointer" }}>Download →</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6, marginBottom:12 }}>
        {[{l:"Overall",s:74,c:"#4361EE"},{l:"ATS",s:68,c:"#D97706"},{l:"Clarity",s:71,c:"#0284C7"},{l:"Impact",s:61,c:"#DC2626"}].map(sc => (
          <div key={sc.l} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:"8px", textAlign:"center" }}>
            <p style={{ fontSize:17, fontWeight:800, color:sc.c }}>{sc.s}</p>
            <p style={{ fontSize:9, color:"#68738A" }}>{sc.l}</p>
            <div style={{ height:3, borderRadius:99, background:"#F1F5F9", marginTop:4 }}><div style={{ width:`${sc.s}%`, height:"100%", background:sc.c, borderRadius:99 }} /></div>
          </div>
        ))}
      </div>
      {[
        { t:"warn", text:"Summary missing product keywords — ATS will reject for PM roles." },
        { t:"warn", text:"5 bullets are task-focused, no impact numbers." },
        { t:"ok",   text:"Education clean and well-structured." },
      ].map((f,i) => (
        <div key={i} style={{ display:"flex", gap:7, background:f.t==="warn"?"#FEF2F2":"#F0FFF4", border:`1px solid ${f.t==="warn"?"#FECACA":"#BBF7D0"}`, borderRadius:8, padding:"7px 9px", marginBottom:5 }}>
          <span style={{ fontSize:11 }}>{f.t==="warn"?"⚠️":"✅"}</span>
          <p style={{ fontSize:10.5, color:f.t==="warn"?"#991B1B":"#14532D", lineHeight:1.5 }}>{f.text}</p>
        </div>
      ))}
      <p style={{ fontSize:10, fontWeight:700, color:"#68738A", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:10, marginBottom:6 }}>Zari&apos;s rewrite</p>
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
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:"#FAFBFF" }}>
      <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:10 }}>Mock Interview</p>
      <div style={{ background:"linear-gradient(135deg,#4361EE,#6378F0)", borderRadius:12, padding:12, color:"white", marginBottom:12 }}>
        <p style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", opacity:.65, marginBottom:5 }}>Q2 of 6 · Behavioral</p>
        <p style={{ fontSize:11.5, fontWeight:600, lineHeight:1.5 }}>Tell me about a time you led a cross-functional initiative that faced resistance. What was your approach?</p>
      </div>
      {!submitted ? (
        <>
          <textarea style={{ width:"100%", height:80, border:"1px solid #E4E8F5", borderRadius:8, padding:"8px 10px", fontSize:11, lineHeight:1.5, resize:"none", outline:"none", fontFamily:"inherit", boxSizing:"border-box", color:"#1E2235", background:"white" }} placeholder="Type your STAR answer here…" />
          <button onClick={() => setSubmitted(true)} style={{ marginTop:8, width:"100%", fontSize:11.5, fontWeight:700, padding:"8px", borderRadius:9, border:"none", background:"#4361EE", color:"white", cursor:"pointer" }}>Submit for feedback →</button>
        </>
      ) : (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10 }}>
            {[{l:"STAR Structure",s:88,c:"#16A34A"},{l:"Evidence",s:82,c:"#16A34A"},{l:"Impact",s:68,c:"#D97706"},{l:"Concision",s:61,c:"#D97706"}].map(sc => (
              <div key={sc.l} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:8, padding:"8px 10px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><p style={{ fontSize:10, color:"#68738A" }}>{sc.l}</p><p style={{ fontSize:10, fontWeight:700, color:sc.c }}>{sc.s}</p></div>
                <div style={{ height:3, borderRadius:99, background:"#F1F5F9" }}><div style={{ width:`${sc.s}%`, height:"100%", background:sc.c, borderRadius:99 }} /></div>
              </div>
            ))}
          </div>
          <div style={{ background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:10, padding:10 }}>
            <p style={{ fontSize:10.5, color:"#3451D1", lineHeight:1.55 }}>Strong structure. Add a quantified Result: &ldquo;got Finance sign-off 3 weeks early, accelerating launch by a sprint.&rdquo;</p>
          </div>
          <button onClick={() => setSubmitted(false)} style={{ marginTop:8, width:"100%", fontSize:11, fontWeight:600, padding:"7px", borderRadius:9, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>Next question →</button>
        </>
      )}
    </div>
  );
}

/* ─── LinkedIn ─── */
function PreviewLinkedIn() {
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:"#FAFBFF" }}>
      <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:10 }}>LinkedIn Optimizer</p>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        {[{l:"Visibility",s:61,c:"#D97706"},{l:"Keywords",s:54,c:"#DC2626"},{l:"Headline",s:72,c:"#4361EE"}].map(sc => (
          <div key={sc.l} style={{ flex:1, background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:"10px", textAlign:"center" }}>
            <p style={{ fontSize:18, fontWeight:800, color:sc.c }}>{sc.s}</p>
            <p style={{ fontSize:9, color:"#68738A" }}>{sc.l}</p>
            <div style={{ height:3, borderRadius:99, background:"#F1F5F9", marginTop:4 }}><div style={{ width:`${sc.s}%`, height:"100%", background:sc.c, borderRadius:99 }} /></div>
          </div>
        ))}
      </div>
      <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:10, marginBottom:8 }}>
        <p style={{ fontSize:9, color:"#68738A", marginBottom:3 }}>Current headline</p>
        <p style={{ fontSize:11, color:"#991B1B" }}>Operations Lead at FinCo Ltd</p>
      </div>
      <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:10, padding:10, marginBottom:10 }}>
        <p style={{ fontSize:9, color:"#68738A", marginBottom:3 }}>Zari&apos;s rewrite</p>
        <p style={{ fontSize:11, color:"#14532D", fontWeight:600, lineHeight:1.4 }}>Product-Minded Ops Leader → Senior PM | Cross-Functional Strategy · £340K Impact</p>
      </div>
      <p style={{ fontSize:10, fontWeight:700, color:"#68738A", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Missing keywords</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
        {["Product strategy","Roadmap","OKRs","Discovery","Agile","GTM","P&L"].map(kw => (
          <span key={kw} style={{ fontSize:9.5, fontWeight:600, padding:"3px 8px", borderRadius:99, background:"#FEF3C7", color:"#92400E", border:"1px solid #FDE68A" }}>{kw}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Plan ─── */
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
    <div style={{ padding:14, overflowY:"auto", height:"100%", background:"#FAFBFF" }}>
      <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:10 }}>Action Plan</p>
      <div style={{ background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:12, padding:12, marginBottom:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <p style={{ fontSize:11, fontWeight:700, color:"#4361EE" }}>Progress</p>
          <p style={{ fontSize:11, fontWeight:700, color:"#4361EE" }}>{done.size}/{tasks.length}</p>
        </div>
        <div style={{ height:6, borderRadius:99, background:"rgba(67,97,238,0.15)" }}><div style={{ width:`${(done.size/tasks.length)*100}%`, height:"100%", background:"#4361EE", borderRadius:99, transition:"width 0.3s" }} /></div>
      </div>
      {tasks.map((task, i) => (
        <button key={i} onClick={() => setDone(d => { const n=new Set(d); n.has(i)?n.delete(i):n.add(i); return n; })} style={{ display:"flex", alignItems:"center", gap:9, width:"100%", background:"white", border:`1px solid ${done.has(i)?"#BBF7D0":"#E4E8F5"}`, borderRadius:10, padding:"8px 10px", marginBottom:5, cursor:"pointer", textAlign:"left" }}>
          <div style={{ width:16, height:16, borderRadius:5, border:`2px solid ${done.has(i)?"#16A34A":"#CBD5E1"}`, background:done.has(i)?"#F0FFF4":"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {done.has(i) && <span style={{ fontSize:8, color:"#16A34A", fontWeight:800 }}>✓</span>}
          </div>
          <p style={{ fontSize:11, color:done.has(i)?"#A0AABF":"#0A0A0F", textDecoration:done.has(i)?"line-through":"none", lineHeight:1.4 }}>{task}</p>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT — Kleo-style interactive preview
═══════════════════════════════════════════════════ */
export function PortalPreview() {
  const [active, setActive] = useState<PreviewScreen>("session");

  return (
    <div className="platform-preview mx-auto overflow-hidden">
      {/* Browser chrome */}
      <div style={{ display:"flex", alignItems:"center", gap:8, borderBottom:"1px solid #E4E8F5", background:"#F9FAFB", padding:"8px 14px" }}>
        <div style={{ display:"flex", gap:5 }}>
          <div style={{ width:11, height:11, borderRadius:"50%", background:"#FF5F57" }} />
          <div style={{ width:11, height:11, borderRadius:"50%", background:"#FEBC2E" }} />
          <div style={{ width:11, height:11, borderRadius:"50%", background:"#28C840" }} />
        </div>
        <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, border:"1px solid #E4E8F5", background:"white", borderRadius:6, padding:"3px 12px", fontSize:11, color:"#68738A" }}>
            <svg style={{ width:10, height:10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            app.zari.coach/dashboard
          </div>
        </div>
      </div>

      {/* App body */}
      <div style={{ display:"flex", height:500 }}>

        {/* Sidebar — Kleo white style */}
        <div style={{ width:172, flexShrink:0, background:"white", borderRight:"1px solid #E4E8F5", display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 14px 10px", borderBottom:"1px solid #F0F2F8" }}>
            <ZariLogo size={22} />
            <div>
              <p style={{ fontSize:11, fontWeight:800, color:"#0A0A0F", lineHeight:1.1 }}>Zari</p>
              <p style={{ fontSize:8.5, color:"#A0AABF" }}>AI Career Coach</p>
            </div>
          </div>

          {/* Progress mini card */}
          <div style={{ margin:"8px 8px 4px", background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid rgba(67,97,238,0.12)", borderRadius:9, padding:"8px 10px" }}>
            <p style={{ fontSize:8.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#6478F0", marginBottom:6 }}>Your Progress</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
              {[{l:"Sessions",v:"5"},{l:"Resume",v:"74"},{l:"Interviews",v:"3"},{l:"Plan",v:"2/8"}].map(s => (
                <div key={s.l} style={{ background:"white", borderRadius:6, padding:"4px 6px", border:"1px solid rgba(67,97,238,0.10)" }}>
                  <p style={{ fontSize:13, fontWeight:800, color:"#4361EE", lineHeight:1 }}>{s.v}</p>
                  <p style={{ fontSize:8, color:"#A0AABF", marginTop:1 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, padding:"6px 6px" }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setActive(item.id)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"7px 9px", borderRadius:9, marginBottom:2, border:"none", cursor:"pointer", textAlign:"left", background: active===item.id?"#EEF2FF":"transparent", color: active===item.id?"#4361EE":"#68738A", fontSize:11.5, fontWeight: active===item.id?600:400, borderLeft:`2px solid ${active===item.id?"#4361EE":"transparent"}`, transition:"all 0.12s" }}>
                <span style={{ fontSize:13 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* User */}
          <div style={{ padding:"8px 10px 10px", borderTop:"1px solid #F0F2F8" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"white", flexShrink:0 }}>SN</div>
              <div>
                <p style={{ fontSize:10, fontWeight:600, color:"#0A0A0F" }}>Steve N.</p>
                <p style={{ fontSize:8.5, color:"#A0AABF" }}>Free plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>
          {/* Topbar */}
          <div style={{ height:40, flexShrink:0, background:"white", borderBottom:"1px solid #E4E8F5", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 14px" }}>
            <p style={{ fontSize:12, fontWeight:700, color:"#0A0A0F" }}>{NAV_ITEMS.find(n=>n.id===active)?.label}</p>
            {active !== "session" && (
              <button onClick={() => setActive("session")} style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:99, border:"none", background:"#4361EE", color:"white", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                🎙 Talk to Zari
              </button>
            )}
          </div>

          {/* Screen */}
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
