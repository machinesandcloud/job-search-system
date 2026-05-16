import { redirect } from "next/navigation";

// VideoAsk handles the entire recording + submission flow.
// If the env var isn't set, fall back to the VideoAsk link directly.
const VIDEOASK_URL =
  process.env.NEXT_PUBLIC_VIDEOASK_URL || "https://www.videoask.com/fpmtgm9c4";

export default function VideoReviewPage() {
  redirect(VIDEOASK_URL);
}
