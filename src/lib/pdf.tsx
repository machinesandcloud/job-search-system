import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResultsPayload } from "./results";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, fontFamily: "Helvetica" },
  section: { marginBottom: 16 },
  title: { fontSize: 18, marginBottom: 8 },
  subtitle: { fontSize: 12, marginBottom: 6 },
  pill: { padding: 6, backgroundColor: "#111827", color: "#fff", borderRadius: 6, marginRight: 6 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  listItem: { marginBottom: 4 },
});

export function ResultsPdf({
  results,
  proPack,
}: {
  results: ResultsPayload;
  proPack?: {
    shortlist: { name: string }[];
    missingKeywords: string[];
    outreachScripts: string[];
    interviewPrep: string[];
    negotiationScripts: string[];
  };
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Job Search System</Text>
          <Text>Role: {results.role}</Text>
          <Text>Score: {results.score}/100</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Key insights</Text>
          {results.insights.map((insight) => (
            <Text key={insight} style={styles.listItem}>- {insight}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Weekly cadence</Text>
          {results.cadence.map((week) => (
            <View key={week.week} style={{ marginBottom: 8 }}>
              <Text>{week.week} - {week.focus}</Text>
              {week.actions.map((action) => (
                <Text key={action} style={styles.listItem}>- {action}</Text>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>14-day execution checklist</Text>
          {results.checklist.map((item) => (
            <Text key={item} style={styles.listItem}>- {item}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Scripts</Text>
          <Text>Referral ask: {results.scripts.referral}</Text>
          <Text>Recruiter opener: {results.scripts.recruiter}</Text>
          {results.scripts.followup.map((line) => (
            <Text key={line} style={styles.listItem}>- {line}</Text>
          ))}
        </View>
        {proPack && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Pro Pack</Text>
            <Text>Shortlist:</Text>
            {proPack.shortlist.map((item) => (
              <Text key={item.name} style={styles.listItem}>- {item.name}</Text>
            ))}
            <Text>Missing keywords:</Text>
            {proPack.missingKeywords.map((keyword) => (
              <Text key={keyword} style={styles.listItem}>- {keyword}</Text>
            ))}
            <Text>Outreach scripts:</Text>
            {proPack.outreachScripts.map((script) => (
              <Text key={script} style={styles.listItem}>- {script}</Text>
            ))}
            <Text>Interview prep:</Text>
            {proPack.interviewPrep.map((item) => (
              <Text key={item} style={styles.listItem}>- {item}</Text>
            ))}
            <Text>Negotiation scripts:</Text>
            {proPack.negotiationScripts.map((item) => (
              <Text key={item} style={styles.listItem}>- {item}</Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
