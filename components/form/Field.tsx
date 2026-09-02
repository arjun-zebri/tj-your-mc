"use client";

import { useId, useState } from "react";

import { CircledMark } from "@/components/icons";

type FieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number";
  autoComplete?: string;
  required?: boolean;
  /** Server error for this field. Wins over the client's own blur validation. */
  error?: string;
  /** Runs on blur, not on every keystroke. Nagging while someone types is hostile. */
  validate?: (value: string) => string;
  multiline?: boolean;
  hint?: string;
  /** Repopulates the field after a failed submit. See lib/enquiry-state.ts. */
  defaultValue?: string;
};

export function Field({
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
  error,
  validate,
  multiline = false,
  hint,
  defaultValue,
}: FieldProps) {
  const id = useId();
  const [localError, setLocalError] = useState("");

  const shown = error || localError;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [shown ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id,
    name,
    required,
    defaultValue,
    autoComplete,
    "aria-invalid": shown ? true : undefined,
    "aria-describedby": describedBy || undefined,
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (validate) setLocalError(validate(event.target.value.trim()));
    },
    className:
      "w-full rounded-lg border bg-ink/60 px-4 py-3 text-chalk placeholder:text-dust/50 transition-colors duration-150 " +
      (shown ? "border-warmlight/70" : "border-dust/25 hover:border-dust/40"),
  };

  return (
    <div>
      {/* Labels sit above the field and stay visible. Placeholder-only labels disappear the moment someone types. */}
      <label htmlFor={id} className="mb-1.5 block text-[0.95rem] text-chalk">
        {label}
        {!required && <span className="ml-2 text-dust">Optional</span>}
      </label>

      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-dust">
          {hint}
        </p>
      )}

      {multiline ? (
        // Taller, and the drag handle is off: a resizable box breaks the panel
        // layout the moment somebody pulls it, and the field is already big
        // enough for what it asks for.
        <textarea {...shared} rows={6} className={`${shared.className} resize-none`} />
      ) : (
        <input {...shared} type={type} />
      )}

      {shown && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm text-warmlight">
          <CircledMark className="mt-0.5 size-4 shrink-0" />
          {shown}
        </p>
      )}
    </div>
  );
}
