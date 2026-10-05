import type { SiteSettings } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Links";
import { Meridians } from "@/components/ui/Meridians";

/** Closing call to action shared by most pages. */
export function CtaBanner({ cta, href }: { cta: SiteSettings["cta"]; href: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="reveal surface-dark relative isolate overflow-hidden rounded-2xl bg-ink-900 px-8 py-14 sm:px-14 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-20 lg:py-20">
          <Meridians className="absolute top-1/2 inset-e-[-8rem] -z-10 size-[32rem] -translate-y-1/2 text-white/[0.07]" />
          <div
            aria-hidden="true"
            className="absolute -top-40 inset-s-[-8rem] -z-10 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(201_163_90/0.18),transparent)]"
          />
          <div className="max-w-2xl">
            <h2 id="cta-title" className="type-display text-3xl leading-tight text-white sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-200">{cta.body}</p>
          </div>
          <ButtonLink href={href} variant="accent" arrow className="mt-10 shrink-0 lg:mt-0">
            {cta.button}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
