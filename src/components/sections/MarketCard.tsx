import Link from "next/link";
import type { Market, Office } from "@/lib/content";
import { Icon } from "@/components/ui/Icons";
import { ForwardArrow } from "@/components/ui/Links";

type MarketCardProps = { market: Market; office?: Office; href: string; linkLabel: string };

/** Market teaser for dark surfaces. */
export function MarketCard({ market, office, href, linkLabel }: MarketCardProps) {
  return (
    <article className="reveal group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-brass-300/40 hover:bg-white/[0.06] sm:p-10">
      {office && (
        <p className="flex items-center gap-2 text-sm text-ink-300">
          <Icon name="pin" className="size-4 text-brass-300" />
          {office.city}
        </p>
      )}
      <h3 className="type-display mt-6 text-3xl leading-tight text-white">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-xl">
          {market.name}
        </Link>
      </h3>
      <p className="mt-4 leading-relaxed text-pretty text-ink-300">{market.tagline}</p>
      <p aria-hidden="true" className="mt-auto flex items-center gap-2 pt-10 text-sm font-semibold text-brass-300">
        {linkLabel}
        <ForwardArrow />
      </p>
    </article>
  );
}
