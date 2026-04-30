import { MvpAuthForm } from "@/components/mvp-auth-form";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ authError?: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const authError = Array.isArray(query.authError) ? query.authError[0] : query.authError;
  return <MvpAuthForm mode="signup" authError={authError || null} />;
}
