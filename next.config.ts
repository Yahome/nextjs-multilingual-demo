import type { NextConfig } from "next";

/*
 * Optional sub-path deployment (e.g. GitHub Pages project sites served from
 * https://<user>.github.io/<repo>/). Leave NEXT_PUBLIC_BASE_PATH unset for
 * local dev and root-domain hosting; set it to "/nextjs-multilingual-demo"
 * for the GitHub Pages build.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
