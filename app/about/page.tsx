import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HandoverMark } from "@/components/icons";

import { JsonLd } from "@/components/JsonLd";
import { Placeholder } from "@/components/Placeholder";
import { portraitImage } from "@/content/media";
import { absoluteUrl, site } from "@/content/site";
import { breadcrumbSchema, ids } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About TJ",
  description:
    "I am TJ. I host wedding receptions and events around Sydney, I sing, and I am not a Celebrant. Here is what I am like to have running your night.",
  alternates: { canonical: "/about" },
};

/**
 * Deliberately short.
 *
 * The old about page was four hundred words that told you nothing about the man.
 * Padding this one with invented backstory would repeat that mistake with worse
 * consequences, so it carries only what TJ has actually told us. It gets longer
 * and better the moment he does the recorded chat, which is logged in
 * .claude/docs/06-decisions.md as the highest value thing he can give us.
 */
export default function AboutPage() {
  return (
    /*
      The portrait is anchored to the right edge of the viewport and runs the
      full height of the section, rather than sitting in a grid cell in the
      middle of the page. That is what stops it reading as a floating rectangle:
      it has an edge of the page to hold onto, and its inner edges dissolve so
      there is no boundary between the picture and the prose.

      It is deliberately wide. At 46% there was a band of dead space between the
      end of the prose and the start of the picture, which made the page look
      left heavy even though the left gutter matches every other page. Widening
      the photograph closes that gap, so what is left on the left is just the
      normal page margin.

      The text column is not moved. It lines up with the logo in the header, and
      breaking that to chase symmetry would cost more than it bought.

      Below `lg` it goes back to being a normal block above the text, where a
      bleed has no room to work.
    */
    <main id="main" className="relative overflow-hidden">
      {portraitImage && (
        <div className="portrait-bleed-right pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] lg:block">
          <Image
            src={portraitImage.src}
            alt={portraitImage.alt}
            fill
            priority
            sizes="56vw"
            className="object-cover object-[center_22%]"
          />

          {/*
            Alpha alone was not enough. The studio backdrop is a light grey and
            the page is near black, so fading opacity still left a visible band
            where the two met: at 50% alpha a bright grey is still much lighter
            than the page. This paints the page colour over the top and left of
            the photograph as well, so the two are close in tone before the mask
            ever starts fading, and the join disappears.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-ink) 0%, color-mix(in oklab, var(--color-ink) 55%, transparent) 18%, transparent 40%), linear-gradient(to right, var(--color-ink) 0%, color-mix(in oklab, var(--color-ink) 60%, transparent) 22%, transparent 48%)",
            }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <h1 className="max-w-[16ch] text-display-sm font-semibold sm:text-display-md">
              I am the person at the front of your reception
            </h1>

            {/* On a phone the portrait sits here, inline, at its own proportions. */}
            {portraitImage ? (
              <div className="photo-fade -mx-5 mt-10 sm:-mx-8 lg:hidden">
                <Image
                  src={portraitImage.src}
                  alt={portraitImage.alt}
                  width={portraitImage.width}
                  height={portraitImage.height}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <Placeholder
                label="NEEDS TJ: portrait, not on a stage. The person, not the performer."
                className="mt-10 aspect-[3/4] w-full lg:hidden"
              />
            )}

            <div className="mt-10 flex max-w-measure flex-col gap-6 text-dust">
              <p>
                I am TJ. I host weddings and events around Sydney. My job is the part of the
                night after the ceremony, when two hundred people are in a room together and
                somebody has to make it go somewhere.
              </p>
              <p>
                I also sing, which comes in useful at the right moment and stays out of the way
                at every other one. It is not the reason to book me. Running the room is.
              </p>
              <p>
                I am not a Celebrant. I do not marry you and I do not run the ceremony. I work
                alongside whoever does.
              </p>
            </div>

            <h2 className="mt-14 text-2xl font-semibold sm:text-display-sm">
              What I am like on the night
            </h2>
            <ul className="mt-6 flex max-w-measure flex-col gap-4 text-chalk">
              <li className="border-t border-dust/15 pt-4">
                I keep it warm without doing bits
              </li>
              <li className="border-t border-dust/15 pt-4">
                I introduce you, then get out of the way
              </li>
              <li className="border-t border-dust/15 pt-4">
                When the running order slips, your guests never find out
              </li>
            </ul>

            <p className="mt-12 max-w-measure text-dust">
              If you want the detail,{" "}
              <Link
                href="/wedding-mc"
                className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
              >
                here is how I run a reception
              </Link>
              , from the first call to the last song.
            </p>

            <Link
              href="/contact"
              className="mt-12 inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap rounded-full bg-warmlight px-7 font-medium text-ink transition-colors duration-150 hover:bg-warmlight/90"
            >
              Get in touch
              <HandoverMark className="size-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${absoluteUrl("/about")}#page`,
          isPartOf: { "@id": ids.website },
          mainEntity: { "@id": ids.person },
          inLanguage: site.locale,
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ])}
      />
    </main>
  );
}
