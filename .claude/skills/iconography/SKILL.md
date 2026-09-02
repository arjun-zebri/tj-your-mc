---
name: iconography
description: Design and build the custom icon and mark system for the TJ Your MC site, covering icon concept, stroke system, SVG implementation, the audio player controls, form field marks, and any decorative motif work. Use this skill whenever you add, draw, choose or modify an icon, symbol, logo mark, bullet marker or ornament, whenever you are tempted to install an icon library, and whenever anyone mentions icons, symbols, motifs, patterns, ornaments or cultural design elements.
---

# Iconography

Stock icon sets are the fastest way to make a custom site look templated. Lucide
and Feather are excellent and they are on roughly a third of the web, so a
visitor has seen these exact shapes a hundred times this week. On a site whose
whole job is proving TJ is not interchangeable, that is a real cost.

But icons are also the weakest place to spend distinctiveness, so the rule is:
few icons, all bespoke, all doing a job.

## Where icons are allowed

Icons earn their place by aiding navigation or interaction. They are not
decoration and they are not a substitute for writing a clear label.

Allowed:

- Audio player controls: play, pause, progress
- Form field affordances: date, error, success
- External link and Instagram in the footer
- The mobile menu toggle
- Package tier markers, if the tiers need distinguishing at a glance

Not allowed:

- An icon above each of the three "what I do" paragraphs. `.claude/docs/02-brand-and-design.md`
  explicitly rejects the icon triptych, it is the single most obvious template
  tell.
- Icons as bullet points in a list
- Decorative flourishes between sections
- An icon inside a circle inside a card. That stack is the SaaS default.

If an icon has no function, delete it. Chanel's rule applies: take one thing off
before leaving the house.

## The concept

Derive the marks from TJ's actual working world, not from wedding stock imagery.

TJ works off a run sheet. A running order with times down the left, marked up in
pen, ticked off as the night goes. That is the most characteristic object in his
job and nobody in the category has touched it.

So the icons read like **marks made on a run sheet**: a hand-drawn tick, a
bracket grouping two items, a timing notch, a circled moment, an arrow handing
over to the DJ. Slightly irregular, drawn rather than constructed, as if someone
made them quickly with a pen while standing up.

That gives us something ownable, grounded in what he actually does, and
completely absent from every competitor site.

If that direction does not land with Arjun, the fallback is a plain geometric set
drawn to the system below. Plain and consistent beats stock. It does not beat
distinctive.

## Drawing system

Consistency across the set matters more than any individual icon.

- 24 x 24 viewBox, 1.5px stroke, drawn on a 2px grid with a 2px safe margin
- One stroke weight across the entire set. Never mix filled and outline styles.
- Round line caps and joins, matching the warmth of the type
- Slight irregularity is deliberate for the run sheet direction. Do not
  straighten it into geometric perfection, that removes the whole idea.
- Optical alignment over mathematical. A triangle play icon needs nudging right
  of centre to look centred.
- Test every icon at 16px. If it turns to mud, simplify it rather than shipping
  it small.

## Implementation

Hand-authored SVG components in `components/icons/`. No icon library
dependency.

```tsx
export function PlayMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* paths */}
    </svg>
  );
}
```

Rules:

- `stroke="currentColor"` always, so icons inherit text colour and theme
  correctly. Never hardcode a hex.
- `aria-hidden="true"` when the icon sits beside a visible label, which is most
  of the time.
- When an icon is the only content of a control, give the control an
  `aria-label`. An unlabelled icon button is invisible to a screen reader.
- Size with Tailwind classes on the element, not with width and height
  attributes, so one component works at every size.
- Run SVGO before committing. Editor exports carry a lot of junk.
- No gradients, no duotone, no drop shadows inside icons.

## The logo mark

The current logo is a raster PNG with no vector source. See `.claude/docs/05-assets.md`.

Before redrawing it, ask TJ who made it and whether he is attached to it. A logo
someone made for him has sentimental weight that is not obvious from looking at
the file. If he is happy for it to change, redraw as SVG in the same system as
the icons so the whole visual language holds together.

## Cultural motifs

Arjun has asked about Polynesian-style iconography. This section is the process
for that, and it is gated on purpose.

**Do not generate Polynesian-styled patterns or icons.** Not now, not as a
placeholder, not as an exploration.

Two reasons.

First, we still do not know TJ's background or whether he wants it in his brand.
That is question one and two in `.claude/docs/06-decisions.md` and neither is answered.
Designing around an assumption about a client's heritage is a bad position to be
in when he sees the mockup.

Second, and this holds even if he confirms: Polynesian visual traditions are not
one thing. Samoan tatau, Tongan ngatu, Māori kōwhaiwhai and Hawaiian kapa are
distinct traditions with distinct grammars, and many of the motifs carry meaning
tied to lineage, rank and family. A generated approximation that blends them
reads as appropriation to exactly the audience it is meant to attract. The
Islander couples who would notice are the ones we would be marketing to.

**If TJ confirms both a specific culture and that he wants it in his brand**, the
path is:

1. Name the specific tradition. Not "Polynesian". Samoan, Tongan, Māori,
   Hawaiian, Fijian, Cook Islands, whichever it actually is.
2. Commission a designer or artist from that community to create the motif work.
   Budget for it as a real line item. This is the part that cannot be shortcut
   and it is what separates respectful from extractive.
3. Have TJ approve the specific motifs. Some carry meaning he may not want or may
   not be entitled to use.
4. Use them as a considered accent, most likely one section divider or one
   framing element, not scattered through the UI as decoration.
5. Credit the artist on the site.

Until all of step one is answered, build the run sheet system. It is a better
idea anyway, because it is about what TJ does rather than what he looks like.

## Review pass

- Every icon in the set shares one stroke weight and one construction logic
- No icon is decorative
- Every icon legible at 16px
- All use `currentColor`
- Icon-only controls have accessible names
- Nothing came from an icon library
- No cultural motif work without the gate above cleared
