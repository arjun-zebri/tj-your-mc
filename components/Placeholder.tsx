/**
 * A visible outline of something we do not have yet.
 *
 * Renders in development only. `process.env.NODE_ENV` is statically replaced at
 * build time, so every one of these disappears from the production bundle and
 * nothing invented can reach the live domain.
 *
 * This is how the hard rules in CLAUDE.md and a designer needing to see the
 * layout both get served: the shape is visible while we are working, the
 * fabricated content never ships.
 */
export function Placeholder({
  label,
  className = "",
  children,
}: {
  /** What we are waiting on. Written as the question to ask TJ. */
  label: string;
  className?: string;
  children?: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      data-placeholder
      className={`relative rounded-lg border border-dashed border-warmlight/40 bg-warmlight/[0.03] ${className}`}
    >
      <span className="pointer-events-none absolute top-2 left-2 z-10 rounded-sm bg-warmlight/15 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-tight text-warmlight/90 uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

/** True while placeholders are visible. Use to keep real and placeholder content mutually exclusive. */
export const showPlaceholders = process.env.NODE_ENV !== "production";
