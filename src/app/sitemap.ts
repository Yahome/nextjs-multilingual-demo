import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

const pages = ["home", "contact", "aboutRtl"] as const;

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(locale, page),
        lastModified: new Date("2026-10-06"),
        changeFrequency: page === "home" ? "weekly" : "monthly",
        priority: page === "home" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
