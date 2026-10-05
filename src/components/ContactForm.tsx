"use client";

import { useState, FormEvent } from "react";
import type { SiteContent } from "@/lib/content";

type Props = {
  content: SiteContent;
};

export function ContactForm({ content }: Props) {
  const { fields, success, errors } = content.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !company.trim() || !message.trim()) {
      setError(errors.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(errors.email);
      return;
    }

    setPending(true);
    // Client-side only demo — simulate a short delay then show success.
    window.setTimeout(() => {
      setPending(false);
      setDone(true);
    }, 450);
  }

  if (done) {
    return (
      <div
        className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-start"
        role="status"
      >
        <h2 className="text-xl font-semibold text-teal-900">{success.title}</h2>
        <p className="mt-2 text-teal-800 text-pretty">{success.body}</p>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          {fields.name}
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={fields.namePlaceholder}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          {fields.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={fields.emailPlaceholder}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700">
          {fields.company}
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={fields.companyPlaceholder}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          {fields.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={fields.messagePlaceholder}
          className={inputClass}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? fields.sending : fields.submit}
      </button>
    </form>
  );
}
