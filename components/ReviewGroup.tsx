"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { GoogleMark, MoreMark } from "@/components/icons";
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
        flick. From `sm` it becomes columns showing only the first few, with the
        rest revealed by the button.

        Cards take the height of their quote. A one line review and a three
        paragraph one are not the same size, and stretching them to match
        leaves a short quote floating in an empty box. Columns rather than a
        grid, so a short card does not leave a hole beside a tall one.

        The phone rail is the opposite. Cards side by side at different heights
        look broken when you swipe, so there they stretch to match and a long
        quote is cut short with a read more. See Quote below.

        Every quote is in the HTML either way. The overflow is hidden with a
        class at `sm` rather than left unmounted, so a crawler or an answer
        engine reading the source still sees all of them.

        scroll-pl-5 keeps the first card off the screen edge: snap points align
        to the scrollport, not the padding box, so padding alone is ignored.
        overscroll-x-contain stops a swipe chaining out to the page.
      */}
      <ul
        id={restId}
        className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 scroll-pl-5 sm:mx-0 sm:block sm:columns-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:columns-3"
      >
        {entries.map((entry, index) => (
          <li
            key={index}
            className={`w-[82%] shrink-0 snap-start sm:mb-5 sm:w-auto sm:break-inside-avoid ${
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

/**
 * On a phone every card on the rail is the same height, so a long quote is cut
 * at eleven lines. Eleven because at 375px it shows the short and medium
 * reviews whole and only cuts the genuinely long ones. Six cut five of six. "Read more" only appears when the clamp actually cut something,
 * which depends on the screen width, so it is measured rather than guessed from
 * the character count.
 *
 * The full quote is always in the HTML. The clamp is CSS, so a crawler reads
 * every word. From `sm` there is no clamp and no read more.
 */
function Quote({ entry }: { entry: Testimonial }) {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [clamped, setClamped] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;
    const measure = () => setClamped(quote.scrollHeight > quote.clientHeight + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(quote);
    measure();
    return () => observer.disconnect();
  }, []);

  const moreClass =
    "-my-2 inline-flex min-h-11 items-center self-start text-[0.95rem] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-150 hover:decoration-ink sm:hidden";

  return (
    <figure className="flex h-full flex-col rounded-xl border border-ink/15 bg-ink/[0.02] p-6 sm:h-auto">
      {/* Verbatim once real. Never edited for grammar, length or tone. */}
      <blockquote
        ref={quoteRef}
        className={open ? "" : "line-clamp-11 sm:line-clamp-none"}
      >
        {entry.quote}
      </blockquote>

      {entry.url && clamped ? (
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${entry.attribution}'s full review on Google (opens in a new tab)`}
          className={`mt-3 ${moreClass}`}
        >
          Read more on Google
        </a>
      ) : (
        (clamped || open) && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className={`mt-3 ${moreClass}`}
          >
            {open ? "Show less" : "Read more"}
          </button>
        )
      )}

      <figcaption className="mt-auto flex items-center gap-3 pt-6 sm:mt-0">
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
          {entry.source === "google" && (
            <span className="mt-1 flex items-center gap-1.5">
              <GoogleMark className="size-4 shrink-0" />
              Google review
            </span>
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
 * which is a different problem from the words.
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
