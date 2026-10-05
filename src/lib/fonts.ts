import { Inter, Source_Serif_4 } from "next/font/google";
import type { Locale } from "./i18n";

/*
 * Latin fonts: next/font downloads them at build time and serves them from the
 * site's own origin (visitors never request fonts.googleapis.com). Only the
 * Latin subsets are preloaded; Cyrillic loads on demand via unicode-range.
 */
export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const fontVariables = [sans.variable, serif.variable].join(" ");

/*
 * Script-specific fonts live in /public/fonts with stable URLs (declared in
 * globals.css) so each locale can preload only what it renders: Arabic pages
 * get IBM Plex Sans Arabic early, other locales never download it.
 * Chinese uses the OS fonts (PingFang SC / Microsoft YaHei).
 */
export const localeFontPreloads: Partial<Record<Locale, string[]>> = {
  ar: ["/fonts/ibm-plex-sans-arabic-400.woff2", "/fonts/ibm-plex-sans-arabic-700.woff2"],
};
