import Link from "next/link";

import { HandoverMark, SpanFullDayMark, SpanMusicMark, SpanReceptionMark, TickMark } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import {
  packages,
  packagesFramingLine,
  packagesValueLine,
  pricingUpdated,
  visibleInclusions,
  type Package,
} from "@/content/packages";
import { site } from "@/content/site";

const MARKS = {
  reception: SpanReceptionMark,
  fullDay: SpanFullDayMark,
  music: SpanMusicMark,
} as const;

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

const longDate = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * The one light section on the site. A section on paper after several on ink
 * does more for hierarchy than any heading size.
 *
 * Cards are used here and nowhere else, because the tiers are a genuinely
 * discrete repeated unit. The tiers carry different amounts of confirmed
 * detail, so the card is a flex column with the price pinned to the bottom.
 * That keeps the three bottom edges aligned however uneven the content is.
 */
export function Packages() {
  return (
    <section data-surface="light" className="bg-paper text-ink" aria-labelledby="packages">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <h2
          id="packages"
          className="max-w-2xl text-display-sm font-semibold sm:text-display-md"
        >
          What it costs
        </h2>
        <p className="mt-5 max-w-measure text-lg text-ink">{packagesValueLine}</p>
        <p className="mt-4 max-w-measure text-ink/70">{packagesFramingLine}</p>

        {/*
          A swipeable rail on a phone, a three column grid from `md`.
          Stacking three tall cards vertically buried the third one; side by
          side with snap points, all three are one thumb flick apart.

          The negative margin lets the rail bleed to the screen edges while the
          padding keeps the first and last card aligned with the text above.
          scroll-pl matters as much as the padding does: snap points align to
          the scrollport edge, not the padding box, so without it the browser
          pulls the first card flush to the screen and the gutter disappears.
        */}
        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 scroll-pl-5 sm:-mx-8 sm:px-8 sm:scroll-pl-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {packages.map((tier) => (
            <div
              key={tier.slug}
              className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto"
            >
              <PackageCard tier={tier} />
            </div>
          ))}
        </div>

        <PricingUpdated />

        <Link
          href="/contact"
          className="mt-10 inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap rounded-full bg-ink px-7 font-medium text-paper transition-opacity duration-150 hover:opacity-90"
        >
          Tell me about your night
          <HandoverMark className="size-4 shrink-0" />
        </Link>
      </div>
    </section>
  );
}

function PackageCard({ tier }: { tier: Package }) {
  const Mark = MARKS[tier.mark];
  const inclusions = visibleInclusions(tier);

  return (
    <div className="flex h-full flex-col rounded-xl border border-ink/15 bg-ink/[0.02] p-6">
      <Mark className="size-7 text-ink/55" />

      <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
        {tier.name}
      </h3>
      <p className="mt-2 text-ink/70">{tier.summary}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {inclusions.map((line) => (
          <li key={line} className="flex gap-3">
            <TickMark className="mt-1 size-4 shrink-0 text-ink/45" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* mt-auto pins the price to the bottom so the three cards line up. */}
      <div className="mt-auto pt-8">
        <Price tier={tier} />
      </div>
    </div>
  );
}

function Price({ tier }: { tier: Package }) {
  if (tier.price !== null) {
    return (
      <p className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        {tier.isFrom && <span className="text-lg font-normal text-ink/60">From </span>}
        {currency.format(tier.price)}
      </p>
    );
  }

  return (
    <>
      {/* Dev only. A fabricated price cannot reach the live site. */}
      <Placeholder label="NEEDS TJ: price" className="px-4 pt-7 pb-3">
        <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink/40">
          <span className="text-lg font-normal">From </span>$0,000
        </p>
      </Placeholder>

      <p className="border-t border-ink/10 pt-4 text-ink/60 print:hidden">
        Quoted for your night
      </p>
    </>
  );
}

/**
 * A visible freshness signal on the pricing.
 *
 * Answer engines quoting a figure need to know how current it is, and an
 * undated price is one they are right to distrust. Renders only once there is
 * real pricing with a real date behind it.
 */
function PricingUpdated() {
  if (!pricingUpdated) {
    return (
      <Placeholder
        label="NEEDS TJ: prices, then set pricingUpdated in content/packages.ts"
        className="mt-8 max-w-md px-4 pt-7 pb-3"
      >
        <p className="text-sm text-ink/50">Prices last reviewed [date]</p>
      </Placeholder>
    );
  }

  return (
    <p className="mt-8 text-sm text-ink/55">
      Prices last reviewed{" "}
      <time dateTime={pricingUpdated}>
        {longDate.format(new Date(pricingUpdated))}
      </time>
      . {site.businessName} quotes per event, so ask for a figure against your date.
    </p>
  );
}
