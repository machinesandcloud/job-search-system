import * as React from "react";
import { Text, Section } from "@react-email/components";
import { Layout, CtaButton, Highlight, Divider, Signature, p, h2, muted, colors } from "../base";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Dunning 1 — Payment failed ───────────────────────────────────────────────
export function Dunning1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Action needed: your payment didn't go through." unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "12px", padding: "20px 24px", margin: "0 0 28px" }}>
        <Text style={{ margin: 0, color: "#991B1B", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Payment issue
        </Text>
        <Text style={{ margin: "6px 0 0", color: "#7F1D1D", fontSize: "16px", fontWeight: "600" }}>
          We weren't able to process your payment.
        </Text>
      </Section>
      <Text style={h2()}>Your payment didn't go through.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — we just tried to charge your card for your Zari subscription and it didn't go through.
      </Text>
      <Text style={p()}>
        This happens — cards expire, banks flag charges, limits get hit. Your account is still active right now, but we'll need updated payment info to keep it that way.
      </Text>
      <Highlight>
        <strong>To fix it:</strong> Click the button below, go to billing, and update your payment method. It takes 60 seconds and your subscription continues uninterrupted.
      </Highlight>
      <CtaButton href={`${APP}/billing`}>Update my payment →</CtaButton>
      <Divider />
      <Text style={muted()}>If you're seeing this in error or your bank blocked the charge, reply here and I'll look into it manually.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Dunning 2 — Access at risk ───────────────────────────────────────────────
export function Dunning2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your Zari access is at risk — 4 days left to update your payment." unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "12px", padding: "20px 24px", margin: "0 0 28px" }}>
        <Text style={{ margin: 0, color: "#92400E", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Access at risk
        </Text>
        <Text style={{ margin: "6px 0 0", color: "#78350F", fontSize: "16px", fontWeight: "600" }}>
          Your subscription will be paused in 4 days if we can't collect payment.
        </Text>
      </Section>
      <Text style={h2()}>We still couldn't collect payment.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — we tried your card again and it still isn't going through. Your account is still active, but we have a few days before we have to pause it.
      </Text>
      <Text style={p()}>
        Everything Zari knows about you — your resume, your coaching history, your profile — stays saved whether your account is active or not. But you won't be able to run sessions until payment is resolved.
      </Text>
      <Text style={p()}>
        If you're in the middle of an active job search, now's the time to fix it. 60 seconds to update, and you're uninterrupted.
      </Text>
      <CtaButton href={`${APP}/billing`}>Fix my payment now →</CtaButton>
      <Divider />
      <Text style={muted()}>Need to pause your subscription instead? Reply here and we'll sort it out — no hassle.</Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}

// ─── Dunning 3 — Account suspended ───────────────────────────────────────────
export function Dunning3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your Zari account has been paused due to a payment issue." unsubscribeUrl={unsubscribeUrl}>
      <Section style={{ backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "12px", padding: "20px 24px", margin: "0 0 28px" }}>
        <Text style={{ margin: 0, color: "#475569", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Account paused
        </Text>
        <Text style={{ margin: "6px 0 0", color: "#1E293B", fontSize: "16px", fontWeight: "600" }}>
          Your account has been paused due to an unresolved payment.
        </Text>
      </Section>
      <Text style={h2()}>Your account is paused.</Text>
      <Text style={p()}>
        {firstName ?? "Hey"} — after multiple attempts, we weren't able to collect payment, so your account has been paused.
      </Text>
      <Text style={p()}>
        <strong>Your data is fully safe.</strong> Everything Zari knows about you is saved to your account — your resume, coaching history, and profile are all still there. You're not starting from scratch.
      </Text>
      <Text style={p()}>
        To reactivate, just update your payment method. Your subscription and all session history will resume immediately.
      </Text>
      <CtaButton href={`${APP}/billing`}>Reactivate my account →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If you're no longer looking to continue — no problem at all. Your data will remain saved for 90 days if you ever want to come back. Reply here if you have any questions.
      </Text>
      <Signature name="Steve at Zari" />
    </Layout>
  );
}
