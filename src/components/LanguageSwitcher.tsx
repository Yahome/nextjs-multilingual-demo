"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, swapLocalePath, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: Props) {
  const pathname = usePathname() || `/${locale}/`;

  return (
    <div
      className="flex flex-wrap items-center gap-1 text-sm"
      role="navigation"
      aria-label={label}
    >
      {locales.map((loc, index) => {
        const active = loc === locale;
        return (
          <span key={loc} className="inline-flex items-center gap-1">
            {index > 0 && (
              <span className="text-slate-300 select-none" aria-hidden>
                |
              </span>
            )}
            <Link
              href={swapLocalePath(pathname, loc)}
              hrefLang={localeMeta[loc].hreflang}
              className={
                active
                  ? "rounded-md bg-slate-900 px-2 py-1 font-medium text-white"
                  : "rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }
              aria-current={active ? "page" : undefined}
            >
              {localeMeta[loc].label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
