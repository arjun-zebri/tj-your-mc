---
name: local-seo-pages
description: Handle all search and answer engine work for the TJ Your MC site, covering page metadata, title tags, structured data and JSON-LD schema, heading structure, internal linking, sitemaps, robots rules, llms.txt, redirects from the old WordPress site, and building location and cultural wedding landing pages. Use this skill whenever you create a route, write or change a title or meta description, add or edit schema, plan URL structure, set up redirects, or when anyone mentions SEO, AEO, ranking, Google, ChatGPT visibility, AI search, local search or getting found.
---

# Local SEO and AEO

Two jobs sharing most of their plumbing.

**SEO** is ranking in Google's blue links and map pack for "wedding MC Sydney".

**AEO** is being the source an answer engine cites when someone asks ChatGPT,
Perplexity, Gemini or Google's AI Overview to recommend a Sydney wedding MC.
Answer engines pull from server rendered text, extract self-contained passages,
and prefer pages that state facts plainly with corroborating structure.

They rarely conflict. Where they do, say so rather than silently picking one.

## Reference files

- `references/schema-templates.md` Ready to use JSON-LD for every page type on
  this site, plus what not to emit and why. Read before adding any schema.
- `references/aeo-writing.md` How to write passages that answer engines extract,
  with the question list worth building pages around. Read before writing any
  content page.

Route structure and the redirect map live in `.claude/docs/03-site-architecture.md`.

## Non-negotiables

**Server render everything.** Content that only appears after JavaScript runs is
invisible to most AI crawlers. Every heading, paragraph, FAQ answer, price,
service description and schema block goes in the initial HTML. React Server
Components by default, `"use client"` only for real interactivity.

**One topic per URL.** A page covering wedding MC, corporate MC and singing ranks
for none of them and gets cited for none of them.

**Entity consistency.** TJ's name, business name, service area, email and phone
must be byte identical across the site, the schema, his Instagram bio and his
Google Business Profile. Answer engines resolve entities by matching these
strings, so all of them read from `content/site.ts`.

## Page metadata

Every route exports Next.js `metadata`. No page inherits a generic default.

- **Title** under 60 characters, primary phrase first, brand last. Never repeat
  the phrase inside the same title.
- **Description** 140 to 158 characters, active voice, says what the visitor gets
  and gives a reason to click. Not a ranking factor, very much a click factor.
- **Canonical** absolute, self-referencing, consistent on trailing slashes.
- **openGraph** `locale: "en_AU"`, real 1200x630 image. The old site shipped a
  372x488 portrait that crops badly in every share preview.
- **twitter** `summary_large_image`.

## robots.txt and llms.txt

Allow the AI crawlers: `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`,
`Google-Extended`, `Bingbot`. Being cited is pure upside for a service business
with no content to protect. This is Arjun's call to confirm, but allow is the
default.

Ship `/llms.txt` at the root: plain markdown stating who TJ is, what he does,
where he works, what he charges, how to book, and links to the main pages. Under
200 lines, generated from `content/site.ts` so it cannot drift.

Ship `/sitemap.xml` via Next's `sitemap.ts`, generated from the route list rather
than hand maintained.

## Off site, flag to Arjun

Outside the repo, but worth more than most on-page work for a local service
business.

1. **Google Business Profile.** If TJ does not have one, this is the highest
   value hour in the project. Drives the map pack and feeds answer engines a
   verified entity.
2. **Real reviews** on that profile, requested from past couples.
3. **Directory listings** on Easy Weddings, Wedshed and similar, with name, email
   and URL matching the site exactly.
4. **Instagram bio** pointing at the site with consistent naming.

## Checklist before shipping a page

- [ ] Content present in `view-source`, not just after hydration
- [ ] Unique title under 60 chars, unique description 140 to 158
- [ ] Self-referencing canonical
- [ ] One `h1`, no skipped heading levels
- [ ] Each section opens with a standalone 40 to 60 word answer
- [ ] Valid JSON-LD, no review or offer schema with unverified data
- [ ] Two or more contextual internal links out
- [ ] All images have real alt text plus width and height
- [ ] `lang="en-AU"`, `og:locale` `en_AU`
- [ ] Added to `sitemap.ts` and to `llms.txt` if it is a main page
- [ ] Any old URL that maps here is redirected, per `.claude/docs/03-site-architecture.md`
