-- Add emailVerified flag to User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- EmailVerification table (mirrors PhoneVerification without the phone field)
CREATE TABLE IF NOT EXISTS "EmailVerification" (
    "id"        UUID         NOT NULL DEFAULT gen_random_uuid(),
    "userId"    UUID         NOT NULL,
    "codeHash"  TEXT         NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "attempts"  INTEGER      NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "EmailVerification_userId_key" ON "EmailVerification"("userId");

ALTER TABLE "EmailVerification"
    ADD CONSTRAINT "EmailVerification_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
