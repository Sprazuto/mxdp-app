"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  className?: string;
  count?: number;
  color?: "emerald" | "amber" | "pink" | "sky" | "purple" | "multi";
  size?: "sm" | "md" | "lg";
}

const sparkleSizes = {
  sm: { w: "w-1.5 h-1.5", w2: "w-1 h-1" },
  md: { w: "w-2.5 h-2.5", w2: "w-1.5 h-1.5" },
  lg: { w: "w-4 h-4", w2: "w-2.5 h-2.5" },
};

const colorMap = {
  emerald: ["text-emerald-400", "text-emerald-300", "text-teal-400"],
  amber: ["text-amber-400", "text-amber-300", "text-yellow-400"],
  pink: ["text-pink-400", "text-rose-300", "text-fuchsia-400"],
  sky: ["text-sky-400", "text-cyan-300", "text-blue-400"],
  purple: ["text-purple-400", "text-violet-300", "text-fuchsia-400"],
  multi: ["text-emerald-400", "text-amber-400", "text-pink-400", "text-sky-400"],
};

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  colorClass: string;
  sizeClass: string;
  sizeClass2: string;
  rotation: number;
  driftX: number;
  driftY: number;
}

export function Sparkles({ className, count = 12, color = "multi", size = "md" }: SparklesProps) {
  const reducedMotion = useReducedMotion();
  const [sparkles] = useState<Sparkle[]>(() => {
    if (reducedMotion) return [];
    const colors = colorMap[color];
    const sizes = sparkleSizes[size];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      colorClass: colors[Math.floor(Math.random() * colors.length)],
      sizeClass: sizes.w,
      sizeClass2: sizes.w2,
      rotation: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 20,
      driftY: (Math.random() - 0.5) * 20,
    }));
  });

  if (reducedMotion || sparkles.length === 0) {
    return <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)} aria-hidden="true" />;
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)} aria-hidden="true">
      {sparkles.map((sparkle) => (
        <MotionSparkle key={sparkle.id} sparkle={sparkle} />
      ))}
    </div>
  );
}

function MotionSparkle({ sparkle }: { sparkle: Sparkle }) {
  const x = useMotionValue(sparkle.driftX);
  const y = useMotionValue(sparkle.driftY);
  const rotate = useMotionValue(sparkle.rotation);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0.7);

  // Drift animation using spring
  useEffect(() => {
    const animateX = () => {
      x.set((Math.random() - 0.5) * 30);
      setTimeout(animateX, 3000 + Math.random() * 4000);
    };
    animateX();
  }, [x]);

  useEffect(() => {
    const animateY = () => {
      y.set((Math.random() - 0.5) * 30);
      setTimeout(animateY, 4000 + Math.random() * 3000);
    };
    animateY();
  }, [y]);

  // Continuous rotation
  useEffect(() => {
    let frame: number;
    let currentRotation = sparkle.rotation;
    const animateRotate = () => {
      currentRotation += 0.5;
      rotate.set(currentRotation);
      frame = requestAnimationFrame(animateRotate);
    };
    animateRotate();
    return () => cancelAnimationFrame(frame);
  }, [rotate]);

  // Pulsing scale
  useEffect(() => {
    const animateScale = () => {
      scale.set(1 + Math.random() * 0.3);
      setTimeout(animateScale, 1000 + Math.random() * 2000);
    };
    animateScale();
  }, [scale]);

  // Spring-based smoothing for natural motion
  const smoothX = useSpring(x, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 200, damping: 15 });
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      style={{
        left: `${sparkle.x}%`,
        top: `${sparkle.y}%`,
        x: smoothX,
        y: smoothY,
        scale: smoothScale,
        rotate: smoothRotate,
        opacity: smoothOpacity,
      }}
      className={cn("absolute", sparkle.sizeClass, sparkle.colorClass, "will-change-transform")}
      initial="initial"
      animate="animate"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </motion.div>
  );
}