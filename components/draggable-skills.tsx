"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { initialSkills, Skill } from "@/constant/skills";
import Image from "next/image";

const COLS = 8;
const CARD_SIZE = 140;
const PADDING = 20;

function SkillCard({
  skill,
  index,
  onDragEnd,
}: {
  skill: Skill;
  index: number;
  onDragEnd: (draggedId: string, targetPosition: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  // Calculate grid position
  const col = skill.position % COLS;
  const row = Math.floor(skill.position / COLS);
  const x = col * CARD_SIZE + PADDING;
  const y = row * CARD_SIZE + PADDING;

  return (
    <motion.div
      className={`
        absolute w-32 h-32 rounded-lg flex flex-col items-center justify-center
        bg-gradient-to-br dark:from-gray-700 dark:to-gray-900 border border-white/20 from-gray-200 to-gray-500  shadow-md
        cursor-grab active:cursor-grabbing select-none
        ${isDragging ? "z-50 shadow-2xl" : "hover:shadow-lg"}
        transition-shadow duration-200
      `}
      style={{ touchAction: "none" }}
      animate={{ x, y }}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false);

        // Calculate drop position
        const dropX = x + info.offset.x;
        const dropY = y + info.offset.y;

        // Find target grid position
        const targetCol = Math.round((dropX - PADDING) / CARD_SIZE);
        const targetRow = Math.round((dropY - PADDING) / CARD_SIZE);
        const targetPosition = Math.max(
          0,
          Math.min(34, targetRow * COLS + targetCol)
        );

        if (targetPosition !== skill.position) {
          onDragEnd(skill.id, targetPosition);
        }
      }}
      initial={{ opacity: 0, scale: 0.8, x, y }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.03,
        type: "spring",
        stiffness: 350,
        damping: 15,
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
        <h3 className="mb-1 px-1 font-semibold text-black dark:text-white text-sm leading-tight">
          {skill.name}
        </h3>
        <div
          className={`text-xs font-medium ${
            skill.unlocked
              ? "dark:text-green-400 text-green-800 text-shadow-2xs "
              : "dark:text-amber-400 text-amber-800 text-shadow-2xs"
          }`}
        >
          {skill.unlocked ? "Unlocked" : "In Progress"}
        </div>
      </div>

      {/* Status indicator bar */}
      <div className="right-2 bottom-2 left-2 absolute pointer-events-none">
        <div className="bg-white/20 rounded-full w-full h-1">
          <motion.div
            className={`rounded-full h-full ${
              skill.unlocked ? "bg-green-400" : "bg-amber-400"
            }`}
            initial={{ width: 0 }}
            animate={{ width: skill.unlocked ? "100%" : "40%" }}
            transition={{ duration: 0.4, delay: index * 0.05 + 0.3 }}
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

export default function DraggableSkillsGrid() {
  const [skills, setSkills] = useState(initialSkills);

  const handleDragEnd = (draggedId: string, targetPosition: number) => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      const draggedIndex = newSkills.findIndex((s) => s.id === draggedId);
      const targetIndex = newSkills.findIndex(
        (s) => s.position === targetPosition
      );

      if (draggedIndex !== -1) {
        if (targetIndex !== -1) {
          // Swap positions
          const temp = newSkills[draggedIndex].position;
          newSkills[draggedIndex].position = newSkills[targetIndex].position;
          newSkills[targetIndex].position = temp;
        } else {
          // Move to empty position
          newSkills[draggedIndex].position = targetPosition;
        }
      }

      return newSkills;
    });
  };

  const resetPositions = () => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, index) => ({
        ...skill,
        position: index,
      }))
    );
  };

  const randomizePositions = () => {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      const positions = Array.from({ length: skills.length }, (_, i) => i);

      // Fisher-Yates shuffle
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }

      return newSkills.map((skill, index) => ({
        ...skill,
        position: positions[index],
      }));
    });
  };

  // const toggleRandomSkill = () => {
  //   const randomId = skills[Math.floor(Math.random() * skills.length)].id;
  //   setSkills((prevSkills) =>
  //     prevSkills.map((skill) =>
  //       skill.id === randomId ? { ...skill, unlocked: !skill.unlocked } : skill
  //     )
  //   );
  // };

  // Calculate container height based on rows needed
  const rows = Math.ceil(skills.length / COLS);
  const containerHeight = rows * CARD_SIZE + PADDING * 2;

  return (
    <section className="relative bg-gray-50 dark:bg-black px-4 py-16 h-full">
      <div className="rounded-2xl">
        <Image
          src={"/images/blob1.png"}
          alt="skill-bg"
          width={1800}
          height={20}
          className="top-10 left-14 z-0 absolute rounded-t-2xl mix-blend-difference dark:mix-blend-normal"
        />
        <Image
          src={"/images/blob1.png"}
          alt="skill-bg"
          width={1800}
          height={20}
          className="top-[48%] left-14 z-0 absolute rounded-b-2xl rotate-x-180 mix-blend-difference dark:mix-blend-normal"
        />
      </div>
      <div className="mx-auto mt-10 max-w-[72rem]">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-300 text-3xl">
            Technical Skills Grid
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Drag any skill card to swap positions.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={resetPositions}
              className="z-[9999] bg-primary/50 hover:bg-primary/60 px-4 py-2 rounded-lg text-white transition-colors duration-200"
            >
              Reset Grid
            </button>
            <button
              onClick={randomizePositions}
              className="z-[9999] bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-colors duration-200"
            >
              Randomize
            </button>
            {/* <button
              onClick={toggleRandomSkill}
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-white transition-colors duration-200"
            >
              Toggle Random Skill
            </button> */}
          </div>
        </motion.div>

        {/* Grid container */}
        <div
          className="relative bg-white/50 dark:bg-black/50 backdrop-blur-sm border-2 border-gray-300 border-dashed rounded-xl w-full overflow-hidden"
          style={{ height: containerHeight }}
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              index={index}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            💡 Drag skills to swap positions • Green indicates unlocked skills •
            Amber shows skills in progress
          </p>
        </motion.div>
      </div>
    </section>
  );
}
