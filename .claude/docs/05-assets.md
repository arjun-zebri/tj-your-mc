# Assets

Every image and video is tracked here with its source and licensing status.
Nothing ships to production with status `unlicensed`.

## Why this file exists

Wedding photographs are owned by the photographers who took them. TJ appearing in
a photo, and TJ posting it to his own Instagram, does not give him or us the
right to use it on a commercial website. We are being paid to build this site and
we charge a monthly fee to manage it, so the exposure sits with us as much as
with TJ.

It is also a quality problem. Instagram re-encodes uploads heavily. A 1080px
compressed JPEG stretched across a hero on a retina screen looks exactly like
what it is, and no amount of design saves it.

## Status values

- `unlicensed` From Instagram or the old site. Placeholder only, must not ship.
- `requested` Asked TJ or the photographer, waiting on a reply.
- `cleared` Written permission obtained. Record who granted it and the credit
  requirement.
- `owned` TJ shot it or commissioned it with full rights.

## What to ask TJ for

1. Original full resolution files, not Instagram downloads
2. The photographer's name and handle for each one
3. Whether he already has permission. Many MCs are given usage rights as part of
   supplier relationships.
4. Any video at all, even phone footage from a reception
5. One recent portrait of him that is not from a wedding

Most wedding photographers grant usage for a credit line and a link. It is a
normal, quick ask and it usually earns goodwill with a supplier who also refers
work.

## Register

| File                         | Source                  | Used on                   | Status     | Credit  | Notes                                                                                 |
| ---------------------------- | ----------------------- | ------------------------- | ---------- | ------- | ------------------------------------------------------------------------------------- |
| `hero.webp`                  | Supplied by Arjun       | Homepage hero             | cleared    | `[TBC]` | 1440x1440. Square, so it crops top and bottom in the full bleed hero. Status set on Arjun's word, no licence sighted. |
| `what-i-actually-do.webp`    | Supplied by Arjun       | Homepage, "What I actually do" | cleared | `[TBC]` | 1440x1440. Status set on Arjun's word, no licence sighted.                     |
| `hero-reception.jpg`         | `[TBC]`                 | Not used, superseded      | unlicensed | `[TBC]` | Superseded by `hero.webp`. Row kept so the original request is not lost.             |
| `tj-portrait.jpg`            | `[TBC]`                 | About                     | unlicensed | `[TBC]` | Ideally not on a stage. The person, not the performer.                                |
| `tj-1.webp` to `tj-9.webp`   | Supplied by Arjun       | Homepage, "Nights I have run" | cleared | `[TBC]` | Mixed orientations, rendered in a masonry layout so nothing is cropped to square. Status set on Arjun's word, no licence sighted. |
| `og-default.jpg`             | `[TBC]`                 | All pages, social sharing | unlicensed | n/a     | Must be 1200x630. The old site used a 372x488 portrait that crops badly everywhere.   |
| `tj-logo.webp`               | Supplied by Arjun       | Header, footer, drawer    | cleared    | n/a     | 2954x2953 with alpha. Artwork is white and occupies only the middle 2562x966 of the canvas, so it is rendered with a centred cover crop. White only, so it cannot go on the paper sections without a dark variant. |
| `loader.webp`                | Supplied by Arjun       | Not used directly         | cleared    | n/a     | 2953x2953 with alpha. Bow tie, lapels and microphone, white on transparency. The source for the three masks below. Status set on Arjun's word, no licence sighted. |
| `loader-mark.webp`           | Derived from `loader.webp` | Every page, first load | cleared    | n/a     | 720x997. `loader.webp` trimmed to its own bounding box. Used as a CSS mask so it takes `currentColor`. |
| `loader-mic.webp`            | Derived from `loader.webp` | Every page, first load | cleared    | n/a     | The microphone alone, including the handle, cut out of the mark so it can be lit on its own. Same 720x997 canvas, so it overlays exactly. |
| `logo.svg`                   | Old site `logo.png`     | Not used, superseded      | `[TBC]`    | n/a     | Superseded by `tj-logo.webp`. A vector source is still worth having for print and favicons. |
| `hero-audio`                 | `[TBC]`                 | Homepage hero             | unlicensed | `[TBC]` | The signature element of the design. A phone recording from a real reception is fine. |

Keep this table in sync with `content/gallery.ts`.

### The loader masks are a workaround

There is no vector source for the mark, so the microphone was separated out of
the raster by connected component labelling and written back out as a second
mask on the same canvas. That is why the two files line up pixel for pixel and
why nothing in the loader needs to know where the microphone sits.

It works, and it costs about 55KB the browser has to fetch before the loader can
draw anything, which is a strange thing for a loader to need. If TJ can produce a
vector of the mark, or agrees to it being redrawn per
`.claude/skills/iconography/SKILL.md`, both files collapse into inline SVG paths,
the loader gets to draw instantly, and the masks here can be deleted.

The name in the loader is not a font. It is drawn as a single stroke in
`scripts/loader-path.py` so the light can write it, and regenerated into
`components/loaders/cable.ts` from there.

## Technical requirements

- Serve through `next/image` with explicit `width` and `height` to prevent layout
  shift
- WebP or AVIF with JPEG fallback, handled by Next
- Hero gets `priority`, everything else lazy loads
- Source files at least 2400px on the long edge for anything full width
- Real descriptive alt text on everything. See the alt text rules in
  `.claude/skills/mc-website-copy/SKILL.md`.
- Keep originals wherever Knotify stores client assets, outside the build, so a
  future rebuild does not start from compressed web copies

## Outstanding on the two supplied images

`hero.webp` and `what-i-actually-do.webp` arrived from Arjun on 1 September 2026
and are marked `cleared` on his instruction to use them. Nobody on this side has
seen a licence or a photographer name for either.

Two things still needed before launch:

1. The photographer for each, and whether the licence requires a credit line.
   The register has a `Credit` column and both are `[TBC]`.
2. Confirmation TJ actually holds usage rights. He appears in both, which as the
   top of this file says is not the same thing as owning them.

Neither blocks design work. Both block the domain pointing here.

## Pre-launch gate

Before pointing the domain at Vercel, every row must read `cleared` or `owned`.
If TJ has not come back on some by then, ship the cleared subset with fewer
images rather than shipping unlicensed ones. A smaller gallery is not a problem.
A copyright complaint on a client's live site is.
