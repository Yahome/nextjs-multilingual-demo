import Link from "next/link";
import { Icon } from "./Icons";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ label, items }: { label: string; items: Crumb[] }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <Icon name="chevron" className="size-3.5 text-ink-900/30" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-ink-900">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-ink-900">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
