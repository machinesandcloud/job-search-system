ALTER TABLE "Assessment"
  ADD COLUMN IF NOT EXISTS "resumeParsedData" JSONB,
  ADD COLUMN IF NOT EXISTS "linkedinParsedData" JSONB,
  ADD COLUMN IF NOT EXISTS "resumeParseStatus" TEXT,
  ADD COLUMN IF NOT EXISTS "linkedinParseStatus" TEXT,
  ADD COLUMN IF NOT EXISTS "resumeParseError" TEXT,
  ADD COLUMN IF NOT EXISTS "linkedinParseError" TEXT;

CREATE TABLE IF NOT EXISTS "TaskCompletion" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "assessmentId" UUID NOT NULL,
  "taskId" TEXT NOT NULL,
  "completed" BOOLEAN NOT NULL DEFAULT false,
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TaskCompletion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "TaskCompletion_assessmentId_taskId_key" ON "TaskCompletion"("assessmentId", "taskId");
CREATE INDEX IF NOT EXISTS "TaskCompletion_assessmentId_idx" ON "TaskCompletion"("assessmentId");

ALTER TABLE "TaskCompletion"
  ADD CONSTRAINT "TaskCompletion_assessmentId_fkey"
  FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
