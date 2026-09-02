---
name: zebri-embed
description: Wire the TJ Your MC enquiry form into TJ's Zebri CRM pipeline using the Zebri lead capture embed. Use this skill whenever you touch the enquiry form, contact form, quote request, booking flow, form fields, validation, the confirmation or thank you state, or when anyone mentions Zebri, the pipeline, leads, or where the form goes.
---

# Zebri enquiry embed

Every lead this site captures must land in TJ's Zebri pipeline. A beautiful site
that drops enquiries into a gmail inbox is a worse product than the one we
replaced, because TJ then has to rekey everything.

This is success measure number one in `.claude/docs/01-project-brief.md`.

## Which embed

Zebri offers a lead capture iframe and a script embed, both with custom branding.
Prefer the **script embed** so the form inherits the site's typography and
colours. An iframe in a custom designed site looks like an iframe, and iframes
are invisible to search engines, which costs the form's contribution to page
quality signals.

If the script embed cannot be styled to match, build a native form on this site
that posts to Zebri rather than shipping a mismatched iframe.

`[NEEDS ARJUN: confirm the script embed supports full CSS inheritance, or expose
the field endpoint so we can build native.]`

## Fields

The minimum that lets TJ reply usefully. Every extra field costs conversions, and
this form is being filled in on a phone at 11pm.

**Required**

- Name, one field, not first and last. This is not a bank.
- Email
- Wedding or event date
- Venue or suburb

**Optional**

- Phone
- Rough guest count
- Anything else you want me to know, free text

Do not ask for budget. Couples do not know it yet and it makes the first
interaction feel transactional.

The date field is the one that matters. TJ's first question on every enquiry is
"am I free". Making it required means he can answer without a back and forth, and
the Zebri record is immediately useful.

## Mapping to Zebri

Map every field to the matching Zebri lead field rather than dumping into notes,
or the downstream automations cannot fire. Confirm the field keys against TJ's
actual account before wiring, do not assume defaults.

Set the lead source so TJ can tell website enquiries from Instagram DMs. Use a
consistent value and record it here once set.

`[NEEDS ARJUN: field keys and the lead source value from TJ's Zebri account.]`

## Placement

The canonical form lives on `/contact` with its own URL so it can be linked and
shared. Every other page reaches it with a link, not a duplicate embed. One form,
one place, one set of analytics.

The exception is a compact date-check on the homepage capturing date, name and
email only, posting to the same pipeline with a distinct source value so we can
measure which converts better.

## States

The old site's form had no visible feedback at all. Handle all four.

- **Idle** Labels above fields, visible. Placeholder-only labels disappear as
  soon as someone types and fail accessibility.
- **Submitting** Button disabled, label changes, no layout shift.
- **Success** Replace the form with a real message. Tell them TJ has it, when he
  replies, and what he will ask. No redirect to a separate thank you page unless
  analytics requires it.
- **Error** Say what failed and give the mailto fallback, so a lead is never
  simply lost. An enquiry that errors silently is a booking TJ never knew about.

Copy for all four is in `.claude/docs/04-copy-deck.md`.

## Validation

Validate on blur, not on every keystroke. Errors sit next to their field, in
words, never relying on colour alone. Email validation should be permissive. The
only real test is an at sign with a dot after it.

## Accessibility

- Real `<label>` elements tied to inputs with `htmlFor`
- Correct `type` and `autoComplete` on every field so mobile keyboards behave
- Errors linked with `aria-describedby`, summary announced in a live region
- Full keyboard operation with visible focus
- Submit button says what happens, matching `.claude/skills/mc-website-copy/SKILL.md`

## Testing before launch

1. Submit a real test enquiry and confirm the record lands in TJ's Zebri pipeline
   with every field in the right place
2. Confirm any notification or automation TJ expects actually fires
3. Test on a real iPhone and a real Android, not a resized desktop browser
4. Kill the network mid-submit and confirm the error state and mailto fallback
   both work
5. Confirm the lead source value is correct on both forms
