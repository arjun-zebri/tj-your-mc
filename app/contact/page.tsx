import type { Metadata } from "next";
import Link from "next/link";

import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, site } from "@/content/site";
import { breadcrumbSchema, ids } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Send me your date and venue and I will let you know if I am free. No obligation, and I would rather tell you early than have you waiting.",
  alternates: { canonical: "/contact" },
};

/** The canonical enquiry form. Every other page links here rather than duplicating the embed. */
export default function ContactPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
        <div>
          <h1 className="max-w-[12ch] text-display-sm font-semibold sm:text-display-md">
            Get in touch
          </h1>
          <p className="mt-8 max-w-measure text-lg text-dust">
            Send me your date and venue and I will let you know if I am free. No obligation, and
            I would rather tell you early than have you waiting.
          </p>
          <p className="mt-6 max-w-measure text-dust">
            If you would rather just email,{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
            >
              {site.email}
            </a>{" "}
            comes straight to me.
          </p>
          <p className="mt-6 max-w-measure text-dust">
            Not sure whether you need an MC or a Celebrant? Your Celebrant marries you and
            lodges the paperwork. I run the reception. Most Sydney weddings book both. Have a
            look at{" "}
            <Link
              href="/wedding-mc"
              className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
            >
              how I run a reception
            </Link>
            , or{" "}
            <Link
              href="/about"
              className="text-chalk underline decoration-dust/40 underline-offset-4 transition-colors duration-150 hover:decoration-warmlight"
            >
              who I am
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl bg-stage px-5 py-10 sm:px-10 sm:py-12">
          <EnquiryForm />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${absoluteUrl("/contact")}#page`,
          isPartOf: { "@id": ids.website },
          about: { "@id": ids.business },
          inLanguage: site.locale,
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Get in touch", href: "/contact" },
        ])}
      />
    </main>
  );
}
