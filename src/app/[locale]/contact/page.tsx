import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { pageHref, resolveLocale, type LocaleParams } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), "contact");
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const [site, page, markets] = await Promise.all([
    content.getSite(locale),
    content.getPage(locale, "contact"),
    content.getMarkets(locale),
  ]);
  const { form, details } = page;
  const marketOptions = [
    ...markets.map((market) => ({ value: market.id, label: market.name })),
    { value: "other", label: form.fields.marketOther },
  ];

  return (
    <>
      <PageHero
        hero={page.hero}
        breadcrumbs={{
          label: site.ui.breadcrumb,
          items: [{ label: site.nav.home, href: pageHref(locale, "home") }, { label: site.nav.contact }],
        }}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <section aria-labelledby="form-title" className="lg:col-span-7">
            <h2 id="form-title" className="type-display text-3xl text-ink-900">
              {form.title}
            </h2>
            <div className="mt-8">
              <ContactForm copy={form} marketOptions={marketOptions} />
            </div>
          </section>

          <aside aria-labelledby="details-title" className="lg:col-span-5">
            <div className="rounded-xl bg-paper p-8 sm:p-10">
              <h2 id="details-title" className="type-display text-2xl text-ink-900">
                {details.title}
              </h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm text-muted">{details.emailLabel}</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.email}`}
                      dir="ltr"
                      className="text-lg font-semibold text-ink-900 underline decoration-brass-400 underline-offset-4 transition-colors hover:text-ink-700"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 flex gap-3 text-sm leading-relaxed text-body">
                <Icon name="clock" className="mt-0.5 size-5 text-brass-700" />
                {details.responseTime}
              </p>

              <h3 className="mt-10 border-t border-line pt-8 text-sm font-semibold text-ink-900">
                {details.officesTitle}
              </h3>
              <ul className="mt-6 space-y-6">
                {site.offices.map((office) => (
                  <li key={office.id} className="flex gap-4">
                    <Icon name="pin" className="mt-1 size-5 text-brass-700" />
                    <div>
                      <p className="font-semibold text-ink-900">{office.city}</p>
                      <p className="mt-1 text-sm leading-relaxed text-body">{office.address}</p>
                      <p className="mt-1 text-sm text-muted">
                        <span dir="ltr">{office.timezone}</span> · {office.hours}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
