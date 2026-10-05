import type { Locale } from "./i18n";
import { locales } from "./i18n";

import en from "../../content/en.json";
import ru from "../../content/ru.json";
import zhCn from "../../content/zh-cn.json";
import ar from "../../content/ar.json";

/**
 * Typed content loader. Dictionaries live in /content/{locale}.json so the
 * shape can later be fed by a headless CMS (same JSON contract per locale).
 */
export type SiteContent = typeof en;

const dictionaries: Record<Locale, SiteContent> = {
  en,
  ru,
  "zh-cn": zhCn,
  ar,
};

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

export function getAllLocaleContent(): { locale: Locale; content: SiteContent }[] {
  return locales.map((locale) => ({ locale, content: dictionaries[locale] }));
}
