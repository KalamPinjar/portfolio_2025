import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { Pipeline } from "@/components/work/pipeline";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function FeaturedCase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 size-[28rem] rounded-full blur-[130px]",
          index % 2 === 0
            ? "right-0 bg-accent/[0.07]"
            : "left-0 bg-signal/[0.05]",
        )}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 py-20 sm:py-28 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label text-accent tabular">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="label text-fg-3">{project.category}</span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.025em]">
              <Link
                href={`/work/${project.slug}`}
                className="transition-colors hover:text-accent"
              >
                {project.name}
              </Link>
            </h2>
            <p className="mt-4 text-lg leading-snug text-fg-2">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal index={1} className="lg:col-span-7">
            <p className="text-base leading-relaxed text-fg-2 prose-col">
              {project.summary}
            </p>

            {project.metrics && (
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="block font-mono text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none font-medium text-signal tabular">
                        {metric.value}
                      </span>
                      <span className="mt-2 block text-xs leading-tight text-fg-3">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>

        {project.study?.pipeline && (
          <Reveal index={2} className="mt-14">
            <Pipeline
              caption={project.study.pipeline.caption}
              stages={project.study.pipeline.stages}
            />
          </Reveal>
        )}

        <Reveal index={3}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <ul className="flex flex-wrap gap-2">
              {project.stack.slice(0, 7).map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-2"
                >
                  {tech}
                </li>
              ))}
              {project.stack.length > 7 && (
                <li className="rounded-full px-2 py-1 font-mono text-[11px] text-fg-3">
                  +{project.stack.length - 7} more
                </li>
              )}
            </ul>

            <Link
              href={`/work/${project.slug}`}
              className="group inline-flex items-center gap-2 font-display text-base font-semibold tracking-tight text-fg transition-colors hover:text-accent"
            >
              Read the case study
              <ArrowRight
                className="size-4 transition-transform duration-250 group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
