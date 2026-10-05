import { withBasePath } from "@/lib/base-path";

/*
 * IBM Plex Sans Arabic (SIL OFL 1.1, see /public/fonts), Arabic subset only:
 * Latin characters on Arabic pages fall through to Inter. Regular and bold are
 * enough; 500 renders as 400 and 600 as 700.
 *
 * Declared here instead of globals.css because CSS `url("/fonts/...")` is not
 * rewritten for `basePath`; React hoists this <style> into <head> and dedupes it.
 */
const unicodeRange =
  "U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC";

const css = ([400, 700] as const)
  .map(
    (weight) =>
      `@font-face{font-family:"IBM Plex Sans Arabic";src:url("${withBasePath(
        `/fonts/ibm-plex-sans-arabic-${weight}.woff2`,
      )}") format("woff2");font-weight:${weight};font-style:normal;font-display:swap;unicode-range:${unicodeRange};}`,
  )
  .join("");

export function ArabicFontFace() {
  return (
    <style href="arabic-font-face" precedence="default">
      {css}
    </style>
  );
}
