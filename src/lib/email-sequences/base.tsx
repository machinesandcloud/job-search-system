import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Link,
  Button,
  Hr,
  Preview,
  Img,
} from "@react-email/components";
import * as React from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
// Derived from analysis of Stripe, Linear, Notion, Studio (react.email) templates.
// max-width: 640px (all premium templates use 640, not 600)
// Shell color: neutral grey — card appears to float
// Text: never pure black — cool near-black + readable grey for body
// Heading: 40px, weight 700, -0.8px letter-spacing (tight = designed)
// Body: 16px, weight 400, 1.65 line-height
// CTA: centered, brand blue, 15px 600w, generous padding, 8px radius

export const colors = {
  brand:         "#3B6CF5",   // Zari blue (matched to logo)
  brandLight:    "#EBF0FF",   // light blue tint for callouts/stats bg
  brandBorder:   "#C5D5FD",   // callout/step circle border
  text:          "#16171A",   // cool near-black — headlines
  body:          "#52535A",   // comfortable reading grey — body text
  muted:         "#818285",   // secondary info, captions
  subtle:        "#9899A1",   // footer, timestamps
  border:        "#E4E6EA",   // card border, dividers
  shell:         "#F0F2F5",   // outer background — card floats on this
  cardBg:        "#FFFFFF",
};

export const font = `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`;

const APP_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://app.zaricoach.com";
const LOGO_URL = `${APP_URL}/assets/zari-logo-transparent-400w.png`;

// ─── Layout ───────────────────────────────────────────────────────────────────
interface LayoutProps {
  preview?: string;
  headline?: React.ReactNode;
  unsubscribeUrl: string;
  children: React.ReactNode;
}

export function Layout({ preview, headline, unsubscribeUrl, children }: LayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Body style={{
        margin: 0,
        padding: 0,
        backgroundColor: colors.shell,
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
      }}>
        <Container style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "40px 16px 56px",
        }}>

          <Section style={{
            backgroundColor: colors.cardBg,
            borderRadius: "8px",
            border: `1px solid ${colors.border}`,
          }}>

            {/* ── Logo strip — white, tight, centered ── */}
            <Row>
              <Column style={{ padding: "20px 32px 18px", textAlign: "center", borderBottom: `1px solid ${colors.border}` }}>
                <Img
                  src={LOGO_URL}
                  width={88}
                  height={27}
                  alt="Zari"
                  style={{ display: "block", margin: "0 auto" }}
                />
              </Column>
            </Row>

            {/* ── Blue hero — large white headline ── */}
            {headline && (
              <Row>
                <Column style={{ backgroundColor: colors.brand, padding: "40px 40px 36px" }}>
                  <Text style={{
                    fontFamily: font,
                    color: "#FFFFFF",
                    fontSize: "30px",
                    fontWeight: "800",
                    lineHeight: "1.2",
                    letterSpacing: "-0.5px",
                    margin: 0,
                  }}>
                    {headline}
                  </Text>
                </Column>
              </Row>
            )}

            {/* ── White content ── */}
            <Row>
              <Column style={{ padding: "32px 40px 44px" }}>
                {children}
              </Column>
            </Row>

          </Section>

          {/* ── Footer ── */}
          <Section style={{ padding: "20px 0 0" }}>
            <Text style={{
              margin: 0,
              fontFamily: font,
              color: colors.subtle,
              fontSize: "12px",
              lineHeight: "1.7",
              letterSpacing: "0.1px",
              textAlign: "center",
            }}>
              Zari · AI career coaching ·{" "}
              <Link href={APP_URL} style={{ color: colors.subtle, textDecoration: "none" }}>
                zaricoach.com
              </Link>
              <br />
              <Link href={unsubscribeUrl} style={{ color: colors.subtle, textDecoration: "underline" }}>
                Unsubscribe
              </Link>
              {" "}· You received this because you signed up for Zari.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── CTA Button — centered, prominent ─────────────────────────────────────────
interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
}

export function CtaButton({ href, children }: CtaButtonProps) {
  return (
    <Section style={{ textAlign: "center", margin: "28px 0 0" }}>
      <Button
        href={href}
        style={{
          backgroundColor: colors.brand,
          color: "#FFFFFF",
          fontFamily: font,
          fontSize: "15px",
          fontWeight: "600",
          letterSpacing: "-0.042px",
          lineHeight: "1",
          textDecoration: "none",
          padding: "14px 28px",
          borderRadius: "8px",
          display: "inline-block",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}

// ─── Blockquote / Callout ─────────────────────────────────────────────────────
// Light brand-blue background + left accent border — visible, not garish
interface BlockquoteProps {
  children: React.ReactNode;
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <Section style={{
      backgroundColor: colors.brandLight,
      borderLeft: `4px solid ${colors.brand}`,
      borderRadius: "0 8px 8px 0",
      padding: "18px 20px",
      margin: "24px 0",
    }}>
      <Text style={{
        margin: 0,
        fontFamily: font,
        color: colors.body,
        fontSize: "15px",
        lineHeight: "1.7",
        letterSpacing: "-0.042px",
      }}>
        {children}
      </Text>
    </Section>
  );
}

export const Highlight = Blockquote;

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider() {
  return <Hr style={{ borderColor: colors.border, margin: "28px 0" }} />;
}

// ─── Typography helpers ───────────────────────────────────────────────────────
// 4-size scale: 40px hero / 16px body / 14px step desc / 12-13px footer
// Every size has a specific weight and letter-spacing — no defaults

export const h2 = (style?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: font,
  margin: "0 0 14px",
  color: colors.text,
  fontSize: "18px",
  fontWeight: "700",
  letterSpacing: "-0.3px",
  lineHeight: "1.4",
  ...style,
});

export const p = (style?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: font,
  margin: "0 0 16px",
  color: colors.body,
  fontSize: "15px",
  lineHeight: "1.7",
  letterSpacing: "-0.01px",
  ...style,
});

export const muted = (style?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: font,
  color: colors.muted,
  fontSize: "13px",
  lineHeight: "1.6",
  letterSpacing: "-0.013px",
  margin: "16px 0 0",
  ...style,
});

// ─── Signature ────────────────────────────────────────────────────────────────
export function Signature({ name = "Steve at Zari" }: { name?: string }) {
  return (
    <>
      <Divider />
      <Text style={{
        fontFamily: font,
        margin: 0,
        color: colors.muted,
        fontSize: "14px",
        lineHeight: "1.6",
        letterSpacing: "-0.014px",
      }}>
        — {name}
      </Text>
    </>
  );
}

// ─── Numbered steps ───────────────────────────────────────────────────────────
interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <Section style={{ margin: "0 0 20px" }}>
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse", width: "100%" }}>
        <tr>
          <td style={{ verticalAlign: "top", paddingRight: "14px", paddingTop: "1px", width: "34px" }}>
            <div style={{
              width: "28px",
              height: "28px",
              backgroundColor: colors.brandLight,
              border: `1.5px solid ${colors.brandBorder}`,
              borderRadius: "50%",
              textAlign: "center",
              lineHeight: "28px",
              fontFamily: font,
              fontSize: "12px",
              fontWeight: "700",
              color: colors.brand,
              display: "block",
              letterSpacing: "-0.012px",
            }}>
              {number}
            </div>
          </td>
          <td style={{ verticalAlign: "top" }}>
            <Text style={{
              fontFamily: font,
              margin: "0 0 4px",
              color: colors.text,
              fontSize: "15px",
              fontWeight: "600",
              lineHeight: "1.5",
              letterSpacing: "-0.042px",
            }}>
              {title}
            </Text>
            <Text style={{
              fontFamily: font,
              margin: 0,
              color: colors.body,
              fontSize: "14px",
              lineHeight: "1.7",
              letterSpacing: "-0.014px",
            }}>
              {children}
            </Text>
          </td>
        </tr>
      </table>
    </Section>
  );
}

// ─── Stats row ────────────────────────────────────────────────────────────────
// Brand-blue numbers on light-blue bg, separated by vertical rules
interface StatProps {
  stats: { value: string; label: string }[];
}

export function StatRow({ stats }: StatProps) {
  return (
    <Section style={{
      backgroundColor: colors.brandLight,
      borderRadius: "10px",
      padding: "28px 0",
      margin: "0 0 32px",
    }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <tr>
          {stats.map((s, i) => (
            <td key={i} style={{
              textAlign: "center",
              padding: "0 16px",
              borderRight: i < stats.length - 1 ? `1px solid ${colors.brandBorder}` : "none",
            }}>
              <div style={{
                fontFamily: font,
                color: colors.brand,
                fontSize: "34px",
                fontWeight: "800",
                letterSpacing: "-1.5px",
                lineHeight: "1",
              }}>{s.value}</div>
              <div style={{
                fontFamily: font,
                color: colors.muted,
                fontSize: "12px",
                marginTop: "7px",
                lineHeight: "1.45",
                letterSpacing: "-0.012px",
              }}>{s.label}</div>
            </td>
          ))}
        </tr>
      </table>
    </Section>
  );
}
