import { CABLE_PARTS } from "./cable";
import { LoaderArt } from "./LoaderArt";
import { SignatureRing } from "./SignatureRing";

import "./loaders.css";

/**
 * The loader.
 *
 * One run of light: round the circle, through the letters of TJ's name, up the
 * coiled wire and into the microphone, which fills to the top of the grille and
 * stops. The timing is in loaders.css, keyed off one --cycle; the two
 * waypoints below tell it where the circle ends and the letters end, so it can
 * take its time over the writing. Size it with a width class on the caller.
 */
export function Loader({
  className = "",
  /** Play the sequence once, as an arrival, rather than looping it. */
  once = false,
}: {
  className?: string;
  once?: boolean;
}) {
  return (
    /*
      role="status" rather than a bare div. A loader with no accessible name is
      silence to a screen reader, which is the one case where a spinner is worse
      than no spinner at all.
    */
    <div
      role="status"
      className={`loader ${once ? "loader--once" : ""} ${className}`}
      style={
        {
          "--cable-circle-end": 1000 * (1 - CABLE_PARTS.circleEnd),
          "--cable-letters-end": 1000 * (1 - CABLE_PARTS.lettersEnd),
        } as React.CSSProperties
      }
    >
      <div className="loader__fade">
        <div className="loader__stage">
          <LoaderArt />
        </div>
        {/* After the artwork, so the wire crosses in front of the tuxedo. */}
        <SignatureRing />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
