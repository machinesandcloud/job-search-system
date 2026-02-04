import { Suspense } from "react";
import PreviewClient from "./preview-client";

export default function ResultsPreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0E27]" />}>
      <PreviewClient />
    </Suspense>
  );
}
