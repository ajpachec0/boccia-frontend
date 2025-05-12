// app/(protected)/layout.tsx
import Providers from "@/components/layout/session-provider";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
