"use client";

import { useState } from "react";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatarDemo } from "@/components/zari-avatar";

type PreviewScreen = "dashboard" | "coaching" | "resume" | "interview" | "linkedin" | "plan";

const NAV_ITEMS: { id: PreviewScreen; label: string; icon: string }[] = [
  { id: "dashboard",  label: "Dashboard",      icon: "⬛" },
  { id: "coaching",   label: "Live Session",    icon: "🎙" },
  { id: "resume",     label: "Resume Review",   icon: "📄" },
  { id: "interview",  label: "Mock Interview",  icon: "👔" },
  { id: "linkedin",   label: "LinkedIn",        icon: "💼" },
  { id: "plan",       label: "Action Plan",     icon: "✅" },
];

/* ─── Dashboard screen ─── */
function PreviewDashboard() {
  return (
    <div style={{ padding: 16, overflowY:"auto", height:"100%" }}>
      <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F", marginBottom:2 }}>Good morning, Steve 👋</p>
      <p style={{ fontSize:11, color:"#68738A", marginBottom:14 }}>Working toward: <strong style={{ color:"#4361EE" }}>Senior Product Manager</strong></p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
        {[
          { label:"Sessions", val:"7", sub:"+2 this week", color:"#4361EE" },
          { label:"Resume score", val:"74", sub:"Up from 58", color:"#16A34A" },
          { label:"Interview avg", val:"68%", sub:"3 sessions", color:"#D97706" },
          { label:"Actions done", val:"5/9", sub:"2 due", color:"#8B5CF6" },
        ].map((s) => (
          <div key={s.label} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:"10px 12px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
            <p style={{ fontSize:10, color:"#68738A", marginBottom:2 }}>{s.label}</p>
            <p style={{ fontSize:20, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</p>
            <p style={{ fontSize:9, color:"#68738A", marginTop:2 }}>{s.sub}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A", marginBottom:8 }}>Start a session</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:14 }}>
        {[
          { icon:"🎙", label:"Live coaching", bg:"#EEF2FF" },
          { icon:"📄", label:"Resume review", bg:"#F0FFF4" },
          { icon:"👔", label:"Mock interview", bg:"#FFF7ED" },
          { icon:"💼", label:"LinkedIn", bg:"#F0F9FF" },
        ].map((item) => (
          <div key={item.label} style={{ display:"flex", alignItems:"center", gap:8, background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:"8px 10px", cursor:"pointer" }}>
            <div style={{ width:28, height:28, borderRadius:7, background:item.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{item.icon}</div>
            <p style={{ fontSize:11, fontWeight:600, color:"#0A0A0F" }}>{item.label}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A", marginBottom:6 }}>Recent sessions</p>
      {[
        { icon:"🎙", name:"Career direction — Senior PM", meta:"Today · 24 min", badge:"Coaching", bg:"#EEF2FF", color:"#4361EE" },
        { icon:"📄", name:"Resume review — PM v3", meta:"Yesterday · 18 min", badge:"74/100", bg:"#F0FFF4", color:"#16A34A" },
        { icon:"👔", name:"Behavioral mock — STAR method", meta:"2 days ago · 31 min", badge:"68%", bg:"#FFF7ED", color:"#D97706" },
      ].map((s) => (
        <div key={s.name} style={{ display:"flex", alignItems:"center", gap:8, background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:"8px 10px", marginBottom:4 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{s.icon}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontSize:11, fontWeight:600, color:"#0A0A0F", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</p>
            <p style={{ fontSize:9, color:"#68738A" }}>{s.meta}</p>
          </div>
          <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:99, background:s.bg, color:s.color, flexShrink:0 }}>{s.badge}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Live coaching screen ─── */
function PreviewCoaching() {
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"linear-gradient(160deg, #0C1023 0%, #161f38 100%)", position:"relative", minHeight:0 }}>
        <div style={{ position:"absolute", top:8, left:8, display:"flex", gap:5 }}>
          <span style={{ fontSize:9, fontWeight:700, color:"white", background:"rgba(255,255,255,0.12)", padding:"2px 7px", borderRadius:99 }}>⬤ LIVE</span>
          <span style={{ fontSize:9, color:"rgba(255,255,255,0.5)", background:"rgba(255,255,255,0.07)", padding:"2px 7px", borderRadius:99 }}>Career Direction</span>
        </div>
        <ZariAvatarDemo size={100} />
        <p style={{ marginTop:10, fontSize:12, fontWeight:600, color:"white" }}>Zari — Your AI Career Coach</p>
        <div style={{ margin:"8px 12px 0", background:"rgba(0,0,0,0.45)", backdropFilter:"blur(8px)", borderRadius:10, padding:"8px 12px" }}>
          <p style={{ fontSize:10, color:"rgba(255,255,255,0.75)", lineHeight:1.6 }}>
            &ldquo;Your ops background is a real differentiator here. Let&apos;s work on framing the supply chain project as a product initiative...&rdquo;
          </p>
        </div>
      </div>
      <div style={{ background:"white", borderTop:"1px solid #E4E8F5", padding:"8px 12px", display:"flex", gap:6, justifyContent:"center", flexShrink:0 }}>
        {["🎙","🔊","💬","⏸","✕"].map((ic, i) => (
          <div key={i} style={{ width:32, height:32, borderRadius:"50%", border:`1px solid ${i===4 ? "#FECACA" : "#E4E8F5"}`, background:i===4 ? "#FEF2F2" : "#F5F7FF", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, cursor:"pointer" }}>{ic}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── Resume screen ─── */
function PreviewResume() {
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div>
          <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>Resume review</p>
          <p style={{ fontSize:10, color:"#68738A" }}>Resume_PM_v3.pdf · Just analyzed</p>
        </div>
        <button style={{ fontSize:10, fontWeight:600, background:"#4361EE", color:"white", border:"none", borderRadius:7, padding:"5px 10px", cursor:"pointer" }}>Download rewrites</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6, marginBottom:12 }}>
        {[
          { label:"Overall", val:74, color:"#4361EE" },
          { label:"ATS", val:68, color:"#D97706" },
          { label:"Clarity", val:71, color:"#0284C7" },
          { label:"Impact", val:61, color:"#DC2626" },
        ].map((sc) => (
          <div key={sc.label} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:"8px", textAlign:"center" }}>
            <p style={{ fontSize:16, fontWeight:800, color:sc.color }}>{sc.val}</p>
            <p style={{ fontSize:9, color:"#68738A" }}>{sc.label}</p>
            <div style={{ height:3, borderRadius:99, background:"#F1F5F9", marginTop:4, overflow:"hidden" }}>
              <div style={{ width:`${sc.val}%`, height:"100%", background:sc.color, borderRadius:99 }} />
            </div>
          </div>
        ))}
      </div>
      {[
        { type:"warn", text:"Summary lacks product keywords — will fail ATS filters." },
        { type:"warn", text:"Bullets are task-focused, not outcome-focused." },
        { type:"ok",   text:"Education section is well-structured and complete." },
        { type:"ok",   text:"Clear career progression visible in timeline." },
      ].map((f, i) => (
        <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", background:f.type==="warn"?"#FEF2F2":"#F0FFF4", border:`1px solid ${f.type==="warn"?"#FECACA":"#BBF7D0"}`, borderRadius:8, padding:"7px 10px", marginBottom:5 }}>
          <span style={{ fontSize:11 }}>{f.type==="warn"?"⚠️":"✅"}</span>
          <p style={{ fontSize:10.5, color:f.type==="warn"?"#991B1B":"#14532D", lineHeight:1.5 }}>{f.text}</p>
        </div>
      ))}
      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A", marginTop:10, marginBottom:6 }}>Zari&apos;s rewrite</p>
      <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:10, padding:10 }}>
        <p style={{ fontSize:10, color:"#14532D", lineHeight:1.6 }}>Led end-to-end supply chain redesign across 5 business units · 22% faster fulfilment · £340K cost reduction · cross-functional with Tech, Finance, and Ops leadership.</p>
      </div>
    </div>
  );
}

/* ─── Interview screen ─── */
function PreviewInterview() {
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%" }}>
      <div style={{ background:"#4361EE", borderRadius:12, padding:12, color:"white", marginBottom:12 }}>
        <p style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", opacity:0.65, marginBottom:4 }}>Question 2 of 6 · Behavioral</p>
        <p style={{ fontSize:12, fontWeight:600, lineHeight:1.5 }}>Tell me about a time you led a cross-functional initiative that faced significant resistance. What was your approach?</p>
      </div>
      <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:10, marginBottom:10 }}>
        <p style={{ fontSize:9, fontWeight:700, color:"#68738A", textTransform:"uppercase", marginBottom:5 }}>Your answer</p>
        <p style={{ fontSize:11, color:"#1E2235", lineHeight:1.6 }}>
          &ldquo;In my supply chain redesign project, I faced major pushback from the Finance team who worried about short-term cost spikes. I created a shared data dashboard so everyone could track ROI in real-time...&rdquo;
        </p>
      </div>
      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A", marginBottom:7 }}>Zari&apos;s feedback</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:8 }}>
        {[
          { label:"Structure", score:88, color:"#16A34A" },
          { label:"Evidence", score:82, color:"#16A34A" },
          { label:"Impact", score:71, color:"#D97706" },
          { label:"Concision", score:65, color:"#D97706" },
        ].map((sc) => (
          <div key={sc.label} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:8, padding:"8px 10px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <p style={{ fontSize:10, color:"#68738A" }}>{sc.label}</p>
              <p style={{ fontSize:10, fontWeight:700, color:sc.color }}>{sc.score}</p>
            </div>
            <div style={{ height:3, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
              <div style={{ width:`${sc.score}%`, height:"100%", background:sc.color, borderRadius:99 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:10, padding:10 }}>
        <p style={{ fontSize:10, color:"#3451D1", lineHeight:1.5 }}>Strong Situation + Action. Add a quantified Result — e.g. &ldquo;reduced resistance by getting Finance sign-off 3 weeks early.&rdquo;</p>
      </div>
    </div>
  );
}

/* ─── LinkedIn screen ─── */
function PreviewLinkedIn() {
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%" }}>
      <div style={{ display:"flex", gap:10, marginBottom:12 }}>
        {[
          { label:"Visibility", val:61, max:100, color:"#D97706" },
          { label:"Keywords", val:54, max:100, color:"#DC2626" },
          { label:"Headline", val:72, max:100, color:"#0284C7" },
        ].map((sc) => (
          <div key={sc.label} style={{ flex:1, background:"white", border:"1px solid #E4E8F5", borderRadius:10, padding:"10px", textAlign:"center" }}>
            <p style={{ fontSize:18, fontWeight:800, color:sc.color }}>{sc.val}</p>
            <p style={{ fontSize:9, color:"#68738A" }}>{sc.label}</p>
            <div style={{ height:3, borderRadius:99, background:"#F1F5F9", marginTop:4 }}>
              <div style={{ width:`${sc.val}%`, height:"100%", background:sc.color, borderRadius:99 }} />
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A", marginBottom:6 }}>Headline analysis</p>
      <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:10, marginBottom:8 }}>
        <p style={{ fontSize:9, color:"#68738A", marginBottom:3 }}>Current headline</p>
        <p style={{ fontSize:11, color:"#991B1B" }}>Operations Lead at FinCo Ltd</p>
      </div>
      <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:10, padding:10, marginBottom:10 }}>
        <p style={{ fontSize:9, color:"#68738A", marginBottom:3 }}>Zari&apos;s rewrite</p>
        <p style={{ fontSize:11, color:"#14532D", fontWeight:600 }}>Product-Minded Operations Leader → Transitioning to Senior PM | Supply Chain · Cross-Functional Strategy</p>
      </div>
      <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#68738A", marginBottom:6 }}>Missing keywords</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
        {["Product strategy","Roadmap","Stakeholders","OKRs","Discovery","Agile","GTM","P&L"].map((kw) => (
          <span key={kw} style={{ fontSize:9, fontWeight:600, padding:"3px 8px", borderRadius:99, background:"#FEF3C7", color:"#92400E", border:"1px solid #FDE68A" }}>{kw}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Action plan screen ─── */
function PreviewPlan() {
  const [done, setDone] = useState<Set<number>>(new Set([0, 2]));
  const tasks = [
    "Reframe supply chain project as a product initiative",
    "Write 3 STAR stories with cross-functional influence",
    "Update headline to product-focused positioning",
    "Add 5 missing keywords to LinkedIn About section",
    "Request 2 LinkedIn recommendations from peers",
    "Apply to 3 target Senior PM roles this week",
  ];
  return (
    <div style={{ padding:14, overflowY:"auto", height:"100%" }}>
      <div style={{ background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:12, padding:12, marginBottom:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
          <p style={{ fontSize:11, fontWeight:700, color:"#4361EE" }}>Overall progress</p>
          <p style={{ fontSize:11, fontWeight:700, color:"#4361EE" }}>{done.size}/{tasks.length}</p>
        </div>
        <div style={{ height:6, borderRadius:99, background:"rgba(67,97,238,0.15)", overflow:"hidden" }}>
          <div style={{ width:`${(done.size/tasks.length)*100}%`, height:"100%", background:"#4361EE", borderRadius:99, transition:"width 0.4s ease" }} />
        </div>
      </div>
      {tasks.map((task, i) => (
        <button
          key={i}
          onClick={() => setDone((d) => { const n = new Set(d); n.has(i) ? n.delete(i) : n.add(i); return n; })}
          style={{ display:"flex", alignItems:"flex-start", gap:9, width:"100%", background:"white", border:`1px solid ${done.has(i) ? "#BBF7D0" : "#E4E8F5"}`, borderRadius:10, padding:"9px 11px", marginBottom:5, cursor:"pointer", textAlign:"left", transition:"all 0.2s" }}
        >
          <div style={{ width:16, height:16, borderRadius:5, border:`2px solid ${done.has(i) ? "#16A34A" : "#CBD5E1"}`, background:done.has(i) ? "#F0FFF4" : "white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
            {done.has(i) && <span style={{ fontSize:9, color:"#16A34A", fontWeight:800 }}>✓</span>}
          </div>
          <p style={{ fontSize:11, color:done.has(i) ? "#68738A" : "#0A0A0F", textDecoration:done.has(i) ? "line-through" : "none", lineHeight:1.4 }}>{task}</p>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */
export function PortalPreview() {
  const [activeScreen, setActiveScreen] = useState<PreviewScreen>("dashboard");

  const TOPBAR: Record<PreviewScreen, { title: string; badge: string; badgeColor: string; badgeBg: string }> = {
    dashboard:  { title: "Dashboard",       badge: "3 sessions this week", badgeColor: "#16A34A", badgeBg: "#F0FFF4" },
    coaching:   { title: "Live Session",    badge: "● Session active",     badgeColor: "#4361EE", badgeBg: "#EEF2FF" },
    resume:     { title: "Resume Review",   badge: "Score: 74/100",        badgeColor: "#D97706", badgeBg: "#FFF7ED" },
    interview:  { title: "Mock Interview",  badge: "Q2 of 6",              badgeColor: "#D97706", badgeBg: "#FFF7ED" },
    linkedin:   { title: "LinkedIn",        badge: "Score: 61/100",        badgeColor: "#DC2626", badgeBg: "#FEF2F2" },
    plan:       { title: "Action Plan",     badge: "2/6 done",             badgeColor: "#4361EE", badgeBg: "#EEF2FF" },
  };

  const meta = TOPBAR[activeScreen];

  return (
    /* Browser chrome wrapper */
    <div className="platform-preview mx-auto overflow-hidden">
      {/* Browser chrome */}
      <div style={{ display:"flex", alignItems:"center", gap:8, borderBottom:"1px solid #E4E8F5", background:"#F9FAFB", padding:"8px 12px" }}>
        <div style={{ display:"flex", gap:5 }}>
          <div style={{ width:11, height:11, borderRadius:"50%", background:"#FF5F57" }} />
          <div style={{ width:11, height:11, borderRadius:"50%", background:"#FEBC2E" }} />
          <div style={{ width:11, height:11, borderRadius:"50%", background:"#28C840" }} />
        </div>
        <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, border:"1px solid #E4E8F5", background:"white", borderRadius:6, padding:"3px 10px", fontSize:11, color:"#68738A" }}>
            <svg style={{ width:10, height:10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            app.zari.coach/dashboard
          </div>
        </div>
      </div>

      {/* App body */}
      <div style={{ display:"flex", height:480 }}>

        {/* Sidebar */}
        <div style={{ width:180, flexShrink:0, background:"#0C1023", display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <ZariLogo size={24} />
            <span style={{ fontSize:12, fontWeight:700, color:"white" }}>Zari</span>
          </div>
          <nav style={{ flex:1, padding:"8px 6px" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                style={{
                  display:"flex", alignItems:"center", gap:8,
                  width:"100%", padding:"7px 10px", borderRadius:8, marginBottom:2,
                  border:"none", cursor:"pointer", textAlign:"left",
                  background: activeScreen === item.id ? "rgba(67,97,238,0.18)" : "transparent",
                  color: activeScreen === item.id ? "white" : "rgba(255,255,255,0.45)",
                  fontSize: 12, fontWeight: activeScreen === item.id ? 600 : 400,
                  borderLeft: `2px solid ${activeScreen === item.id ? "#4361EE" : "transparent"}`,
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize:13 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding:"10px 12px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background:"#4361EE", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"white", flexShrink:0 }}>SN</div>
              <div>
                <p style={{ fontSize:10, fontWeight:600, color:"white", lineHeight:1.2 }}>Steve N.</p>
                <p style={{ fontSize:9, color:"rgba(255,255,255,0.35)" }}>Free plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", background:"#F5F7FF", minWidth:0 }}>
          {/* Topbar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #E4E8F5", background:"white", padding:"8px 14px", flexShrink:0 }}>
            <div>
              <p style={{ fontSize:12, fontWeight:600, color:"#0A0A0F" }}>{meta.title}</p>
              <span style={{ fontSize:9, fontWeight:700, padding:"1px 7px", borderRadius:99, background:meta.badgeBg, color:meta.badgeColor }}>{meta.badge}</span>
            </div>
            <button style={{ fontSize:11, fontWeight:600, background:"#4361EE", color:"white", border:"none", borderRadius:8, padding:"5px 10px", cursor:"pointer" }}>+ New session</button>
          </div>

          {/* Screen content */}
          <div style={{ flex:1, overflowY:"auto", minHeight:0 }}>
            {activeScreen === "dashboard"  && <PreviewDashboard />}
            {activeScreen === "coaching"   && <PreviewCoaching />}
            {activeScreen === "resume"     && <PreviewResume />}
            {activeScreen === "interview"  && <PreviewInterview />}
            {activeScreen === "linkedin"   && <PreviewLinkedIn />}
            {activeScreen === "plan"       && <PreviewPlan />}
          </div>
        </div>
      </div>
    </div>
  );
}
