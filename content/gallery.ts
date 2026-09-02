/**
 * Image records. Mirrors the register in .claude/docs/05-assets.md, which is the
 * authority. Keep the two in sync.
 *
 * Pre-launch gate: nothing with status "unlicensed" or "requested" ships. If TJ
 * has not come back on an image by launch, ship the cleared subset with fewer
 * images. A smaller gallery is not a problem. A copyright complaint on a
 * client's live site is.
 *
 * The nine below were supplied by Arjun and marked cleared on his instruction.
 * No photographer name or licence has been sighted for any of them.
 * [NEEDS TJ: photographer for each, and whether a credit line is required.]
 */

export type AssetStatus = "unlicensed" | "requested" | "cleared" | "owned";

export type GalleryImage = {
  /** File under /public. */
  src: string;
  /** Describes the visible scene for someone who cannot see it. Never guesses at anything off camera. */
  alt: string;
  width: number;
  height: number;
  status: AssetStatus;
  /** Photographer credit where the licence requires one. */
  credit: string | null;
};

export const gallery: GalleryImage[] = [
  {
    src: "/tj-1.webp",
    alt: "TJ in a tuxedo standing with a bride in a white gown and a groom in black, in front of candlelit tables and floor to ceiling windows at night.",
    width: 1440,
    height: 1440,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-2.webp",
    alt: "TJ holding a microphone raised as he speaks between seated guests at a reception, a woman at the table laughing.",
    width: 1440,
    height: 1440,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-3.webp",
    alt: "Black and white studio portrait of TJ in a dinner jacket, bow tie and patterned pocket square.",
    width: 1440,
    height: 1920,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-4.webp",
    alt: "TJ playing a ukulele beside a lectern, wearing a white shirt and a dark bead necklace.",
    width: 642,
    height: 642,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-5.webp",
    alt: "TJ speaking into a microphone on a white dance floor, with chandeliers and hanging greenery above set tables behind him.",
    width: 1440,
    height: 1440,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-6.webp",
    alt: "TJ mid-sentence with a microphone, standing among guests seated at reception tables in warm low light.",
    width: 1440,
    height: 1440,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-7.webp",
    alt: "TJ in a cream linen suit holding a microphone, standing with a bride and a man wearing a red lei under a white floral arch at night.",
    width: 1350,
    height: 1800,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-8.webp",
    alt: "TJ laughing at a lectern in a white shirt and dark bead necklace, with musicians seated behind him.",
    width: 1080,
    height: 1080,
    status: "cleared",
    credit: null,
  },
  {
    src: "/tj-9.webp",
    alt: "Black and white photograph of TJ singing into a microphone on a reflective dance floor, lit through haze, with guests watching from tables around him.",
    width: 2160,
    height: 2700,
    status: "cleared",
    credit: null,
  },
];

/** The only list a component may render. Enforces the pre-launch licensing gate. */
export const publishableGallery = gallery.filter(
  (image) => image.status === "cleared" || image.status === "owned",
);
