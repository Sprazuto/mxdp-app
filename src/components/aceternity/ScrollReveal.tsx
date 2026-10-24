"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  offset?: number;
  once?: boolean;
}

const transformMap = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  offset = 50,
  once = true,
}: ScrollRevealProps) {
  const initial = { opacity: 0, ...transformMap[direction] };
  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }}
      whileInView={animate}
      viewport={{ once, margin: `${offset}px` }}
    >
      {children}
    </motion.div>
  );
}