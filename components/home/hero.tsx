import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { DecodeText } from "./decode-text";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Decorative field — masked so it reads as depth, not wallpaper. */}
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:px-12">
        {/* Availability */}
        <div
          className="flex flex-wrap items-center gap-x-2.5 gap-y-1 opacity-0"
          style={{ animation: "fade-up 600ms var(--ease-entrance) 100ms forwards" }}
        >
          <span className="relative flex size-2">
            <span className="animate-pulse-dot absolute inline-flex size-full rounded-full bg-signal" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          <span className="label text-fg-2">
            Available · {site.availability.short}
          </span>
        </div>

        <h1 className="mt-7 font-display text-[clamp(2.75rem,9vw,6rem)] leading-[0.95] font-bold tracking-[-0.03em]">
          <span
            className="block opacity-0"
            style={{ animation: "fade-up 700ms var(--ease-entrance) 200ms forwards" }}
          >
            <DecodeText text="Kalam Pinjar" />
          </span>
        </h1>

        <p
          className="label mt-6 text-accent opacity-0"
          style={{ animation: "fade-up 700ms var(--ease-entrance) 400ms forwards" }}
        >
          {site.role} · currently at {site.company}
        </p>

        <p
          className="mt-6 max-w-[56ch] text-[clamp(1.05rem,1.8vw,1.35rem)] leading-relaxed text-fg-2 opacity-0"
          style={{ animation: "fade-up 700ms var(--ease-entrance) 520ms forwards" }}
        >
          {site.thesis} I came to this through a{" "}
          <span className="text-fg">cyber security degree</span>, which is why
          the work below tends to involve the parts most portfolios skip.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-3 opacity-0"
          style={{ animation: "fade-up 700ms var(--ease-entrance) 640ms forwards" }}
        >
          <Button asChild size="lg">
            <Link href="/work">
              View the work
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              Get in touch
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Facts strip — leads with availability, because that is what a
            visitor with a role to fill is actually scanning for. */}
        <dl
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 opacity-0 sm:grid-cols-4"
          style={{ animation: "fade-up 700ms var(--ease-entrance) 760ms forwards" }}
        >
          <Fact label="Open to" value="Full-time · Contract" />
          <Fact label="Works across" value="Frontend · Backend" />
          <Fact label="Background" value="Cyber Security" />
          <Fact label="Based in" value="Navi Mumbai" />
        </dl>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-fg-3">{label}</dt>
      <dd className="mt-1.5 font-display text-lg font-semibold tracking-tight text-fg">
        {value}
      </dd>
    </div>
  );
}
