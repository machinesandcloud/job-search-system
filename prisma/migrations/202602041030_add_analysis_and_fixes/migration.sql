ALTER TABLE "Assessment"
  ADD COLUMN IF NOT EXISTS "resumeRawText" TEXT,
  ADD COLUMN IF NOT EXISTS "linkedinRawText" TEXT,
  ADD COLUMN IF NOT EXISTS "resumeAnalysis" JSONB,
  ADD COLUMN IF NOT EXISTS "linkedinAnalysis" JSONB,
  ADD COLUMN IF NOT EXISTS "companyMatches" JSONB,
  ADD COLUMN IF NOT EXISTS "actionPlan" JSONB,
  ADD COLUMN IF NOT EXISTS "customHeadline" TEXT,
  ADD COLUMN IF NOT EXISTS "customAbout" TEXT;

CREATE TABLE IF NOT EXISTS "AppliedFix" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "assessmentId" UUID NOT NULL,
  "issueId" TEXT NOT NULL,
  "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AppliedFix_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "AppliedFix_assessmentId_issueId_key" ON "AppliedFix"("assessmentId", "issueId");
CREATE INDEX IF NOT EXISTS "AppliedFix_assessmentId_idx" ON "AppliedFix"("assessmentId");

ALTER TABLE "AppliedFix"
  ADD CONSTRAINT "AppliedFix_assessmentId_fkey"
  FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
