import * as React from "react";
import { Text, Row, Column, Section } from "@react-email/components";
import { Layout, CtaButton, Highlight, Divider, Signature, StatRow, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Win Back 30 — First touch ────────────────────────────────────────────────
export function WinBack30({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="It's been 30 days. Here's what's changed at Zari since you left." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>It's been a month. A lot has changed.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been about 30 days since you were last active on Zari.
      </Text>
      <Text style={p()}>
        I'm not writing to pitch you. I'm writing because we've shipped several improvements since you were last here, and I genuinely think the experience is better now.
      </Text>
      <Section style={{ margin: "20px 0" }}>
        {[
          ["Longer session memory", "Zari now retains significantly more context within a single conversation — meaning deeper, more coherent coaching without repetition."],
          ["Improved interview mode", "More realistic questions, better feedback structure, and the ability to drill down on specific answer weaknesses."],
          ["Career strategy mode", "A new mode specifically for big-picture thinking — pivots, positioning, long-term trajectory — not just tactical prep."],
        ].map(([title, desc], i) => (
          <Row key={i} style={{ marginBottom: "16px" }}>
            <Column style={{ width: "24px", verticalAlign: "top", paddingTop: "4px" }}>
              <span style={{ color: colors.brand, fontSize: "16px", fontWeight: "700" }}>✦</span>
            </Column>
            <Column style={{ paddingLeft: "10px" }}>
              <Text style={{ margin: "0 0 3px", color: colors.text, fontSize: "15px", fontWeight: "600" }}>{title}</Text>
              <Text style={{ margin: 0, color: colors.muted, fontSize: "14px", lineHeight: "1.6" }}>{desc}</Text>
            </Column>
          </Row>
        ))}
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
        { value: "68%", label: "of active users land interviews within 6 weeks" },
        { value: "2.4×", label: "avg increase in callbacks after resume review" },
        { value: "41 days", label: "avg time-to-offer for consistent users" },
      ]} />
      <Text style={h2()}>Two months out. Still searching?</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been about 60 days. I don't know where your search stands, but if it's still open, I wanted to share what we're seeing from users who are actively using Zari right now.
      </Text>
      <Highlight variant="tip">
        <strong>The most common pattern we see:</strong><br /><br />
        Users who fell off and came back with a specific problem ("my resume isn't converting," "I'm getting to round 3 but no offer") and worked through it in 2-3 sessions tend to break their stall within 2-3 weeks.
      </Highlight>
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
    <Layout preview="My last email. One offer, no pressure." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>Three months. My last reach-out.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been 90 days. This is my last email.
      </Text>
      <Text style={p()}>
        I'm not going to pitch you. Either the timing isn't right, you've moved on, or Zari just wasn't what you needed. All of those are completely valid.
      </Text>
      <Highlight>
        If you ever come back to an active search — whether it's next month or next year — your account is here. Everything Zari knows about you is saved. Just log in and pick up exactly where you left off.
      </Highlight>
      <Text style={p()}>
        One last thing: if there's a reason Zari didn't work for you — something specific that frustrated you or felt off — I'd genuinely want to hear it. Not to convince you to stay. Just because it helps us build a better product.
      </Text>
      <Text style={p()}>
        Reply here if you're up for it. And if not — good luck with everything. I hope the search goes well, whenever it happens.
      </Text>
      <Divider />
      <Text style={muted()}>This is the last email you'll receive from us. If you ever want to return, just log in — no re-enrollment needed.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
