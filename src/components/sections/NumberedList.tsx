import type { TextItem } from "@/lib/content";
import { cx } from "@/lib/format";

/** Numbered principles or process steps with a hairline on the block-start edge. */
export function NumberedList({ items, className }: { items: TextItem[]; className?: string }) {
  return (
    <ol className={cx("grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item, index) => (
        <li key={item.title} className="reveal border-t border-ink-900/15 pt-8 on-dark:border-white/15">
          <span className="type-display text-4xl text-brass-700 on-dark:text-brass-300" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-lg font-semibold text-ink-900 on-dark:text-white">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-pretty text-muted on-dark:text-ink-300">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
