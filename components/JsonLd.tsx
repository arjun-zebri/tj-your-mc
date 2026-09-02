/**
 * Renders a JSON-LD block into the server rendered HTML.
 *
 * It has to be in view-source. A schema block that only appears after hydration
 * is invisible to most AI crawlers, which defeats the point of emitting it.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      // Escaping "<" stops a "</script>" inside any content string from closing the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
