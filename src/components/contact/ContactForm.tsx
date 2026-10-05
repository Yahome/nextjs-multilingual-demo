"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { ContactFormContent } from "@/lib/content";
import { cx } from "@/lib/format";
import { Icon } from "@/components/ui/Icons";
import { ForwardArrow, buttonClass } from "@/components/ui/Links";
import { Field, FieldError, controlClass } from "./Field";

type FieldName = "name" | "email" | "company" | "market" | "message" | "consent";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "sent";

/** DOM order, so the first invalid field receives focus. */
const fieldOrder: FieldName[] = ["name", "email", "company", "market", "message", "consent"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData, copy: ContactFormContent["errors"]): Errors {
  const value = (field: FieldName) => String(data.get(field) ?? "").trim();
  const errors: Errors = {};
  for (const field of ["name", "company", "market", "message"] as const) {
    if (!value(field)) errors[field] = copy.required;
  }
  const email = value("email");
  if (!email) errors.email = copy.required;
  else if (!emailPattern.test(email)) errors.email = copy.email;
  if (!data.get("consent")) errors.consent = copy.consent;
  return errors;
}

type ContactFormProps = {
  copy: ContactFormContent;
  marketOptions: { value: string; label: string }[];
};

/**
 * Validates in the page language (browser messages would follow the browser
 * locale instead), links every error to its field and moves focus to the first
 * problem. Static-export demo: submission is simulated in the browser.
 */
export function ContactForm({ copy, marketOptions }: ContactFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const focusFormAfterReset = useRef(false);
  const uid = useId();
  const fieldId = (field: FieldName) => `${uid}-${field}`;
  const { fields } = copy;

  useEffect(() => {
    if (status === "sent") {
      successRef.current?.focus();
    } else if (status === "idle" && focusFormAfterReset.current) {
      focusFormAfterReset.current = false;
      formRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
    }
  }, [status]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(new FormData(form), copy.errors);
    setErrors(nextErrors);

    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 600);
  }

  /** Once a field has an error, re-check it as the user corrects it. */
  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const name = event.target.name as FieldName;
    if (!errors[name]) return;
    const fieldError = validate(new FormData(event.currentTarget), copy.errors)[name];
    setErrors((current) => ({ ...current, [name]: fieldError }));
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-line bg-paper p-8 sm:p-10">
        <Icon name="checkCircle" className="size-10 text-brass-700" />
        <h3 ref={successRef} tabIndex={-1} className="type-display mt-5 text-2xl text-ink-900 focus:outline-none">
          {copy.success.title}
        </h3>
        <p className="mt-3 leading-relaxed text-pretty text-muted">{copy.success.body}</p>
        <button
          type="button"
          onClick={() => {
            focusFormAfterReset.current = true;
            setErrors({});
            setStatus("idle");
          }}
          className={cx(buttonClass({ variant: "outline" }), "mt-8")}
        >
          {copy.success.reset}
        </button>
      </div>
    );
  }

  const consentErrorId = `${fieldId("consent")}-error`;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onChange={onChange} className="space-y-6">
      <p className="text-sm text-muted">{copy.requiredNote}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("name")} label={fields.name} error={errors.name}>
          {(control) => <input {...control} name="name" autoComplete="name" required className={controlClass} />}
        </Field>
        <Field id={fieldId("email")} label={fields.email} error={errors.email}>
          {(control) => (
            /* Addresses are Latin: keep them LTR but aligned with the other fields in RTL. */
            <input
              {...control}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              dir="ltr"
              required
              placeholder={fields.emailPlaceholder}
              className={cx(controlClass, "rtl:text-end")}
            />
          )}
        </Field>
        <Field id={fieldId("company")} label={fields.company} error={errors.company}>
          {(control) => (
            <input {...control} name="company" autoComplete="organization" required className={controlClass} />
          )}
        </Field>
        <Field id={fieldId("market")} label={fields.market} error={errors.market}>
          {(control) => (
            <div className="relative">
              <select {...control} name="market" required defaultValue="" className={cx(controlClass, "appearance-none pe-11")}>
                <option value="" disabled>
                  {fields.marketPlaceholder}
                </option>
                {marketOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon
                name="chevronDown"
                className="pointer-events-none absolute inset-y-0 inset-e-4 my-auto size-4 text-muted"
              />
            </div>
          )}
        </Field>
      </div>

      <Field id={fieldId("message")} label={fields.message} error={errors.message}>
        {(control) => (
          <textarea
            {...control}
            name="message"
            rows={5}
            required
            placeholder={fields.messagePlaceholder}
            className={cx(controlClass, "resize-y")}
          />
        )}
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? consentErrorId : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-ink-900"
          />
          <label htmlFor={fieldId("consent")} className="cursor-pointer text-sm leading-relaxed text-body">
            {fields.consent}
          </label>
        </div>
        {errors.consent && <FieldError id={consentErrorId}>{errors.consent}</FieldError>}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted sm:max-w-xs">{copy.demoNote}</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className={cx(buttonClass(), "disabled:cursor-wait disabled:opacity-70")}
        >
          {status === "sending" ? copy.sending : copy.submit}
          <ForwardArrow />
        </button>
      </div>
    </form>
  );
}
