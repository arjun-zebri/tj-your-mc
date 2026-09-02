/** Navigation. One source, used by the header, the footer and the sitemap. */

export type NavItem = {
  href: string;
  label: string;
  /** Shown in the footer but kept out of the top nav, which stays short on a phone. */
  footerOnly?: boolean;
};

/**
 * About sits first on purpose. Couples are choosing a person to stand at the
 * front of their wedding, so who he is comes before what he does.
 */
export const primaryNav: NavItem[] = [
  { href: "/about", label: "About me" },
  { href: "/wedding-mc", label: "Weddings" },
];

export const headerNav = primaryNav.filter((item) => !item.footerOnly);

/**
 * Every live route, in one place. The sitemap and llms.txt are generated from
 * this rather than hand maintained, so a new page cannot be forgotten.
 *
 * /gallery and /mc-vs-celebrant were removed on 1 September 2026. The photos
 * live in the "Nights I have run" section on the homepage and the MC versus
 * Celebrant distinction is carried by the hero headline and the FAQ.
 *
 * /corporate-mc was removed on 2 September 2026. The site is wedding only.
 *
 * The pages the architecture doc gates on TJ are also absent:
 * /wedding-mc-cost-sydney, /cultural-weddings and /wedding-mc/[suburb]. Add
 * them here when they are built, not before.
 */
export const siteRoutes: { href: string; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/wedding-mc", priority: 0.9 },
  { href: "/about", priority: 0.8 },
  { href: "/contact", priority: 0.7 },
];
