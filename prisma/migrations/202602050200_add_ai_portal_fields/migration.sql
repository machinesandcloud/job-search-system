-- Add AI portal fields
ALTER TABLE "Assessment" ADD COLUMN IF NOT EXISTS "coverLetterKit" JSONB;
ALTER TABLE "Assessment" ADD COLUMN IF NOT EXISTS "interviewPrep" JSONB;
ALTER TABLE "Assessment" ADD COLUMN IF NOT EXISTS "companyStrategies" JSONB;
ALTER TABLE "Assessment" ADD COLUMN IF NOT EXISTS "careerAnalysis" JSONB;

-- Ensure company slug exists for search
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "slug" TEXT;
UPDATE "Company"
SET "slug" = lower(regexp_replace("name", '[^a-z0-9]+', '-', 'g'))
WHERE "slug" IS NULL OR "slug" = '';
ALTER TABLE "Company" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "Company_slug_key" ON "Company"("slug");
