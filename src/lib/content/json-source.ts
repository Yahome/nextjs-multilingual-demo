import type { Locale } from "@/lib/i18n";
import type { ContentSource } from "./source";
import type { Insight, InsightSummary, LocaleContent } from "./types";

import en from "../../../content/en.json";
import ru from "../../../content/ru.json";
import zhCn from "../../../content/zh-cn.json";
import ar from "../../../content/ar.json";

/** Type-checked at build time: a locale file that drifts from the contract fails `next build`. */
const dictionaries: Record<Locale, LocaleContent> = { en, ru, "zh-cn": zhCn, ar };

function toSummary({ slug, date, category, author, readingMinutes, title, excerpt }: Insight): InsightSummary {
  return { slug, date, category, author, readingMinutes, title, excerpt };
}

export const jsonSource: ContentSource = {
  async getSite(locale) {
    return dictionaries[locale].site;
  },
  async getPage(locale, page) {
    return dictionaries[locale].pages[page];
  },
  async getServices(locale) {
    return dictionaries[locale].services;
  },
  async getMarkets(locale) {
    return dictionaries[locale].markets;
  },
  async getIndustries(locale) {
    return dictionaries[locale].industries;
  },
  async getInsights(locale) {
    return [...dictionaries[locale].insights]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(toSummary);
  },
  async getInsight(locale, slug) {
    return dictionaries[locale].insights.find((insight) => insight.slug === slug) ?? null;
  },
};
