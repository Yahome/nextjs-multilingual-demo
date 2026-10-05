import type { SiteContent } from "@/lib/content";

type Props = {
  content: SiteContent;
};

export function Footer({ content }: Props) {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:px-6">
        <p className="font-medium text-slate-700">{content.brand.name}</p>
        <p>{content.footer.rights}</p>
        <p>{content.footer.builtWith}</p>
      </div>
    </footer>
  );
}
