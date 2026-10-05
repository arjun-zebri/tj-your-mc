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

  // Dev only. Lets a phone on the same wifi load the dev server by its LAN
  // address. Without it Next blocks its own scripts from any origin other than
  // localhost, the page never hydrates, nothing is clickable and the gallery
  // stays invisible because its fade in waits on JavaScript.
  allowedDevOrigins: ["192.168.*.*"],

  // Kept deliberately small. Vercel bills every unique width and format pair as
  // a transformation, and the Hobby plan allows 5,000 a month. The defaults
  // (15 widths, AVIF plus WebP) gave about 500 variants per deployment, which a
  // single crawler working through every size burned through in two days in
  // October 2026. The sources are already WebP, so AVIF bought little.
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 384],
    minimumCacheTTL: 2678400,
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
