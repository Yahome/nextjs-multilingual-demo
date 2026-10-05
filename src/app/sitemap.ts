import type { MetadataRoute } from "next";
import { content } from "@/lib/content";
import { defaultLocale, locales } from "@/lib/i18n";
import { insightPath, pageKeys, pagePath } from "@/lib/routes";
import { absoluteUrl, alternateLanguages } from "@/lib/seo";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

/** One entry per locale, each listing every language version (xhtml:link hreflang). */
function localized(path: string, extra: Partial<Entry>): MetadataRoute.Sitemap {
  const languages = alternateLanguages(path);
  return locales.map((locale) => ({
    url: absoluteUrl(locale, path),
    alternates: { languages },
    ...extra,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insights = await content.getInsights(defaultLocale);

  return [
    ...pageKeys.flatMap((page) =>
      localized(pagePath(page), {
        changeFrequency: page === "home" || page === "insights" ? "weekly" : "monthly",
        priority: page === "home" ? 1 : 0.8,
      }),
    ),
    ...insights.flatMap((insight) =>
      localized(insightPath(insight.slug), {
        lastModified: insight.date,
        changeFrequency: "yearly",
        priority: 0.6,
      }),
    ),
  ];
}
