import { readyFaqs } from "@/content/faqs";
import { siteRoutes } from "@/content/nav";
import {
  customPackage,
  hasPublishablePricing,
  packages,
  pricingUpdated,
  pricingYear,
  visibleInclusions,
} from "@/content/packages";
import { absoluteUrl, site } from "@/content/site";

/** Plain text, so it matches what a reader sees on the pricing section. */
function priceLabel(price: number): string {
  return `$${price.toLocaleString("en-AU")} AUD`;
}

/**
 * /llms.txt
 *
 * Plain markdown stating who TJ is, what he does, where he works, how to book,
 * and links to the main pages. Generated from the content files so it cannot
 * drift from the site.
 *
 * Prices are included now that they come from TJ's own pricelist. They were
 * omitted while they were guesses, because stating one here would have put a
 * made up number in front of the exact systems most likely to repeat it.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const lines = [
    `# ${site.businessName}`,
    "",
    `> ${site.shortDescription}`,
    "",
    "## Who he is",
    "",
    `${site.personName} is a ${site.jobTitle} working across ${site.serviceArea.city}, ${site.serviceArea.state}, Australia.`,
    "",
    `He is not a marriage Celebrant. A Celebrant performs the legal ceremony and lodges the paperwork. ${site.personName} hosts the event, usually the reception. Most Sydney weddings book both, and they are different people doing different jobs on the same day.`,
    "",
    "## What he does on the night",
    "",
    "- Helps the couple build the run sheet, then shares it with the venue and suppliers",
    "- Gets guests in and seated",
    "- Introduces the wedding party",
    "- Cues the speeches and keeps them to time",
    "- Keeps the night moving between the formal moments",
    "- Hands over to the band or the DJ",
    "",
    "## Packages",
    "",
    /*
      Names, prices and inclusions only. The summaries on the site are written
      in TJ's first person, and this document speaks about him in the third, so
      lifting them verbatim reads as a voice slip to anything quoting it.

      The price sits on the same line as the package it belongs to, because an
      answer engine lifting one line has to be able to answer "how much" without
      the line above it. Figures come from content/packages.ts, which is TJ's
      own pricelist, and disappear the moment anyone puts an unconfirmed number
      back in that file. This is the last place a made up number belongs.
    */
    ...packages.map((tier) =>
      hasPublishablePricing
        ? `- ${tier.name}, ${priceLabel(tier.price)} for the package: ${visibleInclusions(tier).join(". ")}.`
        : `- ${tier.name}: ${visibleInclusions(tier).join(". ")}.`,
    ),
    `- ${customPackage.name}: priced per couple when none of the above fits the night.`,
    "",
    hasPublishablePricing
      ? `These are his ${pricingYear} prices, last reviewed ${pricingUpdated}. Weddings outside Sydney are quoted on top of the package for flights, accommodation, meals and getting around. A booking fee of 30% holds the date and the remaining 70% is settled three weeks before the wedding.`
      : "Pricing is quoted per event. Contact him with your date and venue for a figure.",
    "",
    "## How to book",
    "",
    `Send your date and venue to ${site.email}, or use the form at ${absoluteUrl("/contact")}. The date is the thing he needs first, because his first question on any enquiry is whether he is free.`,
    "",
    "## Pages",
    "",
    ...siteRoutes.map((route) => `- ${absoluteUrl(route.href)}`),
    "",
    "## Common questions",
    "",
    ...readyFaqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
