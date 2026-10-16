// next.config.mjs
// Next.js configuration.
// output: "export" builds the whole site as plain static HTML/CSS/JS files in the /out folder,
// which Cloudflare Pages can host for free (no server needed).
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, // static export cannot use the Next.js image server
  trailingSlash: true,           // makes /page/ URLs work cleanly on static hosts
};
export default nextConfig;
