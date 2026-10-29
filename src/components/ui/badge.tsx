"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "info" | "outline" | "destructive" | "clay-pink" | "clay-peach" | "clay-mint" | "clay-lavender" | "clay-sand" | "clay-blue" | "clay-rose" | "clay-palemint";
  size?: "sm" | "md" | "lg" | "xl";
  dot?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  primary: "bg-[var(--c-orange)] text-white",
  secondary: "bg-[var(--c-teal)] text-white",
  success: "bg-[var(--c-lime)] text-white",
  warning: "bg-[var(--c-amber)] text-white",
  info: "bg-[var(--c-sky)] text-white",
  outline: "bg-transparent border-2 border-[var(--c-orange)] text-[var(--c-orange)]",
  destructive: "bg-[var(--c-rose)] text-white",
  "clay-pink": "clay-badge clay-pink",
  "clay-peach": "clay-badge clay-peach",
  "clay-mint": "clay-badge clay-mint",
  "clay-lavender": "clay-badge clay-lavender",
  "clay-sand": "clay-badge clay-sand",
  "clay-blue": "clay-badge clay-blue",
  "clay-rose": "clay-badge clay-rose",
  "clay-palemint": "clay-badge clay-palemint",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-sm gap-1.5",
  lg: "px-3 py-1.5 text-base gap-2",
  xl: "px-4 py-2 text-lg gap-2.5",
};

const dotColors = {
  primary: "bg-[var(--c-orange)]",
  secondary: "bg-[var(--c-teal)]",
  success: "bg-[var(--c-lime)]",
  warning: "bg-[var(--c-amber)]",
  info: "bg-[var(--c-sky)]",
  outline: "bg-[var(--c-orange)]",
  destructive: "bg-[var(--c-rose)]",
  "clay-pink": "bg-[var(--clay-1)]",
  "clay-peach": "bg-[var(--clay-2)]",
  "clay-mint": "bg-[var(--clay-3)]",
  "clay-lavender": "bg-[var(--clay-4)]",
  "clay-sand": "bg-[var(--clay-5)]",
  "clay-blue": "bg-[var(--clay-6)]",
  "clay-rose": "bg-[var(--clay-7)]",
  "clay-palemint": "bg-[var(--clay-8)]",
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
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-semibold rounded-[var(--sc-r-pill)]",
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
);

Badge.displayName = "Badge";