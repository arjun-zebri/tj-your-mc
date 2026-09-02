/**
 * JSON-LD builders.
 *
 * Templates and the rules about what must never be emitted live in
 * .claude/skills/local-seo-pages/references/schema-templates.md
 *
 * The entity nodes are declared once in the root graph and every page node links
 * back by @id. This is why a page cannot describe TJ differently from the page
 * next to it. Every entity string comes from content/site.ts.
 */

import { absoluteUrl, site } from "@/content/site";
import { readyFaqs } from "@/content/faqs";

export const ids = {
  website: `${site.url}/#website`,
  business: `${site.url}/#business`,
  person: `${site.url}/#tj`,
} as const;

type JsonLd = Record<string, unknown>;

/**
 * The nodes that never change, rendered once in the root layout.
 *
 * ProfessionalService rather than LocalBusiness because TJ travels to venues and
 * does not trade from a shopfront. No address, no openingHours, no telephone: a
 * service business with no premises should not pretend to have any of them.
 *
 * No image yet. Every asset in .claude/docs/05-assets.md is still unlicensed and
 * the pre-launch gate says nothing unlicensed ships. Add "image" here the moment
 * og-default.jpg clears.
 */
export function rootGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: site.url,
        name: site.businessName,
        inLanguage: site.locale,
        publisher: { "@id": ids.business },
      },
      {
        "@type": "ProfessionalService",
        "@id": ids.business,
        name: site.businessName,
        url: site.url,
        email: site.email,
        description: site.shortDescription,
        areaServed: {
          "@type": "City",
          name: site.serviceArea.city,
          containedInPlace: {
            "@type": "State",
            name: site.serviceArea.state,
          },
        },
        founder: { "@id": ids.person },
        sameAs: site.socialLinks.map((profile) => profile.href),
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.personName,
        jobTitle: site.jobTitle,
        url: absoluteUrl("/about"),
        worksFor: { "@id": ids.business },
        knowsLanguage: site.locale,
      },
    ],
  };
}

/** One Service node per service page. One service per page, matching the one topic per URL rule. */
export function serviceSchema(input: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  audience: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    provider: { "@id": ids.business },
    areaServed: { "@type": "City", name: site.serviceArea.city },
    audience: {
      "@type": "Audience",
      audienceType: input.audience,
    },
    // No "offers" key. The prices currently on the site are placeholders, and
    // `hasPlaceholderPricing` in content/packages.ts gates this. Displaying a
    // wrong price is recoverable. Handing one to Google as structured data puts
    // it into results and rich snippets, where it outlives the fix.
  };
}

/**
 * Built from content/faqs.ts so the markup and the visible list can never
 * disagree. Returns null when nothing is answered yet, because an empty
 * FAQPage is worse than no FAQPage.
 */
export function faqSchema(path: string): JsonLd | null {
  if (readyFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: readyFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Breadcrumbs on every page below the root. Generate from the route, never hand write. */
export function breadcrumbSchema(
  trail: ReadonlyArray<{ label: string; href: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}
