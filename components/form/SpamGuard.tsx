"use client";

import { useCallback, useRef } from "react";

import { honeypotField, renderedAtField } from "@/content/zebri";

type StampRef = (node: HTMLInputElement | null) => void;

/**
 * Stamps the moment the enquiry form mounted in this browser onto the hidden
 * field Zebri reads.
 *
 * Call it in the component that owns the form, never inside the form itself.
 * The form remounts after a failed attempt, and a fresh timestamp on the second
 * try would put a quick resubmit inside Zebri's two second speed trap. Zebri
 * answers a suspected bot with a 200 and stores nothing, so the enquiry would
 * look sent and never arrive. Held here, the first time survives every retry.
 *
 * Written to the DOM rather than rendered, so the value is the visitor's own
 * clock rather than whatever the server thought the time was.
 */
export function useRenderedAt(): StampRef {
  const renderedAt = useRef(0);

  return useCallback((node: HTMLInputElement | null) => {
    if (!node) return;
    if (renderedAt.current === 0) renderedAt.current = Date.now();
    node.value = String(renderedAt.current);
  }, []);
}

/**
 * Zebri's two spam checks, carried on every enquiry.
 *
 * The honeypot is a text input no person ever sees or reaches. Anything typed
 * into it means a bot filled the form in, and Zebri drops the lead.
 *
 * Without JavaScript the timestamp submits as zero and the server action
 * substitutes a time that clears the trap, so an enquiry is never lost to the
 * spam check itself.
 */
export function SpamGuard({ stamp }: { stamp: StampRef }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden"
    >
      <input
        type="text"
        name={honeypotField}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
      <input
        type="hidden"
        name={renderedAtField}
        defaultValue="0"
        ref={stamp}
      />
    </div>
  );
}
