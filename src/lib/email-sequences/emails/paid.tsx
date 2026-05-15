import * as React from "react";
import { Text, Section } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, StatRow, p, muted, colors, SITE_URL as APP } from "../base";

function planLabel(tier?: string) {
  return ({ pro: "Search", premium: "Growth", team: "Executive" } as Record<string, string>)[tier ?? ""] ?? "Search";
}

export function PaidWelcome1({ firstName, planTier, unsubscribeUrl }: { firstName?: string; planTier?: string; unsubscribeUrl: string }) {
  const plan = planLabel(planTier);
  return (
    <Layout preview={`You're in. Welcome to Zari ${plan}.`} headline={<>You're in. Welcome to Zari {plan}.</>} unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ? `${firstName}, your` : "Your"} {plan} plan is active. Here's what you now have access to:
      </Text>
      <Section style={{ margin: "16px 0 24px" }}>
        {[
          ["Unlimited sessions", "Resume, LinkedIn, interview, career strategy, confidence, and recap modes — no caps."],
          ["Full session depth", "Longer, richer conversations with more context retained per session."],
          ["Persistent memory", "Zari builds a detailed model of your background across every session."],
          ["Priority support", "Reply to any email — you're now at the top of the queue."],
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
      <Blockquote>
        Best first move: spend 30 minutes doing a full resume and LinkedIn review. That context sets the foundation for every future session and makes all the coaching sharper.
      </Blockquote>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function PaidWelcome2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="The Zari feature most people don't find until week 3." headline="The feature most people discover too late." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been on Zari for a few days. I want to make sure you've found this.
      </Text>
      <Text style={p({ fontWeight: "600" })}>The Recap Session.</Text>
      <Text style={p()}>
        After any interview — even a 15-minute phone screen — open a Recap session and walk Zari through what happened. What you were asked, how you answered, what felt off.
      </Text>
      <Text style={p()}>
        Zari analyzes your performance, spots patterns, and helps you tighten your weakest answers before the next round.
      </Text>
      <Text style={p()}>
        Users who do this consistently cut their time-to-offer significantly. The compounding effect of improving after every interview is real — and most candidates skip it entirely.
      </Text>
      <Text style={p()}>
        Next time you have a call — even a recruiter screen — try it. 10 minutes of debrief now saves you from repeating the same mistakes in your final round.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function PaidWelcome3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your first week with Zari — quick check-in." headline="One week in — how's it going?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been on Zari for a week. Wanted to check in properly.
      </Text>
      <Text style={p()}>
        Is the coaching landing the way you expected? If there's a specific area where you're not getting the depth you want — interview prep, salary negotiation, LinkedIn, anything — reply here and I'll look into it personally.
      </Text>
      <Divider />
      <Text style={p()}>
        If you're finding Zari genuinely helpful, there's one thing that would mean a lot:
      </Text>
      <Text style={p()}>
        If you know someone who's job searching right now, send them a message. Word of mouth is how Zari grows — and you'd be doing them a real favor.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>Whatever's on your mind — reply here. I read every response.</Text>
      <Signature />
    </Layout>
  );
}

export function Milestone1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="First session complete. Here's what to do next." headline="First session complete. You're already ahead." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ? `${firstName}, most` : "Most"} people sign up for tools like this and never open them. You did. That's not nothing — that's the whole thing.
      </Text>
      <Text style={p({ fontWeight: "600" })}>Here's how to build on it:</Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Implement at least 3 suggestions today">
          While they're fresh. The users who act within 24 hours get dramatically better results — momentum compounds.
        </Step>
        <Step number={2} title="Schedule your next session">
          Treat it like a gym appointment. Users who do one session a week close faster than users who do 4 in a burst, then nothing.
        </Step>
        <Step number={3} title="Pick your next focus area">
          Resume done? Do LinkedIn next. LinkedIn done? Book a mock interview. One area at a time, in order of impact.
        </Step>
      </Section>
      <CtaButton href={APP}>Start my next session →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function Milestone5({ firstName, planTier, unsubscribeUrl }: { firstName?: string; planTier?: string; unsubscribeUrl: string }) {
  const isBasicPlan = !planTier || planTier === "free" || planTier === "pro";
  return (
    <Layout preview="5 sessions in. You're in the top 15%." headline="5 sessions. You're doing something right." unsubscribeUrl={unsubscribeUrl}>
      <StatRow stats={[
        { value: "5", label: "sessions completed" },
        { value: "Top 15%", label: "of all Zari users" },
        { value: "3×", label: "avg interview rate vs. 0 sessions" },
      ]} />
      <Text style={p()}>
        {firstName ?? "You"}'ve completed 5 Zari sessions. That puts you in the top 15% of users by engagement — and the data is clear: more sessions correlate directly with faster outcomes.
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
          <Blockquote>
            If you're actively interviewing right now, the upgrade is worth it. The quality difference in session depth is noticeable.
          </Blockquote>
          <CtaButton href={`${APP}/billing`}>See Growth plan →</CtaButton>
        </>
      )}
      {!isBasicPlan && (
        <>
          <Text style={p()}>Keep going. The next 5 sessions are where things usually click.</Text>
          <CtaButton href={APP}>Start session 6 →</CtaButton>
        </>
      )}
      <Signature />
    </Layout>
  );
}
