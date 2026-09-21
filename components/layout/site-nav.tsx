"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Command } from "lucide-react";

import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";

export function SiteNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      // Hide on the way down, reveal on the way up — but never near the top.
      setHidden(y > 120 && y > lastY.current);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-250 ease-standard motion-reduce:transition-none",
        hidden && "-translate-y-full",
      )}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="glass mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-5 sm:mt-3 sm:rounded-card sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-fg"
        >
          Kalam<span className="text-accent">.</span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-control px-3 py-2 text-sm transition-colors duration-150",
                  active ? "text-fg" : "text-fg-2 hover:text-fg",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-signal" />
                )}
              </Link>
            );
          })}

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-control px-3 py-2 text-sm text-fg-2 transition-colors hover:text-fg sm:block"
          >
            Resume
          </a>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            aria-label="Open command palette"
            className="ml-1 hidden items-center gap-1.5 rounded-control border border-line px-2.5 py-1.5 text-fg-3 transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <Command className="size-3.5" aria-hidden="true" />
            <span className="label text-[10px]">K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
