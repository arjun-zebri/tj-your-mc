"use client";

import { useEffect, useState } from "react";

import { Loader } from "./Loader";

/** Matches --cycle in loaders.css. */
const CYCLE_MS = 6500;
const CLEAR_MS = 350;

/**
 * The loader as an arrival: full screen, played once, fading out on the lit
 * lockup and leaving the page behind it. While it runs the page underneath is
 * held: no scrolling, nothing focusable.
 *
 * With reduced motion set it is skipped outright rather than played instantly.
 * Holding a still of it for six seconds serves nobody.
 *
 * Mount this on the client only. It reads the motion preference while it is
 * rendering, which would not survive being rendered on the server first.
 */
export function LoaderIntro({ onDone }: { onDone: () => void }) {
  const [skip] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }

    /*
      Nothing underneath is reachable until this is over. The overlay covers the
      page, but the page could still scroll behind it, and a keyboard could tab
      into it. Both are held until the sequence finishes.
    */
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    for (const el of Array.from(document.body.children)) {
      if (!el.classList.contains("loader-intro")) el.setAttribute("inert", "");
    }

    const timer = window.setTimeout(onDone, CYCLE_MS + CLEAR_MS);
    return () => {
      window.clearTimeout(timer);
      root.style.overflow = previousOverflow;
      for (const el of Array.from(document.body.children)) el.removeAttribute("inert");
    };
  }, [onDone, skip]);

  if (skip) return null;

  return (
    <div className="loader-intro">
      <Loader once className="w-[46vmin]" />
    </div>
  );
}
