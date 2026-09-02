"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { MoreMark } from "@/components/icons";
import { initialsOf, type Testimonial } from "@/content/testimonials";

const monthYear = new Intl.DateTimeFormat("en-AU", {
  month: "long",
  year: "numeric",
});

/**
 * One group of the wall, with the overflow behind a toggle.
 *
 * Every quote is rendered into the HTML, including the collapsed ones. They are
 * hidden with the `hidden` attribute rather than left unmounted, so an answer
 * engine or a crawler reading the source sees all of them. Mounting them only
 * on click would make the majority invisible to exactly the systems this site
 * is built to be read by.
 */
export function ReviewGroup({
  entries,
  visible: visibleCount,
}: {
  entries: Testimonial[];
  /** How many show before the read more button. */
  visible: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const restId = useId();

  const hasMore = entries.length > visibleCount;

  return (
    <>
      {/*
        One list, two behaviours.

        On a phone it is a swipeable rail with every quote on it, because a
        "read more" button that reflows a long column is worse than a thumb
        flick. From `sm` it becomes a grid showing only the first few, with the
        rest revealed by the button.

        Every quote is in the HTML either way. The overflow is hidden with a
        class at `sm` rather than left unmounted, so a crawler or an answer
        engine reading the source still sees all of them.

        scroll-pl-5 keeps the first card off the screen edge: snap points align
        to the scrollport, not the padding box, so padding alone is ignored.
        overscroll-x-contain stops a swipe chaining out to the page.
      */}
      <ul
        id={restId}
        className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 scroll-pl-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      >
        {entries.map((entry, index) => (
          <li
            key={index}
            className={`w-[82%] shrink-0 snap-start sm:w-auto ${
              index < visibleCount || expanded ? "" : "sm:hidden"
            }`}
          >
            <Quote entry={entry} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={restId}
          className="mt-8 hidden min-h-12 items-center gap-2.5 rounded-full border border-ink/25 px-6 text-[0.95rem] text-ink transition-colors duration-150 hover:border-ink/60 hover:bg-ink/[0.04] sm:inline-flex"
        >
          {expanded ? "Show fewer" : "Read more"}
          <MoreMark
            className={`size-4 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </>
  );
}

function Quote({ entry }: { entry: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-ink/15 bg-ink/[0.02] p-6">
      {/* Verbatim once real. Never edited for grammar, length or tone. */}
      <blockquote>{entry.quote}</blockquote>

      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <Avatar entry={entry} />
        <div className="text-[0.95rem] text-ink/60">
          <span className="block font-medium text-ink">{entry.attribution}</span>
          {entry.role && <span className="block">{entry.role}</span>}
          {entry.venue && <span className="block">{entry.venue}</span>}
          {entry.date && (
            <time dateTime={entry.date} className="block">
              {monthYear.format(new Date(entry.date))}
            </time>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * A photo where we have one, an initial monogram where we do not.
 *
 * Deliberately not a stock photograph. A picture of a real person beside a
 * quote attributed to someone else uses their likeness to endorse a business,
 * which is a different problem from the words. See the note at the top of
 * content/testimonials.ts.
 */
function Avatar({ entry }: { entry: Testimonial }) {
  if (entry.avatar) {
    return (
      <Image
        src={entry.avatar}
        alt={`${entry.attribution}, who gave this quote`}
        width={44}
        height={44}
        className="size-11 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 bg-ink/5 font-[family-name:var(--font-display)] text-sm text-ink/70"
    >
      {initialsOf(entry.attribution)}
    </span>
  );
}
