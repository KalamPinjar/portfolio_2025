"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    color: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Real-time chat app with AI-powered responses and sentiment analysis",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Socket.io", "OpenAI", "Node.js"],
    color: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    description: "Interactive dashboard for tracking investment portfolios with live data",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "D3.js", "Express", "MongoDB"],
    color: "from-orange-500 to-red-500",
  },
]

export function ProjectsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
