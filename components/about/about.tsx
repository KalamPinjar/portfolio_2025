"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TypewriterText = ({ text }: { text: string; delay?: number }) => {
  const letters = Array.from(text);

  return (
    <motion.div className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: index * 0.05,
            ease: "easeOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

type FloatingCardProps = {
  children: React.ReactNode;
  delay?: number;
};

const FloatingCard = ({ children, delay = 0 }: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0, 1],
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const SkillBadge = ({ skill, index }: { skill: string; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "backOut",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 shadow-lg hover:shadow-purple-500/25 px-4 py-2 border border-purple-700/50 rounded-full transition-all cursor-pointer"
    >
      {skill}
    </motion.li>
  );
};

const AboutMe = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const skills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn UI",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Prisma ORM",
    "AWS",
    "Azure",
    "Docker",
    "CI/CD",
    "Kafka",
    "Zookeeper",
    "System Design",
    "GitHub",
    "Supabase",
    "NeonDB",
    "Slack",
    "DSA & Algorithms",
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-[#09000e] min-h-screen overflow-hidden"
    >
      {/* Hero Section */}
      <section className="z-10 relative flex justify-center items-center px-6 min-h-screen">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
          >
            <motion.h1
              className="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 font-bold text-transparent text-5xl md:text-7xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <TypewriterText text="Hello, I'm Kalam" delay={1} />
            </motion.h1>

            <motion.div
              className="mb-12 text-gray-300 text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              Lead Frontend Developer crafting digital experiences
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="inline-block animate-bounce"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Content */}
      <section className="z-10 relative mx-auto px-6 md:px-10 pb-20 max-w-4xl">
        {/* About Me Introduction */}
        <FloatingCard delay={0.2}>
          <div className="bg-gray-800/90 shadow-2xl backdrop-blur-sm mb-20 p-8 border border-gray-700 rounded-2xl">
            <motion.h2
              className="flex items-center mb-6 font-bold text-white text-3xl md:text-4xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="mr-4 text-4xl"
                animate={{ rotate: [0, 20, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                👋
              </motion.span>
              About Me
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              I&apos;m <strong className="text-purple-400">Kalam</strong>, a
              passionate{" "}
              <strong className="text-pink-400">Lead Frontend Developer</strong>{" "}
              currently working at{" "}
              <strong className="text-blue-400">Techsonic, Canada</strong>. With
              a strong foundation in modern frontend frameworks like{" "}
              <strong>React</strong> and <strong>Next.js</strong>, and hands-on
              experience with backend technologies, DevOps, and cloud services
              such as <strong>AWS</strong> and <strong>Azure</strong>, I strive
              to build scalable, high-performance web applications.
            </motion.p>
          </div>
        </FloatingCard>

        {/* Experience */}
        <FloatingCard delay={0.3}>
          <div className="bg-gray-800/90 shadow-2xl backdrop-blur-sm mb-20 p-8 border border-gray-700 rounded-2xl">
            <motion.h3
              className="flex items-center mb-6 font-semibold text-white text-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="mr-3 text-3xl">💼</span>
              Experience
            </motion.h3>
            <motion.ul
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <li className="flex items-center space-x-3">
                <span className="bg-purple-500 rounded-full w-2 h-2"></span>
                <span>
                  Lead Frontend Developer at <strong>Techsonic, Canada</strong>{" "}
                  (2024–Present)
                </span>
              </li>
            </motion.ul>
          </div>
        </FloatingCard>

        {/* Projects */}
        <FloatingCard delay={0.4}>
          <div className="bg-gray-800/90 shadow-2xl backdrop-blur-sm mb-20 p-8 border border-gray-700 rounded-2xl">
            <motion.h3
              className="flex items-center mb-6 font-semibold text-white text-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="mr-3 text-3xl">🚀</span>
              Projects
            </motion.h3>
            <motion.ul
              className="space-y-3 text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                "Real-time chat applications for enterprise clients",
                "Secure document portals for government use",
                "Scalable e-commerce platforms and reusable design systems",
              ].map((project, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-pink-500 rounded-full w-2 h-2"></span>
                  <span>{project}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </FloatingCard>

        {/* Learning & Growth */}
        <FloatingCard delay={0.5}>
          <div className="bg-gray-800/90 shadow-2xl backdrop-blur-sm mb-20 p-8 border border-gray-700 rounded-2xl">
            <motion.h3
              className="flex items-center mb-6 font-semibold text-white text-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="mr-3 text-3xl">📚</span>
              Learning & Growth
            </motion.h3>
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I&apos;m actively learning advanced concepts in{" "}
              <strong>system design</strong>, <strong>Kafka</strong>,{" "}
              <strong>Docker</strong>, and <strong>distributed systems</strong>,
              while also sharpening my problem-solving abilities through regular
              practice in <strong>DSA</strong>.
            </motion.p>
          </div>
        </FloatingCard>

        {/* Mentorship & Interests */}
        <FloatingCard delay={0.6}>
          <div className="bg-gray-800/90 shadow-2xl backdrop-blur-sm mb-20 p-8 border border-gray-700 rounded-2xl">
            <motion.h3
              className="flex items-center mb-6 font-semibold text-white text-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="mr-3 text-3xl">🤝</span>
              Mentorship & Interests
            </motion.h3>
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Outside of work, I mentor junior developers, explore emerging
              DevOps tooling, and stay curious about building efficient and
              secure web systems.
            </motion.p>
          </div>
        </FloatingCard>

        {/* Key Skills */}
        <FloatingCard delay={0.7}>
          <div className="bg-gray-800/90 shadow-2xl backdrop-blur-sm p-8 border border-gray-700 rounded-2xl">
            <motion.h3
              className="flex items-center mb-8 font-semibold text-white text-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="mr-3 text-3xl">🛠️</span>
              Key Skills
            </motion.h3>
            <ul className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-gray-300 text-sm">
              {skills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} index={index} />
              ))}
            </ul>
          </div>
        </FloatingCard>
      </section>
    </div>
  );
};

export default AboutMe;
