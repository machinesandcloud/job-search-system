// Auth is enforced at the page level via getCurrentUserId() in each protected route.
// Running a cookie check here (Netlify Edge Function) caused false-negatives immediately
// after login because the Edge layer doesn't always see cookies set by the serverless
// callback function in the same request cycle.
export function middleware() {}

export const config = { matcher: [] };
