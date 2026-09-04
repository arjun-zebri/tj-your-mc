# Site architecture

## Routes

### Week one, core build

| Route          | Purpose                                                      | Primary phrase             |
| -------------- | ------------------------------------------------------------ | -------------------------- |
| `/`            | Hero, what he does, packages, gallery, reviews, FAQ, form    | wedding MC Sydney          |
| `/about`       | Who TJ is. The real story, not filler.                       | TJ your MC                 |
| `/wedding-mc`  | Main service page. What he does across the night, in detail. | wedding MC services Sydney |
| `/contact`     | Canonical enquiry form with its own URL                      | book a wedding MC Sydney   |

`/corporate-mc` was removed on 2 September 2026 on Arjun's instruction. The site
is wedding only. `/corporate-mc` 301s to `/wedding-mc`, and corporate is off the
week two list as well, so do not rebuild it without him asking.

`/gallery` and `/mc-vs-celebrant` were removed on 1 September 2026 on Arjun's
instruction. The photographs moved into the "Nights I have run" section on the
homepage, and the MC versus Celebrant distinction is now carried by the hero
headline and an FAQ answer.

Worth knowing what that costs: `/mc-vs-celebrant` was the highest value page on
this list for search and answer engines. It targeted real query volume, it fixed
the exact factual error the old site made, and a clean definitional page is the
kind of thing an answer engine quotes verbatim. The topic is still covered on
the homepage, so the content is not lost, but it no longer has a URL of its own
to rank or be cited. Rebuild it if organic traffic matters later.

### Week two, content expansion

Where the ranking gains actually live. Almost nothing good ranks for these today.

| Route                            | Notes                                                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/mc-vs-celebrant`               | Real search, fixes the old site's factual error, highly citable by answer engines. Highest value page on the list.    |
| `/wedding-mc-cost-sydney`        | Blocked on real pricing from TJ.                                                                                      |
| `/cultural-weddings`             | Hub listing traditions TJ has actually hosted. Blocked on TJ.                                                         |
| `/cultural-weddings/[tradition]` | One page per confirmed tradition, with real detail on how he runs that reception. Not a template with a word swapped. |
| `/wedding-mc/[suburb]`           | Only where TJ has genuinely worked. Thin duplicated suburb pages are a liability, not an asset.                       |

Do not build the cultural or suburb pages until TJ confirms the list. A page
claiming experience he does not have is a problem for him, not just for us.

## Content layer

No CMS in v1. Content lives in typed files so copy can change without touching
components, and so a future CMS migration is a data move rather than a rewrite.

```
content/
  site.ts          name, email, service area, social links, the entity strings
  packages.ts      TJ's packages, prices, travel and payment terms
  faqs.ts          question and answer pairs, consumed by both the page and FAQPage schema
  testimonials.ts  the four inherited quotes, verbatim, with a source field
  gallery.ts       image records mirroring .claude/docs/05-assets.md
```

`site.ts` is the single source of truth for TJ's name, email and service area.
Schema, footer, metadata and `llms.txt` all read from it. Answer engines resolve
entities by matching these strings exactly, so they must never drift.

`faqs.ts` feeding both the visible FAQ and the `FAQPage` schema means the two can
never disagree, which is a real Google penalty if they do.

## URL conventions

- No trailing slashes. Set `trailingSlash: false`.
- Lowercase, hyphenated, no dates, no IDs.
- Self-referencing absolute canonicals on every page.

## Redirects from the old site

The old site has been indexed since roughly August 2025 and ranks for something.
Losing that is the main technical risk in this project. Every 301 goes in
`next.config.js` with `permanent: true`.

| Old URL             | New URL       | Note                                                                      |
| ------------------- | ------------- | ------------------------------------------------------------------------- |
| `/`                 | `/`           | No redirect needed                                                        |
| `/home/`            | `/`           | Duplicate homepage on the old site. Fixing this is a small win in itself. |
| `/about/`           | `/about`      |                                                                           |
| `/master-ceremony/` | `/wedding-mc` | Old page covered MC services generally                                    |
| `/gallery/`         | `/`           | Route removed. Photos moved to the homepage, so this is a content move, not a catch-all. |
| `/contact-us/`      | `/contact`    |                                                                           |

Never 301 to the homepage as a catch-all. Google treats that as a soft 404.

## Before cutover

1. Crawl the old site properly. This table covers the navigation, but WordPress
   also generates attachment pages, tag archives and paginated URLs that may be
   indexed and are not in the menu.
2. Export twelve months of Search Console data. Without a baseline we cannot tell
   whether the migration helped or hurt.
3. Note which pages currently earn impressions. If `/master-ceremony/` is doing
   the heavy lifting, `/wedding-mc` has to cover the same ground or better.

## After cutover

1. Submit the new sitemap in Search Console.
2. Keep the existing Google site verification meta tag, or the historical Search
   Console data detaches.
3. Keep the existing Google Tag Manager container ID.
4. Watch coverage and 404s daily for a fortnight.
5. Expect a two to four week ranking dip. Tell TJ in advance, in writing, so it
   does not become a worried phone call.
