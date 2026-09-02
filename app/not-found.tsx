import Link from "next/link";

import { site } from "@/content/site";

/**
 * A real 404 rather than Next's default.
 *
 * The old WordPress site generates attachment pages, tag archives and
 * paginated URLs that are not in the navigation and may well be indexed. Some
 * of them will land here after cutover, so this page has to do a job: say what
 * happened, and put the person one tap from checking a date.
 *
 * Empty and error states are direction, not mood.
 */
export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <h1 className="max-w-[16ch] text-display-sm font-semibold sm:text-display-md">
        That page is not here any more
      </h1>

      <p className="mt-8 max-w-measure text-lg text-dust">
        The site was rebuilt recently and a few old links did not survive it. Nothing you did
        wrong.
      </p>

      <nav aria-label="Where to next" className="mt-12 flex flex-col gap-4">
        {[
          { href: "/wedding-mc", label: "How I run a wedding reception" },
          { href: "/about", label: "Who I am" },
          { href: "/contact", label: "Check whether I am free on your date" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="max-w-measure border-t border-dust/15 pt-4 text-chalk transition-colors duration-150 hover:text-warmlight"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="mt-12 max-w-measure text-dust">
        Or email me at{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
        >
          {site.email}
        </a>
        .
      </p>
    </main>
  );
}
