"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — each step delays the reveal by 60ms (spec §04). */
  index?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll reveal.
 *
 * The rendered HTML is fully visible: this never leaves content parked at
 * opacity 0 waiting on an observer. On mount we check whether the element is
 * already in the viewport — if it is, it simply stays visible and no
 * animation runs, which also avoids a hydration flash. Only elements that
 * start off-screen are hidden and then animated in as they arrive.
 */
export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
}: RevealProps) {
  // Widened so one component can render as a div, section, li or article
  // without the ref narrowing to a single element type.
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.92;
    if (alreadyVisible) return;

    setPhase("hidden");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("shown");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-phase={phase}
      style={{ transitionDelay: phase === "shown" ? `${index * 60}ms` : undefined }}
      className={cn(
        "transition-[opacity,transform] duration-400 ease-entrance motion-reduce:transition-none",
        phase === "hidden" && "translate-y-6 opacity-0",
        "data-[phase=shown]:translate-y-0 data-[phase=shown]:opacity-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
