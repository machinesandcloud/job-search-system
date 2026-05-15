import * as React from "react";
import { Text, Row, Column, Section, Link } from "@react-email/components";
import { Layout, CtaButton, Highlight, Divider, Signature, StatRow, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Upsell Limit 1 — Approaching cap ────────────────────────────────────────
export function UpsellLimit1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="You're running out of session depth — here's how to keep going." unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "12px", padding: "20px 24px", margin: "0 0 28px" }}>
        <Text style={{ margin: 0, color: "#92400E", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Heads up
        </Text>
        <Text style={{ margin: "6px 0 0", color: "#78350F", fontSize: "16px", fontWeight: "600" }}>
          You're approaching your session limit for this month.
        </Text>
      </Section>
      <Text style={h2()}>You're getting serious results. Don't let a cap slow you down.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been using Zari consistently, which means you're in the group of users actually making progress. The session data is clear: more sessions = faster outcomes.
      </Text>
      <Text style={p()}>
        Your current plan has a monthly limit on session depth. You're close to it.
      </Text>
      <Highlight>
        <strong>Growth plan users get unlimited session depth</strong> — longer conversations, richer context per session, and no interruptions mid-interview prep or resume review. It's $89/month.
      </Highlight>
      <Text style={p()}>
        If you're in an active search right now, this is the worst moment to hit a wall. The upgrade takes 60 seconds.
      </Text>
      <CtaButton href={`${APP}/billing`}>Upgrade to Growth →</CtaButton>
      <Divider />
      <Text style={muted()}>Questions about plans? Reply here — I'll help you figure out the right fit.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Upsell Limit 2 — At cap ──────────────────────────────────────────────────
export function UpsellLimit2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your session limit is up. Here's how to keep going without interruption." unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "12px", padding: "20px 24px", margin: "0 0 28px" }}>
        <Text style={{ margin: 0, color: "#991B1B", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Session limit reached
        </Text>
        <Text style={{ margin: "6px 0 0", color: "#7F1D1D", fontSize: "16px", fontWeight: "600" }}>
          Your plan's session depth has been used for this period.
        </Text>
      </Section>
      <Text style={h2()}>You hit the cap. Here's how to keep going.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've maxed out your session depth for this period. To continue at full depth, you'll need to upgrade.
      </Text>
      <Text style={p()}>
        You can still use Zari with shorter sessions until your period resets. But if you're in the middle of interview prep or a critical application — that's not ideal timing.
      </Text>
      <Section style={{ margin: "28px 0" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <td style={{ padding: "10px 16px", backgroundColor: "#F8FAFC", fontSize: "12px", fontWeight: "700", color: colors.muted, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #E2E8F0" }}></td>
              <td style={{ padding: "10px 16px", backgroundColor: "#F8FAFC", fontSize: "12px", fontWeight: "700", color: colors.muted, textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center", borderBottom: "1px solid #E2E8F0" }}>Search ($39/mo)</td>
              <td style={{ padding: "10px 16px", backgroundColor: "#EEF2FF", fontSize: "12px", fontWeight: "700", color: colors.brand, textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center", borderBottom: "1px solid #C7D2FE" }}>Growth ($89/mo)</td>
            </tr>
          </thead>
          <tbody>
            {[
              ["Session depth", "Standard", "Unlimited"],
              ["Conversations", "Unlimited", "Unlimited"],
              ["Memory", "✓", "✓"],
              ["Priority support", "—", "✓"],
            ].map(([feature, search, growth], i) => (
              <tr key={i}>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: colors.text, borderBottom: "1px solid #F1F5F9" }}>{feature}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: colors.muted, textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{search}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", color: colors.brand, fontWeight: "600", textAlign: "center", backgroundColor: "#F5F3FF", borderBottom: "1px solid #E0E7FF" }}>{growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <CtaButton href={`${APP}/billing`}>Upgrade to Growth — $89/mo →</CtaButton>
      <Divider />
      <Text style={muted()}>Want to stay on Search and just wait for your reset? No problem — your account stays active and sessions resume at standard depth automatically.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── At Risk 1 — First re-engagement ─────────────────────────────────────────
export function AtRisk1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Haven't seen you in a while — is the job search going well?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>We haven't seen you in a while.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been a bit since your last Zari session. Wanted to check in.
      </Text>
      <Text style={p()}>
        Job searching is exhausting. If you've taken a step back — intentionally or not — that's completely understandable. But if the search is still active and you've just gotten busy, that's worth addressing.
      </Text>
      <Highlight>
        The candidates who get offers aren't necessarily the most talented ones. They're the ones who stay consistent. Even one session a week compounds significantly over a month.
      </Highlight>
      <Text style={p()}>
        Is there something specific you're stuck on? Reply here — I read every response and will personally help you figure out the next move.
      </Text>
      <CtaButton href={APP}>Pick up where I left off →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── At Risk 2 — Motivation ───────────────────────────────────────────────────
export function AtRisk2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="For when the job search feels like it's not working — a different take." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>When nothing seems to be working.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — I want to share something we see a lot.
      </Text>
      <Text style={p()}>
        Most job searches have a period — usually weeks 4-8 — where nothing seems to be working. Applications go out. Silence comes back. It's disheartening, and it's exactly when most people start to disengage.
      </Text>
      <Text style={p()}>
        The problem is almost never a lack of qualification. It's almost always one of three things:
      </Text>
      <Section style={{ margin: "20px 0" }}>
        {[
          ["Materials aren't converting", "Your resume and LinkedIn are filtering you out before a human ever sees your name. This is fixable in one session."],
          ["Interview prep is surface-level", "You're answering questions correctly but not memorably. The difference is specific, practiced stories — not just knowing what to say."],
          ["The target is slightly off", "Applying to roles 20% above your current level is smart. 40% above is a wall. Sometimes a small pivot in targeting unlocks everything."],
        ].map(([title, desc], i) => (
          <Row key={i} style={{ marginBottom: "16px" }}>
            <Column style={{ width: "28px", verticalAlign: "top", paddingTop: "4px" }}>
              <span style={{ color: colors.warning, fontSize: "18px", lineHeight: "1" }}>→</span>
            </Column>
            <Column style={{ paddingLeft: "8px" }}>
              <Text style={{ margin: "0 0 4px", color: colors.text, fontSize: "15px", fontWeight: "600" }}>{title}</Text>
              <Text style={{ margin: 0, color: colors.muted, fontSize: "14px", lineHeight: "1.6" }}>{desc}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <Text style={p()}>
        One honest audit session with Zari — where you share what's been happening and we dig in — usually identifies the block within 20 minutes.
      </Text>
      <CtaButton href={APP}>Run a diagnostic session →</CtaButton>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── At Risk 3 — Final check-in ───────────────────────────────────────────────
export function AtRisk3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Last check-in. After this, I'll assume you've found what you need." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>One last check-in.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — I've sent a couple of check-ins and haven't heard back. I don't want to keep filling your inbox if it's not helpful.
      </Text>
      <Text style={p()}>
        Two possibilities:
      </Text>
      <Section style={{ margin: "20px 0" }}>
        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ width: "28px", verticalAlign: "top" }}>
            <span style={{ color: colors.success, fontSize: "16px" }}>✓</span>
          </Column>
          <Column style={{ paddingLeft: "8px" }}>
            <Text style={{ margin: 0, color: colors.muted, fontSize: "15px" }}>You got the job. Amazing — genuinely happy for you. You don't need to tell me, but if you want to, reply here.</Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ width: "28px", verticalAlign: "top" }}>
            <span style={{ color: colors.warning, fontSize: "16px" }}>→</span>
          </Column>
          <Column style={{ paddingLeft: "8px" }}>
            <Text style={{ margin: 0, color: colors.muted, fontSize: "15px" }}>The search is still open and Zari's been sitting on the shelf. If that's it, I'd love to understand why — reply and be honest with me.</Text>
          </Column>
        </Row>
      </Section>
      <Text style={p()}>
        Either way, your account and everything Zari knows about you is still saved. When you're ready — whether it's tomorrow or in six months — just come back and pick up where you left off.
      </Text>
      <CtaButton href={APP}>Come back to Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>
        After this email, I'll stop reaching out. But you can always reply here or open Zari whenever you're ready. Good luck out there.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── NPS Survey ───────────────────────────────────────────────────────────────
export function NpsSurvey({ firstName, npsUrl, unsubscribeUrl }: { firstName?: string; npsUrl: string; unsubscribeUrl: string }) {
  const scores = Array.from({ length: 11 }, (_, i) => i);
  return (
    <Layout preview="Quick question: how likely are you to recommend Zari?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>How are we doing?</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been using Zari for about a month. I have one question:
      </Text>
      <Section style={{ backgroundColor: colors.accent, border: `1px solid ${colors.accentBorder}`, borderRadius: "12px", padding: "28px 24px", margin: "24px 0", textAlign: "center" }}>
        <Text style={{ margin: "0 0 20px", color: colors.text, fontSize: "17px", fontWeight: "700" }}>
          How likely are you to recommend Zari to a friend?
        </Text>
        <table cellPadding="0" cellSpacing="0" style={{ margin: "0 auto", borderCollapse: "collapse" }}>
          <tr>
            {scores.map((score) => (
              <td key={score} style={{ padding: "0 3px" }}>
                <Link
                  href={`${npsUrl}&score=${score}`}
                  style={{
                    display: "block",
                    width: "36px",
                    height: "36px",
                    lineHeight: "36px",
                    textAlign: "center",
                    backgroundColor: score <= 6 ? "#FEE2E2" : score <= 8 ? "#FEF9C3" : "#DCFCE7",
                    color: score <= 6 ? "#991B1B" : score <= 8 ? "#713F12" : "#14532D",
                    fontSize: "14px",
                    fontWeight: "700",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                >
                  {score}
                </Link>
              </td>
            ))}
          </tr>
        </table>
        <Row style={{ marginTop: "10px" }}>
          <Column style={{ textAlign: "left" }}>
            <Text style={{ margin: 0, color: colors.muted, fontSize: "11px" }}>Not at all likely</Text>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <Text style={{ margin: 0, color: colors.muted, fontSize: "11px" }}>Extremely likely</Text>
          </Column>
        </Row>
      </Section>
      <Text style={p()}>
        It takes 10 seconds. Your feedback directly shapes what we build next — and it genuinely helps us understand how to make Zari more useful for people in your situation.
      </Text>
      <Divider />
      <Text style={muted()}>
        If there's something specific you'd want to share — what's working, what's not, anything we could do better — just reply here. I read everything.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
