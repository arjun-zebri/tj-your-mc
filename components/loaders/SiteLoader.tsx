"use client";

import { useCallback, useState } from "react";

import { LoaderIntro } from "./LoaderIntro";

/**
 * The loader, on the site.
 *
 * Plays on every full page load, and finishes before the page is usable. It
 * does not replay while a visitor moves around the site, because the App Router
 * keeps this layout mounted across navigations and `done` stays true.
 *
 * Rendered on the server as well, so the page is covered from the first paint
 * rather than flashing before the overlay mounts.
 */
export function SiteLoader() {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  if (done) return null;

  return <LoaderIntro onDone={finish} />;
}
