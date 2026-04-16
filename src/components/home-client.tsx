"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";
import { PortalPreview } from "@/components/portal-preview";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const LOGOS = [
  { name:"Google",     src:"/logos/google.svg"     },
  { name:"Meta",       src:"/logos/meta.svg"       },
  { name:"Microsoft",  src:"/logos/microsoft.svg"  },
  { name:"Amazon",     src:"/logos/amazon.svg"     },
  { name:"Stripe",     src:"/logos/stripe.svg"     },
  { name:"Figma",      src:"/logos/figma.svg"      },
  { name:"Shopify",    src:"/logos/shopify.svg"    },
  { name:"Notion",     src:"/logos/notion.svg"     },
  { name:"Netflix",    src:"/logos/netflix.svg"    },
  { name:"Slack",      src:"/logos/slack.svg"      },
  { name:"GitHub",     src:"/logos/github.svg"     },
  { name:"Salesforce", src:"/logos/salesforce.svg" },
  { name:"Uber",       src:"/logos/uber.svg"       },
  { name:"Snowflake",  src:"/logos/snowflake.svg"  },
  { name:"Databricks", src:"/logos/databricks.svg" },
];

/* Human persona avatars */
const PEOPLE = [
  { name:"Marcus J.",    role:"Backend Engineer → Google",  photo:"https://i.pravatar.cc/150?img=12", color1:"#4361EE", color2:"#818CF8", initials:"MJ", quote:"I did 6 mock sessions with Zari before my Google loop. The real thing felt easier. Got the offer.", stars:5, tag:"Interview prep" },
  { name:"Priya M.",     role:"Product Manager → Notion",   photo:"https://i.pravatar.cc/150?img=5",  color1:"#7C3AED", color2:"#A78BFA", initials:"PM", quote:"The resume feedback was specific to the point of being uncomfortable — it knew exactly what was wrong.", stars:5, tag:"Resume" },
  { name:"Aaliyah R.",   role:"Data Scientist → Stripe",    photo:"https://i.pravatar.cc/150?img=47", color1:"#0284C7", color2:"#38BDF8", initials:"AR", quote:"The LinkedIn session rebuilt my headline and I got 3 recruiter DMs the same week.", stars:5, tag:"LinkedIn" },
  { name:"Daniel K.",    role:"Ops Lead → Shopify PM",      photo:"https://i.pravatar.cc/150?img=33", color1:"#059669", color2:"#34D399", initials:"DK", quote:"4 callbacks in 1 week after one resume session. The bullet rewrites were shockingly specific.", stars:5, tag:"Resume" },
  { name:"Sofia L.",     role:"UX Designer → Figma",        photo:"https://i.pravatar.cc/150?img=25", color1:"#DC2626", color2:"#F87171", initials:"SL", quote:"The STAR scoring is insane. It tells you which word to cut and why. I felt overprepared walking in.", stars:5, tag:"Interview" },
  { name:"James T.",     role:"Eng Manager → Meta",         photo:"https://i.pravatar.cc/150?img=60", color1:"#D97706", color2:"#FCD34D", initials:"JT", quote:"LinkedIn views went from 2 to 19 a week. Just changed the headline. Nothing else.", stars:5, tag:"LinkedIn" },
  { name:"Camille D.",   role:"Finance Analyst → Stripe PM",photo:"https://i.pravatar.cc/150?img=9",  color1:"#7C3AED", color2:"#C4B5FD", initials:"CD", quote:"Went in thinking I needed a new resume. Came out with a new career strategy. It's a different tool.", stars:5, tag:"Coaching" },
  { name:"Ryan O.",      role:"Sales Lead → Google APM",    photo:"https://i.pravatar.cc/150?img=52", color1:"#0284C7", color2:"#7DD3FC", initials:"RO", quote:"The voice sessions are unreal. It actually pushes back when your answer is weak. No fluff.", stars:5, tag:"Interview prep" },
];

const FEATURES = [
  {
    tag:"Resume",
    headline:"Upload your resume.\nGet a job-ready version tonight.",
    body:"Zari reads every bullet like a recruiter would. ATS score, keyword gaps, line-by-line rewrites with impact metrics injected — and a downloadable final version.",
    bullets:["ATS keyword scan against your target role","Bullet rewrites with metrics and impact","Before / after score showing exact gains","One-click download of optimized resume"],
    mockup: "resume",
  },
  {
    tag:"Voice Coaching",
    headline:"Talk to a real coach,\nnot a chatbot.",
    body:"Voice or text — run mock interviews, work through blockers, talk strategy. Zari listens, responds, and remembers everything across every session.",
    bullets:["Real-time voice with STAR feedback","Session memory across every call","Switch voice ↔ text at any point","Avatar that reacts as you speak"],
    mockup: "session",
  },
  {
    tag:"Mock Interview",
    headline:"Overprepared\nbefore you walk in.",
    body:"Zari asks the exact questions panels use. Your answer is scored on STAR structure, evidence quality, and leadership signal — in real time, question by question.",
    bullets:["200+ behavioral and case questions","6-dimension STAR scoring per answer","Voice recording — practice like it's real","Coaching note after every answer"],
    mockup: "interview",
  },
  {
    tag:"LinkedIn",
    headline:"Recruiter-searchable\nin one session.",
    body:"Zari rewrites your headline, about section, and bullets for maximum recruiter visibility — scored against live job postings for your exact target role.",
    bullets:["Headline rewrite for recruiter search","About section for your target role","Keyword gap vs real job descriptions","Visibility score from 54 to 91"],
    mockup: "linkedin",
  },
];

const STATS = [
  { val:"94%",  label:"Call-back rate after resume session" },
  { val:"3×",   label:"More recruiter views after LinkedIn" },
  { val:"87%",  label:"Feel more confident after mock interviews" },
  { val:"14k+", label:"Coaching sessions completed" },
];

/* ══════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════ */
function Nav({ userId }: { userId: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      height:60,
      background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      transition:"all 0.3s ease",
    }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 28px", height:"100%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:9, textDecoration:"none" }}>
          <ZariLogo size={26} />
          <span style={{ fontSize:17, fontWeight:900, color:"#0A0A0F", letterSpacing:"-0.04em" }}>Zari</span>
        </Link>
        <div style={{ display:"flex", alignItems:"center", gap:28 }}>
          <a href="#features" style={{ fontSize:14, fontWeight:500, color:"#68738A", textDecoration:"none" }}>Features</a>
          <a href="#reviews" style={{ fontSize:14, fontWeight:500, color:"#68738A", textDecoration:"none" }}>Reviews</a>
          <Link href="/login" style={{ fontSize:14, fontWeight:500, color:"#68738A", textDecoration:"none" }}>Sign in</Link>
          <Link href={userId ? "/dashboard" : "/signup"} style={{
            display:"inline-flex", alignItems:"center", gap:7,
            padding:"9px 20px", borderRadius:10,
            background:"#0A0A0F", color:"white",
            fontSize:13.5, fontWeight:700, textDecoration:"none",
            transition:"opacity 0.2s",
          }}>
            {userId ? "Dashboard" : "Get started free"}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:13,height:13 }}><path d="M3 8h10M9 5l3 3-3 3"/></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════
   PERSON CARD — feels like a real face is present
══════════════════════════════════════════════════ */
function PersonCard({ p, size = "lg" }: { p: typeof PEOPLE[0]; size?: "sm"|"lg" }) {
  const s = size === "lg";
  return (
    <div style={{
      background:"white", borderRadius: s ? 18 : 14,
      border:"1px solid #E4E8F5",
      padding: s ? "20px" : "14px",
      boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
      display:"flex", flexDirection:"column", gap: s ? 14 : 10,
      flexShrink:0,
    }}>
      {/* Avatar — real photo */}
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ position:"relative", width: s?48:36, height: s?48:36, flexShrink:0 }}>
          {/* Photo ring */}
          <div style={{ position:"absolute", inset:-2, borderRadius:"50%", background:`linear-gradient(135deg,${p.color1},${p.color2})`, opacity:0.4 }}/>
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.photo}
            alt={p.name}
            style={{
              position:"absolute", inset:0,
              width:"100%", height:"100%",
              borderRadius:"50%",
              objectFit:"cover",
              border:"2px solid white",
            }}
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              const fallback = el.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          {/* Fallback initials (hidden by default) */}
          <div style={{
            position:"absolute", inset:0, display:"none",
            borderRadius:"50%",
            background:`linear-gradient(135deg,${p.color1},${p.color2})`,
            alignItems:"center", justifyContent:"center",
            fontSize: s ? 16 : 12, fontWeight:800, color:"white",
          }}>
            {p.initials}
          </div>
          {/* Verified dot */}
          <div style={{ position:"absolute", bottom:-1, right:-1, width: s?14:10, height: s?14:10, borderRadius:"50%", background:"#22C55E", border:"2px solid white", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {s && <svg viewBox="0 0 8 8" fill="white" style={{ width:6,height:6 }}><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.2" fill="none"/></svg>}
          </div>
        </div>
        <div>
          <div style={{ fontSize: s?14:11, fontWeight:700, color:"#0A0A0F" }}>{p.name}</div>
          <div style={{ fontSize: s?11:9.5, color:"#68738A" }}>{p.role}</div>
        </div>
        <div style={{ marginLeft:"auto" }}>
          <span style={{ fontSize: s?10:8.5, fontWeight:700, padding:"2px 8px", borderRadius:99, background:"#EEF2FF", color:"#4361EE", border:"1px solid rgba(67,97,238,0.2)" }}>{p.tag}</span>
        </div>
      </div>

      {/* Stars */}
      <div style={{ display:"flex", gap:2 }}>
        {Array.from({length:p.stars}).map((_,i) => (
          <svg key={i} viewBox="0 0 12 12" fill="#F59E0B" style={{ width: s?13:10, height: s?13:10 }}>
            <path d="M6 1l1.2 2.5 2.8.4-2 2 .5 2.8L6 7.5 3.5 8.7 4 5.9 2 3.9l2.8-.4z"/>
          </svg>
        ))}
      </div>

      <p style={{ fontSize: s?14:11.5, color:"#1E2235", lineHeight:1.65, fontStyle:"italic" }}>
        &ldquo;{p.quote}&rdquo;
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE SECTION — Kleo-style left copy / right mockup
══════════════════════════════════════════════════ */
function FeatureSection({ f, flip, idx }: { f:typeof FEATURES[0]; flip:boolean; idx:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display:"grid",
      gridTemplateColumns: flip ? "1fr 1fr" : "1fr 1fr",
      gap:72,
      alignItems:"center",
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition:"all 0.7s ease",
    }}>
      {/* Text — left or right based on flip */}
      <div style={{ order: flip ? 2 : 1 }}>
        <span style={{
          display:"inline-block", fontSize:11, fontWeight:700, textTransform:"uppercase",
          letterSpacing:"0.16em", color:"#4361EE",
          background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)",
          padding:"4px 12px", borderRadius:99, marginBottom:18,
        }}>{f.tag}</span>
        <h2 style={{
          fontSize:"clamp(1.9rem,3.2vw,2.6rem)",
          fontWeight:900, letterSpacing:"-0.04em",
          color:"#0A0A0F", lineHeight:1.1,
          marginBottom:16, whiteSpace:"pre-line",
        }}>{f.headline}</h2>
        <p style={{ fontSize:16.5, color:"#68738A", lineHeight:1.7, marginBottom:24 }}>{f.body}</p>
        <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
          {f.bullets.map(b => (
            <li key={b} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:15, color:"#1E2235" }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="#4361EE" strokeWidth="2.5" style={{ width:17,height:17,flexShrink:0,marginTop:2 }}><polyline points="4,10 8,14 16,6"/></svg>
              {b}
            </li>
          ))}
        </ul>
        <Link href="/signup" style={{
          display:"inline-flex", alignItems:"center", gap:8,
          padding:"12px 24px", borderRadius:12,
          background:"#0A0A0F", color:"white",
          fontSize:14.5, fontWeight:700, textDecoration:"none",
        }}>
          Try {f.tag} free
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:14,height:14 }}><path d="M3 8h10M9 5l3 3-3 3"/></svg>
        </Link>
      </div>

      {/* Mini portal preview — right or left */}
      <div style={{ order: flip ? 1 : 2 }}>
        <FeatureMockup type={f.mockup} />
      </div>
    </div>
  );
}

/* ── Animated step-cycling mockups for each feature ── */
function FeatureMockup({ type }: { type: string }) {
  const [step, setStep] = useState(0);
  const RESUME_STEPS = 3;
  const SESSION_MSGS = 3;
  const INTERVIEW_STEPS = 2;
  const LINKEDIN_STEPS = 2;

  useEffect(() => {
    let total = RESUME_STEPS;
    if (type === "session")   total = SESSION_MSGS + 1;
    if (type === "interview") total = INTERVIEW_STEPS;
    if (type === "linkedin")  total = LINKEDIN_STEPS;

    const durations: Record<string, number[]> = {
      resume:    [2800, 3200, 4500],
      session:   [1800, 1800, 1800, 4000],
      interview: [3500, 5000],
      linkedin:  [3000, 5000],
    };
    const dur = (durations[type] ?? [3000])[step] ?? 3000;
    const t = setTimeout(() => setStep(s => (s + 1) % total), dur);
    return () => clearTimeout(t);
  }, [step, type]);

  if (type === "resume") {
    const STEPS = ["Upload", "Analyze", "Results"] as const;
    return (
    <div style={{ background:"white", borderRadius:18, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 16px 56px rgba(0,0,0,0.10)" }}>
      <div style={{ background:"#F8F9FB", borderBottom:"1px solid #E4E8F5", padding:"10px 14px", display:"flex", gap:5, alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:8, fontSize:10, color:"#A0AABF" }}>Resume Review · Zari</span>
      </div>

      {/* Step indicator */}
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"12px 18px 0" }}>
        {STEPS.map((s,i)=>(
          <div key={s} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700,
              color: i < step ? "#16A34A" : i === step ? "#4361EE" : "#C4CDD8",
              transition:"color 0.4s" }}>
              <div style={{
                width:20, height:20, borderRadius:"50%",
                background: i < step ? "#F0FFF4" : i === step ? "#EEF2FF" : "#F5F7FF",
                border:`1.5px solid ${i < step ? "#BBF7D0" : i === step ? "rgba(67,97,238,0.4)" : "#E4E8F5"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:9, fontWeight:900,
                color: i < step ? "#16A34A" : i === step ? "#4361EE" : "#C4CDD8",
                transition:"all 0.4s",
              }}>{i < step ? "✓" : i+1}</div>
              {s}
            </div>
            {i < 2 && <div style={{ width:16, height:1, background: i < step ? "#BBF7D0" : "#E4E8F5", transition:"background 0.4s" }}/>}
          </div>
        ))}
      </div>

      <div style={{ padding:"14px 18px 18px", minHeight:240 }}>
        {/* STEP 0: Upload dropzone */}
        {step === 0 && (
          <div style={{
            border:"2px dashed #C7D2FE", borderRadius:14, padding:"28px 18px",
            textAlign:"center", background:"#F8F9FF",
            animation:"bubble-appear 0.4s ease",
          }}>
            <div style={{ fontSize:28, marginBottom:8 }}>📄</div>
            <p style={{ fontSize:13, fontWeight:700, color:"#4361EE", marginBottom:4 }}>Drop your resume here</p>
            <p style={{ fontSize:11, color:"#A0AABF", marginBottom:16 }}>PDF or DOCX · up to 10MB</p>
            <div style={{ fontSize:10, color:"#818CF8", fontWeight:600, background:"#EEF2FF", borderRadius:99, padding:"4px 14px", display:"inline-block" }}>
              Uploading: resume_v3_final.pdf
            </div>
            {/* Upload progress */}
            <div style={{ marginTop:14, height:4, borderRadius:99, background:"#E4E8F5", overflow:"hidden" }}>
              <div style={{ height:"100%", background:"linear-gradient(90deg,#4361EE,#818CF8)", borderRadius:99, animation:"upload-bar 2.6s ease forwards" }}/>
            </div>
          </div>
        )}

        {/* STEP 1: Analyzing */}
        {step === 1 && (
          <div style={{ animation:"bubble-appear 0.4s ease" }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#4361EE", marginBottom:12, display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ width:8,height:8,borderRadius:"50%",background:"#4361EE",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>
              Zari is reading your resume…
            </p>
            {[
              { label:"Reading format & structure",  done:true  },
              { label:"Scanning ATS keyword gaps",   done:true  },
              { label:"Scoring bullet impact",       done:false },
              { label:"Generating rewrites",         done:false },
            ].map((item, idx) => (
              <div key={item.label} style={{
                display:"flex", alignItems:"center", gap:9, marginBottom:9,
                opacity: idx < 2 ? 1 : 0.45,
                animation:`bubble-appear 0.35s ${idx * 0.18}s both ease`,
              }}>
                <div style={{
                  width:18, height:18, borderRadius:"50%", flexShrink:0,
                  background: item.done ? "#F0FFF4" : "#F1F5F9",
                  border:`1.5px solid ${item.done ? "#86EFAC" : "#E4E8F5"}`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color: item.done ? "#16A34A" : "#A0AABF",
                }}>
                  {item.done ? "✓" : <span style={{ width:6,height:6,borderRadius:"50%",background:"#C4CDD8",animation:`dot-bounce 1.1s ${idx*0.2}s infinite`,display:"inline-block" }}/>}
                </div>
                <span style={{ fontSize:11.5, color: item.done ? "#1E2235" : "#A0AABF" }}>{item.label}</span>
              </div>
            ))}
            <div style={{ marginTop:14, height:4, borderRadius:99, background:"#E4E8F5", overflow:"hidden" }}>
              <div style={{ height:"100%", width:"62%", background:"linear-gradient(90deg,#4361EE,#818CF8)", borderRadius:99, animation:"analyze-bar 3s ease forwards" }}/>
            </div>
          </div>
        )}

        {/* STEP 2: Results */}
        {step === 2 && (
          <div style={{ animation:"bubble-appear 0.4s ease" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7, marginBottom:13 }}>
              {[{l:"Overall",v:89,c:"#4361EE"},{l:"ATS",v:91,c:"#16A34A"},{l:"Impact",v:84,c:"#0284C7"},{l:"Clarity",v:87,c:"#7C3AED"}].map((s,idx)=>(
                <div key={s.l} style={{ textAlign:"center", background:"#FAFBFF", borderRadius:10, border:"1px solid #F1F5F9", padding:"9px 4px", animation:`bubble-appear 0.3s ${idx*0.1}s both ease` }}>
                  <div style={{ fontSize:20, fontWeight:900, color:s.c, lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:8.5, color:"#A0AABF", marginTop:2 }}>{s.l}</div>
                  <div style={{ height:3, borderRadius:99, background:"#F1F5F9", marginTop:4 }}><div style={{ width:`${s.v}%`,height:"100%",background:s.c,borderRadius:99,transition:"width 1s ease" }}/></div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:8, animation:"bubble-appear 0.3s 0.4s both ease" }}>
              <p style={{ fontSize:9, fontWeight:700, color:"#DC2626", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Before</p>
              <p style={{ fontSize:10.5, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:7, padding:"6px 9px", textDecoration:"line-through" }}>Managed supply chain redesign across 5 business units</p>
            </div>
            <div style={{ marginBottom:12, animation:"bubble-appear 0.3s 0.6s both ease" }}>
              <p style={{ fontSize:9, fontWeight:700, color:"#16A34A", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>After Zari →</p>
              <p style={{ fontSize:10.5, color:"#14532D", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:7, padding:"6px 9px", lineHeight:1.5 }}>Led end-to-end supply chain redesign · 22% faster fulfilment · £340K savings · exec buy-in in 3 weeks</p>
            </div>
            <button style={{ width:"100%", fontSize:11.5, fontWeight:700, padding:"9px", borderRadius:9, border:"none", background:"#4361EE", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, animation:"bubble-appear 0.3s 0.75s both ease" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:11,height:11 }}><path d="M8 3v8M4 8l4 4 4-4"/></svg>
              Download optimized resume
            </button>
          </div>
        )}
      </div>
    </div>
    );
  }

  if (type === "session") {
    const MSGS = [
      { role:"coach", text:"Your resume numbers are working. Now let's build the same specificity into interview stories." },
      { role:"user",  text:"Ready — let's do the cross-functional leadership question." },
      { role:"coach", text:"Great. I'll ask it the way a real panel would. Take your time, use STAR structure." },
    ];
    const visibleMsgs = step >= SESSION_MSGS ? MSGS : MSGS.slice(0, step + 1);

    return (
    <div style={{ background:"white", borderRadius:18, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 16px 56px rgba(0,0,0,0.10)" }}>
      <div style={{ background:"#F8F9FB", borderBottom:"1px solid #E4E8F5", padding:"10px 14px", display:"flex", alignItems:"center", gap:8 }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }}/>)}
        <span style={{ display:"flex", alignItems:"center", gap:5, marginLeft:8, fontSize:10, fontWeight:700, color:"#22C55E" }}>
          <span style={{ width:6,height:6,borderRadius:"50%",background:"#22C55E",animation:"blink 1.1s ease-in-out infinite",display:"inline-block" }}/>
          Live · 06:42
        </span>
      </div>
      <div style={{ padding:16 }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
            <span style={{ fontSize:26, fontWeight:900, color:"white" }}>Z</span>
            <div style={{ position:"absolute", inset:-5, borderRadius:"50%", border:"2px solid rgba(67,97,238,0.2)", animation:"ring-pulse 2.5s ease-out infinite" }}/>
            <div style={{ position:"absolute", inset:-10, borderRadius:"50%", border:"1.5px solid rgba(67,97,238,0.1)", animation:"ring-pulse 2.5s 0.8s ease-out infinite" }}/>
          </div>
        </div>

        {visibleMsgs.map((m,i) => (
          <div key={i} style={{ display:"flex", gap:7, marginBottom:9, flexDirection:m.role==="user"?"row-reverse":"row", animation:"bubble-appear 0.3s ease" }}>
            <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,background:m.role==="coach"?"linear-gradient(135deg,#4361EE,#818CF8)":"#E4E8F5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:m.role==="coach"?"white":"#68738A" }}>
              {m.role==="coach"?"Z":"S"}
            </div>
            <div style={{ maxWidth:"76%", padding:"7px 10px", fontSize:11, lineHeight:1.55, borderRadius:m.role==="coach"?"3px 11px 11px 11px":"11px 3px 11px 11px", background:m.role==="coach"?"#FAFBFF":"#4361EE", color:m.role==="coach"?"#1E2235":"white", border:m.role==="coach"?"1px solid #E4E8F5":"none" }}>
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator when coach is about to reply */}
        {step < SESSION_MSGS && step % 2 === 0 && (
          <div style={{ display:"flex", gap:7, marginBottom:9, animation:"bubble-appear 0.3s ease" }}>
            <div style={{ width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#4361EE,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:"white" }}>Z</div>
            <div style={{ padding:"9px 12px", borderRadius:"3px 11px 11px 11px", background:"#FAFBFF", border:"1px solid #E4E8F5", display:"flex", gap:4, alignItems:"center" }}>
              {[0,1,2].map(i=><span key={i} style={{ width:5,height:5,borderRadius:"50%",background:"#A0AABF",animation:`dot-bounce 1.2s ${i*0.15}s infinite`,display:"inline-block" }}/>)}
            </div>
          </div>
        )}

        {/* Voice bar */}
        <div style={{ marginTop:8, display:"flex", gap:2, alignItems:"flex-end", justifyContent:"center", height:20 }}>
          {[8,12,18,24,16,22,14,10,20,16,12,8].map((h,i) => (
            <div key={i} style={{ width:3, borderRadius:99, background:"#4361EE", height:h, opacity:0.6, animation:`voice-wave ${0.4+i*0.07}s ease-in-out ${i*0.04}s infinite alternate` }}/>
          ))}
        </div>
      </div>
    </div>
    );
  }

  if (type === "interview") {
    return (
    <div style={{ background:"white", borderRadius:18, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 16px 56px rgba(0,0,0,0.10)" }}>
      <div style={{ background:"#F8F9FB", borderBottom:"1px solid #E4E8F5", padding:"10px 14px", display:"flex", gap:5, alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:8, fontSize:10, color:"#A0AABF" }}>Mock Interview · Q2 of 6</span>
        {step === 0 && <span style={{ marginLeft:"auto", fontSize:9.5, fontWeight:700, color:"#EF4444", display:"flex", alignItems:"center", gap:4 }}>
          <span style={{ width:6,height:6,borderRadius:"50%",background:"#EF4444",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>Recording
        </span>}
      </div>
      <div style={{ padding:16 }}>
        {/* Question card — always visible */}
        <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A8A)", borderRadius:12, padding:13, marginBottom:13 }}>
          <div style={{ fontSize:8.5, textTransform:"uppercase", letterSpacing:"0.12em", color:"rgba(255,255,255,0.5)", marginBottom:6 }}>Behavioral · Senior PM</div>
          <p style={{ fontSize:12, fontWeight:600, color:"white", lineHeight:1.55, margin:0 }}>Tell me about a time you led a cross-functional initiative that faced significant resistance.</p>
          <div style={{ marginTop:9, display:"flex", gap:5 }}>
            {["S","T","A","R"].map(s=><span key={s} style={{ fontSize:9, fontWeight:700, width:18, height:18, borderRadius:"50%", background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.85)", display:"flex", alignItems:"center", justifyContent:"center" }}>{s}</span>)}
          </div>
        </div>

        {/* STEP 0: Recording — voice waveform */}
        {step === 0 && (
          <div style={{ animation:"bubble-appear 0.35s ease" }}>
            <p style={{ fontSize:10.5, color:"#68738A", marginBottom:10, textAlign:"center" }}>Your answer is being recorded…</p>
            <div style={{ display:"flex", gap:2, alignItems:"flex-end", justifyContent:"center", height:28, marginBottom:14 }}>
              {[6,10,18,28,20,32,18,24,14,22,16,10,6].map((h,i) => (
                <div key={i} style={{ width:4, borderRadius:99, background:"#EF4444", height:h, opacity:0.7, animation:`voice-wave ${0.35+i*0.06}s ease-in-out ${i*0.04}s infinite alternate` }}/>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <div style={{ fontSize:10, color:"#A0AABF", background:"#F8F9FB", border:"1px solid #E4E8F5", borderRadius:99, padding:"3px 12px" }}>00:47</div>
              <button style={{ fontSize:10, fontWeight:700, color:"white", background:"#EF4444", border:"none", borderRadius:99, padding:"3px 14px", cursor:"pointer" }}>Stop</button>
            </div>
          </div>
        )}

        {/* STEP 1: Scoring results */}
        {step === 1 && (
          <div style={{ animation:"bubble-appear 0.35s ease" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:11 }}>
              {[
                { l:"STAR Structure", v:88, c:"#16A34A" },
                { l:"Evidence",       v:82, c:"#16A34A" },
                { l:"Impact",         v:64, c:"#D97706" },
                { l:"Concision",      v:58, c:"#D97706" },
              ].map((s,idx) => (
                <div key={s.l} style={{ background:"#FAFBFF", border:"1px solid #F1F5F9", borderRadius:8, padding:"8px 10px", animation:`bubble-appear 0.3s ${idx*0.1}s both ease` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:9.5, color:"#68738A" }}>{s.l}</span>
                    <span style={{ fontSize:11, fontWeight:800, color:s.c }}>{s.v}</span>
                  </div>
                  <div style={{ height:3, borderRadius:99, background:"#E4E8F5" }}><div style={{ width:`${s.v}%`,height:"100%",background:s.c,borderRadius:99,transition:"width 0.8s ease" }}/></div>
                </div>
              ))}
            </div>

            <div style={{ background:"#EEF2FF", borderRadius:10, padding:"10px 12px", animation:"bubble-appear 0.3s 0.45s both ease" }}>
              <p style={{ fontSize:10, fontWeight:700, color:"#4361EE", marginBottom:4 }}>Zari&apos;s coaching note</p>
              <p style={{ fontSize:10.5, color:"#3451D1", lineHeight:1.55, margin:0 }}>Strong structure. Add a number to your Result: &ldquo;Finance signed off 2 weeks early — we shipped before the competitor.&rdquo;</p>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }

  if (type === "linkedin") {
    const scores = {
      0: [{l:"Visibility",v:61,c:"#EF4444"},{l:"Keywords",v:54,c:"#EF4444"},{l:"Strength",v:72,c:"#D97706"}],
      1: [{l:"Visibility",v:91,c:"#16A34A"},{l:"Keywords",v:84,c:"#4361EE"},{l:"Strength",v:88,c:"#0284C7"}],
    }[step] ?? [];
    return (
    <div style={{ background:"white", borderRadius:18, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 16px 56px rgba(0,0,0,0.10)" }}>
      <div style={{ background:"#F8F9FB", borderBottom:"1px solid #E4E8F5", padding:"10px 14px", display:"flex", gap:5, alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:8, fontSize:10, color:"#A0AABF" }}>LinkedIn Optimizer · Zari</span>
        {step === 1 && <span style={{ marginLeft:"auto", fontSize:9, fontWeight:700, color:"#16A34A", background:"#F0FFF4", border:"1px solid #BBF7D0", padding:"2px 8px", borderRadius:99 }}>Optimized ✓</span>}
      </div>
      <div style={{ padding:16 }}>
        {/* Scores — animate from bad to good */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7, marginBottom:14 }}>
          {scores.map((s,idx)=>(
            <div key={s.l} style={{ textAlign:"center", background:"#FAFBFF", border:"1px solid #F1F5F9", borderRadius:10, padding:"10px 6px", animation:`bubble-appear 0.3s ${idx*0.08}s both ease` }}>
              <div style={{ fontSize:22, fontWeight:900, color:s.c, lineHeight:1, transition:"all 0.6s ease" }}>{s.v}</div>
              <div style={{ fontSize:9, color:"#A0AABF" }}>{s.l}</div>
              <div style={{ height:3, borderRadius:99, background:"#F1F5F9", marginTop:4 }}><div style={{ width:`${s.v}%`,height:"100%",background:s.c,borderRadius:99,transition:"width 0.8s ease" }}/></div>
            </div>
          ))}
        </div>

        {/* STEP 0: Current (bad) profile */}
        {step === 0 && (
          <div style={{ animation:"bubble-appear 0.3s ease" }}>
            <p style={{ fontSize:9.5, fontWeight:700, color:"#DC2626", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:5 }}>Your current headline</p>
            <p style={{ fontSize:12, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"8px 10px", marginBottom:12 }}>Operations Lead at FinCo Ltd</p>
            <p style={{ fontSize:9.5, fontWeight:700, color:"#DC2626", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:5 }}>About section</p>
            <p style={{ fontSize:11, color:"#991B1B", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"8px 10px", lineHeight:1.5 }}>I am an experienced operations professional with 8 years of experience in financial services.</p>
            <div style={{ marginTop:12, fontSize:11, color:"#A0AABF", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#4361EE",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>
              Zari is rewriting…
            </div>
          </div>
        )}

        {/* STEP 1: Rewritten profile */}
        {step === 1 && (
          <div style={{ animation:"bubble-appear 0.35s ease" }}>
            <p style={{ fontSize:9.5, fontWeight:700, color:"#16A34A", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:5 }}>Zari&apos;s headline →</p>
            <p style={{ fontSize:12, fontWeight:600, color:"#14532D", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:8, padding:"8px 10px", marginBottom:12, lineHeight:1.45 }}>Product-Minded Ops Leader → Senior PM | Cross-Functional Strategy · £340K Impact</p>
            <p style={{ fontSize:9.5, fontWeight:700, color:"#16A34A", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:5 }}>Rewritten about →</p>
            <p style={{ fontSize:11, color:"#14532D", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:8, padding:"8px 10px", lineHeight:1.5, marginBottom:10 }}>Operations leader transitioning into Product. 8 years scaling financial systems → now applying that cross-functional muscle to shipping product.</p>
            <button style={{ width:"100%", fontSize:11.5, fontWeight:700, padding:"9px", borderRadius:9, border:"none", background:"#0A66C2", color:"white", cursor:"pointer" }}>Copy to LinkedIn →</button>
          </div>
        )}
      </div>
    </div>
    );
  }

  return null;
}

/* ══════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════ */
export function HomeClient({ userId }: { userId: boolean }) {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrentReview(i => (i+1) % PEOPLE.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily:"var(--font-geist-sans,Inter,-apple-system,sans-serif)", background:"white", color:"#0A0A0F" }}>
      <style>{`
        @keyframes marquee-x { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes voice-wave { from{height:3px} to{height:100%} }
        @keyframes ring-pulse { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        @keyframes float-up { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes aurora-slow { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,15px) scale(1.04)} }
        @keyframes eye-glow { 0%,100%{opacity:0.9} 50%{opacity:0.5} }
        @keyframes neural-orbit-a { from{transform:rotate(0deg) translate(28px)} to{transform:rotate(360deg) translate(28px)} }
        @keyframes neural-orbit-b { from{transform:rotate(0deg) translate(20px)} to{transform:rotate(360deg) translate(20px)} }
        @keyframes aurora-pulse { 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes sphere-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes bubble-appear { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes upload-bar { 0%{width:0%} 100%{width:100%} }
        @keyframes analyze-bar { 0%{width:0%} 60%{width:62%} 100%{width:62%} }
        @keyframes listen-ripple { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.8);opacity:0} }
        * { box-sizing: border-box; }
        a { transition: opacity 0.15s; } a:hover { opacity: 0.75; }
      `}</style>

      <Nav userId={userId} />

      {/* ══════ HERO ══════ */}
      <section style={{ paddingTop:100, background:"white", position:"relative", overflow:"hidden" }}>
        {/* Subtle aurora */}
        <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", width:700, height:700, top:"-10%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(ellipse, rgba(67,97,238,0.06) 0%, transparent 65%)" }}/>
          <div style={{ position:"absolute", width:400, height:300, top:"20%", right:"0%", background:"radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 60%)", animation:"aurora-slow 22s ease-in-out infinite" }}/>
        </div>

        <div style={{ maxWidth:780, margin:"0 auto", padding:"0 28px 56px", textAlign:"center", position:"relative" }}>
          {/* Eyebrow */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:12.5, fontWeight:600, color:"#4361EE", background:"#F0F4FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:99, padding:"5px 14px", marginBottom:28 }}>
            <ZariLogo size={15} />
            #1 AI Career Coach — voice, avatar, memory
          </div>

          <h1 style={{
            fontSize:"clamp(3rem,5.8vw,5rem)",
            fontWeight:900, lineHeight:1.04,
            letterSpacing:"-0.045em",
            color:"#0A0A0F",
            marginBottom:22,
          }}>
            Landing your next role<br />
            has{" "}
            <span style={{
              background:"linear-gradient(135deg,#4361EE 0%,#818CF8 50%,#06B6D4 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>never been easier.</span>
          </h1>

          <p style={{ fontSize:18.5, lineHeight:1.7, color:"#68738A", maxWidth:540, margin:"0 auto 36px" }}>
            Zari reviews your resume, rebuilds your LinkedIn, runs live mock interviews, and coaches you with voice and a real animated avatar — with memory that builds across every session.
          </p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:22 }}>
            <Link href={userId ? "/dashboard" : "/signup"} style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"14px 30px", borderRadius:12,
              background:"#0A0A0F", color:"white",
              fontSize:15, fontWeight:800, textDecoration:"none",
              boxShadow:"0 8px 32px rgba(0,0,0,0.16)",
            }}>
              {userId ? "Open dashboard" : "Get started free"}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:14,height:14 }}><path d="M3 8h10M9 5l3 3-3 3"/></svg>
            </Link>
            <Link href="/login" style={{
              display:"inline-flex", alignItems:"center",
              padding:"14px 24px", borderRadius:12,
              border:"1.5px solid #E4E8F5", background:"white",
              color:"#0A0A0F", fontSize:15, fontWeight:600, textDecoration:"none",
            }}>
              Sign in
            </Link>
          </div>

          {/* Social proof row */}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:18, fontSize:13, color:"#A0AABF" }}>
            {/* Stacked avatars */}
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ display:"flex" }}>
                {PEOPLE.slice(0,4).map((p, idx) => (
                  <div key={idx} style={{ width:28, height:28, borderRadius:"50%", border:"2px solid white", overflow:"hidden", marginLeft: idx>0?-8:0, background:`linear-gradient(135deg,${p.color1},${p.color2})`, flexShrink:0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photo} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:2 }}>
                {Array.from({length:5}).map((_,i)=><svg key={i} viewBox="0 0 12 12" fill="#F59E0B" style={{ width:12,height:12 }}><path d="M6 1l1.2 2.5 2.8.4-2 2 .5 2.8L6 7.5 3.5 8.7 4 5.9 2 3.9l2.8-.4z"/></svg>)}
              </div>
              <span>Loved by 1,200+ candidates</span>
            </div>
            <span style={{ color:"#E4E8F5" }}>·</span>
            <span>No credit card</span>
            <span style={{ color:"#E4E8F5" }}>·</span>
            <span>Free tier forever</span>
          </div>
        </div>

        {/* ── PORTAL PREVIEW — interactive, in-hero ── */}
        <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 20px 0" }}>
          {/* Shadow fade wrapper */}
          <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 28px 80px rgba(0,0,0,0.13), 0 2px 0 rgba(255,255,255,0.8) inset", border:"1px solid rgba(0,0,0,0.06)" }}>
            <PortalPreview />
          </div>
          {/* Bottom fade into next section */}
          <div style={{ height:80, background:"linear-gradient(to bottom, transparent, white)", marginTop:-80, position:"relative", zIndex:2 }}/>
        </div>
      </section>

      {/* ══════ LOGO MARQUEE ══════ */}
      <section style={{ background:"#FAFBFF", borderTop:"1px solid #F1F5F9", borderBottom:"1px solid #F1F5F9", padding:"28px 0", overflow:"hidden" }}>
        <p style={{ textAlign:"center", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.18em", color:"#A0AABF", marginBottom:18 }}>
          Used by candidates targeting
        </p>
        <div style={{ overflow:"hidden", WebkitMaskImage:"linear-gradient(to right,transparent,black 8%,black 92%,transparent)", maskImage:"linear-gradient(to right,transparent,black 8%,black 92%,transparent)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:52, animation:"marquee-x 32s linear infinite", whiteSpace:"nowrap" }}>
            {[...LOGOS,...LOGOS].map((l,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"center", height:28, flexShrink:0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.src}
                  alt={l.name}
                  style={{ height:22, maxWidth:90, objectFit:"contain", filter:"grayscale(1) opacity(0.35)" }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const fallback = img.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "inline";
                  }}
                />
                <span style={{ display:"none", fontSize:13, fontWeight:700, color:"#C4CDD8" }}>{l.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PEOPLE — social proof with real faces feel ══════ */}
      <section id="reviews" style={{ padding:"96px 28px", background:"white", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,2.8rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:12 }}>
              Candidates who showed up differently.
            </h2>
            <p style={{ fontSize:17, color:"#68738A" }}>Real sessions. Real results. Real offers.</p>
          </div>

          {/* Scrolling row of person cards */}
          <div style={{ position:"relative", overflow:"hidden", WebkitMaskImage:"linear-gradient(to right,transparent,black 4%,black 96%,transparent)", maskImage:"linear-gradient(to right,transparent,black 4%,black 96%,transparent)" }}>
            <div style={{ display:"flex", gap:16, animation:"marquee-x 36s linear infinite" }}>
              {[...PEOPLE,...PEOPLE].map((p,i) => (
                <div key={i} style={{ width:320, flexShrink:0 }}>
                  <PersonCard p={p} size="lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, marginTop:64, borderTop:"1px solid #F1F5F9", borderBottom:"1px solid #F1F5F9" }}>
            {STATS.map((s,i) => (
              <div key={s.label} style={{ textAlign:"center", padding:"32px 16px", borderRight: i<3?"1px solid #F1F5F9":"none" }}>
                <div style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, color:"#4361EE", letterSpacing:"-0.04em", lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:13.5, color:"#68738A", marginTop:8, lineHeight:1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURES — Kleo-style sections ══════ */}
      <section id="features" style={{ background:"#FAFBFF" }}>
        {FEATURES.map((f, i) => (
          <div key={f.tag} style={{ padding:"96px 28px", background: i%2===0?"#FAFBFF":"white" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
              <FeatureSection f={f} flip={i%2!==0} idx={i} />
            </div>
          </div>
        ))}
      </section>

      {/* ══════ FAQ ══════ */}
      <section style={{ padding:"96px 28px", background:"white" }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F" }}>
              Frequently asked.
            </h2>
          </div>
          {[
            { q:"Is the free tier actually useful?", a:"Yes. One session per coaching surface is enough to see whether Zari works for you. Most users have their strongest insight in that first session." },
            { q:"How is this different from ChatGPT?", a:"ChatGPT is a general assistant. Zari is a specialized career coach with dedicated surfaces, session memory, voice mode, and an animated avatar — built specifically for job searching." },
            { q:"What does session memory mean?", a:"Every session is summarized and stored. Session 5 knows everything from sessions 1–4 — your target role, blockers, materials — without you re-explaining anything." },
            { q:"When do I choose a plan?", a:"After signing up and seeing what Zari can do. No credit card required to start and the free tier is genuinely useful — not a stripped-down teaser." },
            { q:"Does it work for career changers?", a:"It was built for them. Zari helps you reframe your background for a new industry, not just polish existing experience." },
          ].map((faq,i) => (
            <details key={i} style={{ borderBottom:"1px solid #F1F5F9" }}>
              <summary style={{ padding:"18px 0", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:15.5, fontWeight:600, color:"#0A0A0F", listStyle:"none" }}>
                {faq.q}
                <svg viewBox="0 0 20 20" fill="none" stroke="#A0AABF" strokeWidth="2" style={{ width:18,height:18,flexShrink:0 }}><path d="M5 8l5 5 5-5"/></svg>
              </summary>
              <p style={{ paddingBottom:18, fontSize:15, lineHeight:1.7, color:"#68738A", margin:0 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section style={{ padding:"96px 28px", background:"#0A0A0F", position:"relative", overflow:"hidden" }}>
        <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", width:600, height:600, top:"-20%", left:"50%", transform:"translateX(-50%)", background:"rgba(67,97,238,0.22)", filter:"blur(120px)", borderRadius:"50%" }}/>
          <div style={{ position:"absolute", width:280, height:280, bottom:"-5%", right:"8%", background:"rgba(6,182,212,0.12)", filter:"blur(80px)", borderRadius:"50%" }}/>
        </div>

        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative" }}>
          {/* Person avatars arc */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <div style={{ display:"flex" }}>
              {PEOPLE.slice(0,5).map((p,i) => (
                <div key={i} style={{ width:44, height:44, borderRadius:"50%", border:"3px solid #0A0A0F", overflow:"hidden", marginLeft: i>0?-12:0, background:`linear-gradient(135deg,${p.color1},${p.color2})`, flexShrink:0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize:"clamp(2rem,4.5vw,3.4rem)", fontWeight:900, letterSpacing:"-0.04em", color:"white", lineHeight:1.08, marginBottom:16 }}>
            Start coaching today.
          </h2>
          <p style={{ fontSize:17, color:"rgba(255,255,255,0.5)", marginBottom:36 }}>
            No card. No friction. Zari is ready when you are.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <Link href={userId ? "/dashboard" : "/signup"} style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"14px 30px", borderRadius:12,
              background:"white", color:"#0A0A0F",
              fontSize:15, fontWeight:800, textDecoration:"none",
              boxShadow:"0 4px 24px rgba(255,255,255,0.12)",
            }}>
              {userId ? "Open dashboard" : "Get started free"}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:14,height:14 }}><path d="M3 8h10M9 5l3 3-3 3"/></svg>
            </Link>
            <Link href="/login" style={{
              display:"inline-flex", alignItems:"center",
              padding:"14px 24px", borderRadius:12,
              border:"1.5px solid rgba(255,255,255,0.18)",
              background:"rgba(255,255,255,0.06)",
              color:"white", fontSize:15, fontWeight:600, textDecoration:"none",
            }}>
              Sign in
            </Link>
          </div>
          <p style={{ marginTop:20, fontSize:13, color:"rgba(255,255,255,0.25)" }}>Free forever · No credit card · Choose your plan after you see the value</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:"1px solid #F1F5F9", padding:"40px 28px", background:"white" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <ZariLogo size={22} />
            <span style={{ fontSize:15, fontWeight:800, color:"#0A0A0F" }}>Zari</span>
            <span style={{ fontSize:12, color:"#A0AABF", marginLeft:6 }}>© 2026 Askia Technologies</span>
          </div>
          <div style={{ display:"flex", gap:24, fontSize:13.5, color:"#68738A" }}>
            <Link href="/login"  style={{ color:"#68738A", textDecoration:"none" }}>Sign in</Link>
            <Link href="/signup" style={{ color:"#68738A", textDecoration:"none" }}>Sign up</Link>
            <a href="#features"  style={{ color:"#68738A", textDecoration:"none" }}>Features</a>
            <a href="#reviews"   style={{ color:"#68738A", textDecoration:"none" }}>Reviews</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
