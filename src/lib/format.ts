import { localeMeta, type Locale } from "./i18n";

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Long, localized date for an ISO `YYYY-MM-DD` string (UTC to avoid off-by-one days). */
export function formatDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(localeMeta[locale].intl, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

/** "6 minutes", "6 минут", "6分钟", "6 دقائق" — Intl handles plural rules. */
export function formatMinutes(locale: Locale, minutes: number): string {
  return new Intl.NumberFormat(localeMeta[locale].intl, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
  }).format(minutes);
}
