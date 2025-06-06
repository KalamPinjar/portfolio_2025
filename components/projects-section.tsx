"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    color: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title: "AI Chat Application",
    description:
      "Real-time chat app with AI-powered responses and sentiment analysis",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Socket.io", "OpenAI", "Node.js"],
    color: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    description:
      "Interactive dashboard for tracking investment portfolios with live data",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "D3.js", "Express", "MongoDB"],
    color: "from-orange-500 to-red-500",
  },
];

export function ProjectsSection() {
  return (
    <section className="relative bg-white dark:bg-black px-4 py-20 h-screen">
      <video
        className="top-0 left-0 z-0 absolute"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      >
        <source src="/video/lighting-dev.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="z-[999] mx-auto mt-10 max-w-6xl">
        <motion.h2
          className="mb-16 font-bold text-4xl md:text-6xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-black dark:text-white">Featured Projects</span>
        </motion.h2>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
