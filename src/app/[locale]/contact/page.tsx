import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getContent } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";
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
  return buildPageMetadata(raw, "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const content = getContent(raw);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 text-balance">
          {content.contact.title}
        </h1>
        <p className="mt-3 text-slate-600 text-pretty">{content.contact.subtitle}</p>
        <div className="mt-10">
          <ContactForm content={content} />
        </div>
      </div>
    </div>
  );
}
