import "server-only";

import {
  leadSources,
  zebriEndpoint,
  zebriFieldMap,
  zebriFormToken,
  zebriMaxLength,
  type EnquiryField,
  type LeadSource,
} from "@/content/zebri";

/**
 * Posts a lead into TJ's Zebri pipeline.
 *
 * Server side only, for two reasons. A server post sends no Origin header, so
 * it needs nothing on Zebri's Allowed domains list and cannot break when the
 * domain changes or on a preview deployment. And a browser post that is rate
 * limited or hits an unknown token surfaces as an unreadable CORS error, which
 * would leave us showing the wrong thing to a real person.
 *
 * The one rule a server side forwarder has to respect: pass the browser's own
 * `rendered_at` straight through. Stamping a fresh one here would make every
 * lead look faster than Zebri's two second speed trap, and Zebri answers a
 * suspected bot with a 200 and stores nothing. Every enquiry would look sent
 * and none would arrive.
 *
 * API reference: https://app.zebri.com.au/docs/lead-capture-api
 */

export type Enquiry = {
  name: string;
  email: string;
  eventDate: string;
  venue: string;
  phone?: string;
  guestCount?: string;
  message?: string;
};

/** Carried from the browser, unmodified. See the note above. */
export type SpamGuard = {
  /** The honeypot input's value. Must be empty for the lead to be stored. */
  hp: string;
  /** Date.now() from the moment the visitor's form mounted. */
  renderedAt: number;
};

export type ZebriResult =
  | { ok: true }
  | {
      ok: false;
      reason: "rejected" | "network" | "disabled" | "rate-limited" | "invalid";
      /** Only on "invalid". Zebri's own message per field, keyed by our field names. */
      fieldErrors?: Partial<Record<EnquiryField, string>>;
    };

/** Zebri's payload key back to ours, so a 400 lands under the right input. */
const ourFieldFor = Object.fromEntries(
  Object.entries(zebriFieldMap).map(([ours, theirs]) => [
    theirs,
    ours as EnquiryField,
  ]),
) as Record<string, EnquiryField>;

function clip(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

/**
 * TJ's Zebri form has no guest count field and no custom fields, so the answer
 * rides at the end of the message rather than being dropped. Everything else is
 * mapped to its own Zebri field, per the skill.
 */
function messageWithGuestCount(enquiry: Enquiry): string {
  const parts = [
    enquiry.message?.trim(),
    enquiry.guestCount?.trim()
      ? `Rough guest count: ${enquiry.guestCount.trim()}`
      : "",
  ].filter(Boolean);
  return clip(parts.join("\n\n"), zebriMaxLength.message);
}

export async function sendToZebri(
  enquiry: Enquiry,
  guard: SpamGuard,
  source: LeadSource = leadSources.contactPage,
): Promise<ZebriResult> {
  const message = messageWithGuestCount(enquiry);

  const payload: Record<string, string | number> = {
    token: zebriFormToken,
    [zebriFieldMap.name]: clip(enquiry.name, zebriMaxLength.name),
    [zebriFieldMap.email]: clip(enquiry.email, zebriMaxLength.email),
    // Lets TJ tell website enquiries from Instagram DMs, and lets us measure the
    // contact page against the homepage date check.
    referral_source: clip(source, zebriMaxLength.referralSource),
    hp: guard.hp,
    rendered_at: guard.renderedAt,
  };

  if (enquiry.eventDate)
    payload[zebriFieldMap.eventDate] = clip(
      enquiry.eventDate,
      zebriMaxLength.eventDate,
    );
  if (enquiry.venue)
    payload[zebriFieldMap.venue] = clip(enquiry.venue, zebriMaxLength.venue);
  if (enquiry.phone)
    payload[zebriFieldMap.phone] = clip(enquiry.phone, zebriMaxLength.phone);
  if (message) payload[zebriFieldMap.message] = message;

  let response: Response;

  try {
    response = await fetch(zebriEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[zebri] Lead failed to send.", error);
    return { ok: false, reason: "network" };
  }

  if (response.ok) return { ok: true };

  const body = await response
    .json()
    .catch(() => ({}) as Record<string, unknown>);

  if (response.status === 400) {
    const fields = (body as { fields?: Record<string, string> }).fields ?? {};
    const fieldErrors: Partial<Record<EnquiryField, string>> = {};

    for (const [key, error] of Object.entries(fields)) {
      const ours = ourFieldFor[key];
      if (ours) fieldErrors[ours] = error;
    }

    // A validation failure with nothing we can pin to a field is still a lost
    // lead, so it falls through to the error state and the mailto fallback.
    if (Object.keys(fieldErrors).length === 0) {
      console.error("[zebri] Lead rejected with no field we render.", fields);
      return { ok: false, reason: "rejected" };
    }

    return { ok: false, reason: "invalid", fieldErrors };
  }

  if (response.status === 409) {
    // TJ has switched lead capture off in Zebri. Nothing the visitor can fix.
    console.error(
      "[zebri] The Zebri form is disabled. Turn it back on in Settings, Lead Capture.",
    );
    return { ok: false, reason: "disabled" };
  }

  if (response.status === 429) {
    return { ok: false, reason: "rate-limited" };
  }

  console.error(
    `[zebri] Lead rejected with status ${response.status}.`,
    (body as { error?: string }).error ?? "",
  );

  return { ok: false, reason: "rejected" };
}
