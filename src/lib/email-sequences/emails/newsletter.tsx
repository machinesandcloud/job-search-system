import * as React from "react";
import { Text, Section, Hr, Link } from "@react-email/components";
import { Layout, CtaButton, Signature, Divider, colors, font, p, h2, muted } from "../base";

// ─── Monthly rotating content ──────────────────────────────────────────────────

const EDITIONS: Array<{
  badge: string;
  headline: React.ReactNode;
  tip: { title: string; body: string };
  feature: { name: string; body: string; cta: string };
  story: { name: string; role: string; quote: string; stat: string };
}> = [
  {
    badge: "January",
    headline: "Your LinkedIn headline is losing you recruiter views.",
    tip: {
      title: "The one rewrite that changes everything.",
      body: "Most LinkedIn headlines are job titles. 'Senior Product Manager at Acme Corp.' That's a name badge, not a pitch. Recruiters search for outcomes, not roles. A headline like 'PM who ships B2B products from 0→1 · ex-Stripe · SaaS growth' tells them exactly who you are and who should hire you. Rewrite yours today — it's the highest-leverage 15 minutes you'll spend on your search.",
    },
    feature: {
      name: "LinkedIn Optimizer",
      body: "Zari rewrites your headline, about section, and bullets for recruiter search — then scores your profile visibility before and after. Most users see a 2–3× jump in profile views within a week.",
      cta: "Optimize your LinkedIn",
    },
    story: {
      name: "Chris Y.",
      role: "Senior PM → Staff PM, Notion",
      quote: "LinkedIn views went from 2 to 22 per week. Just the headline. Nothing else changed.",
      stat: "11× more recruiter views",
    },
  },
  {
    badge: "February",
    headline: "The STAR mistake that kills 80% of behavioral interviews.",
    tip: {
      title: "You're describing tasks. You should be describing decisions.",
      body: "STAR answers fail when the Result is a metric with no context. '↑ revenue 20%' means nothing if the interviewer doesn't know the baseline or your role in it. What they're actually scoring: what you chose, why you chose it, and what you'd do differently. One sentence on the tradeoff you made is worth more than three bullets of output. Before your next interview, take your three best stories and add one sentence each: 'The thing I chose not to do was…'",
    },
    feature: {
      name: "Interview Coach",
      body: "Zari scores your answers live on six dimensions — situation clarity, decision quality, result impact, leadership signal, communication, and self-awareness. Every answer gets a debrief with exactly what to change.",
      cta: "Practice your interview answers",
    },
    story: {
      name: "Divya N.",
      role: "QA Lead → PM, Microsoft",
      quote: "I was presenting tasks, not decisions. Over four sessions, Zari rebuilt how I talk about my work. Group PM offer, $40K above their first number.",
      stat: "$40K above first offer",
    },
  },
  {
    badge: "March",
    headline: "How to position for a promotion before the cycle opens.",
    tip: {
      title: "Promo cycles aren't won during the review. They're won 3 months before.",
      body: "By the time your manager is writing your review, the decision is already made. The work happens now: getting your name in the right conversations, building a case document your manager can forward to their skip-level, and closing the gaps your rubric actually cares about. Find out what 'ready for the next level' means to the decision-maker in your org — not your manager's guess, their actual words. Then write two or three sentences that prove you're already there.",
    },
    feature: {
      name: "Promotion Coaching",
      body: "Zari builds your promotion narrative from your real work, runs manager conversation simulations, and maps your evidence to the rubric criteria that matter. It also preps you for the skip-level conversation most people don't see coming.",
      cta: "Build your promotion case",
    },
    story: {
      name: "Aria J.",
      role: "L5 → L6, Google",
      quote: "Two failed promo cycles. Zari mapped the deciders and what they respond to. Third cycle: approved first round.",
      stat: "Promoted on the third cycle",
    },
  },
  {
    badge: "April",
    headline: "One change that makes recruiters respond.",
    tip: {
      title: "Your outreach message is about you. It should be about them.",
      body: "Most cold recruiter messages fail because they lead with 'I'm looking for a new role' — which puts all the work on the recruiter. A message that converts leads with specific relevance: 'I saw you're scaling the platform team after the Series B — I've built infra at similar inflection points at X and Y.' Two sentences, specific, about their problem. Your background comes second. The rule: if your message could be copy-pasted to any recruiter, it will get no response from this one.",
    },
    feature: {
      name: "Resume Review",
      body: "Zari reads your resume against a specific job description and rewrites every bullet for maximum recruiter signal — ATS keywords, impact framing, and the one line that makes a hiring manager want to read the rest.",
      cta: "Optimize your resume",
    },
    story: {
      name: "Daniel K.",
      role: "Ops Lead → Shopify PM",
      quote: "4 callbacks in one week after the resume session. Zero traction to two final rounds simultaneously.",
      stat: "4 callbacks in one week",
    },
  },
  {
    badge: "May",
    headline: "Why your first counter in a negotiation matters more than your last.",
    tip: {
      title: "The anchor you set on day one shapes every number after it.",
      body: "Most people accept the first number or counter once. The research is clear: whoever anchors high first extracts more value, even when both sides know what's happening. When you get an offer, your first counter should be 15–20% above the number you actually want — not because you expect to get it, but because it moves the midpoint of the negotiation in your favor. Then say nothing after you name your number. Silence isn't aggression. It's leverage.",
    },
    feature: {
      name: "Salary Negotiation",
      body: "Zari runs negotiation simulations with realistic pushback, gives you counter-offer language you can use word-for-word, and benchmarks your target against real market data for your role and level.",
      cta: "Practice your negotiation",
    },
    story: {
      name: "Ryan O.",
      role: "Sales Lead → Google APM",
      quote: "Zari ran the negotiation sim with me until it stopped feeling scary. Walked away $28K above their opening offer.",
      stat: "$28K above opening offer",
    },
  },
  {
    badge: "June",
    headline: "Mid-year: the searches that don't start in June don't close in Q3.",
    tip: {
      title: "The best time to start is now. The second best time was January.",
      body: "Q3 is historically the strongest hiring quarter for tech and product roles — budgets are confirmed, teams know their headcount, and Q4 freezes haven't started. But most job searches take 8–12 weeks from first application to offer. If you haven't started yet, mid-June is the inflection point. Start with your resume and LinkedIn — those two things gate every inbound and outbound move you'll make. Getting them right takes a few hours and changes the entire search.",
    },
    feature: {
      name: "Voice Coach",
      body: "Zari remembers every session and builds on what you've worked on. Tell it where you are — active search, passive, just starting — and it adapts the coaching to your exact situation. No onboarding form, no setup.",
      cta: "Start your search coaching",
    },
    story: {
      name: "Aaliyah R.",
      role: "Data Scientist → Stripe",
      quote: "I went from zero callbacks to three senior roles at once. The difference wasn't effort. It was learning how to tell the right story.",
      stat: "3 senior-level offers",
    },
  },
  {
    badge: "July",
    headline: "The question that reveals whether you'll get an offer.",
    tip: {
      title: "What questions do you have for us?",
      body: "The single most underestimated part of every interview. Most people ask about culture, roadmap, or growth opportunities — safe questions that signal no real research and zero conviction. The question that consistently moves candidates from shortlist to offer: 'What does success look like for this role in the first 90 days — and what usually gets in the way?' It shows strategic thinking, invites them to sell you, and gives you real signal about the role. Ask one great question. It's worth more than five good answers.",
    },
    feature: {
      name: "Interview Coach",
      body: "Zari preps you for panel interviews, behavioral rounds, and case interviews — and also coaches your questions to ask, your close, and how to handle the 'what are your weaknesses?' trap.",
      cta: "Prep your next interview",
    },
    story: {
      name: "Tyler G.",
      role: "Product Analyst → PM, Spotify",
      quote: "One of twelve Spotify finalists. Zari had run me through every question type they use. It felt like I'd already done the interview.",
      stat: "Spotify offer, 1 of 12 finalists",
    },
  },
  {
    badge: "August",
    headline: "How to write a resume bullet that clears ATS and still reads like a human wrote it.",
    tip: {
      title: "The formula that works: Action + Scope + Result + Context.",
      body: "ATS systems score keyword density. Humans score whether they believe you. Most bullets fail one or the other. The structure that clears both: start with a strong verb (Led, Reduced, Built — not 'Responsible for'), add the scope (team size, budget, system scale), the result (metric, timeframe), and one word of context that tells them why it was hard. 'Reduced API latency 40% across 12 services by migrating from synchronous polling to event-driven architecture, cutting p99 from 800ms to 90ms.' Specific, scannable, credible.",
    },
    feature: {
      name: "Resume Review",
      body: "Zari rewrites bullets line by line using this exact framework — then shows you the before/after ATS score and explains every change. Most users see their score jump 20–35 points on the first session.",
      cta: "Rewrite your resume bullets",
    },
    story: {
      name: "Priya M.",
      role: "PM → Senior PM, Notion",
      quote: "Zari told me exactly what was wrong with my resume. Not vague feedback — line by line. Uncomfortable but it worked.",
      stat: "Senior PM offer at Notion",
    },
  },
  {
    badge: "September",
    headline: "Q4 hiring surge starts now. Here's how to get ahead of it.",
    tip: {
      title: "September applications close Q4 offers.",
      body: "Most candidates wait until October to apply for Q4 roles. The ones who get offers applied in September — before the surge, before the competition thickened, before the best hiring managers had full pipelines. Start your applications now. The process takes 6–10 weeks. If you want an offer before year-end, your first applications need to go in this week. Even if you're not fully ready, being in the pipeline now beats being perfect in November.",
    },
    feature: {
      name: "Voice Coach",
      body: "Session memory means Zari picks up exactly where you left off — whether you're updating your materials, prepping for a specific company, or working through a promotion case. No recap needed.",
      cta: "Pick up where you left off",
    },
    story: {
      name: "Ingrid A.",
      role: "Business Analyst → PM, Adyen",
      quote: "New industry, new country, same CV. Zari helped me tell one coherent story instead of two confused ones. Amsterdam hired me in 3 weeks.",
      stat: "Hired in 3 weeks",
    },
  },
  {
    badge: "October",
    headline: "The 'tell me about yourself' answer that works at every level.",
    tip: {
      title: "Four sentences. That's it.",
      body: "The structure: (1) Where you started and where you are now — one sentence. (2) The thread that connects your career — the consistent thing you do, regardless of title. (3) What you've been building toward — the reason you're in this conversation. (4) What you're looking for in your next role — specific enough to show conviction. Most people ramble for three minutes. Four precise sentences takes 60 seconds, leaves them wanting more, and signals that you actually prepared. That's the entire point of the question.",
    },
    feature: {
      name: "Interview Coach",
      body: "Zari runs your 'tell me about yourself' answer through its full scoring framework — clarity, narrative arc, confidence signal, and how it sets up the rest of the interview. You'll know exactly what to change before the call.",
      cta: "Nail your opener",
    },
    story: {
      name: "Jake S.",
      role: "Sales Eng → Solutions PM, Twilio",
      quote: "Five rounds at Twilio. Debriefed with Zari after every one and adjusted. Never felt like I was guessing.",
      stat: "Twilio offer, 5 rounds",
    },
  },
  {
    badge: "November",
    headline: "Year-end review prep: document your impact before the conversation.",
    tip: {
      title: "The review conversation is too late to build your case.",
      body: "Performance reviews are decided in the weeks before they're written. By the time you're sitting across from your manager, they've already formed a view. Your job in November is to proactively feed them the narrative — a short doc (5–7 bullets, one page) with your biggest impact moments from the year, tied to business outcomes, not activity. Email it to your manager as 'prep for our upcoming review conversation.' It gets read. It shapes their memory. It becomes the review.",
    },
    feature: {
      name: "Promotion Coaching",
      body: "Zari helps you draft your impact document — surfacing the right proof from your work history, tying each item to the outcomes your company actually measures, and preparing you for the pushback questions your manager will ask.",
      cta: "Draft your impact doc",
    },
    story: {
      name: "Marcus J.",
      role: "Backend Eng → Staff Eng",
      quote: "Been Senior for 4 years with zero movement. One month with Zari and I finally had the story. Promoted in 5 months.",
      stat: "Promoted in 5 months",
    },
  },
  {
    badge: "December",
    headline: "How to use Q4 downtime to get Q1 offers.",
    tip: {
      title: "Most people go quiet in December. That's your opening.",
      body: "Hiring slows down in December but it doesn't stop. Hiring managers are still meeting candidates, still making decisions, still starting processes for January roles. The candidates who land Q1 offers are the ones who applied in late November and December — not January. Use the slower pace to your advantage: update your materials, reach out to your network while everyone is in a reflective, year-end mood, and get your applications in before the January surge where you'll compete with every other person who waited.",
    },
    feature: {
      name: "Resume Review",
      body: "Zari's full resume workflow — ATS scan, line-by-line bullet rewrites, keyword gap analysis against your target roles, and a downloadable optimized version — takes about 45 minutes. Perfect for the quieter weeks ahead.",
      cta: "Update your resume now",
    },
    story: {
      name: "Rachel M.",
      role: "Head of CS → VP Success, Rippling",
      quote: "Rippling's VP loop is structured and intense. Zari helped me prep the written exec summary they actually asked for. Offer in 3 weeks.",
      stat: "VP offer in 3 weeks",
    },
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

interface NewsletterProps {
  firstName?: string;
  monthIndex: number; // 0–11
  monthLabel: string; // e.g. "May 2026"
  unsubscribeUrl: string;
  dashboardUrl: string;
}

export function NewsletterMonthly({
  firstName,
  monthIndex,
  monthLabel,
  unsubscribeUrl,
  dashboardUrl,
}: NewsletterProps) {
  const ed = EDITIONS[monthIndex % 12];
  const greeting = firstName ? `Hey ${firstName},` : "Hey,";

  return (
    <Layout
      preview={`${ed.badge} · ${ed.headline}`}
      badge={`Zari Career Dispatch · ${monthLabel}`}
      headline={ed.headline}
      unsubscribeUrl={unsubscribeUrl}
    >
      {/* Greeting */}
      <Text style={p()}>{greeting}</Text>

      {/* ── Featured tip ── */}
      <Text style={h2()}>{ed.tip.title}</Text>
      <Text style={p()}>{ed.tip.body}</Text>

      <Divider />

      {/* ── Success story ── */}
      <Text style={h2({ marginBottom: 6 })}>This month&rsquo;s story.</Text>
      <Section style={{
        backgroundColor: colors.brandLight,
        borderLeft: `4px solid ${colors.brand}`,
        borderRadius: "0 8px 8px 0",
        padding: "18px 20px",
        margin: "0 0 20px",
      }}>
        <Text style={{
          fontFamily: font,
          margin: "0 0 10px",
          color: colors.body,
          fontSize: "15px",
          lineHeight: "1.7",
          fontStyle: "italic",
          letterSpacing: "-0.042px",
        }}>
          &ldquo;{ed.story.quote}&rdquo;
        </Text>
        <Text style={{
          fontFamily: font,
          margin: "0 0 4px",
          color: colors.text,
          fontSize: "13px",
          fontWeight: "700",
          lineHeight: "1.4",
        }}>
          {ed.story.name} · {ed.story.role}
        </Text>
        <Text style={{
          fontFamily: font,
          margin: 0,
          color: colors.brand,
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "0.02em",
          textTransform: "uppercase" as const,
        }}>
          {ed.story.stat}
        </Text>
      </Section>

      <Divider />

      {/* ── Feature spotlight ── */}
      <Text style={h2()}>Worth trying this month: {ed.feature.name}.</Text>
      <Text style={p()}>{ed.feature.body}</Text>

      <CtaButton href={dashboardUrl}>{ed.feature.cta} →</CtaButton>

      {/* ── Closing ── */}
      <Text style={muted({ marginTop: 32 })}>
        As always — reply to this if you have a question, a story, or feedback. I read every one.
      </Text>
      <Text style={muted()}>
        If your situation changed and you no longer want these,{" "}
        <Link href={unsubscribeUrl} style={{ color: colors.muted, textDecoration: "underline" }}>
          unsubscribe here
        </Link>
        .
      </Text>

      <Signature name="Steve" title="Founder, Zari" />
    </Layout>
  );
}
