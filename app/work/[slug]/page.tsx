import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe } from "lucide-react";

import { getProject, getCaseStudies } from "@/lib/projects";
import { Pipeline } from "@/components/work/pipeline";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return getCaseStudies().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(
    project.name,
  )}&subtitle=${encodeURIComponent(project.tagline)}&tag=${encodeURIComponent(
    project.category,
  )}`;

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} · ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} · ${site.name}`,
      description: project.summary,
      images: [ogUrl],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const study = project.study;
  const liveLinks = project.links.filter((l) => l.type === "live");
  const repoLinks = project.links.filter((l) => l.type === "repo");
  const studies = getCaseStudies();
  const next =
    studies[(studies.findIndex((p) => p.slug === project.slug) + 1) % studies.length];

  return (
    <article>
      {/* ---------- Header ---------- */}
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_10%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 pt-32 pb-16 sm:pt-40 lg:px-12">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-fg-2 transition-colors hover:text-accent"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-250 group-hover:-translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
            All work
          </Link>

          <p className="label mt-10 text-accent">{project.category}</p>
          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.03em] text-balance">
            {project.name}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[clamp(1.1rem,2vw,1.45rem)] leading-snug text-fg-2">
            {project.tagline}
          </p>

          {project.links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {liveLinks.map((link) => (
                <Button key={link.href} asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <Globe className="size-4" aria-hidden="true" />
                    {liveLinks.length > 1 ? link.label : "Visit live site"}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              ))}
              {repoLinks.map((link) => (
                <Button key={link.href} asChild variant="outline">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <Github className="size-4" aria-hidden="true" />
                    {repoLinks.length > 1 ? link.label : "View source"}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          )}

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-3">
            <Meta label="Year" value={project.year} />
            <Meta label="Role" value={project.role} />
            <Meta label="Type" value={project.category} />
          </dl>
        </div>
      </header>

      {/* ---------- Context + metrics ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <p className="label mb-5 text-fg-3">What it is</p>
              <p className="text-lg leading-relaxed text-fg-2 prose-col">
                {study.context}
              </p>
            </Reveal>

            {project.metrics && (
              <Reveal index={1} className="lg:col-span-5">
                <p className="label mb-5 text-fg-3">By the numbers</p>
                <dl className="flex flex-col gap-6">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-baseline gap-4 border-b border-line pb-4 last:border-0"
                    >
                      <dd className="font-mono text-4xl leading-none font-medium text-signal tabular">
                        {metric.value}
                      </dd>
                      <dt className="text-sm text-fg-2">{metric.label}</dt>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>

          {study.pipeline && (
            <Reveal index={2} className="mt-16">
              <Pipeline
                caption={study.pipeline.caption}
                stages={study.pipeline.stages}
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- Narrative ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:py-24 lg:px-12">
          <div className="flex flex-col gap-16">
            {study.sections.map((section, i) => (
              <Reveal key={section.heading} index={i}>
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
                  <h2 className="font-display text-2xl leading-tight font-bold tracking-[-0.02em] text-balance lg:col-span-4 lg:text-[1.75rem]">
                    {section.heading}
                  </h2>
                  <div className="flex flex-col gap-4 lg:col-span-8">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-base leading-relaxed text-fg-2 prose-col"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Decisions ---------- */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:py-24 lg:px-12">
          <Reveal>
            <p className="label text-accent">Decisions</p>
            <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance">
              Four calls I would make the same way again
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {study.decisions.map((decision, i) => (
              <Reveal as="li" key={decision.title} index={i}>
                <div className="h-full rounded-card border border-line bg-night p-6">
                  <p className="label text-fg-3 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-fg">
                    {decision.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-2">
                    {decision.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Stack ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20 lg:px-12">
          <Reveal>
            <p className="label text-fg-3">Stack</p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {study.stackGroups.map((group) => (
                <div key={group.group} className="border-t border-line-strong pt-5">
                  <h3 className="font-display text-base font-bold tracking-tight text-fg">
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="font-mono text-[12px] text-fg-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Next ---------- */}
      <section className="bg-surface">
        <Link
          href={`/work/${next.slug}`}
          className="group block transition-colors hover:bg-raised"
        >
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6 py-16 lg:px-12">
            <div>
              <p className="label text-fg-3">Next case study</p>
              <p className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight font-bold tracking-[-0.02em] transition-colors group-hover:text-accent">
                {next.name}
              </p>
            </div>
            <ArrowRight
              className="size-8 text-fg-3 transition-all duration-250 group-hover:translate-x-2 group-hover:text-accent motion-reduce:transition-none"
              aria-hidden="true"
            />
          </div>
        </Link>
      </section>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-fg-3">{label}</dt>
      <dd className="mt-1.5 text-sm leading-snug font-medium text-fg">{value}</dd>
    </div>
  );
}
