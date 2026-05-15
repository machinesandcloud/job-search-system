import * as React from "react";
import { Text, Row, Column, Section, Hr } from "@react-email/components";
import { colors, font } from "../base";

// Standalone digest email — not part of any sequence, sent directly to Steve.
// Uses a minimal layout (no unsubscribe footer needed — this is an internal report).

interface DigestMetrics {
  weekOf: string;
  newUsers: number;
  activeTrials: number;
  newPaidThisWeek: number;
  mrr: number;
  mrrDelta: number;      // change vs last week (positive = growth)
  churnedThisWeek: number;
  sessionsThisWeek: number;
  avgSessionsPerUser: number;
  atRiskCount: number;
  npsAvg?: number;       // average NPS this week (undefined = no responses)
  topEngagedUsers: Array<{ name: string; email: string; sessions: number }>;
  paymentFailures: number;
}

export function WeeklyDigest(metrics: DigestMetrics) {
  const mrrFormatted = `$${metrics.mrr.toLocaleString()}`;
  const mrrDeltaSign = metrics.mrrDelta >= 0 ? "+" : "";
  const mrrDeltaFormatted = `${mrrDeltaSign}$${Math.abs(metrics.mrrDelta).toLocaleString()}`;
  const mrrDeltaColor = metrics.mrrDelta >= 0 ? "#10B981" : "#EF4444";

  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#F1F5F9", fontFamily: font }}>
        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", backgroundColor: "#F1F5F9", padding: "32px 0" }}>
          <tr>
            <td>
              <table cellPadding="0" cellSpacing="0" style={{ maxWidth: "640px", margin: "0 auto" }}>

                {/* Header */}
                <tr>
                  <td style={{ backgroundColor: "#0D1117", borderRadius: "16px 16px 0 0", padding: "28px 40px" }}>
                    <table cellPadding="0" cellSpacing="0">
                      <tr>
                        <td style={{ verticalAlign: "middle", paddingRight: "12px" }}>
                          <div style={{ width: "32px", height: "32px", backgroundColor: colors.brand, borderRadius: "8px", textAlign: "center", lineHeight: "32px" }}>
                            <span style={{ color: "#fff", fontSize: "16px", fontWeight: "800" }}>Z</span>
                          </div>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <span style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: "800" }}>Zari Weekly Digest</span>
                        </td>
                      </tr>
                    </table>
                    <div style={{ color: "#94A3B8", fontSize: "13px", marginTop: "8px" }}>Week of {metrics.weekOf}</div>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ backgroundColor: "#FFFFFF", padding: "36px 40px", borderLeft: "1px solid #E2E8F0", borderRight: "1px solid #E2E8F0" }}>

                    {/* KPI row */}
                    <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginBottom: "32px" }}>
                      <tr>
                        {[
                          { label: "MRR", value: mrrFormatted, sub: mrrDeltaFormatted, subColor: mrrDeltaColor },
                          { label: "New users", value: String(metrics.newUsers), sub: `${metrics.newPaidThisWeek} paid`, subColor: colors.muted },
                          { label: "Sessions", value: String(metrics.sessionsThisWeek), sub: `${metrics.avgSessionsPerUser.toFixed(1)} avg/user`, subColor: colors.muted },
                          { label: "At risk", value: String(metrics.atRiskCount), sub: `${metrics.churnedThisWeek} churned`, subColor: metrics.atRiskCount > 5 ? "#EF4444" : colors.muted },
                        ].map((kpi, i) => (
                          <td key={i} style={{ width: "25%", padding: "0 6px 0 0" }}>
                            <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                              <tr>
                                <td style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                                  <div style={{ fontSize: "11px", color: colors.muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>{kpi.label}</div>
                                  <div style={{ fontSize: "24px", fontWeight: "800", color: colors.brand, letterSpacing: "-1px", lineHeight: "1" }}>{kpi.value}</div>
                                  <div style={{ fontSize: "11px", color: kpi.subColor, marginTop: "4px", fontWeight: "600" }}>{kpi.sub}</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        ))}
                      </tr>
                    </table>

                    {/* Alerts */}
                    {(metrics.paymentFailures > 0 || metrics.atRiskCount > 5) && (
                      <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginBottom: "28px" }}>
                        <tr>
                          <td style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "16px 20px" }}>
                            <div style={{ fontSize: "13px", fontWeight: "700", color: "#991B1B", marginBottom: "6px" }}>🚨 Needs attention</div>
                            {metrics.paymentFailures > 0 && (
                              <div style={{ fontSize: "14px", color: "#7F1D1D", marginBottom: "4px" }}>
                                • {metrics.paymentFailures} payment failure{metrics.paymentFailures > 1 ? "s" : ""} this week — dunning sequences running
                              </div>
                            )}
                            {metrics.atRiskCount > 5 && (
                              <div style={{ fontSize: "14px", color: "#7F1D1D" }}>
                                • {metrics.atRiskCount} users at risk — re-engagement sequences running
                              </div>
                            )}
                          </td>
                        </tr>
                      </table>
                    )}

                    {/* NPS */}
                    {metrics.npsAvg !== undefined && (
                      <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginBottom: "28px" }}>
                        <tr>
                          <td style={{ backgroundColor: metrics.npsAvg >= 50 ? "#F0FDF4" : "#FFFBEB", border: `1px solid ${metrics.npsAvg >= 50 ? "#BBF7D0" : "#FDE68A"}`, borderRadius: "10px", padding: "16px 20px" }}>
                            <div style={{ fontSize: "13px", color: colors.muted, marginBottom: "4px" }}>NPS this week</div>
                            <div style={{ fontSize: "28px", fontWeight: "800", color: metrics.npsAvg >= 50 ? "#15803D" : "#92400E" }}>
                              {metrics.npsAvg >= 0 ? "+" : ""}{Math.round(metrics.npsAvg)}
                            </div>
                          </td>
                        </tr>
                      </table>
                    )}

                    {/* Top users */}
                    {metrics.topEngagedUsers.length > 0 && (
                      <>
                        <div style={{ fontSize: "14px", fontWeight: "700", color: colors.text, marginBottom: "12px" }}>Most active this week</div>
                        <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginBottom: "28px" }}>
                          {metrics.topEngagedUsers.map((u, i) => (
                            <tr key={i}>
                              <td style={{ padding: "10px 0", borderBottom: i < metrics.topEngagedUsers.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                                <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                                  <tr>
                                    <td>
                                      <div style={{ fontSize: "14px", fontWeight: "600", color: colors.text }}>{u.name}</div>
                                      <div style={{ fontSize: "12px", color: colors.muted }}>{u.email}</div>
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      <span style={{ fontSize: "13px", fontWeight: "700", color: colors.brand }}>{u.sessions} sessions</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          ))}
                        </table>
                      </>
                    )}

                    {/* Trials */}
                    <table cellPadding="0" cellSpacing="0" style={{ width: "100%", borderTop: "1px solid #F1F5F9", paddingTop: "20px" }}>
                      <tr>
                        <td style={{ fontSize: "13px", color: colors.muted }}>Active trials: <strong style={{ color: colors.text }}>{metrics.activeTrials}</strong></td>
                        <td style={{ fontSize: "13px", color: colors.muted, textAlign: "right" }}>Paid conversions this week: <strong style={{ color: "#10B981" }}>{metrics.newPaidThisWeek}</strong></td>
                      </tr>
                    </table>

                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ backgroundColor: "#F8FAFC", borderRadius: "0 0 16px 16px", padding: "20px 40px", border: "1px solid #E2E8F0", borderTopWidth: "0" }}>
                    <div style={{ fontSize: "12px", color: "#94A3B8", textAlign: "center" }}>
                      Zari weekly digest · automated · reply to unsubscribe from this report
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
