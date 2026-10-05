import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/content";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  content: SiteContent;
};

export function Header({ locale, content }: Props) {
  const base = `/${locale}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link href={`${base}/`} className="group min-w-0">
            <span className="block truncate text-base font-semibold tracking-tight text-slate-900 group-hover:text-teal-700">
              {content.brand.name}
            </span>
            <span className="hidden truncate text-xs text-slate-500 sm:block">
              {content.brand.tagline}
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <Link
              href={`${base}/`}
              className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {content.nav.home}
            </Link>
            <Link
              href={`${base}/contact/`}
              className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {content.nav.contact}
            </Link>
            <Link
              href={`${base}/about-rtl/`}
              className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {content.nav.aboutRtl}
            </Link>
          </nav>
        </div>
        <LanguageSwitcher locale={locale} label={content.nav.language} />
      </div>
      <nav
        className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden"
        aria-label="Mobile"
      >
        <Link
          href={`${base}/`}
          className="whitespace-nowrap rounded-md px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
        >
          {content.nav.home}
        </Link>
        <Link
          href={`${base}/contact/`}
          className="whitespace-nowrap rounded-md px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
        >
          {content.nav.contact}
        </Link>
        <Link
          href={`${base}/about-rtl/`}
          className="whitespace-nowrap rounded-md px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
        >
          {content.nav.aboutRtl}
        </Link>
      </nav>
    </header>
  );
}
