"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ResultsPayload } from "@/lib/results";

function buildMarkdown(results: ResultsPayload) {
  return `# Job Search System\n\n## Coach read\n${results.coachRead}\n\n## Positioning\n${results.positioningSummary}\n\n## Score\n${results.score}/100\n\n## Weekly cadence\n${results.cadence
    .map((week) => `- **${week.week}** (${week.focus})\n  ${week.actions.map((action) => `- ${action}`).join("\n  ")}`)
    .join("\n")}\n\n## Checklist\n${results.checklist.map((item) => `- ${item}`).join("\n")}\n\n## Scripts\n- Referral: ${results.scripts.referral}\n- Recruiter: ${results.scripts.recruiter}\n- Follow-ups:\n${results.scripts.followup.map((line) => `  - ${line}`).join("\n")}\n\n## Proof strategy\n${results.proofStrategy.map((item) => `- ${item}`).join("\n")}\n`;
}

export function ProPackActions({
  token,
  results,
  leadId,
}: {
  token: string;
  results: ResultsPayload;
  leadId: string;
}) {
  const [copied, setCopied] = useState(false);
  const markdown = buildMarkdown(results);

  const copyToNotion = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, type: "notion_copied" }),
    });
  };

  const downloadPdf = () => {
    window.open(`/api/results/${token}/pdf`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={copyToNotion} variant="outline">
        {copied ? "Copied!" : "Copy to Notion"}
      </Button>
      <Button onClick={downloadPdf}>Download PDF</Button>
    </div>
  );
}
