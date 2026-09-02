import { readyFaqs } from "@/content/faqs";

/**
 * Rendered plainly, not inside an accordion. This is the highest value block on
 * the page for answer engines, and every answer is written to stand on its own
 * without the ones around it. Hiding it behind a click serves nobody.
 *
 * Sits above the form on purpose. It handles objections at the moment someone
 * is deciding whether to enquire.
 */
export function Faq({ heading = "Questions couples ask me" }: { heading?: string }) {
  if (readyFaqs.length === 0) return null;

  return (
    <section aria-labelledby="faq" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <h2 id="faq" className="max-w-2xl text-display-sm font-semibold sm:text-display-md">
        {heading}
      </h2>

      <dl className="mt-14 flex flex-col gap-12">
        {readyFaqs.map((faq) => (
          <div key={faq.question} className="border-t border-dust/15 pt-6 md:flex md:gap-12">
            <dt className="font-[family-name:var(--font-display)] text-xl font-semibold text-chalk md:w-2/5 md:shrink-0">
              {faq.question}
            </dt>
            <dd className="mt-3 max-w-measure text-dust md:mt-0">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
