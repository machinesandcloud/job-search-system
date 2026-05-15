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
export const colors = {
  brand:    "#4F46E5",
  brandDark:"#3730A3",
  header:   "#0D1117",
  text:     "#1E293B",
  muted:    "#64748B",
  subtle:   "#94A3B8",
  border:   "#E2E8F0",
  bg:       "#F8FAFC",
  cardBg:   "#FFFFFF",
  accent:   "#EEF2FF",
  accentBorder: "#C7D2FE",
  success:  "#10B981",
  warning:  "#F59E0B",
};

export const font = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

// ─── Base Layout ──────────────────────────────────────────────────────────────
interface LayoutProps {
  preview?: string;
  unsubscribeUrl: string;
  children: React.ReactNode;
}

export function Layout({ preview, unsubscribeUrl, children }: LayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#EFF3F8", fontFamily: font }}>
        {/* Outer wrapper */}
        <Section style={{ padding: "40px 0" }}>
          <Container style={{ maxWidth: "600px", margin: "0 auto" }}>

            {/* ── Header ── */}
            <Section style={{
              backgroundColor: colors.header,
              borderRadius: "16px 16px 0 0",
              padding: "0",
              overflow: "hidden",
            }}>
              <Row>
                <Column style={{ padding: "28px 40px 0" }}>
                  <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ verticalAlign: "middle", paddingRight: "10px" }}>
                        {/* Z icon mark */}
                        <table cellPadding="0" cellSpacing="0">
                          <tr>
                            <td style={{
                              width: "32px", height: "32px",
                              backgroundColor: colors.brand,
                              borderRadius: "8px",
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}>
                              <span style={{ color: "#fff", fontSize: "16px", fontWeight: "800", letterSpacing: "-1px", lineHeight: "32px", display: "block" }}>Z</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "800", letterSpacing: "-0.5px" }}>Zari</span>
                      </td>
                    </tr>
                  </table>
                </Column>
              </Row>
              {/* Gradient accent stripe */}
              <Row>
                <Column style={{ paddingTop: "20px" }}>
                  <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ height: "3px", backgroundColor: "#4F46E5", width: "40%" }} />
                      <td style={{ height: "3px", backgroundColor: "#6366F1", width: "30%" }} />
                      <td style={{ height: "3px", backgroundColor: "#818CF8", width: "20%" }} />
                      <td style={{ height: "3px", backgroundColor: "#A5B4FC", width: "10%" }} />
                    </tr>
                  </table>
                </Column>
              </Row>
            </Section>

            {/* ── Body ── */}
            <Section style={{
              backgroundColor: colors.cardBg,
              padding: "40px",
              borderLeft: "1px solid #E2E8F0",
              borderRight: "1px solid #E2E8F0",
            }}>
              {children}
            </Section>

            {/* ── Footer ── */}
            <Section style={{
              backgroundColor: colors.bg,
              borderRadius: "0 0 16px 16px",
              padding: "24px 40px",
              borderTop: `1px solid ${colors.border}`,
              border: "1px solid #E2E8F0",
              borderTopWidth: "0",
            }}>
              <Row>
                <Column>
                  <Text style={{ margin: 0, color: colors.subtle, fontSize: "12px", lineHeight: "1.6" }}>
                    <strong style={{ color: colors.muted }}>Zari</strong> · AI-powered career coaching
                    {" · "}
                    <Link href={APP_URL} style={{ color: colors.muted, textDecoration: "none" }}>
                      zaricoach.com
                    </Link>
                  </Text>
                  <Text style={{ margin: "6px 0 0", color: colors.subtle, fontSize: "12px" }}>
                    <Link href={unsubscribeUrl} style={{ color: colors.subtle, textDecoration: "underline" }}>
                      Unsubscribe
                    </Link>
                    {" · "}
                    You received this because you signed up for Zari.
                  </Text>
                </Column>
              </Row>
            </Section>

          </Container>
        </Section>
      </Body>
    </Html>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
}

export function CtaButton({ href, children }: CtaButtonProps) {
  return (
    <Section style={{ textAlign: "center", margin: "32px 0 0" }}>
      <Button
        href={href}
        style={{
          backgroundColor: colors.brand,
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: "600",
          textDecoration: "none",
          padding: "14px 32px",
          borderRadius: "10px",
          display: "inline-block",
          letterSpacing: "-0.1px",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}

// ─── Highlight box ────────────────────────────────────────────────────────────
interface HighlightProps {
  children: React.ReactNode;
  variant?: "info" | "tip" | "quote";
}

export function Highlight({ children, variant = "info" }: HighlightProps) {
  const borderColor = variant === "tip" ? colors.success : variant === "quote" ? "#A855F7" : colors.brand;
  return (
    <Section style={{
      backgroundColor: colors.accent,
      borderLeft: `4px solid ${borderColor}`,
      borderRadius: "0 10px 10px 0",
      padding: "16px 20px",
      margin: "24px 0",
    }}>
      <Text style={{ margin: 0, color: colors.text, fontSize: "15px", lineHeight: "1.65" }}>
        {children}
      </Text>
    </Section>
  );
}

// ─── Step list ────────────────────────────────────────────────────────────────
interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <Row style={{ marginBottom: "16px" }}>
      <Column style={{ width: "36px", verticalAlign: "top", paddingTop: "2px" }}>
        <table cellPadding="0" cellSpacing="0">
          <tr>
            <td style={{
              width: "28px", height: "28px",
              backgroundColor: colors.brand,
              borderRadius: "50%",
              textAlign: "center",
              verticalAlign: "middle",
            }}>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: "700", lineHeight: "28px", display: "block" }}>{number}</span>
            </td>
          </tr>
        </table>
      </Column>
      <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
        <Text style={{ margin: "0 0 4px", color: colors.text, fontSize: "15px", fontWeight: "700", lineHeight: "1.4" }}>{title}</Text>
        <Text style={{ margin: 0, color: colors.muted, fontSize: "14px", lineHeight: "1.6" }}>{children}</Text>
      </Column>
    </Row>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider() {
  return <Hr style={{ borderColor: "#F1F5F9", margin: "28px 0" }} />;
}

// ─── Body text helpers ────────────────────────────────────────────────────────
export const p = (style?: React.CSSProperties): React.CSSProperties => ({
  margin: "0 0 16px",
  color: colors.text,
  fontSize: "16px",
  lineHeight: "1.7",
  ...style,
});

export const h2 = (style?: React.CSSProperties): React.CSSProperties => ({
  margin: "0 0 20px",
  color: colors.text,
  fontSize: "24px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  ...style,
});

export const muted = (style?: React.CSSProperties): React.CSSProperties => ({
  color: colors.muted,
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "16px 0 0",
  ...style,
});

// ─── Signature ────────────────────────────────────────────────────────────────
export function Signature({ name = "The Zari Team" }: { name?: string }) {
  return (
    <>
      <Divider />
      <Text style={{ margin: 0, color: colors.muted, fontSize: "15px", lineHeight: "1.6" }}>
        All the best,<br />
        <strong style={{ color: colors.text }}>{name}</strong>
      </Text>
    </>
  );
}

// ─── Stat card row ────────────────────────────────────────────────────────────
interface StatProps {
  stats: { value: string; label: string }[];
}

export function StatRow({ stats }: StatProps) {
  return (
    <Section style={{ margin: "24px 0" }}>
      <Row>
        {stats.map((s, i) => (
          <Column key={i} style={{ textAlign: "center", padding: "0 8px" }}>
            <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
              <tr>
                <td style={{
                  backgroundColor: colors.accent,
                  border: `1px solid ${colors.accentBorder}`,
                  borderRadius: "10px",
                  padding: "16px",
                  textAlign: "center",
                }}>
                  <div style={{ color: colors.brand, fontSize: "28px", fontWeight: "800", letterSpacing: "-1px", lineHeight: "1" }}>{s.value}</div>
                  <div style={{ color: colors.muted, fontSize: "12px", marginTop: "4px" }}>{s.label}</div>
                </td>
              </tr>
            </table>
          </Column>
        ))}
      </Row>
    </Section>
  );
}
