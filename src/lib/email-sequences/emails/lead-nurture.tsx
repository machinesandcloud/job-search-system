import * as React from "react";
import { Text, Section } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, StatRow, p, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

export function LeadNurture1({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="Most job searches fail in the first 3 weeks — here's why" headline="Most job searches fail in the first 3 weeks." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        Not because candidates are underqualified. Not because the market is too competitive.
        Because they're doing the same thing everyone else is doing — and expecting different results.
      </Text>
      <StatRow stats={[
        { value: "75%", label: "resumes rejected by ATS before a human reads them" },
        { value: "6s", label: "average recruiter attention per resume" },
        { value: "3×", label: "more interviews for candidates using AI tools" },
      ]} />
      <Text style={p()}>
        The candidates getting hired right now are using every advantage available — including AI coaching that was unimaginable three years ago.
      </Text>
      <Text style={p()}>
        Zari is your AI career coach. Resume review, LinkedIn optimization, interview prep, career strategy — available 24/7, no appointment. It takes 60 seconds to start, no credit card required.
      </Text>
      <CtaButton href={`${APP}/signup`}>Start my free trial →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function LeadNurture2({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="Your resume summary is probably hurting you" headline="Your resume summary is probably hurting you." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>Quick question — does yours start with anything like this?</Text>
      <Blockquote>
        "Experienced professional with 7+ years seeking a challenging opportunity to leverage my skills in a dynamic environment..."
      </Blockquote>
      <Text style={p()}>
        That sentence — or something nearly identical — appears on hundreds of thousands of resumes. Recruiters have developed a reflex to skip right past it.
      </Text>
      <Text style={p({ fontWeight: "600" })}>The fix: lead with a specific result, not adjectives.</Text>
      <Text style={p()}>
        <strong>Before:</strong> "Results-driven marketing manager with strong communication skills..."
        <br /><br />
        <strong>After:</strong> "Growth marketer who scaled email revenue from $200K → $1.4M at Series B SaaS. Specializing in lifecycle automation and win-back campaigns."
      </Text>
      <Text style={p()}>
        Zari can review your entire resume and give you specific rewrites like this — targeted to your role, not generic advice.
      </Text>
      <CtaButton href={`${APP}/signup`}>Get my resume reviewed free</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function LeadNurture3({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="Your LinkedIn profile is probably invisible to recruiters" headline="Why recruiters can't find your LinkedIn profile." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        LinkedIn has 900 million members. Recruiters search it every day. But the algorithm only surfaces a fraction of profiles for any query — and most people are making three specific mistakes.
      </Text>
      <Section style={{ margin: "20px 0" }}>
        <Step number={1} title="Your headline is too generic">
          Recruiters search by job title. "Creative problem-solver" doesn't appear in anyone's search. "Senior Product Manager — B2B SaaS" does. Your headline is the #1 ranking factor.
        </Step>
        <Step number={2} title="Your Skills section has gaps">
          LinkedIn cross-references your listed skills against active job postings. Missing 3–4 keywords from your target role makes you invisible for those searches.
        </Step>
        <Step number={3} title="You're not posting or engaging">
          Profiles that post or engage weekly rank 2–5× higher in search results — with identical content. The algorithm rewards activity.
        </Step>
      </Section>
      <Text style={p()}>
        Fixing all three takes about 30 minutes if you know exactly what to change. Zari walks you through it, section by section, with specific rewrites for your target role.
      </Text>
      <CtaButton href={`${APP}/signup`}>Optimize my LinkedIn →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function LeadNurture4({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="6 months of nothing. Then 3 offers in 5 weeks." headline="6 months of nothing. Then 3 offers in 5 weeks." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        James is a senior product manager. He spent 6 months applying to 80+ roles the traditional way — near-zero callbacks.
      </Text>
      <Text style={p()}>
        Strong background. Good companies on his resume. Applying to roles he was clearly qualified for. Nothing was working.
      </Text>
      <Divider />
      <Text style={p({ fontWeight: "600" })}>Here's what changed when he started using Zari:</Text>
      <Section style={{ margin: "16px 0" }}>
        <Step number={1} title="Week 1 — Resume rewrite">
          Every bullet point described a responsibility, not a result. Zari rewrote 14 bullets to lead with quantified impact. Callbacks went from 0 to 4 in the first week.
        </Step>
        <Step number={2} title="Week 2 — Interview prep">
          Zari ran a full behavioral mock interview and identified 3 weak answers he kept repeating. He practiced until they were strong.
        </Step>
        <Step number={3} title="Week 5 — 3 offers">
          He accepted one with a $40K salary increase over his previous role.
        </Step>
      </Section>
      <Blockquote>
        His experience hadn't changed. His strategy hadn't changed. The quality of his materials and his preparation had.
      </Blockquote>
      <CtaButton href={`${APP}/signup`}>Start my free trial</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function LeadNurture5({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="93% of candidates make this interview mistake" headline="The interview mistake 93% of candidates make." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        In a study of 1,000 hiring managers, the same answer came up when asked what eliminates candidates fastest:
      </Text>
      <Blockquote>
        "They answered the question I asked — not the question I was trying to ask."
      </Blockquote>
      <Text style={p()}>
        When an interviewer asks <em>"Tell me about a time you dealt with a difficult stakeholder,"</em> they're not looking for a conflict story. They're evaluating your emotional intelligence, your ability to influence without authority, and how you communicate under pressure.
      </Text>
      <Text style={p()}>
        The candidates who get offers answer <em>that</em> question.
      </Text>
      <Text style={p()}>
        Zari's interview prep teaches you to decode questions, structure your answers, and practice in a realistic mock session — with feedback after every response.
      </Text>
      <Text style={muted()}>
        Most people prepare by reading lists of questions. The people who get offers practice by answering out loud, getting feedback, and improving in real time.
      </Text>
      <CtaButton href={`${APP}/signup`}>Practice my interview free →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function LeadNurture6({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="Your free Zari account is ready — here's what it includes" headline="Your free account is waiting." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        I've shared a few strategies over the past couple of weeks. I want to make sure you have the tools to actually use them.
      </Text>
      <Text style={p()}>Here's what you get, free, no credit card:</Text>
      <Section style={{ margin: "16px 0 24px" }}>
        {[
          ["Resume review & rewrite suggestions", "Upload your resume, get specific line-by-line feedback targeted to your role."],
          ["LinkedIn profile analysis", "See exactly what's holding you back in recruiter searches."],
          ["Interview practice sessions", "Mock interviews with real-time feedback."],
          ["Career strategy coaching", "Think through your direction, positioning, and next moves."],
          ["Personalized action plan", "A clear list of what to do next, in order."],
        ].map(([title, desc], i) => (
          <Section key={i} style={{ margin: "0 0 14px" }}>
            <Text style={{ fontFamily: "-apple-system, sans-serif", margin: "0 0 2px", color: colors.text, fontSize: "14px", fontWeight: "600", lineHeight: "1.5" }}>
              {title}
            </Text>
            <Text style={{ fontFamily: "-apple-system, sans-serif", margin: 0, color: colors.muted, fontSize: "13px", lineHeight: "1.6" }}>
              {desc}
            </Text>
          </Section>
        ))}
      </Section>
      <Text style={p()}>
        Zari remembers your background between sessions — every conversation builds on the last. Like having a career coach on call, without the $300/hour price tag.
      </Text>
      <CtaButton href={`${APP}/signup`}>Create my free account →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function LeadNurture7({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="My last email to you" headline="My last email to you." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        I don't want to keep showing up in your inbox if I'm not adding value. So this is my last message.
      </Text>
      <Text style={p()}>But before I go — one final offer.</Text>
      <Text style={p()}>
        Sign up for a free Zari account this week and your first session includes a complete career analysis: resume assessment, LinkedIn positioning review, and target role alignment check.
      </Text>
      <Text style={p()}>
        No upsell pressure. No onboarding forms. Just a clear, honest picture of where you stand and what to do next.
      </Text>
      <Text style={p()}>
        If you're actively job searching — or planning to be in the next 6 months — it's worth 20 minutes.
      </Text>
      <CtaButton href={`${APP}/signup`}>Get my free career analysis →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If now isn't the right time, no worries at all. Good luck out there.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
