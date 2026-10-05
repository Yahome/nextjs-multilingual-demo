import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/content";

type Props = {
  locale: Locale;
  content: SiteContent;
};

export function CTA({ locale, content }: Props) {
  const { cta } = content.home;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-semibold tracking-tight text-white text-balance sm:text-3xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300 text-pretty">{cta.body}</p>
        <Link
          href={`/${locale}/contact/`}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
        >
          {cta.button}
        </Link>
      </div>
    </section>
  );
}
