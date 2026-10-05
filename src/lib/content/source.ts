import type { Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/routes";
import type {
  Industry,
  Insight,
  InsightSummary,
  Market,
  Pages,
  Service,
  SiteSettings,
} from "./types";

/**
 * The only boundary between pages and where content is stored. Implement this
 * interface for a headless CMS (see README → "Headless CMS") and switch the
 * export in `./index.ts`; no component needs to change.
 *
 * Methods are async because a CMS fetch is. With `output: "export"` they run
 * at build time only, so visitors never call the CMS directly.
 */
export interface ContentSource {
  getSite(locale: Locale): Promise<SiteSettings>;
  getPage<K extends PageKey>(locale: Locale, page: K): Promise<Pages[K]>;
  getServices(locale: Locale): Promise<Service[]>;
  getMarkets(locale: Locale): Promise<Market[]>;
  getIndustries(locale: Locale): Promise<Industry[]>;
  /** Newest first, without article bodies. */
  getInsights(locale: Locale): Promise<InsightSummary[]>;
  getInsight(locale: Locale, slug: string): Promise<Insight | null>;
}
