/**
 * Sub-path the site is served from ("" at the domain root). Mirrors
 * `basePath` in next.config.ts. `next/link`, `_next` assets and metadata
 * file icons get it automatically; plain `<a>`, meta refresh, preloads and
 * `/public` URLs written by hand must go through `withBasePath`.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");

/** Prefix a root-relative path (e.g. `/fonts/x.woff2`) with the base path. */
export function withBasePath(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
