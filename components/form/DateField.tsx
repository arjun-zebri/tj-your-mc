"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { CalendarMark, CircledMark, HandoverMark } from "@/components/icons";

/**
 * A custom date picker.
 *
 * The native control was replaced because it renders as a grey Chrome widget
 * that ignores every token on this site, and because the date is the single
 * most important field on the form. TJ's first question on any enquiry is
 * whether he is free, so this field earns the attention.
 *
 * The real value is carried by a hidden input so the surrounding server action
 * reads it from FormData exactly like any other field. The visible control is a
 * button, never a div with an onClick.
 *
 * Keyboard: arrows move by a day or a week, PageUp and PageDown move by a
 * month, Home and End jump to the ends of the week, Enter or Space selects, and
 * Escape closes and returns focus to the trigger.
 */

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const monthLabel = new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric" });
const fullDate = new Intl.DateTimeFormat("en-AU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const shortDate = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Local date parts, not toISOString, which shifts the day either side of UTC. */
function toIso(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function fromIso(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

/** Six weeks from the Monday on or before the first of the month. Fixed height, so the popover never jumps. */
function buildGrid(month: Date): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  // getDay is Sunday-first. Australian calendars start on Monday.
  const offset = (first.getDay() + 6) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
}

export function DateField({
  name,
  label,
  required = false,
  error,
  defaultValue = "",
  hint,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const [selected, setSelected] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState("");
  const [focusedDay, setFocusedDay] = useState<Date>(
    () => fromIso(defaultValue) ?? startOfDay(new Date()),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => startOfDay(new Date()), []);
  const viewMonth = useMemo(
    () => new Date(focusedDay.getFullYear(), focusedDay.getMonth(), 1),
    [focusedDay],
  );
  const days = useMemo(() => buildGrid(viewMonth), [viewMonth]);

  const selectedDate = fromIso(selected);
  const shown = error || localError;

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Move focus onto the active day whenever the grid opens or the day changes.
  useEffect(() => {
    if (!open) return;
    const active = gridRef.current?.querySelector<HTMLButtonElement>('[data-active="true"]');
    active?.focus();
  }, [open, focusedDay]);

  function choose(date: Date) {
    setSelected(toIso(date));
    setLocalError("");
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onGridKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };

    if (event.key in moves) {
      event.preventDefault();
      setFocusedDay((day) => addDays(day, moves[event.key]));
      return;
    }

    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      setFocusedDay((day) => {
        const next = addMonths(day, event.key === "PageUp" ? -1 : 1);
        // Keep the day of the month where the target month is long enough.
        const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
        return new Date(next.getFullYear(), next.getMonth(), Math.min(day.getDate(), lastDay));
      });
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setFocusedDay((day) => {
        const weekday = (day.getDay() + 6) % 7;
        return addDays(day, event.key === "Home" ? -weekday : 6 - weekday);
      });
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="mb-1.5 block text-[0.95rem] text-chalk">
        {label}
        {!required && <span className="ml-2 text-dust">Optional</span>}
      </label>

      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-dust">
          {hint}
        </p>
      )}

      {/* The value the form actually submits. */}
      <input type="hidden" name={name} value={selected} />

      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onBlur={(event) => {
          // Opening the picker moves focus into the popover, which fires blur on
          // this trigger. Validating there would flash an error the instant
          // somebody clicks the field, before they have had any chance to
          // answer. Only validate when focus actually leaves the whole control.
          if (containerRef.current?.contains(event.relatedTarget as Node | null)) return;
          if (required && !selected) setLocalError("I need the date to tell you if I am free.");
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={
          [shown ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined
        }
        className={`flex w-full items-center gap-3 rounded-lg border bg-ink/60 px-4 py-3 text-left transition-colors duration-150 ${
          shown ? "border-warmlight/70" : "border-dust/25 hover:border-dust/40"
        }`}
      >
        <CalendarMark className="size-5 shrink-0 text-dust" />
        <span className={selectedDate ? "text-chalk" : "text-dust/60"}>
          {selectedDate ? shortDate.format(selectedDate) : "Pick your date"}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className="absolute top-full left-0 z-30 mt-2 w-[19.5rem] rounded-xl border border-dust/20 bg-stage p-4 shadow-2xl shadow-ink/60"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setFocusedDay((day) => addMonths(day, -1))}
              aria-label="Previous month"
              className="grid size-9 place-items-center rounded-md text-dust transition-colors duration-150 hover:text-chalk"
            >
              <HandoverMark className="size-4 rotate-180" />
            </button>

            <p aria-live="polite" className="font-[family-name:var(--font-display)] text-chalk">
              {monthLabel.format(viewMonth)}
            </p>

            <button
              type="button"
              onClick={() => setFocusedDay((day) => addMonths(day, 1))}
              aria-label="Next month"
              className="grid size-9 place-items-center rounded-md text-dust transition-colors duration-150 hover:text-chalk"
            >
              <HandoverMark className="size-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1 text-center text-xs text-dust">
                {day.charAt(0)}
              </div>
            ))}
          </div>

          {/* Key handling sits on the container; the day cells are real buttons. */}
          <div ref={gridRef} onKeyDown={onGridKeyDown} className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const iso = toIso(day);
              const outside = day.getMonth() !== viewMonth.getMonth();
              const isPast = day < today;
              const isSelected = iso === selected;
              const isToday = iso === toIso(today);
              const isActive = iso === toIso(focusedDay);

              return (
                <button
                  key={iso}
                  type="button"
                  data-active={isActive}
                  // Roving tabindex: one stop for the whole grid, arrows do the rest.
                  tabIndex={isActive ? 0 : -1}
                  disabled={isPast}
                  aria-current={isToday ? "date" : undefined}
                  aria-pressed={isSelected}
                  aria-label={fullDate.format(day)}
                  onClick={() => choose(day)}
                  onFocus={() => setFocusedDay(day)}
                  className={`grid aspect-square place-items-center rounded-md text-sm transition-colors duration-150 ${
                    isSelected
                      ? "bg-warmlight font-medium text-ink"
                      : isPast
                        ? "cursor-not-allowed text-dust/25"
                        : outside
                          ? "text-dust/45 hover:bg-chalk/5"
                          : "text-chalk hover:bg-chalk/10"
                  } ${isToday && !isSelected ? "ring-1 ring-dust/40 ring-inset" : ""}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <p className="mt-3 border-t border-dust/10 pt-3 text-xs text-dust">
            Not locked in yet? Pick the closest date and tell me in the notes.
          </p>
        </div>
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
