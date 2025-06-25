"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage } from "./ui/avatar";
import { RippleButton } from "./ripple-button";

interface SparklesPreviewProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export function SparklesPreview({ setActiveSection }: SparklesPreviewProps) {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 3 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const name = "Kalam Pinjar";

  return (
    <div className="top-1/8 z-50 relative flex flex-col justify-center items-center w-full h-3/4">
      <div className="absolute inset-0">
        <motion.div
          className="top-1/4 left-1/4 absolute bg-blue-400/20 blur-3xl rounded-full w-72 h-72"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="top-3/4 right-1/4 absolute bg-indigo-400/20 blur-3xl rounded-full w-96 h-96"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="z-10 relative flex flex-col items-center space-y-8">
        <motion.div
          className="relative w-64 h-64"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
        >
          {/* Avatar */}
          <div className="top-1 left-1 z-10 absolute">
            <Avatar className="shadow-2xl border-4 border-white dark:border-gray-800 w-62 h-62">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <AvatarImage
                    src={`/images/my-pic${currentImage}.jpg`}
                    alt="Kalam Pinjar"
                    className="rounded-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </Avatar>
          </div>
        </motion.div>

        {/* Name animation */}
        <div className="text-center">
          <motion.h1
            className="flex justify-center items-center gap-1 bg-clip-text bg-gradient-to-r from-gray-900 dark:from-white via-blue-800 dark:via-blue-200 to-indigo-900 dark:to-indigo-200 font-bold text-transparent dark:text-white text-4xl md:text-6xl lg:text-7xl"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                whileHover={{
                  scale: 1.1,
                  color: "#3b82f6",
                  transition: { duration: 0.2 },
                }}
                className="inline-block cursor-default"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="space-y-2 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <p className="font-medium text-gray-600 dark:text-gray-300 text-lg md:text-xl">
              Lead Frontend Developer | Scalable UI Architect | Learning Systems
              & Cloud
            </p>
          </motion.div>

          <div className="flex justify-center items-center gap-4">
            <motion.div
              className="flex justify-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <RippleButton
                className="hover:bg-white hover:text-black transition-all duration-300"
                variant="primary"
                rippleColor="red"
                size="lg"
                data-cursor="pointer"
                onClick={() => setActiveSection("projects")}
              >
                Explore My Work
              </RippleButton>
            </motion.div>
            <motion.div
              className="flex justify-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <RippleButton
                className="hover:bg-white hover:text-black transition-all duration-300"
                variant="secondary"
                rippleColor="yellow"
                size="lg"
                data-cursor="pointer"
                onClick={() => setActiveSection("contact")}
              >
                Contact Me
              </RippleButton>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="bottom-25 absolute w-full max-w-4xl"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="relative">
          <div className="top-0 absolute inset-x-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm h-[2px]" />
          <div className="top-0 absolute inset-x-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          <div className="top-0 absolute inset-x-60 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm h-[5px]" />
          <div className="top-0 absolute inset-x-60 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
        </div>
      </motion.div>
    </div>
  );
}
