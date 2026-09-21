import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — ${site.role} at ${site.company}.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: "KalamPinjar", href: site.socials.github },
  { label: "LinkedIn", value: "kalam-pinjar", href: site.socials.linkedin },
  { label: "Resume", value: "PDF, one page", href: site.resume },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_50%_at_25%_10%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 pt-32 pb-24 sm:pt-40 lg:px-12">
        <header>
          <p className="label text-accent">Contact</p>
          <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">
            Let&rsquo;s talk
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-fg-2">
            Full-time roles, contract work, freelance briefs, or a question
            about something in the work section — all welcome. I work across
            frontend and backend, so tell me what you are building and where
            you need a hand.
          </p>
        </header>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <p className="label text-fg-3">Direct</p>
            <dl className="mt-6 flex flex-col">
              {channels.map((channel) => (
                <div key={channel.label} className="border-t border-line py-4">
                  <dt className="label text-fg-3">{channel.label}</dt>
                  <dd className="mt-1.5">
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors hover:text-accent"
                    >
                      {channel.value}
                      <ArrowUpRight
                        className="size-3 text-fg-3 transition-transform duration-250 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 rounded-card border border-line bg-surface p-5">
              <p className="label text-accent">Response time</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">
                Usually within a day. I am in {site.location} — IST, so if you
                are in North America expect a reply while you sleep.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
