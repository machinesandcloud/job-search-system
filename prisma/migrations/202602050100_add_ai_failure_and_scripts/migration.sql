ALTER TABLE "Assessment" ADD COLUMN IF NOT EXISTS "aiFailureReason" TEXT;
ALTER TABLE "Assessment" ADD COLUMN IF NOT EXISTS "personalizedScripts" JSONB;
