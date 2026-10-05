import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { CTA } from "@/components/CTA";
import { getContent } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildPageMetadata(raw, "home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const content = getContent(locale);

  return (
    <>
      <Hero locale={locale} content={content} />
      <FeatureCards content={content} />
      <CTA locale={locale} content={content} />
    </>
  );
}
