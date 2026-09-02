# Schema templates

Ready to use JSON-LD for every page type on this site. Read this before adding
any schema. The rules at the bottom about what not to emit matter more than the
templates, because the fastest way to hurt this site is to mark up something we
cannot back.

## How schema is wired

One `@graph` in the root layout carries the entity nodes that never change:
`WebSite`, `ProfessionalService` and `Person`. Every page then adds only its own
node and links back by `@id`. This means TJ's identity is declared once, and a
page cannot describe him differently from the page next to it.

Every string that names TJ, his business, his email or his service area comes
from `content/site.ts`. Never hardcode an entity string into a schema block.
Answer engines resolve entities by matching these strings, so a stray variant is
a real cost.

Emit schema with a `<script type="application/ld+json">` tag rendered on the
server. It must be in `view-source`.

## Root graph, in the layout

```ts
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      "url": site.url,
      "name": site.businessName,
      "inLanguage": "en-AU",
      "publisher": { "@id": `${site.url}/#business` }
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      "name": site.businessName,
      "url": site.url,
      "email": site.email,
      "image": `${site.url}/og/tj.jpg`,
      "description": site.shortDescription,
      "areaServed": {
        "@type": "City",
        "name": "Sydney",
        "containedInPlace": {
          "@type": "State",
          "name": "New South Wales"
        }
      },
      "founder": { "@id": `${site.url}/#tj` },
      "sameAs": site.socialLinks
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#tj`,
      "name": site.personName,
      "jobTitle": "Master of Ceremonies",
      "url": `${site.url}/about`,
      "worksFor": { "@id": `${site.url}/#business` },
      "knowsLanguage": "en-AU"
    }
  ]
}
```

`ProfessionalService` rather than `LocalBusiness` because TJ travels to venues
and does not trade from a shopfront. Do not add `address` with a made up street,
and do not add `openingHours`. A service business with no premises should not
pretend to have either.

`telephone` is deliberately absent. Add it only once `[NEEDS TJ: does he want a
phone number on the site?]` is answered, and then only if the same number is on
his Google Business Profile.

## Service pages

For `/wedding-mc`. One `Service` node per page, one service
per page, matching the one topic per URL rule.

```ts
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${site.url}/wedding-mc#service`,
  "name": "Wedding MC services in Sydney",
  "serviceType": "Wedding master of ceremonies",
  "description": "...",
  "provider": { "@id": `${site.url}/#business` },
  "areaServed": { "@type": "City", "name": "Sydney" },
  "audience": {
    "@type": "Audience",
    "audienceType": "Engaged couples planning a wedding reception"
  }
}
```

`description` is written copy, not a keyword string. Load
`.claude/skills/mc-website-copy/SKILL.md` before writing it. It is read aloud by
assistants, so it has to sound like a person.

## Pricing, once TJ confirms it

Do not add `offers` until real numbers exist. When they do:

```ts
"offers": {
  "@type": "Offer",
  "priceCurrency": "AUD",
  "price": "0000",
  "availability": "https://schema.org/InStock",
  "url": `${site.url}/contact`
}
```

The price in schema must be the same number a visitor can see on the page. If
the page says "from", use `PriceSpecification` with `minPrice` rather than
stating a flat price that is not the real one. Blocked on
`[NEEDS TJ: what does he charge, and what is in each package?]`.

## FAQ pages

Generate from `content/faqs.ts`, never hand written alongside the visible
FAQ. The same array feeds both, so the two can never disagree. Google penalises
schema that does not match visible content, and a hand maintained copy will
drift within a fortnight.

```ts
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/wedding-mc#faq`,
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
}
```

Google no longer shows FAQ rich results for most sites, so treat this as AEO
plumbing rather than a rich result play. It still gives answer engines clean
question and answer pairs, which is the actual reason we emit it.

## Comparison and content pages

`/mc-vs-celebrant` is the highest value page on the site, so give it a real
`Article` node rather than leaving it as a bare page.

```ts
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${site.url}/mc-vs-celebrant#article`,
  "headline": "...",
  "description": "...",
  "author": { "@id": `${site.url}/#tj` },
  "publisher": { "@id": `${site.url}/#business` },
  "datePublished": "0000-00-00",
  "dateModified": "0000-00-00",
  "inLanguage": "en-AU",
  "mainEntityOfPage": `${site.url}/mc-vs-celebrant`
}
```

Real dates only. A `dateModified` that moves every build with no content change
is a trust signal spent for nothing.

## Breadcrumbs

On every page below the root, including `/cultural-weddings/[tradition]` and
`/wedding-mc/[suburb]`. Generate from the route, do not hand write.

```ts
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": segments.map((segment, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": segment.label,
    "item": `${site.url}${segment.href}`
  }))
}
```

## Page type nodes

Cheap and worth it: `AboutPage` on `/about`, `ContactPage` on `/contact`,
`CollectionPage` on `/gallery`. Each links to the root graph with
`"isPartOf": { "@id": `${site.url}/#website` }`.

## Never emit

**`Review` or `AggregateRating`.** Decided and logged in
`.claude/docs/06-decisions.md`. The four inherited testimonials have no source,
no date and no way to verify them. Marking them up is a manual action risk on a
client's live site, and the payoff is a star rating we cannot defend. Revisit
only when TJ has verifiable Google reviews, which live on his profile anyway.

**`Event`.** TJ performs at weddings, he does not host public events. `Event`
markup implies a thing a stranger can attend and buy a ticket to.

**Awards, `award`, or membership `memberOf`.** We have none confirmed. See the
hard rule in `CLAUDE.md`: never invent facts about TJ.

**`sameAs` links we have not checked.** Every URL in `sameAs` must be a profile
TJ actually controls, confirmed, and live. A dead profile in `sameAs` weakens
entity resolution rather than helping it.

**Anything not visible on the page.** Schema describes the page. If a claim is
not in the rendered HTML for a human to read, it does not go in the JSON-LD.

## Before you ship

1. Paste the rendered `view-source` JSON into Google's Rich Results Test and the
   Schema.org validator. Both, they catch different things.
2. Confirm every `@id` resolves to a node that exists in the graph.
3. Confirm every entity string came from `content/site.ts`.
4. Confirm no claim in the schema is missing from the visible page.
5. Run `npm run check:dashes`. Schema descriptions are copy and the rule applies.
