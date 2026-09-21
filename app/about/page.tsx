import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: site.bio,
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    period: "Nov 2024 — Present",
    title: site.experience.title,
    org: `${site.experience.company} · ${site.experience.location}`,
    body: site.experience.detail,
    current: true,
  },
  {
    period: "2024",
    title: "Built the projects that taught me the most",
    org: "Solo",
    body: "DocQuery, the commerce platform and the Discord clone all landed in the same stretch. Each one was chosen for a specific unknown — retrieval quality, multi-tenancy, and real-time transport.",
    current: false,
  },
  {
    period: "Sep 2021 — May 2024",
    title: site.education.degree,
    org: `${site.education.school} · ${site.education.result}`,
    body: "Three years of thinking about how systems fail before I spent any serious time making them look good. CipherWeb — ten cipher implementations in the browser — came out of this.",
    current: false,
  },
];

const toolbox = [
  {
    group: "Daily",
    items: [
      "TypeScript",
      "React 19",
      "Next.js",
      "Tailwind CSS",
      "NestJS",
      "Node.js",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    group: "Reach for often",
    items: [
      "tRPC",
      "Zod",
      "Playwright",
      "Stripe",
      "Clerk / Kinde",
      "Socket.IO",
      "REST design",
      "Git / GitHub",
    ],
  },
  {
    group: "Cloud & infrastructure",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Linux",
      "WSL",
      "Vercel",
      "Firebase",
      "CI/CD pipelines",
      "GitLab CI",
    ],
  },
  {
    group: "Also shipped with",
    items: [
      "React Native / Expo",
      "LiveKit",
      "Pinecone",
      "LangChain",
      "Inngest",
      "MongoDB",
      "Material UI",
      "Figma",
    ],
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ---------- Intro ---------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_25%_15%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 pt-32 pb-20 sm:pt-40 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="label text-accent">About</p>
              <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">
                I got here backwards
              </h1>

              <div className="mt-8 flex max-w-[60ch] flex-col gap-5 text-lg leading-relaxed text-fg-2">
                <p>
                  Most developers start at the interface and work inwards, or
                  at the database and work outwards. I started with a cyber
                  security degree — three years spent studying the ways systems
                  get broken — and only then found out that the part I actually
                  enjoyed was building them.
                </p>
                <p>
                  That order left a mark. I am uneasy about trusting the client,
                  I validate at boundaries out of reflex, and when I build a
                  checkout or an auth flow my first question is which failure
                  costs real money. That instinct is worth as much on the
                  server as it is in the browser, which is a large part of why
                  I stopped drawing a line between the two.
                </p>
                <p>
                  Today I work across the stack at{" "}
                  <span className="text-fg">Tech Sonic</span> — Next.js on the
                  front, NestJS and Postgres behind it — and I write Playwright
                  tests for the paths I would hate to break. Outside work I
                  build the things in{" "}
                  <Link href="/work" className="text-accent underline-offset-4 hover:underline">
                    the work section
                  </Link>{" "}
                  — usually to answer one question I do not yet know the answer
                  to.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">
                    Get in touch
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={site.resume} target="_blank" rel="noopener noreferrer">
                    Download resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full max-w-[300px]">
                <div className="relative aspect-[9/16] overflow-hidden rounded-card border border-line-strong">
                  <Image
                    src="/images/my-pic2.jpg"
                    alt={`Portrait of ${site.fullName}`}
                    width={512}
                    height={911}
                    sizes="(max-width: 1024px) 300px, 300px"
                    className="size-full object-cover contrast-[1.05] grayscale-[0.35]"
                    priority
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 mix-blend-color bg-accent/15"
                  />
                </div>

                <dl className="mt-6 flex flex-col gap-3 font-mono text-[12px]">
                  <Row label="Based" value={site.location} />
                  <Row
                    label="Currently"
                    value={`${site.experience.title}, ${site.company}`}
                  />
                  <Row label="Open to" value="Full-time · Contract" />
                  <Row label="Works across" value="Frontend · Backend" />
                  <Row label="Degree" value="Cyber Security" />
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-24 lg:px-12">
          <Reveal>
            <p className="label text-accent">Timeline</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] font-bold tracking-[-0.02em]">
              How the order went
            </h2>
          </Reveal>

          <ol className="mt-14 flex flex-col">
            {timeline.map((entry, i) => (
              <Reveal as="li" key={entry.period} index={i}>
                <div className="grid gap-4 border-t border-line py-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-3">
                    <p className="label flex items-center gap-2 text-fg-3 tabular">
                      {entry.current && (
                        <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-signal" />
                      )}
                      {entry.period}
                    </p>
                  </div>
                  <div className="lg:col-span-9">
                    <h3 className="font-display text-xl font-bold tracking-tight text-fg">
                      {entry.title}
                    </h3>
                    <p className="mt-1 font-mono text-[12px] text-accent">
                      {entry.org}
                    </p>
                    <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-fg-2">
                      {entry.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Toolbox ---------- */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-24 lg:px-12">
          <Reveal>
            <p className="label text-accent">Toolbox</p>
            <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] font-bold tracking-[-0.02em] text-balance">
              Grouped by how often I actually use them
            </h2>
            <p className="mt-5 max-w-[56ch] text-fg-2">
              A skills list that claims everything equally tells you nothing.
              This one is ordered by honesty.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {toolbox.map((group, i) => (
              <Reveal key={group.group} index={i}>
                <div className="border-t border-line-strong pt-5">
                  <h3 className="font-display text-base font-bold tracking-tight text-fg">
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-3">
      <dt className="text-fg-3">{label}</dt>
      <dd className="text-right text-fg-2">{value}</dd>
    </div>
  );
}
