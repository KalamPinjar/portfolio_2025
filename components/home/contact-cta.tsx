import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_70%_50%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 py-24 sm:py-32 lg:px-12">
        <Reveal>
          <p className="label text-accent">Next</p>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">
            Got something worth building?
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-fg-2">
            Full-time, contract, or a freelance brief — frontend, backend or
            the whole stack. The fastest way to reach me is email, and I reply
            to everything that is not a template.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a conversation
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="rounded-control px-4 py-3 font-mono text-sm text-fg-2 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
