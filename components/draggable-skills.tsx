"use client"

import { useState } from "react"
import { motion, Reorder } from "framer-motion"
import { DraggableSkillCard } from "./draggable-skill-card"

interface Skill {
  id: string
  name: string
  level: number
  color: string
  icon: string
}

const initialSkills: Skill[] = [
  { id: "1", name: "React", level: 95, color: "from-blue-500 to-cyan-500", icon: "⚛️" },
  { id: "2", name: "Next.js", level: 90, color: "from-gray-700 to-gray-900", icon: "▲" },
  { id: "3", name: "TypeScript", level: 88, color: "from-blue-600 to-blue-800", icon: "📘" },
  { id: "4", name: "Framer Motion", level: 85, color: "from-purple-500 to-pink-500", icon: "🎭" },
  { id: "5", name: "Tailwind CSS", level: 92, color: "from-teal-400 to-blue-500", icon: "🎨" },
  { id: "6", name: "Node.js", level: 80, color: "from-green-500 to-green-700", icon: "🟢" },
]

export function DraggableSkills() {
  const [skills, setSkills] = useState(initialSkills)

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
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Skills & Technologies
          </span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 mb-12 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Drag and reorder the skills below to see them in action!
        </motion.p>

        <Reorder.Group
          axis="y"
          values={skills}
          onReorder={setSkills}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <DraggableSkillCard key={skill.id} skill={skill} />
          ))}
        </Reorder.Group>
      </div>
    </section>
  )
}
