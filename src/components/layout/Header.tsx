import type { Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/content";
import { pageHref, type NavItem, type PageKey } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Links";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { MobileMenu } from "./MobileMenu";

const desktopPages: PageKey[] = ["about", "services", "markets", "insights"];
const mobilePages: PageKey[] = ["home", ...desktopPages, "contact"];

export function Header({ locale, site }: { locale: Locale; site: SiteSettings }) {
  const toItem = (page: PageKey): NavItem => ({ href: pageHref(locale, page), label: site.nav[page] });

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white">
      <Container className="flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6 lg:h-20">
        <Logo href={pageHref(locale, "home")} name={site.brand.name} />
        <MainNav items={desktopPages.map(toItem)} label={site.ui.mainNav} />
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher locale={locale} label={site.ui.language} />
          <div className="ms-2 hidden lg:block">
            <ButtonLink href={pageHref(locale, "contact")} size="sm">
              {site.ui.contactCta}
            </ButtonLink>
          </div>
          <MobileMenu
            items={mobilePages.map(toItem)}
            cta={{ href: pageHref(locale, "contact"), label: site.ui.contactCta }}
            labels={{ nav: site.ui.mainNav, open: site.ui.openMenu, close: site.ui.closeMenu }}
          />
        </div>
      </Container>
    </header>
  );
}
