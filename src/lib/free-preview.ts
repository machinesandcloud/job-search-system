export const FREE_PREVIEW_COOKIE_NAME = "zari_free_preview";
export const FREE_PREVIEW_COOKIE_TTL_SECONDS = 60 * 60 * 24 * 30;

export function buildFreePreviewCookieValue(userId: string) {
  return `${userId}:${Date.now()}`;
}

export function hasFreePreviewAccess(cookieValue: string | undefined, userId: string) {
  if (!cookieValue || !userId) return false;
  return cookieValue.split(":")[0] === userId;
}
