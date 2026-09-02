"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryImage } from "@/content/gallery";

/**
 * One photograph in the masonry.
 *
 * Rendered at its own proportions. Nothing is cropped, which is the point of a
 * masonry layout in the first place: the varied heights are what make the
 * columns stagger.
 *
 * It fades in and slides the last of the way from the nearest edge of the page.
 * Tied to the image decoding rather than to scroll position, so it reads as the
 * picture arriving rather than as a scroll effect, and anybody landing part way
 * down the page is not left staring at empty space.
 *
 * An image restored from cache can finish before React attaches the handler, so
 * the ref checks `complete` on mount. Without that a cached photograph stays at
 * zero opacity for good.
 */
export function GalleryTile({
  image,
  from,
}: {
  image: GalleryImage;
  from: "left" | "right";
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <li
      className={`transition-[opacity,transform] duration-700 ease-out ${
        loaded
          ? "translate-x-0 opacity-100"
          : `opacity-0 ${from === "left" ? "-translate-x-10" : "translate-x-10"}`
      }`}
    >
      <Image
        ref={(node) => {
          if (node?.complete) setLoaded(true);
        }}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        onLoad={() => setLoaded(true)}
        sizes="(min-width: 40rem) 33vw, 100vw"
        className="soft-edges h-auto w-full rounded-sm"
      />
      {image.credit && <p className="mt-2 text-sm text-dust">Photo by {image.credit}</p>}
    </li>
  );
}
