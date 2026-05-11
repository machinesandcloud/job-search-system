-- Add bonus token balance to Subscription for credit top-up packs
ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "bonusTokens" INTEGER NOT NULL DEFAULT 0;
