/**
 * The three tiers.
 *
 * =====================================================================
 *  THE PRICES BELOW ARE FABRICATED. TJ HAS NOT CONFIRMED ANY OF THEM.
 * =====================================================================
 *
 * Set on Arjun's instruction so the pricing section can be designed against
 * realistic figures, overriding the "never invent facts about TJ" rule in
 * CLAUDE.md. They are benchmarked against the Sydney wedding MC market rather
 * than pulled from nowhere, which makes them plausible and still wrong.
 *
 * The inclusions are our best reconstruction of what a working MC actually
 * delivers. TJ will do some of this differently and should overrule any of it.
 *
 * Find everything fabricated here with:
 *
 *     grep -n "PLACEHOLDER" content/packages.ts
 *
 * Tracked as a launch blocker in .claude/docs/06-decisions.md.
 *
 * [NEEDS TJ: real prices, real inclusions, and whether these are even the right
 * three tiers.]
 */

export type Package = {
  slug: string;
  name: string;
  /** One line on who this tier is for. Not a feature list. */
  summary: string;
  inclusions: string[];
  /** Whole dollars, AUD. PLACEHOLDER values, see the note above. */
  price: number | null;
  /** True when the price is a starting point rather than a flat fee. */
  isFrom: boolean;
  /** Which tier marker to draw. Keys into the map in components/Packages.tsx. */
  mark: "reception" | "fullDay" | "music";
};

export const packages: Package[] = [
  {
    slug: "reception",
    name: "Reception",
    summary:
      "For couples who have the ceremony sorted and need the reception run properly.",
    // Kept to five short lines. The tiers sit side by side, so every line that
    // wraps costs height across all three cards at once.
    inclusions: [
      "Planning calls and help getting your run sheet right",
      "Every name checked for pronunciation beforehand",
      "Hosting from guest arrival to last dance, up to six hours",
      "Introductions, speech cues and speakers kept to time",
      "The handover to your band or DJ",
    ],
    // PLACEHOLDER price.
    price: 1200,
    isFrom: true,
    mark: "reception",
  },
  {
    slug: "full-day",
    name: "Full day",
    summary: "Ceremony through to the end of the night.",
    inclusions: [
      "Everything in Reception",
      "On site from the ceremony onward, up to ten hours",
      // Wording is load-bearing. TJ is not a Celebrant and must never be
      // described as running the ceremony. See .claude/docs/06-decisions.md.
      "Guest direction around the ceremony, alongside your Celebrant",
      "Pre-dinner drinks held while you are off having photos",
      "One point of contact for your suppliers all day",
    ],
    // PLACEHOLDER price.
    price: 1950,
    isFrom: true,
    mark: "fullDay",
  },
  {
    slug: "full-day-live-music",
    name: "Full day plus live music",
    summary: "The full day, with me singing at points through the night.",
    inclusions: [
      "Everything in Full day",
      "Three to four songs, placed where you want them",
      "Acoustic or backing track, whichever suits the room",
      "Your first dance sung live, if you want it",
      "Sound sorted with your venue beforehand",
    ],
    // PLACEHOLDER price.
    price: 2900,
    isFrom: true,
    mark: "music",
  },
];

/**
 * When the pricing was last reviewed, as an ISO date.
 *
 * Rendered on the page so a reader, and anything quoting the page, can tell how
 * current the figures are. PLACEHOLDER date matching the placeholder prices.
 */
export const pricingUpdated: string | null = "2026-09-01";

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

export const packagesFramingLine =
  "Every wedding runs differently, so treat these as starting points. Tell me what your night looks like and I will tell you what it costs.";

/**
 * True while the prices are invented.
 *
 * Gates Offer schema. Displaying a placeholder price is recoverable. Feeding one
 * to Google as structured data puts a wrong number into results and rich
 * snippets, where it long outlives the fix.
 */
export const hasPlaceholderPricing = true;

/** Only true when every tier has a price we can actually stand behind. */
export const hasPublishablePricing =
  !hasPlaceholderPricing && packages.every((tier) => tier.price !== null);

/**
 * A [NEEDS TJ] marker is a note to us, not copy for a visitor. The marker stays
 * in this file where the team sees it and never reaches the page.
 */
export function visibleInclusions(tier: Package): string[] {
  return tier.inclusions.filter((line) => !line.startsWith("[NEEDS"));
}
