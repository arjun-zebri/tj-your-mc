import "server-only";

import { leadSources, zebriFieldMap, type LeadSource } from "@/content/zebri";

/**
 * Posts a lead into TJ's Zebri pipeline.
 *
 * Server side only. The endpoint and key never reach the browser.
 *
 * Until the real field keys and endpoint land, this returns a failure rather
 * than pretending to succeed. An enquiry that silently disappears is a booking
 * TJ never knew about, which is worse than showing the error state and the
 * mailto fallback.
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

export type ZebriResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "rejected" | "network" };

export async function sendToZebri(
  enquiry: Enquiry,
  source: LeadSource = leadSources.contactPage,
): Promise<ZebriResult> {
  const endpoint = process.env.ZEBRI_LEAD_ENDPOINT;
  const apiKey = process.env.ZEBRI_API_KEY;

  const unmappedKeys = Object.values(zebriFieldMap).some((key) => key.startsWith("[NEEDS"));

  if (!endpoint || !apiKey || unmappedKeys) {
    // [NEEDS ARJUN: endpoint, key and field keys from TJ's Zebri account.]
    console.error(
      "[zebri] Lead not sent. Set ZEBRI_LEAD_ENDPOINT and ZEBRI_API_KEY, and replace the placeholders in content/zebri.ts.",
    );
    return { ok: false, reason: "not-configured" };
  }

  // Mapped field by field. Dumping into a notes blob means the downstream
  // automations in TJ's pipeline cannot fire.
  const payload: Record<string, string> = {};

  payload[zebriFieldMap.name] = enquiry.name;
  payload[zebriFieldMap.email] = enquiry.email;
  payload[zebriFieldMap.eventDate] = enquiry.eventDate;
  payload[zebriFieldMap.venue] = enquiry.venue;

  if (enquiry.phone) payload[zebriFieldMap.phone] = enquiry.phone;
  if (enquiry.guestCount) payload[zebriFieldMap.guestCount] = enquiry.guestCount;
  if (enquiry.message) payload[zebriFieldMap.message] = enquiry.message;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      // Lets TJ tell website enquiries from Instagram DMs, and lets us measure
      // the contact page against the homepage date check.
      body: JSON.stringify({ source, fields: payload }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[zebri] Lead rejected with status ${response.status}.`);
      return { ok: false, reason: "rejected" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[zebri] Lead failed to send.", error);
    return { ok: false, reason: "network" };
  }
}
