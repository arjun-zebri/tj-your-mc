"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import {
  CrossMark,
  FacebookMark,
  HandoverMark,
  InstagramMark,
  RunSheetMark,
  TikTokMark,
} from "@/components/icons";
import { Logo } from "@/components/Logo";
import { headerNav } from "@/content/nav";
import { site } from "@/content/site";

/**
 * The header stays quiet. The hero owns the accent colour, so the desktop
 * "Get in touch" is a hairline outline rather than a second amber button.
 * Two ambers on one screen and neither means anything.
 *
 * On a phone the nav is a drawer sliding in from the right at 90% width. It is
 * always in the DOM so the links are in the initial HTML for crawlers, and it
 * is moved off screen with a transform rather than unmounted, which is what
 * makes the slide possible in the first place.
 *
 * The drawer and its backdrop are siblings of <header>, not children of it, and
 * that placement is load bearing. The header carries backdrop-blur, and
 * backdrop-filter makes an element a containing block for position: fixed
 * descendants. Nested inside, the drawer anchors to the 72px header box instead
 * of the viewport, so sliding it out pushes real layout sideways and the whole
 * page scrolls left and right. Keep it outside.
 */
/** One mark per profile, keyed by the name in content/site.ts. */
const SOCIAL_MARKS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  Instagram: InstagramMark,
  Facebook: FacebookMark,
  TikTok: TikTokMark,
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        // Send focus back to the control that opened it, or the keyboard user
        // is dropped at the top of the document with no idea where they are.
        toggleRef.current?.focus();
      }
    }

    // Stop the page scrolling behind the drawer.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    /*
      Move focus into the drawer so the next Tab lands on its first link.

      Both arguments here are load bearing. The panel is parked at
      translate-x-full, so at the instant it is focused it is still outside the
      clipping frame, and a plain focus() makes the browser scroll it into view.
      That scroll lands it at its final position immediately and the slide never
      plays: the drawer appears to jump straight to open. preventScroll stops
      that. The rAF then holds the focus call back until after the browser has
      painted the closed position, so there is a frame to transition from
      rather than a style change and a focus in the same tick.
    */
    const focusFrame = requestAnimationFrame(() => {
      panelRef.current?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="transition-opacity duration-150 hover:opacity-80"
        >
          <Logo className="h-6 sm:h-7" priority />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-7 md:flex">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] text-dust transition-colors duration-150 hover:text-chalk"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-dust/30 px-4 py-2 whitespace-nowrap text-[0.95rem] text-chalk transition-colors duration-150 hover:border-chalk/50"
          >
            Get in touch
            <HandoverMark className="size-4 shrink-0" />
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Open menu"
          className="ml-auto grid size-11 place-items-center rounded-md text-chalk transition-colors duration-150 hover:text-warmlight md:hidden"
        >
          <RunSheetMark className="size-6" />
        </button>
        </div>
      </header>

      {/*
        A fixed, viewport-sized clipping frame around the drawer.

        Parked off screen at translate-x-full, the drawer is real layout sitting
        to the right of the viewport, and it grows the document's scrollable
        width. `overflow-x: clip` on the root is not enough on its own: the page
        could still be scrolled 28px sideways, which is what made swiping a
        card rail drag the whole layout. Clipping it here removes the overflow
        at source rather than trying to suppress the symptom.
      */}
      <div
        className={`fixed inset-0 z-40 overflow-hidden md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        {/* Backdrop. Dismisses on tap, and is inert while the drawer is closed. */}
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          id={menuId}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal={open}
        aria-label="Menu"
        // inert keeps the offscreen drawer out of the tab order without
        // removing it from the HTML that crawlers read.
        inert={!open}
          className={`absolute top-0 right-0 h-full w-[90%] border-l border-dust/15 bg-stage transition-transform duration-300 ease-out outline-none ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-dust/10 px-5 py-4">
            <Logo className="h-6" />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-md text-chalk transition-colors duration-150 hover:text-warmlight"
            >
              <CrossMark className="size-6" />
            </button>
          </div>

          {/*
            A column, so the call to action can sit at the bottom of the screen
            rather than immediately under the last link. On a phone that is where
            the thumb already is.
          */}
          <nav
            aria-label="Main"
            className="flex h-[calc(100%-4.5rem)] flex-col px-5 pt-2 pb-8"
          >
            {headerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center text-lg text-chalk"
              >
                <span className="underline decoration-dust/40 underline-offset-[6px] transition-colors duration-150 hover:decoration-warmlight">
                  {item.label}
                </span>
              </Link>
            ))}

            <div className="mt-auto flex flex-col gap-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-warmlight px-7 font-medium text-ink"
              >
                Get in touch
                <HandoverMark className="size-4 shrink-0" />
              </Link>

              {/* Icon only here. The names are spelled out in the footer, and a
                  drawer wants the shortest row it can get away with. */}
              <div className="flex items-center justify-center gap-6">
                {site.socialLinks.map((profile) => {
                  const Mark = SOCIAL_MARKS[profile.name];
                  return (
                    <a
                      key={profile.href}
                      href={profile.href}
                      rel="me noopener noreferrer"
                      target="_blank"
                      onClick={() => setOpen(false)}
                      aria-label={`${profile.name}, opens in a new tab`}
                      className="grid size-11 place-items-center rounded-md text-dust transition-colors duration-150 hover:text-chalk"
                    >
                      <Mark className="size-[1.35rem]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
