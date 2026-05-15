import * as React from "react";
import { Text, Row, Column, Section } from "@react-email/components";
import { Layout, CtaButton, Highlight, Step, Divider, Signature, StatRow, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

function planLabel(tier?: string) {
  return ({ pro: "Search", premium: "Growth", team: "Executive" } as Record<string, string>)[tier ?? ""] ?? "Search";
}

// ─── Paid Welcome 1 ───────────────────────────────────────────────────────────
export function PaidWelcome1({ firstName, planTier, unsubscribeUrl }: { firstName?: string; planTier?: string; unsubscribeUrl: string }) {
  const plan = planLabel(planTier);
  return (
    <Layout preview={`You're in. Welcome to Zari ${plan} — here's everything you've unlocked.`} unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#0D1117", borderRadius: "12px", padding: "24px 32px", margin: "0 0 28px", textAlign: "center" }}>
        <Text style={{ margin: 0, color: "#FFFFFF", fontSize: "32px", fontWeight: "800", letterSpacing: "-1px" }}>
          Welcome to Zari {plan} ✦
        </Text>
        <Text style={{ margin: "8px 0 0", color: "#94A3B8", fontSize: "16px" }}>
          {firstName ? `${firstName}, you` : "You"}'re all set.
        </Text>
      </Section>
      <Text style={p()}>
        Your {plan} plan is active. Here's what you now have access to:
      </Text>
      <Section style={{ margin: "20px 0" }}>
        {[
          ["Unlimited sessions", "Resume, LinkedIn, interview, career strategy, confidence, and recap modes — no caps."],
          ["Full session depth", "Longer, richer conversations with more context retained per session."],
          ["Persistent memory", "Zari builds a detailed model of your background across every session."],
          ["Priority support", "Reply to any email — you're now at the top of the queue."],
        ].map(([title, desc], i) => (
          <Row key={i} style={{ marginBottom: "14px" }}>
            <Column style={{ width: "24px", verticalAlign: "top", paddingTop: "3px" }}>
              <span style={{ color: colors.success, fontSize: "16px", fontWeight: "700" }}>✓</span>
            </Column>
            <Column style={{ paddingLeft: "8px" }}>
              <Text style={{ margin: "0 0 2px", color: colors.text, fontSize: "15px", fontWeight: "600" }}>{title}</Text>
              <Text style={{ margin: 0, color: colors.muted, fontSize: "13px", lineHeight: "1.5" }}>{desc}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <Highlight variant="tip">
        <strong>Best first move:</strong> Spend 30 minutes doing a full resume + LinkedIn review. That context sets the foundation for every future session and makes all the coaching sharper.
      </Highlight>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Paid Welcome 2 — Feature spotlight ───────────────────────────────────────
export function PaidWelcome2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="The Zari feature most people don't find until week 3. Don't wait that long." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>The feature most people discover too late.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been on Zari for a few days. I want to make sure you've found this:
      </Text>
      <Highlight>
        <strong>The Recap Session.</strong><br /><br />
        After any interview — even a 15-minute phone screen — open a Recap session and walk Zari through what happened. What you were asked, how you answered, what felt off.<br /><br />
        Zari analyzes your performance, spots patterns, and helps you tighten your weakest answers before the next round.
      </Highlight>
      <Text style={p()}>
        Users who do this consistently cut their time-to-offer significantly. The compounding effect of improving after every interview is real — and most candidates skip it entirely.
      </Text>
      <Text style={p()}>
        Next time you have a call — even a recruiter screen — try it. 10 minutes of debrief now saves you from making the same mistakes in your final round.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Paid Welcome 3 — Week 1 check-in ────────────────────────────────────────
export function PaidWelcome3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your first week with Zari — quick check-in from the team." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>One week in — how's it going?</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been on Zari for a week. Wanted to check in properly.
      </Text>
      <Text style={p()}>
        Is the coaching landing the way you expected? If there's a specific area where you're not getting the depth you want — interview prep, salary negotiation strategy, LinkedIn, anything — reply here and I'll look into it personally.
      </Text>
      <Divider />
      <Text style={p()}>
        If you're finding Zari genuinely helpful, there's one thing that would mean a lot to us:
      </Text>
      <Highlight variant="tip">
        <strong>Share it with one person.</strong><br /><br />
        If you know someone who's job searching right now, send them a quick message. Word of mouth is how Zari grows — and you'd be doing them a real favor.
      </Highlight>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>Whatever's on your mind — reply here. I read every response.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Milestone: Session 1 ─────────────────────────────────────────────────────
export function Milestone1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="You completed your first Zari session. Here's what to do next." unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "24px 28px", margin: "0 0 28px", textAlign: "center" }}>
        <Text style={{ margin: 0, fontSize: "32px" }}>🎯</Text>
        <Text style={{ margin: "8px 0 0", color: "#15803D", fontSize: "18px", fontWeight: "700" }}>First session complete!</Text>
      </Section>
      <Text style={h2()}>You're already ahead of the curve.</Text>
      <Text style={p()}>
        {firstName ? `${firstName}, most` : "Most"} people sign up for tools like this and never open them. You did. That's not nothing — that's the whole thing.
      </Text>
      <Text style={p({ fontWeight: "700" })}>Here's how to build on it:</Text>
      <Section style={{ margin: "20px 0" }}>
        <Row><Column><Step number={1} title="Implement at least 3 suggestions today">
          While they're fresh. Momentum compounds — the users who act within 24 hours get dramatically better results.
        </Step></Column></Row>
        <Row><Column><Step number={2} title="Schedule your next session">
          Treat it like a gym appointment. Users who do one session a week close faster than users who do 4 sessions in one burst, then nothing.
        </Step></Column></Row>
        <Row><Column><Step number={3} title="Pick your next focus area">
          Resume done? Do LinkedIn next. LinkedIn done? Book a mock interview. One area at a time, in order of impact.
        </Step></Column></Row>
      </Section>
      <CtaButton href={APP}>Start my next session →</CtaButton>
      <Signature name="The Zari Team" />
    </Layout>
  );
}

// ─── Milestone: Session 5 ─────────────────────────────────────────────────────
export function Milestone5({ firstName, planTier, unsubscribeUrl }: { firstName?: string; planTier?: string; unsubscribeUrl: string }) {
  const isBasicPlan = !planTier || planTier === "free" || planTier === "pro";
  return (
    <Layout preview="5 sessions in — you're in the top 15%. Here's what that means." unsubscribeUrl={unsubscribeUrl}>
      <StatRow stats={[
        { value: "5", label: "sessions completed" },
        { value: "Top 15%", label: "of all Zari users" },
        { value: "↑ 3×", label: "avg interview rate vs 0 sessions" },
      ]} />
      <Text style={h2()}>5 sessions. You're doing something right.</Text>
      <Text style={p()}>
        {firstName ?? "You"}'ve completed 5 Zari sessions. That puts you in the top 15% of users by engagement — and the data is clear: more sessions correlate directly with faster job search outcomes.
      </Text>
      <Text style={p()}>
        At this point, Zari has a detailed model of your background, goals, and patterns. Every session from here is sharper than the last.
      </Text>
      {isBasicPlan && (
        <>
          <Divider />
          <Text style={p()}>
            One thing worth flagging: on your current plan, there's a cap on session depth. Users on Growth ($89/mo) get significantly longer, richer conversations per session — which matters when you're deep in a final-round prep or working through a complex pivot.
          </Text>
          <Highlight>
            If you're actively interviewing right now, the upgrade is worth it. The quality difference in session depth is noticeable.
          </Highlight>
          <CtaButton href={`${APP}/billing`}>See Growth plan →</CtaButton>
        </>
      )}
      {!isBasicPlan && (
        <>
          <Text style={p()}>Keep going. The next 5 sessions are where things usually click.</Text>
          <CtaButton href={APP}>Start session 6 →</CtaButton>
        </>
      )}
      <Signature name="The Zari Team" />
    </Layout>
  );
}
