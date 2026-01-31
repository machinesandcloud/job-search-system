import { prisma } from "./db";

export async function logEvent(type: string, metadata: Record<string, any> = {}, leadId?: string | null) {
  return prisma.event.create({
    data: {
      type,
      metadata,
      leadId: leadId ?? null,
    },
  });
}
