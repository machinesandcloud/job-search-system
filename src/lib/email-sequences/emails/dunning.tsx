import * as React from "react";
import { Text } from "@react-email/components";
import { Layout, CtaButton, Divider, Signature, p, muted, SITE_URL as APP } from "../base";

export function Dunning1({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Action needed: your payment didn't go through." headline="Your payment didn't go through." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — we just tried to charge your card for your Zari subscription and it didn't go through.
      </Text>
      <Text style={p()}>
        This happens — cards expire, banks flag charges, limits get hit. Your account is still active right now, but we'll need updated payment info to keep it that way.
      </Text>
      <Text style={p()}>
        To fix it: update your payment method below. It takes 60 seconds and your subscription continues uninterrupted.
      </Text>
      <CtaButton href={`${APP}/billing`}>Update my payment →</CtaButton>
      <Divider />
      <Text style={muted()}>If you're seeing this in error or your bank blocked the charge, reply here and I'll look into it manually.</Text>
      <Signature />
    </Layout>
  );
}

export function Dunning2({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your Zari access is at risk — 4 days left to update your payment." headline="We still couldn't collect payment." unsubscribeUrl={unsubscribeUrl}>
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
      <Signature />
    </Layout>
  );
}

export function Dunning3({ firstName, unsubscribeUrl }: { firstName?: string; unsubscribeUrl: string }) {
  return (
    <Layout preview="Your Zari account has been paused." headline="Your account is paused." unsubscribeUrl={unsubscribeUrl}>
      <Text style={p()}>
        {firstName ?? "Hey"} — after multiple attempts, we weren't able to collect payment, so your account has been paused.
      </Text>
      <Text style={p({ fontWeight: "600" })}>Your data is fully safe.</Text>
      <Text style={p()}>
        Everything Zari knows about you — your resume, coaching history, and profile — is still there. You're not starting from scratch. To reactivate, just update your payment method and your subscription resumes immediately.
      </Text>
      <CtaButton href={`${APP}/billing`}>Reactivate my account →</CtaButton>
      <Divider />
      <Text style={muted()}>
        If you're no longer looking to continue — no problem at all. Your data will remain saved for 90 days if you ever want to come back. Reply here if you have any questions.
      </Text>
      <Signature />
    </Layout>
  );
}
