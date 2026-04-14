import { cookies } from "next/headers";

export const sessionCookieName = "askia_mvp_uid";

export async function getCurrentUserId() {
  const cookieStore = await cookies();
  return cookieStore.get(sessionCookieName)?.value || null;
}
