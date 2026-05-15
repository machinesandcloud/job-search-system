CREATE TABLE "EmailSequenceEnrollment" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sequence" TEXT NOT NULL,
    "step" INTEGER NOT NULL DEFAULT 0,
    "nextSendAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailSequenceEnrollment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "EmailSequenceEnrollment_email_sequence_key" ON "EmailSequenceEnrollment"("email", "sequence");
CREATE INDEX "EmailSequenceEnrollment_nextSendAt_idx" ON "EmailSequenceEnrollment"("nextSendAt");
CREATE INDEX "EmailSequenceEnrollment_sequence_idx" ON "EmailSequenceEnrollment"("sequence");
