"use client";

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
  return (
    <motion.nav
      className="top-8 left-1/2 z-50 fixed -translate-x-1/2 transform"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex gap-2 bg-black/20 backdrop-blur-md p-2 border border-white/10 rounded-full">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === item.id
                ? "bg-white text-black"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setActiveSection(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            {item.label}
          </motion.button>
        ))}
        <ModeToggle />
      </div>
    </motion.nav>
  );
}
