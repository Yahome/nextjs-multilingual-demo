"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeState, type NavItem } from "@/lib/routes";

/** Desktop navigation; marks the current page (or its parent section) with aria-current. */
export function MainNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname() ?? "";

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-8 xl:gap-10">
        {items.map((item) => {
          const current = activeState(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current}
                data-active={current ? "" : undefined}
                className="relative py-2 text-[0.9375rem] font-medium text-ink-900/70 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-brass-400 after:transition-transform after:duration-300 hover:text-ink-900 hover:after:scale-x-100 data-active:text-ink-900 data-active:after:scale-x-100"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
