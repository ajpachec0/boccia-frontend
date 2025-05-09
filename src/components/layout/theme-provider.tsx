"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...Props }: ThemeProviderProps) {
  return <NextThemeProvider {...Props}>{children}</NextThemeProvider>;
}
