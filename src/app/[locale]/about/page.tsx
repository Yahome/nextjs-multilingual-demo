import { CtaBanner } from "@/components/sections/CtaBanner";
import { NumberedList } from "@/components/sections/NumberedList";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { pageHref, resolveLocale, type LocaleParams } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), "about");
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const [site, page] = await Promise.all([content.getSite(locale), content.getPage(locale, "about")]);
  const { story, values, milestones, leadership } = page;

  return (
    <>
      <PageHero
        hero={page.hero}
        breadcrumbs={{
          label: site.ui.breadcrumb,
          items: [{ label: site.nav.home, href: pageHref(locale, "home") }, { label: site.nav.about }],
        }}
      />

      <Section labelledBy="story-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading id="story-title" eyebrow={story.eyebrow} title={story.title} className="lg:col-span-5" />
          <div className="reveal space-y-6 lg:col-span-7 lg:pt-10">
            {story.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-xl leading-relaxed text-pretty text-ink-900"
                    : "text-lg leading-relaxed text-pretty text-body"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow={values.eyebrow} title={values.title} lead={values.lead} />
        <NumberedList items={values.items} className="mt-16" />
      </Section>

      <Section labelledBy="milestones-title">
        <SectionHeading id="milestones-title" eyebrow={milestones.eyebrow} title={milestones.title} />
        {/* Vertical timeline on small screens (line on the inline-start edge), horizontal on large ones. */}
        <ol className="mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {milestones.items.map((item) => (
            <li
              key={item.year}
              className="reveal relative border-s border-line ps-8 lg:border-s-0 lg:border-t lg:ps-0 lg:pt-10"
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 -inset-s-[5px] size-2.5 rounded-full bg-brass-400 ring-4 ring-white lg:-top-[5px] lg:inset-s-0"
              />
              <p className="type-display text-3xl text-brass-700">{item.year}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" labelledBy="leadership-title">
        <SectionHeading
          id="leadership-title"
          eyebrow={leadership.eyebrow}
          title={leadership.title}
          lead={leadership.lead}
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {leadership.people.map((person) => (
            <li
              key={person.name}
              className="reveal flex flex-col rounded-xl border border-line border-t-brass-400 border-t-2 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5"
            >
              <p className="text-sm font-medium text-brass-700">
                {person.role} · {person.office}
              </p>
              <h3 className="type-display mt-3 text-2xl text-ink-900">{person.name}</h3>
              <p className="mt-4 mb-6 leading-relaxed text-pretty text-muted">{person.bio}</p>
              <div className="mt-auto border-t border-line pt-5">
                <p className="text-xs font-semibold text-muted">{leadership.languagesLabel}</p>
                <p className="mt-1 text-sm text-ink-900">{person.languages}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner cta={site.cta} href={pageHref(locale, "contact")} />
    </>
  );
}
