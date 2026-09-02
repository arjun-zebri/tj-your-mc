---
name: ui-craft
description: Build and refine the visual interface of the TJ Your MC site to a level that does not read as AI generated or templated, covering layout, spacing, type scale, colour application, component construction, motion, interaction states, responsive behaviour and accessibility. Use this skill whenever you build or change a component, section, page layout or style, whenever you are about to write Tailwind classes or CSS, whenever something looks generic or you are unsure why a screen feels flat, and whenever anyone mentions design, polish, spacing, layout, animation, styling or making it look better.
---

# UI craft

The design direction is in `.claude/docs/02-brand-and-design.md`. That file decides what
the site looks like. This skill decides whether it is built well enough to
survive the decision.

The gap between a good direction and a generic result is almost always execution:
even spacing where there should be rhythm, every element treated with the same
weight, motion applied everywhere instead of once, and defaults left where
choices should have been made.

## The calibration problem

Generated interfaces cluster. Recognising the cluster is most of the job.

Current tells, all of which are legitimate choices in some brief and defaults in
this one:

1. Content chopped into identical rounded cards, one border radius on everything
   regardless of hierarchy, the same soft grey shadow under each
2. Three columns of icon, bold heading, two lines of grey text
3. A tracked-out all-caps eyebrow label above every heading
4. Fade-and-slide-up on every section as you scroll
5. Gradient washes used as decoration rather than to carry meaning
6. Tinted near-black standing in for black, monospace for small data labels, an
   arrow appended to every link
7. Everything centred
8. A single accent colour applied to one word of a headline to make it feel
   designed

If you find yourself producing any of these, stop and ask what the content
actually is. Usually the answer reveals a better structure. Three paragraphs of
prose about what TJ does are not three parallel things, so they are not three
cards.

## Hierarchy through difference, not size

The commonest flaw in generated UI is that everything is treated equally, then
hierarchy is faked with font size. Real hierarchy comes from difference in kind.

On this site the hero is loud and everything below it is quiet. That is the plan
in the brand brief and it only works if the quiet parts are actually quiet.

Practical version:

- One element per screen gets the accent colour. If two things are amber, neither
  is important.
- Vary the treatment between sections. Dark, then light, then dark. A section on
  `paper` after four on `ink` does more than any heading size.
- Let sections have different internal structures. Uniform section scaffolding is
  what makes a page feel like a template even when each section is fine.

## Spacing and rhythm

Use a scale, not arbitrary values. Tailwind's default spacing scale is fine.
Never `mt-[37px]`.

Vertical rhythm should not be uniform. Related things sit close, unrelated things
sit far apart, and the gap itself communicates the relationship. A heading 8px
from its paragraph and 96px from the section above reads correctly without any
divider line. If every gap is 64px, you need dividers to explain the structure,
which means the spacing failed.

Section padding on this site runs generous. Cramped vertical space is the fastest
way to look cheap, and it is the main visual difference between a Wix template
and a designed site.

Horizontal: content max width around 68 characters for prose. Full bleed for
imagery. Do not centre a 1200px container and put everything inside it, that is
the default and it wastes the asymmetry the layout is built on.

## Type

Scale set in `.claude/docs/02-brand-and-design.md`. Beyond it:

- Line height inverse to size. Display type tight, around 1.05 to 1.15. Body
  loose, around 1.55.
- Tighten letter spacing on large display sizes. Type set at 72px needs negative
  tracking or it reads loose.
- Never letter-space lowercase body text.
- Sentence case everywhere. No all-caps labels.
- Two weights per family maximum in use at once. More reads as indecision.
- Set `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
  Cheap, and it removes orphans that make a page look unfinished.

## Components

Build them as small as they need to be and no smaller. A `Section` wrapper that
forces identical padding on every section is how pages become uniform.

- Border radius carries meaning. Buttons and the form panel can be soft. Images
  can be square. Do not apply one radius token to everything.
- Shadows: use them almost never on a dark palette, they do not read. Elevation
  comes from the `stage` surface against `ink`.
- Borders: hairline `dust` at low opacity where separation is genuinely needed.
  Not around everything.
- No card unless the content is genuinely a discrete repeated unit. Packages are.
  Paragraphs are not.

## Motion

One orchestrated moment: the hero settles on load, once. Nothing else animates on
scroll.

Motion that answers a user action is welcome and should be fast. 150 to 200ms for
hover and focus, 250 to 300ms for something opening. Ease out for things entering,
ease in for things leaving.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Ship that, and make sure the hero's load sequence ends in the correct final state
rather than never running and leaving elements invisible. That bug is common and
it makes the site blank for the people who most need it not to be.

## States

Every interactive element needs five and most generated UI ships two.

Default, hover, focus visible, active, disabled. Plus loading and error where
relevant.

- Focus rings are `warmlight` and always visible on keyboard focus. Never
  `outline: none` without a replacement. A visible focus ring is not a design
  compromise, it is the thing that makes the site usable by a chunk of people.
- Hit targets minimum 44px on touch. Check the mobile menu and the audio control
  specifically.
- Disabled states must not rely on colour alone.

Empty and error states are direction, not mood. Say what happened and what to do.
Copy for these is in `.claude/docs/04-copy-deck.md`.

## Responsive

Design mobile first and mean it. Most of TJ's traffic is a phone at night.

- Test at 375px, not just at a resized desktop window
- The hero must work at 375px without the headline breaking into six lines
- Do not just stack the desktop layout. Reconsider what the section needs at that
  width. Sometimes the answer is fewer elements, not smaller ones.
- Check with the system font scaled to 200%, which is a real setting real people
  use

## Accessibility floor

Not a phase at the end, and not optional.

- Contrast: body text 4.5:1, large text 3:1. `dust` on `stage` fails at small
  sizes, so check before using it.
- Semantic HTML. `<button>` for actions, `<a>` for navigation. A div with an
  onClick is not a button.
- One `h1`, no skipped levels.
- Images have real alt text, per `.claude/skills/mc-website-copy/SKILL.md`.
- The audio player is keyboard operable and announces its state.
- Never communicate anything by colour alone.

## Self-critique loop

Build, then look, then cut. Take screenshots as you go if the environment allows,
a picture is worth a thousand tokens.

Ask on each pass:

1. Would I know which website this is if the logo were removed? If not, the
   distinctiveness is all in the logo and there is nothing else there.
2. Does this screen have exactly one thing that draws the eye first? Two means
   neither wins.
3. Which element would I remove if forced? Remove it, then look again. It is
   almost always better.
4. Which part did I build on autopilot? Go back to it, that is where the default
   crept in.
5. Does it survive at 375px, and with reduced motion on, and with keyboard only?

## When something feels flat but you cannot say why

Work through these in order, it is usually one of them.

1. Everything is the same distance apart, so nothing is grouped
2. Everything is the same weight, so nothing leads
3. The accent is used more than once per screen, so it stopped meaning anything
4. The section is centred when the rest of the page is left aligned, or the
   reverse
5. The type is too small and the spacing too tight, which is the default of every
   framework and always looks cheap
6. There is a card around something that is not a card
