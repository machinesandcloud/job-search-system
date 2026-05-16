const WALL_REVIEWS = [
  { name:"Marcus J.",    role:"Backend Eng → Staff Eng",        photo:"/avatars/36.jpg",   color1:"#4361EE", color2:"#818CF8", quote:"Been Senior for 4 years with zero movement. One month with Zari and I finally had the story. Promoted in 5 months.", highlights:["Promoted in 5 months."] },
  { name:"Priya M.",     role:"PM → Senior PM, Notion",         photo:"/avatars/1.jpg", color1:"#7C3AED", color2:"#A78BFA", quote:"Zari told me exactly what was wrong with my resume. Not vague feedback — line by line. Uncomfortable but it worked.", highlights:["line by line"] },
  { name:"Aaliyah R.",   role:"Data Scientist, Stripe",         photo:"/avatars/2.jpg", color1:"#0284C7", color2:"#38BDF8", quote:"I want to be honest — I was skeptical. I'd tried the career books, the LinkedIn courses, the mock interview sites. None of it translated to anything real in the room. What Zari did differently was stop me mid-answer and say 'you just described output — tell me the impact.' That one correction changed every interview I had for the next three months. I went from zero callbacks to three senior roles at once. The difference wasn't effort. It was learning how to tell the right story.", highlights:["three senior roles at once", "learning how to tell the right story"] },
  { name:"Daniel K.",    role:"Ops Lead → Shopify PM",          photo:"/avatars/37.jpg",   color1:"#059669", color2:"#34D399", quote:"4 callbacks in one week after the resume session. Zero traction to two final rounds simultaneously.", highlights:["4 callbacks in one week", "two final rounds simultaneously"] },
  { name:"Sofia L.",     role:"IC → Engineering Manager",       photo:"/avatars/3.jpg", color1:"#DC2626", color2:"#F87171", quote:"Practiced my manager pitch with Zari every day for two weeks. Walked into the real conversation completely calm. Got the role.", highlights:["Got the role."] },
  { name:"James T.",     role:"Director → VP Engineering",      photo:"/avatars/38.jpg",   color1:"#D97706", color2:"#FCD34D", quote:"My skip-level feedback changed noticeably within a quarter. My directs noticed before I told anyone.", highlights:["changed noticeably within a quarter"] },
  { name:"Camille D.",   role:"Finance → Stripe PM",            photo:"/avatars/4.jpg", color1:"#7C3AED", color2:"#C4B5FD", quote:"Six years in finance, zero product experience. Zari rebuilt my whole narrative. Without it I'd still be sending applications into the void.", highlights:["Zari rebuilt my whole narrative."] },
  { name:"Ryan O.",      role:"Sales Lead → Google APM",        photo:"/avatars/39.jpg",   color1:"#0284C7", color2:"#7DD3FC", quote:"Zari ran the negotiation sim with me until it stopped feeling scary. Walked away $28K above their opening offer.", highlights:["$28K above their opening offer."] },
  { name:"Tanya W.",     role:"Analyst → Product, Meta",        photo:"/avatars/5.jpg", color1:"#4361EE", color2:"#6EE7B7", quote:"STAR scoring showed me exactly which word to cut and why. I felt overprepared walking into the panel. That's a great feeling.", highlights:["I felt overprepared walking into the panel."] },
  { name:"Divya N.",     role:"QA Lead → PM, Microsoft",        photo:"/avatars/6.jpg", color1:"#DC2626", color2:"#FECACA", quote:"I had six years of product experience and still couldn't get past Stripe's first round. Zari showed me why: I was presenting tasks, not decisions. Describing timelines, not tradeoffs. Every answer was technically accurate and completely unconvincing. Over four sessions, Zari rebuilt how I talk about my work — not what I did, but why it mattered, what I chose not to do, and what I'd do differently. I passed every round on the next attempt. Group PM offer, $40K above their first number.", highlights:["$40K above their first number."] },
  { name:"Leo B.",       role:"Junior → Mid SWE, Airbnb",       photo:"/avatars/40.jpg",   color1:"#0284C7", color2:"#A5F3FC", quote:"Didn't know how to talk about side projects. Zari showed me how to frame them as product experience. Got the Airbnb offer.", highlights:["Got the Airbnb offer."] },
  { name:"Nina S.",      role:"CS grad → Figma PM",             photo:"/avatars/7.jpg", color1:"#7C3AED", color2:"#F9A8D4", quote:"New grad, terrified of interviews. Zari coached me session by session. By interview day I wasn't nervous at all. Offer above band.", highlights:["Offer above band."] },
  { name:"Omar A.",      role:"Consultant → Uber Strategy",     photo:"/avatars/41.jpg",   color1:"#059669", color2:"#86EFAC", quote:"It felt like talking to someone who'd been through my exact transition. Nothing generic. Every answer specific to my situation.", highlights:["Every answer specific to my situation."] },
  { name:"Jess M.",      role:"SDR → RevOps PM, Salesforce",    photo:"/avatars/8.jpg", color1:"#D97706", color2:"#FDE68A", quote:"Zari told me I was leaving money on the table. I countered to $148K. They said yes immediately. I almost left $18K behind.", highlights:["I countered to $148K.", "I almost left $18K behind."] },
  { name:"Dev P.",       role:"EM → Director, Snowflake",       photo:"/avatars/42.jpg",   color1:"#4361EE", color2:"#BAE6FD", quote:"Not 'be more strategic' — actual specific things to do, week by week. The most useful coaching I've ever had.", highlights:["The most useful coaching I've ever had."] },
  { name:"Fatoumata K.", role:"Ops Manager → LinkedIn PM",      photo:"/avatars/9.jpg", color1:"#DC2626", color2:"#FCA5A5", quote:"The career change felt impossible. Every recruiter said I wasn't 'product enough.' Zari spent two sessions just on narrative — repositioning 5 years of ops work as product intuition, not a liability. Then we practiced every version of 'why are you switching?' until I stopped hedging and started owning it. LinkedIn's final round had four back-to-back PM interviews. I came out feeling like I'd done them all before. I had. Just with Zari.", highlights:["I came out feeling like I'd done them all before."] },
  { name:"Chris Y.",     role:"Senior PM → Staff PM, Notion",   photo:"/avatars/43.jpg",   color1:"#0284C7", color2:"#67E8F9", quote:"LinkedIn views went from 2 to 22 per week. Just the headline. Nothing else changed.", highlights:["LinkedIn views went from 2 to 22 per week."] },
  { name:"Aisha T.",     role:"Customer Success → PM, HubSpot", photo:"/avatars/10.jpg", color1:"#7C3AED", color2:"#DDD6FE", quote:"Told my whole career I wasn't technical enough. Zari showed me how to position customer insight as a superpower. HubSpot agreed.", highlights:["HubSpot agreed."] },
  { name:"Patrick H.",   role:"Sr PM → Group PM, Stripe",       photo:"/avatars/44.jpg",   color1:"#0284C7", color2:"#BAE6FD", quote:"Zari pushed me to counter twice. Most people stop at one. Ended up $22K above their so-called final offer.", highlights:["$22K above their so-called final offer."] },
  { name:"Tom F.",       role:"Principal PM → Director, Databricks", photo:"/avatars/45.jpg", color1:"#D97706", color2:"#FEF3C7", quote:"My directs noticed I was running meetings differently before I told anyone I was working with Zari.", highlights:["before I told anyone I was working with Zari"] },
  { name:"Grace K.",     role:"MBA → PM, Coinbase",             photo:"/avatars/11.jpg", color1:"#4361EE", color2:"#A5B4FC", quote:"No product experience, just an MBA. Zari built a narrative from academic projects that Coinbase actually bought.", highlights:["Coinbase actually bought."] },
  { name:"Ivan M.",      role:"IC5 → IC6, Amazon",              photo:"/avatars/46.jpg",   color1:"#059669", color2:"#6EE7B7", quote:"Zari knew Amazon's leadership principles better than I did. Drilled me until I stopped saying 'we' instead of 'I'. That was the whole problem.", highlights:["stopped saying 'we' instead of 'I'"] },
  { name:"Layla P.",     role:"Marketing → Growth PM, Canva",   photo:"/avatars/12.jpg", color1:"#7C3AED", color2:"#F3E8FF", quote:"I thought the career change was too big. Zari showed me I was already doing half the job. Canva's role was basically designed for me.", highlights:["Canva's role was basically designed for me."] },
  { name:"Sam W.",       role:"SRE → Staff Infra PM, Cloudflare",photo:"/avatars/47.jpg",  color1:"#0284C7", color2:"#E0F2FE", quote:"I'd been trying to make the transition from SRE to PM for two years. Every rejection said the same thing: 'not enough product thinking.' Zari ran me through a full product case, then dissected every answer I gave. It wasn't brutal — it was specific. By session three I was structuring problems differently. By session five I had a Staff PM offer at Cloudflare. I didn't change what I knew. I changed how I explained it.", highlights:["Staff PM offer at Cloudflare"] },
  { name:"Zoe H.",       role:"IC → Manager, Airbnb",           photo:"/avatars/13.jpg", color1:"#DC2626", color2:"#FEE2E2", quote:"Not 'act more like a leader.' Specific behaviors to change in the next 30 days. That's the difference.", highlights:["Specific behaviors to change in the next 30 days."] },
  { name:"Femi A.",      role:"PM → Senior PM, Twitter/X",      photo:"/avatars/48.jpg",   color1:"#4361EE", color2:"#EDE9FE", quote:"Zari stopped me mid-story and said 'that's three bullets, not one.' Changed how I talk about my work forever.", highlights:["Changed how I talk about my work forever."] },
  { name:"Aria J.",      role:"L5 → L6, Google",                photo:"/avatars/14.jpg", color1:"#059669", color2:"#D1FAE5", quote:"Two failed promo cycles. Zari mapped the deciders and what they respond to. Third cycle: approved first round.", highlights:["Third cycle: approved first round."] },
  { name:"Carlos R.",    role:"Tech Lead → Engineering Manager", photo:"/avatars/49.jpg",   color1:"#7C3AED", color2:"#E9D5FF", quote:"The IC to manager transition is an identity shift, not a job change. Zari prepared me for the actual hard part.", highlights:["identity shift, not a job change"] },
  { name:"Ethan C.",     role:"CSM → PM, Intercom",             photo:"/avatars/50.jpg",   color1:"#0284C7", color2:"#BFDBFE", quote:"Five rejections before Zari. One after. The fix was leading with customer impact instead of feature lists.", highlights:["Five rejections before Zari. One after."] },
  { name:"Kenji T.",     role:"Senior SWE → Staff, Slack",      photo:"/avatars/51.jpg",   color1:"#4361EE", color2:"#C7D2FE", quote:"Staff promo is a different argument — you're selling org impact. Zari coached me on that language. Slack approved first cycle.", highlights:["Slack approved first cycle."] },
  { name:"Nadia F.",     role:"COO → Advisor & Board",          photo:"/avatars/15.jpg", color1:"#DC2626", color2:"#FECACA", quote:"At my level it was about board positioning. Zari understood governance language and helped me write a bio that actually opens doors.", highlights:["a bio that actually opens doors"] },
  { name:"Tyler G.",     role:"Product Analyst → PM, Spotify",  photo:"/avatars/52.jpg",   color1:"#059669", color2:"#A7F3D0", quote:"One of twelve Spotify finalists. Zari had run me through every question type they use. It felt like I'd already done the interview.", highlights:["It felt like I'd already done the interview."] },
  { name:"Rashida M.",   role:"UX Researcher → PM, Figma",      photo:"/avatars/16.jpg", color1:"#7C3AED", color2:"#DDD6FE", quote:"Research background was invisible on my resume. Zari wrote the one bullet that fixed it. Now it's how I open every interview.", highlights:["the one bullet that fixed it"] },
  { name:"Will N.",      role:"L4 → L5 SWE, Apple",             photo:"/avatars/53.jpg",   color1:"#0284C7", color2:"#E0F2FE", quote:"Apple's promo bar is high and opaque. Zari mapped my work to the criteria they actually use. Got promoted 7 months in.", highlights:["Got promoted 7 months in."] },
  { name:"Mo K.",        role:"SWE → EM, Plaid",                photo:"/avatars/54.jpg",   color1:"#DC2626", color2:"#FCA5A5", quote:"'How would you handle a low performer?' cold would have killed me. Zari made me answer it 8 ways. I was ready for anything.", highlights:["I was ready for anything."] },
  { name:"Amara O.",     role:"Strategy → Chief of Staff, Lyft", photo:"/avatars/17.jpg",color1:"#D97706", color2:"#FEF3C7", quote:"Salary coaching paid for itself in the first hour. Walked into Lyft knowing my leverage. Left $30K above their opening number.", highlights:["Left $30K above their opening number."] },
  { name:"Lena H.",      role:"Mid PM → Sr PM, Linear",         photo:"/avatars/18.jpg", color1:"#4361EE", color2:"#C7D2FE", quote:"LinkedIn rewrite took 45 minutes. Doubled inbound recruiter messages in a week.", highlights:["Doubled inbound recruiter messages in a week."] },
  { name:"Aaron T.",     role:"IC3 → IC4 SWE, Meta",            photo:"/avatars/55.jpg",   color1:"#7C3AED", color2:"#EDE9FE", quote:"Failed promo twice. Zari showed me I was solving the wrong problems. Third attempt: approved.", highlights:["Third attempt: approved."] },
  { name:"Jake S.",      role:"Sales Eng → Solutions PM, Twilio",photo:"/avatars/56.jpg",  color1:"#4361EE", color2:"#A5B4FC", quote:"Five rounds at Twilio. Debriefed with Zari after every one and adjusted. Never felt like I was guessing.", highlights:["Never felt like I was guessing."] },
  { name:"Ingrid A.",    role:"Business Analyst → PM, Adyen",   photo:"/avatars/19.jpg", color1:"#059669", color2:"#BBF7D0", quote:"New industry, new country, same CV. Zari helped me tell one coherent story instead of two confused ones. Amsterdam hired me in 3 weeks.", highlights:["Amsterdam hired me in 3 weeks."] },
  { name:"Tolu B.",      role:"Chemical Eng → Data PM, Palantir",photo:"/avatars/57.jpg",  color1:"#D97706", color2:"#FCD34D", quote:"My engineering background looked weird to product teams. Zari reframed it as complexity tolerance. Palantir called it a differentiator.", highlights:["Palantir called it a differentiator."] },
  { name:"Rachel M.",    role:"Head of CS → VP Success, Rippling",photo:"/avatars/20.jpg",color1:"#4361EE",color2:"#A5B4FC", quote:"Rippling's VP loop is structured and intense. Zari helped me prep the written exec summary they actually asked for. Offer in 3 weeks.", highlights:["Offer in 3 weeks."] },
  { name:"Kwame D.",     role:"IC6 → IC7 SWE, Google",          photo:"/avatars/58.jpg",   color1:"#059669", color2:"#D1FAE5", quote:"L7 is about org impact. That's a different argument. Zari coached me on that language until I could make it naturally.", highlights:["L7 is about org impact."] },
  { name:"Sean P.",      role:"SWE → Technical PM, Vercel",     photo:"/avatars/59.jpg",   color1:"#0284C7", color2:"#BFDBFE", quote:"Zari taught me how to show enthusiasm without giving away leverage. Came out $18K higher at a company I genuinely wanted.", highlights:["$18K higher at a company I genuinely wanted."] },
];

function HighlightedText({ text, highlights }: { text: string; highlights: string[] }) {
  if (!highlights.length) return <>{text}</>;
  const escaped = [...highlights]
    .sort((a, b) => b.length - a.length)
    .map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  const set = new Set(highlights);
  return (
    <>
      {parts.map((part, i) =>
        set.has(part) ? (
          <mark
            key={i}
            style={{
              background: "rgba(59,130,246,0.14)",
              color: "inherit",
              borderRadius: 4,
              padding: "1px 4px",
              fontWeight: 600,
            }}
          >
            {part}
          </mark>
        ) : part
      )}
    </>
  );
}

export function HomeReviewWall() {
  return (
    <section id="reviews" style={{ padding:"100px 20px 120px", background:"#ffffff", position:"relative", overflow:"hidden" }}>

      {/* Floating hearts */}
      {([
        { left:"3%", delay:"0s", dur:"14s", s:28, o:0.30 },
        { left:"9%", delay:"1.2s", dur:"16s", s:20, o:0.24 },
        { left:"16%", delay:"0.4s", dur:"13s", s:24, o:0.26 },
        { left:"23%", delay:"2.1s", dur:"17s", s:18, o:0.22 },
        { left:"30%", delay:"0.8s", dur:"15s", s:30, o:0.32 },
        { left:"37%", delay:"1.7s", dur:"12s", s:16, o:0.20 },
        { left:"44%", delay:"3.0s", dur:"14s", s:22, o:0.26 },
        { left:"51%", delay:"0.2s", dur:"16s", s:28, o:0.34 },
        { left:"58%", delay:"1.5s", dur:"13s", s:20, o:0.24 },
        { left:"65%", delay:"2.6s", dur:"15s", s:24, o:0.28 },
        { left:"72%", delay:"0.6s", dur:"18s", s:16, o:0.20 },
        { left:"79%", delay:"1.9s", dur:"14s", s:30, o:0.30 },
        { left:"86%", delay:"3.4s", dur:"12s", s:18, o:0.22 },
        { left:"93%", delay:"0.9s", dur:"16s", s:22, o:0.26 },
        { left:"6%", delay:"4.1s", dur:"13s", s:16, o:0.18 },
        { left:"20%", delay:"5.0s", dur:"17s", s:26, o:0.30 },
        { left:"56%", delay:"2.3s", dur:"12s", s:30, o:0.36 },
        { left:"70%", delay:"3.2s", dur:"15s", s:24, o:0.28 },
        { left:"84%", delay:"4.8s", dur:"13s", s:18, o:0.22 },
      ] as { left: string; delay: string; dur: string; s: number; o: number }[]).map((h, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position:"absolute", bottom:"-30px", left:h.left,
            fontSize:h.s, color:"#E8336D", opacity:h.o,
            pointerEvents:"none", userSelect:"none", lineHeight:1, zIndex:1,
            animation:`${["heart-float","heart-float-left","heart-float-right","heart-float-sway"][i % 4]} ${h.dur} ${h.delay} ease-in infinite`,
          }}
        >♥</div>
      ))}

      <div style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:2 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:80 }}>
          <h2 style={{ fontSize:"clamp(2.4rem,4.5vw,3.4rem)", fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", margin:"0 0 16px" }}>
            Loved by 1,200+ candidates.
          </h2>
          <p style={{ fontSize:18, color:"#68738A", margin:0 }}>Real sessions. Real results. Real offers.</p>
        </div>

        {/* Masonry grid */}
        <div style={{ columns:3, columnGap:20 }}>
          {WALL_REVIEWS.map((r, i) => (
            <div
              key={i}
              style={{
                breakInside:"avoid",
                marginBottom:20,
                background:"#FFFFFF",
                border:"1px solid #E5E7EB",
                borderRadius:16,
                padding:"24px",
                boxShadow:"0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                transition:"box-shadow 0.18s, transform 0.18s",
                cursor:"default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)";
              }}
            >
              {/* Avatar + name at top */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", overflow:"hidden", flexShrink:0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt={r.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:"#111827", lineHeight:1.2 }}>{r.name}</div>
                  <div style={{ fontSize:12.5, color:"#6B7280", marginTop:3 }}>{r.role}</div>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display:"flex", gap:2, marginBottom:12 }}>
                {Array.from({ length:5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 24 24" fill="#F59E0B" style={{ width:18, height:18, flexShrink:0 }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontSize:15, lineHeight:1.72, color:"#374151", margin:0, fontWeight:400 }}>
                <HighlightedText text={r.quote} highlights={r.highlights} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
