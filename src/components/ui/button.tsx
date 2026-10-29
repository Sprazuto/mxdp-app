"use client";

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type OmittedProps = "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "whileHover" | "whileTap" | "whileFocus" | "whileInView" | "viewport" | "initial" | "animate" | "exit" | "transition";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, OmittedProps> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "clay-primary" | "clay-secondary";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const variantStyles = {
  primary: "bg-[var(--c-orange)] text-white hover:bg-[var(--c-orange)]/90 active:bg-[var(--c-orange)] shadow-[0_6px_24px_-4px_color-mix(in_oklab,_var(--c-orange)_50%,_transparent)]",
  secondary: "bg-[var(--c-teal)] text-white hover:bg-[var(--c-teal)]/90 active:bg-[var(--c-teal)] shadow-[0_6px_24px_-4px_color-mix(in_oklab,_var(--c-teal)_50%,_transparent)]",
  ghost: "bg-transparent hover:bg-[var(--sc-hairline-strong)] active:bg-[var(--sc-hairline-strong)] text-[var(--sc-ink)] shadow-none",
  outline: "border-2 border-[var(--c-orange)] bg-transparent hover:bg-[var(--c-orange-soft)] active:bg-[var(--c-orange-soft)] text-[var(--c-orange)] shadow-none",
  "clay-primary": "clay-pill clay-pill-primary",
  "clay-secondary": "clay-pill clay-pill-secondary",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
  xl: "px-10 py-5 text-xl gap-3",
};

const Comp = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      children,
      iconLeft,
      iconRight,
      fullWidth = false,
      className,
      disabled,
      type = "button",
      style,
      onClick,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const Comp = asChild ? Slot : "button";

    const buttonProps = asChild ? { ...props, asChild: undefined } : { ...props, type, disabled: isDisabled, onClick };

    return (
      <Comp
        ref={ref}
        {...buttonProps}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-[var(--sc-r-pill)]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--c-orange-light)] focus-visible:ring-offset-3 focus-visible:ring-offset-[var(--sc-canvas)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "btn-depth",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        style={style}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {iconLeft && <span className="flex-shrink-0" aria-hidden="true">{iconLeft}</span>}
            {children}
            {iconRight && <span className="flex-shrink-0" aria-hidden="true">{iconRight}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Comp.displayName = "Button";

export const Button = Comp;