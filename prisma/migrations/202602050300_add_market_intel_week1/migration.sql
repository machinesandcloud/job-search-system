-- Add market intelligence, week1 plan, personalization data, and progress tracking fields
ALTER TABLE "Assessment"
  ADD COLUMN "marketIntelligence" JSONB,
  ADD COLUMN "week1Plan" JSONB,
  ADD COLUMN "personalizationData" JSONB,
  ADD COLUMN "progressPercentage" DOUBLE PRECISION,
  ADD COLUMN "lastActivityAt" TIMESTAMP;
