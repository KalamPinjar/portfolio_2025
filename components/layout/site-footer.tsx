import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              Kalam<span className="text-accent">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-fg-2">
              {site.role}, currently at {site.company}.{" "}
              {site.availability.long}
            </p>
          </div>

          <div className="flex gap-12">
            <nav className="flex flex-col gap-2">
              <p className="label mb-1 text-fg-3">Pages</p>
              <Link href="/work" className="text-sm text-fg-2 hover:text-accent">
                Work
              </Link>
              <Link href="/about" className="text-sm text-fg-2 hover:text-accent">
                About
              </Link>
              <Link href="/contact" className="text-sm text-fg-2 hover:text-accent">
                Contact
              </Link>
            </nav>

            <nav className="flex flex-col gap-2">
              <p className="label mb-1 text-fg-3">Elsewhere</p>
              <FooterLink href={site.socials.github}>GitHub</FooterLink>
              <FooterLink href={site.socials.linkedin}>LinkedIn</FooterLink>
              <FooterLink href={site.resume}>Resume</FooterLink>
              <FooterLink href={`mailto:${site.email}`}>Email</FooterLink>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-fg-3">
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <p className="label text-fg-3">
            Built with Next.js · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-sm text-fg-2 transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRight
        className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
    </a>
  );
}
