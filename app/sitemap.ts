import type { MetadataRoute } from "next";

import { siteRoutes } from "@/content/nav";
import { absoluteUrl } from "@/content/site";

/** Generated from the route list rather than hand maintained. */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: absoluteUrl(route.href),
    priority: route.priority,
  }));
}
