/**
 * The single source of truth for every string that identifies TJ.
 *
 * Schema, metadata, the footer and llms.txt all read from here. Answer engines
 * resolve entities by matching these strings exactly, so a variant spelling in
 * one place is a real cost. Never hardcode any of these into a component.
 *
 * See .claude/skills/local-seo-pages/SKILL.md for why this matters.
 */

export const site = {
  /** Business name. Must match the Google Business Profile and Instagram bio byte for byte. */
  businessName: "TJ Your MC",

  /**
   * The person behind the business.
   * [NEEDS TJ: does he want a surname on the site, and what is it? "TJ" alone is
   * fine for the brand but a full name strengthens entity resolution a lot.]
   */
  personName: "TJ",

  jobTitle: "Master of Ceremonies",

  /** Absolute, no trailing slash. Every canonical and every schema @id is built from this. */
  url: "https://tjyourmc.com.au",

  email: "tjyourmc@gmail.com",

  /**
   * [NEEDS TJ: does he want a phone number on the site? There is none today,
   * which costs enquiries from older guests and corporate bookers. If he adds
   * one it must match his Google Business Profile exactly.]
   */
  phone: null,

  serviceArea: {
    city: "Sydney",
    state: "New South Wales",
    country: "AU",
  },

  /**
   * Only profiles TJ actually controls, confirmed live before launch. A dead URL
   * here weakens entity resolution rather than helping it, because these are
   * also what goes into `sameAs` in the schema.
   *
   * The Facebook URL was supplied with a trailing "#", which is a fragment the
   * server never sees and which some crawlers treat as a different URL. Stored
   * without it.
   *
   * [NEEDS TJ: confirm all three handles are current, and whether there is a
   * vanity Facebook URL. A profile.php id is valid but weaker for entity
   * matching than a named page.]
   */
  socialLinks: [
    { name: "Instagram", href: "https://www.instagram.com/tj_your_mc/" },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61583860164905",
    },
    { name: "TikTok", href: "https://www.tiktok.com/@tjyoumc" },
  ],

  /** One sentence, used in the root schema graph. Read as-is by assistants, so it has to sound like a person. */
  shortDescription:
    "TJ is a wedding and event MC in Sydney. He runs receptions: introductions, running order, speeches, timing and the handover to the band or DJ.",

  /**
   * How quickly TJ actually replies. Used by the contact intro and the
   * confirmation message, so the two can never promise different things.
   * Stays null until confirmed, and both places drop the time claim while it is.
   * [NEEDS TJ: realistic response time. The old copy deck guessed "within a
   * day", which is a claim about him we cannot back.]
   */
  responseTime: null as string | null,

  /**
   * PLACEHOLDER DATA. Not supplied by TJ. Invented on Arjun's instruction so the
   * hero can be designed against real-looking proof.
   *
   * MUST be replaced with TJ's real figures before this site goes live. See the
   * launch blocker in .claude/docs/06-decisions.md.
   * [NEEDS TJ: roughly how many weddings, and since when?]
   */
  weddingsHosted: "200+" as string | null,

  /** PLACEHOLDER DATA. See weddingsHosted above. [NEEDS TJ: real start year.] */
  hostingSince: "2016" as string | null,

  locale: "en-AU",
  ogLocale: "en_AU",
} as const;

/** Build an absolute URL from a site-relative path. Use everywhere instead of string concatenation. */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}
