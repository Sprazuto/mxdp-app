import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function BentoGrid({
  children,
  className,
  columns = { base: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = 4,
}: BentoGridProps) {
  const columnClass = `grid-cols-${columns.base} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`;
  const gapClass = `gap-${gap}`;

  return (
    <motion.div
      className={cn("grid", columnClass, gapClass, className)}
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px" }}
    >
      {children}
    </motion.div>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    col?: number;
    row?: number;
    colStart?: number;
    colEnd?: number;
    rowStart?: number;
    rowEnd?: number;
  };
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export function BentoItem({ children, className, span }: BentoItemProps) {
  const spanClasses = span
    ? cn(
        span.col && `col-span-${span.col}`,
        span.row && `row-span-${span.row}`,
        span.colStart && `col-start-${span.colStart}`,
        span.colEnd && `col-end-${span.colEnd}`,
        span.rowStart && `row-start-${span.rowStart}`,
        span.rowEnd && `row-end-${span.rowEnd}`
      )
    : "";

  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6",
        spanClasses,
        className
      )}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}