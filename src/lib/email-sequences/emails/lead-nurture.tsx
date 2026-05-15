import * as React from "react";
import { Text, Row, Column, Section } from "@react-email/components";
import { Layout, CtaButton, Highlight, Step, Divider, Signature, StatRow, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Email 1 — The hook ───────────────────────────────────────────────────────
export function LeadNurture1({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="73% of job seekers give up too early — here's why (and how to avoid it)" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Most job searches fail in the first 3 weeks.</Text>
      <Text style={p()}>
        Not because the candidates are underqualified. Not because the market is too competitive.
        Because they're doing the same thing everyone else is doing — and expecting different results.
      </Text>
      <StatRow stats={[
        { value: "75%", label: "of resumes rejected by ATS before a human reads them" },
        { value: "6s", label: "average recruiter attention per resume" },
        { value: "3×", label: "more interviews for candidates using AI tools" },
      ]} />
      <Text style={p()}>
        The job market rewards preparation and differentiation. The candidates getting hired right now are using every advantage available — including AI coaching that was unimaginable three years ago.
      </Text>
      <Highlight>
        <strong>Zari is your AI career coach</strong> — available 24/7, no appointment needed. Resume review, LinkedIn optimization, interview prep, and career strategy. All in one place.
      </Highlight>
      <Text style={p()}>
        It takes 60 seconds to start. No credit card required.
      </Text>
      <CtaButton href={`${APP}/signup`}>Start my free trial →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Email 2 — Resume tip ─────────────────────────────────────────────────────
export function LeadNurture2({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="The 5-minute resume change that doubled callbacks for 3 of our users this week" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Your resume summary is probably hurting you.</Text>
      <Text style={p()}>Quick question — does yours start with anything like this?</Text>
      <Highlight variant="quote">
        <em style={{ color: colors.muted }}>"Experienced professional with 7+ years seeking a challenging opportunity to leverage my skills in a dynamic environment..."</em>
      </Highlight>
      <Text style={p()}>
        That sentence — or something nearly identical — appears on <strong>hundreds of thousands</strong> of resumes. Recruiters have developed a reflex to skip right past it.
      </Text>
      <Text style={p({ fontWeight: "700", color: colors.text })}>The fix: replace it with a 2-line Value Proposition.</Text>
      <Text style={p()}>Lead with the specific result you delivered, not adjectives about yourself. Like this:</Text>
      <Highlight variant="tip">
        <strong>Before:</strong> "Results-driven marketing manager with strong communication skills..."<br /><br />
        <strong>After:</strong> "Growth marketer who scaled email revenue from $200K → $1.4M at Series B SaaS. Specializing in lifecycle automation and win-back campaigns."
      </Highlight>
      <Text style={p()}>
        That's a resume people stop and read. Zari can review your entire resume and give you specific rewrites like this — not generic advice, but line-by-line edits targeted to your role.
      </Text>
      <CtaButton href={`${APP}/signup`}>Get my resume reviewed free</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Email 3 — LinkedIn ───────────────────────────────────────────────────────
export function LeadNurture3({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="Your LinkedIn profile is probably invisible to recruiters. Here's the 3-part fix." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Why recruiters can't find your LinkedIn profile.</Text>
      <Text style={p()}>
        LinkedIn has 900 million members. Recruiters search it every single day. But the algorithm only surfaces the top fraction of profiles for any query — and most people are doing three things wrong.
      </Text>
      <Section style={{ margin: "28px 0" }}>
        <Row><Column><Step number={1} title="Your headline is too generic">
          Recruiters search by job title. "Creative problem-solver" doesn't appear in anyone's search. "Senior Product Manager — B2B SaaS" does. Your headline is the #1 ranking factor — treat it like a keyword field.
        </Step></Column></Row>
        <Row><Column><Step number={2} title="Your Skills section has gaps">
          LinkedIn cross-references your listed skills against active job postings. Missing 3–4 keywords from your target role? You become invisible for those searches.
        </Step></Column></Row>
        <Row><Column><Step number={3} title="You're not posting or engaging">
          Profiles that post or engage weekly rank 2–5× higher in search results — with identical content. The algorithm rewards activity.
        </Step></Column></Row>
      </Section>
      <Text style={p()}>
        Fixing all three takes about 30 minutes if you know exactly what to change. Zari walks you through it, section by section, with specific rewrites for your target role.
      </Text>
      <CtaButton href={`${APP}/signup`}>Optimize my LinkedIn →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Email 4 — Case study ─────────────────────────────────────────────────────
export function LeadNurture4({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="James: 6 months searching, then 3 offers in 5 weeks. What changed?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>6 months of nothing. Then 3 offers in 5 weeks.</Text>
      <Text style={p()}>
        James is a senior product manager. He spent 6 months applying to 80+ roles the traditional way — near-zero callbacks.
      </Text>
      <Text style={p()}>
        Strong background. Good companies on his resume. Applying to roles he was clearly qualified for. Nothing was working.
      </Text>
      <Divider />
      <Text style={p({ fontWeight: "700" })}>Here's what changed when he started using Zari:</Text>
      <Section style={{ margin: "20px 0" }}>
        <Row><Column><Step number={1} title="Week 1 — Resume rewrite">
          Zari found that every bullet point described a responsibility, not a result. They rewrote 14 bullets to lead with quantified impact. Callbacks went from 0 to 4 in the first week.
        </Step></Column></Row>
        <Row><Column><Step number={2} title="Week 2 — Interview prep">
          He was interviewing for a VP of Product role. Zari ran a full behavioral mock interview and identified 3 weak answers he kept giving. He practiced until they were strong.
        </Step></Column></Row>
        <Row><Column><Step number={3} title="Week 5 — 3 offers">
          He had 3 competing offers and accepted one with a $40K salary increase over his previous role.
        </Step></Column></Row>
      </Section>
      <Highlight variant="tip">
        <strong>The insight:</strong> His experience hadn't changed. His strategy hadn't changed. The quality of his materials and his preparation had.
      </Highlight>
      <CtaButton href={`${APP}/signup`}>Start my free trial</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Email 5 — Interview mistake ──────────────────────────────────────────────
export function LeadNurture5({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="93% of candidates make this interview mistake. Are you one of them?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>The interview mistake 93% of candidates make.</Text>
      <Text style={p()}>
        In a study of 1,000 hiring managers, the same answer came up repeatedly when asked what eliminates candidates fastest:
      </Text>
      <Highlight variant="quote">
        <em>"They answered the question I asked — not the question I was trying to ask."</em>
      </Highlight>
      <Text style={p()}>
        Here's what that means. When an interviewer asks <em>"Tell me about a time you dealt with a difficult stakeholder,"</em> they're not looking for a conflict story.
      </Text>
      <Text style={p()}>
        They're evaluating your <strong>emotional intelligence</strong>, your ability to <strong>influence without authority</strong>, and how you <strong>communicate under pressure</strong>. The candidates who get offers answer <em>that</em> question.
      </Text>
      <Text style={p()}>
        Zari's interview prep teaches you to decode questions, structure your answers, and practice in a realistic mock session — with real feedback after every response.
      </Text>
      <Text style={p({ color: colors.muted, fontSize: "14px" })}>
        Most people prepare by reading lists of questions. The people who get offers practice by answering out loud, getting feedback, and improving in real time.
      </Text>
      <CtaButton href={`${APP}/signup`}>Practice my interview free →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Email 6 — Soft CTA ───────────────────────────────────────────────────────
export function LeadNurture6({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="Your free Zari account is ready — here's everything it includes" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Your free account is waiting.</Text>
      <Text style={p()}>
        I've shared a few strategies over the past couple weeks. I want to make sure you have the tools to actually use them.
      </Text>
      <Text style={p()}>Here's exactly what you get, free, with no credit card:</Text>
      <Section style={{ margin: "20px 0" }}>
        {[
          ["Resume review & rewrite suggestions", "Upload your current resume, get specific line-by-line feedback."],
          ["LinkedIn profile analysis", "See exactly what's holding you back in recruiter searches."],
          ["Interview practice sessions", "Mock interviews with real-time feedback."],
          ["Career strategy coaching", "Think through your direction, positioning, and next moves."],
          ["Personalized action plan", "A clear list of what to do next, in order."],
        ].map(([title, desc], i) => (
          <Row key={i} style={{ marginBottom: "12px" }}>
            <Column style={{ width: "24px", verticalAlign: "top", paddingTop: "3px" }}>
              <span style={{ color: colors.success, fontSize: "16px", fontWeight: "700" }}>✓</span>
            </Column>
            <Column style={{ paddingLeft: "8px" }}>
              <Text style={{ margin: 0, color: colors.text, fontSize: "15px", fontWeight: "600" }}>{title}</Text>
              <Text style={{ margin: "2px 0 0", color: colors.muted, fontSize: "13px" }}>{desc}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <Highlight variant="tip">
        Zari remembers your background between sessions — every conversation builds on the last. It's like having a career coach on call, without the $300/hour price tag.
      </Highlight>
      <CtaButton href={`${APP}/signup`}>Create my free account →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Email 7 — Final ─────────────────────────────────────────────────────────
export function LeadNurture7({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="Last email. One final offer before I stop sending." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>My last email to you.</Text>
      <Text style={p()}>
        I don't want to keep showing up in your inbox if I'm not adding value. So this is my last message.
      </Text>
      <Text style={p()}>
        But before I go — one final offer.
      </Text>
      <Highlight>
        Sign up for a free Zari account this week and your first session includes a <strong>complete career analysis</strong>: resume assessment, LinkedIn positioning review, and target role alignment check.
      </Highlight>
      <Text style={p()}>
        No upsell pressure. No onboarding forms. Just a clear, honest picture of where you stand and exactly what to do next.
      </Text>
      <Text style={p()}>
        If you're actively job searching — or planning to be in the next 6 months — it's worth 20 minutes of your time.
      </Text>
      <CtaButton href={`${APP}/signup`}>Get my free career analysis →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If now isn't the right time, no worries at all. I hope the job search goes well whenever you're ready. Good luck out there. 👋
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
