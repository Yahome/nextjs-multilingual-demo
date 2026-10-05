import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { localeMeta, locales, type Locale } from "@/lib/i18n";
import { pageHref, type PageKey } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

const footerPages: PageKey[] = ["about", "services", "markets", "insights", "contact"];

const linkClass = "text-ink-200 transition-colors hover:text-white";

export function Footer({ locale, site }: { locale: Locale; site: SiteSettings }) {
  const { footer } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark bg-ink-950 text-sm text-ink-300">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo href={pageHref(locale, "home")} name={site.brand.name} />
          <p className="mt-5 max-w-sm leading-relaxed">{site.brand.description}</p>
          <a href={`mailto:${site.email}`} className={`mt-6 inline-flex items-center gap-2 ${linkClass}`}>
            <Icon name="mail" className="size-4 text-brass-300" />
            <span dir="ltr">{site.email}</span>
          </a>
        </div>

        <nav aria-labelledby="footer-nav" className="lg:col-span-2">
          <h2 id="footer-nav" className="font-semibold text-white">
            {footer.navTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {footerPages.map((page) => (
              <li key={page}>
                <Link href={pageHref(locale, page)} className={linkClass}>
                  {site.nav[page]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-semibold text-white">{footer.officesTitle}</h2>
          <ul className="mt-5 space-y-4">
            {site.offices.map((office) => (
              <li key={office.id}>
                <p className="text-ink-200">{office.city}</p>
                <p className="mt-0.5">{office.address}</p>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-languages" className="lg:col-span-2">
          <h2 id="footer-languages" className="font-semibold text-white">
            {footer.languagesTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {locales.map((loc) => (
              <li key={loc}>
                <Link
                  href={pageHref(loc, "home")}
                  hrefLang={localeMeta[loc].lang}
                  aria-current={loc === locale ? "true" : undefined}
                  className={linkClass}
                >
                  <span lang={localeMeta[loc].lang} dir="auto">
                    {localeMeta[loc].nativeName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} <bdi>{site.brand.name}</bdi>. {footer.rights}
          </p>
          <p>{footer.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
