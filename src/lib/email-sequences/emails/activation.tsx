import * as React from "react";
import { Text, Section } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, p, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

export function NonStarter1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="You signed up but haven't started — here's the fastest way in." headline="You haven't started yet." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you signed up for Zari 2 days ago but haven't run a session yet. Wanted to check in.
      </Text>
      <Text style={p()}>
        I know there's always something more urgent. But if you're actively job searching — or planning to be — every week you wait is a week of momentum you're not building.
      </Text>
      <Text style={p({ fontWeight: "600" })}>The fastest way to start:</Text>
      <Blockquote>
        Don't overthink it. Open Zari, paste your resume, and type: "Review this for [your target role]. What are the 3 things most likely to get it rejected, and how do I fix them?" That's 10 minutes, and you'll walk away with something you can act on today.
      </Blockquote>
      <CtaButton href={APP}>Start my first session →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If something about the signup process felt confusing, reply here. I'll sort it out directly.
      </Text>
      <Signature />
    </Layout>
  );
}

export function NonStarter2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Quick question: what's stopping you from using Zari?" headline="What's holding you back?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — I'll be direct. You've been signed up for almost a week and haven't started. I'm genuinely curious why.
      </Text>
      <Text style={p()}>Is it one of these?</Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Not sure where to start">
          Start here: open Zari → Resume Review → paste your resume → ask for the top 5 changes that would improve your callback rate. Done in 15 minutes.
        </Step>
        <Step number={2} title="Not actively searching right now">
          That's fine. But if you're planning to search in the next 6 months, now is the best time to get your materials ready — before the urgency kicks in.
        </Step>
        <Step number={3} title="Wasn't sure it would actually be useful">
          Fair skepticism. Run one session and form your own view. If it's not genuinely useful, cancel within the trial — no charge.
        </Step>
      </Section>
      <Text style={p()}>
        Or reply here and tell me what's actually going on. I read every response and I'll help you figure out the right starting point.
      </Text>
      <CtaButton href={APP}>Open Zari now →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function NonStarter3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your free trial ends soon — use it before it's gone." headline="Your trial is almost over — and you haven't used it yet." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — your free trial ends soon. You haven't run a session yet.
      </Text>
      <Text style={p()}>
        I'm not going to oversell it. If you don't find it useful, cancel. No hard feelings.
      </Text>
      <Text style={p()}>
        But you signed up for a reason. Whatever that reason was — a job search, an upcoming interview, a career transition — it's worth 20 minutes of your time to see if Zari can actually help.
      </Text>
      <Text style={p()}>
        Run one complete session before your trial ends. Resume review, interview prep, LinkedIn — whichever is most relevant right now. If it doesn't deliver something useful within that session, it's not for you.
      </Text>
      <CtaButton href={APP}>Use my trial →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If you've decided Zari isn't right for you, you can cancel from billing settings. No questions asked.
      </Text>
      <Signature />
    </Layout>
  );
}

export function FeatureActivation1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="The Zari feature that compounds over time — most users miss it entirely." headline="The feature that makes every future session better." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've run a few sessions with Zari. I want to make sure you've found this one.
      </Text>
      <Text style={p({ fontWeight: "600" })}>Recap Sessions.</Text>
      <Text style={p()}>
        After any interview — a phone screen, a panel, a technical round — open a Recap session and walk Zari through exactly what happened. What you were asked. How you answered. What felt off.
      </Text>
      <Text style={p()}>
        Zari analyzes your performance, identifies patterns in your weak answers, and helps you tighten them before the next round.
      </Text>
      <Text style={p()}>
        The compounding effect is real. Candidates who debrief after every interview improve measurably faster than those who prep in isolation. The feedback loop is what makes the difference.
      </Text>
      <Text style={p()}>
        Next time you have a call — even a 15-minute recruiter screen — try it. 10 minutes of debrief now is worth 2 hours of prep later.
      </Text>
      <CtaButton href={APP}>Try a Recap session →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function FeatureActivation2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Most people leave $10K–$30K on the table in salary negotiations." headline="The conversation most candidates don't prepare for." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — interviews get all the prep attention. But salary negotiation is where most people lose the most money, and it's the most underprepared conversation in the job search.
      </Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="The anchoring problem">
          Most candidates accept the first number. Simply making a counteroffer — politely, with reasoning — results in higher offers 85% of the time.
        </Step>
        <Step number={2} title="The research gap">
          Negotiating without knowing your market value is negotiating blind. Zari can surface comp data for your role, level, and location in minutes.
        </Step>
        <Step number={3} title="The script problem">
          Most people know they should negotiate. They just don't know what to say. Zari runs you through the exact conversation — what to say, how to handle pushback, when to hold.
        </Step>
      </Section>
      <Text style={p()}>
        Even if you're not at the offer stage yet — run a negotiation sim now. Practice once with no stakes, and you'll walk into the real conversation completely differently.
      </Text>
      <CtaButton href={APP}>Run a negotiation sim →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function FeatureActivation3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Beyond the job search — using Zari to think through your bigger career move." headline="The question most job seekers don't ask until it's too late." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — there's a question worth asking before you land the next role:
      </Text>
      <Blockquote>
        "Is the next job actually moving me toward where I want to be in 5 years — or just sideways?"
      </Blockquote>
      <Text style={p()}>
        Most people optimize for "get out of current situation" without stress-testing whether the target role is actually the right move. They land something, stay 18 months, and start the search again.
      </Text>
      <Text style={p()}>
        Zari's Career Strategy mode is built for this. It's not tactical prep — it's big-picture thinking. Your positioning, your narrative, the type of move that makes sense for where you want to end up, and how to tell your story so interviewers see you as the obvious choice.
      </Text>
      <Text style={p()}>
        Open a Career Strategy session and tell Zari where you're trying to get. The conversation is different from anything else in the product.
      </Text>
      <CtaButton href={APP}>Open Career Strategy →</CtaButton>
      <Signature />
    </Layout>
  );
}

export function ReferralAsk({ firstName, referralUrl, unsubscribeUrl }: { firstName?: string; referralUrl: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Get one month free — share Zari with one person who's job searching." headline="Give a month. Get a month." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been using Zari for a while now. I wanted to offer something back.
      </Text>
      <Text style={p()}>
        If you know someone who's currently job searching — or about to be — share Zari with them. When they sign up using your link:
      </Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="They get">
          14 days free instead of 7 — double the trial to actually see results.
        </Step>
        <Step number={2} title="You get">
          One free month added to your subscription automatically.
        </Step>
      </Section>
      <Blockquote>
        Your referral link: {referralUrl}
      </Blockquote>
      <Text style={p()}>
        Copy it, text it, email it. If you know someone stuck in a job search right now, it's worth 30 seconds of your time.
      </Text>
      <CtaButton href={referralUrl}>Share my referral link →</CtaButton>
      <Divider />
      <Text style={muted()}>Referral credits are added automatically once your friend's trial converts to a paid plan.</Text>
      <Signature />
    </Layout>
  );
}

export function TestimonialAsk({ firstName, testimonialUrl, unsubscribeUrl }: { firstName?: string; testimonialUrl: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="45 days in — would you share what Zari's been like for you?" headline="You've been using Zari for 45 days." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been with us long enough to have a real opinion. I have one question:
      </Text>
      <Text style={p({ fontWeight: "600", fontSize: "16px" })}>
        Would you be willing to share what Zari's been like for you?
      </Text>
      <Text style={p()}>
        Not a formal review — just a few sentences about what you've been using it for and whether it's been worth it. Something like what you'd tell a friend who asked.
      </Text>
      <Text style={p()}>
        These testimonials are what help other job seekers decide whether to try Zari. They're more valuable than any ad we could run — because people trust other people, not marketing copy.
      </Text>
      <Text style={p()}>
        Takes about 2 minutes. No prompts, no forms — just tell us what's been true for you.
      </Text>
      <CtaButton href={testimonialUrl}>Share my experience →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If the experience hasn't been what you expected, reply here instead. I genuinely want to know — it's how we get better.
      </Text>
      <Signature />
    </Layout>
  );
}

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
    <Layout preview={`You've been on Zari for 3 months — switching to annual saves you $${savings}.`} headline="Three months in. Want to lock in a better rate?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been on Zari {planName} for about 3 months. If it's been useful, there's a simple way to save money on it.
      </Text>
      <Section style={{ margin: "24px 0" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "16px 18px", border: `1px solid ${colors.border}`, borderBottom: "none", borderRadius: "8px 8px 0 0" }}>
                <div style={{ color: colors.muted, fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Current</div>
                <div style={{ color: colors.text, fontSize: "17px", fontWeight: "700" }}>${monthlyPrice}/month · billed monthly</div>
                <div style={{ color: colors.muted, fontSize: "13px", marginTop: "2px" }}>${monthlyPrice * 12} per year</div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "16px 18px", backgroundColor: colors.brandLight, border: `1px solid ${colors.brand}`, borderRadius: "0 0 8px 8px" }}>
                <div style={{ color: colors.brand, fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Annual — save ${savings}</div>
                <div style={{ color: colors.text, fontSize: "17px", fontWeight: "700" }}>${annualMonthlyPrice}/month · billed annually</div>
                <div style={{ color: colors.brand, fontSize: "13px", fontWeight: "600", marginTop: "2px" }}>${annualMonthlyPrice * 12} per year · you save ${savings}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
      <Text style={p()}>
        Same product, same sessions, same depth. Just a better price for people who are committed to the search. Your current billing period is preserved — you'll be credited for any unused time when you switch.
      </Text>
      <CtaButton href={annualUrl}>Switch to annual →</CtaButton>
      <Divider />
      <Text style={muted()}>Questions about billing or switching? Reply here.</Text>
      <Signature />
    </Layout>
  );
}
