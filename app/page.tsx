"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/project/projects-section";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { ContactSection } from "@/components/contact/contact-section";
import { Navigation } from "@/components/shared/navigation";
import DraggableSkills from "@/components/skills/draggable-skills";
import AboutMe from "@/components/about/about";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  // Page transition animations
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: 50,
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      scale: 1.1,
      y: -50,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  // Component renderer based on active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "hero":
        return (
          <motion.div
            key="hero"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex justify-center items-center w-full h-full"
          >
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
                <HeroSection setActiveSection={setActiveSection} />
              </motion.div>
            </AuroraBackground>
          </motion.div>
        );

      case "about":
        return (
          <motion.div
            key="skills"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex justify-center items-center w-full h-full"
          >
            <div className="relative w-full h-screen">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent_50%)]" />
              <div className="z-10 relative py-10 w-full h-full overflow-y-scroll">
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
                  <AboutMe />
                </motion.div>
              </div>
            </div>
          </motion.div>
        );

      case "skills":
        return (
          <motion.div
            key="skills"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex justify-center items-center w-full h-full"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent_50%)]" />
              <div className="z-10 relative w-full h-full">
                <DraggableSkills />
              </div>
            </div>
          </motion.div>
        );

      case "projects":
        return (
          <motion.div
            key="projects"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex justify-center items-center w-full h-full overflow-y-auto"
          >
            <div className="relative w-full h-full">
              <div className="z-10 relative w-full h-full">
                <ProjectsSection />
              </div>
            </div>
          </motion.div>
        );

      case "contact":
        return (
          <motion.div
            key="contact"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex justify-center items-center w-full h-full"
          >
            <div className="relative mx-10 rounded-2xl w-full h-full">
              <AuroraBackground>
                <ContactSection />
              </AuroraBackground>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="hero"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex justify-center items-center w-full h-full"
          >
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
                <HeroSection setActiveSection={setActiveSection} />
              </motion.div>
            </AuroraBackground>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden text-white">
      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="sync">{renderActiveSection()}</AnimatePresence>
      </div>
    </div>
  );
}
