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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
