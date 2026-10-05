import { CtaBanner } from "@/components/sections/CtaBanner";
import { JumpLinks } from "@/components/sections/JumpLinks";
import { PageHero } from "@/components/sections/PageHero";
import { serviceIcon } from "@/components/sections/ServiceCard";
import { Icon } from "@/components/ui/Icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { pageHref, resolveLocale, type LocaleParams } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), "services");
}

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const [site, page, services] = await Promise.all([
    content.getSite(locale),
    content.getPage(locale, "services"),
    content.getServices(locale),
  ]);

  return (
    <>
      <PageHero
        hero={page.hero}
        breadcrumbs={{
          label: site.ui.breadcrumb,
          items: [{ label: site.nav.home, href: pageHref(locale, "home") }, { label: site.nav.services }],
        }}
      >
        <JumpLinks
          label={page.jumpLabel}
          items={services.map((service) => ({ href: `#${service.id}`, label: service.title }))}
        />
      </PageHero>

      <Section className="pt-8! sm:pt-12!">
        {services.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-title`}
            className="reveal grid gap-8 border-b border-line py-14 last:border-b-0 lg:grid-cols-12 lg:gap-12 lg:py-16"
          >
            <div className="flex items-start gap-6 lg:col-span-6">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-ink-900 text-brass-300">
                <Icon name={serviceIcon(service.id)} className="size-7" />
              </span>
              <div>
                <p className="type-display text-sm text-muted" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${service.id}-title`} className="type-display mt-1 text-3xl leading-tight text-ink-900">
                  {service.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{service.summary}</p>
              </div>
            </div>
            <div className="rounded-xl bg-paper p-8 lg:col-span-6">
              <h3 className="text-sm font-semibold text-ink-900">{page.deliverablesLabel}</h3>
              <ul className="mt-5 space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-body">
                    <Icon name="check" className="mt-1 size-5 text-brass-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </Section>

      <Section tone="paper" labelledBy="engagement-title">
        <SectionHeading
          id="engagement-title"
          eyebrow={page.engagement.eyebrow}
          title={page.engagement.title}
          lead={page.engagement.lead}
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {page.engagement.models.map((model) => (
            <li
              key={model.title}
              className="reveal rounded-xl border border-line bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-ink-900/25 hover:shadow-xl hover:shadow-ink-900/5"
            >
              <h3 className="type-display text-2xl text-ink-900">{model.title}</h3>
              <p className="mt-4 leading-relaxed text-pretty text-muted">{model.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner cta={site.cta} href={pageHref(locale, "contact")} />
    </>
  );
}
