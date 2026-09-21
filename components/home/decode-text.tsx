"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Deliberately narrow glyphs only.
 *
 * A scrambling character that is wider than the letter it stands in for makes
 * the line grow mid-animation, which wraps the heading onto a second line and
 * then snaps back. Every glyph here is no wider than an average letter, so the
 * animated string is always shorter than the resolved one and the line can
 * never outgrow its final width.
 */
const GLYPHS = "/\\|<>[]{}()=+-_:;.,*^~!?1iltfjr";

/**
 * Resolves scrambled glyphs into the real string, left to right — a nod to the
 * cryptography work rather than decoration for its own sake.
 *
 * The real text is the only text in the document. While the animation runs it
 * stays in flow but hidden, holding the exact final size so nothing shifts,
 * and the scrambled copy is layered over it and hidden from assistive
 * technology. Once it resolves, that copy is removed — so the served HTML and
 * the settled DOM both contain the name exactly once, which is what a crawler
 * and a screen reader each need.
 */
export function DecodeText({
  text,
  className,
  speed = 45,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  // null means "not animating" — the state before hydration and after it ends.
  const [scrambled, setScrambled] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 2);

      if (revealed >= text.length) {
        window.clearInterval(id);
        setScrambled(null);
        return;
      }

      setScrambled(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
    }, speed);

    return () => {
      window.clearInterval(id);
      setScrambled(null);
    };
  }, [text, speed]);

  const animating = scrambled !== null;

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className={animating ? "invisible" : undefined}>{text}</span>
      {animating && (
        <span
          aria-hidden="true"
          className="absolute inset-0 whitespace-nowrap"
        >
          {scrambled}
        </span>
      )}
    </span>
  );
}
