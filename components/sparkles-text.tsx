"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage } from "./ui/avatar";
import { RippleButton } from "./ripple-button";

export function SparklesPreview() {
  const [currentImage, setCurrentImage] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

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
  const icons = [
    { icon: "\uD83D\uDCBC", angle: 0 },
    { icon: "\uD83D\uDE80", angle: 36 },
    { icon: "\u26A1", angle: 72 },
    { icon: "\uD83C\uDFAF", angle: 108 },
    { icon: "\u2728", angle: 144 },
    { icon: "\uD83E\uDDE0", angle: 180 },
    { icon: "\uD83D\uDEE0\uFE0F", angle: 216 },
    { icon: "\uD83C\uDF10", angle: 252 },
    { icon: "\uD83D\uDCE6", angle: 288 },
    { icon: "\uD83D\uDD12", angle: 324 },
  ];

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
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full w-64 h-64"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <div
              className="rounded-full w-full h-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #6366f1, #3b82f6)",
                padding: "3px",
              }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-full w-full h-full" />
            </div>
          </motion.div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 blur-xl rounded-full"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.3 }}
          />

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
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </Avatar>
          </div>

          {/* Floating icons */}
          {icons.map((item, index) => {
            const rad = (item.angle * Math.PI) / 180;
            const radius = isHovered ? 150 : 0;
            return (
              <motion.div
                key={index}
                className="absolute text-2xl pointer-events-none"
                style={{
                  top: "45%",
                  left: "45%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0,
                  x: Math.cos(rad) * radius,
                  y: Math.sin(rad) * radius,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                }}
              >
                <motion.span
                  className="block cursor-pointer pointer-events-auto"
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Name animation */}
        <div className="text-center">
          <motion.h1
            className="flex justify-center items-center gap-1 bg-clip-text bg-gradient-to-r from-gray-900 dark:from-white via-blue-800 dark:via-blue-200 to-indigo-900 dark:to-indigo-200 font-bold text-transparent text-4xl md:text-6xl lg:text-7xl"
            initial="hidden"
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
            >
              Explore My Work
            </RippleButton>
          </motion.div>
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
