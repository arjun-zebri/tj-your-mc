/**
 * Ambient light specks behind the whole page.
 *
 * Light catching dust above a dance floor, not Christmas lights.
 *
 * Fixed to the viewport and pinned at z-index -1, which puts it above the page
 * canvas but underneath every block background. That is what makes it show
 * through the dark sections, which have no background of their own, while the
 * paper pricing section and the stage panels cover it completely. It also means
 * the field holds still as the page scrolls, so it reads as depth behind the
 * content rather than as another thing moving.
 *
 * Positions are a fixed table rather than Math.random, so the server and the
 * client render identical markup. Randomising here is a hydration mismatch.
 */

type Speck = {
  /** Viewport percentages. */
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drifts?: boolean;
};

const SPECKS: Speck[] = [
  { x: 3, y: 14, size: 3, duration: 7.5, delay: 0.2 },
  { x: 7, y: 62, size: 2, duration: 5.5, delay: 1.4 },
  { x: 11, y: 33, size: 2, duration: 8.5, delay: 2.6, drifts: true },
  { x: 14, y: 88, size: 3, duration: 6.2, delay: 0.8 },
  { x: 18, y: 8, size: 2, duration: 9, delay: 3.1 },
  { x: 21, y: 47, size: 4, duration: 5.8, delay: 1.1, drifts: true },
  { x: 25, y: 71, size: 2, duration: 7.1, delay: 2.2 },
  { x: 29, y: 21, size: 3, duration: 6.6, delay: 0.5 },
  { x: 33, y: 55, size: 2, duration: 8.2, delay: 1.9, drifts: true },
  { x: 36, y: 93, size: 3, duration: 5.2, delay: 2.9 },
  { x: 40, y: 12, size: 2, duration: 7.8, delay: 0.9 },
  { x: 44, y: 40, size: 3, duration: 6.1, delay: 3.4 },
  { x: 47, y: 78, size: 2, duration: 8.8, delay: 1.6, drifts: true },
  { x: 51, y: 26, size: 4, duration: 5.6, delay: 2.4 },
  { x: 55, y: 60, size: 2, duration: 7.3, delay: 0.4 },
  { x: 58, y: 5, size: 3, duration: 6.9, delay: 3.8 },
  { x: 62, y: 84, size: 2, duration: 8.1, delay: 1.2, drifts: true },
  { x: 66, y: 36, size: 3, duration: 6.4, delay: 2.7 },
  { x: 69, y: 67, size: 2, duration: 7.7, delay: 0.7 },
  { x: 73, y: 17, size: 4, duration: 5.9, delay: 3.3 },
  { x: 76, y: 51, size: 2, duration: 8.4, delay: 1.8 },
  { x: 80, y: 90, size: 3, duration: 6.8, delay: 2.1, drifts: true },
  { x: 84, y: 29, size: 2, duration: 7.2, delay: 0.6 },
  { x: 87, y: 73, size: 3, duration: 5.4, delay: 3.6 },
  { x: 91, y: 44, size: 2, duration: 8.6, delay: 1.5 },
  { x: 94, y: 10, size: 3, duration: 6.3, delay: 2.8, drifts: true },
  { x: 97, y: 64, size: 2, duration: 7.9, delay: 0.3 },
  { x: 99, y: 31, size: 3, duration: 5.7, delay: 3.9 },
  { x: 5, y: 96, size: 2, duration: 8.3, delay: 1.3 },
  { x: 16, y: 57, size: 3, duration: 6.7, delay: 2.5, drifts: true },
  { x: 31, y: 82, size: 2, duration: 7.4, delay: 0.1 },
  { x: 43, y: 65, size: 2, duration: 5.3, delay: 3.7 },
  { x: 60, y: 45, size: 3, duration: 8.9, delay: 2.0 },
  { x: 71, y: 97, size: 2, duration: 6.0, delay: 1.0, drifts: true },
  { x: 89, y: 55, size: 2, duration: 7.6, delay: 3.0 },
];

export function NightSky() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {SPECKS.map((speck, index) => (
        <span
          key={index}
          className="speck"
          style={{
            left: `${speck.x}%`,
            top: `${speck.y}%`,
            width: `${speck.size}px`,
            height: `${speck.size}px`,
            // Larger specks read as closer, so they take the warmer colour.
            backgroundColor:
              speck.size >= 2 ? "var(--color-warmlight)" : "var(--color-chalk)",
            boxShadow:
              speck.size >= 3
                ? "0 0 8px var(--color-warmlight)"
                : speck.size >= 2
                  ? "0 0 4px color-mix(in oklab, var(--color-warmlight) 60%, transparent)"
                  : undefined,
            ["--twinkle-duration" as string]: `${speck.duration}s`,
            ["--twinkle-delay" as string]: `${speck.delay}s`,
            ...(speck.drifts
              ? {
                  animation: `twinkle ${speck.duration}s ease-in-out ${speck.delay}s infinite alternate both, drift ${speck.duration * 3}s ease-in-out ${speck.delay}s infinite alternate both`,
                }
              : {}),
          }}
        />
      ))}
    </div>
  );
}
