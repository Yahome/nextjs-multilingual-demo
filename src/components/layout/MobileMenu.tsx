"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useRef, useState } from "react";
import { activeState, type NavItem } from "@/lib/routes";
import { cx } from "@/lib/format";
import { useDismiss } from "@/lib/use-dismiss";
import { Icon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/Links";

type MobileMenuProps = {
  items: NavItem[];
  cta: NavItem;
  labels: { nav: string; open: string; close: string };
};

/** Small-screen navigation: a disclosure panel that drops below the sticky header. */
export function MobileMenu({ items, cta, labels }: MobileMenuProps) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  useDismiss(open, close, rootRef, buttonRef);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex size-10 items-center justify-center rounded-md text-ink-900 transition-colors hover:bg-ink-900/5"
      >
        <Icon name={open ? "close" : "menu"} className="size-6" />
        <span className="sr-only">{open ? labels.close : labels.open}</span>
      </button>

      {open && (
        <nav
          id={panelId}
          aria-label={labels.nav}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] animate-drop-in overflow-y-auto border-b border-line bg-white shadow-xl shadow-ink-900/10"
        >
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {items.map((item) => {
              const current = activeState(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line/70 last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={current}
                    onClick={close}
                    className={cx(
                      "flex items-center justify-between py-4 text-lg transition-colors",
                      current ? "font-semibold text-ink-900" : "text-body hover:text-ink-900",
                    )}
                  >
                    {item.label}
                    <Icon name="chevron" className="size-4 text-ink-900/40" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
            <Link href={cta.href} onClick={close} className={cx(buttonClass(), "w-full")}>
              {cta.label}
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
