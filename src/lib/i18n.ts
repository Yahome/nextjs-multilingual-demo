export const locales = ["en", "ru", "zh-cn", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type LocaleMeta = {
  /** BCP 47 tag used for `<html lang>` and `hreflang`. */
  lang: string;
  dir: "ltr" | "rtl";
  /** Compact label for the language switcher button. */
  label: string;
  /** Language name written in that language. */
  nativeName: string;
  /** Locale used for Intl date and number formatting. */
  intl: string;
  ogLocale: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { lang: "en", dir: "ltr", label: "EN", nativeName: "English", intl: "en-GB", ogLocale: "en_GB" },
  ru: { lang: "ru", dir: "ltr", label: "RU", nativeName: "Русский", intl: "ru-RU", ogLocale: "ru_RU" },
  "zh-cn": { lang: "zh-CN", dir: "ltr", label: "中文", nativeName: "简体中文", intl: "zh-CN", ogLocale: "zh_CN" },
  ar: { lang: "ar", dir: "rtl", label: "عربي", nativeName: "العربية", intl: "ar-AE", ogLocale: "ar_AE" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://example.com";
  return raw.replace(/\/$/, "");
}

/** Swap the locale prefix in a pathname while keeping the rest of the path. */
export function swapLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${nextLocale}/`;
  }
  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }
  return `/${segments.join("/")}/`;
}
