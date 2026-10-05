import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./i18n";

export const pageKeys = ["home", "about", "services", "markets", "insights", "contact"] as const;
export type PageKey = (typeof pageKeys)[number];

/** Locale-relative path of each page (trailing slash matches `trailingSlash: true`). */
const pagePaths: Record<PageKey, string> = {
  home: "",
  about: "about/",
  services: "services/",
  markets: "markets/",
  insights: "insights/",
  contact: "contact/",
};

export function pagePath(page: PageKey): string {
  return pagePaths[page];
}

export function insightPath(slug: string): string {
  return `insights/${slug}/`;
}

/** Root-relative href, e.g. `href("ar", "services/")` → `/ar/services/`. */
export function href(locale: Locale, path = "", hash?: string): string {
  return `/${locale}/${path}${hash ? `#${hash}` : ""}`;
}

export function pageHref(locale: Locale, page: PageKey, hash?: string): string {
  return href(locale, pagePath(page), hash);
}

export type NavItem = { href: string; label: string };

/** "page" for the current URL, "true" for a parent section (e.g. an article under Insights). */
export function activeState(pathname: string, target: string): "page" | "true" | undefined {
  const current = pathname.replace(/\/+$/, "");
  const link = target.split("#")[0].replace(/\/+$/, "");
  if (current === link) return "page";
  const isLocaleHome = link.split("/").filter(Boolean).length === 1;
  return !isLocaleHome && current.startsWith(`${link}/`) ? "true" : undefined;
}

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Validates the `[locale]` segment and narrows it to `Locale`. */
export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
