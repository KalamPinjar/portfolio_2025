import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PipelineStage } from "@/lib/projects";

/**
 * A left-to-right flow of named stages.
 *
 * The numbering is real information here — these are ordered steps in a
 * request path, so the reader needs the order. On narrow screens the strip
 * scrolls horizontally rather than wrapping, which keeps the sequence
 * readable as a sequence.
 */
export function Pipeline({
  caption,
  stages,
  className,
}: {
  caption: string;
  stages: PipelineStage[];
  className?: string;
}) {
  return (
    <figure className={cn("not-prose", className)}>
      <figcaption className="label mb-4 flex items-center gap-2 text-fg-3">
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        {caption}
      </figcaption>

      <div className="-mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
        <ol className="flex min-w-max items-stretch gap-0">
          {stages.map((stage, i) => (
            <li key={stage.label} className="flex items-stretch">
              <div
                className={cn(
                  "flex min-w-[124px] flex-col justify-between rounded-control border px-3.5 py-3",
                  stage.tone === "key"
                    ? "border-accent/35 bg-accent/[0.06]"
                    : "border-line bg-surface",
                )}
              >
                <span
                  className={cn(
                    "label text-[10px]",
                    stage.tone === "key" ? "text-accent" : "text-fg-3",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block font-display text-sm font-semibold tracking-tight text-fg">
                  {stage.label}
                </span>
                {stage.sub && (
                  <span className="mt-0.5 block font-mono text-[11px] text-fg-3">
                    {stage.sub}
                  </span>
                )}
              </div>

              {i < stages.length - 1 && (
                <div className="flex items-center px-1.5" aria-hidden="true">
                  <ChevronRight className="size-4 text-fg-3" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
