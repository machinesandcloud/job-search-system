const WALL_REVIEWS = [
  { name:"Marcus J.",    role:"Backend Eng → Staff Eng",           photo:"/avatars/36.jpg", color1:"#4361EE", color2:"#818CF8", quote:"4 years stuck at Senior. My manager kept saying 'keep doing what you're doing.' Zari showed me I was solving the wrong problems — impressive work that didn't register at the promo committee level. Promoted 5 months after my first session. My manager's exact words: 'You finally get it.'", highlights:["Promoted 5 months after my first session"] },
  { name:"Priya M.",     role:"PM → Senior PM, Notion",            photo:"/avatars/1.jpg",  color1:"#7C3AED", color2:"#A78BFA", quote:"Zari went line by line through my resume and told me what was actually wrong. Not vague feedback — specific bullets, specific fixes, specific reasons. Got the Notion offer 3 weeks later. I'd been applying for 6 months with nothing.", highlights:["line by line", "Got the Notion offer 3 weeks later"] },
  { name:"Aaliyah R.",   role:"Data Scientist, Stripe",            photo:"/avatars/2.jpg",  color1:"#0284C7", color2:"#38BDF8", quote:"I'm not easy to impress. Done mock interviews, read every book, used other AI tools. Zari was the first thing that caught what was actually wrong. It flagged me saying 'we' instead of 'I' and made me fix it live. Sounds small. It completely changed how I came across. Zero callbacks to three final rounds. I'm at Stripe now.", highlights:["Zero callbacks to three final rounds", "I'm at Stripe now"] },
  { name:"Daniel K.",    role:"Ops Lead → Shopify PM",             photo:"/avatars/37.jpg", color1:"#059669", color2:"#34D399", quote:"Four callbacks the week after my resume session. I'd had zero in two months. I almost didn't book it. Please just book the session.", highlights:["Four callbacks the week after"] },
  { name:"Sofia L.",     role:"IC → Engineering Manager",          photo:"/avatars/3.jpg",  color1:"#DC2626", color2:"#F87171", quote:"I practiced my manager pitch with Zari every single day for 2 weeks. It pushed back hard when my answers were weak. By the time the real conversation came, I was so overprepared it felt unfair. Got the role.", highlights:["Got the role"] },
  { name:"James T.",     role:"Director → VP Engineering",         photo:"/avatars/38.jpg", color1:"#D97706", color2:"#FCD34D", quote:"My skip-level noticed something changed before I told him I was working with Zari. I wasn't doing anything dramatically different — I just finally had language for the decisions I was already making.", highlights:["My skip-level noticed something changed"] },
  { name:"Camille D.",   role:"Finance → Stripe PM",               photo:"/avatars/4.jpg",  color1:"#7C3AED", color2:"#C4B5FD", quote:"6 years in finance trying to break into product. Every coach said 'highlight transferable skills.' Zari actually rebuilt my narrative from scratch. Stripe didn't see a career changer. They saw a PM.", highlights:["Stripe didn't see a career changer. They saw a PM."] },
  { name:"Ryan O.",      role:"Sales Lead → Google APM",           photo:"/avatars/39.jpg", color1:"#0284C7", color2:"#7DD3FC", quote:"I was going to accept their first number. Zari ran me through the negotiation three times and told me exactly what to say when they pushed back. Walked away $28K above their opening offer. That's not nothing.", highlights:["$28K above their opening offer"] },
  { name:"Tanya W.",     role:"Analyst → Product, Meta",           photo:"/avatars/5.jpg",  color1:"#4361EE", color2:"#6EE7B7", quote:"STAR scoring showed me exactly which word to cut and why. I've read the STAR method a hundred times. No one ever made it this specific before. The Meta panel felt easy.", highlights:["exactly which word to cut and why"] },
  { name:"Divya N.",     role:"QA Lead → PM, Microsoft",           photo:"/avatars/6.jpg",  color1:"#DC2626", color2:"#FECACA", quote:"I had 6 years of experience and couldn't get past Stripe's first round. Zari watched me answer and said: 'You're describing tasks, not decisions.' Over four sessions I stopped walking through timelines and started explaining tradeoffs. Passed their loop on the next attempt. Group PM offer, $40K above their initial number.", highlights:["$40K above their initial number"] },
  { name:"Leo B.",       role:"Junior → Mid SWE, Airbnb",          photo:"/avatars/40.jpg", color1:"#0284C7", color2:"#A5F3FC", quote:"No idea how to talk about side projects in interviews. Zari showed me how to frame them as real product experience — not 'I built a thing,' but 'I solved this problem for these users with these tradeoffs.' Used that framing in the Airbnb loop. Got the offer.", highlights:["Got the offer"] },
  { name:"Nina S.",      role:"CS grad → Figma PM",                photo:"/avatars/7.jpg",  color1:"#7C3AED", color2:"#F9A8D4", quote:"New grad, terrified of every interview. Zari coached me session by session and genuinely made me feel ready. By the time I walked into Figma's loop I wasn't nervous at all. Offer above band. First job out of school and I already negotiated.", highlights:["Offer above band"] },
  { name:"Omar A.",      role:"Consultant → Uber Strategy",        photo:"/avatars/41.jpg", color1:"#059669", color2:"#86EFAC", quote:"Every piece of advice was specific to my exact situation. Not a playbook. Not generic frameworks. It felt like talking to someone who had been through my specific transition. That combination is genuinely rare.", highlights:["specific to my exact situation"] },
  { name:"Jess M.",      role:"SDR → RevOps PM, Salesforce",       photo:"/avatars/8.jpg",  color1:"#D97706", color2:"#FDE68A", quote:"Zari told me I was leaving money on the table. I countered to $148K. They said yes immediately. I almost left $18K behind because I was too scared to ask. Never again.", highlights:["I countered to $148K", "almost left $18K behind"] },
  { name:"Dev P.",       role:"EM → Director, Snowflake",          photo:"/avatars/42.jpg", color1:"#4361EE", color2:"#BAE6FD", quote:"Not 'be more strategic.' Actual specific things to do in the next two weeks to close the gap to Director. I've worked with coaches who charged 10x this. None were this concrete.", highlights:["Actual specific things to do"] },
  { name:"Fatoumata K.", role:"Ops Manager → LinkedIn PM",         photo:"/avatars/9.jpg",  color1:"#DC2626", color2:"#FCA5A5", quote:"Every recruiter told me I wasn't 'product enough.' I started to believe it. Zari spent two sessions repositioning 5 years of ops work as product intuition — not a liability. Then we drilled every version of 'why are you switching' until I stopped hedging. LinkedIn's final round had 4 back-to-back PM interviews. I'd already done all of them with Zari. I came out feeling like I'd done it before. I had.", highlights:["I came out feeling like I'd done it before"] },
  { name:"Chris Y.",     role:"Senior PM → Staff PM, Notion",      photo:"/avatars/43.jpg", color1:"#0284C7", color2:"#67E8F9", quote:"LinkedIn profile views went from 3 per week to 19 per week. Just from the headline rewrite. Nothing else changed on my profile. I didn't even think that kind of change was real.", highlights:["3 per week to 19 per week"] },
  { name:"Aisha T.",     role:"Customer Success → PM, HubSpot",    photo:"/avatars/10.jpg", color1:"#7C3AED", color2:"#DDD6FE", quote:"My whole career people told me I wasn't technical enough for PM. Zari helped me reframe customer insight as a competitive advantage, not a gap. HubSpot's hiring manager used the word 'rare' in my debrief. That's entirely Zari.", highlights:["'rare' in my debrief"] },
  { name:"Patrick H.",   role:"Sr PM → Group PM, Stripe",          photo:"/avatars/44.jpg", color1:"#0284C7", color2:"#BAE6FD", quote:"Zari pushed me to counter twice. Most people stop at one. I felt weird about it — Zari said do it anyway. Ended up $22K above their 'final' offer. There is no final offer.", highlights:["$22K above their 'final' offer"] },
  { name:"Tom F.",       role:"Principal PM → Director, Databricks",photo:"/avatars/45.jpg", color1:"#D97706", color2:"#FEF3C7", quote:"My directs told me I was running standups differently before I mentioned Zari to anyone on the team. I thought I was already doing fine. I wasn't.", highlights:["running standups differently"] },
  { name:"Grace K.",     role:"MBA → PM, Coinbase",                photo:"/avatars/11.jpg", color1:"#4361EE", color2:"#A5B4FC", quote:"No product experience — just an MBA and some class projects. Zari built a narrative out of that which Coinbase actually bought. I did not think this was going to work. It worked.", highlights:["Coinbase actually bought"] },
  { name:"Ivan M.",      role:"IC5 → IC6, Amazon",                 photo:"/avatars/46.jpg", color1:"#059669", color2:"#6EE7B7", quote:"Amazon's leadership principles are brutal to prep for alone. Zari knew them better than I did and drilled me until I stopped saying 'we' and started saying 'I.' That was the entire problem. It sounds obvious. It took me 2 years to see it.", highlights:["stopped saying 'we' and started saying 'I'"] },
  { name:"Layla P.",     role:"Marketing → Growth PM, Canva",      photo:"/avatars/12.jpg", color1:"#7C3AED", color2:"#F3E8FF", quote:"I thought the career change was too big of a jump. Zari mapped my marketing work to PM skills one by one and showed me I was already doing half the job. Canva's loop felt like a conversation, not a test.", highlights:["already doing half the job"] },
  { name:"Sam W.",       role:"SRE → Staff Infra PM, Cloudflare",  photo:"/avatars/47.jpg", color1:"#0284C7", color2:"#E0F2FE", quote:"Two years trying to make the SRE to PM pivot. Every rejection said 'not enough product thinking.' Zari ran me through a product case and dissected every answer — not brutally, specifically. By session 3 I was structuring problems differently. By session 5 I had a Staff PM offer at Cloudflare.", highlights:["Staff PM offer at Cloudflare"] },
  { name:"Zoe H.",       role:"IC → Manager, Airbnb",              photo:"/avatars/13.jpg", color1:"#DC2626", color2:"#FEE2E2", quote:"Not 'act more like a leader.' Specific behaviors to change in the next 30 days. Specific conversations to have that week. I've never gotten feedback that precise from a manager, a coach, or anyone. It worked immediately.", highlights:["Specific behaviors to change in the next 30 days"] },
  { name:"Femi A.",      role:"PM → Senior PM, Twitter/X",         photo:"/avatars/48.jpg", color1:"#4361EE", color2:"#EDE9FE", quote:"Zari stopped me mid-answer and said 'that's three separate stories — pick one.' I'd been cramming everything in and wondering why interviewers looked checked out. That one note changed how I talk about my work. Permanently.", highlights:["that's three separate stories — pick one"] },
  { name:"Aria J.",      role:"L5 → L6, Google",                   photo:"/avatars/14.jpg", color1:"#059669", color2:"#D1FAE5", quote:"Failed two promo cycles. My manager's feedback felt like nothing. Zari mapped who the actual decision-makers were and what they respond to. Third cycle: approved in the first committee review. I was genuinely stunned.", highlights:["approved in the first committee review"] },
  { name:"Carlos R.",    role:"Tech Lead → Engineering Manager",    photo:"/avatars/49.jpg", color1:"#7C3AED", color2:"#E9D5FF", quote:"Going from IC to manager is an identity shift, not a skill upgrade. Zari prepared me for the actual hard part — the ambiguous conversations, the politics, the moments where being right doesn't matter. Most coaching completely misses that layer.", highlights:["identity shift, not a skill upgrade"] },
  { name:"Ethan C.",     role:"CSM → PM, Intercom",                photo:"/avatars/50.jpg", color1:"#0284C7", color2:"#BFDBFE", quote:"Five rejections before Zari. One after. The fix was embarrassingly simple — I was leading every answer with features, not customer problems. Zari spotted it in the first five minutes.", highlights:["Five rejections before Zari. One after."] },
  { name:"Kenji T.",     role:"Senior SWE → Staff, Slack",         photo:"/avatars/51.jpg", color1:"#4361EE", color2:"#C7D2FE", quote:"Staff promo requires you to argue org impact, not personal output. That's a completely different argument and nobody tells you that. Zari coached me on that language until I could make it naturally. Slack approved me first cycle.", highlights:["Slack approved me first cycle"] },
  { name:"Nadia F.",     role:"COO → Advisor & Board",             photo:"/avatars/15.jpg", color1:"#DC2626", color2:"#FECACA", quote:"At my level it's about board positioning and governance language. Zari understood that immediately — no onboarding, no explaining the context. Helped me write a bio that's opened three board conversations I genuinely wouldn't have gotten otherwise.", highlights:["three board conversations"] },
  { name:"Tyler G.",     role:"Product Analyst → PM, Spotify",     photo:"/avatars/52.jpg", color1:"#059669", color2:"#A7F3D0", quote:"Zari had already run me through every question type Spotify uses. By the time I was in the actual interview, it felt like a repeat. One of twelve finalists. Got the offer. I walked out knowing I'd earned it.", highlights:["felt like a repeat", "Got the offer"] },
  { name:"Rashida M.",   role:"UX Researcher → PM, Figma",         photo:"/avatars/16.jpg", color1:"#7C3AED", color2:"#DDD6FE", quote:"My research background was invisible on my resume. Zari rewrote one bullet and it changed everything — positioned my research as exactly the product intuition Figma looks for. That bullet is now how I open every interview.", highlights:["one bullet and it changed everything"] },
  { name:"Will N.",      role:"L4 → L5 SWE, Apple",                photo:"/avatars/53.jpg", color1:"#0284C7", color2:"#E0F2FE", quote:"Apple's promotion criteria are deliberately opaque. Zari mapped my existing work to the actual rubric they use and identified 3 specific gaps. I closed all 3. Promoted 7 months in.", highlights:["Promoted 7 months in"] },
  { name:"Mo K.",        role:"SWE → EM, Plaid",                   photo:"/avatars/54.jpg", color1:"#DC2626", color2:"#FCA5A5", quote:"'How would you handle a low performer?' used to terrify me cold. Zari made me answer it 8 different ways until I had a real answer I actually believed. By the actual Plaid interview I was annoyed they didn't ask harder questions.", highlights:["annoyed they didn't ask harder questions"] },
  { name:"Amara O.",     role:"Strategy → Chief of Staff, Lyft",   photo:"/avatars/17.jpg", color1:"#D97706", color2:"#FEF3C7", quote:"Salary coaching paid for itself in the first hour. Zari walked me through exactly what leverage I had and how to use it without burning goodwill. Left $30K above their opening number.", highlights:["$30K above their opening number"] },
  { name:"Lena H.",      role:"Mid PM → Sr PM, Linear",            photo:"/avatars/18.jpg", color1:"#4361EE", color2:"#C7D2FE", quote:"LinkedIn rewrite took one session. 45 minutes. Inbound recruiter messages doubled in a week. I genuinely thought all the 'optimize your LinkedIn' advice was overrated. It's not.", highlights:["recruiter messages doubled in a week"] },
  { name:"Aaron T.",     role:"IC3 → IC4 SWE, Meta",               photo:"/avatars/55.jpg", color1:"#7C3AED", color2:"#EDE9FE", quote:"Failed promo twice. Zari showed me I was building impressive things that didn't matter to the promo committee. Completely redirected my focus for 3 months. Third attempt: approved. First time this process hasn't felt like a lottery.", highlights:["Third attempt: approved"] },
  { name:"Jake S.",      role:"Sales Eng → Solutions PM, Twilio",  photo:"/avatars/56.jpg", color1:"#4361EE", color2:"#A5B4FC", quote:"Five rounds at Twilio. I debriefed with Zari after every single one and adjusted my approach each time. Never felt like I was guessing what they wanted. That level of in-process coaching is completely different from anything I'd done before.", highlights:["Never felt like I was guessing"] },
  { name:"Ingrid A.",    role:"Business Analyst → PM, Adyen",      photo:"/avatars/19.jpg", color1:"#059669", color2:"#BBF7D0", quote:"New industry, new country, same CV that wasn't working. Zari helped me build one coherent story out of two very different career chapters. Amsterdam hired me in 3 weeks. I thought this transition would take years.", highlights:["Amsterdam hired me in 3 weeks"] },
  { name:"Tolu B.",      role:"Chemical Eng → Data PM, Palantir",  photo:"/avatars/57.jpg", color1:"#D97706", color2:"#FCD34D", quote:"My engineering background looked irrelevant to product teams. Zari reframed it as 'complexity tolerance' — the ability to reason clearly about hard, ambiguous systems. Palantir called that a differentiator in my debrief. It became my opening line.", highlights:["Palantir called that a differentiator"] },
  { name:"Rachel M.",    role:"Head of CS → VP Success, Rippling", photo:"/avatars/20.jpg", color1:"#4361EE", color2:"#A5B4FC", quote:"Rippling's VP loop is structured and intense. Zari prepped me on the written exec summary they actually send candidates — I had it ready and polished before the round even started. Offer in 3 weeks.", highlights:["Offer in 3 weeks"] },
  { name:"Kwame D.",     role:"IC6 → IC7 SWE, Google",             photo:"/avatars/58.jpg", color1:"#059669", color2:"#D1FAE5", quote:"L7 at Google is about org impact, not individual output. That is a completely different argument and the jump feels impossible until someone maps it for you. Zari coached me on that language until it stopped feeling forced. Passed calibration on first attempt.", highlights:["Passed calibration on first attempt"] },
  { name:"Sean P.",      role:"SWE → Technical PM, Vercel",        photo:"/avatars/59.jpg", color1:"#0284C7", color2:"#BFDBFE", quote:"Zari taught me how to show genuine excitement without giving away my leverage in negotiation. Counter-intuitive but effective. Came out $18K higher at a company I genuinely wanted to work at.", highlights:["$18K higher"] },
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
              {/* Avatar + name */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{
                  width:44, height:44, borderRadius:"50%", flexShrink:0,
                  background:`url(${r.photo}) center/cover, linear-gradient(135deg,${r.color1},${r.color2})`,
                }} />
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
