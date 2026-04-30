-- Restore the current coaching-core tables expected by platform auth/profile sync.
-- Older production databases were migrated through the billing/admin path but never
-- got these app tables, which caused signup to fail on CoachProfile access.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SessionMode') THEN
    CREATE TYPE "SessionMode" AS ENUM ('resume', 'linkedin', 'interview', 'career', 'confidence', 'recap');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SessionStatus') THEN
    CREATE TYPE "SessionStatus" AS ENUM ('ready', 'live', 'reviewing', 'complete', 'failed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'MessageRole') THEN
    CREATE TYPE "MessageRole" AS ENUM ('system', 'user', 'assistant', 'tool');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'DocumentType') THEN
    CREATE TYPE "DocumentType" AS ENUM ('resume', 'linkedin', 'cover_letter', 'interview_notes', 'miscellaneous');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'DocumentStatus') THEN
    CREATE TYPE "DocumentStatus" AS ENUM ('uploaded', 'parsing', 'indexed', 'reviewed', 'failed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ReviewType') THEN
    CREATE TYPE "ReviewType" AS ENUM ('resume', 'linkedin');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'FeedbackType') THEN
    CREATE TYPE "FeedbackType" AS ENUM ('thumbs_up', 'thumbs_down', 'rating');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "CoachProfile" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "currentRole" TEXT,
  "targetRole" TEXT,
  "experienceLevel" TEXT,
  "geography" TEXT,
  "goals" JSONB NOT NULL,
  "painPoints" JSONB NOT NULL,
  "preferences" JSONB,
  "onboardingAnswers" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CoachProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CoachingSession" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "mode" "SessionMode" NOT NULL,
  "status" "SessionStatus" NOT NULL DEFAULT 'ready',
  "title" TEXT NOT NULL,
  "summary" TEXT,
  "actionPlanDraft" JSONB,
  "transcriptSummary" JSONB,
  "realtimeProvider" TEXT,
  "realtimeSessionId" TEXT,
  "avatarProvider" TEXT,
  "avatarSessionId" TEXT,
  "startedAt" TIMESTAMP(3),
  "endedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CoachingSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SessionMessage" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "sessionId" UUID NOT NULL,
  "role" "MessageRole" NOT NULL,
  "content" TEXT NOT NULL,
  "toolName" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SessionMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Document" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "sessionId" UUID,
  "type" "DocumentType" NOT NULL,
  "status" "DocumentStatus" NOT NULL DEFAULT 'uploaded',
  "fileName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "storagePath" TEXT NOT NULL,
  "extractedText" TEXT,
  "extractedJson" JSONB,
  "pageMap" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DocumentReview" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "sessionId" UUID,
  "documentId" UUID NOT NULL,
  "type" "ReviewType" NOT NULL,
  "overallScore" INTEGER,
  "atsScore" INTEGER,
  "clarityScore" INTEGER,
  "impactScore" INTEGER,
  "positioningScore" INTEGER,
  "findings" JSONB NOT NULL,
  "rewrittenBullets" JSONB,
  "tailoringSuggestions" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DocumentReview_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ActionPlan" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "details" TEXT,
  "priority" TEXT NOT NULL,
  "dueAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "source" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ActionPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Memory" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "label" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "relevance" TEXT,
  "source" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "UsageEvent" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "eventType" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UsageEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Feedback" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "sessionId" UUID,
  "type" "FeedbackType" NOT NULL,
  "rating" INTEGER,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "CoachProfile_userId_key" ON "CoachProfile"("userId");
CREATE INDEX IF NOT EXISTS "CoachingSession_userId_createdAt_idx" ON "CoachingSession"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "CoachingSession_status_idx" ON "CoachingSession"("status");
CREATE INDEX IF NOT EXISTS "SessionMessage_sessionId_createdAt_idx" ON "SessionMessage"("sessionId", "createdAt");
CREATE INDEX IF NOT EXISTS "Document_userId_createdAt_idx" ON "Document"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "Document_sessionId_idx" ON "Document"("sessionId");
CREATE INDEX IF NOT EXISTS "DocumentReview_documentId_createdAt_idx" ON "DocumentReview"("documentId", "createdAt");
CREATE INDEX IF NOT EXISTS "DocumentReview_sessionId_idx" ON "DocumentReview"("sessionId");
CREATE INDEX IF NOT EXISTS "ActionPlan_userId_createdAt_idx" ON "ActionPlan"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "Memory_userId_createdAt_idx" ON "Memory"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "UsageEvent_userId_createdAt_idx" ON "UsageEvent"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "UsageEvent_eventType_idx" ON "UsageEvent"("eventType");
CREATE INDEX IF NOT EXISTS "Feedback_userId_createdAt_idx" ON "Feedback"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "Feedback_sessionId_idx" ON "Feedback"("sessionId");

DO $$
BEGIN
  BEGIN
    ALTER TABLE "CoachProfile"
      ADD CONSTRAINT "CoachProfile_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "CoachingSession"
      ADD CONSTRAINT "CoachingSession_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "SessionMessage"
      ADD CONSTRAINT "SessionMessage_sessionId_fkey"
      FOREIGN KEY ("sessionId") REFERENCES "CoachingSession"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "Document"
      ADD CONSTRAINT "Document_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "Document"
      ADD CONSTRAINT "Document_sessionId_fkey"
      FOREIGN KEY ("sessionId") REFERENCES "CoachingSession"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "DocumentReview"
      ADD CONSTRAINT "DocumentReview_sessionId_fkey"
      FOREIGN KEY ("sessionId") REFERENCES "CoachingSession"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "DocumentReview"
      ADD CONSTRAINT "DocumentReview_documentId_fkey"
      FOREIGN KEY ("documentId") REFERENCES "Document"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "ActionPlan"
      ADD CONSTRAINT "ActionPlan_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "Memory"
      ADD CONSTRAINT "Memory_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "UsageEvent"
      ADD CONSTRAINT "UsageEvent_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "Feedback"
      ADD CONSTRAINT "Feedback_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "Feedback"
      ADD CONSTRAINT "Feedback_sessionId_fkey"
      FOREIGN KEY ("sessionId") REFERENCES "CoachingSession"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
END $$;
