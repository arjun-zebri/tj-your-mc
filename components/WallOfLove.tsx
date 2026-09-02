import { ReviewGroup } from "@/components/ReviewGroup";
import {
  testimonialGroups,
  testimonialsOfKind,
} from "@/content/testimonials";

/**
 * Two walls, not one.
 *
 * Couples are the emotional proof. Venue coordinators and suppliers are the
 * professional proof, and for an MC they are arguably worth more, because a
 * venue recommending you is a referral channel rather than a compliment.
 *
 * No Review or AggregateRating schema is emitted from this section while any
 * entry is a placeholder. The decision is logged in
 * .claude/docs/06-decisions.md: marking up invented reviews is what earns a
 * Google manual action. The stars people expect next to a testimonial belong on
 * TJ's Google Business Profile, not here.
 */
export function WallOfLove() {
  const groups = testimonialGroups
    .map((group) => ({ ...group, entries: testimonialsOfKind(group.kind) }))
    .filter((group) => group.entries.length > 0);

  if (groups.length === 0) return null;

  return (
    <section data-surface="light" aria-labelledby="wall" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <h2 id="wall" className="max-w-2xl text-display-sm font-semibold sm:text-display-md">
        People who were in the room
      </h2>

      <div className="mt-14 flex flex-col gap-16">
        {groups.map((group) => (
          <div key={group.kind}>
            <div className="flex flex-col gap-1 border-t border-ink/15 pt-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {group.heading}
              </h3>
              <p className="text-[0.95rem] text-ink/65">{group.blurb}</p>
            </div>

            <ReviewGroup entries={group.entries} visible={group.visible} />
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
