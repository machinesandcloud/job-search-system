import * as React from "react";
import { Text, Section } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, p, muted, colors, SITE_URL as APP } from "../base";

export function TrialOnboarding1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="You're on Zari Free. Here's how to get the most from your free credits."
      headline={<>Welcome to Zari{firstName ? `, ${firstName}` : ""}.</>}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        You're on the free plan. You have a small number of credits to explore — enough to see what Zari can do before you decide whether to upgrade.
      </Text>
      <Text style={p({ fontWeight: "600" })}>Here's how to make every credit count:</Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Upload your resume">
          Open a Resume Review session and ask: <em>"Review this for [target role]. What are the 5 changes with the biggest impact on my callback rate?"</em>
        </Step>
        <Step number={2} title="Tell Zari your exact target">
          The more specific the better. "Senior Product Manager at a Series B fintech in NYC" beats "tech job." Specificity equals better coaching.
        </Step>
        <Step number={3} title="Run one complete session">
          Resume, LinkedIn, interview prep, or career strategy — whichever is most urgent right now. Zari will remember everything and build on it each time.
        </Step>
      </Section>
      <Blockquote>
        Before every session, give Zari context upfront — what you're targeting, what's working, what you're stuck on. The more you share, the more targeted the coaching. Don't start cold.
      </Blockquote>
      <CtaButton href={APP}>Start my first session →</CtaButton>
      <Divider />
      <Text style={muted()}>Have a question? Just reply — I read every one.</Text>
      <Signature />
    </Layout>
  );
}

export function TrialOnboarding2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="Your free credits are still waiting — here's the best first move."
      headline="Haven't started yet? Your credits are waiting."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        {firstName ?? "Hey"} — you signed up a couple days ago but haven't run a session yet. Your free credits are still there.
      </Text>
      <Text style={p()}>
        The fastest way to get something useful from them:
      </Text>
      <Blockquote>
        Open a Resume session, paste your resume, and type: "Review this for [your target role]. What are the 5 changes with the biggest impact on my callback rate?"
        <br /><br />
        Most users walk away with specific, actionable rewrites they can implement the same day. Takes about 10 minutes.
      </Blockquote>
      <Text style={p()}>
        That's it. No setup, no form. Just start.
      </Text>
      <CtaButton href={APP}>Use my free credits →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function TrialOnboarding3({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Layout
      preview="The one habit that separates Zari users who get interviews from those who don't."
      headline="The one thing top Zari users do differently."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        Looking at users who go from stuck to multiple interviews in a month — they all do one thing.
      </Text>
      <Text style={p({ fontWeight: "600" })}>They give Zari context before they start.</Text>
      <Text style={p()}>
        Instead of jumping in cold, they open every session with a quick briefing:
      </Text>
      <Blockquote>
        "I'm a [title] with [X years] in [industry]. Targeting [role] at [type of company]. My biggest challenge right now is [obstacle]. Here's my resume: [paste]."
      </Blockquote>
      <Text style={p()}>
        When Zari has that context, every response is targeted to your exact situation — not generic advice that could apply to anyone. The quality difference is significant. Try it in your next session.
      </Text>
      <CtaButton href={APP}>Run a session now →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function TrialOnboarding4({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="A few Zari features most people don't discover on their own."
      headline={<>How's it going{firstName ? `, ${firstName}` : ""}?</>}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        You've had Zari for about a week. Wanted to check in — and make sure you've found a few things most users stumble onto too late.
      </Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Recap sessions">
          After any interview — even a 15-minute phone screen — do a quick debrief with Zari. Walk through what happened. It's one of the highest-value things you can do with a single credit.
        </Step>
        <Step number={2} title="Confidence coaching">
          If you're feeling burnt out or anxious about the process, Zari is genuinely useful here. Not pep talks — practical reframes for specific situations.
        </Step>
        <Step number={3} title="Career strategy mode">
          Use this to think through your long-term positioning, what kind of move to make next, and how to tell your story so the right people see you as the obvious candidate.
        </Step>
      </Section>
      <Text style={p()}>
        If you've been finding the free plan useful and want more depth — Search is $39/mo and Growth is $89/mo. No pressure, but worth knowing if you're mid-search.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>Reply here if there's something specific you're working through. I read every response.</Text>
      <Signature />
    </Layout>
  );
}

export function TrialOnboarding5({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="Free gets you started. Here's what's waiting when you're ready to upgrade."
      headline="Free gets you started. Here's what's on the other side."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        {firstName ?? "Hey"} — the free plan is intentionally limited. Enough to run a session and see what Zari can do. Not enough to run a full job search.
      </Text>
      <Text style={p()}>
        Here's exactly what changes when you upgrade:
      </Text>
      <Section style={{ margin: "24px 0" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr>
              <td style={{ padding: "10px 14px", borderBottom: "2px solid #E5E7EB", color: "#6B7280", fontWeight: "600", fontSize: "12px" }}></td>
              <td style={{ padding: "10px 14px", borderBottom: "2px solid #E5E7EB", color: "#6B7280", fontWeight: "600", fontSize: "12px", textAlign: "center" }}>Free</td>
              <td style={{ padding: "10px 14px", borderBottom: "2px solid #E5E7EB", color: "#6B7280", fontWeight: "600", fontSize: "12px", textAlign: "center" }}>Search — $39/mo</td>
              <td style={{ padding: "10px 14px", borderBottom: `2px solid ${colors.brand}`, color: colors.brand, fontWeight: "700", fontSize: "12px", textAlign: "center" }}>Growth — $89/mo</td>
            </tr>
          </thead>
          <tbody>
            {[
              ["Sessions", "Very limited", "Unlimited", "Unlimited"],
              ["Session depth", "Basic", "Full context", "Extended depth"],
              ["Resume reviews", "Limited", "✓", "✓"],
              ["Interview prep", "Limited", "✓", "✓"],
              ["Memory across sessions", "✓", "✓", "✓"],
              ["Priority support", "—", "—", "✓"],
            ].map(([feature, free, search, growth], i) => (
              <tr key={i}>
                <td style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", color: "#111827", fontWeight: "500" }}>{feature}</td>
                <td style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", color: "#9CA3AF", textAlign: "center" }}>{free}</td>
                <td style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", color: "#6B7280", textAlign: "center" }}>{search}</td>
                <td style={{ padding: "11px 14px", borderBottom: `1px solid ${colors.brandLight}`, color: colors.brand, fontWeight: "600", textAlign: "center", backgroundColor: "#FAFAFA" }}>{growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <Text style={p()}>
        Most people upgrade after their first real session. The depth difference is immediately obvious when you're deep in interview prep or building out a resume.
      </Text>
      <CtaButton href={`${APP}/billing`}>Upgrade my account →</CtaButton>
      <Divider />
      <Text style={muted()}>Questions about which plan fits your situation? Just reply.</Text>
      <Signature />
    </Layout>
  );
}

export function TrialEnding1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="Your free credits are running low. Here's how to keep going."
      headline="Your free credits are almost up."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        {firstName ?? "Hey"} — you're close to the limit of your free credits.
      </Text>
      <Text style={p()}>
        When they run out, you won't lose anything. Your history, your resume context, everything Zari has learned about you — it's all saved. You just won't be able to run new sessions until you pick a plan.
      </Text>
      <Text style={p()}>
        If you're in an active search right now, this isn't the moment to pause. Search is $39/mo — it takes 60 seconds to upgrade and your sessions continue uninterrupted.
      </Text>
      <CtaButton href={`${APP}/billing`}>Choose a plan →</CtaButton>
      <Divider />
      <Text style={muted()}>Not ready to upgrade? That's fine — your account stays open and your data is preserved. You can come back whenever you're ready.</Text>
      <Signature />
    </Layout>
  );
}

export function TrialEnding2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="You've hit your free limit. Here's how to keep going."
      headline="You've hit your free limit."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        {firstName ?? "Hey"} — you've used your free Zari credits. To keep running sessions, you'll need to pick a plan.
      </Text>
      <Text style={p()}>
        Your data is all still there. Everything Zari knows about your background, your target role, and your search is saved. You're not starting over.
      </Text>
      <Text style={p()}>
        Two options:
      </Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Search — $39/mo">
          Unlimited sessions, full session depth, memory across everything. Best for candidates actively applying and interviewing.
        </Step>
        <Step number={2} title="Growth — $89/mo">
          Everything in Search, plus extended session depth for longer, more complex conversations — ideal if you're doing deep interview prep or navigating a career pivot.
        </Step>
      </Section>
      <Text style={p()}>
        One good interview outcome pays for months of the subscription. The math is straightforward.
      </Text>
      <CtaButton href={`${APP}/billing`}>Pick a plan and continue →</CtaButton>
      <Signature />
    </Layout>
  );
}
