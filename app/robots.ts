import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/content/site";

/**
 * AI crawlers are allowed.
 *
 * Being cited by ChatGPT and Perplexity is pure upside for a service business
 * with no content to protect. Logged as a decision in
 * .claude/docs/06-decisions.md, and it is Arjun's call to reverse.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
];

/**
 * Crawlers blocked outright.
 *
 * Meta's training crawler hit the site about 220k times a day from late
 * September 2026, re-fetching the same five pages and every image size. That
 * alone was about to exhaust the Vercel team's free CDN quota, which pauses
 * every project on the team, Zebri included. It cites nothing, so blocking it
 * costs no visibility. A firewall rule in Vercel backs this up for the period
 * before Meta re-reads robots.txt.
 */
const blockedCrawlers = ["meta-externalagent"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
      ...blockedCrawlers.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
