import * as React from "react";
import { Text, Row, Column, Section } from "@react-email/components";
import { Layout, CtaButton, Highlight, Step, Divider, Signature, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Non-starter 1 — 48h nudge ────────────────────────────────────────────────
export function NonStarter1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="You signed up but haven't started yet — here's the fastest way in." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>You haven't started yet.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you signed up for Zari 2 days ago but haven't run a session yet. I wanted to check in.
      </Text>
      <Text style={p()}>
        I know there's always something more urgent. But if you're actively job searching — or planning to be — every week you wait is a week of momentum you're not building.
      </Text>
      <Highlight variant="tip">
        <strong>The fastest way to start:</strong><br /><br />
        Don't overthink it. Open Zari, paste your resume, and type:<br /><br />
        <em style={{ color: colors.muted }}>"Review this resume for [your target role]. What are the 3 things most likely to get it rejected, and how do I fix them?"</em><br /><br />
        That's 10 minutes, and you'll walk away with something you can act on today.
      </Highlight>
      <CtaButton href={APP}>Start my first session →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If something about the signup process felt confusing, reply here. I'll sort it out directly.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Non-starter 2 — 5-day "what's stopping you" ─────────────────────────────
export function NonStarter2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Quick question: what's stopping you from using Zari?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>What's holding you back?</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — I'll be direct. You've been signed up for almost a week and haven't started. I'm genuinely curious why.
      </Text>
      <Text style={p()}>
        Is it one of these?
      </Text>
      <Section style={{ margin: "20px 0" }}>
        {[
          ["Not sure where to start", `That's the most common one. Start here: open Zari → Resume Review → paste your resume → ask for the top 5 changes that would improve your callback rate. Done in 15 minutes.`],
          ["Not actively searching right now", `That's fine. But if you're planning to search in the next 6 months, now is actually the best time to get your materials ready — before the urgency kicks in.`],
          ["Wasn't sure it would actually be useful", `Fair skepticism. Run one session and form your own view. If it's not genuinely useful, cancel within the trial — no charge.`],
        ].map(([title, desc], i) => (
          <Row key={i} style={{ marginBottom: "20px" }}>
            <Column style={{ width: "28px", verticalAlign: "top", paddingTop: "4px" }}>
              <span style={{ color: colors.brand, fontSize: "16px", fontWeight: "700" }}>→</span>
            </Column>
            <Column style={{ paddingLeft: "10px" }}>
              <Text style={{ margin: "0 0 4px", color: colors.text, fontSize: "15px", fontWeight: "600" }}>{title}</Text>
              <Text style={{ margin: 0, color: colors.muted, fontSize: "14px", lineHeight: "1.6" }}>{desc}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <Text style={p()}>
        Or reply here and tell me what's actually going on. I read every response and I'll help you figure out the right starting point.
      </Text>
      <CtaButton href={APP}>Open Zari now →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Non-starter 3 — 10-day final push ───────────────────────────────────────
export function NonStarter3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your free trial ends soon — use it or lose it." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Your trial is almost over — and you haven't used it yet.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — your free trial ends soon. You haven't run a session yet.
      </Text>
      <Text style={p()}>
        I'm not going to oversell it. If you don't find it useful, cancel. No hard feelings.
      </Text>
      <Text style={p()}>
        But you signed up for a reason. Whatever that reason was — a job search, an upcoming interview, a career transition — it's still worth 20 minutes of your time to see if Zari can actually help.
      </Text>
      <Highlight>
        <strong>Before your trial ends:</strong> Run one complete session. Resume review, interview prep, LinkedIn — whichever is most relevant right now. If it doesn't deliver something useful within that session, it's not for you.
      </Highlight>
      <CtaButton href={APP}>Use my trial →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If you've decided Zari isn't right for you, you can cancel from billing settings. No questions asked.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Feature activation 1 — Recap sessions ────────────────────────────────────
export function FeatureActivation1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="The Zari feature that compounds over time — most users miss it entirely." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>The feature that makes every future session better.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've run a few sessions with Zari. I want to make sure you've found this one.
      </Text>
      <Highlight>
        <strong>Recap Sessions.</strong><br /><br />
        After any interview — a phone screen, a panel, a technical round — open a Recap session and walk Zari through exactly what happened. What you were asked. How you answered. What felt off.<br /><br />
        Zari analyzes your performance, identifies patterns in your weak answers, and helps you tighten them before the next round.
      </Highlight>
      <Text style={p()}>
        The compounding effect is real. Candidates who debrief after every interview improve measurably faster than those who prep in isolation. The feedback loop is what makes the difference.
      </Text>
      <Text style={p()}>
        Next time you have a call — even a 15-minute recruiter screen — try it. 10 minutes of debrief now is worth 2 hours of prep later.
      </Text>
      <CtaButton href={APP}>Try a Recap session →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Feature activation 2 — Negotiation ──────────────────────────────────────
export function FeatureActivation2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Most people leave $10K–$30K on the table in salary negotiations. Here's how not to." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>The conversation most candidates don't prepare for.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — interviews get all the prep attention. But salary negotiation is where most people lose the most money, and it's also the most underprepared conversation in the job search.
      </Text>
      <Section style={{ margin: "20px 0" }}>
        {[
          ["The anchoring problem", "Most candidates accept the first number. The data is clear: simply making a counteroffer — politely, with reasoning — results in higher offers 85% of the time."],
          ["The research gap", "Negotiating without knowing your market value is negotiating blind. Zari can pull comp data for your role, level, and location in minutes."],
          ["The script problem", "Most people know they should negotiate. They just don't know what to say. Zari runs you through the exact conversation — what to say, how to handle pushback, when to hold."],
        ].map(([title, desc], i) => (
          <Row key={i} style={{ marginBottom: "16px" }}>
            <Column style={{ width: "28px", verticalAlign: "top", paddingTop: "4px" }}>
              <span style={{ color: colors.warning, fontSize: "16px" }}>→</span>
            </Column>
            <Column style={{ paddingLeft: "10px" }}>
              <Text style={{ margin: "0 0 3px", color: colors.text, fontSize: "15px", fontWeight: "600" }}>{title}</Text>
              <Text style={{ margin: 0, color: colors.muted, fontSize: "14px", lineHeight: "1.6" }}>{desc}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <Text style={p()}>
        Even if you're not at the offer stage yet — run a negotiation sim now. Practice once with no stakes, and you'll walk into the real conversation completely differently.
      </Text>
      <CtaButton href={APP}>Run a negotiation sim →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Feature activation 3 — Career strategy ───────────────────────────────────
export function FeatureActivation3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Beyond the job search — using Zari to think through your bigger career move." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>The question most job seekers don't ask until it's too late.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — there's a question that's worth asking before you land the next role:
      </Text>
      <Highlight variant="quote">
        <em>"Is the next job actually moving me toward where I want to be in 5 years — or just sideways?"</em>
      </Highlight>
      <Text style={p()}>
        Most people optimize for "get out of current situation" without stress-testing whether the target role is actually the right move. They land something, stay 18 months, and start the search again.
      </Text>
      <Text style={p()}>
        Zari's Career Strategy mode is built for this. It's not tactical prep — it's big-picture thinking. Your positioning, your narrative, the type of move that makes sense for where you want to end up, and how to tell your story in a way that makes interviewers see you as the obvious choice.
      </Text>
      <Text style={p()}>
        Open a Career Strategy session and tell Zari where you're trying to get. The conversation is different from anything else in the product.
      </Text>
      <CtaButton href={APP}>Open Career Strategy →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Referral ask ─────────────────────────────────────────────────────────────
export function ReferralAsk({ firstName, referralUrl, unsubscribeUrl }: { firstName?: string; referralUrl: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Get one month free — just share Zari with one person who's job searching." unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#0D1117", borderRadius: "12px", padding: "24px 32px", margin: "0 0 28px", textAlign: "center" }}>
        <Text style={{ margin: 0, color: "#FFFFFF", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.5px" }}>
          Give a month. Get a month. ✦
        </Text>
        <Text style={{ margin: "8px 0 0", color: "#94A3B8", fontSize: "15px" }}>
          Share Zari with one person. You both win.
        </Text>
      </Section>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been using Zari for a while now, and I wanted to offer something back.
      </Text>
      <Text style={p()}>
        If you know someone who's currently job searching — or about to be — share Zari with them. When they sign up and start a trial using your link:
      </Text>
      <Section style={{ margin: "20px 0" }}>
        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ width: "28px", verticalAlign: "top", paddingTop: "4px" }}>
            <span style={{ color: colors.success, fontSize: "18px", fontWeight: "700" }}>✓</span>
          </Column>
          <Column style={{ paddingLeft: "10px" }}>
            <Text style={{ margin: 0, color: colors.text, fontSize: "15px" }}>
              <strong>They get:</strong> 14 days free instead of 7 — double the trial to actually see results.
            </Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ width: "28px", verticalAlign: "top", paddingTop: "4px" }}>
            <span style={{ color: colors.success, fontSize: "18px", fontWeight: "700" }}>✓</span>
          </Column>
          <Column style={{ paddingLeft: "10px" }}>
            <Text style={{ margin: 0, color: colors.text, fontSize: "15px" }}>
              <strong>You get:</strong> One free month added to your subscription automatically.
            </Text>
          </Column>
        </Row>
      </Section>
      <Highlight variant="tip">
        <strong>Your referral link:</strong><br />
        <span style={{ color: colors.brand, fontSize: "14px" }}>{referralUrl}</span><br /><br />
        Copy it, text it, email it. If you know someone stuck in a job search right now, it's worth 30 seconds of your time.
      </Highlight>
      <CtaButton href={referralUrl}>Share my referral link →</CtaButton>
      <Divider />
      <Text style={muted()}>Referral credits are added automatically once your friend's trial converts to a paid plan.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Testimonial ask ──────────────────────────────────────────────────────────
export function TestimonialAsk({ firstName, testimonialUrl, unsubscribeUrl }: { firstName?: string; testimonialUrl: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="45 days in — would you share what Zari's been like for you?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>You've been using Zari for 45 days.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been with us long enough to have a real opinion. I have one question:
      </Text>
      <Text style={p({ fontWeight: "700", fontSize: "18px" })}>
        Would you be willing to share what Zari's been like for you?
      </Text>
      <Text style={p()}>
        Not a formal review — just a few sentences about what you've been using it for and whether it's been worth it. Something like what you'd tell a friend who asked.
      </Text>
      <Text style={p()}>
        These testimonials are what help other job seekers decide whether to try Zari. They're more valuable to us than any ad we could run — because people trust other people, not marketing copy.
      </Text>
      <Highlight variant="tip">
        Takes about 2 minutes. No prompts, no forms — just tell us what's been true for you.
      </Highlight>
      <CtaButton href={testimonialUrl}>Share my experience →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If the experience hasn't been what you expected, reply here instead. I genuinely want to know — it's how we get better.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Annual upsell ────────────────────────────────────────────────────────────
export function AnnualUpsell({ firstName, planName, monthlyPrice, annualMonthlyPrice, annualUrl, unsubscribeUrl }: {
  firstName?: string;
  planName: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  annualUrl: string;
  unsubscribeUrl: string;
}) {
  const savings = (monthlyPrice - annualMonthlyPrice) * 12;
  return (
    <Layout preview={`You've been on Zari for 3 months — switching to annual saves you $${savings}.`} unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Three months in. Want to lock in a better rate?</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been on Zari {planName} for about 3 months. If it's been useful, there's a straightforward way to save money on it.
      </Text>
      <Section style={{ margin: "28px 0" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "16px 20px", backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px 10px 0 0" }}>
                <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                  <tr>
                    <td>
                      <div style={{ fontSize: "13px", color: colors.muted, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Current plan</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: colors.text, marginTop: "4px" }}>${monthlyPrice}/month · billed monthly</div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "22px", fontWeight: "800", color: colors.muted }}>${monthlyPrice * 12}/yr</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "16px 20px", backgroundColor: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: "0 0 10px 10px" }}>
                <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                  <tr>
                    <td>
                      <div style={{ fontSize: "13px", color: colors.brand, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Annual plan</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: colors.text, marginTop: "4px" }}>${annualMonthlyPrice}/month · billed annually</div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "22px", fontWeight: "800", color: colors.brand }}>${annualMonthlyPrice * 12}/yr</div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: colors.success }}>Save ${savings}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
      <Text style={p()}>
        The annual plan is the same product — same sessions, same depth, same everything. Just a better price for people who are committed to the search.
      </Text>
      <Text style={p()}>
        Your current billing period is preserved — you'll be credited for any unused time when you switch.
      </Text>
      <CtaButton href={annualUrl}>Switch to annual →</CtaButton>
      <Divider />
      <Text style={muted()}>Questions about billing or switching? Reply here.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
