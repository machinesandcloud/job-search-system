"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";

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
  { name:"Marcus J.",    role:"Backend Eng → Staff Eng",    photo:"https://i.pravatar.cc/150?img=12", color1:"#4361EE", color2:"#818CF8", initials:"MJ", quote:"I'd been a Senior for 4 years. Zari helped me build the case — scope, impact, sponsorship. Got promoted in 5 months.", stars:5, tag:"Promotion" },
  { name:"Priya M.",     role:"PM → Senior PM at Notion",   photo:"https://i.pravatar.cc/150?img=5",  color1:"#7C3AED", color2:"#A78BFA", initials:"PM", quote:"The resume feedback was specific to the point of being uncomfortable — it knew exactly what was wrong.", stars:5, tag:"Resume" },
  { name:"Aaliyah R.",   role:"Data Scientist → Stripe",    photo:"https://i.pravatar.cc/150?img=47", color1:"#0284C7", color2:"#38BDF8", initials:"AR", quote:"The LinkedIn session rebuilt my headline and I got 3 recruiter DMs the same week.", stars:5, tag:"LinkedIn" },
  { name:"Daniel K.",    role:"Ops Lead → Shopify PM",      photo:"https://i.pravatar.cc/150?img=33", color1:"#059669", color2:"#34D399", initials:"DK", quote:"4 callbacks in 1 week after one resume session. The bullet rewrites were shockingly specific.", stars:5, tag:"Job Search" },
  { name:"Sofia L.",     role:"IC → Engineering Manager",   photo:"https://i.pravatar.cc/150?img=25", color1:"#DC2626", color2:"#F87171", initials:"SL", quote:"I used Zari to practice my manager pitch. It pushed back hard on weak answers. Felt completely ready for the real conversation.", stars:5, tag:"Promotion" },
  { name:"James T.",     role:"Director → VP Engineering",  photo:"https://i.pravatar.cc/150?img=60", color1:"#D97706", color2:"#FCD34D", initials:"JT", quote:"Zari helped me build executive presence in my communication. My skip-level feedback changed noticeably.", stars:5, tag:"Leadership" },
  { name:"Camille D.",   role:"Finance → Stripe PM",        photo:"https://i.pravatar.cc/150?img=9",  color1:"#7C3AED", color2:"#C4B5FD", initials:"CD", quote:"Career change from finance to product. Zari reframed my entire narrative. Without it I'd still be sending unanswered applications.", stars:5, tag:"Career Change" },
  { name:"Ryan O.",      role:"Sales Lead → Google APM",    photo:"https://i.pravatar.cc/150?img=52", color1:"#0284C7", color2:"#7DD3FC", initials:"RO", quote:"Zari ran the salary negotiation with me until it stopped feeling scary. Walked away with $28K more than the first offer.", stars:5, tag:"Negotiation" },
];

const FEATURES = [
  {
    tag:"Resume",
    headline:"Upload your resume.\nGet a job-ready version tonight.",
    body:"Zari reads every bullet like a recruiter would. ATS score, keyword gaps, line-by-line rewrites with impact metrics — and a downloadable final version.",
    bullets:["ATS keyword scan against your target role","Bullet rewrites with metrics and impact","Before / after score showing exact gains","One-click download of optimized resume"],
    mockup: "resume",
  },
  {
    tag:"Voice Coaching",
    headline:"A real coach.\nFor any stage of your career.",
    body:"Job hunting, chasing a promotion, navigating a pivot — Zari adapts. Voice or text, ask anything. Zari remembers every session and builds on what you've worked on.",
    bullets:["Fully adapts to your career stage","Session memory across every call","Switch voice ↔ text at any point","Avatar that reacts as you speak"],
    mockup: "session",
  },
  {
    tag:"Interviews & Pitches",
    headline:"Overprepared\nbefore the conversation.",
    body:"Panel interview or promotion pitch — Zari drills the exact questions they'll ask. Your answers are scored live on structure, evidence, and leadership signal.",
    bullets:["Behavioral, case, and panel questions","6-dimension STAR scoring per answer","Promotion pitch practice built-in","Coaching note after every answer"],
    mockup: "interview",
  },
  {
    tag:"LinkedIn",
    headline:"Recruiter-searchable\nin one session.",
    body:"Zari rewrites your headline, about, and bullets for maximum recruiter visibility — or repositions your profile to reflect a new level or career direction.",
    bullets:["Headline rewrite for recruiter search","About section rewritten for your goal","Keyword gap vs real job descriptions","Visibility score from 54 to 91"],
    mockup: "linkedin",
  },
  {
    tag:"Promotion Coaching",
    headline:"Make the case for\nyour next level.",
    body:"Zari builds your promotion narrative, prepares your pitch for your manager, and helps you close the gaps your performance review will surface.",
    bullets:["Build your case with evidence from your work","Promotion pitch rehearsal with feedback","Manager conversation simulation","Gap analysis vs your next-level rubric"],
    mockup: "promotion",
  },
  {
    tag:"Salary & Negotiation",
    headline:"Know your number.\nAsk for it with confidence.",
    body:"Zari runs the negotiation with you until it doesn't feel awkward. Counter-offer scripts, market benchmarks, real language you can use in the room.",
    bullets:["Market benchmark for your role and level","Counter-offer language and scripts","Negotiation simulation with pushback","Objection handling for every scenario"],
    mockup: "salary",
  },
];

/* ══ Wall of reviews ══ */
const WALL_REVIEWS = [
  { name:"Marcus J.",    role:"Backend Eng → Staff Eng",        photo:"https://i.pravatar.cc/150?img=12", color1:"#4361EE", color2:"#818CF8", quote:"Been Senior for 4 years with zero movement. One month with Zari and I finally had the story. Promoted in 5 months." },
  { name:"Priya M.",     role:"PM → Senior PM, Notion",         photo:"https://i.pravatar.cc/150?img=5",  color1:"#7C3AED", color2:"#A78BFA", quote:"Zari told me exactly what was wrong with my resume. Not vague feedback — line by line. Uncomfortable but it worked." },
  { name:"Aaliyah R.",   role:"Data Scientist, Stripe",         photo:"https://i.pravatar.cc/150?img=47", color1:"#0284C7", color2:"#38BDF8", quote:"Changed my LinkedIn headline with Zari. Got 3 recruiter DMs the same week. Changed nothing else." },
  { name:"Daniel K.",    role:"Ops Lead → Shopify PM",          photo:"https://i.pravatar.cc/150?img=33", color1:"#059669", color2:"#34D399", quote:"4 callbacks in one week after the resume session. I went from zero traction to two final rounds at the same time." },
  { name:"Sofia L.",     role:"IC → Engineering Manager",       photo:"https://i.pravatar.cc/150?img=25", color1:"#DC2626", color2:"#F87171", quote:"Practiced my manager pitch with Zari every day for two weeks. Walked into the real conversation completely calm. Got the role." },
  { name:"James T.",     role:"Director → VP Engineering",      photo:"https://i.pravatar.cc/150?img=60", color1:"#D97706", color2:"#FCD34D", quote:"My skip-level feedback changed noticeably within a quarter. My directs noticed before I told anyone I was working on it." },
  { name:"Camille D.",   role:"Finance → Stripe PM",            photo:"https://i.pravatar.cc/150?img=9",  color1:"#7C3AED", color2:"#C4B5FD", quote:"Six years in finance, zero product experience. Zari rebuilt my whole narrative. Without it I'd still be sending applications into the void." },
  { name:"Ryan O.",      role:"Sales Lead → Google APM",        photo:"https://i.pravatar.cc/150?img=52", color1:"#0284C7", color2:"#7DD3FC", quote:"Zari ran the negotiation sim with me until it stopped feeling scary. Walked away $28K above their opening offer." },
  { name:"Tanya W.",     role:"Analyst → Product, Meta",        photo:"https://i.pravatar.cc/150?img=16", color1:"#4361EE", color2:"#6EE7B7", quote:"STAR scoring showed me which exact word to cut and why. I felt overprepared. That's a great feeling walking into a panel." },
  { name:"Leo B.",       role:"Junior → Mid SWE, Airbnb",       photo:"https://i.pravatar.cc/150?img=67", color1:"#0284C7", color2:"#A5F3FC", quote:"Didn't know how to talk about side projects. Zari showed me how to frame them as real product experience. Got the offer." },
  { name:"Nina S.",      role:"CS grad → Figma PM",             photo:"https://i.pravatar.cc/150?img=48", color1:"#7C3AED", color2:"#F9A8D4", quote:"New grad, terrified of interviews. Zari coached me session by session. By interview day I wasn't nervous at all. Offer above band." },
  { name:"Omar A.",      role:"Consultant → Uber Strategy",     photo:"https://i.pravatar.cc/150?img=11", color1:"#059669", color2:"#86EFAC", quote:"It felt like talking to someone who'd been through my exact transition. Nothing generic. Every answer was specific to my situation." },
  { name:"Jess M.",      role:"SDR → RevOps PM, Salesforce",    photo:"https://i.pravatar.cc/150?img=29", color1:"#D97706", color2:"#FDE68A", quote:"Zari told me I was leaving money on the table. I countered to $148K. They said yes immediately. I almost left $18K on the table." },
  { name:"Dev P.",       role:"EM → Director, Snowflake",       photo:"https://i.pravatar.cc/150?img=57", color1:"#4361EE", color2:"#BAE6FD", quote:"Not 'be more strategic.' Actual specific things to do, week by week. The most useful coaching I've had in my career." },
  { name:"Fatoumata K.", role:"Ops Manager → LinkedIn PM",      photo:"https://i.pravatar.cc/150?img=20", color1:"#DC2626", color2:"#FCA5A5", quote:"Told twice I wasn't 'product enough.' Zari helped me reframe everything as product work. Third time: got the role." },
  { name:"Chris Y.",     role:"Senior PM → Staff PM, Notion",   photo:"https://i.pravatar.cc/150?img=61", color1:"#0284C7", color2:"#67E8F9", quote:"LinkedIn views went from 2 to 22 per week. Just the headline. Nothing else changed." },
  { name:"Aisha T.",     role:"Customer Success → PM, HubSpot", photo:"https://i.pravatar.cc/150?img=44", color1:"#7C3AED", color2:"#DDD6FE", quote:"I was told my whole career I wasn't technical enough. Zari showed me how to position customer insight as a superpower. HubSpot agreed." },
  { name:"Patrick H.",   role:"Sr PM → Group PM, Stripe",       photo:"https://i.pravatar.cc/150?img=51", color1:"#0284C7", color2:"#BAE6FD", quote:"Zari pushed me to counter twice. Most people stop at one. Ended up $22K above their so-called final offer." },
  { name:"Divya N.",     role:"QA Lead → PM, Microsoft",        photo:"https://i.pravatar.cc/150?img=38", color1:"#DC2626", color2:"#FECACA", quote:"3 years trying to break into PM. Zari diagnosed the problem in 20 minutes: I was describing tasks, not decisions. Fixed it. Microsoft hired me." },
  { name:"Tom F.",       role:"Principal PM → Director, Databricks", photo:"https://i.pravatar.cc/150?img=53", color1:"#D97706", color2:"#FEF3C7", quote:"My directs noticed I was running meetings differently before I told anyone I was working with Zari." },
  { name:"Grace K.",     role:"MBA → PM, Coinbase",             photo:"https://i.pravatar.cc/150?img=26", color1:"#4361EE", color2:"#A5B4FC", quote:"No product experience, just an MBA. Zari helped me build a narrative from academic projects that Coinbase actually bought." },
  { name:"Ivan M.",      role:"IC5 → IC6, Amazon",              photo:"https://i.pravatar.cc/150?img=62", color1:"#059669", color2:"#6EE7B7", quote:"Zari knew Amazon's leadership principles better than I did. Drilled me until I stopped saying 'we' instead of 'I'. That was the whole problem." },
  { name:"Layla P.",     role:"Marketing → Growth PM, Canva",   photo:"https://i.pravatar.cc/150?img=23", color1:"#7C3AED", color2:"#F3E8FF", quote:"I thought the career change was too big. Zari showed me I was already doing half the job. Canva's role was basically designed for me." },
  { name:"Sam W.",       role:"SRE → Staff Infra PM, Cloudflare",photo:"https://i.pravatar.cc/150?img=71",color1:"#0284C7", color2:"#E0F2FE", quote:"Cloudflare's process is brutal. Zari knew every round. I went in with no surprises." },
  { name:"Zoe H.",       role:"IC → Manager, Airbnb",           photo:"https://i.pravatar.cc/150?img=19", color1:"#DC2626", color2:"#FEE2E2", quote:"Not 'act more like a leader.' Specific behaviors to change in the next 30 days. That's the difference." },
  { name:"Femi A.",      role:"PM → Senior PM, Twitter/X",      photo:"https://i.pravatar.cc/150?img=6",  color1:"#4361EE", color2:"#EDE9FE", quote:"Zari would stop me mid-story and say 'that's three bullets, not one.' Changed how I talk about my work forever." },
  { name:"Aria J.",      role:"L5 → L6, Google",                photo:"https://i.pravatar.cc/150?img=41", color1:"#059669", color2:"#D1FAE5", quote:"Two failed promo cycles. Zari mapped out who the deciders were and what they respond to. Third cycle: approved first round." },
  { name:"Carlos R.",    role:"Tech Lead → Engineering Manager", photo:"https://i.pravatar.cc/150?img=14", color1:"#7C3AED", color2:"#E9D5FF", quote:"The IC to manager transition is an identity shift, not just a job change. Zari prepared me for the actual hard part." },
  { name:"Ethan C.",     role:"CSM → PM, Intercom",             photo:"https://i.pravatar.cc/150?img=59", color1:"#0284C7", color2:"#BFDBFE", quote:"Five rejections before Zari. One after. The fix was learning to lead with customer impact instead of feature lists." },
  { name:"Kenji T.",     role:"Senior SWE → Staff, Slack",      photo:"https://i.pravatar.cc/150?img=7",  color1:"#4361EE", color2:"#C7D2FE", quote:"Staff promo is a different conversation. You're arguing org impact. Zari coached me on that language. Slack approved first cycle." },
  { name:"Nadia F.",     role:"COO → Advisor & Board",          photo:"https://i.pravatar.cc/150?img=35", color1:"#DC2626", color2:"#FECACA", quote:"At my level it was about board positioning. Zari understood governance language and helped me write a bio that actually opens doors." },
  { name:"Tyler G.",     role:"Product Analyst → PM, Spotify",  photo:"https://i.pravatar.cc/150?img=74", color1:"#059669", color2:"#A7F3D0", quote:"One of twelve Spotify finalists. Zari had run me through every question type they use. It felt like I'd already done the interview." },
  { name:"Rashida M.",   role:"UX Researcher → PM, Figma",      photo:"https://i.pravatar.cc/150?img=45", color1:"#7C3AED", color2:"#DDD6FE", quote:"Research background was invisible on my resume. Zari wrote the one bullet that fixed it. Now it's how I open every interview." },
  { name:"Will N.",      role:"L4 → L5 SWE, Apple",             photo:"https://i.pravatar.cc/150?img=64", color1:"#0284C7", color2:"#E0F2FE", quote:"Apple's promo bar is high and opaque. Zari mapped my work to the criteria they actually use. Got promoted 7 months in." },
  { name:"Amara O.",     role:"Strategy → Chief of Staff, Lyft", photo:"https://i.pravatar.cc/150?img=3", color1:"#D97706", color2:"#FEF3C7", quote:"Salary coaching paid for itself in the first hour. Walked into Lyft knowing my leverage. Left $30K above their opening number." },
  { name:"Mo K.",        role:"SWE → EM, Plaid",                photo:"https://i.pravatar.cc/150?img=56", color1:"#DC2626", color2:"#FCA5A5", quote:"'How would you handle a low performer?' cold would have killed me. Zari made me answer it 8 different ways. I was ready for anything." },
  { name:"Lena H.",      role:"Mid PM → Sr PM, Linear",         photo:"https://i.pravatar.cc/150?img=8",  color1:"#4361EE", color2:"#C7D2FE", quote:"LinkedIn rewrite took 45 minutes. Doubled inbound recruiter messages in a week. That's the whole story." },
  { name:"Aaron T.",     role:"IC3 → IC4 SWE, Meta",            photo:"https://i.pravatar.cc/150?img=72", color1:"#7C3AED", color2:"#EDE9FE", quote:"Failed promo twice. Zari showed me I was solving the wrong problems. Third attempt: approved." },
  { name:"Jake S.",      role:"Sales Eng → Solutions PM, Twilio",photo:"https://i.pravatar.cc/150?img=69",color1:"#4361EE", color2:"#A5B4FC", quote:"Five rounds at Twilio. Debriefed with Zari after every one and adjusted. Never felt like I was guessing." },
  { name:"Ingrid A.",    role:"Business Analyst → PM, Adyen",   photo:"https://i.pravatar.cc/150?img=17", color1:"#059669", color2:"#BBF7D0", quote:"New industry, new country, same CV. Zari helped me tell one coherent story instead of two confused ones. Amsterdam hired me in 3 weeks." },
  { name:"Tolu B.",      role:"Chemical Eng → Data PM, Palantir",photo:"https://i.pravatar.cc/150?img=40",color1:"#D97706", color2:"#FCD34D", quote:"My engineering background looked weird to product teams. Zari reframed it as complexity tolerance. Palantir called it a differentiator." },
  { name:"Rachel M.",    role:"Head of CS → VP Success, Rippling",photo:"https://i.pravatar.cc/150?img=27",color1:"#4361EE",color2:"#A5B4FC", quote:"Rippling's VP loop is structured and intense. Zari helped me prep the written exec summary they actually asked for. Offer in 3 weeks." },
  { name:"Kwame D.",     role:"IC6 → IC7 SWE, Google",          photo:"https://i.pravatar.cc/150?img=63", color1:"#059669", color2:"#D1FAE5", quote:"L7 is about org impact. That's a different argument. Zari coached me on the language until I could make it naturally." },
  { name:"Sean P.",      role:"SWE → Technical PM, Vercel",     photo:"https://i.pravatar.cc/150?img=73", color1:"#0284C7", color2:"#BFDBFE", quote:"Zari taught me how to show enthusiasm without giving away leverage. Came out $18K higher at a company I genuinely wanted." },
];

const STATS = [
  { val:"94%",  label:"Call-back rate after resume session" },
  { val:"3×",   label:"More recruiter views after LinkedIn" },
  { val:"78%",  label:"Got promoted or negotiated a raise" },
  { val:"14k+", label:"Coaching sessions completed" },
];

/* ══════════════════════════════════════════════════
   HERO PROMPT — Kleo-style intent capture
══════════════════════════════════════════════════ */
const HERO_CHIPS: { label:string; svg:React.ReactNode }[] = [
  {
    label:"I'm job searching",
    svg:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/></svg>,
  },
  {
    label:"Help me get promoted",
    svg:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><path d="M8 2v8M4 6l4-4 4 4"/><path d="M3 13h10"/></svg>,
  },
  {
    label:"Negotiate my salary",
    svg:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M5 4V3a3 3 0 016 0v1"/><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
  },
  {
    label:"I'm switching careers",
    svg:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><path d="M2 8h12M9 4l5 4-5 4"/></svg>,
  },
];

function HeroPrompt({ userId }: { userId: boolean }) {
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);

  function go(intent: string) {
    if (!intent.trim()) return;
    const dest = userId
      ? `/dashboard?goal=${encodeURIComponent(intent)}`
      : `/signup?goal=${encodeURIComponent(intent)}`;
    window.location.href = dest;
  }

  return (
    <div style={{ width:"100%", maxWidth:600, margin:"0 auto 0" }}>
      {/* Input — Kleo style: shorter box, circle send button */}
      <div style={{
        position:"relative",
        background:"white",
        border:`1.5px solid ${focused ? "#4361EE" : "#E2E6F0"}`,
        borderRadius:16,
        boxShadow: focused
          ? "0 0 0 4px rgba(67,97,238,0.10), 0 4px 24px rgba(0,0,0,0.08)"
          : "0 2px 16px rgba(0,0,0,0.08)",
        transition:"all 0.2s",
      }}>
        <textarea
          style={{
            display:"block", width:"100%", border:"none", outline:"none",
            fontSize:15.5, color:"#0A0A0F", background:"transparent",
            fontFamily:"inherit", resize:"none", lineHeight:1.6,
            padding:"18px 60px 18px 18px",
            minHeight:80, maxHeight:160, borderRadius:16,
          }}
          rows={2}
          placeholder="I want to get started with Zari…"
          value={val}
          onChange={e => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); go(val); } }}
        />
        {/* Circle send button — Kleo style */}
        <button
          onClick={() => go(val || "Get started")}
          style={{
            position:"absolute", bottom:12, right:12,
            width:34, height:34, borderRadius:"50%", border:"none", cursor:"pointer",
            background: val.trim() ? "#4361EE" : "#E4E8F5",
            color: val.trim() ? "white" : "#A0AABF",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.2s",
            boxShadow: val.trim() ? "0 3px 12px rgba(67,97,238,0.35)" : "none",
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ width:14,height:14 }}>
            <path d="M8 12V4M4 7l4-4 4 4"/>
          </svg>
        </button>
      </div>

      {/* Quick-action chips — exactly 4 in one row */}
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:14, flexWrap:"wrap" }}>
        {HERO_CHIPS.map(chip => (
          <button
            key={chip.label}
            onClick={() => go(chip.label)}
            style={{
              display:"inline-flex", alignItems:"center", gap:6,
              fontSize:13, fontWeight:500, color:"#3A4257",
              padding:"7px 14px", borderRadius:99,
              background:"white", border:"1px solid #E2E6F0",
              cursor:"pointer", transition:"all 0.15s",
              boxShadow:"0 1px 4px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#4361EE";
              (e.currentTarget as HTMLButtonElement).style.color = "#4361EE";
              (e.currentTarget as HTMLButtonElement).style.background = "#F0F4FF";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E6F0";
              (e.currentTarget as HTMLButtonElement).style.color = "#3A4257";
              (e.currentTarget as HTMLButtonElement).style.background = "white";
            }}
          >
            {chip.svg}
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}

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

  if (type === "promotion") {
    return (
    <div style={{ background:"white", borderRadius:18, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 16px 56px rgba(0,0,0,0.10)" }}>
      <div style={{ background:"#F8F9FB", borderBottom:"1px solid #E4E8F5", padding:"10px 14px", display:"flex", gap:5, alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:8, fontSize:10, color:"#A0AABF" }}>Promotion Coaching · Zari</span>
      </div>
      <div style={{ padding:16, minHeight:260 }}>
        {step === 0 && (
          <div style={{ animation:"bubble-appear 0.35s ease" }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#4361EE", marginBottom:12 }}>Tell me about your situation</p>
            {[
              "I'm a Senior Engineer, been here 3 years",
              "I want Staff but my manager keeps saying 'not yet'",
              "I don't know how to build the business case",
            ].map((t,i) => (
              <div key={i} style={{ display:"flex", gap:7, marginBottom:8, flexDirection:i%2===0?"row":"row-reverse", animation:`bubble-appear 0.3s ${i*0.12}s both ease` }}>
                <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,background:i%2===0?"#E4E8F5":"linear-gradient(135deg,#4361EE,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:i%2===0?"#68738A":"white" }}>
                  {i%2===0?"U":"Z"}
                </div>
                <div style={{ maxWidth:"78%", padding:"7px 10px", fontSize:11, lineHeight:1.5, borderRadius:i%2===0?"11px 3px 11px 11px":"3px 11px 11px 11px", background:i%2===0?"#4361EE":"#FAFBFF", color:i%2===0?"white":"#1E2235", border:i%2===0?"none":"1px solid #E4E8F5" }}>{t}</div>
              </div>
            ))}
            <div style={{ marginTop:12, background:"#EEF2FF", borderRadius:10, padding:"10px 12px" }}>
              <p style={{ fontSize:10, fontWeight:700, color:"#4361EE", marginBottom:4 }}>Zari identified 3 gaps</p>
              <p style={{ fontSize:11, color:"#3451D1", lineHeight:1.5 }}>You need: (1) a scope expansion story, (2) two executive sponsors, (3) a documented impact case. Let&apos;s build all three.</p>
            </div>
          </div>
        )}
        {step === 1 && (
          <div style={{ animation:"bubble-appear 0.35s ease" }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#0A0A0F", marginBottom:11 }}>Your promotion case — built by Zari</p>
            {[
              { label:"Scope expansion story", done:true,  note:"Led migration of 3 services" },
              { label:"Executive sponsor",     done:true,  note:"CTO aligned after Q2 review" },
              { label:"Impact documentation",  done:false, note:"$1.2M ARR attribution needed" },
              { label:"Manager conversation",  done:false, note:"Scheduled for next 1:1" },
            ].map((item,i) => (
              <div key={item.label} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:9, animation:`bubble-appear 0.3s ${i*0.1}s both ease` }}>
                <div style={{ width:18,height:18,borderRadius:"50%",flexShrink:0,background:item.done?"#F0FFF4":"#F1F5F9",border:`1.5px solid ${item.done?"#86EFAC":"#E4E8F5"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:item.done?"#16A34A":"#A0AABF" }}>
                  {item.done ? "✓" : "○"}
                </div>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:11.5, fontWeight:600, color: item.done?"#0A0A0F":"#68738A" }}>{item.label}</span>
                  <span style={{ fontSize:10, color:"#A0AABF", marginLeft:6 }}>{item.note}</span>
                </div>
              </div>
            ))}
            <button style={{ marginTop:10, width:"100%", fontSize:11.5, fontWeight:700, padding:"9px", borderRadius:9, border:"none", background:"#4361EE", color:"white", cursor:"pointer" }}>
              Practice manager pitch →
            </button>
          </div>
        )}
      </div>
    </div>
    );
  }

  if (type === "salary") {
    const ROUNDS = [
      { who:"Mgr",  text:"We'd like to offer you $145K base.", side:"coach" as const },
      { who:"You",  text:"I appreciate the offer. Based on my research and the scope of this role, I was expecting $162K.", side:"user"  as const },
      { who:"Mgr",  text:"That's above our band. We can go to $150K max.", side:"coach" as const },
    ];
    const visible = step === 0 ? ROUNDS.slice(0,1) : ROUNDS;
    return (
    <div style={{ background:"white", borderRadius:18, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 16px 56px rgba(0,0,0,0.10)" }}>
      <div style={{ background:"#F8F9FB", borderBottom:"1px solid #E4E8F5", padding:"10px 14px", display:"flex", gap:5, alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:8, fontSize:10, color:"#A0AABF" }}>Salary Negotiation · Simulation</span>
      </div>
      <div style={{ padding:16 }}>
        {/* Market anchor */}
        <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A5F)", borderRadius:11, padding:12, marginBottom:13 }}>
          <div style={{ fontSize:8.5, textTransform:"uppercase", letterSpacing:"0.12em", color:"rgba(255,255,255,0.5)", marginBottom:5 }}>Market benchmark · Senior PM · SF Bay Area</div>
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <span style={{ fontSize:22, fontWeight:900, color:"white" }}>$162K</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>p50 total comp</span>
          </div>
          <div style={{ display:"flex", gap:12, marginTop:7 }}>
            {[{l:"p25",v:"$142K"},{l:"p50",v:"$162K"},{l:"p75",v:"$185K"}].map(m=>(
              <div key={m.l} style={{ fontSize:9, color:"rgba(255,255,255,0.55)" }}><span style={{ color:"rgba(255,255,255,0.9)", fontWeight:700 }}>{m.v}</span> {m.l}</div>
            ))}
          </div>
        </div>

        {/* Conversation */}
        {visible.map((m,i) => (
          <div key={i} style={{ display:"flex", gap:7, marginBottom:8, flexDirection:m.side==="user"?"row-reverse":"row", animation:"bubble-appear 0.3s ease" }}>
            <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,background:m.side==="coach"?"#E4E8F5":"#16A34A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:m.side==="coach"?"#68738A":"white" }}>{m.who}</div>
            <div style={{ maxWidth:"78%", padding:"7px 10px", fontSize:11, lineHeight:1.5, borderRadius:m.side==="coach"?"3px 11px 11px 11px":"11px 3px 11px 11px", background:m.side==="coach"?"#FAFBFF":"#ECFDF5", color:m.side==="coach"?"#1E2235":"#14532D", border:`1px solid ${m.side==="coach"?"#E4E8F5":"#BBF7D0"}` }}>{m.text}</div>
          </div>
        ))}

        {step === 1 && (
          <div style={{ background:"#EEF2FF", borderRadius:10, padding:"9px 11px", animation:"bubble-appear 0.3s 0.3s both ease" }}>
            <p style={{ fontSize:10, fontWeight:700, color:"#4361EE", marginBottom:3 }}>Zari&apos;s next move</p>
            <p style={{ fontSize:10.5, color:"#3451D1", lineHeight:1.5, margin:0 }}>&ldquo;$150K is still $12K below market. Hold your number. Respond: &apos;I understand the band, but given the scope expansion I&apos;d be taking on, $158K reflects the impact I&apos;ll drive.&apos;&rdquo;</p>
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
        @keyframes heart-float { 0%{transform:translateY(0) rotate(-10deg);opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{transform:translateY(-110vh) rotate(10deg);opacity:0} }
        * { box-sizing: border-box; }
        a { transition: opacity 0.15s; } a:hover { opacity: 0.75; }
      `}</style>

      <Nav userId={userId} />

      {/* ══════ HERO ══════ */}
      <section style={{
        background:"linear-gradient(180deg,#EEF2FF 0%,#F5F8FF 55%,white 100%)",
        paddingTop:130,
        textAlign:"center",
      }}>
        <div style={{ maxWidth:640, margin:"0 auto", padding:"0 24px" }}>

          {/* Icon */}
          <div style={{ width:44, height:44, borderRadius:12, background:"white", border:"1px solid #E2E6F0", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
            <svg viewBox="0 0 20 20" fill="none" style={{ width:22, height:22 }}>
              <path d="M10 2l1.5 4H16l-3.5 2.5 1.3 4L10 10l-3.8 2.5 1.3-4L4 6h4.5z" fill="#4361EE" opacity="0.85"/>
              <circle cx="16" cy="4" r="1.5" fill="#06B6D4"/>
              <circle cx="4" cy="14" r="1" fill="#818CF8"/>
            </svg>
          </div>

          {/* Eyebrow */}
          <div style={{ fontSize:12, fontWeight:700, color:"#4361EE", textTransform:"uppercase", letterSpacing:"0.13em", marginBottom:24 }}>
            #1 AI Career Coach
          </div>

          {/* Headline — 2 lines like Kleo */}
          <h1 style={{
            fontSize:"clamp(2.6rem,5.2vw,3.4rem)",
            fontWeight:700,
            lineHeight:1.15,
            letterSpacing:"-0.03em",
            color:"#0A0A0F",
            marginBottom:22,
          }}>
            Career coaching for every goal<br />
            has{" "}
            <span style={{
              background:"linear-gradient(135deg,#4361EE 0%,#818CF8 55%,#06B6D4 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>never been this smart.</span>
          </h1>

          {/* Sub — matches Kleo: bold key phrases, 2 clean lines */}
          <p style={{ fontSize:16.5, lineHeight:1.7, color:"#5A6180", maxWidth:500, margin:"0 auto 32px" }}>
            Zari helps you <strong style={{ color:"#1E2235", fontWeight:600 }}>land jobs faster</strong>, <strong style={{ color:"#1E2235", fontWeight:600 }}>get promoted sooner</strong>, and <strong style={{ color:"#1E2235", fontWeight:600 }}>negotiate with confidence</strong>.<br />Everything you need, in one AI coach.
          </p>

          <HeroPrompt userId={userId} />

        </div>{/* end constrained content */}

        {/* ── Full-width social + featured strip — Kleo layout ── */}
        <div style={{ marginTop:32, borderTop:"1px solid rgba(67,97,238,0.10)" }}>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"22px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>

            {/* LEFT: avatars + stars + text */}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ display:"flex" }}>
                {PEOPLE.slice(0,5).map((p, i) => (
                  <div key={i} style={{ width:38, height:38, borderRadius:"50%", border:"2.5px solid white", overflow:"hidden", marginLeft: i>0?-10:0, background:`linear-gradient(135deg,${p.color1},${p.color2})`, flexShrink:0, boxShadow:"0 1px 6px rgba(0,0,0,0.12)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photo} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign:"left" }}>
                <div style={{ display:"flex", gap:2, marginBottom:3 }}>
                  {Array.from({length:5}).map((_,i)=><svg key={i} viewBox="0 0 12 12" fill="#F59E0B" style={{ width:13,height:13 }}><path d="M6 1l1.2 2.5 2.8.4-2 2 .5 2.8L6 7.5 3.5 8.7 4 5.9 2 3.9l2.8-.4z"/></svg>)}
                </div>
                <div style={{ fontSize:13, fontWeight:500, color:"#3A4257" }}>Loved by 1,200+ candidates</div>
              </div>
            </div>

            {/* RIGHT: Featured in + logos */}
            <div style={{ display:"flex", alignItems:"center", gap:28, flexWrap:"wrap" }}>
              <span style={{ fontSize:11, fontWeight:600, color:"#8A94A8", whiteSpace:"nowrap" }}>Featured in</span>
              <span style={{ fontSize:18, fontWeight:900, color:"#8A94A8", letterSpacing:"-0.03em", fontFamily:"Georgia,serif" }}>Forbes</span>
              <span style={{ fontSize:14, fontWeight:800, color:"#8A94A8", letterSpacing:"-0.01em" }}>TechCrunch</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:18, height:18, borderRadius:4, background:"#8A94A8", display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 12 12" fill="white" style={{ width:9,height:9 }}><path d="M6 1L7.5 4.5H11L8.2 6.8 9.3 10.5 6 8.3 2.7 10.5 3.8 6.8 1 4.5H4.5z"/></svg>
                </span>
                <span style={{ fontSize:14, fontWeight:700, color:"#8A94A8" }}>Product Hunt</span>
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:18, height:18, borderRadius:"50%", background:"#8A94A8", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, color:"white", lineHeight:1 }}>IH</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#8A94A8", textTransform:"uppercase", letterSpacing:"0.04em" }}>Indie Hackers</span>
              </span>
              <span style={{ fontSize:16, fontWeight:900, color:"#8A94A8", letterSpacing:"-0.02em" }}>Inc.</span>
            </div>

          </div>
        </div>
      </section>

      {/* ══════ LOGO MARQUEE ══════ */}
      <section style={{ background:"#EEF0FB", padding:"44px 0 40px", overflow:"hidden" }}>
        <p style={{ textAlign:"center", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.16em", color:"#8B96C8", marginBottom:32 }}>
          Used by candidates targeting
        </p>
        <div style={{ overflow:"hidden", WebkitMaskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)", maskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:72, animation:"marquee-x 38s linear infinite", whiteSpace:"nowrap" }}>
            {[...LOGOS,...LOGOS].map((l,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"center", height:44, flexShrink:0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.src}
                  alt={l.name}
                  style={{ height:36, maxWidth:120, objectFit:"contain", filter:"grayscale(1) opacity(0.5)" }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const fallback = img.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "inline";
                  }}
                />
                <span style={{ display:"none", fontSize:16, fontWeight:800, color:"#3D4580", letterSpacing:"-0.02em" }}>{l.name}</span>
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

      {/* ══════ REVIEW WALL — Kleo-style ══════ */}
      <section id="reviews" style={{ padding:"100px 28px 110px", background:"white", position:"relative", overflow:"hidden" }}>

        {/* Animated floating hearts — drift upward from random x positions */}
        {([
          { left:"4%",  delay:"0s",    dur:"7s",  s:22, o:0.22 },
          { left:"11%", delay:"1.2s",  dur:"9s",  s:14, o:0.16 },
          { left:"19%", delay:"0.4s",  dur:"8s",  s:18, o:0.20 },
          { left:"27%", delay:"2.1s",  dur:"6.5s",s:12, o:0.14 },
          { left:"34%", delay:"0.8s",  dur:"10s", s:20, o:0.24 },
          { left:"41%", delay:"1.7s",  dur:"7.5s",s:10, o:0.13 },
          { left:"48%", delay:"3.0s",  dur:"8.5s",s:16, o:0.18 },
          { left:"55%", delay:"0.2s",  dur:"9.5s",s:22, o:0.26 },
          { left:"62%", delay:"1.5s",  dur:"7s",  s:14, o:0.16 },
          { left:"69%", delay:"2.6s",  dur:"6s",  s:18, o:0.20 },
          { left:"76%", delay:"0.6s",  dur:"11s", s:10, o:0.13 },
          { left:"82%", delay:"1.9s",  dur:"8s",  s:20, o:0.22 },
          { left:"88%", delay:"3.4s",  dur:"7.5s",s:12, o:0.15 },
          { left:"94%", delay:"0.9s",  dur:"9s",  s:16, o:0.18 },
          { left:"7%",  delay:"4.1s",  dur:"8.5s",s:10, o:0.12 },
          { left:"23%", delay:"2.8s",  dur:"10s", s:14, o:0.17 },
          { left:"37%", delay:"5.0s",  dur:"7s",  s:18, o:0.21 },
          { left:"51%", delay:"1.1s",  dur:"9.5s",s:12, o:0.15 },
          { left:"65%", delay:"3.7s",  dur:"8s",  s:20, o:0.23 },
          { left:"79%", delay:"0.5s",  dur:"6.5s",s:14, o:0.17 },
          { left:"15%", delay:"4.5s",  dur:"11s", s:16, o:0.19 },
          { left:"43%", delay:"2.3s",  dur:"7.5s",s:22, o:0.25 },
          { left:"57%", delay:"1.4s",  dur:"8.5s",s:10, o:0.13 },
          { left:"71%", delay:"3.2s",  dur:"9s",  s:18, o:0.20 },
          { left:"90%", delay:"5.5s",  dur:"7s",  s:14, o:0.16 },
          { left:"30%", delay:"4.8s",  dur:"10s", s:12, o:0.14 },
          { left:"85%", delay:"2.0s",  dur:"8s",  s:20, o:0.22 },
        ] as {left:string;delay:string;dur:string;s:number;o:number}[]).map((h,i) => (
          <div key={i} aria-hidden style={{
            position:"absolute", bottom:"-30px", left:h.left,
            fontSize:h.s, color:"#E8336D", opacity:h.o,
            pointerEvents:"none", userSelect:"none", lineHeight:1, zIndex:1,
            animation:`heart-float ${h.dur} ${h.delay} ease-in infinite`,
          }}>♥</div>
        ))}

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <h2 style={{ fontSize:"clamp(2.2rem,4.5vw,3.2rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:14 }}>
              Loved by 1,200+ candidates.
            </h2>
            <p style={{ fontSize:18, color:"#68738A" }}>Real sessions. Real results. Real offers.</p>
          </div>

          {/* 3-column masonry */}
          <div style={{ columns:3, columnGap:22 }}>
            {WALL_REVIEWS.map((r,i) => (
              <div key={i} style={{
                breakInside:"avoid", marginBottom:22,
                background:"white",
                border:"1px solid #EBEBF0",
                borderRadius:16,
                padding:"18px 20px",
                boxShadow:"0 2px 12px rgba(0,0,0,0.07)",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", overflow:"hidden", background:`linear-gradient(135deg,${r.color1},${r.color2})`, flexShrink:0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.photo} alt={r.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>{r.name}</div>
                    <div style={{ fontSize:12, color:"#68738A", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.role}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:2, marginBottom:9 }}>
                  {Array.from({length:5}).map((_,j)=><svg key={j} viewBox="0 0 12 12" fill="#F59E0B" style={{ width:13,height:13 }}><path d="M6 1l1.2 2.5 2.8.4-2 2 .5 2.8L6 7.5 3.5 8.7 4 5.9 2 3.9l2.8-.4z"/></svg>)}
                </div>
                <p style={{ fontSize:14, lineHeight:1.7, color:"#1E2235", margin:0 }}>{r.quote}</p>
              </div>
            ))}
          </div>
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
