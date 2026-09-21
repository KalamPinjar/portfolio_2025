import { Reveal } from "@/components/motion/reveal";

/**
 * What the work actually consists of, grouped by the problem each group
 * solves rather than presented as a wall of logos.
 */
const groups = [
  {
    title: "Interface",
    body: "The layer people actually touch — and the one that decides whether the rest of it gets used.",
    items: [
      "React 19 · Next.js App Router",
      "Design systems & tokens",
      "Motion with a reduced-motion path",
      "WCAG 2.2 AA, keyboard-first",
    ],
  },
  {
    title: "Product back end",
    body: "The server side owned properly — schema, endpoints, jobs — not just enough to unblock the frontend.",
    items: [
      "NestJS · Node",
      "tRPC · REST design",
      "Prisma · PostgreSQL",
      "Docker · Linux · WSL",
      "AWS · Azure · Vercel",
    ],
  },
  {
    title: "Money & identity",
    body: "The flows where a bug is not a visual defect but a support ticket with a refund attached.",
    items: [
      "Stripe Checkout & subscriptions",
      "Idempotent webhook handling",
      "Clerk · Kinde · session design",
      "Server-enforced plan limits",
    ],
  },
  {
    title: "Confidence",
    body: "The reason I can change something on a Friday. My degree was in security; that habit came with it.",
    items: [
      "Playwright end-to-end",
      "Zod at every boundary",
      "TypeScript, strict, no escape hatches",
      "Threat-modelling the obvious things",
    ],
  },
];

export function Capabilities() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28 lg:px-12">
        <Reveal>
          <p className="label text-accent">What I do</p>
          <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] font-bold tracking-[-0.02em] text-balance">
            Four things, and the reason each one matters.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <Reveal key={group.title} index={i}>
              <div className="border-t border-line-strong pt-5">
                <h3 className="font-display text-lg font-bold tracking-tight text-fg">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-3">
                  {group.body}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[12px] leading-relaxed text-fg-2"
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
  );
}
