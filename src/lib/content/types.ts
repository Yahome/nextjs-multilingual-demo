import type { PageKey } from "@/lib/routes";

/**
 * Content contract. Every content source (local JSON today, Sanity or Strapi
 * later) returns these shapes, and components depend on nothing else.
 * Keep the types CMS-neutral: plain strings, string arrays and ids.
 */

export type PageMeta = { title: string; description: string };
export type PageHeroContent = { eyebrow: string; title: string; lead: string };
export type SectionIntro = { eyebrow: string; title: string; lead: string };
export type TextItem = { title: string; body: string };
export type Fact = { label: string; value: string };

export type Office = {
  id: string;
  city: string;
  address: string;
  /** ISO 3166-1 alpha-2, used in structured data. */
  countryCode: string;
  timezone: string;
  hours: string;
};

/** Site-wide singleton ("site settings" document in a CMS). */
export type SiteSettings = {
  brand: { name: string; tagline: string; description: string };
  email: string;
  offices: Office[];
  nav: Record<PageKey, string>;
  ui: {
    skipToContent: string;
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    contactCta: string;
    breadcrumb: string;
    learnMore: string;
    readArticle: string;
    readingTime: string;
  };
  cta: { title: string; body: string; button: string };
  footer: {
    navTitle: string;
    officesTitle: string;
    languagesTitle: string;
    rights: string;
    disclaimer: string;
  };
};

export type HomePage = {
  meta: PageMeta;
  hero: PageHeroContent & { primaryCta: string; secondaryCta: string; mapLabel: string };
  stats: Fact[];
  services: SectionIntro & { link: string };
  approach: SectionIntro & { steps: TextItem[] };
  markets: SectionIntro & { link: string };
  insights: SectionIntro & { link: string };
};

export type Person = { name: string; role: string; office: string; bio: string; languages: string };
export type Milestone = { year: string; title: string; body: string };

export type AboutPage = {
  meta: PageMeta;
  hero: PageHeroContent;
  story: { eyebrow: string; title: string; paragraphs: string[] };
  values: SectionIntro & { items: TextItem[] };
  milestones: { eyebrow: string; title: string; items: Milestone[] };
  leadership: SectionIntro & { languagesLabel: string; people: Person[] };
};

export type ServicesPage = {
  meta: PageMeta;
  hero: PageHeroContent;
  jumpLabel: string;
  deliverablesLabel: string;
  engagement: SectionIntro & { models: TextItem[] };
};

export type MarketsPage = {
  meta: PageMeta;
  hero: PageHeroContent;
  jumpLabel: string;
  officeLabel: string;
  opportunitiesLabel: string;
  considerationsLabel: string;
  industries: SectionIntro;
};

export type InsightsPage = {
  meta: PageMeta;
  hero: PageHeroContent;
  featuredLabel: string;
  moreTitle: string;
  backLabel: string;
};

export type ContactPage = {
  meta: PageMeta;
  hero: PageHeroContent;
  form: ContactFormContent;
  details: {
    title: string;
    emailLabel: string;
    responseTime: string;
    officesTitle: string;
  };
};

export type ContactFormContent = {
  title: string;
  requiredNote: string;
  demoNote: string;
  fields: {
    name: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    market: string;
    marketPlaceholder: string;
    marketOther: string;
    message: string;
    messagePlaceholder: string;
    consent: string;
  };
  submit: string;
  sending: string;
  errors: { required: string; email: string; consent: string };
  success: { title: string; body: string; reset: string };
};

export type Pages = {
  home: HomePage;
  about: AboutPage;
  services: ServicesPage;
  markets: MarketsPage;
  insights: InsightsPage;
  contact: ContactPage;
};

export type Service = { id: string; title: string; summary: string; deliverables: string[] };

export type Market = {
  id: string;
  /** References `Office.id`. */
  officeId: string;
  name: string;
  tagline: string;
  summary: string;
  facts: Fact[];
  opportunities: string[];
  considerations: string[];
};

export type Industry = { id: string; title: string; body: string };

export type InsightSection = { heading: string; paragraphs: string[] };

export type Insight = {
  /** Shared across locales so hreflang alternates line up. */
  slug: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  category: string;
  author: string;
  readingMinutes: number;
  title: string;
  excerpt: string;
  body: InsightSection[];
};

export type InsightSummary = Omit<Insight, "body">;

/** Everything one locale needs; the shape of `/content/{locale}.json`. */
export type LocaleContent = {
  site: SiteSettings;
  pages: Pages;
  services: Service[];
  markets: Market[];
  industries: Industry[];
  insights: Insight[];
};
