-- CreateTable
CREATE TABLE IF NOT EXISTS "UserPortalState" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserPortalState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "UserPortalState_userId_key_key" ON "UserPortalState"("userId", "key");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "UserPortalState_userId_idx" ON "UserPortalState"("userId");

-- AddForeignKey
ALTER TABLE "UserPortalState" ADD CONSTRAINT "UserPortalState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
