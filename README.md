# Next.js Multilingual Demo (EN / RU / 中文 / العربية)

A small, static-exportable Next.js demo that shows **locale routing**, **Arabic RTL with CSS logical properties**, **hreflang / sitemap SEO**, and a **CMS-ready JSON content layer**. Built as a portfolio example for a multilingual headless-CMS approach targeting Mainland China, Russia, and GCC markets.

This is a technical demonstration — not a live client project.

## What it demonstrates

| Topic | Approach |
| --- | --- |
| Locale routing | App Router `[locale]` segment: `/en`, `/ru`, `/zh-cn`, `/ar`. Root `/` redirects to `/en` (no IP-based auto-detect). |
| RTL | `<html lang dir>` per locale; Arabic uses `dir="rtl"`. Layout uses Tailwind logical utilities (`ms-`/`me-`, `ps-`/`pe-`, `text-start`, `rounded-s`/`rounded-e`) so one component tree mirrors correctly. |
| Content layer | Per-locale dictionaries in `/content/{locale}.json` loaded by a typed helper (`src/lib/content.ts`). Same JSON shape can later be served by a headless CMS. |
| SEO | Per-locale title/description, `hreflang` alternates + `x-default`, canonical URLs, `app/sitemap.ts`, `app/robots.ts`. Base URL from `NEXT_PUBLIC_SITE_URL`. |
| China-friendly fonts | System font stacks only (PingFang / Microsoft YaHei / Noto Sans Arabic / Tahoma, etc.). **No Google Fonts** — Google is blocked on many Mainland China networks. |
| Deploy | `output: 'export'` — works on any static host or Vercel. Middleware omitted because it conflicts with static export; root uses a meta-refresh redirect page instead. |

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- React 19
- Static generation via `generateStaticParams` for all locales

## How to run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # writes static files to out/
npx serve out        # optional: preview the static export
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for production canonical/hreflang/sitemap URLs (default: `https://example.com`).

## Folder structure

```
content/                 # Per-locale JSON dictionaries (CMS-swappable)
src/
  app/
    page.tsx             # Static redirect → /en/
    sitemap.ts / robots.ts
    [locale]/
      layout.tsx         # Sets <html lang> + dir; shared chrome
      page.tsx           # Home (hero, features, CTA)
      contact/           # Localizable client-only form
      about-rtl/         # Explains RTL / logical properties
  components/            # Header, LanguageSwitcher, Hero, …
  lib/                   # i18n helpers, content loader, SEO metadata
```

## Language switcher

The header selector (**EN | RU | 中文 | العربية**) keeps the current path when switching locales (e.g. `/en/contact/` → `/ar/contact/`).

## Notes for a production hand-off

- Swap `/content/*.json` for CMS fetches (or generate the same files at build time from Sanity, Strapi, Contentful, etc.).
- Wire the contact form to an API route or third-party form service when leaving static export.
- Keep logical CSS properties as the default so RTL stays free.
