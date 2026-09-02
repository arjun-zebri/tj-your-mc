import type { EnquiryField } from "@/content/zebri";

/**
 * The shape passed between the enquiry form and its server action.
 *
 * This lives outside app/actions.ts on purpose. A "use server" module may only
 * export async functions, so exporting the initial state from there compiles
 * but arrives as undefined in the client component.
 */
export type EnquiryState = {
  status: "idle" | "success" | "error";
  /** Errors sit next to their field, in words. Never colour alone. */
  fieldErrors: Partial<Record<EnquiryField, string>>;
  /** Shown in the error summary. Empty on success. */
  formError: string;
  /**
   * What the person typed, echoed back to repopulate the fields.
   *
   * React 19 resets an uncontrolled form once its action completes, so without
   * this a failed submit clears everything they entered. Somebody who has just
   * filled in six fields at 11pm does not type them again, which loses the lead
   * about as effectively as failing silently does.
   */
  values: Partial<Record<EnquiryField, string>>;
  /** Bumped on every failed attempt and used as the form key, so the fields remount carrying `values`. */
  attempt: number;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  fieldErrors: {},
  formError: "",
  values: {},
  attempt: 0,
};
