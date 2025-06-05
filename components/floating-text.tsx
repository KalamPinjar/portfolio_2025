"use client";

import { motion } from "framer-motion";

const floatingWords = [
  // Frontend
  { text: "React", x: "10%", y: "20%", delay: 0 },
  { text: "Next.js", x: "80%", y: "30%", delay: 0.5 },
  { text: "TypeScript", x: "15%", y: "70%", delay: 1 },
  { text: "Framer Motion", x: "75%", y: "80%", delay: 1.5 },
  { text: "Tailwind", x: "50%", y: "15%", delay: 2 },
  { text: "JavaScript", x: "60%", y: "25%", delay: 2.5 },
  { text: "HTML5", x: "20%", y: "60%", delay: 3 },
  { text: "CSS3", x: "30%", y: "10%", delay: 3.5 },
  { text: "Shadcn UI", x: "10%", y: "85%", delay: 4 },
  { text: "TanStack Query", x: "85%", y: "60%", delay: 4.5 },
  { text: "Zustand", x: "25%", y: "40%", delay: 5 },
  { text: "Redux", x: "70%", y: "10%", delay: 5.5 },

  // Backend
  { text: "Node.js", x: "40%", y: "90%", delay: 6 },
  { text: "Express.js", x: "5%", y: "45%", delay: 6.5 },
  { text: "Prisma", x: "90%", y: "50%", delay: 7 },
  { text: "REST API", x: "60%", y: "75%", delay: 7.5 },
  { text: "GraphQL", x: "35%", y: "30%", delay: 8 },

  // Databases
  { text: "PostgreSQL", x: "50%", y: "50%", delay: 8.5 },
  { text: "MongoDB", x: "75%", y: "40%", delay: 9 },
  { text: "NeonDB", x: "20%", y: "20%", delay: 9.5 },
  { text: "Supabase", x: "65%", y: "65%", delay: 10 },

  // DevOps & Infra
  { text: "Docker", x: "45%", y: "20%", delay: 10.5 },
  { text: "CI/CD", x: "35%", y: "80%", delay: 11 },
  { text: "GitHub Actions", x: "5%", y: "30%", delay: 11.5 },
  { text: "Vercel", x: "80%", y: "10%", delay: 12 },
  { text: "Netlify", x: "25%", y: "10%", delay: 12.5 },
  { text: "AWS", x: "55%", y: "35%", delay: 13 },
  { text: "Azure", x: "90%", y: "20%", delay: 13.5 },

  // Messaging & Streaming
  { text: "Kafka", x: "10%", y: "60%", delay: 14 },
  { text: "WebSockets", x: "45%", y: "65%", delay: 14.5 },

  // Miscellaneous
  { text: "Figma", x: "70%", y: "55%", delay: 15 },
  { text: "Slack", x: "15%", y: "35%", delay: 15.5 },
  { text: "VSCode", x: "35%", y: "55%", delay: 16 },
  { text: "ESLint", x: "60%", y: "10%", delay: 16.5 },
  { text: "Prettier", x: "40%", y: "10%", delay: 17 },
  { text: "Jest", x: "85%", y: "75%", delay: 17.5 },
  { text: "Cypress", x: "30%", y: "90%", delay: 18 },
  { text: "OpenAI", x: "50%", y: "5%", delay: 18.5 },
];
export interface MouseCoordinates {
  x: number;
  y: number;
}

export function FloatingText(mousePosition: MouseCoordinates) {
  const interactionRadius = 150; // pixels

  return (
    <div className="absolute inset-0 pointer-events-none">
      {floatingWords.map((word, index) => {
        const wordX = (parseFloat(word.x) / 100) * window.innerWidth;
        const wordY = (parseFloat(word.y) / 100) * window.innerHeight;

        const distance = Math.sqrt(
          Math.pow(mousePosition.x - wordX, 2) +
            Math.pow(mousePosition.y - wordY, 2)
        );

        const isNearMouse = distance < interactionRadius;
        const intensity = Math.max(0, 1 - distance / interactionRadius);

        return (
          <motion.div
            key={index}
            className="absolute font-mono text-gray-600 text-sm transition-all duration-300"
            style={{ left: word.x, top: word.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isNearMouse ? [0.6, 0.9, 0.6] : [0.3, 0.6, 0.3],
              y: isNearMouse ? [0, -15, 0] : [0, -10, 0],
              scale: isNearMouse ? 1 + intensity * 0.3 : 1,
              color: isNearMouse ? "#8b5cf6" : "#6b7280",
            }}
            transition={{
              duration: isNearMouse ? 2 : 3,
              delay: word.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {word.text}
          </motion.div>
        );
      })}
    </div>
  );
}
