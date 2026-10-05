import { CtaBanner } from "@/components/sections/CtaBanner";
import { JumpLinks } from "@/components/sections/JumpLinks";
import { PageHero } from "@/components/sections/PageHero";
import { Icon, type IconName } from "@/components/ui/Icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { pageHref, resolveLocale, type LocaleParams } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const industryIcons: Record<string, IconName> = {
  industrial: "cog",
  energy: "bolt",
  healthcare: "heart",
  consumer: "bag",
  technology: "chip",
  logistics: "map",
};

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), "markets");
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-line bg-white p-8">
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-body">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function MarketsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const [site, page, markets, industries] = await Promise.all([
    content.getSite(locale),
    content.getPage(locale, "markets"),
    content.getMarkets(locale),
    content.getIndustries(locale),
  ]);
  const officeById = new Map(site.offices.map((office) => [office.id, office]));

  return (
    <>
      <PageHero
        hero={page.hero}
        breadcrumbs={{
          label: site.ui.breadcrumb,
          items: [{ label: site.nav.home, href: pageHref(locale, "home") }, { label: site.nav.markets }],
        }}
      >
        <JumpLinks
          label={page.jumpLabel}
          items={markets.map((market) => ({ href: `#${market.id}`, label: market.name }))}
        />
      </PageHero>

      {markets.map((market, index) => {
        const office = officeById.get(market.officeId);
        return (
          <Section
            key={market.id}
            id={market.id}
            tone={index % 2 === 0 ? "white" : "paper"}
            labelledBy={`${market.id}-title`}
          >
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="reveal lg:col-span-5">
                {office && (
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <Icon name="pin" className="size-4 text-brass-700" />
                    {page.officeLabel} · {office.city}
                  </p>
                )}
                <h2 id={`${market.id}-title`} className="type-display mt-5 text-4xl leading-tight text-ink-900 sm:text-5xl">
                  {market.name}
                </h2>
                <p className="mt-5 text-xl leading-relaxed text-pretty text-ink-900">{market.tagline}</p>
                <p className="mt-4 leading-relaxed text-pretty text-muted">{market.summary}</p>
                <dl className="mt-10 divide-y divide-line border-y border-line">
                  {market.facts.map((fact) => (
                    <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-muted">{fact.label}</dt>
                      <dd className="text-sm text-ink-900 sm:col-span-2">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="reveal grid gap-6 self-start sm:grid-cols-2 lg:col-span-7 lg:pt-12">
                <BulletList title={page.opportunitiesLabel} items={market.opportunities} />
                <BulletList title={page.considerationsLabel} items={market.considerations} />
              </div>
            </div>
          </Section>
        );
      })}

      <Section tone="ink" labelledBy="industries-title">
        <SectionHeading
          id="industries-title"
          eyebrow={page.industries.eyebrow}
          title={page.industries.title}
          lead={page.industries.lead}
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.id} className="reveal bg-ink-950 p-8 transition-colors duration-300 hover:bg-ink-900 sm:p-10">
              <Icon name={industryIcons[industry.id] ?? "cog"} className="size-7 text-brass-300" />
              <h3 className="type-display mt-6 text-xl text-white">{industry.title}</h3>
              <p className="mt-3 leading-relaxed text-pretty text-ink-300">{industry.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner cta={site.cta} href={pageHref(locale, "contact")} />
    </>
  );
}
