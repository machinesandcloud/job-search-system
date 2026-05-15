import * as React from "react";
import { Text, Section } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, p, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

export function TrialOnboarding1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your AI career coach is ready. Here's how to get the most from it." headline={<>Welcome to Zari{firstName ? `, ${firstName}` : ""}.</>} unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        Your account is live. You now have access to an AI career coach that's available 24/7, remembers your background, and gets sharper every time you use it.
      </Text>
      <Text style={p({ fontWeight: "600" })}>Here's what I'd do in your first 10 minutes:</Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Upload your resume">
          Start a Resume Review session and ask: <em>"Review this for [target role] and give me the 5 changes with the biggest impact on callbacks."</em>
        </Step>
        <Step number={2} title="Tell Zari your target role">
          The more specific the better. "Senior Software Engineer at a Series B startup in NYC" beats "tech job." Specificity equals better coaching.
        </Step>
        <Step number={3} title="Run one full session">
          Resume, LinkedIn, interview, or career strategy — whichever is most urgent. Zari will remember everything and build on it next time.
        </Step>
      </Section>
      <Blockquote>
        Before every session, give Zari your context upfront — what you're targeting, what's working, what you're stuck on. The more you share, the more specific the coaching.
      </Blockquote>
      <CtaButton href={APP}>Start my first session →</CtaButton>
      <Divider />
      <Text style={muted()}>Have a question? Just reply — I read every one.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function TrialOnboarding2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Still getting started? Here's the fastest path to your first session." headline={<>Not sure where to start{firstName ? `, ${firstName}` : ""}?</>} unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        You signed up a couple days ago — wanted to check in and see if you've had a chance to run your first session.
      </Text>
      <Text style={p()}>Here's the most-used entry point for new Zari users:</Text>
      <Blockquote>
        Open a Resume session, paste your resume, and type: "Review this for [your target role]. What are the 5 changes with the biggest impact on my callback rate?"
        <br /><br />
        Most users walk away with specific, actionable rewrites they can implement immediately.
      </Blockquote>
      <Text style={p()}>
        That's it. No setup, no form to fill out. Just start talking.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function TrialOnboarding3({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout preview="The one habit that separates Zari users who get interviews from those who don't." headline="The one thing top Zari users do differently." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        Looking at our most successful users — the ones who go from stuck to 3 interviews in a month — they all do one thing.
      </Text>
      <Text style={p({ fontWeight: "600" })}>They give Zari context before they start.</Text>
      <Text style={p()}>
        Instead of jumping in cold, they open every session with a quick briefing:
      </Text>
      <Blockquote>
        "I'm a [title] with [X years] in [industry]. Targeting [role] at [type of company]. My biggest challenge right now is [obstacle]. Here's my resume: [paste]."
      </Blockquote>
      <Text style={p()}>
        When Zari has that context, every response is targeted to your exact situation — not generic templates that could apply to anyone. The quality difference is significant. Try it in your next session.
      </Text>
      <CtaButton href={APP}>Run a session now →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function TrialOnboarding4({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="How's the job search going? A few things to try if you're stuck." headline={<>How's it going, {firstName ?? "there"}?</>} unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        You've had Zari for about a week. I wanted to check in — how's the search going?
      </Text>
      <Text style={p()}>
        A few things most users don't discover on their own:
      </Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Recap sessions">
          After any interview — even a phone screen — do a 10-minute debrief with Zari. Walk through what happened. It helps you improve faster than any other practice method.
        </Step>
        <Step number={2} title="Confidence coaching">
          If you're feeling burnt out or anxious about the process, Zari is genuinely helpful here. Not just pep talks — practical reframes.
        </Step>
        <Step number={3} title="Career strategy mode">
          Use this to think through your long-term positioning, what kind of move to make next, and how to tell your story.
        </Step>
      </Section>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>Reply here if there's something specific you're working through. I read every response.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function TrialOnboarding5({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your trial ends tomorrow. Here's what you'd be keeping." headline="Your trial ends tomorrow." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ? `${firstName}, your` : "Your"} free trial ends in 24 hours.
      </Text>
      <Text style={p()}>
        Everything Zari has learned about your background, your target role, and your job search is saved to your account. Upgrading keeps all of it — plus unlocks significantly more session depth.
      </Text>
      <Section style={{ margin: "24px 0" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr>
              <td style={{ padding: "10px 14px", borderBottom: "2px solid #E5E7EB", color: "#6B7280", fontWeight: "600", fontSize: "12px" }}></td>
              <td style={{ padding: "10px 14px", borderBottom: "2px solid #E5E7EB", color: "#6B7280", fontWeight: "600", fontSize: "12px", textAlign: "center" }}>Free</td>
              <td style={{ padding: "10px 14px", borderBottom: `2px solid ${colors.brand}`, color: colors.brand, fontWeight: "700", fontSize: "12px", textAlign: "center" }}>Search — $39/mo</td>
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
                <td style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", color: "#111827", fontWeight: "500" }}>{feature}</td>
                <td style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", color: "#9CA3AF", textAlign: "center" }}>{free}</td>
                <td style={{ padding: "11px 14px", borderBottom: `1px solid ${colors.brandLight}`, color: colors.brand, fontWeight: "600", textAlign: "center", backgroundColor: "#FAFAFA" }}>{paid}</td>
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
      <Text style={muted()}>Questions about plans? Just reply — happy to help you find the right fit.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function TrialEnding1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="3 days left on your Zari trial" headline="Your trial ends in 3 days." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — just a heads-up that your free Zari trial ends in 3 days.
      </Text>
      <Text style={p()}>
        If you haven't run a session yet, now is the time. You have 3 full days to use everything — resume review, LinkedIn coaching, interview prep, career strategy — completely free.
      </Text>
      <Text style={p()}>
        After your trial, you can upgrade to keep full access at $39/month. Or stay on the free plan with limited sessions — your history stays either way.
      </Text>
      <CtaButton href={`${APP}/billing`}>Upgrade before it ends →</CtaButton>
      <Divider />
      <Text style={muted()}>No pressure. But if you're mid-search, dropping from full access to limited right now isn't ideal timing.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

export function TrialEnding2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Last day of your Zari trial" headline="Today is your last day." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — your Zari trial ends today.
      </Text>
      <Text style={p()}>
        Everything Zari knows about you — your resume, your target role, your coaching history — is saved to your account. Upgrading keeps it all intact.
      </Text>
      <Text style={p()}>
        Search plan is $39/month. Cancel anytime. It takes 60 seconds.
      </Text>
      <CtaButton href={`${APP}/billing`}>Keep my account active →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
