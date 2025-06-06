"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  color: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <h3 className="mb-2 font-bold text-white text-xl">{project.title}</h3>
        <p className="mb-4 text-gray-400 text-sm">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${project.color} text-white`}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <motion.button
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <Github size={16} />
            <span className="text-sm">Code</span>
          </motion.button>
          <motion.button
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <ExternalLink size={16} />
            <span className="text-sm">Live Demo</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
