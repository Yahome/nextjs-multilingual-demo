import { localeMeta, locales, type Locale } from "@/lib/i18n";
import { fontVariables } from "@/lib/fonts";

/** The static 404 sits outside `[locale]`, so it speaks all four languages. */
const messages: Record<Locale, { title: string; link: string }> = {
  en: { title: "Page not found", link: "Go to the English site" },
  ru: { title: "Страница не найдена", link: "Перейти на русскую версию" },
  "zh-cn": { title: "页面未找到", link: "前往中文网站" },
  ar: { title: "الصفحة غير موجودة", link: "الانتقال إلى الموقع العربي" },
};

export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <title>404 · Meridian Partners</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="flex min-h-dvh items-center justify-center bg-paper p-6 text-body">
        <main className="w-full max-w-xl">
          <h1 className="type-display text-7xl text-brass-700">404</h1>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {locales.map((locale) => {
              const { lang, dir } = localeMeta[locale];
              return (
                <li key={locale} lang={lang} dir={dir} className="py-5">
                  <h2 className="text-lg font-semibold text-ink-900">{messages[locale].title}</h2>
                  <a
                    href={`/${locale}/`}
                    hrefLang={lang}
                    className="mt-1 inline-block text-sm text-body underline decoration-brass-400 underline-offset-4 hover:text-ink-900"
                  >
                    {messages[locale].link}
                  </a>
                </li>
              );
            })}
          </ul>
        </main>
      </body>
    </html>
  );
}
