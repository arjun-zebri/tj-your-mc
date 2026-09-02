/**
 * TJ's mark, in layers: the mark, the glow off the grille, and the microphone
 * on its own so it can be lit separately.
 *
 * The supplied artwork is a single raster, so the microphone was separated out
 * of it into its own mask. See .claude/docs/05-assets.md. Both masks share the
 * same canvas, which is why both layers are simply inset to zero and line up
 * exactly. Masks rather than <img>, so each layer takes currentColor.
 */
export function LoaderArt() {
  return (
    <span className="loader__art" aria-hidden="true">
      <span className="loader__mark" />
      {/* A soft light off the grille, once it is lit. Sits over the mark, under the mic. */}
      <span className="loader__glow" />
      <span className="loader__mic" />
    </span>
  );
}
