import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { InsightCard, InsightMeta } from "@/components/sections/InsightCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowLink } from "@/components/ui/Links";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { getSiteUrl, isLocale, localeMeta } from "@/lib/i18n";
import { href, insightPath, pageHref, resolveLocale } from "@/lib/routes";
import { absoluteUrl, insightMetadata } from "@/lib/seo";

type InsightParams = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

/** Runs once per locale from the parent layout; slugs are shared across locales. */
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const insights = await content.getInsights(params.locale);
  return insights.map((insight) => ({ slug: insight.slug }));
}

async function loadInsight(params: InsightParams["params"]) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const insight = await content.getInsight(locale, slug);
  if (!insight) notFound();
  return { locale, insight };
}

export async function generateMetadata({ params }: InsightParams) {
  const { locale, insight } = await loadInsight(params);
  return insightMetadata(locale, insight);
}

export default async function InsightPage({ params }: InsightParams) {
  const { locale, insight } = await loadInsight(params);
  const [site, page, insights] = await Promise.all([
    content.getSite(locale),
    content.getPage(locale, "insights"),
    content.getInsights(locale),
  ]);
  const related = insights.filter((item) => item.slug !== insight.slug).slice(0, 3);
  const url = absoluteUrl(locale, insightPath(insight.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.excerpt,
          datePublished: insight.date,
          inLanguage: localeMeta[locale].lang,
          articleSection: insight.category,
          author: { "@type": "Person", name: insight.author },
          publisher: {
            "@type": "Organization",
            name: site.brand.name,
            logo: { "@type": "ImageObject", url: `${getSiteUrl()}/apple-icon.png` },
          },
          image: `${getSiteUrl()}/og-image.png`,
          mainEntityOfPage: url,
        }}
      />

      <article aria-labelledby="article-title">
        <header className="border-b border-line bg-paper">
          <Container className="max-w-4xl! py-14 sm:py-20">
            <Breadcrumbs
              label={site.ui.breadcrumb}
              items={[
                { label: site.nav.home, href: pageHref(locale, "home") },
                { label: site.nav.insights, href: pageHref(locale, "insights") },
                { label: insight.title },
              ]}
            />
            <div className="mt-12 motion-safe:animate-rise">
              <InsightMeta locale={locale} insight={insight} readingTimeLabel={site.ui.readingTime} />
            </div>
            <h1 id="article-title" className="type-display mt-6 text-4xl leading-display text-ink-900 sm:text-5xl">
              {insight.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-pretty text-body">
              {insight.excerpt}
            </p>
            <p className="mt-8 flex items-center gap-3 text-sm text-ink-900">
              <span aria-hidden="true" className="h-px w-8 bg-brass-400" />
              {insight.author}
            </p>
          </Container>
        </header>

        <Container className="max-w-3xl! py-16 sm:py-20">
          {insight.body.map((section) => (
            <section key={section.heading} className="mt-12 first:mt-0">
              <h2 className="type-display text-2xl leading-tight text-ink-900 sm:text-3xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-lg leading-relaxed text-pretty text-body">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <div className="mt-16 border-t border-line pt-8">
            <ArrowLink href={pageHref(locale, "insights")} back>
              {page.backLabel}
            </ArrowLink>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section tone="paper" labelledBy="related-title">
          <h2 id="related-title" className="type-display text-3xl text-ink-900">
            {page.moreTitle}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {related.map((item) => (
              <InsightCard
                key={item.slug}
                locale={locale}
                insight={item}
                href={href(locale, insightPath(item.slug))}
                labels={site.ui}
              />
            ))}
          </div>
        </Section>
      )}

      <CtaBanner cta={site.cta} href={pageHref(locale, "contact")} />
    </>
  );
}
