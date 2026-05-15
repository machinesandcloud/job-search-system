import * as React from "react";
import { Text, Section } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, StatRow, p, h2, muted } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Win Back 30 — First touch ────────────────────────────────────────────────
export function WinBack30({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="It's been 30 days. Here's what's changed at Zari." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>It's been a month. A lot has changed.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been about 30 days since you were last active on Zari.
      </Text>
      <Text style={p()}>
        I'm not writing to pitch you. I'm writing because we've shipped several improvements, and the experience is genuinely better now.
      </Text>
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Longer session memory">
          Zari now retains significantly more context within a single conversation — deeper, more coherent coaching without repetition.
        </Step>
        <Step number={2} title="Improved interview mode">
          More realistic questions, better feedback structure, and the ability to drill down on specific answer weaknesses.
        </Step>
        <Step number={3} title="Career strategy mode">
          A mode specifically for big-picture thinking — pivots, positioning, long-term trajectory — not just tactical prep.
        </Step>
      </Section>
      <Text style={p()}>
        Your account and everything Zari learned about you is still saved. If the search is still active — or about to be — you can pick up exactly where you left off.
      </Text>
      <CtaButton href={APP}>Come back to Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>If you've moved on and landed something — genuinely happy for you. Reply and let me know.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Win Back 60 — Social proof ───────────────────────────────────────────────
export function WinBack60({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Two months out. Here's what Zari users are doing right now." unsubscribeUrl={unsubscribeUrl}>
      <StatRow stats={[
        { value: "68%", label: "land interviews within 6 weeks" },
        { value: "2.4×", label: "avg callback increase after resume review" },
        { value: "41 days", label: "avg time-to-offer for consistent users" },
      ]} />
      <Text style={h2()}>Two months out. Still searching?</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been about 60 days. I don't know where your search stands, but if it's still open, here's what we're seeing from users who are active right now.
      </Text>
      <Blockquote>
        Users who fell off and came back with a specific problem — "my resume isn't converting," "I'm getting to round 3 but no offer" — and worked through it in 2-3 sessions tend to break their stall within 2-3 weeks.
      </Blockquote>
      <Text style={p()}>
        The job market rewards specificity and relentlessness. If there's a particular bottleneck — applications, interviews, salary negotiation — Zari can help you identify and fix it.
      </Text>
      <Text style={p()}>
        Your account is still there, with everything intact. Come back and tell Zari where you're stuck.
      </Text>
      <CtaButton href={APP}>Pick up where I left off →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Win Back 90 — Final attempt ──────────────────────────────────────────────
export function WinBack90({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="My last email. No pitch — just one honest note." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Three months. My last reach-out.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been 90 days. This is my last email.
      </Text>
      <Text style={p()}>
        I'm not going to pitch you. Either the timing isn't right, you've moved on, or Zari just wasn't what you needed. All of those are completely valid.
      </Text>
      <Text style={p()}>
        If you ever come back to an active search — whether it's next month or next year — your account is here. Everything Zari knows about you is saved. Just log in and pick up exactly where you left off.
      </Text>
      <Text style={p()}>
        One last thing: if there's a reason Zari didn't work for you — something specific that frustrated you or felt off — I'd genuinely want to hear it. Not to convince you to stay. Just because it helps us build a better product.
      </Text>
      <Text style={p()}>
        Reply if you're up for it. And if not — good luck with everything.
      </Text>
      <Divider />
      <Text style={muted()}>This is the last email you'll receive from us. If you ever want to return, just log in — no re-enrollment needed.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
