import Image from "next/image";
import Link from "next/link";

import { HandoverMark } from "@/components/icons";

import { AudioPlayer } from "@/components/AudioPlayer";
import { Placeholder } from "@/components/Placeholder";
import { heroAudio, heroImage, heroVideo } from "@/content/media";
import { site } from "@/content/site";

/**
 * Full bleed media with everything readable stacked at the bottom.
 *
 * Height is a full dvh on purpose, including on a phone. At 82dvh the copy
 * block, which is anchored to the bottom, started right where his face sits and
 * covered it. Object-position cannot help there: a square source in a narrow
 * frame crops sideways, not vertically, so there is no spare image height to
 * shift. The distance between his face and the first line of copy is the only
 * lever, and it comes from the height of the frame.
 *
 * The source is square. Stretching it across a wide viewport meant scaling a
 * 1440px file up to the full window width, which cropped away the top and
 * bottom and made him enormous and soft.
 *
 * So above `lg` the photograph is shown whole, at or below its own size, and
 * the space either side is filled with a heavily blurred and darkened copy of
 * the same frame. That is the technique video players use for a mismatched
 * aspect ratio, and it works here for the same reason: the eye reads the blur
 * as the unlit part of the room rather than as a background plate, so the
 * picture has no edges and nothing is upscaled.
 *
 * Below `lg` the viewport is narrow enough that cover crops sensibly, so the
 * blur layer is not rendered at all.
 *
 * A landscape crop of this shot would let the whole thing go back to plain
 * cover.
 *
 * The gradient runs from clear at the top of the frame to solid ink at the
 * bottom edge. It resolves to exactly the page background colour, so the hero
 * does not end at a visible seam: the picture darkens into the room, and the
 * specks fixed behind the page come up as you scroll out of it.
 *
 * Height is dvh rather than vh so a phone's collapsing address bar does not
 * crop the call to action, with a min-height so a short landscape window still
 * has room for the headline.
 */
export function Hero() {
  return (
    /*
      Two different shapes.

      From `sm` the photograph fills the frame and the copy sits over its lower
      half, which is the layout the page was designed around.

      On a phone that does not work. The source is square, so in a narrow frame
      it crops sideways and never vertically, which means no amount of
      object-position can lift his face clear of the text. The copy is anchored
      to the bottom and lands squarely on his chin. So the phone gets an honest
      stack instead: the picture is a block, the words sit underneath it on
      clean ink, and nothing overlaps anything.
    */
    <section className="relative -mt-[4.5rem] flex flex-col overflow-hidden sm:h-dvh sm:min-h-[38rem] sm:justify-end">
      <div className="relative h-[58dvh] min-h-[22rem] w-full sm:absolute sm:inset-0 sm:h-auto sm:min-h-0">
        <HeroMedia />

        {/*
          Side fades. They soften the two vertical edges of the crop into the
          page colour so the picture has no visible boundary, which is most of
          why a tight crop reads as tight.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-ink) 0%, color-mix(in oklab, var(--color-ink) 60%, transparent) 14%, transparent 34%, transparent 66%, color-mix(in oklab, var(--color-ink) 60%, transparent) 86%, var(--color-ink) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-ink) 55%, transparent) 0%, transparent 26%, color-mix(in oklab, var(--color-ink) 55%, transparent) 52%, color-mix(in oklab, var(--color-ink) 88%, transparent) 72%, var(--color-ink) 94%)",
          }}
        />
      </div>

      {/*
        Two columns bottom-aligned from `lg`. The headline holds the left, and
        everything that asks the reader to do something sits together on the
        right: what he does, the button, then the proof directly under it.
      */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-6 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h1 className="settle text-display-xs font-semibold text-chalk sm:max-w-[18ch] sm:text-display-md">
            The Celebrant marries the couple on the day. The MC marries the
            people to the day.
          </h1>

          <div className="flex flex-col gap-8 lg:pb-2">
            <div className="settle" style={{ animationDelay: "120ms" }}>
              {heroAudio ? (
                <AudioPlayer
                  src={heroAudio.src}
                  durationLabel={heroAudio.durationLabel}
                  label="TJ hosting a reception"
                />
              ) : (
                <p className="max-w-measure text-lg text-chalk/80">
                  A voice that carries a room, and the timing to know when to
                  use it.
                </p>
              )}
            </div>

            <div
              className="settle flex flex-col items-start gap-5"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap rounded-full bg-warmlight px-7 font-medium text-ink transition-colors duration-150 hover:bg-warmlight/90"
              >
                Get in touch
                <HandoverMark className="size-4 shrink-0" />
              </Link>

              <HeroProof />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Video first, then a still, then the placeholder.
 *
 * The video is muted, looping and inline, which is the only combination phones
 * will autoplay. It carries the poster as its own first frame so there is never
 * a black rectangle while it loads, and the poster alone is what reduced-motion
 * users get, handled in CSS rather than by branching here.
 */
function HeroMedia() {
  if (heroVideo) {
    return (
      <video
        className="absolute inset-0 size-full object-[center_38%] object-cover motion-reduce:hidden lg:object-center lg:object-contain"
        src={heroVideo.src}
        poster={heroVideo.poster}
        autoPlay
        muted
        loop
        playsInline
        // Decorative. The headline carries the meaning, so a screen reader
        // announcing this would only add noise.
        aria-hidden="true"
      />
    );
  }

  if (heroImage) {
    return (
      <>
        {/*
          The fill layer. Same frame, blurred hard and pulled well down, scaled
          past the edges so the blur has no border of its own. A decorative
          duplicate, so it carries no alt text and is hidden from assistive
          tech. Not rendered on phones, where the picture covers the frame.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden overflow-hidden lg:block"
        >
          <Image
            src={heroImage.src}
            alt=""
            fill
            sizes="100vw"
            className="scale-150 object-cover opacity-30 blur-3xl"
          />
        </div>

        {/*
          One image element for both layouts, so the file is fetched once.

          On a phone the box is the full frame and the square crops edge to
          edge. From `lg` the box becomes exactly square and as tall as the
          hero, which is the picture at its own size with nothing cropped and
          nothing upscaled, and `hero-frame` masks its edges into the blur.

          The box has to match the rendered picture for that mask to line up.
          Masking a full width element would fade empty space and leave the
          real edges showing, which is what made it look pasted on.
        */}
        <div className="absolute inset-0 flex justify-center">
          <div className="hero-frame relative h-full w-full lg:aspect-square lg:w-auto">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 64rem) 100vh, 100vw"
              className="object-[center_38%] object-cover lg:object-center"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="absolute inset-0">
      <Placeholder
        label="NEEDS TJ: hero video or full bleed reception photo, landscape, low light"
        className="size-full rounded-none border-x-0 border-t-0"
      />
    </div>
  );
}

/**
 * Social proof without reviews.
 *
 * TJ has no verifiable reviews, so a count of weddings stands in. The figures
 * are currently placeholders supplied on Arjun's instruction, tracked as a
 * launch blocker in .claude/docs/06-decisions.md.
 */
function HeroProof() {
  if (!site.weddingsHosted) {
    return (
      <Placeholder
        label="NEEDS TJ: wedding count and start year"
        className="min-w-[15rem] px-4 pt-7 pb-3"
      >
        <p className="text-[0.95rem] text-dust">[x]+ weddings since [year]</p>
      </Placeholder>
    );
  }

  return (
    <p className="text-[0.95rem] text-chalk/70">
      <span className="font-medium text-chalk">{site.weddingsHosted}</span>{" "}
      weddings
      {site.hostingSince ? ` since ${site.hostingSince}` : ""}
    </p>
  );
}
