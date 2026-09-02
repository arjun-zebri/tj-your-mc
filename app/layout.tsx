import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { CustomCursor } from "@/components/CustomCursor";
import { JsonLd } from "@/components/JsonLd";
import { SiteLoader } from "@/components/loaders";
import { NightSky } from "@/components/NightSky";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { rootGraph } from "@/lib/schema";

import "./globals.css";

/*
  Two families, clearly different jobs. Both loaded through next/font/google, so
  they are self hosted at build time with no external request and no layout
  shift.
*/
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Every route sets its own title. This template only catches pages that forget.
    default: `${site.businessName}, wedding MC in Sydney`,
    template: `%s | ${site.businessName}`,
  },
  description: site.shortDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.ogLocale,
    siteName: site.businessName,
    url: site.url,
    // No "images" yet. Every asset is still unlicensed per .claude/docs/05-assets.md.
    // Add og-default.jpg at 1200x630 once it clears. The old site shipped a
    // 372x488 portrait that crops badly in every share preview.
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#141018",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={site.locale} className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-warmlight focus:px-4 focus:py-2 focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <SiteLoader />
        <NightSky />
        <SiteHeader />
        {children}
        <SiteFooter />
        <CustomCursor />
        <JsonLd data={rootGraph()} />
      </body>
    </html>
  );
}
