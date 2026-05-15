import * as React from "react";
import { Text, Section, Link, Row, Column } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Upsell Limit 1 — Approaching cap ────────────────────────────────────────
export function UpsellLimit1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="You're running out of session depth — here's how to keep going." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>You're getting real results. Don't let a cap slow you down.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been using Zari consistently, which puts you in the group of users actually making progress. The session data is clear: more sessions equals faster outcomes.
      </Text>
      <Text style={p()}>
        You're close to your monthly session limit. On Growth ($89/mo) you get unlimited session depth — longer conversations, richer context, no interruptions mid-interview prep or resume review.
      </Text>
      <Text style={p()}>
        If you're in an active search right now, this is the worst moment to hit a wall. The upgrade takes 60 seconds.
      </Text>
      <CtaButton href={`${APP}/billing`}>Upgrade to Growth →</CtaButton>
      <Divider />
      <Text style={muted()}>Questions about plans? Reply here — I'll help you find the right fit.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Upsell Limit 2 — At cap ──────────────────────────────────────────────────
export function UpsellLimit2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your session limit is up. Here's how to keep going." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>You hit the limit. Here's how to keep going.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've maxed out your session depth for this period. To continue at full depth, you'll need to upgrade.
      </Text>
      <Text style={p()}>
        You can still use Zari with shorter sessions until your period resets. But if you're in the middle of interview prep or a critical application, that's not ideal timing.
      </Text>
      <Section style={{ margin: "24px 0" }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr>
              <td style={{ padding: "10px 14px", borderBottom: "2px solid #E5E7EB", color: "#6B7280", fontWeight: "600", fontSize: "12px" }}></td>
              <td style={{ padding: "10px 14px", borderBottom: "2px solid #E5E7EB", color: "#6B7280", fontWeight: "600", fontSize: "12px", textAlign: "center" }}>Search ($39/mo)</td>
              <td style={{ padding: "10px 14px", borderBottom: `2px solid ${colors.brand}`, color: colors.brand, fontWeight: "700", fontSize: "12px", textAlign: "center" }}>Growth ($89/mo)</td>
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
                <td style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", color: "#111827", fontWeight: "500" }}>{feature}</td>
                <td style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", color: "#6B7280", textAlign: "center" }}>{search}</td>
                <td style={{ padding: "11px 14px", borderBottom: `1px solid ${colors.brandLight}`, color: colors.brand, fontWeight: "600", textAlign: "center", backgroundColor: "#FAFAFA" }}>{growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <CtaButton href={`${APP}/billing`}>Upgrade to Growth — $89/mo →</CtaButton>
      <Divider />
      <Text style={muted()}>Want to stay on Search and wait for your reset? No problem — your account stays active and sessions resume automatically.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── At Risk 1 — First re-engagement ─────────────────────────────────────────
export function AtRisk1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Haven't seen you in a while — is everything going okay?" unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>We haven't seen you in a while.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — it's been a bit since your last Zari session. Wanted to check in.
      </Text>
      <Text style={p()}>
        Job searching is exhausting. If you've stepped back — intentionally or not — that's completely understandable. But if the search is still active and you've just gotten busy, that's worth addressing.
      </Text>
      <Blockquote>
        The candidates who get offers aren't necessarily the most talented ones. They're the ones who stay consistent. Even one session a week compounds significantly over a month.
      </Blockquote>
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
    <Layout preview="For when the job search feels stuck — a different take." unsubscribeUrl={unsubscribeUrl}>
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
      <Section style={{ margin: "16px 0 24px" }}>
        <Step number={1} title="Materials aren't converting">
          Your resume and LinkedIn are filtering you out before a human ever sees your name. This is fixable in one session.
        </Step>
        <Step number={2} title="Interview prep is surface-level">
          You're answering questions correctly but not memorably. The difference is specific, practiced stories — not just knowing what to say.
        </Step>
        <Step number={3} title="The target is slightly off">
          Applying to roles 20% above your level is smart. 40% above is a wall. Sometimes a small pivot in targeting unlocks everything.
        </Step>
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
    <Layout preview="Last check-in. After this I'll stop reaching out." unsubscribeUrl={unsubscribeUrl}>
      <Text style={h2()}>One last check-in.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — I've sent a couple of check-ins and haven't heard back. I don't want to keep filling your inbox if it's not helpful.
      </Text>
      <Text style={p()}>Two possibilities:</Text>
      <Text style={p()}>
        You got the job — amazing, genuinely happy for you. You don't need to tell me, but if you want to, reply here.
      </Text>
      <Text style={p()}>
        The search is still open and Zari's been sitting on the shelf. If that's it, I'd love to understand why — reply and be honest with me.
      </Text>
      <Text style={p()}>
        Either way, your account and everything Zari knows about you is still saved. When you're ready — tomorrow or in six months — just come back and pick up where you left off.
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
        {firstName ?? "Hey"} — you've been using Zari for about a month. One question:
      </Text>
      <Section style={{ margin: "24px 0", padding: "28px 24px", border: `1px solid ${colors.border}`, borderRadius: "10px", textAlign: "center" }}>
        <Text style={{ margin: "0 0 20px", color: colors.text, fontSize: "15px", fontWeight: "600", fontFamily: "-apple-system, sans-serif" }}>
          How likely are you to recommend Zari to a friend?
        </Text>
        <table cellPadding="0" cellSpacing="0" style={{ margin: "0 auto", borderCollapse: "collapse" }}>
          <tr>
            {scores.map((score) => (
              <td key={score} style={{ padding: "0 2px" }}>
                <Link
                  href={`${npsUrl}&score=${score}`}
                  style={{
                    display: "block",
                    width: "34px",
                    height: "34px",
                    lineHeight: "34px",
                    textAlign: "center",
                    backgroundColor: "#F9FAFB",
                    border: `1px solid #E5E7EB`,
                    color: colors.text,
                    fontSize: "13px",
                    fontWeight: "600",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontFamily: "-apple-system, sans-serif",
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
            <Text style={{ margin: 0, color: colors.muted, fontSize: "11px", fontFamily: "-apple-system, sans-serif" }}>Not at all likely</Text>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <Text style={{ margin: 0, color: colors.muted, fontSize: "11px", fontFamily: "-apple-system, sans-serif" }}>Extremely likely</Text>
          </Column>
        </Row>
      </Section>
      <Text style={p()}>
        It takes 10 seconds. Your feedback directly shapes what we build next.
      </Text>
      <Divider />
      <Text style={muted()}>
        If there's something specific you'd want to share — what's working, what's not — just reply here. I read everything.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
