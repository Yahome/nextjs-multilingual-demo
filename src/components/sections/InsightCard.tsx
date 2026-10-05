import Link from "next/link";
import type { InsightSummary } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { cx, formatDate, formatMinutes } from "@/lib/format";
import { Icon } from "@/components/ui/Icons";
import { ForwardArrow } from "@/components/ui/Links";

type InsightCardProps = {
  locale: Locale;
  insight: InsightSummary;
  href: string;
  labels: { readArticle: string; readingTime: string };
  /** Larger, two-column layout for the lead article on the Insights page. */
  featured?: { label: string };
  /** h2 when the cards are the page's main list, h3 under a section heading. */
  headingLevel?: "h2" | "h3";
};

type InsightMetaProps = { locale: Locale; insight: InsightSummary; readingTimeLabel: string };

/** Category, publication date and reading time, formatted for the locale. */
export function InsightMeta({ locale, insight, readingTimeLabel }: InsightMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
      <span className="rounded-full bg-brass-200/50 px-3 py-1 text-xs font-semibold text-brass-700">
        {insight.category}
      </span>
      <time dateTime={insight.date}>{formatDate(locale, insight.date)}</time>
      <span className="flex items-center gap-1.5">
        <Icon name="clock" className="size-4" />
        <span className="sr-only">{readingTimeLabel}: </span>
        {formatMinutes(locale, insight.readingMinutes)}
      </span>
    </div>
  );
}

export function InsightCard({ locale, insight, href, labels, featured, headingLevel = "h3" }: InsightCardProps) {
  const Heading = headingLevel;
  return (
    <article
      className={cx(
        "reveal group relative flex flex-col rounded-xl border border-line bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-ink-900/25 hover:shadow-xl hover:shadow-ink-900/5",
        featured && "lg:grid lg:grid-cols-2 lg:gap-14 lg:bg-paper lg:p-12",
      )}
    >
      <div>
        {featured && <p className="eyebrow mb-6 text-brass-700">{featured.label}</p>}
        <InsightMeta locale={locale} insight={insight} readingTimeLabel={labels.readingTime} />
        <Heading
          className={cx(
            "type-display mt-6 leading-tight text-ink-900",
            featured ? "text-3xl lg:text-4xl" : "text-2xl",
          )}
        >
          <Link href={href} className="after:absolute after:inset-0 after:rounded-xl">
            {insight.title}
          </Link>
        </Heading>
      </div>
      <div className={cx("flex flex-1 flex-col", featured && "lg:justify-end")}>
        <p className={cx("mt-4 leading-relaxed text-pretty text-muted", featured && "lg:mt-0 lg:text-lg")}>
          {insight.excerpt}
        </p>
        <p aria-hidden="true" className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-ink-900">
          {labels.readArticle}
          <ForwardArrow />
        </p>
      </div>
    </article>
  );
}
