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
 * We post from the server, not the browser. A server post carries no Origin
 * header, so it needs nothing on Zebri's Allowed domains list and keeps working
 * on preview deployments and any future domain. See lib/zebri.ts.
 *
 * API reference: https://app.zebri.com.au/docs/lead-capture-api
 */

/** Zebri's lead capture endpoint. Public, no authentication. */
export const zebriEndpoint = "https://app.zebri.com.au/api/lead/submit";

/**
 * TJ's form token, from Settings, Lead Capture, API access in Zebri.
 *
 * Public by design: it appears in every embed snippet Zebri hands out, so it is
 * safe in this repo and safe in front end code. It identifies the form, it does
 * not authorise anything. An env override is read first so a fork or a staging
 * account can point somewhere else without a code change.
 */
export const zebriFormToken =
  process.env.ZEBRI_FORM_TOKEN ?? "59aa4198-06e5-4c2d-a9bc-6a8dc6df6ebf";

/**
 * Our field name on the left, Zebri's payload key on the right, confirmed
 * against TJ's account with GET /api/lead/config on 4 September 2026.
 *
 * Mapped field by field on purpose. Dumping into a notes blob means the
 * downstream automations in TJ's pipeline cannot fire.
 *
 * `guestCount` is deliberately absent. TJ's form config has no guest count
 * field and no custom fields, so the answer is appended to the message as a
 * labelled line rather than silently dropped. Add the key here the day TJ adds
 * the field in Zebri.
 */
export const zebriFieldMap = {
  name: "name",
  email: "email",
  eventDate: "wedding_date",
  venue: "venue",
  phone: "phone",
  message: "message",
} as const;

/** Zebri's own limits, enforced before we post so a long answer never 400s. */
export const zebriMaxLength = {
  name: 120,
  email: 200,
  phone: 40,
  eventDate: 10,
  venue: 200,
  message: 2000,
  referralSource: 200,
} as const;

/** Every field the enquiry form collects, including the one Zebri has no key for. */
export type EnquiryField = keyof typeof zebriFieldMap | "guestCount";

/**
 * Two entry points, one pipeline. Distinct values so we can measure which
 * converts better, per the placement rules in the skill.
 *
 * These ride in `referral_source`, which is the only free text field Zebri
 * offers besides the message. The site does not ask couples how they found TJ,
 * so the field is otherwise empty. If TJ ever wants the couple's own answer
 * there, add the question to the form and move these values into a Zebri custom
 * field instead.
 */
export const leadSources = {
  contactPage: "Website enquiry form",
  homepageDateCheck: "Website date check, homepage",
} as const;

export type LeadSource = (typeof leadSources)[keyof typeof leadSources];

/** The hidden input a person never sees. Zebri rejects the lead if it is filled. */
export const honeypotField = "company_website";

/** The hidden input carrying the moment the form mounted in the visitor's browser. */
export const renderedAtField = "renderedAt";
