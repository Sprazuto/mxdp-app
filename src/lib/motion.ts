"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect user's reduced motion preference
 * Respects OS-level "Reduce Motion" accessibility setting
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}

/**
 * Hook to safely animate only when user hasn't reduced motion
 * Returns Motion-compatible transition config
 */
export function useMotionConfig(
  defaultTransition: { duration?: number; ease?: number[]; type?: string } = {}
) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return {
      transition: { duration: 0.01, ...defaultTransition },
      initial: false,
      animate: false,
      exit: false,
      whileHover: false,
      whileTap: false,
      whileInView: false,
    };
  }

  return {
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1], // ease-out
      ...defaultTransition,
    },
  };
}

/**
 * Spring transition config for interactive elements
 */
export const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 1,
};

/**
 * Easing transition config for decorative animations
 */
export const easeTransition = (duration = 0.4) => ({
  duration,
  ease: [0.23, 1, 0.32, 1] as const,
});

/**
 * Stagger config for list animations
 */
export const staggerContainer = (stagger = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: easeTransition(0.4),
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: easeTransition(0.3),
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: springTransition,
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
  transition: easeTransition(0.4),
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: easeTransition(0.4),
};

/**
 * Hover/tap variants for interactive elements
 */
export const interactiveVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.02, rotate: 1 },
  tap: { scale: 0.98 },
};

export const buttonVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.97, y: 1 },
};

export const cardVariants = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  hover: { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" },
};