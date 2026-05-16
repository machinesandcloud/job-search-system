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
  { name:"Marcus J.",    role:"Backend Eng → Staff Eng",    photo:"https://randomuser.me/api/portraits/men/32.jpg",   color1:"#4361EE", color2:"#818CF8", initials:"MJ", quote:"I'd been a Senior for 4 years. Zari helped me build the case — scope, impact, sponsorship. Got promoted in 5 months.", stars:5, tag:"Promotion" },
  { name:"Priya M.",     role:"PM → Senior PM at Notion",   photo:"https://randomuser.me/api/portraits/women/44.jpg", color1:"#7C3AED", color2:"#A78BFA", initials:"PM", quote:"The resume feedback was specific to the point of being uncomfortable — it knew exactly what was wrong.", stars:5, tag:"Resume" },
  { name:"Aaliyah R.",   role:"Data Scientist → Stripe",    photo:"https://randomuser.me/api/portraits/women/68.jpg", color1:"#0284C7", color2:"#38BDF8", initials:"AR", quote:"The LinkedIn session rebuilt my headline and I got 3 recruiter DMs the same week.", stars:5, tag:"LinkedIn" },
  { name:"Daniel K.",    role:"Ops Lead → Shopify PM",      photo:"https://randomuser.me/api/portraits/men/46.jpg",   color1:"#059669", color2:"#34D399", initials:"DK", quote:"4 callbacks in 1 week after one resume session. The bullet rewrites were shockingly specific.", stars:5, tag:"Job Search" },
  { name:"Sofia L.",     role:"IC → Engineering Manager",   photo:"https://randomuser.me/api/portraits/women/26.jpg", color1:"#DC2626", color2:"#F87171", initials:"SL", quote:"I used Zari to practice my manager pitch. It pushed back hard on weak answers. Felt completely ready for the real conversation.", stars:5, tag:"Promotion" },
  { name:"James T.",     role:"Director → VP Engineering",  photo:"https://randomuser.me/api/portraits/men/55.jpg",   color1:"#D97706", color2:"#FCD34D", initials:"JT", quote:"Zari helped me build executive presence in my communication. My skip-level feedback changed noticeably.", stars:5, tag:"Leadership" },
  { name:"Camille D.",   role:"Finance → Stripe PM",        photo:"https://randomuser.me/api/portraits/women/17.jpg", color1:"#7C3AED", color2:"#C4B5FD", initials:"CD", quote:"Career change from finance to product. Zari reframed my entire narrative. Without it I'd still be sending unanswered applications.", stars:5, tag:"Career Change" },
  { name:"Ryan O.",      role:"Sales Lead → Google APM",    photo:"https://randomuser.me/api/portraits/men/71.jpg",   color1:"#0284C7", color2:"#7DD3FC", initials:"RO", quote:"Zari ran the salary negotiation with me until it stopped feeling scary. Walked away with $28K more than the first offer.", stars:5, tag:"Negotiation" },
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

/* ══ Wall of reviews — long ones interspersed across all columns ══ */
const WALL_REVIEWS = [
  { name:"Marcus J.",    role:"Backend Eng → Staff Eng",        photo:"https://randomuser.me/api/portraits/men/32.jpg",   color1:"#4361EE", color2:"#818CF8", quote:"Been Senior for 4 years with zero movement. One month with Zari and I finally had the story. Promoted in 5 months.", highlights:["Promoted in 5 months."] },
  { name:"Priya M.",     role:"PM → Senior PM, Notion",         photo:"https://randomuser.me/api/portraits/women/44.jpg", color1:"#7C3AED", color2:"#A78BFA", quote:"Zari told me exactly what was wrong with my resume. Not vague feedback — line by line. Uncomfortable but it worked.", highlights:["line by line"] },
  { name:"Aaliyah R.",   role:"Data Scientist, Stripe",         photo:"https://randomuser.me/api/portraits/women/68.jpg", color1:"#0284C7", color2:"#38BDF8", quote:"I want to be honest — I was skeptical. I'd tried the career books, the LinkedIn courses, the mock interview sites. None of it translated to anything real in the room. What Zari did differently was stop me mid-answer and say 'you just described output — tell me the impact.' That one correction changed every interview I had for the next three months. I went from zero callbacks to three senior roles at once. The difference wasn't effort. It was learning how to tell the right story.", highlights:["three senior roles at once", "learning how to tell the right story"] },
  { name:"Daniel K.",    role:"Ops Lead → Shopify PM",          photo:"https://randomuser.me/api/portraits/men/46.jpg",   color1:"#059669", color2:"#34D399", quote:"4 callbacks in one week after the resume session. Zero traction to two final rounds simultaneously.", highlights:["4 callbacks in one week", "two final rounds simultaneously"] },
  { name:"Sofia L.",     role:"IC → Engineering Manager",       photo:"https://randomuser.me/api/portraits/women/26.jpg", color1:"#DC2626", color2:"#F87171", quote:"Practiced my manager pitch with Zari every day for two weeks. Walked into the real conversation completely calm. Got the role.", highlights:["Got the role."] },
  { name:"James T.",     role:"Director → VP Engineering",      photo:"https://randomuser.me/api/portraits/men/55.jpg",   color1:"#D97706", color2:"#FCD34D", quote:"My skip-level feedback changed noticeably within a quarter. My directs noticed before I told anyone.", highlights:["changed noticeably within a quarter"] },
  { name:"Camille D.",   role:"Finance → Stripe PM",            photo:"https://randomuser.me/api/portraits/women/17.jpg", color1:"#7C3AED", color2:"#C4B5FD", quote:"Six years in finance, zero product experience. Zari rebuilt my whole narrative. Without it I'd still be sending applications into the void.", highlights:["Zari rebuilt my whole narrative."] },
  { name:"Ryan O.",      role:"Sales Lead → Google APM",        photo:"https://randomuser.me/api/portraits/men/71.jpg",   color1:"#0284C7", color2:"#7DD3FC", quote:"Zari ran the negotiation sim with me until it stopped feeling scary. Walked away $28K above their opening offer.", highlights:["$28K above their opening offer."] },
  { name:"Tanya W.",     role:"Analyst → Product, Meta",        photo:"https://randomuser.me/api/portraits/women/33.jpg", color1:"#4361EE", color2:"#6EE7B7", quote:"STAR scoring showed me exactly which word to cut and why. I felt overprepared walking into the panel. That's a great feeling.", highlights:["I felt overprepared walking into the panel."] },
  { name:"Divya N.",     role:"QA Lead → PM, Microsoft",        photo:"https://randomuser.me/api/portraits/women/57.jpg", color1:"#DC2626", color2:"#FECACA", quote:"I had six years of product experience and still couldn't get past Stripe's first round. Zari showed me why: I was presenting tasks, not decisions. Describing timelines, not tradeoffs. Every answer was technically accurate and completely unconvincing. Over four sessions, Zari rebuilt how I talk about my work — not what I did, but why it mattered, what I chose not to do, and what I'd do differently. I passed every round on the next attempt. Group PM offer, $40K above their first number.", highlights:["$40K above their first number."] },
  { name:"Leo B.",       role:"Junior → Mid SWE, Airbnb",       photo:"https://randomuser.me/api/portraits/men/22.jpg",   color1:"#0284C7", color2:"#A5F3FC", quote:"Didn't know how to talk about side projects. Zari showed me how to frame them as product experience. Got the Airbnb offer.", highlights:["Got the Airbnb offer."] },
  { name:"Nina S.",      role:"CS grad → Figma PM",             photo:"https://randomuser.me/api/portraits/women/82.jpg", color1:"#7C3AED", color2:"#F9A8D4", quote:"New grad, terrified of interviews. Zari coached me session by session. By interview day I wasn't nervous at all. Offer above band.", highlights:["Offer above band."] },
  { name:"Omar A.",      role:"Consultant → Uber Strategy",     photo:"https://randomuser.me/api/portraits/men/38.jpg",   color1:"#059669", color2:"#86EFAC", quote:"It felt like talking to someone who'd been through my exact transition. Nothing generic. Every answer specific to my situation.", highlights:["Every answer specific to my situation."] },
  { name:"Jess M.",      role:"SDR → RevOps PM, Salesforce",    photo:"https://randomuser.me/api/portraits/women/61.jpg", color1:"#D97706", color2:"#FDE68A", quote:"Zari told me I was leaving money on the table. I countered to $148K. They said yes immediately. I almost left $18K behind.", highlights:["I countered to $148K.", "I almost left $18K behind."] },
  { name:"Dev P.",       role:"EM → Director, Snowflake",       photo:"https://randomuser.me/api/portraits/men/14.jpg",   color1:"#4361EE", color2:"#BAE6FD", quote:"Not 'be more strategic' — actual specific things to do, week by week. The most useful coaching I've ever had.", highlights:["The most useful coaching I've ever had."] },
  { name:"Fatoumata K.", role:"Ops Manager → LinkedIn PM",      photo:"https://randomuser.me/api/portraits/women/48.jpg", color1:"#DC2626", color2:"#FCA5A5", quote:"The career change felt impossible. Every recruiter said I wasn't 'product enough.' Zari spent two sessions just on narrative — repositioning 5 years of ops work as product intuition, not a liability. Then we practiced every version of 'why are you switching?' until I stopped hedging and started owning it. LinkedIn's final round had four back-to-back PM interviews. I came out feeling like I'd done them all before. I had. Just with Zari.", highlights:["I came out feeling like I'd done them all before."] },
  { name:"Chris Y.",     role:"Senior PM → Staff PM, Notion",   photo:"https://randomuser.me/api/portraits/men/63.jpg",   color1:"#0284C7", color2:"#67E8F9", quote:"LinkedIn views went from 2 to 22 per week. Just the headline. Nothing else changed.", highlights:["LinkedIn views went from 2 to 22 per week."] },
  { name:"Aisha T.",     role:"Customer Success → PM, HubSpot", photo:"https://randomuser.me/api/portraits/women/29.jpg", color1:"#7C3AED", color2:"#DDD6FE", quote:"Told my whole career I wasn't technical enough. Zari showed me how to position customer insight as a superpower. HubSpot agreed.", highlights:["HubSpot agreed."] },
  { name:"Patrick H.",   role:"Sr PM → Group PM, Stripe",       photo:"https://randomuser.me/api/portraits/men/77.jpg",   color1:"#0284C7", color2:"#BAE6FD", quote:"Zari pushed me to counter twice. Most people stop at one. Ended up $22K above their so-called final offer.", highlights:["$22K above their so-called final offer."] },
  { name:"Tom F.",       role:"Principal PM → Director, Databricks", photo:"https://randomuser.me/api/portraits/men/42.jpg", color1:"#D97706", color2:"#FEF3C7", quote:"My directs noticed I was running meetings differently before I told anyone I was working with Zari.", highlights:["before I told anyone I was working with Zari"] },
  { name:"Grace K.",     role:"MBA → PM, Coinbase",             photo:"https://randomuser.me/api/portraits/women/74.jpg", color1:"#4361EE", color2:"#A5B4FC", quote:"No product experience, just an MBA. Zari built a narrative from academic projects that Coinbase actually bought.", highlights:["Coinbase actually bought."] },
  { name:"Ivan M.",      role:"IC5 → IC6, Amazon",              photo:"https://randomuser.me/api/portraits/men/58.jpg",   color1:"#059669", color2:"#6EE7B7", quote:"Zari knew Amazon's leadership principles better than I did. Drilled me until I stopped saying 'we' instead of 'I'. That was the whole problem.", highlights:["stopped saying 'we' instead of 'I'"] },
  { name:"Layla P.",     role:"Marketing → Growth PM, Canva",   photo:"https://randomuser.me/api/portraits/women/36.jpg", color1:"#7C3AED", color2:"#F3E8FF", quote:"I thought the career change was too big. Zari showed me I was already doing half the job. Canva's role was basically designed for me.", highlights:["Canva's role was basically designed for me."] },
  { name:"Sam W.",       role:"SRE → Staff Infra PM, Cloudflare",photo:"https://randomuser.me/api/portraits/men/84.jpg",  color1:"#0284C7", color2:"#E0F2FE", quote:"I'd been trying to make the transition from SRE to PM for two years. Every rejection said the same thing: 'not enough product thinking.' Zari ran me through a full product case, then dissected every answer I gave. It wasn't brutal — it was specific. By session three I was structuring problems differently. By session five I had a Staff PM offer at Cloudflare. I didn't change what I knew. I changed how I explained it.", highlights:["Staff PM offer at Cloudflare"] },
  { name:"Zoe H.",       role:"IC → Manager, Airbnb",           photo:"https://randomuser.me/api/portraits/women/52.jpg", color1:"#DC2626", color2:"#FEE2E2", quote:"Not 'act more like a leader.' Specific behaviors to change in the next 30 days. That's the difference.", highlights:["Specific behaviors to change in the next 30 days."] },
  { name:"Femi A.",      role:"PM → Senior PM, Twitter/X",      photo:"https://randomuser.me/api/portraits/men/19.jpg",   color1:"#4361EE", color2:"#EDE9FE", quote:"Zari stopped me mid-story and said 'that's three bullets, not one.' Changed how I talk about my work forever.", highlights:["Changed how I talk about my work forever."] },
  { name:"Aria J.",      role:"L5 → L6, Google",                photo:"https://randomuser.me/api/portraits/women/88.jpg", color1:"#059669", color2:"#D1FAE5", quote:"Two failed promo cycles. Zari mapped the deciders and what they respond to. Third cycle: approved first round.", highlights:["Third cycle: approved first round."] },
  { name:"Carlos R.",    role:"Tech Lead → Engineering Manager", photo:"https://randomuser.me/api/portraits/men/27.jpg",   color1:"#7C3AED", color2:"#E9D5FF", quote:"The IC to manager transition is an identity shift, not a job change. Zari prepared me for the actual hard part.", highlights:["identity shift, not a job change"] },
  { name:"Ethan C.",     role:"CSM → PM, Intercom",             photo:"https://randomuser.me/api/portraits/men/66.jpg",   color1:"#0284C7", color2:"#BFDBFE", quote:"Five rejections before Zari. One after. The fix was leading with customer impact instead of feature lists.", highlights:["Five rejections before Zari. One after."] },
  { name:"Kenji T.",     role:"Senior SWE → Staff, Slack",      photo:"https://randomuser.me/api/portraits/men/35.jpg",   color1:"#4361EE", color2:"#C7D2FE", quote:"Staff promo is a different argument — you're selling org impact. Zari coached me on that language. Slack approved first cycle.", highlights:["Slack approved first cycle."] },
  { name:"Nadia F.",     role:"COO → Advisor & Board",          photo:"https://randomuser.me/api/portraits/women/65.jpg", color1:"#DC2626", color2:"#FECACA", quote:"At my level it was about board positioning. Zari understood governance language and helped me write a bio that actually opens doors.", highlights:["a bio that actually opens doors"] },
  { name:"Tyler G.",     role:"Product Analyst → PM, Spotify",  photo:"https://randomuser.me/api/portraits/men/51.jpg",   color1:"#059669", color2:"#A7F3D0", quote:"One of twelve Spotify finalists. Zari had run me through every question type they use. It felt like I'd already done the interview.", highlights:["It felt like I'd already done the interview."] },
  { name:"Rashida M.",   role:"UX Researcher → PM, Figma",      photo:"https://randomuser.me/api/portraits/women/42.jpg", color1:"#7C3AED", color2:"#DDD6FE", quote:"Research background was invisible on my resume. Zari wrote the one bullet that fixed it. Now it's how I open every interview.", highlights:["the one bullet that fixed it"] },
  { name:"Will N.",      role:"L4 → L5 SWE, Apple",             photo:"https://randomuser.me/api/portraits/men/73.jpg",   color1:"#0284C7", color2:"#E0F2FE", quote:"Apple's promo bar is high and opaque. Zari mapped my work to the criteria they actually use. Got promoted 7 months in.", highlights:["Got promoted 7 months in."] },
  { name:"Mo K.",        role:"SWE → EM, Plaid",                photo:"https://randomuser.me/api/portraits/men/48.jpg",   color1:"#DC2626", color2:"#FCA5A5", quote:"'How would you handle a low performer?' cold would have killed me. Zari made me answer it 8 ways. I was ready for anything.", highlights:["I was ready for anything."] },
  { name:"Amara O.",     role:"Strategy → Chief of Staff, Lyft", photo:"https://randomuser.me/api/portraits/women/11.jpg",color1:"#D97706", color2:"#FEF3C7", quote:"Salary coaching paid for itself in the first hour. Walked into Lyft knowing my leverage. Left $30K above their opening number.", highlights:["Left $30K above their opening number."] },
  { name:"Lena H.",      role:"Mid PM → Sr PM, Linear",         photo:"https://randomuser.me/api/portraits/women/77.jpg", color1:"#4361EE", color2:"#C7D2FE", quote:"LinkedIn rewrite took 45 minutes. Doubled inbound recruiter messages in a week.", highlights:["Doubled inbound recruiter messages in a week."] },
  { name:"Aaron T.",     role:"IC3 → IC4 SWE, Meta",            photo:"https://randomuser.me/api/portraits/men/29.jpg",   color1:"#7C3AED", color2:"#EDE9FE", quote:"Failed promo twice. Zari showed me I was solving the wrong problems. Third attempt: approved.", highlights:["Third attempt: approved."] },
  { name:"Jake S.",      role:"Sales Eng → Solutions PM, Twilio",photo:"https://randomuser.me/api/portraits/men/83.jpg",  color1:"#4361EE", color2:"#A5B4FC", quote:"Five rounds at Twilio. Debriefed with Zari after every one and adjusted. Never felt like I was guessing.", highlights:["Never felt like I was guessing."] },
  { name:"Ingrid A.",    role:"Business Analyst → PM, Adyen",   photo:"https://randomuser.me/api/portraits/women/56.jpg", color1:"#059669", color2:"#BBF7D0", quote:"New industry, new country, same CV. Zari helped me tell one coherent story instead of two confused ones. Amsterdam hired me in 3 weeks.", highlights:["Amsterdam hired me in 3 weeks."] },
  { name:"Tolu B.",      role:"Chemical Eng → Data PM, Palantir",photo:"https://randomuser.me/api/portraits/men/61.jpg",  color1:"#D97706", color2:"#FCD34D", quote:"My engineering background looked weird to product teams. Zari reframed it as complexity tolerance. Palantir called it a differentiator.", highlights:["Palantir called it a differentiator."] },
  { name:"Rachel M.",    role:"Head of CS → VP Success, Rippling",photo:"https://randomuser.me/api/portraits/women/39.jpg",color1:"#4361EE",color2:"#A5B4FC", quote:"Rippling's VP loop is structured and intense. Zari helped me prep the written exec summary they actually asked for. Offer in 3 weeks.", highlights:["Offer in 3 weeks."] },
  { name:"Kwame D.",     role:"IC6 → IC7 SWE, Google",          photo:"https://randomuser.me/api/portraits/men/91.jpg",   color1:"#059669", color2:"#D1FAE5", quote:"L7 is about org impact. That's a different argument. Zari coached me on that language until I could make it naturally.", highlights:["L7 is about org impact."] },
  { name:"Sean P.",      role:"SWE → Technical PM, Vercel",     photo:"https://randomuser.me/api/portraits/men/16.jpg",   color1:"#0284C7", color2:"#BFDBFE", quote:"Zari taught me how to show enthusiasm without giving away leverage. Came out $18K higher at a company I genuinely wanted.", highlights:["$18K higher at a company I genuinely wanted."] },
];

function WallHighlight({ text, highlights }: { text: string; highlights: string[] }) {
  if (!highlights.length) return <>{text}</>;
  const escaped = [...highlights].sort((a,b) => b.length - a.length).map(h => h.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  const set = new Set(highlights);
  return <>{parts.map((p,i) => set.has(p) ? <mark key={i} style={{ background:"rgba(59,130,246,0.14)", color:"inherit", borderRadius:4, padding:"1px 4px", fontWeight:600 }}>{p}</mark> : p)}</>;
}

const STATS = [
  { val:"94%",  label:"Call-back rate after resume session" },
  { val:"3×",   label:"More recruiter views after LinkedIn" },
  { val:"78%",  label:"Got promoted or negotiated a raise" },
  { val:"14k+", label:"Coaching sessions completed" },
];

const FOUNDERS = [
  {
    photo: "/images/steve.jpg",
    name: "Steve J Ngoumnai",
    title: "Founder & CEO",
    h3: "From Platform Engineer to career coach at scale.",
    story1: `"I spent years watching talented people get passed over — not because they lacked ability, but because they couldn't tell their story. As a Platform Engineer and career advisor, I saw the same pattern repeat: vague bullets, weak interview stories, salary negotiations abandoned too early.`,
    story2: `Owen and Leanne brought 15+ years of executive coaching and career transition expertise. Together, we built Zari to give every professional access to the same coaching that used to cost thousands — specific, memory-driven, and built for people serious about their next move."`,
    sig: "– Steve J Ngoumnai",
  },
  {
    photo: "/images/owen.png",
    name: "Owen Thomas",
    title: "Head of Coaching",
    h3: "Fifteen years of executive coaching, now available to everyone.",
    story1: `"I spent 15 years coaching C-suite executives and senior leaders at Fortune 500 companies — people who had access to world-class career development because they could afford it. I watched equally talented professionals at lower levels struggle with no real support.`,
    story2: `When Steve showed me what Zari could do, I saw the chance to change that equation. The coaching rigor I've applied at the executive level is now inside every Zari session — the same frameworks, the same questions, the same standards. Just accessible to everyone."`,
    sig: "– Owen Thomas",
  },
  {
    photo: "/images/leanne.jpg",
    name: "Leanne Adair",
    title: "Performance Coach",
    h3: "Career transitions are the hardest professional challenge most people face.",
    story1: `"I've guided hundreds of professionals through career transitions — from individual contributors stepping into management, to executives pivoting industries, to new grads navigating their first real career decision. The common thread: most people don't fail for lack of skill. They fail for lack of preparation and narrative clarity.`,
    story2: `Zari gives every professional the same preparation I offer in person. The mock sessions, the story coaching, the negotiation drills — built into a platform that meets you where you are and pushes you to where you need to be."`,
    sig: "– Leanne Adair",
  },
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
    <div style={{ width:"100%", maxWidth:720, margin:"0 auto 0" }}>
      {/* Input */}
      <div style={{
        position:"relative",
        background:"white",
        border:`1.5px solid ${focused ? "#4361EE" : "#E2E6F0"}`,
        borderRadius:18,
        boxShadow: focused
          ? "0 0 0 4px rgba(67,97,238,0.10), 0 6px 32px rgba(0,0,0,0.10)"
          : "0 4px 24px rgba(0,0,0,0.09)",
        transition:"all 0.2s",
      }}>
        <textarea
          style={{
            display:"block", width:"100%", border:"none", outline:"none",
            fontSize:17, color:"#0A0A0F", background:"transparent",
            fontFamily:"inherit", resize:"none", lineHeight:1.65,
            padding:"24px 76px 24px 24px",
            minHeight:140, maxHeight:240, borderRadius:18,
          }}
          rows={3}
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
            position:"absolute", bottom:18, right:18,
            width:42, height:42, borderRadius:"50%", border:"none", cursor:"pointer",
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

      {/* Quick-action chips — all 4 in one row */}
      <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:16, flexWrap:"nowrap" }}>
        {HERO_CHIPS.map(chip => (
          <button
            key={chip.label}
            onClick={() => go(chip.label)}
            style={{
              display:"inline-flex", alignItems:"center", gap:7,
              fontSize:14, fontWeight:500, color:"#3A4257",
              padding:"9px 18px", borderRadius:99, whiteSpace:"nowrap",
              background:"white", border:"1px solid #E2E6F0",
              cursor:"pointer", transition:"all 0.15s",
              boxShadow:"0 1px 6px rgba(0,0,0,0.06)",
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
      height:68,
      background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      transition:"all 0.3s ease",
    }}>
      <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 32px", height:"100%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:11, textDecoration:"none" }}>
          <ZariLogo size={42} />
          <span style={{ fontSize:30, fontWeight:900, color:"#0A0A0F", letterSpacing:"-0.04em", lineHeight:1 }}>Zari</span>
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
          {/* Initials avatar — instant CSS render, no external request */}
          <div style={{
            position:"absolute", inset:0, display:"flex",
            borderRadius:"50%",
            background:`linear-gradient(135deg,${p.color1},${p.color2})`,
            alignItems:"center", justifyContent:"center",
            fontSize: s ? 16 : 12, fontWeight:800, color:"white",
            border:"2px solid white",
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
      gridTemplateColumns: flip ? "62fr 38fr" : "38fr 62fr",
      gap:80,
      alignItems:"center",
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(40px)",
      transition:"opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Text — left or right based on flip */}
      <div style={{ order: flip ? 2 : 1 }}>
        <span style={{
          display:"inline-block", fontSize:11, fontWeight:700, textTransform:"uppercase",
          letterSpacing:"0.16em", color:"#4361EE",
          background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)",
          padding:"5px 14px", borderRadius:99, marginBottom:22,
        }}>{f.tag}</span>
        <h2 style={{
          fontSize:"clamp(2.1rem,3.5vw,3rem)",
          fontWeight:900, letterSpacing:"-0.04em",
          color:"#0A0A0F", lineHeight:1.08,
          marginBottom:18, whiteSpace:"pre-line",
        }}>{f.headline}</h2>
        <p style={{ fontSize:17, color:"#68738A", lineHeight:1.75, marginBottom:28 }}>{f.body}</p>
        <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:14, marginBottom:36 }}>
          {f.bullets.map(b => (
            <li key={b} style={{ display:"flex", alignItems:"flex-start", gap:12, fontSize:15.5, color:"#1E2235" }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="#4361EE" strokeWidth="2.5" style={{ width:11,height:11 }}><polyline points="4,10 8,14 16,6"/></svg>
              </div>
              {b}
            </li>
          ))}
        </ul>
        <Link href="/signup" style={{
          display:"inline-flex", alignItems:"center", gap:8,
          padding:"14px 28px", borderRadius:12,
          background:"#0A0A0F", color:"white",
          fontSize:15, fontWeight:700, textDecoration:"none",
          boxShadow:"0 4px 16px rgba(0,0,0,0.14)",
        }}>
          Try {f.tag} free
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:14,height:14 }}><path d="M3 8h10M9 5l3 3-3 3"/></svg>
        </Link>
      </div>

      {/* Mockup — square-ish panel, centered in column */}
      <div style={{ order: flip ? 1 : 2, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:"100%", maxWidth:560 }}>
          <FeatureMockup type={f.mockup} />
        </div>
      </div>
    </div>
  );
}

/* ── Animated step-cycling mockups for each feature ── */
function FeatureMockup({ type }: { type: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const durations: Record<string, number[]> = {
      resume:    [1800, 2400, 3200, 2600, 2500],
      session:   [1400, 1400, 1400, 2600, 2600, 2500],
      interview: [2600, 3200, 2800, 2500],
      linkedin:  [2400, 3200, 2600, 2500],
      promotion: [2400, 3200, 2600, 2500],
      salary:    [2400, 3200, 2600, 2500],
    };
    const totals: Record<string, number> = {
      resume:5, session:6, interview:4, linkedin:4, promotion:4, salary:4,
    };
    const total = totals[type] ?? 2;
    const dur   = (durations[type] ?? [3000])[step] ?? 3000;
    const t = setTimeout(() => setStep(s => (s + 1) % total), dur);
    return () => clearTimeout(t);
  }, [step, type]);

  /* ── RESUME ── */
  if (type === "resume") {
    const STEPS = ["Upload","Analyze","Results"] as const;
    const barStep = Math.min(step, 2);
    return (
    <div style={{ background:"#080E1C", borderRadius:18, border:"1px solid rgba(255,255,255,0.09)", overflow:"hidden", boxShadow:"0 28px 80px rgba(0,0,0,0.55)" }}>
      <div style={{ background:"#0D1117", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"11px 16px", display:"flex", gap:5, alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:6, fontSize:11, color:"rgba(255,255,255,0.3)" }}>Resume Review · Zari</span>
        {step >= 2 && <span style={{ marginLeft:"auto", fontSize:9, fontWeight:700, color:"#86EFAC", background:"rgba(134,239,172,0.1)", border:"1px solid rgba(134,239,172,0.22)", padding:"2px 8px", borderRadius:99 }}>{step >= 4 ? "A− Fully optimized ✓" : step === 3 ? "Boosting ATS score…" : "A− Results ready"}</span>}
      </div>

      {/* Step bar */}
      <div style={{ display:"flex", alignItems:"center", gap:5, padding:"12px 18px 0" }}>
        {STEPS.map((s,i)=>(
          <div key={s} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, color: i<barStep?"#86EFAC":i===barStep?"#60A5FA":"rgba(255,255,255,0.2)", transition:"color 0.4s" }}>
              <div style={{ width:18,height:18,borderRadius:"50%",background:i<barStep?"rgba(134,239,172,0.12)":i===barStep?"rgba(59,130,246,0.14)":"rgba(255,255,255,0.04)",border:`1.5px solid ${i<barStep?"rgba(134,239,172,0.4)":i===barStep?"rgba(59,130,246,0.4)":"rgba(255,255,255,0.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:900,color:i<barStep?"#86EFAC":i===barStep?"#60A5FA":"rgba(255,255,255,0.22)",transition:"all 0.4s" }}>{i<barStep?"✓":i+1}</div>
              {s}
            </div>
            {i<2&&<div style={{ width:14,height:1,background:i<barStep?"rgba(134,239,172,0.3)":"rgba(255,255,255,0.08)",transition:"background 0.4s" }}/>}
          </div>
        ))}
      </div>

      <div style={{ padding:"14px 18px 18px" }}>
        {/* UPLOAD */}
        {step === 0 && (
          <div style={{ border:"2px dashed rgba(59,130,246,0.3)", borderRadius:12, padding:"22px 14px", textAlign:"center", background:"rgba(59,130,246,0.05)", animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ width:40,height:40,borderRadius:10,background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.22)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.8" style={{ width:20,height:20 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
            </div>
            <p style={{ fontSize:12,fontWeight:700,color:"#60A5FA",marginBottom:3 }}>Uploading resume_v3_final.pdf</p>
            <p style={{ fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:12 }}>PDF · 847 KB</p>
            <div style={{ height:3,borderRadius:99,background:"rgba(255,255,255,0.07)",overflow:"hidden" }}>
              <div style={{ height:"100%",background:"linear-gradient(90deg,#3B82F6,#60A5FA)",borderRadius:99,animation:"upload-bar 2.4s linear forwards" }}/>
            </div>
          </div>
        )}

        {/* ANALYZING */}
        {step === 1 && (
          <div style={{ animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontSize:10.5,fontWeight:700,color:"#60A5FA",marginBottom:11,display:"flex",alignItems:"center",gap:7 }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:"#3B82F6",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>
              Zari is reading your resume…
            </p>
            {[
              {label:"Reading format & structure",    done:true },
              {label:"Scanning ATS keyword gaps",     done:true },
              {label:"Scoring 22 bullet statements",  done:true },
              {label:"Generating AI rewrites",        done:false},
            ].map((item,idx)=>(
              <div key={item.label} style={{ display:"flex",alignItems:"center",gap:9,marginBottom:9,opacity:idx<3?1:0.45,animation:`bubble-appear 0.55s ${idx*0.11}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ width:17,height:17,borderRadius:"50%",flexShrink:0,background:item.done?"rgba(134,239,172,0.1)":"rgba(255,255,255,0.04)",border:`1.5px solid ${item.done?"rgba(134,239,172,0.35)":"rgba(255,255,255,0.09)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:item.done?"#86EFAC":"rgba(255,255,255,0.25)" }}>
                  {item.done?"✓":<span style={{ width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,0.2)",animation:`dot-bounce 1.1s ${idx*0.2}s infinite`,display:"inline-block" }}/>}
                </div>
                <span style={{ fontSize:11,color:item.done?"rgba(255,255,255,0.72)":"rgba(255,255,255,0.28)" }}>{item.label}</span>
              </div>
            ))}
            <div style={{ marginTop:12,height:3,borderRadius:99,background:"rgba(255,255,255,0.07)",overflow:"hidden" }}>
              <div style={{ height:"100%",width:"82%",background:"linear-gradient(90deg,#3B82F6,#60A5FA)",borderRadius:99,animation:"analyze-bar 2.8s linear forwards" }}/>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 2 && (
          <div style={{ animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Score row */}
            <div style={{ display:"flex",gap:12,marginBottom:12,alignItems:"center" }}>
              <div style={{ flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <defs><filter id="rg"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#60A5FA" floodOpacity="0.5"/></filter></defs>
                  <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"/>
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#60A5FA" strokeWidth="5" strokeDasharray={String(2*Math.PI*24)} strokeDashoffset={String(2*Math.PI*24*0.11)} strokeLinecap="round" transform="rotate(-90 30 30)" style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)", filter:"url(#rg)" }}/>
                  <text x="30" y="29" textAnchor="middle" dy="0.35em" fill="white" fontSize="13" fontWeight="900">89</text>
                </svg>
                <div style={{ fontSize:9,fontWeight:800,color:"#60A5FA",background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.22)",borderRadius:5,padding:"1px 7px" }}>A−</div>
              </div>
              <div style={{ flex:1,display:"flex",flexDirection:"column",gap:6 }}>
                {[{l:"ATS Match",v:91,c:"#4ADE80"},{l:"Impact",v:84,c:"#818CF8"},{l:"Clarity",v:87,c:"#60A5FA"}].map((s,i)=>(
                  <div key={s.l}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:2 }}>
                      <span style={{ fontSize:9,color:"rgba(255,255,255,0.4)" }}>{s.l}</span>
                      <span style={{ fontSize:9,fontWeight:800,color:s.c }}>{s.v}</span>
                    </div>
                    <div style={{ height:3.5,borderRadius:99,background:"rgba(255,255,255,0.07)" }}>
                      <div style={{ width:`${s.v}%`,height:"100%",borderRadius:99,background:s.c,transition:"width 1.2s ease",boxShadow:`0 0 6px ${s.c}66` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display:"flex",borderBottom:"1px solid rgba(255,255,255,0.07)",marginBottom:10 }}>
              {["Overview","Line-by-Line","AI Rewrites","Keywords"].map((t,i)=>(
                <div key={t} style={{ fontSize:9,fontWeight:i===2?700:400,color:i===2?"#60A5FA":"rgba(255,255,255,0.28)",padding:"5px 9px",borderBottom:i===2?"2px solid #3B82F6":"2px solid transparent",whiteSpace:"nowrap" }}>{t}{i===2&&<span style={{ marginLeft:3,fontSize:7,background:"rgba(239,68,68,0.2)",color:"#F87171",borderRadius:3,padding:"1px 4px" }}>9</span>}</div>
              ))}
            </div>

            {/* Two bullet rewrites */}
            {[
              { before:"Managed supply chain redesign across 5 business units", after:"Led end-to-end supply chain redesign across 5 BUs · cut time-to-ship 22% · $340K in savings · exec sign-off in 3 weeks" },
              { before:"Responsible for vendor relationships in APAC region", after:"Negotiated $1.2M APAC vendor contracts · 3 new partnerships · 18% cost reduction YoY" },
            ].map((b,i)=>(
              <div key={i} style={{ marginBottom:i===0?9:0, animation:`bubble-appear 0.55s ${i*0.11}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ background:"rgba(220,38,38,0.07)",border:"1px solid rgba(220,38,38,0.2)",borderLeft:"3px solid #DC2626",borderRadius:"0 7px 7px 0",padding:"6px 9px",marginBottom:4 }}>
                  <span style={{ fontSize:8,fontWeight:700,color:"#F87171",display:"block",marginBottom:2 }}>BEFORE</span>
                  <p style={{ fontSize:9.5,color:"rgba(248,113,113,0.8)",textDecoration:"line-through",lineHeight:1.45,margin:0 }}>{b.before}</p>
                </div>
                <div style={{ background:"rgba(22,163,74,0.07)",border:"1px solid rgba(22,163,74,0.22)",borderLeft:"3px solid #16A34A",borderRadius:"0 7px 7px 0",padding:"6px 9px" }}>
                  <span style={{ fontSize:8,fontWeight:700,color:"#4ADE80",display:"block",marginBottom:2 }}>AFTER</span>
                  <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.85)",lineHeight:1.45,margin:0 }}>{b.after}</p>
                </div>
              </div>
            ))}

            <button style={{ width:"100%",marginTop:10,fontSize:11,fontWeight:700,padding:"9px",borderRadius:9,border:"none",background:"linear-gradient(135deg,#3B82F6,#2563EB)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:"0 3px 14px rgba(37,99,235,0.45)",animation:"bubble-appear 0.55s 0.35s both cubic-bezier(0.16,1,0.3,1)" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:11,height:11 }}><path d="M8 3v8M4 8l4 4 4-4"/></svg>
              Download optimized resume
            </button>
          </div>
        )}

        {/* KEYWORD BOOST */}
        {step === 3 && (
          <div style={{ animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontSize:10.5,fontWeight:700,color:"#A5B4FC",marginBottom:10,display:"flex",alignItems:"center",gap:7 }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:"#818CF8",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>
              Injecting missing ATS keywords…
            </p>
            {[
              {kw:"Supply Chain Optimization", freq:"92% of JDs", done:true },
              {kw:"Cross-functional Leadership",freq:"88% of JDs", done:true },
              {kw:"Vendor Management",          freq:"78% of JDs", done:true },
              {kw:"P&L Ownership",              freq:"71% of JDs", done:false},
            ].map((k,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:7,animation:`bubble-appear 0.52s ${i*0.1}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ width:15,height:15,borderRadius:"50%",flexShrink:0,background:k.done?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.04)",border:`1.5px solid ${k.done?"rgba(74,222,128,0.35)":"rgba(255,255,255,0.09)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:k.done?"#4ADE80":"rgba(255,255,255,0.2)" }}>{k.done?"✓":"…"}</div>
                <div style={{ flex:1,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span style={{ fontSize:9.5,color:k.done?"rgba(255,255,255,0.78)":"rgba(255,255,255,0.28)",fontWeight:k.done?600:400 }}>{k.kw}</span>
                  <span style={{ fontSize:8,color:k.done?"#4ADE80":"rgba(255,255,255,0.22)",fontWeight:700 }}>{k.freq}</span>
                </div>
                {k.done&&<span style={{ fontSize:7,fontWeight:700,color:"#86EFAC",background:"rgba(134,239,172,0.1)",border:"1px solid rgba(134,239,172,0.2)",borderRadius:3,padding:"1px 5px",flexShrink:0 }}>ADDED</span>}
              </div>
            ))}
            <div style={{ marginTop:10,padding:"8px 11px",background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.18)",borderRadius:9,animation:"bubble-appear 0.52s 0.42s both cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontSize:10,color:"rgba(96,165,250,0.85)",margin:0,lineHeight:1.5 }}>3 high-frequency keywords added · ATS match improved from <strong style={{ color:"#F87171" }}>74%</strong> → <strong style={{ color:"#4ADE80" }}>91%</strong></p>
            </div>
          </div>
        )}

        {/* FULLY OPTIMIZED */}
        {step === 4 && (
          <div style={{ animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ textAlign:"center",padding:"8px 0 12px" }}>
              <div style={{ width:50,height:50,borderRadius:"50%",background:"rgba(134,239,172,0.1)",border:"2px solid rgba(134,239,172,0.35)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",animation:"sphere-breathe 3s ease-in-out infinite",fontSize:20 }}>✓</div>
              <p style={{ fontSize:14,fontWeight:800,color:"#86EFAC",marginBottom:4 }}>Resume is interview-ready</p>
              <p style={{ fontSize:10,color:"rgba(255,255,255,0.35)",marginBottom:14 }}>Score upgraded 62 → 89 · 2 rewrites · 4 keywords injected</p>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12 }}>
              {[{l:"ATS Match",v:"91%",c:"#4ADE80"},{l:"Impact Score",v:"84",c:"#818CF8"},{l:"Matched Jobs",v:"47",c:"#60A5FA"}].map((s,i)=>(
                <div key={s.l} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"8px 6px",textAlign:"center",animation:`bubble-appear 0.52s ${i*0.1}s both cubic-bezier(0.16,1,0.3,1)` }}>
                  <div style={{ fontSize:17,fontWeight:900,color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.3)",marginTop:2 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button style={{ width:"100%",fontSize:11,fontWeight:700,padding:"9px",borderRadius:9,border:"none",background:"linear-gradient(135deg,#3B82F6,#2563EB)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:"0 3px 14px rgba(37,99,235,0.45)",animation:"bubble-appear 0.55s 0.3s both cubic-bezier(0.16,1,0.3,1)" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:11,height:11 }}><path d="M8 3v8M4 8l4 4 4-4"/></svg>
              Download optimized resume · PDF
            </button>
          </div>
        )}
      </div>
    </div>
    );
  }

  /* ── SESSION (VOICE COACHING) ── */
  if (type === "session") {
    const SESSION_MSGS = 3;
    const MSGS = [
      { role:"coach", text:"Ready to drill your toughest interview question? I'll coach you exactly the way a real panel would." },
      { role:"user",  text:"Yes — the cross-functional leadership question." },
      { role:"coach", text:"Strong structure overall. Your Result dimension needs a specific number — vague outcomes get screened out at this level." },
    ];
    const DRILL = [
      { role:"coach", text:"Push harder on Result. Give me the exact $ figure — what would a VP quote in a board review?" },
      { role:"user",  text:"Finance signed off 2 weeks early. P1 incidents → zero. $800K in avoided incidents that quarter." },
    ];
    const visibleMsgs = step >= SESSION_MSGS ? MSGS : MSGS.slice(0, step + 1);
    const visibleDrill = step >= 5 ? DRILL : step >= 4 ? DRILL.slice(0,1) : [];
    const isListening = step < 2;
    const sessionTime = step <= 2 ? "06:42" : step <= 4 ? "08:15" : "10:03";
    const starScore = step >= 5 ? "9.1" : "8.2";
    const starData = step >= 5
      ? [{l:"S",v:9,c:"#4ADE80"},{l:"T",v:9,c:"#4ADE80"},{l:"A",v:9,c:"#4ADE80"},{l:"R",v:9,c:"#4ADE80"}]
      : [{l:"S",v:9,c:"#4ADE80"},{l:"T",v:8,c:"#60A5FA"},{l:"A",v:9,c:"#4ADE80"},{l:"R",v:7,c:"#FBBF24"}];
    return (
    <div style={{ background:"radial-gradient(ellipse at 50% 0%,#0e0b2e,#060514 55%,#000)", borderRadius:18, border:"1px solid rgba(255,255,255,0.09)", overflow:"hidden", boxShadow:"0 28px 80px rgba(0,0,0,0.55)" }}>
      <div style={{ background:"rgba(8,6,32,0.98)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"11px 16px",display:"flex",alignItems:"center",gap:8 }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }}/>)}
        <span style={{ display:"flex",alignItems:"center",gap:5,marginLeft:8,fontSize:11,fontWeight:700,color:"#22C55E" }}>
          <span style={{ width:6,height:6,borderRadius:"50%",background:"#22C55E",animation:"blink 1.1s ease-in-out infinite",display:"inline-block" }}/>
          Live Voice Session · {sessionTime}
        </span>
        <div style={{ marginLeft:"auto",display:"flex",gap:4 }}>
          <div style={{ fontSize:8.5,fontWeight:700,color:"#A5B4FC",background:"rgba(129,140,248,0.12)",border:"1px solid rgba(129,140,248,0.22)",borderRadius:5,padding:"2px 8px" }}>Voice</div>
          <div style={{ fontSize:8.5,color:"rgba(255,255,255,0.3)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:5,padding:"2px 8px" }}>Chat</div>
        </div>
      </div>
      <div style={{ padding:"16px 18px 18px",display:"flex",gap:14,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-30%",left:"10%",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,70,229,0.15),transparent 65%)",animation:"aurora-slow 8s ease-in-out infinite",pointerEvents:"none" }}/>
        {/* Orb col */}
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:8,flexShrink:0,zIndex:1 }}>
          <div style={{ position:"relative",width:116,height:116,display:"flex",alignItems:"center",justifyContent:"center" }}>
            {isListening&&<><div style={{ position:"absolute",inset:10,borderRadius:"50%",border:"1.5px solid rgba(99,102,241,0.28)",animation:"ring-pulse 2.2s ease-out infinite",pointerEvents:"none" }}/><div style={{ position:"absolute",inset:0,borderRadius:"50%",border:"1px solid rgba(99,102,241,0.12)",animation:"ring-pulse 3.1s 0.8s ease-out infinite",pointerEvents:"none" }}/></>}
            <div style={{ width:76,height:76,borderRadius:"50%",background:isListening?"radial-gradient(circle at 32% 32%,#9a8ff5,#4f46e5 50%,#1a1756)":"radial-gradient(circle at 32% 32%,#c7d2fe,#6366f1 42%,#1e1b4b)",boxShadow:isListening?"0 0 32px 10px rgba(79,70,229,0.42),0 0 65px 22px rgba(67,56,202,0.15)":"0 0 45px 16px rgba(59,130,246,0.5),0 0 90px 35px rgba(67,56,202,0.2)",animation:"sphere-breathe 4s ease-in-out infinite",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <span style={{ fontSize:16,fontWeight:900,color:"rgba(255,255,255,0.65)" }}>Z</span>
            </div>
          </div>
          <span style={{ fontSize:8.5,color:"rgba(200,208,224,0.5)",letterSpacing:"0.05em" }}>{isListening?"listening…":"coaching…"}</span>
          <div style={{ display:"flex",gap:2,alignItems:"flex-end",height:14 }}>
            {[3,6,11,16,11,6,3].map((h,i)=><div key={i} style={{ width:2.5,borderRadius:99,background:"rgba(165,180,252,0.65)",height:h,transformOrigin:"bottom",animation:`voice-wave ${1.8+i*0.22}s ease-in-out ${i*0.18}s infinite` }}/>)}
          </div>
          <div style={{ width:40,height:40,borderRadius:"50%",background:isListening?"rgba(239,68,68,0.9)":"rgba(59,130,246,0.85)",boxShadow:isListening?"0 0 0 6px rgba(239,68,68,0.12),0 0 18px rgba(239,68,68,0.4)":"0 0 0 6px rgba(59,130,246,0.1),0 0 18px rgba(59,130,246,0.3)",display:"flex",alignItems:"center",justifyContent:"center",animation:isListening?"sphere-breathe 1.2s ease-in-out infinite":"none" }}>
            {isListening?<div style={{ width:10,height:10,borderRadius:2,background:"white" }}/>:<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" style={{ width:15,height:15 }}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0M12 19v3M9 22h6"/></svg>}
          </div>
        </div>
        {/* Chat col */}
        <div style={{ flex:1,display:"flex",flexDirection:"column",gap:6,zIndex:1,overflow:"hidden" }}>
          {visibleMsgs.map((m,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div style={{ maxWidth:"90%",padding:"8px 10px",fontSize:9.5,lineHeight:1.55,borderRadius:m.role==="coach"?"4px 12px 12px 12px":"12px 4px 12px 12px",background:m.role==="coach"?"rgba(79,70,229,0.28)":"rgba(255,255,255,0.07)",border:m.role==="coach"?"1px solid rgba(59,130,246,0.35)":"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.82)" }}>{m.text}</div>
            </div>
          ))}
          {step < SESSION_MSGS && step%2===0 && (
            <div style={{ alignSelf:"flex-start",padding:"7px 10px",borderRadius:"4px 12px 12px 12px",background:"rgba(79,70,229,0.18)",border:"1px solid rgba(59,130,246,0.2)",display:"flex",gap:3,alignItems:"center",animation:"step-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
              {[0,1,2].map(i=><span key={i} style={{ width:4,height:4,borderRadius:"50%",background:"rgba(165,180,252,0.5)",animation:`dot-bounce 1.2s ${i*0.15}s infinite`,display:"inline-block" }}/>)}
            </div>
          )}
          {step >= SESSION_MSGS && (
            <div style={{ background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.22)",borderRadius:9,padding:"8px 10px",animation:"step-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both",marginTop:step<4?"auto":4 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                <span style={{ fontSize:8,fontWeight:700,color:"#60A5FA",textTransform:"uppercase",letterSpacing:"0.1em" }}>STAR Score</span>
                <span style={{ fontSize:15,fontWeight:900,color:step>=5?"#4ADE80":"#60A5FA",transition:"color 0.5s" }}>{starScore}/10</span>
              </div>
              <div style={{ display:"flex",gap:4 }}>
                {starData.map((s,i)=>(
                  <div key={i} style={{ flex:1,background:"rgba(255,255,255,0.04)",borderRadius:5,padding:"4px 0",textAlign:"center",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                    <div style={{ fontSize:11,fontWeight:900,color:s.c,lineHeight:1,transition:"color 0.5s" }}>{s.v}</div>
                    <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.3)",marginTop:1.5 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {visibleDrill.map((m,i)=>(
            <div key={`drill-${i}`} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div style={{ maxWidth:"90%",padding:"8px 10px",fontSize:9.5,lineHeight:1.55,borderRadius:m.role==="coach"?"4px 12px 12px 12px":"12px 4px 12px 12px",background:m.role==="coach"?"rgba(79,70,229,0.28)":"rgba(255,255,255,0.07)",border:m.role==="coach"?"1px solid rgba(59,130,246,0.35)":"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.82)" }}>{m.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }

  /* ── INTERVIEW ── */
  if (type === "interview") {
    const qNum = step >= 3 ? 3 : 2;
    const question = step >= 3
      ? "How do you prioritize features when engineering, sales, and product all disagree?"
      : "Tell me about a time you led a cross-functional initiative that faced significant resistance.";
    const qType = step >= 3 ? "Technical · Senior PM" : "Behavioral · Senior PM";
    return (
    <div style={{ background:"#080E1C",borderRadius:18,border:"1px solid rgba(255,255,255,0.09)",overflow:"hidden",boxShadow:"0 28px 80px rgba(0,0,0,0.55)" }}>
      <div style={{ background:"#0D1117",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"11px 16px",display:"flex",gap:5,alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:6,fontSize:11,color:"rgba(255,255,255,0.3)" }}>Mock Interview · Q{qNum} of 6</span>
        {(step===0||step===3)&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#F87171",display:"flex",alignItems:"center",gap:4 }}><span style={{ width:6,height:6,borderRadius:"50%",background:"#EF4444",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>Recording</span>}
        {step===1&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#86EFAC",background:"rgba(134,239,172,0.1)",border:"1px solid rgba(134,239,172,0.22)",padding:"2px 8px",borderRadius:99 }}>Scored ✓</span>}
        {step===2&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#A5B4FC",background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.22)",padding:"2px 8px",borderRadius:99 }}>Model answer</span>}
      </div>
      <div style={{ padding:"14px 18px 18px" }}>
        {/* Question card */}
        <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A8A)",borderRadius:10,padding:"11px 13px",marginBottom:12,animation:"step-fade-in 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div style={{ fontSize:8,textTransform:"uppercase",letterSpacing:"0.12em",color:"rgba(255,255,255,0.45)",marginBottom:5 }}>{qType}</div>
          <p style={{ fontSize:11.5,fontWeight:600,color:"white",lineHeight:1.55,margin:0 }}>{question}</p>
          <div style={{ marginTop:8,display:"flex",gap:5 }}>
            {["S","T","A","R"].map(s=><span key={s} style={{ fontSize:8.5,fontWeight:700,width:17,height:17,borderRadius:"50%",background:"rgba(255,255,255,0.14)",color:"rgba(255,255,255,0.8)",display:"flex",alignItems:"center",justifyContent:"center" }}>{s}</span>)}
          </div>
        </div>

        {/* Recording state — Q2 */}
        {step===0&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:8 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#EF4444",animation:"blink 0.8s ease infinite",display:"inline-block" }}/>
              <p style={{ fontSize:10,color:"rgba(255,255,255,0.45)",margin:0 }}>Recording your answer…</p>
            </div>
            <div style={{ display:"flex",gap:2,alignItems:"flex-end",justifyContent:"center",height:26,marginBottom:12 }}>
              {[6,10,18,26,20,30,18,22,14,20,14,10,6].map((h,i)=>(
                <div key={i} style={{ width:3.5,borderRadius:99,background:"#EF4444",height:h,opacity:0.75,transformOrigin:"bottom",animation:`voice-wave ${1.7+i*0.2}s ease-in-out ${i*0.15}s infinite` }}/>
              ))}
            </div>
            <div style={{ display:"flex",gap:8,justifyContent:"center" }}>
              <div style={{ fontSize:10,color:"rgba(255,255,255,0.4)",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:99,padding:"3px 12px" }}>00:47</div>
              <button style={{ fontSize:10,fontWeight:700,color:"white",background:"#EF4444",border:"none",borderRadius:99,padding:"3px 14px",cursor:"pointer" }}>Stop</button>
            </div>
          </div>
        )}

        {/* Scoring results */}
        {step===1&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:4,marginBottom:10 }}>
              {[{l:"Situation",v:9,c:"#86EFAC"},{l:"Task",v:8,c:"#86EFAC"},{l:"Action",v:9,c:"#86EFAC"},{l:"Result",v:7,c:"#FCD34D"},{l:"Leadership",v:9,c:"#86EFAC"},{l:"Impact",v:8,c:"#86EFAC"}].map((s,i)=>(
                <div key={s.l} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:7,padding:"7px 3px",textAlign:"center",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                  <div style={{ fontSize:15,fontWeight:900,color:s.c,lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:6.5,color:"rgba(255,255,255,0.28)",marginTop:2,lineHeight:1.2 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ borderLeft:"4px solid #2563EB",background:"rgba(37,99,235,0.08)",borderRadius:"0 8px 8px 0",padding:"8px 11px",marginBottom:8,animation:"bubble-appear 0.52s 0.45s both cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontSize:8.5,fontWeight:800,color:"#60A5FA",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3 }}>Coaching Note from Zari</p>
              <p style={{ fontSize:10,color:"rgba(147,197,253,0.85)",lineHeight:1.55,margin:0 }}>Strong structure and evidence. Your Result is the weakest — it needs a specific number. Vague outcomes are screened out at this level.</p>
            </div>
            <div style={{ borderLeft:"4px solid #059669",background:"rgba(5,150,105,0.08)",borderRadius:"0 8px 8px 0",padding:"8px 11px",animation:"bubble-appear 0.52s 0.6s both cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontSize:8.5,fontWeight:800,color:"#34D399",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3 }}>Stronger Result Statement</p>
              <p style={{ fontSize:10,color:"rgba(52,211,153,0.85)",lineHeight:1.55,margin:0,fontStyle:"italic" }}>&ldquo;Finance signed off 2 weeks ahead of schedule — P1 incidents dropped to zero that quarter. I led that outcome, not just the process.&rdquo;</p>
            </div>
          </div>
        )}

        {/* Model answer */}
        {step===2&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ borderLeft:"4px solid #059669",background:"rgba(5,150,105,0.06)",borderRadius:"0 8px 8px 0",padding:"9px 11px",marginBottom:9 }}>
              <p style={{ fontSize:8.5,fontWeight:800,color:"#34D399",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4 }}>Ideal Response · 90th percentile</p>
              <p style={{ fontSize:9.5,color:"rgba(52,211,153,0.82)",lineHeight:1.6,margin:0,fontStyle:"italic" }}>&ldquo;When I led the pricing migration at [Company], resistance came from Sales — Q3 pipeline risk. I pulled CRM data, ran 1:1s with every regional lead, and built a shared success definition. Finance signed off 2 weeks early. P1 incidents → zero. $800K in avoided costs that quarter. I owned the outcome, not just the process.&rdquo;</p>
            </div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
              {["Strong structure","Quantified result","Leadership framing","Named stakeholders"].map((t,i)=>(
                <div key={t} style={{ fontSize:7.5,fontWeight:700,color:"#4ADE80",background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:4,padding:"2px 7px",animation:`bubble-appear 0.45s ${i*0.08}s both cubic-bezier(0.16,1,0.3,1)` }}>{t}</div>
              ))}
            </div>
            <button style={{ width:"100%",marginTop:10,fontSize:10.5,fontWeight:700,padding:"8px",borderRadius:8,border:"1px solid rgba(59,130,246,0.28)",background:"rgba(59,130,246,0.1)",color:"#60A5FA",cursor:"pointer",animation:"bubble-appear 0.55s 0.35s both cubic-bezier(0.16,1,0.3,1)" }}>Practice this answer →</button>
          </div>
        )}

        {/* Q3 Recording */}
        {step===3&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:8 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#EF4444",animation:"blink 0.8s ease infinite",display:"inline-block" }}/>
              <p style={{ fontSize:10,color:"rgba(255,255,255,0.45)",margin:0 }}>Recording your answer…</p>
            </div>
            <div style={{ display:"flex",gap:2,alignItems:"flex-end",justifyContent:"center",height:26,marginBottom:12 }}>
              {[8,14,22,18,28,34,22,18,12,16,10,8,6].map((h,i)=>(
                <div key={i} style={{ width:3.5,borderRadius:99,background:"#EF4444",height:h,opacity:0.75,transformOrigin:"bottom",animation:`voice-wave ${1.6+i*0.22}s ease-in-out ${i*0.13}s infinite` }}/>
              ))}
            </div>
            <div style={{ display:"flex",gap:8,justifyContent:"center" }}>
              <div style={{ fontSize:10,color:"rgba(255,255,255,0.4)",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:99,padding:"3px 12px" }}>01:15</div>
              <button style={{ fontSize:10,fontWeight:700,color:"white",background:"#EF4444",border:"none",borderRadius:99,padding:"3px 14px",cursor:"pointer" }}>Stop</button>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }

  /* ── LINKEDIN ── */
  if (type === "linkedin") {
    const score = step===0?54:91;
    const scoreColor = step===0?"#FBBF24":"#22C55E";
    const scores = step===0
      ?[{l:"Headline",v:4},{l:"Summary",v:5},{l:"Experience",v:3},{l:"Education",v:6},{l:"Other",v:5},{l:"Networking",v:4}]
      :[{l:"Headline",v:9},{l:"Summary",v:9},{l:"Experience",v:8},{l:"Education",v:8},{l:"Other",v:8},{l:"Networking",v:8}];
    return (
    <div style={{ background:"#080E1C",borderRadius:18,border:"1px solid rgba(255,255,255,0.09)",overflow:"hidden",boxShadow:"0 28px 80px rgba(0,0,0,0.55)" }}>
      <div style={{ background:"#0D1117",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"11px 16px",display:"flex",gap:5,alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:6,fontSize:11,color:"rgba(255,255,255,0.3)" }}>LinkedIn · Zari</span>
        {step===1&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#86EFAC",background:"rgba(134,239,172,0.1)",border:"1px solid rgba(134,239,172,0.22)",padding:"2px 8px",borderRadius:99 }}>Optimized ✓</span>}
        {step===2&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#A5B4FC",background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.22)",padding:"2px 8px",borderRadius:99 }}>Boosting keywords…</span>}
        {step===3&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#FBBF24",background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.22)",padding:"2px 8px",borderRadius:99 }}>3 recruiter DMs 🔥</span>}
      </div>
      <div style={{ padding:"14px 18px 18px" }}>
        {/* Score + section grid — always visible */}
        <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:12 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0 }}>
            <svg width="58" height="58" viewBox="0 0 58 58">
              <circle cx="29" cy="29" r="23" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"/>
              <circle cx="29" cy="29" r="23" fill="none" stroke={scoreColor} strokeWidth="5"
                strokeDasharray={String(2*Math.PI*23)} strokeDashoffset={String(2*Math.PI*23*(1-score/100))}
                strokeLinecap="round" transform="rotate(-90 29 29)"
                style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}/>
              <text x="29" y="29" textAnchor="middle" dy="0.35em" fill="white" fontSize="12" fontWeight="900">{score}</text>
            </svg>
            {step===1&&<span style={{ fontSize:8,fontWeight:700,color:"#22C55E",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:4,padding:"1px 6px" }}>+37 ↑</span>}
            {step===0&&<span style={{ fontSize:8,color:"rgba(255,255,255,0.3)" }}>Overall</span>}
          </div>
          <div style={{ flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:4 }}>
            {scores.map((s,i)=>{
              const c=s.v>=8?"#4ADE80":s.v>=6?"#FBBF24":"#F87171";
              return(
                <div key={s.l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:5,padding:"4px 8px",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                  <span style={{ fontSize:9,color:"rgba(255,255,255,0.38)" }}>{s.l}</span>
                  <span style={{ fontSize:10.5,fontWeight:800,color:c }}>{s.v}/10</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* BEFORE state */}
        {step===0&&(
          <div style={{ animation:"step-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontSize:8.5,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Priority Fixes</p>
            {[
              {label:"Headline",    fix:"No target role or keywords — invisible to recruiters"},
              {label:"Experience",  fix:"Bullets describe tasks, not impact. No metrics."},
              {label:"Summary",     fix:"Generic opener. Fails to position you for a direction."},
            ].map((item,i)=>(
              <div key={i} style={{ display:"flex",gap:7,marginBottom:6,animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ width:3.5,borderRadius:99,background:"#EF4444",flexShrink:0,minHeight:14 }}/>
                <div>
                  <span style={{ fontSize:9.5,fontWeight:700,color:"#F87171" }}>{item.label}: </span>
                  <span style={{ fontSize:9.5,color:"rgba(255,255,255,0.38)",lineHeight:1.45 }}>{item.fix}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop:9,fontSize:10.5,color:"rgba(255,255,255,0.28)",display:"flex",alignItems:"center",gap:5 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#3B82F6",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>
              Zari is rewriting all sections…
            </div>
          </div>
        )}

        {/* AFTER state */}
        {step===1&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            {[
              {section:"Headline",   before:"Operations Lead at FinCo Ltd",  after:"Senior PM | Ops → Product | $340K impact · cross-functional delivery | Open to new roles"},
              {section:"Summary",    before:"I am a results-driven professional with over 8 years of experience in operations...",  after:"PM transitioning from Ops — I turn ambiguous problems into shipped products with measurable impact across finance and supply chain."},
            ].map((r,i)=>(
              <div key={i} style={{ marginBottom:i===0?8:0,animation:`bubble-appear 0.55s ${i*0.1}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ fontSize:8,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4 }}>{r.section}</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5 }}>
                  <div style={{ background:"rgba(239,68,68,0.07)",border:"1px solid rgba(239,68,68,0.18)",borderRadius:7,padding:"7px 9px" }}>
                    <div style={{ fontSize:7.5,fontWeight:700,color:"#F87171",marginBottom:2 }}>Before</div>
                    <p style={{ fontSize:9,color:"rgba(248,113,113,0.75)",lineHeight:1.45,margin:0 }}>{r.before}</p>
                  </div>
                  <div style={{ background:"rgba(22,163,74,0.07)",border:"1px solid rgba(22,163,74,0.22)",borderRadius:7,padding:"7px 9px" }}>
                    <div style={{ fontSize:7.5,fontWeight:700,color:"#4ADE80",marginBottom:2 }}>Zari&apos;s Rewrite</div>
                    <p style={{ fontSize:9,color:"rgba(134,239,172,0.9)",lineHeight:1.45,margin:0 }}>{r.after}</p>
                  </div>
                </div>
              </div>
            ))}
            <button style={{ width:"100%",marginTop:9,fontSize:11,fontWeight:700,padding:"8px",borderRadius:8,border:"none",background:"#0A66C2",color:"white",cursor:"pointer",animation:"bubble-appear 0.55s 0.3s both cubic-bezier(0.16,1,0.3,1)" }}>Copy to LinkedIn →</button>
          </div>
        )}

        {/* KEYWORD INJECTION */}
        {step===2&&(
          <div style={{ animation:"step-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontSize:8.5,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Keyword Injection</p>
            {[
              {kw:"Strategic Partnerships",       section:"Headline",    done:true },
              {kw:"Cross-functional Leadership",  section:"Summary",     done:true },
              {kw:"P&L Ownership",               section:"Experience 1", done:true },
              {kw:"Stakeholder Management",       section:"Experience 2", done:false},
            ].map((k,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6,animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ width:14,height:14,borderRadius:"50%",flexShrink:0,background:k.done?"rgba(74,222,128,0.1)":"rgba(255,255,255,0.04)",border:`1.5px solid ${k.done?"rgba(74,222,128,0.35)":"rgba(255,255,255,0.09)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:k.done?"#4ADE80":"rgba(255,255,255,0.2)" }}>{k.done?"✓":"…"}</div>
                <div style={{ flex:1,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span style={{ fontSize:9.5,color:k.done?"rgba(255,255,255,0.75)":"rgba(255,255,255,0.28)" }}>{k.kw}</span>
                  <span style={{ fontSize:7.5,color:"rgba(255,255,255,0.22)",background:"rgba(255,255,255,0.04)",borderRadius:3,padding:"1px 5px" }}>{k.section}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop:8,fontSize:10,color:"rgba(255,255,255,0.28)",display:"flex",alignItems:"center",gap:5 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#3B82F6",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>
              Injecting 1 more keyword…
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step===3&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            {[
              {icon:"👁",label:"Profile views",         val:"+312%", sub:"vs. last 30 days",   c:"#60A5FA"},
              {icon:"💬",label:"Recruiter DMs",          val:"3",      sub:"this week",           c:"#4ADE80"},
              {icon:"🔍",label:"Search appearances",     val:"+44",    sub:"in last 7 days",      c:"#A5B4FC"},
            ].map((m,i)=>(
              <div key={i} style={{ display:"flex",gap:10,alignItems:"center",marginBottom:8,animation:`bubble-appear 0.52s ${i*0.1}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ width:30,height:30,borderRadius:7,background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0 }}>{m.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline" }}>
                    <span style={{ fontSize:9.5,color:"rgba(255,255,255,0.48)" }}>{m.label}</span>
                    <span style={{ fontSize:15,fontWeight:900,color:m.c }}>{m.val}</span>
                  </div>
                  <span style={{ fontSize:8,color:"rgba(255,255,255,0.22)" }}>{m.sub}</span>
                </div>
              </div>
            ))}
            <div style={{ borderLeft:"3px solid #0A66C2",background:"rgba(10,102,194,0.09)",borderRadius:"0 8px 8px 0",padding:"8px 10px",animation:"bubble-appear 0.52s 0.3s both cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontSize:9.5,color:"rgba(147,197,253,0.85)",lineHeight:1.55,margin:0 }}>LinkedIn is surfacing your profile to recruiters hiring Senior PMs in SF. Keep posting 2×/week to stay in the algorithm.</p>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }

  /* ── PROMOTION ── */
  if (type === "promotion") {
    return (
    <div style={{ background:"#080E1C",borderRadius:18,border:"1px solid rgba(255,255,255,0.09)",overflow:"hidden",boxShadow:"0 28px 80px rgba(0,0,0,0.55)" }}>
      <div style={{ background:"#0D1117",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"11px 16px",display:"flex",gap:5,alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:6,fontSize:11,color:"rgba(255,255,255,0.3)" }}>Promotion Coaching · Zari</span>
        {step===1&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#86EFAC",background:"rgba(134,239,172,0.1)",border:"1px solid rgba(134,239,172,0.22)",padding:"2px 8px",borderRadius:99 }}>Analysis ready</span>}
        {step===2&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#FBBF24",background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.22)",padding:"2px 8px",borderRadius:99 }}>8-week plan</span>}
        {step===3&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#A5B4FC",background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.22)",padding:"2px 8px",borderRadius:99 }}>Pitch ready ✓</span>}
      </div>
      <div style={{ padding:"14px 18px 18px" }}>
        {step===0&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontSize:10.5,fontWeight:700,color:"rgba(255,255,255,0.68)",marginBottom:10 }}>Tell Zari about your situation</p>
            {[
              {label:"Current level",   val:"Senior Engineer (L5) · 3 years"},
              {label:"Target level",    val:"Staff Engineer (L6)"},
              {label:"Timeline",        val:"Q2 review cycle"},
              {label:"Biggest blocker", val:"Manager keeps saying 'not yet'"},
            ].map((f,i)=>(
              <div key={i} style={{ marginBottom:7,animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ fontSize:8,textTransform:"uppercase",letterSpacing:"0.1em",color:"rgba(255,255,255,0.25)",marginBottom:2 }}>{f.label}</div>
                <div style={{ fontSize:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:7,padding:"6px 10px",color:"rgba(255,255,255,0.72)" }}>{f.val}</div>
              </div>
            ))}
            <div style={{ marginTop:10,display:"flex",alignItems:"center",gap:6,fontSize:10,color:"#60A5FA" }}>
              <span style={{ width:7,height:7,borderRadius:"50%",background:"#3B82F6",animation:"blink 0.9s ease infinite",display:"inline-block" }}/>
              Zari is analyzing your readiness…
            </div>
          </div>
        )}
        {step===1&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Verdict banner */}
            <div style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:11,borderLeft:"4px solid #FBBF24",background:"rgba(251,191,36,0.05)",borderRadius:"0 9px 9px 0",padding:"9px 11px" }}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0 }}>
                <svg width="46" height="46" viewBox="0 0 46 46">
                  <circle cx="23" cy="23" r="18" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4"/>
                  <circle cx="23" cy="23" r="18" fill="none" stroke="#FBBF24" strokeWidth="4"
                    strokeDasharray={String(2*Math.PI*18)} strokeDashoffset={String(2*Math.PI*18*0.35)}
                    strokeLinecap="round" transform="rotate(-90 23 23)"
                    style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}/>
                  <text x="23" y="23" textAnchor="middle" dy="0.35em" fill="white" fontSize="10" fontWeight="900">65</text>
                </svg>
                <span style={{ fontSize:7,color:"rgba(255,255,255,0.28)" }}>Readiness</span>
              </div>
              <div>
                <span style={{ display:"inline-flex",background:"rgba(251,191,36,0.16)",borderRadius:4,padding:"2px 7px",marginBottom:4 }}>
                  <span style={{ fontSize:8,fontWeight:800,color:"#FBBF24",textTransform:"uppercase",letterSpacing:"0.06em" }}>Close, but not airtight</span>
                </span>
                <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.62)",lineHeight:1.55,margin:0 }}>Impact is documented. The gap is scope ownership and a named executive sponsor. Two focused months could close this.</p>
              </div>
            </div>
            {/* Dimension cards */}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:9 }}>
              {[{l:"Impact Evidence",v:7,c:"#4ADE80"},{l:"Scope & Influence",v:6,c:"#FBBF24"},{l:"Sponsorship",v:4,c:"#FB923C"},{l:"Communication",v:8,c:"#4ADE80"}].map((d,i)=>(
                <div key={d.l} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderTop:`2.5px solid ${d.c}`,borderRadius:"0 0 7px 7px",padding:"7px 9px",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4 }}>
                    <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.38)",lineHeight:1.3 }}>{d.l}</span>
                    <span style={{ fontSize:14,fontWeight:900,color:d.c }}>{d.v}</span>
                  </div>
                  <div style={{ height:2.5,borderRadius:99,background:"rgba(255,255,255,0.07)" }}>
                    <div style={{ width:`${d.v/10*100}%`,height:"100%",background:d.c,borderRadius:99,transition:"width 1s ease" }}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5 }}>
              <div style={{ borderLeft:"3px solid #059669",background:"rgba(5,150,105,0.07)",borderRadius:"0 7px 7px 0",padding:"8px 9px" }}>
                <p style={{ fontSize:8,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#34D399",marginBottom:4 }}>What&apos;s solid</p>
                {["$1.2M ARR impact documented","Led 3 cross-org initiatives","Strong peer reviews"].map((s,i)=>(
                  <div key={i} style={{ fontSize:9,color:"rgba(134,239,172,0.75)",marginBottom:2,lineHeight:1.4 }}>✓ {s}</div>
                ))}
              </div>
              <div style={{ borderLeft:"3px solid #DC2626",background:"rgba(220,38,38,0.07)",borderRadius:"0 7px 7px 0",padding:"8px 9px" }}>
                <p style={{ fontSize:8,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#F87171",marginBottom:4 }}>What&apos;s risky</p>
                {["No executive sponsor","Scope expansion unclear","No written promo case"].map((r,i)=>(
                  <div key={i} style={{ fontSize:9,color:"rgba(248,113,113,0.75)",marginBottom:2,lineHeight:1.4 }}>✗ {r}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8-WEEK PLAN */}
        {step===2&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontSize:8.5,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8 }}>Your 8-Week Promo Plan</p>
            {[
              {weeks:"Wk 1–2", task:"Document $1.2M impact in exec-facing format",         cat:"Evidence",      hi:true },
              {weeks:"Wk 3–4", task:"Brief a VP sponsor on your promo case directly",       cat:"Sponsorship",   hi:true },
              {weeks:"Wk 5–6", task:"Co-lead a cross-org initiative spanning 3+ teams",    cat:"Scope",         hi:false},
              {weeks:"Wk 7–8", task:"Write promo doc and share with manager 4 weeks early", cat:"Documentation", hi:true },
            ].map((t,i)=>(
              <div key={i} style={{ display:"flex",gap:8,marginBottom:7,animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",background:"rgba(255,255,255,0.04)",borderRadius:4,padding:"2px 5px",flexShrink:0,whiteSpace:"nowrap",height:"fit-content",marginTop:1 }}>{t.weeks}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.72)",lineHeight:1.4,margin:0,marginBottom:3 }}>{t.task}</p>
                  <div style={{ display:"flex",gap:4 }}>
                    <span style={{ fontSize:7,color:"rgba(255,255,255,0.28)",background:"rgba(255,255,255,0.04)",borderRadius:3,padding:"1px 5px" }}>{t.cat}</span>
                    {t.hi&&<span style={{ fontSize:7,color:"#F87171",background:"rgba(239,68,68,0.1)",borderRadius:3,padding:"1px 5px",fontWeight:700 }}>HIGH</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MANAGER PITCH */}
        {step===3&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{ fontSize:8.5,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8 }}>Manager Pitch Simulation</p>
            {[
              {who:"You", text:"I want to talk about the path to L6. I documented the migration impact — $1.2M ARR, shipped 2 weeks early.", side:"user"},
              {who:"Mgr", text:"I appreciate the initiative. The gap I see is cross-org scope beyond your immediate team.", side:"coach"},
              {who:"You", text:"Already on it — I'm co-owning the Q3 reliability initiative with the Infra lead. Would that be the scope signal you need?", side:"user"},
            ].map((m,i)=>(
              <div key={i} style={{ display:"flex",gap:7,marginBottom:5,flexDirection:m.side==="user"?"row-reverse":"row",animation:`step-fade-in 0.5s ${i*0.1}s both cubic-bezier(0.16,1,0.3,1)` }}>
                <div style={{ width:19,height:19,borderRadius:"50%",flexShrink:0,background:m.side==="coach"?"rgba(255,255,255,0.1)":"rgba(129,140,248,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:"white" }}>{m.who}</div>
                <div style={{ maxWidth:"80%",padding:"6px 9px",fontSize:9.5,lineHeight:1.5,borderRadius:m.side==="coach"?"3px 10px 10px 10px":"10px 3px 10px 10px",background:m.side==="coach"?"rgba(255,255,255,0.05)":"rgba(129,140,248,0.12)",color:"rgba(255,255,255,0.78)",border:`1px solid ${m.side==="coach"?"rgba(255,255,255,0.07)":"rgba(129,140,248,0.22)"}` }}>{m.text}</div>
              </div>
            ))}
            <div style={{ borderLeft:"3px solid #818CF8",background:"rgba(129,140,248,0.07)",borderRadius:"0 7px 7px 0",padding:"7px 9px",marginTop:4,animation:"bubble-appear 0.52s 0.32s both cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontSize:9,color:"rgba(165,180,252,0.85)",lineHeight:1.5,margin:0 }}>Strong pivot — you turned the gap into a solution in one response. That&apos;s the L6 instinct managers look for.</p>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }

  /* ── SALARY ── */
  if (type === "salary") {
    const ROUNDS = [
      { who:"Mgr", text:"We'd like to offer you $145K base.", side:"coach" as const },
      { who:"You", text:"I appreciate the offer. Based on my research and the scope of this role, I was expecting $162K.", side:"user" as const },
      { who:"Mgr", text:"That's above our band. We can go to $150K max.", side:"coach" as const },
      { who:"You", text:"I understand the band, but given the scope I'd be taking on from day one, $158K reflects the value I'll drive.", side:"user" as const },
    ];
    const visible = step===0 ? ROUNDS.slice(0,1) : step===1 ? ROUNDS.slice(0,3) : ROUNDS;
    return (
    <div style={{ background:"#080E1C",borderRadius:18,border:"1px solid rgba(255,255,255,0.09)",overflow:"hidden",boxShadow:"0 28px 80px rgba(0,0,0,0.55)" }}>
      <div style={{ background:"#0D1117",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"11px 16px",display:"flex",gap:5,alignItems:"center" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }}/>)}
        <span style={{ marginLeft:6,fontSize:11,color:"rgba(255,255,255,0.3)" }}>Salary Negotiation · Simulation</span>
        {step===1&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#FBBF24",background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.22)",padding:"2px 8px",borderRadius:99 }}>Round 2 of 3</span>}
        {step===2&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#FB923C",background:"rgba(251,146,60,0.1)",border:"1px solid rgba(251,146,60,0.22)",padding:"2px 8px",borderRadius:99 }}>Round 3 of 3</span>}
        {step===3&&<span style={{ marginLeft:"auto",fontSize:9,fontWeight:700,color:"#86EFAC",background:"rgba(134,239,172,0.1)",border:"1px solid rgba(134,239,172,0.22)",padding:"2px 8px",borderRadius:99 }}>Accepted ✓</span>}
      </div>
      <div style={{ padding:"14px 18px 18px" }}>
        {/* Market benchmark — always visible */}
        <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A5F)",borderRadius:10,padding:"11px 13px",marginBottom:12 }}>
          <div style={{ fontSize:8,textTransform:"uppercase",letterSpacing:"0.12em",color:"rgba(255,255,255,0.45)",marginBottom:4 }}>Market benchmark · Senior PM · SF Bay Area</div>
          <div style={{ display:"flex",alignItems:"baseline",gap:7 }}>
            <span style={{ fontSize:22,fontWeight:900,color:"white" }}>$162K</span>
            <span style={{ fontSize:10,color:"rgba(255,255,255,0.5)" }}>p50 total comp</span>
          </div>
          <div style={{ display:"flex",gap:10,marginTop:6 }}>
            {[{l:"p25",v:"$142K"},{l:"p50",v:"$162K"},{l:"p75",v:"$185K"}].map(m=>(
              <div key={m.l} style={{ fontSize:9,color:"rgba(255,255,255,0.5)" }}><span style={{ color:"rgba(255,255,255,0.88)",fontWeight:700 }}>{m.v}</span> {m.l}</div>
            ))}
          </div>
        </div>
        {visible.map((m,i)=>(
          <div key={i} style={{ display:"flex",gap:7,marginBottom:7,flexDirection:m.side==="user"?"row-reverse":"row",animation:"step-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,background:m.side==="coach"?"rgba(255,255,255,0.1)":"#16A34A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:"white" }}>{m.who}</div>
            <div style={{ maxWidth:"78%",padding:"7px 10px",fontSize:10.5,lineHeight:1.5,borderRadius:m.side==="coach"?"3px 11px 11px 11px":"11px 3px 11px 11px",background:m.side==="coach"?"rgba(255,255,255,0.05)":"rgba(134,239,172,0.1)",color:m.side==="coach"?"rgba(255,255,255,0.78)":"rgba(134,239,172,0.9)",border:`1px solid ${m.side==="coach"?"rgba(255,255,255,0.07)":"rgba(134,239,172,0.2)"}` }}>{m.text}</div>
          </div>
        ))}
        {step===1&&(
          <div style={{ background:"rgba(59,130,246,0.09)",border:"1px solid rgba(59,130,246,0.22)",borderRadius:10,padding:"9px 11px",marginTop:2,animation:"bubble-appear 0.52s 0.3s both cubic-bezier(0.16,1,0.3,1)" }}>
            <p style={{ fontSize:9.5,fontWeight:700,color:"#60A5FA",marginBottom:3 }}>Zari&apos;s next move</p>
            <p style={{ fontSize:10,color:"rgba(96,165,250,0.85)",lineHeight:1.5,margin:0 }}>&ldquo;$150K is still $12K below market. Counter at $158K — tie it to the scope you&apos;re taking on. Let them respond first.&rdquo;</p>
          </div>
        )}
        {step===2&&(
          <div style={{ background:"rgba(59,130,246,0.09)",border:"1px solid rgba(59,130,246,0.22)",borderRadius:10,padding:"9px 11px",marginTop:2,animation:"bubble-appear 0.52s 0.3s both cubic-bezier(0.16,1,0.3,1)" }}>
            <p style={{ fontSize:9.5,fontWeight:700,color:"#60A5FA",marginBottom:3 }}>Zari&apos;s read</p>
            <p style={{ fontSize:10,color:"rgba(96,165,250,0.85)",lineHeight:1.5,margin:0 }}>&ldquo;They&apos;re at $150K. You countered at $158K. Hold it — they haven&apos;t said impossible. Silence is pressure. Let them move next.&rdquo;</p>
          </div>
        )}
        {step===3&&(
          <div style={{ animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ textAlign:"center",padding:"6px 0 10px" }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:6,marginBottom:8,background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.22)",borderRadius:99,padding:"4px 14px" }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ADE80",display:"inline-block" }}/>
                <span style={{ fontSize:10,fontWeight:700,color:"#86EFAC" }}>Offer Accepted</span>
              </div>
              <div style={{ fontSize:28,fontWeight:900,color:"white",lineHeight:1,marginBottom:4 }}>$158K</div>
              <div style={{ fontSize:10,color:"rgba(255,255,255,0.35)",marginBottom:12 }}>base + $20K signing · Start May 1</div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:10 }}>
              {[{l:"Initial offer",v:"$145K",c:"#F87171"},{l:"Final accepted",v:"$158K",c:"#4ADE80"},{l:"Total gain",v:"+$13K",c:"#60A5FA"},{l:"Market p50",v:"$162K",c:"#FBBF24"}].map((s,i)=>(
                <div key={s.l} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:7,padding:"7px 9px",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                  <div style={{ fontSize:8,color:"rgba(255,255,255,0.28)",marginBottom:2 }}>{s.l}</div>
                  <div style={{ fontSize:14,fontWeight:900,color:s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ borderLeft:"3px solid #4ADE80",background:"rgba(74,222,128,0.06)",borderRadius:"0 7px 7px 0",padding:"7px 10px",animation:"bubble-appear 0.52s 0.35s both cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontSize:9.5,color:"rgba(134,239,172,0.82)",lineHeight:1.5,margin:0 }}>Holding $158K worked — $8K above their stated ceiling. Every $1K you negotiate now compounds across your entire career.</p>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }

  return null;
}

/* ══════════════════════════════════════════════════
   PLATFORM WALKTHROUGH
══════════════════════════════════════════════════ */
function PlatformWalkthrough() {
  const [activeTab, setActiveTab] = useState(0);
  const [subStep, setSubStep] = useState(0);

  const TABS = [
    { label: "Chat with Zari", id: "voice"        },
    { label: "Resume Review",  id: "resume"       },
    { label: "Mock Interview", id: "interview"    },
    { label: "Cover Letter",   id: "cover-letter" },
    { label: "LinkedIn",       id: "linkedin"     },
    { label: "Action Plan",    id: "plan"         },
  ];

  useEffect(() => {
    const t = setTimeout(() => { setActiveTab(s => (s + 1) % TABS.length); setSubStep(0); }, 9500);
    return () => clearTimeout(t);
  }, [activeTab]);

  useEffect(() => {
    if (subStep >= 4) return;
    const t = setTimeout(() => setSubStep(s => s + 1), 1800);
    return () => clearTimeout(t);
  }, [subStep, activeTab]);

  const activeId = TABS[activeTab].id;

  const sidebarItems: { group: string; items: { id: string; label: string; icon: React.ReactNode }[] }[] = [
    { group: "TOOLS", items: [
      { id: "resume",       label: "Resume Review", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:13,height:13}}><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg> },
      { id: "interview",   label: "Mock Interview", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:13,height:13}}><circle cx="10" cy="6" r="3"/><path d="M3 17c0-3.866 3.134-6 7-6s7 2.134 7 6"/></svg> },
      { id: "cover-letter",label: "Cover Letter",   icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:13,height:13}}><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/><path d="M3 7l7 5 7-5"/></svg> },
      { id: "linkedin",    label: "LinkedIn",       icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:13,height:13}}><rect x="2" y="2" width="16" height="16" rx="3"/><path d="M6 9v5M6 6.5v.5M9 14V11a2.5 2.5 0 015 0v3M9 11v3"/></svg> },
    ]},
    { group: "WORKSPACE", items: [
      { id: "docs", label: "My Documents", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:13,height:13}}><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v4h4"/></svg> },
      { id: "plan", label: "Action Plan",  icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:13,height:13}}><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M6 2v4M14 2v4M3 9h14M7 13l2 2 4-4"/></svg> },
    ]},
  ];

  return (
    <section style={{ background:"linear-gradient(180deg,#04060E 0%,#080C1A 60%,#060913 100%)", padding:"96px 20px 120px" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.16em", color:"#818CF8", background:"rgba(129,140,248,0.1)", border:"1px solid rgba(129,140,248,0.2)", padding:"5px 14px", borderRadius:99, marginBottom:18 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#818CF8", animation:"blink 1.4s ease-in-out infinite", display:"inline-block" }}/>
            Live Platform Demo
          </span>
          <h2 style={{ fontSize:"clamp(2rem,3.6vw,2.7rem)", fontWeight:900, letterSpacing:"-0.04em", color:"white", lineHeight:1.1, marginBottom:14 }}>
            See Zari work in real time
          </h2>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.38)", maxWidth:460, margin:"0 auto", lineHeight:1.65 }}>
            Six AI tools, one platform — watch each one in action.
          </p>
        </div>

        {/* Tab pills */}
        <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:36, flexWrap:"wrap" }}>
          {TABS.map((tab, i) => (
            <button key={tab.id} onClick={() => { setActiveTab(i); setSubStep(0); }} style={{ padding:"8px 20px", borderRadius:99, border:"1px solid", borderColor:activeTab===i?"rgba(129,140,248,0.5)":"rgba(255,255,255,0.08)", background:activeTab===i?"rgba(129,140,248,0.14)":"rgba(255,255,255,0.02)", color:activeTab===i?"#A5B4FC":"rgba(255,255,255,0.32)", fontSize:13.5, fontWeight:600, cursor:"pointer", transition:"all 0.2s", boxShadow:activeTab===i?"0 0 20px rgba(129,140,248,0.15)":"none" }}>{tab.label}</button>
          ))}
        </div>

        {/* Browser chrome */}
        <div style={{ borderRadius:18, overflow:"hidden", boxShadow:"0 48px 140px rgba(0,0,0,0.75),0 0 0 1px rgba(255,255,255,0.06),inset 0 1px 0 rgba(255,255,255,0.04)", background:"#0D1117" }}>

          {/* Top bar */}
          <div style={{ background:"#161B27", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"10px 16px", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ display:"flex", gap:6 }}>
              {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c,opacity:0.85 }}/>)}
            </div>
            <div style={{ flex:1, background:"rgba(255,255,255,0.05)", borderRadius:7, padding:"5px 14px", textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.22)", letterSpacing:"0.02em" }}>app.zaricoach.com/dashboard</div>
            <div style={{ width:60 }}/>
          </div>

          {/* App shell */}
          <div style={{ display:"flex", height:580 }}>

            {/* ── Sidebar ── */}
            <div style={{ width:162,background:"#0B0F1A",borderRight:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",flexShrink:0 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,padding:"13px 12px 10px",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width:26,height:26,borderRadius:7,background:"linear-gradient(135deg,#3B82F6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"white",flexShrink:0,boxShadow:"0 4px 12px rgba(37,99,235,0.35)" }}>Z</div>
                <span style={{ fontSize:13,fontWeight:800,color:"white",letterSpacing:"-0.04em",flex:1 }}>Zari</span>
              </div>
              <div style={{ padding:"9px 10px 6px" }}>
                <div style={{ fontSize:8.5,color:"rgba(255,255,255,0.22)",lineHeight:1.5,marginBottom:7 }}>Your stage customizes your workspace tools &amp; goals.</div>
                <div style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 9px",borderRadius:7,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",marginBottom:5 }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="#3B82F6" strokeWidth="1.8" style={{ width:10,height:10,flexShrink:0 }}><circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/></svg>
                  <span style={{ flex:1,fontSize:10.5,fontWeight:600,color:"rgba(255,255,255,0.68)" }}>Job Search</span>
                  <svg viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" style={{ width:8,height:8 }}><path d="M4 6l4 4 4-4"/></svg>
                </div>
                <div onClick={() => { setActiveTab(0); setSubStep(0); }} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 9px",borderRadius:7,background:activeTab===0?"rgba(99,102,241,0.18)":"rgba(59,130,246,0.12)",border:activeTab===0?"1px solid rgba(129,140,248,0.4)":"1px solid rgba(59,130,246,0.22)",cursor:"pointer",transition:"all 0.15s" }}>
                  <svg viewBox="0 0 20 20" fill="none" stroke={activeTab===0?"#A5B4FC":"#60A5FA"} strokeWidth="1.7" style={{ width:11,height:11,flexShrink:0 }}><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V4z"/></svg>
                  <span style={{ fontSize:10.5,fontWeight:700,color:activeTab===0?"#A5B4FC":"#60A5FA" }}>Chat with Zari</span>
                </div>
              </div>
              <div style={{ height:1,margin:"2px 10px 3px",background:"rgba(255,255,255,0.05)" }}/>
              <nav style={{ flex:1,overflowY:"auto",padding:"0 6px" }}>
                {sidebarItems.map(section => (
                  <div key={section.group}>
                    <div style={{ padding:"8px 7px 2px",fontSize:8,fontWeight:700,color:"rgba(255,255,255,0.18)",letterSpacing:"0.12em",textTransform:"uppercase" }}>{section.group}</div>
                    {section.items.map(item => {
                      const isActive = item.id === activeId;
                      return (
                        <div key={item.id} style={{ display:"flex",alignItems:"center",gap:7,padding:"7px 8px 7px 9px",borderRadius:6,marginBottom:1,background:isActive?"rgba(59,130,246,0.1)":"transparent",color:isActive?"#60A5FA":"rgba(255,255,255,0.38)",fontSize:11,fontWeight:isActive?700:400,borderLeft:isActive?"2px solid #3B82F6":"2px solid transparent",transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
                          <span style={{ color:isActive?"#60A5FA":"rgba(255,255,255,0.24)",display:"flex" }}>{item.icon}</span>
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </nav>
              <div style={{ padding:"8px 10px",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",gap:7 }}>
                <div style={{ width:24,height:24,borderRadius:"50%",background:"linear-gradient(135deg,#3B82F6,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"white",flexShrink:0 }}>SJ</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.72)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>Steve J.</div>
                  <div style={{ fontSize:8,color:"rgba(255,255,255,0.28)" }}>Job Search</div>
                </div>
              </div>
            </div>

            {/* ── Main content ── */}
            <div key={activeTab} style={{ flex:1,overflow:"hidden",position:"relative",background:"linear-gradient(160deg,#08101E 0%,#0A0D14 100%)",animation:"tab-fade-in 0.55s cubic-bezier(0.16,1,0.3,1) both" }}>

              {/* ══ RESUME REVIEW ══ */}
              {activeTab === 1 && (
                <div style={{ height:"100%",display:"flex",flexDirection:"column" }}>
                  {/* Page header */}
                  <div style={{ padding:"9px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(8,12,26,0.95)",display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
                    <span style={{ fontSize:13,fontWeight:700,color:"white" }}>Resume Review</span>
                    {subStep >= 2 && (
                      <>
                        <span style={{ fontSize:9,color:"rgba(255,255,255,0.2)" }}>·</span>
                        <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.32)" }}>resume · Mid-level · General review</span>
                        <div style={{ marginLeft:"auto",display:"flex",gap:5,alignItems:"center" }}>
                          {["Overview","Line-by-Line","9 bullets","AI Rewrites","History 4"].map((t,i) => (
                            <span key={t} style={{ fontSize:8,fontWeight:i===0?700:400,color:i===0?"#60A5FA":"rgba(255,255,255,0.25)",background:i===0?"rgba(96,165,250,0.1)":"transparent",padding:"3px 7px",borderRadius:4,border:i===0?"1px solid rgba(96,165,250,0.18)":"none",whiteSpace:"nowrap",cursor:"pointer" }}>
                              {t}{i===0&&<span style={{ marginLeft:3,fontSize:7,background:"rgba(239,68,68,0.25)",color:"#F87171",borderRadius:3,padding:"1px 4px" }}>2</span>}
                            </span>
                          ))}
                          <span style={{ fontSize:8,fontWeight:700,color:"#60A5FA",background:"rgba(96,165,250,0.08)",border:"1px solid rgba(96,165,250,0.2)",padding:"3px 10px",borderRadius:5,whiteSpace:"nowrap",cursor:"pointer" }}>+ Download Revised</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* subStep 0: choose mode */}
                  {subStep === 0 && (
                    <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:11,padding:"0 28px",animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                      <p style={{ fontSize:11.5,fontWeight:600,color:"rgba(255,255,255,0.38)",marginBottom:2 }}>What would you like to do?</p>
                      {[
                        { id:"score",    label:"Score My Resume",  desc:"Detailed score with ATS match, impact, and clarity feedback.",    badge:null as null|string },
                        { id:"targeted", label:"Targeted Resume",   desc:"Tailor your resume to a specific job posting for max keyword match.", badge:"RECOMMENDED" as null|string },
                      ].map((card,i) => (
                        <div key={card.id} style={{ width:"100%",maxWidth:340,padding:"12px 15px",borderRadius:12,border:`1px solid ${i===1?"rgba(59,130,246,0.35)":"rgba(255,255,255,0.08)"}`,background:i===1?"rgba(59,130,246,0.06)":"rgba(255,255,255,0.02)",cursor:"pointer" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:4 }}>
                            <span style={{ fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.9)" }}>{card.label}</span>
                            {card.badge && <span style={{ fontSize:7.5,fontWeight:700,color:"#60A5FA",background:"rgba(96,165,250,0.15)",border:"1px solid rgba(96,165,250,0.3)",padding:"1.5px 6px",borderRadius:4 }}>{card.badge}</span>}
                          </div>
                          <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.34)",lineHeight:1.5,margin:0 }}>{card.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* subStep 1: loading */}
                  {subStep === 1 && (
                    <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
                      <svg width="54" height="54" viewBox="0 0 54 54" style={{ animation:"spin-slow 0.9s linear infinite",flexShrink:0 }}>
                        <circle cx="27" cy="27" r="20" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="3.5"/>
                        <circle cx="27" cy="27" r="20" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="125.6" strokeDashoffset="94" strokeLinecap="round"/>
                      </svg>
                      <div style={{ textAlign:"center" }}>
                        <p style={{ fontSize:13.5,fontWeight:600,color:"rgba(255,255,255,0.82)",marginBottom:5 }}>Zari is reviewing your resume</p>
                        <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.28)",marginBottom:8 }}>Checking ATS match, impact signals, and clarity issues…</p>
                        <div style={{ display:"flex",justifyContent:"center",gap:4 }}>
                          {[0,1,2].map(i => <span key={i} style={{ width:5,height:5,borderRadius:"50%",background:"#3B82F6",animation:`dot-bounce 1.2s ${i*0.15}s infinite`,display:"inline-block" }}/>)}
                        </div>
                      </div>
                      <div style={{ width:210,height:2.5,borderRadius:99,background:"rgba(255,255,255,0.06)",overflow:"hidden" }}>
                        <div style={{ height:"100%",borderRadius:99,background:"linear-gradient(90deg,#3B82F6,#60A5FA)",animation:"upload-bar 2.4s linear forwards" }}/>
                      </div>
                    </div>
                  )}

                  {/* subStep 2+: results */}
                  {subStep >= 2 && (
                    <div style={{ flex:1,padding:"10px 14px 8px",overflow:"hidden",display:"flex",flexDirection:"column",gap:7,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>

                      {/* Row 1: score ring + 3 metric bars — matches actual screenshot layout */}
                      <div style={{ background:"linear-gradient(145deg,#0C1728,#101C2E)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,padding:"10px 14px",display:"flex",gap:14,alignItems:"center",flexShrink:0,boxShadow:"0 0 28px rgba(34,197,94,0.05)" }}>
                        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:3,flexShrink:0 }}>
                          <svg width="82" height="82" viewBox="0 0 82 82">
                            <circle cx="41" cy="41" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"/>
                            <circle cx="41" cy="41" r="32" fill="none" stroke="#22C55E" strokeWidth="6"
                              strokeDasharray={String(2*Math.PI*32)} strokeDashoffset={String(2*Math.PI*32*(1-0.82))}
                              strokeLinecap="round" transform="rotate(-90 41 41)"
                              style={{ transition:"stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)", filter:"drop-shadow(0 0 9px rgba(34,197,94,0.55))" }}/>
                            <text x="41" y="37" textAnchor="middle" fill="white" fontSize="19" fontWeight="900">82</text>
                            <text x="41" y="49" textAnchor="middle" fill="#22C55E" fontSize="8.5" fontWeight="700">A&#8722; &middot; Good</text>
                          </svg>
                          <div style={{ textAlign:"center" }}>
                            <div style={{ fontSize:7,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.12em" }}>OVERALL</div>
                            <div style={{ fontSize:8,fontWeight:700,color:"#22C55E" }}>+27 vs last ↑</div>
                          </div>
                        </div>
                        <div style={{ flex:1,display:"flex",flexDirection:"column",gap:8 }}>
                          {[
                            { l:"ATS Match",  sub:"Format & keywords",         v:88, delta:"+11", c:"#22C55E" },
                            { l:"Impact",     sub:"10/11 bullets have metrics", v:80, delta:"+4",  c:"#60A5FA" },
                            { l:"Clarity",    sub:"2 issues found",             v:80, delta:"−20", c:"#818CF8" },
                          ].map(s => (
                            <div key={s.l}>
                              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3 }}>
                                <div>
                                  <span style={{ fontSize:10,fontWeight:600,color:"rgba(255,255,255,0.75)" }}>{s.l}</span>
                                  <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.28)",marginLeft:6 }}>{s.sub}</span>
                                </div>
                                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                                  <span style={{ fontSize:8.5,fontWeight:600,color:s.delta.startsWith("−")?"#F87171":"#22C55E" }}>{s.delta}</span>
                                  <span style={{ fontSize:13,fontWeight:800,color:"white" }}>{s.v}</span>
                                </div>
                              </div>
                              <div style={{ height:5,borderRadius:99,background:"rgba(255,255,255,0.06)" }}>
                                <div style={{ width:`${s.v}%`,height:"100%",borderRadius:99,background:`linear-gradient(90deg,${s.c}bb,${s.c})`,transition:"width 1.4s cubic-bezier(0.4,0,0.2,1)" }}/>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Row 2: trend + quick wins */}
                      {subStep >= 3 && (
                        <div style={{ display:"flex",gap:7,flexShrink:0,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                          {/* Score trend */}
                          <div style={{ background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"9px 13px",display:"flex",gap:14,alignItems:"center",width:215,flexShrink:0 }}>
                            <div>
                              <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3 }}>Score Trend</div>
                              <div style={{ fontSize:26,fontWeight:900,color:"white",lineHeight:1 }}>82</div>
                              <div style={{ fontSize:9,color:"#F87171",marginTop:2,fontWeight:600 }}>&#8722;1 pts</div>
                            </div>
                            <div style={{ flex:1 }}>
                              <svg width="100%" height="34" viewBox="0 0 80 34" style={{ overflow:"visible" }}>
                                <polyline points="0,26 20,28 40,4 60,6 80,10" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                {([{x:0,y:26},{x:20,y:28},{x:40,y:4},{x:60,y:6},{x:80,y:10}]).map((p,i) => (
                                  <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={i===4?"#60A5FA":"#1e3a5f"} stroke="#3B82F6" strokeWidth="1.5"/>
                                ))}
                              </svg>
                              <div style={{ display:"flex",justifyContent:"space-between",marginTop:2 }}>
                                {[{s:"83",d:"May 7"},{s:"56",d:"May 8"},{s:"55",d:"May 8"},{s:"82",d:"May 9"}].map((item,i) => (
                                  <div key={i} style={{ textAlign:"center" }}>
                                    <div style={{ fontSize:8,fontWeight:700,color:i===3?"#60A5FA":"rgba(255,255,255,0.35)" }}>{item.s}</div>
                                    <div style={{ fontSize:6.5,color:"rgba(255,255,255,0.18)" }}>{item.d}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Quick wins */}
                          <div style={{ flex:1,background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"9px 12px" }}>
                            <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:7 }}>
                              <span style={{ fontSize:11 }}>&#9889;</span>
                              <span style={{ fontSize:8.5,fontWeight:700,color:"rgba(255,255,255,0.55)" }}>Quick Wins — top changes by impact</span>
                            </div>
                            <div style={{ display:"flex",gap:6 }}>
                              {[
                                { n:1, title:"Quantify your top bullet",  time:"15 min", body:"Add a metric to your first bullet under iSeatz: how much did platform uptime improve or costs drop?" },
                                { n:2, title:"Strengthen weak verbs",     time:"5 min",  body:'Replace "Managed and optimized" in PG Golf Professional with stronger action verbs.' },
                                { n:3, title:"Add metrics to bullets",    time:"15 min", body:"Include specific metrics in the bullet under Hyland about mentoring teams: how many?" },
                              ].map((w,i) => (
                                <div key={i} style={{ flex:1,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:"7px 9px",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                                  <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:4,marginBottom:4 }}>
                                    <span style={{ fontSize:8.5,fontWeight:700,color:"rgba(255,255,255,0.68)",lineHeight:1.35 }}>{w.n}&nbsp;{w.title}</span>
                                    <span style={{ fontSize:7,fontWeight:700,color:"#FBBF24",background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.2)",padding:"1px 5px",borderRadius:3,whiteSpace:"nowrap",flexShrink:0 }}>{w.time}</span>
                                  </div>
                                  <p style={{ fontSize:8,color:"rgba(255,255,255,0.35)",lineHeight:1.55,margin:"0 0 5px" }}>{w.body}</p>
                                  <span style={{ fontSize:7.5,color:"#60A5FA",cursor:"pointer" }}>Go to bullets tab &#8594;</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Row 3: suggestions + section-by-section */}
                      {subStep >= 4 && (
                        <div style={{ flex:1,display:"flex",gap:7,overflow:"hidden",animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both",minHeight:0 }}>
                          {/* Left: suggestions */}
                          <div style={{ flex:1,background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"9px 12px",overflow:"hidden",display:"flex",flexDirection:"column" }}>
                            <div style={{ display:"flex",gap:8,borderBottom:"1px solid rgba(255,255,255,0.05)",paddingBottom:5,marginBottom:6 }}>
                              {["Preview","Suggestions (5)"].map((t,i) => (
                                <span key={t} style={{ fontSize:8.5,fontWeight:i===1?700:400,color:i===1?"white":"rgba(255,255,255,0.3)",cursor:"pointer" }}>{t}</span>
                              ))}
                            </div>
                            <div style={{ fontSize:7,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:5 }}>HIGHLIGHTS</div>
                            <div style={{ display:"flex",gap:4,flexWrap:"wrap",marginBottom:7 }}>
                              {([["#F87171","Weak bullet"],["#FB923C","No metric"],["#FB923C","Too long"],["#FBBF24","Passive voice"],["#A78BFA","Weak verb / cliché"]] as [string,string][]).map(([c,l]) => (
                                <span key={l} style={{ display:"inline-flex",alignItems:"center",gap:3,fontSize:7.5,color:"rgba(255,255,255,0.52)",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",padding:"2px 6px",borderRadius:4 }}>
                                  <span style={{ width:5,height:5,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0 }}/>
                                  {l}
                                </span>
                              ))}
                              <span style={{ fontSize:7.5,fontWeight:700,color:"#22C55E",background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",padding:"2px 7px",borderRadius:4 }}>5 issues found</span>
                            </div>
                            <div style={{ fontSize:8.5,color:"rgba(255,255,255,0.28)",lineHeight:1.75,flex:1,overflow:"hidden" }}>
                              Strategic and hands-on engineering and technology leader with 10+ years of experience driving automation.<br/>
                              <span style={{ background:"rgba(251,191,36,0.12)",borderRadius:2,padding:"0 2px",color:"rgba(255,255,255,0.48)" }}>Managed and optimized</span> cloud platforms across 200+ services and <span style={{ background:"rgba(248,113,113,0.12)",borderRadius:2,padding:"0 2px",color:"rgba(255,255,255,0.48)" }}>supported enterprise growth</span> without a quantified metric.
                            </div>
                          </div>
                          {/* Right: section by section */}
                          <div style={{ width:185,flexShrink:0,background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"9px 12px",display:"flex",flexDirection:"column" }}>
                            <div style={{ fontSize:7,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:9 }}>SECTION-BY-SECTION</div>
                            {[
                              {s:"Summary",    v:85, t:"Strong", c:"#22C55E"},
                              {s:"Experience", v:80, t:"Good",   c:"#60A5FA"},
                              {s:"Skills",     v:85, t:"Strong", c:"#22C55E"},
                            ].map((sec,i) => (
                              <div key={sec.s} style={{ marginBottom:i<2?12:0 }}>
                                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4 }}>
                                  <span style={{ fontSize:9.5,color:"rgba(255,255,255,0.52)" }}>{sec.s}</span>
                                  <span style={{ fontSize:8.5,fontWeight:700,color:sec.c,background:`${sec.c}18`,border:`1px solid ${sec.c}33`,padding:"1px 6px",borderRadius:4 }}>{sec.t}</span>
                                </div>
                                <div style={{ height:4.5,borderRadius:99,background:"rgba(255,255,255,0.06)" }}>
                                  <div style={{ width:`${sec.v}%`,height:"100%",borderRadius:99,background:`linear-gradient(90deg,${sec.c}88,${sec.c})`,transition:"width 1.2s ease" }}/>
                                </div>
                                <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.2)",marginTop:2,textAlign:"right" }}>{sec.v}/100</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ══ MOCK INTERVIEW ══ */}
              {activeTab === 2 && (
                <div style={{ height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ padding:"9px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(8,12,26,0.95)",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <span style={{ fontSize:13,fontWeight:700,color:"white" }}>Mock Interview</span>
                    <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.28)" }}>Behavioral &middot; Senior PM &middot; Question 1 of 11</span>
                    <div style={{ marginLeft:"auto",display:"flex",gap:6,alignItems:"center" }}>
                      {subStep >= 2 && <span style={{ fontSize:8.5,fontWeight:700,color:"#EF4444",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.22)",padding:"2px 8px",borderRadius:5,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>45 &middot; Needs Work</span>}
                      <span style={{ fontSize:8,fontWeight:700,color:"rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",padding:"2px 10px",borderRadius:5,cursor:"pointer" }}>Next question &#8594;</span>
                    </div>
                  </div>
                  <div style={{ flex:1,padding:"10px 14px",overflow:"hidden",display:"flex",flexDirection:"column",gap:7 }}>
                    {/* Category tabs */}
                    <div style={{ display:"flex",gap:4,flexShrink:0 }}>
                      {([["Behavioral","4"],["Technical",""],["Situational",""],["Leadership","2"]] as [string,string][]).map(([cat,count],i) => (
                        <div key={cat} style={{ padding:"4px 11px",borderRadius:6,border:`1px solid ${i===0?"rgba(59,130,246,0.45)":"rgba(255,255,255,0.07)"}`,background:i===0?"rgba(59,130,246,0.12)":"rgba(255,255,255,0.02)",fontSize:9,fontWeight:i===0?700:400,color:i===0?"#60A5FA":"rgba(255,255,255,0.3)",cursor:"pointer",display:"flex",alignItems:"center",gap:4 }}>
                          {cat}{count?<span style={{ fontSize:7.5,background:"rgba(96,165,250,0.2)",borderRadius:3,padding:"0 4px",color:"#60A5FA" }}>{count}</span>:null}
                        </div>
                      ))}
                    </div>
                    {/* Question */}
                    <div style={{ background:"linear-gradient(145deg,#0F1928,#131D2C)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"11px 14px",flexShrink:0 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:7 }}>
                        <span style={{ fontSize:7.5,fontWeight:700,letterSpacing:"0.14em",color:"#60A5FA",background:"rgba(96,165,250,0.1)",padding:"2px 7px",borderRadius:4,textTransform:"uppercase" }}>LEADERSHIP</span>
                        <span style={{ fontSize:7.5,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em" }}>SENIOR</span>
                        <div style={{ marginLeft:"auto",display:"flex",gap:3,alignItems:"center" }}>
                          <span style={{ fontSize:7.5,color:"rgba(255,255,255,0.22)",marginRight:2 }}>Framework:</span>
                          {["S","T","A","R"].map(pill => (
                            <span key={pill} style={{ width:17,height:17,borderRadius:5,background:"rgba(129,140,248,0.14)",border:"1px solid rgba(129,140,248,0.25)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:"#818CF8" }}>{pill}</span>
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize:11.5,color:"rgba(255,255,255,0.88)",lineHeight:1.65,margin:0,fontWeight:500 }}>Tell me about a time you had to influence a team without direct authority to adopt a new process.</p>
                    </div>
                    {/* Hints */}
                    {subStep >= 1 && (
                      <div style={{ display:"flex",flexDirection:"column",gap:4,flexShrink:0 }}>
                        {[
                          { border:"#3B82F6", bg:"rgba(59,130,246,0.07)", label:"What they're testing", labelC:"#60A5FA", body:"Cross-functional influence, stakeholder alignment, measurable outcome" },
                          { border:"#22C55E", bg:"rgba(34,197,94,0.07)",  label:"Strong answer includes", labelC:"#22C55E", body:"Named the resistance, showed before/after metric, clear coalition steps" },
                          { border:"#FBBF24", bg:"rgba(251,191,36,0.07)", label:"Common mistake",        labelC:"#FBBF24", body:'"Everyone eventually agreed" — no metric, no concrete how' },
                        ].map((h,i) => (
                          <div key={i} style={{ borderLeft:`2.5px solid ${h.border}`,background:h.bg,borderRadius:"0 7px 7px 0",padding:"6px 11px",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                            <div style={{ fontSize:7.5,fontWeight:700,textTransform:"uppercase",color:h.labelC,letterSpacing:"0.08em",marginBottom:2 }}>{h.label}</div>
                            <div style={{ fontSize:9.5,color:"rgba(255,255,255,0.58)",lineHeight:1.45 }}>{h.body}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Feedback */}
                    {subStep >= 2 && (
                      <div style={{ flex:1,display:"flex",gap:9,overflow:"hidden",animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both",minHeight:0 }}>
                        {/* Score ring */}
                        <div style={{ background:"linear-gradient(145deg,#1C0F12,#1A1022)",border:"1px solid rgba(239,68,68,0.22)",borderRadius:12,padding:"10px 12px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:7,width:132 }}>
                          <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.1em" }}>Answer Score</div>
                          <svg width="66" height="66" viewBox="0 0 66 66">
                            <circle cx="33" cy="33" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4.5"/>
                            <circle cx="33" cy="33" r="26" fill="none" stroke="#EF4444" strokeWidth="4.5"
                              strokeDasharray={String(2*Math.PI*26)} strokeDashoffset={String(2*Math.PI*26*(1-0.45))}
                              strokeLinecap="round" transform="rotate(-90 33 33)"
                              style={{ transition:"stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)", filter:"drop-shadow(0 0 6px rgba(239,68,68,0.45))" }}/>
                            <text x="33" y="30" textAnchor="middle" fill="white" fontSize="15" fontWeight="900">45</text>
                            <text x="33" y="41" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="700">Weak</text>
                          </svg>
                          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:3,width:"100%" }}>
                            {[{l:"Situation",v:30},{l:"Task",v:40},{l:"Action",v:20},{l:"Result",v:50}].map((d,i) => (
                              <div key={d.l} style={{ textAlign:"center",background:"rgba(239,68,68,0.08)",borderRadius:5,padding:"4px 3px",animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)` }}>
                                <div style={{ fontSize:12,fontWeight:900,color:d.v>=40?"#FBBF24":"#EF4444" }}>{d.v}</div>
                                <div style={{ fontSize:6.5,color:"rgba(255,255,255,0.28)",marginTop:1 }}>{d.l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Coaching */}
                        {subStep >= 3 && (
                          <div style={{ flex:1,display:"flex",flexDirection:"column",gap:6,overflow:"hidden",animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{ background:"rgba(59,130,246,0.07)",borderLeft:"3px solid #3B82F6",borderRadius:"0 9px 9px 0",padding:"9px 12px",flexShrink:0 }}>
                              <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4 }}>
                                <div style={{ width:18,height:18,borderRadius:5,background:"linear-gradient(135deg,#3B82F6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:"white",flexShrink:0 }}>Z</div>
                                <span style={{ fontSize:7.5,fontWeight:700,color:"#60A5FA",textTransform:"uppercase",letterSpacing:"0.1em" }}>Coaching Note</span>
                              </div>
                              <p style={{ fontSize:10,color:"rgba(255,255,255,0.65)",lineHeight:1.6,margin:0 }}>Strong STAR structure. Lead with the outcome first — state P1 incidents dropped to zero, then walk back to how you built the coalition. The metric is your hook.</p>
                            </div>
                            <div style={{ background:"rgba(251,191,36,0.06)",borderLeft:"3px solid #FBBF24",borderRadius:"0 9px 9px 0",padding:"9px 12px",flexShrink:0 }}>
                              <div style={{ fontSize:7.5,fontWeight:700,color:"#FBBF24",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4 }}>Try this opening</div>
                              <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.58)",lineHeight:1.65,margin:0,fontStyle:"italic" }}>&ldquo;At my last role, I cut cross-team P1 incidents by 80% by getting six teams to adopt a shared on-call rotation — here&rsquo;s exactly how I made it happen without any direct authority&hellip;&rdquo;</p>
                            </div>
                            <div style={{ background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:"8px 11px",flex:1,overflow:"hidden" }}>
                              <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5 }}>What to fix</div>
                              {["Add a quantified outcome up front","Name the specific resistance you faced","Show the coalition-building steps clearly"].map((f,i) => (
                                <div key={i} style={{ display:"flex",gap:5,alignItems:"flex-start",marginBottom:i<2?4:0 }}>
                                  <div style={{ width:4,height:4,borderRadius:"50%",background:"#EF4444",flexShrink:0,marginTop:4.5 }}/>
                                  <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.48)",lineHeight:1.45 }}>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ COVER LETTER ══ */}
              {activeTab === 3 && (
                <div style={{ height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ padding:"9px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(8,12,26,0.95)",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <span style={{ fontSize:13,fontWeight:700,color:"white" }}>Cover Letter</span>
                    <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.28)" }}>Stripe &mdash; Senior PM</span>
                    {subStep >= 2 && <span style={{ fontSize:8.5,fontWeight:700,color:"#22C55E",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.22)",padding:"2px 8px",borderRadius:5,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>&#10003; Tailored &amp; Ready</span>}
                    <div style={{ marginLeft:"auto",display:"flex",gap:5,alignItems:"center" }}>
                      {subStep >= 2 && (
                        <>
                          <span style={{ fontSize:8,color:"rgba(255,255,255,0.28)" }}>ATS pass rate:</span>
                          <span style={{ fontSize:8.5,fontWeight:700,color:"#22C55E" }}>94%</span>
                          <span style={{ fontSize:8,fontWeight:700,color:"#818CF8",background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.2)",padding:"3px 10px",borderRadius:5,cursor:"pointer" }}>&#8595; Download</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ flex:1,padding:"10px 14px",overflow:"hidden",display:"flex",flexDirection:"column",gap:7 }}>

                    {/* subStep 0 */}
                    {subStep === 0 && (
                      <div style={{ display:"flex",flexDirection:"column",gap:7,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                        <div style={{ display:"flex",alignItems:"center" }}>
                          {["Background","Job Description","Customize"].map((step,i) => (
                            <div key={step} style={{ display:"flex",alignItems:"center",flex:i<2?1:"auto" }}>
                              <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                                <div style={{ width:18,height:18,borderRadius:"50%",background:i<2?"rgba(34,197,94,0.12)":"rgba(59,130,246,0.12)",border:`1.5px solid ${i<2?"#22C55E":"#3B82F6"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                                  {i<2 ? <svg viewBox="0 0 10 10" fill="none" stroke="#22C55E" strokeWidth="2" style={{ width:7,height:7 }}><path d="M2 5l2 2 4-4"/></svg> : <span style={{ fontSize:7,fontWeight:700,color:"#60A5FA" }}>3</span>}
                                </div>
                                <span style={{ fontSize:9,fontWeight:i===2?700:500,color:i===2?"rgba(255,255,255,0.78)":"rgba(255,255,255,0.38)" }}>{step}</span>
                              </div>
                              {i<2 && <div style={{ flex:1,height:1.5,background:i===0?"#22C55E":"rgba(34,197,94,0.3)",margin:"0 8px",borderRadius:99 }}/>}
                            </div>
                          ))}
                        </div>
                        <div style={{ display:"flex",gap:8 }}>
                          <div style={{ flex:1,background:"linear-gradient(145deg,#0B1A12,#0E1C18)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:10,padding:"10px 12px" }}>
                            <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Resume on File</div>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <div style={{ width:28,height:36,borderRadius:5,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                                <span style={{ fontSize:7.5,fontWeight:800,color:"#EF4444" }}>PDF</span>
                              </div>
                              <div style={{ flex:1,minWidth:0 }}>
                                <div style={{ fontSize:9,fontWeight:600,color:"rgba(255,255,255,0.82)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>Steve_J_Ngoumnai_Resume.pdf</div>
                                <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.28)",marginTop:2 }}>142 KB &middot; Score 82 A&#8722; &middot; 11/11 bullets</div>
                                <div style={{ marginTop:5,display:"flex",alignItems:"center",gap:4 }}>
                                  <div style={{ height:3,flex:1,borderRadius:99,background:"rgba(255,255,255,0.06)" }}><div style={{ width:"82%",height:"100%",borderRadius:99,background:"linear-gradient(90deg,#22C55E88,#22C55E)" }}/></div>
                                  <span style={{ fontSize:7.5,color:"#22C55E",fontWeight:700 }}>82%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{ flex:1,background:"#0E1420",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"10px 12px" }}>
                            <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6 }}>Job Posting &middot; Stripe</div>
                            <p style={{ fontSize:8.5,color:"rgba(255,255,255,0.48)",lineHeight:1.65,margin:"0 0 6px" }}>Senior PM to drive our payments infrastructure roadmap. Work cross-functionally with Engineering, Design, and Data to ship 0&#8594;1 products at scale.</p>
                            <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>
                              {["payments","roadmap","cross-functional","0→1","infrastructure","API","fintech"].map(tag => (
                                <span key={tag} style={{ fontSize:7.5,color:"#60A5FA",background:"rgba(96,165,250,0.08)",border:"1px solid rgba(96,165,250,0.15)",padding:"2px 6px",borderRadius:4 }}>{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* AI match preview — fills the space */}
                        <div style={{ background:"linear-gradient(145deg,#0D1428,#101A2E)",border:"1px solid rgba(129,140,248,0.18)",borderRadius:11,padding:"10px 13px" }}>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
                            <div style={{ fontSize:8,fontWeight:700,color:"#818CF8",textTransform:"uppercase",letterSpacing:"0.1em" }}>&#10022; AI Pre-Match Analysis</div>
                            <span style={{ fontSize:8,color:"rgba(255,255,255,0.28)" }}>before generating</span>
                          </div>
                          <div style={{ display:"flex",gap:10 }}>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5 }}>Keyword Coverage</div>
                              {[{k:"payments / fintech",v:60,c:"#FBBF24"},{k:"0→1 / roadmap",v:40,c:"#EF4444"},{k:"cross-functional",v:80,c:"#22C55E"},{k:"infrastructure / API",v:30,c:"#EF4444"}].map((kw,i)=>(
                                <div key={i} style={{ marginBottom:4 }}>
                                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:2 }}>
                                    <span style={{ fontSize:8,color:"rgba(255,255,255,0.42)" }}>{kw.k}</span>
                                    <span style={{ fontSize:8,fontWeight:700,color:kw.c }}>{kw.v}%</span>
                                  </div>
                                  <div style={{ height:3,borderRadius:99,background:"rgba(255,255,255,0.06)" }}><div style={{ width:`${kw.v}%`,height:"100%",borderRadius:99,background:kw.c,opacity:0.7 }}/></div>
                                </div>
                              ))}
                            </div>
                            <div style={{ width:1,background:"rgba(255,255,255,0.06)" }}/>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5 }}>What Zari Will Do</div>
                              {["Inject 7 missing Stripe keywords","Rewrite opening to mirror their mission","Lead with $4.2M metric in paragraph 1","Add payments domain proof points","Match their 0→1 language throughout"].map((a,i)=>(
                                <div key={i} style={{ display:"flex",gap:5,alignItems:"flex-start",marginBottom:3 }}>
                                  <span style={{ fontSize:9,color:"#818CF8",flexShrink:0 }}>&#10022;</span>
                                  <span style={{ fontSize:8,color:"rgba(255,255,255,0.48)",lineHeight:1.45 }}>{a}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div style={{ background:"rgba(129,140,248,0.06)",border:"1px solid rgba(129,140,248,0.14)",borderRadius:9,padding:"9px 12px",display:"flex",alignItems:"center",gap:8 }}>
                          <div style={{ fontSize:8,fontWeight:700,color:"#818CF8",marginRight:2 }}>Tone:</div>
                          {[["Professional","1"],["Confident",""],["Story-driven",""],["Concise",""]].map(([tone,a])=>(
                            <div key={tone} style={{ padding:"4px 10px",borderRadius:6,border:`1px solid ${a?"rgba(129,140,248,0.4)":"rgba(255,255,255,0.08)"}`,background:a?"rgba(129,140,248,0.12)":"rgba(255,255,255,0.02)",fontSize:8.5,fontWeight:a?700:400,color:a?"#A5B4FC":"rgba(255,255,255,0.35)",cursor:"pointer" }}>{tone}</div>
                          ))}
                          <div style={{ marginLeft:"auto",background:"linear-gradient(135deg,#818CF8,#60A5FA)",borderRadius:7,padding:"5px 14px",fontSize:9,fontWeight:700,color:"white",cursor:"pointer" }}>Generate Letter &#8594;</div>
                        </div>
                      </div>
                    )}

                    {/* subStep 1: generating */}
                    {subStep === 1 && (
                      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18,animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
                        <svg width="54" height="54" viewBox="0 0 54 54" style={{ animation:"spin-slow 0.9s linear infinite" }}>
                          <circle cx="27" cy="27" r="20" fill="none" stroke="rgba(129,140,248,0.12)" strokeWidth="3.5"/>
                          <circle cx="27" cy="27" r="20" fill="none" stroke="#818CF8" strokeWidth="3.5" strokeDasharray="125.6" strokeDashoffset="94" strokeLinecap="round"/>
                        </svg>
                        <div style={{ textAlign:"center" }}>
                          <p style={{ fontSize:13.5,fontWeight:600,color:"rgba(255,255,255,0.82)",marginBottom:5 }}>Generating your cover letter</p>
                          <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.3)",marginBottom:8 }}>Injecting 7 Stripe keywords &amp; matching your $4.2M metric&hellip;</p>
                          <div style={{ display:"flex",justifyContent:"center",gap:4 }}>
                            {[0,1,2].map(i => <span key={i} style={{ width:5,height:5,borderRadius:"50%",background:"#818CF8",animation:`dot-bounce 1.2s ${i*0.15}s infinite`,display:"inline-block" }}/>)}
                          </div>
                        </div>
                        <div style={{ width:210,height:2.5,borderRadius:99,background:"rgba(255,255,255,0.06)",overflow:"hidden" }}>
                          <div style={{ height:"100%",borderRadius:99,background:"linear-gradient(90deg,#818CF8,#60A5FA)",animation:"upload-bar 2.4s linear forwards" }}/>
                        </div>
                        <div style={{ display:"flex",gap:14 }}>
                          {["Keywords","Tone","Metrics","ATS"].map((l,i) => (
                            <div key={l} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:3,animation:`bubble-appear 0.52s ${i*0.1+0.2}s both cubic-bezier(0.16,1,0.3,1)` }}>
                              <div style={{ width:6,height:6,borderRadius:"50%",background:"#818CF8",animation:"blink 0.8s ease-in-out infinite",animationDelay:`${i*0.15}s` }}/>
                              <span style={{ fontSize:8,color:"rgba(255,255,255,0.25)" }}>{l}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* subStep 2+: results */}
                    {subStep >= 2 && (
                      <div style={{ flex:1,display:"flex",gap:9,overflow:"hidden",animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both",minHeight:0 }}>
                        {/* Left analysis col */}
                        <div style={{ flex:1,display:"flex",flexDirection:"column",gap:6,overflow:"hidden" }}>
                          {/* Zari tailored */}
                          <div style={{ background:"rgba(59,130,246,0.07)",border:"1px solid rgba(59,130,246,0.18)",borderLeft:"3px solid #3B82F6",borderRadius:"0 10px 10px 0",padding:"9px 12px",flexShrink:0 }}>
                            <div style={{ fontSize:7.5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#60A5FA",marginBottom:6 }}>What Zari Changed</div>
                            {[
                              {icon:"&#10022;",text:'"Increasing the GDP of the internet" — mirrored in your opening',c:"#818CF8"},
                              {icon:"&#8599;",text:"Led with $4.2M cost impact as the first data point recruiters see",c:"#22C55E"},
                              {icon:"&#9670;",text:"Named payments infrastructure & 0→1 shipping to match their domain",c:"#60A5FA"},
                              {icon:"&#9670;",text:"Added fintech proof: 3 payments products shipped, API integrations led",c:"#60A5FA"},
                            ].map((item,i) => (
                              <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:6,marginBottom:i<3?4:0 }}>
                                <span style={{ fontSize:9,color:item.c,flexShrink:0 }} dangerouslySetInnerHTML={{__html:item.icon}}/>
                                <span style={{ fontSize:9,color:"rgba(255,255,255,0.62)",lineHeight:1.5 }}>{item.text}</span>
                              </div>
                            ))}
                          </div>
                          {/* Opening hook */}
                          {subStep >= 3 && (
                            <div style={{ background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.14)",borderLeft:"3px solid #22C55E",borderRadius:"0 10px 10px 0",padding:"9px 12px",flexShrink:0,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                              <div style={{ fontSize:7.5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#22C55E",marginBottom:5 }}>Opening Hook</div>
                              <p style={{ fontSize:9,color:"rgba(255,255,255,0.62)",lineHeight:1.7,margin:0,fontStyle:"italic" }}>&ldquo;Stripe&rsquo;s mission is increasing the GDP of the internet. I&rsquo;ve spent six years increasing the efficiency of supply chains — I want to bring that same instinct for operational leverage to Stripe.&rdquo;</p>
                            </div>
                          )}
                          {/* Stats row */}
                          {subStep >= 3 && (
                            <div style={{ display:"flex",gap:6,flexShrink:0,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                              {[{l:"ATS Pass Rate",v:"94%",c:"#22C55E"},{l:"Keywords Injected",v:"7",c:"#818CF8"},{l:"Read Time",v:"1.8 min",c:"#60A5FA"},{l:"Match Score",v:"91/100",c:"#FBBF24"}].map((s,i)=>(
                                <div key={i} style={{ flex:1,background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:"7px 9px",textAlign:"center" }}>
                                  <div style={{ fontSize:12,fontWeight:900,color:s.c,lineHeight:1 }}>{s.v}</div>
                                  <div style={{ fontSize:7,color:"rgba(255,255,255,0.28)",marginTop:3,lineHeight:1.3 }}>{s.l}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          {/* Keyword match */}
                          {subStep >= 4 && (
                            <div style={{ background:"rgba(251,191,36,0.05)",border:"1px solid rgba(251,191,36,0.12)",borderRadius:9,padding:"8px 12px",animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both",flexShrink:0 }}>
                              <div style={{ fontSize:7.5,fontWeight:700,color:"#FBBF24",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5 }}>Stripe Keywords Matched</div>
                              <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>
                                {["payments","roadmap","0→1","cross-functional","infrastructure","API","fintech","GDP"].map(kw => (
                                  <span key={kw} style={{ fontSize:8,color:"#22C55E",background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",padding:"2px 6px",borderRadius:4 }}>{kw} &#10003;</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Right: letter preview */}
                        <div style={{ width:205,flexShrink:0,background:"linear-gradient(160deg,#0D1320,#101828)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"11px 13px",overflow:"hidden",display:"flex",flexDirection:"column",gap:5 }}>
                          <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em" }}>Letter Preview</div>
                          <div style={{ fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.55)" }}>Steve J. Ngoumnai</div>
                          <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.22)",marginBottom:3 }}>steve@machinesandcloud.com &middot; LinkedIn</div>
                          <div style={{ fontSize:8,fontWeight:600,color:"rgba(255,255,255,0.65)",marginBottom:2 }}>Dear Stripe Hiring Team,</div>
                          <div style={{ fontSize:8,color:"rgba(255,255,255,0.4)",lineHeight:1.75,fontFamily:"Georgia,serif",flex:1,overflow:"hidden" }}>
                            <span style={{ background:"rgba(129,140,248,0.15)",borderRadius:2,padding:"0 2px",color:"rgba(255,255,255,0.65)" }}>Stripe&apos;s mission is increasing the GDP of the internet.</span> I&apos;ve spent six years increasing the efficiency of supply chains — I want to bring that same instinct for operational leverage to Stripe.<br/><br/>
                            In my most recent role, I drove <span style={{ background:"rgba(34,197,94,0.15)",borderRadius:2,padding:"0 2px",color:"rgba(255,255,255,0.65)" }}>$4.2M in cost savings</span> by redesigning vendor SLAs across 12 teams and shipping 3 <span style={{ background:"rgba(96,165,250,0.15)",borderRadius:2,padding:"0 2px",color:"rgba(255,255,255,0.65)" }}>0→1 payments products</span> end-to-end.<br/><br/>
                            {subStep >= 3 ? <span>Your <span style={{ background:"rgba(129,140,248,0.15)",borderRadius:2,padding:"0 2px",color:"rgba(255,255,255,0.65)" }}>payments infrastructure</span> challenges are exactly where my background compounds. I&apos;d love to bring that to Stripe.</span> : "Your payments infrastructure challenges…"}
                          </div>
                          <div style={{ paddingTop:6,borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.2)",marginBottom:4 }}>Injected keywords:</div>
                            <div style={{ display:"flex",gap:3,flexWrap:"wrap" }}>
                              {["payments","0→1","infrastructure","cross-functional","API","fintech"].map(kw => (
                                <span key={kw} style={{ fontSize:7,color:"#22C55E",background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.15)",padding:"1.5px 5px",borderRadius:3 }}>{kw}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ LINKEDIN ══ */}
              {activeTab === 4 && (
                <div style={{ height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ padding:"9px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(8,12,26,0.95)",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <span style={{ fontSize:13,fontWeight:700,color:"white" }}>LinkedIn Optimizer</span>
                    <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.28)" }}>Steve J. Ngoumnai</span>
                    <div style={{ marginLeft:"auto",display:"flex",gap:8,alignItems:"center" }}>
                      <span style={{ fontSize:9,color:"rgba(255,255,255,0.3)" }}>Before: <b style={{ color:"#F87171" }}>54</b></span>
                      <svg viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" style={{ width:10,height:10 }}><path d="M2 6h8M6 2l4 4-4 4"/></svg>
                      <span style={{ fontSize:10,fontWeight:700,color:"#22C55E",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.22)",padding:"2px 9px",borderRadius:5 }}>82 &middot; Good</span>
                    </div>
                  </div>
                  <div style={{ flex:1,padding:"10px 14px",overflow:"hidden",display:"flex",gap:10 }}>

                    {/* Left: score ring always visible */}
                    <div style={{ width:162,flexShrink:0,display:"flex",flexDirection:"column",gap:7 }}>
                      <div style={{ background:"linear-gradient(145deg,#0B1825,#101C2A)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,padding:"11px 12px",display:"flex",flexDirection:"column",alignItems:"center" }}>
                        <svg width="70" height="70" viewBox="0 0 70 70">
                          <circle cx="35" cy="35" r="27" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5"/>
                          <circle cx="35" cy="35" r="27" fill="none" stroke="#22C55E" strokeWidth="5"
                            strokeDasharray={String(2*Math.PI*27)} strokeDashoffset={String(2*Math.PI*27*(1-0.82))}
                            strokeLinecap="round" transform="rotate(-90 35 35)"
                            style={{ transition:"stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)", filter:"drop-shadow(0 0 9px rgba(34,197,94,0.5))" }}/>
                          <text x="35" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="900">82</text>
                          <text x="35" y="43" textAnchor="middle" fill="#22C55E" fontSize="7.5" fontWeight="700">Good</text>
                        </svg>
                        <div style={{ width:"100%",marginTop:9 }}>
                          {[
                            {s:"Headline",   v:8, c:"#22C55E"},
                            {s:"Summary",    v:9, c:"#22C55E"},
                            {s:"Experience", v:8, c:"#22C55E"},
                            {s:"Education",  v:7, c:"#60A5FA"},
                            {s:"Other",      v:6, c:"#FBBF24"},
                            {s:"Networking", v:4, c:"#EF4444"},
                            {s:"Keywords",   v:4, c:"#EF4444"},
                          ].map((sec,i) => (
                            <div key={sec.s} style={{ display:"flex",alignItems:"center",gap:5,marginBottom:i<6?4:0 }}>
                              <span style={{ fontSize:7.5,color:"rgba(255,255,255,0.35)",width:56,flexShrink:0 }}>{sec.s}</span>
                              <div style={{ flex:1,height:3,borderRadius:99,background:"rgba(255,255,255,0.06)" }}>
                                <div style={{ width:`${sec.v*10}%`,height:"100%",borderRadius:99,background:sec.c,transition:"width 1.2s ease" }}/>
                              </div>
                              <span style={{ fontSize:7.5,fontWeight:700,color:sec.c,width:10,textAlign:"right" }}>{sec.v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right col — content from subStep 0 */}
                    <div style={{ flex:1,display:"flex",flexDirection:"column",gap:7,overflow:"hidden" }}>

                      {/* AI headline optimizer — visible immediately at subStep 0 */}
                      <div style={{ background:"linear-gradient(145deg,#0F1928,#131D2C)",border:"1px solid rgba(96,165,250,0.2)",borderRadius:11,padding:"10px 13px",flexShrink:0 }}>
                        <div style={{ fontSize:7.5,fontWeight:700,color:"#60A5FA",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8 }}>AI Headline Optimizer</div>
                        <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
                          <div style={{ background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:7,padding:"7px 10px" }}>
                            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3 }}>
                              <span style={{ fontSize:7,fontWeight:700,color:"#F87171",textTransform:"uppercase",letterSpacing:"0.1em" }}>Current &mdash; Score 6/10</span>
                              <div style={{ display:"flex",gap:2 }}>{[1,2,3,4,5,6,7,8,9,10].map(n=><div key={n} style={{ width:6,height:6,borderRadius:1,background:n<=6?"#EF4444":"rgba(255,255,255,0.08)" }}/>)}</div>
                            </div>
                            <p style={{ fontSize:9,color:"rgba(255,255,255,0.42)",lineHeight:1.4,margin:0 }}>Tech leader | AI/ML | Product Manager | Building things</p>
                          </div>
                          <div style={{ background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:7,padding:"7px 10px" }}>
                            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3 }}>
                              <span style={{ fontSize:7,fontWeight:700,color:"#22C55E",textTransform:"uppercase",letterSpacing:"0.1em" }}>Optimized &mdash; Score 9/10</span>
                              <div style={{ display:"flex",gap:2 }}>{[1,2,3,4,5,6,7,8,9,10].map(n=><div key={n} style={{ width:6,height:6,borderRadius:1,background:n<=9?"#22C55E":"rgba(255,255,255,0.08)" }}/>)}</div>
                            </div>
                            <p style={{ fontSize:9,color:"rgba(255,255,255,0.72)",lineHeight:1.4,margin:0,fontWeight:500 }}>Senior PM · I Help Job Seekers Land $150K&#8211;$350K Roles Using AI | $4.2M Impact | Payments &amp; Ops</p>
                          </div>
                        </div>
                        <div style={{ display:"flex",gap:5,marginTop:7 }}>
                          {["More keywords","Shorter","Add metric","Try again"].map((a,i)=>(
                            <div key={i} style={{ fontSize:7.5,color:"rgba(255,255,255,0.4)",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:4,padding:"3px 7px",cursor:"pointer" }}>{a}</div>
                          ))}
                        </div>
                      </div>

                      {/* Priority fixes — subStep 1+ */}
                      {subStep >= 1 && (
                        <div style={{ background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"9px 12px",flexShrink:0,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Priority Fixes</div>
                          <div style={{ display:"flex",gap:9 }}>
                            {[
                              { section:"Networking", count:4, c:"#EF4444", items:["Connect with 5+ in target companies","Join 2 relevant industry groups","Request 2 manager recommendations","Comment on 3 posts this week"] },
                              { section:"Keywords",   count:3, c:"#FBBF24", items:["Add: Product Strategy, Payments Infrastructure","Include: 0→1, roadmap, cross-functional","Missing: fintech, API, SaaS"] },
                            ].map((fix) => (
                              <div key={fix.section} style={{ flex:1 }}>
                                <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:5 }}>
                                  <span style={{ fontSize:9.5,fontWeight:700,color:"rgba(255,255,255,0.7)" }}>{fix.section}</span>
                                  <span style={{ fontSize:7.5,fontWeight:700,color:fix.c,background:`${fix.c}18`,border:`1px solid ${fix.c}30`,padding:"1px 5px",borderRadius:4 }}>{fix.count} to fix</span>
                                </div>
                                {fix.items.map((item,j) => (
                                  <div key={j} style={{ display:"flex",alignItems:"flex-start",gap:5,marginBottom:j<fix.items.length-1?3:0 }}>
                                    <div style={{ width:3.5,height:3.5,borderRadius:"50%",background:fix.c,flexShrink:0,marginTop:4.5 }}/>
                                    <span style={{ fontSize:8,color:"rgba(255,255,255,0.45)",lineHeight:1.5 }}>{item}</span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section scores — subStep 2+ */}
                      {subStep >= 2 && (
                        <div style={{ background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"9px 12px",flexShrink:0,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Detailed Section Scores</div>
                          <div style={{ display:"flex",gap:6 }}>
                            {[{s:"Headline",v:8,t:"Good",c:"#22C55E"},{s:"Summary",v:9,t:"Perfect",c:"#22C55E"},{s:"Experience",v:8,t:"Good",c:"#22C55E"},{s:"Networking",v:4,t:"Needs Work",c:"#EF4444"}].map((sec) => (
                              <div key={sec.s} style={{ flex:1 }}>
                                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3 }}>
                                  <span style={{ fontSize:7.5,color:"rgba(255,255,255,0.4)" }}>{sec.s}</span>
                                  <span style={{ fontSize:8,fontWeight:700,color:sec.c }}>{sec.v}/10</span>
                                </div>
                                <div style={{ height:4,borderRadius:99,background:"rgba(255,255,255,0.06)" }}>
                                  <div style={{ width:`${sec.v*10}%`,height:"100%",borderRadius:99,background:sec.c,transition:"width 1.2s ease" }}/>
                                </div>
                                <div style={{ fontSize:7,color:sec.c,marginTop:2,fontWeight:600 }}>{sec.t}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* LinkedIn profile preview — subStep 3+ */}
                      {subStep >= 3 && (
                        <div style={{ background:"#0E1420",border:"1px solid rgba(255,255,255,0.07)",borderRadius:11,overflow:"hidden",flex:1,animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both",minHeight:0 }}>
                          <div style={{ height:44,background:"linear-gradient(135deg,#1e3a8a,#1d4ed8,#0284c7)",position:"relative",flexShrink:0 }}>
                            <div style={{ position:"absolute",bottom:-17,left:13,width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#3B82F6,#7C3AED)",border:"2.5px solid #0E1420",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white" }}>SJ</div>
                            <div style={{ position:"absolute",top:8,right:10,fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.6)",background:"rgba(0,0,0,0.3)",borderRadius:4,padding:"2px 8px" }}>&#10022; AI Optimized</div>
                          </div>
                          <div style={{ padding:"20px 13px 10px" }}>
                            <div style={{ fontSize:10.5,fontWeight:700,color:"rgba(255,255,255,0.9)" }}>Steve J. Ngoumnai</div>
                            <div style={{ fontSize:8,color:"rgba(255,255,255,0.38)",lineHeight:1.5,marginTop:2 }}>Senior PM &middot; I Help Job Seekers Land $150K&ndash;$350K Roles Using AI | $4.2M Impact | Payments &amp; Ops</div>
                            <div style={{ marginTop:5,display:"flex",gap:10,flexWrap:"wrap" }}>
                              <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.25)" }}>Profile views <span style={{ color:"#60A5FA",fontWeight:700 }}>1,315</span></div>
                              <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.25)" }}>Impressions <span style={{ color:"#60A5FA",fontWeight:700 }}>379K</span></div>
                              <div style={{ fontSize:7.5,color:"rgba(255,255,255,0.25)" }}>Connections <span style={{ color:"#22C55E",fontWeight:700 }}>500+</span></div>
                            </div>
                            <div style={{ marginTop:6,paddingTop:6,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",gap:3 }}>
                              {["PM &middot; Stripe  (2021–present)","Supply Chain Lead &middot; Hyland  (2019–21)","Sr. Analyst &middot; iSeatz  (2017–19)"].map((exp,i) => (
                                <div key={i} style={{ fontSize:8,color:"rgba(255,255,255,0.28)" }} dangerouslySetInnerHTML={{ __html:exp }}/>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ══ ACTION PLAN ══ */}
              {activeTab === 5 && (
                <div style={{ height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ padding:"9px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(8,12,26,0.95)",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <span style={{ fontSize:13,fontWeight:700,color:"white" }}>Action Plan</span>
                    <span style={{ fontSize:8.5,fontWeight:700,color:"#818CF8",background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.2)",padding:"2px 8px",borderRadius:5 }}>AI &middot; Personalized</span>
                    <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:8 }}>
                      <div style={{ width:96,height:4.5,borderRadius:99,background:"rgba(255,255,255,0.06)",overflow:"hidden" }}>
                        <div style={{ width:subStep>=2?"50%":"25%",height:"100%",borderRadius:99,background:"linear-gradient(90deg,#3B82F6,#60A5FA)",transition:"width 1.2s cubic-bezier(0.4,0,0.2,1)" }}/>
                      </div>
                      <span style={{ fontSize:9,fontWeight:700,color:"#60A5FA" }}>{subStep>=2?"50":"25"}% complete</span>
                    </div>
                  </div>
                  <div style={{ flex:1,padding:"10px 14px",overflow:"hidden",display:"flex",gap:10 }}>

                    {/* Left col */}
                    <div style={{ width:198,flexShrink:0,display:"flex",flexDirection:"column",gap:7 }}>
                      {/* Completed milestones */}
                      <div style={{ background:"linear-gradient(145deg,#0B1820,#101C2A)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:11,padding:"9px 12px" }}>
                        <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Milestones Completed</div>
                        {[
                          {label:"Resume Review",   score:"82 A&#8722;", c:"#22C55E"},
                          {label:"LinkedIn Profile", score:"82 Good",    c:"#22C55E"},
                          {label:"Cover Letter",     score:"94% ATS",    c:"#22C55E"},
                        ].map((item,i) => (
                          <div key={i} style={{ display:"flex",alignItems:"center",gap:7,marginBottom:i<2?5:0 }}>
                            <div style={{ width:16,height:16,borderRadius:"50%",background:"rgba(34,197,94,0.12)",border:"1.5px solid #22C55E",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                              <svg viewBox="0 0 10 10" fill="none" stroke="#22C55E" strokeWidth="2.2" style={{ width:6,height:6 }}><path d="M2 5l2 2 4-4"/></svg>
                            </div>
                            <span style={{ fontSize:9,color:"rgba(255,255,255,0.32)",textDecoration:"line-through",flex:1 }}>{item.label}</span>
                            <span style={{ fontSize:8,fontWeight:700,color:item.c,whiteSpace:"nowrap" }} dangerouslySetInnerHTML={{__html:item.score}}/>
                          </div>
                        ))}
                      </div>

                      {/* Zari coaching */}
                      <div style={{ background:"rgba(59,130,246,0.07)",borderLeft:"3px solid #3B82F6",borderRadius:"0 10px 10px 0",padding:"9px 12px" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4 }}>
                          <div style={{ width:18,height:18,borderRadius:5,background:"linear-gradient(135deg,#3B82F6,#2563EB)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:"white",flexShrink:0 }}>Z</div>
                          <span style={{ fontSize:7.5,fontWeight:700,color:"#60A5FA",textTransform:"uppercase",letterSpacing:"0.1em" }}>Zari&apos;s Take</span>
                        </div>
                        <p style={{ fontSize:9,color:"rgba(255,255,255,0.6)",lineHeight:1.65,margin:0 }}>You&apos;re ahead of 78% of job seekers. Next highest-leverage move: networking — 70% of PM roles are filled before posting. You need 5 warm intros this week.</p>
                      </div>

                      {/* Job search stats */}
                      <div style={{ background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"9px 12px" }}>
                        <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Search Activity</div>
                        {[
                          {l:"Applications",  v:12,max:20,c:"#3B82F6"},
                          {l:"Interviews",     v:3, max:5, c:"#22C55E"},
                          {l:"Connections",    v:8, max:25,c:"#818CF8"},
                          {l:"Referrals",      v:2, max:5, c:"#FBBF24"},
                        ].map((stat,i) => (
                          <div key={stat.l} style={{ marginBottom:i<3?5:0 }}>
                            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:2 }}>
                              <span style={{ fontSize:8,color:"rgba(255,255,255,0.38)" }}>{stat.l}</span>
                              <span style={{ fontSize:8,fontWeight:700,color:stat.c }}>{stat.v}/{stat.max}</span>
                            </div>
                            <div style={{ height:3,borderRadius:99,background:"rgba(255,255,255,0.06)" }}>
                              <div style={{ width:`${(stat.v/stat.max)*100}%`,height:"100%",borderRadius:99,background:stat.c,transition:"width 1.2s ease" }}/>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right col */}
                    <div style={{ flex:1,display:"flex",flexDirection:"column",gap:6,overflow:"hidden" }}>

                      {/* Job funnel — visible from subStep 0 */}
                      <div style={{ background:"linear-gradient(145deg,#0F1928,#101C2A)",border:"1px solid rgba(129,140,248,0.15)",borderRadius:11,padding:"9px 12px",flexShrink:0 }}>
                        <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8 }}>Job Search Funnel</div>
                        <div style={{ display:"flex",gap:0,alignItems:"flex-end" }}>
                          {[
                            {l:"Applied",  v:24, h:52, c:"#3B82F6"},
                            {l:"Reviewed", v:14, h:38, c:"#60A5FA"},
                            {l:"Screen",   v:6,  h:26, c:"#818CF8"},
                            {l:"Interview",v:3,  h:18, c:"#FBBF24"},
                            {l:"Offer",    v:1,  h:12, c:"#22C55E"},
                          ].map((stage,i) => (
                            <div key={stage.l} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                              <span style={{ fontSize:11,fontWeight:900,color:"white" }}>{stage.v}</span>
                              <div style={{ width:"70%",borderRadius:"4px 4px 0 0",background:stage.c,height:stage.h,transition:"height 1s ease",opacity:0.85 }}/>
                              <span style={{ fontSize:7,color:"rgba(255,255,255,0.32)",textAlign:"center",lineHeight:1.3 }}>{stage.l}</span>
                              {i<4 && <div style={{ position:"absolute",fontSize:8,color:"rgba(255,255,255,0.15)" }}></div>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* This week tasks */}
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                        <div style={{ fontSize:8.5,fontWeight:700,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.1em" }}>This Week</div>
                        <span style={{ fontSize:9,color:"rgba(255,255,255,0.28)" }}>0 / {subStep>=3?4:2} tasks</span>
                      </div>
                      {[
                        {text:"Optimize LinkedIn networking section — add 5 connections in target companies",  tag:"LinkedIn",     tagC:"#60A5FA", due:"Today",    show:true},
                        {text:"Apply to 3 target companies — prioritize Series B/C PM roles in fintech",      tag:"Job Search",   tagC:"#818CF8", due:"Wed",     show:true},
                        {text:"Write personalized cover letter for each PM application using Zari template",    tag:"Cover Letter", tagC:"#22C55E", due:"Thu",     show:subStep>=3},
                        {text:"Connect with 5 people in your target roles — ask for 15-min coffee chat",       tag:"Network",      tagC:"#FBBF24", due:"Fri",     show:subStep>=3},
                      ].filter(t => t.show).map((task,i) => (
                        <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",padding:"9px 12px",background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:9,animation:`bubble-appear 0.52s ${i*0.09}s both cubic-bezier(0.16,1,0.3,1)`,flexShrink:0 }}>
                          <div style={{ width:15,height:15,borderRadius:"50%",flexShrink:0,marginTop:1,background:"rgba(255,255,255,0.04)",border:"1.5px solid rgba(255,255,255,0.12)" }}/>
                          <p style={{ fontSize:9.5,color:"rgba(255,255,255,0.75)",lineHeight:1.5,margin:0,flex:1 }}>{task.text}</p>
                          <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0 }}>
                            <span style={{ fontSize:7,fontWeight:700,color:task.tagC,background:`${task.tagC}18`,padding:"2px 6px",borderRadius:4,whiteSpace:"nowrap" }}>{task.tag}</span>
                            <span style={{ fontSize:7,color:"rgba(255,255,255,0.22)" }}>{task.due}</span>
                          </div>
                        </div>
                      ))}

                      {/* Weekly goal bar */}
                      {subStep >= 2 && (
                        <div style={{ background:"rgba(34,197,94,0.05)",border:"1px solid rgba(34,197,94,0.12)",borderRadius:9,padding:"9px 12px",animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both",marginTop:"auto",flexShrink:0 }}>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5 }}>
                            <div style={{ fontSize:7.5,fontWeight:700,color:"#22C55E",textTransform:"uppercase",letterSpacing:"0.1em" }}>Weekly Goal</div>
                            <span style={{ fontSize:18,fontWeight:900,color:"#22C55E" }}>2/4</span>
                          </div>
                          <div style={{ height:5,borderRadius:99,background:"rgba(255,255,255,0.06)",overflow:"hidden" }}>
                            <div style={{ width:"50%",height:"100%",borderRadius:99,background:"linear-gradient(90deg,#22C55E,#4ADE80)",transition:"width 1.2s cubic-bezier(0.4,0,0.2,1)" }}/>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ══ CHAT WITH ZARI ══ */}
              {activeTab === 0 && (
                <div style={{ height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ padding:"9px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(8,12,26,0.95)",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <span style={{ fontSize:13,fontWeight:700,color:"white" }}>Chat with Zari</span>
                    <span style={{ fontSize:8.5,fontWeight:700,color:"#22C55E",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",padding:"2px 8px",borderRadius:5,display:"flex",alignItems:"center",gap:4 }}>
                      <span style={{ width:5,height:5,borderRadius:"50%",background:"#22C55E",animation:"blink 1.1s ease-in-out infinite",display:"inline-block" }}/>
                      Live Session
                    </span>
                    <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:8 }}>
                      <span style={{ fontSize:9,color:"rgba(255,255,255,0.28)" }}>12:34 elapsed</span>
                      <div style={{ display:"flex",gap:4 }}>
                        <button style={{ fontSize:8.5,fontWeight:700,color:"#A5B4FC",background:"rgba(129,140,248,0.14)",border:"1px solid rgba(129,140,248,0.28)",borderRadius:5,padding:"3px 9px",cursor:"pointer" }}>Voice</button>
                        <button style={{ fontSize:8.5,color:"rgba(255,255,255,0.32)",background:"transparent",border:"1px solid rgba(255,255,255,0.08)",borderRadius:5,padding:"3px 9px",cursor:"pointer" }}>Text</button>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex:1,padding:"10px 14px",overflow:"hidden",display:"flex",gap:10 }}>

                    {/* Left col — orb + context */}
                    <div style={{ width:178,flexShrink:0,display:"flex",flexDirection:"column",gap:7 }}>

                      {/* Orb card */}
                      <div style={{ background:"radial-gradient(ellipse at 50% 20%,#0e0b2e,#060514)",border:"1px solid rgba(129,140,248,0.18)",borderRadius:13,padding:"14px 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:7,flexShrink:0 }}>
                        <div style={{ position:"relative",width:110,height:110,display:"flex",alignItems:"center",justifyContent:"center" }}>
                          <div style={{ position:"absolute",inset:10,borderRadius:"50%",border:"1.5px solid rgba(99,102,241,0.3)",animation:"ring-pulse 2.2s ease-out infinite",pointerEvents:"none" }}/>
                          <div style={{ position:"absolute",inset:0,borderRadius:"50%",border:"1px solid rgba(99,102,241,0.12)",animation:"ring-pulse 3.1s 0.8s ease-out infinite",pointerEvents:"none" }}/>
                          <div style={{ width:70,height:70,borderRadius:"50%",background:"radial-gradient(circle at 32% 32%, #9a8ff5, #4f46e5 50%, #1a1756 100%)",boxShadow:"0 0 35px 12px rgba(79,70,229,0.42), 0 0 70px 25px rgba(67,56,202,0.15)",animation:"sphere-breathe 4s ease-in-out infinite",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                            <span style={{ fontSize:18,fontWeight:900,color:"rgba(255,255,255,0.7)" }}>Z</span>
                          </div>
                        </div>
                        <div style={{ display:"flex",gap:2,alignItems:"flex-end",height:16 }}>
                          {[3,7,13,18,13,7,3].map((h,i)=>(
                            <div key={i} style={{ width:2.5,borderRadius:99,background:"rgba(165,180,252,0.65)",height:h,animation:`voice-wave ${1.8+i*0.22}s ease-in-out ${i*0.18}s infinite` }}/>
                          ))}
                        </div>
                        <span style={{ fontSize:9,color:"rgba(200,208,224,0.5)",letterSpacing:"0.05em" }}>listening…</span>
                      </div>

                      {/* Session context */}
                      <div style={{ background:"linear-gradient(145deg,#0B1820,#101C2A)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:11,padding:"9px 11px" }}>
                        <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>Session</div>
                        {[
                          {l:"Topic",   v:"FAANG PM Interview prep"},
                          {l:"Stage",   v:"Job search · Active"},
                          {l:"Focus",   v:"Product Sense · Q2 of 5"},
                        ].map((item,i) => (
                          <div key={i} style={{ marginBottom:i<2?6:0 }}>
                            <div style={{ fontSize:8,color:"rgba(255,255,255,0.25)",marginBottom:1 }}>{item.l}</div>
                            <div style={{ fontSize:9.5,color:"rgba(255,255,255,0.72)",fontWeight:600,lineHeight:1.4 }}>{item.v}</div>
                          </div>
                        ))}
                      </div>

                      {/* Session stats */}
                      {subStep >= 2 && (
                        <div style={{ background:"#0E1420",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"9px 11px",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7 }}>This Session</div>
                          {[
                            {l:"Questions",  v:"2 / 5",       c:"#60A5FA"},
                            {l:"Avg Score",  v:"8.4 / 10",    c:"#22C55E"},
                            {l:"Insights",   v:"4 tips given",c:"#818CF8"},
                          ].map((s,i) => (
                            <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:i<2?5:0 }}>
                              <span style={{ fontSize:8.5,color:"rgba(255,255,255,0.35)" }}>{s.l}</span>
                              <span style={{ fontSize:9,fontWeight:700,color:s.c }}>{s.v}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right col — chat + suggested replies */}
                    <div style={{ flex:1,display:"flex",flexDirection:"column",gap:6,overflow:"hidden" }}>

                      {/* Chat thread */}
                      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:7,overflow:"hidden" }}>
                        <div style={{ display:"flex",justifyContent:"flex-start",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ maxWidth:"88%",padding:"9px 13px",fontSize:10.5,lineHeight:1.6,borderRadius:"4px 14px 14px 14px",background:"rgba(79,70,229,0.22)",border:"1px solid rgba(59,130,246,0.3)",color:"rgba(255,255,255,0.82)" }}>
                            Let&apos;s work on Product Sense. FAANG panels love ambiguity — they want to see how you structure thinking under pressure. Ready for Q1?
                          </div>
                        </div>

                        {subStep >= 1 && (
                          <div style={{ display:"flex",justifyContent:"flex-end",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{ maxWidth:"78%",padding:"9px 13px",fontSize:10.5,lineHeight:1.6,borderRadius:"14px 4px 14px 14px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.75)" }}>
                              Yes — I always over-engineer the &ldquo;design a product for X&rdquo; prompts.
                            </div>
                          </div>
                        )}

                        {subStep === 1 && (
                          <div style={{ alignSelf:"flex-start",padding:"8px 12px",borderRadius:"4px 14px 14px 14px",background:"rgba(79,70,229,0.18)",border:"1px solid rgba(59,130,246,0.2)",display:"flex",gap:3,alignItems:"center",animation:"step-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
                            {[0,1,2].map(i=><span key={i} style={{ width:4,height:4,borderRadius:"50%",background:"rgba(165,180,252,0.5)",animation:`dot-bounce 1.2s ${i*0.15}s infinite`,display:"inline-block" }}/>)}
                          </div>
                        )}

                        {subStep >= 2 && (
                          <div style={{ display:"flex",justifyContent:"flex-start",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{ maxWidth:"90%",padding:"9px 13px",fontSize:10.5,lineHeight:1.6,borderRadius:"4px 14px 14px 14px",background:"rgba(79,70,229,0.22)",border:"1px solid rgba(59,130,246,0.3)",color:"rgba(255,255,255,0.82)" }}>
                              That&apos;s the most common PM pitfall. Lock in your framework first: <span style={{ color:"#A5B4FC",fontWeight:700 }}>User → Problem → Constraints → 3 Solutions → Pick 1 → Metrics</span>. Spend 90 seconds on clarity before you say a word. Practice: &ldquo;Design a product for elderly users in emerging markets.&rdquo;
                            </div>
                          </div>
                        )}

                        {subStep >= 3 && (
                          <div style={{ display:"flex",justifyContent:"flex-end",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{ maxWidth:"78%",padding:"9px 13px",fontSize:10.5,lineHeight:1.6,borderRadius:"14px 4px 14px 14px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.75)" }}>
                              I&apos;d define elderly as 60+, low digital literacy, feature phone or entry Android in rural India or Indonesia…
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Key insight card */}
                      {subStep >= 4 && (
                        <div style={{ background:"rgba(129,140,248,0.07)",border:"1px solid rgba(129,140,248,0.2)",borderRadius:10,padding:"9px 12px",animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both",flexShrink:0 }}>
                          <div style={{ fontSize:8.5,fontWeight:700,color:"#A5B4FC",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5 }}>Key Insight</div>
                          <p style={{ fontSize:10.5,color:"rgba(165,180,252,0.85)",lineHeight:1.55,margin:0 }}>Strong user definition. FAANG interviewers score on how you surface the right problem — spend 30% of your time on the user alone before jumping to solutions.</p>
                        </div>
                      )}

                      {/* Suggested responses */}
                      {subStep >= 2 && (
                        <div style={{ flexShrink:0,animation:"step-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ fontSize:7.5,fontWeight:700,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5 }}>Suggested responses</div>
                          <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
                            {[
                              "I'd define elderly as 60+, low digital literacy, feature phone or entry Android.",
                              "My framework: user → job-to-be-done → constraints → three concepts → success metric.",
                            ].map((s,i) => (
                              <div key={i} style={{ padding:"7px 10px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,fontSize:9.5,color:"rgba(255,255,255,0.5)",cursor:"pointer",lineHeight:1.5 }}>
                                {s}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Input bar */}
                      <div style={{ display:"flex",gap:6,alignItems:"center",flexShrink:0 }}>
                        <div style={{ flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"8px 12px",fontSize:10.5,color:"rgba(255,255,255,0.22)" }}>
                          Speak or type your response…
                        </div>
                        <div style={{ width:33,height:33,borderRadius:"50%",background:"rgba(239,68,68,0.85)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 0 6px rgba(239,68,68,0.12), 0 0 18px rgba(239,68,68,0.4)",animation:"sphere-breathe 1.3s ease-in-out infinite" }}>
                          <div style={{ width:9,height:9,borderRadius:2,background:"white" }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display:"flex",justifyContent:"center",gap:6,marginTop:22 }}>
          {TABS.map((_,i) => (
            <div key={i} onClick={() => { setActiveTab(i); setSubStep(0); }} style={{ height:3,borderRadius:99,cursor:"pointer",transition:"all 0.45s cubic-bezier(0.16,1,0.3,1)",width:activeTab===i?40:14,background:activeTab===i?"#818CF8":"rgba(255,255,255,0.12)" }}/>
          ))}
        </div>

      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════ */
export function HomeClient({ userId }: { userId: boolean }) {
  const [currentReview, setCurrentReview] = useState(0);
  const [activeFounder, setActiveFounder] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrentReview(i => (i+1) % PEOPLE.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily:"var(--font-geist-sans,Inter,-apple-system,sans-serif)", background:"white", color:"#0A0A0F" }}>
      <style>{`
        @keyframes marquee-x { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes ring-pulse { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes float-up { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes eye-glow { 0%,100%{opacity:0.9} 50%{opacity:0.5} }
        @keyframes neural-orbit-a { from{transform:rotate(0deg) translate(28px) rotate(0deg)} to{transform:rotate(360deg) translate(28px) rotate(-360deg)} }
        @keyframes neural-orbit-b { from{transform:rotate(0deg) translate(20px) rotate(0deg)} to{transform:rotate(-360deg) translate(20px) rotate(360deg)} }
        @keyframes aurora-pulse { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes bubble-appear {
          0%   { opacity:0; transform:translateY(16px) scale(0.93); }
          55%  { transform:translateY(-4px) scale(1.015); }
          100% { opacity:1; transform:none; }
        }
        @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0);opacity:0.5} 40%{transform:translateY(-7px);opacity:1} }
        @keyframes listen-ripple { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.9);opacity:0} }
        @keyframes step-fade-in {
          from { opacity:0; transform:translateY(24px) scale(0.985); }
          to   { opacity:1; transform:none; }
        }
        @keyframes tab-fade-in {
          from { opacity:0; transform:translateX(18px); }
          to   { opacity:1; transform:none; }
        }
        @keyframes heart-float       { 0%{transform:translateY(0) rotate(-10deg);opacity:0} 6%{opacity:1} 88%{opacity:0.55} 100%{transform:translateY(-400vh) rotate(14deg);opacity:0} }
        @keyframes heart-float-left  { 0%{transform:translateY(0) translateX(0) rotate(-8deg);opacity:0} 6%{opacity:1} 88%{opacity:0.55} 100%{transform:translateY(-400vh) translateX(-90px) rotate(-22deg);opacity:0} }
        @keyframes heart-float-right { 0%{transform:translateY(0) translateX(0) rotate(8deg);opacity:0} 6%{opacity:1} 88%{opacity:0.55} 100%{transform:translateY(-400vh) translateX(90px) rotate(22deg);opacity:0} }
        @keyframes heart-float-sway  { 0%{transform:translateY(0) translateX(0) rotate(-12deg);opacity:0} 6%{opacity:1} 25%{transform:translateY(-100vh) translateX(50px) rotate(6deg)} 50%{transform:translateY(-200vh) translateX(-30px) rotate(-9deg)} 75%{transform:translateY(-300vh) translateX(40px) rotate(11deg)} 88%{opacity:0.55} 100%{transform:translateY(-400vh) translateX(-15px) rotate(-16deg);opacity:0} }
        .review-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; cursor:default; }
        .review-card:hover { transform:translateY(-6px) scale(1.01); box-shadow:0 16px 48px rgba(67,97,238,0.15) !important; border-color:#C7D2FE !important; }
        * { box-sizing: border-box; }
        a { transition: opacity 0.18s; } a:hover { opacity: 0.72; }
      `}</style>

      <Nav userId={userId} />

      {/* ══════ HERO ══════ */}
      <section style={{
        background:"linear-gradient(180deg,#EEF2FF 0%,#F5F7FF 40%,#FAFBFF 70%,#FFFFFF 100%)",
        paddingTop:160,
        minHeight:"100vh",
        textAlign:"center",
      }}>
          {/* Icon + eyebrow — shared narrow container */}
          <div style={{ maxWidth:640, margin:"0 auto", padding:"0 24px" }}>
            <div style={{ width:54, height:54, borderRadius:15, background:"white", border:"1px solid #E2E6F0", boxShadow:"0 4px 18px rgba(0,0,0,0.09)", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
              {/* Kleo-style 4-pointed sparkle */}
              <svg viewBox="0 0 24 24" fill="none" style={{ width:26, height:26 }}>
                <path d="M12 3C12 3 13 8.5 15.5 10.5C18 12.5 23 12 23 12C23 12 18 11.5 15.5 13.5C13 15.5 12 21 12 21C12 21 11 15.5 8.5 13.5C6 11.5 1 12 1 12C1 12 6 12.5 8.5 10.5C11 8.5 12 3 12 3Z" fill="#4361EE"/>
                <path d="M19.5 4.5V6M18.75 5.25H20.25" stroke="#4361EE" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M20.5 9V10M20 9.5H21" stroke="#4361EE" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:"#4361EE", textTransform:"uppercase", letterSpacing:"0.13em", marginBottom:24 }}>
              #1 AI Career Coach
            </div>
          </div>

          {/* Headline — wider container so both lines center correctly */}
          <div style={{ maxWidth:920, margin:"0 auto", padding:"0 24px" }}>
            <h1 style={{
              fontSize:"clamp(2.6rem,4.8vw,3.4rem)",
              fontWeight:800,
              lineHeight:1.12,
              letterSpacing:"-0.04em",
              color:"#0A0A0F",
              marginBottom:24,
              textAlign:"center",
            }}>
              Career coaching for every goal<br />
              has{" "}
              <span style={{
                background:"linear-gradient(135deg,#4361EE 0%,#6B86FF 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>never been this smart.</span>
            </h1>
          </div>

          {/* Sub + input — narrow container */}
          <div style={{ maxWidth:760, margin:"0 auto", padding:"0 24px" }}>
            <p style={{ fontSize:16.5, lineHeight:1.7, color:"#5A6180", maxWidth:500, margin:"0 auto 32px" }}>
              Zari helps you <strong style={{ color:"#1E2235", fontWeight:600 }}>land jobs faster</strong>, <strong style={{ color:"#1E2235", fontWeight:600 }}>get promoted sooner</strong>, and <strong style={{ color:"#1E2235", fontWeight:600 }}>negotiate with confidence</strong>. Everything you need, in one AI coach.
            </p>
            <HeroPrompt userId={userId} />
          </div>

        {/* ── Full-width social + featured strip ── */}
        <div style={{ marginTop:48 }}>
          <div style={{ maxWidth:1400, margin:"0 auto", padding:"40px 72px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"nowrap", gap:48 }}>

            {/* LEFT: avatars + stars + text */}
            <div style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
              <div style={{ display:"flex" }}>
                {PEOPLE.slice(0,5).map((p, i) => (
                  <div key={i} style={{ width:54, height:54, borderRadius:"50%", border:"3px solid white", overflow:"hidden", marginLeft: i>0?-14:0, background:`linear-gradient(135deg,${p.color1},${p.color2})`, flexShrink:0, boxShadow:"0 2px 8px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"white" }}>
                    {p.initials}
                  </div>
                ))}
              </div>
              <div style={{ textAlign:"left" }}>
                <div style={{ display:"flex", gap:2, marginBottom:5 }}>
                  {Array.from({length:5}).map((_,i)=><svg key={i} viewBox="0 0 20 20" fill="#F59E0B" style={{ width:22,height:22 }}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <div style={{ fontSize:17, fontWeight:600, color:"#2D3550", whiteSpace:"nowrap" }}>Loved by 1,200+ candidates</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ width:1, alignSelf:"stretch", background:"rgba(67,97,238,0.12)", flexShrink:0 }} />

            {/* RIGHT: "Featured in" stacked above logos */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:11 }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#9AA3B8", textTransform:"uppercase", letterSpacing:"0.1em" }}>Featured in</span>
              <div style={{ display:"flex", alignItems:"center", gap:36, flexWrap:"nowrap" }}>
                <span style={{ display:"flex", alignItems:"center", gap:8, whiteSpace:"nowrap" }}>
                  <span style={{ width:26, height:26, borderRadius:6, background:"#8A94A8", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg viewBox="0 0 12 12" fill="white" style={{ width:13,height:13 }}><path d="M6 1L7.5 4.5H11L8.2 6.8 9.3 10.5 6 8.3 2.7 10.5 3.8 6.8 1 4.5H4.5z"/></svg>
                  </span>
                  <span style={{ fontSize:17, fontWeight:700, color:"#5E6880", whiteSpace:"nowrap" }}>Product Hunt</span>
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:8, whiteSpace:"nowrap" }}>
                  <span style={{ width:26, height:26, borderRadius:"50%", background:"#8A94A8", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"white", lineHeight:1, flexShrink:0 }}>IH</span>
                  <span style={{ fontSize:16, fontWeight:700, color:"#5E6880", textTransform:"uppercase", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>Indie Hackers</span>
                </span>
                <span style={{ fontSize:19, fontWeight:800, color:"#5E6880", letterSpacing:"-0.02em", whiteSpace:"nowrap" }}>TechCrunch</span>
                <span style={{ fontSize:30, fontWeight:900, color:"#4A5270", letterSpacing:"-0.03em", fontFamily:"Georgia,serif", lineHeight:1 }}>Forbes</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════ LOGO MARQUEE ══════ */}
      <section style={{ background:"#EEF0FB", padding:"44px 0 48px", overflow:"hidden" }}>
        <p style={{ textAlign:"center", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.16em", color:"#8B96C8", marginBottom:22 }}>
          Used by candidates targeting
        </p>
        <div style={{ overflow:"hidden", WebkitMaskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)", maskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:80, animation:"marquee-x 38s linear infinite", whiteSpace:"nowrap" }}>
            {[...LOGOS,...LOGOS].map((l,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"center", height:56, flexShrink:0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.src}
                  alt={l.name}
                  style={{ height:62, maxWidth:160, objectFit:"contain", filter:"grayscale(1) opacity(0.72)" }}
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

      {/* ══════ PLATFORM WALKTHROUGH ══════ */}
      <PlatformWalkthrough />

      {/* ══════ SPOTLIGHT REVIEWS — Kleo style ══════ */}
      <section style={{ background:"linear-gradient(180deg,#ECEFFE 0%,#F3F4FF 50%,#FAFAFF 100%)", padding:"112px 32px 124px" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <p style={{ fontSize:12, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.2em", color:"#6366F1", marginBottom:16 }}>What people are saying</p>
            <h2 style={{ fontSize:"clamp(2.4rem,4vw,3.2rem)", fontWeight:900, letterSpacing:"-0.05em", color:"#0A0A0F", lineHeight:1.05, margin:0 }}>
              Real results. Real people.
            </h2>
          </div>

          {/* 3-card grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, alignItems:"start" }}>

            {/* Card 1 — Resume */}
            <div style={{ background:"white", borderRadius:24, padding:"40px 38px 34px", boxShadow:"0 4px 24px rgba(99,102,241,0.08),0 1px 4px rgba(0,0,0,0.05)", border:"1px solid rgba(226,232,240,0.8)" }}>
              <div style={{ display:"flex", gap:2, marginBottom:28 }}>
                {[0,1,2,3,4].map(i=><span key={i} style={{ fontSize:24, color:"#F97316", lineHeight:1 }}>★</span>)}
              </div>
              <p style={{ fontSize:17, lineHeight:1.72, color:"#111827", margin:"0 0 32px", fontWeight:400 }}>
                I&apos;d been applying for 3 months with no callbacks. Zari audited my resume in one session and I rewrote it overnight.{" "}
                <span style={{ background:"rgba(99,102,241,0.13)", borderRadius:4, padding:"1px 4px", fontWeight:500 }}>I had 4 interview invites the following week.</span>{" "}
                I thought I was doing everything right — I wasn&apos;t.
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:800, color:"white" }}>MW</div>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:"#0A0A0F", margin:0, letterSpacing:"-0.01em" }}>Marcus Webb</p>
                  <p style={{ fontSize:13, color:"#6B7280", margin:0, marginTop:1 }}>Senior PM at Figma</p>
                </div>
              </div>
            </div>

            {/* Card 2 — Salary (center, slightly elevated) */}
            <div style={{ background:"white", borderRadius:24, padding:"40px 38px 34px", boxShadow:"0 12px 48px rgba(99,102,241,0.16),0 3px 10px rgba(0,0,0,0.07)", border:"1px solid rgba(99,102,241,0.14)", transform:"translateY(-12px)" }}>
              <div style={{ display:"flex", gap:2, marginBottom:28 }}>
                {[0,1,2,3,4].map(i=><span key={i} style={{ fontSize:24, color:"#F97316", lineHeight:1 }}>★</span>)}
              </div>
              <p style={{ fontSize:17, lineHeight:1.72, color:"#111827", margin:"0 0 32px", fontWeight:400 }}>
                I nearly accepted their first offer without saying a word. Zari walked me through all three rounds of negotiation.{" "}
                <span style={{ background:"rgba(99,102,241,0.13)", borderRadius:4, padding:"1px 4px", fontWeight:500 }}>I walked away with $22K more than I would have taken.</span>{" "}
                Every dollar I didn&apos;t leave on the table was because of this.
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#7C3AED,#A78BFA)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:800, color:"white" }}>PS</div>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:"#0A0A0F", margin:0, letterSpacing:"-0.01em" }}>Priya Sundaram</p>
                  <p style={{ fontSize:13, color:"#6B7280", margin:0, marginTop:1 }}>Engineering Manager</p>
                </div>
              </div>
            </div>

            {/* Card 3 — Interview */}
            <div style={{ background:"white", borderRadius:24, padding:"40px 38px 34px", boxShadow:"0 4px 24px rgba(99,102,241,0.08),0 1px 4px rgba(0,0,0,0.05)", border:"1px solid rgba(226,232,240,0.8)" }}>
              <div style={{ display:"flex", gap:2, marginBottom:28 }}>
                {[0,1,2,3,4].map(i=><span key={i} style={{ fontSize:24, color:"#F97316", lineHeight:1 }}>★</span>)}
              </div>
              <p style={{ fontSize:17, lineHeight:1.72, color:"#111827", margin:"0 0 32px", fontWeight:400 }}>
                I&apos;ve worked with expensive coaches before. None came close to this.{" "}
                <span style={{ background:"rgba(99,102,241,0.13)", borderRadius:4, padding:"1px 4px", fontWeight:500 }}>The final round interviewer asked me the exact question Zari drilled me on the night before.</span>{" "}
                I was ready. I got the offer.
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#059669,#34D399)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:800, color:"white" }}>DC</div>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:"#0A0A0F", margin:0, letterSpacing:"-0.01em" }}>Devon Clarke</p>
                  <p style={{ fontSize:13, color:"#6B7280", margin:0, marginTop:1 }}>Director of Operations at Stripe</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════ FOUNDER SECTION — interactive hover ══════ */}
      <section style={{ background:"white", padding:"0 40px", minHeight:"100vh", display:"flex", alignItems:"center", }}>
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", paddingTop:96, paddingBottom:96 }}>
          <h2 style={{ textAlign:"center", fontSize:"clamp(1.9rem,3.5vw,2.6rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:64 }}>
            Meet the founders behind Zari
          </h2>

          <div style={{ display:"grid", gridTemplateColumns:"44fr 56fr", gap:72, alignItems:"center" }}>

            {/* LEFT — large portrait, swaps on hover */}
            <div key={activeFounder} style={{ borderRadius:20, overflow:"hidden", aspectRatio:"3/4", boxShadow:"0 32px 80px rgba(0,0,0,0.15)", animation:"step-fade-in 0.65s cubic-bezier(0.16,1,0.3,1) both" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FOUNDERS[activeFounder].photo}
                alt={FOUNDERS[activeFounder].name}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
              />
            </div>

            {/* RIGHT — avatars + story */}
            <div>
              {/* Founder avatar row — hover to switch */}
              <div style={{ display:"flex", gap:28, marginBottom:40, flexWrap:"wrap" }}>
                {FOUNDERS.map((f, i) => (
                  <div
                    key={f.name}
                    onMouseEnter={() => setActiveFounder(i)}
                    onClick={() => setActiveFounder(i)}
                    style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:7, cursor:"pointer", transition:"transform 0.2s", transform: activeFounder === i ? "translateY(-4px)" : "none" }}
                  >
                    <div style={{
                      width:64, height:64, borderRadius:"50%", overflow:"hidden",
                      boxShadow: activeFounder === i ? "0 0 0 3px #4361EE, 0 8px 24px rgba(67,97,238,0.28)" : "0 4px 16px rgba(0,0,0,0.12)",
                      border: activeFounder === i ? "2px solid white" : "2px solid #F0F2F8",
                      transition:"box-shadow 0.2s, border-color 0.2s",
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.photo} alt={f.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:13, fontWeight:700, color: activeFounder === i ? "#4361EE" : "#0A0A0F", transition:"color 0.2s" }}>{f.name}</div>
                      <div style={{ fontSize:11.5, color:"#68738A" }}>{f.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Story — animates when founder changes */}
              <div key={`story-${activeFounder}`} style={{ animation:"step-fade-in 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                <h3 style={{ fontSize:"clamp(1.3rem,2.2vw,1.75rem)", fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", lineHeight:1.2, marginBottom:22 }}>
                  {FOUNDERS[activeFounder].h3}
                </h3>
                <p style={{ fontSize:16, lineHeight:1.85, color:"#4A5270", marginBottom:16 }}>
                  {FOUNDERS[activeFounder].story1}
                </p>
                <p style={{ fontSize:16, lineHeight:1.85, color:"#4A5270", marginBottom:32 }}>
                  {FOUNDERS[activeFounder].story2}
                </p>
                <p style={{ fontSize:20, fontStyle:"italic", fontWeight:700, color:"#0A0A0F", fontFamily:"Georgia,serif" }}>
                  {FOUNDERS[activeFounder].sig}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════ FEATURES — Kleo-style sections ══════ */}
      <section id="features" style={{ background:"#FAFBFF", }}>
        {FEATURES.map((f, i) => (
          <div key={f.tag} style={{ padding:"112px 20px", minHeight:"100vh", display:"flex", alignItems:"center", background: i%2===0?"#FAFBFF":"white" }}>
            <div style={{ maxWidth:1440, margin:"0 auto" }}>
              <FeatureSection f={f} flip={i%2!==0} idx={i} />
            </div>
          </div>
        ))}
      </section>

      {/* ══════ FAQ — Kleo layout ══════ */}
      <section style={{ padding:"0 40px", minHeight:"100vh", display:"flex", alignItems:"center", background:"#FAFBFF", }}>
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", paddingTop:96, paddingBottom:96 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:80, alignItems:"start" }}>

            {/* LEFT — sticky heading */}
            <div style={{ position:"sticky", top:120 }}>
              <h2 style={{ fontSize:"clamp(2rem,3.8vw,2.8rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", lineHeight:1.15 }}>
                You have questions,<br />we have answers
              </h2>
            </div>

            {/* RIGHT — accordion list */}
            <div>
              {[
                { q:"Is the free tier actually useful?", a:"Yes. One session per coaching surface is enough to see whether Zari works for you. Most users have their strongest insight in that first session — no credit card required." },
                { q:"How is this different from ChatGPT?", a:"ChatGPT is a general assistant. Zari is a specialized career coach with dedicated surfaces for résumés, interviews, LinkedIn, and salary — plus session memory, voice mode, and an animated coach avatar. It knows your goals and builds on every conversation." },
                { q:"What does session memory mean?", a:"Every session is summarized and stored. Session 5 knows everything from sessions 1–4: your target role, blockers, materials, and what you worked on before. You never have to re-explain your situation." },
                { q:"Does it work for career changers?", a:"It was built for them. Zari helps you reframe your background for a new industry — not just polish existing experience. It's used by people pivoting from finance to product, engineering to management, and everything in between." },
                { q:"What's included in my subscription?", a:"Every plan includes all coaching surfaces: résumé review, LinkedIn optimizer, mock interviews, promotion coaching, and salary negotiation. Higher plans add more sessions, voice mode, and priority support." },
                { q:"Can it help with promotions, not just job searches?", a:"Promotions are one of Zari's most popular use cases. It helps you build the business case, prepare your pitch, simulate the manager conversation, and close the gap between where you are and where you need to be." },
                { q:"How does voice mode work?", a:"You speak, Zari listens and responds in real time. The avatar reacts as you talk — ideal for interview practice or any session where you want to rehearse out loud rather than type." },
                { q:"Is my data private?", a:"Yes. Your sessions, résumé, and coaching history are private to your account. We do not train on your personal data or share it with third parties." },
                { q:"When do I choose a plan?", a:"After signing up and seeing what Zari can do. The free tier is genuinely useful — not a stripped-down teaser. Most people upgrade after the first session because they want to continue the work." },
                { q:"What's the cancellation policy?", a:"Cancel any time. No lock-in, no fees. Your session history stays accessible for 30 days after cancellation so you can export your coaching notes." },
              ].map((faq,i) => (
                <details key={i} style={{ borderBottom:"1px solid #E8EAF2" }}>
                  <summary style={{ padding:"22px 0", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:16, fontWeight:600, color:"#0A0A0F", listStyle:"none", gap:16 }}>
                    {faq.q}
                    <span style={{ width:28, height:28, borderRadius:"50%", border:"1.5px solid #D0D5E8", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg viewBox="0 0 16 16" fill="none" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" style={{ width:11,height:11 }}>
                        <path d="M8 3v10M3 8h10"/>
                      </svg>
                    </span>
                  </summary>
                  <p style={{ paddingBottom:22, paddingRight:44, fontSize:15.5, lineHeight:1.75, color:"#68738A", margin:0 }}>{faq.a}</p>
                </details>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════ REVIEW WALL — Kleo-style ══════ */}
      <section id="reviews" style={{ padding:"100px 20px 110px", minHeight:"100vh", background:"white", position:"relative", zIndex:3, overflow:"hidden" }}>

        {/* Animated floating hearts — drift upward from random x positions */}
        {([
          { left:"3%",  delay:"0s",    dur:"14s", s:28, o:0.36 },
          { left:"9%",  delay:"1.2s",  dur:"16s", s:20, o:0.30 },
          { left:"16%", delay:"0.4s",  dur:"13s", s:24, o:0.34 },
          { left:"23%", delay:"2.1s",  dur:"17s", s:18, o:0.28 },
          { left:"30%", delay:"0.8s",  dur:"15s", s:30, o:0.38 },
          { left:"37%", delay:"1.7s",  dur:"12s", s:16, o:0.26 },
          { left:"44%", delay:"3.0s",  dur:"14s", s:22, o:0.32 },
          { left:"51%", delay:"0.2s",  dur:"16s", s:28, o:0.40 },
          { left:"58%", delay:"1.5s",  dur:"13s", s:20, o:0.30 },
          { left:"65%", delay:"2.6s",  dur:"15s", s:24, o:0.34 },
          { left:"72%", delay:"0.6s",  dur:"18s", s:16, o:0.26 },
          { left:"79%", delay:"1.9s",  dur:"14s", s:30, o:0.36 },
          { left:"86%", delay:"3.4s",  dur:"12s", s:18, o:0.28 },
          { left:"93%", delay:"0.9s",  dur:"16s", s:22, o:0.32 },
          { left:"6%",  delay:"4.1s",  dur:"13s", s:16, o:0.24 },
          { left:"13%", delay:"2.8s",  dur:"15s", s:20, o:0.30 },
          { left:"20%", delay:"5.0s",  dur:"17s", s:26, o:0.38 },
          { left:"28%", delay:"1.1s",  dur:"14s", s:18, o:0.28 },
          { left:"35%", delay:"3.7s",  dur:"13s", s:28, o:0.36 },
          { left:"42%", delay:"0.5s",  dur:"16s", s:20, o:0.30 },
          { left:"49%", delay:"4.5s",  dur:"18s", s:22, o:0.34 },
          { left:"56%", delay:"2.3s",  dur:"12s", s:30, o:0.42 },
          { left:"63%", delay:"1.4s",  dur:"14s", s:16, o:0.24 },
          { left:"70%", delay:"3.2s",  dur:"15s", s:24, o:0.34 },
          { left:"77%", delay:"5.5s",  dur:"17s", s:20, o:0.30 },
          { left:"84%", delay:"4.8s",  dur:"13s", s:18, o:0.28 },
          { left:"91%", delay:"2.0s",  dur:"16s", s:26, o:0.38 },
          { left:"5%",  delay:"6.2s",  dur:"15s", s:22, o:0.32 },
          { left:"18%", delay:"3.9s",  dur:"14s", s:28, o:0.36 },
          { left:"26%", delay:"1.6s",  dur:"18s", s:16, o:0.26 },
          { left:"33%", delay:"5.8s",  dur:"13s", s:24, o:0.34 },
          { left:"40%", delay:"0.7s",  dur:"16s", s:20, o:0.30 },
          { left:"47%", delay:"4.3s",  dur:"15s", s:30, o:0.40 },
          { left:"54%", delay:"2.5s",  dur:"17s", s:18, o:0.28 },
          { left:"61%", delay:"6.8s",  dur:"14s", s:22, o:0.34 },
          { left:"68%", delay:"1.3s",  dur:"12s", s:26, o:0.38 },
          { left:"75%", delay:"4.0s",  dur:"16s", s:16, o:0.24 },
          { left:"82%", delay:"7.1s",  dur:"15s", s:28, o:0.36 },
          { left:"89%", delay:"2.7s",  dur:"13s", s:20, o:0.30 },
          { left:"96%", delay:"5.2s",  dur:"18s", s:24, o:0.34 },
        ] as {left:string;delay:string;dur:string;s:number;o:number}[]).map((h,i) => (
          <div key={i} aria-hidden style={{
            position:"absolute", bottom:"-30px", left:h.left,
            fontSize:h.s, color:"#E8336D", opacity:h.o,
            pointerEvents:"none", userSelect:"none", lineHeight:1, zIndex:10,
            animation:`${["heart-float","heart-float-left","heart-float-right","heart-float-sway"][i%4]} ${h.dur} ${h.delay} ease-in infinite`,
          }}>♥</div>
        ))}

        <div style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <h2 style={{ fontSize:"clamp(2.2rem,4.5vw,3.2rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:14 }}>
              Loved by 1,200+ candidates.
            </h2>
            <p style={{ fontSize:18, color:"#68738A" }}>Real sessions. Real results. Real offers.</p>
          </div>

          {/* 3-column masonry */}
          <div style={{ columns:3, columnGap:20 }}>
            {WALL_REVIEWS.map((r,i) => (
              <div key={i} className="review-card" style={{
                breakInside:"avoid", marginBottom:20,
                background:"#FFFFFF",
                border:"1px solid #E5E7EB",
                borderRadius:16,
                padding:"24px",
                boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", overflow:"hidden", flexShrink:0, background:`linear-gradient(135deg,${r.color1},${r.color2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"white" }}>
                    {r.name.split(" ").map((n: string) => n[0]).join("").slice(0,2)}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:700, color:"#111827", lineHeight:1.2 }}>{r.name}</div>
                    <div style={{ fontSize:12.5, color:"#6B7280", marginTop:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.role}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:2, marginBottom:12 }}>
                  {Array.from({length:5}).map((_,j)=><svg key={j} viewBox="0 0 24 24" fill="#F59E0B" style={{ width:18,height:18,flexShrink:0 }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p style={{ fontSize:15, lineHeight:1.72, color:"#374151", margin:0 }}>
                  <WallHighlight text={r.quote} highlights={r.highlights} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section style={{ padding:"96px 28px", background:"#0A0A0F", position:"relative", zIndex:3, overflow:"hidden" }}>
        <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", width:600, height:600, top:"-20%", left:"50%", transform:"translateX(-50%)", background:"rgba(67,97,238,0.22)", filter:"blur(120px)", borderRadius:"50%" }}/>
          <div style={{ position:"absolute", width:280, height:280, bottom:"-5%", right:"8%", background:"rgba(6,182,212,0.12)", filter:"blur(80px)", borderRadius:"50%" }}/>
        </div>

        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative" }}>
          {/* Person avatars arc */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <div style={{ display:"flex" }}>
              {PEOPLE.slice(0,5).map((p,i) => (
                <div key={i} style={{ width:44, height:44, borderRadius:"50%", border:"3px solid #0A0A0F", overflow:"hidden", marginLeft: i>0?-12:0, background:`linear-gradient(135deg,${p.color1},${p.color2})`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"white" }}>
                  {p.initials}
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
      <footer style={{ background:"linear-gradient(180deg, #060810 0%, #0C1022 100%)" }}>
        {/* Main footer body */}
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"64px 40px 48px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:40 }}>
          {/* Left: brand + tagline */}
          <div style={{ maxWidth:480 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
              <ZariLogo size={52} />
              <span style={{ fontSize:40, fontWeight:900, color:"white", letterSpacing:"-0.045em", lineHeight:1 }}>Zari</span>
            </div>
            <p style={{ fontSize:15.5, color:"rgba(255,255,255,0.48)", lineHeight:1.65, margin:0, fontWeight:400 }}>
              AI career coaching that gets you hired — resume reviews, LinkedIn optimization, interview prep, and salary negotiation, all in one place.
            </p>
          </div>
          {/* Right: nav */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:14 }}>
            <Link href="/login"  style={{ fontSize:15, fontWeight:500, color:"rgba(255,255,255,0.65)", textDecoration:"none", transition:"color 0.15s" }}>Sign in</Link>
            <Link href="/signup" style={{ fontSize:15, fontWeight:500, color:"rgba(255,255,255,0.65)", textDecoration:"none", transition:"color 0.15s" }}>Get started</Link>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"20px 40px 28px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", gap:28, fontSize:13, color:"rgba(255,255,255,0.35)" }}>
            <Link href="/terms"   style={{ color:"rgba(255,255,255,0.35)", textDecoration:"none" }}>Terms of Service</Link>
            <Link href="/privacy" style={{ color:"rgba(255,255,255,0.35)", textDecoration:"none" }}>Privacy</Link>
          </div>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.3)" }}>© 2026 Zari. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
