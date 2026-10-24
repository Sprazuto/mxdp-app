"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/lib/motion";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: "low" | "medium" | "high";
}

const elevationStyles = {
  low: "shadow-sm",
  medium: "shadow-md",
  high: "shadow-lg",
};

export function HoverCard({ children, className, elevation = "medium" }: HoverCardProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "relative rounded-2xl border border-[var(--color-border)]",
          "bg-[var(--color-bg-elevated)]",
          elevationStyles[elevation],
          className
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-[var(--color-border)]",
        "bg-[var(--color-bg-elevated)]",
        className
      )}
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      style={{
        boxShadow: elevationStyles[elevation],
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </motion.div>
  );
}