"use client"

import { motion, Reorder } from "framer-motion"

interface Skill {
  id: string
  name: string
  level: number
  color: string
  icon: string
}

interface DraggableSkillCardProps {
  skill: Skill
}

export function DraggableSkillCard({ skill }: DraggableSkillCardProps) {
  return (
    <Reorder.Item
      value={skill}
      id={skill.id}
      className="cursor-grab active:cursor-grabbing"
      whileDrag={{ scale: 1.05, rotate: 5 }}
      data-cursor="pointer"
    >
      <motion.div
        className={`p-6 rounded-xl bg-gradient-to-br ${skill.color} backdrop-blur-sm border border-white/10 shadow-xl`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{skill.icon}</span>
          <span className="text-white/80 text-sm font-mono">{skill.level}%</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>

        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    </Reorder.Item>
  )
}
