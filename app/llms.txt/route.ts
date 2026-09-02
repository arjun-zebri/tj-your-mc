import { readyFaqs } from "@/content/faqs";
import { siteRoutes } from "@/content/nav";
import { hasPublishablePricing, packages, visibleInclusions } from "@/content/packages";
import { absoluteUrl, site } from "@/content/site";

/**
 * /llms.txt
 *
 * Plain markdown stating who TJ is, what he does, where he works, how to book,
 * and links to the main pages. Generated from the content files so it cannot
 * drift from the site.
 *
 * Pricing is omitted while it is unconfirmed. Stating a guess here would put a
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
      Tier names and inclusions only. The summaries on the site are written in
      TJ's first person, and this document speaks about him in the third, so
      lifting them verbatim reads as a voice slip to anything quoting it.
    */
    ...packages.map(
      (tier) => `- ${tier.name}: ${visibleInclusions(tier).join(". ")}.`,
    ),
    "",
    /*
      The figures on the pricing page are placeholders. This file exists to be
      read and quoted by answer engines, so it is the last place a made up
      number should appear. It stays vague until the prices are real.
    */
    hasPublishablePricing
      ? "See the site for current pricing."
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
