import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
  category: string;
  x: number;
  y: number;
}

const initialSkills: Skill[] = [
  {
    id: "1",
    name: "React",
    level: 95,
    icon: "⚛️",
    category: "Frontend",
    x: 20,
    y: 20,
  },
  {
    id: "2",
    name: "Next.js",
    level: 90,
    icon: "▲",
    category: "Frontend",
    x: 170,
    y: 20,
  },
  {
    id: "3",
    name: "TypeScript",
    level: 88,
    icon: "📘",
    category: "Language",
    x: 320,
    y: 20,
  },
  {
    id: "4",
    name: "Node.js",
    level: 80,
    icon: "🟢",
    category: "Backend",
    x: 470,
    y: 20,
  },
  {
    id: "5",
    name: "PostgreSQL",
    level: 85,
    icon: "🐘",
    category: "Database",
    x: 20,
    y: 170,
  },
  {
    id: "6",
    name: "AWS",
    level: 78,
    icon: "☁️",
    category: "Cloud",
    x: 170,
    y: 170,
  },
  {
    id: "7",
    name: "Docker",
    level: 82,
    icon: "🐳",
    category: "DevOps",
    x: 320,
    y: 170,
  },
  {
    id: "8",
    name: "Python",
    level: 86,
    icon: "🐍",
    category: "Language",
    x: 470,
    y: 170,
  },
  {
    id: "9",
    name: "MongoDB",
    level: 83,
    icon: "🍃",
    category: "Database",
    x: 20,
    y: 320,
  },
  {
    id: "10",
    name: "GraphQL",
    level: 79,
    icon: "🕸️",
    category: "API",
    x: 170,
    y: 320,
  },
  {
    id: "11",
    name: "Kafka",
    level: 75,
    icon: "🧩",
    category: "Streaming",
    x: 320,
    y: 320,
  },
  {
    id: "12",
    name: "Redis",
    level: 74,
    icon: "🟥",
    category: "Cache",
    x: 470,
    y: 320,
  },
  {
    id: "13",
    name: "Tailwind",
    level: 92,
    icon: "🎨",
    category: "CSS",
    x: 20,
    y: 470,
  },
  {
    id: "14",
    name: "Vue.js",
    level: 72,
    icon: "🟩",
    category: "Frontend",
    x: 170,
    y: 470,
  },
  {
    id: "15",
    name: "Express",
    level: 84,
    icon: "⚡",
    category: "Backend",
    x: 320,
    y: 470,
  },
  {
    id: "16",
    name: "Git",
    level: 90,
    icon: "🌿",
    category: "VCS",
    x: 470,
    y: 470,
  },
  {
    id: "17",
    name: "Firebase",
    level: 77,
    icon: "🔥",
    category: "Cloud",
    x: 620,
    y: 20,
  },
  {
    id: "18",
    name: "Jest",
    level: 81,
    icon: "🃏",
    category: "Testing",
    x: 620,
    y: 170,
  },
  {
    id: "19",
    name: "Figma",
    level: 85,
    icon: "🎭",
    category: "Design",
    x: 620,
    y: 320,
  },
  {
    id: "20",
    name: "Linux",
    level: 79,
    icon: "🐧",
    category: "OS",
    x: 620,
    y: 470,
  },
];

function DraggableSkillCard({
  skill,
  index,
  onPositionUpdate,
  containerRef,
}: {
  skill: Skill;
  index: number;
  onPositionUpdate: (id: string, x: number, y: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const isValidPosition = (x: number, y: number) => {
    if (!containerRef.current) return false;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardSize = 128; // 32 * 4 (w-32 h-32)
    const padding = 10;

    return (
      x >= padding &&
      y >= padding &&
      x + cardSize <= containerRect.width - padding &&
      y + cardSize <= containerRect.height - padding
    );
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);

    // Calculate new position based on current position + drag offset
    const newX = skill.x + info.offset.x;
    const newY = skill.y + info.offset.y;

    if (isValidPosition(newX, newY)) {
      // Update position if valid
      onPositionUpdate(skill.id, newX, newY);
    }
    // If invalid, framer-motion will automatically snap back due to animate prop
  };

  return (
    <motion.div
      className={`
        absolute w-32 h-32 rounded-lg flex flex-col items-center justify-center
        bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 shadow-md
        cursor-grab active:cursor-grabbing select-none
        ${isDragging ? "z-50 shadow-2xl" : "hover:shadow-lg"}
        transition-shadow duration-200
      `}
      style={{
        touchAction: "none",
      }}
      // Position the card using framer-motion's animate prop
      animate={{
        x: skill.x,
        y: skill.y,
        scale: 1,
        rotate: 0,
      }}
      drag
      dragMomentum={false}
      dragElastic={0.2}
      dragConstraints={containerRef}
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDragEnd={handleDragEnd}
      initial={{
        opacity: 0,
        scale: 0.8,
        x: skill.x,
        y: skill.y,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: index * 0.03,
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      whileHover={{
        scale: isDragging ? 1.1 : 1.05,
        transition: { duration: 0.2 },
      }}
      whileDrag={{
        scale: 1.1,
        rotate: 2,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        zIndex: 50,
      }}
    >
      {/* Drag indicator */}
      <div className="top-1 right-1 absolute opacity-60 hover:opacity-100 transition-opacity">
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-white/60"
        >
          {[4, 8, 12].flatMap((cy) =>
            [4, 8, 12].map((cx) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1" />
            ))
          )}
        </svg>
      </div>

      {/* Content */}
      <div className="text-center pointer-events-none">
        <div className="mb-1 text-2xl">{skill.icon}</div>
        <h3 className="mb-1 px-1 font-semibold text-white text-sm leading-tight">
          {skill.name}
        </h3>
        <div className="text-white/80 text-xs">{skill.level}%</div>
      </div>

      {/* Progress Bar */}
      <div className="right-2 bottom-2 left-2 absolute pointer-events-none">
        <div className="bg-white/20 rounded-full w-full h-1">
          <motion.div
            className="bg-white rounded-full h-full"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
          />
        </div>
      </div>

      {/* Category badge */}
      <div className="-top-2 -left-2 absolute bg-blue-500 opacity-0 hover:opacity-100 px-2 py-1 rounded-full text-white text-xs transition-opacity duration-200 pointer-events-none">
        {skill.category}
      </div>
    </motion.div>
  );
}

export default function DraggableSkillsFreeFlow() {
  const [skills, setSkills] = useState(initialSkills);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePositionUpdate = (id: string, x: number, y: number) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === id ? { ...skill, x, y } : skill))
    );
  };

  const resetPositions = () => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, index) => ({
        ...skill,
        x: (index % 5) * 150 + 20,
        y: Math.floor(index / 5) * 150 + 20,
      }))
    );
  };

  const randomizePositions = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardSize = 128;
    const padding = 20;

    setSkills((prevSkills) =>
      prevSkills.map((skill) => ({
        ...skill,
        x:
          Math.random() * (containerRect.width - cardSize - padding * 2) +
          padding,
        y:
          Math.random() * (containerRect.height - cardSize - padding * 2) +
          padding,
      }))
    );
  };

  return (
    <section className="relative bg-gray-50 px-4 py-16 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-bold text-gray-900 text-3xl">
            Technical Skills Playground
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-gray-600">
            Drag any skill card freely around the canvas. Invalid positions will
            snap back automatically.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={resetPositions}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors duration-200"
            >
              Reset Grid
            </button>
            <button
              onClick={randomizePositions}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-colors duration-200"
            >
              Randomize
            </button>
          </div>
        </motion.div>

        {/* Draggable container */}
        <div
          ref={containerRef}
          className="relative bg-white/50 backdrop-blur-sm border-2 border-gray-300 border-dashed rounded-xl w-full h-[700px] overflow-hidden"
        >
          {skills.map((skill, index) => (
            <DraggableSkillCard
              key={skill.id}
              skill={skill}
              index={index}
              onPositionUpdate={handlePositionUpdate}
              containerRef={containerRef}
            />
          ))}
        </div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            💡 Drag skills anywhere within the canvas • Invalid drops will
            return to previous position
          </p>
        </motion.div>
      </div>
    </section>
  );
}
