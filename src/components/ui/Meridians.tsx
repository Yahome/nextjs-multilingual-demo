import { cx } from "@/lib/format";

/** Decorative globe outline (meridians and parallels). Symmetric, so it never needs mirroring. */
export function Meridians({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
      focusable="false"
      className={cx("pointer-events-none", className)}
    >
      <circle cx="200" cy="200" r="199" />
      <ellipse cx="200" cy="200" rx="140" ry="199" />
      <ellipse cx="200" cy="200" rx="75" ry="199" />
      <path d="M200 1v398" />
      <ellipse cx="200" cy="200" rx="199" ry="70" />
      <path d="M1 200h398" />
      <path d="M28 100h344M28 300h344" />
    </svg>
  );
}
