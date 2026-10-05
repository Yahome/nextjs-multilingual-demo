import type { Metadata } from "next";
import { content, type InsightSummary } from "./content";
import { defaultLocale, getSiteUrl, localeMeta, locales, type Locale } from "./i18n";
import { insightPath, pagePath, type PageKey } from "./routes";

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
};

export function absoluteUrl(locale: Locale, path = ""): string {
  return `${getSiteUrl()}/${locale}/${path}`;
}

/** hreflang map for one locale-relative path, including `x-default`. */
export function alternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeMeta[locale].lang] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(defaultLocale, path);
  return languages;
}

type MetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  siteName: string;
  article?: { publishedTime: string; author: string; section: string };
};

function buildMetadata({ locale, path, title, description, siteName, article }: MetadataInput): Metadata {
  const url = absoluteUrl(locale, path);
  const images = [{ ...ogImage, alt: siteName }];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: alternateLanguages(path) },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images,
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            authors: [article.author],
            section: article.section,
          }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export async function pageMetadata(locale: Locale, page: PageKey): Promise<Metadata> {
  const [site, { meta }] = await Promise.all([
    content.getSite(locale),
    content.getPage(locale, page),
  ]);
  const siteName = site.brand.name;

  return buildMetadata({
    locale,
    path: pagePath(page),
    // The home title already leads with the brand; other pages append it.
    title: page === "home" ? meta.title : `${meta.title} | ${siteName}`,
    description: meta.description,
    siteName,
  });
}

export async function insightMetadata(locale: Locale, insight: InsightSummary): Promise<Metadata> {
  const site = await content.getSite(locale);
  const siteName = site.brand.name;

  return buildMetadata({
    locale,
    path: insightPath(insight.slug),
    title: `${insight.title} | ${siteName}`,
    description: insight.excerpt,
    siteName,
    article: { publishedTime: insight.date, author: insight.author, section: insight.category },
  });
}
