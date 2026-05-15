import * as React from "react";
import { Text, Section, Link, Row, Column } from "@react-email/components";
import { Layout, CtaButton, Blockquote, Divider, Signature, Step, p, muted, colors, SITE_URL as APP } from "../base";

const FEATURE_LABELS: Record<string, string> = {
  resume: "resume review",
  linkedin: "LinkedIn optimization",
  interview: "interview prep",
  career: "career strategy",
  confidence: "confidence coaching",
  recap: "interview recap",
  salary: "salary negotiation",
  promotion: "promotion coaching",
};

function featureLabel(featureName?: string | null) {
  if (!featureName) return null;
  const key = Object.keys(FEATURE_LABELS).find((k) => featureName.toLowerCase().includes(k));
  return key ? FEATURE_LABELS[key] : null;
}

export function UpsellLimit1({ firstName, topFeature, unsubscribeUrl }: { firstName?: string; topFeature?: string; unsubscribeUrl: string }) {
  const label = featureLabel(topFeature);
  return (
    <Layout preview="You're close to your credit limit — here's how to keep going." headline="You're getting real results. Don't let a cap slow you down." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've been using Zari consistently, which puts you in the group of users actually making progress. The data is clear: more sessions equal faster outcomes.
      </Text>
      {label ? (
        <Text style={p()}>
          You've been doing a lot of <strong>{label}</strong> — exactly the kind of work that moves the needle. You're close to your monthly credit limit, and this is the worst moment to lose momentum.
        </Text>
      ) : (
        <Text style={p()}>
          You're close to your monthly credit limit. If you're in an active search right now, this is the worst moment to hit a wall.
        </Text>
      )}
      <Text style={p()}>
        On Growth ($89/mo) you get 400 credits/month — longer conversations, richer context, no interruptions mid-session. The upgrade takes 60 seconds.
      </Text>
      <CtaButton href={`${APP}/billing`}>Upgrade to Growth →</CtaButton>
      <Divider />
      <Text style={muted()}>Questions about plans? Reply here — I'll help you find the right fit.</Text>
      <Signature />
    </Layout>
  );
}

export function UpsellLimit2({ firstName, topFeature, unsubscribeUrl }: { firstName?: string; topFeature?: string; unsubscribeUrl: string }) {
  const label = featureLabel(topFeature);
  return (
    <Layout preview="Your session limit is up. Here's how to keep going." headline="You hit the limit. Here's how to keep going." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — you've hit your monthly credit limit. To keep running sessions, you'll need to upgrade or wait for your next billing period.
      </Text>
      {label && (
        <Text style={p()}>
          You've been putting serious work into <strong>{label}</strong>. Don't lose that momentum right now — upgrading keeps you going without missing a beat.
        </Text>
      )}
      <Text style={p()}>
        You can wait for your period to reset — but if you're mid-interview prep or actively applying, that gap is costly.
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
      <Signature />
    </Layout>
  );
}

export function AtRisk1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Haven't seen you in a while — is everything going okay?" headline="We haven't seen you in a while." unsubscribeUrl={unsubscribeUrl}>
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
      <Signature />
    </Layout>
  );
}

export function AtRisk2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="For when the job search feels stuck — a different take." headline="When nothing seems to be working." unsubscribeUrl={unsubscribeUrl}>
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
      <Signature />
    </Layout>
  );
}

export function AtRisk3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Last check-in. After this I'll stop reaching out." headline="One last check-in." unsubscribeUrl={unsubscribeUrl}>
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
      <Signature />
    </Layout>
  );
}

export function NpsSurvey({ firstName, npsUrl, unsubscribeUrl }: { firstName?: string; npsUrl: string; unsubscribeUrl: string }) {
  const scores = Array.from({ length: 11 }, (_, i) => i);
  return (
    <Layout preview="Quick question: how likely are you to recommend Zari?" headline="How are we doing?" unsubscribeUrl={unsubscribeUrl}>
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
      <Signature />
    </Layout>
  );
}

export function DetractorFollowup1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="Your feedback landed. I want to make it right."
      headline="Your feedback landed."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        {firstName ?? "Hey"} — you gave us a low score on that survey, and I want to respond to it directly.
      </Text>
      <Text style={p()}>
        I read every response. If Zari hasn't been delivering what you expected — whether that's the quality of the coaching, a missing feature, or something that just didn't click — I genuinely want to know what it was.
      </Text>
      <Text style={p()}>
        Reply here and tell me what happened. I'm not trying to talk you into staying. I want to understand what went wrong so we can fix it — for you and for everyone else.
      </Text>
      <Text style={p()}>
        And as a small acknowledgment that we fell short: I've added <strong>$20 in free credits</strong> to your account. No strings attached.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If you'd prefer to cancel, you can do that from billing settings — no friction, no questions asked.
      </Text>
      <Signature />
    </Layout>
  );
}

export function DetractorFollowup2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout
      preview="One more thing — a direct offer if Zari missed the mark."
      headline="A direct offer."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={p()}>
        {firstName ?? "Hey"} — I sent a note a few days ago after your survey, and wanted to follow up once more.
      </Text>
      <Text style={p()}>
        If the issue was something specific — a feature that didn't work, advice that wasn't useful, a workflow that was confusing — I can help you personally. Reply here and I'll jump in directly.
      </Text>
      <Text style={p()}>
        If the issue was price, I can extend a 50% discount for your next month. Just reply "discount" and I'll apply it.
      </Text>
      <Text style={p()}>
        If Zari just wasn't the right fit, that's a completely valid outcome. I'd still appreciate knowing why — one sentence is enough.
      </Text>
      <CtaButton href={APP}>Open Zari →</CtaButton>
      <Divider />
      <Text style={muted()}>
        After this I'll stop following up. Whatever you decide — good luck with the search.
      </Text>
      <Signature />
    </Layout>
  );
}
