"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Multi-select tag filter backed by the URL.
 *
 * Selection lives in `?tag=` rather than component state, so a filtered view
 * is shareable, survives a reload, and the back button steps through filter
 * changes the way a user expects.
 */
export function StackFilter({
  tags,
  active,
  total,
  shown,
}: {
  tags: string[];
  active: string[];
  total: number;
  shown: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggle(tag: string) {
    const next = active.includes(tag)
      ? active.filter((t) => t !== tag)
      : [...active, tag];

    const params = new URLSearchParams(searchParams.toString());
    if (next.length) params.set("tag", next.join(","));
    else params.delete("tag");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clear() {
    router.push(pathname, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => {
          const isActive = active.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wide transition-colors duration-150",
                isActive
                  ? "border-accent bg-accent/12 text-accent"
                  : "border-line text-fg-2 hover:border-line-strong hover:text-fg",
              )}
            >
              {tag}
            </button>
          );
        })}

        {active.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 font-mono text-[11px] text-fg-3 transition-colors hover:text-fg"
          >
            <X className="size-3" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      <p className="label text-fg-3 tabular" role="status" aria-live="polite">
        Showing {shown} of {total}
      </p>
    </div>
  );
}
