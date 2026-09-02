import type { Metadata } from "next";
import Link from "next/link";

import { HandoverMark } from "@/components/icons";

import { bookingImage, weddingImage } from "@/content/media";
import Image from "next/image";

import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding MC services in Sydney",
  description:
    "What I do across your reception, hour by hour. Guest arrival, seating, speeches to time, and the handover to the band. Send me your date and I will tell you if I am free.",
  alternates: { canonical: "/wedding-mc" },
};

/** The main service page. What TJ does across the night, in detail. */
export default function WeddingMcPage() {
  return (
    <main id="main">
      {/*
        The photograph is anchored to the left edge of the viewport and runs the
        full height of this section, the same treatment as the portrait on
        /about, mirrored. It has an edge of the page to hold onto and its inner
        edge dissolves into the background, so there is no boundary between the
        picture and the prose and it never reads as a floating rectangle.

        Scoped to this section rather than to `main`. On /about the whole page
        is about this long, but here the running order and the closing block sit
        underneath, and an image stretched over all of that would be a smear
        rather than a photograph.

        Below `lg` it goes back to a normal block under the headline, where a
        bleed has no room to work.
      */}
      <section className="relative overflow-hidden">
        {weddingImage && (
          <div className="portrait-bleed-left pointer-events-none absolute inset-y-0 left-0 hidden w-[56%] lg:block">
            <Image
              src={weddingImage.src}
              alt={weddingImage.alt}
              fill
              priority
              sizes="56vw"
              className="object-cover object-[center_30%]"
            />

            {/*
              The mask alone leaves a visible join. The picture is lit much
              brighter than the page, so fading alpha still puts a light band
              against near black. This paints the page colour across the top and
              the inner edge first, so the two are close in tone before the mask
              starts fading.
            */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-ink) 0%, color-mix(in oklab, var(--color-ink) 55%, transparent) 18%, transparent 40%), linear-gradient(to left, var(--color-ink) 0%, color-mix(in oklab, var(--color-ink) 60%, transparent) 22%, transparent 48%)",
              }}
            />
          </div>
        )}

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            {/* Holds the column the photograph bleeds through. */}
            <div aria-hidden="true" className="hidden lg:block" />

            <div>
              <h1 className="max-w-[17ch] text-display-sm font-semibold sm:text-display-md">
                I run the reception so you can actually be at it
              </h1>

              {/* On a phone the photograph sits here, inline, at its own proportions. */}
              {weddingImage && (
                <div className="photo-fade -mx-5 mt-10 sm:-mx-8 lg:hidden">
                  <Image
                    src={weddingImage.src}
                    alt={weddingImage.alt}
                    width={weddingImage.width}
                    height={weddingImage.height}
                    sizes="100vw"
                    className="h-auto w-full"
                  />
                </div>
              )}

              <p className="mt-8 max-w-measure text-lg text-dust">
                The ceremony has a script and someone in charge of it. The reception has neither
                unless you give it one. That is the whole job.
              </p>
              <p className="mt-6 max-w-measure text-dust">
                Most of the work happens before the day. By the time your guests walk in I know
                the order, the names, the timings and which parts of the night matter most to
                you. On the night itself it should look like nothing is being managed at all.
              </p>
              <p className="mt-6 max-w-measure text-dust">
                The microphone is the visible part. What you are paying for is that nobody has
                to ask either of you a question all night.
              </p>

              <Link
                href="/contact"
                className="mt-10 inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap rounded-full bg-warmlight px-7 font-medium text-ink transition-colors duration-150 hover:bg-warmlight/90"
              >
                Get in touch
                <HandoverMark className="size-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*
        Structured as the night runs rather than as a feature list, because that
        is the order the reader is actually worried about it in.
      */}
      {/*
        This ran on paper until 2 September 2026, to break the page into two
        surfaces. Arjun asked for one dark page, so the separation now comes
        from the rules between the rows and the space around them.
      */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <ol className="flex flex-col gap-14">
            {[
              {
                when: "Before the day",
                what: "We have a call and I help you get the run sheet right. Who is speaking, in what order, how long they have, when the food lands, when the cake is cut, when the dancing starts. I tell you where it will run long, and I make sure your venue and your photographer are working off the same page. Most of the value of an MC is decided here, not on the night.",
              },
              {
                when: "Guests arriving",
                what: "I get people in, pointed at a drink, and eventually pointed at their seats. Two hundred people do not seat themselves quickly, and every minute lost here comes out of the dance floor later.",
              },
              {
                when: "Introductions",
                what: "I bring in the wedding party and then the two of you, with the names said correctly. I check pronunciations with you beforehand rather than guessing on a microphone in front of everyone you know.",
              },
              {
                when: "Speeches",
                what: "I cue each speaker, hand them a working microphone, and keep them to the time we agreed. If someone is going long I bring it back without making it obvious or making them feel bad. This is the part couples worry about most and it is the part that most needs someone sober holding it.",
              },
              {
                when: "The gaps",
                what: "Between the formal moments there is a lot of room for a night to go flat. I keep it moving, tell people what is happening next, and make sure nobody is sitting there wondering whether it is over.",
              },
              {
                when: "Handover",
                what: "I hand to the band or the DJ at the right moment and get people up. Then I stay across the rest of the night so if the schedule slips there is still someone running it.",
              },
            ].map((step, index) => (
              <li key={step.when} className="border-t border-dust/15 pt-6 md:flex md:gap-10">
                <div className="flex items-baseline gap-4 md:w-2/5 md:shrink-0">
                  {/*
                    A running order down the left rather than an icon beside
                    each row. Icons here would be decoration, which the
                    iconography rules rule out, and a numbered order is the
                    actual object TJ works from. The <ol> already carries the
                    sequence for a screen reader, so this is hidden from it.
                  */}
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-sm tabular-nums text-dust/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {step.when}
                  </h2>
                </div>
                <p className="mt-3 max-w-measure text-dust md:mt-0">{step.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/*
        The page explained the night in detail and never explained how you get
        there, so the reader had no idea what sending the form actually starts.

        Deliberately not styled like the running order above it. Two numbered
        lists on one page reads as a template, so this one is a plain sequence
        with the step name inline. What confirms a booking, the deposit and the
        contract are all still open with TJ, so there is no step between the
        call and the run sheet. See .claude/docs/06-decisions.md.
      */}
      <section aria-labelledby="booking" className="relative overflow-hidden">
        {bookingImage && (
          <div className="portrait-bleed-right pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
            <Image
              src={bookingImage.src}
              alt={bookingImage.alt}
              fill
              sizes="52vw"
              className="object-cover object-[center_35%]"
            />

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

        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
            <div>
              <h2 id="booking" className="text-display-sm font-semibold sm:text-display-md">
                How booking me works
              </h2>

              <ol className="mt-10 flex max-w-measure flex-col gap-6 text-dust">
                <li>
                  <span className="font-medium text-chalk">Send me your date.</span> That is the
                  whole first step. I will tell you either way, and if I am not free I would
                  rather you knew now than in three weeks.
                </li>
                <li>
                  <span className="font-medium text-chalk">We get on a call.</span> You tell me
                  about the night, who is speaking and which part of it you are quietly worried
                  about. I tell you how I would run it, and you are under no obligation at the
                  end of it.
                </li>
                <li>
                  <span className="font-medium text-chalk">I help you with the run sheet.</span>{" "}
                  Closer to the day we go through the order, the names and the pronunciations
                  together. It stays yours. I tell you where it will run long, and I make sure
                  your venue, your photographer and your band are all holding the same version.
                </li>
              </ol>

              <Link
                href="/contact"
                className="mt-12 inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap rounded-full bg-warmlight px-7 font-medium text-ink transition-colors duration-150 hover:bg-warmlight/90"
              >
                Get in touch
                <HandoverMark className="size-4 shrink-0" />
              </Link>
            </div>

            {/* Holds the column the photograph bleeds through. */}
            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
        <p className="max-w-measure text-dust">
          I am an MC, not a Celebrant, so I am not the one marrying you. Your Celebrant handles
          the ceremony and the paperwork, and I take the night from there. If you want to know
          who you are handing the microphone to, here is{" "}
          <Link
            href="/about"
            className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
          >
            a bit about me
          </Link>
          .
        </p>
      </div>

      <JsonLd
        data={serviceSchema({
          path: "/wedding-mc",
          name: "Wedding MC services in Sydney",
          serviceType: "Wedding master of ceremonies",
          description:
            "TJ hosts Sydney wedding receptions. He helps couples build the run sheet, introduces the wedding party, cues and times the speeches, coordinates the venue and suppliers, and hands over to the band or DJ.",
          audience: "Engaged couples planning a wedding reception",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Weddings", href: "/wedding-mc" },
        ])}
      />
    </main>
  );
}
