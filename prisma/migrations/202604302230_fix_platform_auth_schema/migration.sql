DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PlanTier') THEN
    CREATE TYPE "PlanTier" AS ENUM ('free', 'pro', 'premium', 'team');
  END IF;
END $$;

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "locale" TEXT,
  ADD COLUMN IF NOT EXISTS "planTier" "PlanTier" NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS "consentPersonalize" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS "consentAnalytics" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS "marketingOptIn" BOOLEAN NOT NULL DEFAULT false;

DO $$
BEGIN
  BEGIN
    ALTER TABLE "User"
      ALTER COLUMN "passwordHash" DROP NOT NULL;
  EXCEPTION
    WHEN undefined_column THEN NULL;
  END;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'UserSession'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'AppSession'
  ) THEN
    ALTER TABLE "UserSession" RENAME TO "AppSession";
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "AppSession" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AppSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "AppSession_tokenHash_key" ON "AppSession"("tokenHash");
CREATE INDEX IF NOT EXISTS "AppSession_userId_idx" ON "AppSession"("userId");

DO $$
BEGIN
  BEGIN
    ALTER TABLE "AppSession"
      ADD CONSTRAINT "AppSession_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
END $$;
