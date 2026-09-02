"use client";

import { useFormStatus } from "react-dom";

import { HandoverMark } from "@/components/icons";

/**
 * The button says what happens next, and it says the same words as the form
 * heading and the confirmation message.
 *
 * Width is fixed while submitting so the label change causes no layout shift.
 */
export function Submit({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-warmlight px-7 font-medium text-ink transition-[background-color,opacity] duration-150 hover:bg-warmlight/90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? pendingLabel : label}
      {/* Sits in both states: the arrow means "send", which is still true mid-send. */}
      <HandoverMark className="size-4 shrink-0" />
    </button>
  );
}
