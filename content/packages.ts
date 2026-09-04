/**
 * The packages.
 *
 * Source: "2027 TJ Your MC pricelist 2027.pdf", supplied by TJ and read on
 * 4 September 2026. Names, inclusions, prices, travel and payment terms are all
 * his. The placeholder tiers that used to live here, their invented inclusions
 * and their benchmarked prices, are gone.
 *
 * Do not add an inclusion that is not on that document. If something reads thin,
 * that is TJ's list, not an omission to be filled in.
 *
 * The prices are flat fees for the package, not starting points, and they are
 * his 2027 rates. Travel outside Sydney is quoted on top, see `outsideSydney`.
 *
 * [NEEDS TJ: the pricelist covers 2027. Do these prices hold for a date left in
 * 2026, or is there a separate 2026 rate? The page currently says 2027.]
 */

export type Package = {
  slug: string;
  name: string;
  /** One line on who this tier is for. Not a feature list. */
  summary: string;
  inclusions: string[];
  /** Whole dollars, AUD. A flat fee for the package. */
  price: number;
  /** Which tier marker to draw. Keys into the map in components/Packages.tsx. */
  mark: "vibe" | "show" | "wingman";
};

export const packages: Package[] = [
  {
    slug: "the-vibe",
    name: "The Vibe",
    summary:
      "You have your run sheet sorted. I run the night off it and stay to lift the floor.",
    // Kept to five short lines. The tiers sit side by side, so every line that
    // wraps costs height across all three cards at once.
    inclusions: [
      "A first Zoom call so we meet properly",
      "A second Zoom call to plan the day",
      "I work off your run sheet",
      "One song from me on the night",
      "I stay for the dance floor and keep it going",
    ],
    price: 3000,
    mark: "vibe",
  },
  {
    slug: "the-show",
    name: "The Show",
    summary: "More planning between us, and more singing from me.",
    inclusions: [
      "Everything in The Vibe",
      "Up to three Zoom meetings",
      "I help design your run sheet for the night",
      "Up to three songs, where I judge they will land",
    ],
    price: 4500,
    mark: "show",
  },
  {
    slug: "the-wingman",
    name: "The Wingman",
    summary:
      "The most involved version. You get me across the planning and across the whole night.",
    inclusions: [
      "Everything in The Vibe and The Show",
      "Up to five Zoom meetings for anything that comes up",
      "I help design your run sheet with my experience behind it",
      "Your love story told as the introduction of the night",
      "Games for your guests, if you want them",
    ],
    price: 5400,
    mark: "wingman",
  },
];

/**
 * The fourth item on TJ's pricelist, and the reason the section does not end at
 * three cards. It is priced per couple, so it gets a line rather than a card
 * with a hole where the number should be.
 */
export const customPackage = {
  name: "Custom package",
  summary:
    "Every love story is different. If none of these fit yours, tell me what the night looks like and I will build the package around it and price it from there.",
};

/**
 * Quoted on top of the package, per TJ's pricelist. Never folded into the tier
 * prices, because that would make the numbers on the cards wrong for anyone
 * outside Sydney.
 */
export const outsideSydney = {
  heading: "If your wedding is outside Sydney",
  lines: [
    "Flights and accommodation, meals and getting around are quoted on top of the package.",
    "We agree all of it before anything is booked, so there is nothing to find out later.",
  ],
};

/**
 * The short version of TJ's payment terms. The full terms, including what
 * happens if the balance is late, belong in the quote and the contract rather
 * than on a page someone is reading on their phone at eleven at night.
 */
export const paymentTerms = {
  heading: "How paying for it works",
  lines: [
    "A booking fee of 30% holds your date. It is not refundable, and paying it is how we both agree to the terms.",
    "The remaining 70% is settled three weeks before the wedding.",
    "For weddings outside Sydney the travel is settled up front alongside the booking fee.",
  ],
};

/**
 * When the pricing was last reviewed, as an ISO date.
 *
 * Rendered on the page so a reader, and anything quoting the page, can tell how
 * current the figures are. Set to the day TJ's 2027 pricelist was read.
 */
export const pricingUpdated: string | null = "2026-09-04";

/** The year TJ's current pricelist covers. Said out loud on the page. */
export const pricingYear = 2027;

/**
 * Sits directly under the "What it costs" heading, above the framing line.
 *
 * The tiers were being read as an hourly rate for a bloke with a microphone,
 * which is the cheapest possible version of the job and the one every
 * competitor is also selling. This names what the money actually buys before
 * the first number is seen.
 */
export const packagesValueLine =
  "What you are paying for is a night that holds together without either of you having to run it. The microphone is the least of it.";

export const packagesFramingLine = `These are my packages for ${pricingYear} weddings. Each price is the whole package, not an hourly rate, and it covers the planning beforehand as much as the night itself.`;

/**
 * False since 4 September 2026. The prices came from TJ's own pricelist.
 *
 * While this was true it gated Offer schema and kept figures out of /llms.txt,
 * because a displayed price can be corrected in a deploy but one handed to
 * Google or an answer engine outlives the fix. Set it back to true the moment
 * anyone puts an unconfirmed number in this file.
 */
export const hasPlaceholderPricing = false;

/** Only true when every tier has a price we can actually stand behind. */
export const hasPublishablePricing =
  !hasPlaceholderPricing && packages.every((tier) => tier.price > 0);

/**
 * A [NEEDS TJ] marker is a note to us, not copy for a visitor. The marker stays
 * in this file where the team sees it and never reaches the page.
 */
export function visibleInclusions(tier: Package): string[] {
  return tier.inclusions.filter((line) => !line.startsWith("[NEEDS"));
}
