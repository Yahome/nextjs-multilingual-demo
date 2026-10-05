import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { getSiteUrl, localeMeta, locales } from "./i18n";
import { getContent } from "./content";

type PageKey = "home" | "contact" | "aboutRtl";

const pagePaths: Record<PageKey, string> = {
  home: "",
  contact: "contact/",
  aboutRtl: "about-rtl/",
};

export function localizedPath(locale: Locale, page: PageKey = "home"): string {
  return `/${locale}/${pagePaths[page]}`;
}

export function absoluteUrl(locale: Locale, page: PageKey = "home"): string {
  return `${getSiteUrl()}${localizedPath(locale, page)}`;
}

export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const content = getContent(locale);
  const pageMeta = content.meta[page];
  const canonical = absoluteUrl(locale, page);
  const languages: Record<string, string> = {};

  for (const loc of locales) {
    languages[localeMeta[loc].hreflang] = absoluteUrl(loc, page);
  }
  languages["x-default"] = absoluteUrl("en", page);

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: pageMeta.title,
      description: pageMeta.description,
      url: canonical,
      locale: localeMeta[locale].hreflang.replace("-", "_"),
      type: "website",
      siteName: content.brand.name,
    },
  };
}
