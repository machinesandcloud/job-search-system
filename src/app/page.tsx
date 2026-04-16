import { getCurrentUserId } from "@/lib/mvp/auth";
import { HomeClient } from "@/components/home-client";

export default async function HomePage() {
  const userId = await getCurrentUserId();
  return <HomeClient userId={Boolean(userId)} />;
}
