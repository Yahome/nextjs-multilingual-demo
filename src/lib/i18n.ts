export const locales = ["en", "ru", "zh-cn", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type LocaleMeta = {
  lang: string;
  dir: "ltr" | "rtl";
  label: string;
  hreflang: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { lang: "en", dir: "ltr", label: "EN", hreflang: "en" },
  ru: { lang: "ru", dir: "ltr", label: "RU", hreflang: "ru" },
  "zh-cn": { lang: "zh-CN", dir: "ltr", label: "中文", hreflang: "zh-CN" },
  ar: { lang: "ar", dir: "rtl", label: "العربية", hreflang: "ar" },
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
