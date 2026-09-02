import Link from "next/link";

import { FacebookMark, InstagramMark, MailMark, TikTokMark } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { primaryNav } from "@/content/nav";
import { site } from "@/content/site";

/** One mark per profile, keyed by the name in content/site.ts. */
const SOCIAL_MARKS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  Instagram: InstagramMark,
  Facebook: FacebookMark,
  TikTok: TikTokMark,
};

/**
 * Three columns, each doing one job: who and where, where to go, how to reach
 * him. Nothing appears twice.
 *
 * Footer copy is neutral rather than first person. Booking admin does not need
 * to be TJ talking.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-dust/10 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-12">
          {/* Who, and where he works. The service area lives here and nowhere else. */}
          <div className="max-w-xs">
            <Logo className="h-7" />
            <p className="mt-4 text-[0.95rem] text-dust">
              Wedding and event MC, working across {site.serviceArea.city} and greater{" "}
              {site.serviceArea.state}. I travel to your venue, so there is no office to visit.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2 sm:gap-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.95rem] text-dust transition-colors duration-150 hover:text-chalk"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-[0.95rem] text-dust transition-colors duration-150 hover:text-chalk"
            >
              Get in touch
            </Link>
          </nav>

          {/* Every way of reaching him, in one list. Email first, it is the one that matters. */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2.5 text-[0.95rem] text-chalk transition-colors duration-150 hover:text-warmlight"
            >
              <MailMark className="size-[1.15rem] shrink-0" />
              {site.email}
            </a>

            {site.socialLinks.map((profile) => {
              const Mark = SOCIAL_MARKS[profile.name];
              return (
                <a
                  key={profile.href}
                  href={profile.href}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center gap-2.5 text-[0.95rem] text-dust transition-colors duration-150 hover:text-chalk"
                >
                  <Mark className="size-[1.15rem] shrink-0" />
                  {profile.name}
                  <span className="sr-only">Opens in a new tab</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
