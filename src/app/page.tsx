import { ArabicFontFace } from "@/components/ui/ArabicFontFace";
import { withBasePath } from "@/lib/base-path";
import { defaultLocale, getSiteUrl, localeMeta, locales } from "@/lib/i18n";

/**
 * Static root redirect for `output: 'export'` (middleware is incompatible
 * with static export). Meta refresh to the default locale, with visible links
 * to every language in case the redirect is blocked. No IP-based detection.
 */
export default function RootPage() {
  const target = withBasePath(`/${defaultLocale}/`);

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={`${getSiteUrl()}/${defaultLocale}/`} />
        <title>Meridian Partners</title>
      </head>
      <body className="flex min-h-dvh items-center justify-center bg-paper p-6 font-sans text-body">
        <ArabicFontFace />
        <ul className="flex flex-wrap justify-center gap-3">
          {locales.map((locale) => (
            <li key={locale}>
              <a
                href={withBasePath(`/${locale}/`)}
                hrefLang={localeMeta[locale].lang}
                lang={localeMeta[locale].lang}
                className="inline-flex rounded-md border border-ink-900/15 bg-white px-4 py-2 font-medium text-ink-900 hover:border-ink-900"
              >
                {localeMeta[locale].nativeName}
              </a>
            </li>
          ))}
        </ul>
      </body>
    </html>
  );
}
