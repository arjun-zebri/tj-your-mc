"use client";

import { useActionState } from "react";

import { submitEnquiry } from "@/app/actions";
import { initialEnquiryState } from "@/lib/enquiry-state";
import { DateField } from "@/components/form/DateField";
import { Field } from "@/components/form/Field";
import { Submit } from "@/components/form/Submit";
import { TickMark } from "@/components/icons";
import { site } from "@/content/site";

/** The canonical enquiry form. Lives on /contact with its own URL so it can be linked and shared. */
export function EnquiryForm() {
  const [state, action] = useActionState(submitEnquiry, initialEnquiryState);

  if (state.status === "success") {
    return <Confirmation />;
  }

  return (
    <form key={state.attempt} action={action} noValidate className="flex flex-col gap-5">
      {state.formError && (
        <div
          role="alert"
          className="rounded-lg border border-warmlight/40 bg-warmlight/5 px-4 py-3 text-[0.95rem] text-chalk"
        >
          <p>{state.formError}</p>
          {state.formError === "That did not send." && (
            <p className="mt-1 text-dust">
              Try again, or email me directly at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-warmlight underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              and I will pick it up.
            </p>
          )}
        </div>
      )}

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
              : "That does not look like an email address. Check it for me."
        }
      />

      <DateField
        defaultValue={state.values.eventDate}
        name="eventDate"
        label="Date of your wedding or event"
        required
        error={state.fieldErrors.eventDate}
      />

      <Field
        defaultValue={state.values.venue}
        name="venue"
        label="Venue or suburb"
        required
        hint="If you have not locked the venue in yet, the suburb is plenty."
        error={state.fieldErrors.venue}
        validate={(value) => (value ? "" : "Even just the suburb helps.")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field defaultValue={state.values.phone} name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Field defaultValue={state.values.guestCount} name="guestCount" label="Rough guest count" type="number" />
      </div>

      <Field
        defaultValue={state.values.message}
        name="message"
        label="Anything else you want me to know"
        multiline
      />

      <div className="mt-1">
        <Submit label="Get in touch" pendingLabel="Sending" />
      </div>
    </form>
  );
}

function Confirmation() {
  return (
    <div role="status" className="flex gap-4">
      <TickMark className="mt-1 size-6 shrink-0 text-warmlight" />
      <div>
        <p className="font-[family-name:var(--font-display)] text-2xl text-chalk">Got it.</p>
        <p className="mt-2 text-dust">
          {site.responseTime
            ? `I will come back to you within ${site.responseTime}.`
            : "I will come back to you as soon as I can."}{" "}
          I will usually ask about your venue, your running order, and roughly how many people
          you are having.
        </p>
      </div>
    </div>
  );
}
