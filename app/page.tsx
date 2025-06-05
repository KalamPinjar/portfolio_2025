"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { AuroraBackground } from "@/components/aurora-background";
import { ContactSection } from "@/components/contact-section";
import { Navigation } from "@/components/navigation";
import DraggableSkills from "@/components/draggable-skills";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col justify-center items-center gap-4 px-4 w-full"
        >
          <HeroSection />
        </motion.div>
      </AuroraBackground>
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 relative"
      >
        <DraggableSkills />
        <ProjectsSection />
        <ContactSection />
      </motion.main>
    </div>
  );
}
