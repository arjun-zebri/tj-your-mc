# Decisions and open questions

## Decision log

Decisions already made. Change them deliberately, not by accident, and update
this table when you do.

| Decision                                                                                                          | Why                                                                                                                                                                | Revisit if                                                                   |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Next.js on Vercel, no CMS in v1                                                                                   | Speed to launch, full control of markup for SEO and AEO. Content in typed files keeps copy editable.                                                               | TJ wants to self-edit                                                        |
| Dark warm palette, reception at 9pm                                                                               | The whole category is cream and gold. Differentiation is the point of the project.                                                                                 | TJ hates it, which is his right                                              |
| Audio hero as the signature element                                                                               | He sells a voice and you cannot hear it anywhere in the category                                                                                                   | No usable audio exists by launch, then fall back to the photo hero           |
| Do not theme the design on ethnicity                                                                              | Only TJ can say how much his background belongs in the brand, and guessing narrows his market for him                                                              | TJ says he wants it front and centre                                         |
| Cultural pages as SEO landing pages, not visual theming                                                           | Captures real search demand, does not require assuming anything, does not narrow the brand                                                                         | TJ confirms a specific community focus                                       |
| No `AggregateRating` or `Review` schema                                                                           | Four unverifiable testimonials with no source or date. Marking these up is a real penalty risk.                                                                    | TJ collects verifiable Google reviews, which live on the profile anyway      |
| Core five pages week one, content pages week two                                                                  | Writing the content pages in week one means writing them badly, and half are blocked on TJ                                                                         | Deadline moves                                                               |
| Repo under the Knotify org, TJ owns the domain                                                                    | Matches the managed hosting arrangement                                                                                                                            | Put it in the maintenance agreement either way                               |
| Allow AI crawlers in `robots.txt`                                                                                 | Being cited by ChatGPT and Perplexity is pure upside for a service business with no content to protect                                                             | Arjun disagrees, this is his call                                            |
| Block `meta-externalagent` in `robots.txt` and the Vercel firewall | From late September 2026 it fetched about 220k requests a day, nearly exhausting the team's free CDN quota (which pauses every project on the team). It is a training crawler, so it cites nothing back | Meta stops over-crawling, or the site moves off the shared free team |
| Bespoke icons drawn from the run sheet idea, no icon library                                                      | Stock icon sets are on a third of the web and undercut a site whose job is proving TJ is not interchangeable                                                       | The run sheet concept does not land, then fall back to a plain geometric set |
| No Polynesian or other cultural motif work until TJ confirms a specific culture and commissions an artist from it | Distinct traditions with distinct grammars, many motifs carry lineage and rank meaning. A generated blend reads as appropriation to the exact audience it targets. | TJ confirms, then it is a commissioned line item, not a generated asset      |
| Hero headline is "The bit between the ceremony and the dance floor is where weddings go quiet. That is my job."         | Chosen by Arjun from the three in the copy deck. Describes the problem, then claims the job, so it survives the competitor swap test.                              | TJ does not like it, and he has sign-off                                     |
| Native form posting to Zebri, not the script embed or an iframe                                                        | Inherits the site's type and colour, is visible to search engines, and every state is ours to control. The embed was never seen, so it could not be evaluated.    | The Zebri embed turns out to support full CSS inheritance                    |
| Next.js 16, upgraded from 15 during scaffold                                                                           | npm audit flagged four postcss advisories on 15 whose only fix was the 16 major. Greenfield repo with nothing to break.                                           | Never, unless a dependency forces it back                                    |
| No response time promised anywhere on the site                                                                         | The copy deck guessed "usually within a day". That is a claim about TJ we cannot back, and it appeared in two places that could drift apart.                      | TJ tells us how fast he actually replies                                     |
| `[NEEDS TJ]` markers never render to a visitor                                                                         | A marker is a note to us. Package inclusions that are still markers are filtered out of the page, so the tiers show only real inclusions.                         | Never                                                                        |
| Core five pages plus `/mc-vs-celebrant` and `/corporate-mc` built, the gated pages left alone (both since removed)      | Everything buildable without inventing facts about TJ. The cost, cultural and suburb pages stay unbuilt as this document requires.                                | TJ answers the questions below                                               |
| Hero headline is "The celebrant marries the couple on the day. The MC marries the people to the day."                   | Arjun's line, from a reference image. Draws the MC and celebrant distinction in the one place everybody reads, which is the error the old site made. | TJ prefers one of the three original copy deck options |
| "Minister" in that line changed to "celebrant"                                                                          | Celebrant is the Australian term and it matches `/mc-vs-celebrant`. Introducing a third word for the same role weakens the distinction. | Arjun wants the original wording |
| Primary call to action is "Check if I'm free", not "Check my date"                                                      | Arjun found the original ambiguous. This keeps the date-first mechanic the copy skill asks for while fixing the ambiguity. | Arjun still prefers a plain "Get in touch" |
| Custom date picker replaces the native input                                                                            | The native control ignores every design token, and the date is the field TJ needs most. Keyboard operable, value carried by a hidden input. | It proves unreliable on a real device |
| Placeholders render in development only, via `components/Placeholder.tsx`                                               | Lets the layout be judged before the assets exist without invented content reaching production. The testimonials above are a deliberate exception. | Never, this is the pattern for anything we do not have |
| Ambient specks in the hero                                                                                              | Arjun asked for subtle animated stars. Scoped to the hero, rests at low opacity so reduced motion degrades to a still field. | It reads as decoration rather than atmosphere |
| `/corporate-mc` removed on 2 September 2026, site is wedding only                                                        | Arjun's instruction. The page, both nav entries, both inbound links and the corporate line in the week two plan are gone, and the old URL 301s to `/wedding-mc`. | Arjun asks for corporate work back |
| `/wedding-mc` is one dark page with the photograph bleeding off the left edge, and carries no FAQ                        | Arjun's instruction. The light `bg-paper` band under the running order is gone, and the FAQ block went with it, so the page also emits no `FAQPage` schema. The same questions still render and emit schema on the homepage. | Arjun wants the FAQ back on the service page |
| A "How booking me works" section on `/wedding-mc`, and the money reframed above the tiers as what the night costs rather than what an MC costs | Arjun sent a competitor page as a feel reference. The site explained the night in detail and never explained what sending the form starts, and the tiers read as an hourly rate for someone holding a microphone. Nothing new was invented: the free-first-call and deposit claims that page makes are the two things we cannot match. | TJ gives us his actual booking terms, which turns the placeholder step into real copy |
| TJ helps with the run sheet, he does not own it                                                                          | Arjun: TJ does not want full responsibility for it. Every place the site said he writes it now says he helps get it right and that it stays the couple's, including the FAQ answer, the package inclusion, `llms.txt` and the `Service` schema description. He still distributes it, which is coordination rather than authorship. | TJ says he is happy to own it outright |
| Packages, prices and terms come from TJ's 2027 pricelist, published as flat fees | TJ supplied "2027 TJ Your MC pricelist 2027.pdf" on 4 September 2026. The three placeholder tiers, their invented inclusions and their benchmarked prices are gone, replaced by The Vibe, The Show and The Wingman at $3,000, $4,500 and $5,400, plus the custom package. Prices are flat, not "from", so `Offer` schema and prices in `/llms.txt` are both unblocked. | TJ issues a new pricelist, which is the only thing that should ever change these numbers |
| Both forms post to Zebri from the server, not the browser | A server post carries no `Origin` header, so it needs nothing on Zebri's Allowed domains list and cannot break on a preview deployment or a domain change. A browser post that is rate limited or hits an unknown token surfaces as an unreadable CORS error, which would show a real person the wrong thing. | Zebri exposes something the browser can do and the server cannot |
| The lead source rides in `referral_source` | The API has no source field, and it is the only free text field besides the message. The site does not ask couples how they found TJ, so it is otherwise empty. It carries "Website enquiry form" or "Website date check, homepage" so the two entry points can be measured against each other. | TJ wants the couple's own answer there, which means adding the question to the form and moving the source into a Zebri custom field |
| Guest count is appended to the message, not mapped | TJ's Zebri form has no guest count field and no custom fields configured. A labelled line at the end of the message keeps the answer rather than dropping it. Everything else is mapped field by field, so the pipeline automations still fire. | TJ adds a guest count field in Zebri, then add the key to `zebriFieldMap` |
| The form token sits in `content/zebri.ts`, not an env var | Zebri's token is public by design and appears in every embed snippet they hand out. It identifies the form, it does not authorise anything. A maintainer picking this up cold can see what the form points at. An env override is read first for a staging account. | Zebri ever makes the token a secret |

## Assumptions made without an answer

Overrule any of these and the docs get updated.

**Video.** Assumed there is none yet. The hero is designed so audio or video is
the signature element with a photo fallback. A sixty second phone clip of TJ on
the mic would be worth more to this site than another five thousand dollars of
design.

**Packages.** Resolved on 4 September 2026. TJ sent his 2027 pricelist, so the
tiers, inclusions, prices, travel and payment terms are all his. The guess this
paragraph used to describe, reception only and full day and full day plus live
music, was wrong in structure as well as in price.

## LAUNCH BLOCKER: fabricated content is currently live in the build

Arjun instructed on 1 September 2026 to override the "never invent facts about
TJ" and "never invent or embellish testimonials" rules in `CLAUDE.md` and put
realistic placeholder content in, so the hero and the wall of love could be
designed against something that looks real.

That content is now in the production build, not just in development. **None of
it came from TJ and none of it may reach the live domain.**

| File                      | Fabricated                                                   | Live?                          |
| ------------------------- | ------------------------------------------------------------- | ------------------------------ |
| `content/site.ts`         | `weddingsHosted` "Over 200", `hostingSince` "2016"           | Yes, showing in the hero       |

Testimonials are off this list as of 30 September 2026. On Arjun's
instruction every invented quote, couple and supplier alike, was removed, along
with the invented venue names that came with them. The wall now shows only six
real reviews from TJ's Google Business Profile, each badged as a Google review.

Find anything invented that is still left with:

```bash
grep -rn 'PLACEHOLDER DATA' content/
```

No `Review` or `AggregateRating` schema is emitted for the wall. The quotes are
real now, but they are copied from Google, and marking up reviews taken from a
third party's platform is against Google's review snippet guidelines.

Pricing is off this list as of 4 September 2026. TJ sent his 2027 pricelist and
`content/packages.ts` now holds his packages, his inclusions, his prices, his
travel terms and his payment terms, with the source named at the top of the file.
The faked "from $1,200, $1,950 and $2,900" and the reconstructed inclusions are
gone. The hero numbers are still invented and still live.

Both pricing guards released with it, and both are still wired to
`hasPlaceholderPricing` in `content/packages.ts`:

- **`Offer` schema** now ships on `/wedding-mc`, one `Offer` per package, each
  price the same flat figure a visitor reads on the page.
- **`/llms.txt`** now states the prices, the travel terms and the booking fee.

Set `hasPlaceholderPricing` back to `true` the moment anyone puts an unconfirmed
number in that file and both guards close again, along with the cost FAQ, which
builds its answer from the same array.

Nothing in the packages describes TJ running the ceremony, and nothing added to
them ever should. He is not a celebrant.

## `[NEEDS TJ]` markers currently in the code

The definition of done in `CLAUDE.md` allows markers to remain only if they are
listed here. These are all of them. Each one is a fact we will not invent.

| Where                     | Marker                                                         | What it blocks                                                    |
| ------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `content/site.ts`         | Surname                                                        | Nothing visible. Strengthens entity resolution in schema.         |
| `content/site.ts`         | Phone number, yes or no                                        | `telephone` in schema, and enquiries from older and corporate bookers. |
| `content/site.ts`         | Real response time                                             | The contact intro and the confirmation both stay vague.           |
| `content/site.ts`         | Confirm the Instagram handle is live                            | `sameAs` in schema. A dead profile weakens entity resolution.     |
| `content/media.ts`        | Hero audio                                                      | The signature element of the whole design. Currently absent.      |
| `content/media.ts`        | Hero and portrait images                                        | The hero runs on type alone and the about page has no photo.      |
| `content/gallery.ts`      | Every gallery image                                             | The gallery is empty and says so.                                 |
| `content/testimonials.ts` | TJ's Google Business Profile link, and his OK to show these six reviews | The Google badge on each review cannot link to the profile.     |
| `content/packages.ts`     | Whether the 2027 prices hold for a date left in 2026            | Nothing visible. The page and `/llms.txt` both say 2027.          |
| `content/faqs.ts`         | Two answers: DJs, lead time                                     | Two of the six FAQs do not render and emit no schema. The cost answer is now built from `content/packages.ts`. |

The single highest value thing TJ can send is a phone recording of himself on
the mic. It unblocks the signature element of the design.

## Blocked on TJ

Send one message with all of these. Ten minute reply, unblocks most of the copy.

1. Which cultural weddings has he actually hosted, and which would he be
   confident being booked for? Factual question, not a personal one. Decides
   whether we build the cultural pages at all.
2. How much does he want his background to be part of the brand? Broad Sydney MC,
   or known for a particular community?
3. Roughly how many weddings a year, and since when?
4. Answered by the 2027 pricelist on 4 September 2026. One thing left on it: do
   those prices hold for a date still in 2026, or is there a separate rate?
5. Answered in part by the same pricelist. The booking fee, the balance and when
   each is due are now the middle step of "How booking me works" on
   `/wedding-mc`. Still open: is there a contract, and does he want the rest of
   his payment terms, the ones about a late balance, said anywhere public?
6. Original photo files plus photographer names. See `05-assets.md`.
7. Any audio or video of him on the mic.
8. Does he want a phone number on the site?
9. Does he have a Google Business Profile? If not, this is the highest value hour
   in the entire project.
10. Can he get venue names, dates or photos attached to any of the four existing
   testimonials?
11. A recorded fifteen minute chat about how he got into this.

Ask for a voice memo rather than typed answers. He is a talker, you will get far
more out of him, and the transcript feeds straight into the copy.

## Blocked on Arjun

1. Resolved. A native form was built rather than the embed. See the decision log.
2. Resolved on 4 September 2026. Both forms post into TJ's pipeline through the
   Zebri lead capture API, with the field keys confirmed against his account.
   Nothing is left to fill in and no environment variable is needed. Two things
   still need a person: send one real test enquiry from the live domain and
   confirm the record lands with every field in the right place, and confirm
   with TJ that `referral_source` is free for us to use as the lead source. See
   the decision log.
3. Sign off on allowing AI crawlers in `robots.txt`.
4. Crawl the old site and export twelve months of Search Console data before
   cutover.
5. Sign off the loader, which now runs on the site. It plays once per browser
   session, full screen, over the first page a visitor lands on, and fades out
   on the finished lockup. Six and a half seconds, one stroke: from the tail of
   the C in TJ's name round the circle, into the start of the T, through every
   letter with nothing lifted, out of the C again, up a coiled wire into the
   base of the microphone, which fills to the grille while the suit comes up
   white with an amber glow. With reduced motion set it is skipped. Wired in
   `app/layout.tsx` via `components/loaders/SiteLoader.tsx`; the preview route
   it was built on is gone.
6. Sign off the lettering. The name is hand drawn as one continuous stroke in
   `scripts/loader-path.py`, because a font glyph is a filled shape the light
   cannot travel through in writing order. It is a loose signature rather than a
   typeface, and the T, J and "our" are the letters most worth another look.
   Every letter is a short list of bezier points in that script, so it is cheap
   to adjust: edit, run the script, rebuild.

## Tell TJ up front

Expect a two to four week ranking dip after the migration. Normal, and it
recovers. Say it now, in writing, so it does not become a worried phone call in a
fortnight.
