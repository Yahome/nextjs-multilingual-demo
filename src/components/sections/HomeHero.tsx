import type { HomePage, Office } from "@/lib/content";
import { cx } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Links";
import { Meridians } from "@/components/ui/Meridians";
import { RouteMap } from "./RouteMap";

type HomeHeroProps = {
  hero: HomePage["hero"];
  stats: HomePage["stats"];
  offices: Office[];
  primaryHref: string;
  secondaryHref: string;
};

/**
 * Staggered entrance for secondary hero elements only. The headline and lead
 * paint immediately so they count as Largest Contentful Paint; `motion-safe`
 * drops the animation for reduced-motion users.
 */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function HomeHero({ hero, stats, offices, primaryHref, secondaryHref }: HomeHeroProps) {
  return (
    <section className="surface-dark relative isolate overflow-hidden bg-ink-950 text-ink-200">
      {/* Logical insets keep the glow and globe on the map side in both directions. */}
      <div
        aria-hidden="true"
        className="absolute -top-64 inset-e-[-12rem] -z-10 size-[56rem] rounded-full bg-[radial-gradient(closest-side,rgb(201_163_90/0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-80 inset-s-[-16rem] -z-10 size-[48rem] rounded-full bg-[radial-gradient(closest-side,rgb(30_58_92/0.55),transparent)]"
      />
      <Meridians className="absolute -top-40 inset-e-[-10rem] -z-10 size-[44rem] text-white/[0.05]" />

      <Container className="grid items-center gap-14 pt-20 pb-16 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:pt-28 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="eyebrow text-brass-300 motion-safe:animate-rise">{hero.eyebrow}</p>
          <h1 className="type-display mt-6 text-[2.5rem] leading-display text-white sm:text-6xl lg:text-[4rem]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink-200 sm:text-xl">
            {hero.lead}
          </p>
          <div style={delay(240)} className="mt-10 flex flex-wrap gap-4 motion-safe:animate-rise">
            <ButtonLink href={primaryHref} variant="accent" arrow>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={secondaryHref} variant="outline">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div style={delay(200)} className="hidden lg:col-span-6 lg:block motion-safe:animate-rise">
          <RouteMap offices={offices} label={hero.mapLabel} />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cx(
                  "flex flex-col-reverse gap-2 border-white/10 py-8 pe-4 lg:py-10",
                  index % 2 === 1 && "border-s ps-5 sm:ps-6",
                  index === 2 && "lg:border-s lg:ps-6",
                  index >= 2 && "border-t lg:border-t-0",
                )}
              >
                <dt className="text-sm leading-snug text-ink-300">{stat.label}</dt>
                <dd className="type-display text-4xl text-brass-300 lg:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
