import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/content";

type Props = {
  locale: Locale;
  content: SiteContent;
};

export function Hero({ locale, content }: Props) {
  const { hero } = content.home;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(45,212,191,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(56,189,248,0.15), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="mb-4 text-sm font-medium tracking-wide text-teal-300">
          {hero.eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 text-pretty">
          {hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact/`}
            className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-teal-400"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href={`/${locale}/about-rtl/`}
            className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            {hero.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
