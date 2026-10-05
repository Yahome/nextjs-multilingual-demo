import { CtaBanner } from "@/components/sections/CtaBanner";
import { HomeHero } from "@/components/sections/HomeHero";
import { InsightCard } from "@/components/sections/InsightCard";
import { MarketCard } from "@/components/sections/MarketCard";
import { NumberedList } from "@/components/sections/NumberedList";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowLink } from "@/components/ui/Links";
import { Section, SectionHeading } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { getSiteUrl } from "@/lib/i18n";
import { href, insightPath, pageHref, resolveLocale, type LocaleParams } from "@/lib/routes";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), "home");
}

export default async function HomePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const [site, page, services, markets, insights] = await Promise.all([
    content.getSite(locale),
    content.getPage(locale, "home"),
    content.getServices(locale),
    content.getMarkets(locale),
    content.getInsights(locale),
  ]);
  const officeById = new Map(site.offices.map((office) => [office.id, office]));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.brand.name,
          description: site.brand.description,
          url: absoluteUrl(locale),
          logo: `${getSiteUrl()}/apple-icon.png`,
          email: site.email,
          address: site.offices.map((office) => ({
            "@type": "PostalAddress",
            addressLocality: office.city,
            addressCountry: office.countryCode,
          })),
        }}
      />

      <HomeHero
        hero={page.hero}
        stats={page.stats}
        offices={site.offices}
        primaryHref={pageHref(locale, "contact")}
        secondaryHref={pageHref(locale, "services")}
      />

      <Section labelledBy="services-title">
        <SectionHeading
          id="services-title"
          eyebrow={page.services.eyebrow}
          title={page.services.title}
          lead={page.services.lead}
          action={<ArrowLink href={pageHref(locale, "services")}>{page.services.link}</ArrowLink>}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              href={pageHref(locale, "services", service.id)}
              linkLabel={site.ui.learnMore}
            />
          ))}
        </div>
      </Section>

      <Section tone="paper" labelledBy="approach-title">
        <SectionHeading
          id="approach-title"
          eyebrow={page.approach.eyebrow}
          title={page.approach.title}
          lead={page.approach.lead}
        />
        <NumberedList items={page.approach.steps} className="mt-16" />
      </Section>

      <Section tone="ink" labelledBy="markets-title">
        <SectionHeading
          id="markets-title"
          eyebrow={page.markets.eyebrow}
          title={page.markets.title}
          lead={page.markets.lead}
          action={<ArrowLink href={pageHref(locale, "markets")}>{page.markets.link}</ArrowLink>}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {markets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              office={officeById.get(market.officeId)}
              href={pageHref(locale, "markets", market.id)}
              linkLabel={site.ui.learnMore}
            />
          ))}
        </div>
      </Section>

      <Section labelledBy="insights-title">
        <SectionHeading
          id="insights-title"
          eyebrow={page.insights.eyebrow}
          title={page.insights.title}
          lead={page.insights.lead}
          action={<ArrowLink href={pageHref(locale, "insights")}>{page.insights.link}</ArrowLink>}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {insights.slice(0, 3).map((insight) => (
            <InsightCard
              key={insight.slug}
              locale={locale}
              insight={insight}
              href={href(locale, insightPath(insight.slug))}
              labels={site.ui}
            />
          ))}
        </div>
      </Section>

      <CtaBanner cta={site.cta} href={pageHref(locale, "contact")} />
    </>
  );
}
