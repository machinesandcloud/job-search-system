import * as React from "react";
import { Text, Row, Column, Section } from "@react-email/components";
import { Layout, CtaButton, Highlight, Step, Divider, Signature, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Trial Onboarding 1 — Welcome ─────────────────────────────────────────────
export function TrialOnboarding1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  const name = firstName ? `, ${firstName}` : "";
  return (
    <Layout preview="Your AI career coach is set up and ready. Here's how to get the most from it." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Welcome to Zari{name}. 🎉</Text>
      <Text style={p()}>
        Your account is live. You now have access to an AI career coach that's available 24/7, remembers your background, and gets sharper every time you use it.
      </Text>
      <Text style={p({ fontWeight: "700" })}>Here's what I'd do in your first 10 minutes:</Text>
      <Section style={{ margin: "20px 0" }}>
        <Row><Column><Step number={1} title="Upload your resume">
          Start a Resume Review session, upload your current resume, and ask: <em>"Review this for [target role] and give me the 5 changes with the biggest impact on callbacks."</em>
        </Step></Column></Row>
        <Row><Column><Step number={2} title="Tell Zari your target role">
          The more specific the better. "Senior Software Engineer at a Series B startup in NYC" beats "tech job." Specificity = better coaching.
        </Step></Column></Row>
        <Row><Column><Step number={3} title="Run one full session">
          Resume, LinkedIn, interview, or career strategy — whichever is most urgent right now. The AI will remember everything and build on it next time.
        </Step></Column></Row>
      </Section>
      <Highlight variant="tip">
        <strong>Power tip:</strong> Before every session, give Zari your context upfront. What you're targeting, what's working, and what you're stuck on. The more you share, the more specific the coaching.
      </Highlight>
      <CtaButton href={APP}>Start my first session →</CtaButton>
      <Divider />
      <Text style={muted()}>
        Have a question? Just reply to this email — I read every one.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Trial Onboarding 2 — Nudge ───────────────────────────────────────────────
export function TrialOnboarding2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  const name = firstName ? `, ${firstName}` : "";
  return (
    <Layout preview="Still getting started? Here's the fastest path to your first Zari session." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Not sure where to start{name}?</Text>
      <Text style={p()}>
        You signed up a couple days ago — wanted to check in and see if you've had a chance to run your first session.
      </Text>
      <Text style={p()}>
        If you're not sure where to begin, here's the most-used entry point for new Zari users:
      </Text>
      <Highlight>
        <strong>The 20-Minute Resume Sprint</strong><br /><br />
        Open a Resume session, paste your resume, and type:<br />
        <em style={{ color: colors.muted }}>"Review this for [your target role]. What are the 5 changes with the biggest impact on my callback rate?"</em><br /><br />
        Most users walk away with specific, actionable rewrites they can implement immediately.
      </Highlight>
      <Text style={p()}>
        That's it. No setup, no form to fill out. Just start talking.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Trial Onboarding 3 — Power tip ──────────────────────────────────────────
export function TrialOnboarding3({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="The one habit that separates Zari users who get interviews from those who don't." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>The one thing top Zari users do differently.</Text>
      <Text style={p()}>Looking at our most successful users — the ones who go from stuck to 3 interviews in a month — they all do one thing:</Text>
      <Highlight variant="tip">
        <strong>They give Zari context before they start.</strong>
      </Highlight>
      <Text style={p()}>
        Instead of jumping in cold, they open every session with a quick briefing:
      </Text>
      <Highlight variant="quote">
        <em>"I'm a [title] with [X years] in [industry]. Targeting [role] at [type of company]. My biggest challenge right now is [obstacle]. Here's my resume: [paste]."</em>
      </Highlight>
      <Text style={p()}>
        When Zari has that context, every response is targeted to your exact situation — not generic templates that could apply to anyone.
      </Text>
      <Text style={p()}>
        The difference in quality is significant. Try it in your next session.
      </Text>
      <CtaButton href={APP}>Run a session now →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Trial Onboarding 4 — Check-in ───────────────────────────────────────────
export function TrialOnboarding4({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="How's the job search going? A few things to try if you're stuck." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>How's it going, {firstName ?? "there"}?</Text>
      <Text style={p()}>
        You've had Zari for about a week. I wanted to check in — how's the search going?
      </Text>
      <Text style={p()}>
        Whatever stage you're at, here are a few things most users don't discover on their own:
      </Text>
      <Section style={{ margin: "20px 0" }}>
        {[
          ["Recap sessions", "After an interview — even a phone screen — do a 10-minute debrief with Zari. Walk through what happened. It helps you improve faster than any other practice method."],
          ["Confidence coaching", "If you're feeling burnt out or anxious about the process, Zari is genuinely helpful here. Not just pep talks — practical reframes."],
          ["Career strategy mode", "Not just tactics. Use this to think through your long-term positioning, what kind of move to make next, and how to tell your story."],
        ].map(([title, desc], i) => (
          <Row key={i} style={{ marginBottom: "16px" }}>
            <Column style={{ width: "24px", verticalAlign: "top", paddingTop: "4px" }}>
              <span style={{ color: colors.brand, fontSize: "16px", fontWeight: "700" }}>→</span>
            </Column>
            <Column style={{ paddingLeft: "8px" }}>
              <Text style={{ margin: "0 0 4px", color: colors.text, fontSize: "15px", fontWeight: "600" }}>{title}</Text>
              <Text style={{ margin: 0, color: colors.muted, fontSize: "14px", lineHeight: "1.6" }}>{desc}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>Reply here if there's something specific you're working through. I read every response.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Trial Onboarding 5 — Upgrade push ───────────────────────────────────────
export function TrialOnboarding5({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your trial ends tomorrow. Here's what you'd be keeping." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Your trial ends tomorrow.</Text>
      <Text style={p()}>
        {firstName ? `${firstName}, your` : "Your"} free trial ends in 24 hours.
      </Text>
      <Text style={p()}>
        Everything Zari has learned about your background, your target role, and your job search is saved to your account. Upgrading keeps all of it — plus unlocks significantly more session depth.
      </Text>
      <Section style={{ margin: "24px 0" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <td style={{ padding: "10px 16px", backgroundColor: "#F8FAFC", fontSize: "12px", fontWeight: "700", color: colors.muted, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #E2E8F0" }}></td>
              <td style={{ padding: "10px 16px", backgroundColor: "#F8FAFC", fontSize: "12px", fontWeight: "700", color: colors.muted, textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center", borderBottom: "1px solid #E2E8F0" }}>Free</td>
              <td style={{ padding: "10px 16px", backgroundColor: "#EEF2FF", fontSize: "12px", fontWeight: "700", color: colors.brand, textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center", borderBottom: "1px solid #C7D2FE" }}>Search — $39/mo</td>
            </tr>
          </thead>
          <tbody>
            {[
              ["Resume reviews", "Limited", "Unlimited"],
              ["Interview sessions", "Limited", "Unlimited"],
              ["Session depth", "Basic", "Full context"],
              ["Career strategy", "✓", "✓"],
              ["Memory across sessions", "✓", "✓"],
            ].map(([feature, free, paid], i) => (
              <tr key={i}>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: colors.text, borderBottom: "1px solid #F1F5F9" }}>{feature}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: colors.muted, textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{free}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: colors.brand, fontWeight: "600", textAlign: "center", backgroundColor: "#F5F3FF", borderBottom: "1px solid #E0E7FF" }}>{paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <Text style={p()}>
        Most users tell us one good interview outcome pays for months of the subscription. The ROI is straightforward.
      </Text>
      <CtaButton href={`${APP}/billing`}>Upgrade my account →</CtaButton>
      <Divider />
      <Text style={muted()}>Questions about plans? Just reply — happy to help you figure out the right fit.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Trial Ending 1 — 3 days ──────────────────────────────────────────────────
export function TrialEnding1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="3 days left on your trial — here's what to do now" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Your trial ends in 3 days.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — just a heads-up that your free Zari trial ends in 3 days.
      </Text>
      <Text style={p()}>
        If you haven't run a session yet, now's the time. You have 3 full days to use everything — resume review, LinkedIn coaching, interview prep, career strategy — completely free.
      </Text>
      <Text style={p()}>
        After your trial, you can upgrade to keep your full access. The Search plan is $39/month. Or keep a free account with limited sessions — your history stays either way.
      </Text>
      <CtaButton href={`${APP}/billing`}>Upgrade before it ends →</CtaButton>
      <Divider />
      <Text style={muted()}>No pressure. But if you're mid-search, dropping from full access to limited right now isn't ideal timing.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Trial Ending 2 — Final day ───────────────────────────────────────────────
export function TrialEnding2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Last day of your Zari trial — don't lose your session history" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Today is your last day.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — your Zari trial ends today.
      </Text>
      <Highlight>
        Everything Zari knows about you — your resume, your target role, your coaching history — is saved to your account. Upgrading keeps it all intact. If your trial lapses and you come back later, you start from scratch.
      </Highlight>
      <Text style={p()}>
        Search plan is $39/month. Cancel anytime. It takes 60 seconds.
      </Text>
      <CtaButton href={`${APP}/billing`}>Keep my account active →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
