import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this repo. The parent directory has its own
    // package-lock.json, and without this Turbopack walks up to it and warns.
    root: __dirname,
  },

  // No trailing slashes. Next normalises "/about/" to "/about" with a 308 on its
  // own, so the redirect table below only lists old URLs whose path actually
  // changes. Adding "/about/" here would normalise to "/about" and loop.
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    // The 301 map from the old WordPress site.
    // Source: .claude/docs/03-site-architecture.md
    // Never 301 to the homepage as a catch-all. Google treats that as a soft 404.
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/master-ceremony", destination: "/wedding-mc", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      // /gallery was removed on 1 September 2026. The photographs moved into
      // the "Nights I have run" section on the homepage, so that is where the
      // old URL points. This is a content move, not a catch-all to the root.
      { source: "/gallery", destination: "/", permanent: true },
      // /corporate-mc was removed on 2 September 2026. The site is wedding
      // only now, so the closest page is the wedding one rather than the root.
      { source: "/corporate-mc", destination: "/wedding-mc", permanent: true },
    ];
  },
};

export default nextConfig;
