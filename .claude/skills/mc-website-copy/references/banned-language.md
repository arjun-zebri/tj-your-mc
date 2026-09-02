# Banned language

The checklist for the review pass in `SKILL.md`. Every entry here appears either
on the old site or in default AI output, which are close to the same thing.

## Punctuation

**Em dash and en dash.** Banned outright, anywhere in the repo, including code
comments and alt text. Use a full stop, a comma, or restructure the sentence.
Enforced by `scripts/check-dashes.py`.

Other tells to avoid: arrows appended to link text, middle dots joining meta
strings, all-caps eyebrow labels above headings.

## Unbackable superlatives

Banned outright, because every competitor says them and none of them mean
anything:

sought-after, renowned, premier, leading, trusted by hundreds, award winning,
the go-to, Sydney's best, most experienced, top rated.

The old homepage claimed TJ "has earned the title of Sydney's most sought-after
professional MC in Sydney". Nobody awarded that title and the sentence contains
"in Sydney" twice.

Replace with a real number or credential if TJ gives us one, or cut the claim.

## Corporate abstraction

seamless, elevate, unforgettable, bespoke, tailored, curated, journey, immerse,
unparalleled, exceptional, flawless, magical moments, cherished memories, "we
understand that", "in today's world", "look no further", "at the end of the day".

Also "experience" used as a noun for the wedding itself. It is a wedding.

## Sentence shapes

These read as machine-written even when every individual word is fine.

- "It's not just X, it's Y"
- "Whether you're X or Y, I've got you covered"
- "From X to Y, every detail matters"
- Rule-of-three lists where the third item goes abstract, such as "energy,
  timing and magic"
- Opening a paragraph with a rhetorical question the reader did not ask
- A short fragment on its own line for emphasis. Like this. Every single time.
- Starting a sentence with "Look," or "Here's the thing"

## Keyword stuffing

The old homepage used "professional MC in Sydney" three times in one paragraph.
Write the target phrase once, naturally, and let structure do the ranking work.
See `.claude/skills/local-seo-pages/SKILL.md`.

Headings are for humans. "Wedding MC Sydney" is a title tag, not a headline.

## Voice slips

- "We" or "our team" when it is one person
- "The client" or "the couple" while addressing them directly
- Passive constructions hiding who does the thing. "The run sheet is managed"
  should be "I write the run sheet"
- American spelling. Organise, recognise, centre, honour, realise, apologise.

## Grammar and factual traps specific to this client

- Never call TJ a celebrant, officiant, or say he marries anyone
- Never imply he performs the ceremony
- Never state an event count, year count or venue he has not confirmed
- Never attach a rating, star count or review schema to the inherited
  testimonials
