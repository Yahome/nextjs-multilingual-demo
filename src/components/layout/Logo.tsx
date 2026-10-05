import Link from "next/link";
import { cx } from "@/lib/format";

type LogoProps = { href: string; name: string; className?: string };

export function Logo({ href, name, className }: LogoProps) {
  return (
    <Link href={href} className={cx("group flex shrink-0 items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark className="size-8 sm:size-9 text-ink-900 transition-transform duration-500 group-hover:rotate-[20deg] on-dark:text-white" />
      {/* The brand stays Latin in every locale; isolate it so RTL punctuation cannot reorder it. */}
      <bdi className="font-brand text-[1.0625rem] font-semibold sm:text-xl tracking-tight text-ink-900 on-dark:text-white">
        {name}
      </bdi>
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" focusable="false" className={className}>
      <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.75" />
      <ellipse cx="18" cy="18" rx="7" ry="16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 18h32" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 2v32" className="stroke-brass-400" strokeWidth="2" />
    </svg>
  );
}
