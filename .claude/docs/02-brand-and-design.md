# Brand and design

## The problem with the category

Every wedding MC site in Sydney looks the same. Cream background, thin serif
headline, soft gold accent, a grid of ceremony photos, the word "unforgettable".
They all sell the same abstract warmth and none of them prove anything.

TJ's actual product is a voice and a presence in a room after dark. That is not a
cream and gold product. Building this like a wedding invitation is the safe move
and it will make him invisible.

## The idea

**Design the room at 9pm, not the ceremony at 3pm.**

The reception is TJ's territory. Low light, warm uplighting, a dance floor, a
microphone. Genuinely different from the ceremony imagery every competitor uses,
honest about what he sells, and it suits the assets we are likely to get.

## Signature element

**Hear him before you read him.** The hero is a play control on a short clip of
TJ on the mic, treated as the main event rather than a widget in a corner. A
couple deciding between four MCs can hear the difference in eight seconds. Nobody
in this category does it, because nobody in this category has anything worth
hearing.

Spend the boldness here. Everything else stays quiet.

If there is no usable audio by launch, the hero falls back to one full-bleed
reception photograph with the headline set over it, and audio slots in later
without a redesign. Do not fake it with a decorative waveform graphic.

## Palette

| Token       | Hex       | Use                                                                                                  |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `ink`       | `#141018` | Page background. Warm near-black with a purple bias. The colour of a dark room, not a dark UI theme. |
| `stage`     | `#221B27` | Raised surfaces, cards, the form panel.                                                              |
| `warmlight` | `#F2A65A` | Signature accent. Warm uplighting amber. Play control, focus rings, one thing per screen.            |
| `chalk`     | `#F5F0EA` | Body text on dark. Never pure white, too clinical against warm tones.                                |
| `dust`      | `#A79CA9` | Secondary text, captions, labels.                                                                    |
| `paper`     | `#F5F0EA` | Background for the one or two light sections that need a breather, with `ink` as text.               |

Deliberately avoided: cream and terracotta, gold on white, blush pink, and dark
with a bright acid green or vermilion accent. Those are the four defaults and
three of them are all over this category.

Contrast: `chalk` on `ink` and `warmlight` on `ink` both clear WCAG AA. Check
`dust` on `stage` before using it below 16px.

## Typography

Two families, clearly different jobs.

**Display: Bricolage Grotesque.** Variable, slightly irregular, personality
without being a novelty face. Use the wider optical sizes at large scale.

**Body: Instrument Sans.** Humanist, clean, holds up small on a phone.

Both on Google Fonts, so they load through `next/font/google` with no external
request.

Rules:

- Display sizes are genuinely large. A hero headline at 28px is a blog post.
- Body 17 to 18px on mobile, line height 1.55, measure under 70 characters.
- Sentence case throughout. No all-caps eyebrow labels.
- Never colour one word of a headline in the accent to make a bland headline feel
  designed. Write a better headline.

## Layout

Left aligned, generously spaced, one strong asymmetry rather than everything
centred. Centred text is the category default and reads as a wedding invitation.

```
+------------------------------------------------------+
|  TJ YOUR MC                            Check my date |
+------------------------------------------------------+
|                                                      |
|   HEADLINE SET LARGE                                 |
|   ACROSS TWO OR THREE LINES        [ reception photo |
|                                       full bleed to  |
|   ( > )  Hear thirty seconds          the right edge]|
|   one line of context                                |
|                                                      |
+------------------------------------------------------+
|   What I actually do at your reception               |
|   (three plain paragraphs, not three identical cards)|
+------------------------------------------------------+
|   [ light section: packages, three columns ]         |
+------------------------------------------------------+
|   Gallery, uneven grid, mixed orientations           |
+------------------------------------------------------+
|   Questions couples ask me   (FAQ, real answers)     |
+------------------------------------------------------+
|   Check my date  (form on stage panel)               |
+------------------------------------------------------+
```

Three notes on that structure:

- "What I actually do" is prose, not three matching icon cards. Icon triptychs
  are the most obvious template tell, and the content is not three parallel
  things anyway.
- The gallery is deliberately uneven. Wedding photos come in mixed orientations
  and forcing them into identical squares wastes the best ones.
- The FAQ sits above the form on purpose. It handles objections at the moment
  someone is deciding whether to enquire, and it is the highest value block on
  the page for answer engines.

## Motion

One orchestrated moment: the hero settles on load, once. Nothing else animates on
scroll. Hover and focus states respond, the audio player responds to being used.
Respect `prefers-reduced-motion` and skip the load sequence entirely when set.

Scroll-triggered fade-and-slide on every section is the generic default. Do not.

## The fifteen second test

The site must prove four things before a phone user scrolls away.

1. This is a real person, not an agency
2. He sounds good
3. He works in Sydney
4. Checking whether he is free is one tap

If a design decision does not serve one of those, cut it.
