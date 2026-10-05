import { notFound } from "next/navigation";
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
  return buildPageMetadata(raw, "aboutRtl");
}

export default async function AboutRtlPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const content = getContent(raw);
  const page = content.aboutRtl;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 text-balance">
          {page.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 text-pretty">{page.intro}</p>

        {/* Visual demo of logical spacing */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="border-b border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
            Logical spacing demo (ms- / me- / ps- / pe- / text-start)
          </div>
          <div className="flex items-stretch gap-0 p-4">
            <div className="flex flex-1 items-center rounded-s-xl bg-teal-600 ps-4 pe-2 py-6 text-sm font-semibold text-white">
              start edge
            </div>
            <div className="flex flex-1 items-center justify-end rounded-e-xl bg-slate-800 ps-2 pe-4 py-6 text-sm font-semibold text-white text-end">
              end edge
            </div>
          </div>
          <p className="px-4 pb-4 text-xs text-slate-500">
            In LTR, start is left. In Arabic (RTL), start is right — same markup.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-slate-600 leading-relaxed text-pretty">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-900 text-pretty">
          {page.note}
        </p>
      </div>
    </div>
  );
}
