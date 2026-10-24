"use client";

import { forwardRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion, getMotionProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "info" | "outline" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  dot?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  primary: "bg-[var(--color-rose)] text-[var(--color-primary-foreground)]",
  secondary: "bg-[var(--color-teal)] text-[var(--color-secondary-foreground)]",
  success: "bg-[var(--color-success)] text-white",
  warning: "bg-[var(--color-warning)] text-[var(--color-text-primary)]",
  info: "bg-[var(--color-info)] text-white",
  outline: "bg-transparent border-2 border-[var(--color-border-strong)] text-[var(--color-text-secondary)]",
  destructive: "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-caption gap-1",
  md: "px-2.5 py-1 text-body-sm gap-1.5",
  lg: "px-3 py-1.5 text-body gap-2",
  xl: "px-4 py-2 text-body-lg gap-2.5",
};

const dotColors = {
  primary: "bg-[var(--color-rose)]",
  secondary: "bg-[var(--color-teal)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  info: "bg-[var(--color-info)]",
  outline: "bg-[var(--color-text-tertiary)]",
  destructive: "bg-[var(--color-destructive)]",
};

const motionProps = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.95 },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "primary",
      size = "md",
      dot = false,
      children,
      className,
      style,
    },
    ref
  ) => {
    const reduced = useReducedMotion();
    const reducedProps = getMotionProps(reduced);

    if (reduced) {
      return (
        <span
          ref={ref}
          className={cn(
            "inline-flex items-center font-semibold rounded-[var(--radius-full)]",
            "border-0",
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
          style={style}
        >
          {dot && (
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full flex-shrink-0",
                dotColors[variant]
              )}
              aria-hidden="true"
            />
          )}
          {children}
        </span>
      );
    }

    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-flex items-center font-semibold rounded-[var(--radius-full)]",
          "border-0",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        style={style}
        {...reducedProps}
        whileHover={motionProps.whileHover}
        whileTap={motionProps.whileTap}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full flex-shrink-0",
              dotColors[variant]
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = "Badge";