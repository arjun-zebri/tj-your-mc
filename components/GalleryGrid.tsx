import { GalleryTile } from "@/components/GalleryTile";
import { publishableGallery, type GalleryImage } from "@/content/gallery";
import { site } from "@/content/site";

const COLUMNS = 3;

/**
 * Each column drops a little differently so the rows never line up.
 *
 * That offset is what separates a masonry from three lists side by side. The
 * middle column sits highest, which pulls the eye to the centre of the block
 * before it wanders out.
 */
const COLUMN_OFFSET = ["sm:mt-14", "", "sm:mt-8"];

/** Outer columns arrive from their own side of the page, the middle from the left. */
const COLUMN_DIRECTION: ("left" | "right")[] = ["left", "left", "right"];

/**
 * Deal the photographs out by running height, always into whichever column is
 * currently shortest.
 *
 * Height is measured in units of column width, so a 3:4 portrait counts 1.333
 * against a square's 1. That keeps the columns roughly level without forcing
 * any picture into a shape it was not framed for, and it reorders itself
 * sensibly if the set changes.
 */
function balanceColumns(images: GalleryImage[]): GalleryImage[][] {
  const columns: GalleryImage[][] = Array.from({ length: COLUMNS }, () => []);
  const heights = new Array<number>(COLUMNS).fill(0);

  for (const image of images) {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(image);
    heights[shortest] += image.height / image.width;
  }

  return columns;
}

export function GalleryGrid() {
  const columns = balanceColumns(publishableGallery);
  const hasImages = publishableGallery.length > 0;

  return (
    <>
      {/*
        Full bleed. The photographs run to both edges of the viewport, which
        gives the section a different shape to every other block on the page and
        lets the pictures carry their own weight instead of sitting inside the
        same measure as the prose.

        overflow-x-clip is load bearing. Before a photograph decodes its tile
        sits at translate-x-10, and on a phone that 40px pushed the document
        wider than the screen and let the whole page scroll sideways. Clipping
        here contains the entrance rather than letting it move the layout.
      */}
      {hasImages && (
        <ul className="grid grid-cols-1 gap-3 overflow-x-clip px-3 sm:grid-cols-3 sm:items-start sm:gap-4 sm:px-4">
          {columns.map((column, index) => (
            <li key={index} className={COLUMN_OFFSET[index]}>
              <ul className="flex flex-col gap-5">
                {column.map((image) => (
                  <GalleryTile
                    key={image.src}
                    image={image}
                    from={COLUMN_DIRECTION[index]}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {/* The line underneath stays in the page measure, where reading happens. */}
      <p
        className={`mx-auto max-w-6xl px-5 text-dust sm:px-8 ${hasImages ? "mt-14" : ""}`}
      >
        {!hasImages && "Photos are on their way. "}
        See more on{" "}
        {site.socialLinks
          .filter((profile) => profile.name === "Instagram" || profile.name === "TikTok")
          .map((profile, index, shown) => (
            <span key={profile.href}>
              <a
                href={profile.href}
                rel="noopener noreferrer"
                target="_blank"
                className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
              >
                {profile.name}
              </a>
              {index < shown.length - 2 ? ", " : index === shown.length - 2 ? " and " : "."}
            </span>
          ))}
      </p>

    </>
  );
}
