import type { ReactNode } from "react";
import "./globals.css";

/**
 * Passthrough root layout (next-intl style). Document shell (<html lang/dir>)
 * lives in app/[locale]/layout.tsx. Root `/` page provides its own shell for
 * the static redirect used with `output: 'export'`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
