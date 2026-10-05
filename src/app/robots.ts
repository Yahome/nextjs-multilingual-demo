import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/i18n";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
