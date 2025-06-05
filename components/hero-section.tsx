"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/typewriter-text";
import { FloatingText, MouseCoordinates } from "@/components/floating-text";
import { SparklesPreview } from "./sparkles-text";
export function HeroSection(mousePosition: MouseCoordinates) {
  return (
    <section className="relative flex flex-col justify-center items-center h-screen overflow-hidden text-white dark:text-black">
      <SparklesPreview />
      <div className="-top-64 z-10 relative text-center">
        <motion.h1
          className="mb-6 font-bold text-6xl md:text-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.1 }}
        >
          <TypewriterText
            text={"Developer"}
            className="text-black dark:text-white"
            delay={100}
          />
        </motion.h1>

        <motion.p
          className="mx-auto mb-8 max-w-2xl text-gray-300 text-xl md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Crafting digital experiences with passion and precision
        </motion.p>

        <motion.button
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="pointer"
        >
          Explore My Work
        </motion.button>
      </div>

      <FloatingText {...mousePosition} />
    </section>
  );
}
