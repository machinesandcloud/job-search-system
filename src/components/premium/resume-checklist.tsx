"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ResumeIssue = {
  id?: string;
  severity?: string;
  location?: string;
  issue?: string;
  suggestedFix?: string;
};

export function ResumeChecklist({
  assessmentId,
  issues,
}: {
  assessmentId: string;
  issues: ResumeIssue[];
}) {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const ids = useMemo(() => issues.map((issue, index) => issue.id || `issue-${index}`), [issues]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const save = async () => {
    if (!assessmentId) return;
    setSaving(true);
    setStatus(null);
    try {
      const selected = ids.filter((id) => checked[id]);
      await Promise.all(
        selected.map((id) =>
          fetch("/api/resume/apply-fix", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assessmentId, issueId: id }),
          }).catch(() => null)
        )
      );
      await fetch("/api/ai/ensure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId }),
      });
      setStatus("Saved. Scores refreshed.");
      router.refresh();
    } catch (_err) {
      setStatus("Unable to refresh scores. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {issues.map((issue, index) => {
        const id = issue.id || `issue-${index}`;
        return (
          <label key={id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-[#0B1220] p-4">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-emerald-400"
              checked={Boolean(checked[id])}
              onChange={() => toggle(id)}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="uppercase tracking-[0.2em]">{issue.severity || "Priority"} priority</span>
                <span>{issue.location || "Resume"}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{issue.issue || "Resume improvement"}</p>
              <p className="mt-2 text-sm text-white/70">{issue.suggestedFix || "Apply the suggested fix."}</p>
            </div>
          </label>
        );
      })}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-4 py-2 text-xs font-semibold text-white"
        >
          {saving ? "Saving..." : "Save updates + refresh score"}
        </button>
        {status && <p className="text-xs text-white/60">{status}</p>}
      </div>
    </div>
  );
}
