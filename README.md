# Meridian Partners: Multilingual Corporate Website Demo (EN / RU / 中文 / العربية)

> **This is a technical demo, not a real client project.** The company, people, and figures shown on the site are fictional (this is also noted in the footer).

**Live preview:** https://yahome.github.io/nextjs-multilingual-demo/

A statically exportable Next.js 16 corporate website demo aimed at clients in mainland China, Russia, and the Gulf (GCC) countries. It has 6 pages in 4 languages, with full right-to-left (RTL) support for Arabic. Content is stored in JSON and read through a content interface layer, so it can later be swapped for Sanity or Strapi.

## Pages

| Page | Path | Main content |
| --- | --- | --- |
| Home | `/{locale}/` | Hero (route map of the three offices), key figures, services, approach, markets, latest articles, CTA |
| About | `/{locale}/about/` | Company story, principles, history (timeline), partners |
| Services | `/{locale}/services/` | 6 services (with deliverables, anchor-linkable), engagement models |
| Markets & Industries | `/{locale}/markets/` | Mainland China, Russia & the Eurasian Economic Union, the Gulf states; 6 industries |
| Insights | `/{locale}/insights/` | Article list (latest article featured), plus 4 article detail pages at `/{locale}/insights/{slug}/` |
| Contact | `/{locale}/contact/` | Form (client-side validation), email, three offices and their time zones |

`{locale}` is one of `en`, `ru`, `zh-cn`, `ar`. The root path `/` redirects to `/en/` (no IP-based detection) and also shows links to all four languages. The 404 page is displayed in all four languages at once.

## Tech Stack & Running Locally

- Next.js 16 (App Router, `output: "export"`) + React 19 + TypeScript (strict) + Tailwind CSS v4
- No third-party scripts, analytics, or external CDN requests at runtime

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # checks that all four locales are in sync, then builds to out/
npm start              # previews out/ with serve
npm run lint
npm run typecheck      # next typegen + tsc --noEmit
npm run check:content  # content sync check only
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` (used as the domain for canonical URLs, hreflang, the sitemap, and Open Graph).

## Project Structure

```
content/{locale}.json        # one content file per language (identical structure)
scripts/check-content.mjs    # content sync check (runs automatically before build)
public/og-image.png          # Open Graph share image, 1200×630
public/fonts/                # Arabic font (self-hosted) + OFL license
src/
  app/
    [locale]/                # 6 pages + insights/[slug]
    layout.tsx / page.tsx    # root layout (pass-through) and root-path redirect
    not-found.tsx            # four-language 404
    sitemap.ts / robots.ts
    icon.svg / apple-icon.png / favicon.ico
    globals.css              # design tokens, per-language typography, animations
  components/
    layout/                  # Header, MainNav, MobileMenu, LanguageSwitcher, Footer, Logo
    sections/                # HomeHero, RouteMap, PageHero, card variants, CtaBanner
    contact/                 # ContactForm, Field
    ui/                      # Container, Section, buttons/links, icons, breadcrumbs, JsonLd
  lib/
    content/                 # content layer: types, source (interface), json-source, index
    i18n.ts / routes.ts      # locale config, routing and path utilities
    seo.ts                   # metadata, hreflang, Open Graph
    fonts.ts / format.ts / use-dismiss.ts
```

## Design

- **Color palette**: deep navy (`ink`) + brass (`brass`) + warm white (`paper`), all defined in `@theme` in `globals.css`. Text-to-background contrast is ≥ 4.5:1 throughout.
- **Typography**: Source Serif 4 for headings, Inter for body text, IBM Plex Sans Arabic for Arabic, and system fonts for Chinese (PingFang SC / Microsoft YaHei).
- **Per-language typography**: no duplicated components; CSS variables are simply redefined on `html[lang]`:
  - Chinese and Arabic headings switch to a sans-serif font with increased line height;
  - Arabic removes letter spacing, because letter-spacing breaks the joining of Arabic letters.
- **Motion**: secondary hero elements animate in; content shifts up slightly on scroll (CSS `animation-timeline: view()`, zero JS; translation only, no opacity change, so contrast is always compliant); cards lift on hover; arrows move in the reading direction; flight routes on the map flow. Everything is disabled under `prefers-reduced-motion: reduce`.
- **Responsive**: desktop navigation and the mobile menu are implemented separately (the mobile menu is a dropdown panel that closes with Esc). Verified to have no horizontal scrolling at 360px and 390px widths.

## Arabic RTL

- `<html lang="ar" dir="rtl">`, with a single codebase for every component.
- Horizontal layout uses logical properties only: `ms/me`, `ps/pe`, `inset-s/inset-e`, `border-s`, `text-start/end`, `rounded-s/e`. No `left/right`, `ml/mr`, or `pl/pr`.
- Only directional icons (arrows, breadcrumb and menu chevrons) are mirrored in RTL (`rtl:-scale-x-100`); object icons such as the truck, globe, and checkmark are not.
- The hover offset of arrows also follows the reading direction (`rtl:group-hover:-translate-x-1`).
- The home page map is **intentionally not mirrored**, because geography is fixed. City labels are centered and unaffected by text direction.
- Form: the email input stays `dir="ltr"` but is right-aligned on RTL pages; the select arrow sits at the logical end; error messages and checkboxes mirror automatically.
- Language names are isolated with `lang` + `dir="auto"`; the brand name is wrapped in `<bdi>` to prevent punctuation reordering.

## Content Layer & Headless CMS

Pages and components depend **only** on the types in `src/lib/content/types.ts` and the `ContentSource` interface; they never read JSON directly:

```ts
// src/lib/content/source.ts
export interface ContentSource {
  getSite(locale): Promise<SiteSettings>;              // site-wide settings (singleton)
  getPage(locale, page): Promise<Pages[K]>;            // 6 pages (singletons)
  getServices(locale): Promise<Service[]>;             // collections
  getMarkets(locale): Promise<Market[]>;
  getIndustries(locale): Promise<Industry[]>;
  getInsights(locale): Promise<InsightSummary[]>;      // list, without body text
  getInsight(locale, slug): Promise<Insight | null>;
}

// src/lib/content/index.ts — only this line needs to change
export const content: ContentSource = jsonSource;
```

Usage in a page: `await content.getPage(locale, "about")`.

### Switching to Sanity

1. Model the content in Sanity following `types.ts`: singletons such as `siteSettings` and `homePage`, and document types `service`, `market`, `industry`, and `insight`. `@sanity/document-internationalization` (one document per language) is recommended, with language codes `en / ru / zh-cn / ar`.
2. Create `src/lib/content/sanity-source.ts` implementing `ContentSource`, using GROQ to shape the data into the same structure:

   ```ts
   import { createClient } from "@sanity/client";
   import type { ContentSource } from "./source";

   const client = createClient({ projectId: process.env.SANITY_PROJECT_ID!, dataset: "production", apiVersion: "2025-01-01", useCdn: false });

   export const sanitySource: ContentSource = {
     getSite: (locale) => client.fetch(`*[_type == "siteSettings" && language == $locale][0]`, { locale }),
     getInsights: (locale) => client.fetch(
       `*[_type == "insight" && language == $locale] | order(date desc){ "slug": slug.current, date, category, author, readingMinutes, title, excerpt }`,
       { locale },
     ),
     // … the remaining methods follow the same pattern; rich text (Portable Text) is converted to { heading, paragraphs[] } here
   };
   ```
3. Change `index.ts` to `export const content: ContentSource = sanitySource;`.

### Switching to Strapi

1. Enable Strapi's i18n plugin and add the `ru`, `zh-CN`, and `ar` locales. Note that Strapi uses `zh-CN`, so the source needs to map it.
2. Implement `strapi-source.ts`, for example:
   ```ts
   const res = await fetch(`${process.env.STRAPI_URL}/api/insights?locale=${toStrapi(locale)}&sort=date:desc`, { headers: { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` } });
   ```
   Then map the returned `data[]` to `InsightSummary[]`.

### Key Points

- **Static export means content is fetched at build time**: visitors never hit the CMS directly. When content is published in the CMS, a webhook triggers a rebuild and redeploy (Vercel Deploy Hook, GitHub Actions, etc.). So even if the CMS server is hosted outside China, page speed for visitors in mainland China is unaffected.
- **Images from the CMS**: if images are added later, download them locally at build time or serve them through a CDN with mainland China coverage, rather than having users in mainland China request overseas domains such as `cdn.sanity.io` directly.
- **`slug` and `id` must be identical across languages**, otherwise hreflang links cannot be matched. `check-content.mjs` validates these fields in the JSON; after moving to a CMS, the same validation should be added on the CMS side.
- Icons belong to the presentation layer and are mapped in code by content `id`; they are not stored in the CMS.

## Multilingual Content Sync

- TypeScript checks that each JSON file conforms to the `LocaleContent` type; a missing field fails the build.
- `scripts/check-content.mjs` runs automatically before `npm run build` and checks that keys, types, and array lengths are identical across all four languages, that there are no empty strings, and that fields such as `id / slug / date / officeId` match.

## SEO

- Every page (including articles) has its own `title`, `description`, and canonical URL, plus hreflang cross-links for all 4 languages and `x-default`.
- `sitemap.xml`: 6 pages + 4 articles, one entry per language (40 URLs total), each with `xhtml:link` hreflang annotations; `robots.txt` points to the sitemap.
- Open Graph and Twitter cards: `og:locale` plus `og:locale:alternate`, with a 1200×630 share image; article pages additionally output `article:published_time`, `author`, and `section`.
- JSON-LD: `Organization` on the home page, `Article` on article pages.
- Fixed a bug from the original version where the brand name was duplicated in page titles, e.g. `Contact — Meridian Partners · Meridian Partners`.

## Performance & Fonts

- Latin fonts (Inter, Source Serif 4) are downloaded at **build time** via `next/font` and self-hosted, so visitors never request `fonts.googleapis.com`. Only the Latin subset is preloaded on every page; the Cyrillic subset loads on demand.
- The Arabic font lives in `public/fonts/` with a fixed URL and is preloaded **only on `/ar/` pages** (`ReactDOM.preload`); pages in other languages never download it. This change reduced Cumulative Layout Shift (CLS) on Arabic pages from 0.218 to 0.
- Chinese uses system fonts to avoid loading multi-megabyte Chinese web fonts.
- There are only 4 client components (nav highlighting, mobile menu, language switcher, contact form), about 8KB gzipped in total; everything else is a server component.
- The hero heading and lead paragraph are not faded in, so they qualify as the LCP element on first paint. The header does not use `backdrop-filter`.

## Accessibility

- Includes a "Skip to main content" link; full semantic structure with `header`, `nav` (both with `aria-label`), `main`, `footer`, `article`, and breadcrumbs; no skipped heading levels.
- The current page is marked with `aria-current`; the mobile menu and language switcher both use `aria-expanded` / `aria-controls`, and focus returns to the button after closing with Esc.
- All interactive elements have a clear `:focus-visible` outline, which automatically switches to brass on dark backgrounds.
- Contact form:
  - Every field has a `<label>`;
  - Error messages are shown in the page language, linked to their fields via `aria-describedby`, with `aria-invalid` set;
  - On a failed submission, focus moves to the first invalid field; on success, focus moves to the success message heading.
- All animations are disabled when the system "reduce motion" setting is on.

## Verification Results (local machine)

- `npm run build`, `npm run lint`, and `npm run typecheck` all pass with no errors or warnings.
- axe-core (WCAG 2.1 AA + best-practice): 28 pages (4 languages × 7 pages), 0 issues. Tested once with "reduce motion" enabled and once with normal animations.
- Interaction tests: mobile menu, language switching (preserving the current path), form validation, and focus management all pass; no horizontal scrolling at 360px and 390px widths.
- Lighthouse (10 pages covering all 4 languages and every page type):
  - **Accessibility, Best Practices, SEO: 100 on every tested page.**
  - **Performance: did not consistently reach 95 on every page.** The test machine has only 2 CPU cores with a load above 4; its CPU benchmark fluctuated between 290 and 830, and Lighthouse warned that the CPU was slower than expected. Repeated runs of the same page varied by more than 10 points.
    - Desktop: 94–99.
    - Mobile (CPU throttling calibrated to 2×, as recommended in the Lighthouse docs): 76–95, CLS 0–0.03.
    - Mobile (default 4× CPU throttling): English home page 81, Arabic home page 64.
  - The main remaining gap is LCP (about 2.8–3.7 s on simulated slow 4G), driven mostly by roughly 130KB (gzip) of Next.js/React framework JS.
  - **For production, re-test with PageSpeed Insights after deploying to a CDN**, where the test hardware is more consistent.

## Deploying to GitHub Pages

Live preview: https://yahome.github.io/nextjs-multilingual-demo/

- This is a project site (sub-path `/nextjs-multilingual-demo`). The build sets `NEXT_PUBLIC_BASE_PATH=/nextjs-multilingual-demo`, which makes `next.config.ts` enable `basePath` / `assetPrefix`; without it, local development still runs at `/`.
- `NEXT_PUBLIC_SITE_URL=https://yahome.github.io/nextjs-multilingual-demo` (used for canonical URLs, hreflang, the sitemap, and Open Graph).
- Equivalent local build: `npm run build:pages`, with output in `out/`.
- `next/link`, `_next` assets, and the icon file conventions get the basePath automatically; hand-written URLs (the root redirect, 404 page links, `/public/fonts` fonts and preloads) all go through `withBasePath()` in `src/lib/base-path.ts`. For this reason the Arabic font's `@font-face` lives in `src/components/ui/ArabicFontFace.tsx` rather than `globals.css` (a `url("/fonts/…")` in CSS would not get the basePath).
- Current deployment method: run `npm run build:pages` locally, then push `out/` to the `gh-pages` branch, which Pages publishes from (the token used for pushing lacks the `workflow` scope, so workflow files cannot be committed).
- To switch to automatic deployment with GitHub Actions: copy `docs/github-pages-deploy.yml` to `.github/workflows/deploy.yml` (must be committed by an account with `workflow` permission), then change Source to "GitHub Actions" under the repository's Settings → Pages.
- `public/.nojekyll` stops GitHub Pages from processing the site with Jekyll, so the `_next/` directory is served correctly.

## Recommendations Before Going Live

- The contact form currently only simulates submission in the browser. Connect it to a backend API or a form service that is accessible from mainland China, and comply with personal data protection laws such as PIPL and 152-FZ.
- If the server is hosted in mainland China, an ICP filing is required and the filing number must be displayed in the Chinese footer.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain and submit the sitemap to Yandex Webmaster and Baidu Search Resource Platform.
