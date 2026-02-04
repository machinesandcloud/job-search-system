"use client";

import { Button } from "@/components/ui/button";

export function ProPackActions({ token }: { token: string }) {
  const downloadPdf = () => {
    window.open(`/api/results/${token}/pdf`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={downloadPdf}>Download PDF</Button>
    </div>
  );
}
