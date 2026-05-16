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

// ─── Design tokens ─────────────────────────────────────────────────────────────

export const colors = {
  brand:         "#3B6CF5",
  brandLight:    "#EBF0FF",
  brandBorder:   "#C5D5FD",
  text:          "#1A1A1A",
  body:          "#52535A",
  muted:         "#818285",
  subtle:        "#9899A1",
  border:        "#E4E6EA",
  shell:         "#E8EAE2",   // warm sage — card floats on this
  cardBg:        "#FFFFFF",
  footerBg:      "#F5F5F1",
  footerBorder:  "#E4E4E0",
};

export const font = `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`;

// Single source of truth for all email links — checks both NEXT_PUBLIC vars,
// falls back to the hardcoded production domain so links never break.
export const SITE_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "") ||
  "https://app.zaricoach.com";

const LOGO_URL = "https://app.zaricoach.com/assets/zari-logo-transparent-400w.png";

function getMonthYear() {
  return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ─── Layout ────────────────────────────────────────────────────────────────────

interface LayoutProps {
  preview?: string;
  headline?: React.ReactNode;
  badge?: React.ReactNode;
  unsubscribeUrl: string;
  children: React.ReactNode;
}

export function Layout({ preview, headline, badge, unsubscribeUrl, children }: LayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
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

          {/* ── Card ── */}
          <Section style={{
            backgroundColor: colors.cardBg,
            borderRadius: "10px",
            border: "1px solid #D0D2CA",
          }}>

            {/* ── Header: logo left · date right ── */}
            <Row>
              <Column style={{ padding: "22px 28px 18px", verticalAlign: "middle" }}>
                <Img src={LOGO_URL} width={100} height={46} alt="Zari" style={{ display: "block" }} />
              </Column>
              <Column style={{ padding: "22px 28px 18px", textAlign: "right", verticalAlign: "middle" }}>
                <Text style={{
                  fontFamily: font,
                  margin: 0,
                  color: colors.muted,
                  fontSize: "12px",
                  lineHeight: "1",
                  letterSpacing: "0.1px",
                }}>
                  {getMonthYear()}
                </Text>
              </Column>
            </Row>

            {/* ── Separator ── */}
            <Row>
              <Column style={{ padding: "0 28px" }}>
                <Hr style={{ borderColor: "#EAEAEC", margin: 0 }} />
              </Column>
            </Row>

            {/* ── Content: badge + headline + body ── */}
            <Row>
              <Column style={{ padding: "36px 40px 48px" }}>

                {badge && (
                  <Text style={{
                    fontFamily: font,
                    margin: "0 0 18px",
                    color: colors.brand,
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "0.1px",
                    lineHeight: "1",
                  }}>
                    {badge}
                  </Text>
                )}

                {headline && (
                  <Text style={{
                    fontFamily: font,
                    margin: "0 0 28px",
                    color: colors.text,
                    fontSize: "32px",
                    fontWeight: "800",
                    lineHeight: "1.15",
                    letterSpacing: "-0.8px",
                  }}>
                    {headline}
                  </Text>
                )}

                {children}

              </Column>
            </Row>

            {/* ── Footer inside card ── */}
            <Row>
              <Column style={{
                padding: "20px 28px",
                backgroundColor: colors.footerBg,
                borderTop: `1px solid ${colors.footerBorder}`,
                borderRadius: "0 0 10px 10px",
              }}>
                <Text style={{
                  fontFamily: font,
                  margin: 0,
                  color: colors.muted,
                  fontSize: "12px",
                  lineHeight: "1.75",
                  textAlign: "center",
                }}>
                  <Link href={unsubscribeUrl} style={{ color: colors.muted, textDecoration: "underline" }}>
                    Unsubscribe
                  </Link>
                  {" · "}You received this because you signed up for Zari.
                  <br />
                  © {new Date().getFullYear()} Zari, Inc.{" · "}
                  <Link href={SITE_URL} style={{ color: colors.muted, textDecoration: "none" }}>
                    zaricoach.com
                  </Link>
                </Text>
              </Column>
            </Row>

          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── CTA Button — pill shape ───────────────────────────────────────────────────

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
          padding: "14px 30px",
          borderRadius: "999px",
          display: "inline-block",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}

// ─── Blockquote ────────────────────────────────────────────────────────────────

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

// ─── Divider ───────────────────────────────────────────────────────────────────

export function Divider() {
  return <Hr style={{ borderColor: colors.border, margin: "28px 0" }} />;
}

// ─── Typography helpers ────────────────────────────────────────────────────────

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

// ─── Signature ─────────────────────────────────────────────────────────────────

export function Signature({ name = "Steve", title = "Founder, Zari" }: { name?: string; title?: string }) {
  return (
    <Section style={{ marginTop: "32px" }}>
      <Hr style={{ borderColor: colors.border, margin: "0 0 22px" }} />
      <Text style={{
        fontFamily: font,
        margin: "0 0 10px",
        color: colors.body,
        fontSize: "15px",
        lineHeight: "1.5",
      }}>
        Best,
      </Text>
      <Text style={{
        fontFamily: "'Great Vibes', cursive",
        margin: "0 0 3px",
        color: colors.text,
        fontSize: "38px",
        fontWeight: "400",
        lineHeight: "1.2",
        letterSpacing: "0.5px",
      }}>
        {name}
      </Text>
      <Text style={{
        fontFamily: font,
        margin: 0,
        color: colors.muted,
        fontSize: "13px",
        lineHeight: "1.5",
      }}>
        {title}
      </Text>
    </Section>
  );
}

// ─── Numbered steps ────────────────────────────────────────────────────────────

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

// ─── Stats row ─────────────────────────────────────────────────────────────────

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
