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

## Assumptions made without an answer

Overrule any of these and the docs get updated.

**Video.** Assumed there is none yet. The hero is designed so audio or video is
the signature element with a photo fallback. A sixty second phone clip of TJ on
the mic would be worth more to this site than another five thousand dollars of
design.

**Packages.** Three placeholder tiers on a standard MC structure: reception only,
full day, full day plus live music. A guess. TJ almost certainly sells it
differently.

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
| `content/packages.ts`     | All three prices, all inclusions, and `pricingUpdated`        | Yes, showing on the pricing section |
| `content/testimonials.ts` | All 52 quotes, the couple names, the supplier names, the venues | Yes, showing on the homepage |

The section was removed on 1 September 2026 and restored the same day on Arjun's
instruction. Arjun is collecting real quotes from TJ to replace them. Until then
all 52 are invented and rendering live.

Find every one of them with:

```bash
grep -rn 'PLACEHOLDER DATA' content/
grep -rn 'source: "placeholder"' content/
```

Two things to check before launch, not one. The quotes are invented, and so is
the implication that TJ has worked at Curzon Hall, Ottimo House, Gunners
Barracks, Sergeants Mess and Doltone House. Naming a real venue is a claim about
where he has worked, and those venues can read the site.

No `Review` or `AggregateRating` schema is emitted while
`hasPlaceholderTestimonials` is true. Marking up invented reviews is what earns
a Google manual action, and that is a separate risk from displaying them.

Prices were faked on a later instruction. From $1,200, $1,950 and $2,900,
benchmarked against the Sydney wedding MC market so they look plausible, which
makes them convincing and still wrong. The inclusions are our reconstruction of
what a working MC delivers, not TJ's actual scope.

Two guards remain, and both should stay until the prices are real:

- **No `Offer` schema.** Gated by `hasPlaceholderPricing` in
  `content/packages.ts`. A displayed price can be corrected in a deploy. A price
  handed to Google as structured data goes into results and rich snippets and
  outlives the fix.
- **No prices in `/llms.txt`.** That file exists to be read and quoted by answer
  engines, so it is the last place an invented number belongs. It says pricing is
  quoted per event until `hasPublishablePricing` is true.

Watch the "Full day" inclusion about the ceremony. It is worded as guest
direction alongside the celebrant, deliberately, because TJ is not a celebrant
and must never be described as running the ceremony. Any rewrite of that line
needs the same care.

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
| `content/testimonials.ts` | The four quotes, transcribed verbatim                           | No testimonials render anywhere.                                  |
| `content/packages.ts`     | Hours, ceremony scope, song count, and all three prices         | Tiers show only partial inclusions and no prices.                 |
| `content/faqs.ts`         | Three answers: DJs, lead time, cost                             | Three of the six FAQs do not render and emit no schema.           |

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
4. What does he charge, and what is in each package?
5. What confirms a booking? Deposit, contract, how much and when. "How booking
   me works" on `/wedding-mc` currently jumps from the call to the run sheet
   because we cannot answer this.
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
2. The Zebri lead endpoint, API key and field keys from TJ's account. The form is
   complete and waiting on them: fill in `content/zebri.ts` and set
   `ZEBRI_LEAD_ENDPOINT` and `ZEBRI_API_KEY`. Until then every submission returns
   the error state with the mailto fallback, so no enquiry is silently lost.
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
