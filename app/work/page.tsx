import type { Metadata } from "next";
import { Suspense } from "react";

import { projects, allTags } from "@/lib/projects";
import { ProjectCard } from "@/components/work/project-card";
import { StackFilter } from "@/components/work/stack-filter";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects — retrieval-augmented SaaS, multi-tenant commerce, real-time chat, and a cryptography playground.",
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const active = params.tag ? params.tag.split(",").filter(Boolean) : [];

  const filtered = active.length
    ? projects.filter((project) =>
        active.every((tag) => project.tags.includes(tag)),
      )
    : projects;

  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-32 pb-24 sm:pt-40 lg:px-12">
      <header>
        <p className="label text-accent">Work</p>
        <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">
          Everything worth showing
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-fg-2">
          Eight projects, all built solo. Every one has a write-up: what it was,
          what turned out to be hard, and the decisions I would make the same
          way again. Source and live links are on each card.
        </p>
      </header>

      <div className="mt-14 border-t border-line pt-8">
        <Suspense fallback={<div className="h-16" />}>
          <StackFilter
            tags={allTags}
            active={active}
            total={projects.length}
            shown={filtered.length}
          />
        </Suspense>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal as="li" key={project.slug} index={i % 3}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="mt-16 text-center text-fg-2">
          No project matches every one of those tags at once. Remove one to
          widen the search.
        </p>
      )}
    </div>
  );
}
