import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/content";
import {
  defaultLocale,
  getSiteUrl,
  isLocale,
  localeMeta,
  locales,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const content = getContent(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: content.meta.home.title,
      template: `%s · ${content.brand.name}`,
    },
    description: content.meta.home.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale = raw;
  const meta = localeMeta[locale];
  const content = getContent(locale);

  return (
    <html lang={meta.lang} dir={meta.dir}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header locale={locale} content={content} />
        <main className="flex-1">{children}</main>
        <Footer content={content} />
      </body>
    </html>
  );
}
