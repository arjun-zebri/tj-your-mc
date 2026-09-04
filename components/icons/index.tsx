/**
 * The icon set.
 *
 * Concept, from .claude/skills/iconography/SKILL.md: marks made on a run sheet.
 * TJ works off a running order with times down the left, marked up in pen and
 * ticked off as the night goes. So these read as drawn rather than constructed,
 * slightly irregular, made quickly with a pen while standing up.
 *
 * The irregularity in these coordinates is deliberate. Do not straighten them
 * into geometric perfection, that removes the whole idea.
 *
 * System: 24x24 viewBox, 1.5 stroke, round caps and joins, currentColor only.
 * Size with a Tailwind class on the element, never with width and height.
 */

type IconProps = {
  className?: string;
};

function Mark({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Play. Nudged right of centre because a triangle sitting on true centre reads left. */
export function PlayMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M8.4 5.6 19 11.8 8.5 18.4c-.5.3-1-.1-1-.7l.1-11.4c0-.6.4-1 .8-.7Z" />
    </Mark>
  );
}

/** Pause. Two pen strokes, not two perfect bars. */
export function PauseMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M9.4 5.2 9.1 18.6" />
      <path d="M15 5.4 14.8 18.8" />
    </Mark>
  );
}

/** The run sheet tick. Used where a real mark is being made, not as a bullet. */
export function TickMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.6 12.9c1.9 1.3 3.4 2.8 4.6 4.6C12 12.4 15.2 8.4 19.6 5.4" />
    </Mark>
  );
}

/** Timing notch. A moment marked on the running order. Used on the date field. */
export function NotchMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.4 8.3h15.3" />
      <path d="M4.6 15.7h15.1" />
      <path d="M9.2 4.6 8.9 19.3" />
      <path d="M15.4 4.8 15.1 19.1" />
    </Mark>
  );
}

/** Handover. The arrow to the band or the DJ. Also the external link mark. */
export function HandoverMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.5 12.2h14.2" />
      <path d="M13.6 6.6c1.5 2.4 3.2 4.3 5.2 5.6-2 1.4-3.7 3.3-5.1 5.7" />
    </Mark>
  );
}

/** Circled moment. A thing on the run sheet someone drew a ring around. Error and attention. */
export function CircledMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M12.3 3.7c4.6-.2 8.1 3.5 8 8.4-.1 4.8-3.6 8.3-8.2 8.2-4.7-.1-8.1-3.7-8-8.5.1-4.7 3.6-8 8.2-8.1Z" />
      <path d="M12.1 7.8 12 13.1" />
      <path d="M12 16.3h.1" />
    </Mark>
  );
}

/** Menu. Three run sheet rows, uneven the way a hand-ruled list is. */
export function RunSheetMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.3 7.4h15.4" />
      <path d="M4.5 12.2h15" />
      <path d="M4.4 17h10.8" />
    </Mark>
  );
}

/** Close. Two crossed pen strokes. */
export function CrossMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M6.2 6.1 18 18.2" />
      <path d="M18.1 6.2 6.1 18.1" />
    </Mark>
  );
}

/** Instagram. Kept recognisable, redrawn to the set's stroke and irregularity. */
export function InstagramMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M8.1 3.9h7.8c2.4 0 4.3 1.9 4.2 4.3v7.7c0 2.4-1.8 4.2-4.2 4.2H8c-2.3 0-4.2-1.8-4.1-4.2l.1-7.8c0-2.3 1.8-4.2 4.1-4.2Z" />
      <path d="M12.1 8.4a3.7 3.7 0 0 1 .1 7.3 3.7 3.7 0 0 1-.1-7.3Z" />
      <path d="M16.7 7.4h.1" />
    </Mark>
  );
}

/*
  Tier markers. Three brackets drawn as the span you would pen down the side of
  a run sheet, widening across the three packages. They read as increasing scope
  at a glance, which is the only reason the tiers get icons at all. The mapping
  from package to mark is in components/Packages.tsx.
*/

/** A bracket over the back half of the line. The narrowest of the three. */
export function SpanReceptionMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.4 6.2h15.2" />
      <path d="M12.2 6.4v11.4" />
      <path d="M12.1 17.8h7.4" />
      <path d="M8.2 12.1h.1" />
    </Mark>
  );
}

/** The bracket spans the whole line. The widest of the three. */
export function SpanFullDayMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.4 6.2h15.2" />
      <path d="M4.6 6.4v11.4" />
      <path d="M4.5 17.8h15.1" />
      <path d="M12.2 12.1h.1" />
    </Mark>
  );
}

/** A part span with a note against it, for the tier that adds songs. */
export function SpanMusicMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.4 6.2h9.1" />
      <path d="M4.6 6.4v11.4" />
      <path d="M4.5 17.8h9" />
      <path d="M18.4 5.4v8.7" />
      <path d="M18.5 5.6c.6 1.4 1.4 2.3 2.5 2.8" />
      <path d="M16.9 16.6a1.6 1.6 0 1 0 1.6-2.5" />
    </Mark>
  );
}

/** More. A pen chevron, the mark you make when a list carries on over the page. */
export function MoreMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.8 8.6c2.6 1.9 5 3.9 7.3 6.1 2.3-2.3 4.7-4.4 7.2-6.3" />
    </Mark>
  );
}

/**
 * Calendar. A page with two binding rings, a header rule and one day marked,
 * drawn to the same pen system as the rest of the set. Used on the date field,
 * where the shape needs to be read instantly rather than interpreted.
 */
export function CalendarMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M5.5 6.4h13c1 0 1.8.8 1.7 1.8l-.1 11c0 1-.8 1.8-1.8 1.7l-12.9-.1c-1 0-1.7-.8-1.7-1.8l.1-10.9c0-1 .7-1.7 1.7-1.7Z" />
      <path d="M3.9 10.6h16.4" />
      <path d="M8.4 3.7v4.3" />
      <path d="M15.7 3.6v4.4" />
      <path d="M8.3 14.9h.1" />
      <path d="M12.1 14.9h.1" />
      <path d="M8.3 17.9h.1" />
    </Mark>
  );
}

/** Facebook. Redrawn to the set's stroke rather than dropped in as a brand glyph. */
export function FacebookMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M6.3 3.7h11.5c1.4 0 2.5 1.1 2.5 2.5v11.5c0 1.4-1.1 2.5-2.5 2.5H6.3c-1.4 0-2.5-1.1-2.5-2.5V6.2c0-1.4 1.1-2.5 2.5-2.5Z" />
      <path d="M15.3 8.1h-1.6c-1 0-1.8.8-1.8 1.8v10.3" />
      <path d="M9.7 12.7h4.7" />
    </Mark>
  );
}

/** TikTok. The note, simplified to one stroke weight like everything else here. */
export function TikTokMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M12.7 4.1v13.1" />
      <path d="M12.8 4.2c.7 2.5 2.6 4.2 5.2 4.6" />
      <path d="M12.7 17.2a3.6 3.6 0 1 1-3.6-3.6c.9 0 1.8.4 2.5 1" />
    </Mark>
  );
}

/** Email. An envelope, drawn to the same pen system as the rest. */
export function MailMark({ className }: IconProps) {
  return (
    <Mark className={className}>
      <path d="M4.4 5.8h15.2c.9 0 1.6.7 1.6 1.6v9.2c0 .9-.7 1.6-1.6 1.6H4.4c-.9 0-1.6-.7-1.6-1.6V7.4c0-.9.7-1.6 1.6-1.6Z" />
      <path d="M3.2 7 11.3 12.4c.4.3 1 .3 1.4 0L20.8 7" />
    </Mark>
  );
}
