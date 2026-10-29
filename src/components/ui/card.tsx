"use client";

import { forwardRef, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "pink" | "peach" | "mint" | "lavender" | "sand" | "blue" | "rose" | "palemint";
  blob?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  hoverable?: boolean;
  padded?: boolean;
}

const variantClasses = {
  pink: "clay-pink",
  peach: "clay-peach",
  mint: "clay-mint",
  lavender: "clay-lavender",
  sand: "clay-sand",
  blue: "clay-blue",
  rose: "clay-rose",
  palemint: "clay-palemint",
};

const blobClasses = {
  1: "blob-1",
  2: "blob-2",
  3: "blob-3",
  4: "blob-4",
  5: "blob-5",
  6: "blob-6",
  7: "blob-7",
  8: "blob-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "mint",
      blob = 3,
      hoverable = true,
      padded = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "clay-blob",
          variantClasses[variant],
          blobClasses[blob],
          hoverable && "cursor-pointer",
          padded && "p-6 md:p-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/* ========================================
   CARD COMPOSITE COMPONENTS
======================================== */

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn("sc-display sc-display--md font-bold text-[var(--sc-ink)]", className)} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("sc-body text-[var(--sc-ink-soft)]", className)} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-4 pt-4 border-t border-[var(--sc-hairline)]", className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export interface CardIconProps extends HTMLAttributes<HTMLDivElement> {
  color?: "pink" | "peach" | "mint" | "lavender" | "sand" | "blue" | "rose" | "palemint";
}
export const CardIcon = forwardRef<HTMLDivElement, CardIconProps>(
  (
    {
      color = "mint",
      className,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-[var(--sc-r-lg)]",
        "w-14 h-14",
        variantClasses[color],
        "text-white",
        "shadow-[0_8px_16px_-4px_color-mix(in_oklab,var(--clay-1)_40%,transparent)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardIcon.displayName = "CardIcon";