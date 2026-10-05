import type { NavItem } from "@/lib/routes";

/** In-page anchor chips (e.g. jump to a service or market). */
export function JumpLinks({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <nav aria-label={label} className="mt-10">
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="inline-flex rounded-full border border-ink-900/15 bg-white/70 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900 hover:bg-white"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
