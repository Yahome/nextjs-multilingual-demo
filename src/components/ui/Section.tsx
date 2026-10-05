import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { Container } from "./Container";

const tones = {
  white: "bg-white",
  paper: "bg-paper",
  ink: "surface-dark bg-ink-950 text-ink-200",
} as const;

type SectionProps = {
  tone?: keyof typeof tones;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ tone = "white", id, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx("py-20 sm:py-24 lg:py-28", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Optional link or button shown at the inline end on wide screens. */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, lead, action, className }: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "reveal flex flex-col gap-6",
        action ? "lg:flex-row lg:items-end lg:justify-between" : undefined,
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow text-brass-700 on-dark:text-brass-300">{eyebrow}</p>}
        <h2
          id={id}
          className="type-display mt-4 text-3xl leading-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] on-dark:text-white"
        >
          {title}
        </h2>
        {lead && (
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted on-dark:text-ink-300">{lead}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
