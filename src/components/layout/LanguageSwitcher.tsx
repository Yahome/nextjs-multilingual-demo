"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useRef, useState } from "react";
import { localeMeta, locales, swapLocalePath, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/format";
import { useDismiss } from "@/lib/use-dismiss";
import { Icon } from "@/components/ui/Icons";

/** Language disclosure; keeps the visitor on the same page when switching locale. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}/`;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  useDismiss(open, close, rootRef, buttonRef);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-1.5 rounded-md px-2 text-sm sm:px-2.5 font-medium text-ink-900/80 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
      >
        <Icon name="globe" className="size-5" />
        <span className="sr-only">{label}: </span>
        <span>{localeMeta[locale].label}</span>
        <Icon name="chevronDown" className={cx("hidden size-3.5 transition-transform duration-200 sm:block", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          id={listId}
          className="absolute inset-e-0 top-full z-50 mt-2 w-48 animate-drop-in rounded-lg border border-line bg-white p-1.5 shadow-xl shadow-ink-900/10"
        >
          {locales.map((loc) => {
            const meta = localeMeta[loc];
            const current = loc === locale;
            return (
              <li key={loc}>
                <Link
                  href={swapLocalePath(pathname, loc)}
                  hrefLang={meta.lang}
                  aria-current={current ? "page" : undefined}
                  onClick={close}
                  className={cx(
                    "flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                    current ? "bg-paper font-semibold text-ink-900" : "text-body hover:bg-paper hover:text-ink-900",
                  )}
                >
                  <span lang={meta.lang} dir="auto">
                    {meta.nativeName}
                  </span>
                  {current && <Icon name="check" className="size-4 text-brass-700" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
