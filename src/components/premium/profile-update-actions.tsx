"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProfileUpdateActions({
  assessmentId,
  token,
  kind,
}: {
  assessmentId: string;
  token: string;
  kind?: "resume" | "linkedin";
}) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    if (!assessmentId) return;
    setSaving(true);
    setStatus(null);
    try {
      await fetch("/api/ai/ensure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId }),
      });
      setStatus("Scores refreshed.");
      router.refresh();
    } catch (_err) {
      setStatus("Unable to refresh scores.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (file: File) => {
    if (!assessmentId || !file) return;
    const form = new FormData();
    form.append("assessmentId", assessmentId);
    form.append("kind", kind || "resume");
    form.append("file", file);
    await fetch("/api/leads/upload", { method: "POST", body: form });
    await refresh();
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href={`/job-search-system/start?token=${token}`}
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80"
      >
        Update assessment inputs
      </Link>
      {kind ? (
        <label className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
          Re-upload {kind}
          <input
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              handleUpload(file);
              event.target.value = "";
            }}
          />
        </label>
      ) : null}
      <button
        type="button"
        onClick={refresh}
        disabled={saving}
        className="rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-4 py-2 text-xs font-semibold text-white"
      >
        {saving ? "Refreshing..." : "Save updates + refresh score"}
      </button>
      {status && <span className="text-xs text-white/60">{status}</span>}
    </div>
  );
}
