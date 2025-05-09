import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Providers } from "@/components/layout/session-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema de Torneos",
  description: "Plataforma elegante para gestión de torneos y competiciones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
              {children}
            </main>
            <Toaster richColors />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
