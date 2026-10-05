import type { SiteContent } from "@/lib/content";

type Props = {
  content: SiteContent;
};

const icons = [
  // strategy
  <svg key="s" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  // trade
  <svg key="t" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m0 0V9.75A2.25 2.25 0 014.5 7.5h15A2.25 2.25 0 0121.75 9.75v4.5m0 0v3.375c0 .621-.504 1.125-1.125 1.125H15.75m0-3.75h.008v.008H15.75v-.008z" />
  </svg>,
  // partnership
  <svg key="p" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
];

export function FeatureCards({ content }: Props) {
  const { features } = content.home;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 text-balance">
          {features.title}
        </h2>
        <p className="mt-3 text-lg text-slate-600 text-pretty">{features.subtitle}</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.items.map((item, i) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-xl bg-teal-50 p-3 text-teal-700 ring-1 ring-teal-100 group-hover:bg-teal-100">
              {icons[i]}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 text-pretty">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
