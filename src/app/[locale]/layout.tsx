import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArabicFontFace } from "@/components/ui/ArabicFontFace";
import { content } from "@/lib/content";
import { fontVariables, localeFontPreloads } from "@/lib/fonts";
import { getSiteUrl, localeMeta, locales } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/routes";

/** Only the four configured locales exist; required for `output: "export"`. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b1b2e",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const site = await content.getSite(await resolveLocale(params));
  return {
    metadataBase: new URL(getSiteUrl()),
    applicationName: site.brand.name,
    title: site.brand.name,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: LocaleParams & { children: ReactNode }) {
  const locale = await resolveLocale(params);
  const { lang, dir } = localeMeta[locale];
  const site = await content.getSite(locale);
  for (const href of localeFontPreloads[locale] ?? []) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }

  return (
    <html lang={lang} dir={dir} className={fontVariables} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <ArabicFontFace />
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-ink-900 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:inset-s-4 focus:px-4 focus:py-3"
        >
          {site.ui.skipToContent}
        </a>
        <Header locale={locale} site={site} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer locale={locale} site={site} />
      </body>
    </html>
  );
}
