import { auth } from "@/auth";
import { LoginForm } from "@/components/login/login-form";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <LoginForm />
    </>
  );
}
