import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getUserSession } from "@/lib/user-auth";

export async function getAuthorizedAssessment(token: string) {
  const assessment = await prisma.assessment.findUnique({ where: { token } });
  if (!assessment) return notFound();
  const session = await getUserSession();
  const isOwner = session && assessment.userId && session.userId === assessment.userId;
  return { assessment, session, isOwner };
}
