"use client";

import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { motion } from "motion/react";
import { useReducedMotion, getMotionProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CardPropsBase {
  variant?: "default" | "elevated" | "interactive" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

type CardProps = CardPropsBase & (
  | { href: string; asChild?: never }
  | { href?: never; asChild?: never }
);

const variantStyles = {
  default: "bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]",
  elevated: "bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-lg)]",
  interactive: "bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-md)] cursor-pointer",
  glass: "glass",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const motionProps = {
  whileHover: { y: -4, boxShadow: "var(--shadow-xl)" },
  whileTap: { y: -2, scale: 0.99 },
};

function CardComponent({
  variant = "default",
  padding = "md",
  children,
  href,
  className,
  style,
}: CardProps) {
  const reduced = useReducedMotion();
  const isLink = !!href;
  const reducedProps = getMotionProps(reduced);

  const baseClassName = cn(
    "rounded-[var(--radius-lg)]",
    "transition-all duration-300",
    variantStyles[variant],
    paddingStyles[padding],
    className
  );

  if (reduced) {
    if (isLink) {
      return (
        <a
          href={href}
          className={baseClassName}
          style={style}
        >
          {children}
        </a>
      );
    }
    return (
      <div
        className={baseClassName}
        style={style}
      >
        {children}
      </div>
    );
  }

  if (isLink) {
    return (
      <motion.a
        href={href}
        className={baseClassName}
        style={style}
        {...reducedProps}
        whileHover={variant === "interactive" ? motionProps.whileHover : undefined}
        whileTap={variant === "interactive" ? motionProps.whileTap : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={baseClassName}
      style={style}
      {...reducedProps}
      whileHover={variant === "interactive" ? motionProps.whileHover : undefined}
      whileTap={variant === "interactive" ? motionProps.whileTap : undefined}
    >
      {children}
    </motion.div>
  );
}

export function Card(props: CardProps) {
  return <CardComponent {...props} />;
}

Card.displayName = "Card";

/* ========================================
   CARD SUB-COMPONENTS
======================================== */

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-h3 font-semibold text-[var(--color-text-primary)]", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-body-sm text-[var(--color-text-secondary)] mt-1", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 mt-4 pt-4 border-t border-[var(--color-border)]", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";