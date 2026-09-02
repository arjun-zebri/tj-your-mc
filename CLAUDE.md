# CLAUDE.md

Marketing website for TJ, a wedding and event MC in Sydney. Rebuild of an existing
WordPress site. Built and maintained by Knotify Pty Ltd.

Read this file first, then load whichever skill matches the work in front of you.

---

## Repo layout

```
CLAUDE.md          you are here
AGENTS.md          pointer to this file, plus a block next dev maintains itself
.claude/docs/      project context, read in order when picking this up cold
.claude/skills/    procedural knowledge, load the one that matches the task
app/               routes, App Router
components/        React components
content/           typed content files, the closest thing to a CMS
lib/               helpers, schema builders, utilities
public/            static assets
```

No `src/` directory. Everything lives at the repo root and imports resolve
through the `@/` alias, so `@/content/site` is `content/site.ts`.

Each skill owns its own `references/` and `scripts/`. Those files belong to the
skill, not to `docs/`, and paths inside a SKILL.md are relative to that skill.

## Who the site is for

Engaged couples in Sydney, mostly 25 to 40, five to twelve months out from their
wedding. Usually browsing on a phone, at night, with three or four MC websites
open at once.

They are answering one question: will this bloke make our night feel good, or
will he make it awkward. Everything on this site exists to answer that and then
make enquiring easy.

The site is wedding only. `/corporate-mc` was removed on 2 September 2026 on
Arjun's instruction. Do not add corporate pages, sections or copy back without
him asking for them.

## What TJ sells

TJ is a Master of Ceremonies. He runs the room: introductions, running order,
speeches, timing, energy, handovers to the band or DJ. He is a singer as well,
but that is a supporting feature here, not the headline.

**TJ is not a celebrant.** He does not perform the legal marriage ceremony. The
old site confuses the two and it must never happen again. The distinction is in
`.claude/skills/mc-website-copy/SKILL.md`.

## Stack

Next.js App Router, TypeScript, Tailwind, deployed on Vercel. Fonts through
`next/font/google`, images through `next/image`. No CMS in v1: content lives in
typed files under `content/` so it can be edited without touching components.

TJ owns the domain. Knotify manages hosting and maintenance on a monthly fee, so
build everything as if a different maintainer has to pick it up cold.

---

## Hard rules

**Never invent facts about TJ.** No fabricated years active, event counts,
venues, awards or associations. If copy needs a fact we do not have, write
`[NEEDS TJ: question]` and leave it visible. A placeholder we notice is fine. A
confident lie on a client's live site is not.

**Never invent or embellish testimonials.** The four inherited quotes are all we
have. Do not add to them, rewrite them, or attach rating schema to them.

**Never use an em dash.** Not in copy, headings, alt text, meta descriptions or
code comments. Full stop, comma, or restructure. Enforced by
`npm run check:dashes`, which fails the build.

**Australian English everywhere.** `lang="en-AU"`, `og:locale` `en_AU`. The old
site shipped `en_US`.

**Server render everything that matters.** Copy, headings, FAQs, schema and
internal links must be in the initial HTML. Client-only content is invisible to
answer engines. Use `"use client"` only for real interactivity.

---

## Skills

Load the matching skill before starting that kind of work. They hold decisions
already made and not worth relitigating. Each SKILL.md points to its own
reference files.

| Load this                                 | Before you                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `.claude/skills/mc-website-copy/SKILL.md` | Write or edit any word a visitor reads, including buttons, labels, alt text and meta descriptions |
| `.claude/skills/local-seo-pages/SKILL.md` | Create a route, write metadata, add schema, set up redirects, or build landing pages              |
| `.claude/skills/zebri-embed/SKILL.md`     | Touch the enquiry form, its fields, states or validation                                          |
| `.claude/skills/ui-craft/SKILL.md`        | Build or change a component, section or layout, or write any styling                              |
| `.claude/skills/iconography/SKILL.md`     | Add, draw or change any icon, mark, logo or motif                                                 |

## Docs

Numbered in the order they make sense to read cold.

| File                                   | What it holds                                                  |
| -------------------------------------- | -------------------------------------------------------------- |
| `.claude/docs/01-project-brief.md`     | Client, scope, commercials, timeline, what success looks like  |
| `.claude/docs/02-brand-and-design.md`  | Design direction, palette, type, layout, the signature element |
| `.claude/docs/03-site-architecture.md` | Routes, content layer, the 301 map from the old site           |
| `.claude/docs/04-copy-deck.md`         | Page by page copy with `[NEEDS TJ]` gaps marked                |
| `.claude/docs/05-assets.md`            | Every image, its source, and its licensing status              |
| `.claude/docs/06-decisions.md`         | Decision log, plus what is still blocked and on whom           |

---

## Definition of done for a page

1. Real content in the HTML source, not just after hydration
2. Unique title and meta description written for humans
3. Correct schema for the page type, validated
4. One `h1`, no skipped heading levels
5. Every image has descriptive alt text plus explicit width and height
6. Two or more contextual internal links out
7. Keyboard focus visible, `prefers-reduced-motion` respected
8. Passes `npm run check:dashes` and the review pass in `mc-website-copy`
9. No `[NEEDS TJ]` markers left, or they are listed in `.claude/docs/06-decisions.md`

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run check:dashes    # python3 .claude/skills/mc-website-copy/scripts/check-dashes.py
```
