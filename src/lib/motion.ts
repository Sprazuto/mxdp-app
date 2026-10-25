"use client";

import { useEffect, useState } from "react";
import type { Variants, Transition } from "motion/react";

/* ========================================
   REDUCED MOTION HOOK
======================================== */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/* ========================================
   BASE TRANSITIONS
======================================== */
export const transitions = {
  micro: { duration: 0.15, ease: "easeOut" },
  enter: { duration: 0.3, ease: "easeOut" },
  spring: { type: "spring", stiffness: 400, damping: 30 },
  page: { duration: 0.5, ease: "easeOut" },
} satisfies Record<string, Transition>;

/* ========================================
   VARIANTS - Single Source of Truth
======================================== */

// Fade + slide up (sections, cards)
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: transitions.enter,
} as const;

// Fade only (text, badges)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitions.micro,
} as const;

// Scale + fade (modals, popovers, buttons)
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: transitions.spring,
} as const;

// Slide from left/right (sidebars, drawers)
export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: transitions.enter,
} as const;

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: transitions.enter,
} as const;

/* ========================================
   STAGGER CONTAINER (for lists, grids)
======================================== */
export function staggerContainer(
  staggerMs = 80,
  delayChildren = 100
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: delayChildren / 1000,
      },
    },
  };
}

export const viewportOnce = { once: true, margin: "50px" };

/* ========================================
   INTERACTIVE VARIANTS
======================================== */

// Buttons - spring tap, subtle hover
export const buttonVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -1 },
  tap: { scale: 0.97, y: 0.5 },
  focus: { scale: 1 },
} as const;

// Cards - lift + shadow
export const cardVariants = {
  rest: { y: 0, boxShadow: "var(--shadow-md)" },
  hover: { y: -4, boxShadow: "var(--shadow-xl)" },
  tap: { y: -2, scale: 0.99 },
} as const;

// Input fields - border color, subtle scale
export const inputVariants = {
  rest: { scale: 1 },
  focus: { scale: 1.005 },
  error: { borderColor: "var(--color-error)" },
} as const;

// Badges - pop on hover
export const badgeVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
  tap: { scale: 0.95 },
} as const;

// Avatar - ring pulse
export const avatarVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
} as const;

/* ========================================
   PAGE TRANSITION VARIANTS
======================================== */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: transitions.page,
};

/* ========================================
   HELPER: Reduced Motion Guard
======================================== */
export function getMotionProps(reduced: boolean) {
  if (reduced) {
    return {
      initial: false,
      animate: false,
      transition: { duration: 0 },
      whileHover: undefined,
      whileTap: undefined,
      whileInView: undefined,
      viewport: undefined,
    };
  }
  return {};
}

/* ========================================
   TYPE EXPORTS
======================================== */
export type { Variants, Transition };