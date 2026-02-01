-- CreateTable
CREATE TABLE "LeadAsset" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "content" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadAsset_leadId_idx" ON "LeadAsset"("leadId");

-- AddForeignKey
ALTER TABLE "LeadAsset" ADD CONSTRAINT "LeadAsset_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
