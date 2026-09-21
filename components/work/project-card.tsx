import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Globe } from "lucide-react";

import type { Project } from "@/lib/projects";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * Archive card.
 *
 * Every project has a case study, so the card itself always leads there — the
 * title carries a full-bleed overlay link. Source and deployment links are
 * separate, sit above that overlay, and are labelled for what they are, so a
 * reader never has to guess where a card will take them.
 */
export function ProjectCard({ project }: { project: Project }) {
  const repos = project.links.filter((link) => link.type === "repo");
  const live = project.links.filter((link) => link.type === "live");

  return (
    <Magnetic strength={0.06} className="h-full">
      <article className="group relative flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-all duration-250 ease-standard hover:-translate-y-1 hover:border-line-strong hover:bg-raised motion-reduce:transform-none motion-reduce:transition-none">
        <div className="flex items-start justify-between gap-4">
          <p className="label text-fg-3">{project.category}</p>
          <span className="label text-[10px] text-fg-3 tabular">{project.year}</span>
        </div>

        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-fg">
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:z-0"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-2">
          {project.summary}
        </p>

        {project.metrics?.[0] && (
          <p className="mt-5 flex items-baseline gap-2">
            <span className="font-mono text-2xl leading-none font-medium text-signal tabular">
              {project.metrics[0].value}
            </span>
            <span className="text-xs text-fg-3">{project.metrics[0].label}</span>
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-fg-3"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > 4 && (
            <li className="px-1 py-0.5 font-mono text-[10px] text-fg-3">
              +{project.stack.length - 4}
            </li>
          )}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors group-hover:text-accent">
            Case study
            <ArrowRight
              className="size-3.5 transition-transform duration-250 group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </span>

          {live.map((link) => (
            <CardLink key={link.href} href={link.href}>
              <Globe className="size-3.5" aria-hidden="true" />
              Live
            </CardLink>
          ))}

          {repos.map((link) => (
            <CardLink key={link.href} href={link.href}>
              <Github className="size-3.5" aria-hidden="true" />
              {repos.length > 1 ? link.label : "Code"}
            </CardLink>
          ))}
        </div>
      </article>
    </Magnetic>
  );
}

/** Sits above the title's overlay link so it stays independently clickable. */
function CardLink({
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
      className="relative z-10 inline-flex items-center gap-1.5 text-sm text-fg-3 transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRight className="size-3" aria-hidden="true" />
    </a>
  );
}
