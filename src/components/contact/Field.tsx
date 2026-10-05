import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icons";

export type ControlProps = {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  /** Receives the id and ARIA wiring for the control so label and error stay linked. */
  children: (control: ControlProps) => ReactNode;
};

export const controlClass =
  "block w-full rounded-md border border-ink-900/20 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-muted transition-colors hover:border-ink-900/40 focus-visible:border-ink-900 aria-invalid:border-danger";

export function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-900">
        {label}
      </label>
      <div className="mt-2">
        {children({
          id,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
        })}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
      <Icon name="alert" className="size-4" />
      {children}
    </p>
  );
}
