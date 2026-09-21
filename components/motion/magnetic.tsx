"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "./reveal";

/**
 * Magnetic hover — the element leans toward the cursor within its bounds.
 * Disabled entirely under reduced motion and on coarse pointers, where the
 * effect has no meaning and only costs work.
 */
export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        "transition-transform duration-250 ease-standard will-change-transform motion-reduce:transform-none! motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
