import Image from "next/image";

import { site } from "@/content/site";

/**
 * The logo mark.
 *
 * The supplied file is a 2954x2953 square, but the artwork only occupies the
 * middle third of it: the mark's bounding box is 2562x966, dead centre, and the
 * rest is transparent padding. Rendering the square as-is would mean a box
 * roughly three times taller than the visible mark, which will not fit a 72px
 * header.
 *
 * So the box is set to the artwork's own 2.65:1 ratio and the image covers it.
 * Because the mark is vertically centred in the source, a centred cover crop
 * lands exactly on it and throws away only transparent padding. That avoids
 * cutting a second, trimmed copy of the file and leaves the original untouched.
 *
 * The artwork is pure white, so it is only legible on the dark surfaces. Do not
 * put it on the paper sections without a dark variant.
 */
export function Logo({
  className = "h-6",
  priority = false,
}: {
  /** Set the height here. Width follows from the aspect ratio. */
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/tj-logo.webp"
      // The mark is the business name, so it carries that as its text.
      alt={site.businessName}
      width={2562}
      height={966}
      priority={priority}
      sizes="180px"
      className={`w-auto object-cover ${className}`}
      style={{ aspectRatio: "2562 / 966" }}
    />
  );
}
