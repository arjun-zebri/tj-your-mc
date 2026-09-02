import { CABLE_PATH } from "./cable";

/**
 * The cable, and the name written into it.
 *
 * One unbroken stroke: from the tail of the C round the circle, into the start
 * of the T, through every letter of the name with nothing lifted, out of the
 * tail of the C again, and coiled up into the base of the handle. The lettering
 * is drawn, not typeset, because the light has to travel through the letters in
 * the order a pen would make them, and a font glyph is a filled shape with no
 * order to it. The drawing lives in scripts/loader-path.py.
 *
 * Drawn once, in amber, revealed by a dash offset that writes the whole run in
 * one pass. There is no unlit copy underneath: the circle, the name and the
 * wire only exist where the light has already been.
 *
 * Sits in front of the artwork. The wire crosses the tuxedo on its way to the
 * handle, which is what a cable does, and behind it would vanish into the white.
 */
export function SignatureRing() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <path id="sig-cable" d={CABLE_PATH} pathLength={1000} />
      </defs>
      {/* Nothing is drawn ahead of the light. The stroke exists where it has been. */}
      <use
        href="#sig-cable"
        fill="none"
        stroke="var(--color-warmlight)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="loader__draw"
        /*
          The gap is longer than the path, so at rest the light and its round
          cap sit entirely off the end of the run. With dash and gap both 1000,
          the cap at the boundary drew a dot at the tail of the C for the first
          beat of every loop.
        */
        style={{ strokeDasharray: "1000 1020" }}
      />
    </svg>
  );
}
