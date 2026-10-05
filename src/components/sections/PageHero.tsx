import type { ReactNode } from "react";
import type { PageHeroContent } from "@/lib/content";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Meridians } from "@/components/ui/Meridians";

type PageHeroProps = {
  hero: PageHeroContent;
  breadcrumbs: { label: string; items: Crumb[] };
  children?: ReactNode;
};

/** Hero for inner pages: breadcrumb, eyebrow, H1 and lead on a warm paper background. */
export function PageHero({ hero, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-paper">
      <Meridians className="absolute top-1/2 inset-e-[-14rem] -z-10 size-[40rem] -translate-y-1/2 text-ink-900/[0.07] sm:inset-e-[-8rem]" />
      <Container className="py-14 sm:py-20 lg:py-24">
        <Breadcrumbs label={breadcrumbs.label} items={breadcrumbs.items} />
        <p className="eyebrow mt-12 text-brass-700 motion-safe:animate-rise">{hero.eyebrow}</p>
        <h1 className="type-display mt-5 max-w-4xl text-4xl leading-display text-ink-900 sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-body sm:text-xl">
          {hero.lead}
        </p>
        {children}
      </Container>
    </section>
  );
}
