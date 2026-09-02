/**
 * Zebri lead capture wiring.
 *
 * Every lead this site captures must land in TJ's Zebri pipeline. A beautiful
 * site that drops enquiries into a gmail inbox is a worse product than the one
 * we replaced, because TJ then has to rekey everything. This is success measure
 * number one in .claude/docs/01-project-brief.md.
 *
 * The form is native rather than an embed, so it inherits the site's typography
 * and colours and is visible to search engines. See
 * .claude/skills/zebri-embed/SKILL.md for why an iframe was rejected.
 *
 * [NEEDS ARJUN: the field keys and the lead source value from TJ's Zebri
 * account. Map every field to its matching Zebri lead field rather than dumping
 * into notes, or the downstream automations cannot fire.]
 */

/**
 * Our field name on the left, TJ's Zebri lead field key on the right.
 * Replace each placeholder with the real key. Nothing else needs to change.
 */
export const zebriFieldMap = {
  name: "[NEEDS ARJUN: name key]",
  email: "[NEEDS ARJUN: email key]",
  eventDate: "[NEEDS ARJUN: event date key]",
  venue: "[NEEDS ARJUN: venue key]",
  phone: "[NEEDS ARJUN: phone key]",
  guestCount: "[NEEDS ARJUN: guest count key]",
  message: "[NEEDS ARJUN: message key]",
} as const;

export type EnquiryField = keyof typeof zebriFieldMap;

/**
 * Two entry points, one pipeline. Distinct source values so we can measure which
 * converts better, per the placement rules in the skill.
 */
export const leadSources = {
  contactPage: "tj-website-contact",
  homepageDateCheck: "tj-website-date-check",
} as const;

export type LeadSource = (typeof leadSources)[keyof typeof leadSources];

/** True once the placeholders above have been replaced with real keys. */
export function fieldKeysConfigured(): boolean {
  return Object.values(zebriFieldMap).every((key) => !key.startsWith("[NEEDS"));
}
