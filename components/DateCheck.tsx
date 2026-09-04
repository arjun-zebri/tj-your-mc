"use client";

import { useActionState } from "react";

import { submitDateCheck } from "@/app/actions";
import { initialEnquiryState } from "@/lib/enquiry-state";
import { DateField } from "@/components/form/DateField";
import { Field } from "@/components/form/Field";
import { SpamGuard, useRenderedAt } from "@/components/form/SpamGuard";
import { Submit } from "@/components/form/Submit";
import { TickMark } from "@/components/icons";
import { site } from "@/content/site";

/**
 * The compact homepage date check. Three fields, posting to the same pipeline
 * with its own source value so we can measure it against the contact page.
 *
 * Deliberately not a second copy of the full form. One form, one place, one set
 * of analytics, and this one exists only to catch the person who will not
 * navigate.
 */
export function DateCheck() {
  const [state, action] = useActionState(submitDateCheck, initialEnquiryState);
  // Captured once, outside the form, so a failed attempt does not reset it.
  const stamp = useRenderedAt();

  if (state.status === "success") {
    return (
      <div role="status" className="flex gap-4">
        <TickMark className="mt-1 size-6 shrink-0 text-warmlight" />
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-chalk">
            Got it.
          </p>
          <p className="mt-2 text-dust">
            {site.responseTime
              ? `I will check your date and come back to you within ${site.responseTime}, either way.`
              : "I will check your date and come back to you either way."}{" "}
            If I am already booked I would rather you knew now than in three
            weeks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      key={state.attempt}
      action={action}
      noValidate
      className="relative flex flex-col gap-5"
    >
      <SpamGuard stamp={stamp} />

      {state.formError && (
        <div
          role="alert"
          className="rounded-lg border border-warmlight/40 bg-warmlight/5 px-4 py-3 text-[0.95rem] text-chalk"
        >
          <p>{state.formError}</p>
          {state.offerEmail && (
            <p className="mt-1 text-dust">
              Try again, or email me directly at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-warmlight underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </p>
          )}
        </div>
      )}

      <DateField
        defaultValue={state.values.eventDate}
        name="eventDate"
        label="Your date"
        required
        error={state.fieldErrors.eventDate}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          defaultValue={state.values.name}
          name="name"
          label="Your name"
          autoComplete="name"
          required
          error={state.fieldErrors.name}
          validate={(value) => (value ? "" : "Let me know what to call you.")}
        />
        <Field
          defaultValue={state.values.email}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={state.fieldErrors.email}
          validate={(value) =>
            !value
              ? "I need an email address to reply to."
              : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
                ? ""
                : "That does not look like an email address."
          }
        />
      </div>

      <div className="mt-1">
        <Submit label="Get in touch" pendingLabel="Sending" />
      </div>
    </form>
  );
}
