/**
 * The hero assets, gated on licensing.
 *
 * Nothing with status "unlicensed" or "requested" renders. The register in
 * .claude/docs/05-assets.md is the authority and the pre-launch gate says a
 * smaller site is fine, a copyright complaint on a client's live site is not.
 *
 * The hero is built so audio slots in later without a redesign. When there is no
 * audio the play control is absent rather than faked. The brand doc is explicit:
 * do not fake it with a decorative waveform graphic.
 */

import type { AssetStatus } from "@/content/gallery";

type HeroAudio = {
  src: string;
  /** Roughly how long the clip runs, spoken in the label so nobody clicks blind. */
  durationLabel: string;
  status: AssetStatus;
};

type HeroVideo = {
  src: string;
  /** Still frame shown while the video loads, and the whole hero under reduced motion. */
  poster: string;
  status: AssetStatus;
};

type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  status: AssetStatus;
};

/*
  Read through a function with a declared return type. Assigning null to a const
  would narrow the type to null and the licensing check below would not compile.
*/

/**
 * [NEEDS TJ: audio or video for the hero. A phone recording from a real
 * reception is fine, and honestly better than something polished.]
 */
function heroAudioRecord(): HeroAudio | null {
  return null;
}

/**
 * Supplied by Arjun on 1 September 2026.
 *
 * Square, so it crops top and bottom in the full bleed hero. TJ sits centre
 * frame and stays visible at every viewport, but check any change to the hero
 * height against this before shipping it.
 *
 * [NEEDS TJ: the photographer's name for the credit, and confirmation of the
 * usage rights. Marked cleared on Arjun's word, not on a licence we have seen.]
 */
function heroImageRecord(): HeroImage | null {
  return {
    src: "/hero.webp",
    alt: "Black and white photograph of TJ in a tuxedo and sunglasses, pointing a microphone towards the camera on a reception floor, with a chandelier and candlelit tables behind him.",
    width: 1440,
    height: 1440,
    status: "cleared",
  };
}

/**
 * [NEEDS TJ: any video at all, even phone footage from a reception. A slow,
 * wide, low light clip of a full room is worth more here than a polished one.]
 */
function heroVideoRecord(): HeroVideo | null {
  return null;
}

/**
 * Sits beside the "What I actually do" prose on the homepage. Supplied by Arjun
 * on 1 September 2026.
 *
 * [NEEDS TJ: the photographer's name for the credit, and confirmation of the
 * usage rights. Marked cleared on Arjun's word, not on a licence we have seen.]
 */
function receptionImageRecord(): HeroImage | null {
  return {
    src: "/what-i-actually-do.webp",
    alt: "TJ sitting on a low concrete bench in a black suit and bow tie with a hand resting against his chin, in front of a tall arched light.",
    width: 1440,
    height: 1440,
    status: "cleared",
  };
}

/**
 * The About page portrait.
 *
 * The studio shot rather than the hero frame. Reusing the hero photograph on
 * About made the two pages feel like the same page, and this one is framed as
 * a portrait, which is what that layout wants.
 *
 * [NEEDS TJ: photographer and licence, same as the rest.]
 */
function portraitImageRecord(): HeroImage | null {
  return {
    src: "/tj-3.webp",
    alt: "Black and white studio portrait of TJ in a dinner jacket, bow tie and patterned pocket square.",
    width: 1440,
    height: 1920,
    status: "cleared",
  };
}

/**
 * The wedding service page hero.
 *
 * TJ working, not posed: microphone up, room dressed, chandeliers behind. That
 * page had no photograph at all, which made the main service page the least
 * convincing one on the site.
 *
 * [NEEDS TJ: photographer and licence, same as the rest.]
 */
function weddingImageRecord(): HeroImage | null {
  return {
    src: "/tj-5.webp",
    alt: "TJ speaking into a microphone on a white dance floor, with chandeliers and hanging greenery above set tables behind him.",
    width: 1440,
    height: 1440,
    status: "cleared",
  };
}

/**
 * The second photograph on the wedding page, beside the booking steps.
 *
 * Also in the gallery, which is fine: the gallery is a wall of thumbnails and
 * this is a full height bleed, so nobody reads them as the same picture twice.
 * Chosen because it shows him talking to a table rather than performing at a
 * room, which is the half of the job the booking section is describing.
 *
 * [NEEDS TJ: photographer and licence, same as the rest.]
 */
function bookingImageRecord(): HeroImage | null {
  return {
    src: "/tj-6.webp",
    alt: "TJ mid-sentence with a microphone, standing among guests seated at reception tables in warm low light.",
    width: 1440,
    height: 1440,
    status: "cleared",
  };
}

function isPublishable(status: AssetStatus): boolean {
  return status === "cleared" || status === "owned";
}

function gate<T extends { status: AssetStatus }>(record: T | null): T | null {
  return record !== null && isPublishable(record.status) ? record : null;
}

export const heroAudio = gate(heroAudioRecord());
export const heroImage = gate(heroImageRecord());
export const heroVideo = gate(heroVideoRecord());
export const receptionImage = gate(receptionImageRecord());
export const portraitImage = gate(portraitImageRecord());
export const weddingImage = gate(weddingImageRecord());
export const bookingImage = gate(bookingImageRecord());
