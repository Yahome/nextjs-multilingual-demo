import Link from "next/link";
import type { Service } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icons";
import { ForwardArrow } from "@/components/ui/Links";

/** Icons are presentation, so they are mapped from content ids here rather than stored in the CMS. */
const serviceIcons: Record<string, IconName> = {
  "market-entry": "chart",
  regulatory: "shield",
  partners: "people",
  "entity-setup": "building",
  trade: "truck",
  localization: "language",
};

export function serviceIcon(id: string): IconName {
  return serviceIcons[id] ?? "chart";
}

type ServiceCardProps = { service: Service; index: number; href: string; linkLabel: string };

/** Card with a stretched link: the whole tile is clickable, the title is the accessible name. */
export function ServiceCard({ service, index, href, linkLabel }: ServiceCardProps) {
  return (
    <article className="reveal group relative flex flex-col bg-white p-8 transition-colors duration-300 hover:bg-paper sm:p-10">
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-md bg-ink-900 text-brass-300 transition-transform duration-300 group-hover:-translate-y-0.5">
          <Icon name={serviceIcon(service.id)} className="size-6" />
        </span>
        <span className="type-display text-sm text-muted" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="type-display mt-8 text-2xl leading-tight text-ink-900">
        <Link href={href} className="after:absolute after:inset-0">
          {service.title}
        </Link>
      </h3>
      <p className="mt-4 leading-relaxed text-pretty text-muted">{service.summary}</p>
      <p aria-hidden="true" className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-ink-900">
        {linkLabel}
        <ForwardArrow />
      </p>
    </article>
  );
}
