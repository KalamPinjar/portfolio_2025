import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { archiveProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/project-card";
import { Reveal } from "@/components/motion/reveal";

export function ArchiveTeaser() {
  const shown = archiveProjects.slice(0, 4);

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-accent">Also built</p>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] font-bold tracking-[-0.02em]">
                The rest of the shelf
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-fg-2 transition-colors hover:text-accent"
            >
              All {archiveProjects.length + 2} projects
              <ArrowRight
                className="size-4 transition-transform duration-250 group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((project, i) => (
            <Reveal as="li" key={project.slug} index={i}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
