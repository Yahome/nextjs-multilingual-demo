import { CtaBanner } from "@/components/sections/CtaBanner";
import { InsightCard } from "@/components/sections/InsightCard";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { href, insightPath, pageHref, resolveLocale, type LocaleParams } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), "insights");
}

export default async function InsightsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const [site, page, insights] = await Promise.all([
    content.getSite(locale),
    content.getPage(locale, "insights"),
    content.getInsights(locale),
  ]);
  const [featured, ...rest] = insights;
  const cardHref = (slug: string) => href(locale, insightPath(slug));

  return (
    <>
      <PageHero
        hero={page.hero}
        breadcrumbs={{
          label: site.ui.breadcrumb,
          items: [{ label: site.nav.home, href: pageHref(locale, "home") }, { label: site.nav.insights }],
        }}
      />

      <Section>
        {featured && (
          <InsightCard
            locale={locale}
            insight={featured}
            href={cardHref(featured.slug)}
            labels={site.ui}
            featured={{ label: page.featuredLabel }}
            headingLevel="h2"
          />
        )}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {rest.map((insight) => (
            <InsightCard
              key={insight.slug}
              locale={locale}
              insight={insight}
              href={cardHref(insight.slug)}
              labels={site.ui}
              headingLevel="h2"
            />
          ))}
        </div>
      </Section>

      <CtaBanner cta={site.cta} href={pageHref(locale, "contact")} />
    </>
  );
}
