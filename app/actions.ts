"use server";

import {
  honeypotField,
  leadSources,
  renderedAtField,
  type EnquiryField,
  type LeadSource,
} from "@/content/zebri";
import type { EnquiryState } from "@/lib/enquiry-state";
import { sendToZebri, type Enquiry, type SpamGuard } from "@/lib/zebri";

function text(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Zebri's spam checks, carried from the browser untouched.
 *
 * `rendered_at` has to be the visitor's own value. Stamping a fresh one here
 * would put every submission inside Zebri's two second speed trap, and Zebri
 * answers a suspected bot with a 200 and stores nothing, so every enquiry would
 * look sent and none would arrive. The fallback below is a minute old rather
 * than now, so a submission that somehow arrives without the field still lands.
 */
function spamGuard(data: FormData): SpamGuard {
  const rendered = Number(text(data, renderedAtField));

  return {
    hp: text(data, honeypotField),
    renderedAt:
      Number.isFinite(rendered) && rendered > 0
        ? rendered
        : Date.now() - 60_000,
  };
}

/**
 * Server side validation is the authoritative pass. The client validates on
 * blur for a better experience, not for correctness.
 *
 * Email validation is deliberately permissive. The only real test is an at sign
 * with a dot after it, and every stricter rule rejects somebody's real address.
 */
function validate(enquiry: Enquiry): Partial<Record<EnquiryField, string>> {
  const errors: Partial<Record<EnquiryField, string>> = {};

  if (!enquiry.name) {
    errors.name = "Let me know what to call you.";
  }

  if (!enquiry.email) {
    errors.email = "I need an email address to reply to.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(enquiry.email)) {
    errors.email = "That does not look like an email address. Check it for me.";
  }

  if (!enquiry.eventDate) {
    // The date is the field that matters. TJ's first question on every enquiry
    // is "am I free", and this lets him answer without a back and forth.
    errors.eventDate = "I need the date to tell you if I am free.";
  }

  if (!enquiry.venue) {
    errors.venue = "Even just the suburb helps.";
  }

  return errors;
}

async function submit(
  data: FormData,
  source: LeadSource,
  required: EnquiryField[],
  attempt: number,
): Promise<EnquiryState> {
  const enquiry: Enquiry = {
    name: text(data, "name"),
    email: text(data, "email"),
    eventDate: text(data, "eventDate"),
    venue: text(data, "venue"),
    phone: text(data, "phone"),
    guestCount: text(data, "guestCount"),
    message: text(data, "message"),
  };

  // The homepage date check asks for less, so it only validates what it asks for.
  const allErrors = validate(enquiry);
  const fieldErrors = Object.fromEntries(
    Object.entries(allErrors).filter(([field]) =>
      required.includes(field as EnquiryField),
    ),
  );

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      fieldErrors,
      formError: "Have a look at the fields marked below.",
      values: enquiry,
      attempt: attempt + 1,
      offerEmail: false,
    };
  }

  const result = await sendToZebri(enquiry, spamGuard(data), source);

  if (result.ok) {
    return {
      status: "success",
      fieldErrors: {},
      formError: "",
      values: {},
      attempt,
      offerEmail: false,
    };
  }

  // Zebri caught something we did not. Its message is specific to the field, so
  // it goes under that field rather than being flattened into the summary.
  if (result.reason === "invalid") {
    return {
      status: "error",
      fieldErrors: result.fieldErrors ?? {},
      formError: "Have a look at the fields marked below.",
      values: enquiry,
      attempt: attempt + 1,
      offerEmail: false,
    };
  }

  return {
    status: "error",
    fieldErrors: {},
    formError:
      result.reason === "rate-limited"
        ? "That has already been sent a few times in the last minute. Give it a minute before you send it again."
        : "That did not send.",
    values: enquiry,
    attempt: attempt + 1,
    offerEmail: true,
  };
}

export async function submitEnquiry(
  previous: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  return submit(
    data,
    leadSources.contactPage,
    ["name", "email", "eventDate", "venue"],
    previous.attempt,
  );
}

export async function submitDateCheck(
  previous: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  return submit(
    data,
    leadSources.homepageDateCheck,
    ["name", "email", "eventDate"],
    previous.attempt,
  );
}
