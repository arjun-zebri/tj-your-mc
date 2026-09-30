/**
 * The wall of love.
 *
 * Every quote here is real. The six `source: "google"` entries are reviews
 * from TJ's Google Business Profile, supplied by Arjun on 30 September 2026,
 * and each one renders with a Google badge. They are verbatim, typos and
 * spacing included, with two exceptions: paragraph breaks are joined with a
 * space, and the one em dash in Megan Andersen's review became a full stop
 * because the house dash rule fails the build. Reviewer names are
 * shown in proper case rather than as typed on Google. The Sydney House of Praise review
 * is about a community dinner, not a wedding.
 *
 * The invented placeholder quotes were all removed on 30 September 2026 on
 * Arjun's instruction. Do not add any back. The "venue" kind and its group are
 * kept so real supplier quotes can go straight in; an empty group does not
 * render.
 *
 * No avatar photographs are shipped. Entries fall back to an initial monogram.
 * Set `avatar` only with the reviewer's permission.
 *
 * No Review or AggregateRating schema is emitted. See
 * .claude/docs/06-decisions.md.
 */

export type TestimonialKind = "couple" | "venue";

export type Testimonial = {
  /** Verbatim once real. Never edited for grammar, length or tone. */
  quote: string;
  /** Who said it. Drives the monogram when there is no avatar. */
  attribution: string;
  /** Their job, for suppliers. Null for couples. */
  role: string | null;
  kind: TestimonialKind;
  /** "google" renders the Google badge, so use it only for reviews from TJ's profile. */
  source: "old-site" | "direct" | "google";
  venue: string | null;
  /** ISO date of the wedding or event. */
  date: string | null;
  /** Path under /public. Null falls back to the monogram. */
  avatar: string | null;
  /**
   * Link to the review itself, e.g. the share link from the review on Google.
   * On a phone a long quote is cut short and "Read more" goes here. Null keeps
   * the reader on the page and opens the full quote in place instead.
   */
  url: string | null;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Became the MC for our wedding after being asked last minute.  Absolutely sensational. Kept the reception flowing throughout the night, kept guests happy and safe and coordinated well with the wedding planner. Definitely would recommend TJ as your MC",
    attribution: "Jono Colin-Thome",
    role: null,
    kind: "couple",
    source: "google",
    venue: null,
    date: null,
    avatar: null,
    url: null,
  },
  {
    quote:
      "\"The best there is, the best there was and the best there ever will be\"",
    attribution: "Scott Paulo",
    role: null,
    kind: "couple",
    source: "google",
    venue: null,
    date: null,
    avatar: null,
    url: null,
  },
  {
    quote:
      "Tj is the man!! Hands down the best MC going. He was thorough, informative, courteous & brought the best vibes ever. Everyone wanted to know who my MC was. If he’s not your MC for you event; you’re missing out 100%!",
    attribution: "Zoe Roulis",
    role: null,
    kind: "couple",
    source: "google",
    venue: null,
    date: null,
    avatar: null,
    url: null,
  },
  {
    quote:
      "Thank you so much for everything you did for us ❤️ You kept us organised, calm and somehow made the whole day run so smoothly without ever making anything feel stressful. Nothing was ever too much to ask, and we honestly felt like we could completely trust you with everything. You brought so much energy, entertainment and good vibes to the day and kept everyone laughing and on a high from start to finish. Hubby also really loved getting to hang out with you and the boys the night before. That made it even more special. We’re so grateful not only for everything you did for our wedding, but the fact that it really feels like you’ve become family to us. We honestly couldn’t have asked for a better MC ❤️",
    attribution: "Megan Andersen",
    role: null,
    kind: "couple",
    source: "google",
    venue: null,
    date: null,
    avatar: null,
    url: null,
  },
  {
    quote:
      "For many years TJ has been an important part of our annual Community Event ‘Come Dine with Us’. A Mother’s day Dinner. TJ is a professional, he sings & entertains whilst making sure the night runs smoothly. Easy to work with. When things need to change he adapts very quickly and great at filling the gaps. TJ has a gift that is very rare to find. It’s always a pleasure to work with him. Looking forward to working with him again in 2027.",
    attribution: "Sydney House of Praise Community Action",
    role: null,
    kind: "couple",
    source: "google",
    venue: null,
    date: null,
    avatar: null,
    url: null,
  },
  {
    quote:
      "TJ you are the Best in the Business, your professionalism is outstanding,  you entertain, sing WOW  awesome voice, you engage with all the guest and make every one feel apart of the special day. The Best",
    attribution: "Stephanie Paulo",
    role: null,
    kind: "couple",
    source: "google",
    venue: null,
    date: null,
    avatar: null,
    url: null,
  },];

export const testimonialGroups: {
  kind: TestimonialKind;
  heading: string;
  blurb: string;
  /** How many show before the read more button. */
  visible: number;
}[] = [
  {
    kind: "couple",
    heading: "From the people I hosted for",
    blurb: "The people whose night it was.",
    visible: 6,
  },
  {
    kind: "venue",
    heading: "From venues and suppliers",
    blurb: "The people who work these rooms every weekend and see every MC.",
    visible: 3,
  },
];

export function testimonialsOfKind(kind: TestimonialKind): Testimonial[] {
  return testimonials.filter((entry) => entry.kind === kind);
}

/** Initials for the monogram. "Megan Andersen" gives MA, "Stephanie Paulo" gives SP. */
export function initialsOf(attribution: string): string {
  const words = attribution
    .split(/\s+/)
    .filter((word) => word.toLowerCase() !== "and" && /[a-z]/i.test(word));
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
