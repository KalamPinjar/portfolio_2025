"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { initialSkills } from "@/constant/skills";

interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  unlocked: boolean;
  position: number;
}

const COLS = 8;
const CARD_SIZE = 140;
const PADDING = 20;

interface SkillCardProps {
  skill: Skill;
  index: number;
  isDragging?: boolean;
}

function SkillCard({ skill, index, isDragging = false }: SkillCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        w-32 h-32 rounded-lg flex flex-col items-center justify-center
        bg-gradient-to-br dark:from-gray-700 dark:to-gray-900 border border-white/20
        from-gray-200 to-gray-500 shadow-md cursor-grab active:cursor-grabbing
        select-none transition-all duration-200
        ${
          isDragging || isSortableDragging
            ? "z-50 shadow-2xl scale-105"
            : "hover:shadow-lg hover:scale-105"
        }
      `}
    >
      {/* Content */}
      <div className="text-center pointer-events-none">
        <div className="mb-1 text-2xl">{skill.icon}</div>
        <h3 className="mb-1 px-1 font-semibold text-black dark:text-white text-sm leading-tight">
          {skill.name}
        </h3>
        <div
          className={`text-xs font-medium ${
            skill.unlocked
              ? "dark:text-green-400 text-green-800"
              : "dark:text-amber-400 text-amber-800"
          }`}
        >
          {skill.unlocked ? "Unlocked" : "In Progress"}
        </div>
      </div>

      {/* Status indicator bar */}
      <div className="right-2 bottom-2 left-2 absolute pointer-events-none">
        <div className="bg-white/20 rounded-full w-full h-1">
          <div
            className={`rounded-full h-full transition-all duration-500 delay-${
              index * 50
            } ${skill.unlocked ? "bg-green-400 w-full" : "bg-amber-400 w-2/5"}`}
          />
        </div>
      </div>

      {/* Category badge */}
      <div className="-top-2 -left-2 absolute bg-blue-500 opacity-0 hover:opacity-100 px-2 py-1 rounded-full text-white text-xs transition-opacity duration-200 pointer-events-none">
        {skill.category}
      </div>
    </div>
  );
}

export default function DraggableSkillsGrid() {
  const [skills, setSkills] = useState(initialSkills);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSkills((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  // Calculate container height based on rows needed
  const rows = Math.ceil(skills.length / COLS);
  const containerHeight = rows * CARD_SIZE + PADDING * 2;

  const activeSkill = activeId
    ? skills.find((skill) => skill.id === activeId)
    : null;

  return (
    <section className="relative bg-gray-50 dark:bg-black px-4 py-16 h-full">
      <div className="rounded-2xl">
        <Image
          src={"/images/blob1.png"}
          alt="skill-bg"
          width={1800}
          height={20}
          className="top-10 left-14 z-0 absolute rounded-t-2xl mix-blend-difference dark:mix-blend-screen"
        />
        <Image
          src={"/images/blob1.png"}
          alt="skill-bg"
          width={1800}
          height={20}
          className="top-[51.4%] left-14 z-0 absolute rounded-b-2xl rotate-x-180 mix-blend-difference dark:mix-blend-screen"
        />
      </div>

      <div className="mx-auto mt-10 max-w-[72rem]">
        <div className="opacity-0 mb-8 text-center animate-fade-in">
          <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-300 text-4xl">
            Technical Skills Grid
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-gray-600 dark:text-gray-200">
            Drag any skill card to swap positions.
          </p>
        </div>

        {/* Grid container */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            className="relative bg-white/50 dark:bg-black/50 backdrop-blur-sm p-5 rounded-xl w-full overflow-hidden"
            style={{ minHeight: containerHeight }}
          >
            <SortableContext
              items={skills.map((skill) => skill.id)}
              strategy={rectSortingStrategy}
            >
              <div className="justify-items-center gap-4 grid grid-cols-8">
                {skills.map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </SortableContext>
          </div>

          <DragOverlay>
            {activeSkill ? (
              <SkillCard skill={activeSkill} index={0} isDragging={true} />
            ) : null}
          </DragOverlay>
        </DndContext>

        <div className="opacity-0 mt-6 text-center animate-fade-in-delayed">
          <p className="text-gray-500 text-sm">
            💡 Drag skills to swap positions • Green indicates unlocked skills •
            Amber shows skills in progress
          </p>
        </div>
      </div>
    </section>
  );
}
