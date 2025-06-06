"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navigation({
  activeSection,
  setActiveSection,
}: NavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = navItems.findIndex(
        (item) => item.id === activeSection
      );

      // Number keys 1 to 4
      if (e.key >= "1" && e.key <= String(navItems.length)) {
        const index = parseInt(e.key, 10) - 1;
        setActiveSection(navItems[index].id);
        return;
      }

      // Left arrow key
      if (e.key === "ArrowLeft") {
        const prevIndex =
          (currentIndex - 1 + navItems.length) % navItems.length;
        setActiveSection(navItems[prevIndex].id);
        return;
      }

      // Right arrow key
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % navItems.length;
        setActiveSection(navItems[nextIndex].id);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, setActiveSection]);

  return (
    <div className="z-[99999999] relative flex w-full h-full pointer-events-none">
      <motion.nav
        className="top-8 left-1/2 z-50 fixed -translate-x-1/2 pointer-events-auto transform"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center gap-1 bg-black/20 shadow-2xl backdrop-blur-md p-2 border border-white/10 rounded-full">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSection === item.id
                  ? "bg-white text-black shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <span className="hidden sm:inline">{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  className="-bottom-1 left-1/2 absolute bg-black rounded-full w-1 h-1 -translate-x-1/2 transform"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

          <div className="bg-white/20 mx-1 w-px h-6" />

          <ModeToggle />
        </div>
      </motion.nav>

      {/* Section Indicator */}
      <motion.div
        className="right-8 bottom-8 z-50 fixed pointer-events-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2 bg-black/20 backdrop-blur-md p-3 border border-white/10 rounded-2xl">
          <div className="font-medium text-white/60 text-xs">
            {navItems.find((item) => item.id === activeSection)?.label}
          </div>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white scale-125"
                    : "bg-white/30"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Keyboard Shortcuts Hint */}
      <motion.div
        className="bottom-8 left-8 z-50 fixed pointer-events-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="bg-black/20 backdrop-blur-md p-3 border border-white/10 rounded-2xl">
          <div className="mb-2 font-medium text-white/60 text-xs">
            Navigation
          </div>
          <div className="flex flex-col gap-1 text-white/40 text-xs">
            <div>← → Arrow keys</div>
            <div>1-4 Number keys</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
