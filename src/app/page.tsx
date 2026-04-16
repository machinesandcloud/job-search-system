"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ZariAvatarDemo } from "@/components/zari-avatar";
import { ZariLogo } from "@/components/zari-logo";

/* ─── Marquee logos ─── */
const LOGOS = ["Google","Meta","Microsoft","Amazon","Stripe","Figma","Shopify","Notion","Netflix","Slack","GitHub","Salesforce","Adobe","Nvidia","Databricks"];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { quote:"I signed up for a bunch of AI tools. Zari is the one I actually kept. The resume feedback was specific to the point of being uncomfortable — it knew exactly what was wrong.", name:"Priya M.", role:"Product Manager", company:"Now at Notion", initials:"PM", stars:5 },
  { quote:"I just did 6 mock interviews with Zari before my Google loop. The real thing felt easier. I got the offer. There is nothing else out there that prepares you this well.", name:"Marcus J.", role:"Backend Engineer", company:"Now at Google", initials:"MJ", stars:5 },
  { quote:"I'm incredibly excited with what Zari has built. The LinkedIn session rebuilt my headline from scratch and I got 3 recruiter DMs the same week.", name:"Aaliyah R.", role:"Data Scientist", company:"Now at Stripe", initials:"AR", stars:5 },
  { quote:"I was applying for 3 months with no callbacks. After one resume session with Zari I got 4 calls in a week. The bullet rewrites were shockingly specific.", name:"Daniel K.", role:"Operations Lead", company:"Now at Shopify", initials:"DK", stars:5 },
  { quote:"The mock interview feature is insane. It scores your STAR structure in real time and tells you exactly which word to cut. I felt overprepared walking into my final round.", name:"Sofia L.", role:"UX Designer", company:"Now at Figma", initials:"SL", stars:5 },
  { quote:"Zari rebuilt my LinkedIn headline and my recruiter views went from 2 a week to 19. I didn't change anything else. Just the headline.", name:"James T.", role:"Engineering Manager", company:"Now at Meta", initials:"JT", stars:5 },
];

/* ─── How it works steps ─── */
const STEPS = [
  { n:"01", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>, title:"Upload your documents", body:"Drop your resume, cover letter, or LinkedIn URL. Zari reads everything — even between the lines." },
  { n:"02", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>, title:"Zari analyzes everything", body:"ATS score, keyword gaps, bullet impact, STAR gaps in your interview stories — scored in seconds." },
  { n:"03", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:"You coach with Zari", body:"Talk, ask, practice — voice or text. Zari remembers your goals, your history, and your target role." },
  { n:"04", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>, title:"Download & apply", body:"Get your rewritten resume, optimized LinkedIn copy, and interview scripts — ready to send tonight." },
];

/* ─── Use cases ─── */
const USE_CASES = [
  {
    id:"resume",
    tag:"Resume",
    headline:"From rejected to callback-ready in one session.",
    sub:"Zari reads your resume like a recruiter would. You get ATS scores, bullet-by-bullet rewrites with injected metrics, and a downloadable final version.",
    points:["ATS keyword scan against your target job","Bullet rewrites with impact numbers added","Before / after score showing exact improvement","One-click download of fully optimized resume"],
    visual: (
      <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 12px 40px rgba(0,0,0,0.08)" }}>
        {/* Header */}
        <div style={{ background:"#F5F7FF", borderBottom:"1px solid #E4E8F5", padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", gap:6 }}>
            {["#FF5F57","#FFBD2E","#28CA41"].map(c => <div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }} />)}
          </div>
          <span style={{ fontSize:11, color:"#A0AABF", fontWeight:600 }}>Resume Review · Zari AI</span>
          <div style={{ width:56 }} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
          {/* Left: doc */}
          <div style={{ padding:"16px", borderRight:"1px solid #F1F5F9" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#0A0A0F", marginBottom:2 }}>Steve N. — PM</div>
            <div style={{ fontSize:9.5, color:"#A0AABF", marginBottom:10 }}>Operations Lead · steve@email.com</div>
            {[
              { l:"Summary", bad:true, text:"Experienced ops professional seeking PM role." },
              { l:"Experience", bad:true, text:"• Managed supply chain across 5 units\n• Led cross-functional team of 12" },
              { l:"Skills", bad:false, text:"Operations · Supply Chain · Process Design" },
            ].map(b => (
              <div key={b.l} style={{ marginBottom:8, borderRadius:8, border:`1px solid ${b.bad?"#FECACA":"#E4E8F5"}`, background:b.bad?"#FEF2F2":"white", padding:"7px 9px" }}>
                <p style={{ fontSize:8.5, fontWeight:700, textTransform:"uppercase", color:b.bad?"#DC2626":"#A0AABF", letterSpacing:"0.1em", marginBottom:3 }}>{b.l}{b.bad?" ⚠":"" }</p>
                <p style={{ fontSize:10, color:"#1E2235", lineHeight:1.5, whiteSpace:"pre-line" }}>{b.text}</p>
              </div>
            ))}
          </div>
          {/* Right: AI analysis */}
          <div style={{ padding:"16px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10 }}>
              {[{l:"Overall",v:62,c:"#D97706"},{l:"ATS",v:54,c:"#DC2626"},{l:"Impact",v:48,c:"#DC2626"},{l:"Clarity",v:70,c:"#4361EE"}].map(s=>(
                <div key={s.l} style={{ textAlign:"center", background:"#FAFBFF", borderRadius:8, border:"1px solid #F1F5F9", padding:"8px 4px" }}>
                  <div style={{ fontSize:18, fontWeight:900, color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:9, color:"#A0AABF", fontWeight:600 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#EEF2FF", borderRadius:8, padding:"8px 10px", marginBottom:8 }}>
              <p style={{ fontSize:9, fontWeight:700, color:"#4361EE", marginBottom:4 }}>Zari rewrote 8 bullets →</p>
              <p style={{ fontSize:9.5, color:"#14532D", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:6, padding:"5px 7px", lineHeight:1.45 }}>Led end-to-end supply chain redesign · 22% faster fulfilment · £340K saved</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ flex:1, height:4, borderRadius:99, background:"#E4E8F5", overflow:"hidden" }}>
                <div style={{ width:"89%", height:"100%", background:"linear-gradient(90deg,#4361EE,#06B6D4)", borderRadius:99 }} />
              </div>
              <span style={{ fontSize:9.5, fontWeight:800, color:"#4361EE" }}>89</span>
            </div>
            <p style={{ fontSize:9, color:"#A0AABF", marginTop:3 }}>Score after Zari rewrites</p>
            <button style={{ marginTop:10, width:"100%", fontSize:10, fontWeight:700, padding:"7px", borderRadius:8, border:"none", background:"#4361EE", color:"white", cursor:"pointer" }}>⬇ Download optimized resume</button>
          </div>
        </div>
      </div>
    ),
  },
  {
    id:"voice",
    tag:"Voice Coaching",
    headline:"Talk to a real coach, not a chatbot.",
    sub:"Zari listens, responds, and remembers. Voice or text — run mock interviews, work through blockers, or just talk strategy. Every session builds on the last.",
    points:["Real-time voice analysis — tone, filler words, pacing","STAR interview practice with instant feedback","Session memory that persists across every call","Switch voice ↔ text at any point"],
    visual: (
      <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 12px 40px rgba(0,0,0,0.08)" }}>
        <div style={{ background:"#F5F7FF", borderBottom:"1px solid #E4E8F5", padding:"12px 16px", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ width:7,height:7,borderRadius:"50%",background:"#22C55E",animation:"blink 1.1s ease-in-out infinite",display:"inline-block" }} />
          <span style={{ fontSize:11, color:"#22C55E", fontWeight:700 }}>Live Session · 06:42</span>
          <span style={{ marginLeft:"auto", fontSize:11, color:"#A0AABF" }}>Career Direction · Session 5</span>
        </div>
        <div style={{ padding:"16px 18px" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
            <ZariAvatarDemo size={80} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { role:"coach", text:"Your resume now shows impact. Let's work on interview stories. Tell me about a time you got stakeholder buy-in against resistance." },
              { role:"user",  text:"I had to convince Finance to approve a 6-week project that didn't have an obvious ROI…" },
              { role:"coach", text:"Good start. Strengthen the Result — what specifically changed after they approved? Numbers land harder in panels." },
            ].map((m,i) => (
              <div key={i} style={{ display:"flex", gap:7, flexDirection: m.role==="user"?"row-reverse":"row" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, background:m.role==="coach"?"linear-gradient(135deg,#4361EE,#818CF8)":"#E4E8F5", color:m.role==="coach"?"white":"#68738A" }}>
                  {m.role==="coach"?"Z":"S"}
                </div>
                <div style={{ maxWidth:"78%", padding:"8px 11px", fontSize:11, lineHeight:1.55, borderRadius:m.role==="coach"?"3px 12px 12px 12px":"12px 3px 12px 12px", background:m.role==="coach"?"#FAFBFF":"#4361EE", color:m.role==="coach"?"#1E2235":"white", border:m.role==="coach"?"1px solid #E4E8F5":"none" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12, display:"flex", gap:6, alignItems:"center", background:"#F5F7FF", borderRadius:10, padding:"7px 10px", border:"1px solid #E4E8F5" }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:"#4361EE", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" style={{ width:13,height:13 }}><path d="M10 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 9v1a6 6 0 0012 0V9"/><line x1="10" y1="15" x2="10" y2="18"/></svg>
            </div>
            <div style={{ flex:1, height:4, borderRadius:99, background:"#E4E8F5", overflow:"hidden" }}>
              <div style={{ width:"55%", height:"100%", background:"linear-gradient(90deg,#4361EE,#06B6D4)", borderRadius:99, animation:"voice-wave 1.2s ease-in-out infinite alternate" }} />
            </div>
            <span style={{ fontSize:10, color:"#A0AABF" }}>Speaking…</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id:"interview",
    tag:"Mock Interviews",
    headline:"Overprepared before you walk in the room.",
    sub:"Zari asks the exact questions panels use. Your answer is scored on STAR structure, evidence quality, and leadership signal — in real time.",
    points:["Library of 200+ behavioral and case questions","STAR scoring on structure, evidence, concision","Voice recording — practice like it's the real thing","Personalized coaching note after every answer"],
    visual: (
      <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 12px 40px rgba(0,0,0,0.08)" }}>
        <div style={{ background:"linear-gradient(135deg,#4361EE,#6378F0)", padding:"18px 18px 16px" }}>
          <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"rgba(255,255,255,0.6)", marginBottom:8 }}>Behavioral · Senior PM Round</div>
          <p style={{ fontSize:13, fontWeight:600, color:"white", lineHeight:1.55 }}>Tell me about a time you led a cross-functional initiative that faced significant resistance.</p>
          <div style={{ marginTop:10, display:"flex", gap:5 }}>
            {["Situation","Task","Action","Result"].map(s=>(
              <span key={s} style={{ fontSize:9, fontWeight:600, padding:"2px 7px", borderRadius:99, background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.85)" }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ padding:"14px 16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:10 }}>
            {[
              { l:"STAR Structure", v:88, c:"#16A34A" },
              { l:"Evidence", v:82, c:"#16A34A" },
              { l:"Impact clarity", v:64, c:"#D97706" },
              { l:"Concision", v:58, c:"#D97706" },
            ].map(s => (
              <div key={s.l} style={{ background:"#FAFBFF", border:"1px solid #F1F5F9", borderRadius:8, padding:"8px 10px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:9.5, color:"#68738A" }}>{s.l}</span>
                  <span style={{ fontSize:11, fontWeight:800, color:s.c }}>{s.v}</span>
                </div>
                <div style={{ height:3, borderRadius:99, background:"#E4E8F5", overflow:"hidden" }}>
                  <div style={{ width:`${s.v}%`, height:"100%", background:s.c, borderRadius:99 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#EEF2FF", borderRadius:8, padding:"9px 11px" }}>
            <p style={{ fontSize:9.5, fontWeight:700, color:"#4361EE", marginBottom:3 }}>Coaching note</p>
            <p style={{ fontSize:10, color:"#3451D1", lineHeight:1.5 }}>Strong structure. Add a specific number to your Result — &ldquo;Finance approved 2 weeks early, which shipped the feature before the competitor.&rdquo;</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id:"linkedin",
    tag:"LinkedIn",
    headline:"Recruiter-searchable in one session.",
    sub:"Zari rewrites your headline, about section, and bullet points for maximum recruiter visibility — scored against live job postings for your target role.",
    points:["Headline rewrite optimized for recruiter search","About section rebuilt for your target role","Skills gap analysis against real job descriptions","Visibility score from 54 to 91 in one session"],
    visual: (
      <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 12px 40px rgba(0,0,0,0.08)" }}>
        <div style={{ background:"#F5F7FF", borderBottom:"1px solid #E4E8F5", padding:"12px 16px", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:6, background:"#0A66C2", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:14, fontWeight:900, color:"white", lineHeight:1 }}>in</span>
          </div>
          <span style={{ fontSize:11, fontWeight:600, color:"#1E2235" }}>LinkedIn Optimizer · Zari</span>
        </div>
        <div style={{ padding:"14px 16px" }}>
          <div style={{ display:"flex", gap:10, marginBottom:12 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"white", flexShrink:0 }}>S</div>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:"#0A0A0F" }}>Steve Ngoumnai</div>
              <div style={{ fontSize:10, color:"#DC2626", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:5, padding:"2px 7px", marginTop:3, display:"inline-block" }}>⚠ Operations Lead @ FinCo Ltd — not PM-indexed</div>
            </div>
          </div>
          <div style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:8, padding:"9px 11px", marginBottom:8 }}>
            <p style={{ fontSize:9, fontWeight:700, color:"#16A34A", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>Zari rewrote your headline →</p>
            <p style={{ fontSize:11.5, fontWeight:600, color:"#14532D", lineHeight:1.45 }}>Senior PM Candidate · Cross-functional strategy · Product-led operations · Transition in progress</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
            {[{l:"Visibility",b:54,a:91,c:"#16A34A"},{l:"Keywords",b:38,a:84,c:"#4361EE"},{l:"Strength",b:62,a:88,c:"#0284C7"}].map(s=>(
              <div key={s.l} style={{ background:"#FAFBFF", border:"1px solid #F1F5F9", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                <div style={{ fontSize:9, color:"#A0AABF", marginBottom:2 }}>{s.l}</div>
                <div style={{ display:"flex", alignItems:"baseline", justifyContent:"center", gap:3 }}>
                  <span style={{ fontSize:10, color:"#DC2626", textDecoration:"line-through" }}>{s.b}</span>
                  <span style={{ fontSize:16, fontWeight:900, color:s.c }}>{s.a}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

/* ─── Stats ─── */
const STATS = [
  { val:"94%", label:"Call-back rate after resume session" },
  { val:"3×",  label:"More recruiter views after LinkedIn overhaul" },
  { val:"87%", label:"Feel more confident after mock interviews" },
  { val:"14k+",label:"Coaching sessions completed" },
];

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    function tick(now: number) {
      const p = Math.min((now - startTime) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

/* ─── NAV ─── */
function Nav({ userId }: { userId?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, transition:"all 0.3s", background: scrolled?"rgba(255,255,255,0.95)":"transparent", backdropFilter: scrolled?"blur(12px)":"none", borderBottom: scrolled?"1px solid #E4E8F5":"1px solid transparent" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:9, textDecoration:"none" }}>
          <ZariLogo size={28} />
          <span style={{ fontSize:17, fontWeight:800, color:"#0A0A0F", letterSpacing:"-0.03em" }}>Zari</span>
        </Link>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <a href="#how-it-works" style={{ fontSize:14, color:"#68738A", textDecoration:"none", fontWeight:500, transition:"color 0.2s" }}>How it works</a>
          <a href="#features" style={{ fontSize:14, color:"#68738A", textDecoration:"none", fontWeight:500, transition:"color 0.2s" }}>Features</a>
          <a href="#reviews" style={{ fontSize:14, color:"#68738A", textDecoration:"none", fontWeight:500, transition:"color 0.2s" }}>Reviews</a>
          <Link href="/login" style={{ fontSize:14, color:"#68738A", textDecoration:"none", fontWeight:500 }}>Sign in</Link>
          <Link href={userId ? "/dashboard" : "/signup"} style={{ fontSize:13.5, fontWeight:700, padding:"8px 18px", borderRadius:10, background:"#0A0A0F", color:"white", textDecoration:"none", transition:"all 0.2s" }}>
            {userId ? "Dashboard" : "Get started free"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Video person card (CSS-animated person placeholder) ─── */
function PersonCard({ name, role, offset, bg }: { name: string; role: string; offset: number; bg: string }) {
  return (
    <div style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.10)", border:"1px solid #E4E8F5", flexShrink:0, width:220 }}>
      {/* Video area */}
      <div style={{ height:160, background:bg, position:"relative", overflow:"hidden" }}>
        {/* Simulated person silhouette */}
        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.25)", marginBottom:-4 }} />
          <div style={{ width:80, height:70, borderRadius:"40px 40px 0 0", background:"rgba(255,255,255,0.15)" }} />
        </div>
        {/* Live chip */}
        <div style={{ position:"absolute", top:10, left:10, display:"flex", alignItems:"center", gap:5, fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:99, background:"rgba(0,0,0,0.5)", color:"white" }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:"#22C55E", animation:`blink ${1.2+offset*0.1}s ease-in-out infinite` }} />
          LIVE
        </div>
        {/* Wave bars */}
        <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", display:"flex", gap:2, alignItems:"flex-end" }}>
          {[6,10,14,10,18,12,8,14,10,6].map((h,i) => (
            <div key={i} style={{ width:3, borderRadius:99, background:"rgba(255,255,255,0.6)", height:h, animation:`voice-wave ${0.5+i*0.08}s ease-in-out ${offset*0.1+i*0.04}s infinite alternate` }} />
          ))}
        </div>
      </div>
      {/* Info */}
      <div style={{ padding:"10px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"white" }}>
            {name[0]}
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:"#0A0A0F" }}>{name}</div>
            <div style={{ fontSize:10, color:"#A0AABF" }}>{role}</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:2 }}>
            {[1,2,3,4,5].map(i=><svg key={i} viewBox="0 0 12 12" fill="#F59E0B" style={{ width:9, height:9 }}><path d="M6 1l1.2 2.5L10 4l-2 2 .5 2.8L6 7.5 3.5 8.8 4 6 2 4l2.8-.5z"/></svg>)}
          </div>
        </div>
        <p style={{ fontSize:10, color:"#68738A", marginTop:6, lineHeight:1.45 }}>&ldquo;{name === "Marcus" ? "Got the Google offer after 6 sessions" : name === "Priya" ? "4 callbacks in 1 week after resume rewrite" : "LinkedIn views went from 2 to 19 per week"}&rdquo;</p>
      </div>
    </div>
  );
}

/* ─── Use case tab section ─── */
function UseCaseTabs() {
  const [active, setActive] = useState(0);
  const uc = USE_CASES[active];

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display:"flex", gap:4, background:"#F5F7FF", borderRadius:14, padding:4, marginBottom:32, width:"fit-content", margin:"0 auto 32px" }}>
        {USE_CASES.map((u, i) => (
          <button key={u.id} onClick={() => setActive(i)} style={{ padding:"8px 20px", borderRadius:11, border:"none", cursor:"pointer", fontSize:13, fontWeight:600, background: active===i?"white":"transparent", color: active===i?"#0A0A0F":"#68738A", boxShadow: active===i?"0 1px 4px rgba(0,0,0,0.10)":"none", transition:"all 0.2s" }}>
            {u.tag}
          </button>
        ))}
      </div>

      {/* Content */}
      <div key={uc.id} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center", animation:"bubble-appear 0.4s ease both" }}>
        {/* Left */}
        <div>
          <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em", color:"#4361EE", background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.18)", padding:"4px 12px", borderRadius:99, display:"inline-block", marginBottom:16 }}>
            {uc.tag}
          </span>
          <h3 style={{ fontSize:32, fontWeight:900, lineHeight:1.15, letterSpacing:"-0.035em", color:"#0A0A0F", marginBottom:14 }}>
            {uc.headline}
          </h3>
          <p style={{ fontSize:16, color:"#68738A", lineHeight:1.7, marginBottom:22 }}>{uc.sub}</p>
          <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
            {uc.points.map(pt => (
              <li key={pt} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:14.5, color:"#1E2235" }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="#4361EE" strokeWidth="2.5" style={{ width:16, height:16, flexShrink:0, marginTop:2 }}><polyline points="4,10 8,14 16,6" /></svg>
                {pt}
              </li>
            ))}
          </ul>
          <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px", borderRadius:12, background:"#0A0A0F", color:"white", fontSize:14.5, fontWeight:700, textDecoration:"none", transition:"all 0.2s" }}>
            Try {uc.tag} free
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:16, height:16 }}><path d="M5 10h10M12 7l3 3-3 3"/></svg>
          </Link>
        </div>
        {/* Right: visual */}
        <div>
          {uc.visual}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════ */
export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily:"var(--font-geist-sans, Inter, system-ui, sans-serif)", background:"white", color:"#0A0A0F", minHeight:"100vh" }}>
      <style>{`
        @keyframes marquee-x { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes aurora-a { 0%,100%{transform:translate(-50%,-5%) scale(1)} 50%{transform:translate(-50%,5%) scale(1.08)} }
        @keyframes aurora-b { 0%,100%{transform:translate(0,0) scale(1)} 60%{transform:translate(-30px,20px) scale(1.05)} }
        @keyframes bubble-appear { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes voice-wave { from{height:3px} to{height:100%} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes reveal-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .reveal { opacity:0; animation: reveal-up 0.6s ease forwards; }
        .reveal-1 { animation-delay: 0.1s; }
        .reveal-2 { animation-delay: 0.2s; }
        .reveal-3 { animation-delay: 0.3s; }
        .reveal-4 { animation-delay: 0.4s; }
        a:hover { opacity: 0.8; }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        @keyframes float-gentle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fade-slide-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <Nav />

      {/* ══════ HERO ══════ */}
      <section style={{ paddingTop:120, paddingBottom:0, background:"white", position:"relative", overflow:"hidden" }}>
        {/* Aurora blobs */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
          <div style={{ position:"absolute", width:800, height:800, top:"-20%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(ellipse, rgba(67,97,238,0.07) 0%, transparent 65%)", animation:"aurora-a 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:500, height:400, top:"5%", right:"-5%", background:"radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 65%)", animation:"aurora-b 24s ease-in-out infinite" }} />
        </div>

        <div style={{ maxWidth:760, margin:"0 auto", padding:"0 24px", textAlign:"center", position:"relative" }}>
          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"6px 14px", borderRadius:99, background:"#F5F7FF", border:"1px solid #E4E8F5", fontSize:12.5, fontWeight:600, color:"#4361EE", marginBottom:28, animation:"bubble-appear 0.5s ease both" }}>
            <ZariLogo size={16} />
            The AI coach that actually gets you hired
          </div>

          <h1 className="reveal reveal-1" style={{ fontSize:"clamp(3rem,6vw,5.2rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.045em", color:"#0A0A0F", marginBottom:22 }}>
            Your career coach<br />
            <span style={{ background:"linear-gradient(135deg,#4361EE 0%,#818CF8 40%,#06B6D4 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>is always on.</span>
          </h1>

          <p className="reveal reveal-2" style={{ fontSize:19, lineHeight:1.65, color:"#68738A", maxWidth:560, margin:"0 auto 36px" }}>
            Upload your resume. Run a voice session. Practice interviews. Get your LinkedIn rebuilt. Zari does all of it — with memory, with voice, with a real face.
          </p>

          {/* CTAs */}
          <div className="reveal reveal-3" style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:24 }}>
            <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", borderRadius:12, background:"#0A0A0F", color:"white", fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 8px 24px rgba(0,0,0,0.14)", transition:"all 0.2s" }}>
              Get started free
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:16, height:16 }}><path d="M5 10h10M12 7l3 3-3 3"/></svg>
            </Link>
            <Link href="/login" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", borderRadius:12, border:"1.5px solid #E4E8F5", background:"white", color:"#0A0A0F", fontSize:15, fontWeight:600, textDecoration:"none", transition:"all 0.2s" }}>
              Sign in
            </Link>
          </div>

          {/* Social proof */}
          <div className="reveal reveal-4" style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:20, fontSize:13, color:"#A0AABF" }}>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              {Array.from({length:5}).map((_,i)=><svg key={i} viewBox="0 0 16 16" fill="#F59E0B" style={{ width:12,height:12 }}><path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/></svg>)}
              <span style={{ marginLeft:4 }}>4.9 · Loved by 1,200+ candidates</span>
            </div>
            <span>·</span>
            <span>No credit card</span>
            <span>·</span>
            <span>Free tier forever</span>
          </div>
        </div>

        {/* Hero visual — people cards + avatar */}
        <div style={{ maxWidth:1160, margin:"56px auto 0", padding:"0 24px", position:"relative" }}>
          {/* Center: Zari avatar */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:32, position:"relative" }}>
            {/* Left person cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:12, animation:"float-gentle 5s ease-in-out infinite" }}>
              <PersonCard name="Marcus" role="Backend Engineer" offset={0} bg="linear-gradient(135deg,#4361EE,#6378F0)" />
            </div>
            {/* Zari avatar center */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
              <div style={{ background:"white", borderRadius:24, border:"1.5px solid #E4E8F5", padding:"32px 40px 24px", boxShadow:"0 20px 60px rgba(0,0,0,0.08)", textAlign:"center", minWidth:240 }}>
                <ZariAvatarDemo size={140} />
                <div style={{ marginTop:16, fontSize:15, fontWeight:800, color:"#0A0A0F" }}>Zari</div>
                <div style={{ fontSize:12.5, color:"#68738A" }}>AI Career Coach</div>
                <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:6, justifyContent:"center", fontSize:11, fontWeight:600, color:"#22C55E", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:99, padding:"4px 12px" }}>
                  <span style={{ width:6,height:6,borderRadius:"50%",background:"#22C55E",animation:"blink 1.1s ease-in-out infinite" }} />
                  Always available
                </div>
              </div>
            </div>
            {/* Right person card */}
            <div style={{ display:"flex", flexDirection:"column", gap:12, animation:"float-gentle 6s ease-in-out 1s infinite" }}>
              <PersonCard name="Priya" role="Product Manager" offset={1} bg="linear-gradient(135deg,#7C3AED,#A78BFA)" />
            </div>
          </div>

          {/* Bottom fade */}
          <div style={{ height:80, background:"linear-gradient(to bottom, transparent, white)", marginTop:-80, position:"relative", zIndex:2 }} />
        </div>
      </section>

      {/* ══════ LOGO MARQUEE ══════ */}
      <section style={{ borderTop:"1px solid #F1F5F9", borderBottom:"1px solid #F1F5F9", background:"#FAFBFF", padding:"28px 0", overflow:"hidden" }}>
        <p style={{ textAlign:"center", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.18em", color:"#A0AABF", marginBottom:18 }}>
          Used by candidates targeting
        </p>
        <div style={{ overflow:"hidden", maskImage:"linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage:"linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:56, animation:"marquee-x 28s linear infinite", whiteSpace:"nowrap" }}>
            {[...LOGOS,...LOGOS].map((l,i) => (
              <span key={i} style={{ fontSize:14.5, fontWeight:700, color:"#C4CDD8", letterSpacing:"-0.01em" }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section id="how-it-works" style={{ padding:"100px 24px", background:"white" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:"#4361EE", background:"#EEF2FF", padding:"5px 14px", borderRadius:99, display:"inline-block", marginBottom:14 }}>How it works</p>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", lineHeight:1.1, margin:"0 auto 14px", maxWidth:520 }}>
              From upload to offer in four steps.
            </h2>
            <p style={{ fontSize:17, color:"#68738A", maxWidth:480, margin:"0 auto" }}>
              No complicated setup. No generic advice. Just results.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, position:"relative" }}>
            {/* Connecting line */}
            <div style={{ position:"absolute", top:40, left:"12.5%", right:"12.5%", height:1.5, background:"linear-gradient(90deg,#E4E8F5,#4361EE,#06B6D4,#E4E8F5)", zIndex:0 }} />
            {STEPS.map((s,i) => (
              <div key={s.n} style={{ textAlign:"center", padding:"0 20px", position:"relative", zIndex:1, animation:`fade-slide-up 0.5s ease ${i*0.12}s both` }}>
                <div style={{ width:64, height:64, borderRadius:"50%", background:"white", border:"2px solid #E4E8F5", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 4px 16px rgba(0,0,0,0.06)", color:"#4361EE", position:"relative" }}>
                  {s.icon}
                  <span style={{ position:"absolute", top:-8, right:-8, width:20, height:20, borderRadius:"50%", background:"#4361EE", color:"white", fontSize:9.5, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{i+1}</span>
                </div>
                <h3 style={{ fontSize:16, fontWeight:800, color:"#0A0A0F", marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:13.5, color:"#68738A", lineHeight:1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURES (animated tabs) ══════ */}
      <section id="features" style={{ padding:"100px 24px", background:"#FAFBFF" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:"#4361EE", background:"#EEF2FF", padding:"5px 14px", borderRadius:99, display:"inline-block", marginBottom:14 }}>Every tool you need</p>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", lineHeight:1.1, margin:"0 auto", maxWidth:560 }}>
              Built for every stage of your search.
            </h2>
          </div>
          <UseCaseTabs />
        </div>
      </section>

      {/* ══════ SOCIAL PROOF — video cards + testimonials ══════ */}
      <section id="reviews" style={{ padding:"100px 24px", background:"white", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", lineHeight:1.1, marginBottom:12 }}>
              Candidates who showed up differently.
            </h2>
            <p style={{ fontSize:17, color:"#68738A" }}>Real sessions. Real results. Real offers.</p>
          </div>

          {/* Video cards row */}
          <div style={{ display:"flex", gap:16, marginBottom:48, overflow:"hidden", maskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)", WebkitMaskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <div style={{ display:"flex", gap:16, animation:"marquee-x 40s linear infinite" }}>
              {[
                { name:"Sofia",  role:"UX Designer → Figma",   bg:"linear-gradient(135deg,#EC4899,#F472B6)", offset:0 },
                { name:"James",  role:"EM → Meta",              bg:"linear-gradient(135deg,#0284C7,#38BDF8)", offset:1 },
                { name:"Aya",    role:"Analyst → Product",      bg:"linear-gradient(135deg,#16A34A,#4ADE80)", offset:2 },
                { name:"Daniel", role:"Ops Lead → Shopify PM",  bg:"linear-gradient(135deg,#D97706,#FCD34D)", offset:3 },
                { name:"Sofia",  role:"UX Designer → Figma",   bg:"linear-gradient(135deg,#EC4899,#F472B6)", offset:4 },
                { name:"James",  role:"EM → Meta",              bg:"linear-gradient(135deg,#0284C7,#38BDF8)", offset:5 },
                { name:"Aya",    role:"Analyst → Product",      bg:"linear-gradient(135deg,#16A34A,#4ADE80)", offset:6 },
                { name:"Daniel", role:"Ops Lead → Shopify PM",  bg:"linear-gradient(135deg,#D97706,#FCD34D)", offset:7 },
              ].map((p,i) => (
                <PersonCard key={i} name={p.name} role={p.role} offset={p.offset} bg={p.bg} />
              ))}
            </div>
          </div>

          {/* Testimonial grid */}
          <div style={{ columns:"3 220px", gap:16 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ breakInside:"avoid", background:"#FAFBFF", border:"1px solid #E4E8F5", borderRadius:16, padding:22, marginBottom:16 }}>
                <div style={{ display:"flex", gap:2, marginBottom:12 }}>
                  {Array.from({length:t.stars}).map((_,i)=><svg key={i} viewBox="0 0 16 16" fill="#F59E0B" style={{ width:14,height:14 }}><path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/></svg>)}
                </div>
                <p style={{ fontSize:14.5, lineHeight:1.7, color:"#1E2235", marginBottom:16 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:14, borderTop:"1px solid #F1F5F9" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"white", flexShrink:0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>{t.name}</div>
                    <div style={{ fontSize:11, color:"#A0AABF" }}>{t.role}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:"#4361EE" }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section ref={statsRef} style={{ padding:"80px 24px", background:"#FAFBFF", borderTop:"1px solid #F1F5F9", borderBottom:"1px solid #F1F5F9" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
          {STATS.map((s,i) => (
            <div key={s.label} style={{ textAlign:"center", padding:"20px 16px", borderRight: i<3?"1px solid #E4E8F5":"none" }}>
              <div style={{ fontSize:"clamp(2.2rem,4vw,3.2rem)", fontWeight:900, color:"#4361EE", letterSpacing:"-0.04em", lineHeight:1 }}>{s.val}</div>
              <div style={{ fontSize:13, color:"#68738A", marginTop:8, lineHeight:1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section style={{ padding:"100px 24px", background:"white" }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F" }}>
              Frequently asked.
            </h2>
          </div>
          {[
            { q:"Is the free tier actually useful?", a:"Yes. One session per coaching surface is enough to see whether Zari works for you. Most users have their strongest insight in that first session." },
            { q:"How is this different from ChatGPT?", a:"ChatGPT is a general assistant. Zari is a specialized career coach with four dedicated surfaces, session memory, voice mode, an animated avatar, and outputs designed for job searching." },
            { q:"What does session memory mean?", a:"Every session is summarized and stored. Session 5 knows exactly what happened in sessions 1–4 — your target role, blockers, materials — without you re-explaining anything." },
            { q:"When do I pick a plan?", a:"You choose a plan after signing up and seeing what Zari can do. There's no credit card required to get started and the free tier is genuinely useful." },
            { q:"Does it work for career changers?", a:"It was built for them. Zari has a dedicated career direction surface trained on hundreds of transition narratives — it helps you reframe your background for a new industry, not just polish existing experience." },
          ].map((faq, i) => (
            <details key={i} style={{ borderBottom:"1px solid #F1F5F9" }}>
              <summary style={{ padding:"18px 0", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:15, fontWeight:600, color:"#0A0A0F", listStyle:"none" }}>
                {faq.q}
                <svg viewBox="0 0 20 20" fill="none" stroke="#A0AABF" strokeWidth="2" style={{ width:18, height:18, flexShrink:0 }}><path d="M5 8l5 5 5-5"/></svg>
              </summary>
              <p style={{ paddingBottom:18, fontSize:14.5, lineHeight:1.7, color:"#68738A", margin:0 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section style={{ padding:"100px 24px", background:"#0A0A0F", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", width:600, height:600, top:"-30%", left:"50%", transform:"translateX(-50%)", background:"rgba(67,97,238,0.25)", filter:"blur(120px)", borderRadius:"50%", animation:"aurora-a 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:300, height:300, bottom:"-10%", right:"10%", background:"rgba(6,182,212,0.15)", filter:"blur(80px)", borderRadius:"50%", animation:"aurora-b 22s ease-in-out infinite" }} />
        </div>
        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <ZariAvatarDemo size={80} />
          <h2 style={{ fontSize:"clamp(2.2rem,4.5vw,3.4rem)", fontWeight:900, letterSpacing:"-0.04em", color:"white", lineHeight:1.1, margin:"24px auto 16px" }}>
            Start coaching today.
          </h2>
          <p style={{ fontSize:17, color:"rgba(255,255,255,0.55)", marginBottom:36 }}>
            No card. No friction. Zari is ready when you are.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <Link href="/signup" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 30px", borderRadius:12, background:"white", color:"#0A0A0F", fontSize:15, fontWeight:800, textDecoration:"none", transition:"all 0.2s" }}>
              Get started free
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:16, height:16 }}><path d="M5 10h10M12 7l3 3-3 3"/></svg>
            </Link>
            <Link href="/login" style={{ display:"inline-flex", alignItems:"center", padding:"14px 24px", borderRadius:12, border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.06)", color:"white", fontSize:15, fontWeight:600, textDecoration:"none", transition:"all 0.2s" }}>
              Sign in
            </Link>
          </div>
          <p style={{ marginTop:20, fontSize:12.5, color:"rgba(255,255,255,0.30)" }}>Free forever · No credit card · Choose a plan after you see the value</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:"1px solid #F1F5F9", padding:"40px 24px", background:"white" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <ZariLogo size={22} />
            <span style={{ fontSize:15, fontWeight:800, color:"#0A0A0F" }}>Zari</span>
            <span style={{ fontSize:12, color:"#A0AABF", marginLeft:8 }}>© 2026 Askia Technologies</span>
          </div>
          <div style={{ display:"flex", gap:24, fontSize:13, color:"#68738A" }}>
            <Link href="/login" style={{ color:"#68738A", textDecoration:"none" }}>Sign in</Link>
            <Link href="/signup" style={{ color:"#68738A", textDecoration:"none" }}>Sign up</Link>
            <a href="#features" style={{ color:"#68738A", textDecoration:"none" }}>Features</a>
            <a href="#reviews" style={{ color:"#68738A", textDecoration:"none" }}>Reviews</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
