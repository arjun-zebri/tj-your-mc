import type { Metadata } from "next";
import Link from "next/link";

import { DateCheck } from "@/components/DateCheck";
import { Faq } from "@/components/Faq";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Hero } from "@/components/Hero";
import { Placeholder } from "@/components/Placeholder";
import Image from "next/image";

import { JsonLd } from "@/components/JsonLd";
import { Packages } from "@/components/Packages";
import { WallOfLove } from "@/components/WallOfLove";
import { receptionImage } from "@/content/media";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding MC in Sydney",
  description:
    "TJ is a wedding MC in Sydney. He runs your reception: introductions, speeches to time, and the handover to the band. Send him your date and he will tell you if he is free.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />

      {/*
        Prose, not three matching icon cards. The content is not three parallel
        things, and an icon triptych is the most obvious template tell there is.
      */}
      <section aria-labelledby="what-i-do" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        {/*
          Prose left, one photograph right, running the full height of the
          column beside it. The heading sits inside the left column rather than
          above the grid, so the top of the picture lines up with the top of the
          heading and its bottom lands with the last line of text.
        */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <h2
              id="what-i-do"
              className="max-w-2xl text-display-sm font-semibold sm:text-display-md"
            >
              What I actually do at your reception
            </h2>

            <div className="mt-10 flex max-w-measure flex-col gap-6 text-dust">
              <p>
                Most couples have not given the MC much thought until about six weeks out.
                Then it lands that someone has to get two hundred guests into the room,
                seated and quiet, before the first speech.
              </p>
              <p>
                That is me. I bring the room in, introduce you, and run the speeches so they
                land and then stop. I keep us on schedule without anyone feeling like there
                is one, then hand over to the band or the DJ at the right moment. The night
                has someone running it from the first guest to the last song. That is what
                you are booking.
              </p>
            </div>

            {/* Three plain lines. No icons, and not styled as a feature list. */}
            <ul className="mt-12 flex max-w-measure flex-col gap-4 text-chalk">
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

            <p className="mt-10 max-w-measure text-dust">
              More on{" "}
              <Link
                href="/wedding-mc"
                className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
              >
                how I run a wedding
              </Link>
              , or{" "}
              <Link
                href="/about"
                className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
              >
                a bit about me
              </Link>
              , since you are choosing a person as much as a service.
            </p>
          </div>

          {/*
            Stretches to whatever height the prose column ends up. The square
            source crops at the sides in a tall frame, which is fine because the
            subject is centred, but it does mean this slot wants a portrait shot
            eventually rather than a square one.

            Needs an explicit ratio on small screens, where the columns stack and
            there is no sibling row height to fill.
          */}
          <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-full">
            {receptionImage ? (
              <Image
                src={receptionImage.src}
                alt={receptionImage.alt}
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="soft-edges rounded-sm object-cover"
              />
            ) : (
              <Placeholder
                label="NEEDS TJ: TJ on the mic mid-reception, room visible, not posed"
                className="size-full"
              />
            )}
          </div>
        </div>
      </section>

      <Packages />

      <section aria-labelledby="gallery" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="gallery" className="text-display-sm font-semibold sm:text-display-md">
            Nights I have run
          </h2>
        </div>
        <div className="mt-10">
          <GalleryGrid />
        </div>
      </section>

      <WallOfLove />

      <Faq />

      {/*
        The last light on.

        Closes the page on the same idea the hero opens with: the room at 9pm.
        The section darkens toward its edges and a warm glow sits behind the
        panel, so the form reads as the one lit table left at the end of the
        night rather than as a card sitting on a page.

        The glow is deliberately weaker than the hero's and the amber button
        stays the brightest thing here. Two competing pools of amber would leave
        neither meaning anything.

        The section is not darkened. An earlier version laid a black vignette
        over the whole band, which read as a different colour block rather than
        as light, and put a hard horizontal edge across the page where the
        overlay started. The glow alone carries the idea.
      */}
      <section aria-labelledby="date-check" className="relative pb-24 sm:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(38% 46% at 50% 48%, color-mix(in oklab, var(--color-warmlight) 10%, transparent), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          {/*
            A hairline of warm light on the top edge, as though the glow behind
            is catching the lip of the surface. Does more than a border colour.
          */}
          <div className="rounded-2xl border border-warmlight/12 bg-stage px-5 py-12 shadow-[0_-1px_0_0_color-mix(in_oklab,var(--color-warmlight)_20%,transparent)_inset] sm:px-12 sm:py-16">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div>
                <h2
                  id="date-check"
                  className="text-display-sm font-semibold sm:text-display-md"
                >
                  Get in touch
                </h2>
                <p className="mt-5 max-w-measure text-dust">
                  Send me your date and I will let you know if I am free. No obligation, and I
                  would rather tell you early than have you waiting.
                </p>
                <p className="mt-5 max-w-measure text-dust">
                  After that we get on a call, and closer to the day I help you get the run
                  sheet right and make sure your suppliers have it.{" "}
                  <Link
                    href="/wedding-mc#booking"
                    className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
                  >
                    The whole booking process is here
                  </Link>
                  .
                </p>
                <p className="mt-5 max-w-measure text-dust">
                  Got more to tell me?{" "}
                  <Link
                    href="/contact"
                    className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
                  >
                    The longer form is here
                  </Link>
                  .
                </p>
              </div>

              <DateCheck />
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={faqSchema("/")} />
    </main>
  );
}
