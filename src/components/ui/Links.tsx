import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { Icon } from "./Icons";

const variants = {
  /** Dark button for light surfaces. */
  primary: "bg-ink-900 text-white hover:bg-ink-700 shadow-sm",
  /** Brass button for dark surfaces. */
  accent: "bg-brass-300 text-ink-950 hover:bg-brass-200 shadow-sm",
  /** Outline button that adapts to light or dark surfaces. */
  outline:
    "border border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-ink-900/5 on-dark:border-white/30 on-dark:text-white on-dark:hover:border-white/60 on-dark:hover:bg-white/10",
} as const;

const sizes = { md: "px-6 py-3.5", sm: "px-5 py-2.5" } as const;

type ButtonStyle = { variant?: keyof typeof variants; size?: keyof typeof sizes };

/** Shared by links and `<button>`s so every button looks the same. */
export function buttonClass({ variant = "primary", size = "md" }: ButtonStyle = {}): string {
  return cx(
    "group inline-flex items-center justify-center gap-2.5 rounded-md text-sm font-semibold transition-colors duration-200",
    variants[variant],
    sizes[size],
  );
}

type ButtonLinkProps = ButtonStyle & {
  href: string;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ href, variant, size, arrow, className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cx(buttonClass({ variant, size }), className)}>
      {children}
      {arrow && <ForwardArrow />}
    </Link>
  );
}

type ArrowLinkProps = {
  href: string;
  /** Points back (e.g. "All insights" from an article). */
  back?: boolean;
  className?: string;
  children: ReactNode;
};

/** Text link with an arrow that nudges toward the reading direction on hover. */
export function ArrowLink({ href, back, className, children }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-2 text-sm font-semibold text-ink-900 on-dark:text-white",
        className,
      )}
    >
      {back && <Icon name="arrow" reverse className={cx("size-4", nudge.back)} />}
      <span className="underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-brass-400">
        {children}
      </span>
      {!back && <ForwardArrow />}
    </Link>
  );
}

const nudge = {
  forward: "transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
  back: "transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1",
};

export function ForwardArrow({ className }: { className?: string }) {
  return <Icon name="arrow" className={cx("size-4", nudge.forward, className)} />;
}
